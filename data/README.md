# Data Layer

The `/data/` folder contains machine-readable representations of the
GenAI Security Crosswalk content, enabling programmatic access,
dashboard integration, and downstream tooling without scraping Markdown.

---

## Files

| File | Purpose |
|---|---|
| `schema.json` | JSON Schema (Draft 7) defining the structure of all mapping entries |

---

## Schema structure

Every mapping entry conforms to `schema.json`. Key fields:

```json
{
  "id": "LLM01",
  "name": "Prompt Injection",
  "source_list": "LLM-Top10-2025",
  "severity": "Critical",
  "aivss_score": 9.1,
  "mappings": [
    {
      "framework": "MITRE ATLAS",
      "control_id": "AML.T0054",
      "control_name": "Prompt Injection",
      "tier": "Foundational",
      "scope": "Both",
      "url": "https://atlas.mitre.org/techniques/AML.T0054",
      "notes": "Primary technique for goal hijack via indirect injection"
    }
  ],
  "tools": [
    { "name": "Garak", "url": "https://github.com/leondz/garak", "type": "open-source" }
  ],
  "incidents": [
    { "name": "EchoLeak", "url": "https://...", "year": 2025 }
  ],
  "crossrefs": {
    "agentic_top10": ["ASI01"],
    "dsgai_2026": ["DSGAI01"]
  },
  "audience": ["developer", "security-engineer", "red-teamer"],
  "changelog": [
    { "date": "2026-03-27", "version": "1.0.0", "change": "Initial entry", "author": "emmanuelgjr" }
  ]
}
```

---

## Validating the schema

```bash
# Install a JSON Schema validator
npm install -g ajv-cli

# Validate a data file against the schema
ajv validate -s data/schema.json -d data/entries/LLM01.json
```

---

## Querying with jq

Common queries using [`jq`](https://stedolan.github.io/jq/):

```bash
# All Critical severity entries across all source lists
jq 'select(.severity == "Critical") | .id' data/entries/*.json

# All entries mapping to ISO 42001
jq 'select(.mappings[].framework == "ISO/IEC 42001:2023") | {id, name}' data/entries/*.json

# All tools that address LLM01
jq 'select(.id == "LLM01") | .tools[].name' data/entries/LLM01.json

# Entries with AIVSS score above 8.0
jq 'select(.aivss_score > 8.0) | {id, name, aivss_score}' data/entries/*.json

# All agentic entries with Foundational-tier mitigations
jq 'select(.source_list == "Agentic-Top10-2026") |
    select(.mappings[].tier == "Foundational") |
    .id' data/entries/*.json

# Framework coverage: which source lists does each framework cover?
jq -s 'group_by(.mappings[].framework) |
        map({framework: .[0].mappings[].framework,
             source_lists: map(.source_list) | unique})' data/entries/*.json
```

---

## Source of truth

The Markdown files in `/llm-top10/`, `/agentic-top10/`, and
`/dsgai-2026/` are the **authoritative source** of all mapping content.
The JSON data in `/data/entries/` (when populated) is derived from
those files and must stay in sync.

If you find a discrepancy between a Markdown file and a JSON entry,
the Markdown file is correct. Update the JSON to match, and open a PR.

---

## Contributing data entries

When adding a new mapping file:
1. Create the Markdown file following `shared/TEMPLATE.md`.
2. Create a corresponding JSON entry in `data/entries/` following `schema.json`.
3. Run `node scripts/validate.js` to confirm both are consistent.
4. Include both files in your PR.

If you are not comfortable with JSON, submit the Markdown-only PR and
note in the PR description that the JSON entry is outstanding — a
maintainer will create it.

---

## Planned enhancements

- `data/entries/` — one JSON file per vulnerability ID (58 initial entries)
- `data/incidents.json` — structured incident database with MAESTRO layer attribution
- `scripts/generate.js` — parse Markdown files and emit JSON entries
- `scripts/query.js` — CLI query interface wrapping jq patterns above
