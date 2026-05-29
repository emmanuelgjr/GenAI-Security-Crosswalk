<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks 2026 (DSGAI01–DSGAI21)
  Framework   : DORA – Digital Operational Resilience Act (EU Regulation 2022/2554)
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative – https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 × DORA

Mapping the [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/dsgai-2026/)
to the [Digital Operational Resilience Act (DORA)](https://eur-lex.europa.eu/eli/reg/2022/2554/oj)
(EU Regulation 2022/2554, effective 17 January 2025).

DORA establishes a binding regulatory framework for digital operational
resilience across the EU financial sector. For financial entities managing
AI data security, DORA requires that data-related risks — including data
poisoning, leakage, privacy erosion, third-party data dependency, and
governance failures — are integrated into ICT risk management, incident
reporting, resilience testing, and third-party oversight. The DSGAI 2026
mapping focuses on the data security dimensions critical to the EU financial
sector: from training data provenance and integrity, through access control
and privacy preservation, to data retention, consent management, and
cross-jurisdictional compliance. Financial institutions deploying generative
AI must ensure that AI data security risks are treated as first-class
concerns within the DORA ICT risk management framework, incident management
processes, resilience testing programmes, and third-party oversight
arrangements. This mapping enables financial institutions to trace each
OWASP DSGAI risk to specific DORA articles and implement controls satisfying
both data security and operational resilience regulatory obligations.

---

## Why DORA for GenAI data security

This mapping traces each OWASP DSGAI 2026 data security risk to specific DORA controls, enabling data security teams to address GenAI-specific data risks within their existing DORA compliance and governance programmes.

---

## DORA article groups

| Group | Articles | Purpose |
|---|---|---|
| ICT Risk Management | Art. 5–7 | Governance framework, risk management strategy, and data governance policies for AI data security |
| Identification | Art. 8 | Identification and classification of ICT assets including AI data stores, pipelines, and embeddings |
| Protection and Prevention | Art. 9 | Security controls for data protection, access control, integrity, and privacy preservation |
| Detection | Art. 10 | Anomaly detection, monitoring, and alerting for data security events in AI systems |
| Response and Recovery | Art. 11 | Incident response and recovery procedures for AI data security incidents |
| Backup Policies | Art. 12 | Backup and restoration of AI data, models, configurations, and lineage metadata |
| Learning and Evolving | Art. 13 | Post-incident analysis, lessons learned, and continuous improvement for AI data security |
| ICT Incident Management | Art. 17–23 | Incident classification, reporting to regulators, and communication for AI data breaches |
| Resilience Testing | Art. 24–27 | Testing data security controls, data extraction resistance, and privacy protections |
| Third-Party Risk | Art. 28–44 | Oversight of third-party data providers, AI vendors, and data processors |
| Information Sharing | Art. 45 | Threat intelligence sharing for AI data security threats across the financial sector |

---

## Quick-reference summary

| ID | Name | Severity | DORA Articles | Scope |
|---|---|---|---|---|
| DSGAI01 | Sensitive Data Leakage | Critical | Art. 9, Art. 10, Art. 17–23 | Both |
| DSGAI02 | Agent Identity & Credential Exposure | Critical | Art. 9, Art. 8, Art. 10 | Both |
| DSGAI03 | Shadow AI & Unsanctioned Data Flows | High | Art. 28–44, Art. 8, Art. 5–7 | Both |
| DSGAI04 | Data, Model & Artifact Poisoning | Critical | Art. 9, Art. 24–27, Art. 12 | Both |
| DSGAI05 | Data Integrity & Validation Failures | High | Art. 9, Art. 8, Art. 10 | Both |
| DSGAI06 | Tool, Plugin & Agent Data Exchange | High | Art. 28–44, Art. 9, Art. 10 | Both |
| DSGAI07 | Data Governance, Lifecycle & Classification | High | Art. 5–7, Art. 8, Art. 12 | Both |
| DSGAI08 | Non-Compliance & Regulatory Violations | High | Art. 5–7, Art. 17–23, Art. 13 | Both |
| DSGAI09 | Multimodal Cross-Channel Data Leakage | Medium | Art. 9, Art. 10, Art. 17–23 | Both |
| DSGAI10 | Synthetic Data & Anonymisation Pitfalls | Medium | Art. 9, Art. 24–27, Art. 13 | Build |
| DSGAI11 | Cross-Context Conversation Bleed | High | Art. 9, Art. 10, Art. 17–23 | Both |
| DSGAI12 | Unsafe NL Data Gateways | Critical | Art. 9, Art. 10, Art. 24–27 | Both |
| DSGAI13 | Vector Store Platform Security | High | Art. 9, Art. 8, Art. 12 | Both |
| DSGAI14 | Excessive Telemetry & Monitoring Leakage | Medium | Art. 9, Art. 5–7, Art. 10 | Both |
| DSGAI15 | Over-Broad Context Windows | High | Art. 9, Art. 5–7, Art. 10 | Both |
| DSGAI16 | Endpoint & Browser Assistant Overreach | High | Art. 9, Art. 10, Art. 28–44 | Both |
| DSGAI17 | Data Availability & Resilience Failures | High | Art. 11, Art. 12, Art. 24–27 | Both |
| DSGAI18 | Inference & Data Reconstruction | High | Art. 9, Art. 24–27, Art. 10 | Both |
| DSGAI19 | Human-in-Loop & Labeler Overexposure | Medium | Art. 9, Art. 5–7, Art. 28–44 | Both |
| DSGAI20 | Model Exfiltration & IP Replication | Critical | Art. 9, Art. 10, Art. 28–44 | Both |
| DSGAI21 | Disinformation via Data Poisoning | High | Art. 9, Art. 24–27, Art. 13 | Both |

---

## Audience tags

`data-engineer` `privacy-officer` `security-engineer` `ml-engineer` `compliance-officer` `ciso` `dpo`

- **Data engineer / ML engineer** – Art. 9 and Art. 8 entries; data protection controls and asset identification
- **Privacy officer / DPO** – Art. 5–7 entries; governance, consent, minimisation, and privacy
- **Security engineer** – Art. 9, Art. 10, Art. 17–23 entries; protection, detection, and incident management
- **Risk manager** – Art. 5–7 and Art. 28–44 entries; governance and third-party data risk
- **Compliance officer** – full file; DORA regulatory traceability for AI data security
- **CISO** – Art. 5–7 entries; data governance strategy and risk oversight

---

## Detailed mappings

---

### DSGAI01 — Sensitive Data Leakage

**Severity:** Critical

Sensitive data — PII, credentials, financial records, proprietary code —
leaks from GenAI systems through model outputs, RAG retrieval, embedding
exposure, or observability pipelines. DORA requires financial entities to
implement protection controls preventing data disclosure (Art. 9), deploy
detection for leakage indicators in model outputs (Art. 10), and report
material data leakage events to competent authorities (Art. 17–23). Data
leakage from financial AI systems may expose customer PII, credit data,
trading strategies, or regulatory-protected information.

**Real-world references:**
- EchoLeak (2025) – indirect prompt injection turned Microsoft 365 Copilot
  into a silent exfiltration engine via email content
- Samsung source code leak (2023) – proprietary data surfaced through
  employee interactions with AI tools

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – data leakage controls | Art. 9 | Protection | Implement DLP, output monitoring, access controls, and encryption for all financial AI data to prevent sensitive data from surfacing in model outputs |
| Detection – leakage indicator monitoring | Art. 10 | Detection | Deploy detection for PII, credentials, and financial data patterns in model outputs; alert and block on detection |
| ICT Incident Management – data breach reporting | Art. 17–23 | Incidents | Classify AI data leakage events as ICT-related incidents; report to competent authorities per DORA incident classification criteria |
| Learning and Evolving – leakage post-mortem | Art. 13 | Learning | Conduct post-incident analysis for data leakage events; identify root cause and update controls |

#### Mitigations

**Foundational**
- Art. 9: Implement output monitoring and DLP for financial AI systems;
  encrypt all AI data at rest and in transit; enforce access controls
  on all data access paths
- Art. 10: Deploy leakage detection in model outputs; monitor for PII,
  financial data, and credential patterns in real time
- Art. 17–23: Define incident classification criteria for AI data
  leakage; establish reporting procedures to competent authorities

**Hardening**
- Art. 9: Conduct data extraction testing before deployment; verify
  training data cannot be recovered through targeted queries
- Art. 10: Deploy automated sensitive data detection and blocking
  in real time; integrate with security operations
- Art. 17–23: Include AI data leakage in incident response playbooks;
  test notification procedures

**Advanced**
- Apply differential privacy to training pipelines; bound memorisation
  risk for sensitive financial data
- Art. 17–23: Conduct tabletop exercises for AI data breach scenarios
  involving financial regulators
- Art. 13: Establish data leakage forensics playbook; procedures for
  scope determination and regulatory notification

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| AWS Macie / Azure Purview | Commercial | https://aws.amazon.com/macie/ |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure, LLM07 System Prompt Leakage
- Agentic Top 10: ASI03 Identity & Privilege Abuse
- Other frameworks: FedRAMP SC-28 – GDPR Art. 33–34 – SP 800-218A PS.1.1-PS

---

### DSGAI02 — Agent Identity & Credential Exposure

**Severity:** Critical

Agent credentials — session tokens, API keys, delegated permissions — are
exposed through memory, logs, tool payloads, or inter-agent communication,
enabling credential theft and lateral movement. DORA requires financial
entities to implement protection controls for credential storage and agent
runtime environments (Art. 9), identify and classify all agent identity
assets (Art. 8), and detect anomalous credential usage patterns (Art. 10).
In financial AI deployments, compromised agent credentials can access
payment systems, trading platforms, and customer accounts.

**Real-world references:**
- Exposed API keys in AI agent orchestration logs enabled unauthorised
  access to cloud infrastructure (2024)
- Agent-to-agent token passing without encryption allowed credential
  interception in multi-agent financial systems (2025)

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – credential protection | Art. 9 | Protection | Implement encrypted credential storage, short-lived tokens, and secure agent runtime environments; enforce least privilege for all agent identities |
| Identification – agent identity inventory | Art. 8 | Identification | Register all agent identities, service accounts, and API keys in the ICT asset inventory; classify credential sensitivity |
| Detection – credential misuse monitoring | Art. 10 | Detection | Monitor for anomalous agent credential usage — unexpected privilege escalation, cross-boundary access, or credential reuse across sessions |
| ICT Incident Management – credential compromise reporting | Art. 17–23 | Incidents | Classify agent credential compromise as ICT-related incidents; report per DORA criteria when customer or system impact occurs |

#### Mitigations

**Foundational**
- Art. 9: Short-lived, task-scoped credentials per agent invocation;
  no long-lived tokens; encrypt credential storage with strict access
  controls on agent runtime
- Art. 8: Register all agent identities and service accounts in the
  ICT asset inventory; document privilege scope and expiry
- Art. 10: Monitor agent credential usage for anomalous patterns

**Hardening**
- Art. 9: Implement mutual TLS for agent-to-agent communication;
  enforce credential rotation schedules; deploy hardware-backed
  key management for high-value agent credentials
- Art. 10: Deploy real-time credential anomaly detection; alert on
  unusual privilege escalation or cross-boundary access patterns
- Art. 17–23: Define incident classification for credential compromise;
  establish reporting procedures

**Advanced**
- Art. 9: Deploy zero-trust agent identity with continuous verification;
  implement just-in-time privilege grants per task
- Art. 10: Integrate agent credential monitoring into continuous DORA
  resilience assessment; correlate credential events with business impact
- Art. 17–23: Conduct tabletop exercises for agent credential compromise
  scenarios in financial systems

#### Tools

| Tool | Type | Link |
|---|---|---|
| HashiCorp Vault | Commercial | https://www.vaultproject.io |
| CyberArk | Commercial | https://www.cyberark.com |
| SPIFFE / SPIRE | Open-source | https://spiffe.io |
| AWS Secrets Manager / Azure Key Vault | Commercial | https://aws.amazon.com/secrets-manager/ |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI03 Identity & Privilege Abuse, ASI02 Tool Misuse & Exploitation
- Other frameworks: FedRAMP IA-5 – SP 800-218A PW.1.1-PS – ISO 27001 A.9.2

---

### DSGAI03 — Shadow AI & Unsanctioned Data Flows

**Severity:** High

Employees or teams deploy unauthorised GenAI tools that process corporate
data outside governed channels, creating invisible data flows beyond
security and compliance controls. DORA requires third-party ICT risk
management covering AI tools (Art. 28–44), identification of all ICT
assets including shadow AI services (Art. 8), and governance policies
for approved AI tools (Art. 5–7). Shadow AI in the financial sector
creates uncontrolled data processing that evades both DORA and GDPR
oversight.

**Real-world references:**
- Samsung semiconductor division employees leaked proprietary data through
  unauthorised ChatGPT usage (2023)
- Multiple banks reported shadow AI tool proliferation across trading
  desks and operations teams (2024–2025)

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Third-Party Risk – AI tool vendor oversight | Art. 28–44 | Third-Party | Include AI tools and services in third-party ICT risk management; conduct due diligence before approval; monitor ongoing compliance with financial sector requirements |
| Identification – shadow AI discovery | Art. 8 | Identification | Identify and register all AI tools — authorised and unauthorised — in the ICT asset inventory; maintain discovery mechanisms for unapproved AI services |
| ICT Risk Management – AI tool governance | Art. 5–7 | Governance | Define approved AI tools policy in ICT risk management framework; require vetting and approval before use in financial data processing |

#### Mitigations

**Foundational**
- Art. 28–44: Include AI tools in third-party risk assessment; conduct
  due diligence before approval; verify data handling practices
- Art. 8: Implement shadow AI discovery; register all AI tools in
  ICT asset inventory
- Art. 5–7: Define approved AI tools policy; communicate to all staff

**Hardening**
- Art. 28–44: Require contractual provisions for data handling,
  security, and incident notification from AI tool providers
- Art. 8: Deploy automated shadow AI detection through network
  monitoring and endpoint controls
- Art. 5–7: Include shadow AI monitoring metrics in management reporting

**Advanced**
- Art. 28–44: Conduct on-site assessment of critical AI tool providers;
  verify compliance with financial sector requirements
- Art. 8: Implement continuous shadow AI discovery with automated
  alerting and remediation workflows
- Art. 5–7: Include shadow AI risk in board-level risk reporting

#### Tools

| Tool | Type | Link |
|---|---|---|
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| Netskope | Commercial | https://www.netskope.com |
| Microsoft Defender for Cloud Apps | Commercial | https://www.microsoft.com/en-us/security/business/cloud-apps-defender |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |

#### Cross-references
- LLM Top 10: LLM03 Supply Chain Vulnerabilities
- Agentic Top 10: ASI04 Agentic Supply Chain Vulnerabilities
- Other frameworks: FedRAMP CM-7 – SP 800-218A PW.4.1-PS – EBA Outsourcing Guidelines

---

### DSGAI04 — Data, Model & Artifact Poisoning

**Severity:** Critical

Training data, fine-tuning pipelines, or model weights are corrupted to
embed backdoors, bias outputs, or degrade model reliability. DORA requires
financial entities to implement protection controls for training pipeline
integrity (Art. 9), conduct resilience testing including data poisoning
scenarios (Art. 24–27), and maintain backup and restoration capabilities
for AI data and models (Art. 12). In the financial sector, poisoned models
could produce fraudulent risk assessments, manipulated trading signals,
or biased credit decisions.

**Real-world references:**
- Nightshade (2023) – poison pixels successfully corrupted image generation
  model behaviour at scale
- BadNets (academic) – backdoor triggers embedded through poisoned training
  labels, activating only on specific inputs

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – training pipeline integrity | Art. 9 | Protection | Implement security controls protecting training data and model artefacts from poisoning, tampering, and unauthorised modification |
| Resilience Testing – poisoning detection testing | Art. 24–27 | Testing | Include data poisoning scenarios in resilience testing; test detection capabilities and recovery procedures for poisoned data and model artefacts |
| Backup Policies – model and data restoration | Art. 12 | Backup | Maintain versioned backups of training data and model weights with integrity verification; enable rollback to pre-poisoning states |
| Learning and Evolving – poisoning post-mortem | Art. 13 | Learning | Conduct post-incident analysis for data poisoning events; trace poisoned content and update protection controls |

#### Mitigations

**Foundational**
- Art. 9: Implement access controls on all training data repositories;
  enforce least privilege; log all training data modifications; verify
  artefact integrity before use
- Art. 12: Maintain versioned training data snapshots and model weight
  checkpoints with integrity hashes; document restoration procedures
- Art. 24–27: Include data poisoning detection in baseline resilience
  testing scope

**Hardening**
- Art. 9: Deploy anomaly detection on training data before each training
  run; flag statistical outliers and content inconsistent with the
  source domain
- Art. 24–27: Conduct red team exercises targeting training pipeline
  integrity; test backdoor insertion and detection capabilities
- Art. 12: Implement automated integrity verification on backup
  restoration; test rollback procedures quarterly

**Advanced**
- Apply differential privacy during training to bound the influence of
  any single training example
- Art. 24–27: Include training data poisoning in threat-led penetration
  testing (TLPT) scope; test sophisticated poisoning vectors
- Art. 9: Conduct backdoor detection on model weights before production
  deployment; establish poisoning forensics playbook

#### Tools

| Tool | Type | Link |
|---|---|---|
| IBM Adversarial Robustness Toolbox | Open-source | https://github.com/Trusted-AI/adversarial-robustness-toolbox |
| CleanLab | Open-source | https://github.com/cleanlab/cleanlab |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| Sigstore | Open-source | https://www.sigstore.dev |

#### Cross-references
- LLM Top 10: LLM04 Data and Model Poisoning
- Agentic Top 10: ASI06 Memory & Context Poisoning
- Other frameworks: MITRE ATLAS AML.T0032 – FedRAMP SR-2 – SP 800-218A PS.1.1-PS

---

### DSGAI05 — Data Integrity & Validation Failures

**Severity:** High

Insufficient validation on AI data ingestion interfaces allows corrupted,
malformed, or adversarial data to enter processing pipelines, degrading
output quality or enabling attacks. DORA requires protection controls for
data quality and integrity (Art. 9), asset identification covering data
sources and quality characteristics (Art. 8), and detection for data
quality anomalies (Art. 10). In the financial sector, unvalidated data
inputs can lead to erroneous risk assessments, faulty credit decisions,
or corrupted compliance records.

**Real-world references:**
- EU AI Act Article 10 requirements for training data documentation
  prompted financial institutions to audit AI data provenance (2025)
- Several financial AI vendors found to have used scraped data without
  proper licensing or provenance documentation

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – data quality controls | Art. 9 | Protection | Implement data quality validation before AI pipeline ingestion; reject data failing quality, schema, or integrity thresholds |
| Identification – data source documentation | Art. 8 | Identification | Document provenance, collection method, and quality characteristics for all AI data in the ICT asset inventory |
| Detection – data quality monitoring | Art. 10 | Detection | Monitor for data quality degradation, schema drift, and integrity anomalies in AI data pipelines |
| Third-Party Risk – external data source oversight | Art. 28–44 | Third-Party | Include external data sources in third-party risk management; assess data quality, provenance practices, and licensing compliance |

#### Mitigations

**Foundational**
- Art. 9: Implement data quality validation at pipeline ingestion
  points; define minimum quality thresholds per data type; reject
  malformed or adversarial data
- Art. 8: Document provenance for all data sources; record collection
  method, date, licensing, and quality characteristics
- Art. 28–44: Assess external data source quality and provenance
  as part of third-party risk assessment

**Hardening**
- Art. 9: Deploy continuous data quality monitoring; alert on quality
  degradation, schema drift, or integrity failures
- Art. 8: Implement automated provenance tracking across all AI
  data pipelines; maintain provenance chain from source to model
- Art. 10: Deploy automated data quality anomaly detection; alert
  on unexpected data distribution changes

**Advanced**
- Art. 9: Implement advanced data quality analytics with automated
  remediation workflows; quarantine mechanisms for failed data
- Art. 8: Include provenance completeness in regulatory reporting;
  maintain audit-ready provenance records
- Art. 28–44: Conduct on-site assessment of critical data sources;
  verify integrity and provenance practices

#### Tools

| Tool | Type | Link |
|---|---|---|
| Great Expectations | Open-source | https://greatexpectations.io |
| OpenLineage | Open-source | https://openlineage.io |
| Apache Atlas | Open-source | https://atlas.apache.org |
| Collibra | Commercial | https://www.collibra.com |

#### Cross-references
- LLM Top 10: LLM04 Data and Model Poisoning
- Agentic Top 10: ASI06 Memory & Context Poisoning
- Other frameworks: FedRAMP SR-3 – SP 800-218A PS.3.1-PS – ISO 42001 A.7.4

---

### DSGAI06 — Tool, Plugin & Agent Data Exchange

**Severity:** High

Sensitive context — user data, credentials, conversation history —
exchanged with third-party tools, plugins, or MCP servers without adequate
access controls or data minimisation. DORA requires third-party ICT risk
management covering tool and plugin providers (Art. 28–44), protection
controls for data exchanged with external services (Art. 9), and detection
for unauthorised data flows to external tools (Art. 10). In the financial
sector, uncontrolled data exchange with AI tools can expose customer
financial data, trading information, or regulatory-protected content.

**Real-world references:**
- MCP server trust boundary violations allowed plugins to access
  conversation data beyond their authorised scope (2025)
- Third-party ChatGPT plugins found to exfiltrate user conversation
  data to external servers (2024)

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Third-Party Risk – tool/plugin provider oversight | Art. 28–44 | Third-Party | Include AI tool and plugin providers in third-party ICT risk management; assess data handling, security controls, and data minimisation practices |
| Protection and Prevention – data exchange controls | Art. 9 | Protection | Implement data minimisation and access controls on all data exchanged with external tools; enforce least privilege per tool |
| Detection – tool data flow monitoring | Art. 10 | Detection | Monitor data flows to and from external tools; detect unauthorised data transfers or excessive data sharing |
| ICT Risk Management – tool governance | Art. 5–7 | Governance | Include tool and plugin data exchange policies in ICT risk management; define approved data sharing scope per tool |

#### Mitigations

**Foundational**
- Art. 28–44: Include tool and plugin providers in third-party risk
  assessment; require data handling and security attestations
- Art. 9: Data minimisation — only send minimum necessary context to
  tools; implement per-tool permission manifests
- Art. 5–7: Define approved data sharing scope for each tool/plugin

**Hardening**
- Art. 28–44: Require contractual provisions for data handling from
  tool providers; include audit rights and incident notification
- Art. 9: Enforce allow-listed data fields per tool; block sensitive
  data categories from tool exchange
- Art. 10: Deploy automated monitoring of tool data exchanges; alert
  on data transfers exceeding approved scope

**Advanced**
- Art. 28–44: Conduct security assessment of critical tool providers;
  verify data isolation and handling practices
- Art. 9: Implement real-time data filtering on tool communication
  channels; enforce dynamic data minimisation
- Art. 10: Integrate tool data flow monitoring into continuous DORA
  resilience assessment

#### Tools

| Tool | Type | Link |
|---|---|---|
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| Netskope | Commercial | https://www.netskope.com |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- Agentic Top 10: ASI02 Tool Misuse & Exploitation, ASI07 Insecure Inter-Agent Communication
- Other frameworks: FedRAMP SA-9 – SP 800-218A PW.4.1-PS – EBA Outsourcing Guidelines

---

### DSGAI07 — Data Governance, Lifecycle & Classification

**Severity:** High

Governance gaps for AI-derived data assets — embeddings, fine-tuned models,
generated content, cached outputs — leave them outside retention,
classification, and disposal policies. DORA requires governance covering
AI data lifecycle (Art. 5–7), asset identification for all AI-derived
data (Art. 8), and backup policies including lifecycle metadata (Art. 12).
Financial institutions with governance gaps cannot demonstrate DORA
compliance for AI data assets, creating regulatory exposure.

**Real-world references:**
- Multiple financial institutions reported inability to trace data flows
  through AI systems during regulatory examinations (2024–2025)
- EU supervisory authorities cited data lifecycle opacity as a top concern
  in AI adoption assessments

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management – lifecycle governance | Art. 5–7 | Governance | Include AI data governance and lifecycle management in ICT risk management; define retention, classification, and disposal policies for all AI-derived data assets |
| Identification – AI data asset mapping | Art. 8 | Identification | Map all AI-derived data assets — embeddings, fine-tuned models, generated content, cached outputs — in the ICT asset inventory with lifecycle documentation |
| Backup Policies – lifecycle metadata preservation | Art. 12 | Backup | Include lifecycle metadata in backup policies; ensure retention schedules, classification, and lineage records are preserved alongside data |
| Protection and Prevention – retention enforcement | Art. 9 | Protection | Enforce retention policies through automated deletion and crypto-shredding; prevent retention beyond defined periods |

#### Mitigations

**Foundational**
- Art. 5–7: Define retention policies for all AI data types — training
  data, model weights, inference logs, embeddings, and intermediate
  pipeline outputs; assign data owners for each AI system
- Art. 8: Map all AI-derived data assets in the ICT inventory; document
  data flows from source through processing to output
- Art. 12: Implement backup policies aligned with retention
  requirements; include deletion procedures for expired data

**Hardening**
- Art. 5–7: Include governance maturity metrics in management reporting;
  track retention policy adherence and data classification coverage
- Art. 8: Implement automated data flow discovery; maintain current
  lifecycle documentation with change detection
- Art. 9: Deploy automated retention enforcement with verification;
  alert on retention violations

**Advanced**
- Art. 5–7: Include data governance maturity in board-level risk
  reporting; benchmark against financial sector peers
- Art. 12: Include lifecycle metadata in DORA business continuity
  testing; verify disposal procedures across backup media
- Deploy automated governance monitoring and compliance dashboards

#### Tools

| Tool | Type | Link |
|---|---|---|
| Collibra | Commercial | https://www.collibra.com |
| Apache Atlas | Open-source | https://atlas.apache.org |
| OpenLineage | Open-source | https://openlineage.io |
| Alation | Commercial | https://www.alation.com |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI06 Memory & Context Poisoning
- Other frameworks: FedRAMP CM-3 – GDPR Art. 17 – SP 800-218A PS.3.1-PS

---

### DSGAI08 — Non-Compliance & Regulatory Violations

**Severity:** High

GenAI systems fail to meet regulatory obligations — GDPR, DORA, EU AI Act,
MiFID II, sector-specific requirements — due to inadequate data handling,
missing documentation, or uncontrolled processing. DORA requires governance
covering regulatory compliance (Art. 5–7), incident reporting for material
compliance failures (Art. 17–23), and continuous improvement for compliance
processes (Art. 13). Non-compliance in the financial sector can result in
significant fines, licence revocation, and reputational damage.

**Real-world references:**
- Meta GDPR fine of EUR 1.2 billion (2023) for unlawful cross-border
  data transfers — directly applicable to AI training data
- Italian DPA temporarily banned ChatGPT (2023) over GDPR compliance
  concerns, affecting financial institutions using the service

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management – regulatory compliance governance | Art. 5–7 | Governance | Include regulatory compliance in ICT risk management; map applicable data laws to AI processing activities; define compliance requirements and accountability |
| ICT Incident Management – compliance incident reporting | Art. 17–23 | Incidents | Classify material regulatory non-compliance events as ICT incidents; report to competent authorities per DORA criteria; coordinate with DPO for GDPR notifications |
| Learning and Evolving – compliance improvement | Art. 13 | Learning | Apply lessons learned from compliance failures; update controls and processes based on regulatory changes, enforcement actions, and incident analysis |
| Identification – regulated data mapping | Art. 8 | Identification | Map all AI data subject to regulatory requirements; ensure complete coverage in compliance programme |

#### Mitigations

**Foundational**
- Art. 5–7: Map all applicable data laws to AI processing activities;
  define compliance requirements per data type and jurisdiction
- Art. 17–23: Define incident classification criteria for compliance
  failures; establish reporting procedures including GDPR breach
  notification coordination
- Art. 13: Document compliance assessment results; track regulatory
  changes affecting AI data processing

**Hardening**
- Art. 5–7: Include compliance status in management reporting; track
  compliance metrics across all AI systems and jurisdictions
- Art. 17–23: Include compliance failures in incident response
  playbooks; test notification procedures with regulatory bodies
- Art. 13: Conduct regular compliance reassessment; update controls
  for new regulations and enforcement guidance

**Advanced**
- Art. 5–7: Include compliance in board-level risk reporting;
  maintain regulatory change monitoring programme
- Deploy automated compliance monitoring across all AI systems;
  implement continuous compliance verification
- Art. 13: Establish continuous compliance improvement programme;
  benchmark against regulatory expectations and enforcement trends

#### Tools

| Tool | Type | Link |
|---|---|---|
| OneTrust | Commercial | https://www.onetrust.com |
| TrustArc | Commercial | https://trustarc.com |
| ServiceNow GRC | Commercial | https://www.servicenow.com |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI03 Identity & Privilege Abuse
- Other frameworks: FedRAMP PM-9 – GDPR – CCPA – DORA Art. 5–7

---

### DSGAI09 — Multimodal Cross-Channel Data Leakage

**Severity:** Medium

Data leaks across modalities — text-to-image, speech-to-text, OCR — when
sensitive information in one channel surfaces in another without appropriate
controls. DORA requires protection controls preventing cross-modal data
disclosure (Art. 9), detection for sensitive data surfacing across modality
boundaries (Art. 10), and incident reporting for cross-modal leakage
events (Art. 17–23). Financial institutions using multimodal AI must ensure
voice transcripts, document scans, and image analysis do not leak sensitive
data across channel boundaries.

**Real-world references:**
- Speech-to-text transcription of confidential financial calls exposed
  customer account details in text-accessible logs (2024)
- OCR-based document processing leaked PII from scanned financial
  documents into searchable text indexes without redaction

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – cross-modal controls | Art. 9 | Protection | Implement consistent data protection controls across all modalities; enforce classification and access controls at modality boundaries |
| Detection – cross-modal leakage monitoring | Art. 10 | Detection | Monitor for sensitive data surfacing across modality boundaries; detect PII, financial data, and credentials in cross-modal outputs |
| ICT Incident Management – cross-modal breach reporting | Art. 17–23 | Incidents | Classify cross-modal data leakage as ICT-related incidents where customer or regulatory impact occurs |

#### Mitigations

**Foundational**
- Art. 9: Classify data sensitivity per modality; enforce consistent
  access controls across text, image, audio, and video channels
- Art. 10: Deploy output filtering across all modalities; monitor for
  sensitive data patterns in cross-modal outputs
- Art. 17–23: Define incident classification for cross-modal leakage

**Hardening**
- Art. 9: Implement modality-specific DLP — redact PII from
  transcriptions, mask sensitive regions in images, filter audio outputs
- Art. 10: Deploy automated cross-modal sensitive data detection;
  correlate leakage events across modality boundaries
- Art. 17–23: Include cross-modal leakage in incident response playbooks

**Advanced**
- Art. 9: Implement privacy-preserving multimodal processing — apply
  redaction at modality conversion boundaries before downstream use
- Art. 10: Deploy continuous cross-modal monitoring with automated
  response to detected leakage
- Conduct cross-modal extraction testing before multimodal AI deployment

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| AWS Macie / Azure Purview | Commercial | https://aws.amazon.com/macie/ |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI07 Insecure Inter-Agent Communication
- Other frameworks: FedRAMP SC-28 – SP 800-218A PS.1.1-PS – ISO 27001 A.12.4

---

### DSGAI10 — Synthetic Data & Anonymisation Pitfalls

**Severity:** Medium

Synthetic data generation or anonymization techniques fail to prevent
re-identification, membership inference, or attribute inference from
the generated datasets. DORA requires protection controls for synthetic
data privacy (Art. 9), resilience testing covering synthetic data risks
(Art. 24–27), and continuous improvement for synthetic data processes
(Art. 13). Financial institutions increasingly use synthetic data for
model training and testing, making privacy validation critical.

**Real-world references:**
- Re-identification of individuals in anonymised financial transaction
  datasets using auxiliary data linkage (2024)
- Synthetic data generators trained on small populations found to
  memorise individual records, enabling membership inference

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – synthetic data privacy | Art. 9 | Protection | Implement privacy controls for synthetic data generation; validate privacy preservation and absence of sensitive pattern leakage from source financial data |
| Resilience Testing – synthetic data testing | Art. 24–27 | Testing | Include synthetic data re-identification and privacy testing in resilience testing programme; test for linkage attacks and attribute inference |
| Learning and Evolving – synthetic data improvement | Art. 13 | Learning | Apply lessons learned from synthetic data privacy failures; update generation processes and validation controls |

#### Mitigations

**Foundational**
- Art. 9: Validate synthetic data privacy before use; implement
  quality controls; verify absence of direct identifiers
- Art. 24–27: Include re-identification testing for synthetic data
  in baseline resilience testing
- Art. 13: Document synthetic data quality and privacy metrics

**Hardening**
- Art. 9: Deploy automated privacy validation for synthetic data
  generation; test for quasi-identifier combinations
- Art. 24–27: Conduct advanced re-identification testing using
  linkage attacks and background knowledge scenarios
- Art. 13: Establish feedback loops from privacy testing to
  generation parameter tuning

**Advanced**
- Deploy formal privacy guarantees — differential privacy — for
  synthetic data generation pipelines
- Art. 24–27: Include synthetic data risk in TLPT scope; test for
  sophisticated re-identification vectors
- Art. 13: Implement continuous privacy monitoring for synthetic
  data pipelines; track privacy metrics over time

#### Tools

| Tool | Type | Link |
|---|---|---|
| Gretel AI | Commercial | https://gretel.ai |
| SDV | Open-source | https://sdv.dev |
| ARX Data Anonymization | Open-source | https://arx.deidentifier.org |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |

#### Cross-references
- LLM Top 10: LLM04 Data and Model Poisoning
- Agentic Top 10: ASI06 Memory & Context Poisoning
- Other frameworks: FedRAMP SI-4 – SP 800-218A PW.7.2-PS – NIST Privacy Framework

---

### DSGAI11 — Cross-Context Conversation Bleed

**Severity:** High

Data from one user session, tenant, or conversation context leaks into
another due to shared memory, caching, or insufficient context isolation.
DORA requires protection controls for session and tenant isolation (Art. 9),
detection for cross-context data access (Art. 10), and incident reporting
for cross-context breaches (Art. 17–23). In multi-tenant financial AI
deployments, conversation bleed can expose one client's data to another,
creating regulatory and reputational risk.

**Real-world references:**
- ChatGPT conversation history leak (March 2023) exposed other users'
  chat titles and partial conversation content
- Multi-tenant RAG systems found to return documents from other tenants
  when context isolation was insufficiently enforced (2024)

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – context isolation controls | Art. 9 | Protection | Implement strict session and tenant isolation for all AI conversation data; enforce data boundary controls at the architecture level |
| Detection – cross-context monitoring | Art. 10 | Detection | Monitor for cross-context data access patterns; detect conversation bleed, cache contamination, and memory leakage across sessions |
| ICT Incident Management – cross-context breach reporting | Art. 17–23 | Incidents | Classify cross-context data exposure as ICT-related incidents; report per DORA criteria when customer data is affected |
| Resilience Testing – isolation testing | Art. 24–27 | Testing | Include context isolation testing in resilience testing programme; verify tenant boundaries under load and adversarial conditions |

#### Mitigations

**Foundational**
- Art. 9: Enforce strict session isolation — no shared state between
  users or tenants; architectural enforcement of context boundaries
  at the data layer
- Art. 10: Monitor for cross-context data access patterns; alert on
  any cross-boundary data exposure
- Art. 17–23: Define incident classification for cross-context breaches

**Hardening**
- Art. 9: Implement per-tenant encryption keys; enforce tenant-scoped
  memory and cache isolation; deploy session boundary verification
- Art. 10: Deploy automated cross-context detection with real-time
  alerting; correlate events across tenant boundaries
- Art. 24–27: Conduct cross-tenant isolation testing under adversarial
  conditions; verify isolation during peak load

**Advanced**
- Art. 9: Implement hardware-backed tenant isolation for high-value
  financial AI deployments; deploy confidential computing
- Art. 24–27: Include cross-context isolation in TLPT scope; test
  sophisticated cache poisoning and memory extraction vectors
- Art. 17–23: Conduct tabletop exercises for cross-tenant data
  exposure scenarios

#### Tools

| Tool | Type | Link |
|---|---|---|
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Splunk | Commercial | https://www.splunk.com |
| AWS CloudTrail / Azure Monitor | Commercial | https://aws.amazon.com/cloudtrail/ |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI06 Memory & Context Poisoning
- Other frameworks: FedRAMP AC-4 – SP 800-218A PS.1.1-PS – ISO 27001 A.12.4

---

### DSGAI12 — Unsafe NL Data Gateways

**Severity:** Critical

LLM-to-SQL, LLM-to-API, or LLM-to-shell interfaces allow natural language
inputs to be converted into executable queries or commands without proper
validation, enabling data exfiltration or manipulation. DORA requires
protection controls for data gateway interfaces (Art. 9), detection for
anomalous gateway operations (Art. 10), and resilience testing of NL
gateway security (Art. 24–27). In the financial sector, uncontrolled NL
gateways can execute unauthorised queries against payment, trading, or
customer databases.

**Real-world references:**
- NL-to-SQL injection attacks demonstrated exfiltration of full database
  contents through carefully crafted natural language prompts (2024)
- LLM-to-API interfaces bypassed authorisation checks by translating
  natural language into privileged API calls (2025)

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – gateway input validation | Art. 9 | Protection | Implement validation and filtering on all NL-to-query translation; enforce allow-listed operations; restrict gateway queries to user privilege scope |
| Detection – gateway anomaly monitoring | Art. 10 | Detection | Monitor NL gateway operations for anomalous patterns — excessive data retrieval, schema probing, injection attempts; alert and block |
| Resilience Testing – gateway security testing | Art. 24–27 | Testing | Include NL gateway injection testing in resilience testing; test for SQL injection, API abuse, and privilege escalation through natural language |
| ICT Incident Management – gateway breach reporting | Art. 17–23 | Incidents | Classify gateway data exfiltration as ICT-related incidents; report per DORA criteria |

#### Mitigations

**Foundational**
- Art. 9: Input validation on all NL-to-query translation; block
  injection patterns; enforce allow-listed operations — NL gateways
  cannot execute destructive queries
- Art. 9: Gateway queries execute with the requesting user's
  permissions, not system-level; enforce output row/column limits
- Art. 10: Monitor gateway operations for anomalous data access patterns

**Hardening**
- Art. 9: Implement parameterised query templates; restrict NL gateway
  to pre-approved query patterns; deploy real-time injection detection
- Art. 10: Deploy automated gateway anomaly detection; alert on schema
  probing, excessive data retrieval, and unusual query patterns
- Art. 24–27: Conduct NL injection testing against all gateway
  interfaces; test for privilege escalation through natural language

**Advanced**
- Art. 24–27: Include NL gateway security in TLPT scope; test
  sophisticated injection vectors and multi-step exfiltration chains
- Art. 9: Implement semantic analysis of NL queries before translation;
  detect adversarial intent at the natural language level
- Art. 17–23: Conduct tabletop exercises for NL gateway breach scenarios

#### Tools

| Tool | Type | Link |
|---|---|---|
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| Splunk | Commercial | https://www.splunk.com |

#### Cross-references
- LLM Top 10: LLM01 Prompt Injection, LLM06 Excessive Agency
- Agentic Top 10: ASI02 Tool Misuse & Exploitation, ASI05 Unexpected Code Execution
- Other frameworks: FedRAMP AC-3 – SP 800-218A PW.1.1-PS – ISO 27001 A.14.2

---

### DSGAI13 — Vector Store Platform Security

**Severity:** High

Vector databases and embedding stores lack access controls, encryption,
or integrity verification — enabling unauthorised access to embeddings
that encode sensitive information. DORA requires protection controls for
vector store infrastructure (Art. 9), asset identification for vector
databases (Art. 8), and backup policies covering embedding indices and
metadata (Art. 12). Financial institutions using RAG architectures must
secure vector stores containing embeddings of customer data, financial
documents, and proprietary knowledge.

**Real-world references:**
- Unprotected vector databases exposed via public endpoints allowed
  embedding extraction encoding sensitive corporate data (2024)
- Vector store index corruption caused RAG systems to return incorrect
  financial data without alerting operators

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – vector store security | Art. 9 | Protection | Implement RBAC, encryption at rest and in transit, and integrity verification for all vector stores; enforce access controls on embedding queries |
| Identification – vector store inventory | Art. 8 | Identification | Register all vector databases and embedding stores in ICT asset inventory; classify sensitivity based on source data |
| Backup Policies – embedding backup and recovery | Art. 12 | Backup | Maintain versioned backups of vector indices and embedding data; verify integrity on restoration; enable rollback |
| Detection – vector store access monitoring | Art. 10 | Detection | Monitor vector store queries and index modifications; detect bulk extraction, unauthorised access, and integrity violations |

#### Mitigations

**Foundational**
- Art. 9: Implement RBAC on vector stores; encrypt embeddings at rest
  and in transit; enforce authentication on all vector store queries
- Art. 8: Register all vector databases in ICT asset inventory;
  document source data sensitivity and access requirements
- Art. 12: Include vector indices in backup scope; test restoration
  procedures

**Hardening**
- Art. 9: Implement embedding-level access controls matching source
  document permissions; deploy integrity verification on indices
- Art. 10: Log all vector store queries and index modifications;
  deploy anomaly detection for bulk extraction patterns
- Art. 12: Implement automated integrity verification on backup
  restoration; test rollback procedures quarterly

**Advanced**
- Art. 9: Deploy encrypted embeddings with access-time decryption;
  implement hardware-backed key management for vector stores
- Art. 10: Integrate vector store monitoring into continuous DORA
  resilience assessment; correlate access events with business context
- Art. 8: Map embedding dependencies across all RAG pipelines;
  maintain impact analysis for vector store failures

#### Tools

| Tool | Type | Link |
|---|---|---|
| Weaviate | Open-source | https://weaviate.io |
| Milvus | Open-source | https://milvus.io |
| Pinecone | Commercial | https://www.pinecone.io |
| HashiCorp Vault | Commercial | https://www.vaultproject.io |

#### Cross-references
- LLM Top 10: LLM08 Vector and Embedding Weaknesses
- Agentic Top 10: ASI06 Memory & Context Poisoning
- Other frameworks: FedRAMP SC-28 – SP 800-218A PS.1.1-PS – ISO 27001 A.10.1

---

### DSGAI14 — Excessive Telemetry & Monitoring Leakage

**Severity:** Medium

Observability pipelines — logs, traces, metrics — capture sensitive data
from AI interactions (prompts, responses, user data) and store it with
insufficient access controls. DORA requires protection controls for
telemetry data (Art. 9), governance covering observability data handling
(Art. 5–7), and detection for sensitive data in telemetry streams
(Art. 10). Financial institutions must ensure AI observability does not
create a secondary exposure channel for customer data.

**Real-world references:**
- AI observability platform stored full prompt/response pairs including
  PII, accessible to operations staff without data classification (2024)
- Financial AI monitoring logs containing customer transaction details
  sent to third-party logging services without redaction

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – telemetry data controls | Art. 9 | Protection | Implement data minimisation in observability pipelines; redact PII and sensitive content from logs and traces before storage |
| ICT Risk Management – telemetry governance | Art. 5–7 | Governance | Include observability data in ICT risk management; define classification, retention, and access controls for telemetry data |
| Detection – telemetry leakage monitoring | Art. 10 | Detection | Monitor telemetry streams for sensitive data; detect PII, credentials, and financial data in logs and traces |
| Third-Party Risk – observability vendor oversight | Art. 28–44 | Third-Party | Include observability platform vendors in third-party risk management; assess data handling for logged AI interactions |

#### Mitigations

**Foundational**
- Art. 9: Redact PII and sensitive content from logs and traces before
  storage; apply retention limits and access controls to telemetry data
- Art. 5–7: Classify telemetry data; define handling requirements for
  AI observability pipelines
- Art. 10: Filter sensitive data from telemetry streams at the
  collection point

**Hardening**
- Art. 9: Deploy automated redaction in observability pipelines;
  implement real-time sensitive data detection before log storage
- Art. 5–7: Include telemetry data handling in management reporting;
  track compliance with redaction and retention policies
- Art. 28–44: Verify observability vendor data handling; require
  encryption and access controls for stored telemetry

**Advanced**
- Art. 9: Implement privacy-preserving observability — differential
  privacy on metrics, tokenised traces, aggregated rather than
  individual-level logging
- Art. 10: Deploy continuous telemetry leakage monitoring with
  automated response
- Art. 5–7: Include telemetry data risk in board-level reporting

#### Tools

| Tool | Type | Link |
|---|---|---|
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Splunk | Commercial | https://www.splunk.com |
| Elasticsearch | Open-source | https://www.elastic.co |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI03 Identity & Privilege Abuse
- Other frameworks: FedRAMP AU-2 – SP 800-218A PS.1.1-PS – ISO 27001 A.12.4

---

### DSGAI15 — Over-Broad Context Windows

**Severity:** High

Excessive content injected into LLM context windows — full documents,
entire conversation histories, unnecessary system data — increases the
attack surface for data extraction. DORA requires protection controls
restricting context scope (Art. 9), governance covering data minimisation
in AI processing (Art. 5–7), and detection for excessive context
assembly (Art. 10). Financial institutions must ensure context windows
do not inadvertently expose sensitive customer data, financial records,
or internal documents to extraction attacks.

**Real-world references:**
- Full document injection into context windows enabled targeted
  extraction of sensitive financial content through prompt injection
- System prompts containing database connection strings and internal
  API keys exposed through context window analysis (2024)

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – context scope controls | Art. 9 | Protection | Implement data minimisation in context assembly; only include minimum necessary data; enforce per-task context scope limits |
| ICT Risk Management – context minimisation governance | Art. 5–7 | Governance | Include context window data minimisation in ICT risk management; define maximum context scope per AI use case |
| Detection – excessive context monitoring | Art. 10 | Detection | Monitor context window assembly for excessive data inclusion; alert on context exceeding defined scope limits |

#### Mitigations

**Foundational**
- Art. 9: Only include minimum necessary data in context windows;
  truncate or summarise documents before context inclusion; strip
  unnecessary metadata
- Art. 5–7: Define context scope limits per AI use case; document
  justification for each data element in context assembly
- Art. 10: Monitor context size and content; alert on excessive
  context assembly

**Hardening**
- Art. 9: Implement per-task context scope limits; prevent context
  from exceeding authorised data boundaries; deploy content-aware
  context filtering
- Art. 5–7: Include context minimisation metrics in management
  reporting; track context sizes against defined limits
- Art. 10: Deploy automated context content analysis; detect sensitive
  data that should not be in context

**Advanced**
- Art. 9: Implement dynamic context scoping based on task requirements;
  deploy automated relevance filtering before context assembly
- Art. 5–7: Include context minimisation in board-level reporting
- Art. 10: Integrate context monitoring into continuous DORA
  resilience assessment

#### Tools

| Tool | Type | Link |
|---|---|---|
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| Nightfall DLP | Commercial | https://www.nightfall.ai |

#### Cross-references
- LLM Top 10: LLM01 Prompt Injection, LLM07 System Prompt Leakage
- Agentic Top 10: ASI01 Agent Goal Hijack
- Other frameworks: FedRAMP AC-6 – GDPR Art. 5(1)(c) – SP 800-218A PW.1.1-PS

---

### DSGAI16 — Endpoint & Browser Assistant Overreach

**Severity:** High

AI agents operating in browsers, desktop environments, or mobile devices
access more data than necessary — reading screens, files, or network data
beyond the task scope. DORA requires protection controls restricting agent
endpoint access (Art. 9), detection for excessive data access at endpoints
(Art. 10), and third-party oversight for endpoint AI agents from external
vendors (Art. 28–44). Financial institutions deploying AI agents on
employee workstations or customer devices must enforce strict data access
boundaries.

**Real-world references:**
- Browser-based AI assistants captured full screen content including
  sensitive financial dashboards and internal communications (2025)
- Desktop AI agents read local files beyond task scope, including
  cached credentials and financial documents

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – endpoint access controls | Art. 9 | Protection | Restrict agent access to minimum necessary endpoint data; explicit permission grants per data source; agents cannot access files, screens, or network data without authorisation |
| Detection – endpoint overreach monitoring | Art. 10 | Detection | Monitor agent endpoint access patterns; detect access to data sources beyond task scope; alert on screen capture, file access, or network data beyond authorised boundaries |
| Third-Party Risk – endpoint agent vendor oversight | Art. 28–44 | Third-Party | Include endpoint AI agent vendors in third-party risk management; assess data access scope, local storage practices, and data transmission |

#### Mitigations

**Foundational**
- Art. 9: Explicit permission grants per data source; agents cannot
  access files, screens, or network data without authorisation;
  agent inherits user access level
- Art. 10: Monitor agent endpoint data access; log all file, screen,
  and network data access events
- Art. 28–44: Include endpoint AI agent vendors in third-party risk
  assessment

**Hardening**
- Art. 9: Implement sandboxed agent execution environments; enforce
  data minimisation — agents read only the specific data elements
  needed for the task
- Art. 10: Deploy real-time endpoint access anomaly detection; alert
  on access outside authorised scope
- Art. 28–44: Require contractual data access limitations from endpoint
  agent vendors; verify enforcement

**Advanced**
- Art. 9: Deploy hardware-backed isolation for agent endpoint access;
  implement confidential computing for sensitive financial data
- Art. 10: Integrate endpoint agent monitoring into continuous DORA
  resilience assessment
- Art. 28–44: Conduct security assessment of critical endpoint agent
  vendors; verify data isolation controls

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Defender for Endpoint | Commercial | https://www.microsoft.com/en-us/security/business/endpoint-security |
| Netskope | Commercial | https://www.netskope.com |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| OpenTelemetry | Open-source | https://opentelemetry.io |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- Agentic Top 10: ASI02 Tool Misuse & Exploitation, ASI10 Rogue Agents
- Other frameworks: FedRAMP AC-6 – SP 800-218A PW.1.1-PS – ISO 27001 A.12.6

---

### DSGAI17 — Data Availability & Resilience Failures

**Severity:** High

AI data pipelines fail silently — RAG retrieval returns stale results,
embedding indices corrupt, training data becomes unavailable — degrading
AI system reliability without alerting operators. DORA requires response
and recovery procedures for AI data service disruptions (Art. 11), backup
and restoration capabilities for AI data assets (Art. 12), and resilience
testing of AI data pipelines (Art. 24–27). Financial institutions relying
on AI for risk assessment, fraud detection, or customer service must ensure
data pipeline resilience.

**Real-world references:**
- RAG system silently returned stale financial data after index corruption,
  leading to incorrect risk assessments for several hours (2024)
- Vector database outage caused AI customer service to provide incorrect
  responses without fallback mechanisms

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Response and Recovery – AI data service recovery | Art. 11 | Recovery | Implement response and recovery procedures for AI data pipeline failures; define recovery time objectives and fallback mechanisms |
| Backup Policies – AI data backup | Art. 12 | Backup | Maintain versioned backups of critical AI data assets — embeddings, indices, training data, model weights; test restoration procedures |
| Resilience Testing – data pipeline resilience | Art. 24–27 | Testing | Include AI data pipeline failure scenarios in resilience testing; test failover, degraded mode operation, and recovery procedures |
| Detection – pipeline health monitoring | Art. 10 | Detection | Monitor AI data pipeline health; detect stale data, index corruption, and availability degradation in real time |

#### Mitigations

**Foundational**
- Art. 11: Define recovery procedures for AI data pipeline failures;
  establish recovery time objectives per AI system criticality
- Art. 12: Maintain versioned backups of critical data assets —
  embeddings, indices, training data; document restoration procedures
- Art. 10: Implement health checks on all AI data pipelines; monitor
  for availability degradation

**Hardening**
- Art. 11: Implement circuit breakers and failover mechanisms for AI
  data pipelines; deploy degraded mode operation when data is unavailable
- Art. 12: Test backup restoration quarterly; verify data integrity
  after restoration; maintain backup freshness metrics
- Art. 24–27: Include data pipeline failure scenarios in resilience
  testing; test recovery under realistic conditions

**Advanced**
- Art. 24–27: Include AI data pipeline resilience in TLPT scope; test
  cascading failure scenarios and recovery under adversarial conditions
- Art. 11: Implement automated failover for critical AI data pipelines;
  deploy multi-region resilience for financial AI systems
- Art. 12: Include AI data in DORA business continuity testing; verify
  cross-region backup replication

#### Tools

| Tool | Type | Link |
|---|---|---|
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Great Expectations | Open-source | https://greatexpectations.io |
| AWS Backup / Azure Backup | Commercial | https://aws.amazon.com/backup/ |
| PagerDuty | Commercial | https://www.pagerduty.com |

#### Cross-references
- LLM Top 10: LLM10 Unbounded Consumption
- Agentic Top 10: ASI08 Cascading Agent Failures
- Other frameworks: FedRAMP CP-9 – SP 800-218A PS.1.1-PS – ISO 27001 A.17.1

---

### DSGAI18 — Inference & Data Reconstruction

**Severity:** High

Attackers reconstruct sensitive training data or infer membership through
model inversion, membership inference, or attribute inference attacks
against deployed models. DORA requires protection controls against
inference attacks (Art. 9), resilience testing covering reconstruction
vectors (Art. 24–27), and detection for systematic probing patterns
(Art. 10). Financial institutions must protect against reconstruction
of customer financial data, transaction patterns, and sensitive attributes
from deployed models.

**Real-world references:**
- Membership inference attacks demonstrated ability to determine whether
  specific individuals were in financial model training data (2024)
- Model inversion attacks reconstructed partial training data from
  commercial language models through systematic querying

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – inference attack controls | Art. 9 | Protection | Implement privacy-preserving model deployment; apply differential privacy during training; rate limiting and access controls on inference endpoints |
| Resilience Testing – reconstruction testing | Art. 24–27 | Testing | Include model inversion, membership inference, and attribute inference testing in resilience testing programme |
| Detection – probing pattern detection | Art. 10 | Detection | Monitor inference endpoints for systematic probing patterns; detect membership inference and model inversion attempts |
| Learning and Evolving – inference attack improvement | Art. 13 | Learning | Apply lessons learned from inference attacks; update privacy controls and detection mechanisms |

#### Mitigations

**Foundational**
- Art. 9: Apply differential privacy during training to bound
  reconstruction risk; rate limiting on inference APIs
- Art. 10: Monitor inference endpoints for systematic probing patterns;
  detect bulk query patterns enabling reconstruction
- Art. 24–27: Include basic membership inference testing in resilience
  testing scope

**Hardening**
- Art. 9: Implement output perturbation on inference endpoints;
  restrict query patterns enabling model inversion
- Art. 24–27: Conduct advanced reconstruction testing — model inversion,
  attribute inference, membership inference with background knowledge
- Art. 10: Deploy automated probing detection; alert on query patterns
  consistent with inference attacks

**Advanced**
- Art. 9: Deploy formal privacy guarantees with auditable privacy
  budget tracking; implement trusted execution for inference
- Art. 24–27: Include inference attacks in TLPT scope; test
  sophisticated reconstruction vectors
- Art. 13: Establish inference attack forensics; track evolving
  attack techniques and update defences

#### Tools

| Tool | Type | Link |
|---|---|---|
| Opacus | Open-source | https://opacus.ai |
| IBM Adversarial Robustness Toolbox | Open-source | https://github.com/Trusted-AI/adversarial-robustness-toolbox |
| ARX Data Anonymization | Open-source | https://arx.deidentifier.org |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI01 Agent Goal Hijack
- Other frameworks: FedRAMP SC-28 – SP 800-218A PW.1.1-PS – NIST Privacy Framework

---

### DSGAI19 — Human-in-Loop & Labeler Overexposure

**Severity:** Medium

Human annotators, reviewers, and labelers are exposed to sensitive,
harmful, or disturbing content during AI data preparation without adequate
protections. DORA requires protection controls limiting labeler exposure
to sensitive content (Art. 9), governance covering duty of care for
human annotators (Art. 5–7), and third-party oversight for external
labeling providers (Art. 28–44). Financial institutions using human
review for AI data must protect labelers from exposure to sensitive
financial data, fraud content, and harmful material.

**Real-world references:**
- Content moderators for AI training reported PTSD-like symptoms from
  exposure to harmful content without adequate protections (2023)
- Labelers for financial AI systems accessed sensitive customer data
  beyond the scope needed for annotation tasks

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – labeler data exposure controls | Art. 9 | Protection | Implement data segmentation and access controls limiting labeler exposure to minimum necessary content; redact sensitive data before annotation |
| ICT Risk Management – labeler governance | Art. 5–7 | Governance | Include labeler data exposure in ICT risk management; define duty of care obligations and data access scope for human annotators |
| Third-Party Risk – labeling provider oversight | Art. 28–44 | Third-Party | Include external labeling providers in third-party risk management; assess data handling, access controls, and worker welfare practices |
| Detection – labeler access monitoring | Art. 10 | Detection | Monitor labeler data access; detect access beyond authorised scope or unusual access patterns |

#### Mitigations

**Foundational**
- Art. 9: Data segmentation — labelers only access content within their
  clearance scope; redact sensitive data before annotation tasks
- Art. 5–7: Define labeler data access policies; establish duty of care
  obligations for annotator welfare
- Art. 28–44: Include labeling providers in third-party risk assessment

**Hardening**
- Art. 9: Implement graduated access levels for labelers; rotate
  annotators to limit cumulative exposure; deploy automated pre-redaction
- Art. 5–7: Include labeler welfare metrics in management reporting;
  track exposure levels and rotation compliance
- Art. 28–44: Require labeling providers to demonstrate worker welfare
  practices; include audit rights

**Advanced**
- Art. 9: Deploy automated sensitive content detection and redaction
  before human review; implement privacy-preserving annotation interfaces
- Art. 5–7: Include labeler risk in board-level reporting
- Art. 28–44: Conduct on-site assessment of critical labeling providers;
  verify data handling and worker welfare practices

#### Tools

| Tool | Type | Link |
|---|---|---|
| Label Studio | Open-source | https://labelstud.io |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Snorkel AI | Commercial | https://snorkel.ai |
| Scale AI | Commercial | https://scale.com |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI09 Human-Agent Trust Exploitation
- Other frameworks: FedRAMP PS-6 – SP 800-218A PW.1.1-PS – ISO 27001 A.7.2

---

### DSGAI20 — Model Exfiltration & IP Replication

**Severity:** Critical

Model weights, architectures, or trained capabilities are extracted through
systematic querying, side-channel attacks, or insider access — enabling
unauthorised replication of proprietary models. DORA requires protection
controls for IP assets (Art. 9), detection for exfiltration patterns
(Art. 10), and third-party oversight to prevent IP leakage through
vendor relationships (Art. 28–44). In the financial sector, IP theft
can expose proprietary trading strategies, risk models, and competitive
advantages.

**Real-world references:**
- Model extraction attacks demonstrated replication of commercial LLM
  capabilities through systematic API querying (2024)
- Insider theft of model weights from major AI labs highlighted
  physical and logical access control gaps

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – IP protection controls | Art. 9 | Protection | Implement encryption, access controls, and DLP for model weights, training data, and proprietary algorithms; enforce multi-factor authentication for IP asset access |
| Detection – IP exfiltration detection | Art. 10 | Detection | Monitor model weight access and download patterns; detect systematic querying indicative of model extraction; alert on anomalous access |
| Third-Party Risk – IP protection in vendor relationships | Art. 28–44 | Third-Party | Address IP protection in third-party agreements; ensure vendors cannot access, replicate, or misuse proprietary AI assets |
| ICT Incident Management – IP theft reporting | Art. 17–23 | Incidents | Classify IP exfiltration as ICT-related incidents; report per DORA criteria |

#### Mitigations

**Foundational**
- Art. 9: Encrypt AI IP at rest and in transit; implement access
  controls; deploy DLP covering model weights and proprietary data
- Art. 28–44: Address IP ownership and protection in all AI vendor
  agreements; require confidentiality commitments
- Art. 10: Monitor IP access patterns; log all model weight and
  algorithm access

**Hardening**
- Art. 9: Implement time-bounded access for model weight access;
  enforce multi-factor authentication for IP asset download
- Art. 10: Deploy exfiltration detection analytics targeting model
  weight and training data access; detect systematic query patterns
- Art. 28–44: Require contractual commitments against model
  replication; include IP protection audit rights

**Advanced**
- Deploy model watermarking for theft detection and attribution
- Art. 9: Implement hardware-backed key management for model
  encryption; use trusted execution environments for inference
- Art. 28–44: Conduct IP protection assessments of critical AI
  vendors; verify isolation controls

#### Tools

| Tool | Type | Link |
|---|---|---|
| HashiCorp Vault | Commercial | https://www.vaultproject.io |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| AWS KMS / Azure Key Vault | Commercial | https://aws.amazon.com/kms/ |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI04 Agentic Supply Chain Vulnerabilities
- Other frameworks: FedRAMP SC-28 – MITRE ATLAS AML.T0024 – SP 800-218A PS.1.1-PS

---

### DSGAI21 — Disinformation via Data Poisoning

**Severity:** High

Adversaries poison RAG knowledge bases, manipulate training data, or
exploit model capabilities to generate and distribute false or misleading
content at scale. DORA requires protection controls for knowledge base
integrity (Art. 9), resilience testing covering disinformation vectors
(Art. 24–27), and continuous improvement for integrity defences (Art. 13).
In the financial sector, disinformation attacks can manipulate market
sentiment, generate fraudulent research reports, or corrupt regulatory
filings.

**Real-world references:**
- AI-generated fake financial research reports distributed to manipulate
  stock prices (2024)
- RAG knowledge base poisoning injected false regulatory guidance into
  compliance AI systems

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention – knowledge base integrity | Art. 9 | Protection | Implement integrity controls for RAG knowledge bases and training data; verify source authenticity; prevent unauthorised content injection |
| Resilience Testing – disinformation testing | Art. 24–27 | Testing | Include disinformation and knowledge base poisoning scenarios in resilience testing; test detection capabilities and content verification |
| Learning and Evolving – integrity improvement | Art. 13 | Learning | Apply lessons learned from integrity attacks; update knowledge base validation and content verification controls |
| Information Sharing – disinformation threat intelligence | Art. 45 | Sharing | Participate in information sharing for AI disinformation threats; share indicators of knowledge base poisoning and content manipulation |

#### Mitigations

**Foundational**
- Art. 9: Implement integrity verification on all knowledge base updates;
  verify source credibility and authenticity before ingestion
- Art. 24–27: Include knowledge base poisoning detection in baseline
  resilience testing scope
- Art. 13: Document integrity assessment results; track content
  verification metrics

**Hardening**
- Art. 9: Deploy content provenance tracking — flag AI-generated content
  and maintain source attribution; implement multi-source verification
- Art. 24–27: Conduct red team exercises targeting knowledge base
  integrity; test poisoning detection capabilities
- Art. 45: Participate in sector information sharing for AI disinformation
  threats

**Advanced**
- Art. 24–27: Include disinformation in TLPT scope; test sophisticated
  content manipulation and knowledge base poisoning vectors
- Art. 9: Implement cryptographic content provenance with tamper-evident
  knowledge base architecture
- Art. 13: Establish continuous integrity monitoring; track evolving
  disinformation techniques and update defences

#### Tools

| Tool | Type | Link |
|---|---|---|
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| CleanLab | Open-source | https://github.com/cleanlab/cleanlab |
| Sigstore | Open-source | https://www.sigstore.dev |
| C2PA | Open-source | https://c2pa.org |

#### Cross-references
- LLM Top 10: LLM09 Misinformation, LLM04 Data and Model Poisoning
- Agentic Top 10: ASI06 Memory & Context Poisoning, ASI09 Human-Agent Trust Exploitation
- Other frameworks: FedRAMP SI-4 – MITRE ATLAS AML.T0032 – NIST AI RMF MAP 2.3

---

## Implementation priority

| Phase | Governance (Art. 5–7) | Protection & Detection (Art. 9–10) | Incidents, Testing & Third-Party (Art. 11–44) |
|---|---|---|---|
| 1 – Now | Data governance framework for DSGAI07/08; agent credential policies for DSGAI02; shadow AI governance for DSGAI03 | Art. 9 data leakage controls for DSGAI01; poisoning protection for DSGAI04; credential protection for DSGAI02; NL gateway validation for DSGAI12 | Art. 28–44 shadow AI vendor assessment for DSGAI03; Art. 17–23 incident criteria for DSGAI01/08; Art. 12 backup for DSGAI04/13 |
| 2 – This sprint | Telemetry governance for DSGAI14; context minimisation for DSGAI15; labeler governance for DSGAI19; lifecycle policies for DSGAI07 | Art. 9 data integrity validation for DSGAI05; tool data exchange controls for DSGAI06; context isolation for DSGAI11; Art. 10 leakage detection for DSGAI01/09 | Art. 28–44 tool provider assessment for DSGAI06; endpoint agent vendor oversight for DSGAI16; Art. 24–27 NL gateway testing for DSGAI12 |
| 3 – This quarter | Endpoint overreach governance for DSGAI16; localisation for DSGAI20 (via Art. 28–44); synthetic data governance for DSGAI10; inference attack policies for DSGAI18 | Art. 9 inference attack controls for DSGAI18; synthetic data privacy for DSGAI10; cross-modal controls for DSGAI09; IP protection for DSGAI20 | Art. 24–27 resilience testing for DSGAI04/10/17/18/21; Art. 28–44 critical provider assessments; Art. 11 data pipeline recovery for DSGAI17 |
| 4 – Ongoing | Governance maturity tracking; board-level reporting; regulatory change monitoring for DSGAI08 | Continuous monitoring; detection tuning; privacy control updates | Annual resilience testing; third-party reassessment; Art. 45 information sharing for DSGAI21 |

---

## References

- [DORA – EU Regulation 2022/2554](https://eur-lex.europa.eu/eli/reg/2022/2554/oj)
- [EBA DORA Regulatory Technical Standards](https://www.eba.europa.eu/regulation-and-policy/digital-operational-resilience-act-dora)
- [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/dsgai-2026/)
- [GDPR – EU Regulation 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [ENISA Threat Landscape for AI](https://www.enisa.europa.eu/)

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-05-26 | 2026-Q1 | Rewrite all 21 entries with canonical DSGAI names, correct descriptions, and proper DORA article mappings | OWASP GenAI Data Security Initiative |
| 2026-03-28 | 2026-Q1 | Initial mapping – DSGAI01–DSGAI21 full entries | OWASP GenAI Data Security Initiative |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) –
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
