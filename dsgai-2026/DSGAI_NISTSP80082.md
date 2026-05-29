<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks 2026 (DSGAI01-DSGAI21)
  Framework   : NIST SP 800-82 Rev 3 — Guide to Operational Technology (OT) Security
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 × NIST SP 800-82 Rev 3

Mapping the [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
(DSGAI01–DSGAI21) to [NIST SP 800-82 Rev 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf) —
the authoritative guide to securing Operational Technology (OT) and industrial
control systems, with SP 800-53 Rev 5 control references throughout.

---

## Why SP 800-82 Rev 3 for GenAI data security in OT

The DSGAI taxonomy documents data-oriented risks that originate in
the data layer: training pipelines, embedding stores, RAG corpora,
inference logs. In OT environments, these data flows carry a second
risk dimension — they also carry **process data, equipment state,
safety parameters, and operational intelligence** about industrial
systems.

SP 800-82 Rev 3 is directly applicable because:

**OT data is GenAI data.** When GenAI systems are deployed in OT
environments, DSGAI risks affect OT data: historian data poisoned
via DSGAI04, RAG corpora containing P&ID drawings and safety
procedures manipulated via DSGAI04/DSGAI13, inference logs exposing
process parameters via DSGAI14/DSGAI15.

**Rev 3 addresses data integrity explicitly.** SP 800-82 Rev 3's
expanded coverage of data integrity, remote access, and cloud
integration (Sections 5.3, 5.4, 7.3) maps directly to DSGAI's
data-security risk taxonomy.

**Federal and sector regulatory alignment.** For FISMA-covered federal
OT deployments, DoD contractors under CMMC, and critical infrastructure
subject to NERC CIP or AWIA, SP 800-82 is the authoritative reference
— and these organisations are increasingly deploying GenAI with OT data.

---

## SP 800-82 Rev 3 structure

| Section | Title | DSGAI relevance |
|---|---|---|
| Section 4 | OT Overview and Key Differences from IT | Architecture context for GenAI data placement |
| Section 5 | OT Threats and Vulnerabilities | Data-focused OT threat categories |
| Section 6 | Risk Management | Risk assessment for GenAI data integration |
| Section 7 | Recommended Security Architecture | Network architecture for data flows |
| Section 8 | OT Security Program | Data governance, supply chain, programme controls |
| Appendix G | Network Architecture Examples | Reference architecture for GenAI data placement |

---

## Quick-reference summary

| ID | Name | OT Severity | SP 800-82 Sections | SP 800-53 Controls | Tier |
|---|---|---|---|---|---|
| DSGAI01 | Sensitive Data Leakage | **Critical** | 5.4, 6.2, 7.3 | SC-28, AC-3, AU-9 | Foundational–Advanced |
| DSGAI02 | Agent Identity & Credential Exposure | **Critical** | 5.3, 6.2, 7.2 | IA-5, AC-6, SC-28 | Hardening–Advanced |
| DSGAI03 | Shadow AI & Unsanctioned Data Flows | High | 5.5, 6.2, 7.1 | AC-4, AC-20, AU-12 | Foundational–Hardening |
| DSGAI04 | Data, Model & Artifact Poisoning | **Critical** | 5.3, 6.2, 7.2 | SI-7, SI-10, AU-12 | Hardening–Advanced |
| DSGAI05 | Data Integrity & Validation Failures | High | 5.3, 6.2, 7.2 | SI-10, SI-7, SI-3 | Foundational–Hardening |
| DSGAI06 | Tool, Plugin & Agent Data Exchange | High | 5.5, 6.3, 7.3 | SA-9, AC-4, SC-7 | Foundational–Hardening |
| DSGAI07 | Data Governance, Lifecycle & Classification | High | 6.2, 8.2 | RA-2, AC-3, AU-11 | Foundational–Hardening |
| DSGAI08 | Non-Compliance & Regulatory Violations | High | 6.2, 8.2 | AU-12, AC-3, AC-6 | Foundational–Hardening |
| DSGAI09 | Multimodal Cross-Channel Data Leakage | High | 5.4, 6.2, 7.3 | SC-28, SI-10, AC-3 | Hardening–Advanced |
| DSGAI10 | Synthetic Data & Anonymisation Pitfalls | Medium | 5.4, 6.2 | SC-28, RA-2, SI-7 | Hardening–Advanced |
| DSGAI11 | Cross-Context Conversation Bleed | High | 5.3, 6.2, 7.3 | SC-4, AC-3, SC-28 | Hardening–Advanced |
| DSGAI12 | Unsafe NL Data Gateways | **Critical** | 5.3, 6.2, 7.2 | SI-10, AC-3, AC-6 | Foundational–Advanced |
| DSGAI13 | Vector Store Platform Security | High | 5.4, 7.1, 7.3 | SC-28, AC-3, CM-6 | Foundational–Hardening |
| DSGAI14 | Excessive Telemetry & Monitoring Leakage | High | 5.4, 6.2, 7.3 | AU-9, SC-28, AU-11 | Foundational–Hardening |
| DSGAI15 | Over-Broad Context Windows | High | 5.3, 6.2, 7.3 | AC-6, SC-4, AC-3 | Hardening–Advanced |
| DSGAI16 | Endpoint & Browser Assistant Overreach | High | 5.3, 6.2, 7.1 | AC-3, AC-6, SC-7 | Foundational–Hardening |
| DSGAI17 | Data Availability & Resilience Failures | High | 5.6, 6.2, 7.2 | CP-9, CP-10, SC-5 | Foundational–Hardening |
| DSGAI18 | Inference & Data Reconstruction | High | 5.4, 6.2, 7.3 | SC-28, AC-6, AU-12 | Hardening–Advanced |
| DSGAI19 | Human-in-Loop & Labeler Overexposure | Medium | 5.4, 6.2, 7.3 | AC-3, AC-6, AU-9 | Foundational–Hardening |
| DSGAI20 | Model Exfiltration & IP Replication | High | 5.4, 6.2, 7.3 | AC-6, SC-28, SC-7 | Hardening–Advanced |
| DSGAI21 | Disinformation via Data Poisoning | High | 5.5, 6.3, 8.4 | SI-7, SR-3, AU-12 | Hardening–Advanced |

---

## Audience tags

- **OT security engineer** — full file, primary implementation reference
- **Federal agency security officer** — SP 800-53 control mapping, FISMA alignment
- **Data engineer (OT)** — DSGAI04, DSGAI05, DSGAI13 — pipeline and store integrity
- **CISO (critical infrastructure)** — Section 6 risk management, DSGAI08, DSGAI17
- **CMMC / FedRAMP assessor** — SP 800-53 control identifiers per DSGAI entry
- **ML/AI engineer (OT context)** — DSGAI04, DSGAI21 — data supply-chain integrity

---

## GenAI data placement in SP 800-82 network architecture

```
Enterprise Zone (Level 4-5)
    ↓ [Firewall — HTTPS only, no direct OT protocol access]
DMZ / Demilitarized Zone (Level 3.5)
    → GenAI inference systems SHOULD be deployed here
    → RAG corpora containing OT data MUST be isolated in this zone
    → Training data stores with OT data MUST be isolated here
    ↓ [Application-layer firewall — read-only OT data access via historian/API]
OT Network Zone (Level 3 — Site Operations)
    → Historians and data aggregators export read-only data upward
    → No GenAI system writes to OT Zone without authenticated, human-confirmed action
    ↓ [Unidirectional gateway recommended for most data flows]
Control Zone (Level 2 — Supervisory)
Field Device Zone (Level 1 — Basic Control)
    → No GenAI system has direct access to Level 1-2 data in real-time
```

**Key principle from SP 800-82 Section 7.3:**
OT data flowing to GenAI systems must be read-only, time-bounded, and
integrity-verified before use. Any GenAI output that could affect OT
operations requires authenticated, human-confirmed action path.

---

## Detailed mappings

---

### DSGAI01 — Sensitive Data Leakage

Process data, equipment state, and safety parameters leak through model
outputs, RAG over-retrieval, or inference logs — exposing operational
intelligence about industrial systems.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.4 | Data security & remote access | OT data at rest/in transit to GenAI must be protected |
| §6.2 | Risk assessment | Assess disclosure risk for each OT data class fed to GenAI |
| §7.3 | Data flow controls | Read-only, scoped OT data access for inference/RAG |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SC-28 | Protection of Information at Rest | Encrypt OT corpora and training stores |
| AC-3 | Access Enforcement | Deny-by-default retrieval scoped to the caller |
| AU-9 | Protection of Audit Information | Prevent logs from becoming a leakage channel |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** classify OT data entering GenAI; enable output DLP; deny-by-default RAG.
**Tier 2 — Short-term:** encrypt corpora; scope retrieval identities; log access with source/principal.
**Tier 3 — Strategic:** continuous DLP on the response path correlated with OT data sensitivity.

#### OT-specific threat scenario

A maintenance assistant over-retrieves a restricted P&ID and turbine setpoint
sheet for an unauthorised contractor, exposing safety-critical configuration.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI02 — Agent Identity & Credential Exposure

OT-integrated agents cache credentials to historians, SCADA APIs, and
engineering systems; exposed secrets give attackers a foothold into OT.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | Common ICS vulnerabilities | Credential exposure is a primary OT compromise vector |
| §6.2 | Risk assessment | Assess blast radius of each OT-reaching agent credential |
| §7.2 | Security controls | Strong authentication and secret management at the OT boundary |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| IA-5 | Authenticator Management | Vault, rotate, and scope agent credentials |
| AC-6 | Least Privilege | Minimal OT access per agent identity |
| SC-28 | Protection of Information at Rest | Encrypt stored credentials/secrets |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** remove secrets from prompts; vault all OT credentials.
**Tier 2 — Short-term:** short-lived scoped tokens per agent; secret-scan logs and tool payloads.
**Tier 3 — Strategic:** automated rotation and replay detection for OT-reaching identities.

#### OT-specific threat scenario

A leaked historian read-token from an agent prompt is replayed to enumerate
plant process history, mapping the facility for a later attack.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency) · Agentic: ASI03 (Identity & Privilege Abuse)

---

### DSGAI03 — Shadow AI & Unsanctioned Data Flows

Plant staff paste OT data into unapproved AI tools, exfiltrating operational
intelligence across the enterprise/OT boundary.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.5 | Supply chain / external connectivity | Unsanctioned external AI is an uncontrolled data egress path |
| §6.2 | Risk assessment | Assess data-egress risk to external AI services |
| §7.1 | Security controls | Boundary controls block data flow to non-approved services |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| AC-4 | Information Flow Enforcement | Control OT-data flow to external endpoints |
| AC-20 | Use of External Systems | Govern use of external AI services |
| AU-12 | Audit Record Generation | Log egress to AI endpoints |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** publish approved-AI list; block classified OT data egress.
**Tier 2 — Short-term:** DLP at the enterprise/OT boundary; survey actual usage.
**Tier 3 — Strategic:** sanctioned in-boundary AI alternatives reduce shadow demand.

#### OT-specific threat scenario

An engineer uploads a controller logic export to a public chatbot for help,
leaking proprietary control logic outside the facility boundary.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI04

---

### DSGAI04 — Data, Model & Artifact Poisoning

Attackers corrupt OT training data, historian feeds, or RAG corpora so the
model misrepresents plant state or suppresses alerts.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | Common ICS vulnerabilities | Poisoned OT data feeds are a documented attack vector |
| §6.2 | Risk assessment | Assess integrity risk at every OT data ingestion point |
| §7.2 | Security controls | Integrity verification mandatory at the OT data boundary |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SI-7 | Software, Firmware & Information Integrity | Verify integrity of OT data and model artefacts |
| SI-10 | Information Input Validation | Validate OT data before training/RAG ingestion |
| AU-12 | Audit Record Generation | Log ingestion for forensic review |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** validate/quarantine anomalous OT records; verify artefact signatures.
**Tier 2 — Short-term:** provenance-track OT sources; add poisoning tests to CI.
**Tier 3 — Strategic:** continuous integrity monitoring of historian/RAG feeds.

#### OT-specific threat scenario

An adversary with historian write access inserts records stating setpoints are
in tolerance; a predictive-maintenance model suppresses alerts until failure.

#### Cross-references

- LLM Top 10: LLM04 (Data and Model Poisoning) · Agentic: ASI04

---

### DSGAI05 — Data Integrity & Validation Failures

OT data enters GenAI pipelines without validation, letting malformed or spoofed
process data corrupt downstream model behaviour.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | Common ICS vulnerabilities | Missing validation at OT/GenAI boundary |
| §6.2 | Risk assessment | Assess validation gaps per ingestion path |
| §7.2 | Security controls | Enforce validation before persistence/use |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SI-10 | Information Input Validation | Schema/type/range validation on OT data |
| SI-7 | Information Integrity | Detect tampering of OT data in transit |
| SI-3 | Malicious Code Protection | Filter active content from OT data feeds |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** schema-validate OT data; reject on violation.
**Tier 2 — Short-term:** fuzz ingestion paths; integrity-drift detection.
**Tier 3 — Strategic:** signed data contracts between OT and GenAI stages.

#### OT-specific threat scenario

A spoofed sensor stream with out-of-range values is accepted unvalidated,
skewing an anomaly-detection model into ignoring a real fault.

#### Cross-references

- LLM Top 10: LLM05 (Improper Output Handling) · Agentic: ASI05

---

### DSGAI06 — Tool, Plugin & Agent Data Exchange

GenAI exchanges OT data with external tools, historians, and vendor services
across trust boundaries with insufficient validation.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.5 | Supply chain / connectivity | Tool/vendor integrations cross the OT trust boundary |
| §6.3 | Supply chain risk | Assess each integration's data exchange |
| §7.3 | Data flow controls | Validate and minimise cross-boundary data |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SA-9 | External System Services | Govern external tool/service data exchange |
| AC-4 | Information Flow Enforcement | Control what OT data crosses to tools |
| SC-7 | Boundary Protection | Enforce the tool trust boundary |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** treat tool output as untrusted; minimise tool inputs.
**Tier 2 — Short-term:** validate tool returns; maintain a vetted-tool registry.
**Tier 3 — Strategic:** boundary model reviewed per new OT integration.

#### OT-specific threat scenario

A vendor diagnostic plugin returns crafted content that an agent acts on,
issuing an unintended command toward the OT boundary.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency) · Agentic: ASI02 (Tool Misuse)

---

### DSGAI07 — Data Governance, Lifecycle & Classification

OT data in GenAI systems lacks classification, retention, and lifecycle
controls, leaving safety-relevant data unmanaged.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §6.2 | Risk management | Classify OT data by safety/operational impact |
| §8.2 | OT security program | Lifecycle governance for OT data in GenAI |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| RA-2 | Security Categorization | Classify OT data feeding GenAI |
| AC-3 | Access Enforcement | Access by classification |
| AU-11 | Audit Record Retention | Bounded retention of OT data records |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** classify OT data on ingest; assign owners.
**Tier 2 — Short-term:** enforce retention/deletion; audit classified-store access.
**Tier 3 — Strategic:** programme-level governance metrics for OT data in GenAI.

#### OT-specific threat scenario

Unclassified historian exports accumulate indefinitely in a RAG corpus,
expanding the exposure of years of plant operational data.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI06

---

### DSGAI08 — Non-Compliance & Regulatory Violations

OT GenAI deployments violate FISMA, NERC CIP, AWIA, or CMMC data-handling
obligations, or fail to evidence accountable processing.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §6.2 | Risk management | Map OT data processing to applicable regulation |
| §8.2 | OT security program | Evidence accountable, compliant processing |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| AU-12 | Audit Record Generation | Generate processing records for audit |
| AC-3 | Access Enforcement | Enforce regulated-data access rules |
| AC-6 | Least Privilege | Minimise access to regulated OT data |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** map regulated OT data flows; record lawful basis.
**Tier 2 — Short-term:** implement evidence/processing records; access reviews.
**Tier 3 — Strategic:** continuous compliance monitoring and evidence generation.

#### OT-specific threat scenario

A utility cannot demonstrate CIP-compliant handling of BES data processed by a
GenAI assistant, triggering a finding during audit.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI09 — Multimodal Cross-Channel Data Leakage

OT data in scans, photos, diagrams, and documents leaks through multimodal
pipelines that text-centric controls miss.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.4 | Data security | Protect OT data across all media types |
| §6.2 | Risk assessment | Assess per-modality leakage paths |
| §7.3 | Data flow controls | Extract/redact sensitive content per modality |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SC-28 | Protection at Rest | Protect multimodal OT data stores |
| SI-10 | Input Validation | Validate non-text OT inputs |
| AC-3 | Access Enforcement | Scope access to multimodal OT assets |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** strip metadata; scan media for embedded OT data.
**Tier 2 — Short-term:** modality-aware redaction; multimodal leakage tests.
**Tier 3 — Strategic:** per-modality threat model maintained per input type.

#### OT-specific threat scenario

A photo of an HMI screen with live setpoints is ingested and later surfaced,
disclosing real-time process state.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI01

---

### DSGAI10 — Synthetic Data & Anonymisation Pitfalls

Synthetic OT datasets re-identify the source facility or leak real process
characteristics through poor anonymisation.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.4 | Data security | Protect source OT data used for synthesis |
| §6.2 | Risk assessment | Assess re-identification risk of synthetic OT data |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SC-28 | Protection at Rest | Protect source datasets used for synthesis |
| RA-2 | Security Categorization | Categorise re-identification impact |
| SI-7 | Information Integrity | Validate anonymisation integrity |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** document the anonymisation method and assumptions.
**Tier 2 — Short-term:** run linkage/membership attacks on released synthetic OT data.
**Tier 3 — Strategic:** differential-privacy guarantees with measured budgets.

#### OT-specific threat scenario

A "synthetic" turbine dataset retains unique vibration signatures that identify
the exact plant and machine it was derived from.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI11 — Cross-Context Conversation Bleed

Shared GenAI infrastructure leaks one site/operator's OT context into another's
session.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | Common ICS vulnerabilities | Shared-resource bleed across OT tenants |
| §6.2 | Risk assessment | Assess multi-site/tenant isolation |
| §7.3 | Data flow controls | Enforce session/site isolation |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SC-4 | Information in Shared Resources | Prevent residual OT data across sessions |
| AC-3 | Access Enforcement | Per-site/tenant access |
| SC-28 | Protection at Rest | Isolate per-tenant state |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** key state per site/session; clear on teardown.
**Tier 2 — Short-term:** cross-session bleed tests; review shared caches.
**Tier 3 — Strategic:** verified isolation under multi-site load.

#### OT-specific threat scenario

An assistant shared across two plants surfaces Plant A's outage details in a
Plant B operator's session.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI06

---

### DSGAI12 — Unsafe NL Data Gateways

NL-to-historian/SCADA query interfaces execute model-generated queries that can
be injected or over-broad against OT data sources.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | Common ICS vulnerabilities | Injectable query interfaces to OT data |
| §6.2 | Risk assessment | Assess generated-query reach |
| §7.2 | Security controls | Parameterise and scope generated queries |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SI-10 | Input Validation | Validate/parameterise generated queries |
| AC-3 | Access Enforcement | Execute under the user's OT permissions |
| AC-6 | Least Privilege | Read-scoped historian/SCADA access |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** parameterise queries; read-scope by default.
**Tier 2 — Short-term:** identity passthrough; injection tests against the gateway.
**Tier 3 — Strategic:** allowlist query patterns; no write path to OT.

#### OT-specific threat scenario

A crafted prompt makes an NL-to-historian gateway emit a query that dumps the
full tag database instead of the requested single tag.

#### Cross-references

- LLM Top 10: LLM05 (Improper Output Handling) · Agentic: ASI05

---

### DSGAI13 — Vector Store Platform Security

The embedding tier holding OT documentation (P&IDs, procedures) lacks standard
security controls — weak auth, unencrypted embeddings, tenant bleed.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.4 | Data security | Protect the OT RAG/embedding tier |
| §7.1 | Security controls | Harden the vector store deployment |
| §7.3 | Data flow controls | Scope retrieval to authorised OT data |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SC-28 | Protection at Rest | Encrypt OT embeddings |
| AC-3 | Access Enforcement | Per-namespace/tenant access |
| CM-6 | Configuration Settings | Harden vector-DB configuration |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** authenticate and network-restrict the store; encrypt at rest.
**Tier 2 — Short-term:** namespace isolation tests; config review.
**Tier 3 — Strategic:** recurring architecture assessment of the OT RAG tier.

#### OT-specific threat scenario

An unauthenticated vector store exposes embedded safety procedures and plant
layout to anyone who can reach the network segment.

#### Cross-references

- LLM Top 10: LLM08 (Vector and Embedding Weaknesses) · Agentic: ASI06

---

### DSGAI14 — Excessive Telemetry & Monitoring Leakage

OT GenAI telemetry captures process data and prompts in logs and traces with
long retention and broad access.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.4 | Data security | Protect telemetry containing OT data |
| §6.2 | Risk assessment | Assess what telemetry captures |
| §7.3 | Data flow controls | Redact OT data before logging |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| AU-9 | Protection of Audit Information | Restrict access to telemetry |
| SC-28 | Protection at Rest | Encrypt log/trace stores |
| AU-11 | Audit Record Retention | Bound telemetry retention |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** redact prompts/outputs in logs; restrict log access.
**Tier 2 — Short-term:** enforce retention limits; scan sinks for OT data.
**Tier 3 — Strategic:** privacy-by-design telemetry with field-level governance.

#### OT-specific threat scenario

APM traces retain full process-parameter prompts; a read-only monitoring
account becomes an unintended OT data exfiltration path.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI15 — Over-Broad Context Windows

Large context windows aggregate OT data from multiple sources and trust levels
into one exfiltration target.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | Common ICS vulnerabilities | Aggregated OT data concentrates risk |
| §6.2 | Risk assessment | Assess context-assembly data need |
| §7.3 | Data flow controls | Minimise and authorise context data |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| AC-6 | Least Privilege | Assemble only need-to-know OT data |
| SC-4 | Information in Shared Resources | Avoid cross-trust aggregation |
| AC-3 | Access Enforcement | Authorise each context item |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** trim context to task need; authorise each item.
**Tier 2 — Short-term:** context-extraction tests; cap assembly size.
**Tier 3 — Strategic:** data-need model per OT task type.

#### OT-specific threat scenario

A single prompt's context aggregates setpoints, alarms, and credentials from
three subsystems; one extraction prompt exposes them together.

#### Cross-references

- LLM Top 10: LLM08 (Vector and Embedding Weaknesses) · Agentic: ASI06

---

### DSGAI16 — Endpoint & Browser Assistant Overreach

Endpoint assistants on engineering workstations access OT files, HMIs, and
clipboards beyond their declared scope.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | Common ICS vulnerabilities | Workstation assistant overreach into OT data |
| §6.2 | Risk assessment | Assess endpoint assistant scope |
| §7.1 | Security controls | Constrain endpoint access |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| AC-3 | Access Enforcement | Limit assistant to declared resources |
| AC-6 | Least Privilege | Minimal endpoint permissions |
| SC-7 | Boundary Protection | Prevent reach into OT segments |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** restrict local file/HMI/clipboard access; require consent.
**Tier 2 — Short-term:** test out-of-scope access; log local actions.
**Tier 3 — Strategic:** endpoint permission model enforced on engineering hosts.

#### OT-specific threat scenario

A browser assistant on an engineering workstation reads an open HMI tab and
transmits live process values to its cloud backend.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency) · Agentic: ASI02 (Tool Misuse)

---

### DSGAI17 — Data Availability & Resilience Failures

OT GenAI systems lack tested backup/recovery for training data, model
artefacts, and corpora, and lack DoS protection for data pipelines.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.6 | Resilience & recovery | OT availability depends on recoverable data/model assets |
| §6.2 | Risk assessment | Assess availability impact of GenAI data loss |
| §7.2 | Security controls | Backup, recovery, and fail-safe design |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| CP-9 | System Backup | Back up corpora, weights, indices |
| CP-10 | System Recovery & Reconstitution | Tested restore of GenAI data assets |
| SC-5 | Denial-of-Service Protection | Rate/quota limits on data pipelines |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** back up data/model/index assets; add rate limits; ensure GenAI failure can't impair OT primary control.
**Tier 2 — Short-term:** restore drills (RTO/RPO); exhaustion alerting.
**Tier 3 — Strategic:** resilience architecture; availability/chaos testing.

#### OT-specific threat scenario

A corrupted RAG corpus with no tested backup leaves an outage-response
assistant unavailable during a plant incident.

#### Cross-references

- LLM Top 10: LLM10 (Unbounded Consumption) · Agentic: ASI08 (Cascading Failures)

---

### DSGAI18 — Inference & Data Reconstruction

Attackers query OT GenAI systems to reconstruct training data or infer
membership of sensitive operational records.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.4 | Data security | Protect against inference-based OT data recovery |
| §6.2 | Risk assessment | Assess inference exposure |
| §7.3 | Data flow controls | Limit signals enabling inference |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SC-28 | Protection at Rest | Protect training data |
| AC-6 | Least Privilege | Limit query scope/rate |
| AU-12 | Audit Record Generation | Detect systematic probing |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** suppress raw logits/confidence; rate-limit queries.
**Tier 2 — Short-term:** membership-inference tests; measure attack advantage.
**Tier 3 — Strategic:** differential-privacy / output-perturbation controls.

#### OT-specific threat scenario

Repeated targeted queries reconstruct a proprietary control curve embedded in
the model's training data.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI19 — Human-in-Loop & Labeler Overexposure

OT data reviewers and labellers access sensitive process data without
minimisation or attribution.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.4 | Data security | Protect OT data shown to reviewers |
| §6.2 | Risk assessment | Assess reviewer exposure |
| §7.3 | Data flow controls | Minimise reviewer-facing OT data |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| AC-3 | Access Enforcement | Scope reviewer access to assigned items |
| AC-6 | Least Privilege | Mask non-essential OT fields |
| AU-9 | Protection of Audit Information | Audit reviewer access |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** mask non-essential OT fields in labeling UIs.
**Tier 2 — Short-term:** attributable reviewer identities; access audit.
**Tier 3 — Strategic:** privacy-preserving review workflows.

#### OT-specific threat scenario

Offshore labellers reviewing maintenance logs see full plant identifiers and
safety incident details unrelated to the labeling task.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI20 — Model Exfiltration & IP Replication

Adversaries extract an OT-tuned model's weights or build a functional
equivalent encoding proprietary process knowledge.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.4 | Data security | Protect model artefacts as OT IP |
| §6.2 | Risk assessment | Assess extraction exposure |
| §7.3 | Data flow controls | Constrain inference access |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| AC-6 | Least Privilege | Scope and budget inference access |
| SC-28 | Protection at Rest | Protect weight artefacts |
| SC-7 | Boundary Protection | Restrict access to the serving path |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** access-control weights; per-principal rate limits.
**Tier 2 — Short-term:** detect extraction query patterns; throttle/alert.
**Tier 3 — Strategic:** watermarking / output-perturbation defences.

#### OT-specific threat scenario

A competitor systematically queries a process-optimisation model to replicate
the plant's proprietary efficiency tuning.

#### Cross-references

- LLM Top 10: LLM10 (Unbounded Consumption) · Agentic: ASI04

---

### DSGAI21 — Disinformation via Data Poisoning

Attackers poison OT training/RAG sources to make the model assert systematic
falsehoods about plant state or procedures.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.5 | Supply chain / connectivity | Tainted external OT data sources |
| §6.3 | Supply chain risk | Vet OT data-source provenance |
| §8.4 | Supply chain program | Provenance across the OT data supply chain |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SI-7 | Information Integrity | Detect tampered OT source content |
| SR-3 | Supply Chain Controls & Processes | Vet/sign OT data sources |
| AU-12 | Audit Record Generation | Monitor corpus integrity over time |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:** vet OT RAG/training sources; ground outputs with citations.
**Tier 2 — Short-term:** corpus-integrity monitoring; targeted-falsehood tests.
**Tier 3 — Strategic:** provenance model across the OT data supply chain.

#### OT-specific threat scenario

Poisoned vendor documentation makes a procedure assistant confidently recommend
an unsafe valve-sequence as "approved."

#### Cross-references

- LLM Top 10: LLM09 (Misinformation) · Agentic: ASI04 (Agentic Supply Chain)

---

## OT pre-deployment checklist — GenAI data security

| Item | Requirement | SP 800-82 Ref | Status |
|---|---|---|---|
| Data placement | GenAI data systems in correct SP 800-82 zone | §7, App G | ☐ |
| OT data classification | All OT data in GenAI systems classified | §5.4 | ☐ |
| Pipeline integrity | Integrity verification on all OT data pipelines | §7.2 | ☐ |
| Corpus access control | Write authentication on all OT corpus stores | §7.2 | ☐ |
| Inference data scope | OT inference data minimised and retention scheduled | §5.4 | ☐ |
| Supply chain SBOM | SBOM for all GenAI components | §8.4 | ☐ |
| Third-party review | Vendor assessment for OT data/model providers | §6.3 | ☐ |
| Fail-safe state | GenAI failure does not affect OT primary control | §5.6 | ☐ |
| Audit logging | All OT data access logged with forensic retention | §7.3 | ☐ |
| Regulatory review | Applicable regulations mapped and addressed | §6.2 | ☐ |

---

## U.S. regulatory crosswalk

| Regulation | Applicability | DSGAI relevance |
|---|---|---|
| NERC CIP-003 | Electric utility — information protection | DSGAI01, DSGAI03, DSGAI07: BES data in GenAI systems |
| NERC CIP-007 | Electric utility — system security | DSGAI04, DSGAI05: data pipeline and integrity controls |
| NERC CIP-013 | Electric utility — supply chain | DSGAI06, DSGAI21: GenAI data supply chain for BES systems |
| AWIA 2018 | Water utilities | DSGAI04, DSGAI17: training/RAG integrity and resilience for water OT |
| FISMA | Federal agencies | All DSGAI entries: SP 800-53 controls apply |
| CMMC Level 2 | DoD contractors | DSGAI01, DSGAI03, DSGAI08: CUI handling in GenAI data |

---

## See also

- [LLM Top 10 × NIST SP 800-82](../llm-top10/LLM_NISTSP80082.md)
- [Agentic Top 10 × NIST SP 800-82](../agentic-top10/Agentic_NISTSP80082.md)
- [Agentic Top 10 × ISA 62443](../agentic-top10/Agentic_ISA62443.md)

---

## References

- [NIST SP 800-82 Rev 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf) — May 2023
- [NIST SP 800-53 Rev 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- [DSGAI_ISA62443.md](DSGAI_ISA62443.md) — complementary zone model and SL ratings
- [LLM_NISTSP80082.md](../llm-top10/LLM_NISTSP80082.md) — LLM entry mapping
- [Agentic_NISTSP80082.md](../agentic-top10/Agentic_NISTSP80082.md) — agentic AI mapping
- [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
- [shared/RECIPES.md](../shared/RECIPES.md) — Pattern 1: Access-Controlled RAG for OT data

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-03-27 | Initial release — full mapping DSGAI01–DSGAI21 to SP 800-82 Rev 3 |
| 1.1.0 | 2026-05-29 | Corrected to canonical DSGAI 2026 taxonomy (entries had used a pre-release taxonomy); SP 800-82 / SP 800-53 mappings, OT scenarios, and regulatory crosswalk rewritten to match |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) —
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
*License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)*
