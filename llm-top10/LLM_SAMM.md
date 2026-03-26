<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for LLM Applications 2025 (LLM01-LLM10)
  Framework   : OWASP Software Assurance Maturity Model (SAMM) v2.0
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# LLM Top 10 2025 x OWASP SAMM v2.0

Mapping the [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/)
to [OWASP SAMM v2.0](https://owaspsamm.org) — the Software Assurance
Maturity Model, the open framework for building security into the
software development lifecycle through measurable, incremental practice
improvement.

---

## Why SAMM for LLM security

SAMM is the only framework in this repository that is explicitly
lifecycle-oriented. Where ISO 27001, NIST CSF, and CIS Controls tell
you what controls to implement, SAMM tells you how to build the
organisational capability to implement and sustain those controls
across the software development lifecycle.

For LLM applications, this matters for three reasons:

**LLM security is a development problem, not just an operational one.**
The most dangerous LLM vulnerabilities — prompt injection (LLM01),
data and model poisoning (LLM04), and supply chain risks (LLM03) —
are introduced during development and cannot be fully addressed by
operational controls alone. SAMM's SDL practices are the governance
mechanism that prevents these vulnerabilities from being built in.

**LLM security requires new developer skills.** Developers who
understand web application security do not automatically understand
LLM-specific attack surfaces. SAMM's Education and Guidance practice
provides the maturity model for building the AI security literacy
that LLM development teams need.

**Maturity is the right frame for LLM security.** Most organisations
are at SAMM maturity level 0 or 1 for LLM-specific security practices.
SAMM's crawl-walk-run model maps directly to the Foundational-Hardening-
Advanced tiers used throughout this repository.

---

## SAMM v2.0 structure

SAMM organises security activities into five Business Functions, each
containing three Security Practices, each measured at three maturity
levels:

| Business Function | Security Practices |
|---|---|
| Governance | Strategy and Metrics, Policy and Compliance, Education and Guidance |
| Design | Threat Assessment, Security Requirements, Security Architecture |
| Implementation | Secure Build, Secure Deployment, Defect Management |
| Verification | Architecture Assessment, Requirements-driven Testing, Security Testing |
| Operations | Incident Management, Environment Management, Operational Management |

**Maturity levels:**
- **Level 1** — Initial understanding and ad hoc practice
- **Level 2** — Increased efficiency and/or effectiveness of practice
- **Level 3** — Comprehensive mastery of practice at scale

---

## Quick-reference summary

| ID | Name | Severity | Primary SAMM Practices | Maturity Target | Tier |
|---|---|---|---|---|---|
| LLM01 | Prompt Injection | Critical | ST (Security Testing), SA (Security Architecture), EG (Education and Guidance) | L2-L3 | Foundational-Advanced |
| LLM02 | Sensitive Information Disclosure | High | SR (Security Requirements), SA (Security Architecture), IM (Incident Management) | L1-L3 | Foundational-Advanced |
| LLM03 | Supply Chain Vulnerabilities | High | SB (Secure Build), SM (Strategy and Metrics), PC (Policy and Compliance) | L1-L3 | Foundational-Hardening |
| LLM04 | Data and Model Poisoning | Critical | TA (Threat Assessment), ST (Security Testing), SB (Secure Build) | L2-L3 | Hardening-Advanced |
| LLM05 | Insecure Output Handling | High | SR (Security Requirements), SA (Security Architecture), RT (Requirements-driven Testing) | L1-L2 | Foundational-Hardening |
| LLM06 | Excessive Agency | High | SA (Security Architecture), TA (Threat Assessment), EG (Education and Guidance) | L1-L3 | Foundational-Hardening |
| LLM07 | System Prompt Leakage | High | SA (Security Architecture), SR (Security Requirements), EM (Environment Management) | L1-L2 | Foundational-Hardening |
| LLM08 | Vector and Embedding Weaknesses | Medium | SA (Security Architecture), SR (Security Requirements), ST (Security Testing) | L2-L3 | Hardening-Advanced |
| LLM09 | Misinformation | Medium | TA (Threat Assessment), EG (Education and Guidance), OM (Operational Management) | L1-L2 | Foundational-Hardening |
| LLM10 | Unbounded Consumption | Medium | SA (Security Architecture), EM (Environment Management), IM (Incident Management) | L1-L2 | Foundational-Hardening |

---

## Audience tags

- **CISO / security programme lead** — full file, SAMM maturity roadmap for LLM security
- **AppSec lead** — SAMM practice mapping, maturity targets per LLM risk
- **Developer / AI engineer** — Education and Guidance (EG) entries per vulnerability
- **Security architect** — Security Architecture (SA) entries throughout
- **Compliance officer** — Policy and Compliance (PC) entries, maturity benchmarking
- **Security testing lead** — Security Testing (ST), Requirements-driven Testing (RT) entries

---

## SAMM practice abbreviations

| Abbrev | Practice | Function |
|---|---|---|
| SM | Strategy and Metrics | Governance |
| PC | Policy and Compliance | Governance |
| EG | Education and Guidance | Governance |
| TA | Threat Assessment | Design |
| SR | Security Requirements | Design |
| SA | Security Architecture | Design |
| SB | Secure Build | Implementation |
| SD | Secure Deployment | Implementation |
| DM | Defect Management | Implementation |
| AA | Architecture Assessment | Verification |
| RT | Requirements-driven Testing | Verification |
| ST | Security Testing | Verification |
| IM | Incident Management | Operations |
| EM | Environment Management | Operations |
| OM | Operational Management | Operations |

---

## Detailed mappings

---

### LLM01 — Prompt Injection

**Severity:** Critical

Malicious instructions in user input or processed content manipulate
LLM behaviour. SAMM addresses this through Security Testing (ST) —
adversarial testing for injection is a security testing activity —
Security Architecture (SA) — structural separation between system
prompt and user input is an architecture control — and Education
and Guidance (EG) — developers cannot write injection-resistant
code without understanding the attack surface.

**SAMM maturity target:** ST Level 2 (structured security testing
programme including LLM-specific scenarios), SA Level 2 (reference
architecture for LLM integration includes injection resistance as
an explicit design requirement), EG Level 1 (all LLM developers
have received injection-specific security training).

#### SAMM mapping

| Practice | Activity | Level | How it applies |
|---|---|---|---|
| Security Testing (ST) | Implement security testing of LLM integrations | L2 | Adversarial testing programme covers prompt injection before each release — direct, indirect via RAG, jailbreak |
| Security Architecture (SA) | Define security principles for LLM architecture | L2 | Architectural principle: structural separation between system prompt and user input — documented in reference architecture |
| Education and Guidance (EG) | Provide role-specific LLM security training | L1 | All developers building LLM integrations trained on prompt injection attack patterns and mitigations |
| Threat Assessment (TA) | Threat modelling for LLM integrations | L2 | All LLM data flows threat-modelled — every injection path from user input to model context identified |

#### Mitigations by SAMM maturity

**Level 1 — Initial**
- EG: Provide baseline prompt injection security training
  for all developers building LLM integrations — attack
  patterns, mitigation techniques, secure coding practices
- TA: Document prompt injection as a foreseeable threat
  in the LLM application threat model — assign ownership
  and treatment decision
- Implement basic input validation — treat all external
  content as untrusted, enforce through code review

**Level 2 — Managed**
- ST: Establish structured security testing for LLM
  integrations covering injection scenarios — direct,
  indirect via RAG, and jailbreak vectors before each release
- SA: Define architectural reference for LLM integration —
  structural separation between system prompt and user input
  as a documented design principle
- TA: Conduct regular threat modelling for each LLM
  integration — all injection paths documented and
  treatment controls assigned

**Level 3 — Defined**
- ST: Extend adversarial testing to cover all indirect
  injection surfaces — RAG sources, tool descriptors,
  document processing pipelines specific to your deployment
- SA: Enforce reference architecture through automated
  design review — deviation from separation principle
  blocks deployment
- EG: Develop LLM security champions programme — team
  members with deep injection expertise guide others

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| PyRIT | Open-source | https://github.com/Azure/PyRIT |

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: ISO 27001 A.8.28 · NIST AI RMF MS-2.5 · OWASP ASVS V5.1

---

### LLM02 — Sensitive Information Disclosure

**Severity:** High

LLMs expose PII, financial data, proprietary code, or confidential
information through outputs. SAMM addresses this through Security
Requirements (SR) — data handling requirements must be explicitly
specified before development — and Security Architecture (SA) —
the architecture must enforce data classification and output
scanning as structural controls.

**SAMM maturity target:** SR Level 2 (LLM data handling requirements
defined and tracked through development), SA Level 2 (output redaction
and access-controlled retrieval as standard architectural patterns),
IM Level 1 (incident response for data disclosure events defined).

#### SAMM mapping

| Practice | Activity | Level | How it applies |
|---|---|---|---|
| Security Requirements (SR) | Define data handling requirements for LLM | L2 | All LLM data handling requirements explicitly specified — data classification, output scanning, access controls |
| Security Architecture (SA) | Enforce output security in reference architecture | L2 | Output redaction and access-controlled retrieval as standard patterns in LLM reference architecture |
| Incident Management (IM) | Define incident response for data disclosure | L1 | Incident response procedure for LLM data disclosure events — notification, containment, regulatory reporting |
| Requirements-driven Testing (RT) | Test data handling requirements | L1 | Test cases for each LLM data handling requirement — PII in outputs, over-retrieval, embedding exposure |

#### Mitigations by SAMM maturity

**Level 1 — Initial**
- SR: Define minimum data handling requirements for all
  LLM integrations — classify data in LLM scope, specify
  output scanning requirement, document before development
- IM: Define incident response for data disclosure —
  who is notified, what is contained, regulatory reporting
  timelines documented
- RT: Include data disclosure test cases in acceptance
  criteria — PII in outputs, over-retrieval from RAG

**Level 2 — Managed**
- SA: Enforce output redaction and access-controlled
  retrieval as standard architectural patterns — documented
  in reference architecture, reviewed in architecture
  assessment
- SR: Track data handling requirements through development —
  requirements traceability from specification to
  implementation and test verification
- Conduct RAG access control audit per release — verify
  retrieval scope matches authorised user access

**Level 3 — Defined**
- ST: Include model inversion and membership inference
  in advanced security testing programme — validate
  training data cannot be reconstructed from outputs
- SA: Apply differential privacy as a standard pattern
  for sensitive training corpora — documented in reference
  architecture with implementation guidance
- EG: Train data engineers on LLM-specific data governance —
  embedding classification, derived asset protection

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Nightfall AI | Commercial | https://nightfall.ai |

#### Cross-references
- Agentic Top 10: ASI03 Identity and Privilege Abuse
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI18 Inference and Data Reconstruction
- Other frameworks: ISO 27001 A.8.11/A.8.12 · EU AI Act Art. 10 · GDPR Art. 25

---

### LLM03 — Supply Chain Vulnerabilities

**Severity:** High

LLM applications depend on third-party model weights, datasets,
libraries, and plugins. SAMM Secure Build (SB) is the primary practice —
LLM component integrity verification and ML SBOM generation are
secure build activities. Policy and Compliance (PC) provides the
governance framework for supplier security requirements.

**SAMM maturity target:** SB Level 2 (ML SBOM generated automatically
in build pipeline, component integrity verified), PC Level 2 (supplier
security policy applies to all LLM vendors, assessment process defined),
SM Level 2 (AI supply chain risk included in security programme strategy).

#### SAMM mapping

| Practice | Activity | Level | How it applies |
|---|---|---|---|
| Secure Build (SB) | Integrate SBOM and integrity checks into build pipeline | L2 | ML SBOM generated automatically, component signatures verified — unsigned components rejected in CI/CD |
| Policy and Compliance (PC) | Establish supplier security policy for LLM vendors | L2 | Supplier security requirements applied to all LLM component vendors — assessment process, contractual obligations |
| Strategy and Metrics (SM) | Include AI supply chain in security programme | L2 | LLM supply chain risk included in security programme strategy — metrics tracked, ownership assigned |

#### Mitigations by SAMM maturity

**Level 1 — Initial**
- SB: Maintain manual ML SBOM for all production LLM
  deployments — model, adapters, inference libraries
  inventoried with version and source
- PC: Establish minimum supplier security requirements
  for LLM component vendors — provenance documentation
  and vulnerability disclosure required
- Pin all component versions — no automatic updates
  in production without review

**Level 2 — Managed**
- SB: Automate ML SBOM generation and component integrity
  verification in CI/CD pipeline — unsigned components
  blocked from deployment automatically
- PC: Implement supplier assessment process for LLM
  vendors — security posture evaluated before use,
  reassessed annually for strategic vendors
- SM: Include AI supply chain metrics in security
  programme dashboard — open vulnerabilities in LLM
  dependencies tracked and reported

**Level 3 — Defined**
- SB: Operate isolated component evaluation environment —
  backdoor detection and behavioural testing before
  each production promotion, automated where possible
- PC: Establish responsible disclosure relationship with
  all strategic LLM vendors — defined notification SLA,
  escalation path, tested annually
- ST: Include supply chain integrity in penetration
  testing programme — attempt to introduce compromised
  components and verify detection mechanisms

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
backdoors — effects baked into weights and invisible until triggered.
SAMM Threat Assessment (TA) is the governance anchor — poisoning
must be identified as a foreseeable threat in the SDL before controls
are designed. Security Testing (ST) provides the adversarial testing
gate. Secure Build (SB) covers training pipeline integrity.

**SAMM maturity target:** TA Level 2 (data and model poisoning
as documented threats in all LLM threat assessments), ST Level 2
(poisoning detection in security testing programme), SB Level 2
(training pipeline integrity controls automated in build process).

#### SAMM mapping

| Practice | Activity | Level | How it applies |
|---|---|---|---|
| Threat Assessment (TA) | Document data and model poisoning as foreseeable threats | L2 | Poisoning threats documented per LLM deployment — training data sources, fine-tuning pipeline, supply chain attack vectors |
| Security Testing (ST) | Include poisoning detection in testing programme | L2 | Backdoor trigger testing and biased output detection before every production model promotion |
| Secure Build (SB) | Implement training pipeline integrity controls | L2 | Source allowlisting, data provenance, anomaly detection, model integrity verification automated in build |
| Defect Management (DM) | Track model integrity defects | L2 | Poisoning findings tracked through defect management — severity, ownership, remediation timeline |

#### Mitigations by SAMM maturity

**Level 1 — Initial**
- TA: Document data and model poisoning as threats in
  LLM application threat models — training data sources,
  fine-tuning pipelines, supply chain attack vectors
- SB: Implement basic training data governance — source
  allowlisting, provenance documentation, version control
  on all training datasets
- Establish model rollback capability — clean checkpoint
  always available, tested restoration procedure

**Level 2 — Managed**
- ST: Include poisoning detection in security testing
  programme — backdoor trigger testing before every
  production model promotion, results tracked in DM
- SB: Automate training pipeline integrity controls —
  data anomaly detection, model hash verification
  integrated into CI/CD pipeline
- DM: Track model integrity findings through defect
  management — severity classification, owner assignment,
  remediation gates before production promotion

**Level 3 — Defined**
- ST: Conduct post-training backdoor detection as a
  mandatory pre-deployment gate — neural cleanse or
  equivalent, documented in security testing standards
- TA: Establish threat intelligence process for poisoning
  campaigns — relevant sector incidents inform testing
  and detection logic updates
- SA: Apply differential privacy as a standard training
  pattern for sensitive data — documented in development
  standards with implementation guidance

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
SAMM Security Requirements (SR) must specify output handling security
before development. Requirements-driven Testing (RT) verifies those
requirements are met.

**SAMM maturity target:** SR Level 1 (output handling security
requirements defined for all LLM integrations), RT Level 1 (output
injection test cases in acceptance criteria), SA Level 1 (output as
untrusted in standard LLM architectural pattern).

#### SAMM mapping

| Practice | Activity | Level | How it applies |
|---|---|---|---|
| Security Requirements (SR) | Define output handling security requirements | L1 | LLM output handling requirements specified before development — encoding, validation, schema enforcement mandatory |
| Security Architecture (SA) | Include output security in reference architecture | L1 | LLM reference architecture treats model output as untrusted input — encoding and validation as standard patterns |
| Requirements-driven Testing (RT) | Test output handling requirements | L1 | Test cases for output injection in acceptance criteria — XSS, SQL injection, command injection via LLM output |

#### Mitigations by SAMM maturity

**Level 1 — Initial**
- SR: Define output handling security requirements before
  development — LLM output treated as untrusted input
  to all downstream systems, encoding and sanitisation
  mandatory, documented in requirements
- SA: Include output security patterns in LLM reference
  architecture — developers follow established pattern
  rather than designing from scratch
- RT: Include output injection test cases in acceptance
  criteria — XSS, SQL injection, and command injection
  via LLM output verified before each release

**Level 2 — Managed**
- ST: Include output injection in structured security
  testing programme — DAST on all interfaces consuming
  LLM output, results tracked
- SR: Track output handling requirements through development —
  traceability from specification to implementation
  and test verification
- SA: Enforce output security patterns through architecture
  review — deviation from reference architecture blocked

**Level 3 — Defined**
- ST: Conduct adversarial output testing — attempt
  injection via LLM-generated content against your
  specific downstream consumers, document results
- SA: Deploy dedicated output security layer independent
  of the LLM — architectural guarantee documented in
  design standards

#### Tools

| Tool | Type | Link |
|---|---|---|
| OWASP ZAP | Open-source | https://www.zaproxy.org |
| Semgrep | Open-source | https://semgrep.dev |

#### Cross-references
- Agentic Top 10: ASI02 Tool Misuse, ASI05 Unexpected Code Execution
- DSGAI 2026: DSGAI05 Data Integrity and Validation Failures
- Other frameworks: OWASP ASVS V5 · CIS Controls CIS 16 · CWE-79

---

### LLM06 — Excessive Agency

**Severity:** High

LLMs with excessive autonomy execute unintended or harmful actions.
SAMM Security Architecture (SA) is the primary practice — least
privilege and human oversight must be architectural principles, not
afterthoughts. Threat Assessment (TA) must model the blast radius
of excessive agency. Education and Guidance (EG) must ensure
developers understand autonomous action risks.

**SAMM maturity target:** SA Level 2 (least privilege and human
oversight as documented architectural principles for all LLM
integrations), TA Level 2 (excessive agency scenarios in threat
models with blast radius quantified), EG Level 1 (developers trained
on autonomous action risks and mitigation patterns).

#### SAMM mapping

| Practice | Activity | Level | How it applies |
|---|---|---|---|
| Security Architecture (SA) | Define least privilege architecture for LLM tools | L2 | Least privilege and human oversight as documented architectural principles — minimum tool scope, confirmation gates for irreversible actions |
| Threat Assessment (TA) | Model excessive agency blast radius | L2 | What autonomous actions can an LLM take, what is the blast radius, what are the physical/financial consequences |
| Education and Guidance (EG) | Train developers on autonomous action risks | L1 | All developers building LLM tool integrations trained on excessive agency risks and human oversight patterns |
| Strategy and Metrics (SM) | Include autonomous action governance in programme | L1 | LLM autonomous action policy in security programme — acceptable use documented, ownership assigned |

#### Mitigations by SAMM maturity

**Level 1 — Initial**
- SA: Establish minimum principle of least privilege
  for all LLM tool access — read-only by default, write
  requires documented justification, documented in
  development standards
- EG: Provide developers with autonomy risk training —
  excessive agency attack patterns, human confirmation
  requirements, tool permission scoping
- SM: Document organisational policy on permissible LLM
  autonomous actions — approved use cases, confirmation
  requirements, reviewed annually

**Level 2 — Managed**
- SA: Document least privilege and human oversight as
  architectural principles — enforced in architecture
  review, deviation blocked before development
- TA: Conduct blast radius modelling for each LLM
  integration — what autonomous actions are possible,
  what harm can result, what controls bound the impact
- RT: Test autonomous action scope in acceptance criteria —
  verify agents cannot exceed defined permission envelope

**Level 3 — Defined**
- SA: Formally specify permitted action graphs for each
  LLM deployment — only pre-approved sequences execute
  in production, verified in architecture assessment
- ST: Conduct red team exercises testing excessive agency
  through indirect injection — document results, feed
  into architecture standards updates
- TA: Include excessive agency in Process Hazard Analysis
  for OT deployments — physical consequence assessment

#### Tools

| Tool | Type | Link |
|---|---|---|
| Guardrails AI | Open-source | https://github.com/guardrails-ai/guardrails |
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack, ASI02 Tool Misuse
- DSGAI 2026: DSGAI06 Tool Plugin and Agent Data Exchange
- Other frameworks: EU AI Act Art. 14 · ISO 42001 A.6.1.2 · AIUC-1 B006

---

### LLM07 — System Prompt Leakage

**Severity:** High

System prompts containing internal instructions or security controls
are extracted by adversaries. SAMM Security Architecture (SA) must
treat system prompts as sensitive configuration requiring the same
protection as application secrets. Environment Management (EM) covers
the secure configuration and secrets management requirements.

#### SAMM mapping

| Practice | Activity | Level | How it applies |
|---|---|---|---|
| Security Architecture (SA) | Classify system prompts as sensitive configuration | L1 | System prompts classified as sensitive AI system configuration — architectural standard requiring secret manager |
| Environment Management (EM) | Apply secure configuration to AI deployment | L1 | System prompts encrypted, access-controlled, not in cleartext config — EM secure configuration baseline |
| Security Requirements (SR) | Specify system prompt protection requirements | L1 | System prompt protection specified before development — encryption, access control, version control required |

#### Mitigations by SAMM maturity

**Level 1 — Initial**
- SA: Classify system prompts as sensitive configuration
  in development standards — secret manager required,
  no cleartext in source code or config files
- EM: Include system prompt protection in secure
  configuration baseline — applies to all LLM deployments,
  verified in deployment checklist
- SR: Specify system prompt protection requirements before
  development — encryption, access control, version
  control, rotation schedule

**Level 2 — Managed**
- ST: Include prompt extraction testing in security
  testing programme — attempt recovery under known
  techniques before each production release
- SA: Implement system prompt tokenisation as standard
  pattern — sensitive identifiers replaced with opaque
  tokens resolved at runtime
- EM: Automated system prompt rotation on schedule —
  limits shelf life of any extracted content

**Level 3 — Defined**
- ST: Include prompt extraction in penetration testing
  scope — attempt recovery through all known techniques
  against your specific deployment, document results
- SA: Enforce tokenisation pattern through automated
  architecture review — deviation blocked
- EG: Train developers specifically on system prompt
  security — common mistakes and secure patterns

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack
- DSGAI 2026: DSGAI15 Over-Broad Context Windows
- Other frameworks: AIUC-1 B003/B009 · CWE-200 · OWASP ASVS V8.1

---

### LLM08 — Vector and Embedding Weaknesses

**Severity:** Medium

Weaknesses in vector stores enable adversarial retrieval manipulation
and inference of sensitive information from embeddings. SAMM Security
Architecture (SA) must treat vector stores as sensitive data assets
with equivalent architectural controls to source documents.

#### SAMM mapping

| Practice | Activity | Level | How it applies |
|---|---|---|---|
| Security Architecture (SA) | Define vector store security as architectural standard | L2 | RBAC, encryption, and anomaly detection as standard patterns for all vector store deployments |
| Security Requirements (SR) | Specify vector store security requirements | L1 | Vector store security requirements specified before development — RBAC, encryption, CVE patching schedule |
| Security Testing (ST) | Include vector store attacks in security testing | L2 | RBAC bypass, path traversal, bulk extraction, and embedding inversion scenarios in security testing programme |

#### Mitigations by SAMM maturity

**Level 1 — Initial**
- SR: Specify vector store security requirements before
  development — RBAC enabled, encryption at rest,
  no unauthenticated access in any environment
- SA: Include vector store as a sensitive data asset
  in reference architecture — same classification and
  protection requirements as source documents
- Patch all known vector database CVEs on schedule

**Level 2 — Managed**
- SA: Define RBAC and anomaly detection as standard
  patterns for all vector stores — enforced in architecture
  review
- ST: Include vector store attacks in security testing
  programme — RBAC bypass, path traversal, bulk
  extraction tested before each deployment
- Apply trust-tiered retrieval as a standard pattern —
  documented in reference architecture

**Level 3 — Defined**
- ST: Conduct embedding inversion testing in penetration
  test programme — validate source content cannot
  be reconstructed, document results
- SA: Apply differential privacy in embedding generation
  as a standard pattern for sensitive corpora — in
  reference architecture with implementation guidance
- EG: Train ML engineers on embedding security — inversion
  attacks, privacy-preserving techniques, access controls

#### Tools

| Tool | Type | Link |
|---|---|---|
| Weaviate | Open-source | https://weaviate.io |
| ML Privacy Meter | Open-source | https://github.com/privacytrustlab/ml_privacy_meter |

#### Cross-references
- Agentic Top 10: ASI06 Memory and Context Poisoning
- DSGAI 2026: DSGAI13 Vector Store Platform Security, DSGAI18 Inference and Data Reconstruction
- Other frameworks: NIST AI RMF MS-2.5 · ISO 27001 A.8.3/A.8.24 · OWASP ASVS V6.1

---

### LLM09 — Misinformation

**Severity:** Medium

LLMs generate plausible but incorrect content that users or downstream
systems act upon. SAMM Education and Guidance (EG) is the primary
practice — misinformation risk is fundamentally a user literacy
problem before it is a technical one. Operational Management (OM)
covers production accuracy monitoring.

**SAMM maturity target:** EG Level 1 (all LLM users trained on
output limitations and verification requirements), TA Level 1
(misinformation risk assessed per deployment context), OM Level 1
(production accuracy monitoring defined and active).

#### SAMM mapping

| Practice | Activity | Level | How it applies |
|---|---|---|---|
| Education and Guidance (EG) | Train users on LLM output limitations | L1 | All LLM users and operators trained on hallucination risk, verification requirements, and advisory output status |
| Threat Assessment (TA) | Assess misinformation harm potential | L1 | Misinformation risk assessed per deployment — harm potential of incorrect outputs quantified per use case |
| Operational Management (OM) | Monitor production accuracy | L1 | Accuracy metrics and hallucination rate tracking defined and active in production monitoring programme |

#### Mitigations by SAMM maturity

**Level 1 — Initial**
- EG: Provide mandatory LLM output limitation training
  for all users before access — hallucination risk,
  verification requirements, advisory output status
- TA: Assess misinformation harm potential per deployment —
  document what happens if the system produces incorrect
  information in each use case
- OM: Define production accuracy monitoring — basic
  metrics, user feedback channels, escalation path

**Level 2 — Managed**
- SA: Deploy RAG grounded on authoritative, version-controlled
  sources as standard pattern — in reference architecture
- OM: Implement structured accuracy monitoring programme —
  accuracy metrics per domain, drift detection, alert
  thresholds defined and reviewed
- SR: Define accuracy acceptance criteria per use case —
  high-stakes applications require human verification
  gates before action

**Level 3 — Defined**
- ST: Conduct domain-specific accuracy testing before
  deployment — hallucination rate measured per domain
  against defined thresholds
- SA: Build automated fact-checking into reference
  architecture for high-stakes output domains — accuracy
  gate as a standard pattern
- EG: Develop LLM AI literacy programme at scale —
  role-specific training for developers, operators, and
  end users covering verification skills

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
causing denial of service or runaway API cost. SAMM Security
Architecture (SA) covers rate limiting and resilience patterns.
Environment Management (EM) covers secure deployment configuration.
Incident Management (IM) covers response to consumption anomalies.

#### SAMM mapping

| Practice | Activity | Level | How it applies |
|---|---|---|---|
| Security Architecture (SA) | Define resilience patterns for LLM services | L1 | Rate limiting, circuit breakers, and graceful degradation as standard architectural patterns |
| Environment Management (EM) | Apply resource limits in deployment configuration | L1 | Token limits, rate limiting, and cost caps in secure deployment baseline — applied to all LLM deployments |
| Incident Management (IM) | Define response for consumption anomalies | L1 | Incident response procedure for LLM resource exhaustion — automated response, owner notification |

#### Mitigations by SAMM maturity

**Level 1 — Initial**
- SA: Define rate limiting and resource controls as
  standard LLM architecture patterns — hard caps per
  user, session, and API key in reference architecture
- EM: Include resource limits in deployment configuration
  baseline — token limits, rate limiting, cost budgets
  applied to all LLM deployments as a deployment gate
- IM: Define incident response for consumption anomalies —
  automated rate tightening, cost circuit breakers,
  owner notification workflow

**Level 2 — Managed**
- SA: Include BCP requirements in LLM reference
  architecture — RTO/RPO defined, failover patterns
  documented, graceful degradation standard
- OM: Include LLM cost and consumption metrics in
  operational management programme — anomalies alerted,
  trends reviewed, capacity planned
- EM: Automate consumption anomaly response — circuit
  breakers configured in deployment baseline, not
  manual intervention required

**Level 3 — Defined**
- ST: Conduct adversarial cost-maximisation testing —
  identify highest-cost inputs and guard those paths,
  results in security test programme records
- SA: Deploy sponge example detection as standard
  pattern — inputs designed to maximise computation
  identified and rejected
- IM: Include LLM availability events in incident
  classification framework — severity tiers, escalation
  paths, SLA targets defined

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

## SAMM LLM security maturity roadmap

Use this roadmap to define current and target state for your LLM
security programme across all five SAMM business functions:

### Governance

| Practice | LLM L1 target | LLM L2 target | LLM L3 target |
|---|---|---|---|
| Strategy and Metrics | LLM security in programme strategy | AI supply chain metrics tracked | LLM security KPIs in board reporting |
| Policy and Compliance | LLM acceptable use policy published | Supplier security policy for LLM vendors | Automated compliance monitoring |
| Education and Guidance | Injection and autonomy training for devs | Role-specific AI security training curriculum | LLM security champions programme |

### Design

| Practice | LLM L1 target | LLM L2 target | LLM L3 target |
|---|---|---|---|
| Threat Assessment | LLM01/LLM04/LLM06 in threat models | Full LLM Top 10 threat modelled per deployment | Continuous threat model updates from threat intel |
| Security Requirements | Output handling and data governance requirements | Full LLM security requirements with traceability | Requirements as code — automated verification |
| Security Architecture | Basic LLM reference architecture | Least privilege, output security, supply chain patterns | Formal architecture enforcement, deviation blocked |

### Implementation

| Practice | LLM L1 target | LLM L2 target | LLM L3 target |
|---|---|---|---|
| Secure Build | Manual ML SBOM, version pinning | Automated SBOM and integrity verification in CI/CD | Isolated component evaluation environment |
| Secure Deployment | Resource limits in deployment baseline | Automated deployment security gates | Full Infrastructure-as-Code with security verification |
| Defect Management | LLM security bugs tracked | Severity classification, SLA targets | Risk-based prioritisation, metrics-driven |

### Verification

| Practice | LLM L1 target | LLM L2 target | LLM L3 target |
|---|---|---|---|
| Architecture Assessment | LLM architecture reviewed against baseline | Structured AA covering reference architecture compliance | Automated architecture compliance checking |
| Requirements-driven Testing | Output injection and data handling test cases | Full LLM security requirements in test suite | Continuous test execution in CI/CD |
| Security Testing | Basic injection testing | Structured adversarial testing programme | Full red team including supply chain and poisoning |

### Operations

| Practice | LLM L1 target | LLM L2 target | LLM L3 target |
|---|---|---|---|
| Incident Management | IR procedures for LLM Top 10 events | Structured IR with playbooks and SLAs | Automated detection and response |
| Environment Management | Secure config baseline including resource limits | Automated configuration compliance | Configuration as code, drift detection |
| Operational Management | Basic accuracy and consumption monitoring | Structured operational metrics programme | Predictive monitoring and capacity planning |

---

## Implementation priority

| Phase | LLM entries | SAMM practices | Rationale |
|---|---|---|---|
| 1 — Start here | LLM01, LLM06 | EG, TA, SA (L1) | Training and basic architecture prevent most common attack paths |
| 2 — This sprint | LLM02, LLM03, LLM07 | SR, SB, EM (L1) | Requirements, supply chain, and secure config protect the development pipeline |
| 3 — This quarter | LLM04, LLM05 | ST, SB (L2) | Adversarial testing and training pipeline integrity require structured programme |
| 4 — Ongoing | LLM08, LLM09, LLM10 | SA, OM, ST (L2-L3) | Embedding security, accuracy monitoring, and resilience patterns hardening |

---

## References

- OWASP SAMM v2.0: https://owaspsamm.org
- OWASP SAMM GitHub: https://github.com/owaspsamm/core
- OWASP LLM Top 10 2025: https://genai.owasp.org/llm-top-10/
- OWASP ASVS 4.0.3: https://owasp.org/www-project-application-security-verification-standard/
- OWASP AI Testing Guide: https://owasp.org/www-project-ai-testing-guide/

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — LLM01-LLM10 full entries with SAMM maturity roadmap | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
