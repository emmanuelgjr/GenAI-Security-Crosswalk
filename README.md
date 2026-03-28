# GenAI Security Crosswalk
 
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![OWASP Lab](https://img.shields.io/badge/OWASP-GenAI%20Data%20Security-blue)](https://genai.owasp.org)
[![Version](https://img.shields.io/badge/version-1.5.0-green)](CHANGELOG.md)
[![Source Lists](https://img.shields.io/badge/source%20lists-3-blueviolet)](README.md)
[![Mapping Files](https://img.shields.io/badge/mapping%20files-58-brightgreen)](README.md)
[![Frameworks](https://img.shields.io/badge/frameworks-17-orange)](README.md)
 
> The most comprehensive publicly available mapping of OWASP GenAI security risks to industry frameworks — covering LLM applications, autonomous agentic AI, and GenAI data security across **17 frameworks** and **3 OWASP source lists**.
 
Maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org).  
Created by **[Emmanuel Guilherme Junior](https://github.com/emmanuelgjr)**.
 
---
 
## What this repository provides
 
Every file answers one question: **which controls from framework X address vulnerability Y?**
 
| | |
|---|---|
| **3** source lists | LLM Top 10 · Agentic Top 10 · DSGAI 2026 |
| **17** frameworks | Compliance · Governance · Threat modeling · Testing · OT/ICS · Identity |
| **58** mapping files | Every source list entry × every applicable framework |
| **13** implementation recipes | Production-ready Python patterns |
| **40+** open-source tools | Catalogued and organised by function |
 
All free. All open-source. Built for practitioners.
 
---
 
## Source lists
 
| List | Entries | Version | Frameworks mapped |
|---|---|---|---|
| [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) | LLM01–LLM10 | 2025 | 20 |
| [OWASP Agentic Top 10](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) | ASI01–ASI10 | 2026 | 20 |
| [OWASP GenAI Data Security Risks](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/) | DSGAI01–DSGAI21 | 2026 | 18 |
 
---
 
## Framework coverage matrix
 
| Framework | LLM Top 10 | Agentic Top 10 | DSGAI 2026 |
|---|:---:|:---:|:---:|
| [MITRE ATLAS](https://atlas.mitre.org) | ✅ | ✅ | ✅ |
| [NIST AI RMF 1.0](https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf) | ✅ | ✅ | ✅ |
| [EU AI Act](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) | ✅ | ✅ | ✅ |
| [ISO/IEC 27001:2022](https://www.iso.org/standard/82875.html) | ✅ | ✅ | ✅ |
| [NIST CSF 2.0](https://www.nist.gov/cyberframework) | ✅ | ✅ | ✅ |
| [ISA/IEC 62443 — OT/ICS](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards) | ✅ | ✅ | ✅ |
| [MAESTRO — CSA](https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro) | ✅ | ✅ | ✅ |
| [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) | ✅ | ✅ | ✅ |
| [CIS Controls v8.1](https://www.cisecurity.org/controls) | ✅ | ✅ | ✅ |
| [OWASP ASVS 4.0.3](https://owasp.org/www-project-application-security-verification-standard/) | ✅ | ✅ | ✅ |
| [SOC 2 Trust Services Criteria](https://www.aicpa-cima.com/resources/landing/2017-trust-services-criteria) | ✅ | ✅ | ✅ |
| [PCI DSS v4.0](https://www.pcisecuritystandards.org/document_library/) | ✅ | ✅ | ✅ |
| [ENISA Multilayer Framework](https://www.enisa.europa.eu/publications/multilayer-framework-for-good-cybersecurity-practices-for-ai) | ✅ | ✅ | ✅ |
| [OWASP SAMM v2.0](https://owaspsamm.org/) | ✅ | ✅ | ✅ |
| [NIST SP 800-82 Rev 3 — OT/ICS](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf) | ✅ | ✅ | ✅ |
| [AIUC-1](https://www.aiuc-1.com) | ✅ | ✅ | ✅ |
| [OWASP NHI Top 10](https://owasp.org/www-project-non-human-identities-top-10/) | ✅ | ✅ | ✅ |
 
---
 
## All mapping files
 
### LLM Top 10 2025 — 20 framework mappings
 
| File | Framework | Standout content |
|---|---|---|
| [LLM_MITREATLAS.md](llm-top10/LLM_MITREATLAS.md) | MITRE ATLAS | Adversarial technique mapping with real-world incident references |
| [LLM_NISTAIRMF.md](llm-top10/LLM_NISTAIRMF.md) | NIST AI RMF 1.0 | GOVERN/MAP/MEASURE/MANAGE per vulnerability with AI RMF profile |
| [LLM_EUAIAct.md](llm-top10/LLM_EUAIAct.md) | EU AI Act | Article-level obligations, fines exposure, August 2026 compliance checklist |
| [LLM_ISO27001.md](llm-top10/LLM_ISO27001.md) | ISO/IEC 27001:2022 | ISMS extension checklist, 2022 new controls mapped to LLM risks |
| [LLM_ISO42001.md](llm-top10/LLM_ISO42001.md) | ISO/IEC 42001:2023 | AIMS implementation checklist, ISO 27001 integration guidance |
| [LLM_CISControls.md](llm-top10/LLM_CISControls.md) | CIS Controls v8.1 | IG1/IG2/IG3 tiered safeguards per vulnerability |
| [LLM_ASVS.md](llm-top10/LLM_ASVS.md) | OWASP ASVS 4.0.3 | L1/L2/L3 verification requirements with ASVS checklist |
| [LLM_ISA62443.md](llm-top10/LLM_ISA62443.md) | ISA/IEC 62443 — OT/ICS | Zone model, SL ratings, FR/SR references, OT deployment checklist |
| [LLM_NISTSP80082.md](llm-top10/LLM_NISTSP80082.md) | NIST SP 800-82 Rev 3 | SP 800-53 controls, US regulatory crosswalk (NERC CIP, AWIA, CMMC) |
| [LLM_NISTCSF2.md](llm-top10/LLM_NISTCSF2.md) | NIST CSF 2.0 | Six-function mapping including new GOVERN function, CSF 2.0 profile |
| [LLM_SOC2.md](llm-top10/LLM_SOC2.md) | SOC 2 Trust Services Criteria | TSC mapping for SaaS and cloud LLM deployments |
| [LLM_PCIDSS.md](llm-top10/LLM_PCIDSS.md) | PCI DSS v4.0 | CHD scope guidance, Req 3/6/7/10/11/12 per vulnerability |
| [LLM_ENISA.md](llm-top10/LLM_ENISA.md) | ENISA Multilayer Framework | L1/L2/L3 layer mapping, EU AI Act and NIS2 alignment table |
| [LLM_SAMM.md](llm-top10/LLM_SAMM.md) | OWASP SAMM v2.0 | L1–L3 maturity roadmap per vulnerability with fillable scorecard |
| [LLM_STRIDE.md](llm-top10/LLM_STRIDE.md) | STRIDE | Six-category threat model per LLM entry with DFD integration guidance |
| [LLM_CWE_CVE.md](llm-top10/LLM_CWE_CVE.md) | CWE / CVE | CWE root cause taxonomy and confirmed CVE evidence table per entry |
| [LLM_AITG.md](llm-top10/LLM_AITG.md) | OWASP AI Testing Guide | Structured test cases per LLM entry with pass criteria and CI/CD integration guidance |
| [LLM_MAESTRO.md](llm-top10/LLM_MAESTRO.md) | MAESTRO | Seven-layer architectural threat model, layer-to-LLM mapping, 90-minute threat modeling session guide |
| [LLM_AIUC1.md](llm-top10/LLM_AIUC1.md) | AIUC-1 | Six-domain control mapping for LLM deployments — certification readiness checklist |
| [LLM_NHI.md](llm-top10/LLM_NHI.md) | OWASP NHI Top 10 | Credential and identity controls per LLM entry — NHI programme maturity table |

### Agentic Top 10 2026 — 20 framework mappings
 
| File | Framework | Standout content |
|---|---|---|
| [Agentic_AIUC1.md](agentic-top10/Agentic_AIUC1.md) | AIUC-1 | Agentic AI governance certification control mapping |
| [Agentic_MITREATLAS.md](agentic-top10/Agentic_MITREATLAS.md) | MITRE ATLAS | Agentic technique chaining, OT amplifiers per entry |
| [Agentic_NISTAIRMF.md](agentic-top10/Agentic_NISTAIRMF.md) | NIST AI RMF 1.0 | Autonomy policy anchoring in GV-1.7, agentic AI RMF profile |
| [Agentic_EUAIAct.md](agentic-top10/Agentic_EUAIAct.md) | EU AI Act | Art. 14 human oversight per entry, autonomy premium fines analysis |
| [Agentic_ISO27001.md](agentic-top10/Agentic_ISO27001.md) | ISO/IEC 27001:2022 | ISMS extension checklist for agentic deployments, NHI as A.8.2 |
| [Agentic_ISO42001.md](agentic-top10/Agentic_ISO42001.md) | ISO/IEC 42001:2023 | A.5.2 impact assessment per entry, EU AI Act alignment table |
| [Agentic_NISTCSF2.md](agentic-top10/Agentic_NISTCSF2.md) | NIST CSF 2.0 | GOVERN-first autonomy policy mapping, agentic CSF 2.0 profile |
| [Agentic_ISA62443.md](agentic-top10/Agentic_ISA62443.md) | ISA/IEC 62443 — OT/ICS | Agentic OT zone model, kill switch design, SL uplift table |
| [Agentic_MAESTRO.md](agentic-top10/Agentic_MAESTRO.md) | MAESTRO — CSA | Seven-layer architectural threat model, layer-to-ASI mapping, session guide |
| [Agentic_OWASP_NHI.md](agentic-top10/Agentic_OWASP_NHI.md) | OWASP NHI Top 10 | Full NHI-to-ASI cross-mapping, NHI programme maturity table |
| [Agentic_CISControls.md](agentic-top10/Agentic_CISControls.md) | CIS Controls v8.1 | IG1/IG2/IG3 safeguards, agentic NHI treated as CIS 5 privileged access |
| [Agentic_ASVS.md](agentic-top10/Agentic_ASVS.md) | OWASP ASVS 4.0.3 | L1/L2/L3 verification checklist for agentic deployments |
| [Agentic_AITG.md](agentic-top10/Agentic_AITG.md) | OWASP AI Testing Guide | 50 structured test cases across ASI01–ASI10 with pre-deployment gates |
| [Agentic_AIVSS.md](agentic-top10/Agentic_AIVSS.md) | OWASP AIVSS | Dual-scenario scoring (supervised vs autonomous), +1.79 autonomy premium |
| [Agentic_ENISA.md](agentic-top10/Agentic_ENISA.md) | ENISA Multilayer Framework | L1/L2/L3 layer mapping, EU AI Act Art. 14/15/52 alignment, NIS2 Article 23 incident assessment guidance |
| [Agentic_SOC2.md](agentic-top10/Agentic_SOC2.md) | SOC 2 Trust Services Criteria | TSC mapping for agentic AI — autonomous action scope, processing integrity, supply chain criteria |
| [Agentic_PCIDSS.md](agentic-top10/Agentic_PCIDSS.md) | PCI DSS v4.0 | PCI audit guidance for agents with tool access to payment systems, Req 6/7/8/10/11/12 per entry |
| [Agentic_SAMM.md](agentic-top10/Agentic_SAMM.md) | OWASP SAMM v2.0 | L1–L3 maturity scorecard for agentic AI — pre-deployment gates and programme maturity roadmap |
| [Agentic_NISTSP80082.md](agentic-top10/Agentic_NISTSP80082.md) | NIST SP 800-82 Rev 3 | OT agent placement, SP 800-53 controls, U.S. regulatory crosswalk (NERC CIP, AWIA, CMMC) |

> **Also in this folder:** [Agentic_CWE_CVE.md](agentic-top10/Agentic_CWE_CVE.md) — CWE root cause taxonomy, confirmed CVEs, full CWE cross-reference index.

### DSGAI 2026 — 18 framework mappings
 
| File | Framework | Standout content |
|---|---|---|
| [DSGAI_ISO27001.md](dsgai-2026/DSGAI_ISO27001.md) | ISO/IEC 27001:2022 | ISMS extension covering all 21 DSGAI entries |
| [DSGAI_NISTAIRMF.md](dsgai-2026/DSGAI_NISTAIRMF.md) | NIST AI RMF 1.0 | GOVERN/MAP/MEASURE/MANAGE per DSGAI entry with data security profile |
| [DSGAI_EUAIAct.md](dsgai-2026/DSGAI_EUAIAct.md) | EU AI Act | Article-level obligations per entry, GPAI vs high-risk AI scope |
| [DSGAI_NISTCSF2.md](dsgai-2026/DSGAI_NISTCSF2.md) | NIST CSF 2.0 | Six-function mapping for all 21 entries, GenAI data security profile |
| [DSGAI_MITREATLAS.md](dsgai-2026/DSGAI_MITREATLAS.md) | MITRE ATLAS | Adversarial technique mapping, four complete attack path chains |
| [DSGAI_ISA62443.md](dsgai-2026/DSGAI_ISA62443.md) | ISA/IEC 62443 — OT/ICS | OT threat scenarios per entry, SL ratings, full OT checklist |
| [DSGAI_MAESTRO.md](dsgai-2026/DSGAI_MAESTRO.md) | MAESTRO — CSA | Layer-origin analysis for all 21 entries, L2 data operations as 52% of DSGAI threat surface |
| [DSGAI_SOC2.md](dsgai-2026/DSGAI_SOC2.md) | SOC 2 Trust Services Criteria | TSC mapping for SaaS and cloud GenAI deployments |
| [DSGAI_PCIDSS.md](dsgai-2026/DSGAI_PCIDSS.md) | PCI DSS v4.0 | CHD scope guidance, PCI audit checklist for GenAI data |
| [DSGAI_ASVS.md](dsgai-2026/DSGAI_ASVS.md) | OWASP ASVS 4.0.3 | L1/L2/L3 verification requirements for all 21 DSGAI entries, 4-phase implementation priority |
| [DSGAI_CISControls.md](dsgai-2026/DSGAI_CISControls.md) | CIS Controls v8.1 | IG1/IG2/IG3 safeguards for all 21 entries, GenAI data security implementation groups |
| [DSGAI_CWE_CVE.md](dsgai-2026/DSGAI_CWE_CVE.md) | CWE / CVE | CWE root cause taxonomy and confirmed CVE evidence for all 21 DSGAI entries |
| [DSGAI_ENISA.md](dsgai-2026/DSGAI_ENISA.md) | ENISA Multilayer Framework | L1/L2/L3 layer mapping, EU AI Act and NIS2 alignment for all 21 DSGAI entries |
| [DSGAI_ISO42001.md](dsgai-2026/DSGAI_ISO42001.md) | ISO/IEC 42001:2023 | AIMS controls per DSGAI entry, ISO 27001 integration guidance, A.7 data governance reference |
| [DSGAI_SAMM.md](dsgai-2026/DSGAI_SAMM.md) | OWASP SAMM v2.0 | L1–L3 maturity scorecard for GenAI data security — GDPR and regulatory compliance baseline |
| [DSGAI_NISTSP80082.md](dsgai-2026/DSGAI_NISTSP80082.md) | NIST SP 800-82 Rev 3 | OT data placement, SP 800-53 controls per DSGAI entry, NERC CIP/FISMA/CMMC crosswalk |
| [DSGAI_AIUC1.md](dsgai-2026/DSGAI_AIUC1.md) | AIUC-1 | Domain A (Data & Privacy) covers 50%+ of DSGAI entries — certification readiness table |
| [DSGAI_NHI.md](dsgai-2026/DSGAI_NHI.md) | OWASP NHI Top 10 | NHI as enabling condition for DSGAI risks — NHI programme maturity table for GenAI data |

### Shared resources
 
| File | Contents |
|---|---|
| [shared/RECIPES.md](shared/RECIPES.md) | 13 security implementation patterns with working Python — RAG, MCP, OT, agentic |
| [shared/TOOLS.md](shared/TOOLS.md) | 40+ open-source security tools organised by function |
| [shared/GLOSSARY.md](shared/GLOSSARY.md) | Unified terminology across LLM, ASI, and DSGAI source lists |
| [shared/SEVERITY.md](shared/SEVERITY.md) | Severity definitions and AIVSS alignment |
 
---
 
## Repository structure
 
```text
GenAI-Security-Crosswalk/
│
├── README.md
├── CROSSREF.md                      ← Master cross-reference: LLM ↔ ASI ↔ DSGAI
├── CONTRIBUTING.md
├── CHANGELOG.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
│
├── llm-top10/                       ← LLM01–LLM10 × 20 frameworks
│   ├── LLM_MITREATLAS.md
│   ├── LLM_NISTAIRMF.md
│   ├── LLM_EUAIAct.md
│   ├── LLM_ISO27001.md
│   ├── LLM_ISO42001.md
│   ├── LLM_CISControls.md
│   ├── LLM_ASVS.md
│   ├── LLM_ISA62443.md              ← OT/ICS
│   ├── LLM_NISTSP80082.md           ← OT/ICS
│   ├── LLM_NISTCSF2.md
│   ├── LLM_SOC2.md
│   ├── LLM_PCIDSS.md
│   ├── LLM_ENISA.md                 ← EU / NIS2
│   ├── LLM_SAMM.md                  ← Maturity model
│   ├── LLM_STRIDE.md                ← Threat modeling
│   ├── LLM_CWE_CVE.md               ← Root cause taxonomy + CVEs
│   ├── LLM_AITG.md                  ← AI Testing Guide
│   ├── LLM_MAESTRO.md               ← MAESTRO seven-layer threat model
│   ├── LLM_AIUC1.md                 ← AIUC-1 certification framework
│   └── LLM_NHI.md                   ← Non-Human Identity controls
│
├── agentic-top10/                   ← ASI01–ASI10 × 20 frameworks
│   ├── Agentic_AIUC1.md
│   ├── Agentic_MITREATLAS.md
│   ├── Agentic_NISTAIRMF.md
│   ├── Agentic_EUAIAct.md
│   ├── Agentic_ISO27001.md
│   ├── Agentic_ISO42001.md
│   ├── Agentic_NISTCSF2.md
│   ├── Agentic_ISA62443.md          ← OT/ICS
│   ├── Agentic_MAESTRO.md           ← Threat modeling — 7-layer architecture
│   ├── Agentic_OWASP_NHI.md         ← Non-Human Identity
│   ├── Agentic_CISControls.md
│   ├── Agentic_ASVS.md
│   ├── Agentic_AITG.md              ← AI Testing Guide — 50 test cases
│   ├── Agentic_AIVSS.md             ← Risk scoring — autonomy premium
│   ├── Agentic_CWE_CVE.md           ← CWE taxonomy + confirmed CVEs
│   ├── Agentic_ENISA.md             ← EU / NIS2
│   ├── Agentic_SOC2.md              ← SOC 2 TSC — agentic AI audit
│   ├── Agentic_PCIDSS.md            ← PCI DSS v4.0 — payment system agents
│   ├── Agentic_SAMM.md              ← Maturity model — pre-deployment gates
│   └── Agentic_NISTSP80082.md       ← OT/ICS — U.S. regulatory alignment
│
├── dsgai-2026/                      ← DSGAI01–DSGAI21 × 18 frameworks
│   ├── DSGAI_ISO27001.md
│   ├── DSGAI_NISTAIRMF.md
│   ├── DSGAI_EUAIAct.md
│   ├── DSGAI_NISTCSF2.md
│   ├── DSGAI_MITREATLAS.md
│   ├── DSGAI_ISA62443.md            ← OT/ICS
│   ├── DSGAI_MAESTRO.md             ← Threat modeling — data operations lens
│   ├── DSGAI_SOC2.md
│   ├── DSGAI_PCIDSS.md
│   ├── DSGAI_ASVS.md                ← OWASP ASVS 4.0.3
│   ├── DSGAI_CISControls.md         ← CIS Controls v8.1
│   ├── DSGAI_CWE_CVE.md             ← Root cause taxonomy + CVEs
│   ├── DSGAI_ENISA.md               ← EU / NIS2
│   ├── DSGAI_ISO42001.md            ← AI management system
│   ├── DSGAI_SAMM.md                ← Maturity model — data security programme
│   ├── DSGAI_NISTSP80082.md         ← OT/ICS — U.S. regulatory alignment
│   ├── DSGAI_AIUC1.md               ← AIUC-1 certification framework
│   └── DSGAI_NHI.md                 ← Non-Human Identity — data pipeline credentials
│
├── shared/
│   ├── RECIPES.md                   ← 13 implementation patterns (Python code)
│   ├── TOOLS.md                     ← 40+ open-source tools catalogue
│   ├── GLOSSARY.md                  ← Unified terminology
│   └── SEVERITY.md                  ← Severity definitions + AIVSS alignment
│
├── data/
│   └── schema.json                  ← Machine-readable mapping schema
│
└── i18n/
    ├── README.md                    ← Translation contribution guide
    ├── es/                          ← Spanish (community, in progress)
    └── pt/                          ← Portuguese (community, in progress)
```
 
---
 
## Quick navigation
 
**EU AI Act compliance by August 2026**
→ [LLM_EUAIAct.md](llm-top10/LLM_EUAIAct.md) · [Agentic_EUAIAct.md](agentic-top10/Agentic_EUAIAct.md) · [DSGAI_EUAIAct.md](dsgai-2026/DSGAI_EUAIAct.md)
 
**European organisation subject to NIS2**
→ [LLM_ENISA.md](llm-top10/LLM_ENISA.md) — ENISA framework with NIS2 Article 23 incident assessment guidance
 
**AI in OT/ICS environments**
→ [LLM_ISA62443.md](llm-top10/LLM_ISA62443.md) · [Agentic_ISA62443.md](agentic-top10/Agentic_ISA62443.md) · [DSGAI_ISA62443.md](dsgai-2026/DSGAI_ISA62443.md) · [LLM_NISTSP80082.md](llm-top10/LLM_NISTSP80082.md)
 
**Deploying autonomous agents**
→ [Agentic_OWASP_NHI.md](agentic-top10/Agentic_OWASP_NHI.md) — identity governance
→ [Agentic_AIUC1.md](agentic-top10/Agentic_AIUC1.md) — agentic governance certification
→ [Agentic_AIVSS.md](agentic-top10/Agentic_AIVSS.md) — risk scoring with autonomy premium
 
**Threat modeling an agentic AI system before selecting controls**
→ [Agentic_MAESTRO.md](agentic-top10/Agentic_MAESTRO.md) — MAESTRO seven-layer threat enumeration with session guide
→ [DSGAI_MAESTRO.md](dsgai-2026/DSGAI_MAESTRO.md) — MAESTRO data operations lens for all 21 DSGAI entries
 
**ISO 27001 ISMS extension for GenAI**
→ [LLM_ISO27001.md](llm-top10/LLM_ISO27001.md) · [Agentic_ISO27001.md](agentic-top10/Agentic_ISO27001.md) · [DSGAI_ISO27001.md](dsgai-2026/DSGAI_ISO27001.md)
 
**ISO 42001 AIMS for AI governance**
→ [LLM_ISO42001.md](llm-top10/LLM_ISO42001.md) · [Agentic_ISO42001.md](agentic-top10/Agentic_ISO42001.md) — includes EU AI Act compliance evidence table
 
**Security programme maturity**
→ [LLM_SAMM.md](llm-top10/LLM_SAMM.md) — SAMM L1–L3 roadmap with fillable scorecard
 
**Security test plan for agentic AI**
→ [Agentic_AITG.md](agentic-top10/Agentic_AITG.md) — 50 structured test cases, pre-deployment gates, OT addendum
 
**Risk register scoring for agentic AI**
→ [Agentic_AIVSS.md](agentic-top10/Agentic_AIVSS.md) — supervised vs autonomous dual-scenario scoring, avg +1.79 autonomy premium
 
**Attacker perspective on GenAI risks**
→ [DSGAI_MITREATLAS.md](dsgai-2026/DSGAI_MITREATLAS.md) — ATLAS technique mapping, four attack path chains
→ [Agentic_MITREATLAS.md](agentic-top10/Agentic_MITREATLAS.md) — agentic technique chaining
 
**CWE root causes and confirmed CVEs**
→ [Agentic_CWE_CVE.md](agentic-top10/Agentic_CWE_CVE.md) — root cause taxonomy, CVE evidence, cross-reference index
 
**Implementation code, not framework theory**
→ [shared/RECIPES.md](shared/RECIPES.md) — 13 production patterns with working Python
 
**All risks across all three source lists**
→ [CROSSREF.md](CROSSREF.md) — master cross-reference
 
---
 
## Standout coverage
 
### Complete OT/ICS trilogy
 
The only publicly available mapping of all three OWASP GenAI source lists to ISA/IEC 62443 and NIST SP 800-82 Rev 3. Includes zone model placement, security level ratings, Fundamental Requirement and Security Requirement references, OT-specific threat scenarios, and pre-deployment checklists for each source list.
 
The RAG corpus poisoning scenario in [DSGAI_ISA62443.md](dsgai-2026/DSGAI_ISA62443.md) — a safety procedure manipulation attack that modifies maintenance intervals without any OT network access — exists nowhere else in public documentation.
 
### MAESTRO seven-layer threat modeling
 
[Agentic_MAESTRO.md](agentic-top10/Agentic_MAESTRO.md) and [DSGAI_MAESTRO.md](dsgai-2026/DSGAI_MAESTRO.md) are the only public mappings of OWASP GenAI risks to the MAESTRO framework from the Cloud Security Alliance. Unlike every other file in this repo — which maps risks to controls — MAESTRO maps each risk to the **architectural layer where it originates**, telling you which team owns the problem and where in the system the fix must be deployed.
 
Key finding from the DSGAI mapping: **L2 Data Operations is the originating layer for 52% of all DSGAI entries**. An organisation that does not treat RAG corpora, embedding stores, training pipelines, and memory systems as security-critical infrastructure is under-defended against the majority of the GenAI data security threat landscape.
 
### Agentic autonomy premium
 
[Agentic_AIVSS.md](agentic-top10/Agentic_AIVSS.md) quantifies what removing human oversight costs in risk: average **+1.79 AIVSS severity points** across all 10 agentic entries. Removing human oversight converts 7 of 10 entries from High to Critical — the quantitative case for mandatory human oversight under EU AI Act Article 14.
 
### Complete agentic identity coverage
 
[Agentic_OWASP_NHI.md](agentic-top10/Agentic_OWASP_NHI.md) maps every NHI Top 10 entry to every ASI entry — the only public document translating agentic security risks into the NHI controls that IAM teams already operate.
 
### SAMM maturity scorecard
 
[LLM_SAMM.md](llm-top10/LLM_SAMM.md) includes a fillable maturity scorecard with minimum viable levels per SAMM practice for any LLM production deployment — the artefact security programme leads use to brief engineering leadership on where the programme stands and what to improve next.
 
### Production implementation recipes
 
[shared/RECIPES.md](shared/RECIPES.md) contains 13 production-ready security patterns with working Python: access-controlled RAG retrieval, MCP descriptor integrity verification, JIT credential issuance, OT kill switch, behavioural baseline monitoring, cascade containment, and human confirmation gates.
 
---
 
## Contributing
 
Contributions are welcome — new framework mappings, updated controls, new implementation recipes, translations, and additional tool entries.
 
See [CONTRIBUTING.md](CONTRIBUTING.md) for the file template, PR process, and contribution guidelines. All contributors are listed in the CHANGELOG.
 
---
 
## License
 
[Creative Commons Attribution-ShareAlike 4.0 International](LICENSE)
 
Free to share and adapt for any purpose, including commercial use, with appropriate credit and distribution under the same license.
 
---
 
## Acknowledgements
 
Created and maintained by **[Emmanuel Guilherme Junior](https://github.com/emmanuelgjr)** and the [OWASP GenAI Data Security Initiative](https://genai.owasp.org).
 
Built on the work of the OWASP LLM Top 10, OWASP Agentic Top 10, OWASP GenAI Data Security, OWASP NHI Top 10, and OWASP SAMM project teams.
 
Special thanks to [Ken Huang](https://github.com/kenhuangus) (Cloud Security Alliance) for the MAESTRO framework and his contributions to the OWASP LLM Top 10.
 
---
 
*[genai.owasp.org](https://genai.owasp.org) · [CC BY-SA 4.0](LICENSE)*
