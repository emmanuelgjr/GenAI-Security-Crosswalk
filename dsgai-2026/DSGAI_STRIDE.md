<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks 2026 (DSGAI01-DSGAI21)
  Framework   : STRIDE — Threat Modelling Methodology
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 × STRIDE

Mapping the [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
(DSGAI01–DSGAI21) to [STRIDE](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats) —
Microsoft's threat-modelling methodology — so data-security risks for GenAI can be
modelled with the same structured taxonomy used across the application stack.

---

## Why STRIDE for GenAI data security

STRIDE classifies threats into six categories: Spoofing, Tampering, Repudiation,
Information Disclosure, Denial of Service, and Elevation of Privilege. DSGAI risks
are data-layer risks, and most map naturally to STRIDE's **Information Disclosure**
and **Tampering** classes — but credential, governance, and availability risks pull
in Spoofing, Repudiation, Elevation, and Denial of Service too. This mapping traces
each DSGAI 2026 risk to its primary STRIDE categories so data flows (training,
RAG, context, telemetry) can be threat-modelled at their trust boundaries. Tooling
per risk is catalogued in [shared/TOOLS.md](../shared/TOOLS.md).

---

## STRIDE categories at a glance

| Category | Letter | Core question | GenAI-data example |
|---|---|---|---|
| Spoofing | S | Can an attacker impersonate a trusted identity or source? | Stolen agent credential, spoofed data source |
| Tampering | T | Can data or behaviour be modified without authorisation? | Poisoned corpus, injected NL query |
| Repudiation | R | Can an action be denied without a traceable audit trail? | Unlogged data access, no lineage |
| Information Disclosure | I | Can sensitive data reach unauthorised parties? | RAG over-retrieval, telemetry leakage |
| Denial of Service | D | Can availability be degraded or denied? | Corpus loss, pipeline exhaustion |
| Elevation of Privilege | E | Can permissions exceed authorisation? | Over-broad gateway, cross-tenant access |

---

## Quick-reference summary

| ID | Name | Severity | Primary STRIDE Categories | Tier | Scope |
|---|---|---|---|---|---|
| DSGAI01 | Sensitive Data Leakage | Critical | I, R | Foundational–Advanced | Both |
| DSGAI02 | Agent Identity & Credential Exposure | Critical | S, I, E | Foundational–Advanced | Both |
| DSGAI03 | Shadow AI & Unsanctioned Data Flows | High | I, R | Foundational–Hardening | Both |
| DSGAI04 | Data, Model & Artifact Poisoning | Critical | T, S, R | Hardening–Advanced | Both |
| DSGAI05 | Data Integrity & Validation Failures | High | T, R | Foundational–Hardening | Both |
| DSGAI06 | Tool, Plugin & Agent Data Exchange | High | T, I, E | Foundational–Hardening | Both |
| DSGAI07 | Data Governance, Lifecycle & Classification | High | R, I | Foundational–Hardening | Both |
| DSGAI08 | Non-Compliance & Regulatory Violations | High | R, I | Foundational–Hardening | Both |
| DSGAI09 | Multimodal Cross-Channel Data Leakage | High | I, T | Hardening–Advanced | Both |
| DSGAI10 | Synthetic Data & Anonymisation Pitfalls | Medium | I | Hardening–Advanced | Build |
| DSGAI11 | Cross-Context Conversation Bleed | High | I, E | Hardening–Advanced | Both |
| DSGAI12 | Unsafe NL Data Gateways | Critical | T, E, I | Foundational–Advanced | Both |
| DSGAI13 | Vector Store Platform Security | High | I, T, E | Foundational–Hardening | Both |
| DSGAI14 | Excessive Telemetry & Monitoring Leakage | High | I, R | Foundational–Hardening | Both |
| DSGAI15 | Over-Broad Context Windows | High | I | Hardening–Advanced | Both |
| DSGAI16 | Endpoint & Browser Assistant Overreach | High | I, E | Foundational–Hardening | Both |
| DSGAI17 | Data Availability & Resilience Failures | High | D | Foundational–Advanced | Both |
| DSGAI18 | Inference & Data Reconstruction | High | I | Hardening–Advanced | Both |
| DSGAI19 | Human-in-Loop & Labeler Overexposure | Medium | I, R | Foundational–Hardening | Both |
| DSGAI20 | Model Exfiltration & IP Replication | High | I, T | Hardening–Advanced | Both |
| DSGAI21 | Disinformation via Data Poisoning | High | T, R | Hardening–Advanced | Both |

---

## Audience tags

- **Security architect** — full file, data-flow threat-model design for GenAI data
- **Threat modeller** — STRIDE per trust boundary across training/RAG/context/telemetry
- **Data engineer / ML engineer** — DSGAI04, DSGAI05, DSGAI13, DSGAI17
- **Security engineer** — DSGAI01, DSGAI02, DSGAI12, DSGAI14
- **Privacy / DPO** — DSGAI01, DSGAI07, DSGAI08, DSGAI10, DSGAI19
- **OT engineer** — DSGAI04, DSGAI17 (see DSGAI × NIST SP 800-82 for OT controls)

---

## Detailed mappings

---

### DSGAI01 — Sensitive Data Leakage

**Severity:** Critical

PII, secrets, and proprietary content reach unauthorised parties through outputs,
RAG over-retrieval, memorisation, or logs.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Data Disclosure | I | Sensitive data is exposed via outputs, over-retrieval, or memorisation | Foundational | Both |
| Access Repudiation | R | Disclosure cannot be traced for want of access logging | Hardening | Both |

#### Mitigations by tier

**Foundational** — deny-by-default RAG access scoped to the caller; output PII/secret redaction.
**Hardening** — encrypt corpora at rest; log retrieval with principal + ACL.
**Advanced** — continuous DLP on the response path; field-level access logging.

#### Cross-references

- LLM Top 10: LLM02 · Agentic: ASI03
- Other: MITRE ATLAS AML.T0057 · ASVS V8

---

### DSGAI02 — Agent Identity & Credential Exposure

**Severity:** Critical

Exposed agent credentials let attackers impersonate the agent, access data, and
escalate.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Credential Spoofing | S | Stolen credentials let an attacker impersonate the agent/principal | Foundational | Both |
| Secret Disclosure | I | Credentials leak via prompts, memory, logs, or tool payloads | Foundational | Both |
| Privilege Elevation | E | A compromised identity exercises its (often broad) data access | Hardening | Both |

#### Mitigations by tier

**Foundational** — vault credentials; keep secrets out of model context.
**Hardening** — short-lived scoped tokens; secret-scan logs/tool payloads.
**Advanced** — automated rotation and replay detection.

#### Cross-references

- LLM Top 10: LLM06 · Agentic: ASI03
- Other: OWASP NHI Top 10 · ASVS V2

---

### DSGAI03 — Shadow AI & Unsanctioned Data Flows

**Severity:** High

Data egresses to unapproved AI tools, unmonitored and unattributable.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Egress Disclosure | I | Sensitive data flows to unsanctioned external AI services | Foundational | Both |
| Flow Repudiation | R | Unsanctioned flows lack monitoring/attribution | Hardening | Both |

#### Mitigations by tier

**Foundational** — approved-AI allowlist and data-handling policy; egress logging.
**Hardening** — DLP blocking classified data to unsanctioned endpoints.
**Advanced** — sanctioned in-boundary alternatives; usage analytics.

#### Cross-references

- LLM Top 10: LLM02 · Agentic: ASI04
- Other: ISO 42001 · ASVS V1

---

### DSGAI04 — Data, Model & Artifact Poisoning

**Severity:** Critical

Training data, weights, or RAG corpora are corrupted to implant backdoors or
degrade integrity.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Data/Artifact Tampering | T | Training/RAG data or model artefacts are modified without authorisation | Foundational | Both |
| Source Spoofing | S | Poisoned content impersonates a trusted data source | Hardening | Both |
| Integrity Repudiation | R | Poisoning cannot be traced for want of provenance | Hardening | Both |

#### Mitigations by tier

**Foundational** — validate/quarantine anomalous records; verify artefact signatures.
**Hardening** — provenance-track sources; poisoning tests in CI.
**Advanced** — continuous integrity monitoring; systemic root-cause analysis.

#### Cross-references

- LLM Top 10: LLM04 · Agentic: ASI04
- Other: MITRE ATLAS AML.T0020 · ASVS V10

---

### DSGAI05 — Data Integrity & Validation Failures

**Severity:** High

Unvalidated data enters pipelines, letting malformed or spoofed input corrupt
behaviour.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Input Tampering | T | Malformed/spoofed data corrupts downstream processing | Foundational | Both |
| Integrity Repudiation | R | Integrity violations go undetected/unlogged | Hardening | Both |

#### Mitigations by tier

**Foundational** — schema-validate ingested data; reject on violation.
**Hardening** — fuzz ingestion paths; integrity-drift detection.
**Advanced** — signed data contracts between pipeline stages.

#### Cross-references

- LLM Top 10: LLM05 · Agentic: ASI05
- Other: ASVS V5 · CWE-20

---

### DSGAI06 — Tool, Plugin & Agent Data Exchange

**Severity:** High

Data crosses trust boundaries to tools/plugins/sub-agents with insufficient
validation.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Exchange Tampering | T | Tool inputs/returns are manipulated across the boundary | Foundational | Both |
| Cross-Boundary Disclosure | I | Sensitive data is over-shared with tools | Foundational | Both |
| Privilege Elevation | E | A tool reaches more data than the task requires | Hardening | Both |

#### Mitigations by tier

**Foundational** — treat tool output as untrusted; minimise tool inputs.
**Hardening** — validate tool returns; vetted-tool registry.
**Advanced** — capability-scoped tool brokering; boundary model per integration.

#### Cross-references

- LLM Top 10: LLM06 · Agentic: ASI02
- Other: MITRE ATLAS AML.T0053 · ASVS V11

---

### DSGAI07 — Data Governance, Lifecycle & Classification

**Severity:** High

Absent classification/retention/lifecycle controls leave sensitive data
unmanaged and unaccountable.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Governance Repudiation | R | Data handling cannot be evidenced or attributed | Foundational | Both |
| Unmanaged Disclosure | I | Unclassified/over-retained data raises exposure | Hardening | Both |

#### Mitigations by tier

**Foundational** — classify data on ingest; assign owners.
**Hardening** — enforce retention/deletion; audit classified access.
**Advanced** — governance metrics; automated lifecycle enforcement.

#### Cross-references

- LLM Top 10: LLM02 · Agentic: ASI06
- Other: ISO 42001 · NIST AI RMF (GOVERN)

---

### DSGAI08 — Non-Compliance & Regulatory Violations

**Severity:** High

Processing violates GDPR/EU AI Act/HIPAA/PCI or fails to honour data-subject
rights.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Accountability Repudiation | R | Processing cannot be evidenced as lawful and accountable | Foundational | Both |
| Unlawful Disclosure | I | Data is processed/shared beyond lawful basis | Hardening | Both |

#### Mitigations by tier

**Foundational** — record lawful basis; map regulated flows.
**Hardening** — end-to-end data-subject-rights incl. RAG/embeddings.
**Advanced** — continuous compliance monitoring and evidence.

#### Cross-references

- LLM Top 10: LLM02 · Agentic: ASI03
- Other: EU AI Act · DORA

---

### DSGAI09 — Multimodal Cross-Channel Data Leakage

**Severity:** High

Sensitive data in images/audio/video/documents leaks via channels text controls
miss.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Cross-Modal Disclosure | I | Hidden data in media is surfaced or exfiltrated | Foundational | Both |
| Modality Tampering | T | Instructions/data embedded in media alter behaviour | Hardening | Both |

#### Mitigations by tier

**Foundational** — strip metadata; scan media for embedded data.
**Hardening** — modality-aware redaction; multimodal leakage tests.
**Advanced** — per-modality threat model maintained per input type.

#### Cross-references

- LLM Top 10: LLM02 · Agentic: ASI01
- Other: MITRE ATLAS AML.T0057 · ASVS V12

---

### DSGAI10 — Synthetic Data & Anonymisation Pitfalls

**Severity:** Medium

Synthetic data re-identifies subjects or anonymisation fails under linkage.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Re-identification Disclosure | I | Released synthetic/anonymised data reveals real subjects | Foundational | Build |

#### Mitigations by tier

**Foundational** — document the anonymisation method and assumptions.
**Hardening** — run linkage/membership attacks on released data.
**Advanced** — differential-privacy guarantees with measured budgets.

#### Cross-references

- LLM Top 10: LLM02 · Agentic: ASI03
- Other: NIST AI RMF (MAP) · NIST Privacy Framework

---

### DSGAI11 — Cross-Context Conversation Bleed

**Severity:** High

Session/tenant context bleeds across users through shared caches or memory.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Cross-Session Disclosure | I | One user's context is exposed to another | Foundational | Both |
| Boundary Privilege Elevation | E | A user accesses another tenant's context | Hardening | Both |

#### Mitigations by tier

**Foundational** — key state per user/tenant; clear on teardown.
**Hardening** — cross-session bleed tests; review shared caches.
**Advanced** — verified isolation under concurrency/load.

#### Cross-references

- LLM Top 10: LLM02 · Agentic: ASI06
- Other: ASVS V3/V8

---

### DSGAI12 — Unsafe NL Data Gateways

**Severity:** Critical

NL-to-SQL/API gateways execute model-generated queries that can be injected or
over-broad.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Query Tampering | T | Injected prompts produce destructive/over-broad queries | Foundational | Both |
| Execution Privilege Elevation | E | The gateway runs over-privileged, exceeding the user's scope | Foundational | Both |
| Query-Driven Disclosure | I | Generated queries return data beyond authorisation | Hardening | Both |

#### Mitigations by tier

**Foundational** — parameterise generated queries; read-scope by default.
**Hardening** — execution-time user identity; injection tests.
**Advanced** — allowlist query patterns; no write path by default.

#### Cross-references

- LLM Top 10: LLM05 · Agentic: ASI05
- Other: CWE-89 · ASVS V5

---

### DSGAI13 — Vector Store Platform Security

**Severity:** High

The embedding tier lacks standard controls — weak auth, unencrypted embeddings,
tenant bleed.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Embedding Disclosure | I | Unprotected embeddings/corpus are exposed | Foundational | Both |
| Index Tampering | T | Vectors/metadata are modified to alter retrieval | Hardening | Both |
| Namespace Privilege Elevation | E | Cross-namespace/tenant access via weak isolation | Hardening | Both |

#### Mitigations by tier

**Foundational** — authenticate and network-restrict; encrypt embeddings at rest.
**Hardening** — per-namespace isolation tests; config review.
**Advanced** — recurring architecture assessment of the RAG tier.

#### Cross-references

- LLM Top 10: LLM08 · Agentic: ASI06
- Other: ASVS V4/V6

---

### DSGAI14 — Excessive Telemetry & Monitoring Leakage

**Severity:** High

Telemetry captures sensitive data in logs/traces with broad access and long
retention.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Telemetry Disclosure | I | Prompts/outputs/PII captured in logs and traces | Foundational | Both |
| Log-Access Repudiation | R | Telemetry access is not itself audited | Hardening | Both |

#### Mitigations by tier

**Foundational** — redact prompts/outputs in logs; restrict access.
**Hardening** — enforce retention limits; scan sinks for PII.
**Advanced** — privacy-by-design telemetry with field-level governance.

#### Cross-references

- LLM Top 10: LLM02 · Agentic: ASI03
- Other: SOC 2 · ASVS V7

---

### DSGAI15 — Over-Broad Context Windows

**Severity:** High

Large context windows aggregate data into one concentrated exfiltration target.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Aggregated Disclosure | I | Excess context concentrates exposure across sources/trust levels | Foundational | Both |

#### Mitigations by tier

**Foundational** — trim context to task need; authorise each item.
**Hardening** — context-extraction tests; cap assembly.
**Advanced** — data-need model per task type.

#### Cross-references

- LLM Top 10: LLM08 · Agentic: ASI06
- Other: ASVS V8

---

### DSGAI16 — Endpoint & Browser Assistant Overreach

**Severity:** High

Endpoint assistants access data beyond their declared scope (files, tabs,
clipboard).

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Local Data Disclosure | I | The assistant reads/exfiltrates out-of-scope local data | Foundational | Both |
| Scope Privilege Elevation | E | The assistant exceeds its declared permissions | Hardening | Both |

#### Mitigations by tier

**Foundational** — restrict local file/tab/clipboard access; require consent.
**Hardening** — test out-of-scope access; log local actions.
**Advanced** — enforced endpoint permission model.

#### Cross-references

- LLM Top 10: LLM06 · Agentic: ASI02
- Other: ASVS V1/V4

---

### DSGAI17 — Data Availability & Resilience Failures

**Severity:** High

No tested backup/recovery for data/model assets; no DoS protection for pipelines.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Availability Denial | D | Loss of corpora/weights/indices or pipeline exhaustion denies service | Foundational | Both |

#### Mitigations by tier

**Foundational** — back up data/model/index assets; add rate limits.
**Hardening** — restore drills (RTO/RPO); exhaustion alerting.
**Advanced** — resilience architecture; availability/chaos testing.

#### Cross-references

- LLM Top 10: LLM10 · Agentic: ASI08
- Other: DORA · NIST SP 800-82

---

### DSGAI18 — Inference & Data Reconstruction

**Severity:** High

Attackers reconstruct training data via membership inference, inversion, or
attribute inference.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Inference Disclosure | I | Crafted queries reconstruct or confirm training data | Foundational | Both |

#### Mitigations by tier

**Foundational** — suppress raw logits/confidence; rate-limit queries.
**Hardening** — membership-inference tests; measure attack advantage.
**Advanced** — differential privacy / output-perturbation controls.

#### Cross-references

- LLM Top 10: LLM02 · Agentic: ASI03
- Other: MITRE ATLAS AML.T0024 · ASVS V8

---

### DSGAI19 — Human-in-Loop & Labeler Overexposure

**Severity:** Medium

Reviewers and labellers access sensitive data without minimisation or
attribution.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Reviewer Disclosure | I | Labellers see more sensitive data than the task requires | Foundational | Both |
| Reviewer Repudiation | R | Reviewer access is not attributable/audited | Hardening | Both |

#### Mitigations by tier

**Foundational** — mask non-essential PII in labeling UIs.
**Hardening** — attributable reviewer identities; access audit.
**Advanced** — privacy-preserving review workflows.

#### Cross-references

- LLM Top 10: LLM02 · Agentic: ASI03
- Other: SOC 2 · NIST Privacy Framework

---

### DSGAI20 — Model Exfiltration & IP Replication

**Severity:** High

Adversaries extract weights or replicate the model via query campaigns.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Model Disclosure | I | Weights/behaviour are extracted via crafted queries | Foundational | Both |
| Replication Tampering | T | A replicated model is repurposed beyond licence/control | Hardening | Both |

#### Mitigations by tier

**Foundational** — access-control weights; per-principal rate limits.
**Hardening** — detect extraction query patterns; throttle/alert.
**Advanced** — watermarking / output-perturbation defences.

#### Cross-references

- LLM Top 10: LLM10 · Agentic: ASI04
- Other: MITRE ATLAS AML.T0024 · ASVS V13

---

### DSGAI21 — Disinformation via Data Poisoning

**Severity:** High

Attackers poison training/RAG sources to cause systematic, targeted false
outputs.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Source Tampering | T | Poisoned sources drive systematic falsehoods | Foundational | Both |
| Provenance Repudiation | R | Tainted content cannot be traced to its source | Hardening | Both |

#### Mitigations by tier

**Foundational** — vet RAG/training sources; ground outputs with citations.
**Hardening** — corpus-integrity monitoring; targeted-falsehood tests.
**Advanced** — provenance model across the data supply chain.

#### Cross-references

- LLM Top 10: LLM09 · Agentic: ASI04
- Other: MITRE ATLAS AML.T0020 · ENISA

---

## Implementation priority

| Priority | STRIDE focus | DSGAI entries |
|---|---|---|
| P1 — Pre-production gate | I, S, E (leakage, credentials, gateways) | DSGAI01, DSGAI02, DSGAI12 |
| P2 — First 30 days | T, I (poisoning, validation, exchange, vector store) | DSGAI04, DSGAI05, DSGAI06, DSGAI13 |
| P3 — Governance & resilience | R, I, D (governance, telemetry, availability) | DSGAI07, DSGAI08, DSGAI14, DSGAI17 |
| P4 — Advanced privacy | I (inference, exfiltration, synthetic data) | DSGAI10, DSGAI18, DSGAI20 |

---

## Using STRIDE in GenAI data threat models

Model the system as a data-flow diagram with trust boundaries at: ingestion,
training store, RAG/vector store, context assembly, NL gateways, telemetry, and
external AI egress. Apply the six STRIDE categories at each boundary — the
quick-reference table gives the primary categories per DSGAI risk as a starting
point. DSGAI is dominated by **I** (Information Disclosure) and **T** (Tampering);
treat those as the default lenses for any new GenAI data flow.

---

## See also

- [LLM Top 10 × STRIDE](../llm-top10/LLM_STRIDE.md)
- [Agentic Top 10 × STRIDE](../agentic-top10/Agentic_STRIDE.md)

---

## References

- [STRIDE threat model (Microsoft)](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)
- [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
- [LLM Top 10 × STRIDE](../llm-top10/LLM_STRIDE.md)
- [shared/TOOLS.md](../shared/TOOLS.md) — tooling catalogue

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-05-29 | Initial mapping — DSGAI01–DSGAI21 to STRIDE categories with tiered mitigations |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) —
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
*License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)*
