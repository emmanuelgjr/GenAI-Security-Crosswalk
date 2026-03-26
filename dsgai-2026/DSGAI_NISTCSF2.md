<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks and Mitigations 2026 (DSGAI01-DSGAI21)
  Framework   : NIST Cybersecurity Framework 2.0 (CSF 2.0)
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 x NIST CSF 2.0

Mapping the [OWASP GenAI Data Security Risks and Mitigations 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
(DSGAI01-DSGAI21) to the [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework).

The DSGAI taxonomy follows data as it moves through a GenAI system —
from ingestion through inference to output and operational exhaust.
CSF 2.0 maps cleanly to this lifecycle: GOVERN and IDENTIFY establish
the data governance foundation, PROTECT applies controls at every
pipeline stage, DETECT monitors for leakage and integrity failures,
and RESPOND and RECOVER handle the inevitable incidents.

The most important CSF 2.0 addition for DSGAI coverage is GV.SC —
supply chain risk management as a governance function. DSGAI04 (data
and model poisoning), DSGAI05 (integrity failures), and DSGAI06 (tool
and plugin data exchange) all have supply chain dimensions that were
under-governed in CSF 1.1 and are explicitly addressed in 2.0.

---

## Quick-reference summary

| ID | Name | Severity | Primary CSF 2.0 Categories | Tier |
|---|---|---|---|---|
| DSGAI01 | Sensitive Data Leakage | Critical | PR.DS-01, PR.DS-02, PR.AA-05, DE.CM-01 | Foundational-Advanced |
| DSGAI02 | Agent Identity and Credential Exposure | Critical | PR.AA-02, PR.AA-05, DE.CM-01, RS.MA-02 | Foundational-Advanced |
| DSGAI03 | Shadow AI and Unsanctioned Data Flows | High | GV.RM-06, GV.OC-01, DE.CM-01, RS.MA-01 | Foundational-Hardening |
| DSGAI04 | Data, Model and Artifact Poisoning | Critical | GV.SC-06, PR.DS-01, PR.PS-04, DE.CM-09 | Hardening-Advanced |
| DSGAI05 | Data Integrity and Validation Failures | High | PR.PS-04, PR.DS-01, DE.CM-09, RS.MA-02 | Foundational-Hardening |
| DSGAI06 | Tool, Plugin and Agent Data Exchange | High | GV.SC-06, GV.SC-07, PR.AA-05, DE.CM-01 | Foundational-Hardening |
| DSGAI07 | Data Governance, Lifecycle and Classification | High | GV.RM-06, ID.AM-01, PR.DS-01, PR.DS-08 | Foundational-Advanced |
| DSGAI08 | Non-Compliance and Regulatory Violations | High | GV.RM-06, GV.OC-02, ID.RA-01, RS.CO-01 | Foundational-Advanced |
| DSGAI09 | Multimodal Cross-Channel Data Leakage | High | PR.DS-01, PR.DS-02, DE.CM-01, PR.AA-05 | Hardening-Advanced |
| DSGAI10 | Synthetic Data and Anonymisation Pitfalls | Medium | GV.RM-06, PR.DS-08, DE.CM-09, ID.RA-01 | Hardening-Advanced |
| DSGAI11 | Cross-Context Conversation Bleed | High | PR.AA-05, PR.DS-01, DE.CM-01, RS.MA-02 | Foundational-Hardening |
| DSGAI12 | Unsafe NL Data Gateways | Critical | PR.AA-05, PR.PS-04, DE.CM-01, RS.MA-02 | Foundational-Advanced |
| DSGAI13 | Vector Store Platform Security | High | PR.DS-01, PR.AA-05, DE.CM-09, PR.PS-02 | Foundational-Hardening |
| DSGAI14 | Excessive Telemetry and Monitoring Leakage | High | GV.RM-06, PR.DS-01, DE.CM-01, ID.AM-01 | Foundational-Hardening |
| DSGAI15 | Over-Broad Context Windows | High | PR.AA-05, PR.DS-01, DE.CM-09, GV.RM-06 | Foundational-Hardening |
| DSGAI16 | Endpoint and Browser Assistant Overreach | High | GV.RM-06, PR.PS-02, DE.CM-01, RS.MA-01 | Foundational-Hardening |
| DSGAI17 | Data Availability and Resilience Failures | High | PR.IR-01, DE.CM-01, RS.MA-02, RC.RP-02 | Foundational-Advanced |
| DSGAI18 | Inference and Data Reconstruction | High | PR.DS-01, PR.DS-08, DE.CM-09, GV.RM-06 | Hardening-Advanced |
| DSGAI19 | Human-in-Loop and Labeler Overexposure | Medium | GV.SC-07, PR.AA-05, PR.DS-08, GV.OC-01 | Foundational-Hardening |
| DSGAI20 | Model Exfiltration and IP Replication | High | PR.DS-01, PR.AA-05, DE.CM-09, RS.MA-02 | Hardening-Advanced |
| DSGAI21 | Disinformation via Data Poisoning | High | GV.SC-06, PR.DS-01, DE.CM-09, RS.MA-01 | Hardening-Advanced |

---

## Audience tags

- **CISO / governance** — full file, CSF 2.0 profile for GenAI data security
- **Risk manager** — GV and ID categories, risk register entries
- **Data security engineer** — PR.DS categories throughout
- **Privacy / DPO** — DSGAI01, DSGAI08, DSGAI10, DSGAI18, DSGAI19
- **Compliance officer** — GV.OC-02, DSGAI08 regulatory violations entry
- **OT engineer** — DSGAI04, DSGAI12, DSGAI17 with ISA 62443 crosswalk

---

## Detailed mappings

---

### DSGAI01 — Sensitive Data Leakage

**Severity:** Critical

Sensitive data leaks from GenAI systems through model outputs, RAG
retrieval, embedding exposure, or observability pipelines. CSF 2.0
PR.DS data security is the primary protection function across all
leakage paths.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Data security — data at rest | PR.DS-01 | PROTECT | All GenAI data assets encrypted at rest — training data, embeddings, RAG stores, caches |
| Data security — data in transit | PR.DS-02 | PROTECT | All GenAI data flows encrypted in transit — API calls, RAG retrieval, observability streams |
| Identity management — least privilege | PR.AA-05 | PROTECT | RAG retrieval access controls — users retrieve only authorised documents |
| Continuous monitoring | DE.CM-01 | DETECT | DLP monitoring on all LLM output channels — PII and sensitive patterns detected before delivery |

#### Mitigations by tier

**Foundational**
- PR.DS-01: Encrypt all GenAI data assets at rest — training
  corpora, embedding databases, RAG stores, prompt caches,
  and observability logs all covered
- PR.AA-05: Implement access controls on RAG data sources —
  users retrieve only documents they are authorised to
  access, enforced at the retrieval layer
- DE.CM-01: Deploy output scanning on all LLM output channels —
  PII and sensitive patterns detected before responses
  leave the service boundary

**Hardening**
- PR.DS-02: Enforce encryption on all GenAI data flows
  in transit — no cleartext data on any pipeline path
- Apply output redaction — masking of sensitive patterns
  before responses reach users
- Audit RAG access controls per sprint — verify retrieval
  scope matches authorised user access rights

**Advanced**
- Apply differential privacy in training and embedding
  generation for sensitive corpora
- Conduct model inversion red team exercises — validate
  training data cannot be reconstructed from outputs
- DE.CM-01: Extend to cover all derived assets — embeddings,
  summaries, cached retrievals monitored as primary data

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI03 Identity and Privilege Abuse
- Other frameworks: ISO 27001 A.8.11/A.8.12 · EU AI Act Art. 10 · GDPR Art. 25

---

### DSGAI02 — Agent Identity and Credential Exposure

**Severity:** Critical

AI agents inherit, cache, or misuse credentials — exposing them
through memory stores, logs, or tool payloads. CSF 2.0 PR.AA
access management is the primary protection function — NHI
governance is an access management responsibility.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Access management — account management | PR.AA-02 | PROTECT | Agent credential lifecycle management — issuance, rotation, revocation all formally managed |
| Identity management — least privilege | PR.AA-05 | PROTECT | Agent credentials scoped to minimum required access per task |
| Continuous monitoring | DE.CM-01 | DETECT | All agent credential operations logged — anomalous usage patterns detected and alerted |
| Incident analysis | RS.MA-02 | RESPOND | Incident response for credential exposure — rotation, containment, lateral movement assessment |

#### Mitigations by tier

**Foundational**
- PR.AA-02: Implement agent identity lifecycle management —
  all agent NHIs inventoried, credentials lifecycle-managed,
  no hardcoded secrets
- PR.AA-05: Scope all agent credentials to minimum required
  access — least privilege enforced per task, reviewed
  quarterly
- Issue short-lived, task-scoped credentials — never
  long-lived tokens shared across tasks or sessions

**Hardening**
- DE.CM-01: Log all agent credential operations — anomalous
  usage patterns detected and alerted through SIEM
- Implement JIT credential issuance with automatic revocation
  on task completion
- Scan agent memory stores, logs, and tool payloads for
  exposed credentials

**Advanced**
- Implement PKI-backed agent identities — certificate-based
  authentication for all agent-to-system connections
- RS.MA-02: Automated credential rotation on anomaly detection —
  not just scheduled rotation
- Conduct agent credential red team exercises — lateral
  movement using agent credentials across all accessible systems

#### Cross-references
- Agentic Top 10: ASI03 Identity and Privilege Abuse
- Other frameworks: OWASP NHI Top 10 · ISO 27001 A.8.2 · AIUC-1 A/B007

---

### DSGAI03 — Shadow AI and Unsanctioned Data Flows

**Severity:** High

Employees use unapproved GenAI SaaS tools, creating ungoverned data
flows outside formal governance. CSF 2.0 GV.RM-06 risk management
strategy and GV.OC-01 organisational context are the governance
anchors — shadow AI is fundamentally a governance failure before
it is a technical one.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Shadow AI usage documented as a foreseeable risk — acceptable use policy published and enforced |
| Organisational context | GV.OC-01 | GOVERN | Stakeholders informed of approved AI tool policy — employees understand what is permitted |
| Continuous monitoring | DE.CM-01 | DETECT | DLP monitoring for sensitive data transfer to known AI SaaS endpoints |
| Incident analysis | RS.MA-01 | RESPOND | Response for detected shadow AI incidents — data impact assessment, vendor deletion requests |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Establish and document AI acceptable use policy —
  approved tool list, prohibited use cases, consequences
  for violation
- GV.OC-01: Communicate AI tool policy to all employees —
  training on what is permitted before access to any
  AI tools is granted
- DE.CM-01: Configure DLP to detect and alert on sensitive
  data transfer to known AI SaaS endpoints

**Hardening**
- Conduct security assessment of all AI SaaS tools before
  approval — data retention, training use, sub-processors
- DE.CM-01: Implement blocking DLP for unapproved AI
  endpoints — not just alerting
- RS.MA-01: Define response for shadow AI incidents —
  data impact assessment, vendor data deletion request,
  regulatory notification if personal data involved

**Advanced**
- Implement continuous shadow AI discovery — automated
  ongoing detection across endpoints, network egress,
  and SaaS access logs
- Integrate AI tool approval into procurement — AI
  capabilities in broader SaaS captured at vendor onboarding
- GV.RM-06: Include shadow AI in board-level risk reporting —
  measurable policy compliance objective

#### Cross-references
- DSGAI 2026: DSGAI07 Data Governance, DSGAI08 Non-Compliance
- Other frameworks: ISO 27001 A.5.10/A.5.23 · NIST AI RMF GV-1.7

---

### DSGAI04 — Data, Model and Artifact Poisoning

**Severity:** Critical

Adversaries corrupt training data or model weights to embed
backdoors. CSF 2.0 GV.SC supply chain risk management is the
governance anchor — poisoning is fundamentally a supply chain
integrity failure before it is a model failure.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Supply chain risk management | GV.SC-06 | GOVERN | Security requirements applied to all training data sources — provenance, integrity, disclosure obligations |
| Data security — data at rest | PR.DS-01 | PROTECT | Training data integrity controls — cryptographic lineage, source allowlisting, tamper detection |
| Platform security — software integrity | PR.PS-04 | PROTECT | Model integrity verification before each deployment — hash-based check against approved baseline |
| Continuous monitoring | DE.CM-09 | DETECT | Anomaly detection on training data distributions and model outputs — poisoning indicators monitored |

#### Mitigations by tier

**Foundational**
- GV.SC-06: Apply supply chain security requirements to all
  training data sources — provenance documentation, integrity
  guarantees required before data enters training pipelines
- PR.DS-01: Implement training data integrity controls —
  source allowlisting, cryptographic lineage, anomaly detection
- PR.PS-04: Model integrity verification before each
  deployment — deviation from approved baseline triggers rejection

**Hardening**
- DE.CM-09: Anomaly detection on training pipelines and
  model outputs — distribution shifts and unexpected capability
  changes monitored
- Include poisoning detection in security testing — backdoor
  trigger testing before every production model promotion
- Establish model rollback capability — clean checkpoint
  always available, tested restoration procedure

**Advanced**
- Conduct post-training backdoor detection as mandatory
  pre-deployment gate
- Apply differential privacy during training
- RS.MA-02: Define incident response for confirmed poisoning —
  model rollback procedure, downstream impact assessment

#### Cross-references
- LLM Top 10: LLM03 Supply Chain, LLM04 Data and Model Poisoning
- Agentic Top 10: ASI04 Supply Chain, ASI06 Memory and Context Poisoning
- Other frameworks: NIST AI RMF MS-3.3 · MITRE ATLAS AML.T0032 · ISO 27001 A.8.27

---

### DSGAI05 — Data Integrity and Validation Failures

**Severity:** High

Adversarially crafted payloads passing syntactic validation corrupt
training sets or exploit snapshot import path traversal. CSF 2.0
PR.PS-04 platform security requires that all data ingestion
interfaces are hardened as platform security controls.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Platform security — software integrity | PR.PS-04 | PROTECT | Secure coding requirements for data ingestion — schema and semantic validation, path traversal prevention |
| Data security — data at rest | PR.DS-01 | PROTECT | Data integrity controls at ingestion — cryptographic verification before storage |
| Continuous monitoring | DE.CM-09 | DETECT | Anomaly detection on ingestion payloads — statistical outliers, unusual encoding, boundary cases |
| Incident analysis | RS.MA-02 | RESPOND | Automated quarantine on ingestion anomaly — pause pipeline, alert owner, forensic capture |

#### Mitigations by tier

**Foundational**
- PR.PS-04: Implement multi-stage validation at all ingestion
  boundaries — syntax, schema, semantic, and statistical
  validation in sequence with rejection logging
- Harden all snapshot import and restore endpoints —
  disable or restrict by default, path traversal prevention
  mandatory
- Patch CVE-2024-3584 and equivalent vector database
  vulnerabilities — treat as urgent PR.PS control

**Hardening**
- DE.CM-09: Implement anomaly detection on ingestion payloads —
  flag statistical outliers and unusual encoding before
  pipeline completion
- Include schema bypass and path traversal in security
  testing — fuzz all ingestion interfaces before deployment
- RS.MA-02: Automated quarantine on anomaly detection —
  pause pipeline, alert owner, trigger forensic capture

**Advanced**
- Sandbox all snapshot import operations — no direct write
  to production filesystem paths
- Conduct adversarial ingestion testing on every new
  pipeline component — document results
- DE.CM-09: Content-aware ingestion monitoring — detect and
  alert on adversarially crafted payloads before pipeline
  completion

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling
- DSGAI 2026: DSGAI13 Vector Store Platform Security
- Other frameworks: ISO 27001 A.8.26/A.8.28 · OWASP ASVS V5 · CWE-20

---

### DSGAI06 — Tool, Plugin and Agent Data Exchange Risks

**Severity:** High

AI tools and plugins receive full context payloads with no data
minimisation. CSF 2.0 GV.SC supply chain governance covers third-party
tool providers as supply chain dependencies — data they receive is
in scope.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Supply chain risk management — suppliers | GV.SC-06 | GOVERN | Security requirements for all tool and plugin providers — data minimisation, retention, training use obligations |
| Supply chain risk management — due diligence | GV.SC-07 | GOVERN | Due diligence on all tool providers before integration — what data they receive, retain, and use |
| Identity management — least privilege | PR.AA-05 | PROTECT | Tools receive only minimum context required — not full conversation history or system prompt content |
| Continuous monitoring | DE.CM-01 | DETECT | Payload inspection on all tool call outputs — sensitive data before returning to agent context |

#### Mitigations by tier

**Foundational**
- GV.SC-06: Establish data handling requirements for all
  tool providers — zero training use by default, defined
  retention, incident notification
- PR.AA-05: Implement context minimisation — tools receive
  only minimum payload required for their function
- Conduct inventory of all tool integrations with data
  flow mapping before any integration reaches production

**Hardening**
- GV.SC-07: Conduct security assessments of all strategic
  tool providers — include in supplier management programme
- DE.CM-01: Deploy payload inspection on all tool API calls —
  sensitive data patterns detected before they leave the
  controlled environment
- Annual security review of all cloud tool providers

**Advanced**
- Implement contractual right-to-audit for all strategic
  tool providers receiving sensitive agent context
- GV.SC-06: Enforce data processing requirements in all
  tool provider contracts — zero training use, defined
  retention, sub-processor controls
- DE.CM-01: Outbound DLP on all tool API calls — block
  sensitive patterns from leaving the controlled environment

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- Agentic Top 10: ASI02 Tool Misuse, ASI04 Supply Chain
- Other frameworks: ISO 27001 A.5.19/A.5.20 · NIST AI RMF MP-5.1 · EU AI Act Art. 25

---

### DSGAI07 — Data Governance, Lifecycle and Classification

**Severity:** High

GenAI creates derived data assets — embeddings, summaries, agent
traces — outside traditional governance programmes. CSF 2.0 ID.AM
asset management and PR.DS data security are the primary categories —
you cannot protect what you have not inventoried.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Data governance policy extended to all GenAI-derived assets — embeddings inherit source classification |
| Asset management | ID.AM-01 | IDENTIFY | All GenAI data assets inventoried — training datasets, embedding stores, RAG corpora, agent memory, telemetry |
| Data security — data at rest | PR.DS-01 | PROTECT | Classification and encryption applied to all inventoried GenAI assets |
| Data security — sensitive data | PR.DS-08 | PROTECT | Sensitive data in GenAI scope identified and handled per classification policy |

#### Mitigations by tier

**Foundational**
- ID.AM-01: Extend asset inventory to all GenAI data assets —
  training datasets, evaluation sets, embedding stores, RAG
  corpora, agent memory, prompt templates, observability logs
- GV.RM-06: Extend data classification policy to GenAI-derived
  assets — embeddings inherit source classification,
  labels propagate through derivation chain
- Establish deletion procedures covering derived assets —
  deleting source document triggers deletion of all
  derived representations

**Hardening**
- PR.DS-08: Implement automated label propagation —
  classification tags flow from source data through the
  full derivation chain
- Establish retention schedules per GenAI asset type —
  embedding stores, session caches, observability data,
  agent traces each with appropriate TTLs
- Map all GenAI data flows end-to-end — source through
  preprocessing, embedding, retrieval, generation, logging

**Advanced**
- Implement machine unlearning readiness — versioned
  data-to-model linkage enabling targeted retraining
  on erasure requests
- Generate and maintain a Data Bill of Materials for all
  production AI systems — auditable provenance chain
- PR.DS-01: Automated retention enforcement — policy-driven
  expiry across all GenAI pipeline components

#### Cross-references
- DSGAI 2026: DSGAI08 Non-Compliance, DSGAI01 Sensitive Data Leakage
- Other frameworks: ISO 27001 A.5.9/A.8.10 · EU AI Act Art. 10 · ISO 27701

---

### DSGAI08 — Non-Compliance and Regulatory Violations

**Severity:** High

GenAI systems trigger regulatory obligations — GDPR, EU AI Act,
HIPAA, CCPA — often without the organisation recognising the system
is in scope. CSF 2.0 GV.OC-02 legal and regulatory requirements
is the governance anchor.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Regulatory compliance obligations for GenAI documented in risk management strategy |
| Organisational context — legal requirements | GV.OC-02 | GOVERN | Legal, regulatory, and contractual requirements applicable to GenAI identified and tracked |
| Risk assessment | ID.RA-01 | IDENTIFY | Regulatory risk assessed for each GenAI deployment — applicable regulations, triggered obligations |
| Incident response — communication | RS.CO-01 | RESPOND | Regulatory breach notification procedures defined — authorities, timelines, contact points |

#### Mitigations by tier

**Foundational**
- GV.OC-02: Identify all legal and regulatory requirements
  applicable to each GenAI deployment — GDPR, EU AI Act,
  HIPAA, CCPA, sector-specific regulations
- ID.RA-01: Conduct regulatory risk assessment for each
  GenAI deployment — what obligations are triggered,
  who is accountable, what controls are required
- Establish lawful basis for all personal data processed
  by GenAI — documented in GDPR Art. 30 records of
  processing activities

**Hardening**
- GV.RM-06: Establish cross-functional AI compliance team —
  legal, privacy, security, and AI representation with
  clear mandate
- RS.CO-01: Define regulatory breach notification procedures —
  timelines per regulation, authority contacts, notification
  templates
- Extend records of processing activities to cover all
  AI training and inference activities including sub-processors

**Advanced**
- Implement automated compliance posture monitoring —
  continuous assessment against regulatory obligations
- EU AI Act August 2026 readiness assessment — gap analysis
  and remediation roadmap for high-risk system classification
- GV.OC-02: Regulatory relationship management — proactive
  engagement with data protection authorities on AI use cases

#### Cross-references
- DSGAI 2026: DSGAI07 Data Governance
- Other frameworks: EU AI Act Art. 10/17 · ISO 27001 A.5.31 · ISO 27701 · GDPR Art. 5/25/30

---

### DSGAI09 — Multimodal Cross-Channel Data Leakage

**Severity:** High

Multimodal AI systems process passport photos, medical images, and
voice recordings — extracted content is treated as less sensitive
than the original, creating leakage paths where sensitive visual or
audio data persists in logs and embeddings.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Data security — data at rest | PR.DS-01 | PROTECT | Multimodal uploads and all extracted content encrypted at rest — classification propagates |
| Data security — data in transit | PR.DS-02 | PROTECT | Multimodal data flows encrypted in transit — OCR output, transcripts, derived embeddings |
| Continuous monitoring | DE.CM-01 | DETECT | DLP applied to multimodal extraction pipelines — PII in OCR output and transcripts detected |
| Identity management — least privilege | PR.AA-05 | PROTECT | Access controls on multimodal content stores — same rigour as equivalent text data |

#### Mitigations by tier

**Foundational**
- PR.DS-01: Classify multimodal uploads at ingestion —
  an image of a passport is Restricted; its OCR output
  is equally Restricted — policy enforced, not assumed
- PR.AA-05: Apply the same access controls to OCR output
  and transcription results as to equivalent text data
- Short retention windows for multimodal uploads and all
  derived content — delete after purpose is served

**Hardening**
- DE.CM-01: Deploy DLP on multimodal extraction pipelines —
  OCR output, audio transcripts, and image analysis results
  scanned for PII before storage
- PR.DS-02: Enforce encryption on all multimodal data
  flows in transit
- Audit all storage paths where multimodal content lands —
  include in asset inventory, apply classification

**Advanced**
- Implement content-aware retention — multimodal uploads
  containing sensitive content automatically scheduled for
  deletion on classification trigger
- DE.CM-01: Monitor for multimodal content appearing in
  unexpected contexts — logs, embeddings, or outputs
  containing content derived from sensitive uploads
- Conduct multimodal leakage red team exercises — OCR
  output in logs, audio transcripts in embeddings

#### Cross-references
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI14 Telemetry Leakage
- Other frameworks: ISO 27001 A.8.11/A.8.12 · ISO 27701 · GDPR Art. 9

---

### DSGAI10 — Synthetic Data and Anonymisation Pitfalls

**Severity:** Medium

Synthetic data and anonymisation techniques are used to satisfy
privacy requirements — but GenAI-era reconstruction attacks can
re-identify individuals from supposedly anonymised datasets.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Anonymisation governance policy — methodology, quality thresholds, re-identification risk acceptance criteria |
| Data security — sensitive data | PR.DS-08 | PROTECT | Anonymisation must meet legal standard, not just technical definition — effectiveness verified |
| Continuous monitoring | DE.CM-09 | DETECT | Re-identification risk testing on synthetic datasets — membership inference testing before release |
| Risk assessment | ID.RA-01 | IDENTIFY | Re-identification risk formally assessed before using or releasing synthetic datasets |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Establish synthetic data governance policy —
  anonymisation methodology, quality thresholds, legal
  standard alignment, review cadence
- PR.DS-08: Treat anonymisation as a legal standard, not
  a technical checkbox — effectiveness must be demonstrated,
  not assumed
- Classify synthetic datasets based on re-identification
  risk — do not automatically treat as non-personal

**Hardening**
- ID.RA-01: Conduct formal re-identification risk assessment
  before releasing or using synthetic datasets externally
- Apply differential privacy to synthetic data generation —
  document privacy budget as PR.DS control evidence
- DE.CM-09: Conduct re-identification attack testing on
  synthetic datasets before use

**Advanced**
- Implement k-anonymity, l-diversity, and t-closeness
  measurements — formal minimum standards before
  classification downgrade
- DE.CM-09: Membership inference testing as standard gate
  in synthetic data generation pipeline
- GV.RM-06: Legal review of anonymisation claims — technical
  anonymisation aligned with applicable legal standard
  before privacy compliance assertions are made

#### Cross-references
- DSGAI 2026: DSGAI08 Non-Compliance, DSGAI18 Inference and Data Reconstruction
- Other frameworks: ISO 27001 A.5.34 · ISO 27701 · GDPR Recital 26 · EU AI Act Art. 10

---

### DSGAI11 — Cross-Context Conversation Bleed

**Severity:** High

One user's sensitive data leaks into another user's responses through
shared KV caches or poorly isolated vector stores. CSF 2.0 PR.AA-05
least privilege is the foundational control — one user's context
must never be accessible to another.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Identity management — least privilege | PR.AA-05 | PROTECT | Strict session isolation — each user's context inaccessible to all other sessions by design |
| Data security — data at rest | PR.DS-01 | PROTECT | Per-user, per-session storage isolation — shared infrastructure enforces tenant isolation |
| Continuous monitoring | DE.CM-01 | DETECT | Cross-session access anomalies detected — logging on all context retrieval operations |
| Incident analysis | RS.MA-02 | RESPOND | Incident response for detected cross-session leakage — impact scoping, user notification |

#### Mitigations by tier

**Foundational**
- PR.AA-05: Implement strict session isolation — each user's
  context window, retrieved documents, and conversation
  history inaccessible to all other sessions
- Implement per-user, per-session RAG namespaces — shared
  vector stores enforce tenant isolation at query time
- DE.CM-01: Log all context retrieval operations — cross-session
  access anomalies detectable from logs

**Hardening**
- Test multi-tenant isolation explicitly in security testing —
  verify user A cannot retrieve user B's documents through
  any query formulation
- Implement KV cache isolation for shared inference
  infrastructure — per-session cache with strict TTL
- RS.MA-02: Define incident response for cross-session
  leakage — impact scoping across all affected users,
  regulatory notification if personal data involved

**Advanced**
- Conduct adversarial cross-tenant testing — attempt to
  extract other users' context through crafted queries
  on every new retrieval system deployment
- Implement real-time bleed detection — alert on content
  appearing in session context not sourced from current
  user's authorised scope
- Cryptographic session isolation for highest-risk tenants

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- DSGAI 2026: DSGAI13 Vector Store Platform Security
- Other frameworks: ISO 27001 A.8.3 · GDPR Art. 32 · NIST AI RMF MS-2.5

---

### DSGAI12 — Unsafe Natural-Language Data Gateways

**Severity:** Critical

LLM-to-SQL and LLM-to-Graph interfaces collapse the security
boundary between user input and database logic. CSF 2.0 PR.AA-05
least privilege is the non-negotiable foundational control —
LLM-generated queries must execute under the requesting user's
permissions, never a shared high-privilege service account.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Identity management — least privilege | PR.AA-05 | PROTECT | LLM-generated queries execute under requesting user's database permissions — never shared high-privilege account |
| Platform security — software integrity | PR.PS-04 | PROTECT | Query allowlisting, parameterised execution, row-level security as platform security controls |
| Continuous monitoring | DE.CM-01 | DETECT | All LLM-generated query text logged with requesting user identity — bulk extraction patterns alerted |
| Incident analysis | RS.MA-02 | RESPOND | Incident response for LLM gateway misuse — query log forensics, data exposure scoping |

#### Mitigations by tier

**Foundational**
- PR.AA-05: LLM-generated queries execute under requesting
  user's database permissions — never a shared high-privilege
  service account, enforced at the database layer
- Restrict LLM-to-SQL interfaces to read-only operations
  by default — write, delete, and DDL require explicit
  approval
- DE.CM-01: Log all LLM-generated query text with requesting
  user identity — mandatory for forensic traceability

**Hardening**
- PR.PS-04: Implement query allowlisting — only pre-approved
  patterns permitted, parameterised execution only
- Include SQL injection, privilege escalation, and bulk
  extraction in security testing for all LLM gateway
  interfaces before deployment
- Implement row-level security — LLM-generated queries
  cannot exceed what the user can access directly

**Advanced**
- Deploy query analysis layer between LLM and database —
  validates generated SQL against permitted patterns before
  execution, rejects destructive or over-broad queries
- RS.MA-02: Implement automated alerting on bulk extraction
  patterns — high-volume LLM-generated queries trigger
  immediate investigation workflow
- Conduct adversarial NL-to-SQL testing — attempt to
  coerce destructive query generation through natural
  language inputs

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling
- Agentic Top 10: ASI02 Tool Misuse, ASI05 Unexpected Code Execution
- Other frameworks: ISO 27001 A.8.26/A.8.28 · OWASP ASVS V5 · CWE-89

---

### DSGAI13 — Vector Store Platform Security

**Severity:** High

Vector databases store sensitive embeddings with weaker default
security posture than traditional databases. CSF 2.0 PR.DS data
security and PR.PS platform security apply to vector stores as
data platforms.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Data security — data at rest | PR.DS-01 | PROTECT | All vector store content encrypted at rest |
| Identity management — least privilege | PR.AA-05 | PROTECT | RBAC enforced on all vector store collections — no unauthenticated access |
| Continuous monitoring | DE.CM-09 | DETECT | Anomaly detection on vector store query patterns — bulk extraction and poisoning indicators |
| Platform security — approved software | PR.PS-02 | PROTECT | Vector database components kept current — known CVEs patched promptly |

#### Mitigations by tier

**Foundational**
- PR.AA-05: Enable RBAC on all vector store collections —
  no unauthenticated access in any environment
- PR.DS-01: Encrypt all vector store content at rest
- PR.PS-02: Patch all known vector database CVEs —
  CVE-2024-3584 class treated as urgent

**Hardening**
- DE.CM-09: Implement anomaly detection on query patterns —
  bulk extraction, unusual retrieval volumes, path traversal
  attempts alerted
- Implement namespace isolation for multi-tenant deployments —
  one collection per trust domain
- Network access controls — vector stores accessible only
  from authorised services, never public internet

**Advanced**
- Conduct vector store penetration testing — RBAC bypass,
  path traversal, bulk extraction, and embedding inversion
  scenarios
- DE.CM-09: Integrate vector store anomaly alerts into SIEM
- Implement embedding access monitoring — alert on bulk
  vector extraction patterns

#### Cross-references
- LLM Top 10: LLM08 Vector and Embedding Weaknesses
- Agentic Top 10: ASI06 Memory and Context Poisoning
- Other frameworks: ISO 27001 A.8.3/A.8.24 · NIST AI RMF MS-2.5 · CWE-284

---

### DSGAI14 — Excessive Telemetry and Monitoring Leakage

**Severity:** High

Observability pipelines capture full prompt text and tool payloads
with weaker access controls and longer retention than production data.
CSF 2.0 GV.RM-06 risk management strategy must explicitly govern
telemetry data — it is a data asset, not just infrastructure.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Telemetry governance policy — least-logging defaults, classification of captured data, retention limits |
| Data security — data at rest | PR.DS-01 | PROTECT | Telemetry data classified and encrypted at the same level as the content it contains |
| Continuous monitoring | DE.CM-01 | DETECT | Access monitoring on telemetry stores — anomalous bulk access detected and alerted |
| Asset management | ID.AM-01 | IDENTIFY | Telemetry stores inventoried as data assets — access controls and retention policies applied |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Establish telemetry governance policy — least-
  logging defaults, classification of captured data,
  retention limits per telemetry tier documented as policy
- ID.AM-01: Include all telemetry stores in asset inventory —
  apply access controls and retention policies
- Apply access controls to telemetry stores — same rigour
  as production data stores, not relaxed because "just logs"

**Hardening**
- PR.DS-01: Classify and encrypt all telemetry data at the
  same level as the most sensitive content it may contain
- Implement short TTL for debug traces — automated deletion
  after defined window, not indefinite retention
- DE.CM-01: Monitor access to telemetry stores — bulk access
  patterns that may indicate exfiltration alerted

**Advanced**
- Implement approval workflow for enabling full debug capture —
  temporary, scoped, logged, automatically reverted
- DE.CM-01: Separate telemetry tiers by sensitivity —
  operational metrics with long retention, full payload
  traces with short retention and elevated access controls
- Redact PII from telemetry streams before storage —
  tokenisation or masking at the telemetry ingestion pipeline

#### Cross-references
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI07 Data Governance
- Other frameworks: ISO 27001 A.8.15 · ISO 27701 · GDPR Art. 32

---

### DSGAI15 — Over-Broad Context Windows and Prompt Over-Sharing

**Severity:** High

RAG pipelines inject excessive content into context windows —
aggregating data from multiple trust domains into a single flat
namespace with no internal access control. CSF 2.0 PR.AA-05 least
privilege applies to context window assembly.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Identity management — least privilege | PR.AA-05 | PROTECT | Minimum-necessary context injection — only passages directly relevant to the query injected |
| Data security — data at rest | PR.DS-01 | PROTECT | All content in context window classified — highest classification drives handling requirement |
| Continuous monitoring | DE.CM-09 | DETECT | Context window monitoring — assembly patterns aggregating data from multiple trust domains alerted |
| Risk management strategy | GV.RM-06 | GOVERN | Policy on context window content limits — cross-trust-domain aggregation requires documented justification |

#### Mitigations by tier

**Foundational**
- PR.AA-05: Implement minimum-necessary context injection —
  retrieve only passages directly relevant to the query,
  not entire documents or broad topic matches
- Track classification of all content entering context —
  highest classification drives handling requirement for
  the entire response
- Never inject content from a higher classification tier
  than the requesting user is authorised to access

**Hardening**
- DE.CM-09: Implement context window monitoring — alert on
  assembly patterns aggregating data from multiple trust
  domains or classification tiers
- Limit conversation history injection — rolling window
  with classification-aware pruning
- GV.RM-06: Formal data flow documentation for every RAG
  pipeline — reviewed on change, auditable

**Advanced**
- Implement trust-domain-aware context assembly — content
  from different trust domains isolated within the context
  window with explicit labelling
- Deploy real-time context analysis before completion —
  validate injected content does not exceed requesting
  user's authorised access scope
- Conduct adversarial context window testing — attempt to
  extract cross-trust-domain content through crafted queries

#### Cross-references
- LLM Top 10: LLM07 System Prompt Leakage
- Agentic Top 10: ASI01 Agent Goal Hijack
- Other frameworks: AIUC-1 A/B005 · NIST AI RMF MS-2.5

---

### DSGAI16 — Endpoint and Browser Assistant Overreach

**Severity:** High

Browser-integrated AI assistants access sensitive data across all
open tabs and local files. Malicious web content can weaponise these
agents for data exfiltration. CSF 2.0 GV.RM-06 risk management
strategy must explicitly govern endpoint AI agents.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Endpoint AI agent governance policy — approved extensions, permission scoping, mandatory updates |
| Platform security — approved software | PR.PS-02 | PROTECT | Approved list of endpoint AI agents — unapproved extensions blocked at device management |
| Continuous monitoring | DE.CM-01 | DETECT | DLP monitoring on endpoint AI agent network traffic — sensitive data leaving via AI channels detected |
| Incident analysis | RS.MA-01 | RESPOND | Incident response for endpoint AI agent compromise — extension disable, data impact assessment |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Establish approved list of endpoint AI agents
  and browser extensions — unapproved extensions blocked,
  policy enforced
- PR.PS-02: Apply device management policy to all endpoint
  AI agents — version control, permission scoping, mandatory
  updates
- DE.CM-01: Implement DLP on endpoint AI agent network traffic —
  detect sensitive data leaving via AI assistant channels

**Hardening**
- Conduct adversarial testing of approved browser extensions
  before organisation-wide deployment — test for hidden
  prompt injection via web content
- Implement permission minimisation — extensions receive only
  the permissions required for their stated function
- RS.MA-01: Define incident response for endpoint AI agent
  compromise — extension disable, network isolation,
  forensic capture

**Advanced**
- DE.CM-01: Real-time DLP monitoring on endpoint AI agent
  data access — alert on access patterns inconsistent
  with stated extension function
- Deploy browser isolation for highest-risk tasks — AI
  extensions cannot access data from isolated sessions
- GV.RM-06: Vendor security requirements for all endpoint
  AI providers — right-to-audit, incident notification,
  zero training use on enterprise data

#### Cross-references
- Agentic Top 10: ASI10 Rogue Agents
- DSGAI 2026: DSGAI03 Shadow AI
- Other frameworks: ISO 27001 A.8.1/A.8.7 · AIUC-1 B006 · EU AI Act Art. 9

---

### DSGAI17 — Data Availability and Resilience Failures

**Severity:** High

RAG pipelines fail silently when vector stores degrade — returning
stale or incorrect information. In OT environments this can propagate
from the AI layer into physical process control. CSF 2.0 PR.IR
infrastructure resilience is the primary protection function.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Infrastructure resilience | PR.IR-01 | PROTECT | Circuit breakers, graceful degradation, and staleness detection implemented as resilience controls |
| Continuous monitoring | DE.CM-01 | DETECT | Vector store freshness monitoring — alert when index staleness exceeds threshold |
| Incident analysis | RS.MA-02 | RESPOND | Incident response for AI pipeline availability failures — silent degradation detection and response |
| Incident recovery | RC.RP-02 | RECOVER | Recovery procedures for RAG pipeline failures — tested failover, defined RTO/RPO, clean restore |

#### Mitigations by tier

**Foundational**
- PR.IR-01: Implement health checks on vector store freshness —
  alert when index age exceeds threshold before silent
  misinformation reaches users
- DE.CM-01: Monitor vector store availability — distinguish
  hard outages from silent degradation, both alerted
- RS.MA-02: Define incident response for AI pipeline failures —
  silent degradation as a distinct failure mode

**Hardening**
- PR.IR-01: Deploy redundancy for production RAG infrastructure —
  replica synchronisation lag monitored and bounded
- Implement circuit breakers on RAG retrieval — degrade
  gracefully to non-RAG responses rather than silently
  serving stale results
- RC.RP-02: Include AI pipeline in BCP — annual failover
  drills covering vector store failure scenarios

**Advanced**
- PR.IR-01: Conduct adversarial availability testing —
  attempt to saturate vector endpoints and verify circuit
  breaker effectiveness
- Test integrity of restored vector indexes — verify backup
  restoration produces correct retrieval, not just structural
  integrity
- RC.RP-02: Measure and publish RTO/RPO for RAG pipeline —
  reviewed quarterly against actual performance

#### Cross-references
- LLM Top 10: LLM10 Unbounded Consumption
- Agentic Top 10: ASI08 Cascading Agent Failures
- Other frameworks: ISA/IEC 62443 SR 7.6 (OT) · NIST SP 800-82 (OT) · AIUC-1 D

---

### DSGAI18 — Inference and Data Reconstruction

**Severity:** High

Adversaries reconstruct sensitive training data through membership
inference and model inversion attacks. CSF 2.0 PR.DS-08 sensitive
data handling and DE.CM-09 continuous monitoring cover inference
attack resistance.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Data security — data at rest | PR.DS-01 | PROTECT | Differential privacy and embedding encryption reducing information available for reconstruction |
| Data security — sensitive data | PR.DS-08 | PROTECT | Privacy-by-design for inference attack resistance — not just direct disclosure prevention |
| Continuous monitoring | DE.CM-09 | DETECT | Output monitoring for reconstruction indicators — near-verbatim reproduction of likely training content |
| Risk management strategy | GV.RM-06 | GOVERN | Privacy policy extended to cover inference attack resistance — explicitly in scope |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Extend privacy policy to cover inference attack
  resistance — membership inference and model inversion
  explicitly in scope alongside direct disclosure
- PR.DS-08: Assess inference attack risk as part of privacy
  programme — not just direct disclosure risks
- DE.CM-09: Monitor outputs for content that may represent
  reconstructed training data — alerts on near-verbatim
  reproduction of likely training content

**Hardening**
- PR.DS-01: Apply differential privacy during training —
  limits membership inference success rate, document
  privacy budget
- Implement output rate limiting per user per time window —
  limits inference queries an attacker can submit
- Suppress confidence scores — do not return raw logits
  that enable membership inference

**Advanced**
- Conduct membership inference and model inversion red team
  exercises as standard pre-deployment validation
- Implement machine unlearning readiness — ability to
  surgically remove specific training examples
- DE.CM-09: Conduct embedding inversion testing — validate
  embeddings do not reconstruct source content under
  realistic attacker conditions

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure, LLM08 Vector and Embedding Weaknesses
- DSGAI 2026: DSGAI10 Synthetic Data Pitfalls
- Other frameworks: ISO 27001 A.8.11 · ISO 27701 · GDPR Art. 25 · MITRE ATLAS AML.T0024

---

### DSGAI19 — Human-in-Loop and Labeler Overexposure

**Severity:** Medium

Human annotators and HITL reviewers access sensitive model inputs
during labelling — exposing customer data or confidential content
to third-party contractors. CSF 2.0 GV.SC-07 due diligence covers
labelling vendors as supply chain dependencies.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Supply chain — due diligence | GV.SC-07 | GOVERN | Due diligence on all labelling vendors — data access scope, contractual protections, sub-processor chain |
| Identity management — least privilege | PR.AA-05 | PROTECT | Data minimisation for labelling tasks — annotators access only minimum content required |
| Data security — sensitive data | PR.DS-08 | PROTECT | Anonymisation applied to labelling tasks before exposure to annotators |
| Organisational context | GV.OC-01 | GOVERN | Security training for all annotators covering data handling requirements |

#### Mitigations by tier

**Foundational**
- GV.SC-07: Map all labelling vendors and HITL providers —
  what data each accesses, contractual protections in place,
  sub-processor chain documented
- PR.AA-05: Apply data minimisation to labelling tasks —
  annotators see only minimum content required, not full
  source records
- GV.OC-01: Provide security training to all annotators —
  data handling, non-disclosure, and incident reporting

**Hardening**
- PR.DS-08: Anonymise or pseudonymise sensitive content
  in labelling tasks before exposure — annotators work on
  de-identified versions where possible
- Implement access controls on labelling platforms —
  annotators see only assigned tasks
- Include labelling vendors in supplier security programme —
  security assessment on schedule

**Advanced**
- Implement synthetic data for labelling where possible —
  real sensitive data replaced with synthetic equivalents
  preserving annotation-relevant properties
- GV.SC-07: Contractual right-to-audit for all strategic
  labelling vendors handling sensitive data
- Implement differential privacy in labelling pipeline

#### Cross-references
- DSGAI 2026: DSGAI07 Data Governance, DSGAI08 Non-Compliance
- Other frameworks: ISO 27001 A.5.34/A.6.3 · EU AI Act Art. 10 · GDPR Art. 28

---

### DSGAI20 — Model Exfiltration and IP Replication

**Severity:** High

Adversaries reconstruct a functional model replica through systematic
querying — stealing proprietary training investment without accessing
original weights. CSF 2.0 PR.DS data security applies to model
artifacts as intellectual property assets.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Data security — data at rest | PR.DS-01 | PROTECT | Model artifacts classified as intellectual property — access controls and encryption applied |
| Identity management — least privilege | PR.AA-05 | PROTECT | API rate limiting and query restrictions as access controls limiting systematic model extraction |
| Continuous monitoring | DE.CM-09 | DETECT | Monitoring for model extraction patterns — unusual query diversity and high-volume confidence harvesting |
| Incident analysis | RS.MA-02 | RESPOND | Response for detected model extraction — rate limit tightening, session blocking, forensic capture |

#### Mitigations by tier

**Foundational**
- PR.DS-01: Classify all proprietary model artifacts as
  Confidential — model weights, fine-tuning datasets,
  training configurations, and evaluation sets
- PR.AA-05: Implement API rate limiting and query volume
  caps — systematic extraction requires high query volumes
- DE.CM-09: Monitor for extraction patterns — anomalous
  query diversity and high-volume confidence score harvesting

**Hardening**
- Implement output perturbation — add calibrated noise
  to confidence scores without degrading utility
- RS.MA-02: Define response for detected extraction —
  rate limit tightening, session blocking, forensic capture,
  legal assessment
- DE.CM-09: Deploy query anomaly detection — flag sessions
  exhibiting systematic exploration of output space

**Advanced**
- Conduct model extraction red team exercises — attempt
  to replicate your model using your own API and document
  the query budget required
- Apply model output watermarking — enables detection of
  replicated model usage in the wild
- PR.DS-01: Include model IP protection in data governance
  policy — classification, access controls, legal response
  capability for discovered replicas

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- DSGAI 2026: DSGAI18 Inference and Data Reconstruction
- Other frameworks: ISO 27001 A.5.12/A.8.3 · MITRE ATLAS AML.T0016 · NIST AI RMF MS-2.5

---

### DSGAI21 — Disinformation and Integrity Attacks via Data Poisoning

**Severity:** High

Adversaries inject false content into trusted retrieval sources so
AI systems surface it as authoritative output — with no training
access required. CSF 2.0 GV.SC supply chain governance covers
RAG data sources as supply chain dependencies.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Supply chain risk management | GV.SC-06 | GOVERN | Source trust verification requirements for all RAG corpus sources — provenance and integrity required |
| Data security — data at rest | PR.DS-01 | PROTECT | RAG corpus integrity controls — cryptographic hashing of indexed content, tamper detection |
| Continuous monitoring | DE.CM-09 | DETECT | Ingestion anomaly detection — statistical and semantic scanning for unusual content before indexing |
| Incident analysis | RS.MA-01 | RESPOND | Response for detected RAG poisoning — source quarantine, index rebuild, output correction, notification |

#### Mitigations by tier

**Foundational**
- GV.SC-06: Implement source trust tiering in RAG retrieval —
  weight results by provenance and trust score, not only
  semantic similarity
- PR.DS-01: Monitor RAG corpora for unauthorised modifications —
  integrity hashing on all indexed content
- GV.RM-06: Maintain threat intelligence on disinformation
  campaigns targeting your specific domain and RAG sources

**Hardening**
- DE.CM-09: Implement ingestion anomaly detection — statistical
  and semantic scanning for unusual content before production
  indexing
- Implement ingestion gates — elevated validation during
  active threat periods or when intelligence indicates
  targeting of your retrieval sources
- RS.MA-01: Define response for detected RAG poisoning —
  source quarantine, impacted index rebuild, output
  correction, user notification

**Advanced**
- Conduct adversarial integrity evaluation — red team testing
  of RAG pipeline susceptibility to low-frequency poisoning
  as standard pre-deployment gate
- Automated HITL triggers for AI decisions derived from
  low-provenance or recently indexed sources in irreversible
  decision contexts
- PR.DS-01: Dataset Bill of Materials with cryptographic
  provenance chain — detect unauthorised modification to
  retrieval corpora post-ingestion

#### Cross-references
- LLM Top 10: LLM04 Data and Model Poisoning, LLM09 Misinformation
- Agentic Top 10: ASI06 Memory and Context Poisoning
- Other frameworks: MITRE ATLAS AML.T0045 · ISO 27001 A.5.7 · EU AI Act Art. 55(1)(a)

---

## CSF 2.0 profile for GenAI data security

| Function | Priority categories | DSGAI target state |
|---|---|---|
| GOVERN | GV.RM-06, GV.SC-06, GV.OC-02 | Data governance policy covers all derived assets, supply chain requirements applied, regulatory obligations mapped |
| IDENTIFY | ID.AM-01, ID.RA-01 | All GenAI data assets inventoried, supply chain and regulatory risks assessed per deployment |
| PROTECT | PR.DS-01/02/08, PR.AA-05, PR.PS-04, PR.IR-01 | Encryption at rest/transit, least privilege on RAG and agent access, DLP deployed, resilience tested |
| DETECT | DE.CM-01, DE.CM-09 | Output scanning live, ingestion anomaly detection active, vector store monitoring integrated |
| RESPOND | RS.MA-01, RS.MA-02, RS.CO-01 | Playbooks for all 21 DSGAI entries, regulatory notification procedures defined and tested |
| RECOVER | RC.RP-02 | BCP covers RAG pipeline failures, model rollback tested, clean reactivation process documented |

---

## Implementation priority

| Phase | DSGAI entries | CSF categories | Rationale |
|---|---|---|---|
| 1 — Do now | DSGAI01, DSGAI02, DSGAI12 | PR.DS-01, PR.AA-05 | Critical severity, most common breach vectors |
| 2 — This sprint | DSGAI03, DSGAI07, DSGAI14 | GV.RM-06, ID.AM-01 | Asset inventory and governance close shadow AI and telemetry gaps |
| 3 — This quarter | DSGAI04, DSGAI05, DSGAI13 | GV.SC-06, PR.PS-04 | Integrity and vector store controls require pipeline-level changes |
| 4 — Ongoing | DSGAI08-DSGAI11, DSGAI15-DSGAI21 | All remaining | Regulatory, privacy, resilience, and advanced threat hardening |

---

## References

- NIST Cybersecurity Framework 2.0: https://www.nist.gov/cyberframework
- CSF 2.0 full document: https://doi.org/10.6028/NIST.CSWP.29
- OWASP GenAI Data Security Risks 2026: https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/
- NIST AI RMF 1.0: https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — DSGAI01-DSGAI21 full entries with CSF 2.0 profile | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
