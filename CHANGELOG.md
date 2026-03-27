# Changelog

All notable changes to the GenAI Security Crosswalk are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---


## [1.1.2] — 2026-03-27

### Corrections

- Removed 38 empty placeholder files that had never been populated
- Fixed mapping file count in README: 39 — 38
- Fixed per-source-list framework counts: Agentic 14 — 15, DSGAI 10 — 9

---

## [1.1.1] — 2026-03-27

### Corrections

- **License**: replaced incorrect MIT license text in `LICENSE.md` with CC BY-SA 4.0 — aligns with the license declared in `README.md`, all mapping file headers, and `CONTRIBUTING.md`

---

## [1.1.0] � 2026-03-26

### Sprint completion � all three source lists fully mapped

All planned framework mappings are now complete.

#### New mapping files (19 added since v1.0.0)

| File | Framework |
|---|---|
| `llm-top10/LLM_NISTCSF2.md` | NIST CSF 2.0 |
| `llm-top10/LLM_ISO42001.md` | ISO/IEC 42001:2023 |
| `llm-top10/LLM_ENISA.md` | ENISA Multilayer Framework |
| `llm-top10/LLM_SAMM.md` | OWASP SAMM v2.0 |
| `llm-top10/LLM_PCIDSS.md` | PCI DSS v4.0 |
| `llm-top10/LLM_SOC2.md` | SOC 2 Trust Services Criteria |
| `agentic-top10/Agentic_NISTCSF2.md` | NIST CSF 2.0 |
| `agentic-top10/Agentic_ISO27001.md` | ISO/IEC 27001:2022 |
| `agentic-top10/Agentic_ISO42001.md` | ISO/IEC 42001:2023 |
| `agentic-top10/Agentic_CISControls.md` | CIS Controls v8.1 |
| `agentic-top10/Agentic_ASVS.md` | OWASP ASVS 4.0.3 |
| `agentic-top10/Agentic_AITG.md` | OWASP AI Testing Guide |
| `agentic-top10/Agentic_AIVSS.md` | OWASP AIVSS |
| `agentic-top10/Agentic_CWE_CVE.md` | CWE / CVE |
| `dsgai-2026/DSGAI_NISTCSF2.md` | NIST CSF 2.0 |
| `dsgai-2026/DSGAI_MITREATLAS.md` | MITRE ATLAS |
| `dsgai-2026/DSGAI_ISA62443.md` | ISA/IEC 62443 |
| `dsgai-2026/DSGAI_SOC2.md` | SOC 2 Trust Services Criteria |
| `dsgai-2026/DSGAI_PCIDSS.md` | PCI DSS v4.0 |

#### Infrastructure files added

- `CODE_OF_CONDUCT.md` � Contributor Covenant 2.1
- `SECURITY.md` � Vulnerability disclosure policy
- `i18n/README.md` � Translation contribution guide

#### Totals at v1.1.0

| Metric | Count |
|---|---|
| Source lists | 3 |
| Frameworks | 16 |
| Mapping files | 37 |
| Implementation recipes | 13 |
| Tools catalogued | 40+ |

## [1.0.0] � 2026-03-24

### First public release � v1.0

The GenAI Security Crosswalk v1.0 is the most comprehensive publicly
available mapping of OWASP GenAI security risks to industry frameworks.

---

### Source lists covered

| List | Entries | Version |
|---|---|---|
| OWASP LLM Top 10 | LLM01�LLM10 | 2025 |
| OWASP Agentic Top 10 | ASI01�ASI10 | 2026 |
| OWASP GenAI Data Security Risks | DSGAI01�DSGAI21 | 2026 |

---

### Framework mappings added (18 files)

#### LLM Top 10 � frameworks

| File | Framework |
|---|---|
| `llm-top10/LLM_MITREATLAS.md` | MITRE ATLAS |
| `llm-top10/LLM_NISTAIRMF.md` | NIST AI RMF 1.0 |
| `llm-top10/LLM_EUAIAct.md` | EU AI Act (Regulation EU 2024/1689) |
| `llm-top10/LLM_ISO27001.md` | ISO/IEC 27001:2022 |
| `llm-top10/LLM_CISControls.md` | CIS Controls v8.1 |
| `llm-top10/LLM_ASVS.md` | OWASP ASVS 4.0.3 |
| `llm-top10/LLM_ISA62443.md` | ISA/IEC 62443 (OT) |
| `llm-top10/LLM_NISTSP80082.md` | NIST SP 800-82 Rev 3 (OT) |

#### Agentic Top 10 � frameworks

| File | Framework |
|---|---|
| `agentic-top10/Agentic_AIUC1.md` | AIUC-1 |
| `agentic-top10/Agentic_MITREATLAS.md` | MITRE ATLAS |
| `agentic-top10/Agentic_NISTAIRMF.md` | NIST AI RMF 1.0 |
| `agentic-top10/Agentic_EUAIAct.md` | EU AI Act (Regulation EU 2024/1689) |
| `agentic-top10/Agentic_ISA62443.md` | ISA/IEC 62443 (OT) |
| `agentic-top10/Agentic_OWASP_NHI.md` | OWASP NHI Top 10 |

#### DSGAI 2026 � frameworks

| File | Framework |
|---|---|
| `dsgai-2026/DSGAI_ISO27001.md` | ISO/IEC 27001:2022 |
| `dsgai-2026/DSGAI_NISTAIRMF.md` | NIST AI RMF 1.0 |
| `dsgai-2026/DSGAI_EUAIAct.md` | EU AI Act (Regulation EU 2024/1689) |

#### Shared resources

| File | Contents |
|---|---|
| `shared/RECIPES.md` | 13 security implementation patterns � RAG, MCP, OT |
| `shared/TOOLS.md` | Open-source security tools catalogue � 40+ tools |
| `shared/GLOSSARY.md` | Unified terminology across LLM/ASI/DSGAI |
| `shared/SEVERITY.md` | Severity definitions and AIVSS alignment |

#### Repository infrastructure

| File | Contents |
|---|---|
| `README.md` | Navigation hub, framework list, repo layout |
| `CROSSREF.md` | Master cross-reference: LLM ? ASI ? DSGAI |
| `CONTRIBUTING.md` | Contribution guide and file template |
| `data/schema.json` | Machine-readable schema for all mapping entries |

---

### Highlights

**OT/ICS coverage** � The only publicly available comprehensive mapping
of OWASP GenAI risks to ISA/IEC 62443 and NIST SP 800-82 Rev 3, covering
both static LLM deployments and autonomous agentic AI in industrial
environments. Includes zone model, security level ratings, foundational
requirement references, and pre-deployment checklists.

**Agentic AI identity** � Full mapping of all 10 Agentic Top 10 entries
to the OWASP NHI Top 10, translating agentic risks into the NHI controls
that IAM teams already manage. The most actionable file in the repo for
security engineers.

**DSGAI full coverage** � All 21 DSGAI 2026 entries mapped to three
regulatory frameworks (ISO 27001, NIST AI RMF, EU AI Act) � the first
public mapping of the complete DSGAI taxonomy.

**Implementation recipes** � 13 production-ready security patterns with
copy-paste Python code covering access-controlled RAG retrieval, MCP
descriptor integrity verification, per-session JIT credentials, OT kill
switch implementation, agent behavioural baselines, cascade containment,
and human confirmation gates.

**EU AI Act compliance** � August 2026 deadline compliance checklists
in every EU AI Act mapping file � Article-level obligations, fines
exposure per entry, and GPAI vs high-risk applicability clearly marked.

---

## [Unreleased]

### Planned

#### New framework mappings
- `llm-top10/LLM_STRIDE.md` — STRIDE threat modeling
- `llm-top10/LLM_CWE_CVE.md` — CWE root cause taxonomy and CVE evidence
- `llm-top10/LLM_AITG.md` — OWASP AI Testing Guide
- `dsgai-2026/DSGAI_ASVS.md` — OWASP ASVS 4.0.3
- `dsgai-2026/DSGAI_CISControls.md` — CIS Controls v8.1
- `dsgai-2026/DSGAI_CWE_CVE.md` — CWE root cause taxonomy and CVE evidence
- `dsgai-2026/DSGAI_ENISA.md` — ENISA Multilayer Framework

---

## Versioning policy

| Change type | Version bump | Examples |
|---|---|---|
| New framework mapping file | Minor (x.Y.0) | New LLM_SAMM.md file |
| New source list coverage | Minor (x.Y.0) | New DSGAI entries added |
| Updated mapping content | Patch (x.y.Z) | Control updates, new CVE references |
| New recipe | Patch (x.y.Z) | New RECIPES.md entry |
| Breaking schema change | Major (X.0.0) | Schema.json restructure |
| Org transfer or rename | Major (X.0.0) | Transfer to GenAI-Security-Project |

---

## How to contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution guide.

Quick reference:
- New mapping file: copy the template from `CONTRIBUTING.md`, open a PR
- Update existing mapping: edit the file, update the changelog entry
- New tool: add to `shared/TOOLS.md`, follow the tool addition template
- New recipe: add to `shared/RECIPES.md`, follow the recipe template
- Translation: add to `i18n/<lang>/`, note original file version translated

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) �
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*

