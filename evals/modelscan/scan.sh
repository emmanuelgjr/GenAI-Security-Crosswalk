#!/usr/bin/env bash
# GenAI Security Crosswalk — Model artifact scan (supply-chain)
# -----------------------------------------------------------------------------
# OWASP Entry  : LLM03 - Supply Chain Vulnerabilities; DSGAI17 - Model Supply Chain
# Crosswalk ref: llm-top10/LLM_MITREATLAS.md
# Tools        : Protect AI ModelScan (0.8.8) + picklescan (1.0.4)
#
# STATIC, pre-deploy, NO API key, NO model inference. Scans serialized model
# artifacts (H5 / SavedModel / PyTorch / pickle-based) for code-execution
# payloads - the deserialization-attack half of supply-chain risk that runtime
# probes (package hallucination) cannot see.
#
# Usage:
#   bash evals/modelscan/scan.sh /path/to/model_or_dir
#   bash evals/modelscan/scan.sh ~/.cache/huggingface/hub
#
# Exit: 0 = clean, 1 = unsafe operators found, 2 = tooling missing / bad args.
# -----------------------------------------------------------------------------

set -uo pipefail

TARGET="${1:-}"
if [ -z "$TARGET" ]; then
  echo "usage: bash evals/modelscan/scan.sh <model-file-or-directory>"; exit 2
fi
if [ ! -e "$TARGET" ]; then
  echo "ERROR: path not found: $TARGET"; exit 2
fi
command -v modelscan >/dev/null 2>&1 || {
  echo "ERROR: modelscan not installed. Run: pip install 'modelscan==0.8.8' 'picklescan==1.0.4'"; exit 2; }

RESULTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)/evals/results/modelscan"
mkdir -p "$RESULTS_DIR"
REPORT="$RESULTS_DIR/modelscan_$(date +%Y%m%d_%H%M%S).json"

echo "GenAI Security Crosswalk - model artifact scan (LLM03 / DSGAI17)"
echo "Target : $TARGET"
echo "Report : $REPORT"
echo "----------------------------------------------------"

modelscan -p "$TARGET" -r json -o "$REPORT"
rc=$?

if command -v picklescan >/dev/null 2>&1; then
  echo ""
  echo "picklescan (serialization-specific) -----------------"
  picklescan -p "$TARGET" || true
fi

echo ""
case "$rc" in
  0) echo "CLEAN - no unsafe operators detected." ;;
  *) echo "FINDINGS - review $REPORT. Do not deploy this artifact until triaged." ;;
esac
exit "$rc"
