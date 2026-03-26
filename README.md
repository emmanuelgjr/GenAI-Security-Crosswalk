<!--
  GenAI Security Crosswalk
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# GenAI Security Crosswalk

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![OWASP Lab](https://img.shields.io/badge/OWASP-GenAI%20Data%20Security-blue)](https://genai.owasp.org)
[![Version](https://img.shields.io/badge/version-1.0.0-green)](CHANGELOG.md)
[![Frameworks](https://img.shields.io/badge/frameworks-8-orange)](README.md)
[![Source Lists](https://img.shields.io/badge/source%20lists-3-blueviolet)](README.md)
[![Mapping Files](https://img.shields.io/badge/mapping%20files-18-brightgreen)](README.md)

The most comprehensive publicly available mapping of OWASP GenAI security
risks to industry frameworks — covering LLM applications, autonomous
agentic AI, and GenAI data security across 8 frameworks and 3 OWASP
source lists.

Maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org).

---

## What this repository provides

Every file in this repo answers a single question:
**"Which controls from framework X address vulnerability Y?"**

Three source lists. Eight frameworks. Eighteen mapping files.
Thirteen implementation recipes. Forty-plus open-source tools.

All free. All open-source. All built for practitioners.

---

## Source lists

| List | Entries | Published |
|---|---|---|
| [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) | LLM01–LLM10 | 2025 |
| [OWASP Agentic Top 10](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) | ASI01–ASI10 | 2026 |
| [OWASP GenAI Data Security Risks](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/) | DSGAI01–DSGAI21 | 2026 |

---

## Frameworks covered

| Framework | Scope | LLM | Agentic | DSGAI |
|---|---|---|---|---|
| [MITRE ATLAS](https://atlas.mitre.org) | Adversarial ML threat catalogue | ? | ? | — |
| [NIST AI RMF 1.0](https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf) | AI risk governance lifecycle | ? | ? | ? |
| [EU AI Act](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) | EU AI regulation — Aug 2026 | ? | ? | ? |
| [ISO/IEC 27001:2022](https://www.iso.org/standard/82875.html) | Information security management | ? | — | ? |
| [CIS Controls v8.1](https://www.cisecurity.org/controls) | Prioritised cyber safeguards | ? | — | — |
| [OWASP ASVS 4.0.3](https://owasp.org/www-project-application-security-verification-standard/) | Application security verification | ? | — | — |
| [ISA/IEC 62443](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards) | OT/ICS security — industrial | ? | ? | — |
| [NIST SP 800-82 Rev 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf) | OT security — US federal | ? | — | — |
| [AIUC-1](https://www.aiuc-1.com) | Agentic AI governance certification | — | ? | — |
| [OWASP NHI Top 10](https://owasp.org/www-project-non-human-identities-top-10/) | Non-human identity security | — | ? | — |

---

## Repository structure
```
GenAI-Security-Crosswalk/
+-- README.md               ? You are here
+-- CROSSREF.md             ? Master cross-reference: LLM ? ASI ? DSGAI
+-- CONTRIBUTING.md         ? Contribution guide and file template
+-- CHANGELOG.md            ? Version history
+-- SECURITY.md             ? Vulnerability disclosure policy
¦
+-- llm-top10/              ? LLM01–LLM10 × 8 frameworks
¦   +-- LLM_MITREATLAS.md
¦   +-- LLM_NISTAIRMF.md
¦   +-- LLM_EUAIAct.md
¦   +-- LLM_ISO27001.md
¦   +-- LLM_CISControls.md
¦   +-- LLM_ASVS.md
¦   +-- LLM_ISA62443.md         ? OT/ICS
¦   +-- LLM_NISTSP80082.md      ? OT/ICS
¦
+-- agentic-top10/          ? ASI01–ASI10 × 6 frameworks
¦   +-- Agentic_AIUC1.md
¦   +-- Agentic_MITREATLAS.md
¦   +-- Agentic_NISTAIRMF.md
¦   +-- Agentic_EUAIAct.md
¦   +-- Agentic_ISA62443.md     ? OT/ICS
¦   +-- Agentic_OWASP_NHI.md
¦
+-- dsgai-2026/             ? DSGAI01–DSGAI21 × 3 frameworks
¦   +-- DSGAI_ISO27001.md
¦   +-- DSGAI_NISTAIRMF.md
¦   +-- DSGAI_EUAIAct.md
¦
+-- shared/                 ? Practitioner resources
¦   +-- RECIPES.md          ? 13 security implementation patterns
¦   +-- TOOLS.md            ? 40+ open-source tool catalogue
¦   +-- GLOSSARY.md         ? Unified terminology
¦   +-- SEVERITY.md         ? Severity definitions
¦
+-- data/
    +-- schema.json         ? Machine-readable mapping schema
```

---

## Quick navigation

**I need to comply with the EU AI Act by August 2026:**
? [`llm-top10/LLM_EUAIAct.md`](llm-top10/LLM_EUAIAct.md)
? [`agentic-top10/Agentic_EUAIAct.md`](agentic-top10/Agentic_EUAIAct.md)
? [`dsgai-2026/DSGAI_EUAIAct.md`](dsgai-2026/DSGAI_EUAIAct.md)

**I am deploying AI in an OT/ICS environment:**
? [`llm-top10/LLM_ISA62443.md`](llm-top10/LLM_ISA62443.md)
? [`agentic-top10/Agentic_ISA62443.md`](agentic-top10/Agentic_ISA62443.md)
? [`llm-top10/LLM_NISTSP80082.md`](llm-top10/LLM_NISTSP80082.md)

**I am deploying autonomous agents and need to understand identity risks:**
? [`agentic-top10/Agentic_OWASP_NHI.md`](agentic-top10/Agentic_OWASP_NHI.md)
? [`agentic-top10/Agentic_AIUC1.md`](agentic-top10/Agentic_AIUC1.md)

**I need concrete implementation code, not framework mappings:**
? [`shared/RECIPES.md`](shared/RECIPES.md)

**I need to build an ISO 27001 ISMS extension for GenAI:**
? [`llm-top10/LLM_ISO27001.md`](llm-top10/LLM_ISO27001.md)
? [`dsgai-2026/DSGAI_ISO27001.md`](dsgai-2026/DSGAI_ISO27001.md)

**I want to understand all risks across the three source lists:**
? [`CROSSREF.md`](CROSSREF.md)

---

## Standout coverage

**OT/ICS differentiation** — the only public mapping of OWASP GenAI
risks to ISA/IEC 62443 and NIST SP 800-82 Rev 3, with zone models,
security level ratings, and pre-deployment checklists for both LLMs
and autonomous agents in industrial environments.

**Agentic AI identity** — full mapping of the Agentic Top 10 to the
OWASP NHI Top 10, translating agent risks into the credential and
identity controls that IAM teams already operate.

**Implementation recipes** — 13 production-ready patterns with working
Python code covering the most critical security controls: access-controlled
retrieval, MCP descriptor integrity, JIT credentials, OT kill switches,
behavioural baselines, cascade containment, and human confirmation gates.

---

## Contributing

Contributions are welcome — new framework mappings, updated controls,
new implementation recipes, translations, and tool additions.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the file template, PR process,
and contribution guidelines.

---

## License

[Creative Commons Attribution-ShareAlike 4.0 International](LICENSE)

You are free to share and adapt this material for any purpose, including
commercial use, provided you give appropriate credit and distribute
your contributions under the same license.

---

## Acknowledgements

Maintained by [Emmanuel Junior Rodrigues](https://github.com/emmanuelgjr)
and the [OWASP GenAI Data Security Initiative](https://genai.owasp.org).

Built on the work of the OWASP LLM Top 10, OWASP Agentic Top 10,
OWASP GenAI Data Security, and OWASP NHI Top 10 project teams.

---

*[genai.owasp.org](https://genai.owasp.org) · [CC BY-SA 4.0](LICENSE)*
