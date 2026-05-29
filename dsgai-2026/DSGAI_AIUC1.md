<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks 2026 (DSGAI01-DSGAI21)
  Framework   : AIUC-1 — The standard for AI agent security, safety and reliability
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 × AIUC-1

Mapping the [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
(DSGAI01–DSGAI21) to [AIUC-1](https://www.aiuc-1.com/) — the world's
first AI agent security, safety and reliability certification framework,
developed with 100+ Fortune 500 CISOs.

AIUC-1 is an OWASP GenAI Security Project partner. Its six domains
(Data & Privacy, Security, Safety, Reliability, Accountability, Society)
map directly to the data security concerns across the DSGAI taxonomy —
Domain A (Data & Privacy) alone covers a majority of the 21 DSGAI entries.

---

## Why AIUC-1 for GenAI data security

AIUC-1 provides the most direct single-framework coverage for DSGAI data security risks. Domain A (Data & Privacy) maps to data leakage, classification, access control, and privacy requirements across the majority of the 21 entries, while the Security (B), Accountability (E), and Society (F) domains address the adversarial, audit, and governance dimensions of GenAI data risk.

---

## AIUC-1 domains at a glance

| Domain | ID | Focus |
|---|---|---|
| Data & Privacy | A | PII protection, data leakage, IP, access controls, training data |
| Security | B | Adversarial robustness, injection, output filtering, permissions |
| Safety | C | Harm prevention, unsafe outputs, guardrails, human oversight |
| Reliability | D | Availability, consistency, failure recovery, rate limiting |
| Accountability | E | Audit trails, logging, explainability, incident response |
| Society | F | Bias, misinformation, societal harm, transparency |

---

## Quick-reference summary

| ID | Name | Severity | Primary AIUC-1 Domains/Controls | Tier |
|---|---|---|---|---|
| DSGAI01 | Sensitive Data Leakage | Critical | A (all), B009, B006 | Foundational–Hardening |
| DSGAI02 | Agent Identity & Credential Exposure | Critical | A, B007, B008, E | Foundational–Hardening |
| DSGAI03 | Shadow AI & Unsanctioned Data Flows | High | A, E, B007, F | Foundational–Hardening |
| DSGAI04 | Data Model & Artifact Poisoning | Critical | A, B001, B002, B008 | Hardening–Advanced |
| DSGAI05 | Data Integrity & Validation Failures | High | A, B005, B006 | Foundational–Hardening |
| DSGAI06 | Tool Plugin & Agent Data Exchange | High | A, B003, B007, E | Foundational–Hardening |
| DSGAI07 | Data Governance & Lifecycle | High | A, E, F | Foundational–Hardening |
| DSGAI08 | Non-Compliance & Regulatory Violations | High | A, E, F, C | Foundational–Hardening |
| DSGAI09 | Multimodal Cross-Channel Leakage | Medium | A, B009, B006 | Hardening–Advanced |
| DSGAI10 | Synthetic Data & Anonymization Pitfalls | Medium | A, F | Hardening–Advanced |
| DSGAI11 | Cross-Context Conversation Bleed | High | A, B006, E | Foundational–Hardening |
| DSGAI12 | Unsafe NL Data Gateways | Critical | B005, B006, B009, A | Foundational–Advanced |
| DSGAI13 | Vector Store Platform Security | High | A, B008, E | Hardening–Advanced |
| DSGAI14 | Excessive Telemetry & Monitoring Leakage | Medium | A, E, B009 | Foundational–Hardening |
| DSGAI15 | Over-Broad Context Windows | High | A, B005, B006 | Foundational–Hardening |
| DSGAI16 | Endpoint & Browser Overreach | High | B006, B007, A | Foundational–Hardening |
| DSGAI17 | Data Availability & Resilience Failures | High | D, A, E | Foundational–Hardening |
| DSGAI18 | Inference & Data Reconstruction | High | A, B004, B006 | Hardening–Advanced |
| DSGAI19 | Human-in-Loop & Labeler Overexposure | Medium | A, E, F | Foundational–Hardening |
| DSGAI20 | Model Exfiltration & IP Replication | Critical | A, B004, B006, E | Hardening–Advanced |
| DSGAI21 | Disinformation & Integrity Attacks | High | C, F, B002, B005 | Hardening–Advanced |

---

## Audience tags

- **Data engineer / ML engineer** — Domain A, B001, B002 — data pipeline security
- **Security engineer** — B001–B009, E — full security domain
- **Auditor** — A, E, B003, B007 — compliance and evidence
- **CISO / governance** — A, C, E, F — programme and oversight
- **Privacy officer** — Domain A, DSGAI03, DSGAI14, DSGAI18, DSGAI19
- **AI red teamer** — B001, B002, B005 — adversarial data pipeline testing

---

## Detailed mappings

---

### DSGAI01 — Sensitive Data Leakage

**Severity:** Critical

Sensitive data — PII, credentials, financial records, proprietary code — leaks from GenAI systems through model outputs, RAG retrieval, embedding exposure, or observability pipelines.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain (all) | A | Data classification, access controls, and leakage prevention for all GenAI data | Foundational |
| Limit output over-exposure | B009 | Output filtering preventing disclosure of sensitive information in model responses | Foundational |
| Prevent unauthorized AI actions | B006 | Restrict model actions that could expose sensitive data beyond authorised scope | Foundational |
| Audit trails and logging | E | Audit trail of all data access and output events for forensic reconstruction | Hardening |

**Mitigations:**
- Domain A: classify all data in GenAI scope; implement DLP on all output channels
- B009: output redaction for PII, credentials, API keys before responses reach users
- B006: access-scoped RAG retrieval — users only retrieve documents they are authorised for
- Domain E: log all model outputs at integration points for forensic reconstruction

---

### DSGAI02 — Agent Identity & Credential Exposure

**Severity:** Critical

Agent credentials — session tokens, API keys, delegated permissions — are exposed through memory, logs, tool payloads, or inter-agent communication, enabling credential theft and lateral movement.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Credential data classified as sensitive; access controls on token storage | Foundational |
| Enforce user access privileges | B007 | Agents operate within the privilege envelope of the authorising user | Foundational |
| Protect model deployment environment | B008 | Encrypted credential storage; secure agent runtime environment | Foundational |
| Audit trails and logging | E | Audit logging of all credential issuance, use, and expiry events | Hardening |

**Mitigations:**
- Domain A: short-lived, task-scoped credentials per agent invocation; no long-lived tokens
- B007: enforce least privilege — agent maximum privilege equals authorising user's privilege
- B008: encrypted credential storage with strict access controls on agent runtime
- Domain E: full audit trail on all agent identity operations

---

### DSGAI03 — Shadow AI & Unsanctioned Data Flows

**Severity:** High

Employees or teams deploy unauthorised GenAI tools that process corporate data outside governed channels, creating invisible data flows beyond security and compliance controls.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Data governance policies covering all AI tool usage | Foundational |
| Enforce user access privileges | B007 | Only approved AI tools and services permitted for corporate data | Foundational |
| Audit trails and logging | E | Visibility into which AI services are accessing corporate data | Hardening |
| Society domain | F | Transparency requirements for AI tool usage across the organisation | Foundational |

**Mitigations:**
- Domain A: approved AI tools policy; corporate data may only be processed by sanctioned services
- B007: network-level enforcement blocking unapproved AI service endpoints
- Domain E: monitoring for data flows to unapproved AI services (shadow AI detection)
- Domain F: transparency reporting on AI tool usage across the organisation

---

### DSGAI04 — Data Model & Artifact Poisoning

**Severity:** Critical

Training data, fine-tuning pipelines, or model weights are corrupted to embed backdoors, bias, or degraded behaviours that persist through deployment.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Training data integrity, provenance, and access control | Foundational |
| Third-party adversarial robustness testing | B001 | Backdoor and poisoning detection in training pipeline | Hardening |
| Detect adversarial input | B002 | Detect anomalous training data patterns and model weight modifications | Hardening |
| Protect model deployment environment | B008 | Integrity verification of model artifacts before deployment | Foundational |

**Mitigations:**
- Domain A: access controls on all training data repositories; hash verification for datasets
- B001: adversarial probing of trained models for backdoor triggers before production
- B002: statistical anomaly detection on training data distributions
- B008: signed model registry with checksum verification in CI/CD

---

### DSGAI05 — Data Integrity & Validation Failures

**Severity:** High

Insufficient validation on AI data ingestion interfaces allows corrupted, malformed, or adversarial data to enter processing pipelines, degrading output quality or enabling attacks.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Data quality standards and validation requirements for all AI inputs | Foundational |
| Implement real-time input filtering | B005 | Validate and filter all data before it enters AI processing pipelines | Foundational |
| Prevent unauthorized AI actions | B006 | Prevent processing of invalid or adversarial data inputs | Foundational |

**Mitigations:**
- Domain A: define data quality standards for all AI input sources; enforce schema validation
- B005: automated input validation on all data ingestion points; reject malformed data
- B006: quarantine mechanisms for data that fails validation checks

---

### DSGAI06 — Tool Plugin & Agent Data Exchange

**Severity:** High

Sensitive context — user data, credentials, conversation history — exchanged with third-party tools, plugins, or MCP servers without adequate access controls or data minimisation.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Data minimisation requirements for tool/plugin data exchange | Foundational |
| Manage public release of technical details | B003 | Control what data is shared with third-party tool providers | Hardening |
| Enforce user access privileges | B007 | Tool access limited to data the authorising user can access | Foundational |
| Audit trails and logging | E | Log all data exchanged with external tools and plugins | Foundational |

**Mitigations:**
- Domain A: data minimisation — only send minimum necessary context to tools
- B003: review and approve all tool/plugin data sharing before deployment
- B007: per-tool permission manifests; tools cannot access data beyond authorised scope
- Domain E: audit log every data exchange with external tools

---

### DSGAI07 — Data Governance & Lifecycle

**Severity:** High

Governance gaps for AI-derived data assets — embeddings, fine-tuned models, generated content, cached outputs — leave them outside retention, classification, and disposal policies.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Classification and lifecycle management for all AI-derived data | Foundational |
| Audit trails and logging | E | Governance evidence — data lineage, retention compliance, disposal records | Foundational |
| Society domain | F | Transparency on how AI-derived data is created, used, and retained | Hardening |

**Mitigations:**
- Domain A: extend data classification to all AI-derived assets; define retention policies
- Domain A: automated disposal of expired AI data assets per retention schedule
- Domain E: maintain data lineage records from source through all AI transformations
- Domain F: document and publish AI data governance policies

---

### DSGAI08 — Non-Compliance & Regulatory Violations

**Severity:** High

GenAI systems fail to meet regulatory obligations — GDPR, EU AI Act, sector-specific requirements — due to inadequate data handling, missing documentation, or uncontrolled processing.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Regulatory-compliant data handling across all AI operations | Foundational |
| Audit trails and logging | E | Compliance evidence — processing records, consent logs, DPIA documentation | Foundational |
| Society domain | F | Transparency and fairness obligations under regulatory frameworks | Foundational |
| Safety domain | C | Risk assessment documentation per EU AI Act requirements | Hardening |

**Mitigations:**
- Domain A: map all AI data processing to applicable regulatory requirements
- Domain E: maintain processing records and consent logs as compliance evidence
- Domain F: implement transparency requirements (AI Act Art. 52, GDPR Art. 13-14)
- Domain C: conduct and document AI risk assessments per regulatory requirements

---

### DSGAI09 — Multimodal Cross-Channel Leakage

**Severity:** Medium

Data leaks across modalities — text-to-image, speech-to-text, OCR — when sensitive information in one channel surfaces in another without appropriate controls.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Cross-modal data flow controls and classification | Hardening |
| Limit output over-exposure | B009 | Output filtering across all modalities | Hardening |
| Prevent unauthorized AI actions | B006 | Prevent cross-modal data exposure beyond authorised scope | Hardening |

**Mitigations:**
- Domain A: classify data sensitivity per modality; enforce consistent controls across channels
- B009: apply output filtering to all modalities — text, image, audio, video
- B006: enforce access controls consistently across modality boundaries

---

### DSGAI10 — Synthetic Data & Anonymization Pitfalls

**Severity:** Medium

Synthetic data generation or anonymization techniques fail to prevent re-identification, membership inference, or attribute inference from the generated datasets.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Privacy-preserving synthetic data generation requirements | Hardening |
| Society domain | F | Fairness and bias considerations in synthetic data | Hardening |

**Mitigations:**
- Domain A: formal privacy guarantees (differential privacy) for synthetic data generation
- Domain A: re-identification risk assessments before releasing synthetic datasets
- Domain F: bias audits on synthetic data to ensure fairness properties are preserved

---

### DSGAI11 — Cross-Context Conversation Bleed

**Severity:** High

Data from one user session, tenant, or conversation context leaks into another due to shared memory, caching, or insufficient context isolation.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Session and tenant isolation for all AI conversation data | Foundational |
| Prevent unauthorized AI actions | B006 | Prevent cross-tenant or cross-session data access | Foundational |
| Audit trails and logging | E | Log context boundaries and detect cross-context access | Hardening |

**Mitigations:**
- Domain A: enforce strict session isolation — no shared state between users or tenants
- B006: architectural enforcement of context boundaries at the data layer
- Domain E: monitoring for cross-context data access patterns; alert on violations

---

### DSGAI12 — Unsafe NL Data Gateways

**Severity:** Critical

LLM-to-SQL, LLM-to-API, or LLM-to-shell interfaces allow natural language inputs to be converted into executable queries or commands without proper validation, enabling data exfiltration or manipulation.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Implement real-time input filtering | B005 | Filter NL inputs before they reach data gateway translation | Foundational |
| Prevent unauthorized AI actions | B006 | Restrict gateway operations to read-only or allow-listed actions | Foundational |
| Limit output over-exposure | B009 | Filter gateway outputs to prevent sensitive data disclosure | Foundational |
| Data & Privacy domain | A | Access controls on underlying data sources accessed via NL gateways | Foundational |

**Mitigations:**
- B005: input validation on all NL-to-query translation; block injection patterns
- B006: enforce allow-listed operations — NL gateways cannot execute destructive queries
- B009: output row/column limits; redact sensitive fields from query results
- Domain A: gateway queries execute with the requesting user's permissions, not system-level

---

### DSGAI13 — Vector Store Platform Security

**Severity:** High

Vector databases and embedding stores lack access controls, encryption, or integrity verification — enabling unauthorised access to embeddings that encode sensitive information.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Access controls and encryption for vector stores | Foundational |
| Protect model deployment environment | B008 | Secure deployment of vector database infrastructure | Hardening |
| Audit trails and logging | E | Audit logging of all vector store access and modifications | Hardening |

**Mitigations:**
- Domain A: implement RBAC on vector stores; encrypt embeddings at rest and in transit
- B008: deploy vector databases in secured, access-controlled environments
- Domain E: log all vector store queries and index modifications

---

### DSGAI14 — Excessive Telemetry & Monitoring Leakage

**Severity:** Medium

Observability pipelines — logs, traces, metrics — capture sensitive data from AI interactions (prompts, responses, user data) and store it with insufficient access controls.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Data minimisation in observability pipelines | Foundational |
| Audit trails and logging | E | Secure logging practices — redact sensitive data before storage | Foundational |
| Limit output over-exposure | B009 | Prevent sensitive data from entering telemetry streams | Foundational |

**Mitigations:**
- Domain A: classify telemetry data; apply retention limits and access controls
- Domain E: redact PII and sensitive content from logs and traces before storage
- B009: filter sensitive data from telemetry streams at the collection point

---

### DSGAI15 — Over-Broad Context Windows

**Severity:** High

Excessive content injected into LLM context windows — full documents, entire conversation histories, unnecessary system data — increases the attack surface for data extraction.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Data minimisation in context assembly | Foundational |
| Implement real-time input filtering | B005 | Filter and scope content before context window assembly | Foundational |
| Prevent unauthorized AI actions | B006 | Enforce maximum context scope per task | Hardening |

**Mitigations:**
- Domain A: only include minimum necessary data in context windows
- B005: truncate or summarise documents before context inclusion; strip unnecessary metadata
- B006: per-task context scope limits; prevent context from exceeding authorised data boundaries

---

### DSGAI16 — Endpoint & Browser Overreach

**Severity:** High

AI agents operating in browsers, desktop environments, or mobile devices access more data than necessary — reading screens, files, or network data beyond the task scope.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Prevent unauthorized AI actions | B006 | Restrict agent access to minimum necessary endpoint data | Foundational |
| Enforce user access privileges | B007 | Agent endpoint access limited to authorised user scope | Foundational |
| Data & Privacy domain | A | Data minimisation for endpoint/browser AI agent operations | Foundational |

**Mitigations:**
- B006: explicit permission grants per data source; agents cannot access files, screens, or network data without authorisation
- B007: agent inherits user's access level — cannot escalate beyond endpoint permissions
- Domain A: data minimisation — agents read only the specific data elements needed for the task

---

### DSGAI17 — Data Availability & Resilience Failures

**Severity:** High

AI data pipelines fail silently — RAG retrieval returns stale results, embedding indices corrupt, training data becomes unavailable — degrading AI system reliability without alerting operators.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Reliability domain | D | Availability, consistency, failure recovery for AI data systems | Foundational |
| Data & Privacy domain | A | Backup and recovery for critical AI data assets | Foundational |
| Audit trails and logging | E | Monitoring and alerting for data pipeline health | Foundational |

**Mitigations:**
- Domain D: circuit breakers and health checks on all AI data pipelines
- Domain A: versioned backups of critical data assets — embeddings, indices, training data
- Domain E: real-time monitoring of data pipeline availability; alert on degradation

---

### DSGAI18 — Inference & Data Reconstruction

**Severity:** High

Attackers reconstruct sensitive training data or infer membership through model inversion, membership inference, or attribute inference attacks against deployed models.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Privacy-preserving model deployment practices | Hardening |
| Prevent AI endpoint scraping | B004 | Rate limiting and access controls on inference endpoints | Foundational |
| Prevent unauthorized AI actions | B006 | Restrict bulk inference patterns that enable reconstruction | Hardening |

**Mitigations:**
- Domain A: apply differential privacy during training to bound reconstruction risk
- B004: rate limiting on inference APIs; detect systematic probing patterns
- B006: restrict bulk query patterns that enable membership inference or model inversion

---

### DSGAI19 — Human-in-Loop & Labeler Overexposure

**Severity:** Medium

Human annotators, reviewers, and labelers are exposed to sensitive, harmful, or disturbing content during AI data preparation without adequate protections.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | Access controls limiting labeler exposure to sensitive content | Foundational |
| Audit trails and logging | E | Audit of what data labelers access and review | Foundational |
| Society domain | F | Duty of care obligations for human annotators | Foundational |

**Mitigations:**
- Domain A: data segmentation — labelers only access content within their clearance scope
- Domain E: audit logging of all labeler data access for compliance and safety monitoring
- Domain F: wellbeing protections for annotators exposed to harmful content

---

### DSGAI20 — Model Exfiltration & IP Replication

**Severity:** Critical

Model weights, architectures, or trained capabilities are extracted through systematic querying, side-channel attacks, or insider access — enabling unauthorised replication of proprietary models.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Data & Privacy domain | A | IP classification and protection for model assets | Foundational |
| Prevent AI endpoint scraping | B004 | Anti-scraping controls on inference endpoints | Hardening |
| Prevent unauthorized AI actions | B006 | Restrict access patterns enabling model extraction | Hardening |
| Audit trails and logging | E | Monitoring for systematic extraction patterns | Hardening |

**Mitigations:**
- Domain A: classify model weights as high-value IP; restrict access to authorised personnel
- B004: rate limiting, watermarking, and fingerprinting on model outputs
- B006: detect and block systematic querying patterns indicative of model extraction
- Domain E: audit trail on all model access; alert on anomalous query patterns

---

### DSGAI21 — Disinformation & Integrity Attacks

**Severity:** High

Adversaries poison RAG knowledge bases, manipulate training data, or exploit model capabilities to generate and distribute false or misleading content at scale.

#### AIUC-1 mapping

| Control | ID | Description | Tier |
|---|---|---|---|
| Safety domain | C | Guardrails preventing generation of harmful disinformation | Foundational |
| Society domain | F | Transparency and content provenance requirements | Foundational |
| Detect adversarial input | B002 | Detection of poisoned content in RAG knowledge bases | Hardening |
| Implement real-time input filtering | B005 | Filter adversarial content from knowledge sources before retrieval | Hardening |

**Mitigations:**
- Domain C: content safety guardrails preventing generation of verifiable false claims
- Domain F: content provenance tracking — flag AI-generated content and source attribution
- B002: integrity monitoring of RAG knowledge bases for injected disinformation
- B005: input filtering on all knowledge source updates; verify source credibility

---

## See also

- [LLM Top 10 × AIUC-1](../llm-top10/LLM_AIUC1.md)
- [Agentic Top 10 × AIUC-1](../agentic-top10/Agentic_AIUC1.md)
- [DSGAI 2026 × ISO 42001](DSGAI_ISO42001.md)

---

## References

- [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
- [AIUC-1 Standard](https://www.aiuc-1.com)
- [AIUC-1 Data & Privacy Domain](https://www.aiuc-1.com/data-and-privacy)
- [AIUC-1 Security Domain](https://www.aiuc-1.com/security)

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-05-26 | 2026-Q1 | Rewrite all 21 entries with canonical DSGAI names and correct AIUC-1 mappings | OWASP GenAI Data Security Initiative |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) — maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
