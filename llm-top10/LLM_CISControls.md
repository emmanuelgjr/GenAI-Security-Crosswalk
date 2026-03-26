<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for LLM Applications 2025 (LLM01–LLM10)
  Framework   : CIS Controls v8.1
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# LLM Top 10 2025 × CIS Controls v8.1

Mapping the [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/)
to the [CIS Controls v8.1](https://www.cisecurity.org/controls) — the
Center for Internet Security's prioritised set of safeguards for
cyber defence, organised into 18 control groups with Implementation
Groups (IG1/IG2/IG3) scaling from small organisations to enterprises.

CIS Controls are highly practical and action-oriented. Every safeguard
maps to specific tools and activities. For LLM security, the most
relevant controls are distributed across data protection (CIS 3),
secure configuration (CIS 4), account management (CIS 5), audit log
management (CIS 8), application software security (CIS 16), incident
response (CIS 17), and penetration testing (CIS 18).

---

## CIS Controls structure

| Group | Controls | Scope |
|---|---|---|
| Basic hygiene (IG1) | CIS 1–6 | Asset inventory, software, data protection, secure config, account management, access control |
| Foundational (IG2) | CIS 7–11 | Vulnerability management, audit logs, email/web, malware, network |
| Organisational (IG3) | CIS 12–18 | Network monitoring, security awareness, app security, incident response, pen testing |

**Implementation Groups:**
- IG1 — Essential cyber hygiene, small to medium organisations
- IG2 — IG1 + additional controls for organisations with sensitive data
- IG3 — IG2 + advanced controls for enterprise and regulated industries

---

## Quick-reference summary

| ID | Name | Severity | Primary CIS Controls | IG | Tier |
|---|---|---|---|---|---|
| LLM01 | Prompt Injection | Critical | CIS 16, CIS 18, CIS 8 | IG2–IG3 | Foundational–Advanced |
| LLM02 | Sensitive Information Disclosure | High | CIS 3, CIS 14, CIS 8 | IG1–IG3 | Foundational–Advanced |
| LLM03 | Supply Chain Vulnerabilities | High | CIS 2, CIS 7, CIS 16 | IG1–IG3 | Foundational–Hardening |
| LLM04 | Data and Model Poisoning | Critical | CIS 7, CIS 16, CIS 18 | IG2–IG3 | Hardening–Advanced |
| LLM05 | Insecure Output Handling | High | CIS 16, CIS 8, CIS 18 | IG2–IG3 | Foundational–Hardening |
| LLM06 | Excessive Agency | High | CIS 5, CIS 6, CIS 8 | IG1–IG3 | Foundational–Hardening |
| LLM07 | System Prompt Leakage | High | CIS 3, CIS 4, CIS 8 | IG1–IG2 | Foundational–Hardening |
| LLM08 | Vector and Embedding Weaknesses | Medium | CIS 3, CIS 7, CIS 16 | IG2–IG3 | Hardening–Advanced |
| LLM09 | Misinformation | Medium | CIS 14, CIS 17, CIS 3 | IG2–IG3 | Foundational–Hardening |
| LLM10 | Unbounded Consumption | Medium | CIS 4, CIS 12, CIS 17 | IG1–IG3 | Foundational–Hardening |

---

## Audience tags

- **Security engineer** — full file, CIS Controls implementation reference
- **Small / medium organisation (IG1–IG2)** — IG1/IG2 safeguards per entry
- **Enterprise (IG3)** — full safeguard coverage including penetration testing
- **Developer** — CIS 16 application security safeguards
- **Auditor** — CIS 18 penetration testing, CIS 8 audit log management
- **OT engineer** — LLM01, LLM04, LLM10 with ISA 62443 crosswalk for OT context

---

## Detailed mappings

---

### LLM01 — Prompt Injection

**Severity:** Critical

Malicious instructions in user input or processed content manipulate
LLM behaviour, bypassing safety controls.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 16 — Application Software Security | 16.1 Establish secure application development standards | IG2 | Secure development standards covering LLM integration — input validation, context separation |
| CIS 16 — Application Software Security | 16.2 Implement code review | IG2 | Code review for all LLM integration code — prompt injection patterns reviewed |
| CIS 18 — Penetration Testing | 18.1 Establish penetration testing programme | IG3 | Adversarial testing programme covering prompt injection scenarios |
| CIS 8 — Audit Log Management | 8.2 Collect audit logs | IG1 | Runtime logging of all LLM inputs — injection attempts detectable through log analysis |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 8.2: Enable audit logging for all LLM input channels —
  every prompt logged with user identity and timestamp
- Treat all external content processed by the LLM as untrusted —
  documents, emails, web results, RAG chunks regardless of source
- Implement input length and format validation at the
  application layer before content reaches the model

**Hardening (IG2)**
- CIS 16.1/16.2: Establish secure coding standards covering
  LLM integration — input validation requirements reviewed in
  code review for all LLM-related pull requests
- Deploy runtime prompt injection detection — active monitoring
  on input channels, not just passive logging
- Maintain adversarial test suite covering direct, indirect,
  and jailbreak injection vectors

**Advanced (IG3)**
- CIS 18.1: Include prompt injection scenarios in penetration
  testing programme — cover your specific RAG sources, tool
  descriptor paths, and document processing pipelines
- Implement architectural separation between system prompt
  and user input — structural guarantee, not just policy
- Red team quarterly with novel indirect injection techniques —
  document results in penetration testing records

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Rebuff | Open-source | https://github.com/protectai/rebuff |

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack
- DSGAI 2026: DSGAI01 Sensitive Data Leakage
- Other frameworks: ISO 27001 A.8.28 · NIST AI RMF MS-2.5 · MITRE ATLAS AML.T0051

---

### LLM02 — Sensitive Information Disclosure

**Severity:** High

LLMs expose PII, financial data, proprietary code, or confidential
information through outputs — from training data memorisation or
over-permissive RAG retrieval.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 3 — Data Protection | 3.1 Establish and maintain data management process | IG1 | Data classification and handling requirements applied to all LLM data assets |
| CIS 3 — Data Protection | 3.11 Encrypt sensitive data at rest | IG1 | Embeddings, training data, and RAG caches containing sensitive data encrypted |
| CIS 14 — Security Awareness | 14.1 Establish security awareness programme | IG1 | User training on LLM data handling — what data should not be shared with LLMs |
| CIS 8 — Audit Log Management | 8.5 Collect detailed audit logs | IG2 | Detailed logging of all LLM data access — RAG queries, data retrieved, outputs generated |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 3.1: Establish data management process covering all LLM
  data assets — training data, RAG sources, outputs, embeddings
  classified and handled per policy
- CIS 3.11: Encrypt all sensitive data at rest in LLM scope —
  RAG document stores, embedding databases, prompt caches
- Implement output scanning for PII and sensitive patterns
  before responses are delivered to users

**Hardening (IG2)**
- CIS 8.5: Collect detailed audit logs for all LLM data access —
  every RAG query, every data element retrieved, every output
  containing sensitive content
- CIS 3: Implement access controls on RAG data sources —
  users retrieve only documents they are authorised to access
- Apply data loss prevention on all LLM output channels —
  PII and sensitive patterns detected and blocked

**Advanced (IG3)**
- Conduct model inversion red team exercises — validate that
  sensitive training data cannot be reconstructed from outputs
- Apply differential privacy in training and embedding
  generation for sensitive corpora
- CIS 18.1: Include data disclosure scenarios in penetration
  testing — attempt to extract sensitive data through
  crafted queries against your specific deployment

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Nightfall AI | Commercial | https://nightfall.ai |
| Private AI | Commercial | https://private-ai.com |

#### Cross-references
- Agentic Top 10: ASI03 Identity & Privilege Abuse
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI18 Inference & Data Reconstruction
- Other frameworks: ISO 27001 A.8.11/A.8.12 · EU AI Act Art. 10 · GDPR Art. 25

---

### LLM03 — Supply Chain Vulnerabilities

**Severity:** High

LLM applications depend on third-party model weights, datasets,
libraries, and plugins — any of which can be compromised to introduce
backdoors or malicious functionality.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 2 — Inventory and Control of Software Assets | 2.1 Establish and maintain software asset inventory | IG1 | ML SBOM maintained as part of software asset inventory — model versions, libraries, adapters |
| CIS 7 — Continuous Vulnerability Management | 7.1 Establish vulnerability management process | IG1 | Vulnerability management process covers LLM component CVEs and dependency risks |
| CIS 16 — Application Software Security | 16.6 Use only up-to-date and trusted third-party components | IG2 | Only approved, verified LLM components used in production — unsigned components rejected |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 2.1: Maintain ML SBOM as part of software asset
  inventory — every LLM component (model, adapters, inference
  runtime, libraries) inventoried with version and source
- CIS 7.1: Include LLM component CVEs in vulnerability
  management process — model inference libraries and
  dependencies scanned and patched on schedule
- Pin all LLM component versions — no automatic updates
  in production without review and approval

**Hardening (IG2)**
- CIS 16.6: Establish approved component list for LLM
  deployments — only sourced from approved vendors,
  cryptographic signatures verified before deployment
- Apply supplier security requirements to all LLM component
  vendors — provenance, integrity guarantees, vulnerability
  disclosure obligations
- Implement automated SBOM generation and drift detection —
  alert on any unplanned component change

**Advanced (IG3)**
- CIS 18.1: Include supply chain integrity in penetration
  testing programme — attempt to introduce compromised
  components through supply chain attack vectors
- Operate isolated model evaluation environment — behavioural
  testing before each production promotion
- Establish responsible disclosure relationship with LLM
  vendors — defined vulnerability notification SLA

#### Tools

| Tool | Type | Link |
|---|---|---|
| CycloneDX | Open-source | https://cyclonedx.org |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| OWASP Dependency-Check | Open-source | https://owasp.org/www-project-dependency-check/ |

#### Cross-references
- Agentic Top 10: ASI04 Agentic Supply Chain Vulnerabilities
- DSGAI 2026: DSGAI04 Data Model & Artifact Poisoning
- Other frameworks: ISO 27001 A.5.19/A.5.21 · NIST AI RMF MP-5.1 · NIST SP 800-218A

---

### LLM04 — Data and Model Poisoning

**Severity:** Critical

Attackers corrupt training data or model weights — effects baked
into the model and invisible until a trigger condition is reached.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 7 — Continuous Vulnerability Management | 7.5 Perform automated vulnerability scanning | IG2 | Automated scanning of training pipeline components — vulnerabilities in data processing libraries |
| CIS 16 — Application Software Security | 16.7 Use standard hardening configuration templates | IG2 | Hardened training pipeline configurations — immutable infrastructure, locked data sources |
| CIS 18 — Penetration Testing | 18.3 Remediate penetration testing findings | IG3 | Poisoning scenarios in penetration testing — verify data integrity controls hold under attack |
| CIS 8 — Audit Log Management | 8.12 Collect service provider logs | IG2 | Full audit trail of training data provenance and model training runs |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 7: Apply vulnerability management to training pipeline
  components — anomaly detection on training data, source
  validation, and lineage tracking before any training run
- Implement model rollback capability — approved baseline
  version available for immediate revert on poisoning detection
- Source allowlisting for training data — only approved,
  validated sources enter production training pipelines

**Hardening (IG2)**
- CIS 16.7: Apply hardened configurations to training
  infrastructure — immutable data pipelines, locked source
  repositories, integrity verification on all data inputs
- CIS 7.5: Automated scanning of training pipeline components —
  detect compromised libraries or dependencies before training
- CIS 8.12: Maintain full audit trail of training data
  provenance — every data source, every preprocessing step,
  every training run logged and auditable

**Advanced (IG3)**
- CIS 18.3: Include data poisoning in penetration testing
  programme — verify data integrity controls hold under
  realistic adversarial scenarios
- Conduct post-training backdoor detection as mandatory
  pre-deployment gate
- Apply differential privacy during training — limits
  influence of any single training example

#### Tools

| Tool | Type | Link |
|---|---|---|
| IBM Adversarial Robustness Toolbox | Open-source | https://github.com/Trusted-AI/adversarial-robustness-toolbox |
| CleanLab | Open-source | https://github.com/cleanlab/cleanlab |
| Great Expectations | Open-source | https://greatexpectations.io |

#### Cross-references
- Agentic Top 10: ASI06 Memory & Context Poisoning
- DSGAI 2026: DSGAI04 Data Model & Artifact Poisoning, DSGAI21 Disinformation via Data Poisoning
- Other frameworks: ISO 27001 A.8.27/A.8.29 · NIST AI RMF MS-3.3 · MITRE ATLAS AML.T0032

---

### LLM05 — Insecure Output Handling

**Severity:** High

LLM output passed to downstream systems without validation enables
XSS, command injection, or SQL injection via AI-generated content.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 16 — Application Software Security | 16.1 Establish secure development standards | IG2 | Output encoding and sanitisation as secure development requirements |
| CIS 8 — Audit Log Management | 8.2 Collect audit logs | IG1 | Log all LLM outputs — injection attempts in model responses detectable |
| CIS 18 — Penetration Testing | 18.1 Establish penetration testing | IG3 | Output injection scenarios in penetration testing — XSS, SQL injection via LLM output |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 8.2: Log all LLM outputs — enable detection of
  injection patterns in model responses
- Treat all LLM output as untrusted input to downstream
  systems — encode, validate, and sanitise before rendering

**Hardening (IG2)**
- CIS 16.1: Include output security in secure development
  standards — mandatory output encoding and schema
  validation for all LLM integration code
- Implement output schema validation — only outputs
  conforming to defined safe structures passed to downstream

**Advanced (IG3)**
- CIS 18.1: Include output injection in penetration testing —
  XSS, SQL injection, command injection via LLM output
  tested against all interfaces consuming model responses
- Deploy dedicated output security layer independent of
  the LLM — structural guarantee, not just validation

#### Tools

| Tool | Type | Link |
|---|---|---|
| OWASP ZAP | Open-source | https://www.zaproxy.org |
| Semgrep | Open-source | https://semgrep.dev |
| DOMPurify | Open-source | https://github.com/cure53/DOMPurify |

#### Cross-references
- Agentic Top 10: ASI02 Tool Misuse, ASI05 Unexpected Code Execution
- DSGAI 2026: DSGAI05 Data Integrity & Validation Failures, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: ISO 27001 A.8.28 · OWASP ASVS V5 · CWE-79

---

### LLM06 — Excessive Agency

**Severity:** High

LLMs with excessive autonomy over tools, APIs, and systems execute
unintended or harmful actions when manipulated.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 5 — Account Management | 5.4 Restrict administrator privileges | IG1 | LLM tool access managed as privileged access — minimum scope, regular review |
| CIS 6 — Access Control Management | 6.1 Establish access granting process | IG1 | Formal process for granting LLM tool access — documented justification required |
| CIS 8 — Audit Log Management | 8.5 Collect detailed audit logs | IG2 | All LLM tool invocations logged — every tool call auditable with parameters |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 5.4: Manage LLM tool access as privileged access —
  minimum scope enforced, regular reviews, no standing
  broad permissions across all tools
- CIS 6.1: Establish formal process for granting LLM tool
  access — documented justification, approval, and regular
  review required for every tool permission
- Require human confirmation for every irreversible action
  triggered by LLM output — separate confirmation interface

**Hardening (IG2)**
- CIS 8.5: Collect detailed audit logs for all LLM tool
  invocations — tool identity, parameters, user session,
  timestamp — immutable trail
- Deploy action guardrails as an independent layer from
  the model — structural enforcement of permitted scope
- Regular access reviews — any LLM tool permission not
  actively used in 30 days is removed

**Advanced (IG3)**
- CIS 18.1: Include excessive agency scenarios in
  penetration testing — indirect injection leading to
  autonomous tool invocation beyond intended scope
- Formally specify permitted action graphs — only
  pre-approved action sequences can execute
- CIS 5.4: Include LLM tool access in privileged access
  management programme — quarterly review with documented
  justification for each permission

#### Tools

| Tool | Type | Link |
|---|---|---|
| Guardrails AI | Open-source | https://github.com/guardrails-ai/guardrails |
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |
| LangSmith | Commercial | https://smith.langchain.com |

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack, ASI02 Tool Misuse
- DSGAI 2026: DSGAI06 Tool Plugin & Agent Data Exchange
- Other frameworks: ISO 27001 A.8.2 · AIUC-1 B006 · ISA/IEC 62443 SR 2.1 (OT)

---

### LLM07 — System Prompt Leakage

**Severity:** High

System prompts containing internal instructions or security controls
are extracted by adversaries — enabling targeted attacks against
specific defences.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 3 — Data Protection | 3.1 Establish data management process | IG1 | System prompts classified as sensitive configuration — data handling policy applied |
| CIS 4 — Secure Configuration | 4.1 Establish secure configuration process | IG1 | Secure configuration for LLM deployments — system prompts not in cleartext config |
| CIS 8 — Audit Log Management | 8.2 Collect audit logs | IG1 | System prompt access logged — unauthorised access attempts detectable |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 3.1: Classify system prompts as sensitive configuration —
  subject to the same data management policy as application
  secrets and operational configuration
- CIS 4.1: Establish secure configuration requirement — system
  prompts never stored in cleartext configuration files,
  source code, or environment variables without encryption
- CIS 8.2: Log all access to system prompt storage — detect
  and alert on anomalous access patterns

**Hardening (IG2)**
- CIS 3: Remove all secrets and sensitive identifiers from
  system prompts — use environment variables and secret
  managers, not inline cleartext
- Conduct prompt extraction testing before each deployment —
  verify that system prompt content cannot be recovered
  through known extraction techniques
- Rotate system prompt versions on schedule — limits
  shelf life of any extracted content

**Advanced (IG3)**
- CIS 18.1: Include prompt extraction in penetration testing —
  attempt to recover system prompt content through all known
  techniques against your specific deployment
- Implement system prompt tokenisation — sensitive identifiers
  replaced with opaque tokens resolved at runtime
- Deploy output classifier to detect and block responses
  containing system prompt content

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack
- DSGAI 2026: DSGAI15 Over-Broad Context Windows
- Other frameworks: ISO 27001 A.5.12/A.8.24 · AIUC-1 B003 · CWE-200

---

### LLM08 — Vector and Embedding Weaknesses

**Severity:** Medium

Weaknesses in vector stores enable adversarial retrieval manipulation
and inference of sensitive information from embeddings.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 3 — Data Protection | 3.11 Encrypt sensitive data at rest | IG1 | All vector store content encrypted at rest |
| CIS 7 — Vulnerability Management | 7.1 Establish vulnerability management | IG1 | Vector database CVEs in vulnerability management process — CVE-2024-3584 and equivalents |
| CIS 16 — Application Software Security | 16.1 Establish secure development standards | IG2 | Secure coding requirements for vector store integration — RBAC, encryption, input validation |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 3.11: Encrypt all vector store content at rest —
  embeddings can leak source content through inversion
  attacks if unencrypted
- Enable RBAC on all vector store collections — no
  unauthenticated access in any environment
- CIS 7.1: Apply vulnerability management to vector database
  components — CVE-2024-3584 and equivalents patched promptly

**Hardening (IG2)**
- CIS 16.1: Include vector store security in secure
  development standards — RBAC, encryption, input
  validation all specified as requirements
- Implement anomaly detection on vector store query patterns —
  alert on bulk extraction and unusual retrieval volumes
- Apply content integrity verification on ingestion —
  only hash-verified authorised documents admitted

**Advanced (IG3)**
- CIS 18.1: Include vector store attacks in penetration
  testing — RBAC bypass, path traversal, bulk extraction,
  and embedding inversion scenarios
- Apply differential privacy in embedding generation —
  document privacy budget as data protection control
- Conduct embedding inversion testing — validate that
  source content cannot be reconstructed from embeddings

#### Tools

| Tool | Type | Link |
|---|---|---|
| Weaviate (with RBAC) | Open-source | https://weaviate.io |
| Qdrant | Open-source | https://qdrant.tech |

#### Cross-references
- Agentic Top 10: ASI06 Memory & Context Poisoning
- DSGAI 2026: DSGAI13 Vector Store Platform Security
- Other frameworks: ISO 27001 A.8.3/A.8.24 · NIST AI RMF MS-2.5 · CWE-284

---

### LLM09 — Misinformation

**Severity:** Medium

LLMs generate plausible but incorrect content that users or downstream
systems act upon.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 14 — Security Awareness | 14.1 Establish security awareness programme | IG1 | User training on LLM output limitations — verification requirements and critical evaluation |
| CIS 17 — Incident Response | 17.1 Designate personnel for incident response | IG1 | Defined response for LLM misinformation incidents — correction, notification, root cause |
| CIS 3 — Data Protection | 3.1 Establish data management process | IG1 | RAG data governance — quality and freshness controls on retrieval sources |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 14.1: Provide awareness training on LLM output
  limitations — all users of LLM decision-support tools
  trained before access is granted, refreshed annually
- CIS 17.1: Define incident response for misinformation
  events — who is responsible, what is corrected, how
  users are notified of incorrect outputs acted upon
- Display source citations alongside LLM responses —
  users verify claims against cited sources before acting

**Hardening (IG2)**
- CIS 3.1: Implement data management for RAG sources —
  freshness controls, authoritative source validation,
  version control on knowledge base content
- Deploy confidence scoring — low-confidence responses
  flagged prominently before user action
- Implement cross-verification for responses in regulated
  domains — independent source check before delivery

**Advanced (IG3)**
- Build automated fact-checking pipelines for high-stakes
  output domains — accuracy gates before responses reach
  safety-critical or regulated workflows
- Implement continuous drift detection — alert when
  hallucination rates exceed defined thresholds per domain
- CIS 18.1: Include misinformation scenarios in red team
  exercises — test LLM accuracy under adversarial conditions

#### Tools

| Tool | Type | Link |
|---|---|---|
| TruLens | Open-source | https://github.com/truera/trulens |
| RAGAS | Open-source | https://github.com/explodinggradients/ragas |
| DeepEval | Open-source | https://github.com/confident-ai/deepeval |

#### Cross-references
- Agentic Top 10: ASI09 Human-Agent Trust Exploitation
- DSGAI 2026: DSGAI21 Disinformation & Integrity Attacks
- Other frameworks: ISO 27001 A.8.16 · EU AI Act Art. 13/50 · AIUC-1 F

---

### LLM10 — Unbounded Consumption

**Severity:** Medium

Adversarial inputs trigger disproportionate resource consumption —
causing denial of service or runaway cost.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 4 — Secure Configuration | 4.1 Establish secure configuration process | IG1 | Secure configuration includes resource limits — token caps, rate limits, cost budgets |
| CIS 12 — Network Infrastructure Management | 12.6 Use of network-based URL filters | IG2 | Rate limiting and traffic controls at the API gateway and network layer |
| CIS 17 — Incident Response | 17.1 Designate personnel for incident response | IG1 | Defined response for consumption anomalies — automated rate limiting, session suspension, alerting |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 4.1: Include resource limits in secure configuration —
  token limits per request, rate limits per user and session,
  cost budgets per tenant — enforced at deployment
- CIS 17.1: Define incident response for consumption anomalies —
  automated rate tightening, cost circuit breakers,
  owner notification, investigation workflow
- Set hard token limits on input and output per request —
  reject requests exceeding thresholds at the API gateway

**Hardening (IG2)**
- CIS 12.6: Implement rate limiting and traffic controls at
  the network layer — not just at the application layer —
  preventing saturation of shared infrastructure
- Per-tenant cost budgets with automatic suspension on breach —
  not just alerting
- Implement circuit breakers — LLM service degradation
  isolated from other system availability

**Advanced (IG3)**
- CIS 18.1: Include resource exhaustion in penetration
  testing — sponge example attacks and token amplification
  scenarios against your specific deployment
- Implement adaptive rate limiting — thresholds adjust
  dynamically based on system load in real time
- Deploy sponge example detection — inputs designed to
  maximise computation identified and rejected

#### Tools

| Tool | Type | Link |
|---|---|---|
| LiteLLM | Open-source | https://github.com/BerriAI/litellm |
| Kong Gateway | Open-source | https://github.com/Kong/kong |
| OpenTelemetry | Open-source | https://opentelemetry.io |

#### Cross-references
- Agentic Top 10: ASI08 Cascading Agent Failures
- DSGAI 2026: DSGAI17 Data Availability & Resilience Failures
- Other frameworks: AIUC-1 D · ISA/IEC 62443 SR 7.6 (OT) · CWE-400

---

## CIS Controls implementation priority by IG

### IG1 — Essential hygiene (start here)

| LLM entry | CIS safeguards | Action |
|---|---|---|
| LLM02, LLM07 | CIS 3.1, CIS 3.11 | Data classification and encryption for all LLM data assets |
| LLM06 | CIS 5.4, CIS 6.1 | LLM tool access as privileged access — least privilege enforced |
| LLM01, LLM05 | CIS 8.2 | Audit logging on all LLM inputs and outputs |
| LLM10 | CIS 4.1 | Rate limits and token caps in secure configuration baseline |
| LLM09 | CIS 14.1 | User awareness training on LLM output limitations |

### IG2 — For organisations with sensitive data (add next)

| LLM entry | CIS safeguards | Action |
|---|---|---|
| LLM01, LLM05 | CIS 16.1/16.2 | Secure development standards covering LLM integration |
| LLM02 | CIS 8.5 | Detailed audit logs for all LLM data access |
| LLM03 | CIS 7.5, CIS 16.6 | Automated vulnerability scanning and approved component list |
| LLM04 | CIS 16.7, CIS 8.12 | Hardened training pipeline configurations and provenance logs |
| LLM10 | CIS 12.6 | Network-layer rate limiting and traffic controls |

### IG3 — Enterprise and regulated (complete coverage)

| LLM entry | CIS safeguards | Action |
|---|---|---|
| All | CIS 18.1, CIS 18.3 | Penetration testing programme covering all LLM vulnerability scenarios |
| LLM01, LLM04 | CIS 18.3 | Remediate and retest after each red team finding |

---

## References

- [CIS Controls v8.1](https://www.cisecurity.org/controls)
- [CIS Controls implementation guide](https://www.cisecurity.org/controls/implementation-groups)
- [OWASP LLM Top 10 2025](https://genai.owasp.org/llm-top-10/)
- [OWASP AI Testing Guide](https://owasp.org/www-project-ai-testing-guide/)

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-24 | 2026-Q1 | Initial mapping — LLM01–LLM10 full entries with IG-tiered safeguards | OWASP GenAI Data Security Initiative |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) —
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
