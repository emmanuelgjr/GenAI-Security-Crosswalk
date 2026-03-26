<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01-ASI10)
  Framework   : NIST Cybersecurity Framework 2.0 (CSF 2.0)
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 x NIST CSF 2.0

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
to the [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework).

Agentic AI systems create a qualitatively different CSF 2.0 risk
profile compared to static LLMs. The six CSF 2.0 functions each
engage differently in an agentic context:

GOVERN is stressed because autonomy limits, human oversight policy,
and agent identity governance must be explicitly defined before
deployment — there is no safe default.

IDENTIFY is stressed because every agent deployment creates new
assets (memory stores, tool integrations, A2A channels) that fall
outside traditional asset inventories.

PROTECT is stressed because least privilege, credential management,
and platform security all have agentic-specific requirements that
standard IT controls do not cover.

DETECT is the most critical function for agentic AI — rogue agents,
goal hijack, and memory poisoning are often invisible until detected
through behavioural analysis. Without DE controls, the other functions
have no feedback loop.

RESPOND and RECOVER must include kill switch procedures, memory audit
workflows, and cascade containment — not just standard incident
response playbooks.

---

## Quick-reference summary

| ID | Name | Severity | Primary CSF 2.0 Categories | Tier |
|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | Critical | GV.RM-06, PR.PS-04, DE.CM-09, RS.MA-02 | Foundational-Advanced |
| ASI02 | Tool Misuse and Exploitation | Critical | GV.RM-06, PR.AA-05, DE.CM-01, RS.MA-02 | Foundational-Advanced |
| ASI03 | Identity and Privilege Abuse | Critical | GV.RM-06, PR.AA-05, PR.AA-02, DE.CM-01 | Foundational-Advanced |
| ASI04 | Agentic Supply Chain | High | GV.SC-06, GV.SC-07, PR.PS-02, ID.RA-01 | Foundational-Hardening |
| ASI05 | Unexpected Code Execution | Critical | GV.RM-06, PR.PS-04, PR.IR-01, DE.CM-09 | Hardening-Advanced |
| ASI06 | Memory and Context Poisoning | High | PR.DS-01, PR.AA-05, DE.CM-09, RS.MA-02 | Hardening-Advanced |
| ASI07 | Insecure Inter-Agent Comms | High | PR.DS-02, PR.AA-05, DE.CM-01, PR.PS-04 | Hardening-Advanced |
| ASI08 | Cascading Agent Failures | High | PR.IR-01, DE.CM-01, RS.MA-02, RC.RP-02 | Foundational-Advanced |
| ASI09 | Human-Agent Trust Exploitation | Medium | GV.OC-01, GV.RM-06, DE.CM-09, RS.MA-01 | Foundational-Hardening |
| ASI10 | Rogue Agents | Critical | GV.RM-06, DE.CM-09, RS.MA-02, RC.RP-02 | Hardening-Advanced |

---

## Audience tags

- **CISO / governance** — full file, CSF 2.0 profile for agentic AI programme
- **Risk manager** — GV and ID function categories
- **Security engineer** — PR, DE, RS function categories — kill switch, monitoring
- **OT engineer** — ASI02, ASI08 with ISA 62443 crosswalk for OT context
- **Federal agency teams** — CSF 2.0 to EO 14110 alignment for agentic deployments

---

## Detailed mappings

---

### ASI01 — Agent Goal Hijack

**Severity:** Critical

An attacker redirects agent objectives through direct or indirect
instruction injection — the agent then autonomously executes a
multi-step attack chain. CSF 2.0 GV.RM-06 is the foundational
governance anchor: without a documented organisational policy on
permissible agent autonomy, every downstream control lacks an anchor.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Policy defines permissible agent autonomy — agents cannot change stated goals without human confirmation |
| Platform security — software integrity | PR.PS-04 | PROTECT | Input validation and goal-state verification implemented as platform security controls |
| Continuous monitoring | DE.CM-09 | DETECT | Goal hijack indicators monitored — deviation from stated goal state triggers alert |
| Incident analysis | RS.MA-02 | RESPOND | Kill switch procedure, action reversal checklist, affected system notification — tested and documented |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Document organisational policy on agent autonomy —
  what goal changes require human confirmation, what actions
  agents cannot take autonomously regardless of instruction
- PR.PS-04: Implement input validation at all external content
  boundaries — historian data, documents, emails, tool outputs
  all treated as untrusted before entering agent context
- Implement operator kill switch — documented, tested,
  accessible from operator consoles

**Hardening**
- DE.CM-09: Implement goal-state monitoring — verify agent
  actions remain consistent with stated session goal,
  deviations trigger suspension and human review
- Require human confirmation before any goal-changing action —
  confirmation through a separate, independent interface
- RS.MA-02: Define and test kill switch procedure — suspension,
  action reversal checklist, downstream impact assessment

**Advanced**
- Version-control agent goal specifications with cryptographic
  signing — runtime deviations from committed specification
  trigger automatic suspension
- Extend DE.CM-09 to cover all indirect injection surfaces
  specific to your deployment
- Include agent goal hijack in Process Hazard Analysis for
  OT deployments

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
parameters or in unexpected sequences. CSF 2.0 PR.AA-05 least
privilege is the foundational control: an agent that misuses a
tool can only do so within the scope of its access permissions.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Policy requires human confirmation for irreversible tool invocations — defined before deployment |
| Identity management — least privilege | PR.AA-05 | PROTECT | Per-tool minimum permission enforced — agents cannot invoke tools outside defined role scope |
| Continuous monitoring | DE.CM-01 | DETECT | All tool invocations logged — anomalous parameters, unusual invocation sequences, high-frequency patterns |
| Incident analysis | RS.MA-02 | RESPOND | Tool disable procedure, parameter audit, downstream impact assessment — documented for each tool class |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Define policy requiring human confirmation for
  all irreversible tool invocations — what constitutes
  irreversible per tool type documented before deployment
- PR.AA-05: Implement per-tool permission scope — agent does
  not hold a broad credential but tool-specific scoped
  tokens for each integration
- DE.CM-01: Log all tool invocations with full context —
  tool identity, parameters, invoking session, timestamp

**Hardening**
- Validate all tool descriptors before agent loading —
  any hidden instruction in a descriptor is a rejection trigger
- RS.MA-02: Define incident response per tool class —
  which tools can be disabled remotely, how parameters
  are audited post-incident, how downstream impact is assessed
- Tool allowlisting at the orchestration layer — agents
  cannot invoke tools outside their defined role

**Advanced**
- Automated tool disable on anomalous invocation detection —
  single compromised tool token revoked without affecting
  other tool access
- Conduct tool misuse red team exercises — attempt destructive
  outcomes through legitimate tool invocations
- Include tool misuse in Process Hazard Analysis for OT
  deployments

#### Tools

| Tool | Type | Link |
|---|---|---|
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |
| MCP Inspector | Open-source | https://github.com/modelcontextprotocol/inspector |
| Invariant Analyzer | Open-source | https://github.com/invariantlabs-ai/invariant |

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling, LLM06 Excessive Agency
- DSGAI 2026: DSGAI06 Tool Plugin and Agent Data Exchange
- Other frameworks: AIUC-1 B006/B007 · ISA/IEC 62443 SR 2.2 (OT) · EU AI Act Art. 14

---

### ASI03 — Identity and Privilege Abuse

**Severity:** Critical

Agents inherit and cache credentials that, when compromised, expose
all systems the agent has access to. CSF 2.0 PR.AA access management
covers NHI (Non-Human Identity) governance — agent credential
lifecycle is an access management responsibility, not an AI-specific
one.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Agent identity governance policy — NHI inventory, short-lived credentials, scope controls documented |
| Identity management — least privilege | PR.AA-05 | PROTECT | Agent credentials scoped to minimum required access — reviewed and minimised regularly |
| Access management — account management | PR.AA-02 | PROTECT | Agent identity lifecycle management — issuance, rotation, revocation all formally managed |
| Continuous monitoring | DE.CM-01 | DETECT | All agent credential operations logged — anomalous usage patterns detected and alerted |

#### Mitigations by tier

**Foundational**
- PR.AA-05: Scope all agent credentials to minimum required
  access — least privilege enforced, reviewed quarterly
- PR.AA-02: Implement agent identity lifecycle management —
  issuance, rotation, and revocation all formally managed,
  NHI inventory maintained
- Issue short-lived, task-scoped credentials per invocation —
  never long-lived tokens shared across tasks or sessions

**Hardening**
- DE.CM-01: Log all agent credential operations — issuance,
  use, expiry — anomalous usage patterns detected
- GV.RM-06: Include NHI governance in organisational risk
  management programme — agent credential risks in risk register
- Implement JIT credential issuance with automatic revocation
  on task completion

**Advanced**
- Implement PKI-backed agent identities for multi-agent
  deployments — certificate-based authentication
- RS.MA-02: Define incident response for credential exposure —
  rotation, containment, lateral movement scope assessment,
  forensic capture
- Conduct agent credential red team exercises — lateral
  movement using agent credentials across all accessible systems

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
loaded at runtime alter agent behaviour across all consumers. CSF 2.0
GV.SC supply chain risk management added in version 2.0 is the
primary governance anchor — dynamic runtime components are in scope.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Supply chain risk management — suppliers | GV.SC-06 | GOVERN | Security requirements applied to all agent component vendors — including dynamic runtime MCP providers |
| Supply chain risk management — due diligence | GV.SC-07 | GOVERN | Due diligence on all agent tool and MCP server vendors before production use |
| Platform security — approved software | PR.PS-02 | PROTECT | Only approved, integrity-verified agent components loaded — runtime dynamic loading blocked for unapproved sources |
| Risk assessment | ID.RA-01 | IDENTIFY | Supply chain attack vectors identified per component — dynamic tool loading assessed as elevated risk |

#### Mitigations by tier

**Foundational**
- GV.SC-06: Establish supply chain security requirements for
  all agent component vendors — approved sources, integrity
  requirements, change management procedures
- PR.PS-02: Maintain approved component registry — agent
  cannot load tools or MCP servers from unapproved sources,
  enforced at the orchestration layer
- Verify cryptographic signatures of all components before
  loading — unsigned components rejected

**Hardening**
- GV.SC-07: Conduct security due diligence on all agent
  component vendors — security practices, incident history,
  vulnerability notification responsiveness
- Apply agent component change management — no dynamic
  updates in production without review and approval
- Scan all tool descriptors for hidden instructions before
  agent loading

**Advanced**
- PR.PS-02: Implement runtime component integrity monitoring —
  continuous hash verification of loaded components,
  deviation triggers agent suspension
- Conduct adversarial supply chain testing — attempt to
  introduce compromised components and verify detection
- GV.SC-06: Establish responsible disclosure relationship
  with all strategic component vendors

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

Agents that generate and execute code become RCE gateways when
crafted prompts cause them to run attacker-controlled logic. CSF 2.0
GV.RM-06 requires this to be an explicit governance decision — code
execution capability in any agent is a separate, elevated risk that
requires documented approval before deployment.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Code execution capability requires explicit governance approval — documented as elevated risk with additional controls |
| Platform security — software integrity | PR.PS-04 | PROTECT | Sandboxing, input filtering, static analysis implemented as platform security controls |
| Infrastructure resilience | PR.IR-01 | PROTECT | Code execution sandbox isolated — cannot affect production infrastructure availability |
| Continuous monitoring | DE.CM-09 | DETECT | Runtime monitoring of agent code execution — anomalous system calls detected |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Document agent code execution capability as an
  elevated risk — explicit governance approval required
  before any agent with code execution is deployed
- PR.PS-04: Sandbox all agent code execution — no host
  filesystem, network, or OT system API access by default
- Avoid deploying agents with code execution capability
  unless strictly necessary — strongest control

**Hardening**
- DE.CM-09: Implement runtime monitoring of code execution —
  all system calls logged, anomalous calls blocked and alerted
- PR.PS-04: Static analysis of all agent-generated code
  before execution — reject code containing operations
  outside the allowlist
- PR.IR-01: Isolate code execution sandbox from production
  infrastructure — resource limits enforced at OS level

**Advanced**
- Hardware-level sandboxing — gVisor or Firecracker for
  kernel-level isolation
- Conduct red team exercises targeting code execution —
  attempt sandbox escape from within your specific runtime
- RS.MA-02: Define incident response for code execution anomaly —
  sandbox isolation, kill switch, forensic capture workflow

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

Persistent corruption of agent memory or RAG stores causes systematic
incorrect behaviour across all future interactions. CSF 2.0 PR.DS
data security applies to agent memory stores as data assets — the same
protection requirements as training data apply to runtime memory that
influences model behaviour.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Data security — data at rest | PR.DS-01 | PROTECT | Agent memory stores encrypted and access-controlled — same protection as equivalent data assets |
| Identity management — least privilege | PR.AA-05 | PROTECT | Write access to agent memory restricted — only the agent and designated administrators |
| Continuous monitoring | DE.CM-09 | DETECT | Memory content integrity monitored — statistical anomaly detection, access pattern analysis |
| Incident analysis | RS.MA-02 | RESPOND | Memory audit procedure, content purge, operational impact assessment — defined for each deployment |

#### Mitigations by tier

**Foundational**
- PR.DS-01: Encrypt all agent memory stores at rest —
  and implement access controls from day one, policy enforced
- PR.AA-05: Restrict write access to agent memory —
  only the agent and designated administrators can write,
  all writes logged
- Enforce memory TTL — entries expire and require
  re-validation against authoritative sources

**Hardening**
- DE.CM-09: Implement continuous memory integrity monitoring —
  statistical anomaly detection on content and access patterns
- Implement memory segmentation by trust level — OT
  operational data and external web content in separate,
  isolated memory namespaces
- RS.MA-02: Define response for confirmed memory poisoning —
  which content is purged, how operational decisions
  influenced by poisoned memory are reviewed

**Advanced**
- Cryptographic integrity verification of memory store
  contents — tamper detection between write and read
- DE.CM-09: Integrate memory anomaly alerts into SIEM —
  unusual patterns treated as security events
- Include memory poisoning scenarios in incident response
  exercises

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
enable spoofing and agent-in-the-middle attacks. CSF 2.0 PR.DS-02
data in transit security applies to all A2A channels — agent-to-agent
communication is a data flow requiring the same protection as any
other sensitive data transit path.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Data security — data in transit | PR.DS-02 | PROTECT | All A2A communication encrypted — TLS 1.3 minimum on all inter-agent channels |
| Identity management — least privilege | PR.AA-05 | PROTECT | A2A channels authenticated — no ambient trust, unique identity per agent |
| Continuous monitoring | DE.CM-01 | DETECT | All A2A traffic logged — anomalous authentication failures and unusual message patterns alerted |
| Platform security — software integrity | PR.PS-04 | PROTECT | A2A message schema validation — reject malformed or unexpected message structures |

#### Mitigations by tier

**Foundational**
- PR.DS-02: Enforce TLS 1.3 minimum on all A2A channels —
  no cleartext agent messaging on any network segment
- PR.AA-05: Authenticate all A2A messages — no ambient trust
  between agents, unique identity per agent deployment
- DE.CM-01: Log all A2A communication — authentication
  events, message volumes, anomalous patterns

**Hardening**
- Implement replay attack protection on A2A channels —
  message nonces, timestamps, and sequence numbers
- Isolate A2A communication on dedicated network segment —
  separate from OT control traffic where applicable
- PR.PS-04: Schema validation on all A2A message payloads —
  reject unexpected or malformed structures

**Advanced**
- Implement mutual TLS for all production A2A channels —
  both sides authenticate before any message exchange
- Short-lived agent identity certificates — automated rotation
- DE.CM-01: Continuous A2A anomaly detection — flag unexpected
  message patterns and out-of-scope content

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
can cross from the AI layer into physical process control. CSF 2.0
PR.IR infrastructure resilience is the primary protection function —
circuit breakers and fail-safe defaults are resilience controls.

**OT critical note:** In industrial environments this is Critical
severity — see Agentic_ISA62443.md for OT-specific controls.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Infrastructure resilience | PR.IR-01 | PROTECT | Circuit breakers implemented as resilience controls — cascade cannot propagate beyond defined blast radius |
| Continuous monitoring | DE.CM-01 | DETECT | Cascade indicators monitored — correlated anomalous agent actions across the cluster alerted |
| Incident analysis | RS.MA-02 | RESPOND | Defined suspension procedure, process control fallback, human escalation path — tested |
| Incident recovery | RC.RP-02 | RECOVER | Recovery procedures for agent cluster failures — tested failover, defined RTO, graceful degradation |

#### Mitigations by tier

**Foundational**
- PR.IR-01: Implement circuit breakers — automatic suspension
  when failure rate exceeds threshold, fail-safe default
  for all agents on suspension
- Define fail-safe modes — on suspension, process continues
  without agent involvement, operators notified immediately
- Operator-accessible kill switch — documented, tested,
  accessible from operator consoles

**Hardening**
- DE.CM-01: Integrate cascade detection into security
  monitoring — correlated anomalous agent actions across
  cluster alerted before physical process impact
- Segment agent clusters by process area — failure in
  one cluster cannot cascade to adjacent clusters
- RS.MA-02: Define cascade incident response — who is
  notified, what fallback activates, how operators resume

**Advanced**
- Conduct chaos engineering — intentional fault injection
  into multi-agent workflows, circuit breaker effectiveness
  verified against documented blast radius
- RC.RP-02: Include agent cluster failures in BCP —
  annual failover drills covering cascade scenarios
- OT: include cascade scenarios in Process Hazard Analysis

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

Users anthropomorphise agents — trusting their apparent expertise —
enabling manipulated agents to exploit operators into approving
harmful actions. CSF 2.0 GV.OC-01 organisational context requires
that stakeholders understand AI system limitations — this is the
governance foundation for preventing trust exploitation.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Organisational context | GV.OC-01 | GOVERN | Stakeholders informed of agent limitations — users and operators trained on advisory nature before access |
| Risk management strategy | GV.RM-06 | GOVERN | Policy on agent transparency — agents identify as AI, advisory outputs distinguished from authoritative |
| Continuous monitoring | DE.CM-09 | DETECT | Feedback mechanisms detecting operator over-trust patterns — aggregate analysis of agent-influenced decisions |
| Incident analysis | RS.MA-01 | RESPOND | Response for detected trust exploitation — operator retraining, interface redesign, aggregate audit |

#### Mitigations by tier

**Foundational**
- GV.OC-01: Communicate agent advisory limitations to all
  stakeholders — operators and users trained before access
  is granted, refreshed annually
- GV.RM-06: Establish policy requiring agents to identify
  as AI — all agent-user interactions disclose AI nature,
  enforced at the guardrail layer
- Separate agent conversation from security approval flows —
  chat is never the consent mechanism for sensitive actions

**Hardening**
- DE.CM-09: Implement feedback channels for over-trust
  detection — aggregate analysis of agent-influenced
  decisions, shift-level pattern review for OT operators
- RS.MA-01: Define response for detected trust exploitation —
  operator retraining, interface redesign, aggregate decision
  audit
- Implement output filtering to detect and block
  manipulative language patterns in agent responses

**Advanced**
- Deploy behavioural analysis detecting agent nudging toward
  specific approvals — alert on persuasion pattern detection
- Conduct red team exercises simulating trust exploitation —
  test how effectively operators identify manipulated
  recommendations in your specific deployment
- GV.OC-01: Include human-agent trust policies in AI
  governance — reviewed annually with user research input

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- DSGAI 2026: DSGAI21 Disinformation and Integrity Attacks
- Other frameworks: EU AI Act Art. 50/52 · AIUC-1 C/F · NIST AI RMF GV-1.7

---

### ASI10 — Rogue Agents

**Severity:** Critical

Malicious or compromised agents appear compliant but pursue hidden
goals — often the end-state of an undetected ASI01 or ASI06 attack.
CSF 2.0 DE.CM continuous monitoring is the most critical function
for rogue agent detection — without behavioural monitoring, a rogue
agent can operate indefinitely.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Policy requires comprehensive audit logging and behavioural monitoring of all deployed agents from day one |
| Continuous monitoring | DE.CM-09 | DETECT | Behavioural baseline monitoring — deviation from established baseline triggers tiered response |
| Incident analysis | RS.MA-02 | RESPOND | Kill switch activation, recent recommendation audit, process state validation, forensic capture |
| Incident recovery | RC.RP-02 | RECOVER | Recovery procedure after rogue agent containment — clean reactivation process, post-incident review |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Establish policy requiring full observability
  for all agents — no production deployment without
  comprehensive audit logging and monitoring coverage
- DE.CM-09: Establish behavioural baseline for every
  deployed agent during commissioning — expected invocation
  patterns, recommendation distributions, access volumes
- Implement scope constraints at the orchestration layer —
  rogue agent cannot exceed its permission envelope

**Hardening**
- DE.CM-09: Continuous behavioural monitoring — deviation
  from baseline triggers tiered response: log, alert,
  suspend, investigate
- Aggregate recommendation analysis — periodic review
  of agent recommendation patterns for systematic bias
  or drift from expected behaviour
- RS.MA-02: Define rogue agent containment procedure —
  kill switch, audit checklist, operational impact
  assessment, forensic capture workflow

**Advanced**
- Conduct rogue agent red team exercises — simulate
  persistent hidden goal pursuit across extended sessions,
  verify detection capability
- Multi-agent consensus for high-stakes decisions — rogue
  single agent cannot influence critical recommendations
  without cross-validation
- RC.RP-02: Define clean reactivation process — full
  investigation complete, root cause confirmed, controls
  updated before any reactivation

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

## CSF 2.0 agentic AI profile

| Function | Priority categories | Agentic-specific target state |
|---|---|---|
| GOVERN | GV.RM-06, GV.SC-06, GV.OC-01 | Autonomy policy documented, NHI governance live, supply chain requirements applied |
| IDENTIFY | ID.AM-01, ID.RA-01 | All agent assets inventoried including memory stores, tools, A2A channels |
| PROTECT | PR.AA-05, PR.DS-01/02, PR.PS-04, PR.IR-01 | Least privilege per tool, memory encrypted, A2A encrypted, circuit breakers live |
| DETECT | DE.CM-01, DE.CM-09 | Behavioural baselines established, tool invocation monitoring live, goal-state monitoring active |
| RESPOND | RS.MA-01, RS.MA-02 | Kill switch tested, containment procedures exercised, forensic capability confirmed |
| RECOVER | RC.RP-02 | Clean reactivation process documented, BCP covers agent cluster failures, RTO/RPO defined |

---

## Implementation priority

| Phase | ASI entries | CSF categories | Rationale |
|---|---|---|---|
| 1 — Do now | ASI01, ASI02, ASI03 | GV.RM-06, PR.AA-05 | Governance policy and least privilege close the largest attack surface |
| 2 — This sprint | ASI05, ASI10 | GV.RM-06 code execution, DE.CM-09 baseline | RCE and rogue agents are catastrophic if triggered undetected |
| 3 — This quarter | ASI04, ASI06, ASI07 | GV.SC-06, PR.DS-01/02, PR.PS-04 | Supply chain, memory, and A2A security require infrastructure changes |
| 4 — Ongoing | ASI08, ASI09 | PR.IR-01, RC.RP-02, GV.OC-01 | Resilience, cascade engineering, and trust boundary hardening |

---

## References

- NIST Cybersecurity Framework 2.0: https://www.nist.gov/cyberframework
- CSF 2.0 full document: https://doi.org/10.6028/NIST.CSWP.29
- OWASP Agentic Top 10 2026: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- NIST AI RMF 1.0: https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — ASI01-ASI10 full entries with CSF 2.0 profile | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
