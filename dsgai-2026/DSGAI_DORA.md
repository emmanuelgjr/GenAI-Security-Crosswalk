<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks 2026 (DSGAI01–DSGAI21)
  Framework   : DORA – Digital Operational Resilience Act (EU Regulation 2022/2554)
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative – https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 – DORA

Mapping the [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/dsgai-2026/)
to the [Digital Operational Resilience Act (DORA)](https://eur-lex.europa.eu/eli/reg/2022/2554/oj)
(EU Regulation 2022/2554, effective 17 January 2025).

DORA establishes a binding regulatory framework for digital operational
resilience across the EU financial sector. For financial entities managing
AI data security, DORA requires that data-related risks — including data
poisoning, leakage, privacy erosion, third-party data dependency, and
governance failures — are integrated into ICT risk management, incident
reporting, resilience testing, and third-party oversight. The DSGAI 2026
mapping focuses on the data security dimensions: from training data
provenance and integrity, through access control and privacy preservation,
to data retention, consent management, and cross-jurisdictional compliance.
This mapping enables financial institutions to trace each OWASP DSGAI risk
to specific DORA articles and implement controls satisfying both data
security and operational resilience regulatory obligations.

---

## DORA article groups

| Group | Articles | Purpose |
|---|---|---|
| ICT Risk Management | Art. 5–7 | Governance framework, risk management strategy, and data governance policies |
| Identification | Art. 8 | Identification and classification of ICT assets including AI data stores and pipelines |
| Protection and Prevention | Art. 9 | Security controls for data protection, access control, and integrity |
| Detection | Art. 10 | Anomaly detection and monitoring for data security events |
| Response and Recovery | Art. 11 | Incident response and recovery for data security incidents |
| Backup Policies | Art. 12 | Backup and restoration of AI data, models, and configurations |
| Learning and Evolving | Art. 13 | Post-incident analysis and continuous improvement for data security |
| ICT Incident Management | Art. 17–23 | Incident classification and reporting for data breaches and AI data incidents |
| Resilience Testing | Art. 24–27 | Testing data security controls, data extraction resistance, and privacy controls |
| Third-Party Risk | Art. 28–44 | Oversight of third-party data providers, AI vendors, and data processors |
| Information Sharing | Art. 45 | Threat intelligence sharing for AI data security threats |

---

## Quick-reference summary

| ID | Name | Severity | DORA Articles | Scope |
|---|---|---|---|---|
| DSGAI01 | Data Access Logging | High | Art. 10, Art. 5–7 | Both |
| DSGAI02 | Data Visibility & Transparency | High | Art. 5–7, Art. 8 | Both |
| DSGAI03 | Shadow AI & Unvetted Tools | High | Art. 28–44, Art. 9, Art. 5–7 | Both |
| DSGAI04 | Data Model & Artifact Poisoning | Critical | Art. 9, Art. 28–44, Art. 8 | Both |
| DSGAI05 | Data Provenance & Quality | High | Art. 8, Art. 9, Art. 28–44 | Both |
| DSGAI06 | Data Lineage Fragmentation | Medium | Art. 8, Art. 5–7 | Build |
| DSGAI07 | Excessive Data Aggregation | High | Art. 9, Art. 5–7 | Both |
| DSGAI08 | Data Leakage & Exposure | Critical | Art. 9, Art. 17–23, Art. 10 | Both |
| DSGAI09 | Intellectual Property Theft | High | Art. 9, Art. 17–23 | Both |
| DSGAI10 | Synthetic Data Generation Risk | Medium | Art. 9, Art. 24–27 | Build |
| DSGAI11 | Data Retention & Deletion | High | Art. 5–7, Art. 12 | Both |
| DSGAI12 | Data Ownership & Monetisation | Medium | Art. 5–7, Art. 28–44 | Both |
| DSGAI13 | Data Misuse & Manipulation | High | Art. 9, Art. 10, Art. 17–23 | Both |
| DSGAI14 | Consent Management Failures | High | Art. 5–7, Art. 9 | Both |
| DSGAI15 | Data Minimisation Violations | Medium | Art. 5–7, Art. 9 | Build |
| DSGAI16 | Erosion of Privacy | High | Art. 9, Art. 5–7, Art. 24–27 | Both |
| DSGAI17 | Bias in Data | High | Art. 10, Art. 5–7, Art. 24–27 | Both |
| DSGAI18 | Governance Gaps | High | Art. 5–7, Art. 13 | Both |
| DSGAI19 | Third-Party Data Risk | High | Art. 28–44, Art. 8 | Both |
| DSGAI20 | Data Localization Violations | High | Art. 5–7, Art. 28–44, Art. 9 | Both |
| DSGAI21 | Non-Compliance with Data Laws | Critical | Art. 5–7, Art. 17–23, Art. 13 | Both |

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

### DSGAI01 – Data Access Logging

**Severity:** High

Insufficient logging of data access events in AI systems prevents detection
of unauthorised access and complicates regulatory audit. DORA requires
financial entities to deploy detection mechanisms for data access anomalies
(Art. 10) and maintain ICT risk governance including data access policies
(Art. 5–7).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Detection — data access monitoring | Art. 10 | Detection | Deploy detection mechanisms for anomalous AI data access; monitor for unauthorised access patterns, bulk extractions, and access outside normal parameters |
| ICT Risk Management — data access governance | Art. 5–7 | Governance | Include AI data access logging requirements in ICT risk management framework; define logging scope, retention, and review requirements |
| Identification — data store inventory | Art. 8 | Identification | Register all AI data stores in ICT asset inventory; ensure logging coverage for all identified data assets |

#### Mitigations

**Foundational**
- Art. 10: Implement detection for anomalous AI data access; monitor
  all training data, model weight, and inference data access events
- Art. 5–7: Define data access logging policies in ICT risk framework;
  specify scope, retention, and review requirements
- Art. 8: Register all AI data stores; ensure logging coverage

**Hardening**
- Art. 10: Deploy automated access anomaly detection; alert on unusual
  patterns indicative of data exfiltration or unauthorised access
- Art. 5–7: Include data access logging completeness in management
  risk reporting
- Art. 8: Map data store dependencies; ensure complete logging coverage

**Advanced**
- Art. 10: Integrate AI data access monitoring into continuous
  resilience assessment
- Art. 5–7: Include data access logging in board-level risk reporting
- Deploy real-time analytics on access patterns; detect sophisticated
  access anomalies

#### Tools

| Tool | Type | Link |
|---|---|---|
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Elasticsearch | Open-source | https://www.elastic.co |
| Splunk | Commercial | https://www.splunk.com |
| AWS CloudTrail / Azure Monitor | Commercial | https://aws.amazon.com/cloudtrail/ |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI02 Misconfigured Access Controls
- Other frameworks: FedRAMP AU-2 – SP 800-218A PS.1.1-PS – ISO 27001 A.12.4

---

### DSGAI02 – Data Visibility & Transparency

**Severity:** High

Lack of visibility into what data AI systems process and how it flows.
DORA requires governance covering data visibility (Art. 5–7) and asset
identification including data stores and pipelines (Art. 8).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management — data visibility governance | Art. 5–7 | Governance | Include data visibility and transparency requirements in ICT risk management; define what AI data flows must be documented and monitored |
| Identification — data asset mapping | Art. 8 | Identification | Map all AI data assets — training data, inference data, embeddings, model artefacts — in the ICT asset inventory with data flow documentation |
| Detection — data flow monitoring | Art. 10 | Detection | Monitor AI data flows for undocumented data movement; alert on data transfers outside documented pipelines |

#### Mitigations

**Foundational**
- Art. 5–7: Define data visibility requirements for all financial AI
  systems; specify documentation and monitoring scope
- Art. 8: Map all AI data assets in ICT inventory; document data flows
- Art. 10: Monitor for undocumented data movement

**Hardening**
- Art. 5–7: Include data visibility in management reporting
- Art. 8: Implement automated data flow discovery; maintain current
  data flow documentation
- Art. 10: Deploy automated data flow anomaly detection

**Advanced**
- Art. 5–7: Include data visibility in board-level reporting
- Deploy real-time data flow visualisation
- Art. 8: Implement continuous data asset discovery

#### Tools

| Tool | Type | Link |
|---|---|---|
| Apache Atlas | Open-source | https://atlas.apache.org |
| OpenLineage | Open-source | https://openlineage.io |
| Collibra | Commercial | https://www.collibra.com |
| Alation | Commercial | https://www.alation.com |

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- Agentic Top 10: ASI09 Emerging Agentic Patterns
- Other frameworks: FedRAMP PM-9 – SP 800-218A PW.1.1-PS – ISO 42001 A.7.2

---

### DSGAI03 – Shadow AI & Unvetted Tools

**Severity:** High

Unauthorised or unvetted AI tools bypass data security controls. DORA
requires third-party ICT risk management covering AI tools (Art. 28–44),
protection controls preventing unauthorised data flows (Art. 9), and
governance policies for approved AI tools (Art. 5–7).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Third-Party Risk — AI tool vendor oversight | Art. 28–44 | Third-Party | Include AI tools and services in third-party ICT risk management; conduct due diligence before approval; monitor ongoing compliance |
| Protection and Prevention — unauthorised AI tool blocking | Art. 9 | Protection | Implement controls preventing data transfer to unauthorised AI tools; enforce approved tools policy |
| ICT Risk Management — AI tool governance | Art. 5–7 | Governance | Define approved AI tools policy in ICT risk management framework; require vetting before use in financial data processing |

#### Mitigations

**Foundational**
- Art. 28–44: Include AI tools in third-party risk assessment; conduct
  due diligence before approval
- Art. 9: Block data transfer to unauthorised AI tools
- Art. 5–7: Define approved AI tools policy

**Hardening**
- Art. 28–44: Require contractual provisions for data handling,
  security, and incident notification from AI tool providers
- Art. 9: Deploy automated shadow AI detection; alert on unauthorised
  tool usage
- Art. 5–7: Include shadow AI monitoring in management reporting

**Advanced**
- Art. 28–44: Conduct on-site assessment of critical AI tool providers
- Art. 9: Implement advanced behavioural detection for indirect shadow
  AI usage
- Art. 5–7: Include shadow AI risk in board-level reporting

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
- Other frameworks: FedRAMP CM-7 – SP 800-218A PW.4.1-PS – EBA Outsourcing Guidelines

---

### DSGAI04 – Data Model & Artifact Poisoning

**Severity:** Critical

Attackers corrupt training data, model weights, or pipeline artefacts. DORA
requires protection controls for training pipeline integrity (Art. 9),
third-party oversight for data and model providers (Art. 28–44), and asset
identification for AI artefacts (Art. 8).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — training pipeline integrity | Art. 9 | Protection | Implement security controls protecting training data and model artefacts from poisoning, tampering, and unauthorised modification |
| Third-Party Risk — data and model provider oversight | Art. 28–44 | Third-Party | Include AI data and model providers in third-party risk management; assess poisoning risk and require integrity controls |
| Identification — AI artefact inventory | Art. 8 | Identification | Register all AI training data, model weights, and pipeline artefacts in ICT asset inventory with provenance documentation |
| Learning and Evolving — poisoning post-mortem | Art. 13 | Learning | Conduct post-incident analysis for data poisoning events; trace poisoned content and update controls |

#### Mitigations

**Foundational**
- Art. 9: Implement access controls on training data; enforce least
  privilege; verify artefact integrity before use
- Art. 28–44: Assess data and model providers for poisoning risk;
  require integrity attestation
- Art. 8: Register all AI artefacts with provenance documentation

**Hardening**
- Art. 9: Deploy anomaly detection on training data; flag poisoning
  indicators before training runs
- Art. 28–44: Require contractual commitments for data integrity from
  providers
- Art. 8: Implement automated artefact integrity verification

**Advanced**
- Art. 9: Conduct backdoor detection on model weights before production
- Art. 28–44: On-site assessment of critical data providers
- Art. 13: Establish poisoning forensics playbook

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
- Other frameworks: MITRE ATLAS AML.T0032 – FedRAMP SR-2 – SP 800-218A PS.1.1-PS

---

### DSGAI05 – Data Provenance & Quality

**Severity:** High

Insufficient provenance tracking and quality controls for AI data. DORA
requires asset identification covering data sources (Art. 8), protection
controls for data quality (Art. 9), and third-party oversight for external
data sources (Art. 28–44).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Identification — data source documentation | Art. 8 | Identification | Document provenance, collection method, and quality characteristics for all AI training data in the ICT asset inventory |
| Protection and Prevention — data quality controls | Art. 9 | Protection | Implement data quality validation before AI pipeline ingestion; reject data failing quality thresholds |
| Third-Party Risk — external data source oversight | Art. 28–44 | Third-Party | Include external data sources in third-party risk management; assess data quality and provenance practices |

#### Mitigations

**Foundational**
- Art. 8: Document provenance for all training data sources
- Art. 9: Implement data quality validation at pipeline ingestion
- Art. 28–44: Assess external data source quality and provenance

**Hardening**
- Art. 8: Implement automated provenance tracking
- Art. 9: Deploy continuous data quality monitoring; alert on degradation
- Art. 28–44: Require quality attestations from data providers

**Advanced**
- Art. 8: Include provenance in regulatory reporting
- Art. 9: Implement advanced data quality analytics
- Art. 28–44: Conduct on-site assessment of critical data sources

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
- Other frameworks: FedRAMP SR-3 – SP 800-218A PS.3.1-PS – ISO 42001 A.7.4

---

### DSGAI06 – Data Lineage Fragmentation

**Severity:** Medium

Incomplete data lineage across AI pipelines. DORA requires asset
identification covering data transformations (Art. 8) and governance
for lineage requirements (Art. 5–7).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Identification — data transformation mapping | Art. 8 | Identification | Map all data transformations in AI pipelines; document inputs, outputs, and processing logic for each stage |
| ICT Risk Management — lineage governance | Art. 5–7 | Governance | Include data lineage requirements in ICT risk management; define minimum lineage completeness per data sensitivity |
| Detection — lineage gap detection | Art. 10 | Detection | Monitor for data lineage gaps; alert on undocumented transformations or broken lineage chains |

#### Mitigations

**Foundational**
- Art. 8: Map data transformations; document lineage for all pipelines
- Art. 5–7: Define lineage requirements per data sensitivity
- Art. 10: Monitor for lineage gaps

**Hardening**
- Art. 8: Implement automated lineage capture
- Art. 5–7: Include lineage in management reporting
- Art. 10: Deploy lineage completeness monitoring

**Advanced**
- Art. 8: Implement lineage-based impact analysis
- Art. 5–7: Include lineage in board-level reporting
- Deploy automated lineage validation

#### Tools

| Tool | Type | Link |
|---|---|---|
| OpenLineage | Open-source | https://openlineage.io |
| Apache Atlas | Open-source | https://atlas.apache.org |
| dbt | Open-source | https://www.getdbt.com |
| Collibra | Commercial | https://www.collibra.com |

#### Cross-references
- LLM Top 10: LLM03 Training Data Poisoning
- Agentic Top 10: ASI07 Lateral Tool Chaining
- Other frameworks: FedRAMP CM-3 – SP 800-218A PS.3.1-PS – ISO 42001 A.7.4

---

### DSGAI07 – Excessive Data Aggregation

**Severity:** High

AI data aggregation creates combined datasets with higher sensitivity.
DORA requires protection controls for aggregation boundaries (Art. 9)
and governance covering aggregation risk (Art. 5–7).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — aggregation controls | Art. 9 | Protection | Implement controls preventing uncontrolled data aggregation; enforce restrictions on combining datasets that create higher-sensitivity aggregates |
| ICT Risk Management — aggregation risk governance | Art. 5–7 | Governance | Include data aggregation risk in ICT risk management; assess combined sensitivity of aggregated financial datasets |
| Detection — aggregation anomaly detection | Art. 10 | Detection | Monitor for excessive data aggregation patterns; alert on dataset combinations exceeding defined sensitivity thresholds |

#### Mitigations

**Foundational**
- Art. 9: Implement aggregation controls; restrict dataset combination
  per sensitivity policies
- Art. 5–7: Define aggregation risk policies; assess combined sensitivity
- Art. 10: Monitor for excessive aggregation patterns

**Hardening**
- Art. 9: Deploy automated aggregation enforcement; block unauthorised
  combinations
- Art. 5–7: Include aggregation risk in management reporting
- Art. 10: Deploy aggregation anomaly detection

**Advanced**
- Apply privacy-enhancing technologies to aggregated datasets
- Art. 5–7: Include aggregation risk in board-level reporting
- Deploy continuous aggregation risk assessment

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| ARX Data Anonymization | Open-source | https://arx.deidentifier.org |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| Collibra | Commercial | https://www.collibra.com |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI03 Privilege Escalation
- Other frameworks: FedRAMP AC-6 – SP 800-218A PW.1.1-PS – GDPR Art. 25

---

### DSGAI08 – Data Leakage & Exposure

**Severity:** Critical

Sensitive data exposed through model outputs, training data extraction,
or misconfigured stores. DORA requires protection controls (Art. 9),
incident reporting for data breaches (Art. 17–23), and detection for
leakage indicators (Art. 10).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — data leakage controls | Art. 9 | Protection | Implement security controls preventing AI data leakage — output monitoring, DLP, access controls, and encryption for all financial AI data |
| ICT Incident Management — data breach reporting | Art. 17–23 | Incidents | Classify AI data leakage events as ICT-related incidents; report to competent authorities per DORA incident classification criteria |
| Detection — leakage indicator monitoring | Art. 10 | Detection | Deploy detection for data leakage indicators in model outputs — PII, financial data, credentials; alert and block on detection |
| Learning and Evolving — leakage post-mortem | Art. 13 | Learning | Conduct post-incident analysis for data leakage events; identify root cause and update controls |

#### Mitigations

**Foundational**
- Art. 9: Implement output monitoring and DLP for financial AI systems;
  encrypt all AI data at rest and in transit
- Art. 17–23: Define incident classification for AI data leakage;
  establish reporting procedures
- Art. 10: Deploy leakage detection in model outputs

**Hardening**
- Art. 9: Conduct data extraction testing before deployment; verify
  training data privacy
- Art. 17–23: Include AI data leakage in incident response playbooks
- Art. 10: Deploy automated sensitive data detection and blocking

**Advanced**
- Apply differential privacy to training; bound memorisation risk
- Art. 17–23: Conduct tabletop exercises for AI data breach scenarios
- Art. 13: Establish data leakage forensics playbook

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| AWS Macie / Azure Purview | Commercial | https://aws.amazon.com/macie/ |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure, LLM07 System Prompt Leakage
- Agentic Top 10: ASI03 Privilege Escalation
- Other frameworks: FedRAMP SC-28 – GDPR Art. 33–34 – SP 800-218A PS.1.1-PS

---

### DSGAI09 – Intellectual Property Theft

**Severity:** High

AI model weights, training data, or proprietary algorithms stolen or
extracted. DORA requires protection controls (Art. 9) and incident
reporting for IP theft events (Art. 17–23).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — IP protection controls | Art. 9 | Protection | Implement security controls protecting AI intellectual property — encryption, access controls, and DLP for model weights and proprietary data |
| ICT Incident Management — IP theft reporting | Art. 17–23 | Incidents | Classify AI IP theft as an ICT-related incident; assess impact and report per DORA criteria |
| Detection — IP exfiltration detection | Art. 10 | Detection | Deploy detection for IP exfiltration attempts; monitor model weight access and download patterns |

#### Mitigations

**Foundational**
- Art. 9: Encrypt AI IP at rest; implement access controls; deploy DLP
- Art. 17–23: Define incident classification for IP theft
- Art. 10: Monitor IP access patterns

**Hardening**
- Art. 9: Implement time-bounded access for model weight downloads
- Art. 17–23: Include IP theft in incident playbooks
- Art. 10: Deploy exfiltration detection analytics

**Advanced**
- Deploy model watermarking for theft detection
- Art. 9: Implement hardware-backed key management for model encryption
- Art. 17–23: Conduct IP theft tabletop exercises

#### Tools

| Tool | Type | Link |
|---|---|---|
| HashiCorp Vault | Commercial | https://www.vaultproject.io |
| Nightfall DLP | Commercial | https://www.nightfall.ai |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| AWS KMS / Azure Key Vault | Commercial | https://aws.amazon.com/kms/ |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI04 Supply Chain Compromise
- Other frameworks: FedRAMP SC-28 – MITRE ATLAS AML.T0024 – SP 800-218A PS.1.1-PS

---

### DSGAI10 – Synthetic Data Generation Risk

**Severity:** Medium

Synthetic data may encode sensitive patterns or enable re-identification.
DORA requires protection controls for synthetic data privacy (Art. 9) and
resilience testing covering synthetic data risks (Art. 24–27).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — synthetic data privacy | Art. 9 | Protection | Implement privacy controls for synthetic data generation; validate privacy preservation and absence of sensitive pattern leakage |
| Resilience Testing — synthetic data testing | Art. 24–27 | Testing | Include synthetic data re-identification and privacy testing in resilience testing programme |
| Detection — synthetic data quality monitoring | Art. 10 | Detection | Monitor synthetic data for quality and privacy metrics; alert on privacy degradation |

#### Mitigations

**Foundational**
- Art. 9: Validate synthetic data privacy before use; implement quality
  controls
- Art. 24–27: Include re-identification testing for synthetic data
- Art. 10: Monitor synthetic data quality metrics

**Hardening**
- Art. 9: Deploy automated privacy validation for synthetic data
- Art. 24–27: Conduct advanced re-identification testing
- Art. 10: Include synthetic data in continuous monitoring

**Advanced**
- Deploy formal privacy guarantees for synthetic generation
- Art. 24–27: Include synthetic data risk in TLPT scope
- Implement continuous privacy monitoring for synthetic pipelines

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
- Other frameworks: FedRAMP SI-4 – SP 800-218A PW.7.2-PS – NIST Privacy Framework

---

### DSGAI11 – Data Retention & Deletion

**Severity:** High

Failure to implement appropriate retention and deletion for AI data. DORA
requires governance covering retention policies (Art. 5–7) and backup
policies including deletion procedures (Art. 12).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management — retention governance | Art. 5–7 | Governance | Include data retention policies in ICT risk management; define retention periods per data type and regulatory requirement |
| Backup Policies — retention and deletion procedures | Art. 12 | Backup | Implement backup policies aligned with retention requirements; include secure deletion procedures for expired AI data |
| Protection and Prevention — retention enforcement | Art. 9 | Protection | Enforce retention policies through automated deletion and crypto-shredding; prevent retention beyond defined periods |

#### Mitigations

**Foundational**
- Art. 5–7: Define retention policies for all AI data types
- Art. 12: Implement backup aligned with retention; include deletion
  procedures
- Art. 9: Enforce retention through automated deletion

**Hardening**
- Art. 5–7: Include retention compliance in management reporting
- Art. 12: Implement crypto-shredding for secure deletion
- Art. 9: Deploy automated retention enforcement with verification

**Advanced**
- Art. 5–7: Include retention in board-level reporting
- Deploy automated retention compliance verification
- Art. 12: Include retention in DORA business continuity testing

#### Tools

| Tool | Type | Link |
|---|---|---|
| AWS S3 Lifecycle / Azure Lifecycle Management | Commercial | https://aws.amazon.com/s3/ |
| HashiCorp Vault | Commercial | https://www.vaultproject.io |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| Apache Atlas | Open-source | https://atlas.apache.org |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI06 Memory Poisoning & Context Confusion
- Other frameworks: FedRAMP CM-3 – GDPR Art. 17 – SP 800-218A PS.3.1-PS

---

### DSGAI12 – Data Ownership & Monetisation

**Severity:** Medium

Unclear data ownership and monetisation policies. DORA requires governance
covering ownership (Art. 5–7) and third-party risk management for data
rights (Art. 28–44).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management — ownership governance | Art. 5–7 | Governance | Define data ownership policies for AI data; clarify rights and responsibilities for training data, outputs, and derived insights |
| Third-Party Risk — data rights management | Art. 28–44 | Third-Party | Address data ownership and usage rights in third-party agreements; clarify ownership of AI outputs and derived data |

#### Mitigations

**Foundational**
- Art. 5–7: Define ownership policies for AI data categories
- Art. 28–44: Address ownership in third-party agreements

**Hardening**
- Art. 5–7: Include ownership in management reporting
- Art. 28–44: Implement usage rights tracking for third-party data

**Advanced**
- Art. 5–7: Include ownership in board-level reporting
- Deploy automated rights management for AI data

#### Tools

| Tool | Type | Link |
|---|---|---|
| Collibra | Commercial | https://www.collibra.com |
| Apache Atlas | Open-source | https://atlas.apache.org |
| OneTrust | Commercial | https://www.onetrust.com |
| Alation | Commercial | https://www.alation.com |

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- Agentic Top 10: ASI09 Emerging Agentic Patterns
- Other frameworks: FedRAMP PM-9 – SP 800-218A PW.1.1-PS – ISO 42001 A.7.2

---

### DSGAI13 – Data Misuse & Manipulation

**Severity:** High

AI data used beyond original consent or manipulated for harmful outcomes.
DORA requires protection controls for data usage (Art. 9), detection of
misuse (Art. 10), and incident reporting for misuse events (Art. 17–23).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — purpose-limited data controls | Art. 9 | Protection | Implement controls enforcing purpose-limitation on AI data usage; restrict processing to approved purposes |
| Detection — misuse detection | Art. 10 | Detection | Monitor AI data usage for misuse indicators; alert on usage inconsistent with approved purposes |
| ICT Incident Management — misuse incident reporting | Art. 17–23 | Incidents | Classify AI data misuse as ICT-related incidents where customer impact occurs; report per DORA criteria |

#### Mitigations

**Foundational**
- Art. 9: Enforce purpose-limitation on AI data access
- Art. 10: Monitor for data usage inconsistent with approved purposes
- Art. 17–23: Define incident criteria for data misuse events

**Hardening**
- Art. 9: Implement automated purpose enforcement
- Art. 10: Deploy usage pattern analytics
- Art. 17–23: Include misuse in incident playbooks

**Advanced**
- Art. 9: Deploy advanced purpose compliance verification
- Art. 10: Implement behavioural analytics for misuse detection
- Art. 13: Establish misuse post-mortem process

#### Tools

| Tool | Type | Link |
|---|---|---|
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Collibra | Commercial | https://www.collibra.com |
| Splunk | Commercial | https://www.splunk.com |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- Agentic Top 10: ASI02 Misconfigured Access Controls
- Other frameworks: FedRAMP AC-3 – GDPR Art. 5 – SP 800-218A PW.1.1-PS

---

### DSGAI14 – Consent Management Failures

**Severity:** High

Failure to manage data subject consent for AI processing. DORA requires
governance covering consent (Art. 5–7) and protection controls aligned
with consent status (Art. 9).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management — consent governance | Art. 5–7 | Governance | Include consent management in ICT risk management; define consent requirements per data type and AI processing activity |
| Protection and Prevention — consent-aligned controls | Art. 9 | Protection | Implement access controls aligned with consent status; block AI processing on data where consent has been withdrawn |

#### Mitigations

**Foundational**
- Art. 5–7: Define consent requirements for AI data processing
- Art. 9: Align access controls with consent status

**Hardening**
- Art. 5–7: Include consent compliance in management reporting
- Art. 9: Implement automated consent enforcement

**Advanced**
- Art. 5–7: Include consent in board-level reporting
- Art. 9: Deploy real-time consent verification at data access

#### Tools

| Tool | Type | Link |
|---|---|---|
| OneTrust | Commercial | https://www.onetrust.com |
| TrustArc | Commercial | https://trustarc.com |
| Collibra | Commercial | https://www.collibra.com |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI02 Misconfigured Access Controls
- Other frameworks: FedRAMP PM-9 – GDPR Art. 7 – NIST Privacy Framework

---

### DSGAI15 – Data Minimisation Violations

**Severity:** Medium

AI systems collect more data than necessary. DORA requires governance
covering minimisation (Art. 5–7) and protection controls restricting
data collection (Art. 9).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management — minimisation governance | Art. 5–7 | Governance | Include data minimisation in ICT risk management; define minimum necessary data per AI use case |
| Protection and Prevention — collection restrictions | Art. 9 | Protection | Implement controls restricting AI data collection to minimum necessary; enforce at pipeline ingestion points |

#### Mitigations

**Foundational**
- Art. 5–7: Define minimisation requirements per AI use case
- Art. 9: Restrict collection to minimum necessary

**Hardening**
- Art. 5–7: Include minimisation in management reporting
- Art. 9: Deploy automated minimisation enforcement

**Advanced**
- Deploy privacy-enhancing technologies to reduce data requirements
- Art. 5–7: Include minimisation in board-level reporting

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| ARX Data Anonymization | Open-source | https://arx.deidentifier.org |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| OneTrust | Commercial | https://www.onetrust.com |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI02 Misconfigured Access Controls
- Other frameworks: FedRAMP AC-6 – GDPR Art. 5(1)(c) – NIST Privacy Framework

---

### DSGAI16 – Erosion of Privacy

**Severity:** High

AI progressively erodes privacy through inference, aggregation, and
memorisation. DORA requires protection controls (Art. 9), governance
covering privacy risk (Art. 5–7), and resilience testing of privacy
controls (Art. 24–27).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — privacy-preserving controls | Art. 9 | Protection | Implement privacy-preserving controls for AI systems; prevent inference, re-identification, and memorisation-based privacy erosion |
| ICT Risk Management — privacy risk governance | Art. 5–7 | Governance | Include AI privacy erosion in ICT risk management; assess inference, aggregation, and memorisation risks |
| Resilience Testing — privacy testing | Art. 24–27 | Testing | Include privacy control testing in resilience testing; assess re-identification risk and memorisation in AI systems |

#### Mitigations

**Foundational**
- Art. 9: Implement privacy-preserving controls for AI systems
- Art. 5–7: Assess privacy erosion risk for each AI system
- Art. 24–27: Include privacy in resilience testing scope

**Hardening**
- Art. 9: Deploy memorisation testing; verify training data privacy
- Art. 5–7: Include privacy risk in management reporting
- Art. 24–27: Conduct re-identification testing

**Advanced**
- Apply differential privacy to training pipelines
- Art. 5–7: Include privacy erosion in board-level reporting
- Art. 24–27: Include privacy in TLPT scope

#### Tools

| Tool | Type | Link |
|---|---|---|
| Opacus | Open-source | https://opacus.ai |
| ARX Data Anonymization | Open-source | https://arx.deidentifier.org |
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| OneTrust | Commercial | https://www.onetrust.com |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI03 Privilege Escalation
- Other frameworks: FedRAMP SC-28 – GDPR Art. 25 – SP 800-218A PW.1.1-PS

---

### DSGAI17 – Bias in Data

**Severity:** High

Biased training data leads to discriminatory AI outcomes. DORA requires
detection for bias indicators (Art. 10), governance covering fairness
(Art. 5–7), and resilience testing for bias (Art. 24–27).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Detection — bias monitoring | Art. 10 | Detection | Monitor AI outputs for bias indicators; track fairness metrics across demographic groups and financial service use cases |
| ICT Risk Management — fairness governance | Art. 5–7 | Governance | Include AI bias and fairness in ICT risk management; define fairness requirements for financial AI systems |
| Resilience Testing — bias testing | Art. 24–27 | Testing | Include bias detection and fairness testing in resilience testing; test for disparate impact in financial AI outputs |

#### Mitigations

**Foundational**
- Art. 10: Monitor for bias indicators; establish fairness baselines
- Art. 5–7: Define fairness requirements for financial AI
- Art. 24–27: Include bias testing in resilience programme

**Hardening**
- Art. 10: Deploy automated bias detection; alert on degradation
- Art. 5–7: Include fairness in management reporting
- Art. 24–27: Conduct disparate impact testing

**Advanced**
- Deploy formal fairness constraints in training
- Art. 5–7: Include bias risk in board-level reporting
- Art. 24–27: Include bias testing in TLPT scope

#### Tools

| Tool | Type | Link |
|---|---|---|
| IBM AI Fairness 360 | Open-source | https://aif360.mybluemix.net |
| Fairlearn | Open-source | https://fairlearn.org |
| What-If Tool | Open-source | https://pair-code.github.io/what-if-tool/ |
| Fiddler AI | Commercial | https://www.fiddler.ai |

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- Agentic Top 10: ASI09 Emerging Agentic Patterns
- Other frameworks: FedRAMP SI-4 – NIST AI RMF MAP 2.3 – ISO 42001 A.6.2.6

---

### DSGAI18 – Governance Gaps

**Severity:** High

Insufficient governance for AI data management. DORA requires comprehensive
ICT risk governance (Art. 5–7) and continuous improvement processes
(Art. 13).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management — AI governance framework | Art. 5–7 | Governance | Establish comprehensive AI data governance within ICT risk management; define roles, policies, and oversight mechanisms |
| Learning and Evolving — governance improvement | Art. 13 | Learning | Apply lessons learned to improve AI governance; update policies and controls based on incident analysis and regulatory changes |
| Identification — governance scope mapping | Art. 8 | Identification | Map all AI systems subject to governance; ensure complete coverage of AI data assets |

#### Mitigations

**Foundational**
- Art. 5–7: Establish AI data governance framework; define roles
- Art. 13: Implement lessons learned process for governance
- Art. 8: Map all AI systems subject to governance

**Hardening**
- Art. 5–7: Include governance maturity in management reporting
- Art. 13: Conduct regular governance gap analysis
- Art. 8: Implement automated governance coverage tracking

**Advanced**
- Art. 5–7: Include governance in board-level reporting
- Deploy automated governance monitoring
- Art. 13: Establish continuous governance improvement programme

#### Tools

| Tool | Type | Link |
|---|---|---|
| Collibra | Commercial | https://www.collibra.com |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| ServiceNow GRC | Commercial | https://www.servicenow.com |
| Alation | Commercial | https://www.alation.com |

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- Agentic Top 10: ASI09 Emerging Agentic Patterns
- Other frameworks: FedRAMP PM-9 – NIST AI RMF GOV – ISO 42001 5.1

---

### DSGAI19 – Third-Party Data Risk

**Severity:** High

Risks from third-party data sources and processors. DORA requires
comprehensive third-party risk management (Art. 28–44) and asset
identification for third-party data (Art. 8).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Third-Party Risk — data provider and processor oversight | Art. 28–44 | Third-Party | Include all third-party data providers and processors in DORA third-party risk management; conduct due diligence, establish contracts, and monitor ongoing compliance |
| Identification — third-party data inventory | Art. 8 | Identification | Register all third-party data sources in ICT asset inventory; document provenance, contracts, and dependency relationships |
| ICT Risk Management — third-party data governance | Art. 5–7 | Governance | Include third-party data risk in ICT risk management; define policies for external data sourcing and processing |

#### Mitigations

**Foundational**
- Art. 28–44: Include all data providers in third-party risk assessment;
  establish contractual controls
- Art. 8: Register third-party data sources in asset inventory
- Art. 5–7: Define third-party data policies

**Hardening**
- Art. 28–44: Identify critical data providers per DORA criteria;
  require enhanced oversight
- Art. 8: Implement automated third-party data tracking
- Art. 5–7: Include third-party data risk in management reporting

**Advanced**
- Art. 28–44: Conduct on-site assessments of critical data providers
- Art. 8: Deploy continuous third-party data monitoring
- Art. 5–7: Include third-party data risk in board-level reporting

#### Tools

| Tool | Type | Link |
|---|---|---|
| OneTrust Vendorpedia | Commercial | https://www.onetrust.com |
| ServiceNow VRM | Commercial | https://www.servicenow.com |
| CycloneDX | Open-source | https://cyclonedx.org |
| Great Expectations | Open-source | https://greatexpectations.io |

#### Cross-references
- LLM Top 10: LLM05 Supply Chain Vulnerabilities
- Agentic Top 10: ASI04 Supply Chain Compromise
- Other frameworks: FedRAMP SA-9 – EBA Outsourcing Guidelines – SP 800-218A PW.4.1-PS

---

### DSGAI20 – Data Localization Violations

**Severity:** High

AI data processed or stored outside jurisdictional requirements. DORA
requires governance for localisation (Art. 5–7), third-party risk
management for cross-border data handling (Art. 28–44), and protection
controls for data flow (Art. 9).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management — localisation governance | Art. 5–7 | Governance | Include data localisation in ICT risk management; define residency requirements per jurisdiction |
| Third-Party Risk — cross-border data oversight | Art. 28–44 | Third-Party | Address data localisation in third-party agreements; verify provider data processing locations meet residency requirements |
| Protection and Prevention — data flow enforcement | Art. 9 | Protection | Implement controls preventing AI data from crossing jurisdictional boundaries without authorisation |

#### Mitigations

**Foundational**
- Art. 5–7: Define localisation requirements per applicable laws
- Art. 28–44: Verify provider data processing locations
- Art. 9: Implement data flow controls at boundaries

**Hardening**
- Art. 5–7: Include localisation in management reporting
- Art. 28–44: Require contractual localisation commitments
- Art. 9: Deploy automated cross-border transfer detection

**Advanced**
- Art. 5–7: Include localisation in board-level reporting
- Art. 28–44: Conduct provider location verification audits
- Art. 9: Implement continuous localisation compliance monitoring

#### Tools

| Tool | Type | Link |
|---|---|---|
| AWS Region Controls / Azure Policy | Commercial | https://aws.amazon.com/compliance/data-residency/ |
| Netskope | Commercial | https://www.netskope.com |
| OneTrust | Commercial | https://www.onetrust.com |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI04 Supply Chain Compromise
- Other frameworks: FedRAMP SC-7 – GDPR Art. 44–49 – DORA Art. 28–44

---

### DSGAI21 – Non-Compliance with Data Laws

**Severity:** Critical

AI systems fail to comply with applicable data protection regulations.
DORA requires governance covering regulatory compliance (Art. 5–7),
incident reporting for compliance failures (Art. 17–23), and continuous
improvement for compliance (Art. 13).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management — regulatory compliance governance | Art. 5–7 | Governance | Include regulatory compliance in ICT risk management; map applicable data laws to AI processing activities |
| ICT Incident Management — compliance incident reporting | Art. 17–23 | Incidents | Classify regulatory non-compliance events as ICT incidents where material; report to competent authorities per DORA criteria |
| Learning and Evolving — compliance improvement | Art. 13 | Learning | Apply lessons learned from compliance failures; update controls and processes based on regulatory changes and incident analysis |
| Identification — regulated data mapping | Art. 8 | Identification | Map all AI data subject to regulatory requirements; ensure complete coverage in compliance programme |

#### Mitigations

**Foundational**
- Art. 5–7: Map applicable data laws to AI processing; define
  compliance requirements
- Art. 17–23: Define incident criteria for compliance failures
- Art. 8: Map regulated AI data assets

**Hardening**
- Art. 5–7: Include compliance in management reporting; track status
- Art. 17–23: Include compliance in incident playbooks
- Art. 13: Conduct regular compliance reassessment

**Advanced**
- Art. 5–7: Include compliance in board-level reporting
- Deploy automated compliance monitoring
- Art. 13: Establish continuous compliance improvement programme

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
- Other frameworks: FedRAMP PM-9 – GDPR – CCPA – DORA Art. 5–7

---

## Implementation priority

| Phase | Governance (Art. 5–7) | Protection & Detection (Art. 9–10) | Incidents, Testing & Third-Party (Art. 11–44) |
|---|---|---|---|
| 1 – Now | Data governance framework for DSGAI18/21; data access policies for DSGAI01; consent governance for DSGAI14 | Art. 9 data leakage controls for DSGAI08; poisoning protection for DSGAI04; access controls for DSGAI08/09 | Art. 28–44 data provider assessment for DSGAI04/19; Art. 17–23 incident criteria for DSGAI08/21 |
| 2 – This sprint | Retention policies for DSGAI11; minimisation governance for DSGAI15; ownership policies for DSGAI12; localisation policies for DSGAI20 | Art. 9 data quality validation for DSGAI05; shadow AI blocking for DSGAI03; Art. 10 access monitoring for DSGAI01; leakage detection for DSGAI08 | Art. 28–44 shadow AI vendor assessment for DSGAI03; third-party data oversight for DSGAI19; Art. 12 backup for DSGAI11 |
| 3 – This quarter | Visibility governance for DSGAI02; lineage for DSGAI06; aggregation for DSGAI07; fairness for DSGAI17; privacy for DSGAI16 | Art. 10 bias monitoring for DSGAI17; aggregation detection for DSGAI07; Art. 9 privacy controls for DSGAI16 | Art. 24–27 privacy and bias testing for DSGAI10/16/17; Art. 28–44 critical provider assessments; Art. 13 post-mortem processes |
| 4 – Ongoing | Governance maturity tracking; board-level reporting; regulatory change monitoring | Continuous monitoring; detection tuning; privacy control updates | Annual resilience testing; third-party reassessment; Art. 45 information sharing |

---

## References

- [DORA – EU Regulation 2022/2554](https://eur-lex.europa.eu/eli/reg/2022/2554/oj)
- [EBA DORA Regulatory Technical Standards](https://www.eba.europa.eu/regulation-and-policy/digital-operational-resilience-act-dora)
- [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/dsgai-2026/)
- [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [ENISA Threat Landscape for AI](https://www.enisa.europa.eu/)

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-28 | 2026-Q1 | Initial mapping – DSGAI01–DSGAI21 full entries | OWASP GenAI Data Security Initiative |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) –
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
