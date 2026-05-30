<!--
  GenAI Security Crosswalk
  Document  : Privacy / data-security evaluation track (DSGAI)
  License   : CC BY-SA 4.0
-->

# Privacy & data-security evals — the DSGAI dimension

The offensive prompt-based tools barely touch data security, yet DSGAI is the
crosswalk's distinctive third taxonomy. This track adds data-layer evals:
training-data reconstruction and PII output leakage.

| File | Tool | OWASP |
|---|---|---|
| `canary_membership_audit.py` | OpenAI SDK + seeded canaries | DSGAI18 Inference & Data Reconstruction |
| `pii_output_scan.py` | Microsoft Presidio | DSGAI01 Sensitive Data Leakage |

## Canary extraction audit (DSGAI18)

```bash
pip install "openai>=1.40"
export OPENAI_API_KEY=sk-...
# edit CANARIES with the secrets you seeded into training/fine-tune/RAG data
python evals/privacy/canary_membership_audit.py
```

Probes the deployed model with extraction prompts and measures **canary
recall** — how often planted secrets are regurgitated. Zero tolerance by
default. This is the black-box, deployable cousin of formal membership inference
(white-box tools like `ml-privacy-meter` complement it when you have model
internals).

## PII output scan (DSGAI01)

```bash
pip install "presidio-analyzer==2.2.362"
python -m spacy download en_core_web_lg
python evals/privacy/pii_output_scan.py transcript.jsonl --field response
python evals/privacy/pii_output_scan.py transcript.jsonl --broad   # add PERSON/LOCATION
```

Scans captured model outputs (e.g. from a garak/PyRIT run or production logs)
for PII entities above a confidence threshold — an **output-DLP gate**. Any
high-confidence PII in a response is a DSGAI01 finding.

By default it checks **high-precision identifiers** (credit card, SSN, email,
IBAN, IP, phone, passport, bank/medical numbers) that rarely false-positive.
Pass `--broad` to also flag NER entities (PERSON, LOCATION, NRP, DATE_TIME) for
higher recall at the cost of noise — e.g. "the weather in Lisbon" trips LOCATION.

## Why this matters

DSGAI is what makes this crosswalk unique; until now it had no runnable evals.
These two cover the most testable data-security failure modes — memorisation
leakage and output PII — and pair with the DSGAI garak profiles
(`DSGAI01/12/18`) and PyRIT scripts.

Crosswalk: [`dsgai-2026/DSGAI_MITREATLAS.md`](../../dsgai-2026/DSGAI_MITREATLAS.md)

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk). License: CC BY-SA 4.0*
