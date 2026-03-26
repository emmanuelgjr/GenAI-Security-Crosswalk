<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01-ASI10)
  Framework   : ISO/IEC 27001:2022 — Information Security Management Systems
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 x ISO/IEC 27001:2022

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
to [ISO/IEC 27001:2022](https://www.iso.org/standard/82875.html).

ISO 27001:2022 is the most widely certified information security
management system standard globally. Its 2022 revision added 11 new
Annex A controls — including A.5.7 threat intelligence, A.8.2
privileged access rights, A.8.10 information deletion, and A.8.12
data leakage prevention — that map directly to the agentic AI risk
surface.

The agentic Top 10 creates a distinctive ISO 27001 compliance challenge:
agents are systems that act, not just systems that hold data. Standard
access controls were designed for users requesting access to resources.
Agents autonomously request and use access as part of multi-step task
execution — the threat model is fundamentally different. This mapping
translates each agentic risk into the ISO 27001 Annex A controls that
address it, with notes on where standard controls require augmentation
for agentic-specific scenarios.

For the LLM Top 10 x ISO 27001 mapping see LLM_ISO27001.md.
For the DSGAI 2026 x ISO 27001 mapping see DSGAI_ISO27001.md.

---

## ISO 27001:2022 Annex A domains

| Domain | Controls | Agentic relevance |
|---|---|---|
| A.5 Organisational | A.5.1-A.5.37 | Policies, roles, supplier security, threat intelligence, incident management |
| A.6 People | A.6.1-A.6.8 | Screening, training, remote working |
| A.7 Physical | A.7.1-A.7.14 | Physical access — limited relevance to agentic AI |
| A.8 Technological | A.8.1-A.8.34 | Access, cryptography, logging, secure development, DLP |

**New in 2022 most relevant to agentic AI:**
A.5.7 Threat intelligence · A.8.2 Privileged access rights ·
A.8.9 Configuration management · A.8.10 Information deletion ·
A.8.11 Data masking · A.8.12 Data leakage prevention ·
A.8.15 Logging · A.8.16 Monitoring activities ·
A.8.28 Secure coding

---

## Quick-reference summary

| ID | Name | Severity | Primary ISO 27001:2022 Controls | Tier | Scope |
|---|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | Critical | A.8.28, A.8.29, A.8.16, A.5.7 | Foundational-Advanced | Both |
| ASI02 | Tool Misuse and Exploitation | Critical | A.8.2, A.8.15, A.5.10, A.8.29 | Foundational-Advanced | Both |
| ASI03 | Identity and Privilege Abuse | Critical | A.8.2, A.5.16, A.5.17, A.8.15 | Foundational-Advanced | Both |
| ASI04 | Agentic Supply Chain | High | A.5.19, A.5.20, A.5.21, A.8.8 | Foundational-Hardening | Both |
| ASI05 | Unexpected Code Execution | Critical | A.8.28, A.8.26, A.8.29, A.8.16 | Hardening-Advanced | Build |
| ASI06 | Memory and Context Poisoning | High | A.8.15, A.8.9, A.8.10, A.8.16 | Hardening-Advanced | Both |
| ASI07 | Insecure Inter-Agent Comms | High | A.8.24, A.5.14, A.8.15, A.8.28 | Hardening-Advanced | Build |
| ASI08 | Cascading Agent Failures | High | A.5.30, A.8.13, A.8.14, A.5.24 | Foundational-Advanced | Both |
| ASI09 | Human-Agent Trust Exploitation | Medium | A.5.10, A.6.3, A.8.16, A.5.36 | Foundational-Hardening | Both |
| ASI10 | Rogue Agents | Critical | A.8.16, A.8.15, A.5.7, A.5.24 | Hardening-Advanced | Both |

---

## Audience tags

- **CISO / governance** — full file, ISO 27001 ISMS extension for agentic AI
- **Auditor / certifier** — control mapping evidence for ISO 27001 certification
- **Security engineer** — A.8 technological controls throughout
- **IAM / identity team** — ASI03 NHI governance entry
- **Compliance officer** — A.5 organisational controls, supplier management entries
- **OT engineer** — ASI02, ASI08 with ISA 62443 crosswalk notes

---

## Detailed mappings

---

### ASI01 — Agent Goal Hijack

**Severity:** Critical

An attacker redirects agent objectives through direct or indirect
instruction injection — the agent autonomously executes a multi-step
attack chain. ISO 27001 addresses this through secure coding (A.8.28),
security testing (A.8.29), threat intelligence (A.5.7), and monitoring
(A.8.16). The foundational governance control is that goal hijack must
be documented in the ISMS risk register before any agentic deployment.

#### ISO 27001:2022 mapping

| Control | ID | Domain | How it applies |
|---|---|---|---|
| Secure coding | A.8.28 | Technological | Secure coding requirements covering input validation, goal-state verification, and context separation for all agent integration code |
| Security testing | A.8.29 | Technological | Adversarial testing programme covering goal hijack scenarios — direct, indirect via RAG, multi-turn attacks |
| Monitoring activities | A.8.16 | Technological | Runtime monitoring for goal hijack indicators — deviation from stated session goal triggers alert |
| Threat intelligence | A.5.7 | Organisational | Active intelligence on prompt injection and goal hijack techniques — new attack patterns inform detection and testing |

#### Mitigations by tier

**Foundational**
- Document goal hijack as a foreseeable risk in the ISMS
  risk register for every agentic deployment — likelihood,
  impact, treatment decision, and owner assigned
- A.8.28: Establish secure coding requirements for all
  agent integration code — input validation and goal-state
  verification as mandatory coding standards
- Implement operator kill switch — operator-accessible
  mechanism to halt all agent activity immediately,
  documented and tested

**Hardening**
- A.8.29: Include goal hijack in security testing programme —
  direct injection, indirect via all data sources the agent
  processes, multi-turn manipulation — before each release
- A.8.16: Deploy runtime monitoring for goal deviation —
  agent actions inconsistent with stated session goal
  trigger immediate alert and suspension
- A.5.7: Subscribe to threat intelligence on prompt injection
  and goal hijack techniques — new methods inform test
  cases and detection signatures

**Advanced**
- Implement cryptographically signed goal specifications —
  runtime deviation from signed goal triggers automatic
  suspension, documented as A.8.28 design control
- A.8.29: Extend adversarial testing to all indirect
  injection surfaces — RAG sources, tool descriptors,
  email, documents, all data sources the agent processes
- A.5.7: Quarterly red team exercises using novel techniques
  from current threat intelligence — results feed into
  A.8.28 secure coding updates

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| Invariant Analyzer | Open-source | https://github.com/invariantlabs-ai/invariant |
| PyRIT | Open-source | https://github.com/Azure/PyRIT |

#### Cross-references
- LLM Top 10: LLM01 Prompt Injection, LLM06 Excessive Agency
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: AIUC-1 B001/B005/B006 · NIST AI RMF GV-1.7 · EU AI Act Art. 14

---

### ASI02 — Tool Misuse and Exploitation

**Severity:** Critical

Agents misuse legitimate tools — calling them with destructive
parameters or in unexpected sequences. ISO 27001 A.8.2 privileged
access rights is the foundational control — all agent tool access
must be managed as privileged access with formal lifecycle management,
minimum scope, and regular review.

#### ISO 27001:2022 mapping

| Control | ID | Domain | How it applies |
|---|---|---|---|
| Privileged access rights | A.8.2 | Technological | Agent tool access managed as privileged access — minimum scope, formal review, short-lived credentials per tool |
| Logging | A.8.15 | Technological | All agent tool invocations logged — tool identity, parameters, invoking session, timestamp — immutable audit trail |
| Acceptable use of assets | A.5.10 | Organisational | Policy defining acceptable agent tool use — approved operations documented, human confirmation for irreversible |
| Security testing | A.8.29 | Technological | Tool misuse scenarios in security testing — destructive parameter injection, tool chaining, MCP descriptor poisoning |

#### Mitigations by tier

**Foundational**
- A.8.2: Manage all agent tool access as privileged access —
  minimum scope enforced, regular reviews, no standing
  broad permissions across multiple tools
- A.5.10: Establish acceptable use policy for agent tool
  invocations — approved operations documented, human
  confirmation required for irreversible tool calls
- A.8.15: Log all agent tool invocations with full context —
  every tool call auditable with parameters and session

**Hardening**
- A.8.29: Include tool misuse scenarios in security testing —
  destructive parameter injection, unusual tool combinations,
  MCP descriptor poisoning — before each release
- Validate all tool descriptors before agent loading —
  any hidden instruction triggers rejection, documented
  as A.8.9 configuration management control
- A.8.2: Quarterly review of agent tool permissions —
  any permission not actively used in 30 days is removed

**Advanced**
- Implement per-invocation parameter validation —
  all tool parameters validated against safe ranges
  before execution, documented as A.8.28 coding control
- A.8.29: Red team exercises targeting tool chain
  exploitation — attempt destructive outcomes through
  legitimate tool invocations on your specific deployment
- A.8.15: Integrate tool invocation anomaly detection
  into SIEM — unusual parameter patterns, high-frequency
  invocations, out-of-hours calls alerted

#### Tools

| Tool | Type | Link |
|---|---|---|
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |
| MCP Inspector | Open-source | https://github.com/modelcontextprotocol/inspector |
| Guardrails AI | Open-source | https://github.com/guardrails-ai/guardrails |

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling, LLM06 Excessive Agency
- DSGAI 2026: DSGAI06 Tool Plugin and Agent Data Exchange, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: AIUC-1 B006/B007 · ISO 42001 A.6.1.2 · ISA/IEC 62443 SR 2.2 (OT)

---

### ASI03 — Identity and Privilege Abuse

**Severity:** Critical

Agents inherit and cache credentials that, when compromised, expose
all systems the agent has access to. ISO 27001 A.8.2 privileged
access rights and A.5.16 identity management are the primary controls.
The 2022 revision's emphasis on privileged access management maps
directly to the NHI (Non-Human Identity) governance challenge that
agentic AI creates.

**NHI governance note:** Every agent deployment creates Non-Human
Identities. ISO 27001 A.8.2 and A.5.16 apply to all identities —
human and non-human. Organisations with mature PAM programmes should
extend their existing controls to cover agent NHIs using the same
lifecycle management, minimum privilege, and anomaly detection they
apply to service accounts.

#### ISO 27001:2022 mapping

| Control | ID | Domain | How it applies |
|---|---|---|---|
| Privileged access rights | A.8.2 | Technological | Agent credentials managed as privileged access — minimum scope, short-lived, regular review, immediate revocation |
| Identity management | A.5.16 | Organisational | All agent identities inventoried and lifecycle-managed as non-human identities in the identity register |
| Authentication information | A.5.17 | Organisational | Secure management of agent credentials — no hardcoding, rotation enforced, secret manager required |
| Logging | A.8.15 | Technological | All agent credential operations logged — issuance, use, expiry, anomalous patterns detected |

#### Mitigations by tier

**Foundational**
- A.5.16: Inventory all agent identities — include in
  NHI register alongside service accounts, all agent
  NHIs with lifecycle management from day one
- A.5.17: Enforce no hardcoded credentials in agent code,
  prompts, or configuration — secret manager required
  for all agent credentials
- A.8.2: Issue short-lived, task-scoped credentials per
  agent invocation — never long-lived shared tokens
  across tasks or sessions

**Hardening**
- A.8.15: Log all agent credential operations — issuance,
  use, expiry, and anomalous access patterns — feed
  into SIEM for detection
- Implement JIT credential issuance — agents receive
  credentials only for task duration, automatically
  revoked on completion
- A.8.2: Include agent NHIs in privileged access reviews —
  quarterly scope review, any unused permission removed

**Advanced**
- Implement PKI-backed agent identities — certificate-based
  authentication for all agent-to-system connections
- A.8.15: Continuous NHI monitoring — anomalous credential
  usage across all agent sessions generates immediate alert
- A.5.16: Automated offboarding for decommissioned agents —
  all credentials revoked, access removed, NHI register
  updated — tested as part of ISMS procedures

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
loaded at runtime alter agent behaviour. ISO 27001 A.5.19-A.5.21
supplier security controls are the governance anchor — MCP servers
and dynamic tool providers are suppliers within ISMS scope.

#### ISO 27001:2022 mapping

| Control | ID | Domain | How it applies |
|---|---|---|---|
| Supplier relationships | A.5.19 | Organisational | Security requirements applied to all agent component vendors — provenance, integrity, disclosure obligations |
| Supplier agreements | A.5.20 | Organisational | Contractual security requirements for agent component vendors — integrity guarantees, vulnerability notification |
| Supply chain security | A.5.21 | Organisational | Managing ICT supply chain risks — agent tool providers and MCP servers explicitly in scope |
| Management of technical vulnerabilities | A.8.8 | Technological | Scanning and patching agent component vulnerabilities — CVE monitoring for all agent dependencies |

#### Mitigations by tier

**Foundational**
- A.5.19: Apply supplier security requirements to all agent
  component vendors — source documentation, integrity
  guarantees, and vulnerability disclosure contractually
  required before any component enters production
- A.8.8: Maintain ML SBOM for all agent deployments —
  model, tools, MCP servers, runtime libraries — scan
  against CVE databases
- Pin all component versions — no dynamic updates in
  production without review and approval

**Hardening**
- A.5.20: Include agent-specific requirements in supplier
  contracts — component provenance, backdoor scanning
  attestation, hidden instruction prohibition
- A.5.21: Develop supply chain security plan for agent
  components covering procurement, testing, deployment,
  update, and decommission lifecycle
- Verify cryptographic signatures of all components
  before loading — unsigned components rejected

**Advanced**
- A.5.19: Conduct periodic assessments of strategic
  agent component vendors — include in ISMS supplier
  management programme with defined cadence
- Operate isolated agent component evaluation environment —
  backdoor detection and behavioural testing before
  each production promotion
- A.5.21: Establish responsible disclosure relationship
  with all strategic component vendors — vulnerability
  notification SLA, tested annually

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

Agents that generate and execute code become RCE gateways. ISO 27001
A.8.28 secure coding and A.8.26 application security requirements
are the primary controls — code execution capability in any agent
requires its own security requirements specification and testing
programme.

#### ISO 27001:2022 mapping

| Control | ID | Domain | How it applies |
|---|---|---|---|
| Secure coding | A.8.28 | Technological | Secure coding requirements for all agent code generation — sandboxing, allowlisting, static analysis as mandatory |
| Application security requirements | A.8.26 | Technological | Security requirements for agent code execution interfaces — sandbox specifications, permitted operations |
| Security testing | A.8.29 | Technological | Sandbox escape and code injection in security testing programme — before any agent with code execution deploys |
| Monitoring activities | A.8.16 | Technological | Runtime monitoring of agent code execution — anomalous system calls detected and blocked |

#### Mitigations by tier

**Foundational**
- A.8.26: Define security requirements for any agent
  with code execution capability before development —
  sandbox specification, permitted operations, resource
  limits all documented
- Avoid agents with code execution capability unless
  strictly necessary — strongest control, document
  the business justification in ISMS if deployed
- A.8.28: Sandbox all agent code execution — no host
  filesystem, network, or OT API access without explicit
  allowlist

**Hardening**
- A.8.29: Include sandbox escape and code injection in
  security testing — test against your specific agent
  runtime and sandbox configuration before deployment
- Deploy static analysis of all agent-generated code
  before execution — A.8.28 coding control
- A.8.16: Runtime monitoring of agent code execution —
  all system calls logged, anomalous calls blocked and alerted

**Advanced**
- Hardware-level sandboxing — gVisor or Firecracker
  documented as A.8.28 advanced design control
- A.8.29: Red team exercises targeting code execution —
  attempt sandbox escape from within your specific
  runtime, document results in ISMS testing records
- A.8.26: Formal security review required for any code
  execution agent — ISMS change management process
  applied before any production deployment

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
across all future interactions. ISO 27001 A.8.15 logging, A.8.9
configuration management, and A.8.10 information deletion collectively
govern agent memory stores as information assets requiring full
lifecycle management.

#### ISO 27001:2022 mapping

| Control | ID | Domain | How it applies |
|---|---|---|---|
| Logging | A.8.15 | Technological | All agent memory write operations logged — provenance of content in agent memory traceable and auditable |
| Configuration management | A.8.9 | Technological | Agent memory store configuration managed — access controls, encryption, integrity settings version controlled |
| Information deletion | A.8.10 | Technological | Memory TTL enforced — entries expire per retention policy, deletion verified, no indefinite persistence |
| Monitoring activities | A.8.16 | Technological | Continuous monitoring of agent memory — statistical anomaly detection, access pattern analysis |

#### Mitigations by tier

**Foundational**
- A.8.9: Manage agent memory stores as configured assets —
  access controls, encryption, and integrity settings
  documented and version controlled
- A.8.15: Log all memory write operations — content hash,
  source, timestamp — anomalous writes detectable
- A.8.10: Enforce memory TTL — entries expire per defined
  retention policy, deletion verified, no indefinite
  persistence in any agent memory store

**Hardening**
- A.8.16: Implement continuous memory integrity monitoring —
  statistical anomaly detection on content and access
  patterns, alerts integrated into SIEM
- Implement memory segmentation by trust level — OT
  operational data and external web content in separate
  isolated namespaces with different access controls
- A.8.15: Full audit trail of all memory read and write
  operations — forensic capability for memory poisoning
  incidents

**Advanced**
- Cryptographic integrity verification of memory store
  contents — tamper detection between write and read
- A.8.16: Memory anomaly alerts integrated into SIEM —
  unusual access patterns treated as security events
  with defined response procedures
- A.8.10: Automated memory purge on agent decommission —
  all memory content deleted and deletion verified,
  documented as information deletion control

#### Tools

| Tool | Type | Link |
|---|---|---|
| Weaviate | Open-source | https://weaviate.io |
| Langfuse | Open-source | https://langfuse.com |
| LlamaIndex | Open-source | https://www.llamaindex.ai |

#### Cross-references
- LLM Top 10: LLM04 Data and Model Poisoning, LLM08 Vector and Embedding Weaknesses
- DSGAI 2026: DSGAI04 Data Model and Artifact Poisoning, DSGAI13 Vector Store Platform Security
- Other frameworks: AIUC-1 A/B002 · ISO 42001 A.7.2/A.7.4 · ISA/IEC 62443 SR 3.7 (OT)

---

### ASI07 — Insecure Inter-Agent Communication

**Severity:** High

A2A communication channels lacking authentication or encryption
enable spoofing and agent-in-the-middle attacks. ISO 27001 A.8.24
use of cryptography and A.5.14 information transfer are the primary
controls — A2A channels are information transfer paths requiring
the same protection as any other sensitive data flow.

#### ISO 27001:2022 mapping

| Control | ID | Domain | How it applies |
|---|---|---|---|
| Use of cryptography | A.8.24 | Technological | All A2A communication encrypted — TLS 1.3 minimum, mutual authentication, certificate management |
| Information transfer | A.5.14 | Organisational | Formal controls on A2A information transfer — authentication requirements, acceptable formats, logging |
| Logging | A.8.15 | Technological | All A2A communication logged — sender identity, content hash, timestamp — full audit trail |
| Secure coding | A.8.28 | Technological | A2A schema validation and replay protection implemented as secure coding requirements |

#### Mitigations by tier

**Foundational**
- A.8.24: Enforce encryption on all A2A channels —
  TLS 1.3 minimum, no cleartext agent messaging on
  any network segment
- A.5.14: Establish formal A2A information transfer policy —
  authentication requirements, acceptable message formats,
  logging obligations documented in ISMS
- A.8.15: Log all A2A communication — sender identity,
  message integrity hash, timestamp

**Hardening**
- A.8.28: Implement replay attack protection in A2A
  channels — nonces, timestamps, and sequence numbers
  as secure coding requirements
- Isolate A2A communication on dedicated network segment —
  separate from OT control traffic where applicable,
  documented in network security architecture
- A.8.24: Short-lived certificates for A2A authentication —
  automated rotation, certificate revocation capability

**Advanced**
- Implement mutual TLS for all production A2A channels —
  both sides authenticate before any message exchange
- A.8.15: Continuous A2A anomaly detection — unexpected
  message patterns, unusual agent pairings, out-of-scope
  content flagged and alerted through SIEM
- A.5.14: Annual review of A2A authentication methods
  and encryption standards — included in ISMS management
  review cycle

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
system-wide incidents. In OT environments, cascading failures can
cross from the AI layer into physical process control. ISO 27001
A.5.30 ICT readiness for business continuity is the primary control —
agent cluster failures are business continuity events.

**OT critical note:** In industrial environments this is Critical
severity. See Agentic_ISA62443.md for OT-specific controls.
Treat A.5.30 BCP coverage of agent clusters as mandatory for any
OT-adjacent agentic deployment.

#### ISO 27001:2022 mapping

| Control | ID | Domain | How it applies |
|---|---|---|---|
| ICT readiness for business continuity | A.5.30 | Organisational | Agent cluster failures in BCP — RTO/RPO defined, failover tested, cascade scenarios included |
| Backup | A.8.13 | Technological | Agent system state, memory stores, and configuration backed up — tested restoration procedure |
| Redundancy | A.8.14 | Technological | Redundancy for production agent infrastructure — circuit breakers, fail-safe defaults, graceful degradation |
| Incident management | A.5.24 | Organisational | Incident management procedures covering agent cascade events — detection, containment, recovery, lessons learned |

#### Mitigations by tier

**Foundational**
- A.8.14: Implement circuit breakers — automatic agent
  suspension when failure rate exceeds threshold, fail-safe
  default for all agents on suspension
- Define fail-safe modes — on suspension, process control
  continues without agent, operators notified immediately
- A.5.24: Establish incident response for agent cascade —
  defined escalation path, containment procedure, recovery steps

**Hardening**
- A.5.30: Include agent cluster failures in BCP — RTO
  and RPO defined per cluster, annual failover drills
  covering cascade scenarios
- A.8.13: Backup agent memory stores, configuration, and
  state — tested restoration procedure, clean state
  available for recovery
- Segment agent clusters by process area — blast radius
  limited by design, failure in one cluster cannot
  cascade to adjacent clusters

**Advanced**
- A.8.14: Conduct chaos engineering — intentional fault
  injection into multi-agent workflows, circuit breaker
  effectiveness verified against defined blast radius
- A.5.30: For OT-adjacent deployments, include agent
  cascade in OT business continuity planning — process
  control fallback procedures defined and tested
- A.5.24: Post-incident review process for all cascade
  events — root cause documented, improvement actions
  tracked in ISMS

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

Users anthropomorphise agents — enabling manipulated agents to
exploit operators into approving harmful actions. ISO 27001 A.5.10
acceptable use policy and A.6.3 security awareness training are
the governance controls — trust exploitation is a human behaviour
risk that training and policy address before technical controls.

#### ISO 27001:2022 mapping

| Control | ID | Domain | How it applies |
|---|---|---|---|
| Acceptable use of assets | A.5.10 | Organisational | Policy on agent output — advisory status disclosed, verification requirements for high-stakes decisions documented |
| Information security awareness training | A.6.3 | People | User and operator training on agent advisory limitations — mandatory before access to any agent decision-support system |
| Monitoring activities | A.8.16 | Technological | Production monitoring for trust exploitation patterns — aggregate analysis of agent-influenced decisions |
| Compliance with policies | A.5.36 | Organisational | Compliance with agent acceptable use policy monitored — verification requirements enforced |

#### Mitigations by tier

**Foundational**
- A.5.10: Establish acceptable use policy for agent
  advisory outputs — advisory status disclosed, verification
  requirements for regulated or safety-critical decisions
  documented and enforced
- A.6.3: Provide mandatory security awareness training
  on agent limitations — all users and operators trained
  before access granted, refreshed annually
- All agent output clearly labelled as AI-generated —
  operators cannot mistake agent recommendation for
  engineering-approved procedure

**Hardening**
- A.8.16: Implement monitoring for over-trust patterns —
  aggregate analysis of agent-influenced decisions,
  shift-level review for OT operators
- A.5.36: Monitor compliance with agent acceptable use
  policy — users following agent recommendations without
  independent verification flagged for retraining
- Output filtering to detect and block manipulative
  language patterns — documented as A.8.28 coding control

**Advanced**
- A.8.16: Deploy behavioural analysis detecting agent
  nudging toward specific approvals — alert on persuasion
  patterns across sessions
- A.6.3: Conduct operator competency assessments —
  verify operators can identify recommendations requiring
  independent verification
- A.5.10: Annual review of agent acceptable use policy —
  update based on new trust exploitation techniques
  and incident learnings

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- DSGAI 2026: DSGAI21 Disinformation and Integrity Attacks
- Other frameworks: EU AI Act Art. 50/52 · AIUC-1 C/F · ISO 42001 A.8.1

---

### ASI10 — Rogue Agents

**Severity:** Critical

Malicious or compromised agents appear compliant but pursue hidden
goals. ISO 27001 A.8.16 monitoring activities is the most critical
control — without continuous behavioural monitoring a rogue agent
can operate indefinitely. A.8.15 logging provides the forensic
foundation; A.5.7 threat intelligence informs detection logic.

#### ISO 27001:2022 mapping

| Control | ID | Domain | How it applies |
|---|---|---|---|
| Monitoring activities | A.8.16 | Technological | Continuous behavioural monitoring of all deployed agents — deviation from established baseline triggers tiered response |
| Logging | A.8.15 | Technological | Comprehensive audit logging of all agent actions — tool invocations, data access, recommendations, goal state |
| Threat intelligence | A.5.7 | Organisational | Intelligence on rogue agent techniques and indicators of compromise — informs detection signatures |
| Incident management | A.5.24 | Organisational | Rogue agent incident response — kill switch activation, audit procedure, operational impact assessment, root cause |

#### Mitigations by tier

**Foundational**
- A.8.15: Establish comprehensive audit logging for all
  agents from day one — no production deployment without
  full logging coverage, log integrity protected
- A.8.16: Define behavioural baseline during commissioning —
  expected invocation patterns, recommendation distributions,
  access volumes documented as monitoring baseline
- Operator-accessible kill switch — A.5.24 incident
  response prerequisite, documented and tested

**Hardening**
- A.8.16: Continuous behavioural monitoring — deviation
  from baseline triggers tiered response: log, alert,
  suspend, investigate — integrated into SIEM
- A.5.7: Subscribe to threat intelligence on agentic AI
  compromise techniques — indicators of rogue behaviour
  inform detection signatures
- A.5.24: Define rogue agent containment procedure —
  kill switch, audit checklist, operational impact
  assessment, forensic capture workflow

**Advanced**
- A.8.29: Conduct rogue agent red team exercises —
  simulate persistent hidden goal pursuit across
  extended sessions, verify detection capability holds
- Multi-agent consensus for high-stakes decisions —
  rogue single agent cannot influence critical outputs
  without cross-validation
- A.5.24: Post-incident review for all rogue agent events —
  root cause documented, controls updated, lessons
  learned fed back into ISMS improvement cycle

#### Tools

| Tool | Type | Link |
|---|---|---|
| Langfuse | Open-source | https://langfuse.com |
| Helicone | Open-source | https://www.helicone.ai |
| Wazuh | Open-source | https://wazuh.com |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI16 Endpoint and Browser Overreach
- Other frameworks: AIUC-1 B001/B002/C/E · EU AI Act Art. 14/15 · ISA/IEC 62443 SR 3.7 (OT)

---

## ISO 27001 ISMS extension checklist for agentic AI

### Scope and asset management

- [ ] All agent deployments identified within ISMS scope
- [ ] All agent NHIs in identity register (A.5.16)
- [ ] Agent memory stores, tool integrations, and A2A channels in asset inventory
- [ ] Classification policy applied to agent memory content and credential stores

### Policy updates

- [ ] Acceptable use policy updated to cover agent tool access and advisory outputs (A.5.10)
- [ ] Supplier agreements updated for tool and MCP server vendors (A.5.20)
- [ ] Information transfer policy covers A2A communication (A.5.14)
- [ ] Agent NHI governance included in PAM policy (A.8.2)

### Technical controls

- [ ] Agent credentials managed as privileged access — short-lived, scoped (A.8.2)
- [ ] All agent tool invocations logged (A.8.15)
- [ ] Agent memory stores encrypted, access-controlled, TTL enforced (A.8.9, A.8.10)
- [ ] A2A channels encrypted with TLS 1.3 minimum (A.8.24)
- [ ] Behavioural baselines established for all production agents (A.8.16)
- [ ] Kill switch implemented and tested (A.5.24)

### Testing and monitoring

- [ ] Goal hijack, tool misuse, and rogue agent scenarios in security testing (A.8.29)
- [ ] Code execution agents require security review before deployment (A.8.26)
- [ ] Cascade scenarios in BCP testing (A.5.30)
- [ ] Rogue agent detection rate as monitored security metric (A.8.16)
- [ ] Incident response procedures for all 10 ASI entries documented (A.5.24)

---

## Implementation priority

| Phase | ASI entries | ISO 27001 controls | Rationale |
|---|---|---|---|
| 1 — Do now | ASI01, ASI02, ASI03 | A.8.28, A.8.2, A.5.16 | Secure coding, privileged access, NHI governance close largest attack surface |
| 2 — This sprint | ASI05, ASI10 | A.8.26, A.8.16, A.8.15 | Code execution and rogue detection require design review and monitoring infrastructure |
| 3 — This quarter | ASI04, ASI06, ASI07 | A.5.19/5.21, A.8.9/8.10, A.8.24 | Supply chain, memory lifecycle, A2A encryption require pipeline-level changes |
| 4 — Ongoing | ASI08, ASI09 | A.5.30, A.6.3, A.8.16 | BCP coverage, operator training, cascade monitoring hardening |

---

## References

- ISO/IEC 27001:2022: https://www.iso.org/standard/82875.html
- OWASP Agentic Top 10 2026: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- OWASP NHI Top 10: https://owasp.org/www-project-non-human-identities-top-10/
- ISO/IEC 42001:2023 AI management: https://www.iso.org/standard/81230.html

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — ASI01-ASI10 full entries with ISMS extension checklist | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
