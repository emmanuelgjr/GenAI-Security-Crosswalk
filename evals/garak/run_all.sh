#!/usr/bin/env bash
# GenAI Security Crosswalk — Run all Garak evaluation profiles
# ─────────────────────────────────────────────────────────────
# Discovers and runs EVERY *.yaml profile in this directory (no hardcoded
# list to drift out of sync). Pinned to garak >= 0.15.0.
#
# Usage:
#   bash evals/garak/run_all.sh
#   GARAK_TARGET_TYPE=openai GARAK_TARGET_NAME=gpt-4o bash evals/garak/run_all.sh
#
# Environment variables:
#   GARAK_TARGET_TYPE  — target type (default: openai)
#   GARAK_TARGET_NAME  — target/model name (default: gpt-4o-mini)
#   OPENAI_API_KEY     — required for the openai target type
#
# Results are written to evals/results/<timestamp>/
# Exit code: 0 if all profiles pass, 1 if any fail.
# ─────────────────────────────────────────────────────────────

set -euo pipefail

command -v garak >/dev/null 2>&1 || { echo "ERROR: garak not installed. Run: pip install 'garak>=0.15.0'"; exit 2; }

TARGET_TYPE="${GARAK_TARGET_TYPE:-openai}"
TARGET_NAME="${GARAK_TARGET_NAME:-gpt-4o-mini}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
RESULTS_DIR="$REPO_ROOT/evals/results/$(date +%Y%m%d_%H%M%S)"

mkdir -p "$RESULTS_DIR"

# Auto-discover every profile in this directory, sorted for stable ordering.
mapfile -t PROFILES < <(find "$SCRIPT_DIR" -maxdepth 1 -name '*.yaml' | sort)

PASS=0
FAIL=0
FAILED_PROFILES=()

echo ""
echo "GenAI Security Crosswalk — Garak evaluation suite"
echo "Target: $TARGET_TYPE / $TARGET_NAME"
echo "Profiles discovered: ${#PROFILES[@]}"
echo "Results: $RESULTS_DIR"
echo "────────────────────────────────────────────────────"

for profile in "${PROFILES[@]}"; do
  name=$(basename "$profile" .yaml)
  echo ""
  echo "▶  Running: $name"

  if garak \
      --config "$profile" \
      --target_type "$TARGET_TYPE" \
      --target_name "$TARGET_NAME" \
      --report_prefix "$RESULTS_DIR/$name" \
      2>&1 | tee "$RESULTS_DIR/${name}.log"; then
    echo "✓  PASS: $name"
    ((PASS++)) || true
  else
    echo "✗  FAIL: $name"
    ((FAIL++)) || true
    FAILED_PROFILES+=("$name")
  fi
done

echo ""
echo "────────────────────────────────────────────────────"
echo "Results: $PASS passed, $FAIL failed (of ${#PROFILES[@]})"

if [ "${#FAILED_PROFILES[@]}" -gt 0 ]; then
  echo ""
  echo "Failed profiles:"
  for f in "${FAILED_PROFILES[@]}"; do
    echo "  ✗ $f"
  done
  echo ""
  echo "See $RESULTS_DIR for full logs."
  exit 1
fi

echo ""
echo "All profiles passed. See $RESULTS_DIR for full reports."
exit 0
