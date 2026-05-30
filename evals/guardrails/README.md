<!--
  GenAI Security Crosswalk
  Document  : Guardrail evaluation track
  License   : CC BY-SA 4.0
-->

# Guardrail evaluation — test the defense, not just the model

Every other track attacks the model. This one tests the **control**: does your
input/output guardrail actually catch attacks, and does it over-block benign
traffic? Since the crosswalk maps *controls*, you should be able to verify the
control works.

| File | Tool | Tests |
|---|---|---|
| `prompt_guard_eval.py` | Meta Llama Prompt Guard 2 (86M) | input-filter detection rate + false-positive rate |
| `nemo/` | NeMo Guardrails 0.22.0 | programmable input/output self-check rails |

## Prompt Guard 2 (input classifier)

```bash
pip install "transformers>=4.43" "torch>=2.2"

# Default = Meta Prompt Guard 2 (gated — accept the license + `huggingface-cli login`)
huggingface-cli login
python evals/guardrails/prompt_guard_eval.py

# Or point at any non-gated text-classification guardrail (no HF auth needed):
PROMPT_GUARD_MODEL=protectai/deberta-v3-base-prompt-injection-v2 \
  python evals/guardrails/prompt_guard_eval.py
```

Runs locally (no LLM API key). Reports detection rate on known-malicious inputs
(must be ≥80%) and false-positive rate on benign inputs (must be ≤10%); exits
non-zero if the guardrail misses the bar. The classifier is selectable via
`PROMPT_GUARD_MODEL`, and label handling is robust across schemes
(`LABEL_0/1`, `SAFE/INJECTION`, `benign/malicious`).

## NeMo Guardrails (programmable rails)

```bash
pip install "nemoguardrails==0.22.0"
export OPENAI_API_KEY=sk-...
nemoguardrails chat --config=evals/guardrails/nemo
```

`nemo/config.yml` wires `self check input` + `self check output` flows;
`nemo/prompts.yml` defines what to block (jailbreak/injection on input;
system-prompt/PII/compliance leakage on output). Adapt the prompts to your
policy, then exercise them with the garak/PyRIT/promptfoo payloads to measure
how much the guardrail layer catches.

## OWASP mapping

| Control surface | OWASP | Crosswalk |
|---|---|---|
| Input filtering | LLM01 | [`llm-top10/LLM_MITREATLAS.md`](../../llm-top10/LLM_MITREATLAS.md) |
| Output filtering / leakage | LLM02, LLM05, LLM07 | [`llm-top10/`](../../llm-top10/) |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk). License: CC BY-SA 4.0*
