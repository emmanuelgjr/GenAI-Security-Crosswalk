<!--
  GenAI Security Crosswalk
  Document  : Model artifact scanning track
  License   : CC BY-SA 4.0
-->

# Model artifact scanning — supply chain (LLM03 / DSGAI17)

Static, pre-deploy scanning of **serialized model artifacts** for embedded
code-execution payloads. This is the half of supply-chain risk the runtime
probes can't see: package-hallucination (garak `LLM03`) catches *bad
dependencies the model recommends*, while this catches *malicious code inside a
model file you downloaded*.

Tools (pinned): [Protect AI **ModelScan** 0.8.8](https://github.com/protectai/modelscan)
+ **picklescan** 1.0.4 as a second opinion.

## Run

```bash
pip install "modelscan==0.8.8" "picklescan==1.0.4"

# Scan a single artifact or a whole cache directory
bash evals/modelscan/scan.sh /path/to/model.bin
bash evals/modelscan/scan.sh ~/.cache/huggingface/hub
```

No API key, no model inference. **Runtime-verified 2026-05-29** (ModelScan 0.8.8 + serialization scanner 1.0.4) against benign and known-malicious fixtures — see [`../samples/modelscan_sample.txt`](../samples/modelscan_sample.txt). Exit `0` = clean, `1` = unsafe operators found
(do not deploy), `2` = tooling/args error. A JSON report is written to
`evals/results/modelscan/` for CI evidence.

## What it detects

Deserialization attacks: serialized models (PyTorch `.bin`, Keras `.h5`,
TensorFlow SavedModel, joblib/numpy, and other formats that execute code on
load) can run arbitrary code the moment they are loaded — before any inference.
ModelScan flags the unsafe operators; treat any CRITICAL/HIGH finding as a
blocked artifact.

## OWASP mapping

| Maps to | Crosswalk |
|---|---|
| LLM03 Supply Chain Vulnerabilities | [`llm-top10/LLM_MITREATLAS.md`](../../llm-top10/LLM_MITREATLAS.md) |
| DSGAI17 Data Availability & Resilience / model supply chain | [`dsgai-2026/DSGAI_MITREATLAS.md`](../../dsgai-2026/DSGAI_MITREATLAS.md) |

Gate model artifacts in CI before they reach training or serving.

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk). License: CC BY-SA 4.0*
