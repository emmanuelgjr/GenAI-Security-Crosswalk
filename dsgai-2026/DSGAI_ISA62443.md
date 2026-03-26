<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01-ASI10)
  Framework   : CIS Controls v8.1
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 x CIS Controls v8.1

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
to the [CIS Controls v8.1](https://www.cisecurity.org/controls) —
the Center for Internet Security's prioritised set of safeguards
organised into 18 control groups with Implementation Groups
(IG1/IG2/IG3) scaling from small organisations to enterprises.

CIS Controls are the most action-oriented framework in this
repository. Every safeguard maps to specific, implementable
activities. For agentic AI, the most relevant controls are
distributed across account management (CIS 5), access control
(CIS 6), audit log management (CIS 8), application software
security (CIS 16), incident response (CIS 17), and penetration
testing (CIS 18).

The agentic Top 10 creates a distinctive CIS Controls challenge
compared to standard application security. CIS 5 (account
management) was designed for human user accounts. Agents create
Non-Human Identities — service accounts, API keys, OAuth tokens —
that require the same account management discipline but with
different lifecycle characteristics. This mapping explicitly
identifies where standard CIS safeguards require augmentation for
NHI and agentic-specific scenarios.

For CIS Controls mapping of the LLM Top 10 see LLM_CISControls.md.

---

## CIS Controls structure

| Group | Controls | Scope |
|---|---|---|
| Basic hygiene (IG1) | CIS 1-6 | Asset inventory, software, data protection, secure config, account management, access control |
| Foundational (IG2) | CIS 7-11 | Vulnerability management, audit logs, email/web, malware, network |
| Organisational (IG3) | CIS 12-18 | Network monitoring, security awareness, app security, incident response, pen testing |

**Implementation Groups:**
- IG1 — Essential cyber hygiene, small to medium organisations
- IG2 — IG1 plus additional controls for organisations with sensitive data
- IG3 — IG2 plus advanced controls for enterprise and regulated industries

---

## Quick-reference summary

| ID | Name | Severity | Primary CIS Controls | IG | Tier |
|---|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | Critical | CIS 16, CIS 18, CIS 8 | IG2-IG3 | Foundational-Advanced |
| ASI02 | Tool Misuse and Exploitation | Critical | CIS 5, CIS 6, CIS 8, CIS 16 | IG1-IG3 | Foundational-Advanced |
| ASI03 | Identity and Privilege Abuse | Critical | CIS 5, CIS 6, CIS 8, CIS 4 | IG1-IG3 | Foundational-Advanced |
| ASI04 | Agentic Supply Chain | High | CIS 2, CIS 7, CIS 16 | IG1-IG3 | Foundational-Hardening |
| ASI05 | Unexpected Code Execution | Critical | CIS 16, CIS 18, CIS 4 | IG2-IG3 | Hardening-Advanced |
| ASI06 | Memory and Context Poisoning | High | CIS 3, CIS 8, CIS 7 | IG2-IG3 | Hardening-Advanced |
| ASI07 | Insecure Inter-Agent Comms | High | CIS 4, CIS 8, CIS 16 | IG1-IG3 | Hardening-Advanced |
| ASI08 | Cascading Agent Failures | High | CIS 11, CIS 17, CIS 12 | IG1-IG3 | Foundational-Advanced |
| ASI09 | Human-Agent Trust Exploitation | Medium | CIS 14, CIS 17, CIS 8 | IG1-IG3 | Foundational-Hardening |
| ASI10 | Rogue Agents | Critical | CIS 8, CIS 13, CIS 18 | IG2-IG3 | Hardening-Advanced |

---

## Audience tags

- **Security engineer** — full file, CIS Controls implementation reference for agentic AI
- **Small / medium organisation (IG1-IG2)** — IG1/IG2 safeguards per entry
- **Enterprise (IG3)** — full safeguard coverage including penetration testing
- **IAM / identity team** — ASI03 NHI governance entry, CIS 5 and CIS 6 throughout
- **Developer** — CIS 16 application security safeguards
- **OT engineer** — ASI02, ASI08 with ISA 62443 crosswalk notes

---

## Detailed mappings

---

### ASI01 — Agent Goal Hijack

**Severity:** Critical

An attacker redirects agent objectives through direct or indirect
instruction injection — the agent autonomously executes a multi-step
attack chain before any human can intervene. CIS 16 application
software security and CIS 18 penetration testing are the primary
controls — goal hijack is an application security failure that must
be tested before deployment, not discovered in production.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 16 — Application Software Security | 16.1 Establish secure application development standards | IG2 | Secure development standards covering goal-state verification and input validation for all agent integration code |
| CIS 16 — Application Software Security | 16.2 Implement code review | IG2 | Code review for all agent integration code — goal hijack attack patterns reviewed at PR stage |
| CIS 18 — Penetration Testing | 18.1 Establish penetration testing programme | IG3 | Adversarial testing programme covering goal hijack scenarios — direct, indirect, and multi-turn attacks |
| CIS 8 — Audit Log Management | 8.2 Collect audit logs | IG1 | Runtime logging of all agent goal state and action decisions — hijack attempts detectable through log analysis |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 8.2: Enable comprehensive audit logging for all agent
  actions — every tool invocation, every external content
  processed, every goal state transition logged with
  timestamp and session identity
- Treat all external content processed by the agent as
  untrusted regardless of source — RAG chunks, documents,
  emails, tool outputs all validated before entering
  agent context
- Implement operator kill switch — documented, tested,
  accessible from operator consoles

**Hardening (IG2)**
- CIS 16.1: Establish secure coding standards requiring
  input validation and goal-state verification for all
  agent integration code — enforced through code review
  using CIS 16.2
- CIS 16.2: Code review for all agent integration code —
  reviewers specifically check for injection paths and
  missing goal-state validation
- Require human confirmation before any goal-changing
  action — separate confirmation interface, not the
  agent chat interface

**Advanced (IG3)**
- CIS 18.1: Include goal hijack in penetration testing
  programme — direct injection, indirect via all data
  sources the agent processes, multi-turn manipulation
  — results documented and remediated before release
- CIS 18.3: Remediate all goal hijack findings before
  production release — retest to verify fixes hold
- Implement cryptographically signed goal specifications —
  runtime deviation from signed goal triggers automatic
  suspension

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| Invariant Analyzer | Open-source | https://github.com/invariantlabs-ai/invariant |
| PyRIT | Open-source | https://github.com/Azure/PyRIT |

#### Cross-references
- LLM Top 10: LLM01 Prompt Injection, LLM06 Excessive Agency
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: ISO 27001 A.8.28 · NIST AI RMF GV-1.7 · EU AI Act Art. 14

---

### ASI02 — Tool Misuse and Exploitation

**Severity:** Critical

Agents misuse legitimate tools — calling them with destructive
parameters or in unexpected sequences. CIS 5 (account management)
and CIS 6 (access control management) are the foundational controls —
agent tool access is privileged access that must be managed with the
same discipline as administrative user accounts.

**CIS augmentation note:** CIS 5 was designed for human user accounts.
Agents create tool-access credentials that function like service
accounts. Apply CIS 5 safeguards to all agent tool credentials as
Non-Human Identities — the same lifecycle management, minimum
privilege, and review cadence that apply to human privileged accounts.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 5 — Account Management | 5.4 Restrict administrator privileges | IG1 | Agent tool access managed as privileged access — minimum scope enforced, quarterly review |
| CIS 6 — Access Control Management | 6.1 Establish access granting process | IG1 | Formal process for granting agent tool access — documented justification, approval, and review required |
| CIS 8 — Audit Log Management | 8.5 Collect detailed audit logs | IG2 | All agent tool invocations logged with full context — tool identity, parameters, invoking session |
| CIS 16 — Application Software Security | 16.1 Establish secure development standards | IG2 | Per-tool permission manifests and parameter validation as secure development requirements |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 5.4: Manage all agent tool access as privileged
  access — minimum scope enforced, no standing broad
  permissions across multiple tools, regular review
- CIS 6.1: Establish formal process for granting agent
  tool access — documented justification, approval by
  a designated owner, and defined review cadence required
  before any tool integration reaches production
- Require human confirmation for all irreversible tool
  invocations — separate confirmation interface

**Hardening (IG2)**
- CIS 8.5: Collect detailed audit logs for all agent
  tool invocations — tool identity, parameters, invoking
  session, timestamp — immutable audit trail integrated
  into SIEM
- CIS 16.1: Include per-tool permission manifests and
  parameter validation in secure development standards —
  enforced through code review
- Validate all tool descriptors before agent loading —
  hidden instructions trigger rejection and security review

**Advanced (IG3)**
- CIS 18.1: Include tool misuse scenarios in penetration
  testing — destructive parameter injection, unusual tool
  combinations, MCP descriptor poisoning — results
  drive remediation before release
- CIS 5.4: Include agent tool access in privileged access
  reviews — quarterly review, any permission not actively
  used in 30 days is removed
- CIS 6.1: Tool permission changes require change management
  approval — no unilateral scope expansion for agent tools

#### Tools

| Tool | Type | Link |
|---|---|---|
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |
| MCP Inspector | Open-source | https://github.com/modelcontextprotocol/inspector |
| Guardrails AI | Open-source | https://github.com/guardrails-ai/guardrails |

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling, LLM06 Excessive Agency
- DSGAI 2026: DSGAI06 Tool Plugin and Agent Data Exchange
- Other frameworks: AIUC-1 B006/B007 · ISO 27001 A.8.2 · ISA/IEC 62443 SR 2.2 (OT)

---

### ASI03 — Identity and Privilege Abuse

**Severity:** Critical

Agents inherit and cache credentials that, when compromised, expose
all systems the agent has access to. CIS 5 (account management) is
the single most important control for this risk — every agent
deployment creates Non-Human Identities that require the same
account management lifecycle as human accounts but are typically
invisible to existing IAM programmes.

**CIS augmentation note:** CIS 5 was built for human accounts.
Non-Human Identities including agent credentials are typically
uncovered by standard CIS 5 implementation. Explicitly extend
CIS 5 safeguards to agent NHIs: inventory them in CIS 5.1,
use unique identities per CIS 5.3, manage as privileged per
CIS 5.4, and disable on decommission per CIS 5.3.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 5 — Account Management | 5.1 Establish and maintain an inventory of accounts | IG1 | All agent NHIs inventoried — include in account inventory alongside human accounts and service accounts |
| CIS 5 — Account Management | 5.3 Disable dormant accounts | IG1 | Agent credentials disabled immediately on agent decommission — no dormant agent NHIs permitted |
| CIS 5 — Account Management | 5.4 Restrict administrator privileges | IG1 | Agent credentials scoped to minimum required access — managed as privileged access |
| CIS 4 — Secure Configuration | 4.1 Establish and maintain secure configuration process | IG1 | Secure configuration for agent credential management — no hardcoded credentials, secret manager required |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 5.1: Inventory all agent NHIs — add to account
  inventory alongside human accounts and service accounts,
  include credential type, scope, owner, and lifecycle
  status for each agent deployment
- CIS 5.4: Scope all agent credentials to minimum required
  access — managed as privileged access, quarterly review,
  any unused access removed
- CIS 4.1: Enforce secure configuration for credential
  management — no hardcoded credentials in agent code or
  prompts, secret manager required for all agent credentials

**Hardening (IG2)**
- CIS 5.3: Implement agent credential offboarding procedure —
  all credentials disabled and revoked immediately on agent
  decommission, inventory updated, access confirmed removed
- CIS 8.5: Collect detailed audit logs for all agent
  credential operations — issuance, use, expiry, and
  anomalous patterns detected through SIEM
- Issue short-lived, task-scoped credentials per invocation —
  never long-lived tokens shared across tasks or sessions

**Advanced (IG3)**
- CIS 18.1: Include agent credential abuse in penetration
  testing — attempt lateral movement using agent credentials
  across all accessible systems, document blast radius
- CIS 5.4: Include agent NHIs in privileged access
  management programme — same rigor as human privileged
  accounts, automated detection of privilege creep
- Implement PKI-backed agent identities — certificate-based
  authentication for all agent-to-system connections

#### Tools

| Tool | Type | Link |
|---|---|---|
| HashiCorp Vault | Open-source | https://www.vaultproject.io |
| SPIFFE / SPIRE | Open-source | https://spiffe.io |
| Teleport | Open-source/Commercial | https://goteleport.com |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI02 Agent Identity and Credential Exposure
- Other frameworks: OWASP NHI Top 10 · ISO 27001 A.8.2/A.5.16 · EU AI Act Art. 15

---

### ASI04 — Agentic Supply Chain Vulnerabilities

**Severity:** High

Malicious or compromised tools, MCP servers, or model components
loaded at runtime alter agent behaviour. CIS 2 (inventory and
control of software assets) is the foundational control — you
cannot protect components you have not inventoried.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 2 — Inventory and Control of Software Assets | 2.1 Establish and maintain software asset inventory | IG1 | ML SBOM maintained as part of software asset inventory — all agent components including MCP servers inventoried |
| CIS 7 — Continuous Vulnerability Management | 7.1 Establish vulnerability management process | IG1 | Vulnerability management covers all agent component CVEs — model inference libraries, MCP server dependencies |
| CIS 16 — Application Software Security | 16.6 Use only up-to-date and trusted third-party components | IG2 | Only approved, integrity-verified agent components loaded — unsigned or unverified components rejected |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 2.1: Maintain ML SBOM as part of software asset
  inventory — every agent component (model, adapters,
  MCP servers, inference runtime, libraries) inventoried
  with version, source, and integrity hash
- CIS 7.1: Include agent component CVEs in vulnerability
  management process — MCP server libraries and
  inference dependencies scanned and patched on schedule
- Pin all component versions — no automatic updates in
  production without review and approval

**Hardening (IG2)**
- CIS 16.6: Establish approved component list for all
  agent deployments — only sourced from approved vendors,
  cryptographic signatures verified before loading
- Apply supplier security requirements to all agent
  component vendors — provenance, integrity guarantees,
  vulnerability disclosure obligations contractually required
- Validate all tool descriptors for hidden instructions
  before agent loading

**Advanced (IG3)**
- CIS 18.1: Include supply chain integrity in penetration
  testing — attempt to introduce compromised components
  through supply chain attack vectors and verify detection
- Operate isolated agent component evaluation environment —
  behavioural testing in air-gapped environment before
  each production promotion
- CIS 7.1: Establish responsible disclosure relationship
  with all strategic component vendors — defined CVE
  notification SLA, tested annually

#### Tools

| Tool | Type | Link |
|---|---|---|
| CycloneDX | Open-source | https://cyclonedx.org |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| Syft | Open-source | https://github.com/anchore/syft |

#### Cross-references
- LLM Top 10: LLM03 Supply Chain Vulnerabilities
- DSGAI 2026: DSGAI04 Data Model and Artifact Poisoning
- Other frameworks: ISO 27001 A.5.19/A.5.21 · NIST AI RMF MP-5.1 · NIST SP 800-218A

---

### ASI05 — Unexpected Code Execution

**Severity:** Critical

Agents that generate and execute code become RCE gateways when
crafted prompts cause them to run attacker-controlled logic.
CIS 16 application software security and CIS 18 penetration testing
are the primary controls — code execution capability requires
explicit security requirements and adversarial testing before
any deployment.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 16 — Application Software Security | 16.1 Establish secure development standards | IG2 | Secure development standards require sandboxing, allowlisting, and static analysis for any agent code execution |
| CIS 16 — Application Software Security | 16.7 Use standard hardening configuration templates | IG2 | Hardened sandbox configuration templates for agent code execution — no network, no filesystem, resource limits |
| CIS 18 — Penetration Testing | 18.1 Establish penetration testing programme | IG3 | Sandbox escape and code injection scenarios in penetration testing — before any code execution agent deploys |
| CIS 4 — Secure Configuration | 4.1 Establish secure configuration process | IG1 | Secure configuration includes sandbox resource limits — token caps, execution timeouts, network isolation |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 4.1: Include sandbox configuration in secure
  configuration baseline — resource limits, network
  isolation, and execution timeouts enforced for any
  agent with code execution capability
- Avoid agents with code execution capability unless
  strictly necessary — document business justification
  and obtain security review before deployment
- Sandbox all agent code execution — no host filesystem,
  network, or OT API access without explicit allowlist

**Hardening (IG2)**
- CIS 16.1: Include code execution security requirements
  in secure development standards — sandboxing, static
  analysis, and allowlist enforcement as mandatory for
  any code execution agent
- CIS 16.7: Apply hardened sandbox configuration templates —
  standardised, pre-approved sandbox configuration that
  cannot be overridden by agent instructions
- Deploy static analysis of all agent-generated code
  before execution — reject operations outside allowlist

**Advanced (IG3)**
- CIS 18.1: Include sandbox escape and code injection
  in penetration testing — test against your specific
  agent runtime and sandbox configuration, results drive
  remediation before release
- CIS 18.3: Remediate all code execution findings before
  release — retest to verify sandbox escape prevention holds
- Hardware-level sandboxing — gVisor or Firecracker for
  kernel-level isolation in highest-risk deployments

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
across all future interactions. CIS 3 (data protection) and CIS 8
(audit log management) are the primary controls — agent memory
stores are data assets requiring the same protection and audit
logging as any other sensitive data store.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 3 — Data Protection | 3.1 Establish and maintain data management process | IG1 | Agent memory stores governed as sensitive data assets — classification, access controls, retention policy |
| CIS 3 — Data Protection | 3.11 Encrypt sensitive data at rest | IG1 | All agent memory content encrypted at rest — same protection as equivalent data assets |
| CIS 8 — Audit Log Management | 8.5 Collect detailed audit logs | IG2 | All agent memory write operations logged — content hash, source, timestamp — anomalous writes detectable |
| CIS 7 — Continuous Vulnerability Management | 7.1 Establish vulnerability management process | IG1 | Vulnerability management covers memory store platform CVEs — CVE-2024-3584 class patched promptly |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 3.1: Establish data management process for agent
  memory stores — classification, access controls, and
  retention policy applied from day one
- CIS 3.11: Encrypt all agent memory content at rest —
  embeddings and memory stores require same encryption
  as equivalent source documents
- Enforce memory TTL — entries expire per defined retention
  policy, deletion verified, no indefinite persistence

**Hardening (IG2)**
- CIS 8.5: Collect detailed audit logs for all memory
  write operations — content hash, source identity,
  timestamp — anomalous writes and access patterns
  detectable through SIEM
- Implement memory segmentation by trust level — OT
  operational data and external web content in separate
  isolated namespaces with different access controls
- CIS 7.1: Apply vulnerability management to memory
  store platforms — CVE-2024-3584 class treated as urgent

**Advanced (IG3)**
- CIS 18.1: Include memory poisoning scenarios in
  penetration testing — attempt injection via each
  content source the agent processes, verify detection
  and isolation controls hold
- Cryptographic integrity verification of memory store
  contents — tamper detection between write and read
- CIS 3.1: Automated memory purge on agent decommission —
  all memory content deleted, deletion verified,
  documented in data management records

#### Tools

| Tool | Type | Link |
|---|---|---|
| Weaviate | Open-source | https://weaviate.io |
| Langfuse | Open-source | https://langfuse.com |
| LlamaIndex | Open-source | https://www.llamaindex.ai |

#### Cross-references
- LLM Top 10: LLM04 Data and Model Poisoning, LLM08 Vector and Embedding Weaknesses
- DSGAI 2026: DSGAI04 Data Model and Artifact Poisoning, DSGAI13 Vector Store Platform Security
- Other frameworks: AIUC-1 A/B002 · ISO 27001 A.8.9/A.8.10 · ISA/IEC 62443 SR 3.7 (OT)

---

### ASI07 — Insecure Inter-Agent Communication

**Severity:** High

A2A communication channels lacking authentication or encryption
enable spoofing and agent-in-the-middle attacks. CIS 4 (secure
configuration) is the foundational control — secure A2A
configuration must be in the baseline before any multi-agent
deployment.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 4 — Secure Configuration | 4.1 Establish and maintain secure configuration process | IG1 | Secure configuration baseline for all A2A channels — TLS 1.3 minimum, authentication, schema validation required |
| CIS 8 — Audit Log Management | 8.2 Collect audit logs | IG1 | All A2A communication logged — sender identity, message integrity hash, timestamp |
| CIS 16 — Application Software Security | 16.1 Establish secure development standards | IG2 | A2A authentication, encryption, and replay protection as secure development requirements for all agent integration code |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 4.1: Include A2A channel security in the secure
  configuration baseline — TLS 1.3 minimum, authenticated
  channels, schema validation — applied before any
  multi-agent deployment goes to production
- CIS 8.2: Enable audit logging for all A2A communication —
  sender identity, message hash, timestamp logged for
  every inter-agent message
- Authenticate all A2A messages — no ambient trust between
  agents even on internal networks

**Hardening (IG2)**
- CIS 16.1: Include A2A security requirements in secure
  development standards — authentication method, encryption
  standard, replay protection all specified before
  development begins
- Implement replay attack protection — nonces, timestamps,
  and sequence numbers on all A2A channels
- Isolate A2A communication on dedicated network segment —
  separate from OT control traffic where applicable

**Advanced (IG3)**
- Implement mutual TLS for all production A2A channels —
  both sides authenticate before any message exchange
- CIS 18.1: Include A2A security in penetration testing —
  spoofing, replay, and man-in-the-middle scenarios tested
  before each multi-agent deployment
- Short-lived agent identity certificates — automated
  rotation, certificate revocation capability

#### Tools

| Tool | Type | Link |
|---|---|---|
| SPIFFE / SPIRE | Open-source | https://spiffe.io |
| Linkerd | Open-source | https://linkerd.io |
| cert-manager | Open-source | https://cert-manager.io |

#### Cross-references
- DSGAI 2026: DSGAI02 Agent Identity and Credential Exposure
- Other frameworks: OWASP NHI Top 10 · ISO 27001 A.8.24 · ISA/IEC 62443 SR 3.1 (OT)

---

### ASI08 — Cascading Agent Failures

**Severity:** High

Single-point faults propagate through multi-agent workflows into
system-wide incidents. In OT environments, cascading failures can
cross from the AI layer into physical process control. CIS 11
(data recovery) and CIS 17 (incident response management) are the
primary controls — cascade events are both a resilience failure
and an incident management event.

**OT critical note:** In industrial environments this is Critical
severity. See Agentic_ISA62443.md for OT-specific controls.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 11 — Data Recovery | 11.1 Establish and maintain a data recovery process | IG1 | Agent system state and memory stores in data recovery process — tested restoration before production deployment |
| CIS 17 — Incident Response Management | 17.1 Designate personnel to manage incident handling | IG1 | Defined ownership for agent cascade incidents — who is notified, within what timeframe, with what information |
| CIS 12 — Network Infrastructure Management | 12.6 Use of network-based URL filters | IG2 | Network-layer controls preventing cascade propagation — A2A traffic volume caps, inter-cluster bandwidth limits |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 17.1: Designate personnel responsible for agent
  cascade incident management — who is notified, within
  what timeframe, with what information, what process
  control fallback is activated
- Implement circuit breakers — automatic agent suspension
  when failure rate exceeds threshold, fail-safe default
  for all agents on suspension
- CIS 11.1: Include agent system state and memory stores
  in data recovery process — tested restoration procedure,
  clean state available for recovery

**Hardening (IG2)**
- CIS 12.6: Implement network-layer controls on A2A
  traffic — bandwidth caps preventing cascade from
  saturating shared infrastructure, inter-cluster
  traffic limits enforced at the network layer
- Segment agent clusters by process area — blast radius
  limited by design, failure in one cluster cannot
  cascade to adjacent clusters
- CIS 11.1: Annual recovery drills covering agent cluster
  failure scenarios — validated RTO and RPO for agent
  infrastructure

**Advanced (IG3)**
- CIS 18.1: Include cascade scenarios in penetration
  testing — intentional fault injection into multi-agent
  workflows, circuit breaker effectiveness verified
- CIS 17: Define and exercise agent cascade response
  playbook — suspension, process control fallback,
  operator notification, recovery, post-incident review
- For OT-adjacent deployments include cascade in BCP —
  process control fallback procedures defined and tested

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
exploit operators into approving harmful actions. CIS 14 (security
awareness) is the primary control — trust exploitation is a human
behaviour risk that training addresses before any technical control.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 14 — Security Awareness and Skills Training | 14.1 Establish and maintain security awareness programme | IG1 | Security awareness programme includes agent advisory limitations — mandatory before any agent decision-support access |
| CIS 17 — Incident Response Management | 17.1 Designate personnel for incident handling | IG1 | Defined response for trust exploitation incidents — correction, notification, operator retraining, root cause |
| CIS 8 — Audit Log Management | 8.5 Collect detailed audit logs | IG2 | Detailed logging of agent-influenced decisions — aggregate analysis detecting over-trust patterns |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 14.1: Include agent advisory limitations in security
  awareness programme — all users and operators trained
  on LLM limitations, verification requirements, and
  how to identify manipulation before access is granted
- All agent output clearly labelled as AI advisory —
  operators cannot mistake agent recommendation for
  engineering-approved procedure or authoritative source
- CIS 17.1: Define response for trust exploitation events —
  who is responsible for correction, how affected
  operators are retrained, how the incident is documented

**Hardening (IG2)**
- CIS 8.5: Collect detailed audit logs of agent-influenced
  decisions — aggregate analysis detecting patterns of
  operator over-trust or systematic acceptance without
  independent verification
- Separate agent conversation from security approval
  flows — chat is never the consent mechanism for
  sensitive or irreversible actions
- Implement output filtering to detect and block
  manipulative language patterns in agent responses

**Advanced (IG3)**
- CIS 14: Conduct operator competency assessments —
  verify operators can identify agent recommendations
  requiring independent verification, include in
  role-specific training curriculum
- CIS 18.1: Include trust exploitation scenarios in
  penetration testing — test how effectively operators
  identify manipulated recommendations in your specific
  deployment context
- CIS 8.5: Deploy aggregate decision pattern monitoring —
  alert on shift-level or site-level patterns indicating
  systematic agent-influenced decision-making without
  independent verification

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- DSGAI 2026: DSGAI21 Disinformation and Integrity Attacks
- Other frameworks: EU AI Act Art. 50/52 · AIUC-1 C/F · ISO 42001 A.8.1

---

### ASI10 — Rogue Agents

**Severity:** Critical

Malicious or compromised agents appear compliant but pursue hidden
goals. CIS 8 (audit log management) and CIS 13 (network monitoring)
are the most critical controls — without comprehensive logging and
monitoring, a rogue agent can operate indefinitely without detection.

#### CIS Controls mapping

| Control | Safeguard | IG | How it applies |
|---|---|---|---|
| CIS 8 — Audit Log Management | 8.2 Collect audit logs | IG1 | Comprehensive audit logging for all agent actions — tool invocations, data access, goal state transitions all logged |
| CIS 8 — Audit Log Management | 8.11 Conduct audit log reviews | IG2 | Periodic review of agent audit logs — rogue behaviour manifests as systematic pattern drift detectable in aggregate |
| CIS 13 — Network Monitoring and Defense | 13.1 Centralise security event alerting | IG2 | Agent behaviour anomalies centralised in SIEM — rogue agent indicators alerted to security operations |
| CIS 18 — Penetration Testing | 18.1 Establish penetration testing programme | IG3 | Rogue agent scenarios in penetration testing — simulate persistent hidden goal pursuit across extended sessions |

#### Mitigations by tier

**Foundational (IG1)**
- CIS 8.2: Enable comprehensive audit logging for all
  agents from day one — every tool invocation, every
  data access, every recommendation logged with full
  context — no production deployment without this
- Establish behavioural baseline during commissioning —
  expected invocation patterns, recommendation distributions,
  and access volumes documented
- Operator-accessible kill switch — documented, tested,
  accessible from operator consoles before production

**Hardening (IG2)**
- CIS 8.11: Conduct regular agent audit log reviews —
  rogue behaviour often manifests as systematic pattern
  drift across sessions, not individual anomalous events
- CIS 13.1: Centralise agent behaviour anomaly alerts in
  SIEM — deviation from behavioural baseline generates
  tiered response: log, alert, suspend, investigate
- Aggregate recommendation analysis — periodic engineering
  review of agent recommendation patterns for systematic
  bias or drift from expected behaviour

**Advanced (IG3)**
- CIS 18.1: Include rogue agent scenarios in penetration
  testing — simulate persistent hidden goal pursuit
  across extended sessions, verify detection capability
  holds, document results and remediation
- CIS 18.3: Remediate all rogue agent detection gaps
  before production — retest to verify monitoring
  coverage is comprehensive
- Multi-agent consensus for high-stakes decisions — rogue
  single agent cannot influence critical recommendations
  without cross-validation from independent agent

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

## CIS Controls implementation priority by IG

### IG1 — Essential hygiene (start here)

| ASI entry | CIS safeguards | Action |
|---|---|---|
| ASI02, ASI03 | CIS 5.1, CIS 5.4, CIS 6.1 | Inventory all agent NHIs, manage as privileged access, formal access grant process |
| ASI03 | CIS 4.1, CIS 5.3 | Secure credential configuration, offboard agent NHIs on decommission |
| ASI01, ASI10 | CIS 8.2 | Comprehensive audit logging for all agent actions and goal state transitions |
| ASI04 | CIS 2.1, CIS 7.1 | Agent component inventory (ML SBOM), vulnerability management for agent components |
| ASI08 | CIS 11.1, CIS 17.1 | Agent state in data recovery, incident ownership for cascade events |
| ASI09 | CIS 14.1 | Security awareness training on agent advisory limitations before access granted |

### IG2 — For organisations with sensitive data (add next)

| ASI entry | CIS safeguards | Action |
|---|---|---|
| ASI02, ASI03 | CIS 8.5 | Detailed audit logs for tool invocations and credential operations |
| ASI04 | CIS 16.6 | Approved component list for all agent deployments |
| ASI05 | CIS 16.1, CIS 16.7 | Secure development standards for code execution, hardened sandbox templates |
| ASI06 | CIS 3.1, CIS 3.11, CIS 8.5 | Agent memory classified, encrypted, and write-logged |
| ASI07 | CIS 4.1, CIS 16.1 | Secure A2A configuration baseline, A2A security in development standards |
| ASI08 | CIS 12.6 | Network-layer A2A traffic controls |
| ASI10 | CIS 8.11, CIS 13.1 | Periodic log reviews, SIEM integration for behavioural anomaly detection |

### IG3 — Enterprise and regulated (complete coverage)

| ASI entry | CIS safeguards | Action |
|---|---|---|
| All | CIS 18.1, CIS 18.3 | Penetration testing programme covering all agentic vulnerability scenarios |
| ASI01, ASI05, ASI10 | CIS 18.3 | Remediate and retest after each red team finding |

---

## ISMS extension checklist — agentic AI x CIS Controls

- [ ] All agent NHIs in account inventory (CIS 5.1)
- [ ] Agent tool access managed as privileged access (CIS 5.4)
- [ ] Agent NHI offboarding procedure in place (CIS 5.3)
- [ ] ML SBOM maintained for all agent deployments (CIS 2.1)
- [ ] Agent component CVEs in vulnerability management (CIS 7.1)
- [ ] Comprehensive audit logging active for all agents (CIS 8.2)
- [ ] Detailed tool invocation and credential logs in SIEM (CIS 8.5)
- [ ] Agent memory stores in data protection programme (CIS 3.1, 3.11)
- [ ] A2A channel security in secure configuration baseline (CIS 4.1)
- [ ] Security awareness training covers agent limitations (CIS 14.1)
- [ ] Incident response ownership for all ASI entries (CIS 17.1)
- [ ] Penetration testing covers goal hijack, code execution, rogue agent (CIS 18.1)

---

## References

- CIS Controls v8.1: https://www.cisecurity.org/controls
- CIS Controls implementation guide: https://www.cisecurity.org/controls/implementation-groups
- OWASP Agentic Top 10 2026: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- OWASP NHI Top 10: https://owasp.org/www-project-non-human-identities-top-10/
- OWASP AI Testing Guide: https://owasp.org/www-project-ai-testing-guide/

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — ASI01-ASI10 full entries with IG-tiered safeguards and ISMS checklist | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
