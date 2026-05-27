<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks 2026 (DSGAI01–DSGAI21)
  Framework   : FedRAMP AI Overlay (NIST SP 800-53 Rev 5 AI-specific extensions)
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative – https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 × FedRAMP AI Overlay

Mapping the [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/dsgai-2026/)
to the [FedRAMP AI Overlay](https://www.fedramp.gov/) extending
[NIST SP 800-53 Rev 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
with AI-specific control enhancements.

FedRAMP (Federal Risk and Authorization Management Program) is the US
government's standardised approach to security authorisation for cloud
services. The AI overlay extends FedRAMP baseline controls with
AI-specific requirements. The DSGAI 2026 mapping focuses on the data
security dimensions of GenAI systems within the federal authorisation
boundary — training data protection, data governance, privacy
preservation, and regulatory compliance. It addresses how organisations
can leverage FedRAMP AI overlay controls to secure the data that flows
into, through, and out of AI pipelines: from provenance and lineage of
training corpora, through access control and integrity of model artefacts,
to data retention, consent management, and cross-jurisdictional compliance.

---

## Why DSGAI 2026 × FedRAMP AI Overlay for GenAI data security

This mapping traces each OWASP DSGAI 2026 data security risk to specific
FedRAMP AI overlay controls, enabling data security teams to address
GenAI-specific data risks within their existing FedRAMP compliance and
governance programmes. FedRAMP's comprehensive NIST SP 800-53 control
catalogue — spanning access control, audit, encryption, supply chain,
and programme management — provides a natural home for every DSGAI risk,
while the AI overlay extensions add the AI-specific enhancements that
generic controls alone cannot cover.

---

## FedRAMP AI control families

| Family | ID | Purpose |
|---|---|---|
| Access Control | AC | Data access enforcement, AI service account management, least privilege for data operations |
| Awareness and Training | AT | Security training covering AI-specific data risks and handling |
| Audit and Accountability | AU | Data access logging, AI decision audit trails, inference logging |
| Assessment, Authorization, and Monitoring | CA | Continuous monitoring, security assessment for AI systems |
| Configuration Management | CM | Data pipeline configuration, model versioning, data flow controls |
| Contingency Planning | CP | Backup and recovery for AI data assets and pipelines |
| Identification and Authentication | IA | Identity for AI data processors, NHI management |
| Incident Response | IR | Data breach incident handling, AI-specific data incident reporting |
| Program Management | PM | Data governance strategy, AI risk management, privacy programme |
| Risk Assessment | RA | Data-specific risk assessment, privacy impact assessment |
| System and Services Acquisition | SA | Third-party data service controls, AI data SDLC |
| System and Communications Protection | SC | Data encryption, boundary protection, data flow enforcement |
| System and Information Integrity | SI | Data validation, data quality monitoring, input integrity |
| Supply Chain Risk Management | SR | Data supply chain plan, data provenance controls |

---

## Quick-reference summary

| ID | Name | Severity | FedRAMP AI Controls | Scope |
|---|---|---|---|---|
| DSGAI01 | Sensitive Data Leakage | Critical | SC-28, AC-3, SI-4, AU-2 | Both |
| DSGAI02 | Agent Identity & Credential Exposure | Critical | IA-5, AC-6, AU-12, SC-28 | Both |
| DSGAI03 | Shadow AI & Unsanctioned Data Flows | High | CM-7, SA-9, AC-3, SI-4 | Both |
| DSGAI04 | Data Model & Artifact Poisoning | Critical | SR-2, SR-3, SI-3, SC-28 | Both |
| DSGAI05 | Data Integrity & Validation Failures | High | SI-10, SI-7, CM-3 | Both |
| DSGAI06 | Tool Plugin & Agent Data Exchange | High | AC-3, SA-9, AU-2, SC-7 | Both |
| DSGAI07 | Data Governance & Lifecycle | High | CM-3, PM-9, AU-2, SC-28 | Both |
| DSGAI08 | Non-Compliance & Regulatory Violations | High | PM-9, RA-3, AU-2, CA-7 | Both |
| DSGAI09 | Multimodal Cross-Channel Leakage | Medium | SC-7, AC-3, SI-4, AU-2 | Both |
| DSGAI10 | Synthetic Data & Anonymization Pitfalls | Medium | SI-4, RA-5, PM-9 | Build |
| DSGAI11 | Cross-Context Conversation Bleed | High | AC-4, SC-7, AU-2, AC-3 | Both |
| DSGAI12 | Unsafe NL Data Gateways | Critical | SI-10, AC-3, AU-2, SC-7 | Both |
| DSGAI13 | Vector Store Platform Security | High | SC-28, AC-3, AU-12, CM-6 | Both |
| DSGAI14 | Excessive Telemetry & Monitoring Leakage | Medium | AC-3, AU-2, SI-4, PM-9 | Both |
| DSGAI15 | Over-Broad Context Windows | High | AC-6, CM-7, SI-10 | Both |
| DSGAI16 | Endpoint & Browser Overreach | High | AC-6, CM-7, SC-7, AU-2 | Both |
| DSGAI17 | Data Availability & Resilience Failures | High | CP-9, CP-10, SI-4, CA-7 | Both |
| DSGAI18 | Inference & Data Reconstruction | High | SC-28, AC-3, SI-4, RA-5 | Both |
| DSGAI19 | Human-in-Loop & Labeler Overexposure | Medium | AC-3, PS-3, AT-2, AU-2 | Build |
| DSGAI20 | Model Exfiltration & IP Replication | Critical | SC-28, AC-3, AU-12, SI-4 | Both |
| DSGAI21 | Disinformation & Integrity Attacks | High | SI-3, SI-7, AU-2, SR-3 | Both |

---

## Audience tags

`data-engineer` `privacy-officer` `security-engineer` `ml-engineer` `compliance-officer` `ciso` `dpo`

- **Data engineer / ML engineer** – SI, CM, and SC controls per entry; data pipeline security
- **Privacy officer / DPO** – PM and AC entries; data minimisation, consent, and retention
- **Security engineer** – SC, AU, and AC controls; encryption, audit, and access enforcement
- **FedRAMP assessor** – full file; control traceability and evidence mapping for AI data security
- **Compliance officer** – full file; FedRAMP AI overlay alignment and regulatory traceability
- **CISO** – PM and RA entries; data governance strategy and risk prioritisation

---

## Detailed mappings

---

### DSGAI01 – Sensitive Data Leakage

**Severity:** Critical

Sensitive data — PII, credentials, financial records, proprietary code —
leaks from GenAI systems through model outputs, RAG retrieval, embedding
exposure, or observability pipelines. FedRAMP AI overlay addresses this
through encryption at rest for all AI data stores (SC-28), access
enforcement restricting who can retrieve sensitive data (AC-3), system
monitoring detecting leakage indicators in model outputs (SI-4), and
event logging for forensic reconstruction (AU-2).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Protection of Information at Rest — AI data encryption | SC-28 | SC | Encrypt all AI data at rest — training data, model weights, inference logs, embedding stores — using FIPS 140-validated modules |
| Access Enforcement — AI data access | AC-3 | AC | Enforce role-based access control on all AI data stores; restrict access based on clearance, need-to-know, and data sensitivity |
| System Monitoring — leakage indicator detection | SI-4 | SI | Monitor model outputs and data access patterns for leakage indicators — PII, credentials, classification markings in outputs; alert on detection |
| Event Logging — data access and output logging | AU-2 | AU | Log all AI data access and model outputs with sufficient detail to detect data leakage; include output content metadata |

#### Mitigations

**Foundational**
- SC-28: Encrypt all AI data at rest using FIPS 140-validated modules;
  enforce key management per FedRAMP requirements
- AC-3: Implement role-based access on all AI data stores; deny by
  default; restrict RAG retrieval to authorised scope
- AU-2: Log all data access and model outputs at integration points

**Hardening**
- SI-4: Deploy output monitoring for sensitive data patterns — PII,
  credentials, API keys; alert and block on detection
- SC-28: Conduct data extraction testing; verify training data cannot
  be extracted through targeted queries
- AU-2: Feed data access logs into FedRAMP continuous monitoring;
  establish alerting for anomalous access patterns

**Advanced**
- Apply differential privacy to training; bound memorisation risk
- SI-4: Include data leakage testing in FedRAMP annual assessment
- Deploy output classifiers detecting and redacting sensitive content
  before responses reach users

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| AWS Macie / Azure Purview | Commercial | https://aws.amazon.com/macie/ |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI03 Privilege Escalation
- Other frameworks: SP 800-218A PS.1.1-PS – CWE-200 – NIST CSF 2.0 PR.DS-5

---

### DSGAI02 – Agent Identity & Credential Exposure

**Severity:** Critical

Agent credentials — session tokens, API keys, delegated permissions —
are exposed through memory, logs, tool payloads, or inter-agent
communication, enabling credential theft and lateral movement. FedRAMP
AI overlay addresses this through authenticator management requiring
secure credential storage (IA-5), least privilege scoping agent
permissions (AC-6), audit generation tracking credential lifecycle
events (AU-12), and encryption protecting stored credentials (SC-28).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Authenticator Management — agent credential lifecycle | IA-5 | IA | Manage AI agent credentials with short-lived, task-scoped tokens; enforce rotation schedules; prohibit long-lived secrets in agent memory or logs |
| Least Privilege — agent permission scoping | AC-6 | AC | Restrict agent permissions to minimum necessary for each task; enforce that agent privilege cannot exceed the authorising user's privilege |
| Audit Generation — credential event tracking | AU-12 | AU | Generate audit records for all credential issuance, usage, rotation, and expiry events across agent operations |
| Protection of Information at Rest — credential encryption | SC-28 | SC | Encrypt all stored agent credentials using FIPS 140-validated modules; enforce hardware-backed key management for high-value tokens |

#### Mitigations

**Foundational**
- IA-5: Issue short-lived, task-scoped credentials per agent invocation;
  prohibit long-lived API keys or tokens in agent context
- AC-6: Enforce least privilege — agent maximum privilege equals
  authorising user's privilege; deny privilege escalation
- SC-28: Encrypt all stored credentials at rest with FIPS 140-validated
  modules

**Hardening**
- AU-12: Log all credential lifecycle events — issuance, use, rotation,
  expiry; feed into FedRAMP continuous monitoring
- IA-5: Implement automated credential rotation; detect and revoke
  leaked credentials immediately
- AC-6: Review agent permission grants quarterly; remove stale or
  over-broad grants

**Advanced**
- IA-5: Deploy just-in-time credential issuance; agents receive
  credentials only at invocation time with automatic expiry
- AU-12: Include agent credential management in FedRAMP annual
  assessment; demonstrate credential lifecycle completeness
- SC-28: Implement hardware-backed key management for agent credential
  encryption keys

#### Tools

| Tool | Type | Link |
|---|---|---|
| HashiCorp Vault | Commercial | https://www.vaultproject.io |
| AWS Secrets Manager / Azure Key Vault | Commercial | https://aws.amazon.com/secrets-manager/ |
| CyberArk | Commercial | https://www.cyberark.com |
| SPIFFE/SPIRE | Open-source | https://spiffe.io |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI02 Misconfigured Access Controls
- Other frameworks: SP 800-218A PW.1.1-PS – NIST CSF 2.0 PR.AC-7 – CWE-522

---

### DSGAI03 – Shadow AI & Unsanctioned Data Flows

**Severity:** High

Employees or teams deploy unauthorised GenAI tools that process corporate
data outside governed channels, creating invisible data flows beyond
security and compliance controls. FedRAMP AI overlay addresses this
through least functionality restricting approved AI tools (CM-7), external
service controls for third-party AI (SA-9), access enforcement preventing
unauthorised AI tool usage (AC-3), and system monitoring detecting shadow
AI activity (SI-4).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Least Functionality — approved AI tools only | CM-7 | CM | Restrict AI tool usage to approved, vetted tools within the FedRAMP boundary; disable or block access to unauthorised AI services |
| External Information System Services — third-party AI controls | SA-9 | SA | Require FedRAMP authorisation or equivalent for all third-party AI services; block data transfer to unauthorised AI tools |
| Access Enforcement — AI tool access control | AC-3 | AC | Enforce access control preventing data transfer to unauthorised AI tools; monitor and block shadow AI usage |
| System Monitoring — shadow AI detection | SI-4 | SI | Monitor network traffic and data flows for indicators of unauthorised AI service usage; alert on detection |

#### Mitigations

**Foundational**
- CM-7: Define and enforce an approved AI tools list; block access to
  unauthorised AI services from the FedRAMP environment
- SA-9: Require FedRAMP authorisation for all third-party AI services
  processing federal data
- AC-3: Implement network-level controls preventing data transfer to
  unauthorised AI tools

**Hardening**
- SI-4: Implement automated discovery of AI tool usage; detect and
  alert on shadow AI activity
- SA-9: Conduct security assessment of all AI tools before approval;
  include in FedRAMP continuous monitoring
- AC-3: Deploy DLP controls blocking sensitive data transfer to
  unapproved AI services

**Advanced**
- CM-7: Include shadow AI detection in FedRAMP continuous monitoring;
  track and report on unauthorised AI tool usage
- SA-9: Implement automated compliance verification for third-party
  AI services; alert on authorisation expiry
- SI-4: Deploy advanced behavioural analytics to detect indirect
  shadow AI usage patterns

#### Tools

| Tool | Type | Link |
|---|---|---|
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| Netskope | Commercial | https://www.netskope.com |
| Microsoft Defender for Cloud Apps | Commercial | https://www.microsoft.com/en-us/security/business/cloud-apps-defender |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |

#### Cross-references
- LLM Top 10: LLM05 Supply Chain Vulnerabilities
- Agentic Top 10: ASI04 Supply Chain Compromise
- Other frameworks: SP 800-218A PW.4.1-PS – CIS Controls 2 – NIST CSF 2.0 ID.AM-2

---

### DSGAI04 – Data Model & Artifact Poisoning

**Severity:** Critical

Training data, fine-tuning pipelines, or model weights are corrupted to
embed backdoors, bias, or degraded behaviours that persist through
deployment. FedRAMP AI overlay addresses this through supply chain
planning for AI data sources (SR-2), supply chain controls for artefact
provenance (SR-3), malicious code protection for training pipelines
(SI-3), and encryption of data and model artefacts at rest (SC-28).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Supply Chain Risk Management Plan — AI data and artefact sources | SR-2 | SR | Include AI training data, model weights, and pipeline artefacts in supply chain risk management with provenance documentation |
| Supply Chain Controls — artefact provenance verification | SR-3 | SR | Verify integrity and provenance of all AI artefacts using cryptographic signatures and checksums before use in any pipeline |
| Malicious Code Protection — training pipeline integrity | SI-3 | SI | Extend malicious code protection to training data and model artefacts; detect poisoned data, anomalous patterns, and backdoor indicators |
| Protection of Information at Rest — artefact encryption | SC-28 | SC | Encrypt all training data, model weights, and pipeline artefacts at rest; enforce key management per FedRAMP requirements |

#### Mitigations

**Foundational**
- SR-2: Include all AI data sources and artefacts in supply chain plan;
  document provenance and risk assessment for each
- SR-3: Verify cryptographic integrity of all artefacts before use;
  maintain signed checksums for training data and model weights
- SC-28: Encrypt all AI artefacts at rest using FIPS 140-validated
  modules

**Hardening**
- SI-3: Apply anomaly detection to training data; flag statistical
  outliers and content inconsistent with source domain
- SR-3: Implement automated integrity verification in CI/CD; block
  deployment of unverified artefacts
- SR-2: Reassess supply chain risk on schedule aligned with FedRAMP
  continuous monitoring

**Advanced**
- SI-3: Conduct backdoor detection on all new model versions; use
  neural cleanse or equivalent before production
- SR-3: Implement continuous supply chain integrity monitoring; alert
  on artefact modification or provenance changes
- SC-28: Include artefact security in FedRAMP annual assessment

#### Tools

| Tool | Type | Link |
|---|---|---|
| IBM Adversarial Robustness Toolbox | Open-source | https://github.com/Trusted-AI/adversarial-robustness-toolbox |
| CleanLab | Open-source | https://github.com/cleanlab/cleanlab |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| Sigstore | Open-source | https://www.sigstore.dev |

#### Cross-references
- LLM Top 10: LLM03 Training Data Poisoning
- Agentic Top 10: ASI06 Memory Poisoning & Context Confusion
- Other frameworks: MITRE ATLAS AML.T0032 – SP 800-218A PS.1.1-PS – NIST CSF 2.0 PR.DS-8

---

### DSGAI05 – Data Integrity & Validation Failures

**Severity:** High

Insufficient validation on AI data ingestion interfaces allows corrupted,
malformed, or adversarial data to enter processing pipelines, degrading
output quality or enabling attacks. FedRAMP AI overlay addresses this
through input validation enforcing data quality (SI-10), software and
information integrity verification for pipeline artefacts (SI-7), and
configuration change control tracking data pipeline modifications (CM-3).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Information Input Validation — data quality enforcement | SI-10 | SI | Validate quality, completeness, and format of all data entering AI pipelines; reject data failing quality thresholds or schema validation |
| Software, Firmware, and Information Integrity — pipeline integrity | SI-7 | SI | Verify integrity of data artefacts at each pipeline stage; detect corruption, tampering, or unauthorised modifications |
| Configuration Change Control — data pipeline changes | CM-3 | CM | Require formal change control for all data pipeline modifications; maintain audit trail of data source additions, schema changes, and validation rule updates |

#### Mitigations

**Foundational**
- SI-10: Define and enforce data quality thresholds for all AI input
  sources; reject data failing validation checks or schema validation
- SI-7: Implement checksum verification for data artefacts at pipeline
  ingestion points
- CM-3: Require change control for data source and pipeline
  modifications

**Hardening**
- SI-10: Deploy continuous data quality monitoring; alert on quality
  degradation or anomalous input patterns
- SI-7: Implement automated integrity verification at each pipeline
  stage; quarantine failed artefacts
- CM-3: Include data pipeline changes in FedRAMP change management;
  track configuration drift

**Advanced**
- SI-10: Implement advanced data quality analytics; detect subtle
  quality issues affecting model performance
- SI-7: Include data integrity verification in FedRAMP annual
  assessment; demonstrate pipeline integrity controls
- CM-3: Deploy automated data lineage tracking; maintain real-time
  data flow documentation

#### Tools

| Tool | Type | Link |
|---|---|---|
| Great Expectations | Open-source | https://greatexpectations.io |
| OpenLineage | Open-source | https://openlineage.io |
| Apache Atlas | Open-source | https://atlas.apache.org |
| Collibra | Commercial | https://www.collibra.com |

#### Cross-references
- LLM Top 10: LLM03 Training Data Poisoning
- Agentic Top 10: ASI06 Memory Poisoning & Context Confusion
- Other frameworks: SP 800-218A PS.3.1-PS – NIST CSF 2.0 PR.DS-8 – ISO 42001 A.7.4

---

### DSGAI06 – Tool Plugin & Agent Data Exchange

**Severity:** High

Sensitive context — user data, credentials, conversation history — is
exchanged with third-party tools, plugins, or MCP servers without
adequate access controls or data minimisation, creating uncontrolled data
flows. FedRAMP AI overlay addresses this through access enforcement on
tool data exchange (AC-3), external service controls for plugin providers
(SA-9), event logging of all tool interactions (AU-2), and boundary
protection controlling data flow to external tools (SC-7).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Access Enforcement — tool data exchange controls | AC-3 | AC | Enforce access controls on all data exchanged with tools and plugins; restrict data sharing to minimum necessary per tool permission manifest |
| External Information System Services — plugin provider controls | SA-9 | SA | Require security assessment for all third-party tool and plugin providers; establish data handling SLAs covering sensitivity and retention |
| Event Logging — tool interaction logging | AU-2 | AU | Log all data exchanged with external tools and plugins; capture tool identity, data elements shared, and response data received |
| Boundary Protection — tool data flow enforcement | SC-7 | SC | Enforce boundary controls on data flows to external tools; prevent uncontrolled data transfer to plugin endpoints |

#### Mitigations

**Foundational**
- AC-3: Enforce per-tool permission manifests; tools cannot access data
  beyond authorised scope; apply data minimisation
- SA-9: Require security assessment for all tool and plugin providers
  before approval
- AU-2: Log every data exchange with external tools for audit and
  forensic reconstruction

**Hardening**
- SC-7: Implement boundary controls preventing unauthorised data flows
  to external tool endpoints
- SA-9: Include tool provider security in FedRAMP continuous monitoring;
  reassess on schedule
- AC-3: Implement automated data minimisation — strip unnecessary
  context before tool invocation

**Advanced**
- AU-2: Deploy real-time analytics on tool data exchange patterns;
  detect anomalous data transfers
- SC-7: Include tool data flow controls in FedRAMP annual assessment
- SA-9: Implement automated compliance verification for tool providers;
  alert on security posture changes

#### Tools

| Tool | Type | Link |
|---|---|---|
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Netskope | Commercial | https://www.netskope.com |
| Collibra | Commercial | https://www.collibra.com |

#### Cross-references
- LLM Top 10: LLM05 Supply Chain Vulnerabilities
- Agentic Top 10: ASI07 Lateral Tool Chaining
- Other frameworks: SP 800-218A PW.4.1-PS – NIST CSF 2.0 PR.AC-3 – ISO 42001 A.7.2

---

### DSGAI07 – Data Governance & Lifecycle

**Severity:** High

Governance gaps for AI-derived data assets — embeddings, fine-tuned
models, generated content, cached outputs — leave them outside retention,
classification, and disposal policies. FedRAMP AI overlay addresses this
through configuration change control for lifecycle management (CM-3),
risk management strategy covering governance (PM-9), event logging for
data lineage and disposal records (AU-2), and encryption of retained
data assets (SC-28).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Configuration Change Control — data lifecycle management | CM-3 | CM | Define and enforce lifecycle policies for all AI-derived data; implement retention schedules, classification requirements, and automated disposal for embeddings, models, and generated content |
| Risk Management Strategy — data governance framework | PM-9 | PM | Include AI-derived data assets in risk management strategy; define roles, ownership, and governance policies for all AI data categories |
| Event Logging — lineage and disposal tracking | AU-2 | AU | Log data lineage events from source through all AI transformations; log disposal actions with evidence of completeness |
| Protection of Information at Rest — retained data encryption | SC-28 | SC | Encrypt all retained AI data assets — embeddings, cached outputs, fine-tuned models — using FIPS 140-validated modules; support crypto-shredding for disposal |

#### Mitigations

**Foundational**
- CM-3: Extend data classification to all AI-derived assets; define
  retention policies and automated disposal schedules
- PM-9: Establish AI data governance framework; define roles,
  ownership, and accountability
- AU-2: Maintain data lineage records from source through all AI
  transformations

**Hardening**
- SC-28: Encrypt retained AI data with per-asset keys enabling
  crypto-shredding for secure disposal
- CM-3: Implement automated retention enforcement; verify disposal
  completeness
- PM-9: Include governance maturity metrics in management reporting

**Advanced**
- CM-3: Include data lifecycle compliance in FedRAMP annual assessment
- AU-2: Deploy automated lineage-based compliance verification across
  all AI data stores
- PM-9: Include AI data governance in FedRAMP SSP; demonstrate
  comprehensive governance maturity

#### Tools

| Tool | Type | Link |
|---|---|---|
| Collibra | Commercial | https://www.collibra.com |
| Apache Atlas | Open-source | https://atlas.apache.org |
| AWS S3 Lifecycle / Azure Lifecycle Management | Commercial | https://aws.amazon.com/s3/ |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI09 Emerging Agentic Patterns
- Other frameworks: SP 800-218A PW.1.1-PS – NIST CSF 2.0 PR.DS-3 – ISO 42001 A.7.2

---

### DSGAI08 – Non-Compliance & Regulatory Violations

**Severity:** High

GenAI systems fail to meet regulatory obligations — GDPR, EU AI Act,
sector-specific requirements — due to inadequate data handling, missing
documentation, or uncontrolled processing. FedRAMP AI overlay addresses
this through risk management strategy covering regulatory compliance
(PM-9), risk assessment identifying compliance gaps (RA-3), comprehensive
logging for regulatory evidence (AU-2), and continuous monitoring
tracking ongoing compliance (CA-7).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Risk Management Strategy — regulatory compliance | PM-9 | PM | Include regulatory compliance in AI risk management; map applicable data laws — GDPR, CCPA, HIPAA, EU AI Act — to AI processing activities and define compliance requirements |
| Risk Assessment — compliance gap analysis | RA-3 | RA | Conduct regulatory compliance gap analysis for AI systems; identify areas of non-compliance and define remediation plans |
| Event Logging — regulatory evidence | AU-2 | AU | Maintain comprehensive logs for regulatory compliance evidence; ensure audit trails meet requirements of applicable data laws |
| Continuous Monitoring — compliance tracking | CA-7 | CA | Include regulatory compliance metrics in continuous monitoring; track compliance status across AI systems and alert on drift |

#### Mitigations

**Foundational**
- PM-9: Map all AI data processing to applicable regulatory
  requirements; define compliance requirements for each
- RA-3: Conduct compliance gap analysis; identify non-compliance areas
  and prioritise remediation
- AU-2: Implement logging sufficient for regulatory evidence;
  maintain processing records and consent logs

**Hardening**
- CA-7: Include regulatory compliance in continuous monitoring; track
  compliance status across AI systems
- RA-3: Conduct regular compliance reassessment aligned with
  regulatory changes
- AU-2: Implement automated compliance evidence collection

**Advanced**
- PM-9: Include AI regulatory compliance in FedRAMP SSP; demonstrate
  comprehensive compliance coverage
- CA-7: Deploy automated compliance monitoring across all AI systems
- RA-3: Include regulatory compliance in FedRAMP annual assessment;
  conduct and document AI risk assessments per regulatory requirements

#### Tools

| Tool | Type | Link |
|---|---|---|
| OneTrust | Commercial | https://www.onetrust.com |
| TrustArc | Commercial | https://trustarc.com |
| ServiceNow GRC | Commercial | https://www.servicenow.com |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI02 Misconfigured Access Controls
- Other frameworks: SP 800-218A PW.1.1-PS – GDPR – EU AI Act – FedRAMP High Baseline

---

### DSGAI09 – Multimodal Cross-Channel Leakage

**Severity:** Medium

Data leaks across modalities — text-to-image, speech-to-text, OCR —
when sensitive information in one channel surfaces in another without
appropriate controls. FedRAMP AI overlay addresses this through boundary
protection enforcing data flow between modalities (SC-7), access
enforcement on cross-modal data (AC-3), system monitoring for cross-modal
leakage indicators (SI-4), and event logging for cross-channel data
movement (AU-2).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Boundary Protection — cross-modal data flow enforcement | SC-7 | SC | Enforce boundary controls on data flows between AI modalities; prevent sensitive data from crossing modal boundaries without appropriate classification and authorisation |
| Access Enforcement — cross-modal data access | AC-3 | AC | Enforce consistent access controls across all modalities; restrict cross-modal data access based on sensitivity classification |
| System Monitoring — cross-modal leakage detection | SI-4 | SI | Monitor AI outputs across all modalities for cross-channel leakage indicators; detect sensitive content surfacing in unintended modalities |
| Event Logging — cross-channel data movement | AU-2 | AU | Log data movement across modality boundaries; enable detection and investigation of cross-channel leakage |

#### Mitigations

**Foundational**
- SC-7: Enforce boundary controls between AI modalities; classify data
  sensitivity per modality
- AC-3: Apply consistent access controls across all modalities — text,
  image, audio, video
- AU-2: Log all cross-modal data movement

**Hardening**
- SI-4: Deploy output filtering across all modalities; detect sensitive
  content in cross-modal outputs
- SC-7: Implement automated data flow enforcement between modality
  boundaries
- AU-2: Feed cross-modal data flow logs into continuous monitoring

**Advanced**
- SI-4: Include cross-modal leakage testing in FedRAMP annual
  assessment
- SC-7: Deploy advanced cross-modal data classification; detect
  implicit information transfer across channels
- Implement modality-specific DLP policies

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| Netskope | Commercial | https://www.netskope.com |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI03 Privilege Escalation
- Other frameworks: SP 800-218A PS.1.1-PS – NIST CSF 2.0 PR.DS-5 – CWE-200

---

### DSGAI10 – Synthetic Data & Anonymization Pitfalls

**Severity:** Medium

Synthetic data generation or anonymization techniques fail to prevent
re-identification, membership inference, or attribute inference from the
generated datasets. FedRAMP AI overlay addresses this through system
monitoring for synthetic data quality (SI-4), vulnerability scanning
covering re-identification risk (RA-5), and risk management strategy
covering privacy guarantees (PM-9).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| System Monitoring — synthetic data quality | SI-4 | SI | Monitor synthetic data outputs for quality, privacy preservation, and absence of sensitive pattern leakage |
| Vulnerability Scanning — re-identification risk | RA-5 | RA | Include synthetic data re-identification and pattern leakage in vulnerability assessment; test for membership and attribute inference |
| Risk Management Strategy — privacy guarantees | PM-9 | PM | Include synthetic data privacy risk in AI risk management; define formal privacy guarantees required for synthetic data generation |

#### Mitigations

**Foundational**
- SI-4: Monitor synthetic data for sensitive pattern leakage; validate
  privacy preservation before use
- RA-5: Assess re-identification risk for synthetic datasets before
  release
- PM-9: Define privacy requirements for synthetic data generation

**Hardening**
- SI-4: Deploy automated privacy validation for synthetic data;
  verify differential privacy guarantees
- RA-5: Conduct re-identification testing on synthetic datasets;
  include in regular vulnerability assessments
- PM-9: Include synthetic data monitoring in continuous monitoring

**Advanced**
- Deploy formal privacy guarantees for synthetic data generation
  (differential privacy, k-anonymity)
- Include synthetic data risk in FedRAMP annual assessment
- Implement continuous privacy monitoring for synthetic data pipelines

#### Tools

| Tool | Type | Link |
|---|---|---|
| Gretel AI | Commercial | https://gretel.ai |
| SDV | Open-source | https://sdv.dev |
| ARX Data Anonymization | Open-source | https://arx.deidentifier.org |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- Agentic Top 10: ASI09 Emerging Agentic Patterns
- Other frameworks: SP 800-218A PW.7.2-PS – NIST Privacy Framework – ISO 27701

---

### DSGAI11 – Cross-Context Conversation Bleed

**Severity:** High

Data from one user session, tenant, or conversation context leaks into
another due to shared memory, caching, or insufficient context isolation.
FedRAMP AI overlay addresses this through information flow enforcement
preventing cross-context data transfer (AC-4), boundary protection
isolating session data (SC-7), event logging detecting cross-context
access (AU-2), and access enforcement restricting session-scoped data
(AC-3).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Information Flow Enforcement — context isolation | AC-4 | AC | Enforce information flow controls preventing data from crossing session, tenant, or conversation boundaries; implement strict context isolation |
| Boundary Protection — session data isolation | SC-7 | SC | Enforce boundary protection isolating session, tenant, and conversation data; prevent shared memory or cache from leaking cross-context data |
| Event Logging — cross-context access detection | AU-2 | AU | Log context boundaries and data access patterns; detect and alert on cross-context data access violations |
| Access Enforcement — session-scoped data access | AC-3 | AC | Enforce access controls scoped to the current session and tenant; deny cross-context data retrieval by default |

#### Mitigations

**Foundational**
- AC-4: Enforce strict session isolation — no shared state between
  users or tenants at the data layer
- AC-3: Scope all data access to the current session and tenant; deny
  cross-context retrieval
- AU-2: Log context boundaries and data access patterns

**Hardening**
- SC-7: Implement architectural enforcement of context boundaries;
  separate memory and cache per session
- AU-2: Deploy monitoring for cross-context data access patterns;
  alert on violations
- AC-4: Include context isolation testing in security assessment

**Advanced**
- SC-7: Include context isolation controls in FedRAMP annual assessment
- Deploy automated cross-context bleed detection in continuous
  monitoring
- AC-4: Implement formal isolation verification for multi-tenant AI
  deployments

#### Tools

| Tool | Type | Link |
|---|---|---|
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| HashiCorp Vault | Commercial | https://www.vaultproject.io |
| Splunk | Commercial | https://www.splunk.com |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI06 Memory Poisoning & Context Confusion
- Other frameworks: SP 800-218A PS.1.1-PS – NIST CSF 2.0 PR.DS-5 – CWE-200

---

### DSGAI12 – Unsafe NL Data Gateways

**Severity:** Critical

LLM-to-SQL, LLM-to-API, or LLM-to-shell interfaces allow natural
language inputs to be converted into executable queries or commands
without proper validation, enabling data exfiltration or manipulation.
FedRAMP AI overlay addresses this through input validation on NL-to-query
translation (SI-10), access enforcement restricting gateway operations
(AC-3), event logging of all gateway transactions (AU-2), and boundary
protection controlling gateway data flows (SC-7).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Information Input Validation — NL-to-query validation | SI-10 | SI | Validate all natural language inputs before translation to executable queries; block injection patterns, destructive operations, and schema-probing queries |
| Access Enforcement — gateway operation restrictions | AC-3 | AC | Enforce allow-listed operations for NL data gateways; gateway queries execute with the requesting user's permissions, not system-level; restrict to read-only or approved operations |
| Event Logging — gateway transaction logging | AU-2 | AU | Log all NL gateway transactions — input, translated query, results — with user identity and authorisation context |
| Boundary Protection — gateway data flow control | SC-7 | SC | Enforce boundary controls on NL gateway data flows; limit result sets; prevent sensitive data from leaving authorised scope |

#### Mitigations

**Foundational**
- SI-10: Input validation on all NL-to-query translation; block
  injection patterns and destructive operations
- AC-3: Enforce allow-listed operations — NL gateways cannot execute
  destructive queries; queries run as requesting user
- AU-2: Log all gateway transactions with full context

**Hardening**
- SC-7: Implement output row/column limits; redact sensitive fields
  from query results
- SI-10: Deploy query analysis detecting schema-probing and data
  exfiltration patterns
- AU-2: Feed gateway logs into continuous monitoring; alert on
  anomalous query patterns

**Advanced**
- SI-10: Include NL gateway security in FedRAMP annual assessment;
  demonstrate injection prevention controls
- SC-7: Deploy parameterised query enforcement; prevent NL inputs from
  bypassing query sanitisation
- AC-3: Implement dynamic access controls adjusting gateway permissions
  based on query risk classification

#### Tools

| Tool | Type | Link |
|---|---|---|
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| Splunk | Commercial | https://www.splunk.com |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- Agentic Top 10: ASI02 Misconfigured Access Controls
- Other frameworks: SP 800-218A PW.5.1-PS – CWE-89 – NIST CSF 2.0 PR.DS-5

---

### DSGAI13 – Vector Store Platform Security

**Severity:** High

Vector databases and embedding stores lack access controls, encryption,
or integrity verification — enabling unauthorised access to embeddings
that encode sensitive information. FedRAMP AI overlay addresses this
through encryption of embeddings at rest (SC-28), access enforcement on
vector stores (AC-3), audit generation tracking all vector store
operations (AU-12), and configuration management securing database
settings (CM-6).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Protection of Information at Rest — embedding encryption | SC-28 | SC | Encrypt all vector embeddings and metadata at rest using FIPS 140-validated modules; enforce key management per FedRAMP requirements |
| Access Enforcement — vector store access control | AC-3 | AC | Implement RBAC on vector stores; enforce namespace-level access controls; restrict query scope to authorised collections |
| Audit Generation — vector store operation tracking | AU-12 | AU | Generate audit records for all vector store queries, index modifications, and administrative operations |
| Configuration Settings — vector database hardening | CM-6 | CM | Configure vector databases per security baselines; disable default credentials, restrict network access, enforce TLS |

#### Mitigations

**Foundational**
- SC-28: Encrypt all embeddings at rest and in transit; enforce FIPS
  140-validated modules
- AC-3: Implement RBAC on vector stores; restrict queries to authorised
  namespaces and collections
- CM-6: Harden vector database configuration; disable defaults;
  restrict network access

**Hardening**
- AU-12: Log all vector store queries and index modifications; feed
  into continuous monitoring
- AC-3: Implement namespace-level isolation for multi-tenant
  deployments; enforce query-scope restrictions
- SC-28: Conduct embedding extraction testing; verify sensitive
  information cannot be reconstructed from embeddings

**Advanced**
- CM-6: Include vector store security in FedRAMP annual assessment;
  demonstrate configuration compliance
- AU-12: Deploy real-time analytics on vector store access patterns;
  detect anomalous query behaviour
- SC-28: Implement hardware-backed encryption for high-sensitivity
  embedding stores

#### Tools

| Tool | Type | Link |
|---|---|---|
| HashiCorp Vault | Commercial | https://www.vaultproject.io |
| AWS KMS / Azure Key Vault | Commercial | https://aws.amazon.com/kms/ |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| OpenTelemetry | Open-source | https://opentelemetry.io |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI06 Memory Poisoning & Context Confusion
- Other frameworks: SP 800-218A PS.1.1-PS – NIST CSF 2.0 PR.DS-1 – CWE-311

---

### DSGAI14 – Excessive Telemetry & Monitoring Leakage

**Severity:** Medium

Observability pipelines — logs, traces, metrics — capture sensitive data
from AI interactions (prompts, responses, user data) and store it with
insufficient access controls. FedRAMP AI overlay addresses this through
access enforcement on telemetry data (AC-3), event logging with secure
logging practices (AU-2), system monitoring detecting sensitive data in
telemetry (SI-4), and risk management covering telemetry governance
(PM-9).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Access Enforcement — telemetry data access | AC-3 | AC | Enforce access controls on all telemetry data stores; restrict access to observability pipelines based on role and need-to-know |
| Event Logging — secure logging practices | AU-2 | AU | Implement secure logging — redact PII and sensitive content from logs, traces, and metrics before storage; apply data minimisation |
| System Monitoring — telemetry leakage detection | SI-4 | SI | Monitor telemetry pipelines for sensitive data; detect PII, credentials, or classified content in logs and traces |
| Risk Management Strategy — telemetry governance | PM-9 | PM | Include telemetry data in risk management; define retention limits, access controls, and classification for all observability data |

#### Mitigations

**Foundational**
- AC-3: Restrict access to telemetry data stores; enforce RBAC on
  observability pipelines
- AU-2: Redact PII and sensitive content from logs and traces before
  storage; apply data minimisation to all telemetry
- PM-9: Define retention limits and classification for telemetry data

**Hardening**
- SI-4: Deploy automated sensitive data detection in telemetry
  pipelines; alert on PII or credentials in logs
- AC-3: Implement telemetry data classification; apply differential
  access based on sensitivity
- AU-2: Filter sensitive data from telemetry streams at the collection
  point

**Advanced**
- PM-9: Include telemetry governance in FedRAMP SSP; demonstrate
  comprehensive observability data management
- SI-4: Include telemetry leakage testing in FedRAMP annual assessment
- Deploy automated telemetry sanitisation across all AI observability
  pipelines

#### Tools

| Tool | Type | Link |
|---|---|---|
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Splunk | Commercial | https://www.splunk.com |
| Elasticsearch | Open-source | https://www.elastic.co |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI09 Emerging Agentic Patterns
- Other frameworks: SP 800-218A PS.1.1-PS – NIST CSF 2.0 DE.AE-3 – CWE-532

---

### DSGAI15 – Over-Broad Context Windows

**Severity:** High

Excessive content injected into LLM context windows — full documents,
entire conversation histories, unnecessary system data — increases the
attack surface for data extraction. FedRAMP AI overlay addresses this
through least privilege restricting context data scope (AC-6), least
functionality limiting context assembly (CM-7), and input validation
enforcing context boundaries (SI-10).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Least Privilege — context data scoping | AC-6 | AC | Restrict context window content to minimum necessary for the task; enforce per-task context scope limits aligned with user authorisation |
| Least Functionality — context assembly restrictions | CM-7 | CM | Restrict context assembly to approved data sources; disable inclusion of unnecessary system data, full documents, or unbounded conversation history |
| Information Input Validation — context boundary enforcement | SI-10 | SI | Validate and enforce context window boundaries; truncate or summarise content exceeding defined limits; strip unnecessary metadata |

#### Mitigations

**Foundational**
- AC-6: Only include minimum necessary data in context windows;
  enforce per-task context scope limits
- CM-7: Restrict context assembly to approved data sources; disable
  inclusion of non-essential data
- SI-10: Validate context window content; truncate or summarise
  oversized documents

**Hardening**
- AC-6: Implement automated context minimisation enforcement; alert
  when context exceeds defined scope
- CM-7: Deploy context assembly policies per use case; enforce maximum
  document counts and sizes
- SI-10: Strip unnecessary metadata from context; enforce schema
  validation on context content

**Advanced**
- AC-6: Include context scope controls in FedRAMP annual assessment
- Deploy intelligent context selection — retrieve only relevant
  passages rather than full documents
- CM-7: Implement continuous context scope monitoring; detect context
  inflation patterns

#### Tools

| Tool | Type | Link |
|---|---|---|
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Nightfall DLP | Commercial | https://www.nightfall.ai |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI02 Misconfigured Access Controls
- Other frameworks: SP 800-218A PW.1.1-PS – NIST CSF 2.0 PR.DS-5 – CWE-200

---

### DSGAI16 – Endpoint & Browser Overreach

**Severity:** High

AI agents operating in browsers, desktop environments, or mobile devices
access more data than necessary — reading screens, files, or network data
beyond the task scope. FedRAMP AI overlay addresses this through least
privilege restricting agent endpoint access (AC-6), least functionality
limiting agent capabilities (CM-7), boundary protection controlling
endpoint data flows (SC-7), and event logging tracking agent data access
(AU-2).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Least Privilege — agent endpoint access | AC-6 | AC | Restrict agent access to minimum necessary endpoint data; enforce explicit permission grants per data source — files, screens, network |
| Least Functionality — agent capability restrictions | CM-7 | CM | Restrict agent capabilities to approved operations; disable file system, clipboard, or network access beyond task requirements |
| Boundary Protection — endpoint data flow control | SC-7 | SC | Enforce boundary controls on data flows from endpoints to AI agents; prevent agents from exfiltrating endpoint data |
| Event Logging — agent data access tracking | AU-2 | AU | Log all agent data access at endpoints; capture what files, screens, and network data agents read and transmit |

#### Mitigations

**Foundational**
- AC-6: Enforce explicit permission grants per data source; agents
  cannot access files, screens, or network data without authorisation
- CM-7: Restrict agent capabilities to approved operations; disable
  access to unneeded resources
- AU-2: Log all agent data access at endpoints

**Hardening**
- SC-7: Implement boundary controls preventing agent data exfiltration
  from endpoints
- AC-6: Agent inherits user's access level — cannot escalate beyond
  endpoint permissions
- AU-2: Feed agent access logs into continuous monitoring; alert on
  anomalous data access patterns

**Advanced**
- CM-7: Include endpoint agent controls in FedRAMP annual assessment;
  demonstrate capability restrictions
- SC-7: Deploy advanced data flow monitoring for endpoint AI agents;
  detect covert data channels
- AC-6: Implement dynamic permission scoping based on task context

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Defender for Endpoint | Commercial | https://www.microsoft.com/en-us/security/business/endpoint-security |
| Netskope | Commercial | https://www.netskope.com |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| OpenTelemetry | Open-source | https://opentelemetry.io |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- Agentic Top 10: ASI03 Privilege Escalation
- Other frameworks: SP 800-218A PW.1.1-PS – NIST CSF 2.0 PR.AC-4 – CWE-250

---

### DSGAI17 – Data Availability & Resilience Failures

**Severity:** High

AI data pipelines fail silently — RAG retrieval returns stale results,
embedding indices corrupt, training data becomes unavailable — degrading
AI system reliability without alerting operators. FedRAMP AI overlay
addresses this through information system backup for AI data assets
(CP-9), information system recovery for pipeline restoration (CP-10),
system monitoring for pipeline health (SI-4), and continuous monitoring
tracking availability metrics (CA-7).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Information System Backup — AI data asset backup | CP-9 | CP | Implement versioned backups of critical AI data assets — embeddings, indices, training data, model weights — with verified restoration procedures |
| Information System Recovery and Reconstitution — pipeline restoration | CP-10 | CP | Define and test recovery procedures for AI data pipelines; implement failover for critical RAG and embedding services |
| System Monitoring — pipeline health monitoring | SI-4 | SI | Monitor all AI data pipelines for health — RAG retrieval latency, embedding index integrity, data freshness; alert on degradation |
| Continuous Monitoring — availability metrics | CA-7 | CA | Include AI data pipeline availability in continuous monitoring; track uptime, latency, and data freshness metrics |

#### Mitigations

**Foundational**
- CP-9: Implement versioned backups of critical AI data assets —
  embeddings, indices, training data; verify restoration regularly
- SI-4: Deploy health checks and circuit breakers on all AI data
  pipelines; alert on failure or degradation
- CP-10: Define recovery procedures for AI data pipelines

**Hardening**
- CA-7: Include AI data pipeline availability in continuous monitoring;
  track freshness and latency metrics
- CP-10: Test pipeline recovery procedures regularly; implement
  failover for critical services
- SI-4: Deploy real-time monitoring of data pipeline health; detect
  silent failures and stale data

**Advanced**
- CP-9: Include AI data resilience in FedRAMP annual assessment;
  demonstrate backup completeness and recovery capability
- CA-7: Implement automated resilience testing; detect degradation
  before it affects AI system outputs
- CP-10: Deploy automated failover for critical AI data pipelines

#### Tools

| Tool | Type | Link |
|---|---|---|
| AWS Backup / Azure Backup | Commercial | https://aws.amazon.com/backup/ |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Prometheus | Open-source | https://prometheus.io |
| PagerDuty | Commercial | https://www.pagerduty.com |

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- Agentic Top 10: ASI09 Emerging Agentic Patterns
- Other frameworks: SP 800-218A PO.3.1-PS – NIST CSF 2.0 PR.DS-4 – ISO 42001 A.7.5

---

### DSGAI18 – Inference & Data Reconstruction

**Severity:** High

Attackers reconstruct sensitive training data or infer membership through
model inversion, membership inference, or attribute inference attacks
against deployed models. FedRAMP AI overlay addresses this through
encryption protecting model and training data at rest (SC-28), access
enforcement restricting inference API access (AC-3), system monitoring
detecting systematic probing patterns (SI-4), and vulnerability scanning
assessing reconstruction risk (RA-5).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Protection of Information at Rest — model and data protection | SC-28 | SC | Encrypt model weights and training data at rest; implement privacy-preserving storage to limit reconstruction attack surface |
| Access Enforcement — inference API access control | AC-3 | AC | Enforce access controls on inference endpoints; rate-limit API access; restrict bulk query patterns enabling reconstruction |
| System Monitoring — probing pattern detection | SI-4 | SI | Monitor inference endpoints for systematic probing patterns — membership inference, model inversion, attribute inference; alert on detection |
| Vulnerability Scanning — reconstruction risk assessment | RA-5 | RA | Include model inversion and membership inference attacks in vulnerability assessment; test deployed models for data reconstruction risk |

#### Mitigations

**Foundational**
- SC-28: Encrypt model weights and training data at rest; implement
  FIPS 140-validated modules
- AC-3: Enforce access controls on inference endpoints; implement rate
  limiting on inference APIs
- SI-4: Monitor for systematic probing patterns

**Hardening**
- RA-5: Conduct model inversion and membership inference testing;
  assess reconstruction risk before deployment
- AC-3: Restrict bulk query patterns that enable membership inference
  or model inversion
- SI-4: Deploy advanced probing detection; detect systematic querying
  indicative of data reconstruction attacks

**Advanced**
- Apply differential privacy during training to bound reconstruction
  risk
- RA-5: Include reconstruction risk assessment in FedRAMP annual
  assessment
- SC-28: Include inference attack resilience testing in security
  assessment

#### Tools

| Tool | Type | Link |
|---|---|---|
| IBM Adversarial Robustness Toolbox | Open-source | https://github.com/Trusted-AI/adversarial-robustness-toolbox |
| Opacus | Open-source | https://opacus.ai |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Fiddler AI | Commercial | https://www.fiddler.ai |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI03 Privilege Escalation
- Other frameworks: SP 800-218A PW.1.1-PS – MITRE ATLAS AML.T0024 – NIST Privacy Framework

---

### DSGAI19 – Human-in-Loop & Labeler Overexposure

**Severity:** Medium

Human annotators, reviewers, and labelers are exposed to sensitive,
harmful, or disturbing content during AI data preparation without
adequate protections. FedRAMP AI overlay addresses this through access
enforcement limiting labeler exposure (AC-3), personnel screening for
sensitive data roles (PS-3), security awareness training covering
AI-specific data risks (AT-2), and event logging tracking labeler data
access (AU-2).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Access Enforcement — labeler exposure controls | AC-3 | AC | Enforce access controls limiting labeler exposure to sensitive content; segment data so labelers only access content within their clearance scope |
| Personnel Screening — sensitive data role screening | PS-3 | PS | Screen human annotators and labelers for roles involving access to sensitive, classified, or harmful content |
| Awareness and Training — AI data risk training | AT-2 | AT | Provide training on AI-specific data risks for all labelers and reviewers; include handling of sensitive, harmful, and disturbing content |
| Event Logging — labeler access tracking | AU-2 | AU | Log all labeler data access for compliance and safety monitoring; track exposure duration and content categories |

#### Mitigations

**Foundational**
- AC-3: Segment data so labelers only access content within their
  clearance and role scope
- PS-3: Screen all labelers before granting access to sensitive data
- AT-2: Provide training on handling sensitive and harmful content

**Hardening**
- AU-2: Log all labeler data access; track exposure patterns and
  content categories
- AC-3: Implement automated content filtering pre-screening content
  before labeler access; blur or redact non-essential sensitive elements
- AT-2: Include AI-specific data risk training in annual security
  awareness programme

**Advanced**
- PS-3: Include labeler screening and wellbeing protections in FedRAMP
  annual assessment
- AU-2: Deploy exposure monitoring; alert when labeler exposure to
  harmful content exceeds defined thresholds
- Implement duty-of-care controls — session limits, psychological
  support, content rotation

#### Tools

| Tool | Type | Link |
|---|---|---|
| Label Studio | Open-source | https://labelstud.io |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Snorkel AI | Commercial | https://snorkel.ai |
| Scale AI | Commercial | https://scale.com |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI09 Emerging Agentic Patterns
- Other frameworks: SP 800-218A PW.1.1-PS – NIST Privacy Framework – ISO 42001 A.6.2.6

---

### DSGAI20 – Model Exfiltration & IP Replication

**Severity:** Critical

Model weights, architectures, or trained capabilities are extracted
through systematic querying, side-channel attacks, or insider access —
enabling unauthorised replication of proprietary models. FedRAMP AI
overlay addresses this through encryption protecting model IP at rest
(SC-28), access enforcement restricting model weight access (AC-3),
audit generation tracking IP access (AU-12), and system monitoring
detecting extraction patterns (SI-4).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Protection of Information at Rest — model IP encryption | SC-28 | SC | Encrypt all intellectual property — model weights, proprietary training data, algorithms — at rest with FIPS 140-validated modules |
| Access Enforcement — model weight access control | AC-3 | AC | Enforce strict access control on AI intellectual property; restrict model weight access to minimum necessary personnel with approval workflow |
| Audit Generation — IP access tracking | AU-12 | AU | Generate audit records for all access to AI intellectual property — model weights, architectures, training data; detect unauthorised access and exfiltration |
| System Monitoring — extraction pattern detection | SI-4 | SI | Monitor inference endpoints and model registries for systematic extraction patterns; detect model distillation, scraping, and side-channel attacks |

#### Mitigations

**Foundational**
- SC-28: Encrypt all AI IP at rest; implement key management per
  FedRAMP requirements
- AC-3: Restrict access to AI IP to minimum necessary personnel;
  enforce multi-factor authentication for model weight access
- AU-12: Log all access to AI IP with full identity and action detail

**Hardening**
- SI-4: Deploy extraction pattern detection; detect systematic querying
  indicative of model distillation or scraping
- AC-3: Implement time-bounded access for model weight downloads;
  require approval workflow
- AU-12: Feed IP access logs into continuous monitoring; alert on
  anomalous access patterns

**Advanced**
- Deploy model watermarking and fingerprinting to detect stolen model
  weights in production
- SC-28: Include IP protection in FedRAMP annual assessment
- AC-3: Implement hardware-backed key management for model weight
  encryption keys

#### Tools

| Tool | Type | Link |
|---|---|---|
| HashiCorp Vault | Commercial | https://www.vaultproject.io |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| AWS KMS / Azure Key Vault | Commercial | https://aws.amazon.com/kms/ |
| ModelScan | Open-source | https://github.com/protectai/modelscan |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI04 Supply Chain Compromise
- Other frameworks: SP 800-218A PS.1.1-PS – MITRE ATLAS AML.T0024 – NIST CSF 2.0 PR.DS-5

---

### DSGAI21 – Disinformation & Integrity Attacks

**Severity:** High

Adversaries poison RAG knowledge bases, manipulate training data, or
exploit model capabilities to generate and distribute false or misleading
content at scale. FedRAMP AI overlay addresses this through malicious
code protection covering adversarial content injection (SI-3), software
and information integrity verifying knowledge source authenticity (SI-7),
event logging for content provenance tracking (AU-2), and supply chain
controls verifying source credibility (SR-3).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Malicious Code Protection — adversarial content detection | SI-3 | SI | Extend malicious code protection to detect adversarial content injected into RAG knowledge bases and training data; identify poisoned or manipulated content |
| Software, Firmware, and Information Integrity — knowledge source integrity | SI-7 | SI | Verify integrity and authenticity of RAG knowledge sources; detect unauthorised modifications to knowledge bases and training datasets |
| Event Logging — content provenance tracking | AU-2 | AU | Log provenance of all content entering knowledge bases and training pipelines; enable tracing of content from source through processing to output |
| Supply Chain Controls — source credibility verification | SR-3 | SR | Verify credibility and integrity of all knowledge sources before ingestion; implement source validation and fact-checking controls |

#### Mitigations

**Foundational**
- SI-3: Implement integrity monitoring of RAG knowledge bases; detect
  injected disinformation and adversarial content
- SI-7: Verify integrity of knowledge sources; detect unauthorised
  modifications to knowledge bases
- AU-2: Log provenance of all content entering knowledge pipelines

**Hardening**
- SR-3: Implement source credibility verification for all knowledge
  sources; validate before ingestion
- SI-3: Deploy content safety guardrails preventing generation of
  verifiable false claims
- AU-2: Feed content provenance logs into continuous monitoring;
  detect poisoning campaigns

**Advanced**
- SI-7: Include knowledge base integrity in FedRAMP annual assessment;
  demonstrate tamper detection controls
- SR-3: Deploy continuous knowledge source integrity monitoring; alert
  on source credibility changes
- Deploy content provenance tracking — flag AI-generated content and
  maintain source attribution

#### Tools

| Tool | Type | Link |
|---|---|---|
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| CleanLab | Open-source | https://github.com/cleanlab/cleanlab |
| Great Expectations | Open-source | https://greatexpectations.io |
| Splunk | Commercial | https://www.splunk.com |

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- Agentic Top 10: ASI06 Memory Poisoning & Context Confusion
- Other frameworks: MITRE ATLAS AML.T0032 – SP 800-218A PW.7.2-PS – NIST CSF 2.0 PR.DS-8

---

## Implementation priority

| Phase | AC / AU | SC / SI / CM | PM / RA / SA / SR / CP |
|---|---|---|---|
| 1 – Now | AC-3 access enforcement for DSGAI01/12/20; AU-2 logging for DSGAI01/08/12 | SC-28 encryption for DSGAI01/04/20; SI-3 poisoning protection for DSGAI04/21 | PM-9 governance for DSGAI07/08; SR-2 supply chain for DSGAI04 |
| 2 – This sprint | AC-6 least privilege for DSGAI02/15/16; AU-12 audit generation for DSGAI02/13/20; AC-4 isolation for DSGAI11 | SI-10 input validation for DSGAI05/12; CM-7 shadow AI blocking for DSGAI03; CM-3 lifecycle for DSGAI07 | SA-9 third-party controls for DSGAI03/06; SR-3 provenance for DSGAI04/21; RA-3 compliance gap for DSGAI08 |
| 3 – This quarter | AC-3 tool exchange and gateway controls for DSGAI06/12; AU-2 comprehensive logging for all entries | SC-7 boundary and isolation for DSGAI06/09/11/16; SI-4 monitoring for DSGAI01/09/14/18/20; SI-7 integrity for DSGAI05/21 | CA-7 continuous monitoring for DSGAI08/17; RA-5 vulnerability scanning for DSGAI10/18; CP-9 backup for DSGAI17 |
| 4 – Ongoing | Access control reviews; audit log analysis; agent credential lifecycle management | Continuous monitoring; encryption key rotation; configuration drift detection; pipeline health checks | Annual FedRAMP assessment; governance maturity tracking; third-party reassessment; resilience testing |

---

## References

- [NIST SP 800-53 Rev 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- [FedRAMP](https://www.fedramp.gov/)
- [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/dsgai-2026/)
- [NIST AI RMF 1.0](https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-28 | 2026-Q1 | Initial mapping – DSGAI01–DSGAI21 full entries | OWASP GenAI Data Security Initiative |
| 2026-05-26 | 2026-Q1 | Rewrite all 21 entries with canonical DSGAI risk descriptions and correct FedRAMP/NIST 800-53 mappings | OWASP GenAI Data Security Initiative |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) –
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
