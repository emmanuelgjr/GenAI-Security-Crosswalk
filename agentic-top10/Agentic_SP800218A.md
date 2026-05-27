<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10)
  Framework   : NIST SP 800-218A Secure Software Development Practices for Generative AI and Dual-Use Foundation Models
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative – https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 × NIST SP 800-218A

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
to [NIST SP 800-218A: Secure Software Development Practices for Generative AI and Dual-Use Foundation Models](https://doi.org/10.6028/NIST.SP.800-218A.ipd)
(Initial Public Draft, March 2024).

NIST SP 800-218A extends the Secure Software Development Framework (SSDF)
with AI-specific practices covering the full lifecycle of generative AI and
foundation model development — from defining training data requirements and
designing secure ML pipelines, through adversarial testing and supply chain
verification, to vulnerability response and root cause analysis. For agentic
AI deployments — where autonomous agents invoke tools, persist memory across
sessions, and orchestrate multi-agent workflows — SP 800-218A provides
critical guidance on securing the expanded attack surface introduced by tool
usage, delegated authority, chained automation, and shared context stores.
Organisations following SSDF for their conventional software estate can
extend that programme to their agentic AI systems using this mapping. US
federal agencies are directed to align with SP 800-218A under OMB memoranda
referencing the SSDF.

---

## Why NIST SP 800-218A for agentic AI security

NIST SP 800-218A extends the Secure Software Development Framework (SSDF) with AI-specific practices covering the full lifecycle of generative AI and foundation model development, and is the primary US government reference for secure AI software development. For agentic AI deployments -- where autonomous agents invoke tools, persist memory, and orchestrate multi-agent workflows -- this mapping traces each OWASP Agentic Top 10 risk to specific SP 800-218A practices, enabling organisations to extend their existing SSDF programme to cover the expanded attack surface of agentic systems.

---

## SP 800-218A practice groups

| Group | ID | Purpose |
|---|---|---|
| Produce Well-Secured Software | PW | Security requirements, design, reuse, secure coding, review, and testing across the AI development lifecycle |
| Protect the Software | PS | Protecting model weights, training data, pipeline code, and build artefacts from unauthorised access and tampering |
| Respond to Vulnerabilities | RV | Identifying, assessing, remediating, and analysing AI-specific vulnerabilities including emergent behaviours |

---

## Quick-reference summary

| ID | Name | Severity | SP 800-218A Practices | Scope |
|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | Critical | PW.2.1-PS, PW.7.2-PS, PW.8.2-PS, RV.1.1-PS | Both |
| ASI02 | Tool Misuse & Exploitation | Critical | PW.1.1-PS, PW.2.1-PS, PW.7.2-PS, PS.1.1-PS | Both |
| ASI03 | Identity & Privilege Abuse | Critical | PW.1.1-PS, PW.5.1-PS, PS.1.1-PS, RV.1.1-PS | Both |
| ASI04 | Agentic Supply Chain Vulnerabilities | High | PW.4.1-PS, PS.2.1-PS, PS.3.1-PS, RV.1.1-PS | Both |
| ASI05 | Unexpected Code Execution | Critical | PW.2.1-PS, PW.5.1-PS, PW.8.2-PS, PS.1.1-PS | Both |
| ASI06 | Memory & Context Poisoning | High | PS.1.1-PS, PS.3.1-PS, PW.7.2-PS, RV.3.1-PS | Both |
| ASI07 | Insecure Inter-Agent Communication | High | PW.2.1-PS, PW.5.1-PS, PW.7.2-PS, PS.1.1-PS | Both |
| ASI08 | Cascading Agent Failures | High | PW.2.1-PS, PW.8.2-PS, RV.2.1-PS, PW.1.1-PS | Both |
| ASI09 | Human-Agent Trust Exploitation | Medium | PW.7.2-PS, PW.8.2-PS, RV.1.1-PS, PW.1.1-PS | Both |
| ASI10 | Rogue Agents | Critical | PW.7.2-PS, PW.8.2-PS, RV.1.1-PS, RV.3.1-PS | Both |

---

## Audience tags

`developer` `security-engineer` `ml-engineer` `compliance-officer` `ciso` `red-teamer`

- **Developer / ML engineer** – PW practices per vulnerability entry; secure coding and testing
- **Security engineer** – PS and RV practices; pipeline protection and vulnerability response
- **Red teamer** – PW.8.2-PS adversarial testing entries for every vulnerability
- **Compliance officer** – full file; SSDF alignment and SP 800-218A traceability
- **CISO** – PW.1 and PW.2 entries; AI security requirements and design governance

---

## Detailed mappings

---

### ASI01 – Agent Goal Hijack

**Severity:** Critical

An attacker redirects agent objectives through instruction injection.
Adversaries manipulate agent goals through direct or indirect prompt
injection, context manipulation, or tool output poisoning, causing the agent
to pursue attacker-chosen objectives instead of its intended task.
SP 800-218A addresses this through threat modelling of adversarial inputs
targeting agent goal structures in the design phase (PW.2), output and
behaviour review for goal deviation (PW.7), adversarial red-team testing of
goal manipulation vectors (PW.8), and vulnerability identification
procedures for goal hijacking incidents in production (RV.1).

**Real-world references:**
- EchoLeak (2025) – indirect prompt injection turned Microsoft 365 Copilot
  into a silent exfiltration engine via email content, demonstrating agent
  goal redirection through injected instructions
- MCP tool descriptor injection (2025) – malicious tool descriptions in
  Model Context Protocol servers redirected agent behaviour to attacker
  objectives

#### SP 800-218A mapping

| SP 800-218A Practice | Sub-task | Relevance |
|---|---|---|
| PW.2.1-PS – Design software to meet security requirements | Threat model the agent pipeline for adversarial goal manipulation vectors including direct injection, indirect injection via tool outputs, and context poisoning | Ensures goal integrity is a design-phase requirement for all agentic systems |
| PW.7.2-PS – Review the software for security vulnerabilities | Review agent behaviour for goal deviation — verify that the agent maintains intended objectives under adversarial input conditions | Catches goal manipulation vulnerabilities before production deployment |
| PW.8.2-PS – Test for security vulnerabilities | Conduct adversarial red-team testing against goal hijacking vectors including injection through every data source, tool output, and context channel | Validates goal integrity controls under realistic attack conditions |
| RV.1.1-PS – Identify and confirm vulnerabilities | Establish procedures to identify goal hijacking incidents in production including goal deviation monitoring, triage, and confirmation workflows | Enables rapid detection and response to goal manipulation in live systems |

#### Mitigations

**Foundational**
- PW.2.1-PS: During design, explicitly threat model all channels through
  which an adversary can influence agent goals — user inputs, tool outputs,
  retrieved documents, MCP server responses, shared memory stores — and
  design structural separations between goal context and data context
- Establish a policy that all agent inputs from untrusted sources are treated
  as potentially adversarial; enforce separation of instruction and data
  planes in architecture review gates
- PW.7.2-PS: Include goal deviation scenarios in pre-release agent behaviour
  reviews; assign a reviewer responsible for validating goal integrity under
  adversarial edge cases

**Hardening**
- PW.8.2-PS: Implement a structured red-team testing programme covering
  goal hijacking through direct injection, indirect injection via tool
  outputs and RAG sources, context manipulation, and multi-turn goal
  drift — gate production releases on red-team sign-off
- RV.1.1-PS: Deploy runtime monitoring for goal deviation indicators —
  define escalation and triage procedures for detected goal manipulation
  events; monitor tool invocation patterns for anomalous sequences
- Apply goal anchoring — periodically re-inject the original objective
  during multi-step agent execution to resist gradual goal drift

**Advanced**
- PW.8.2-PS: Extend adversarial testing to cover your specific tool
  descriptors, MCP server schemas, memory stores, and every data source
  that feeds agent context during multi-step execution
- RV.1.1-PS: Integrate goal deviation detection signals into your SIEM;
  automate session termination on high-confidence goal hijacking indicators
- PW.2.1-PS: Document goal integrity threat model outputs as a living SDLC
  artefact; refresh on every new tool integration, memory store addition,
  or agent orchestration change

#### Tools

| Tool | Type | Link |
|---|---|---|
| LAAF (LLM Agent Assessment Framework) | Open-source | https://github.com/OWASP/LAAF |
| Garak | Open-source | https://github.com/leondz/garak |
| PyRIT | Open-source | https://github.com/Azure/PyRIT |
| NIST SP 800-218A | Reference | https://doi.org/10.6028/NIST.SP.800-218A.ipd |

#### Cross-references
- LLM Top 10: LLM01 Prompt Injection, LLM06 Excessive Agency
- DSGAI 2026: DSGAI12 Unsafe NL Data Gateways
- Other frameworks: MITRE ATLAS AML.T0051 – SSDF PW.2 – NIST CSF 2.0 PR.AC-5

---

### ASI02 – Tool Misuse & Exploitation

**Severity:** Critical

Agents misuse legitimate tools via prompt manipulation or unsafe delegation.
Agents exploit or are manipulated into misusing tools, APIs, and external
services — invoking destructive operations, passing LLM-generated parameters
without validation, or chaining tool calls into harmful sequences. SP 800-218A
addresses this through explicit security requirements for tool capability
constraints (PW.1), threat modelling of tool access paths (PW.2), review
of tool access control enforcement (PW.7), and protection of tool
configuration artefacts (PS.1).

#### SP 800-218A mapping

| SP 800-218A Practice | Sub-task | Relevance |
|---|---|---|
| PW.1.1-PS – Define security requirements | Define explicit security requirements specifying per-tool permission manifests, parameter validation rules, and irreversibility classification for each agent deployment | Establishes tool access control as a mandatory deployment requirement |
| PW.2.1-PS – Design software to meet security requirements | Threat model all agent tool access paths; design least-privilege tool manifests and enforce human confirmation for irreversible operations by design | Ensures tool misuse prevention is designed before implementation |
| PW.7.2-PS – Review the software for security vulnerabilities | Review agent tool access control enforcement — verify that tool permission manifests are correctly implemented and agents cannot be manipulated into destructive tool use | Validates tool controls before production deployment |
| PS.1.1-PS – Protect all code from unauthorised access | Protect agent tool configuration files, permission manifests, and MCP tool descriptors from unauthorised modification; verify descriptor integrity | Prevents tampering with tool access control configuration |

#### Mitigations

**Foundational**
- PW.1.1-PS: Document per-tool permission manifests for each agent
  deployment — tool access scope, parameter validation rules, and
  irreversibility classification; treat as mandatory deployment
  requirements reviewed before go-live
- PW.2.1-PS: Design tool access with least privilege — no tool should
  have broader access than needed for its specific function; validate
  all LLM-generated tool parameters as untrusted input
- PS.1.1-PS: Classify tool configuration files and MCP descriptors as
  sensitive security artefacts; apply version control, access control,
  and integrity verification

**Hardening**
- PW.7.2-PS: Include tool misuse scenarios in pre-release reviews —
  verify agents cannot be manipulated into destructive tool invocations
  through prompt manipulation or tool chain exploitation
- Implement runtime enforcement of tool permission manifests independent
  of the model — the enforcement layer must not be bypassable through
  model manipulation
- Log all tool invocations with full parameter capture; feed into
  runtime anomaly detection for tool misuse patterns

**Advanced**
- PW.2.1-PS: Implement formal tool permission verification — automatically
  validate that deployed configurations match approved permission manifests
- PS.1.1-PS: Implement MCP tool descriptor integrity verification —
  hash-based check before loading any tool descriptor
- PW.1.1-PS: Include tool access scope changes in security design reviews;
  any expansion of tool access requires explicit security sign-off

#### Tools

| Tool | Type | Link |
|---|---|---|
| LAAF (LLM Agent Assessment Framework) | Open-source | https://github.com/OWASP/LAAF |
| Open Policy Agent (OPA) | Open-source | https://www.openpolicyagent.org |
| Guardrails AI | Open-source | https://github.com/guardrails-ai/guardrails |
| HashiCorp Vault | Open-source | https://www.vaultproject.io |

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling, LLM06 Excessive Agency
- DSGAI 2026: DSGAI06 Tool Plugin & Agent Data Exchange
- Other frameworks: OWASP NHI Top 10 NHI-5 – NIST CSF 2.0 PR.AC-1 – CWE-285

---

### ASI03 – Identity & Privilege Abuse

**Severity:** Critical

Agents inherit and cache credentials exploited for lateral movement.
Agents exploit misconfigured permissions, inherited credentials, or
inter-agent trust to access resources beyond their intended scope. In agentic
architectures, identity abuse is particularly dangerous because agents may
chain tool calls that individually appear authorised but collectively achieve
unauthorised access through credential accumulation. SP 800-218A addresses
this through security requirements for privilege boundaries (PW.1), secure
coding for credential handling (PW.5), protection of identity and credential
stores (PS.1), and vulnerability monitoring for credential abuse incidents
(RV.1).

**Real-world references:**
- OAuth token inheritance in agent frameworks (2025) – agents inherited
  user OAuth tokens and used them to access resources beyond agent scope
- Multi-agent delegation exploit (2025) – sub-agents accumulated privileges
  from multiple delegating agents, exceeding any single agent's authorisation

#### SP 800-218A mapping

| SP 800-218A Practice | Sub-task | Relevance |
|---|---|---|
| PW.1.1-PS – Define security requirements | Define explicit privilege boundaries for each agent identity — unique NHI, maximum permitted privilege level, credential scope, and short TTL requirements | Establishes privilege boundaries as mandatory requirements |
| PW.5.1-PS – Secure coding practices | Implement secure credential handling — agents must not inherit user credentials, store tokens in context, or pass credentials between agents without explicit authorisation | Prevents credential leakage through agent code paths |
| PS.1.1-PS – Protect all code from unauthorised access | Protect credential stores, identity configurations, and privilege mapping files from unauthorised access and modification; encrypt at rest | Prevents tampering with privilege boundaries |
| RV.1.1-PS – Identify and confirm vulnerabilities | Establish monitoring and triage procedures for credential abuse incidents — detect agents operating beyond their assigned privilege level or using inherited credentials | Enables rapid detection of identity abuse in production |

#### Mitigations

**Foundational**
- PW.1.1-PS: Define explicit privilege boundaries for every agent identity
  — each agent must have its own NHI, credential scope, and privilege levels
  documented as mandatory deployment requirements; short TTL with automatic
  expiry
- PW.5.1-PS: Enforce that agents never inherit user credentials directly;
  implement credential brokering through a dedicated identity service that
  issues scoped, time-limited tokens for each agent operation
- PS.1.1-PS: Protect all credential stores and identity configuration with
  strict access controls; encrypt at rest and in transit; audit all access

**Hardening**
- PW.1.1-PS: Implement privilege attenuation in multi-agent delegation —
  sub-agents must receive equal or lesser privileges than the delegating
  agent; enforce in the orchestration layer, not relying on model judgment
- RV.1.1-PS: Deploy runtime monitoring for credential abuse indicators —
  agents accessing resources or invoking tools beyond their defined
  privilege level; alert and terminate on detection
- PW.5.1-PS: Conduct code review focused on credential handling in agent
  tool integrations — verify that tokens are scoped, rotated, and never
  persisted in agent memory or context

**Advanced**
- Implement formal privilege verification at every tool invocation — the
  tool execution layer must independently verify that the requesting agent
  has sufficient privilege for the specific operation
- RV.1.1-PS: Integrate credential abuse detection into your SIEM;
  correlate across agent identity, tool invocations, and resource access
  patterns for multi-step abuse detection
- PW.1.1-PS: Conduct regular privilege audit reviews — verify that deployed
  agent privilege levels match approved baselines; flag and remediate drift

#### Tools

| Tool | Type | Link |
|---|---|---|
| LAAF (LLM Agent Assessment Framework) | Open-source | https://github.com/OWASP/LAAF |
| HashiCorp Vault | Open-source | https://www.vaultproject.io |
| Open Policy Agent (OPA) | Open-source | https://www.openpolicyagent.org |
| SPIFFE/SPIRE | Open-source | https://spiffe.io |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI02 Agent Identity & Credential Exposure
- Other frameworks: OWASP NHI Top 10 (all entries) – MITRE ATLAS AML.T0015 – NIST CSF 2.0 PR.AC-4

---

### ASI04 – Agentic Supply Chain Vulnerabilities

**Severity:** High

Compromised tools, MCP servers, or model components alter agent behaviour.
Agentic AI systems depend on third-party tools, plugins, MCP servers, model
weights, agent frameworks, and orchestration libraries — any of which can be
compromised to inject backdoors, exfiltrate data, or redirect agent
behaviour. SP 800-218A addresses this through vetting of third-party
components (PW.4), integrity verification of all artefacts (PS.2), secure
model and artefact registries (PS.3), and supply chain vulnerability
monitoring (RV.1).

#### SP 800-218A mapping

| SP 800-218A Practice | Sub-task | Relevance |
|---|---|---|
| PW.4.1-PS – Reuse existing well-secured software | Vet all third-party agent components — tools, plugins, MCP servers, model weights, orchestration libraries — for provenance, integrity, and security posture before use | Prevents introduction of compromised components into agent pipelines |
| PS.2.1-PS – Verify software integrity | Verify integrity of all agent artefacts and third-party components using cryptographic signatures and checksums before deployment | Detects tampering in agent supply chain artefacts |
| PS.3.1-PS – Archive and protect software releases | Maintain a secure, versioned registry of all agent components with provenance records; enable auditability and rollback | Ensures traceability and recovery capability for supply chain incidents |
| RV.1.1-PS – Identify and confirm vulnerabilities | Monitor for newly disclosed vulnerabilities in third-party agent components; establish a triage process for AI-specific supply chain disclosures | Enables rapid response to supply chain compromises |

#### Mitigations

**Foundational**
- PW.4.1-PS: Establish an approved sources policy for all agent components
  — tools, plugins, MCP servers, model weights, and libraries must come
  from vetted sources; require security review sign-off before any new
  component enters a production agent pipeline
- Maintain a complete agent SBOM for every production deployment — model,
  tools, plugins, MCP servers, orchestration libraries, and their
  transitive dependencies
- PS.2.1-PS: Verify cryptographic signatures or checksums for all agent
  artefacts before deployment — do not deploy unsigned or unverified
  components

**Hardening**
- PS.3.1-PS: Implement a versioned, access-controlled agent component
  registry; all promoted components must have documented provenance and
  integrity attestation
- RV.1.1-PS: Subscribe to security advisories for all agent framework
  providers, tool vendors, and MCP server maintainers; define triage SLAs
  for supply chain disclosures
- PW.4.1-PS: Scan all third-party libraries in the agent stack using SCA
  tools; extend existing dependency scanning to cover agent-specific
  dependencies including tool descriptors and plugin manifests

**Advanced**
- PW.4.1-PS: Conduct security assessment of MCP servers and tool providers
  before integration — review their access patterns, data handling, and
  update mechanisms for potential supply chain attack vectors
- PS.2.1-PS: Implement automated supply chain integrity verification in
  CI/CD — block deployment on any component whose signature cannot be
  verified or whose provenance cannot be traced
- Extend agent SBOM to cover runtime-loaded components — MCP servers,
  dynamically discovered tools, and plugins fetched at inference time

#### Tools

| Tool | Type | Link |
|---|---|---|
| CycloneDX | Open-source | https://cyclonedx.org |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| OWASP Dependency-Check | Open-source | https://owasp.org/www-project-dependency-check/ |
| Sigstore | Open-source | https://www.sigstore.dev |

#### Cross-references
- LLM Top 10: LLM03 Supply Chain Vulnerabilities
- DSGAI 2026: DSGAI04 Data, Model & Artifact Poisoning
- Other frameworks: SSDF PW.4 – MITRE ATLAS AML.T0056 – CycloneDX ML SBOM

---

### ASI05 – Unexpected Code Execution

**Severity:** Critical

Agents that generate and execute code become RCE gateways. Agents with code
execution capabilities — code interpreters, shell access, or dynamic tool
generation — can be manipulated to execute arbitrary code on host systems,
escape sandboxes, or modify their own runtime environment. SP 800-218A
addresses this through threat modelling of code execution paths (PW.2),
secure coding for execution sandboxing (PW.5), adversarial testing of
sandbox escapes (PW.8), and protection of execution environments (PS.1).

**Real-world references:**
- Code interpreter sandbox escapes (2024-2025) – multiple demonstrations
  of agents escaping sandboxed code execution environments to access host
  file systems and network resources
- Self-modifying agent code (2025) – agents generated code that altered
  their own tool definitions and execution constraints

#### SP 800-218A mapping

| SP 800-218A Practice | Sub-task | Relevance |
|---|---|---|
| PW.2.1-PS – Design software to meet security requirements | Threat model all code execution paths in agent workflows; design sandboxing, resource limits, and execution constraints as explicit security requirements | Ensures code execution boundaries are designed before implementation |
| PW.5.1-PS – Secure coding practices | Implement secure coding for agent code execution — sandbox isolation, input validation for code generation, output filtering, and prevention of self-modification | Prevents code execution vulnerabilities in agent implementation |
| PW.8.2-PS – Test for security vulnerabilities | Conduct adversarial testing targeting code execution — sandbox escapes, resource limit bypasses, self-modification, and host system access through generated code | Validates execution boundary controls under attack conditions |
| PS.1.1-PS – Protect all code from unauthorised access | Protect agent execution environments, sandbox configurations, and runtime constraints from unauthorised modification | Prevents weakening of execution boundaries through configuration tampering |

#### Mitigations

**Foundational**
- PW.2.1-PS: Threat model all code execution capabilities in agent
  workflows — identify every path through which an agent can generate,
  execute, or influence code execution; design mandatory sandboxing for
  each path
- PW.5.1-PS: Enforce strict sandbox isolation for all agent code execution
  — no network access, no host filesystem access, resource limits on CPU,
  memory, and execution time; enforce at the infrastructure level, not
  relying on model compliance
- PS.1.1-PS: Protect sandbox configurations and execution environment
  settings as security artefacts; prevent agents from modifying their own
  execution constraints

**Hardening**
- PW.8.2-PS: Include sandbox escape scenarios in adversarial testing —
  test code generation that attempts to access host resources, modify
  sandbox configuration, or establish network connections
- PW.5.1-PS: Implement allowlisting for code execution — define permitted
  language subsets, library imports, and system calls; block all others by
  default
- Deploy code analysis on agent-generated code before execution — static
  analysis for dangerous patterns, blocked imports, and known escape
  techniques

**Advanced**
- PW.8.2-PS: Conduct formal sandbox escape red team exercises against your
  specific execution environment; document residual risk and required
  compensating controls
- PW.2.1-PS: Implement defence in depth for code execution — multiple
  independent containment layers (container, seccomp, network policy) so
  that no single bypass grants host access
- PS.1.1-PS: Implement runtime integrity monitoring of sandbox
  configurations — alert on any modification to execution constraints
  during agent operation

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| gVisor | Open-source | https://gvisor.dev |
| Firecracker | Open-source | https://firecracker-microvm.github.io |
| Semgrep | Open-source | https://semgrep.dev |

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling
- DSGAI 2026: DSGAI12 Unsafe NL Data Gateways
- Other frameworks: CWE-94 – MITRE ATLAS AML.T0015 – NIST CSF 2.0 PR.DS-5

---

### ASI06 – Memory & Context Poisoning

**Severity:** High

Persistent memory poisoning causes systematic incorrect behaviour.
Adversaries corrupt agent memory stores — persistent memory, conversation
history, shared context between agents, or RAG retrieval sources — to
influence future agent behaviour across sessions. In multi-agent systems,
poisoned shared memory can propagate malicious influence across multiple
agents. SP 800-218A addresses this through protection of memory and context
stores (PS.1), versioned memory snapshots for rollback (PS.3), behaviour
review for memory-influenced anomalies (PW.7), and root cause analysis
for poisoning incidents (RV.3).

**Real-world references:**
- Persistent memory poisoning (2025) – adversarial inputs stored in agent
  long-term memory influenced all future sessions for the affected user
- Multi-agent context propagation (2025) – poisoned context from one agent
  propagated through shared memory to corrupt decision-making across an
  entire agent swarm

#### SP 800-218A mapping

| SP 800-218A Practice | Sub-task | Relevance |
|---|---|---|
| PS.1.1-PS – Protect all code from unauthorised access | Protect agent memory stores, context databases, and shared state repositories from unauthorised read, write, and modification; enforce access controls per agent identity | Prevents direct tampering with agent memory and context |
| PS.3.1-PS – Archive and protect software releases | Maintain versioned, integrity-verified snapshots of agent memory and context stores; enable rollback to pre-poisoning states | Ensures recovery capability for memory poisoning incidents |
| PW.7.2-PS – Review the software for security vulnerabilities | Review agent behaviour for memory-influenced anomalies — verify that persistent memory and shared context do not introduce unintended behaviour changes across sessions | Catches memory poisoning effects before they propagate |
| RV.3.1-PS – Analyse root causes | When memory poisoning is detected, conduct forensic analysis to identify the poisoned records, their ingestion source, propagation path, and blast radius across agents | Enables thorough incident response for memory poisoning events |

#### Mitigations

**Foundational**
- PS.1.1-PS: Implement access controls on all agent memory stores — enforce
  per-agent identity isolation; only the owning agent can write to its
  memory, all access logged with full audit trail
- PS.3.1-PS: Implement memory versioning — maintain integrity-verified
  snapshots of agent memory at regular intervals; enable rollback to
  pre-poisoning checkpoints on detection
- PW.7.2-PS: Include memory influence scenarios in pre-release behaviour
  reviews — verify that poisoned memory entries cannot redirect agent
  behaviour outside acceptable bounds

**Hardening**
- PS.1.1-PS: Enforce trust domain separation in agent context — data from
  different trust levels (user input, tool output, system instructions,
  retrieved documents) must be tagged and processed with appropriate trust
  boundaries
- RV.3.1-PS: Establish a memory poisoning forensics playbook — procedures
  for isolating poisoned records, tracing to ingestion source, determining
  propagation to other agents, and measuring influence on agent behaviour
- Implement memory content validation — apply anomaly detection to new
  memory entries before persistence; flag entries inconsistent with
  expected content patterns

**Advanced**
- Apply memory decay and expiration policies — bound the influence of any
  single memory entry over time; implement automatic pruning of aged
  memory that has not been validated
- PW.7.2-PS: Implement continuous memory integrity monitoring — alert on
  statistical distribution changes in memory stores that may indicate
  ongoing poisoning campaigns
- RV.3.1-PS: Build automated memory forensic capability — on detection of
  anomalous agent behaviour, automatically capture memory state, identify
  suspect entries, and correlate with ingestion events

#### Tools

| Tool | Type | Link |
|---|---|---|
| LAAF (LLM Agent Assessment Framework) | Open-source | https://github.com/OWASP/LAAF |
| Garak | Open-source | https://github.com/leondz/garak |
| Weaviate (with RBAC) | Open-source | https://weaviate.io |
| Great Expectations | Open-source | https://greatexpectations.io |

#### Cross-references
- LLM Top 10: LLM04 Data & Model Poisoning, LLM08 Vector & Embedding Weaknesses
- DSGAI 2026: DSGAI13 Vector Store Platform Security
- Other frameworks: MITRE ATLAS AML.T0032 – NIST CSF 2.0 PR.DS-8 – ISO 42001 6.1.2

---

### ASI07 – Insecure Inter-Agent Communication

**Severity:** High

A2A channels lacking authentication enable agent-in-the-middle attacks.
Agents in multi-agent systems communicate without proper authentication,
encryption, or schema validation — enabling spoofing, replay attacks, message
manipulation, and lateral movement across agent trust boundaries. SP 800-218A
addresses this through threat modelling of A2A communication paths (PW.2),
secure coding for authentication and encryption (PW.5), behaviour review
for A2A anomalies (PW.7), and protection of A2A configuration (PS.1).

#### SP 800-218A mapping

| SP 800-218A Practice | Sub-task | Relevance |
|---|---|---|
| PW.2.1-PS – Design software to meet security requirements | Threat model all inter-agent communication paths; design mutual authentication, encryption, schema validation, and replay protection as explicit security requirements | Ensures A2A security is addressed at design time |
| PW.5.1-PS – Secure coding practices | Implement secure coding for A2A communication — mutual TLS, message signing, schema validation on all inter-agent messages; no unauthenticated A2A in any environment | Prevents A2A security vulnerabilities in implementation |
| PW.7.2-PS – Review the software for security vulnerabilities | Review inter-agent communication for security weaknesses — verify that authentication, encryption, and schema validation are correctly implemented at all A2A boundaries | Catches A2A vulnerabilities before production |
| PS.1.1-PS – Protect all code from unauthorised access | Protect A2A configuration, certificates, and authentication credentials from unauthorised access and modification | Prevents tampering with A2A security controls |

#### Mitigations

**Foundational**
- PW.2.1-PS: Threat model all inter-agent communication paths — identify
  every A2A channel, design mutual authentication and encryption as
  mandatory requirements; no unauthenticated A2A in any environment
- PW.5.1-PS: Implement mutual TLS for all A2A communication; validate
  message schemas at each boundary; implement replay protection
- PS.1.1-PS: Protect A2A certificates and authentication credentials as
  security-critical artefacts; rotate regularly

**Hardening**
- PW.7.2-PS: Include A2A security scenarios in pre-release reviews —
  verify that spoofing, replay, and schema violation attacks are mitigated
  across all inter-agent boundaries
- Implement message signing for all A2A instructions; verify signatures
  at each boundary before processing
- Log complete A2A message traces with sender identity, content hash,
  and schema validation results for forensic analysis

**Advanced**
- PW.2.1-PS: Formally specify permitted A2A communication patterns — only
  pre-approved agent-to-agent interactions can execute in production
- PW.5.1-PS: Implement short-lived A2A certificates with automated rotation;
  hardware-backed keys for highest-risk agent clusters
- Monitor for distributed attacks spanning multiple A2A channels — detect
  coordinated manipulation across the agent network

#### Tools

| Tool | Type | Link |
|---|---|---|
| SPIFFE/SPIRE | Open-source | https://spiffe.io |
| Istio | Open-source | https://istio.io |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |

#### Cross-references
- DSGAI 2026: DSGAI02 Agent Identity & Credential Exposure
- Other frameworks: OWASP NHI Top 10 NHI-4/NHI-7 – MITRE ATLAS AML.T0015 – CWE-285

---

### ASI08 – Cascading Agent Failures

**Severity:** High

Single-point faults propagate through multi-agent workflows. Autonomous
agent workflows amplify errors, hallucinations, or malicious inputs through
cascading automation — a single faulty output from one agent or tool
propagates through downstream agents, triggers additional automated actions,
and escalates into system-wide failures or runaway cost. SP 800-218A
addresses this through resource and availability constraints in design
(PW.2), adversarial testing of cascade failure paths (PW.8), remediation
procedures for automation runaway incidents (RV.2), and security
requirements for automation boundaries (PW.1).

#### SP 800-218A mapping

| SP 800-218A Practice | Sub-task | Relevance |
|---|---|---|
| PW.2.1-PS – Design software to meet security requirements | Design circuit breakers, step limits, cost budgets, and human approval gates as explicit security requirements for all agentic automation workflows | Ensures cascade prevention is a design-phase requirement |
| PW.8.2-PS – Test for security vulnerabilities | Conduct adversarial testing of cascade failure paths — test error propagation, hallucination amplification, and runaway automation scenarios | Validates cascade prevention controls under attack conditions |
| RV.2.1-PS – Assess, prioritise, and remediate vulnerabilities | Define remediation procedures for cascade failure incidents including automatic circuit breaker activation, workflow suspension, cost cap enforcement, and rollback | Enables rapid response to cascading automation failures |
| PW.1.1-PS – Define security requirements | Define explicit requirements for maximum automation depth, step limits, cost budgets, and mandatory human checkpoints for each agent workflow | Establishes automation boundaries as mandatory requirements |

#### Mitigations

**Foundational**
- PW.2.1-PS: Design mandatory circuit breakers for all agentic automation
  workflows — define maximum step counts, execution time limits, cost
  budgets, and error thresholds that trigger automatic workflow suspension
- PW.1.1-PS: Define explicit requirements for human-in-the-loop checkpoints
  — identify decision points in agent workflows where human review is
  mandatory before proceeding; enforce in architecture, not relying on
  model judgment
- Implement per-workflow and per-session cost budgets with automatic
  suspension on breach — alerting alone is insufficient for autonomous
  systems

**Hardening**
- PW.8.2-PS: Include cascade failure scenarios in adversarial testing —
  test error propagation chains, hallucination amplification through
  multi-agent workflows, and cost runaway under adversarial input
  conditions
- RV.2.1-PS: Define and test automated response to cascade indicators —
  workflow suspension, agent isolation, cost circuit breaker activation,
  and stakeholder notification; exercise procedures quarterly
- Implement output validation between agent steps — each agent in a chain
  validates the output of the preceding agent before proceeding; reject
  and escalate on validation failure

**Advanced**
- PW.8.2-PS: Conduct chaos engineering exercises against agentic workflows
  — inject failures, hallucinations, and adversarial tool outputs at
  random points to validate cascade prevention controls
- Implement adaptive circuit breakers with anomaly detection — thresholds
  adjust dynamically based on workflow context and historical patterns
- RV.2.1-PS: Document RTO and RPO for agentic automation services; include
  cascade failure scenarios in your AI incident response plan with specific
  recovery procedures

#### Tools

| Tool | Type | Link |
|---|---|---|
| LiteLLM | Open-source | https://github.com/BerriAI/litellm |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| LangSmith | Commercial | https://smith.langchain.com |
| Kong Gateway | Open-source | https://github.com/Kong/kong |

#### Cross-references
- LLM Top 10: LLM10 Unbounded Consumption
- DSGAI 2026: DSGAI17 Data Availability & Resilience Failures
- Other frameworks: CWE-400 – ISA/IEC 62443 SR 7.1 – NIST SP 800-82 Rev 3

---

### ASI09 – Human-Agent Trust Exploitation

**Severity:** Medium

Agents build false trust enabling manipulation of human approvers. Agents
establish unwarranted trust with human operators through apparent competence,
conversational rapport, or presentation authority, then exploit that trust
to obtain approvals for harmful actions, bypass oversight, or suppress
safety concerns. SP 800-218A addresses this through behaviour review for
trust manipulation patterns (PW.7), adversarial testing of trust
exploitation vectors (PW.8), vulnerability identification for trust
exploitation incidents (RV.1), and security requirements for human oversight
mechanisms (PW.1).

#### SP 800-218A mapping

| SP 800-218A Practice | Sub-task | Relevance |
|---|---|---|
| PW.7.2-PS – Review the software for security vulnerabilities | Review agent behaviour for trust manipulation patterns — verify that agents cannot build false authority, suppress safety warnings, or manipulate approval processes | Catches trust exploitation risks before production |
| PW.8.2-PS – Test for security vulnerabilities | Conduct adversarial testing targeting human-agent trust exploitation — test whether agents can manipulate operators into approving harmful actions through false confidence or urgency | Validates trust controls under realistic conditions |
| RV.1.1-PS – Identify and confirm vulnerabilities | Establish monitoring for trust exploitation indicators — operators approving high-risk actions without verification, systematic over-reliance on agent recommendations | Enables detection of trust exploitation in production |
| PW.1.1-PS – Define security requirements | Define explicit requirements for human oversight — mandatory confirmation gates, independent approval flows, AI advisory labelling, and operator training requirements | Establishes human oversight as a mandatory requirement |

#### Mitigations

**Foundational**
- PW.1.1-PS: Define explicit requirements for human oversight — mandatory
  confirmation gates for irreversible actions, independent approval flows
  not through agent interface, AI advisory labelling requirements
- PW.7.2-PS: Include trust exploitation scenarios in pre-release reviews —
  verify agents cannot build false authority or manipulate approval processes
- Define a policy requiring security awareness training for all users of
  agentic tools — AI limitations, verification requirements, how to
  identify manipulation

**Hardening**
- PW.8.2-PS: Include trust exploitation scenarios in adversarial testing —
  test whether agents can manipulate operators into approving harmful
  actions through false confidence, urgency, or apparent authority
- RV.1.1-PS: Deploy monitoring for trust exploitation patterns — aggregate
  over-trust indicators, detect systematic reliance on agent recommendations
  without independent verification
- Implement AI advisory labelling in all interface contexts; enforce visual
  distinction from authoritative system content

**Advanced**
- PW.8.2-PS: Establish dedicated research capability focused on human-agent
  trust exploitation — proactively identify manipulation vectors before
  production deployment
- PW.7.2-PS: Implement continuous trust exploitation monitoring — detect
  and alert on operators exhibiting over-trust patterns across sessions
- RV.1.1-PS: Contribute findings from trust exploitation incidents to
  community knowledge bases

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| LangSmith | Commercial | https://smith.langchain.com |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| MITRE ATLAS | Reference | https://atlas.mitre.org |

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- DSGAI 2026: DSGAI21 Disinformation & Integrity Attacks
- Other frameworks: EU AI Act Art. 13/50 – ENISA AI Threat Landscape – ISO 42001 A.6.2.6

---

### ASI10 – Rogue Agents

**Severity:** Critical

Compromised agents pursue hidden goals while appearing compliant. Agents
operate outside their intended boundaries — pursuing hidden objectives,
executing undisclosed tool calls, or systematically biasing recommendations
— while maintaining an appearance of normal operation. Unlike traditional
software failures, rogue agent behaviour may be semantically subtle — an
agent that consistently steers recommendations in a specific direction or
that maintains hidden state between sessions. SP 800-218A addresses this
through behaviour review for rogue agent indicators (PW.7), adversarial
testing of detection capability (PW.8), vulnerability monitoring for rogue
behaviour in production (RV.1), and root cause analysis for rogue agent
incidents (RV.3).

#### SP 800-218A mapping

| SP 800-218A Practice | Sub-task | Relevance |
|---|---|---|
| PW.7.2-PS – Review the software for security vulnerabilities | Review agent behaviour for rogue agent indicators — verify that agents cannot pursue hidden goals, execute undisclosed tool calls, or maintain hidden state between sessions | Catches rogue agent risks before production |
| PW.8.2-PS – Test for security vulnerabilities | Conduct adversarial testing simulating rogue agent scenarios — persistent hidden goal pursuit, undisclosed tool invocations, systematic recommendation bias across extended sessions | Validates rogue agent detection under realistic conditions |
| RV.1.1-PS – Identify and confirm vulnerabilities | Establish comprehensive monitoring for rogue agent behaviour — behavioural baseline deviation, hidden tool invocations, recommendation bias; define triage and containment procedures | Enables rapid detection and containment of rogue agents |
| RV.3.1-PS – Analyse root causes | When rogue agent behaviour is detected, conduct root cause analysis to identify the trigger — model compromise, configuration tampering, emergent behaviour, or adversarial manipulation | Builds organisational knowledge of rogue agent risks |

#### Mitigations

**Foundational**
- RV.1.1-PS: Establish comprehensive agent monitoring — all agent actions
  logged with full observability; no production deployment without complete
  audit trail; behavioural baselines established during commissioning
- PW.7.2-PS: Include rogue agent scenarios in pre-release reviews — verify
  that agents cannot pursue hidden goals or execute undisclosed tool calls
  outside their defined scope
- Enforce scope constraints — rogue agent cannot exceed permission envelope
  regardless of internal goal; enforced at infrastructure level

**Hardening**
- PW.8.2-PS: Include rogue agent scenarios in adversarial testing —
  simulate persistent hidden goal pursuit across extended sessions;
  verify that detection capability holds under realistic conditions
- RV.3.1-PS: Establish rogue agent forensics playbook — procedures for
  isolating suspect agents, capturing state, identifying the trigger,
  and measuring the blast radius of rogue behaviour
- Aggregate recommendation analysis — periodic review detects systematic
  bias before operational harm

**Advanced**
- PW.8.2-PS: Conduct extended red-team exercises simulating rogue agents
  across multi-session operations; test detection across agent lifetimes
- PW.7.2-PS: Implement continuous behavioural monitoring — detect and
  alert on agents exhibiting patterns beyond their defined profile,
  including subtle recommendation drift and hidden state maintenance
- RV.1.1-PS: Contribute findings from rogue agent incidents to community
  knowledge bases — collaborate with OWASP and MITRE ATLAS

#### Tools

| Tool | Type | Link |
|---|---|---|
| LAAF (LLM Agent Assessment Framework) | Open-source | https://github.com/OWASP/LAAF |
| Garak | Open-source | https://github.com/leondz/garak |
| LangSmith | Commercial | https://smith.langchain.com |
| OpenTelemetry | Open-source | https://opentelemetry.io |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI16 Endpoint & Browser Overreach
- Other frameworks: EU AI Act Art. 14/15 – MITRE ATLAS – CWE-284

---

## Implementation priority

| Phase | PW – Produce | PS – Protect | RV – Respond |
|---|---|---|---|
| 1 – Now | PW.2.1-PS threat models for ASI01/05/07/08; PW.1.1-PS requirements for ASI02/03/09 | PS.1.1-PS access controls on agent memory, credentials, A2A config, and tool manifests (ASI02/03/06/07) | RV.1.1-PS monitoring for ASI01/03/10; triage procedures |
| 2 – This sprint | PW.5.1-PS secure coding for ASI03/05/07; PW.4.1-PS dependency vetting for ASI04 | PS.2.1-PS integrity verification in CI/CD for ASI04; PS.3.1-PS agent component registry for ASI04/06 | RV.2.1-PS remediation procedures for ASI08 |
| 3 – This quarter | PW.7.2-PS behaviour reviews for all 10 entries; PW.8.2-PS adversarial tests for ASI01/05/08/09/10 | PS.3.1-PS versioned registry with rollback for all agent artefacts | RV.3.1-PS root cause playbooks for ASI06/10 |
| 4 – Ongoing | PW.8.2-PS continuous red-team programme; threat model refresh on new tool integrations | Supply chain integrity monitoring; agent SBOM refresh | Production monitoring; incident response exercises |

---

## References

- [NIST SP 800-218A (Initial Public Draft, March 2024)](https://doi.org/10.6028/NIST.SP.800-218A.ipd)
- [NIST SSDF (SP 800-218)](https://csrc.nist.gov/publications/detail/sp/800-218/final)
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [NIST AI RMF 1.0](https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf)
- [MITRE ATLAS](https://atlas.mitre.org)
- [CycloneDX ML SBOM](https://cyclonedx.org/capabilities/mlbom/)

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-05-25 | 2026-Q2 | Remediate ASI entry names, severities, descriptions, and control mappings to canonical Agentic Top 10 2026 | OWASP GenAI Data Security Initiative |
| 2026-03-28 | 2026-Q1 | Initial mapping – ASI01–ASI10 full entries | OWASP GenAI Data Security Initiative |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) –
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
