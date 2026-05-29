<!--
  GenAI Security Crosswalk
  Document  : Agentic eval track (Inspect AI / AgentDojo / AgentHarm)
  License   : CC BY-SA 4.0
-->

# Agentic evals — Inspect AI + AgentDojo / AgentHarm

The agentic surface needs more than prompt probes: it needs **tool-use
environments** where injected content arrives through tool outputs and the
agent can actually *act*. [Inspect AI](https://inspect.aisi.org.uk/) (UK AI
Safety Institute) is the framework standard, and
[`inspect_evals`](https://ukgovernmentbeis.github.io/inspect_evals/) ships the
canonical agentic security benchmarks. This track wires them to the OWASP
Agentic Top 10 and adds a native ASI01 task as a starting pattern.

Pinned to **inspect-ai 0.3.229**, **inspect_evals 0.13.1**.

## Run

```bash
pip install "inspect-ai==0.3.229" "inspect_evals==0.13.1"

# Native crosswalk task (ASI01 goal hijack)
inspect eval evals/inspect/agentic_goal_hijack.py --model openai/gpt-4o-mini

# Upstream benchmarks (tool-use environments)
inspect eval inspect_evals/agentdojo --model openai/gpt-4o-mini \
  -T attack=important_instructions
inspect eval inspect_evals/agentharm --model openai/gpt-4o-mini
```

## OWASP Agentic Top 10 → eval mapping

> **Naming:** this repo uses `ASI01–ASI10`; the OWASP 2026 release and upstream
> benchmarks use `AA01–AA10`. They refer to the same Top 10 — treat `ASInn` ≡ `AAnn`.

| OWASP (ASI/AA) | Eval | How |
|---|---|---|
| ASI01 Agent Goal Hijack | `agentic_goal_hijack.py` (native) + AgentDojo | `-T attack=important_instructions` |
| ASI02 Tool Misuse | AgentDojo | injection at tool-response points |
| ASI03 Identity & Privilege Abuse | AgentDojo (banking/workspace suites) | `-T workspace=banking` |
| ASI04 Agentic Supply Chain | PyRIT `asi04_supply_chain.py` | untrusted tool/component trust |
| ASI05 Unexpected Code Execution | garak `ASI05_code_execution.yaml` | malwaregen / exploitation |
| ASI06 Memory & Context Poisoning | AgentDojo (stateful suites) | persistence across turns |
| ASI07 Insecure Inter-Agent Comms | garak `ASI07_lateral_chaining.yaml` | relayed-payload injection |
| ASI08 Cascading Agent Failures | garak `ASI08_cascade_failure.yaml` | escalation seeds |
| ASI09 Human-Agent Trust | AgentHarm | malicious-user harmful tasks |
| ASI10 Rogue Agents | AgentHarm | harmful agent behaviour |

AgentDojo models the **prompt-injection-via-tool-output** threat (97 tasks /
629 security cases); AgentHarm models the **malicious-user** threat. Together
with the native task and the garak/PyRIT agentic profiles, this covers the
Agentic Top 10 far beyond LAAF's LPCI-persistence niche.

## Why Inspect

It is the emerging standard eval scaffold (datasets + solvers + scorers + a
results viewer), and `inspect_evals` is where new OWASP-Agentic benchmarks land
first (e.g. AgentThreatBench). Building here keeps the crosswalk aligned with
upstream as the agentic benchmark ecosystem matures.

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk). License: CC BY-SA 4.0*
