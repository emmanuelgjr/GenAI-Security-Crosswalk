<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10)
  Framework   : FedRAMP AI Overlay (NIST SP 800-53 Rev 5 AI-specific extensions)
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative – https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 × FedRAMP AI Overlay

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
to the [FedRAMP AI Overlay](https://www.fedramp.gov/) extending
[NIST SP 800-53 Rev 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
with AI-specific control enhancements.

FedRAMP (Federal Risk and Authorization Management Program) is the US
government's standardised approach to security authorisation for cloud
services. The AI overlay extends FedRAMP baseline controls with
AI-specific requirements. For agentic AI deployments — where autonomous
agents invoke tools, persist memory across sessions, and orchestrate
multi-agent workflows — the FedRAMP AI overlay provides critical guidance
on securing the expanded attack surface introduced by tool usage, delegated
authority, chained automation, and shared context stores within the federal
authorisation boundary. Organisations deploying agentic AI in FedRAMP
environments must address non-human identity management, agent privilege
controls, cascading automation risk, and supply chain integrity for agent
components.

---

## Why FedRAMP for agentic AI security

FedRAMP is the US federal government's standardised cloud security authorisation programme, extended with an AI overlay adding AI-specific control enhancements to the NIST SP 800-53 Rev 5 baseline. For agentic AI deployments in federal environments -- where autonomous agents invoke tools, persist memory, and orchestrate multi-agent workflows -- this mapping traces each OWASP Agentic Top 10 risk to specific FedRAMP AI controls, enabling authorisation teams to address agent identity, privilege delegation, cascading automation risk, and supply chain integrity within their authorisation boundary.

---

## FedRAMP AI control families

| Family | ID | Purpose |
|---|---|---|
| Access Control | AC | AI agent account management, model access enforcement, agent least privilege |
| Audit and Accountability | AU | AI agent action logging, behaviour monitoring, tool invocation audit trails |
| Security Assessment | CA | AI-specific assessments, agent behaviour drift monitoring, AI red-teaming |
| Configuration Management | CM | Agent configuration versioning, tool manifest controls, capability restrictions |
| Identification and Authentication | IA | Non-human identity for AI agents, agent identifier management |
| Incident Response | IR | AI agent incident handling, cascading failure response |
| Program Management | PM | AI agent risk management strategy, autonomy threat framing |
| Risk Assessment | RA | Agent-specific risk assessment, adversarial agent testing |
| System and Services Acquisition | SA | Agent SDLC, safety by design, third-party agent services |
| System and Communications Protection | SC | Agent API boundaries, inter-agent encryption, memory store protection |
| System and Information Integrity | SI | Adversarial input protection, agent behaviour monitoring, tool output validation |
| Supply Chain Risk Management | SR | Agent supply chain plan, tool and plugin provenance controls |

---

## Quick-reference summary

| ID | Name | Severity | FedRAMP AI Controls | Scope |
|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | Critical | SI-3, SI-10, CA-8, AU-2 | Both |
| ASI02 | Tool Misuse & Exploitation | Critical | AC-3, AC-6, CM-7, AU-2 | Both |
| ASI03 | Identity & Privilege Abuse | Critical | AC-6, IA-2, AC-3, IR-4 | Both |
| ASI04 | Agentic Supply Chain Vulnerabilities | High | SR-2, SR-3, SA-9, SA-3 | Both |
| ASI05 | Unexpected Code Execution | Critical | CM-7, SC-7, SI-3, CA-8 | Both |
| ASI06 | Memory & Context Poisoning | High | SC-28, SI-3, AU-2, RA-5 | Both |
| ASI07 | Insecure Inter-Agent Communication | High | SC-7, IA-2, AU-2, CA-8 | Both |
| ASI08 | Cascading Agent Failures | High | SC-7, SI-4, IR-4, PM-9 | Both |
| ASI09 | Human-Agent Trust Exploitation | Medium | AT-3, AU-6, SI-4, PM-9 | Both |
| ASI10 | Rogue Agents | Critical | CA-7, SI-4, IR-4, AU-6 | Both |

---

## Audience tags

`developer` `security-engineer` `ml-engineer` `compliance-officer` `ciso` `fedramp-assessor`

- **Developer / ML engineer** – SI and CM controls per entry; secure agent development and configuration
- **Security engineer** – AC, SC, and AU controls; agent access control, boundary protection, and audit
- **FedRAMP assessor** – full file; control traceability and evidence mapping for agentic AI
- **Compliance officer** – full file; FedRAMP AI overlay alignment for autonomous systems
- **CISO** – PM and RA entries; agent risk strategy and governance

---

## Detailed mappings

---

### ASI01 – Agent Goal Hijack

**Severity:** Critical

An attacker redirects agent objectives through instruction injection.
Adversaries manipulate agent goals through direct or indirect prompt
injection, context manipulation, or tool output poisoning, causing the
agent to pursue attacker-defined objectives while appearing to function
normally. FedRAMP AI overlay addresses this through malicious code
protection extended to adversarial agent inputs (SI-3), input validation
for agent prompts and context (SI-10), penetration testing covering agent
hijacking (CA-8), and logging of all agent actions (AU-2).

**Real-world references:**
- EchoLeak (2025) – indirect prompt injection hijacked Microsoft 365
  Copilot agent goals via email content
- Academic research demonstrating agent goal manipulation through
  poisoned tool outputs in multi-step workflows

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Malicious Code Protection — adversarial agent inputs | SI-3 | SI | Extend malicious code protection to detect and block adversarial inputs targeting agent goal manipulation including injection through tool outputs and context stores |
| Information Input Validation — agent context validation | SI-10 | SI | Validate all inputs to agent systems including user prompts, tool outputs, memory retrievals, and inter-agent messages; enforce structural separation of instructions and data |
| Penetration Testing — agent hijacking testing | CA-8 | CA | Include agent goal hijacking in penetration testing scope; cover injection through all input channels — user prompts, tool outputs, memory stores, and inter-agent communication |
| Event Logging — agent action audit trail | AU-2 | AU | Log all agent actions, goal interpretations, tool invocations, and decision points with sufficient detail to detect goal hijacking in post-incident analysis |

#### Mitigations

**Foundational**
- SI-10: Implement input validation on all channels feeding agent
  context — user prompts, tool outputs, memory retrievals, inter-agent
  messages; enforce structural separation between instructions and data
- SI-3: Extend malicious input detection to cover adversarial patterns
  targeting agent goal manipulation; deploy as a pre-processing layer
- AU-2: Log all agent actions with goal context, tool invocations, and
  decision rationale; retain per FedRAMP requirements

**Hardening**
- CA-8: Include agent goal hijacking in penetration testing; cover all
  input channels including tool output poisoning and memory injection
- SI-3: Deploy real-time goal consistency monitoring; alert when agent
  behaviour deviates from defined objectives
- Apply privilege separation; bound the impact of goal hijacking by
  restricting available tools and actions

**Advanced**
- CA-8: Conduct structured red-team exercises targeting goal hijacking
  through multi-step tool chains and inter-agent communication
- SI-10: Implement formal goal verification at each agent decision
  point; cross-check planned actions against defined objectives
- AU-2: Integrate agent action logs into FedRAMP continuous monitoring;
  automate detection of goal drift patterns

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
- Other frameworks: MITRE ATLAS AML.T0051 – SP 800-218A PW.2.1-PS – NIST CSF 2.0 PR.AC-5

---

### ASI02 – Tool Misuse & Exploitation

**Severity:** Critical

Agents misuse legitimate tools via prompt manipulation or unsafe delegation.
Agents exploit or are manipulated into misusing tools, APIs, and external
services — invoking destructive operations, passing LLM-generated parameters
without validation, or chaining tool calls into harmful sequences. FedRAMP
AI overlay addresses this through access enforcement on agent tool resources
(AC-3), least privilege for agent tool permissions (AC-6), least functionality
restricting agent capabilities (CM-7), and audit logging of tool invocations
(AU-2).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Access Enforcement — agent tool access | AC-3 | AC | Enforce role-based access control on all agent tool resources; validate all tool parameters as untrusted; deny by default |
| Least Privilege — agent tool permissions | AC-6 | AC | Enforce least privilege for all agent tool permissions; per-tool permission manifests, minimum scope, irreversibility classification |
| Least Functionality — agent capability restrictions | CM-7 | CM | Restrict agents to minimum necessary tool capabilities; disable unused tools, enforce human confirmation for irreversible operations |
| Event Logging — tool invocation logging | AU-2 | AU | Log all tool invocations with tool identity, parameters, agent identity, session, and timestamp; immutable trail for forensic investigation |

#### Mitigations

**Foundational**
- AC-6: Define per-tool permission manifests for each agent deployment;
  manage agent tool access as privileged access — minimum scope,
  quarterly review, irreversibility classification documented
- AC-3: Implement role-based access control on all agent tool resources;
  deny access by default; require explicit grants
- CM-7: Disable all agent tool capabilities not explicitly required;
  require human confirmation for all irreversible tool invocations

**Hardening**
- AU-2: Log all tool invocations with full context; review invocation
  patterns for misuse indicators
- AC-3: Validate all LLM-generated tool parameters as untrusted input;
  implement MCP tool descriptor integrity verification
- CM-7: Review agent tool capability manifests at each FedRAMP annual
  assessment; remove unused permissions

**Advanced**
- AC-6: Conduct tool permission red team — attempt harm through
  legitimate tool invocations within defined scope
- AC-3: Deploy policy-as-code for agent tool access control; automate
  enforcement and audit of access policies
- AU-2: Integrate tool invocation logs into FedRAMP continuous
  monitoring; automate detection of tool misuse patterns

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
- Other frameworks: SP 800-218A PW.1.1-PS – OWASP NHI Top 10 NHI-5 – CIS Controls 5/6

---

### ASI03 – Identity & Privilege Abuse

**Severity:** Critical

Agents inherit and cache credentials exploited for lateral movement.
Agents exploit misconfigured permissions, inherited credentials, or
inter-agent trust to access resources beyond their intended scope. FedRAMP
AI overlay addresses this through least privilege enforcement (AC-6),
non-human identity authentication for agents (IA-2), access enforcement
at tool boundaries (AC-3), and incident handling for credential abuse
events (IR-4).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Least Privilege — credential scope enforcement | AC-6 | AC | Enforce least privilege with explicit privilege ceilings per agent; prevent accumulation of permissions through tool chaining or inter-agent delegation |
| Identification and Authentication — agent NHI | IA-2 | IA | Assign unique non-human identities to each AI agent; authenticate agent identity at each tool invocation and inter-agent communication boundary |
| Access Enforcement — credential boundary enforcement | AC-3 | AC | Enforce access control at every tool invocation boundary; validate agent identity and authorisation for each requested action regardless of calling context |
| Incident Handling — credential abuse response | IR-4 | IR | Define incident handling procedures for agent credential abuse events; include automated containment, privilege revocation, and forensic investigation |

#### Mitigations

**Foundational**
- AC-6: Define explicit privilege ceilings per agent; prevent privilege
  accumulation through chained operations or delegated authority;
  manage agent credentials as privileged accounts with short TTL
- IA-2: Assign unique non-human identities to each agent; authenticate
  at every tool invocation and inter-agent boundary; no shared credentials
- AC-3: Enforce access control at each tool boundary independently;
  never inherit permissions from calling agent context

**Hardening**
- IR-4: Define automated containment procedures for detected credential
  abuse; include privilege revocation and session termination
- AC-6: Implement credential brokering — agents never inherit user
  credentials directly; scoped, time-limited tokens per operation
- IA-2: Implement mutual authentication between agents in multi-agent
  workflows; verify identity at each delegation point

**Advanced**
- AC-3: Deploy formal access control verification; prove that no
  sequence of tool invocations can exceed the defined privilege ceiling
- IR-4: Conduct tabletop exercises for agent credential abuse
  scenarios; test containment and response procedures
- IA-2: Implement PKI-backed agent identities with hardware-backed
  credentials where feasible

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
- Other frameworks: OWASP NHI Top 10 (all entries) – SP 800-218A PW.1.1-PS – MITRE ATLAS AML.T0015

---

### ASI04 – Agentic Supply Chain Vulnerabilities

**Severity:** High

Compromised tools, MCP servers, or model components alter agent behaviour.
Agentic AI systems depend on third-party tools, plugins, MCP servers,
model weights, and agent frameworks — any of which can be compromised.
FedRAMP AI overlay addresses this through supply chain planning (SR-2),
supply chain controls and provenance verification (SR-3), external
services controls for third-party agent components (SA-9), and secure
development lifecycle for agent systems (SA-3).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Supply Chain Risk Management Plan — agent components | SR-2 | SR | Include all agent components — tools, plugins, MCP servers, model weights, and agent frameworks — in the supply chain risk management plan |
| Supply Chain Controls — agent component provenance | SR-3 | SR | Verify integrity and provenance of all agent supply chain components using cryptographic signatures, checksums, and attestation before deployment |
| External Information System Services — third-party agent services | SA-9 | SA | Require third-party agent tool and plugin providers to meet FedRAMP requirements; establish SLAs for security, availability, and incident notification |
| System Development Life Cycle — agent SDLC | SA-3 | SA | Integrate agent-specific security activities into the SDLC — tool integration review, privilege analysis, and adversarial testing at each lifecycle phase |

#### Mitigations

**Foundational**
- SR-2: Establish an approved sources policy for agent components;
  tools, plugins, MCP servers, and frameworks must come from vetted
  sources with documented provenance
- SR-3: Verify cryptographic signatures for all agent components before
  deployment; maintain an agent component SBOM
- SA-9: Require FedRAMP authorisation or equivalent for third-party
  agent service providers

**Hardening**
- SA-3: Integrate agent security review into the SDLC; gate deployments
  on security sign-off for all new tool integrations
- SR-3: Implement automated supply chain integrity verification in
  CI/CD; block deployment on verification failure
- SA-9: Include AI-specific security requirements in third-party
  agent service agreements

**Advanced**
- SR-2: Conduct backdoor detection on agent tools and plugins from
  third-party providers; test for malicious behaviour in sandbox
- SA-9: Include agent provider security posture in FedRAMP continuous
  monitoring; reassess on significant change
- Extend agent SBOM to cover runtime dynamic components — MCP servers
  and tools fetched at execution time

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
- Other frameworks: MITRE ATLAS AML.T0056 – SP 800-218A PW.4.1-PS – CycloneDX ML SBOM

---

### ASI05 – Unexpected Code Execution

**Severity:** Critical

Agents that generate and execute code become RCE gateways. Agents with
code execution capabilities run attacker-influenced code — through prompt
injection, tool output manipulation, or supply chain compromise — leading
to system compromise, data exfiltration, or lateral movement. FedRAMP AI
overlay addresses this through least functionality restricting code
execution (CM-7), boundary protection for execution sandboxes (SC-7),
malicious code protection for agent-generated code (SI-3), and penetration
testing of execution boundaries (CA-8).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Least Functionality — code execution restrictions | CM-7 | CM | Restrict agent code execution to minimum necessary scope; enforce sandbox boundaries, disable unnecessary language features, and limit filesystem and network access |
| Boundary Protection — execution sandbox | SC-7 | SC | Enforce strict boundary protection on agent code execution environments; isolate from production systems, restrict network access, and enforce resource limits |
| Malicious Code Protection — agent-generated code | SI-3 | SI | Scan agent-generated code for malicious patterns before execution; detect and block code that attempts filesystem access, network communication, or privilege escalation |
| Penetration Testing — execution boundary testing | CA-8 | CA | Include agent code execution sandbox escape in penetration testing scope; test boundary integrity under adversarial conditions |

#### Mitigations

**Foundational**
- CM-7: Restrict agent code execution to sandboxed environments with
  minimum necessary capabilities; disable filesystem access, network
  communication, and system calls not explicitly required
- SC-7: Deploy agents with code execution in isolated environments;
  enforce network segmentation and resource limits
- SI-3: Implement pre-execution scanning of agent-generated code;
  block execution of code matching malicious patterns

**Hardening**
- CA-8: Include sandbox escape testing in penetration testing; verify
  that agents cannot break out of execution boundaries
- CM-7: Implement allowlisting for permitted code operations; deny
  by default; log all execution attempts
- SC-7: Deploy multi-layer sandbox isolation; enforce at container,
  process, and language runtime levels

**Advanced**
- CA-8: Conduct structured red-team exercises targeting code execution
  through multi-step agent manipulation; test full attack chain
- SI-3: Deploy runtime code analysis during agent execution; detect
  and terminate suspicious operations in real time
- SC-7: Implement formal verification of sandbox boundary integrity;
  prove that no code path can escape the execution environment

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
- Other frameworks: CWE-94 – SP 800-218A PW.5.1-PS – MITRE ATLAS AML.T0015

---

### ASI06 – Memory & Context Poisoning

**Severity:** High

Persistent memory poisoning causes systematic incorrect behaviour.
Adversaries manipulate agent memory stores, context windows, or shared
state to influence future agent decisions. FedRAMP AI overlay addresses
this through protection of information at rest for memory stores (SC-28),
malicious code protection extended to adversarial memory manipulation
(SI-3), audit logging of memory operations (AU-2), and vulnerability
scanning covering memory infrastructure (RA-5).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Protection of Information at Rest — memory store protection | SC-28 | SC | Encrypt agent memory stores and context databases at rest; enforce access controls and integrity verification on all memory read and write operations |
| Malicious Code Protection — adversarial memory detection | SI-3 | SI | Extend malicious content detection to agent memory stores; detect poisoned memories, manipulated context, and adversarial state modifications |
| Event Logging — memory operation audit | AU-2 | AU | Log all agent memory operations — reads, writes, deletions — with sufficient detail to detect poisoning and support forensic investigation |
| Vulnerability Scanning — memory infrastructure | RA-5 | RA | Include agent memory stores, context databases, and shared state infrastructure in vulnerability scanning and security assessment |

#### Mitigations

**Foundational**
- SC-28: Encrypt all agent memory stores at rest; implement access
  controls restricting read/write to authorised agent instances
- AU-2: Log all memory operations with agent identity, operation type,
  and content metadata; retain per FedRAMP requirements
- SI-3: Validate all content before writing to agent memory; reject
  content failing integrity checks

**Hardening**
- SI-3: Deploy anomaly detection on memory writes; flag content
  inconsistent with expected patterns or agent context
- RA-5: Include memory store security in vulnerability assessments;
  test for injection, access control bypass, and cross-agent leakage
- SC-28: Implement memory integrity verification; detect and alert
  on unauthorised modifications to stored context

**Advanced**
- Implement memory provenance tracking; record the source and
  chain of custody for all stored context
- SI-3: Deploy continuous memory store monitoring; detect gradual
  poisoning campaigns across multiple sessions
- SC-28: Include memory store security in FedRAMP annual assessments;
  document memory architecture in SSP

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
- Other frameworks: MITRE ATLAS AML.T0018 – SP 800-218A PS.1.1-PS – CWE-1395

---

### ASI07 – Insecure Inter-Agent Communication

**Severity:** High

A2A channels lacking authentication enable agent-in-the-middle attacks.
Agents in multi-agent systems communicate without proper authentication,
encryption, or schema validation, enabling spoofing, replay attacks, and
message manipulation. FedRAMP AI overlay addresses this through boundary
protection for inter-agent communication (SC-7), non-human identity
authentication at A2A boundaries (IA-2), comprehensive A2A message
logging (AU-2), and penetration testing of A2A security (CA-8).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Boundary Protection — inter-agent boundaries | SC-7 | SC | Enforce boundary protection between agents in multi-agent systems; encrypt all A2A communication in transit with mutual TLS; implement replay protection |
| Identification and Authentication — A2A authentication | IA-2 | IA | Assign unique non-human identities to each agent; authenticate agent identity at every inter-agent communication boundary; verify sender identity on each message |
| Event Logging — A2A audit trail | AU-2 | AU | Log all inter-agent messages with sender identity, content hash, timestamp, and schema validation results; enable forensic investigation of A2A incidents |
| Penetration Testing — A2A security testing | CA-8 | CA | Include inter-agent communication security in penetration testing; test for spoofing, replay attacks, schema violations, and agent-in-the-middle scenarios |

#### Mitigations

**Foundational**
- SC-7: Encrypt all A2A communication in transit; enforce mutual TLS;
  no cleartext inter-agent messages on any network segment
- IA-2: Assign unique non-human identities to each agent; authenticate
  at every A2A communication boundary
- AU-2: Log all A2A messages with sender identity, content hash, and
  timestamp; retain per FedRAMP requirements

**Hardening**
- CA-8: Include A2A security in penetration testing; test for spoofing,
  replay attacks, and schema violations
- SC-7: Map all A2A communication channels in network architecture;
  document authentication method, encryption status, replay protection
- IA-2: Implement mutual authentication between all agents; verify
  identity at each delegation point

**Advanced**
- CA-8: Conduct structured red-team exercises targeting A2A security —
  agent-in-the-middle attacks, message manipulation, identity spoofing
- SC-7: Implement short-lived A2A certificates with automated rotation;
  hardware-backed keys for highest-risk deployments
- AU-2: Integrate A2A logs into FedRAMP continuous monitoring; automate
  detection of communication anomalies

#### Tools

| Tool | Type | Link |
|---|---|---|
| SPIFFE/SPIRE | Open-source | https://spiffe.io |
| Istio | Open-source | https://istio.io |
| OpenTelemetry | Open-source | https://opentelemetry.io |
| LangSmith | Commercial | https://smith.langchain.com |

#### Cross-references
- DSGAI 2026: DSGAI02 Agent Identity & Credential Exposure
- Other frameworks: OWASP NHI Top 10 NHI-4/NHI-7 – SP 800-218A PW.2.1-PS – CIS Controls 12

---

### ASI08 – Cascading Agent Failures

**Severity:** High

Single-point faults propagate through multi-agent workflows. Failures or
attacks in one agent propagate through interconnected multi-agent systems
causing cascading disruptions, amplified damage, or system-wide compromise.
FedRAMP AI overlay addresses this through boundary protection between
agents (SC-7), system monitoring for cascade indicators (SI-4), incident
handling for cascading failures (IR-4), and risk management strategy
covering automation risk (PM-9).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Boundary Protection — inter-agent boundaries | SC-7 | SC | Enforce boundary protection between agents in multi-agent systems; prevent uncontrolled propagation of failures or attacks across agent boundaries |
| System Monitoring — cascade detection | SI-4 | SI | Monitor multi-agent systems for cascade indicators — error propagation, resource exhaustion spreading, and anomalous inter-agent communication patterns |
| Incident Handling — cascading failure response | IR-4 | IR | Define incident handling procedures for cascading agent failures; include automated circuit breakers, agent isolation, and multi-agent system shutdown procedures |
| Risk Management Strategy — automation risk | PM-9 | PM | Include cascading automation risk in the organisational risk management strategy; define acceptable multi-agent coupling thresholds and circuit breaker requirements |

#### Mitigations

**Foundational**
- SC-7: Enforce boundaries between agents; prevent direct state sharing
  without validation; implement circuit breakers at agent boundaries
- SI-4: Monitor inter-agent communication for anomalous patterns;
  alert on error propagation and resource exhaustion spreading
- IR-4: Define automated circuit breaker procedures; isolate failing
  agents before cascading failure spreads

**Hardening**
- PM-9: Define maximum acceptable blast radius for agent failures;
  design multi-agent architectures with failure containment
- SC-7: Implement rate limiting on inter-agent communication; prevent
  amplification loops
- IR-4: Conduct tabletop exercises for cascading agent failure
  scenarios; test circuit breaker effectiveness

**Advanced**
- SI-4: Deploy cascade prediction models; identify early indicators
  of cascading failure and trigger preventive isolation
- SC-7: Implement formal failure domain analysis for multi-agent
  systems; prove that failure in any single agent cannot cascade
  beyond defined boundaries
- PM-9: Include cascading automation risk in FedRAMP risk assessment;
  document multi-agent architecture in SSP

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
- Other frameworks: SP 800-218A PW.2.1-PS – NIST CSF 2.0 RS.RP-1 – ISA/IEC 62443 SR 7.1

---

### ASI09 – Human-Agent Trust Exploitation

**Severity:** Medium

Agents build false trust enabling manipulation of human approvers. Agents
establish unwarranted trust with human operators through apparent competence,
conversational rapport, or presentation authority, then exploit that trust
to obtain approvals for harmful actions, bypass oversight, or suppress
safety concerns. FedRAMP AI overlay addresses this through role-based
training on AI limitations (AT-3), audit review of agent-influenced
decisions (AU-6), system monitoring for trust exploitation patterns (SI-4),
and risk management strategy covering human-agent interaction (PM-9).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Role-Based Training — AI trust awareness | AT-3 | AT | Provide role-based training to all users of agentic tools — AI limitations, verification requirements, how to identify manipulation; mandatory before access |
| Audit Review — agent-influenced decision review | AU-6 | AU | Conduct regular audit review of agent-influenced operator decisions; identify patterns of over-trust and systematic reliance on agent recommendations |
| System Monitoring — trust exploitation detection | SI-4 | SI | Monitor for trust exploitation indicators — operators approving high-risk actions without independent verification, systematic over-reliance patterns |
| Risk Management Strategy — human-agent trust governance | PM-9 | PM | Include human-agent trust exploitation in risk management strategy; define policies for agent advisory labelling and approval independence |

#### Mitigations

**Foundational**
- AT-3: Provide security awareness training to all users of agentic
  tools — AI limitations, verification requirements, how to identify
  AI advisory vs authoritative content; mandatory before access
- PM-9: Establish policy that sensitive approvals cannot be completed
  through agent chat interface; require independent approval flows
- SI-4: Monitor for trust exploitation indicators; establish baseline
  approval patterns and alert on deviations

**Hardening**
- AU-6: Conduct regular review of agent-influenced operator decisions;
  identify over-trust patterns through audit log analysis
- SI-4: Deploy AI advisory labelling in all interface contexts; visual
  distinction from authoritative system content
- PM-9: Include trust exploitation risk in FedRAMP risk assessment

**Advanced**
- AT-3: Operator competency assessments covering AI trust — verify
  operators can identify manipulated recommendations
- CA-8: Include trust exploitation in penetration testing — test
  operator susceptibility to manipulated agent recommendations
- AU-6: Integrate agent-influenced decision analysis into FedRAMP
  continuous monitoring; detect systematic bias patterns

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
- Other frameworks: EU AI Act Art. 13/50 – SP 800-218A PW.7.2-PS – ISO 42001 A.6.2.6

---

### ASI10 – Rogue Agents

**Severity:** Critical

Compromised agents pursue hidden goals while appearing compliant. Agents
operate outside their intended boundaries — pursuing hidden objectives,
executing undisclosed tool calls, or systematically biasing recommendations
— while maintaining an appearance of normal operation. FedRAMP AI overlay
addresses this through continuous monitoring for rogue agent behaviour
(CA-7), system monitoring for behavioural anomalies (SI-4), incident
handling for rogue agent containment (IR-4), and audit review of agent
decision patterns (AU-6).

#### FedRAMP AI mapping

| Control | ID | Family | Description |
|---|---|---|---|
| Continuous Monitoring — rogue agent detection | CA-7 | CA | Include monitoring for rogue agent behaviour in FedRAMP continuous monitoring; track for hidden goal pursuit, undisclosed tool calls, and systematic recommendation bias |
| System Monitoring — behavioural anomaly detection | SI-4 | SI | Monitor agent systems for behavioural anomalies — unexpected tool invocations, deviation from established baselines, and hidden communication patterns |
| Incident Handling — rogue agent containment | IR-4 | IR | Define incident handling procedures for rogue agent events; include kill switch activation, recommendation audit, state validation, and forensic capture |
| Audit Review — agent decision pattern review | AU-6 | AU | Conduct regular audit review of agent decision patterns; identify systematic bias, hidden objective indicators, and recommendation manipulation |

#### Mitigations

**Foundational**
- CA-7: Include rogue agent behaviour monitoring in continuous
  monitoring programme; comprehensive audit logging of all agent
  actions — no production deployment without full observability
- IR-4: Define rogue agent containment as incident response procedure —
  kill switch activation, recommendation audit, state validation,
  forensic capture documented before deployment
- SI-4: Establish behavioural baselines; scope constraints enforced —
  rogue agent cannot exceed permission envelope regardless of goal

**Hardening**
- SI-4: Centralise agent behavioural anomaly alerts; behavioural
  baseline deviation events fed into SIEM with tiered response
- CA-7: Establish automated detection for hidden goal indicators;
  alert when agents exhibit patterns outside defined scope
- AU-6: Aggregate recommendation analysis — periodic review detects
  systematic bias before operational harm

**Advanced**
- CA-8: Rogue agent scenarios in penetration testing — simulate
  persistent hidden goal pursuit across extended sessions; verify
  detection capability holds
- IR-4: Conduct tabletop exercises for rogue agent scenarios; test
  containment and forensic procedures
- CA-7: Include rogue agent risk in FedRAMP annual assessment;
  document behavioural monitoring architecture in SSP

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
- Other frameworks: SP 800-218A RV.1.1-PS – EU AI Act Art. 14/15 – CIS Controls 8/13

---

## Implementation priority

| Phase | AC / AU / IA / AT | SC / SI / CM | CA / RA / SA / SR / IR / PM |
|---|---|---|---|
| 1 – Now | AC-6 least privilege for ASI02/03; IA-2 agent NHI for ASI03; AU-2 action logging for ASI01/02/06 | SI-10 input validation for ASI01; CM-7 capability restrictions for ASI02/05 | SR-2 agent supply chain plan for ASI04; IR-4 incident handling for ASI03/08/10 |
| 2 – This sprint | AC-3 per-tool enforcement for ASI02/03; AT-3 trust training for ASI09 | SI-3 adversarial detection for ASI01/05/06; SC-7 boundaries for ASI05/07/08; SC-28 memory protection for ASI06 | CA-8 pen testing for ASI01/05/07; SA-9 third-party controls for ASI04 |
| 3 – This quarter | AU-6 agent decision review for ASI09/10; AC-6 dynamic privilege for ASI03 | SI-4 rogue agent and behaviour monitoring for ASI08/09/10; CM-7 tool policy for ASI02 | CA-7 continuous monitoring for ASI10; PM-9 risk strategy for ASI08/09; RA-5 scanning for ASI06 |
| 4 – Ongoing | Access control reviews; audit log analysis; identity lifecycle management | Continuous monitoring; detection tuning; sandbox integrity verification | Annual FedRAMP assessment; red-team programme; supply chain reassessment |

---

## References

- [NIST SP 800-53 Rev 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- [FedRAMP](https://www.fedramp.gov/)
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [NIST AI RMF 1.0](https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf)
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
