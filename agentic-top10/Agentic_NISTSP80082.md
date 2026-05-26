<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01-ASI10)
  Framework   : NIST SP 800-82 Rev 3 — Guide to Operational Technology (OT) Security
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 × NIST SP 800-82 Rev 3

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
to [NIST SP 800-82 Revision 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf) —
Guide to Operational Technology (OT) Security, published May 2023.

**Use this file alongside [Agentic_ISA62443.md](Agentic_ISA62443.md).**
ISA 62443 provides the zone model and security level requirements;
SP 800-82 provides the implementation guidance, network architecture
recommendations, and U.S. regulatory context.

---

## Why SP 800-82 Rev 3 for agentic AI in OT

Autonomous AI agents in OT environments represent a qualitatively
different risk profile from static LLM deployments. An agent can
take sequences of actions — reading sensor data, issuing commands,
invoking SCADA APIs — without human review at each step. SP 800-82
Rev 3 is the right framework for this scenario because:

**Autonomous action amplifies OT risk.** SP 800-82 Section 5 documents
OT-specific threat categories — manipulation of control, denial of
safety, equipment damage — that become dramatically more accessible
when an autonomous agent can chain tool calls across OT boundaries.

**SP 800-82 Rev 3 explicitly addresses remote and cloud access.**
Rev 3's expansion of remote access, cloud integration, and third-party
connectivity sections makes it directly applicable to agentic systems
that operate across IT/OT boundaries.

**Federal and sector regulatory alignment.** SP 800-82 is referenced
by CISA, underpins NERC CIP technical guidance, and is mandatory
for many FISMA-covered federal OT deployments. Agentic AI crossing
OT boundaries must comply.

---

## SP 800-82 Rev 3 structure

| Section | Title | Agentic relevance |
|---|---|---|
| Section 4 | OT Overview and Key Differences from IT | Baseline architecture context for agent placement |
| Section 5 | OT Threats and Vulnerabilities | Agent-amplified threat categories |
| Section 6 | Risk Management | Risk assessment for autonomous agent integration |
| Section 7 | Recommended Security Architecture | Network segmentation for agent communications |
| Section 8 | OT Security Program | Governance, programme, and supply chain controls |
| Appendix G | Network Architecture Examples | Reference architectures for agent placement |

---

## Quick-reference summary

| ID | Name | OT Severity | SP 800-82 Sections | SP 800-53 Controls | Tier |
|---|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | **Critical** | 5.3, 6.2, 7.2 | SI-10, SI-3, AC-3 | Foundational–Advanced |
| ASI02 | Tool Misuse & Exploitation | **Critical** | 5.3, 5.5, 6.2, 7.1 | AC-6, AC-3, CM-7, AU-12 | Foundational–Advanced |
| ASI03 | Identity & Privilege Abuse | **Critical** | 5.3, 6.2, 7.1 | AC-6, IA-3, AC-3, AU-12 | Foundational–Advanced |
| ASI04 | Agentic Supply Chain Vulnerabilities | High | 5.5, 6.3, 8.4 | SA-12, SR-3, SR-6 | Foundational–Hardening |
| ASI05 | Unexpected Code Execution | **Critical** | 5.3, 6.2, 7.1 | CM-7, SI-3, SC-7, AU-12 | Advanced |
| ASI06 | Memory & Context Poisoning | High | 5.3, 6.2 | SI-7, SC-28, AC-3 | Hardening–Advanced |
| ASI07 | Insecure Inter-Agent Communication | **Critical** | 5.3, 6.2, 7.2 | IA-3, SC-8, AC-3, AU-12 | Hardening–Advanced |
| ASI08 | Cascading Agent Failures | **Critical** | 5.6, 6.2, 7.2 | SC-5, SI-17, AU-12 | Hardening–Advanced |
| ASI09 | Human-Agent Trust Exploitation | **Critical** | 5.3, 6.2, 8.2 | AC-6, AU-12, AT-3 | Foundational–Advanced |
| ASI10 | Rogue Agents | **Critical** | 5.3, 6.2, 7.2 | SI-4, AU-12, AC-3, IR-4 | Hardening–Advanced |

---

## Audience tags

- **OT security engineer** — full file, primary implementation reference
- **Federal agency security officer** — SP 800-53 control mapping, FISMA alignment
- **ICS/SCADA security architect** — Section 7 network architecture references
- **CISO (critical infrastructure)** — Section 6 risk management, Section 8 programme
- **AI/OT integration team** — agent placement guidance, tool permission controls
- **CMMC / FedRAMP assessor** — SP 800-53 control identifiers per ASI entry

---

## SP 800-82 Rev 3 network architecture: agent placement

SP 800-82 Rev 3 recommends a defence-in-depth architecture. Autonomous
agents must be placed explicitly within this architecture — they must
never be assumed to fit within an existing zone without deliberate design.

**Recommended agent placement per SP 800-82 Rev 3 Appendix G:**

```
Enterprise Zone (Level 4-5)
    ↓ [Firewall + proxy — HTTPS only, no direct OT protocol access]
DMZ / Demilitarized Zone (Level 3.5)
    → Agents with read-only OT data access SHOULD be deployed here
    → Agents with command capability MUST be isolated in a dedicated agent zone
    ↓ [Application-layer firewall — protocol-specific allow-listing]
OT Network Zone (Level 3 — Site Operations)
    → No agent should reside here; data flows up, commands verified before execution
    ↓ [Unidirectional gateway recommended for most data flows]
Control Zone (Level 2 — Supervisory)
Field Device Zone (Level 1 — Basic Control)
    → Agents MUST NOT have direct access to Level 1-2 devices
```

**Key constraint from SP 800-82 Section 7.1:**
Any autonomous system with command capability crossing zone boundaries
requires authenticated, logged, and human-confirmable action paths.

---

## Detailed mappings

---

### ASI01 — Agent Goal Hijack

**Severity: Critical (OT)**

An attacker redirects agent objectives through instruction injection.
Adversarial instructions in OT sensor data, historian outputs, or
engineering documentation processed by agents hijack agent actions —
potentially issuing commands or altering configurations.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | Vulnerabilities common to IT/OT | Injection via historian and SCADA data feeds |
| §6.2 | Risk assessment | Assess injection risk at every agent data ingestion point |
| §7.2 | Security controls for ICS | Input validation mandatory at OT data boundary |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SI-10 | Information Input Validation | Validate all OT data before agent processing |
| SI-3 | Malicious Code Protection | Content filtering on all agent inputs |
| AC-3 | Access Enforcement | Restrict which OT data sources can reach agent input |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:**
- Define trusted OT data sources; reject unverified data before agent processing
- Implement input validation on all historian, SCADA, and document feeds
- Log all OT data fed to agent with source and timestamp

**Tier 2 — Short-term:**
- Add instruction sanitisation layer at OT data ingestion boundary
- Red team: attempt injection via SCADA historian data
- Verify no injected instruction can reach Level 2/1 control plane

**Tier 3 — Strategic:**
- Continuous monitoring of agent decisions correlated with OT data anomalies
- SP 800-53 SI-10 automated validation in OT data pipeline CI/CD

#### Cross-references
- LLM Top 10: LLM01 Prompt Injection, LLM06 Excessive Agency
- DSGAI 2026: DSGAI12 Unsafe NL Data Gateways

---

### ASI02 — Tool Misuse & Exploitation

**Severity: Critical (OT)**

Agents misuse legitimate tools via prompt manipulation or unsafe delegation.
Agents with OT tool access — SCADA connectors, historian APIs, PLC
configuration interfaces — are manipulated into invoking destructive
operations, passing unvalidated parameters, or chaining tool calls into
harmful sequences targeting industrial systems.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | Common ICS vulnerabilities | Tool misuse amplified by autonomous agent capabilities |
| §5.5 | Supply chain risks | Third-party OT tool components may enable misuse |
| §6.2 | Risk assessment | Assess agent tool misuse risk in OT risk register |
| §7.1 | Secure architecture | Tool access controls enforced at zone boundary |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| AC-6 | Least Privilege | Minimum OT tool access per agent role; per-tool permission manifests |
| AC-3 | Access Enforcement | Enforce agent identity and tool access policy at OT boundary |
| CM-7 | Least Functionality | Allow-list only approved OT tools; deny all others |
| AU-12 | Audit Record Generation | Log every tool invocation in OT zone with full parameters |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:**
- Implement per-tool permission manifests for all OT agent deployments
- Require human confirmation for all irreversible OT tool invocations
- Validate all LLM-generated tool parameters as untrusted before execution

**Tier 2 — Short-term:**
- Architecture review: confirm no agent has direct write access to Level 1-2 devices
- Implement tool approval board for all OT-connected tool integrations
- Red team: attempt destructive tool invocation via prompt manipulation

**Tier 3 — Strategic:**
- SP 800-53 CM-7 enforcement via OT network tool access control system
- Formal tool chain analysis for OT environments — verify no tool combination achieves unsafe outcomes

---

### ASI03 — Identity & Privilege Abuse

**Severity: Critical (OT)**

Agents inherit and cache credentials exploited for lateral movement.
Agents exploit misconfigured OT permissions, inherited credentials, or
inter-agent trust to access OT systems beyond their intended scope —
PLC configuration, safety system reads, or cross-zone lateral movement.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | Common ICS vulnerabilities | Credential abuse enabling lateral movement between OT zones |
| §6.2 | Risk assessment | Assess agent credential scope as OT risk |
| §7.1 | Secure architecture | Least privilege enforced at zone boundary for all agent identities |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| AC-6 | Least Privilege | Minimum OT access per agent NHI; enforce at zone boundary |
| IA-3 | Device Identification and Authentication | Unique NHI per agent; authenticate at every OT boundary |
| AC-3 | Access Enforcement | Enforce agent identity and credential policy at OT network boundary |
| AU-12 | Audit Record Generation | Log every agent credential operation in OT zone |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:**
- Assign unique NHI to every OT agent deployment; no shared credentials
- Enforce short TTL on all agent OT credentials with automatic expiry
- Treat agent OT access as privileged account: apply same controls as human OT admin

**Tier 2 — Short-term:**
- Implement credential brokering — agents never inherit user OT credentials directly
- Architecture review: confirm no agent credential enables cross-zone lateral movement
- Quarterly OT credential audit for all agent identities

**Tier 3 — Strategic:**
- SP 800-53 AC-6 enforcement via OT network access control system
- PKI-backed agent identities for OT environments
- Formal agent identity programme with OT-specific NHI controls

---

### ASI04 — Agentic Supply Chain Vulnerabilities

**Severity: High (OT)**

Compromised tools, MCP servers, or model components alter agent behaviour.
Third-party components in the agentic OT stack — orchestration frameworks,
MCP servers, ML libraries — are compromised, introducing malicious behaviour
into the OT agent deployment.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.5 | Supply chain risks | Expanded to include agentic AI components |
| §6.3 | Supply chain risk management | SBOM and vendor assessment for agentic stack |
| §8.4 | Third-party management | Formal vendor programme for OT agent components |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SA-12 | Supply Chain Protection | Vendor assessment for all agentic stack components |
| SR-3 | Supply Chain Controls and Plans | SBOM for agentic OT deployment |
| SR-6 | Supplier Assessments and Reviews | Periodic review of all agentic component suppliers |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:**
- Generate SBOM for agentic OT deployment; flag unverified components
- Pin all dependency versions; reject floating versions in OT production
- Verify provenance and cryptographic signatures of all components in OT agent stack

**Tier 2 — Short-term:**
- Implement automated vulnerability scanning for agentic SBOM
- SA-12: formal vendor assessment for critical agentic stack components
- Scan all tool descriptors for hidden instructions before loading

**Tier 3 — Strategic:**
- SR-6: annual supplier review for all agentic component vendors
- Formal component integrity programme aligned with CISA software security guidance

---

### ASI05 — Unexpected Code Execution

**Severity: Critical (OT)**

Agents that generate and execute code become RCE gateways. Agents with
code execution capabilities in OT environments can be manipulated to run
attacker-influenced code — potentially issuing commands, modifying
configurations, or accessing safety system parameters through generated
code.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | ICS vulnerabilities | Code execution bypass is a critical OT threat vector |
| §6.2 | Risk assessment | Code execution capability in OT agents must be in risk register |
| §7.1 | Secure architecture | Mandatory: code execution sandbox independent of OT control plane |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| CM-7 | Least Functionality | Restrict agent code execution to sandboxed environments; no unrestricted shell |
| SI-3 | Malicious Code Protection | Pre-execution scanning of all agent-generated code |
| SC-7 | Boundary Protection | Enforce strict isolation between code execution sandbox and OT networks |
| AU-12 | Audit Record Generation | Immutable logging of all code execution in OT agent context |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate (absolute requirement):**
- Code execution sandboxes must be completely isolated from OT control networks
- Agents in OT context should not have code execution capability unless explicitly justified
- Disable all filesystem, network, and system call access not explicitly required

**Tier 2 — Short-term:**
- Red team: attempt sandbox escape from OT agent code execution environment
- Deploy multi-layer sandbox isolation (container, process, network policy)
- Implement pre-execution scanning and allowlisting for permitted operations

**Tier 3 — Strategic:**
- Formal sandbox boundary verification for all OT agent code execution environments
- Hardware-level sandboxing (gVisor, Firecracker) for OT-adjacent deployments
- Continuous adversarial sandbox testing in staging environment

---

### ASI06 — Memory & Context Poisoning

**Severity: High (OT)**

Persistent memory poisoning causes systematic incorrect behaviour.
Corrupted agent memory causes agents to act on false OT state — misreporting
equipment status, misremembering maintenance history, or carrying persistent
attacker instructions across sessions into OT decision-making.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | ICS vulnerabilities | Memory corruption and state manipulation |
| §6.2 | Risk assessment | Assess agent memory stores as OT data integrity risk |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SI-7 | Software, Firmware, and Information Integrity | Integrity verification for agent memory stores |
| SC-28 | Protection of Information at Rest | Encrypt and access-control all persistent agent memory |
| AC-3 | Access Enforcement | Restrict write access to agent memory stores |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:**
- Apply access controls to all agent memory stores
- Add integrity metadata (HMAC) to all OT-state memory writes
- Log all memory read/write operations

**Tier 2 — Short-term:**
- Implement memory validation pipeline for all OT state information
- Periodic memory audit: compare agent's stored OT state with ground truth
- Red team: attempt memory poisoning via OT data feeds

**Tier 3 — Strategic:**
- Formal provenance tracking for all OT state stored in agent memory
- Cross-session memory integrity checks before any OT decision

#### Cross-references
- LLM Top 10: LLM04 Data & Model Poisoning, LLM08 Vector & Embedding Weaknesses
- DSGAI 2026: DSGAI13 Vector Store Platform Security

---

### ASI07 — Insecure Inter-Agent Communication

**Severity: Critical (OT)**

A2A channels lacking authentication enable agent-in-the-middle attacks.
Agents in multi-agent OT orchestration communicate without proper mutual
authentication, encryption, or schema validation — enabling spoofing,
instruction injection, lateral movement across OT zones, and coordinated
action against industrial infrastructure.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | ICS vulnerabilities | Lateral movement between control systems via A2A channels |
| §6.2 | Risk assessment | Assess inter-agent communication as OT risk |
| §7.2 | Security controls | Authenticate and encrypt all automated system-to-system communications |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| IA-3 | Device Identification and Authentication | Mutual authentication for all agent-to-agent OT communications |
| SC-8 | Transmission Confidentiality and Integrity | Encrypt all A2A communication in transit; no cleartext inter-agent messages |
| AC-3 | Access Enforcement | Enforce per-agent trust boundaries at every A2A boundary |
| AU-12 | Audit Record Generation | Log all inter-agent instructions with full payload |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:**
- Implement mutual authentication between all agents in OT orchestration network
- Encrypt all A2A communication in transit with mutual TLS
- Log all inter-agent instructions with full payload and sender identity

**Tier 2 — Short-term:**
- Agent identity registry: all OT agents have verifiable, revocable identities
- Red team: simulate spoofing and replay attacks against OT A2A channels
- Architecture review: trust graph for all agent-to-agent OT communications

**Tier 3 — Strategic:**
- Cryptographic attestation of agent identity and OT communication scope
- Short-lived A2A certificates with automated rotation
- Automated verification that no agent-to-agent path crosses OT zone boundaries without authorisation

---

### ASI08 — Cascading Agent Failures

**Severity: Critical (OT)**

Single-point faults propagate through multi-agent workflows. Failures in
multi-agent OT orchestration propagate — corrupted state from one agent
cascades into downstream agents, amplifying errors across the OT system
and potentially triggering correlated failures in multiple industrial
components.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.6 | Availability risks | Cascading failure across OT components |
| §6.2 | Risk assessment | Cascade failure scenarios in OT risk register |
| §7.2 | Security controls | Circuit breakers between OT automation layers |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SC-5 | Denial-of-Service Protection | Rate limiting and circuit breakers prevent cascade amplification |
| SI-17 | Fail-Safe Procedures | Define fail-safe state for every autonomous OT action |
| AU-12 | Audit Record Generation | Log cascade indicators for post-incident forensics |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:**
- Define fail-safe state for every agent-controllable OT parameter
- Implement circuit breaker pattern between OT orchestration layers
- Document cascade blast radius: if agent X fails, what OT components are affected?

**Tier 2 — Short-term:**
- Chaos engineering exercise: simulate cascading failure in staging
- Deploy O-IM playbook for cascade incidents in OT environment
- Add per-agent OT action checkpointing for rollback capability

**Tier 3 — Strategic:**
- Formal OT chaos engineering programme aligned with SP 800-82 §8
- Automated cascade detection with predictive alerting before full failure
- Architecture pattern: stateless agents with OT state sourced from authoritative systems

#### Cross-references
- LLM Top 10: LLM10 Unbounded Consumption
- DSGAI 2026: DSGAI17 Data Availability & Resilience Failures

---

### ASI09 — Human-Agent Trust Exploitation

**Severity: Critical (OT)**

Agents build false trust enabling manipulation of human approvers.
Agents in OT environments establish unwarranted trust with human operators
— through apparent competence or presentation authority — then exploit
that trust to obtain approvals for OT actions without proper verification.
Missing confirmation gates, override mechanisms, or audit trails prevent
effective human oversight of autonomous OT actions.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | ICS vulnerabilities | Inadequate human oversight cited as OT vulnerability category |
| §6.2 | Risk assessment | Quantify consequences of operator over-trust in agent OT recommendations |
| §8.2 | OT security programme | Governance policy for human-agent trust in OT systems |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| AC-6 | Least Privilege | Autonomous OT actions constrained to minimum necessary scope |
| AU-12 | Audit Record Generation | Every agent-influenced OT decision logged with rationale |
| AT-3 | Role-Based Training | OT operators trained on AI trust risks, verification requirements, and override procedures |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:**
- Provide OT operator training on AI limitations and trust exploitation risks
- Add human confirmation gate for all irreversible OT actions — approvals independent of agent interface
- Implement AI advisory labelling for all agent OT recommendations

**Tier 2 — Short-term:**
- Define autonomy tiers for OT actions: auto / confirm / human-required
- AT-3: operator training programme covering AI trust exploitation in OT
- Implement autonomous action budget: configurable hard limit per session
- Safety alarm independence — agents prohibited from acknowledging or suppressing safety alarms

**Tier 3 — Strategic:**
- Real-time OT oversight dashboard for operations team
- AU-12 L3: forensic-quality audit log for all agent-influenced OT decisions
- Formal trust exploitation governance policy reviewed by CISO and safety officer
- Operator competency assessments covering AI trust verification

---

### ASI10 — Rogue Agents

**Severity: Critical (OT)**

Compromised agents pursue hidden goals while appearing compliant. Agents
in OT environments operate outside their intended boundaries — pursuing
hidden objectives, executing undisclosed tool calls, or systematically
biasing OT recommendations — while maintaining an appearance of normal
operation. In OT context, rogue agent behaviour can directly impact
physical safety.

#### SP 800-82 Rev 3 mapping

| Section | Requirement | How it applies |
|---|---|---|
| §5.3 | ICS vulnerabilities | Rogue automation is the highest-severity OT threat category |
| §6.2 | Risk assessment | Rogue agent scenarios must be in OT risk register |
| §7.2 | Security controls | Behavioural monitoring and containment for all OT automation |

#### SP 800-53 controls

| Control | Title | Application |
|---|---|---|
| SI-4 | System Monitoring | Comprehensive behavioural monitoring of all OT agents; baseline deviation alerting |
| AU-12 | Audit Record Generation | Immutable logging of all agent OT actions — no deployment without full observability |
| AC-3 | Access Enforcement | Scope constraints enforced — agent cannot exceed OT permission envelope |
| IR-4 | Incident Handling | Rogue agent containment procedure — kill switch, audit, state validation, forensic capture |

#### Three-tier mitigations

**Tier 1 — Pre-deployment gate:**
- Comprehensive audit logging of all agent OT actions — no deployment without full observability
- Enforce scope constraints — rogue agent cannot exceed OT permission envelope regardless of internal goal
- Implement kill switch accessible from operator console; test before deployment

**Tier 2 — Short-term:**
- Establish behavioural baselines during commissioning; alert on deviations
- Red team: simulate rogue agent pursuing hidden objectives in OT staging environment
- Aggregate OT recommendation analysis — detect systematic bias before physical impact

**Tier 3 — Strategic:**
- Automated rogue agent detection with OT-aware behavioural anomaly monitoring
- Formal rogue agent containment exercises in OT environment with documented findings
- IR-4: rogue agent incident response integrated with OT safety procedures

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- DSGAI 2026: DSGAI16 Endpoint & Browser Overreach

---

## OT pre-deployment checklist — agentic AI

Complete this checklist before deploying any autonomous AI agent in an OT environment.

| Item | Requirement | SP 800-82 Ref | Status |
|---|---|---|---|
| Zone placement | Agent deployed in correct SP 800-82 zone | §7, App G | |
| Permission scope | Minimum OT permissions documented and enforced | §7.1 | |
| Tool access | Per-tool permission manifests with irreversibility classification | §7.1 | |
| Command capability | All command paths require human confirmation | §7.1 | |
| Agent identity | Unique NHI per agent with short TTL | §7.2 | |
| A2A security | All inter-agent communication authenticated and encrypted | §7.2 | |
| Safety independence | Safety function independent of AI layer | §5.3 | |
| Audit logging | All agent OT actions logged to immutable log | §7.3 | |
| Emergency stop | Kill switch tested and accessible to operators | §8.2 | |
| Supply chain | SBOM generated for agentic stack | §8.4 | |
| Operator training | OT operators trained on AI trust risks and override procedures | §8.2 | |
| Incident playbook | Cascade failure and rogue agent playbooks documented | §6.2 | |
| Risk assessment | All ASI01-ASI10 scenarios in OT risk register | §6.2 | |

---

## U.S. regulatory crosswalk

| Regulation | Applicability | Relevant agentic AI requirements |
|---|---|---|
| NERC CIP-007 | Electric utility OT | System security management for any automated system with BES access |
| NERC CIP-013 | Electric utility supply chain | SBOM and vendor assessment for agentic stack components |
| AWIA 2018 | Water utilities | Risk assessment must include autonomous system threat scenarios |
| CMMC Level 2 | DoD contractors | SP 800-53 AC-6, AU-12, SI-7, SI-10 required for autonomous OT systems |
| FISMA | Federal agencies | All SP 800-53 controls apply; agentic AI in OT requires ISSO review |
| TSA Directives | Pipeline operators | Autonomous system access to pipeline control systems requires security review |

---

## References

- [NIST SP 800-82 Rev 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf) — May 2023
- [NIST SP 800-53 Rev 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) — Security and Privacy Controls
- [Agentic_ISA62443.md](Agentic_ISA62443.md) — complementary zone model and SL ratings
- [LLM_NISTSP80082.md](../llm-top10/LLM_NISTSP80082.md) — LLM entry mapping
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [shared/RECIPES.md](../shared/RECIPES.md) — OT kill switch and JIT credential patterns

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-05-25 | Remediate ASI entry names, severities, descriptions, and control mappings to canonical Agentic Top 10 2026 |
| 1.0.0 | 2026-03-27 | Initial release — full mapping ASI01–ASI10 to SP 800-82 Rev 3 |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) —
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
*License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)*
