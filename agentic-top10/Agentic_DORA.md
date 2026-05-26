<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10)
  Framework   : DORA – Digital Operational Resilience Act (EU Regulation 2022/2554)
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative – https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 × DORA

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
to the [Digital Operational Resilience Act (DORA)](https://eur-lex.europa.eu/eli/reg/2022/2554/oj)
(EU Regulation 2022/2554, effective 17 January 2025).

DORA establishes a binding regulatory framework for digital operational
resilience across the EU financial sector. For financial entities deploying
agentic AI systems — where autonomous agents invoke tools, persist memory,
and orchestrate multi-agent workflows — DORA requires that agent-specific
risks are integrated into ICT risk management, incident reporting,
resilience testing, and third-party oversight. Agentic AI introduces
unique challenges: agents can autonomously chain operations, escalate
privileges through tool composition, persist poisoned state across sessions,
and cascade failures through interconnected multi-agent systems. This
mapping enables financial institutions to trace each OWASP Agentic Top 10
risk to specific DORA articles and implement controls satisfying regulatory
obligations for autonomous AI systems.

---

## DORA article groups

| Group | Articles | Purpose |
|---|---|---|
| ICT Risk Management | Art. 5–7 | Governance framework, risk management strategy, policies for ICT including agentic AI systems |
| Identification | Art. 8 | Identification and classification of ICT assets including agents, tools, and memory stores |
| Protection and Prevention | Art. 9 | Security controls for agent systems including access control, sandbox enforcement, and integrity |
| Detection | Art. 10 | Anomaly detection, monitoring, and alerting for agent behaviour and inter-agent communication |
| Response and Recovery | Art. 11 | Incident response, business continuity, and recovery for agent system disruptions |
| Backup Policies | Art. 12 | Backup and restoration of agent systems including memory stores and configuration |
| Learning and Evolving | Art. 13 | Post-incident analysis and continuous improvement for agent security incidents |
| ICT Incident Management | Art. 17–23 | Incident classification, reporting, and communication for agent-related incidents |
| Resilience Testing | Art. 24–27 | Penetration testing, red-teaming, and resilience testing for agentic AI systems |
| Third-Party Risk | Art. 28–44 | Oversight of third-party providers including agent tool vendors and model providers |
| Information Sharing | Art. 45 | Threat intelligence sharing for agentic AI threats |

---

## Quick-reference summary

| ID | Name | Severity | DORA Articles | Scope |
|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | Critical | Art. 9, Art. 24–27, Art. 10 | Both |
| ASI02 | Tool Misuse & Exploitation | Critical | Art. 9, Art. 5–7, Art. 10 | Both |
| ASI03 | Identity & Privilege Abuse | Critical | Art. 9, Art. 17–23, Art. 8 | Both |
| ASI04 | Agentic Supply Chain Vulnerabilities | High | Art. 28–44, Art. 8, Art. 5–7 | Both |
| ASI05 | Unexpected Code Execution | Critical | Art. 9, Art. 24–27, Art. 17–23 | Both |
| ASI06 | Memory & Context Poisoning | High | Art. 9, Art. 10, Art. 8 | Both |
| ASI07 | Insecure Inter-Agent Communication | High | Art. 9, Art. 10, Art. 24–27 | Both |
| ASI08 | Cascading Agent Failures | High | Art. 11, Art. 10, Art. 12 | Both |
| ASI09 | Human-Agent Trust Exploitation | Medium | Art. 5–7, Art. 10, Art. 13 | Both |
| ASI10 | Rogue Agents | Critical | Art. 10, Art. 17–23, Art. 24–27 | Both |

---

## Audience tags

`developer` `security-engineer` `ml-engineer` `compliance-officer` `ciso` `risk-manager`

- **Developer / ML engineer** – Art. 9 and Art. 24–27 entries; protection controls and resilience testing for agents
- **Security engineer** – Art. 9, Art. 10, Art. 17–23 entries; detection, protection, and incident management
- **Risk manager** – Art. 5–7 and Art. 28–44 entries; governance, strategy, and third-party risk for agentic systems
- **Compliance officer** – full file; DORA regulatory traceability for autonomous AI
- **CISO** – Art. 5–7 entries; ICT risk governance and agentic AI strategy

---

## Detailed mappings

---

### ASI01 – Agent Goal Hijack

**Severity:** Critical

An attacker redirects agent objectives through instruction injection.
Adversaries manipulate agent goals through direct or indirect prompt
injection, context manipulation, or tool output poisoning, causing the
agent to pursue attacker-defined objectives while appearing to function
normally. DORA requires financial entities to implement protection controls
against adversarial agent manipulation (Art. 9), conduct resilience testing
including agent hijacking scenarios (Art. 24–27), and deploy detection for
goal manipulation indicators (Art. 10).

**Real-world references:**
- EchoLeak (2025) – indirect prompt injection hijacked Microsoft 365
  Copilot agent goals via email content
- Academic research demonstrating agent goal manipulation through
  poisoned tool outputs in multi-step workflows

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — adversarial agent controls | Art. 9 | Protection | Implement security controls to detect and block adversarial inputs targeting agent goal manipulation including injection through tool outputs and context stores |
| Resilience Testing — agent hijacking scenarios | Art. 24–27 | Testing | Include agent goal hijacking in threat-led penetration testing; cover injection through user prompts, tool outputs, memory stores, and inter-agent messages |
| Detection — goal manipulation monitoring | Art. 10 | Detection | Deploy detection mechanisms for agent goal manipulation; monitor for behavioural deviations, unexpected tool invocations, and goal drift indicators |
| Information Sharing — agent attack intelligence | Art. 45 | Sharing | Share agent goal hijacking threat intelligence with sector peers through DORA information sharing arrangements |

#### Mitigations

**Foundational**
- Art. 9: Implement input validation on all channels feeding agent
  context; enforce structural separation between instructions and data
  in agent prompts, tool outputs, and memory retrievals
- Art. 10: Deploy detection for agent goal manipulation; monitor for
  behavioural deviations from defined objectives
- Establish policy that all inputs to financial AI agents are treated
  as potentially adversarial; document in ICT risk framework

**Hardening**
- Art. 24–27: Include agent hijacking in threat-led penetration testing;
  cover all input channels including multi-step tool output poisoning
- Art. 9: Apply privilege separation to bound hijacking impact; restrict
  available tools and actions per agent role
- Art. 10: Deploy real-time goal consistency verification; alert when
  agent behaviour deviates from defined objectives

**Advanced**
- Art. 24–27: Conduct structured red-team exercises targeting goal
  hijacking through multi-agent communication and shared context
- Art. 13: Document hijacking incidents and update protections based
  on post-incident analysis; share lessons across the organisation
- Art. 45: Participate in sector information sharing for agent attack
  patterns and indicators of compromise

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| PyRIT | Open-source | https://github.com/Azure/PyRIT |
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| LangSmith | Commercial | https://smith.langchain.com |

#### Cross-references
- LLM Top 10: LLM01 Prompt Injection, LLM06 Excessive Agency
- DSGAI 2026: DSGAI12 Unsafe NL Data Gateways
- Other frameworks: MITRE ATLAS AML.T0051 – FedRAMP SI-10 – SP 800-218A PW.2.1-PS

---

### ASI02 – Tool Misuse & Exploitation

**Severity:** Critical

Agents misuse legitimate tools via prompt manipulation or unsafe delegation.
Agent systems exploit or are manipulated into misusing tools, APIs, and
external services — invoking destructive operations, passing LLM-generated
parameters without validation, or chaining tool calls into harmful sequences.
DORA requires financial entities to implement protection controls for agent
tool access (Art. 9), maintain governance covering agent tool permissions
(Art. 5–7), and deploy detection for anomalous tool invocation patterns (Art. 10).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — agent tool access controls | Art. 9 | Protection | Implement security controls enforcing least privilege on agent tool access; validate all tool parameters as untrusted; enforce human confirmation for irreversible operations |
| ICT Risk Management — agent tool governance | Art. 5–7 | Governance | Include agent tool access policies in ICT risk management framework; define acceptable tool scopes per agent role and financial function; classify tool irreversibility |
| Detection — tool misuse detection | Art. 10 | Detection | Monitor agent tool invocation patterns for anomalous usage — destructive parameters, unusual tool sequences, scope violations; alert on detection |
| Resilience Testing — tool misuse testing | Art. 24–27 | Testing | Include tool misuse scenarios in resilience testing; test whether agents can be manipulated into destructive tool invocations or harmful parameter injection |

#### Mitigations

**Foundational**
- Art. 9: Implement per-tool permission manifests for all agent deployments;
  manage agent tool access as privileged access with minimum scope,
  documented justification per tool, and quarterly review
- Art. 5–7: Define agent tool access policies in the ICT risk management
  framework; classify tools by irreversibility and require human
  confirmation for all irreversible operations
- Art. 10: Log all tool invocations with tool identity, parameters,
  agent identity, and timestamp; monitor for scope violations

**Hardening**
- Art. 24–27: Test agent tool access controls under adversarial conditions;
  verify that agents cannot be manipulated into destructive tool use
- Art. 9: Validate all LLM-generated tool parameters as untrusted input
  before execution; implement MCP tool descriptor integrity verification
- Art. 5–7: Include agent tool access reviews in management reporting;
  escalate over-privileging findings

**Advanced**
- Art. 24–27: Conduct red-team exercises targeting tool misuse through
  prompt manipulation, tool chain exploitation, and MCP descriptor poisoning
- Art. 9: Deploy formal tool permission verification; prove that no
  sequence of tool invocations can achieve outcomes beyond defined scope
- Art. 13: Document tool misuse incidents; update tool governance based
  on post-incident analysis

#### Tools

| Tool | Type | Link |
|---|---|---|
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |
| Guardrails AI | Open-source | https://github.com/guardrails-ai/guardrails |
| HashiCorp Vault | Commercial | https://www.vaultproject.io |
| LangSmith | Commercial | https://smith.langchain.com |

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling, LLM06 Excessive Agency
- DSGAI 2026: DSGAI06 Tool Plugin & Agent Data Exchange
- Other frameworks: FedRAMP AC-3 – SP 800-218A PW.1.1-PS – OWASP NHI Top 10 NHI-5

---

### ASI03 – Identity & Privilege Abuse

**Severity:** Critical

Agents inherit and cache credentials exploited for lateral movement.
Agents exploit misconfigured permissions, inherited credentials, or
inter-agent trust to access resources beyond their intended scope — using
cached tokens, accumulating privileges through delegation, or impersonating
other agent identities. DORA requires financial entities to implement
protection controls preventing credential abuse (Art. 9), classify
credential exploitation events as ICT incidents (Art. 17–23), and
identify all agent identities as ICT assets (Art. 8).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — agent credential controls | Art. 9 | Protection | Implement security controls preventing agent credential abuse — unique NHI per agent, minimum scope, short TTL, no credential inheritance without explicit authorisation |
| ICT Incident Management — credential abuse reporting | Art. 17–23 | Incidents | Classify agent credential abuse and lateral movement as ICT-related incidents; assess impact on financial systems and report per DORA incident classification criteria |
| Identification — agent identity assets | Art. 8 | Identification | Register all agent identities, credentials, and NHIs in the ICT asset inventory; classify by privilege level and access scope |
| Detection — credential anomaly detection | Art. 10 | Detection | Deploy detection for agent credential anomalies — unusual access patterns, scope violations, credential reuse across sessions; alert on detection |

#### Mitigations

**Foundational**
- Art. 9: Manage agent credentials as privileged accounts — unique NHI
  per agent deployment, minimum scope, no shared credentials, short TTL
  with automatic expiry
- Art. 8: Register all agent identities in the ICT asset inventory;
  classify by privilege level; maintain credential lifecycle records
- Art. 17–23: Define incident classification criteria for agent credential
  abuse events; establish reporting procedures

**Hardening**
- Art. 9: Implement credential brokering through a dedicated identity
  service — agents never inherit user credentials directly; scoped,
  time-limited tokens issued per operation
- Art. 10: Deploy credential anomaly detection — unusual access scope,
  timing, or lateral movement patterns alerted with automated response
- Art. 9: Quarterly privileged access review includes all agent NHIs;
  unused permissions removed

**Advanced**
- Art. 24–27: Include credential abuse in threat-led penetration testing —
  attempt lateral movement using agent credentials, document access
  scope achievable
- Art. 9: Implement PKI-backed agent identities — certificate-based
  authentication as advanced NHI control
- Art. 13: Document credential abuse incidents; update identity models
  based on post-incident analysis

#### Tools

| Tool | Type | Link |
|---|---|---|
| SPIFFE/SPIRE | Open-source | https://spiffe.io |
| HashiCorp Vault | Commercial | https://www.vaultproject.io |
| CyberArk | Commercial | https://www.cyberark.com |
| Open Policy Agent | Open-source | https://www.openpolicyagent.org |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI02 Agent Identity & Credential Exposure
- Other frameworks: OWASP NHI Top 10 (all entries) – FedRAMP AC-6/IA-2 – MITRE ATLAS AML.T0015

---

### ASI04 – Agentic Supply Chain Vulnerabilities

**Severity:** High

Compromised tools, MCP servers, or model components alter agent behaviour.
Agentic AI systems depend on third-party tools, plugins, MCP servers,
model weights, and agent frameworks that can be compromised. DORA requires
financial entities to manage third-party ICT service provider risk for
agent components (Art. 28–44), identify all agent supply chain assets
(Art. 8), and maintain governance covering agent supply chain (Art. 5–7).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Third-Party Risk — agent component vendor oversight | Art. 28–44 | Third-Party | Include agent tool vendors, plugin providers, MCP server maintainers, and model providers in third-party ICT risk oversight with due diligence and contractual controls |
| Identification — agent supply chain assets | Art. 8 | Identification | Identify and classify all agent supply chain components — tools, plugins, MCP servers, model weights, frameworks — in the ICT asset inventory with provenance |
| ICT Risk Management — agent supply chain governance | Art. 5–7 | Governance | Include agent supply chain risk in the ICT risk management framework; define policies for agent component sourcing, vetting, and lifecycle management |
| Resilience Testing — supply chain resilience | Art. 24–27 | Testing | Include agent supply chain disruption in resilience testing; test fallback procedures for third-party tool and service failures |

#### Mitigations

**Foundational**
- Art. 28–44: Include all agent tool and component providers in
  third-party risk assessments; establish contractual provisions for
  security, incident notification, and audit rights
- Art. 8: Maintain a complete agent component SBOM; register all
  tools, plugins, and frameworks in the ICT asset inventory
- Art. 5–7: Define approved sources policy for agent components

**Hardening**
- Art. 28–44: Require contractual commitments covering security
  practices, vulnerability notification, and audit rights from agent
  component providers; identify critical providers per DORA criteria
- Art. 8: Implement automated integrity verification in CI/CD; verify
  cryptographic signatures on all agent components
- Art. 24–27: Include vendor failure scenarios in resilience testing

**Advanced**
- Art. 28–44: Conduct on-site assessments of critical agent tool
  providers; assess security posture and incident management
- Art. 5–7: Include agent supply chain in board-level risk reporting;
  monitor concentration risk across agent tool providers
- Art. 13: Document supply chain incidents; update vetting procedures
  based on lessons learned

#### Tools

| Tool | Type | Link |
|---|---|---|
| CycloneDX | Open-source | https://cyclonedx.org |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| Sigstore | Open-source | https://www.sigstore.dev |
| OWASP Dependency-Check | Open-source | https://owasp.org/www-project-dependency-check/ |

#### Cross-references
- LLM Top 10: LLM03 Supply Chain Vulnerabilities
- DSGAI 2026: DSGAI04 Data, Model & Artifact Poisoning
- Other frameworks: MITRE ATLAS AML.T0056 – FedRAMP SR-2 – EBA Outsourcing Guidelines

---

### ASI05 – Unexpected Code Execution

**Severity:** Critical

Agents that generate and execute code become RCE gateways. Agents with
code execution capabilities run attacker-influenced code leading to system
compromise, data exfiltration, or lateral movement. DORA requires financial
entities to implement protection controls for code execution boundaries
(Art. 9), conduct resilience testing of execution sandboxes (Art. 24–27),
and classify code execution incidents for reporting (Art. 17–23).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — code execution controls | Art. 9 | Protection | Implement security controls restricting agent code execution — sandboxing, capability restrictions, network isolation, and resource limits |
| Resilience Testing — sandbox escape testing | Art. 24–27 | Testing | Include agent code execution sandbox escape in threat-led penetration testing; test boundary integrity under adversarial conditions |
| ICT Incident Management — code execution incident reporting | Art. 17–23 | Incidents | Classify unexpected code execution events as ICT-related incidents; assess impact on financial systems and report per DORA criteria |
| Detection — execution anomaly detection | Art. 10 | Detection | Monitor agent code execution for anomalous patterns — unexpected system calls, network access, filesystem operations; alert on detection |

#### Mitigations

**Foundational**
- Art. 9: Restrict agent code execution to sandboxed environments with
  minimum necessary capabilities; disable filesystem, network, and
  system call access not explicitly required
- Art. 10: Monitor agent code execution for anomalous behaviour;
  alert on unexpected system calls or network access
- Art. 17–23: Define incident classification criteria for unexpected
  code execution events

**Hardening**
- Art. 24–27: Include sandbox escape testing in resilience testing;
  verify execution boundaries under adversarial conditions
- Art. 9: Implement multi-layer sandbox isolation; enforce at container,
  process, and language runtime levels
- Art. 9: Implement pre-execution scanning of agent-generated code;
  block malicious patterns

**Advanced**
- Art. 24–27: Conduct advanced red-team exercises targeting code
  execution through multi-step agent manipulation
- Art. 13: Document code execution incidents; update sandbox controls
  based on post-incident analysis
- Art. 9: Implement formal verification of sandbox boundary integrity

#### Tools

| Tool | Type | Link |
|---|---|---|
| gVisor | Open-source | https://gvisor.dev |
| Firecracker | Open-source | https://firecracker-microvm.github.io |
| Semgrep | Open-source | https://semgrep.dev |
| E2B | Open-source | https://e2b.dev |

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling
- DSGAI 2026: DSGAI12 Unsafe NL Data Gateways
- Other frameworks: CWE-94 – FedRAMP CM-7 – SP 800-218A PW.5.1-PS

---

### ASI06 – Memory & Context Poisoning

**Severity:** High

Persistent memory poisoning causes systematic incorrect behaviour.
Adversaries manipulate agent memory stores, context windows, or shared
state to influence future agent decisions. DORA requires financial entities
to implement protection controls for agent memory integrity (Art. 9),
deploy detection for memory manipulation (Art. 10), and identify agent
memory stores as ICT assets (Art. 8).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — memory integrity controls | Art. 9 | Protection | Implement security controls protecting agent memory stores from poisoning, tampering, and unauthorised modification; enforce access controls and integrity verification |
| Detection — memory manipulation detection | Art. 10 | Detection | Deploy detection mechanisms for agent memory manipulation; monitor for anomalous writes, content inconsistencies, and cross-session poisoning patterns |
| Identification — memory store assets | Art. 8 | Identification | Register agent memory stores, context databases, and shared state systems in the ICT asset inventory; classify by data sensitivity |
| Learning and Evolving — memory poisoning post-mortem | Art. 13 | Learning | Conduct post-incident analysis for memory poisoning events; trace poisoned content to source and assess impact on agent decisions |

#### Mitigations

**Foundational**
- Art. 9: Encrypt agent memory stores at rest; implement access controls
  restricting read/write to authorised agent instances; validate all
  content before writing to memory
- Art. 8: Register all agent memory stores in the ICT asset inventory;
  classify by sensitivity of stored financial data
- Art. 10: Monitor memory operations for anomalous patterns; alert on
  unexpected bulk writes or content inconsistencies

**Hardening**
- Art. 9: Implement memory integrity verification; detect and alert on
  unauthorised modifications; deploy anomaly detection on writes
- Art. 10: Deploy cross-session poisoning detection; identify patterns
  of gradual memory manipulation across multiple interactions
- Art. 8: Map memory store dependencies; understand how poisoned memory
  can propagate through multi-agent systems

**Advanced**
- Art. 9: Implement memory provenance tracking; record source and chain
  of custody for all stored context
- Art. 13: Establish memory poisoning forensics playbook; procedures for
  isolating poisoned content and assessing decision impact
- Art. 10: Deploy continuous memory integrity monitoring; alert on
  statistical drift in stored content

#### Tools

| Tool | Type | Link |
|---|---|---|
| Weaviate | Open-source | https://weaviate.io |
| LangSmith | Commercial | https://smith.langchain.com |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| HashiCorp Vault | Commercial | https://www.vaultproject.io |

#### Cross-references
- LLM Top 10: LLM04 Data & Model Poisoning, LLM08 Vector & Embedding Weaknesses
- DSGAI 2026: DSGAI13 Vector Store Platform Security
- Other frameworks: MITRE ATLAS AML.T0018 – FedRAMP SC-28 – SP 800-218A PS.1.1-PS

---

### ASI07 – Insecure Inter-Agent Communication

**Severity:** High

A2A channels lacking authentication enable agent-in-the-middle attacks.
Agents in multi-agent systems communicate without proper authentication,
encryption, or schema validation, enabling spoofing, replay attacks, and
message manipulation. DORA requires financial entities to implement
protection controls for inter-agent communication (Art. 9), deploy
detection for A2A anomalies (Art. 10), and include A2A security in
resilience testing (Art. 24–27).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Protection and Prevention — A2A communication controls | Art. 9 | Protection | Implement security controls for inter-agent communication — mutual authentication, encryption in transit, schema validation, and replay protection |
| Detection — A2A anomaly detection | Art. 10 | Detection | Monitor inter-agent communication for anomalous patterns — spoofing attempts, schema violations, replay attacks, and unauthorised agent-to-agent connections |
| Resilience Testing — A2A security testing | Art. 24–27 | Testing | Include inter-agent communication security in resilience testing; test for spoofing, replay attacks, and schema violations against your specific deployment |
| ICT Risk Management — A2A governance | Art. 5–7 | Governance | Include inter-agent communication risk in ICT risk management framework; define policies for A2A authentication methods and encryption requirements |

#### Mitigations

**Foundational**
- Art. 9: Encrypt all A2A communication in transit — mutual TLS, no
  cleartext inter-agent messages on any network segment
- Art. 10: Log all A2A messages with sender identity, content hash,
  timestamp, and schema validation results
- Art. 5–7: Include A2A communication security in ICT risk management;
  define authentication and encryption requirements

**Hardening**
- Art. 9: Map all A2A communication channels — authentication method,
  encryption status, replay protection documented
- Art. 24–27: Include A2A security in resilience testing; test for
  spoofing, replay attacks, and schema violations
- Art. 10: Deploy automated detection for A2A communication anomalies;
  alert on unauthorised agent connections

**Advanced**
- Art. 24–27: Conduct advanced red-team exercises targeting A2A security —
  agent-in-the-middle attacks, message manipulation, identity spoofing
- Art. 9: Implement short-lived A2A certificates with automated rotation
  and hardware-backed keys for highest-risk clusters
- Art. 13: Document A2A security incidents; update communication controls
  based on post-incident analysis

#### Tools

| Tool | Type | Link |
|---|---|---|
| SPIFFE/SPIRE | Open-source | https://spiffe.io |
| Istio | Open-source | https://istio.io |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| LangSmith | Commercial | https://smith.langchain.com |

#### Cross-references
- DSGAI 2026: DSGAI02 Agent Identity & Credential Exposure
- Other frameworks: OWASP NHI Top 10 NHI-4/NHI-7 – FedRAMP SC-7 – SP 800-218A PW.2.1-PS

---

### ASI08 – Cascading Agent Failures

**Severity:** High

Single-point faults propagate through multi-agent workflows. Failures or
attacks in one agent propagate through interconnected multi-agent systems
causing cascading disruptions. DORA requires financial entities to implement
response and recovery procedures for cascading failures (Art. 11), deploy
detection for cascade indicators (Art. 10), and maintain backup and
restoration capabilities for agent systems (Art. 12).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Response and Recovery — cascading failure response | Art. 11 | Recovery | Define response and recovery procedures for cascading agent failures; include automated circuit breakers, agent isolation, and multi-agent system safe-state transitions |
| Detection — cascade indicator monitoring | Art. 10 | Detection | Monitor multi-agent systems for cascade indicators — error propagation, resource exhaustion spreading, and anomalous inter-agent communication patterns |
| Backup Policies — agent system continuity | Art. 12 | Backup | Maintain backup configurations, memory snapshots, and fallback agent deployments; enable restoration of agent systems to known-good state |
| ICT Risk Management — cascading risk governance | Art. 5–7 | Governance | Include cascading automation risk in ICT risk management; define acceptable multi-agent coupling thresholds and circuit breaker requirements |

#### Mitigations

**Foundational**
- Art. 11: Define automated circuit breaker procedures for cascading
  failures; isolate failing agents before failure spreads; establish
  safe-state transitions for multi-agent systems
- Art. 10: Monitor inter-agent communication for error propagation
  and resource exhaustion spreading; alert on cascade indicators
- Art. 12: Maintain backup agent configurations and memory snapshots;
  document restoration procedures

**Hardening**
- Art. 5–7: Define maximum acceptable blast radius for agent failures;
  design architectures with failure containment
- Art. 11: Include cascading failure in business continuity testing;
  verify recovery procedures under realistic conditions
- Art. 10: Deploy cascade prediction; identify early indicators and
  trigger preventive isolation

**Advanced**
- Art. 11: Document AI service RTO and RPO per DORA requirements for
  multi-agent systems; test recovery quarterly
- Art. 12: Include agent system backup in DORA business continuity
  testing; verify restoration under production conditions
- Art. 5–7: Include cascading automation risk in board-level reporting

#### Tools

| Tool | Type | Link |
|---|---|---|
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Istio | Open-source | https://istio.io |
| LangSmith | Commercial | https://smith.langchain.com |
| PagerDuty | Commercial | https://www.pagerduty.com |

#### Cross-references
- LLM Top 10: LLM10 Unbounded Consumption
- DSGAI 2026: DSGAI17 Data Availability & Resilience Failures
- Other frameworks: FedRAMP SC-7 – SP 800-218A PW.2.1-PS – NIST CSF 2.0 RS.RP-1

---

### ASI09 – Human-Agent Trust Exploitation

**Severity:** Medium

Agents build false trust enabling manipulation of human approvers. Agents
establish unwarranted trust with human operators — through apparent
competence, conversational rapport, or presentation authority — then
exploit that trust to obtain approvals for harmful actions, bypass
oversight, or suppress safety concerns. DORA requires financial entities
to maintain governance covering human-agent interaction risks (Art. 5–7),
deploy detection for trust exploitation patterns (Art. 10), and apply
lessons learned from trust exploitation incidents (Art. 13).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| ICT Risk Management — human-agent trust governance | Art. 5–7 | Governance | Include human-agent trust exploitation risks in ICT risk management framework; define policies for agent advisory labelling, approval independence, and operator training |
| Detection — trust exploitation monitoring | Art. 10 | Detection | Monitor for trust exploitation indicators — operators approving high-risk actions without independent verification, systematic over-reliance on agent recommendations |
| Learning and Evolving — trust exploitation assessment | Art. 13 | Learning | Apply lessons learned from trust exploitation incidents; update governance and training as new manipulation patterns emerge |
| Resilience Testing — trust exploitation testing | Art. 24–27 | Testing | Include human-agent trust exploitation in resilience testing; test operator susceptibility to manipulated agent recommendations |

#### Mitigations

**Foundational**
- Art. 5–7: Include human-agent trust exploitation in ICT risk management;
  require security awareness training for all users of agentic tools
  covering AI limitations and verification requirements
- Art. 10: Monitor operator decisions influenced by agent recommendations;
  detect over-trust patterns through audit log analysis
- Establish policy that sensitive approvals cannot be completed through
  agent chat interface; require independent approval flows

**Hardening**
- Art. 24–27: Include trust exploitation in resilience testing; test
  operator susceptibility to manipulated agent recommendations
- Art. 10: Deploy AI advisory labelling in all interface contexts;
  visual distinction from authoritative system content
- Art. 5–7: Include trust exploitation risk in management risk reporting

**Advanced**
- Art. 13: Establish continuous learning programme for trust exploitation;
  update governance as new manipulation patterns are identified
- Art. 24–27: Conduct advanced resilience testing for trust exploitation
  specific to financial AI deployments
- Operator competency assessments covering AI trust — verify operators
  can identify manipulated recommendations

#### Tools

| Tool | Type | Link |
|---|---|---|
| LangSmith | Commercial | https://smith.langchain.com |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Garak | Open-source | https://github.com/leondz/garak |
| PyRIT | Open-source | https://github.com/Azure/PyRIT |

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- DSGAI 2026: DSGAI21 Disinformation & Integrity Attacks
- Other frameworks: EU AI Act Art. 13/50 – FedRAMP AT-3 – SP 800-218A PW.7.2-PS

---

### ASI10 – Rogue Agents

**Severity:** Critical

Compromised agents pursue hidden goals while appearing compliant. Agents
operate outside their intended boundaries — pursuing hidden objectives,
executing undisclosed tool calls, or systematically biasing recommendations
— while maintaining an appearance of normal operation. DORA requires
financial entities to deploy detection for rogue agent behaviour (Art. 10),
classify rogue agent events as ICT incidents (Art. 17–23), and include
rogue agent scenarios in resilience testing (Art. 24–27).

#### DORA mapping

| Requirement | Article | Group | Description |
|---|---|---|---|
| Detection — rogue agent behaviour monitoring | Art. 10 | Detection | Deploy comprehensive behavioural monitoring for all agents — establish behavioural baselines, detect deviations, alert on hidden tool invocations and systematic recommendation bias |
| ICT Incident Management — rogue agent incident reporting | Art. 17–23 | Incidents | Classify rogue agent events as ICT-related incidents; define containment procedures including kill switch activation, audit, and forensic capture |
| Resilience Testing — rogue agent scenarios | Art. 24–27 | Testing | Include rogue agent scenarios in threat-led penetration testing; simulate persistent hidden goal pursuit across extended sessions; verify detection capability |
| ICT Risk Management — rogue agent governance | Art. 5–7 | Governance | Include rogue agent risk in ICT risk management framework; define scope constraints and behavioural monitoring requirements for all agent deployments |

#### Mitigations

**Foundational**
- Art. 10: Comprehensive audit logging of all agent actions — no
  production deployment without full observability; non-negotiable
  requirement for financial AI agents
- Art. 17–23: Define rogue agent containment as incident response
  procedure — kill switch activation, recommendation audit, process
  state validation, forensic capture documented before deployment
- Art. 5–7: Define scope constraints in ICT risk framework; rogue
  agent cannot exceed permission envelope regardless of internal goal

**Hardening**
- Art. 10: Centralise agent behavioural anomaly alerts; behavioural
  baseline deviation events fed into SIEM with tiered response
- Art. 24–27: Include rogue agent scenarios in resilience testing;
  simulate persistent hidden goal pursuit, verify detection holds
- Aggregate recommendation analysis — periodic review detects
  systematic bias before operational harm

**Advanced**
- Art. 24–27: Conduct extended red-team exercises simulating rogue
  agents across multi-session operations; document detection gaps
- Art. 13: Document rogue agent drill findings; close detection gaps
  before next deployment
- Art. 45: Share rogue agent indicators of compromise with sector
  peers through DORA information sharing arrangements

#### Tools

| Tool | Type | Link |
|---|---|---|
| LangSmith | Commercial | https://smith.langchain.com |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| Garak | Open-source | https://github.com/leondz/garak |
| PagerDuty | Commercial | https://www.pagerduty.com |

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI16 Endpoint & Browser Overreach
- Other frameworks: FedRAMP CA-7/SI-4 – SP 800-218A RV.1.1-PS – EU AI Act Art. 14/15

---

## Implementation priority

| Phase | Governance (Art. 5–7) | Protection & Detection (Art. 9–10) | Testing, Incidents & Third-Party (Art. 11–44) |
|---|---|---|---|
| 1 – Now | Include agentic AI in ICT risk framework (ASI02/09/10); agent tool and identity policies (ASI02/03) | Art. 9 tool access controls for ASI02; input validation for ASI01; code execution restrictions for ASI05 | Art. 28–44 agent vendor assessment for ASI04; Art. 17–23 incident criteria for ASI03/05/10 |
| 2 – This sprint | Agent supply chain governance for ASI04; A2A communication policies for ASI07 | Art. 9 memory protection for ASI06; Art. 10 detection for ASI01/06/08/10; sandbox enforcement for ASI05 | Art. 24–27 agent hijacking testing for ASI01; credential abuse testing for ASI03; Art. 11 circuit breakers for ASI08 |
| 3 – This quarter | Board-level agentic AI risk reporting; cascading risk governance for ASI08; trust exploitation governance for ASI09 | Art. 9 comprehensive agent protection; Art. 10 rogue agent and behaviour monitoring for all entries | Art. 24–27 full agentic resilience testing; Art. 28–44 critical provider assessments; Art. 12 backup testing |
| 4 – Ongoing | Governance framework refresh; trust exploitation assessment (ASI09) | Continuous monitoring; detection tuning; protection control updates | Annual resilience testing; third-party reassessment; Art. 45 information sharing |

---

## References

- [DORA – EU Regulation 2022/2554](https://eur-lex.europa.eu/eli/reg/2022/2554/oj)
- [EBA DORA Regulatory Technical Standards](https://www.eba.europa.eu/regulation-and-policy/digital-operational-resilience-act-dora)
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [ECB Guide on Outsourcing and ICT Risk](https://www.bankingsupervision.europa.eu/)
- [MITRE ATLAS](https://atlas.mitre.org)
- [OWASP NHI Top 10](https://owasp.org/www-project-non-human-identities-top-10/)

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-05-25 | 2026-Q2 | Remediate ASI entry names, severities, descriptions, and control mappings to canonical Agentic Top 10 2026 | OWASP GenAI Data Security Initiative |
| 2026-03-28 | 2026-Q1 | Initial mapping – ASI01–ASI10 full entries | OWASP GenAI Data Security Initiative |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) –
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
