<!--
  GenAI Security Crosswalk
  Document  : promptfoo red-team track
  License   : CC BY-SA 4.0
-->

# promptfoo — application red-team / CI gating

[promptfoo](https://www.promptfoo.dev/docs/red-team/) is the application-level
counterpart to the model-level scanners: **garak tests the model, promptfoo
tests your app** (prompt + RAG + tools) and gates merges in CI. It generates
adversarial cases from OWASP-aligned plugins, delivers them with attack
strategies, and grades the responses.

Pinned to **promptfoo 0.121.13**.

## Run

```bash
# No install needed (npx); or `npm i -g promptfoo@0.121.13`
npx promptfoo@0.121.13 redteam run -c evals/promptfoo/promptfooconfig.yaml
npx promptfoo@0.121.13 redteam report      # open the results viewer
npx promptfoo@0.121.13 redteam plugins     # list all plugins
```

Set `OPENAI_API_KEY` (baseline target) or edit `targets` to point at your
application's HTTP endpoint — that is where this track adds the most value.

## OWASP mapping

| Plugin collection | Covers | Crosswalk |
|---|---|---|
| `owasp:llm` | LLM01–LLM10 | [`llm-top10/`](../../llm-top10/) |
| `owasp:agentic` | OWASP Top 10 for Agentic Applications 2026 | [`agentic-top10/`](../../agentic-top10/) |

Strategies (`prompt-injection`, `jailbreak`, `crescendo`) modify *how* payloads
are delivered, including multi-turn escalation that single-shot probes miss.

## Why it complements the other tracks

| | garak | PyRIT | **promptfoo** |
|---|---|---|---|
| Scope | base model | bespoke campaigns | **the deployed app** |
| Best for | model regression | custom attack chains | **CI/CD merge gate** |
| Config | YAML probes | Python | **declarative YAML** |

## CI

`promptfoo redteam run` exits non-zero when findings exceed your configured
thresholds — drop it into a PR workflow the same way as the garak job in
[`../ci/github-action.yml`](../ci/github-action.yml).

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk). License: CC BY-SA 4.0*
