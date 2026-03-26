<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for LLM Applications 2025 (LLM01-LLM10)
  Framework   : ISO/IEC 42001:2023 — Artificial Intelligence Management System
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# LLM Top 10 2025 x ISO/IEC 42001:2023

Mapping the [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/)
to [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) — the
first international standard for Artificial Intelligence Management
Systems (AIMS), published November 2023.

ISO 42001 is the AI-specific ISMS. Where ISO 27001 governs information
security management broadly, ISO 42001 governs the responsible
development, deployment, and use of AI systems specifically. It follows
the same Annex SL high-level structure as ISO 27001, ISO 9001, and
ISO 27701 — making integration with existing management systems
straightforward for organisations already certified to those standards.

Adoption is accelerating faster than any previous ISO management
system standard. As of 2026 it is referenced by the EU AI Act as a
conformity mechanism for high-risk AI systems, by national AI
strategies across the EU, UK, Canada, and Singapore, and is rapidly
becoming the AI governance certification that procurement teams require
from AI vendors.

ISO 42001 addresses LLM security through three lenses that other
frameworks lack: AI system impact assessment (Annex A control A.6),
AI-specific data governance (A.8), and the concept of AI system
objectives — what the AI is expected to do and within what boundaries
(clause 6). This makes it uniquely suited for LLM risk governance
where the boundary between intended and unintended model behaviour
is the core security challenge.

---

## ISO 42001:2023 structure relevant to LLM security

| Clause / Annex | Title | LLM security relevance |
|---|---|---|
| Clause 4 | Context of the organisation | Stakeholder requirements, AI system scope definition |
| Clause 6 | Planning | AI objectives, risk assessment, AI impact assessment |
| Clause 8 | Operation | AI system development and deployment controls |
| Clause 9 | Performance evaluation | Monitoring, audit, management review |
| Clause 10 | Improvement | Incident response, continual improvement |
| Annex A — A.2 | Policies for AI | Acceptable use, governance policies |
| Annex A — A.3 | Internal organisation | Roles, responsibilities, accountability |
| Annex A — A.4 | Resources for AI systems | Data, tooling, infrastructure governance |
| Annex A — A.5 | Assessing impacts of AI systems | AI impact assessment methodology |
| Annex A — A.6 | AI system life cycle | Development, testing, deployment, operation controls |
| Annex A — A.7 | Data for AI systems | Training data governance, data quality, data provenance |
| Annex A — A.8 | Information for interested parties | Transparency, documentation |
| Annex A — A.9 | Use of AI systems by affected parties | User guidance, oversight mechanisms |
| Annex A — A.10 | Third-party and customer relations | Supplier and customer AI obligations |

---

## Quick-reference summary

| ID | Name | Severity | Primary ISO 42001 Controls | Tier | Scope |
|---|---|---|---|---|---|
| LLM01 | Prompt Injection | Critical | A.6.1.3, A.6.2.4, A.6.2.5, Cl.6.1 | Foundational-Advanced | Both |
| LLM02 | Sensitive Information Disclosure | High | A.7.2, A.7.3, A.7.4, A.6.2.6 | Foundational-Advanced | Both |
| LLM03 | Supply Chain Vulnerabilities | High | A.10.1, A.10.2, A.4.3, A.7.1 | Foundational-Hardening | Both |
| LLM04 | Data and Model Poisoning | Critical | A.7.1, A.7.2, A.6.2.4, A.10.1 | Hardening-Advanced | Both |
| LLM05 | Insecure Output Handling | High | A.6.1.3, A.6.2.4, A.9.1, Cl.8 | Foundational-Hardening | Build |
| LLM06 | Excessive Agency | High | A.6.1.2, A.9.1, A.9.3, A.2.2 | Foundational-Hardening | Both |
| LLM07 | System Prompt Leakage | High | A.6.1.3, A.7.4, A.8.1, Cl.7.5 | Foundational-Hardening | Build |
| LLM08 | Vector and Embedding Weaknesses | Medium | A.7.2, A.7.3, A.6.2.4, A.7.4 | Hardening-Advanced | Build |
| LLM09 | Misinformation | Medium | A.6.2.6, A.8.1, A.9.1, A.5.2 | Foundational-Hardening | Both |
| LLM10 | Unbounded Consumption | Medium | A.6.1.2, Cl.8, A.4.2, Cl.6.1 | Foundational-Hardening | Both |

---

## Audience tags

- **CISO / AI governance lead** — full file, ISO 42001 AIMS for LLM applications
- **ISO 42001 implementer** — control mapping for certification audit evidence
- **Risk manager** — Clause 6 planning, A.5 impact assessment entries
- **AI / ML engineer** — A.6 lifecycle controls, A.7 data governance entries
- **Legal / compliance** — A.8 transparency, A.9 user guidance, A.10 third-party obligations
- **Auditor** — Clause 9 performance evaluation, conformity assessment evidence

---

## Detailed mappings

---

### LLM01 — Prompt Injection

**Severity:** Critical

Malicious instructions in user input or processed content manipulate
LLM behaviour. ISO 42001 addresses this through the AI system lifecycle
controls (A.6) — specifically secure development practices (A.6.1.3)
and operational controls (A.6.2.4/A.6.2.5). Critically, ISO 42001
Clause 6.1 requires that foreseeable risks of AI systems — including
adversarial manipulation — be identified and treated before deployment.

**ISO 42001 framing:** Prompt injection is not just a coding defect —
it is a failure of AI system objective specification. If the system's
objective can be redirected by a malicious actor, the objective was
not adequately specified and bounded (Clause 6.2 — AI objectives).

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Specification of AI system | A.6.1.3 | Annex A-6 | AI system specification includes adversarial robustness requirements — prompt injection as a foreseeable risk documented before development |
| Verification and validation of AI systems | A.6.2.4 | Annex A-6 | Adversarial testing programme covering prompt injection before each production release |
| Documentation of AI system testing | A.6.2.5 | Annex A-6 | Prompt injection test results documented — evidence for certification audit |
| Risk management | Cl.6.1 | Clause 6 | Prompt injection identified and treated in AI risk management process |

#### Mitigations by tier

**Foundational**
- Cl.6.1: Add prompt injection to the AI risk register for
  every LLM deployment — document as a foreseeable risk
  with likelihood, impact, and treatment decision
- A.6.1.3: Include adversarial robustness requirements in
  AI system specification before development — prompt
  injection resistance specified as a non-functional
  requirement
- Treat all external content processed by the LLM as
  untrusted regardless of source — policy documented in
  AIMS operational procedures

**Hardening**
- A.6.2.4: Include prompt injection in the verification and
  validation programme — direct, indirect via RAG, and
  jailbreak vectors tested before each production release
- A.6.2.5: Document all injection test results — retain
  as certification audit evidence demonstrating A.6.2.4
  compliance
- Implement architectural separation between system prompt
  and user input as an A.6.1.3 design control

**Advanced**
- Extend A.6.2.4 testing to cover all indirect injection
  surfaces specific to your deployment — RAG sources,
  tool descriptors, document processing pipelines
- Conduct adversarial testing quarterly — novel injection
  techniques tested before they reach production, results
  documented in AIMS records
- Cl.9.1: Include prompt injection detection rate as a
  monitored performance metric — reviewed in management
  review

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
information through outputs. ISO 42001 A.7 (data for AI systems)
is the primary control domain — data governance obligations under
ISO 42001 extend to training data, RAG corpora, outputs, and all
derived AI data assets.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Data collection | A.7.2 | Annex A-7 | All data entering LLM scope governed — classification, access controls, privacy requirements |
| Data quality and preparation | A.7.3 | Annex A-7 | Data quality controls preventing sensitive data from entering training or retrieval pipelines |
| Data provenance and lineage | A.7.4 | Annex A-7 | Lineage tracking from source data through embeddings and derived assets |
| AI system output documentation | A.6.2.6 | Annex A-6 | LLM output characteristics documented — known leakage risks disclosed to deployers |

#### Mitigations by tier

**Foundational**
- A.7.2: Establish data governance for all data entering
  LLM scope — classification policy applied to training
  data, RAG sources, embeddings, outputs, and observability
  data before ingestion
- A.7.4: Implement data lineage tracking — source through
  preprocessing, embedding, retrieval, generation, and
  logging — auditable provenance chain
- Deploy output scanning for PII and sensitive patterns
  before responses reach users — A.7.2 operational control

**Hardening**
- A.7.3: Implement data quality controls at ingestion —
  sensitive data classification verified before training
  or RAG indexing
- A.6.2.6: Document known output risks in AI system
  documentation — deployers informed of data leakage
  risk profile, classification of data accessible to
  the LLM
- Audit RAG access controls per sprint — verify retrieval
  scope matches authorised user access rights

**Advanced**
- Apply differential privacy in training and embedding
  generation for sensitive corpora — document as A.7.2
  data governance control
- Conduct model inversion red team exercises — validate
  training data cannot be reconstructed from outputs
- A.7.4: Implement machine unlearning readiness — versioned
  data-to-model linkage enabling erasure response

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Nightfall AI | Commercial | https://nightfall.ai |

#### Cross-references
- Agentic Top 10: ASI03 Identity and Privilege Abuse
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI18 Inference and Data Reconstruction
- Other frameworks: ISO 27001 A.8.11/A.8.12 · EU AI Act Art. 10 · NIST AI RMF GV-1.6

---

### LLM03 — Supply Chain Vulnerabilities

**Severity:** High

LLM applications depend on third-party model weights, datasets,
libraries, and plugins. ISO 42001 A.10 (third-party and customer
relations) explicitly governs AI supply chain obligations — the
first international management system standard to do so for AI
specifically.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Third-party AI systems and services | A.10.1 | Annex A-10 | Security requirements applied to all third-party LLM component suppliers — provenance, integrity, disclosure |
| Customer AI systems | A.10.2 | Annex A-10 | Where the organisation supplies AI to customers, obligations passed downstream |
| Tooling and infrastructure | A.4.3 | Annex A-4 | LLM inference infrastructure and tooling managed — version control, integrity verification |
| Data collection | A.7.1 | Annex A-7 | Training data sources governed — provenance and quality requirements for third-party data |

#### Mitigations by tier

**Foundational**
- A.10.1: Establish supplier requirements for all LLM
  component vendors — provenance documentation, integrity
  guarantees, and vulnerability disclosure obligations
  contractually required
- A.4.3: Manage all LLM tooling and infrastructure components —
  version control, approved component list, integrity
  verification before deployment
- Maintain ML SBOM for every production LLM — model,
  adapters, inference runtime, and libraries

**Hardening**
- A.10.1: Conduct periodic security assessments of strategic
  LLM vendors — include in AIMS supplier management
  programme with defined review cadence
- Apply AI system change management to all LLM component
  updates — test in representative environment before
  production deployment
- Verify cryptographic signatures of all components before
  loading — unsigned components rejected

**Advanced**
- Operate isolated model evaluation environment — backdoor
  detection testing before each production promotion,
  results documented as A.6.2.5 test evidence
- A.10.1: Establish responsible disclosure relationship
  with LLM vendors — defined vulnerability notification
  SLA, tested annually
- A.7.1: Governance for all training data sources —
  due diligence on third-party dataset providers equivalent
  to other critical third-party AI dependencies

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
backdoors — effects baked into weights and invisible until a trigger
condition is reached. ISO 42001 A.7 data governance is the primary
control domain — poisoning is fundamentally a data integrity failure
that a well-governed data pipeline should prevent or detect.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Data collection | A.7.1 | Annex A-7 | Training data sourcing governed — approved sources, provenance documentation, quality assessment |
| Data collection | A.7.2 | Annex A-7 | Training data classification and access controls — sensitivity requirements documented |
| Verification and validation | A.6.2.4 | Annex A-6 | Adversarial testing covering poisoning detection before each production model promotion |
| Third-party AI systems | A.10.1 | Annex A-10 | Supply chain security for training data providers and pre-trained model sources |

#### Mitigations by tier

**Foundational**
- A.7.1: Implement training data governance — source
  allowlisting, provenance documentation, quality
  assessment required before any data enters training
- A.7.2: Apply data classification controls to training
  data — sensitivity and integrity requirements documented,
  enforced at ingestion
- Implement model rollback capability — approved clean
  checkpoint always available, tested restoration procedure

**Hardening**
- A.6.2.4: Include poisoning detection in verification and
  validation programme — backdoor trigger testing and
  biased output detection before every production promotion
- A.10.1: Apply supplier security requirements to training
  data providers — provenance and integrity guarantees
  required contractually
- Apply differential privacy during training — document
  as A.7.2 data governance measure

**Advanced**
- Conduct post-training backdoor detection as mandatory
  pre-deployment gate — document as A.6.2.5 test evidence
- A.7.1: Continuous monitoring of training data sources —
  alert on supply chain intelligence indicating compromise
  of approved sources
- Cl.10: Define incident response for confirmed poisoning —
  model rollback procedure, downstream impact assessment,
  improvement actions documented in AIMS

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
ISO 42001 A.6.1.3 system specification and A.6.2.4 verification
require that output security is designed in and tested — not bolted
on after deployment.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Specification of AI system | A.6.1.3 | Annex A-6 | AI system specification includes output handling security requirements — encoding, validation, schema enforcement |
| Verification and validation | A.6.2.4 | Annex A-6 | Output injection scenarios in verification programme — XSS, SQL injection, command injection via LLM output |
| Guidance for affected parties | A.9.1 | Annex A-9 | Deployers receive guidance on safe output handling — documented in AI system documentation |
| Operation of AI system | Cl.8 | Clause 8 | Operational controls requiring output validation before passing to downstream systems |

#### Mitigations by tier

**Foundational**
- A.6.1.3: Include output security requirements in AI system
  specification — encoding, schema validation, and sanitisation
  mandated as non-functional requirements before development
- Cl.8: Establish operational procedures requiring all LLM
  output to be treated as untrusted input to downstream
  systems — never raw output to database queries or shell
- A.9.1: Provide deployers with output handling guidance —
  what validation is required before passing LLM output
  to any downstream consumer

**Hardening**
- A.6.2.4: Include output injection in verification programme —
  XSS, SQL injection, and command injection via LLM output
  tested before each release, results documented
- Implement output schema validation — only outputs
  conforming to defined safe structures passed downstream
- Deploy DAST on all interfaces consuming LLM output

**Advanced**
- Deploy dedicated output security layer independent of
  the LLM — structural guarantee as an A.6.1.3 design
  control
- Extend A.6.2.4 to cover all downstream consumers of
  LLM output including background processing queues
- Cl.9.1: Monitor output rejection rates as a performance
  metric — included in AIMS management review

#### Tools

| Tool | Type | Link |
|---|---|---|
| OWASP ZAP | Open-source | https://www.zaproxy.org |
| Semgrep | Open-source | https://semgrep.dev |

#### Cross-references
- Agentic Top 10: ASI02 Tool Misuse, ASI05 Unexpected Code Execution
- DSGAI 2026: DSGAI05 Data Integrity and Validation Failures, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: OWASP ASVS V5 · CIS Controls CIS 16 · CWE-79

---

### LLM06 — Excessive Agency

**Severity:** High

LLMs with excessive autonomy execute unintended or harmful actions
when manipulated. ISO 42001 addresses this uniquely through A.6.1.2
(intended use and use case definition) — the system's permitted
action scope must be defined before deployment, and A.9 (use by
affected parties) ensures human oversight is built in by design.

**ISO 42001 framing:** Excessive agency is an AI system objective
failure — the system was not adequately bounded in what it is
permitted to do. ISO 42001 Clause 6.2 (AI system objectives) and
A.6.1.2 (intended use) are the governance controls that prevent
this at the design stage rather than detecting it at runtime.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Intended use and use limitations | A.6.1.2 | Annex A-6 | AI system intended use explicitly defines permitted action scope — what the system is and is not permitted to do autonomously |
| Guidance for affected parties | A.9.1 | Annex A-9 | Human oversight requirements documented and communicated to deployers — human confirmation requirements specified |
| Human oversight | A.9.3 | Annex A-9 | Human oversight mechanisms implemented — ability to pause, override, and review agent actions |
| Policies for AI | A.2.2 | Annex A-2 | Organisational policy on acceptable AI autonomous actions — documented and enforced |

#### Mitigations by tier

**Foundational**
- A.6.1.2: Define AI system intended use explicitly —
  document what the system is and is not permitted to do
  autonomously, what tool access is in scope, what requires
  human confirmation
- A.2.2: Establish organisational policy on permissible
  AI autonomous actions — documented in AIMS policy
  framework, reviewed annually
- Require human confirmation for all irreversible actions —
  documented as A.9.3 human oversight mechanism

**Hardening**
- A.9.1: Provide deployers with human oversight guidance —
  which actions require human confirmation, how to configure
  approval workflows, how to disable autonomous features
- A.9.3: Implement and document human oversight mechanisms —
  pause/stop controls, override capability, approval
  workflows — as certification audit evidence
- Enforce least privilege on all tool access — A.6.1.2
  intended use boundary enforced at the orchestration layer

**Advanced**
- A.6.1.2: Formally specify permitted action graphs —
  only pre-approved action sequences can execute in
  production, deviation triggers suspension
- Conduct red team exercises testing excessive agency
  through indirect injection — document results as
  A.6.2.4 verification evidence
- Cl.9.1: Monitor human confirmation rates as performance
  metric — unusually low confirmation rates indicate
  possible bypass

#### Tools

| Tool | Type | Link |
|---|---|---|
| Guardrails AI | Open-source | https://github.com/guardrails-ai/guardrails |
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack, ASI02 Tool Misuse
- DSGAI 2026: DSGAI06 Tool Plugin and Agent Data Exchange
- Other frameworks: AIUC-1 B006 · EU AI Act Art. 14 · ISO 27001 A.8.2

---

### LLM07 — System Prompt Leakage

**Severity:** High

System prompts containing internal instructions or security controls
are extracted by adversaries. ISO 42001 A.8.1 (information for
interested parties) and Clause 7.5 (documented information) govern
what AI system information is disclosed and how configuration
data is protected.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Specification of AI system | A.6.1.3 | Annex A-6 | System prompt treated as sensitive AI system configuration — access controls and encryption required |
| Data provenance and lineage | A.7.4 | Annex A-7 | System prompt version control — changes tracked, access logged |
| Information for interested parties | A.8.1 | Annex A-8 | What system information is disclosed to users vs kept confidential — transparency without exposing security controls |
| Documented information | Cl.7.5 | Clause 7 | System prompts controlled as documented information — version control, access control, retention |

#### Mitigations by tier

**Foundational**
- Cl.7.5: Control system prompts as documented information —
  version controlled, access controlled, retention policy
  applied, not stored in cleartext source code
- A.6.1.3: Classify system prompts as sensitive AI system
  configuration — subject to the same protection as
  application secrets and operational configuration
- A.7.4: Implement version control for system prompts —
  changes tracked, access logged, deviation detectable

**Hardening**
- A.8.1: Define what system information is disclosed to
  users — transparency requirements met without exposing
  security-sensitive configuration details
- Conduct prompt extraction testing before each deployment —
  verify extraction resistance under known techniques
- Remove all secrets and sensitive identifiers from system
  prompts — use runtime token resolution

**Advanced**
- Implement system prompt tokenisation — sensitive
  identifiers replaced with opaque tokens resolved at runtime
- Deploy output classifier to detect and block responses
  containing system prompt content
- Cl.9.1: Include prompt extraction incident detection
  as a monitored security metric

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack
- DSGAI 2026: DSGAI15 Over-Broad Context Windows
- Other frameworks: AIUC-1 B003/B009 · CWE-200 · NIST CSF 2.0 PR.DS-01

---

### LLM08 — Vector and Embedding Weaknesses

**Severity:** Medium

Weaknesses in vector stores enable adversarial retrieval manipulation
and inference of sensitive information from embeddings. ISO 42001
A.7 data governance applies to embeddings as derived AI data assets.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Data collection | A.7.2 | Annex A-7 | Embeddings classified and protected as derived data assets — access controls and encryption required |
| Data quality and preparation | A.7.3 | Annex A-7 | Quality and integrity controls on all content before embedding generation |
| Verification and validation | A.6.2.4 | Annex A-6 | Vector store security testing — RBAC bypass, path traversal, embedding inversion scenarios |
| Data provenance and lineage | A.7.4 | Annex A-7 | Lineage from source document through embedding — classification inheritance documented |

#### Mitigations by tier

**Foundational**
- A.7.2: Classify all embeddings as derived AI data assets —
  same access controls and encryption as source documents,
  documented in AI system data governance records
- Enable RBAC on all vector store collections — A.7.2
  access control requirement, no unauthenticated access
  in any environment
- Patch all known vector database CVEs — A.4.3 tooling
  management requirement

**Hardening**
- A.7.3: Implement content integrity controls at ingestion —
  only hash-verified authorised documents admitted to
  the AI knowledge base
- A.6.2.4: Include vector store security in verification
  programme — RBAC bypass, path traversal, and bulk
  extraction scenarios tested
- Apply trust-tiered retrieval — weight results by source
  provenance alongside semantic similarity

**Advanced**
- Apply differential privacy in embedding generation for
  sensitive corpora — document privacy budget as A.7.2
  data governance measure
- Conduct embedding inversion testing — validate source
  content cannot be reconstructed, document as A.6.2.5
  test evidence
- A.7.4: Lineage documentation ensuring all embeddings
  traceable to their source with classification inheritance

#### Tools

| Tool | Type | Link |
|---|---|---|
| Weaviate | Open-source | https://weaviate.io |
| Qdrant | Open-source | https://qdrant.tech |
| ML Privacy Meter | Open-source | https://github.com/privacytrustlab/ml_privacy_meter |

#### Cross-references
- Agentic Top 10: ASI06 Memory and Context Poisoning
- DSGAI 2026: DSGAI13 Vector Store Platform Security, DSGAI18 Inference and Data Reconstruction
- Other frameworks: NIST AI RMF MS-2.5 · ISO 27001 A.8.3/A.8.24 · CWE-284

---

### LLM09 — Misinformation

**Severity:** Medium

LLMs generate plausible but incorrect content that users or downstream
systems act upon. ISO 42001 is the only framework in this repository
that treats AI accuracy and truthfulness as a first-class management
system objective — Clause 6.2 (AI objectives) and A.5.2 (assessment
of AI system impacts) make accuracy governance a governance requirement,
not an engineering discretion.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Assessment of AI system impacts | A.5.2 | Annex A-5 | Misinformation risk assessed in AI impact assessment — harm potential of incorrect outputs quantified |
| Information for interested parties | A.8.1 | Annex A-8 | AI system accuracy limitations disclosed to deployers and users — what the system cannot reliably do |
| Guidance for affected parties | A.9.1 | Annex A-9 | Users and operators provided with guidance on output verification requirements |
| Policies for AI | A.2.2 | Annex A-2 | Organisational policy on acceptable AI output accuracy — verification requirements per use case |

#### Mitigations by tier

**Foundational**
- A.8.1: Disclose AI system accuracy limitations in
  documentation — what domains the system is reliable in,
  what requires independent verification, what use cases
  are out of scope
- A.9.1: Provide users and operators with verification
  guidance — training on LLM output limitations before
  access is granted
- A.2.2: Establish organisational policy on acceptable
  accuracy thresholds — use cases requiring high accuracy
  require human verification before action

**Hardening**
- A.5.2: Conduct AI impact assessment covering misinformation
  risk — harm potential of incorrect outputs quantified
  per deployment context and use case
- Deploy production monitoring for hallucination patterns —
  accuracy metrics tracked per domain, drift detected
- Deploy RAG grounded on authoritative, version-controlled
  sources — not uncontrolled web content

**Advanced**
- Cl.6.2: Include accuracy objectives in AI system
  objectives — measurable targets reviewed in management
  review (Cl.9.3)
- Build automated fact-checking for high-stakes output
  domains — accuracy gate before responses reach regulated
  workflows
- A.5.2: Update impact assessment when model is updated —
  accuracy characteristics may change post fine-tuning

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
causing denial of service or runaway API cost. ISO 42001 Clause 6.1
risk management and A.4.2 (computational resources) require that
resource consumption risks are identified and treated before deployment.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Intended use and use limitations | A.6.1.2 | Annex A-6 | Resource consumption limits documented as AI system operational constraints |
| Operation | Cl.8 | Clause 8 | Operational controls for rate limiting and resource management — implemented as AIMS operational procedures |
| Resources | A.4.2 | Annex A-4 | Computational resources managed — LLM infrastructure capacity planning and protection |
| Risk management | Cl.6.1 | Clause 6 | Resource exhaustion identified as a foreseeable risk — treatment controls documented |

#### Mitigations by tier

**Foundational**
- Cl.6.1: Include resource exhaustion in AI risk assessment —
  document as a foreseeable risk with treatment controls
  for each LLM deployment
- Cl.8: Implement rate limiting and token limits as
  operational controls — documented in AIMS operational
  procedures, enforced at deployment
- A.4.2: Include LLM infrastructure capacity planning
  in resource management — peak load, cost caps, and
  scaling limits defined

**Hardening**
- A.6.1.2: Document resource consumption constraints in
  AI system intended use — per-user limits, session limits,
  cost budgets defined as system constraints
- Implement per-tenant cost budgets with automatic
  suspension on breach — operational control
- Define incident response for consumption anomalies —
  automated rate tightening, cost circuit breakers,
  owner notification

**Advanced**
- Deploy sponge example detection — inputs designed to
  maximise computation identified and rejected
- Conduct adversarial cost-maximisation testing —
  document as A.6.2.4 verification evidence
- Cl.9.1: Monitor resource consumption as a performance
  metric — cost per query, peak usage trends reviewed
  in management review

#### Tools

| Tool | Type | Link |
|---|---|---|
| LiteLLM | Open-source | https://github.com/BerriAI/litellm |
| Kong Gateway | Open-source | https://github.com/Kong/kong |
| OpenTelemetry | Open-source | https://opentelemetry.io |

#### Cross-references
- Agentic Top 10: ASI08 Cascading Agent Failures
- DSGAI 2026: DSGAI17 Data Availability and Resilience Failures
- Other frameworks: ISA/IEC 62443 SR 7.6 (OT) · CIS Controls CIS 4 · NIST CSF 2.0 PR.IR-01

---

## ISO 42001 AIMS implementation checklist for LLM applications

### Context and planning (Clauses 4-6)

- [ ] LLM systems identified within AIMS scope (Cl.4.3)
- [ ] Stakeholder requirements for LLM applications documented (Cl.4.2)
- [ ] All 10 LLM Top 10 risks assessed in AI risk register (Cl.6.1)
- [ ] AI system objectives defined per deployment including accuracy targets (Cl.6.2)
- [ ] AI impact assessment completed for each LLM deployment (A.5.2)

### AI system lifecycle (Annex A.6)

- [ ] Intended use and use limitations documented per system (A.6.1.2)
- [ ] AI system specification includes security requirements (A.6.1.3)
- [ ] Verification and validation programme covers LLM01, LLM04, LLM05 (A.6.2.4)
- [ ] Test results documented and retained as audit evidence (A.6.2.5)
- [ ] Output characteristics and known risks documented (A.6.2.6)

### Data governance (Annex A.7)

- [ ] All training data and RAG sources governed (A.7.1, A.7.2)
- [ ] Data quality controls implemented at ingestion (A.7.3)
- [ ] Data provenance and lineage documented (A.7.4)
- [ ] Embeddings and derived assets classified and protected (A.7.2)

### Third-party relations (Annex A.10)

- [ ] Supplier security requirements applied to all LLM component vendors (A.10.1)
- [ ] Customer AI obligations documented for downstream deployers (A.10.2)

### User guidance and oversight (Annex A.9)

- [ ] Deployer guidance documents published (A.9.1)
- [ ] Human oversight mechanisms implemented and documented (A.9.3)
- [ ] User training on LLM limitations completed before access (A.9.1)

### Performance evaluation (Clause 9)

- [ ] Performance metrics defined for each LLM deployment (Cl.9.1)
- [ ] Internal audit programme covers LLM security controls (Cl.9.2)
- [ ] Management review includes AI risk and performance data (Cl.9.3)

---

## Implementation priority

| Phase | LLM entries | ISO 42001 controls | Rationale |
|---|---|---|---|
| 1 — Do now | LLM01, LLM06 | A.6.1.2, A.6.1.3, Cl.6.1 | Specification and intended use controls prevent the most common attack paths by design |
| 2 — This sprint | LLM02, LLM03 | A.7.1/7.2, A.10.1 | Data governance and supplier requirements protect the foundational data pipeline |
| 3 — This quarter | LLM04, LLM05 | A.6.2.4, A.7.1 | Verification programme and training data integrity require pipeline-level changes |
| 4 — Ongoing | LLM07-LLM10 | A.8.1, A.9.1, Cl.9.1 | Transparency, user guidance, and performance monitoring hardening |

---

## ISO 42001 and ISO 27001 integration note

ISO 42001 follows the Annex SL structure — organisations with ISO
27001 certification can integrate an AIMS with minimal duplication.
Key integration points for LLM security:

- Cl.6.1 AI risk assessment integrates with ISO 27001 A.8.2 risk
  assessment — LLM risks managed in a unified risk register
- A.7 data governance extends ISO 27001 A.5.12 classification to
  AI-specific derived assets
- A.10.1 third-party requirements extend ISO 27001 A.5.19 supplier
  relationships to AI-specific obligations
- Cl.9.2 internal audit programme can be shared — AI-specific
  audit criteria added to existing ISO 27001 audit scope

---

## References

- ISO/IEC 42001:2023: https://www.iso.org/standard/81230.html
- ISO/IEC 42001 overview: https://www.iso.org/obp/ui/#iso:std:iso-iec:42001:ed-1:v1:en
- OWASP LLM Top 10 2025: https://genai.owasp.org/llm-top-10/
- ISO/IEC 42001 and EU AI Act alignment: https://www.iso.org/artificial-intelligence
- ISO 42001 and ISO 27001 integration guidance: https://www.iso.org/standard/81230.html

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — LLM01-LLM10 full entries with AIMS checklist | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
