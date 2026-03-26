<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01-ASI10)
  Framework   : ISO/IEC 42001:2023 — Artificial Intelligence Management System
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 x ISO/IEC 42001:2023

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
to [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html).

ISO 42001 is uniquely well-suited to agentic AI governance for three
reasons that distinguish it from every other framework in this
repository:

First, the concept of intended use (A.6.1.2) maps directly to the
core agentic risk problem — an agent whose goals can be hijacked or
whose tool access is excessive has been deployed outside its intended
use scope. ISO 42001 requires intended use to be explicitly defined
and bounded before deployment. This is the governance control that
prevents ASI01, ASI02, and ASI05 by design rather than detecting
them at runtime.

Second, human oversight (A.9.3) is a first-class AIMS control in
ISO 42001 — not a recommendation but a documented, auditable
requirement. For agentic AI, this maps directly to kill switch
implementation, human confirmation gates for irreversible actions,
and operator override capability.

Third, AI impact assessment (A.5.2) requires that harm potential
be quantified before deployment. For agentic AI operating in
high-consequence environments — OT, healthcare, financial — this
formalises what should be the default: understanding what physical
or financial harm an agent could cause before it operates
autonomously.

---

## Quick-reference summary

| ID | Name | Severity | Primary ISO 42001 Controls | Tier | Scope |
|---|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | Critical | A.6.1.2, A.6.1.3, A.6.2.4, A.9.3 | Foundational-Advanced | Both |
| ASI02 | Tool Misuse and Exploitation | Critical | A.6.1.2, A.9.1, A.9.3, A.6.2.4 | Foundational-Advanced | Both |
| ASI03 | Identity and Privilege Abuse | Critical | A.6.1.2, A.7.2, A.6.2.4, Cl.6.1 | Foundational-Advanced | Both |
| ASI04 | Agentic Supply Chain | High | A.10.1, A.10.2, A.4.3, A.7.1 | Foundational-Hardening | Both |
| ASI05 | Unexpected Code Execution | Critical | A.6.1.2, A.6.1.3, A.5.2, A.6.2.4 | Hardening-Advanced | Build |
| ASI06 | Memory and Context Poisoning | High | A.7.1, A.7.2, A.7.4, A.6.2.4 | Hardening-Advanced | Both |
| ASI07 | Insecure Inter-Agent Comms | High | A.6.1.3, A.7.4, A.6.2.4, Cl.6.1 | Hardening-Advanced | Build |
| ASI08 | Cascading Agent Failures | High | A.5.2, A.6.1.2, A.6.2.4, Cl.8 | Foundational-Advanced | Both |
| ASI09 | Human-Agent Trust Exploitation | Medium | A.8.1, A.9.1, A.9.3, A.2.2 | Foundational-Hardening | Both |
| ASI10 | Rogue Agents | Critical | A.6.1.3, A.9.3, A.6.2.4, Cl.9.1 | Hardening-Advanced | Both |

---

## Audience tags

- **CISO / AI governance lead** — full file, ISO 42001 AIMS for agentic AI
- **ISO 42001 implementer** — control mapping for certification audit evidence
- **Risk manager** — Clause 6.1, A.5.2 impact assessment entries
- **Safety engineer** — A.5.2 impact assessment, A.9.3 human oversight, OT entries
- **Legal / compliance** — A.8.1 transparency, A.9 user guidance, A.10 third-party obligations
- **OT engineer** — ASI01, ASI02, ASI08 with ISA 62443 crosswalk notes

---

## Detailed mappings

---

### ASI01 — Agent Goal Hijack

**Severity:** Critical

An attacker redirects agent objectives — the agent autonomously
executes a multi-step attack chain. ISO 42001 A.6.1.2 (intended use)
is the primary preventive control: an agent whose goals can be
redirected was deployed outside its intended use scope. If the
intended use is adequately specified and bounded, goal hijack
either cannot occur or has a bounded blast radius.

**ISO 42001 framing:** Goal hijack is a design failure before it
is a security failure. A.6.1.3 (AI system specification) requires
that adversarial robustness is a system requirement — if the system
can have its goals redirected, it does not meet its specification.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Intended use and use limitations | A.6.1.2 | Annex A-6 | Agent intended use defines permitted goals and action scope — goal changes outside intended use cannot be autonomously executed |
| Specification of AI system | A.6.1.3 | Annex A-6 | Adversarial robustness against goal hijack specified as a system requirement before development |
| Verification and validation | A.6.2.4 | Annex A-6 | Goal hijack scenarios in verification programme — direct, indirect via RAG, and multi-turn attacks tested |
| Human oversight | A.9.3 | Annex A-9 | Kill switch and goal-state verification implemented as human oversight mechanisms — documented for audit |

#### Mitigations by tier

**Foundational**
- A.6.1.2: Define agent intended use explicitly before
  deployment — what goals the agent can pursue, what
  actions it can take autonomously, what requires human
  confirmation — documented in AIMS records
- A.9.3: Implement and document operator kill switch —
  ability to halt all agent activity immediately is a
  human oversight requirement, not optional
- Treat all external content processed by the agent as
  untrusted — operational procedure documented in AIMS

**Hardening**
- A.6.1.3: Include goal hijack resistance in AI system
  specification — goal-state verification and input
  validation as non-functional requirements
- A.6.2.4: Include goal hijack in verification programme —
  direct injection, indirect via RAG, multi-turn attacks
  all tested before each production release
- Require human confirmation before any goal-changing
  action — documented as A.9.3 human oversight mechanism

**Advanced**
- Version-control agent goal specifications — cryptographic
  signing, runtime deviation triggers automatic suspension,
  documented as A.6.1.3 design control
- Extend A.6.2.4 testing to all indirect injection
  surfaces — RAG sources, tool descriptors, all data
  sources the agent processes
- A.5.2: Include goal hijack in AI impact assessment —
  physical, financial, and reputational harm potential
  quantified per deployment context

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| Invariant Analyzer | Open-source | https://github.com/invariantlabs-ai/invariant |

#### Cross-references
- LLM Top 10: LLM01 Prompt Injection, LLM06 Excessive Agency
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: AIUC-1 B001/B005/B006 · EU AI Act Art. 14 · ISA/IEC 62443 SR 3.3 (OT)

---

### ASI02 — Tool Misuse and Exploitation

**Severity:** Critical

Agents misuse legitimate tools — calling them with destructive
parameters or in unexpected sequences. ISO 42001 A.6.1.2 intended
use must explicitly define what tool operations are in scope — tool
misuse is a use limitation violation before it is a security incident.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Intended use and use limitations | A.6.1.2 | Annex A-6 | Permitted tool operations defined in intended use — agents cannot invoke tools outside documented scope |
| Guidance for affected parties | A.9.1 | Annex A-9 | Deployers receive guidance on permitted tool operations — what requires human confirmation |
| Human oversight | A.9.3 | Annex A-9 | Human confirmation for irreversible tool invocations — documented as oversight mechanism |
| Verification and validation | A.6.2.4 | Annex A-6 | Tool misuse scenarios in verification — destructive parameter injection, tool chaining |

#### Mitigations by tier

**Foundational**
- A.6.1.2: Define permitted tool operations in agent
  intended use — which tools, which operations, which
  parameter ranges are in scope — documented before deployment
- A.9.3: Document human confirmation requirement for
  irreversible tool invocations — implemented and tested
  as human oversight mechanism
- Validate all tool descriptors before agent loading —
  any hidden instruction is an intended use violation

**Hardening**
- A.9.1: Provide deployers with tool permission guidance —
  what is permitted, what requires approval, what is
  out of scope regardless of agent instruction
- A.6.2.4: Include tool misuse in verification programme —
  destructive parameter injection, unusual tool combinations,
  MCP descriptor poisoning — results documented
- Per-tool permission manifests enforced at orchestration
  layer — tool allowlisting as A.6.1.2 use limitation

**Advanced**
- A.5.2: AI impact assessment covers tool misuse scenarios —
  what physical or financial harm is possible if each tool
  is invoked with adversarial parameters
- Conduct tool misuse red team exercises — document as
  A.6.2.4 verification evidence
- A.6.1.2: Review and update permitted tool scope as
  agent capabilities evolve — managed as intended use
  change with AIMS change management

#### Tools

| Tool | Type | Link |
|---|---|---|
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |
| MCP Inspector | Open-source | https://github.com/modelcontextprotocol/inspector |
| Invariant Analyzer | Open-source | https://github.com/invariantlabs-ai/invariant |

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling, LLM06 Excessive Agency
- DSGAI 2026: DSGAI06 Tool Plugin and Agent Data Exchange
- Other frameworks: AIUC-1 B006/B007 · EU AI Act Art. 14 · ISA/IEC 62443 SR 2.1 (OT)

---

### ASI03 — Identity and Privilege Abuse

**Severity:** Critical

Agents inherit and cache credentials that, when compromised, expose
all systems the agent has access to. ISO 42001 A.6.1.2 (intended use)
must specify the credential and access scope the agent requires —
any access beyond what is required for intended use is an intended
use violation.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Intended use and use limitations | A.6.1.2 | Annex A-6 | Agent credential scope defined in intended use — access beyond what is required is an intended use violation |
| Data collection | A.7.2 | Annex A-7 | Agent credentials treated as sensitive AI system data — access controls, lifecycle management, encryption |
| Verification and validation | A.6.2.4 | Annex A-6 | Adversarial testing covering credential leakage — memory stores, logs, tool payload captures |
| Risk management | Cl.6.1 | Clause 6 | Credential exposure identified as a foreseeable risk — treatment controls documented |

#### Mitigations by tier

**Foundational**
- A.6.1.2: Define agent credential scope in intended use —
  what systems the agent can access, with what permissions,
  for what duration — documented before deployment
- Cl.6.1: Include agent credential exposure in AI risk
  register — document as a foreseeable risk with treatment
  controls for each agent deployment
- A.7.2: Treat agent credentials as sensitive AI system
  data — access controls, encryption, lifecycle management

**Hardening**
- A.6.2.4: Include credential leakage in verification
  programme — memory stores, log capture, tool payload
  exposure — results documented as audit evidence
- Issue short-lived, task-scoped credentials per invocation —
  documented as A.6.1.2 use limitation control
- Implement JIT credential issuance with automatic revocation

**Advanced**
- Implement PKI-backed agent identities — certificate-based
  authentication documented as A.6.1.3 design control
- Conduct agent credential red team exercises — lateral
  movement using agent credentials, document as A.6.2.4
  verification evidence
- A.5.2: AI impact assessment includes credential compromise
  scenarios — blast radius of stolen agent credentials
  quantified per deployment

#### Tools

| Tool | Type | Link |
|---|---|---|
| HashiCorp Vault | Open-source | https://www.vaultproject.io |
| SPIFFE / SPIRE | Open-source | https://spiffe.io |
| Teleport | Open-source/Commercial | https://goteleport.com |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI02 Agent Identity and Credential Exposure
- Other frameworks: OWASP NHI Top 10 · AIUC-1 A/B007 · EU AI Act Art. 15

---

### ASI04 — Agentic Supply Chain Vulnerabilities

**Severity:** High

Malicious or compromised tools, MCP servers, or model components
loaded at runtime alter agent behaviour. ISO 42001 A.10.1
(third-party AI systems and services) is the governance anchor —
MCP servers and dynamic tool providers are third-party AI
dependencies in scope.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Third-party AI systems and services | A.10.1 | Annex A-10 | Security requirements for all agent component vendors — tool providers, MCP servers, model sources |
| Customer AI systems | A.10.2 | Annex A-10 | Where agents are supplied to customers, obligations passed downstream |
| Tooling and infrastructure | A.4.3 | Annex A-4 | Agent tooling and infrastructure managed — version control, integrity verification, change management |
| Data collection | A.7.1 | Annex A-7 | Training data and knowledge sources governed — third-party data quality and provenance |

#### Mitigations by tier

**Foundational**
- A.10.1: Establish supplier requirements for all agent
  component vendors — provenance, integrity guarantees,
  vulnerability disclosure contractually required
- A.4.3: Manage all agent tooling as documented
  infrastructure — version control, approved component
  list, integrity verification before loading
- Maintain ML SBOM for all agent deployments — model,
  tools, MCP servers, runtime libraries

**Hardening**
- A.10.1: Conduct security assessments of strategic agent
  component vendors — include in AIMS supplier management
  programme
- Apply agent component change management — no dynamic
  updates in production without review and approval
- Scan all tool descriptors for hidden instructions before
  agent loading — reject modified or unrecognised descriptors

**Advanced**
- A.4.3: Implement runtime component integrity monitoring —
  continuous hash verification, deviation triggers agent
  suspension documented as operational control
- Conduct adversarial supply chain testing — attempt to
  introduce compromised components, document as A.6.2.4
  verification evidence
- A.10.1: Responsible disclosure relationship with all
  strategic component vendors — vulnerability notification
  SLA tested annually

#### Tools

| Tool | Type | Link |
|---|---|---|
| CycloneDX | Open-source | https://cyclonedx.org |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| MCP Inspector | Open-source | https://github.com/modelcontextprotocol/inspector |

#### Cross-references
- LLM Top 10: LLM03 Supply Chain Vulnerabilities
- DSGAI 2026: DSGAI04 Data Model and Artifact Poisoning
- Other frameworks: NIST SP 800-218A · AIUC-1 B001/B003 · EU AI Act Art. 25

---

### ASI05 — Unexpected Code Execution

**Severity:** Critical

Agents that generate and execute code become RCE gateways. ISO 42001
requires that code execution capability be treated as an elevated
intended use scope — A.6.1.2 must explicitly document code execution
as a permitted operation, and A.5.2 impact assessment must quantify
what harm RCE could cause in your deployment context.

**ISO 42001 framing:** Code execution capability deployed without
explicit AIMS governance approval is a use case that was never
assessed for harm potential. A.5.2 impact assessment is mandatory
before any agent with code execution capability is approved for
production deployment.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Intended use and use limitations | A.6.1.2 | Annex A-6 | Code execution capability requires explicit intended use documentation — not a default permitted operation |
| Specification of AI system | A.6.1.3 | Annex A-6 | Sandboxing, input filtering, and static analysis specified as design requirements for any code execution agent |
| Assessment of AI system impacts | A.5.2 | Annex A-5 | Harm potential of code execution capability quantified before deployment approval — mandatory for AIMS |
| Verification and validation | A.6.2.4 | Annex A-6 | Sandbox escape and code injection scenarios tested before deployment |

#### Mitigations by tier

**Foundational**
- A.5.2: Conduct AI impact assessment for any agent with
  code execution capability — harm potential quantified,
  AIMS governance approval required before deployment
- A.6.1.2: Document code execution as an explicit intended
  use scope item — default position is no code execution
  without documented approval
- A.6.1.3: Specify sandboxing as a mandatory design
  requirement — no host filesystem, network, or OT API
  access without explicit allowlist

**Hardening**
- A.6.2.4: Include sandbox escape and code injection in
  verification programme — test against your specific
  runtime configuration, results documented
- Deploy static analysis of agent-generated code before
  execution — A.6.1.3 design control
- Formal security review required for any agent with code
  execution capability — document as AIMS change management

**Advanced**
- Hardware-level sandboxing — document as A.6.1.3 advanced
  design control
- Conduct red team exercises targeting code execution —
  attempt sandbox escape, document as A.6.2.4 verification
  evidence
- A.5.2: Update impact assessment when execution context
  changes — re-assessment triggered by infrastructure
  or scope changes

#### Tools

| Tool | Type | Link |
|---|---|---|
| gVisor | Open-source | https://gvisor.dev |
| Semgrep | Open-source | https://semgrep.dev |
| Bandit | Open-source | https://github.com/PyCQA/bandit |

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling
- DSGAI 2026: DSGAI12 Unsafe NL Data Gateways
- Other frameworks: AIUC-1 B005/B006 · CWE-94 · ISA/IEC 62443 SR 3.3 (OT)

---

### ASI06 — Memory and Context Poisoning

**Severity:** High

Persistent memory poisoning causes systematic incorrect behaviour
across all future interactions. ISO 42001 A.7 data governance applies
to agent memory as an AI data asset — the same governance requirements
that apply to training data apply to runtime memory that influences
model behaviour.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Data collection | A.7.1 | Annex A-7 | Agent memory content governed — approved sources, quality requirements, access controls |
| Data collection | A.7.2 | Annex A-7 | Agent memory classified as AI data asset — access controls, encryption, retention policy |
| Data provenance and lineage | A.7.4 | Annex A-7 | All memory writes logged — provenance of content in agent memory traceable |
| Verification and validation | A.6.2.4 | Annex A-6 | Memory poisoning scenarios in verification programme — injection paths via all content sources tested |

#### Mitigations by tier

**Foundational**
- A.7.2: Classify agent memory stores as AI data assets —
  access controls, encryption, and retention policy
  applied from day one, documented in AIMS data governance
- A.7.1: Define approved sources for agent memory writes —
  external content entering memory requires validation
  before write
- Enforce memory TTL — entries expire and require
  re-validation against authoritative sources, documented
  as A.7.2 data lifecycle control

**Hardening**
- A.7.4: Log all memory write operations — provenance of
  content in agent memory traceable, anomalous writes
  detectable from logs
- A.6.2.4: Include memory poisoning in verification —
  injection paths via each content source the agent
  processes tested before deployment
- Implement memory segmentation — OT operational data
  and external content in separate isolated namespaces

**Advanced**
- Cryptographic integrity verification of memory store
  contents — tamper detection between write and read,
  documented as A.7.2 technical control
- A.7.4: Automated provenance validation on memory reads —
  alert on content with unverifiable origin before agent
  acts on it
- Cl.10: Memory poisoning incident response documented
  in AIMS improvement procedures — root cause, corrective
  action, prevention

#### Tools

| Tool | Type | Link |
|---|---|---|
| Weaviate | Open-source | https://weaviate.io |
| Langfuse | Open-source | https://langfuse.com |
| LlamaIndex | Open-source | https://www.llamaindex.ai |

#### Cross-references
- LLM Top 10: LLM04 Data and Model Poisoning
- DSGAI 2026: DSGAI04 Data Model and Artifact Poisoning, DSGAI13 Vector Store Platform Security
- Other frameworks: AIUC-1 A/B002 · ISO 27001 A.8.15 · ISA/IEC 62443 SR 3.7 (OT)

---

### ASI07 — Insecure Inter-Agent Communication

**Severity:** High

A2A communication channels lacking authentication or encryption
enable spoofing and agent-in-the-middle attacks. ISO 42001 A.6.1.3
(AI system specification) requires that security properties of all
communication channels are specified before development — A2A
security is a design requirement, not a post-deployment concern.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Specification of AI system | A.6.1.3 | Annex A-6 | A2A communication security requirements specified before development — authentication, encryption, schema validation |
| Data provenance and lineage | A.7.4 | Annex A-7 | A2A message provenance traceable — sender identity, content integrity, timestamp logged |
| Verification and validation | A.6.2.4 | Annex A-6 | A2A security scenarios in verification — spoofing, replay, man-in-the-middle attacks tested |
| Risk management | Cl.6.1 | Clause 6 | Insecure A2A communication identified as foreseeable risk — treatment controls documented |

#### Mitigations by tier

**Foundational**
- A.6.1.3: Specify A2A security requirements before
  development — authentication method, encryption
  standard, replay protection, schema validation all
  documented as system requirements
- Cl.6.1: Include insecure A2A in AI risk register —
  document as foreseeable risk with treatment controls
- Authenticate all A2A messages — no ambient trust,
  documented as A.6.1.3 design control

**Hardening**
- A.6.2.4: Include A2A security in verification programme —
  spoofing, replay, and man-in-the-middle scenarios tested
  before deployment
- A.7.4: Implement full A2A message logging — sender
  identity, content hash, timestamp — provenance
  of all inter-agent communication traceable
- Implement replay attack protection — nonces,
  timestamps, and sequence numbers

**Advanced**
- Mutual TLS for all production A2A channels — documented
  as A.6.1.3 advanced design control, verified in A.6.2.4
- Short-lived agent identity certificates — automated
  rotation documented as A.7.2 credential lifecycle control
- A.6.2.4: Continuous A2A anomaly detection testing —
  flag unexpected authentication patterns

#### Tools

| Tool | Type | Link |
|---|---|---|
| SPIFFE / SPIRE | Open-source | https://spiffe.io |
| Linkerd | Open-source | https://linkerd.io |
| cert-manager | Open-source | https://cert-manager.io |

#### Cross-references
- DSGAI 2026: DSGAI02 Agent Identity and Credential Exposure
- Other frameworks: OWASP NHI Top 10 · AIUC-1 B007/B008 · ISA/IEC 62443 SR 3.1 (OT)

---

### ASI08 — Cascading Agent Failures

**Severity:** High

Single-point faults propagate through multi-agent workflows into
system-wide incidents. In OT environments, cascading agent failures
can cross from the AI layer into physical process control. ISO 42001
A.5.2 (AI system impacts) is the governance anchor — cascade blast
radius and physical consequence potential must be quantified before
any multi-agent OT deployment is approved.

**OT critical note:** In industrial environments this is Critical
severity — A.5.2 impact assessment is mandatory before deployment.
See Agentic_ISA62443.md for OT-specific controls.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Assessment of AI system impacts | A.5.2 | Annex A-5 | Cascade blast radius and physical consequence potential quantified before deployment — AIMS governance approval required |
| Intended use and use limitations | A.6.1.2 | Annex A-6 | Maximum cascade depth and affected systems defined in intended use — circuit breaker thresholds documented |
| Verification and validation | A.6.2.4 | Annex A-6 | Cascade resilience scenarios in verification — circuit breaker effectiveness, failover tested |
| Operation | Cl.8 | Clause 8 | Operational controls for cascade containment — circuit breakers, kill switch, process fallback |

#### Mitigations by tier

**Foundational**
- A.5.2: Conduct AI impact assessment before any multi-agent
  deployment — cascade blast radius quantified, physical
  consequence potential assessed, AIMS governance approval
  documented
- A.6.1.2: Define cascade containment limits in intended use —
  maximum cascade depth, maximum affected systems,
  circuit breaker thresholds documented
- Cl.8: Implement circuit breakers and fail-safe defaults
  as operational controls — documented in AIMS operational
  procedures

**Hardening**
- A.6.2.4: Include cascade scenarios in verification
  programme — circuit breaker effectiveness, failover,
  graceful degradation tested and documented
- Segment agent clusters — blast radius limited by design,
  documented as A.6.1.2 use limitation
- A.5.2: Re-assess impact when cluster scope or process
  integration changes — impact assessment is a living
  document, not a one-time activity

**Advanced**
- Conduct chaos engineering — intentional fault injection,
  document as A.6.2.4 verification evidence
- A.5.2: Include cascade scenarios in Process Hazard
  Analysis for OT deployments — align AIMS impact
  assessment with IEC 61511 safety case
- Cl.10: Cascade incident response documented in AIMS
  improvement procedures — root cause, corrective action

#### Tools

| Tool | Type | Link |
|---|---|---|
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Resilience4j | Open-source | https://resilience4j.readme.io |
| LangSmith | Commercial | https://smith.langchain.com |

#### Cross-references
- LLM Top 10: LLM10 Unbounded Consumption
- DSGAI 2026: DSGAI17 Data Availability and Resilience Failures
- Other frameworks: AIUC-1 D · ISA/IEC 62443 SR 7.6 (OT) · NIST SP 800-82 (OT)

---

### ASI09 — Human-Agent Trust Exploitation

**Severity:** Medium

Users anthropomorphise agents — enabling manipulated agents to exploit
operators into approving harmful actions. ISO 42001 A.8.1 (information
for interested parties) and A.9.1 (guidance for affected parties)
are the primary controls — transparency about AI limitations is a
first-class ISO 42001 requirement.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Information for interested parties | A.8.1 | Annex A-8 | AI system capabilities and limitations disclosed to all stakeholders — what the agent can and cannot reliably do |
| Guidance for affected parties | A.9.1 | Annex A-9 | Users and operators provided with guidance on agent advisory limitations — verification requirements documented |
| Human oversight | A.9.3 | Annex A-9 | Human oversight mechanisms designed to be robust against trust exploitation — approval flows independent of agent interface |
| Policies for AI | A.2.2 | Annex A-2 | Organisational policy on agent transparency — agents identify as AI, advisory vs authoritative output distinguished |

#### Mitigations by tier

**Foundational**
- A.8.1: Disclose agent capabilities and limitations in
  documentation — what the agent can reliably do, what
  it cannot, what requires independent verification
- A.9.1: Provide operators and users with advisory
  limitation guidance — training required before access
  to any agent decision-support system is granted
- A.2.2: Establish policy requiring agents to identify
  as AI — all agent-user interactions disclose AI nature,
  advisory outputs distinguished from authoritative

**Hardening**
- A.9.3: Design human oversight mechanisms that are robust
  against trust exploitation — approval flows independent
  of the agent interface, documented as human oversight
  evidence for certification
- Implement output filtering to detect and block
  manipulative language patterns — A.6.1.3 design control
- A.5.2: Include trust exploitation scenarios in AI
  impact assessment — harm potential if operator
  systematically follows manipulated recommendations

**Advanced**
- A.9.1: Conduct operator competency assessments — verify
  operators can identify agent recommendations requiring
  independent verification, document as A.9.1 evidence
- Deploy behavioural analysis detecting agent nudging —
  alert on persuasion patterns, document as monitoring
  control in Cl.9.1
- Cl.10: Trust exploitation incidents documented in
  AIMS improvement procedures — root cause, retraining,
  interface redesign actions recorded

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- DSGAI 2026: DSGAI21 Disinformation and Integrity Attacks
- Other frameworks: EU AI Act Art. 50/52 · AIUC-1 C/F · NIST AI RMF GV-1.7

---

### ASI10 — Rogue Agents

**Severity:** Critical

Malicious or compromised agents appear compliant but pursue hidden
goals — often the end-state of undetected ASI01 or ASI06. ISO 42001
Clause 9.1 (monitoring, measurement, analysis, and evaluation) is
the detection function — without documented performance monitoring
and behavioural observation, a rogue agent can operate indefinitely.

**ISO 42001 framing:** A rogue agent is an AI system operating outside
its intended use (A.6.1.2). When rogue behaviour is detected,
Clause 10 (improvement) requires that root cause is identified and
corrective actions are taken before any reactivation.

#### ISO 42001:2023 mapping

| Control | ID | Clause/Annex | How it applies |
|---|---|---|---|
| Specification of AI system | A.6.1.3 | Annex A-6 | Comprehensive audit logging and behavioural monitoring specified as mandatory design requirements |
| Human oversight | A.9.3 | Annex A-9 | Kill switch and rogue agent containment procedure implemented as human oversight mechanisms |
| Verification and validation | A.6.2.4 | Annex A-6 | Rogue agent detection capability tested — red team exercises simulating persistent hidden goal |
| Monitoring, measurement, analysis | Cl.9.1 | Clause 9 | Behavioural baseline monitoring as a performance measurement — deviation triggers defined response |

#### Mitigations by tier

**Foundational**
- A.6.1.3: Specify comprehensive audit logging and
  behavioural monitoring as mandatory design requirements —
  no production deployment without full observability
- A.9.3: Document kill switch procedure as human oversight
  mechanism — activation triggers, escalation path,
  reactivation requirements all documented for certification
- Implement scope constraints at the orchestration layer —
  rogue agent cannot exceed permission envelope

**Hardening**
- Cl.9.1: Establish behavioural baseline during commissioning —
  document as AIMS performance measurement, deviation
  triggers defined tiered response
- A.6.2.4: Include rogue agent scenarios in verification —
  persistent hidden goal detection tested, results documented
- Aggregate recommendation analysis — periodic engineering
  review of recommendation patterns for systematic drift

**Advanced**
- A.6.2.4: Conduct extended rogue agent red team exercises —
  simulate persistent hidden goal pursuit across sessions,
  verify detection capability holds
- Multi-agent consensus for high-stakes decisions — rogue
  single agent cannot influence critical recommendations
  without cross-validation
- Cl.10: Rogue agent incident response documented in AIMS
  improvement procedures — investigation requirements,
  root cause confirmation, control updates before
  reactivation, lessons learned

#### Tools

| Tool | Type | Link |
|---|---|---|
| Langfuse | Open-source | https://langfuse.com |
| Helicone | Open-source | https://www.helicone.ai |
| OpenTelemetry | Open-source | https://opentelemetry.io |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI16 Endpoint and Browser Overreach
- Other frameworks: AIUC-1 B001/B002/C/E · EU AI Act Art. 14/15 · ISA/IEC 62443 SR 3.7 (OT)

---

## ISO 42001 AIMS implementation checklist for agentic AI

### Context and planning (Clauses 4-6)

- [ ] All agentic systems identified within AIMS scope (Cl.4.3)
- [ ] Stakeholder requirements for agentic deployments documented (Cl.4.2)
- [ ] All 10 Agentic Top 10 risks in AI risk register (Cl.6.1)
- [ ] AI system objectives defined per agent including autonomy limits (Cl.6.2)
- [ ] AI impact assessment completed for each agentic deployment (A.5.2)
- [ ] Code execution capability requires explicit A.5.2 impact assessment and AIMS approval

### AI system lifecycle (Annex A.6)

- [ ] Intended use defines permitted goals, tools, and action scope per agent (A.6.1.2)
- [ ] Adversarial robustness requirements in AI system specification (A.6.1.3)
- [ ] Audit logging and behavioural monitoring specified as design requirements (A.6.1.3)
- [ ] Verification programme covers ASI01-ASI05 and ASI10 scenarios (A.6.2.4)
- [ ] Test results documented and retained as audit evidence (A.6.2.5)

### Data governance (Annex A.7)

- [ ] Agent memory stores classified as AI data assets (A.7.2)
- [ ] Memory write provenance logged and traceable (A.7.4)
- [ ] A2A communication security specified as design requirement (A.6.1.3)
- [ ] Agent credentials treated as sensitive AI data (A.7.2)

### Third-party relations (Annex A.10)

- [ ] Supplier requirements applied to all tool and MCP server vendors (A.10.1)
- [ ] Runtime dynamic component loading governed under A.10.1

### Human oversight (Annex A.9)

- [ ] Kill switch implemented and documented as human oversight mechanism (A.9.3)
- [ ] Human confirmation gates for irreversible actions documented (A.9.3)
- [ ] Deployer guidance published for all agentic deployments (A.9.1)
- [ ] Operator training on agent limitations completed (A.9.1)

### Performance evaluation (Clause 9)

- [ ] Behavioural baselines established and documented as performance metrics (Cl.9.1)
- [ ] Rogue agent detection rate as monitored metric (Cl.9.1)
- [ ] Management review includes agentic AI risk and incident data (Cl.9.3)

---

## Implementation priority

| Phase | ASI entries | ISO 42001 controls | Rationale |
|---|---|---|---|
| 1 — Do now | ASI01, ASI02, ASI03 | A.6.1.2, Cl.6.1, A.9.3 | Intended use definition and human oversight prevent the largest attack surface |
| 2 — This sprint | ASI05, ASI10 | A.5.2, A.6.1.3, Cl.9.1 | Code execution requires impact assessment, rogue detection requires monitoring |
| 3 — This quarter | ASI04, ASI06, ASI07 | A.10.1, A.7.1/7.4, A.6.1.3 | Supply chain, memory, and A2A controls require design and infrastructure changes |
| 4 — Ongoing | ASI08, ASI09 | A.5.2, A.8.1, Cl.9.1 | Impact assessment, transparency, and cascade engineering continuous improvement |

---

## References

- ISO/IEC 42001:2023: https://www.iso.org/standard/81230.html
- OWASP Agentic Top 10 2026: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- OWASP AIVSS: https://aivss.owasp.org
- AIUC-1 Standard: https://www.aiuc-1.com
- ISO 42001 and EU AI Act alignment: https://www.iso.org/artificial-intelligence

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — ASI01-ASI10 full entries with AIMS checklist | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
