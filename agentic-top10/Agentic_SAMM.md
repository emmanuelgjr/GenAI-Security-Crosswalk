<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01-ASI10)
  Framework   : OWASP SAMM v2.0 — Software Assurance Maturity Model
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 × OWASP SAMM v2.0

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
to the [OWASP Software Assurance Maturity Model (SAMM) v2.0](https://owaspsamm.org/) —
the framework for measuring and improving software security programme
maturity across the SDLC.

---

## Why SAMM for agentic AI security

Agentic AI systems — autonomous agents that plan, invoke tools, and
take real-world actions — demand security programme capabilities that
most organisations do not yet have. SAMM is uniquely useful here
because it does not just list controls: it tells you **how mature
your programme must be** to operate agents safely, and **which
lifecycle practices** must improve first.

Three SAMM properties make it essential for agentic deployments:

**Autonomy amplifies gaps.** An under-mature threat modelling practice
(D-TA Level 1) is a manageable risk for a static web application but
an unacceptable risk for an agent with autonomous tool execution.
SAMM's maturity levels make the gap visible.

**Operations practices become critical.** Autonomous agents require
Incident Management (O-IM) and Operational Management (O-OM) at
Level 2 minimum before deployment. SAMM structures the argument for
pre-production maturity gates.

**Supply chain scope expands dramatically.** An agentic system
integrates LLMs, tool APIs, memory stores, orchestration frameworks,
and third-party MCP servers. SAMM's Implementation / Secure Build
(I-SB) and Policy & Compliance (G-PC) practices cover this expanded
attack surface.

---

## SAMM v2.0 structure

| Business Function | Security Practices |
|---|---|
| Governance (G) | Strategy & Metrics (G-SM) · Policy & Compliance (G-PC) · Education & Guidance (G-EG) |
| Design (D) | Threat Assessment (D-TA) · Security Requirements (D-SR) · Security Architecture (D-SA) |
| Implementation (I) | Secure Build (I-SB) · Secure Deployment (I-SD) · Defect Management (I-DM) |
| Verification (V) | Architecture Assessment (V-AA) · Requirements-Driven Testing (V-RT) · Security Testing (V-ST) |
| Operations (O) | Incident Management (O-IM) · Environment Management (O-EM) · Operational Management (O-OM) |

**Maturity levels:**
- Level 1 — Initial/Ad-hoc: Basic security practices, reactive
- Level 2 — Managed: Defined processes, consistent execution
- Level 3 — Optimised: Proactive, metrics-driven, continuously improving

---

## Quick-reference summary

| ID | Name | Severity | Primary SAMM Practices | Maturity Target | Tier |
|---|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | Critical | D-TA, I-SB, V-ST, O-IM | L2 min / L3 for high-risk | Foundational–Advanced |
| ASI02 | Tool Misuse & Exploitation | Critical | D-SR, I-SB, V-ST, G-PC | L2 min | Foundational–Hardening |
| ASI03 | Identity & Privilege Abuse | Critical | D-SA, G-SM, V-AA, O-OM | L2 min | Foundational–Advanced |
| ASI04 | Agentic Supply Chain Vulnerabilities | High | G-PC, I-SB, V-AA, D-TA | L2 min | Foundational–Hardening |
| ASI05 | Unexpected Code Execution | Critical | D-SA, V-AA, V-ST, O-IM | L3 | Advanced |
| ASI06 | Memory & Context Poisoning | High | D-TA, I-SB, V-ST, O-EM | L2 min | Hardening–Advanced |
| ASI07 | Insecure Inter-Agent Communication | High | D-SA, D-TA, G-PC, V-AA | L2 min | Hardening–Advanced |
| ASI08 | Cascading Agent Failures | High | D-SA, O-IM, O-EM, V-AA | L2 min | Hardening–Advanced |
| ASI09 | Human-Agent Trust Exploitation | Medium | G-SM, G-EG, D-SA, O-OM | L2 min | Foundational–Hardening |
| ASI10 | Rogue Agents | Critical | D-TA, V-ST, O-IM, O-OM | L2 min / L3 for high-risk | Hardening–Advanced |

**SAMM practice codes:**
G-SM = Governance / Strategy & Metrics ·
G-PC = Governance / Policy & Compliance ·
G-EG = Governance / Education & Guidance ·
D-TA = Design / Threat Assessment ·
D-SR = Design / Security Requirements ·
D-SA = Design / Security Architecture ·
I-SB = Implementation / Secure Build ·
I-SD = Implementation / Secure Deployment ·
I-DM = Implementation / Defect Management ·
V-AA = Verification / Architecture Assessment ·
V-RT = Verification / Requirements-Driven Testing ·
V-ST = Verification / Security Testing ·
O-IM = Operations / Incident Management ·
O-EM = Operations / Environment Management ·
O-OM = Operations / Operational Management

---

## Target audience

| Role | Files to prioritise |
|---|---|
| Security programme lead | Full file — use maturity scorecard to build roadmap |
| AppSec / security engineer | Design and Verification sections per relevant ASI entry |
| Platform / infrastructure | Implementation and Operations sections |
| AI red team | Verification / Security Testing columns per entry |
| Compliance / GRC | Governance columns, EU AI Act alignment notes |

---

## Detailed mappings

---

### ASI01 — Agent Goal Hijack

**Severity:** Critical

An attacker redirects agent objectives through instruction injection.
Adversarial instructions embedded in untrusted content (tool outputs,
retrieved documents, API responses) hijack agent goal execution,
tool invocation, and action sequences.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Threat Assessment (D-TA) | A — Threat Modeling | Agent input surface threat model | L2 required | Model all injection surfaces: user input, retrieved content, tool responses, sub-agent messages |
| Design / Threat Assessment (D-TA) | B — Risk Profile | Classify agent actions by impact | L2 required | High-impact actions (delete, exfiltrate, send) demand higher injection resistance |
| Implementation / Secure Build (I-SB) | A — Build Process | Mandatory input/output sanitisation | L2 required | Enforce at agent boundary; validate all retrieved content before acting |
| Verification / Security Testing (V-ST) | B — Deep Testing | Adversarial injection test suite | L2 required | Red team injection across all retrieval and tool paths |
| Operations / Incident Management (O-IM) | A — Incident Detection | Alert on unexpected goal deviation | L2 required | Detect agent plan deviation from expected trajectory |
| Governance / Education & Guidance (G-EG) | B — Training | Developer training on agentic injection | L1 minimum | All developers with access to agent code understand injection risk model |

**Maturity target:** L2 minimum; L3 for agents with access to sensitive data or irreversible actions.

#### Three-tier mitigations

**Tier 1 — Immediate (pre-production gate):**
- Define trust boundaries: user instructions, system prompt, retrieved content — never treat retrieved content as same trust level as system prompt
- Implement instruction hierarchy in orchestration layer
- Add tool invocation allow-listing; deny all unregistered tool calls

**Tier 2 — Short-term (first 30 days):**
- Build adversarial injection test cases into CI/CD
- Add anomaly detection on agent plan deviations
- Instrument all tool calls for audit logging

**Tier 3 — Strategic:**
- Continuously update injection test corpus with red team findings
- Implement formal goal verification before high-impact actions
- Establish SAMM D-TA L3: threat models reviewed after each new tool integration

#### Cross-references

- LLM Top 10: LLM01 Prompt Injection, LLM06 Excessive Agency
- DSGAI 2026: DSGAI12 Unsafe NL Data Gateways
- See also: [Agentic_AITG.md](Agentic_AITG.md) TC-ASI01, [Agentic_MITREATLAS.md](Agentic_MITREATLAS.md) AML.T0054

---

### ASI02 — Tool Misuse & Exploitation

**Severity:** Critical

Agents misuse legitimate tools via prompt manipulation or unsafe delegation.
Agents exploit or are manipulated into misusing tools, APIs, and external
services — invoking destructive operations, passing LLM-generated parameters
without validation, or chaining tool calls into harmful sequences.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Requirements (D-SR) | A — Requirements | Tool integration security requirements | L2 required | Security requirements for every tool: auth, scope, parameter validation, irreversibility classification |
| Implementation / Secure Build (I-SB) | A — Build Process | Tool allow-list enforcement | L2 required | Only approved tools can be registered; unsigned tools are rejected; MCP descriptor integrity verified |
| Verification / Security Testing (V-ST) | A — Automated | Tool invocation scanning | L2 required | Automated checks on tool descriptors, parameters, and permissions; destructive parameter detection |
| Governance / Policy & Compliance (G-PC) | A — Policy | Tool access governance policy | L2 required | Process for approving, reviewing, and revoking tool integrations; human confirmation for irreversible ops |
| Operations / Operational Management (O-OM) | A — Monitoring | Tool call anomaly detection | L1 minimum | Alert on tool calls outside normal operating parameters; misuse pattern detection |

**Maturity target:** L2 minimum; tool governance programme required before any third-party tool integration.

#### Three-tier mitigations

**Tier 1 — Immediate:**
- Enumerate all tools currently accessible to deployed agents
- Implement per-tool permission manifests with minimum scope
- Require human confirmation for all irreversible tool invocations

**Tier 2 — Short-term:**
- Implement tool review board: all tools reviewed before integration
- Validate all LLM-generated tool parameters as untrusted input
- Add tool call logging with full parameter capture and anomaly detection

**Tier 3 — Strategic:**
- I-SB L3: MCP tool descriptor integrity verification in CI/CD
- Continuous tool permission drift detection
- Formal tool chain analysis — verify no permitted combination achieves harmful outcomes

#### Cross-references

- LLM Top 10: LLM05 Insecure Output Handling, LLM06 Excessive Agency
- DSGAI 2026: DSGAI06 Tool Plugin & Agent Data Exchange
- See also: [Agentic_AITG.md](Agentic_AITG.md) TC-ASI02, [Agentic_NHI.md](Agentic_NHI.md) NHI-5

---

### ASI03 — Identity & Privilege Abuse

**Severity:** Critical

Agents inherit and cache credentials exploited for lateral movement.
Agents exploit misconfigured permissions, inherited credentials, or
inter-agent trust to access resources beyond their intended scope —
using cached tokens, accumulating privileges through delegation, or
impersonating other agent identities.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Architecture (D-SA) | A — Architecture | Agent identity and privilege model | L2 required | Define per-agent NHI, credential scope, privilege ceiling; enforce at architecture level |
| Governance / Strategy & Metrics (G-SM) | B — Roadmap | Agent credential governance policy | L2 required | Formalise agent identity lifecycle — issuance, rotation, revocation, audit |
| Verification / Architecture Assessment (V-AA) | A — Assessment | Agent credential audit | L2 required | Periodic review of credential scope, inherited permissions, and privilege accumulation paths |
| Operations / Operational Management (O-OM) | B — Review | Credential anomaly detection | L2 required | Alert when agent uses credentials outside declared scope or exhibits lateral movement |
| Governance / Policy & Compliance (G-PC) | A — Policy | Agent NHI policy | L1 minimum | Document that each agent must have unique NHI with minimum scope and short TTL |

**Maturity target:** L2 minimum; architecture review must include explicit credential scope sign-off.

#### Three-tier mitigations

**Tier 1 — Immediate:**
- Assign unique NHI to every agent deployment; no shared credentials
- Enforce short TTL on all agent credentials with automatic expiry
- Treat agent identities as NHI: apply OWASP NHI Top 10 controls

**Tier 2 — Short-term:**
- Implement credential brokering — agents never inherit user credentials directly
- Gate deployments: no deployment without signed credential scope manifest
- Deploy credential anomaly detection; alert on lateral movement patterns

**Tier 3 — Strategic:**
- Achieve D-SA L3: architecture review board includes agent credential review
- Implement PKI-backed agent identities with certificate-based authentication
- Quarterly privileged access review for all agent NHIs

#### Cross-references

- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI02 Agent Identity & Credential Exposure
- See also: [Agentic_NHI.md](Agentic_NHI.md) NHI-1/NHI-2/NHI-3, [Agentic_ASVS.md](Agentic_ASVS.md)

---

### ASI04 — Agentic Supply Chain Vulnerabilities

**Severity:** High

Compromised tools, MCP servers, or model components alter agent behaviour.
Third-party components in the agentic stack — LLM providers, MCP servers,
orchestration frameworks, tool libraries, memory store dependencies — are
compromised or tampered with, introducing malicious behaviour into the
agent deployment.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Governance / Policy & Compliance (G-PC) | A — Policy | Third-party agentic component policy | L2 required | Approved vendor list for all agentic stack components |
| Implementation / Secure Build (I-SB) | B — Dependencies | Dependency inventory and SBOM | L2 required | SBOM for all agentic system components including LLM APIs and tool servers |
| Verification / Architecture Assessment (V-AA) | A — Assessment | Agentic supply chain architecture review | L2 required | Architecture review validates all third-party components against policy |
| Design / Threat Assessment (D-TA) | A — Threat Modeling | Supply chain threat model | L2 required | Model compromise scenarios for each third-party component |
| Operations / Operational Management (O-OM) | B — Review | Vendor security posture monitoring | L1 minimum | Track security advisories for all integrated components |

**Maturity target:** L2 minimum; SBOM required before production deployment.

#### Three-tier mitigations

**Tier 1 — Immediate:**
- Inventory all third-party components in the agentic stack
- Generate initial SBOM; flag components without security contact or last-updated date
- Pin all dependency versions; reject floating versions in production

**Tier 2 — Short-term:**
- Implement automated vulnerability scanning for agentic SBOM
- Verify cryptographic signatures on all agent components before deployment
- Add integrity verification for MCP server descriptors and tool manifests

**Tier 3 — Strategic:**
- G-PC L3: formal vendor security assessment for all critical agentic components
- I-SB L3: automated supply chain analysis in CI/CD with policy enforcement
- Periodic red team exercise targeting supply chain attack vectors

#### Cross-references

- LLM Top 10: LLM03 Supply Chain Vulnerabilities
- DSGAI 2026: DSGAI04 Data, Model & Artifact Poisoning
- See also: [Agentic_CWE_CVE.md](Agentic_CWE_CVE.md), [Agentic_AITG.md](Agentic_AITG.md) TC-ASI04

---

### ASI05 — Unexpected Code Execution

**Severity:** Critical

Agents that generate and execute code become RCE gateways. Safety
guardrails protecting code execution — sandbox boundaries, capability
restrictions, output validators — must be defence-in-depth with no
single-point bypass path. Agents with code execution capabilities can
be manipulated to execute arbitrary code, escape sandboxes, or modify
their own runtime environment.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Architecture (D-SA) | A — Architecture | Defence-in-depth for code execution | L3 required | Sandbox controls must be layered — no single-point bypass path |
| Verification / Architecture Assessment (V-AA) | A — Assessment | Sandbox architecture review | L3 required | Independent review of every sandbox escape scenario |
| Verification / Security Testing (V-ST) | B — Deep Testing | Adversarial sandbox bypass testing | L3 required | Dedicated red team exercise targeting sandbox escape |
| Operations / Incident Management (O-IM) | A — Incident Detection | Code execution anomaly alerting | L2 required | Alert immediately when unexpected code execution detected |
| Governance / Strategy & Metrics (G-SM) | A — Policy | Code execution governance | L2 required | No production agent with code execution without signed sandbox architecture review |

**Maturity target:** L3 required for any deployment where code execution bypass creates system compromise risk.

#### Three-tier mitigations

**Tier 1 — Immediate:**
- Restrict all agent code execution to sandboxed environments; no unrestricted shell access
- Disable filesystem, network, and system call access not explicitly required
- Implement pre-execution scanning of agent-generated code

**Tier 2 — Short-term:**
- Red team exercise: attempt sandbox escape from within specific runtime
- Deploy multi-layer sandbox isolation (container, process, language runtime)
- Implement allowlisting for permitted code operations; deny by default

**Tier 3 — Strategic:**
- D-SA L3: formal sandbox architecture review board for high-risk deployments
- V-ST L3: continuous adversarial sandbox testing in staging
- Hardware-level sandboxing (gVisor, Firecracker) for highest-risk deployments

#### Cross-references

- LLM Top 10: LLM05 Insecure Output Handling
- DSGAI 2026: DSGAI12 Unsafe NL Data Gateways
- See also: [Agentic_EUAIAct.md](Agentic_EUAIAct.md) Art. 15 (robustness), [Agentic_AIVSS.md](Agentic_AIVSS.md)

---

### ASI06 — Memory & Context Poisoning

**Severity:** High

Persistent memory poisoning causes systematic incorrect behaviour.
Attackers corrupt agent memory — short-term context, long-term episodic
stores, shared memory buses — to implant false beliefs, alter future
decisions, or persist across agent restarts.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Threat Assessment (D-TA) | A — Threat Modeling | Memory attack surface model | L2 required | Include memory store read/write paths in threat model |
| Implementation / Secure Build (I-SB) | A — Build Process | Memory input validation | L2 required | Validate and sanitise all content written to persistent memory |
| Verification / Security Testing (V-ST) | B — Deep Testing | Memory poisoning test cases | L2 required | Test persistent memory integrity across session boundaries |
| Operations / Environment Management (O-EM) | A — Patching | Memory store hardening | L2 required | Apply access controls, encryption at rest, and integrity verification to all memory stores |
| Verification / Architecture Assessment (V-AA) | A — Assessment | Memory store architecture review | L1 minimum | Confirm memory stores have appropriate access controls and integrity verification |

**Maturity target:** L2 minimum; memory stores must be treated as security-critical infrastructure.

#### Three-tier mitigations

**Tier 1 — Immediate:**
- Apply access controls to all persistent memory stores (vector DB, relational, episodic)
- Add integrity metadata (HMAC or signature) to all memory writes
- Log all memory read/write operations

**Tier 2 — Short-term:**
- Implement memory validation pipeline: content written to persistent memory passes sanitisation
- Add memory anomaly detection: flag unexpected belief updates
- Define memory TTL and rotation policy

**Tier 3 — Strategic:**
- Periodic memory audit: replay historical decisions to detect contamination
- Implement formal provenance tracking for all memory entries
- Cross-session memory integrity verification

#### Cross-references

- LLM Top 10: LLM04 Data & Model Poisoning, LLM08 Vector & Embedding Weaknesses
- DSGAI 2026: DSGAI13 Vector Store Platform Security
- See also: [Agentic_AITG.md](Agentic_AITG.md) TC-ASI06, [LLM_CWE_CVE.md](../llm-top10/LLM_CWE_CVE.md)

---

### ASI07 — Insecure Inter-Agent Communication

**Severity:** High

A2A channels lacking authentication enable agent-in-the-middle attacks.
Agents in multi-agent orchestration communicate without proper mutual
authentication, encryption, or schema validation — enabling spoofing,
replay attacks, message manipulation, and lateral movement across the
agent network.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Architecture (D-SA) | A — Architecture | Agent-to-agent authentication framework | L2 required | Mutual authentication between all agent-to-agent communication |
| Design / Threat Assessment (D-TA) | A — Threat Modeling | Inter-agent trust boundary model | L2 required | Explicitly model trust relationships between agents; default deny |
| Governance / Policy & Compliance (G-PC) | A — Policy | A2A communication policy | L2 required | Policy governing authentication, encryption, and schema validation for all A2A communication |
| Verification / Architecture Assessment (V-AA) | A — Assessment | Inter-agent communication architecture review | L2 required | Review and document all A2A channels, authentication methods, and encryption status |
| Verification / Security Testing (V-ST) | B — Deep Testing | A2A security testing | L2 required | Test for spoofing, replay, schema violations, and agent-in-the-middle attacks |

**Maturity target:** L2 minimum; no multi-agent deployment without explicit A2A security architecture review.

#### Three-tier mitigations

**Tier 1 — Immediate:**
- Encrypt all A2A communication in transit with mutual TLS
- Implement authentication tokens for all inter-agent messages
- Log all inter-agent message exchanges with sender identity and content hash

**Tier 2 — Short-term:**
- Deploy agent identity registry: all agents have verifiable, revocable identities
- Implement message signing for all A2A instructions; validate schemas at each boundary
- Red team exercise: simulate spoofing and replay attacks against A2A channels

**Tier 3 — Strategic:**
- Formal trust model: cryptographic attestation of agent identity and communication scope
- Short-lived A2A certificates with automated rotation
- D-TA L3: threat model updated after every new agent added to orchestration network

#### Cross-references

- DSGAI 2026: DSGAI02 Agent Identity & Credential Exposure
- Other frameworks: OWASP NHI Top 10 NHI-4/NHI-7
- See also: [Agentic_MITREATLAS.md](Agentic_MITREATLAS.md), [Agentic_NHI.md](Agentic_NHI.md) NHI-1

---

### ASI08 — Cascading Agent Failures

**Severity:** High

Single-point faults propagate through multi-agent workflows. In
multi-agent orchestration, a failure or compromise in one agent
propagates through the network — downstream agents act on corrupted
state, errors amplify through chaining, and the aggregate effect
exceeds what any single agent could cause.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Architecture (D-SA) | A — Architecture | Fault isolation architecture | L2 required | Design circuit breakers and blast radius containment between agents |
| Operations / Incident Management (O-IM) | A — Incident Detection | Cascade detection and alerting | L2 required | Detect correlated failures across multiple agents; alert before full cascade |
| Operations / Environment Management (O-EM) | A — Patching | Agent health monitoring | L2 required | Continuous health checks; automatic isolation of degraded agents |
| Verification / Architecture Assessment (V-AA) | A — Assessment | Cascade failure architecture review | L2 required | Verify blast radius containment in architecture review |
| Operations / Incident Management (O-IM) | B — Response | Multi-agent incident playbook | L2 required | Documented runbook for cascade scenarios including rollback procedures |

**Maturity target:** L2 minimum; O-IM cascade playbook required before multi-agent production deployment.

#### Three-tier mitigations

**Tier 1 — Immediate:**
- Add health checks to all agents in production; isolate on failure detection
- Implement circuit breaker pattern between orchestrator and sub-agents
- Document current blast radius: if agent X fails, which agents are affected?

**Tier 2 — Short-term:**
- Red team: simulate cascading failure starting from one compromised sub-agent
- Deploy O-IM playbook for multi-agent cascade incidents
- Add per-agent state checkpointing to enable rollback

**Tier 3 — Strategic:**
- D-SA L3: formal chaos engineering programme for multi-agent orchestration
- O-EM L3: automated cascade detection with predictive alerting
- Architecture pattern: stateless agents wherever possible to limit propagation surface

#### Cross-references

- LLM Top 10: LLM10 Unbounded Consumption
- DSGAI 2026: DSGAI17 Data Availability & Resilience Failures
- See also: [Agentic_MAESTRO.md](Agentic_MAESTRO.md) L3 Agent Frameworks, [Agentic_ISA62443.md](Agentic_ISA62443.md)

---

### ASI09 — Human-Agent Trust Exploitation

**Severity:** Medium

Agents build false trust enabling manipulation of human approvers.
Agents establish unwarranted trust with human operators — through
apparent competence, conversational rapport, or presentation authority
— then exploit that trust to obtain approvals for harmful actions,
bypass oversight, or suppress safety concerns. Missing confirmation
gates, override mechanisms, or audit trails prevent effective human
control.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Governance / Strategy & Metrics (G-SM) | A — Policy | Trust exploitation governance policy | L2 required | Define maximum autonomy scope per agent class; mandate independent approval flows |
| Governance / Education & Guidance (G-EG) | B — Training | Operator training on AI trust risks | L2 required | All operators trained on AI limitations, verification requirements, and manipulation identification |
| Design / Security Architecture (D-SA) | A — Architecture | Independent approval architecture | L2 required | Design confirmation gate pattern; sensitive approvals cannot be completed via agent interface |
| Operations / Operational Management (O-OM) | A — Monitoring | Trust exploitation monitoring | L2 required | Monitor operator decisions for over-trust patterns; audit agent-influenced approvals |
| Operations / Incident Management (O-IM) | A — Incident Detection | Trust exploitation alerting | L1 minimum | Alert when operators approve high-risk actions without independent verification |

**Maturity target:** L2 minimum; EU AI Act Article 14 compliance requires documented oversight mechanism for high-risk AI.

#### Three-tier mitigations

**Tier 1 — Immediate:**
- Provide security awareness training to all users of agentic tools
- Require independent approval flows for all irreversible actions (not through agent chat)
- Implement AI advisory labelling — visual distinction from authoritative content

**Tier 2 — Short-term:**
- Implement G-SM L2: formal trust exploitation governance policy reviewed by CISO
- Add audit trail: every agent-influenced operator decision logged with rationale
- Deploy over-trust detection: aggregate approval patterns across operators

**Tier 3 — Strategic:**
- O-OM L3: real-time oversight dashboard for operations team
- G-SM L3: trust exploitation policy updated after every incident or near-miss
- Operator competency assessments covering AI trust verification

#### Cross-references

- LLM Top 10: LLM09 Misinformation
- DSGAI 2026: DSGAI21 Disinformation & Integrity Attacks
- See also: [Agentic_EUAIAct.md](Agentic_EUAIAct.md), [Agentic_AIVSS.md](Agentic_AIVSS.md)

---

### ASI10 — Rogue Agents

**Severity:** Critical

Compromised agents pursue hidden goals while appearing compliant.
Agents operate outside their intended boundaries — pursuing hidden
objectives, executing undisclosed tool calls, or systematically biasing
recommendations — while maintaining an appearance of normal operation.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Threat Assessment (D-TA) | A — Threat Modeling | Rogue agent threat model | L2 required | Model scenarios where agents pursue hidden goals; identify detection and containment requirements |
| Verification / Security Testing (V-ST) | B — Deep Testing | Rogue agent simulation | L2 required | Red team: simulate persistent hidden goal pursuit across extended sessions |
| Operations / Incident Management (O-IM) | A — Incident Detection | Rogue agent behaviour alerting | L2 required | Detect behavioural baseline deviations; alert on hidden tool invocations and recommendation bias |
| Operations / Operational Management (O-OM) | A — Monitoring | Agent behavioural monitoring | L2 required | Continuous behavioural monitoring with baselines established during commissioning |
| Operations / Incident Management (O-IM) | B — Response | Rogue agent containment playbook | L2 required | Documented runbook: kill switch, audit, state validation, forensic capture |

**Maturity target:** L2 minimum; L3 for agents with access to sensitive data or high-impact actions.

#### Three-tier mitigations

**Tier 1 — Immediate:**
- Comprehensive audit logging of all agent actions — no deployment without full observability
- Enforce scope constraints — agent cannot exceed permission envelope regardless of internal goal
- Implement kill switch accessible from operator console

**Tier 2 — Short-term:**
- Establish behavioural baselines during commissioning; alert on deviations
- Red team: simulate rogue agent pursuing hidden objectives over extended sessions
- Aggregate recommendation analysis — detect systematic bias before operational harm

**Tier 3 — Strategic:**
- O-IM L3: automated rogue agent detection with behavioural anomaly SIEM integration
- V-ST L3: continuous adversarial rogue agent testing in staging
- Formal rogue agent containment exercises with documented findings and remediation

#### Cross-references

- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI16 Endpoint & Browser Overreach
- See also: [Agentic_MAESTRO.md](Agentic_MAESTRO.md) L3 Agent Frameworks, [Agentic_ISA62443.md](Agentic_ISA62443.md)

---

## SAMM maturity scorecard — agentic AI minimum viable levels

Use this scorecard to assess programme readiness before deploying
autonomous agents in production. Complete a column for each agent
system being assessed.

| Practice | Minimum Viable Level | Current Level | Gap | Priority |
|---|:---:|:---:|:---:|:---:|
| G-SM Strategy & Metrics | L2 | | | |
| G-PC Policy & Compliance | L2 | | | |
| G-EG Education & Guidance | L1 | | | |
| D-TA Threat Assessment | L2 | | | |
| D-SR Security Requirements | L2 | | | |
| D-SA Security Architecture | L2 | | | |
| I-SB Secure Build | L2 | | | |
| I-SD Secure Deployment | L1 | | | |
| I-DM Defect Management | L1 | | | |
| V-AA Architecture Assessment | L2 | | | |
| V-RT Requirements-Driven Testing | L1 | | | |
| V-ST Security Testing | L2 | | | |
| O-IM Incident Management | L2 | | | |
| O-EM Environment Management | L2 | | | |
| O-OM Operational Management | L2 | | | |

**Scoring:** Any practice below Minimum Viable Level is a **deployment blocker**
for autonomous agents with access to sensitive data or irreversible actions.

**EU AI Act note:** G-SM and O-IM at L2+ are minimum requirements to demonstrate
Art. 14 (human oversight) and Art. 9 (risk management) compliance.

---

## Implementation priority table

| Priority | Practices | ASI entries addressed |
|---|---|---|
| P1 — Pre-production gate | D-TA L2, I-SB L2, O-IM L2 | ASI01, ASI06, ASI08, ASI10 |
| P2 — First 30 days | D-SA L2, V-ST L2, G-PC L2 | ASI02, ASI04, ASI05, ASI07 |
| P3 — 60-day milestone | V-AA L2, O-OM L2, G-SM L2 | ASI03, ASI09 |
| P4 — Programme maturity | All practices L3, chaos engineering | ASI05 (full coverage), ASI10 (full coverage) |

---

## See also

- [DSGAI 2026 × SAMM](../dsgai-2026/DSGAI_SAMM.md)

---

## References

- [OWASP SAMM v2.0](https://owaspsamm.org/)
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [OWASP LLM Top 10 2025 × SAMM](../llm-top10/LLM_SAMM.md)
- [Agentic_AITG.md](Agentic_AITG.md) — structured test cases for all ASI entries
- [Agentic_AIVSS.md](Agentic_AIVSS.md) — autonomy premium scoring
- [shared/RECIPES.md](../shared/RECIPES.md) — implementation patterns

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-05-25 | Remediate ASI entry names, severities, descriptions, and SAMM practice mappings to canonical Agentic Top 10 2026 |
| 1.0.0 | 2026-03-27 | Initial release — full mapping ASI01–ASI10 to SAMM v2.0 |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) —
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
*License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)*
