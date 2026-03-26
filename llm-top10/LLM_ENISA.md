<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for LLM Applications 2025 (LLM01-LLM10)
  Framework   : ENISA — European Union Agency for Cybersecurity
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# LLM Top 10 2025 x ENISA

Mapping the [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/)
to key publications and guidance from the [European Union Agency for
Cybersecurity (ENISA)](https://www.enisa.europa.eu) — the EU's principal
cybersecurity authority, mandated to achieve a high common level of
cybersecurity across Europe.

---

## Why ENISA for LLM security

ENISA is not a single standard like ISO 27001 or NIST CSF — it is a
body that produces binding guidance, threat intelligence, and technical
recommendations that underpin EU cybersecurity policy. For LLM
applications deployed in the EU or affecting EU residents, three ENISA
outputs create directly applicable obligations and guidance:

**NIS2 Directive (Directive EU 2022/2555)** — ENISA supports
implementation of NIS2, which requires essential and important entities
to implement appropriate risk management measures including supply
chain security, incident handling, and cryptography. LLM applications
in scope of NIS2 must address the risks in this file.

**EU AI Act** — ENISA provides technical guidance on AI Act
implementation and has published AI-specific cybersecurity standards
mapping. The AI Act's cybersecurity requirements (Art. 15) are informed
by ENISA's AI threat landscape work.

**ENISA technical guidelines** — ENISA has published directly
applicable guidance on AI cybersecurity, supply chain security, and
threat landscapes that practitioners use to implement controls. These
are not legally binding in the same way as regulations, but they
represent the EU's authoritative technical position on cybersecurity
practice and are used by national authorities as benchmarks.

---

## Key ENISA publications referenced in this mapping

| Publication | Year | Relevance |
|---|---|---|
| ENISA Threat Landscape (ETL) — annual | 2024 | Current threat intelligence including AI-specific threats |
| ENISA Multilayer Framework for Good Cybersecurity Practices for AI | 2023 | AI-specific security controls framework |
| ENISA Cybersecurity of AI and Standardisation | 2023 | AI security standards landscape including ISO 42001 and EU AI Act alignment |
| ENISA Guidelines on Securing Machine Learning Algorithms | 2021 | Foundational ML security guidance — supply chain, data integrity, adversarial robustness |
| ENISA AI Cybersecurity Challenges | 2020 | Taxonomy of AI-specific cybersecurity challenges |
| ENISA Guidelines on Securing the Software Supply Chain | 2023 | Supply chain security applicable to LLM component sourcing |
| ENISA NIS2 Implementation Guidance | 2023 | Risk management measures for entities in scope of NIS2 |
| ENISA Pseudonymisation Techniques and Best Practices | 2019 | Anonymisation and privacy-preserving AI |

---

## ENISA Multilayer Framework — control domains

The ENISA Multilayer Framework for Good Cybersecurity Practices for AI
(2023) organises AI security controls across five layers. This is the
primary ENISA control reference for LLM security mapping:

| Layer | Name | LLM relevance |
|---|---|---|
| L1 | Governance and accountability | AI risk governance, roles, policies, supplier accountability |
| L2 | Data quality and supply chain | Training data security, provenance, supply chain integrity |
| L3 | Platform and infrastructure | Secure deployment, access control, encryption |
| L4 | AI model security | Adversarial robustness, model integrity, output validation |
| L5 | Monitoring and incident response | Anomaly detection, incident handling, continuous monitoring |

---

## Quick-reference summary

| ID | Name | Severity | Primary ENISA References | Tier |
|---|---|---|---|---|
| LLM01 | Prompt Injection | Critical | ETL-AI-T01, ML-Framework L4, L5 | Foundational-Advanced |
| LLM02 | Sensitive Information Disclosure | High | ML-Framework L2/L3, Pseudonymisation Guide | Foundational-Advanced |
| LLM03 | Supply Chain Vulnerabilities | High | Supply Chain Guide, ML-Framework L2, NIS2 Art.21 | Foundational-Hardening |
| LLM04 | Data and Model Poisoning | Critical | ETL-AI-T02, ML-Framework L2/L4, Securing ML Algos | Hardening-Advanced |
| LLM05 | Insecure Output Handling | High | ML-Framework L4/L5, Securing ML Algos | Foundational-Hardening |
| LLM06 | Excessive Agency | High | ML-Framework L1/L4, AI Cybersec Challenges | Foundational-Hardening |
| LLM07 | System Prompt Leakage | High | ML-Framework L3/L4, ETL-AI-T01 | Foundational-Hardening |
| LLM08 | Vector and Embedding Weaknesses | Medium | ML-Framework L3/L4, Pseudonymisation Guide | Hardening-Advanced |
| LLM09 | Misinformation | Medium | ETL-AI-T03, ML-Framework L4/L5, AI Cybersec | Foundational-Hardening |
| LLM10 | Unbounded Consumption | Medium | NIS2 Art.21, ML-Framework L3/L5, ETL | Foundational-Hardening |

---

## Audience tags

- **CISO / governance** — full file, ENISA framework alignment for LLM applications
- **EU AI Act compliance team** — ENISA AI Act alignment notes throughout
- **NIS2 compliance officer** — NIS2 Art.21 intersections per entry
- **Security engineer** — ML Framework Layer 3/4/5 controls
- **DPO** — LLM02, LLM08 pseudonymisation and privacy entries
- **Risk manager** — ENISA ETL threat references, AI Cybersecurity Challenges taxonomy

---

## Detailed mappings

---

### LLM01 — Prompt Injection

**Severity:** Critical

Malicious instructions in user input or processed content manipulate
LLM behaviour, bypassing safety controls. ENISA's AI Threat Landscape
categorises adversarial input manipulation as a primary AI threat
(ETL-AI-T01). The ENISA Multilayer Framework addresses this through
Layer 4 (AI model security) controls on input validation and
adversarial robustness.

**ENISA threat taxonomy reference:** ETL-AI-T01 — Adversarial
examples and input manipulation — defined in ENISA Threat Landscape
as attacks that exploit the sensitivity of AI models to carefully
crafted inputs designed to cause model misbehaviour.

#### ENISA mapping

| Reference | Publication | Layer | How it applies |
|---|---|---|---|
| ETL-AI-T01 Adversarial input manipulation | ENISA Threat Landscape 2024 | Threat intelligence | Prompt injection classified as adversarial input manipulation — primary AI threat requiring dedicated controls |
| L4-CM-01 Input validation and sanitisation | Multilayer Framework 2023 | L4 AI Model Security | Input validation controls for all LLM inputs — structural and semantic validation before model processing |
| L4-CM-03 Adversarial robustness testing | Multilayer Framework 2023 | L4 AI Model Security | Adversarial testing programme covering prompt injection scenarios — regular red team exercises |
| L5-CM-02 Anomaly detection | Multilayer Framework 2023 | L5 Monitoring | Runtime monitoring for injection indicators on all LLM input channels |

**NIS2 intersection:** For entities in scope of NIS2 (Directive EU
2022/2555), prompt injection represents a cybersecurity risk requiring
treatment under Art. 21 risk management measures — specifically
Art. 21(2)(e) security in network and information systems.

#### Mitigations by tier

**Foundational**
- L4-CM-01: Implement input validation for all LLM inputs —
  structural validation, semantic scanning, and content
  filtering as baseline Layer 4 controls per ENISA
  Multilayer Framework
- Document prompt injection as a foreseeable AI threat
  in your AI risk register — ETL-AI-T01 provides the
  threat intelligence basis for risk quantification
- Treat all external content processed by the LLM as
  untrusted — documents, RAG chunks, tool outputs,
  emails regardless of source

**Hardening**
- L4-CM-03: Establish adversarial testing programme covering
  prompt injection scenarios — direct, indirect via RAG,
  and jailbreak vectors tested before each production release
- L5-CM-02: Deploy runtime monitoring for injection indicators —
  integrate into security operations workflow, ENISA
  recommends anomaly detection as a Layer 5 continuous
  control
- Implement architectural separation between system prompt
  and user input as a Layer 4 design control

**Advanced**
- Extend L4-CM-03 adversarial testing to cover all indirect
  injection surfaces — RAG sources, tool descriptors, all
  data sources the LLM processes in your specific deployment
- Conduct quarterly red team exercises using current threat
  intelligence from ENISA ETL — novel injection techniques
  tested before they reach production
- L5-CM-02: Integrate injection detection into SIEM —
  ENISA recommends centralised security monitoring for
  AI-specific threats

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| PyRIT | Open-source | https://github.com/Azure/PyRIT |

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: ISO 27001 A.8.28 · NIST AI RMF MS-2.5 · NIST CSF 2.0 PR.PS-04

---

### LLM02 — Sensitive Information Disclosure

**Severity:** High

LLMs expose PII, financial data, proprietary code, or confidential
information through outputs. ENISA addresses this through the
Multilayer Framework Layer 2 (data quality and supply chain) and
Layer 3 (platform security) controls, and specifically through the
ENISA Pseudonymisation Techniques and Best Practices guide for
privacy-preserving AI implementations.

**ENISA EU AI Act alignment:** ENISA's AI Act guidance identifies
data governance (Art. 10) as the primary mechanism for preventing
sensitive data leakage — training data governance is a binding
legal obligation, not a best practice, for high-risk AI systems
from August 2026.

#### ENISA mapping

| Reference | Publication | Layer | How it applies |
|---|---|---|---|
| L2-CM-02 Data quality and privacy | Multilayer Framework 2023 | L2 Data | Training data classified and privacy-preserving measures applied — PII removed or pseudonymised before training |
| L3-CM-01 Access control | Multilayer Framework 2023 | L3 Platform | Access controls on all LLM data sources — RAG retrieval enforces authorised access |
| Pseudonymisation best practices | ENISA Pseudonymisation Guide 2019 | Data privacy | Pseudonymisation and anonymisation techniques for training data and output processing |
| L5-CM-01 Logging and monitoring | Multilayer Framework 2023 | L5 Monitoring | DLP monitoring on all LLM output channels — sensitive patterns detected before delivery |

**NIS2 intersection:** Personal data breaches through LLM outputs
trigger NIS2 incident reporting obligations for essential and
important entities — notification to national CSIRT and affected
organisations as required under Art. 23.

#### Mitigations by tier

**Foundational**
- L2-CM-02: Classify all data entering LLM scope before
  ingestion — training corpora, RAG sources, prompt templates,
  and outputs — apply ENISA-recommended data quality and
  privacy controls
- L3-CM-01: Implement access controls on RAG data sources —
  users retrieve only documents they are authorised to access,
  enforced at the retrieval layer
- Deploy output scanning for PII and sensitive patterns —
  ENISA Pseudonymisation Guide provides techniques for
  identifying and masking personal data in outputs

**Hardening**
- Apply ENISA pseudonymisation techniques to training data —
  tokenisation, generalisation, and noise addition for
  sensitive data in training corpora
- L5-CM-01: Deploy DLP monitoring on all LLM output channels —
  integrate into SOC monitoring aligned with ENISA anomaly
  detection recommendations
- Audit RAG access controls per sprint — verify retrieval
  scope matches authorised user access rights

**Advanced**
- Apply differential privacy in training and embedding
  generation — ENISA Pseudonymisation Guide section on
  statistical disclosure control provides the technical basis
- Conduct model inversion red team exercises — validate
  training data cannot be reconstructed from outputs
- L2-CM-02: Implement machine unlearning readiness —
  versioned data-to-model linkage enabling erasure response

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Nightfall AI | Commercial | https://nightfall.ai |

#### Cross-references
- Agentic Top 10: ASI03 Identity and Privilege Abuse
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI18 Inference and Data Reconstruction
- Other frameworks: EU AI Act Art. 10 · GDPR Art. 25 · ISO 27001 A.8.11

---

### LLM03 — Supply Chain Vulnerabilities

**Severity:** High

LLM applications depend on third-party model weights, datasets,
libraries, and plugins. ENISA has published dedicated supply chain
security guidance directly applicable to LLM component sourcing,
and NIS2 Art. 21 includes explicit supply chain security requirements
for entities in scope.

**ENISA supply chain guidance:** The 2023 ENISA Guidelines on Securing
the Software Supply Chain recommends SBOM generation, component
integrity verification, and supplier security assessments — all
directly applicable to LLM component procurement.

#### ENISA mapping

| Reference | Publication | Layer | How it applies |
|---|---|---|---|
| Supply chain security controls | ENISA Supply Chain Guidelines 2023 | L2 Data / L1 Governance | Security requirements for LLM component suppliers — SBOM, integrity verification, vulnerability disclosure |
| L2-CM-04 Data provenance | Multilayer Framework 2023 | L2 Data | Training data provenance documentation — sources, quality, integrity verification |
| L1-CM-03 Third-party governance | Multilayer Framework 2023 | L1 Governance | Governance controls for all third-party AI components — assessment, contractual obligations, monitoring |
| NIS2 Art.21(2)(d) Supply chain | NIS2 Directive 2022 | Regulatory | Supply chain security measures required for NIS2 essential and important entities |

**NIS2 intersection:** Art. 21(2)(d) of NIS2 explicitly requires
"security in supply chain including security-related aspects concerning
the relationships between each entity and its direct suppliers or
service providers." This is a binding legal requirement for NIS2
entities — ENISA supply chain guidance provides the implementation path.

#### Mitigations by tier

**Foundational**
- L1-CM-03: Establish supplier governance for all LLM
  component vendors — provenance documentation, integrity
  guarantees, and vulnerability disclosure contractually
  required per ENISA supply chain guidance
- Generate ML SBOM for every production LLM deployment —
  ENISA Supply Chain Guidelines recommend SBOM as the
  foundation of supply chain visibility
- Pin all component versions — no automatic updates in
  production without review and approval

**Hardening**
- Conduct security assessments of strategic LLM component
  suppliers — ENISA supply chain guidance provides assessment
  criteria, include in third-party risk management programme
- Verify cryptographic signatures of all LLM components
  before deployment — unsigned components rejected
- Apply OT supply chain controls for LLM components in
  industrial environments — ENISA ICS/SCADA guidelines apply

**Advanced**
- L2-CM-04: Implement continuous data provenance monitoring —
  ENISA recommends ongoing supply chain monitoring, not
  just point-in-time assessment
- Operate isolated model evaluation environment — backdoor
  detection before each production promotion
- Establish responsible disclosure relationship with LLM
  vendors — ENISA recommends defined vulnerability
  notification SLAs in supplier agreements

#### Tools

| Tool | Type | Link |
|---|---|---|
| CycloneDX | Open-source | https://cyclonedx.org |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| Syft | Open-source | https://github.com/anchore/syft |

#### Cross-references
- Agentic Top 10: ASI04 Agentic Supply Chain Vulnerabilities
- DSGAI 2026: DSGAI04 Data Model and Artifact Poisoning
- Other frameworks: ISO 27001 A.5.19/A.5.21 · NIST AI RMF MP-5.1 · NIST SP 800-218A

---

### LLM04 — Data and Model Poisoning

**Severity:** Critical

Attackers corrupt training datasets or model weights to embed
backdoors. ENISA categorises data and model poisoning as ETL-AI-T02
in its AI threat taxonomy and dedicates significant guidance in
the Securing Machine Learning Algorithms report to detection and
prevention controls.

**ENISA threat taxonomy reference:** ETL-AI-T02 — Data poisoning
attacks — defined as attacks that manipulate the training data or
model parameters to cause AI systems to malfunction in attacker-
controlled ways. ENISA identifies this as one of the highest-impact
AI-specific threats.

#### ENISA mapping

| Reference | Publication | Layer | How it applies |
|---|---|---|---|
| ETL-AI-T02 Data poisoning attacks | ENISA Threat Landscape 2024 | Threat intelligence | Data and model poisoning classified as primary AI threat — requires dedicated training pipeline controls |
| L2-CM-03 Training data integrity | Multilayer Framework 2023 | L2 Data | Training data integrity controls — source validation, anomaly detection, lineage tracking |
| L4-CM-04 Model integrity verification | Multilayer Framework 2023 | L4 AI Model | Model integrity verification before deployment — hash-based integrity check against approved baseline |
| Data poisoning mitigations | Securing ML Algorithms 2021 | Technical guidance | Specific techniques: data sanitisation, anomaly detection, robust training methods, adversarial testing |

#### Mitigations by tier

**Foundational**
- L2-CM-03: Implement training data integrity controls per
  ENISA Securing ML Algorithms guidance — source allowlisting,
  provenance documentation, anomaly detection on distributions
- L4-CM-04: Implement model integrity verification before each
  deployment — hash-based check against approved baseline,
  deviation triggers rejection
- Establish model rollback capability — approved clean
  checkpoint always available, tested restoration procedure

**Hardening**
- Apply ENISA-recommended data sanitisation techniques from
  Securing ML Algorithms — outlier detection, data
  augmentation, and consistency checks on training data
- Include poisoning detection in adversarial testing programme —
  backdoor trigger testing and biased output detection
  before every production model promotion
- Apply differential privacy during training — ENISA
  Pseudonymisation Guide provides the statistical basis

**Advanced**
- Conduct post-training backdoor detection as mandatory
  pre-deployment gate — ENISA recommends adversarial testing
  as a continuous AI security activity, not a one-time check
- L5-CM-02: Integrate model output anomaly detection into
  SIEM — poisoning indicators treated as security events
  aligned with ENISA incident detection recommendations
- Use ENISA ETL-AI-T02 threat intelligence to inform
  detection logic — threat actor techniques and indicators
  of compromise for training data poisoning campaigns

#### Tools

| Tool | Type | Link |
|---|---|---|
| IBM Adversarial Robustness Toolbox | Open-source | https://github.com/Trusted-AI/adversarial-robustness-toolbox |
| CleanLab | Open-source | https://github.com/cleanlab/cleanlab |
| Great Expectations | Open-source | https://greatexpectations.io |

#### Cross-references
- Agentic Top 10: ASI06 Memory and Context Poisoning
- DSGAI 2026: DSGAI04 Data Model and Artifact Poisoning, DSGAI21 Disinformation via Data Poisoning
- Other frameworks: NIST AI RMF MS-3.3 · MITRE ATLAS AML.T0032 · ISO 27001 A.8.27

---

### LLM05 — Insecure Output Handling

**Severity:** High

LLM output passed to downstream systems without validation enables
XSS, command injection, or SQL injection via AI-generated content.
ENISA addresses this through Layer 4 output validation controls and
the AI Cybersecurity Challenges taxonomy entry on output integrity.

#### ENISA mapping

| Reference | Publication | Layer | How it applies |
|---|---|---|---|
| L4-CM-02 Output validation | Multilayer Framework 2023 | L4 AI Model | Output validation controls for all LLM outputs before passing to downstream systems |
| L4-CM-05 Secure output handling | Multilayer Framework 2023 | L4 AI Model | Encoding and sanitisation requirements for LLM outputs — prevent injection via AI-generated content |
| Output security guidance | Securing ML Algorithms 2021 | Technical | Secure handling of model outputs — validation, encoding, schema enforcement |
| L5-CM-01 Logging | Multilayer Framework 2023 | L5 Monitoring | Log all LLM outputs for anomaly detection and forensic capability |

#### Mitigations by tier

**Foundational**
- L4-CM-02: Implement output validation for all LLM outputs —
  treat model responses as untrusted input to downstream
  systems, encoding and sanitisation mandatory per ENISA
  Layer 4 controls
- Never pass raw LLM output to database queries, shell
  commands, or eval functions — foundational output
  security requirement in ENISA Securing ML Algorithms
- L5-CM-01: Log all LLM outputs — injection patterns in
  model responses detectable through log analysis

**Hardening**
- L4-CM-05: Implement output schema validation — only outputs
  conforming to defined safe structures passed to downstream
  consumers, aligned with ENISA output validation guidance
- Include output injection in security testing programme —
  XSS, SQL injection, and command injection via LLM output
  tested before each release
- Deploy DAST on all interfaces consuming LLM output

**Advanced**
- Deploy dedicated output security layer independent of
  the LLM — ENISA recommends defence-in-depth for AI
  output channels
- Conduct adversarial output testing — attempt injection
  via LLM-generated content against your specific downstream
  consumers and document results in security test records

#### Tools

| Tool | Type | Link |
|---|---|---|
| OWASP ZAP | Open-source | https://www.zaproxy.org |
| Semgrep | Open-source | https://semgrep.dev |
| DOMPurify | Open-source | https://github.com/cure53/DOMPurify |

#### Cross-references
- Agentic Top 10: ASI02 Tool Misuse, ASI05 Unexpected Code Execution
- DSGAI 2026: DSGAI05 Data Integrity and Validation Failures
- Other frameworks: OWASP ASVS V5 · CIS Controls CIS 16 · CWE-79

---

### LLM06 — Excessive Agency

**Severity:** High

LLMs with excessive autonomy execute unintended or harmful actions
when manipulated. ENISA's AI Cybersecurity Challenges taxonomy
includes autonomous AI decision-making as a challenge category,
and the Multilayer Framework Layer 1 governance controls address
human oversight requirements.

**ENISA EU AI Act alignment:** ENISA's guidance on AI Act
implementation directly addresses this — Art. 14 human oversight
requirements are a binding obligation for high-risk AI systems.
ENISA recommends human-in-the-loop design as a governance control
that prevents both AI Act violations and the technical risk of
excessive agency.

#### ENISA mapping

| Reference | Publication | Layer | How it applies |
|---|---|---|---|
| L1-CM-02 Human oversight | Multilayer Framework 2023 | L1 Governance | Human oversight mechanisms — ability to pause, override, and review autonomous AI actions |
| L1-CM-04 AI use policy | Multilayer Framework 2023 | L1 Governance | Organisational policy defining permissible AI autonomous actions — approved use cases documented |
| Autonomous decision-making challenges | AI Cybersecurity Challenges 2020 | Threat taxonomy | Autonomous AI action identified as a cybersecurity challenge requiring governance and technical controls |
| L4-CM-06 Capability constraints | Multilayer Framework 2023 | L4 AI Model | Technical constraints on AI capabilities — tool access scope enforced at the platform layer |

**NIS2 intersection:** Excessive agency incidents involving
disruption of critical services may trigger NIS2 Art. 23 incident
reporting obligations for essential entities.

#### Mitigations by tier

**Foundational**
- L1-CM-04: Establish organisational policy on permissible
  LLM autonomous actions — documented, communicated, enforced,
  aligned with ENISA Layer 1 governance requirements
- L1-CM-02: Require human confirmation for all irreversible
  actions — ENISA human oversight recommendation implemented
  as a mandatory operational control
- L4-CM-06: Enforce least privilege on all LLM tool access —
  minimum scope, regular reviews, per ENISA capability
  constraint guidance

**Hardening**
- L5-CM-01: Log all LLM tool invocations with full context —
  every tool call auditable, ENISA recommends comprehensive
  logging for AI systems with autonomous capabilities
- Deploy action guardrails as independent layer from model —
  ENISA recommends defence-in-depth for autonomous AI systems
- Regular access reviews — any LLM tool permission not
  actively used is removed

**Advanced**
- Formally specify permitted action graphs — only
  pre-approved sequences execute in production
- Conduct red team exercises testing excessive agency
  through indirect injection
- L1-CM-02: Include human oversight mechanisms in AI
  Act conformity assessment evidence — ENISA guidance
  provides the reference for what constitutes adequate oversight

#### Tools

| Tool | Type | Link |
|---|---|---|
| Guardrails AI | Open-source | https://github.com/guardrails-ai/guardrails |
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack, ASI02 Tool Misuse
- DSGAI 2026: DSGAI06 Tool Plugin and Agent Data Exchange
- Other frameworks: EU AI Act Art. 14 · AIUC-1 B006 · ISO 42001 A.6.1.2

---

### LLM07 — System Prompt Leakage

**Severity:** High

System prompts containing internal instructions or security controls
are extracted by adversaries. ENISA addresses this through Layer 3
platform security controls on configuration protection and Layer 4
controls on AI system specification security.

#### ENISA mapping

| Reference | Publication | Layer | How it applies |
|---|---|---|---|
| L3-CM-02 Secure configuration | Multilayer Framework 2023 | L3 Platform | System prompts treated as sensitive configuration — encryption and access controls required |
| L3-CM-03 Secrets management | Multilayer Framework 2023 | L3 Platform | No secrets in cleartext configuration — secret manager required for all sensitive AI system configuration |
| L4-CM-01 Input/output separation | Multilayer Framework 2023 | L4 AI Model | Clear separation between system configuration and user inputs — structural control |
| ETL-AI-T01 (configuration leakage variant) | ENISA Threat Landscape 2024 | Threat intelligence | Configuration data extraction as a reconnaissance sub-technique of adversarial input manipulation |

#### Mitigations by tier

**Foundational**
- L3-CM-02: Classify system prompts as sensitive AI system
  configuration — encrypt at rest, access-controlled,
  version-controlled per ENISA Layer 3 platform controls
- L3-CM-03: Store all system prompt secrets in a secret
  manager — no cleartext in source code, configuration
  files, or environment variables
- Remove all OT-specific identifiers from system prompts —
  use runtime token resolution

**Hardening**
- Conduct prompt extraction testing before each deployment —
  verify extraction resistance under known techniques
- L5-CM-01: Log all access to system prompt storage —
  detect and alert on anomalous access patterns
- Rotate system prompt versions on schedule — limits
  shelf life of any extracted content

**Advanced**
- Implement system prompt tokenisation — sensitive phrases
  replaced with opaque tokens resolved at runtime
- Deploy output classifier to detect and block responses
  containing system prompt content
- Include system prompt leakage in ENISA-aligned AI risk
  assessment — quantify the intelligence value of
  extractable system prompt content per deployment

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack
- DSGAI 2026: DSGAI15 Over-Broad Context Windows
- Other frameworks: AIUC-1 B003/B009 · CWE-200 · ISO 27001 A.5.12

---

### LLM08 — Vector and Embedding Weaknesses

**Severity:** Medium

Weaknesses in vector stores enable adversarial retrieval manipulation
and inference of sensitive information from embeddings. ENISA's
Pseudonymisation Techniques guide provides directly applicable
guidance on protecting vector representations of personal data.

#### ENISA mapping

| Reference | Publication | Layer | How it applies |
|---|---|---|---|
| Pseudonymisation of embeddings | ENISA Pseudonymisation Guide 2019 | Data privacy | Embeddings of personal data are pseudonymous — subject to same protections as underlying personal data |
| L3-CM-04 Data encryption | Multilayer Framework 2023 | L3 Platform | All vector store content encrypted at rest and in transit |
| L3-CM-01 Access control | Multilayer Framework 2023 | L3 Platform | RBAC on all vector store collections — no unauthenticated access |
| L5-CM-02 Anomaly detection | Multilayer Framework 2023 | L5 Monitoring | Anomaly detection on vector store query patterns — bulk extraction and retrieval manipulation detected |

**ENISA pseudonymisation note:** The ENISA Pseudonymisation guide
specifically addresses whether embeddings constitute personal data —
its conclusion that embeddings of personal data retain pseudonymous
characteristics and require appropriate protection is the authoritative
EU position that organisations should reference for GDPR compliance
of embedding stores.

#### Mitigations by tier

**Foundational**
- L3-CM-01: Enable RBAC on all vector store collections —
  no unauthenticated access in any environment including
  development and staging
- L3-CM-04: Encrypt all vector store content at rest —
  ENISA pseudonymisation guidance confirms embeddings of
  personal data require same protection as source data
- Patch all known vector database CVEs promptly

**Hardening**
- L5-CM-02: Implement anomaly detection on vector store
  query patterns — alert on bulk extraction and unusual
  retrieval volumes
- Apply trust-tiered retrieval — weight results by source
  provenance alongside semantic similarity
- Conduct embedding inversion testing — validate source
  content cannot be reconstructed

**Advanced**
- Apply differential privacy in embedding generation for
  sensitive corpora — ENISA Pseudonymisation Guide section
  on statistical disclosure control provides the basis
- L5-CM-02: Integrate vector store anomaly alerts into SIEM —
  unusual patterns treated as potential reconnaissance
  activity per ENISA monitoring recommendations
- Conduct adversarial retrieval testing — attempt to
  manipulate retrieval results through crafted queries

#### Tools

| Tool | Type | Link |
|---|---|---|
| Weaviate | Open-source | https://weaviate.io |
| Qdrant | Open-source | https://qdrant.tech |
| ML Privacy Meter | Open-source | https://github.com/privacytrustlab/ml_privacy_meter |

#### Cross-references
- Agentic Top 10: ASI06 Memory and Context Poisoning
- DSGAI 2026: DSGAI13 Vector Store Platform Security, DSGAI18 Inference and Data Reconstruction
- Other frameworks: NIST AI RMF MS-2.5 · ISO 27001 A.8.3/A.8.24 · GDPR Recital 26

---

### LLM09 — Misinformation

**Severity:** Medium

LLMs generate plausible but incorrect content that users or downstream
systems act upon. ENISA categorises AI-generated disinformation as
ETL-AI-T03 in its threat landscape and addresses factual accuracy
as an AI security challenge in the AI Cybersecurity Challenges report.

**ENISA threat taxonomy reference:** ETL-AI-T03 — AI-generated
disinformation — defined as the use of AI to generate synthetic,
misleading, or false content at scale, including hallucinated factual
claims from LLMs that are not intentionally deceptive but cause harm
through misplaced user trust.

**EU AI Act alignment:** ENISA's AI Act guidance requires that
AI systems do not provide incorrect information in a way that
endangers health, safety, or fundamental rights — this is the
regulatory basis for the misinformation risk controls below.

#### ENISA mapping

| Reference | Publication | Layer | How it applies |
|---|---|---|---|
| ETL-AI-T03 AI-generated disinformation | ENISA Threat Landscape 2024 | Threat intelligence | LLM hallucination and misinformation classified as primary AI threat requiring dedicated detection controls |
| L4-CM-07 Accuracy and reliability | Multilayer Framework 2023 | L4 AI Model | Accuracy and reliability controls — testing programme, confidence thresholds, human verification requirements |
| L1-CM-05 Transparency obligations | Multilayer Framework 2023 | L1 Governance | Disclosure of AI limitations to users — transparency about advisory nature of outputs |
| AI-generated disinformation controls | AI Cybersecurity Challenges 2020 | Technical guidance | Cross-verification, RAG grounding, human oversight for high-stakes AI outputs |

#### Mitigations by tier

**Foundational**
- L1-CM-05: Communicate AI system accuracy limitations to
  all users — ENISA transparency recommendations require
  disclosure of what the system can and cannot reliably do
- Deploy RAG grounded on authoritative, version-controlled
  sources — ENISA AI Cybersecurity Challenges recommends
  retrieval-augmented generation as a misinformation control
- L4-CM-07: Define acceptable accuracy thresholds per use
  case — high-stakes applications require human verification

**Hardening**
- L5-CM-02: Implement production monitoring for hallucination
  patterns — accuracy metrics per domain, drift detected
  and alerted per ENISA anomaly detection recommendations
- L4-CM-07: Implement confidence scoring — low-confidence
  responses flagged for human review before action
- ENISA ETL-AI-T03: Use threat intelligence on
  disinformation techniques to inform detection logic

**Advanced**
- Build automated fact-checking for high-stakes output
  domains — ENISA recommends human-in-the-loop as the
  primary control for AI systems in safety-relevant contexts
- L5-CM-02: Continuous drift detection — alert when accuracy
  degrades beyond thresholds, integrated into SOC monitoring
- Include misinformation in AI risk assessment per ENISA
  AI Cybersecurity Challenges taxonomy — quantify harm
  potential per deployment context

#### Tools

| Tool | Type | Link |
|---|---|---|
| TruLens | Open-source | https://github.com/truera/trulens |
| RAGAS | Open-source | https://github.com/explodinggradients/ragas |
| DeepEval | Open-source | https://github.com/confident-ai/deepeval |

#### Cross-references
- Agentic Top 10: ASI09 Human-Agent Trust Exploitation
- DSGAI 2026: DSGAI21 Disinformation and Integrity Attacks
- Other frameworks: EU AI Act Art. 13/50 · AIUC-1 F · NIST CSF 2.0 GV.OC-01

---

### LLM10 — Unbounded Consumption

**Severity:** Medium

Adversarial inputs trigger disproportionate resource consumption —
causing denial of service or runaway API cost. ENISA addresses
availability as a core requirement under NIS2 and as a Layer 3
platform security control in the Multilayer Framework.

**NIS2 intersection:** NIS2 Art. 21(1) requires entities to take
appropriate measures to prevent incidents and minimise their impact —
resource exhaustion attacks causing service unavailability are in
scope. NIS2 Art. 21(2)(g) specifically requires business continuity
measures, which encompass protection against DoS attacks on AI
infrastructure.

#### ENISA mapping

| Reference | Publication | Layer | How it applies |
|---|---|---|---|
| L3-CM-05 Availability and resilience | Multilayer Framework 2023 | L3 Platform | Rate limiting and resource controls as platform resilience requirements |
| L5-CM-03 Incident response | Multilayer Framework 2023 | L5 Monitoring | Response procedures for availability incidents — automated rate limiting, cost circuit breakers |
| NIS2 Art.21(2)(g) Business continuity | NIS2 Directive 2022 | Regulatory | Business continuity measures covering AI service availability — RTO/RPO defined for LLM services |
| ETL DoS threat category | ENISA Threat Landscape 2024 | Threat intelligence | Denial of service attacks remain a primary threat category — AI infrastructure now in scope |

#### Mitigations by tier

**Foundational**
- L3-CM-05: Implement rate limiting as a platform
  resilience control — hard caps per user, session, and
  API key enforced at the gateway before reaching the model
- Set hard token limits on input and output per request —
  reject requests exceeding thresholds before inference
- L5-CM-01: Monitor LLM resource consumption in real time —
  cost spikes and unusual volume patterns alerted through
  ENISA-recommended monitoring infrastructure

**Hardening**
- L5-CM-03: Define incident response for consumption
  anomalies — automated rate tightening, cost circuit
  breakers, owner notification per ENISA incident
  response recommendations
- NIS2 Art.21(2)(g): Include LLM services in BCP —
  RTO and RPO defined, failover tested, graceful
  degradation verified
- Per-tenant cost budgets with automatic suspension on
  breach — operational control

**Advanced**
- Deploy sponge example detection — inputs designed to
  maximise computation identified and rejected
- Conduct adversarial cost-maximisation testing —
  identify highest-cost inputs for your model and guard
  those paths, document as security testing evidence
- L3-CM-05: Conduct load testing of LLM infrastructure
  under adversarial conditions — verify rate limiting
  and circuit breakers hold, aligned with ENISA resilience
  testing recommendations

#### Tools

| Tool | Type | Link |
|---|---|---|
| LiteLLM | Open-source | https://github.com/BerriAI/litellm |
| Kong Gateway | Open-source | https://github.com/Kong/kong |
| OpenTelemetry | Open-source | https://opentelemetry.io |

#### Cross-references
- Agentic Top 10: ASI08 Cascading Agent Failures
- DSGAI 2026: DSGAI17 Data Availability and Resilience Failures
- Other frameworks: ISA/IEC 62443 SR 7.6 (OT) · CIS Controls CIS 12 · NIST CSF 2.0 PR.IR-01

---

## ENISA Multilayer Framework alignment checklist

Use this checklist to verify ENISA Multilayer Framework Layer coverage
for your LLM application security programme:

### Layer 1 — Governance and Accountability

- [ ] AI risk register maintained — all LLM Top 10 risks assessed (LLM01-LLM10)
- [ ] Acceptable use policy for LLM autonomous actions published (LLM06)
- [ ] Human oversight mechanisms documented and tested (LLM06)
- [ ] AI system limitations disclosed to stakeholders (LLM09)
- [ ] Third-party governance applied to all LLM component vendors (LLM03)

### Layer 2 — Data Quality and Supply Chain

- [ ] Training data classified, quality-controlled, and provenance documented (LLM02, LLM04)
- [ ] Data poisoning controls applied to all training pipelines (LLM04)
- [ ] ML SBOM maintained for all production LLM deployments (LLM03)
- [ ] Supplier security assessments completed for strategic LLM vendors (LLM03)

### Layer 3 — Platform and Infrastructure

- [ ] All LLM data assets encrypted at rest and in transit (LLM02, LLM07, LLM08)
- [ ] RBAC on all vector stores and RAG data sources (LLM02, LLM08)
- [ ] Rate limiting and resource controls implemented (LLM10)
- [ ] BCP coverage for LLM services — RTO/RPO defined (LLM10)
- [ ] System prompts encrypted and access-controlled (LLM07)

### Layer 4 — AI Model Security

- [ ] Input validation implemented on all LLM input channels (LLM01)
- [ ] Output validation before passing to downstream systems (LLM05)
- [ ] Adversarial testing programme active — covers LLM01-LLM05 (LLM01, LLM04)
- [ ] Model integrity verification before each deployment (LLM04)
- [ ] Accuracy thresholds defined and monitored per use case (LLM09)

### Layer 5 — Monitoring and Incident Response

- [ ] Runtime monitoring for injection indicators active (LLM01)
- [ ] DLP monitoring on all LLM output channels (LLM02)
- [ ] Model output anomaly detection integrated into SIEM (LLM04, LLM09)
- [ ] Incident response procedures for all LLM Top 10 entries (LLM01-LLM10)
- [ ] NIS2 incident reporting procedures defined where applicable (LLM02, LLM10)

---

## ENISA AI threat taxonomy coverage

| ENISA Threat | ID | LLM Top 10 entries |
|---|---|---|
| Adversarial input manipulation | ETL-AI-T01 | LLM01 Prompt Injection, LLM07 System Prompt Leakage |
| Data poisoning attacks | ETL-AI-T02 | LLM04 Data and Model Poisoning |
| AI-generated disinformation | ETL-AI-T03 | LLM09 Misinformation |
| Supply chain compromise | ETL (supply chain) | LLM03 Supply Chain Vulnerabilities |
| Privacy violations via AI | ETL (privacy) | LLM02 Sensitive Information Disclosure, LLM08 Vector Weaknesses |
| Denial of service | ETL (DoS) | LLM10 Unbounded Consumption |

---

## NIS2 requirement mapping for LLM applications

Entities in scope of NIS2 (Directive EU 2022/2555) should use this
table to identify which LLM Top 10 risks map to NIS2 Art. 21 measures:

| NIS2 Art.21 Measure | Requirement | Relevant LLM entries |
|---|---|---|
| Art.21(2)(a) Risk management policies | AI risk assessment and treatment | LLM01-LLM10 |
| Art.21(2)(b) Incident handling | Detection, response, notification | LLM01, LLM02, LLM04, LLM10 |
| Art.21(2)(d) Supply chain security | Third-party and supplier security | LLM03 |
| Art.21(2)(e) Network and system security | Secure acquisition and development | LLM01, LLM04, LLM05 |
| Art.21(2)(f) Effectiveness assessment | Cybersecurity testing and evaluation | LLM01, LLM04, LLM09 |
| Art.21(2)(g) Business continuity | Resilience and recovery | LLM10 |
| Art.21(2)(h) Supply chain security | Third-party risk management | LLM03 |

---

## Implementation priority

| Phase | LLM entries | ENISA layers | Rationale |
|---|---|---|---|
| 1 — Do now | LLM01, LLM06 | L1, L4 | Governance policy and input validation — foundational L1/L4 controls |
| 2 — This sprint | LLM02, LLM07 | L2, L3 | Data classification and platform controls — protect what already exists |
| 3 — This quarter | LLM03, LLM04 | L1, L2, L4 | Supply chain and training integrity — pipeline-level changes |
| 4 — Ongoing | LLM05, LLM08, LLM09, LLM10 | L4, L5 | Output security, embedding protection, monitoring, resilience |

---

## References

- ENISA Multilayer Framework for Good Cybersecurity Practices for AI (2023):
  https://www.enisa.europa.eu/publications/multilayer-framework-for-good-cybersecurity-practices-for-ai
- ENISA Threat Landscape 2024:
  https://www.enisa.europa.eu/publications/enisa-threat-landscape-2024
- ENISA Cybersecurity of AI and Standardisation (2023):
  https://www.enisa.europa.eu/publications/cybersecurity-of-ai-and-standardisation
- ENISA Guidelines on Securing Machine Learning Algorithms (2021):
  https://www.enisa.europa.eu/publications/securing-machine-learning-algorithms
- ENISA AI Cybersecurity Challenges (2020):
  https://www.enisa.europa.eu/publications/artificial-intelligence-cybersecurity-challenges
- ENISA Guidelines on Securing the Software Supply Chain (2023):
  https://www.enisa.europa.eu/publications/guidelines-on-securing-the-software-supply-chain
- ENISA Pseudonymisation Techniques and Best Practices (2019):
  https://www.enisa.europa.eu/publications/pseudonymisation-techniques-and-best-practices
- NIS2 Directive (EU 2022/2555):
  https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2555
- OWASP LLM Top 10 2025: https://genai.owasp.org/llm-top-10/

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — LLM01-LLM10 full entries with ENISA Multilayer Framework, NIS2, and threat taxonomy | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
