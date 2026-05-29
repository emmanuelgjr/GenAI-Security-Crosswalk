<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01-ASI10)
  Framework   : STRIDE — Threat Modelling Methodology
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 × STRIDE

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
(ASI01–ASI10) to [STRIDE](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats) —
Microsoft's threat-modelling methodology — so agentic threats slot into the same
structured taxonomy you already use across the rest of the application stack.

---

## Why STRIDE for agentic security

STRIDE classifies threats into six categories: Spoofing, Tampering, Repudiation,
Information Disclosure, Denial of Service, and Elevation of Privilege. Agentic
systems intensify every category — an agent that can plan, call tools, hold
memory, and talk to other agents expands the attack surface for each STRIDE class
well beyond a single-shot LLM. This mapping traces each Agentic Top 10 risk to its
primary STRIDE categories so security architects can model autonomous-AI threats
with the same DFD-based approach used for conventional systems. Tooling per risk
is catalogued in [shared/TOOLS.md](../shared/TOOLS.md).

---

## STRIDE categories at a glance

| Category | Letter | Core question | Agentic example |
|---|---|---|---|
| Spoofing | S | Can an attacker impersonate a trusted identity or source? | Forged agent identity, spoofed tool/peer |
| Tampering | T | Can data or behaviour be modified without authorisation? | Injected goal, poisoned memory |
| Repudiation | R | Can an action be denied without a traceable audit trail? | Unattributed autonomous action |
| Information Disclosure | I | Can sensitive data reach unauthorised parties? | Leaked context, inter-agent eavesdropping |
| Denial of Service | D | Can availability be degraded or denied? | Runaway loops, cascade collapse |
| Elevation of Privilege | E | Can permissions exceed authorisation? | Tool privilege abuse, RCE |

---

## Quick-reference summary

| ID | Name | Severity | Primary STRIDE Categories | Tier | Scope |
|---|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | Critical | S, T, E | Foundational–Advanced | Both |
| ASI02 | Tool Misuse & Exploitation | Critical | E, T, S | Foundational–Advanced | Both |
| ASI03 | Identity & Privilege Abuse | Critical | S, E, R | Foundational–Advanced | Both |
| ASI04 | Agentic Supply Chain Vulnerabilities | High | T, S, E | Foundational–Hardening | Both |
| ASI05 | Unexpected Code Execution | Critical | E, T | Hardening–Advanced | Both |
| ASI06 | Memory & Context Poisoning | High | T, S, R | Hardening–Advanced | Both |
| ASI07 | Insecure Inter-Agent Communication | High | S, T, I | Hardening–Advanced | Both |
| ASI08 | Cascading Agent Failures | Critical | D, T, R | Foundational–Advanced | Both |
| ASI09 | Human-Agent Trust Exploitation | High | S, R, I | Foundational–Hardening | Both |
| ASI10 | Rogue Agents | Critical | E, T, R | Hardening–Advanced | Both |

---

## Audience tags

- **Security architect** — full file, primary reference for agentic threat-model design
- **Threat modeller** — integrate STRIDE categories into agent DFDs (tools, memory, peers)
- **Agent developer** — ASI01, ASI02, ASI05, ASI06
- **Security engineer** — ASI02, ASI03, ASI07, ASI10
- **SOC analyst** — ASI03, ASI08, ASI10 (autonomous-action detection)
- **OT engineer** — ASI01, ASI02, ASI08 (see ISA 62443 crosswalk for OT controls)

---

## Detailed mappings

---

### ASI01 — Agent Goal Hijack

**Severity:** Critical

An attacker redirects the agent's objective through direct or indirect injection,
causing it to pursue attacker-chosen goals while appearing to operate normally.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Instruction Spoofing | S | Injected content impersonates a trusted instruction source, redirecting the agent's goal | Foundational | Both |
| Goal Tampering | T | The agent's planned objective is altered without authorisation | Foundational | Both |
| Privilege Elevation via Hijack | E | The hijacked agent uses its granted tool/data privileges for the attacker's ends | Hardening | Both |

#### Mitigations by tier

**Foundational** — treat all retrieved/tool content as untrusted; separate system-goal context from data context; validate goal state at plan boundaries.
**Hardening** — require human approval for high-impact actions; runtime injection detection on every input channel; per-action authorisation checks.
**Advanced** — cryptographically anchored goal/instruction integrity; independent goal-deviation monitor; quarterly red-team of indirect-injection paths.

#### Cross-references

- LLM Top 10: LLM01 (Prompt Injection) · DSGAI 2026: DSGAI01, DSGAI15
- Other: MITRE ATLAS AML.T0051 · ASVS V11 · AITG (Agentic)

---

### ASI02 — Tool Misuse & Exploitation

**Severity:** Critical

The agent is induced to invoke tools in harmful ways — destructive parameters,
unintended targets, or chained calls that exceed its mandate.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Privilege Abuse via Tools | E | The agent invokes tools with more authority than the task warrants | Foundational | Both |
| Action Tampering | T | Tool parameters are manipulated to alter the action's effect | Foundational | Both |
| Tool/Target Spoofing | S | The agent is tricked into calling a spoofed tool or wrong target | Hardening | Both |

#### Mitigations by tier

**Foundational** — least-privilege per tool; allowlist tools and parameters; human confirmation for irreversible actions.
**Hardening** — validate tool inputs/outputs; per-tool rate and scope limits; log every invocation with parameters.
**Advanced** — capability-based tool brokering; anomaly detection on tool-call sequences; sandboxed tool execution.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency) · DSGAI 2026: DSGAI06, DSGAI16
- Other: MITRE ATLAS AML.T0053 · ASVS V11 · CWE-285

---

### ASI03 — Identity & Privilege Abuse

**Severity:** Critical

The agent's identity, credentials, or delegated authority are abused — by the
agent acting beyond scope, or by an attacker impersonating it.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Identity Spoofing | S | An attacker impersonates the agent or a delegating principal | Foundational | Both |
| Privilege Elevation | E | The agent exercises permissions beyond its delegated scope | Foundational | Both |
| Action Repudiation | R | Autonomous actions cannot be attributed to a responsible identity | Hardening | Both |

#### Mitigations by tier

**Foundational** — scoped, short-lived agent identities; least-privilege delegation; strong machine-to-machine auth.
**Hardening** — attributable, signed action logs; per-action authorisation; credential rotation and replay detection.
**Advanced** — continuous delegation-chain verification; just-in-time privilege issuance; identity-anomaly detection.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency) · DSGAI 2026: DSGAI02
- Other: OWASP NHI Top 10 · MITRE ATLAS AML.T0012 · ASVS V2/V4

---

### ASI04 — Agentic Supply Chain Vulnerabilities

**Severity:** High

Compromised models, tools, plugins, or datasets in the agent's supply chain
introduce backdoors or malicious behaviour.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Component Tampering | T | A dependency, model, or tool is modified to embed malicious behaviour | Foundational | Both |
| Component Spoofing | S | A malicious component masquerades as a trusted one (typosquat, fake registry) | Foundational | Both |
| Supply-Chain Privilege Elevation | E | A compromised component inherits the agent's privileges | Hardening | Both |

#### Mitigations by tier

**Foundational** — vet and pin dependencies/models/tools; verify signatures and provenance; SBOM for agent components.
**Hardening** — scan model artefacts for serialization payloads; integrity-verify on load; vendor assessment.
**Advanced** — continuous supply-chain monitoring; reproducible builds; provenance attestation across the chain.

#### Cross-references

- LLM Top 10: LLM03 (Supply Chain) · DSGAI 2026: DSGAI04, DSGAI21
- Other: MITRE ATLAS AML.T0010 · NIST SP 800-218A · ASVS V10

---

### ASI05 — Unexpected Code Execution

**Severity:** Critical

The agent generates and executes code (or crafts injection payloads) that runs
in its environment, enabling RCE.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Code-Execution Privilege Elevation | E | Executed code runs with the agent's environment privileges | Foundational | Both |
| Execution-Path Tampering | T | Injected content alters generated code or its execution context | Hardening | Both |

#### Mitigations by tier

**Foundational** — sandbox all code execution; no implicit `eval`; deny network/filesystem by default.
**Hardening** — allowlist permitted operations; static/dynamic checks on generated code; ephemeral execution environments.
**Advanced** — capability-scoped sandboxes per task; egress controls; continuous monitoring of executed operations.

#### Cross-references

- LLM Top 10: LLM05 (Improper Output Handling) · DSGAI 2026: DSGAI12
- Other: MITRE ATLAS AML.T0050 · CWE-94 · CWE-78 · ASVS V5

---

### ASI06 — Memory & Context Poisoning

**Severity:** High

Persistent agent memory or retrieved context is poisoned so the agent carries
attacker-controlled state across turns or sessions.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Memory Tampering | T | Stored memory/context is modified to alter future behaviour | Foundational | Both |
| Source Spoofing | S | Poisoned content impersonates a trusted memory/retrieval source | Hardening | Both |
| Integrity Repudiation | R | Memory changes lack an audit trail, hiding the poisoning | Hardening | Both |

#### Mitigations by tier

**Foundational** — treat memory writes as untrusted input; validate before persisting; isolate per-principal memory.
**Hardening** — sign/version memory entries; provenance on retrieved context; integrity-drift alerting.
**Advanced** — tamper-evident memory store; periodic memory hygiene/expiry; poisoning detection over memory history.

#### Cross-references

- LLM Top 10: LLM08 (Vector & Embedding Weaknesses) · DSGAI 2026: DSGAI11, DSGAI13
- Other: MITRE ATLAS AML.T0070 · ASVS V5/V8

---

### ASI07 — Insecure Inter-Agent Communication

**Severity:** High

Messages between agents are spoofed, tampered with, or eavesdropped, propagating
malicious instructions or leaking data across the agent mesh.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Peer Spoofing | S | An attacker impersonates a trusted agent in the mesh | Foundational | Both |
| Message Tampering | T | Inter-agent messages are altered in transit, relaying injected instructions | Foundational | Both |
| Inter-Agent Disclosure | I | Sensitive data is exposed over unprotected agent-to-agent channels | Hardening | Both |

#### Mitigations by tier

**Foundational** — mutually authenticate agents; encrypt inter-agent channels; validate relayed content as untrusted.
**Hardening** — sign messages; scope what each agent may share; log inter-agent exchanges.
**Advanced** — zero-trust agent mesh with per-message authorisation; anomaly detection on message flows.

#### Cross-references

- LLM Top 10: LLM01 (Prompt Injection) · DSGAI 2026: DSGAI06, DSGAI01
- Other: MITRE ATLAS AML.T0066 · ASVS V13 · NIST SP 800-82

---

### ASI08 — Cascading Agent Failures

**Severity:** Critical

A fault or compromise in one agent propagates through dependent agents, degrading
or collapsing the system.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Availability Denial | D | A failing/looping agent exhausts resources or halts dependent agents | Foundational | Both |
| Propagated Tampering | T | A compromised agent's bad output corrupts downstream agents | Hardening | Both |
| Cascade Repudiation | R | The origin of a cascade cannot be traced across agents | Hardening | Both |

#### Mitigations by tier

**Foundational** — circuit breakers and rate/quota limits; bounded retries; fail-safe defaults that don't affect critical systems.
**Hardening** — blast-radius isolation between agents; cascade detection and containment; correlated cross-agent logging.
**Advanced** — chaos/availability testing of the agent graph; automated cascade kill-switch; resilience SLOs.

#### Cross-references

- LLM Top 10: LLM10 (Unbounded Consumption) · DSGAI 2026: DSGAI17
- Other: MITRE ATLAS AML.T0029 · DORA · ISA 62443

---

### ASI09 — Human-Agent Trust Exploitation

**Severity:** High

The agent's authority and human trust in it are exploited — social-engineering the
human, or the agent over-asserting unverified conclusions.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Trust Spoofing | S | The agent (or attacker via the agent) presents false authority/credibility | Foundational | Both |
| Decision Repudiation | R | Human-approved actions driven by misleading agent output lack accountability | Hardening | Both |
| Persuasion-Driven Disclosure | I | The human is induced to reveal data through the trusted agent channel | Hardening | Both |

#### Mitigations by tier

**Foundational** — surface provenance/uncertainty in agent outputs; require evidence for high-impact recommendations.
**Hardening** — log human-agent decisions with the supporting context; friction on irreversible human approvals.
**Advanced** — calibrated-confidence UX; independent verification of high-stakes agent claims.

#### Cross-references

- LLM Top 10: LLM09 (Misinformation) · DSGAI 2026: DSGAI19
- Other: MITRE ATLAS AML.T0048 · NIST AI RMF (MEASURE)

---

### ASI10 — Rogue Agents

**Severity:** Critical

An agent operates outside its intended bounds — compromised, misconfigured, or
emergent — taking unauthorised autonomous actions.

#### STRIDE mapping

| Threat | Category | Description | Tier | Scope |
|---|---|---|---|---|
| Unauthorised Privilege Use | E | The rogue agent exercises capabilities beyond its sanctioned scope | Foundational | Both |
| Behaviour Tampering | T | The agent's behaviour diverges from policy without authorisation | Hardening | Both |
| Action Repudiation | R | Rogue actions cannot be reliably attributed or reconstructed | Hardening | Both |

#### Mitigations by tier

**Foundational** — strict capability boundaries; kill-switch; default-deny on out-of-policy actions.
**Hardening** — continuous behaviour-vs-policy monitoring; attributable action logs; periodic agent attestation.
**Advanced** — independent oversight agent/guardrail; automated quarantine of anomalous agents; behavioural baselining.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency) · DSGAI 2026: DSGAI02, DSGAI20
- Other: MITRE ATLAS AML.T0048 · ASVS V11 · NIST AI RMF (MANAGE)

---

## Implementation priority

| Priority | STRIDE focus | ASI entries |
|---|---|---|
| P1 — Pre-production gate | S, T, E (injection, tool, identity) | ASI01, ASI02, ASI03, ASI05 |
| P2 — First 30 days | T, S, R (memory, comms, supply chain) | ASI04, ASI06, ASI07 |
| P3 — Resilience milestone | D, R (cascade, rogue, trust) | ASI08, ASI09, ASI10 |

---

## Using STRIDE in agentic threat models

Model the agent as a data-flow diagram with trust boundaries at: user input,
each tool, memory/RAG stores, inter-agent channels, and the execution sandbox.
Apply the six STRIDE categories at every boundary — the quick-reference table
above gives the primary categories per Agentic Top 10 risk as a starting point.

---

## See also

- [LLM Top 10 × STRIDE](../llm-top10/LLM_STRIDE.md)
- [DSGAI 2026 × STRIDE](../dsgai-2026/DSGAI_STRIDE.md)

---

## References

- [STRIDE threat model (Microsoft)](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [LLM Top 10 × STRIDE](../llm-top10/LLM_STRIDE.md)
- [shared/TOOLS.md](../shared/TOOLS.md) — tooling catalogue

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-05-29 | Initial mapping — ASI01–ASI10 to STRIDE categories with tiered mitigations |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) —
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
*License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)*
