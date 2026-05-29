<!--
  GenAI Security Crosswalk
  Document  : Evaluation Profiles — Setup and Usage
  Version   : 2.0.0 — 2026-05-29
  License   : CC BY-SA 4.0
-->

# Evaluation Profiles

Runnable security test profiles mapped to OWASP GenAI vulnerability entries.

> **Authorisation required.** Run these profiles only against systems you own
> or have explicit written permission to test. They are for pre-production
> gates, red-team exercises, and defensive validation — not for testing
> third-party systems.
>
> **Reproducibility.** Tool APIs and probe catalogues change between releases.
> All profiles are pinned and validated against the versions in
> [`requirements.txt`](requirements.txt) (**garak 0.15.0**, **PyRIT 0.13.0**).
> Install with `pip install -r evals/requirements.txt` and bump deliberately.

---

## What's here

| Folder | Tool | Contents |
|---|---|---|
| `garak/` | [Garak](https://github.com/NVIDIA/garak) 0.15.0 | **17** YAML profiles (10 LLM + 4 Agentic + 3 DSGAI) + auto-discovering `run_all.sh` |
| `pyrit/` | [PyRIT](https://github.com/Azure/PyRIT) 0.13.0 | **6** scenario scripts + shared `_harness.py` (LLM-as-judge scoring) |
| `laaf/` | [LAAF v2.0](https://github.com/qorvexconsulting1/laaf-V2.0) | **6** LPCI stage configs (S1–S6) + `laaf_crosswalk.py` reporter + `run_laaf.sh` |
| `ci/` | GitHub Actions | Workflow template wiring all three tools into CI/CD |
| `requirements.txt` | pip | Pinned tool versions for reproducible runs |

Each profile maps explicitly to an OWASP entry and the framework controls it
validates. `scripts/validate.js` enforces that every profile references a valid
OWASP ID and an existing crosswalk file.

---

## Prerequisites

```bash
pip install -r evals/requirements.txt        # garak 0.15.0 + pyrit 0.13.0

export OPENAI_API_KEY=sk-...                  # required
export OPENAI_MODEL=gpt-4o-mini               # optional (PyRIT scripts)
```

LAAF is installed separately (it is not on PyPI):

```bash
pip install git+https://github.com/qorvexconsulting1/laaf-V2.0.git
```

---

## Garak

```bash
# Single profile (target/model come from the config; override on the CLI)
garak --config evals/garak/LLM01_prompt_injection.yaml

# Point at your deployment
garak --config evals/garak/LLM01_prompt_injection.yaml \
      --target_type openai --target_name gpt-4o

# Run the whole suite (auto-discovers every *.yaml in garak/)
bash evals/garak/run_all.sh
GARAK_TARGET_TYPE=openai GARAK_TARGET_NAME=gpt-4o bash evals/garak/run_all.sh
```

`run_all.sh` discovers profiles by globbing the directory, so new profiles are
picked up automatically — there is no hardcoded list to drift out of sync.
Results are written to `evals/results/<timestamp>/`.

Config schema note (garak 0.15.0): probe and detector selection live **under
`plugins:`** (`plugins.probe_spec`, `plugins.detector_spec`,
`plugins.extended_detectors`), and the target is set with
`plugins.target_type` / `plugins.target_name`. Verify probe names for your
installed version with `garak --list_probes`.

## PyRIT

```bash
python evals/pyrit/llm01_prompt_injection.py
```

The scripts share [`_harness.py`](pyrit/_harness.py), which owns the PyRIT
0.13.0 API in one place (`initialize_pyrit_async`, `executor.attack`,
`SelfAskTrueFalseScorer`). Attack success is judged by an **LLM scorer**, not by
substring matching, and indirect-injection probes deliver their payload through
a retrieved-context channel via `as_retrieved_context()`. Exit code `0` = pass,
`1` = fail, `2` = setup error — usable directly in CI.

## LAAF (LPCI)

```bash
# Run a scan then produce a crosswalk report
python evals/laaf/laaf_crosswalk.py --run-scan \
  --target openai --model gpt-4o-mini --stages S1 S2 S3

# Map existing results to OWASP + MAESTRO layers
python evals/laaf/laaf_crosswalk.py --results-dir evals/results/laaf/latest/ --format md
```

LAAF v2.0 exercises Logic-layer Prompt Control Injection across six stages
(S1 Reconnaissance → S6 Trace Tampering). `laaf_crosswalk.py` maps each stage's
findings to OWASP entries and MAESTRO architectural layers.

---

## Profile → OWASP mapping

### Garak (17)

| Profile | OWASP Entry | MITRE ATLAS | Controls validated |
|---|---|---|---|
| `LLM01_prompt_injection` | LLM01 Prompt Injection | AML.T0051.000/.001, AML.T0054 | Input validation, context separation |
| `LLM02_sensitive_disclosure` | LLM02 Sensitive Info Disclosure | AML.T0024, AML.T0057 | Output scanning, DLP, RAG access control |
| `LLM03_supply_chain` | LLM03 Supply Chain | AML.T0010, AML.T0058 | Dependency integrity (package hallucination) |
| `LLM04_data_poisoning` | LLM04 Data & Model Poisoning | AML.T0020, AML.T0031 | Data integrity, adversarial robustness |
| `LLM05_output_handling` | LLM05 Improper Output Handling | AML.T0048, AML.T0057 | Output encoding, downstream injection |
| `LLM06_excessive_agency` | LLM06 Excessive Agency | AML.T0053, AML.T0051.001 | Tool least-privilege, action authorisation |
| `LLM07_system_prompt_leakage` | LLM07 System Prompt Leakage | AML.T0051.000, AML.T0057 | System-prompt confidentiality |
| `LLM08_embeddings` | LLM08 Vector & Embedding Weaknesses | AML.T0051.001, AML.T0070 | Retrieved-context validation |
| `LLM09_misinformation` | LLM09 Misinformation | AML.T0048, AML.T0062 | Output factuality, hallucination |
| `LLM10_resource_exhaustion` | LLM10 Unbounded Consumption | AML.T0034, AML.T0029 | Rate/quota controls, resource limits |
| `ASI01_goal_hijack` | ASI01 Agent Goal Hijack | AML.T0051, AML.T0054 | Goal integrity, instruction hierarchy |
| `ASI05_code_execution` | ASI05 Unexpected Code Execution | AML.T0050, AML.T0011 | Sandboxing, exec controls (CWE-78/94) |
| `ASI07_lateral_chaining` | ASI07 Insecure Inter-Agent Comms | AML.T0051.001, AML.T0066 | Message validation, data-in-transit |
| `ASI08_cascade_failure` | ASI08 Cascading Agent Failures | AML.T0048, AML.T0054 | Cascade detection, circuit-breaking |
| `DSGAI01_sensitive_data_leakage` | DSGAI01 Sensitive Data Leakage | AML.T0057, AML.T0024 | Data leakage prevention, output DLP |
| `DSGAI12_nl_data_gateway` | DSGAI12 Unsafe NL Data Gateways | AML.T0050, AML.T0048 | Parameterised queries (CWE-89) |
| `DSGAI18_inference_reconstruction` | DSGAI18 Inference & Data Reconstruction | AML.T0024.000/.002 | Data masking, membership-inference resistance |

### PyRIT (6)

| Script | OWASP Entry | MITRE ATLAS |
|---|---|---|
| `llm01_prompt_injection.py` | LLM01 Prompt Injection | AML.T0051.000/.001, AML.T0054 |
| `asi01_goal_hijack.py` | ASI01 Agent Goal Hijack | AML.T0051.000/.001, AML.T0054 |
| `asi04_supply_chain.py` | ASI04 Agentic Supply Chain | AML.T0010, AML.T0058 |
| `dsgai01_sensitive_data_leakage.py` | DSGAI01 Sensitive Data Leakage | AML.T0057, AML.T0024 |
| `dsgai04_rag_poisoning.py` | DSGAI04 Data, Model & Artifact Poisoning | AML.T0070, AML.T0020 |
| `dsgai18_inference_reconstruction.py` | DSGAI18 Inference & Data Reconstruction | AML.T0024.000/.002 |

### LAAF stages (S1–S6)

| Stage | Name | OWASP entries |
|---|---|---|
| S1 | Reconnaissance | LLM07, LLM01 |
| S2 | Logic-Layer Injection | LLM01, ASI01, DSGAI04 |
| S3 | Trigger Execution | ASI01, ASI06, LLM06 |
| S4 | Persistence and Reuse | ASI06, LLM06, DSGAI04 |
| S5 | Evasion and Obfuscation | LLM01, LLM02 |
| S6 | Trace Tampering | DSGAI01, LLM07 |

---

## Interpreting results

### Garak
Garak reports a **pass rate** per probe; a pass means the model did **not**
produce the harmful output the probe sought. Each profile's `run.eval_threshold`
sets the fail line (e.g. `0.1` = fail if >10% of probes succeed). See
[`samples/`](samples/) for an annotated example report.

### PyRIT
Each script prints a per-scenario and overall summary and exits non-zero on
failure. A probe scored `[VULN]` means the LLM judge ruled the attack
succeeded (control gap). See [`samples/pyrit_llm01_sample.txt`](samples/pyrit_llm01_sample.txt).

---

## CI/CD integration

Copy `evals/ci/github-action.yml` into `.github/workflows/`. It runs a fast
Garak subset on every PR touching LLM code, and the full PyRIT + LAAF suites on
a weekly schedule / manual dispatch. Tool versions are pinned in the workflow.

---

## Adding profiles for new entries

1. Copy the nearest existing profile.
2. Update the OWASP mapping header (`OWASP Entry:` and `Crosswalk ref:`).
3. For Garak, pick probes that exist in the pinned version
   (`garak --list_probes`) and put `probe_spec` **under `plugins:`**.
   For PyRIT, define `Scenario`/`AttackProbe` lists and call `_harness.run()`.
4. Garak `run_all.sh` auto-discovers the new file — no list to update.
5. Run `node scripts/validate.js` — the evals check verifies your OWASP ID and
   crosswalk path before you submit.
6. Submit a PR following [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## References

- [Garak documentation](https://docs.garak.ai) · `garak --list_probes`
- [PyRIT documentation](https://azure.github.io/PyRIT/)
- [LAAF v2.0](https://github.com/qorvexconsulting1/laaf-V2.0)
- [OWASP LLM Top 10 — llm-top10/](../llm-top10/)
- [OWASP Agentic Top 10 — agentic-top10/](../agentic-top10/)
- [DSGAI 2026 — dsgai-2026/](../dsgai-2026/)
- [shared/TOOLS.md](../shared/TOOLS.md) — full tool catalogue

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk)*
*License: CC BY-SA 4.0*
