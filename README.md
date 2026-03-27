<!--
  GenAI Security Crosswalk
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# GenAI Security Crosswalk

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![OWASP Lab](https://img.shields.io/badge/OWASP-GenAI%20Data%20Security-blue)](https://genai.owasp.org)
[![Version](https://img.shields.io/badge/version-1.1.0-green)](CHANGELOG.md)
[![Source Lists](https://img.shields.io/badge/source%20lists-3-blueviolet)](README.md)
[![Mapping Files](https://img.shields.io/badge/mapping%20files-37-brightgreen)](README.md)
[![Frameworks](https://img.shields.io/badge/frameworks-16-orange)](README.md)

The most comprehensive publicly available mapping of OWASP GenAI
security risks to industry frameworks — covering LLM applications,
autonomous agentic AI, and GenAI data security across **16 frameworks**
and **3 OWASP source lists**.

Maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org).

---

## What this repository provides

Every file answers one question:
**"Which controls from framework X address vulnerability Y?"**

Three source lists. Sixteen frameworks. Thirty-seven mapping files.
Thirteen implementation recipes. Forty-plus open-source tools.

All free. All open-source. Built for practitioners.

---

## Source lists

| List | Entries | Version | Status |
|---|---|---|---|
| [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) | LLM01–LLM10 | 2025 | ? 14 framework mappings |
| [OWASP Agentic Top 10](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) | ASI01–ASI10 | 2026 | ? 13 framework mappings |
| [OWASP GenAI Data Security Risks](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/) | DSGAI01–DSGAI21 | 2026 | ? 9 framework mappings |

---

## Framework coverage matrix

| Framework | LLM Top 10 | Agentic Top 10 | DSGAI 2026 |
|---|---|---|---|
| [MITRE ATLAS](https://atlas.mitre.org) | ? | ? | ? |
| [NIST AI RMF 1.0](https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf) | ? | ? | ? |
| [EU AI Act](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) | ? | ? | ? |
| [ISO/IEC 27001:2022](https://www.iso.org/standard/82875.html) | ? | ? | ? |
| [NIST CSF 2.0](https://www.nist.gov/cyberframework) | ? | ? | ? |
| [ISA/IEC 62443](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards) | ? | ? | ? |
| [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) | ? | ? | — |
| [CIS Controls v8.1](https://www.cisecurity.org/controls) | ? | ? | — |
| [OWASP ASVS 4.0.3](https://owasp.org/www-project-application-security-verification-standard/) | ? | ? | — |
| [SOC 2 Trust Services Criteria](https://www.aicpa-cima.com/resources/landing/2017-trust-services-criteria) | ? | — | ? |
| [PCI DSS v4.0](https://www.pcisecuritystandards.org/document_library/) | ? | — | ? |
| [ENISA Multilayer Framework](https://www.enisa.europa.eu/publications/multilayer-framework-for-good-cybersecurity-practices-for-ai) | ? | — | — |
| [OWASP SAMM v2.0](https://owaspsamm.org/) | ? | — | — |
| [NIST SP 800-82 Rev 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf) | ? | — | — |
| [AIUC-1](https://www.aiuc-1.com) | — | ? | — |
| [OWASP NHI Top 10](https://owasp.org/www-project-non-human-identities-top-10/) | — | ? | — |

---

## All mapping files

### LLM Top 10 2025 — 14 framework mappings

| File | Framework | Standout content |
|---|---|---|
| [`LLM_MITREATLAS.md`](llm-top10/LLM_MITREATLAS.md) | MITRE ATLAS | Adversarial technique mapping with real-world incident references |
| [`LLM_NISTAIRMF.md`](llm-top10/LLM_NISTAIRMF.md) | NIST AI RMF 1.0 | GOVERN/MAP/MEASURE/MANAGE per vulnerability with AI RMF profile |
| [`LLM_EUAIAct.md`](llm-top10/LLM_EUAIAct.md) | EU AI Act | Article-level obligations, fines exposure, Aug 2026 compliance checklist |
| [`LLM_ISO27001.md`](llm-top10/LLM_ISO27001.md) | ISO/IEC 27001:2022 | ISMS extension checklist, 2022 new controls mapped |
| [`LLM_ISO42001.md`](llm-top10/LLM_ISO42001.md) | ISO/IEC 42001:2023 | AIMS implementation checklist, ISO 27001 integration guidance |
| [`LLM_CISControls.md`](llm-top10/LLM_CISControls.md) | CIS Controls v8.1 | IG1/IG2/IG3 tiered safeguards per vulnerability |
| [`LLM_ASVS.md`](llm-top10/LLM_ASVS.md) | OWASP ASVS 4.0.3 | L1/L2/L3 verification requirements, ASVS checklist |
| [`LLM_ISA62443.md`](llm-top10/LLM_ISA62443.md) | ISA/IEC 62443 (OT) | Zone model, SL ratings, FR/SR references, OT deployment checklist |
| [`LLM_NISTSP80082.md`](llm-top10/LLM_NISTSP80082.md) | NIST SP 800-82 Rev 3 | SP 800-53 controls, US regulatory crosswalk (NERC CIP, AWIA, CMMC) |
| [`LLM_NISTCSF2.md`](llm-top10/LLM_NISTCSF2.md) | NIST CSF 2.0 | Six-function mapping including new GOVERN function, CSF 2.0 profile |
| [`LLM_SOC2.md`](llm-top10/LLM_SOC2.md) | SOC 2 Trust Services Criteria | TSC mapping for SaaS and cloud LLM deployments |
| [`LLM_PCIDSS.md`](llm-top10/LLM_PCIDSS.md) | PCI DSS v4.0 | CHD scope guidance, Req 3/6/7/10/11/12 per vulnerability |
| [`LLM_ENISA.md`](llm-top10/LLM_ENISA.md) | ENISA Multilayer Framework | L1/L2/L3 layer mapping, EU AI Act and NIS2 alignment table |
| [`LLM_SAMM.md`](llm-top10/LLM_SAMM.md) | OWASP SAMM v2.0 | L1–L3 maturity roadmap per vulnerability, fillable scorecard |

### Agentic Top 10 2026 — 13 framework mappings

| File | Framework | Standout content |
|---|---|---|
| [`Agentic_AIUC1.md`](agentic-top10/Agentic_AIUC1.md) | AIUC-1 | Agentic AI governance certification control mapping |
| [`Agentic_MITREATLAS.md`](agentic-top10/Agentic_MITREATLAS.md) | MITRE ATLAS | Agentic-specific technique chaining, OT amplifiers |
| [`Agentic_NISTAIRMF.md`](agentic-top10/Agentic_NISTAIRMF.md) | NIST AI RMF 1.0 | Autonomy policy anchoring in GV-1.7, AI RMF agentic profile |
| [`Agentic_EUAIAct.md`](agentic-top10/Agentic_EUAIAct.md) | EU AI Act | Art. 14 human oversight per entry, autonomy premium fines analysis |
| [`Agentic_ISO27001.md`](agentic-top10/Agentic_ISO27001.md) | ISO/IEC 27001:2022 | ISMS extension checklist for agentic deployments, NHI as A.8.2 |
| [`Agentic_ISO42001.md`](agentic-top10/Agentic_ISO42001.md) | ISO/IEC 42001:2023 | A.5.2 impact assessment per entry, EU AI Act alignment table |
| [`Agentic_NISTCSF2.md`](agentic-top10/Agentic_NISTCSF2.md) | NIST CSF 2.0 | GOVERN-first autonomy policy mapping, agentic CSF 2.0 profile |
| [`Agentic_ISA62443.md`](agentic-top10/Agentic_ISA62443.md) | ISA/IEC 62443 (OT) | Agentic OT zone model, kill switch design, SL uplift table |
| [`Agentic_OWASP_NHI.md`](agentic-top10/Agentic_OWASP_NHI.md) | OWASP NHI Top 10 | NHI-to-ASI full mapping, NHI programme maturity table |
| [`Agentic_CISControls.md`](agentic-top10/Agentic_CISControls.md) | CIS Controls v8.1 | IG1/IG2/IG3 tiered safeguards, agentic NHI as CIS 5 |
| [`Agentic_ASVS.md`](agentic-top10/Agentic_ASVS.md) | OWASP ASVS 4.0.3 | L1/L2/L3 verification checklist for agentic deployments |
| [`Agentic_AITG.md`](agentic-top10/Agentic_AITG.md) | OWASP AI Testing Guide | 50 test cases across ASI01–ASI10, pre-deployment gates |
| [`Agentic_AIVSS.md`](agentic-top10/Agentic_AIVSS.md) | OWASP AIVSS | Dual-scenario scoring (supervised vs autonomous), autonomy premium analysis |

### DSGAI 2026 — 9 framework mappings

| File | Framework | Standout content |
|---|---|---|
| [`DSGAI_ISO27001.md`](dsgai-2026/DSGAI_ISO27001.md) | ISO/IEC 27001:2022 | ISMS extension for all 21 DSGAI entries |
| [`DSGAI_NISTAIRMF.md`](dsgai-2026/DSGAI_NISTAIRMF.md) | NIST AI RMF 1.0 | GOVERN/MAP/MEASURE/MANAGE per DSGAI entry with profile |
| [`DSGAI_EUAIAct.md`](dsgai-2026/DSGAI_EUAIAct.md) | EU AI Act | Article-level obligations per DSGAI entry, GPAI vs high-risk |
| [`DSGAI_NISTCSF2.md`](dsgai-2026/DSGAI_NISTCSF2.md) | NIST CSF 2.0 | Six-function mapping for all 21 entries, data security profile |
| [`DSGAI_MITREATLAS.md`](dsgai-2026/DSGAI_MITREATLAS.md) | MITRE ATLAS | Adversarial technique mapping, four attack path chains |
| [`DSGAI_ISA62443.md`](dsgai-2026/DSGAI_ISA62443.md) | ISA/IEC 62443 (OT) | OT-specific threat scenarios per entry, SL ratings, OT checklist |
| [`DSGAI_SOC2.md`](dsgai-2026/DSGAI_SOC2.md) | SOC 2 Trust Services Criteria | TSC mapping for SaaS and cloud GenAI deployments |
| [`DSGAI_PCIDSS.md`](dsgai-2026/DSGAI_PCIDSS.md) | PCI DSS v4.0 | CHD scope guidance, PCI audit checklist for GenAI data |
| [`Agentic_CWE_CVE.md`](agentic-top10/Agentic_CWE_CVE.md) | CWE / CVE | Root cause taxonomy, confirmed CVEs, CWE cross-reference index |

### Shared resources

| File | Contents |
|---|---|
| [`shared/RECIPES.md`](shared/RECIPES.md) | 13 security implementation patterns — RAG, MCP, OT agentic |
| [`shared/TOOLS.md`](shared/TOOLS.md) | 40+ open-source security tools catalogue |
| [`shared/GLOSSARY.md`](shared/GLOSSARY.md) | Unified terminology across LLM/ASI/DSGAI |
| [`shared/SEVERITY.md`](shared/SEVERITY.md) | Severity definitions and AIVSS alignment |

---

## Repository structure
```
GenAI-Security-Crosswalk/
+-- README.md               ? You are here
+-- CROSSREF.md             ? Master cross-reference: LLM ? ASI ? DSGAI
+-- CONTRIBUTING.md         ? Contribution guide and file template
+-- CHANGELOG.md            ? Version history
+-- SECURITY.md             ? Vulnerability disclosure policy
+-- CODE_OF_CONDUCT.md      ? Contributor code of conduct
¦
+-- llm-top10/              ? LLM01–LLM10 × 14 frameworks ?
¦   +-- LLM_MITREATLAS.md
¦   +-- LLM_NISTAIRMF.md
¦   +-- LLM_EUAIAct.md
¦   +-- LLM_ISO27001.md
¦   +-- LLM_ISO42001.md
¦   +-- LLM_CISControls.md
¦   +-- LLM_ASVS.md
¦   +-- LLM_ISA62443.md       ? OT/ICS
¦   +-- LLM_NISTSP80082.md    ? OT/ICS
¦   +-- LLM_NISTCSF2.md
¦   +-- LLM_SOC2.md
¦   +-- LLM_PCIDSS.md
¦   +-- LLM_ENISA.md          ? EU/NIS2
¦   +-- LLM_SAMM.md           ? Maturity model
¦
+-- agentic-top10/          ? ASI01–ASI10 × 13 frameworks ?
¦   +-- Agentic_AIUC1.md
¦   +-- Agentic_MITREATLAS.md
¦   +-- Agentic_NISTAIRMF.md
¦   +-- Agentic_EUAIAct.md
¦   +-- Agentic_ISO27001.md
¦   +-- Agentic_ISO42001.md
¦   +-- Agentic_NISTCSF2.md
¦   +-- Agentic_ISA62443.md   ? OT/ICS
¦   +-- Agentic_OWASP_NHI.md  ? Identity
¦   +-- Agentic_CISControls.md
¦   +-- Agentic_ASVS.md
¦   +-- Agentic_AITG.md       ? Testing
¦   +-- Agentic_AIVSS.md      ? Scoring
¦   +-- Agentic_CWE_CVE.md    ? Weakness taxonomy
¦
+-- dsgai-2026/             ? DSGAI01–DSGAI21 × 9 frameworks ?
¦   +-- DSGAI_ISO27001.md
¦   +-- DSGAI_NISTAIRMF.md
¦   +-- DSGAI_EUAIAct.md
¦   +-- DSGAI_NISTCSF2.md
¦   +-- DSGAI_MITREATLAS.md
¦   +-- DSGAI_ISA62443.md     ? OT/ICS
¦   +-- DSGAI_SOC2.md
¦   +-- DSGAI_PCIDSS.md
¦
+-- shared/                 ? Practitioner resources
¦   +-- RECIPES.md          ? 13 security implementation patterns
¦   +-- TOOLS.md            ? 40+ open-source tool catalogue
¦   +-- GLOSSARY.md         ? Unified terminology
¦   +-- SEVERITY.md         ? Severity definitions
¦
+-- data/
¦   +-- schema.json         ? Machine-readable mapping schema
¦
+-- i18n/
    +-- README.md           ? Translation contribution guide
```

---

## Quick navigation

**I need to comply with the EU AI Act by August 2026:**
? [`llm-top10/LLM_EUAIAct.md`](llm-top10/LLM_EUAIAct.md)
? [`agentic-top10/Agentic_EUAIAct.md`](agentic-top10/Agentic_EUAIAct.md)
? [`dsgai-2026/DSGAI_EUAIAct.md`](dsgai-2026/DSGAI_EUAIAct.md)

**I am a European organisation subject to NIS2:**
? [`llm-top10/LLM_ENISA.md`](llm-top10/LLM_ENISA.md)

**I am deploying AI in an OT/ICS environment:**
? [`llm-top10/LLM_ISA62443.md`](llm-top10/LLM_ISA62443.md)
? [`agentic-top10/Agentic_ISA62443.md`](agentic-top10/Agentic_ISA62443.md)
? [`dsgai-2026/DSGAI_ISA62443.md`](dsgai-2026/DSGAI_ISA62443.md)
? [`llm-top10/LLM_NISTSP80082.md`](llm-top10/LLM_NISTSP80082.md)

**I am deploying autonomous agents:**
? [`agentic-top10/Agentic_OWASP_NHI.md`](agentic-top10/Agentic_OWASP_NHI.md) — identity
? [`agentic-top10/Agentic_AIUC1.md`](agentic-top10/Agentic_AIUC1.md) — governance
? [`agentic-top10/Agentic_AIVSS.md`](agentic-top10/Agentic_AIVSS.md) — risk scoring

**I need to build an ISO 27001 ISMS extension for GenAI:**
? [`llm-top10/LLM_ISO27001.md`](llm-top10/LLM_ISO27001.md)
? [`agentic-top10/Agentic_ISO27001.md`](agentic-top10/Agentic_ISO27001.md)
? [`dsgai-2026/DSGAI_ISO27001.md`](dsgai-2026/DSGAI_ISO27001.md)

**I need to build an ISO 42001 AIMS for AI governance:**
? [`llm-top10/LLM_ISO42001.md`](llm-top10/LLM_ISO42001.md)
? [`agentic-top10/Agentic_ISO42001.md`](agentic-top10/Agentic_ISO42001.md)

**I need to measure and improve my security programme maturity:**
? [`llm-top10/LLM_SAMM.md`](llm-top10/LLM_SAMM.md)

**I want to understand the attacker's perspective on GenAI data security:**
? [`dsgai-2026/DSGAI_MITREATLAS.md`](dsgai-2026/DSGAI_MITREATLAS.md)

**I need to score agentic risk for a risk register:**
? [`agentic-top10/Agentic_AIVSS.md`](agentic-top10/Agentic_AIVSS.md) — includes autonomy premium analysis

**I need to build a security test plan for agentic AI:**
? [`agentic-top10/Agentic_AITG.md`](agentic-top10/Agentic_AITG.md) — 50 test cases

**I need concrete implementation code, not framework mappings:**
? [`shared/RECIPES.md`](shared/RECIPES.md) — 13 production patterns with working Python

**I need CWE root causes and CVE evidence for agentic risks:**
? [`agentic-top10/Agentic_CWE_CVE.md`](agentic-top10/Agentic_CWE_CVE.md)

**I want to understand all risks across the three source lists:**
? [`CROSSREF.md`](CROSSREF.md)

---

## Standout coverage

**Complete OT/ICS trilogy** — the only publicly available mapping of
all three OWASP GenAI source lists to ISA/IEC 62443 and NIST SP
800-82 Rev 3. Includes zone model, security level ratings, FR/SR
references, OT-specific threat scenarios, and pre-deployment
checklists. `DSGAI_ISA62443.md` contains the RAG corpus poisoning
scenario — a SafetyProcedure manipulation attack requiring no OT
network access — that exists nowhere else in public documentation.

**Agentic AI autonomy premium** — `Agentic_AIVSS.md` quantifies
what removing human oversight actually costs in risk: average +1.79
AIVSS severity points across all 10 agentic entries. Converts 7 of
10 entries from High to Critical. The quantitative case for mandatory
human oversight in the EU AI Act context.

**Complete agentic identity coverage** — `Agentic_OWASP_NHI.md`
maps every NHI Top 10 entry to every ASI entry. The only public
document translating agentic risks into the NHI controls that IAM
teams already operate.

**SAMM maturity roadmap** — `LLM_SAMM.md` includes a fillable
scorecard with minimum viable maturity levels for production LLM
deployments. The artefact security programme leads use to brief
engineering leadership.

**Implementation recipes** — `shared/RECIPES.md` contains 13
production-ready security patterns with working Python code: access-
controlled RAG retrieval, MCP descriptor integrity verification,
JIT credential management, OT kill switch, behavioural baseline
monitoring, cascade containment, and human confirmation gates.

---

## Contributing

Contributions are welcome — new framework mappings, updated controls,
new implementation recipes, translations, and tool additions.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the file template, PR
process, and contribution guidelines.

---

## License

[Creative Commons Attribution-ShareAlike 4.0 International](LICENSE)

You are free to share and adapt this material for any purpose,
including commercial use, provided you give appropriate credit and
distribute your contributions under the same license.

---

## Acknowledgements

Maintained by [Emmanuel Guilherme Junior](https://github.com/emmanuelgjr)
and the [OWASP GenAI Data Security Initiative](https://genai.owasp.org).

Built on the work of the OWASP LLM Top 10, OWASP Agentic Top 10,
OWASP GenAI Data Security, OWASP NHI Top 10, and OWASP SAMM
project teams.

---

*[genai.owasp.org](https://genai.owasp.org) · [CC BY-SA 4.0](LICENSE)*
