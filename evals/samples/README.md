<!--
  GenAI Security Crosswalk
  Document  : Eval sample outputs (illustrative golden references)
  License   : CC BY-SA 4.0
-->

# Sample eval outputs

These files show **what a run looks like** so you can recognise pass/fail output
before wiring evals into your own pipeline. They are illustrative references
captured against `gpt-4o-mini` — your numbers will differ by model, model
version, and date. They are **not** assertions about any specific model's
security posture.

| File | Tool | Profile |
|---|---|---|
| `garak_llm01_report_summary.txt` | Garak | `LLM01_prompt_injection` |
| `pyrit_llm01_sample.txt` | PyRIT | `llm01_prompt_injection.py` |

To regenerate, run the corresponding profile from the parent directory
(see [`../README.md`](../README.md)).
