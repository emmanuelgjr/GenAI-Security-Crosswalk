<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks 2026 (DSGAI01-DSGAI21)
  Framework   : NIST SP 800-218A Secure Software Development Practices for Generative AI and Dual-Use Foundation Models
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 × NIST SP 800-218A

Mapping the [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
to [NIST SP 800-218A: Secure Software Development Practices for Generative AI and Dual-Use Foundation Models](https://doi.org/10.6028/NIST.SP.800-218A.ipd)
(Initial Public Draft, March 2024).

NIST SP 800-218A extends the Secure Software Development Framework (SSDF)
with AI-specific practices covering the full lifecycle of generative AI and
foundation model development. The DSGAI 2026 mapping focuses on the data
security dimensions of GenAI systems — training data protection, data
governance, privacy preservation, and regulatory compliance. It addresses
how organisations can leverage SP 800-218A to secure the data that flows
into, through, and out of AI pipelines: from provenance and lineage of
training corpora, through access control and integrity of model artefacts,
to data retention, consent management, and cross-jurisdictional compliance.
Organisations following SSDF for their conventional software estate can
extend that programme to their AI data security posture using this mapping.
US federal agencies are directed to align with SP 800-218A under OMB
memoranda referencing the SSDF.

---

## Why SP 800-218A for GenAI data security

This mapping traces each OWASP DSGAI 2026 data security risk to specific
SP 800-218A (SSDF-for-GenAI) practices, letting data-security teams address
GenAI data risks inside their existing secure-development programme rather than
as a separate workstream. Because SP 800-218A is lifecycle-oriented (Produce,
Protect, Respond), it answers where in the development lifecycle each DSGAI
risk must be designed out, protected against, or monitored for.

---

## SP 800-218A practice groups

| Group | ID | Purpose |
|---|---|---|
| Produce Well-Secured Software | PW | Security requirements, design, reuse, secure coding, review, and testing across the AI development lifecycle |
| Protect the Software | PS | Protecting model weights, training data, pipeline code, and build artefacts from unauthorised access and tampering |
| Respond to Vulnerabilities | RV | Identifying, assessing, remediating, and analysing AI-specific vulnerabilities including emergent behaviours |

---

## Quick-reference summary

| ID | Name | Severity | SP 800-218A Practices | Scope |
|---|---|---|---|---|
| DSGAI01 | Sensitive Data Leakage | Critical | PS.1.1-PS, PW.5.1-PS, RV.1.1-PS | Both |
| DSGAI02 | Agent Identity & Credential Exposure | Critical | PS.1.1-PS, PS.3.1-PS, PW.5.1-PS | Both |
| DSGAI03 | Shadow AI & Unsanctioned Data Flows | High | PW.4.1-PS, PW.1.1-PS, RV.1.1-PS | Both |
| DSGAI04 | Data, Model & Artifact Poisoning | Critical | PS.2.1-PS, PS.3.1-PS, PW.4.1-PS, RV.3.1-PS | Both |
| DSGAI05 | Data Integrity & Validation Failures | High | PS.2.1-PS, PW.5.1-PS, PW.7.2-PS | Both |
| DSGAI06 | Tool, Plugin & Agent Data Exchange | High | PW.4.1-PS, PS.1.1-PS, PW.2.1-PS | Both |
| DSGAI07 | Data Governance, Lifecycle & Classification | High | PW.1.1-PS, PW.2.1-PS, PS.3.1-PS | Both |
| DSGAI08 | Non-Compliance & Regulatory Violations | High | PW.1.1-PS, PW.2.1-PS, RV.3.1-PS | Both |
| DSGAI09 | Multimodal Cross-Channel Data Leakage | High | PS.1.1-PS, PW.5.1-PS, PW.7.2-PS | Both |
| DSGAI10 | Synthetic Data & Anonymisation Pitfalls | Medium | PW.7.2-PS, PW.8.2-PS, RV.3.1-PS | Build |
| DSGAI11 | Cross-Context Conversation Bleed | High | PW.5.1-PS, PS.1.1-PS, PW.7.2-PS | Both |
| DSGAI12 | Unsafe NL Data Gateways | Critical | PW.5.1-PS, PW.7.2-PS, PS.1.1-PS | Both |
| DSGAI13 | Vector Store Platform Security | High | PS.1.1-PS, PS.2.1-PS, PW.6.1-PS | Both |
| DSGAI14 | Excessive Telemetry & Monitoring Leakage | High | PS.1.1-PS, PW.1.1-PS, PW.5.1-PS | Both |
| DSGAI15 | Over-Broad Context Windows | High | PW.1.1-PS, PW.2.1-PS, PW.5.1-PS | Both |
| DSGAI16 | Endpoint & Browser Assistant Overreach | High | PW.4.1-PS, PS.1.1-PS, PW.2.1-PS | Both |
| DSGAI17 | Data Availability & Resilience Failures | High | PS.3.1-PS, RV.2.1-PS, PW.1.1-PS | Both |
| DSGAI18 | Inference & Data Reconstruction | High | PW.8.2-PS, PW.7.2-PS, PS.1.1-PS | Both |
| DSGAI19 | Human-in-Loop & Labeler Overexposure | Medium | PS.1.1-PS, PW.1.1-PS, PW.4.1-PS | Both |
| DSGAI20 | Model Exfiltration & IP Replication | High | PS.1.1-PS, PS.3.1-PS, PW.8.2-PS | Both |
| DSGAI21 | Disinformation via Data Poisoning | High | PW.4.1-PS, PS.2.1-PS, RV.3.1-PS | Both |

---

## Audience tags

`data-engineer` `privacy-officer` `security-engineer` `ml-engineer` `compliance-officer` `ciso` `dpo`

- **Data engineer / ML engineer** — PW and PS practices per entry; data pipeline security and governance
- **Privacy officer / DPO** — DSGAI07, DSGAI08, DSGAI19 — data minimisation, retention, and reviewer exposure
- **Security engineer** — PS and RV practices; access protection, integrity verification, and incident response
- **Compliance officer** — full file; SSDF alignment, regulatory traceability, and data-law compliance
- **CISO** — DSGAI04, DSGAI17, DSGAI20 — data governance strategy and risk prioritisation

---

## Detailed mappings

---

### DSGAI01 — Sensitive Data Leakage

**Severity:** Critical

PII, financial data, credentials, and proprietary content are exposed through
model outputs, RAG over-retrieval, or memorisation. SP 800-218A addresses this
through access protection on training data and stores (PS.1), secure handling
in the response path (PW.5), and audit-driven detection (RV.1).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Protect data and artefacts from unauthorised access | PS.1.1-PS | PS | Deny-by-default access to corpora/embeddings; encrypt at rest |
| Secure handling of data in code paths | PW.5.1-PS | PW | Output DLP/redaction before responses leave the system |
| Audit-driven anomaly detection | RV.1.1-PS | RV | Detect over-retrieval and bulk-access anomalies |

#### Mitigations

**Foundational** — PS.1.1-PS: deny-by-default RAG access scoped to the caller; PW.5.1-PS: enable output PII/secret redaction.
**Hardening** — PS.1.1-PS: encrypt corpora at rest; RV.1.1-PS: alert on bulk/out-of-pattern retrieval.
**Advanced** — continuous DLP on the response path; field-level access logging within structured stores.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI02 — Agent Identity & Credential Exposure

**Severity:** Critical

Agent credentials and secrets are embedded in prompts, cached, or passed through
tool calls. SP 800-218A protects artefacts and secrets from unauthorised access
(PS.1), versions/provenance of protected releases (PS.3), and secure handling in
code (PW.5).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Protect secrets and artefacts from unauthorised access | PS.1.1-PS | PS | Vault all credentials; keep secrets out of prompts/memory |
| Provenance & protected release management | PS.3.1-PS | PS | Track and protect signed artefacts and their access |
| Secure credential handling in code | PW.5.1-PS | PW | No hardcoded secrets; inject from a vault at runtime |

#### Mitigations

**Foundational** — PS.1.1-PS: vault credentials; remove secrets from model context.
**Hardening** — PW.5.1-PS: short-lived scoped tokens per agent; secret-scan logs and tool payloads.
**Advanced** — automated rotation and replay detection for agent identities.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency) · Agentic: ASI03 (Identity & Privilege Abuse)

---

### DSGAI03 — Shadow AI & Unsanctioned Data Flows

**Severity:** High

Employees route data through unapproved AI tools. SP 800-218A vets reused/third-
party components (PW.4), sets governance requirements (PW.1), and monitors for
unauthorised use (RV.1).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Vet third-party / reused components & services | PW.4.1-PS | PW | Allowlist and assess external AI tools before use |
| Define security & governance requirements | PW.1.1-PS | PW | Policy on approved AI services and data classes |
| Monitor for unauthorised use | RV.1.1-PS | RV | Detect egress to non-approved AI endpoints |

#### Mitigations

**Foundational** — PW.1.1-PS: publish approved-AI list and data-handling policy.
**Hardening** — PW.4.1-PS/RV.1.1-PS: DLP at the boundary; alert on unsanctioned egress.
**Advanced** — sanctioned in-boundary AI alternatives; usage analytics.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI04

---

### DSGAI04 — Data, Model & Artifact Poisoning

**Severity:** Critical

Attackers corrupt training data, weights, or RAG corpora. SP 800-218A verifies
integrity (PS.2), manages provenance of releases (PS.3), vets sources (PW.4), and
performs root-cause analysis (RV.3).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Verify integrity of data & artefacts | PS.2.1-PS | PS | Checksums/signatures on datasets and weights |
| Provenance & protected releases | PS.3.1-PS | PS | Track provenance; protect/version model artefacts |
| Vet data sources & dependencies | PW.4.1-PS | PW | Assess and sign training/RAG sources |
| Root-cause analysis of integrity incidents | RV.3.1-PS | RV | Analyse poisoning events and remediate systemically |

#### Mitigations

**Foundational** — PS.2.1-PS: validate/quarantine anomalous records; verify artefact signatures at load.
**Hardening** — PS.3.1-PS/PW.4.1-PS: provenance-track sources; poisoning tests in CI.
**Advanced** — RV.3.1-PS: continuous integrity monitoring; systemic root-cause playbooks.

#### Cross-references

- LLM Top 10: LLM04 (Data and Model Poisoning) · Agentic: ASI04

---

### DSGAI05 — Data Integrity & Validation Failures

**Severity:** High

Data enters pipelines without validation. SP 800-218A verifies integrity (PS.2),
mandates secure handling/validation in code (PW.5), and reviews/tests (PW.7).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Integrity verification mechanisms | PS.2.1-PS | PS | Detect tampering of data in transit/at rest |
| Validation in secure coding | PW.5.1-PS | PW | Schema/type/size validation at every boundary |
| Review & test for validation gaps | PW.7.2-PS | PW | Test ingestion paths with malformed/adversarial data |

#### Mitigations

**Foundational** — PW.5.1-PS: schema-validate ingested data; reject on violation.
**Hardening** — PW.7.2-PS: fuzz ingestion in CI; PS.2.1-PS integrity checks.
**Advanced** — signed data contracts between pipeline stages.

#### Cross-references

- LLM Top 10: LLM05 (Improper Output Handling) · Agentic: ASI05

---

### DSGAI06 — Tool, Plugin & Agent Data Exchange

**Severity:** High

Data crosses trust boundaries to tools/plugins. SP 800-218A vets third-party
components (PW.4), protects access (PS.1), and reviews design (PW.2).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Vet third-party tools & plugins | PW.4.1-PS | PW | Review and minimum-scope each integration |
| Protect data exchanged with tools | PS.1.1-PS | PS | Validate tool returns; minimise tool inputs |
| Design review of trust boundaries | PW.2.1-PS | PW | Model tool I/O as a trust boundary |

#### Mitigations

**Foundational** — PS.1.1-PS: treat tool output as untrusted; strip sensitive fields from tool inputs.
**Hardening** — PW.4.1-PS: vetted-tool registry; tool-return validation tests.
**Advanced** — PW.2.1-PS: boundary model reviewed per integration.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency) · Agentic: ASI02 (Tool Misuse)

---

### DSGAI07 — Data Governance, Lifecycle & Classification

**Severity:** High

Data lacks classification, retention, and lifecycle controls. SP 800-218A sets
requirements (PW.1), reviews design (PW.2), and manages release provenance (PS.3).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Governance & classification requirements | PW.1.1-PS | PW | Mandate classification, retention, ownership |
| Lifecycle design review | PW.2.1-PS | PW | Design retention/deletion into the pipeline |
| Provenance & versioned artefacts | PS.3.1-PS | PS | Track data/artefact lineage across the lifecycle |

#### Mitigations

**Foundational** — PW.1.1-PS: classify data on ingest; assign owners.
**Hardening** — PW.2.1-PS: enforce retention/deletion; audit classified access.
**Advanced** — PS.3.1-PS: programme-level governance metrics and lineage.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI06

---

### DSGAI08 — Non-Compliance & Regulatory Violations

**Severity:** High

Processing violates GDPR/EU AI Act/HIPAA/PCI or omits data-subject rights.
SP 800-218A sets compliance requirements (PW.1), reviews design (PW.2), and
analyses compliance failures (RV.3).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Regulatory & compliance requirements | PW.1.1-PS | PW | Map processing to regulation and lawful basis |
| Design for data-subject rights | PW.2.1-PS | PW | Build erasure/access/rectification into design |
| Compliance failure analysis | RV.3.1-PS | RV | Root-cause and remediate compliance gaps |

#### Mitigations

**Foundational** — PW.1.1-PS: record lawful basis; map regulated flows.
**Hardening** — PW.2.1-PS: end-to-end data-subject-rights incl. RAG/embeddings.
**Advanced** — RV.3.1-PS: continuous compliance monitoring and evidence.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI09 — Multimodal Cross-Channel Data Leakage

**Severity:** High

Sensitive data in images/audio/video/documents leaks via multimodal pipelines.
SP 800-218A protects access (PS.1), secures handling (PW.5), and tests (PW.7).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Protect multimodal data stores | PS.1.1-PS | PS | Scope access to multimodal assets |
| Cross-modal extraction & redaction | PW.5.1-PS | PW | Redact extracted content across modalities |
| Multimodal leakage testing | PW.7.2-PS | PW | Test EXIF/steganography/embedded-text paths |

#### Mitigations

**Foundational** — PW.5.1-PS: strip metadata; scan media for embedded data.
**Hardening** — PW.7.2-PS: modality-aware redaction; multimodal leakage tests.
**Advanced** — per-modality threat model maintained per input type.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI01

---

### DSGAI10 — Synthetic Data & Anonymisation Pitfalls

**Severity:** Medium

Synthetic data re-identifies subjects or anonymisation fails. SP 800-218A
reviews/tests (PW.7), runs adversarial testing (PW.8), and analyses failures (RV.3).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Privacy review of synthetic data | PW.7.2-PS | PW | Review anonymisation method and assumptions |
| Adversarial re-identification testing | PW.8.2-PS | PW | Run linkage/membership attacks on released data |
| Root-cause of privacy failures | RV.3.1-PS | RV | Remediate anonymisation gaps |

#### Mitigations

**Foundational** — PW.7.2-PS: document anonymisation method.
**Hardening** — PW.8.2-PS: linkage/membership attacks on synthetic data.
**Advanced** — differential-privacy guarantees with measured budgets.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI11 — Cross-Context Conversation Bleed

**Severity:** High

Session/tenant context bleeds across users. SP 800-218A mandates secure coding
for isolation (PW.5), access protection (PS.1), and testing (PW.7).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Isolation in secure coding | PW.5.1-PS | PW | Per-session/tenant state isolation; scrub on teardown |
| Protect session state | PS.1.1-PS | PS | Key caches/memory per principal |
| Bleed testing | PW.7.2-PS | PW | Test cross-session/tenant isolation under load |

#### Mitigations

**Foundational** — PW.5.1-PS: key state per user/tenant; clear on teardown.
**Hardening** — PW.7.2-PS: cross-session bleed tests; review caches.
**Advanced** — verified isolation under concurrency.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI06

---

### DSGAI12 — Unsafe NL Data Gateways

**Severity:** Critical

NL-to-SQL/API gateways execute model-generated queries. SP 800-218A mandates
secure coding (PW.5), review/test (PW.7), and access protection (PS.1).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Parameterised query handling | PW.5.1-PS | PW | Parameterise and scope generated queries |
| Review/test of gateway code | PW.7.2-PS | PW | Injection tests against the gateway |
| Execution-time access control | PS.1.1-PS | PS | Run under the user's permissions, not a service account |

#### Mitigations

**Foundational** — PW.5.1-PS: parameterise queries; read-scope by default.
**Hardening** — PW.7.2-PS/PS.1.1-PS: identity passthrough; injection tests.
**Advanced** — allowlist query patterns; no write path by default.

#### Cross-references

- LLM Top 10: LLM05 (Improper Output Handling) · Agentic: ASI05

---

### DSGAI13 — Vector Store Platform Security

**Severity:** High

The embedding tier lacks standard security controls. SP 800-218A protects access
(PS.1), verifies integrity (PS.2), and hardens build/config (PW.6).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Protect the vector store | PS.1.1-PS | PS | Authenticated, per-namespace access; encrypt embeddings |
| Integrity of the embedding tier | PS.2.1-PS | PS | Detect tampering of stored vectors |
| Secure configuration | PW.6.1-PS | PW | Harden vector-DB configuration and exposure |

#### Mitigations

**Foundational** — PS.1.1-PS: authenticate and network-restrict; encrypt at rest.
**Hardening** — PW.6.1-PS: config review; namespace isolation tests.
**Advanced** — recurring architecture assessment of the RAG tier.

#### Cross-references

- LLM Top 10: LLM08 (Vector and Embedding Weaknesses) · Agentic: ASI06

---

### DSGAI14 — Excessive Telemetry & Monitoring Leakage

**Severity:** High

Telemetry captures sensitive data in logs/traces. SP 800-218A protects access
(PS.1), sets retention requirements (PW.1), and secures handling (PW.5).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Protect telemetry stores | PS.1.1-PS | PS | Restrict access to logs/traces |
| Retention requirements | PW.1.1-PS | PW | Bound telemetry retention by policy |
| Redaction in the telemetry path | PW.5.1-PS | PW | Redact/hash sensitive fields before logging |

#### Mitigations

**Foundational** — PW.5.1-PS: redact prompts/outputs in logs; restrict access.
**Hardening** — PW.1.1-PS: enforce retention limits; scan sinks for PII.
**Advanced** — privacy-by-design telemetry with field-level governance.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI15 — Over-Broad Context Windows

**Severity:** High

Large context windows aggregate data into one exfiltration target. SP 800-218A
sets minimisation requirements (PW.1), reviews design (PW.2), and secures
assembly code (PW.5).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Context-minimisation requirements | PW.1.1-PS | PW | Require need-to-know context assembly |
| Design review of context assembly | PW.2.1-PS | PW | Authorise each context item for the caller |
| Secure assembly in code | PW.5.1-PS | PW | Cap and scope context construction |

#### Mitigations

**Foundational** — PW.1.1-PS: trim context to task need; authorise each item.
**Hardening** — PW.5.1-PS: context-extraction tests; cap assembly.
**Advanced** — PW.2.1-PS: data-need model per task type.

#### Cross-references

- LLM Top 10: LLM08 (Vector and Embedding Weaknesses) · Agentic: ASI06

---

### DSGAI16 — Endpoint & Browser Assistant Overreach

**Severity:** High

Endpoint assistants access data beyond their declared scope. SP 800-218A vets
components (PW.4), protects access (PS.1), and reviews design (PW.2).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Vet endpoint extensions | PW.4.1-PS | PW | Review assistant/extension permissions before use |
| Protect local data access | PS.1.1-PS | PS | Constrain to declared resources; require consent |
| Design review of scope | PW.2.1-PS | PW | Model endpoint data-access boundaries |

#### Mitigations

**Foundational** — PS.1.1-PS: restrict local file/tab/clipboard access; require consent.
**Hardening** — PW.2.1-PS: test out-of-scope access; log local actions.
**Advanced** — enforced endpoint permission model.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency) · Agentic: ASI02 (Tool Misuse)

---

### DSGAI17 — Data Availability & Resilience Failures

**Severity:** High

No tested backup/recovery for data/model assets; no DoS protection for pipelines.
SP 800-218A manages protected releases/archives (PS.3), responds/remediates (RV.2),
and sets resilience requirements (PW.1).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Archive & protect releases | PS.3.1-PS | PS | Back up corpora, weights, indices with tested restore |
| Assess & remediate availability incidents | RV.2.1-PS | RV | Respond to exhaustion/loss events |
| Resilience requirements | PW.1.1-PS | PW | Require quotas, rate limits, graceful degradation |

#### Mitigations

**Foundational** — PS.3.1-PS: back up data/model/index assets; add rate limits.
**Hardening** — RV.2.1-PS: restore drills (RTO/RPO); exhaustion alerting.
**Advanced** — PW.1.1-PS: resilience architecture; availability testing.

#### Cross-references

- LLM Top 10: LLM10 (Unbounded Consumption) · Agentic: ASI08 (Cascading Failures)

---

### DSGAI18 — Inference & Data Reconstruction

**Severity:** High

Attackers reconstruct training data via membership inference/inversion.
SP 800-218A runs adversarial testing (PW.8), reviews (PW.7), and protects data (PS.1).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Adversarial inference testing | PW.8.2-PS | PW | Run membership-inference/inversion attacks |
| Review of inference exposure | PW.7.2-PS | PW | Limit signals (logits/confidence) aiding inference |
| Protect training data | PS.1.1-PS | PS | Access-control and minimise training data |

#### Mitigations

**Foundational** — PW.7.2-PS: suppress raw logits/confidence; rate-limit queries.
**Hardening** — PW.8.2-PS: membership-inference tests; measure attack advantage.
**Advanced** — differential-privacy / output-perturbation controls.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI19 — Human-in-Loop & Labeler Overexposure

**Severity:** Medium

Reviewers and labellers access sensitive data without minimisation. SP 800-218A
protects access (PS.1), sets reviewer requirements (PW.1), and vets external
labelling providers (PW.4).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Protect reviewer-facing data | PS.1.1-PS | PS | Scope reviewer access; mask non-essential fields |
| Reviewer data-handling requirements | PW.1.1-PS | PW | Define what labellers may see |
| Vet external labelling providers | PW.4.1-PS | PW | Assess third-party labelling data exposure |

#### Mitigations

**Foundational** — PS.1.1-PS: mask non-essential PII in labeling UIs.
**Hardening** — PW.1.1-PS: attributable reviewer identities; access audit.
**Advanced** — privacy-preserving review workflows.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure) · Agentic: ASI03

---

### DSGAI20 — Model Exfiltration & IP Replication

**Severity:** High

Adversaries extract weights or replicate the model via queries. SP 800-218A
protects artefacts (PS.1), manages provenance (PS.3), and tests (PW.8).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Protect model artefacts | PS.1.1-PS | PS | Access-control weights; scope/budget inference |
| Provenance & release protection | PS.3.1-PS | PS | Protect and track model releases |
| Extraction-resistance testing | PW.8.2-PS | PW | Simulate model-stealing query campaigns |

#### Mitigations

**Foundational** — PS.1.1-PS: access-control weights; per-principal rate limits.
**Hardening** — PW.8.2-PS: detect extraction query patterns; throttle/alert.
**Advanced** — watermarking / output-perturbation defences.

#### Cross-references

- LLM Top 10: LLM10 (Unbounded Consumption) · Agentic: ASI04

---

### DSGAI21 — Disinformation via Data Poisoning

**Severity:** High

Attackers poison training/RAG sources to cause systematic falsehoods.
SP 800-218A vets sources (PW.4), verifies integrity (PS.2), and analyses
failures (RV.3).

#### SP 800-218A mapping

| Practice | ID | Group | Description |
|---|---|---|---|
| Vet & sign data sources | PW.4.1-PS | PW | Provenance-track training/RAG sources |
| Integrity verification | PS.2.1-PS | PS | Detect injected/tampered content |
| Root-cause of disinformation incidents | RV.3.1-PS | RV | Analyse and remediate poisoning systemically |

#### Mitigations

**Foundational** — PW.4.1-PS: vet sources; ground outputs with citations.
**Hardening** — PS.2.1-PS: corpus-integrity monitoring; targeted-falsehood tests.
**Advanced** — RV.3.1-PS: provenance model across the data supply chain.

#### Cross-references

- LLM Top 10: LLM09 (Misinformation) · Agentic: ASI04 (Agentic Supply Chain)

---

## Implementation priority

| Phase | PW — Produce | PS — Protect | RV — Respond |
|---|---|---|---|
| 1 — Now | PW.1.1-PS governance/compliance requirements for DSGAI07/08; PW.5.1-PS output handling for DSGAI01 | PS.1.1-PS access controls for DSGAI01/02; secret protection | RV.1.1-PS monitoring for DSGAI03 shadow AI |
| 2 — This sprint | PW.4.1-PS source vetting for DSGAI04/21; PW.5.1-PS validation for DSGAI05/12 | PS.2.1-PS integrity for DSGAI04/05; PS.3.1-PS provenance for DSGAI04/07 | RV.2.1-PS availability/deletion response for DSGAI17 |
| 3 — This quarter | PW.7.2-PS review for DSGAI09/11; PW.2.1-PS minimisation design for DSGAI14/15 | PS.1.1-PS vector-store & telemetry protection for DSGAI13/14 | RV.3.1-PS root-cause playbooks for DSGAI08/21 |
| 4 — Ongoing | PW.8.2-PS adversarial testing for DSGAI10/18/20; privacy red team | Model-artefact protection for DSGAI20; provenance verification | Production compliance monitoring; governance effectiveness reviews |

---

## References

- [NIST SP 800-218A (Initial Public Draft, March 2024)](https://doi.org/10.6028/NIST.SP.800-218A.ipd)
- [NIST SSDF (SP 800-218)](https://csrc.nist.gov/publications/detail/sp/800-218/final)
- [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework)
- [MITRE ATLAS](https://atlas.mitre.org)
- [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-03-27 | Initial release — full mapping DSGAI01–DSGAI21 to SP 800-218A |
| 1.1.0 | 2026-05-29 | Corrected to canonical DSGAI 2026 taxonomy (entries had used a pre-release taxonomy); SSDF/SP 800-218A practice mappings rewritten; fixed malformed `## Why` section and standardised em-dashes |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) —
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
*License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)*
