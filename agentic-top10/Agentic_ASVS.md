<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for Agentic Applications 2026 (ASI01-ASI10)
  Framework   : OWASP Application Security Verification Standard (ASVS) 4.0.3
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Agentic Top 10 2026 x OWASP ASVS 4.0.3

Mapping the [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
to the [OWASP Application Security Verification Standard (ASVS) 4.0.3](https://owasp.org/www-project-application-security-verification-standard/)
— the framework for testing and verifying the security of web
applications and APIs, organised into 14 chapters with three
verification levels (L1/L2/L3).

Agentic AI systems are web applications and APIs with autonomous
execution capability layered on top. All standard ASVS controls
apply — with specific requirements amplified by the agentic context.
The key ASVS chapters for agentic AI are:

**V4 Access Control** — the most critical chapter for agentic AI.
Every agent tool invocation is an access control decision. V4
requirements for least privilege, access enforcement, and account
management map directly to the per-tool permission manifests and
NHI (Non-Human Identity) governance that agentic deployments require.

**V5 Validation, Sanitization and Encoding** — goal hijack and tool
misuse both exploit insufficient input validation. V5 requirements
apply to every content channel an agent processes, not just direct
user input.

**V11 Business Logic** — the chapter most under-utilised in agentic
security. V11 requires that business logic abuse scenarios are
identified, that rate limits exist, and that workflows enforce
correct sequencing. For agentic AI, this maps directly to kill
switches, cascade containment, and human confirmation gates.

**V13 API and Web Service** — agents are API clients and API servers.
Rate limiting, input validation, and authentication requirements in
V13 apply to both sides of every agent-to-tool and agent-to-agent
communication channel.

For LLM Top 10 x ASVS see LLM_ASVS.md.

---

## ASVS verification levels

- **L1** — Opportunistic: passively verifiable, minimum security requirement
- **L2** — Standard: most applications with sensitive data
- **L3** — Advanced: high-value targets, high assurance required

---

## Quick-reference summary

| ID | Name | Severity | Primary ASVS Chapters / Requirements | Level | Tier |
|---|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | Critical | V5.1, V5.2, V11.1, V1.1 | L1-L3 | Foundational-Advanced |
| ASI02 | Tool Misuse and Exploitation | Critical | V4.1, V4.2, V11.1, V7.2 | L1-L3 | Foundational-Advanced |
| ASI03 | Identity and Privilege Abuse | Critical | V4.1, V2.1, V2.6, V7.2 | L1-L3 | Foundational-Advanced |
| ASI04 | Agentic Supply Chain | High | V10.2, V14.2, V1.1 | L2-L3 | Foundational-Hardening |
| ASI05 | Unexpected Code Execution | Critical | V5.2, V5.2.4, V12.3, V14.5 | L1-L3 | Hardening-Advanced |
| ASI06 | Memory and Context Poisoning | High | V5.1, V8.1, V6.1, V12.1 | L2-L3 | Hardening-Advanced |
| ASI07 | Insecure Inter-Agent Comms | High | V9.1, V4.1, V7.2, V5.3 | L1-L3 | Hardening-Advanced |
| ASI08 | Cascading Agent Failures | High | V11.1, V13.1, V7.4, V1.1 | L1-L3 | Foundational-Advanced |
| ASI09 | Human-Agent Trust Exploitation | Medium | V14.5, V7.4, V11.1, V5.2 | L1-L2 | Foundational-Hardening |
| ASI10 | Rogue Agents | Critical | V7.2, V7.4, V11.1, V4.1 | L2-L3 | Hardening-Advanced |

---

## Audience tags

- **Developer** — full file, specific ASVS requirements to implement per entry
- **Security architect** — V1 architecture requirements, V11 business logic
- **Penetration tester** — verification requirements per level for test planning
- **Security engineer** — V4 access control, V5 validation, V13 API security
- **Auditor** — ASVS level mapping for assurance assessment scope
- **OT engineer** — ASI02, ASI08 entries with ISA 62443 crosswalk notes

---

## Detailed mappings

---

### ASI01 — Agent Goal Hijack

**Severity:** Critical

An attacker redirects agent objectives through direct or indirect
instruction injection — the agent autonomously executes a multi-step
attack chain. ASVS V5 (Validation, Sanitization and Encoding) is
the primary chapter — every content channel an agent processes is
an input that requires V5 validation, not just direct user input.
V11 (Business Logic) adds the requirement to identify and mitigate
goal hijack as a business logic abuse scenario.

**ASVS framing:** Goal hijack is an input validation failure (V5)
that enables a business logic abuse (V11). Both chapters apply
simultaneously — V5 controls what enters the agent's context,
V11 controls what the agent is permitted to do with any goal state.

#### ASVS mapping

| Requirement | ID | Level | How it applies |
|---|---|---|---|
| Verify all user input validated against allowlist or rejected | V5.1.1 | L1 | All inputs to agents validated — indirect injection through processed content equally in scope as direct user input |
| Verify output encoding prevents injection attacks | V5.2.1 | L1 | Agent outputs encoded before passing to downstream renderers, interpreters, or tool call parameters |
| Verify business logic abuse scenarios identified | V11.1.2 | L2 | Goal hijack scenarios explicitly identified in business logic threat model — treatment controls documented |
| Threat modelling of all data flows | V1.1.2 | L2 | All agent data flows threat-modelled — every content source the agent processes mapped as a potential injection path |
| Verify application limits implement business limits | V11.1.4 | L2 | Goal-state constraints enforced at the orchestration layer — agent cannot pursue goals outside defined scope |

#### Mitigations by tier

**Foundational (L1)**
- V5.1.1: Validate all inputs to agents before processing —
  extend V5 coverage to every content channel the agent
  processes: RAG chunks, tool outputs, emails, documents,
  not just direct user input
- V5.2.1: Encode all agent outputs before passing to
  downstream consumers — treat agent responses as untrusted
  input to every downstream system
- Implement operator kill switch — ability to halt all
  agent activity immediately, V11 business constraint

**Hardening (L2)**
- V11.1.2: Identify goal hijack as a business logic abuse
  scenario — document in threat model with specific injection
  paths per content source, treatment controls assigned
- V11.1.4: Enforce goal-state constraints at the orchestration
  layer — agent cannot pursue goals outside defined scope
  regardless of instruction source
- V1.1.2: Threat-model all agent data flows — every content
  channel the agent processes documented as a potential
  injection path in the architecture threat model

**Advanced (L3)**
- Implement cryptographically signed goal specifications —
  runtime deviation from signed goal triggers automatic
  suspension, verified in V11 business logic test suite
- V5.1.1: Extend adversarial testing to all indirect injection
  surfaces — RAG sources, tool descriptors, all data
  sources the agent processes in your specific deployment
- V11.1.2: Include goal hijack in penetration testing scope —
  direct, indirect, and multi-turn attacks tested against
  your specific deployment

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| Invariant Analyzer | Open-source | https://github.com/invariantlabs-ai/invariant |
| OWASP ZAP (API testing) | Open-source | https://www.zaproxy.org |

#### Cross-references
- LLM Top 10: LLM01 Prompt Injection, LLM06 Excessive Agency
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: ISO 27001 A.8.28 · NIST AI RMF GV-1.7 · EU AI Act Art. 14

---

### ASI02 — Tool Misuse and Exploitation

**Severity:** Critical

Agents misuse legitimate tools — calling them with destructive
parameters or in unexpected sequences. ASVS V4 (Access Control)
is the primary chapter — agent tool access is an access control
decision that must enforce least privilege per V4.1 and account
management per V4.2. V11 (Business Logic) adds the requirement
to define and enforce permitted operation sequences.

**ASVS framing:** Tool misuse is an access control failure (V4)
compounded by insufficient business logic constraints (V11). An
agent that can invoke a tool can only misuse it to the extent that
V4 least privilege permits — scope the permissions correctly and
the blast radius of any misuse is bounded.

#### ASVS mapping

| Requirement | ID | Level | How it applies |
|---|---|---|---|
| Verify access control enforces least privilege | V4.1.3 | L1 | Agent tool access enforced at minimum required scope — read-only by default, write access requires explicit justification |
| Verify all sensitive functions protected by access control | V4.1.1 | L1 | Irreversible tool operations (delete, send, publish, execute) protected — agent cannot invoke without verified authorisation |
| Verify all business logic decisions logged | V7.2.2 | L2 | All agent tool invocations logged — tool identity, parameters, invoking session, timestamp — immutable trail |
| Verify business logic abuse scenarios identified | V11.1.2 | L2 | Tool misuse scenarios identified — destructive parameter injection, unusual tool chains, MCP descriptor poisoning |

#### Mitigations by tier

**Foundational (L1)**
- V4.1.3: Enforce least privilege on all agent tool access —
  per-tool minimum permission, read-only by default, write
  access requires explicit documented justification
- V4.1.1: Protect all irreversible tool operations with
  access control — human confirmation required for delete,
  send, publish, execute, pay, regardless of agent instruction
- Human confirmation gate for irreversible tools — separate
  confirmation interface, not the agent chat

**Hardening (L2)**
- V7.2.2: Collect detailed audit logs for all agent tool
  invocations — tool identity, parameters, session identity,
  timestamp — immutable audit trail integrated into SIEM
- V11.1.2: Identify tool misuse scenarios in business logic
  threat model — destructive parameter injection, MCP
  descriptor poisoning, unusual tool sequences — treatment
  controls documented and tested
- Validate all tool descriptors before agent loading —
  hidden instructions trigger rejection

**Advanced (L3)**
- Per-invocation parameter validation — all tool parameters
  validated against safe ranges before execution, verified
  in V4 access control test suite
- V11.1.2: Include tool misuse in penetration testing —
  attempt destructive outcomes through legitimate tool
  invocations against your specific deployment
- V4.1.3: Include agent tool access in privileged access
  reviews — quarterly scope review, unused permissions removed

#### Tools

| Tool | Type | Link |
|---|---|---|
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |
| MCP Inspector | Open-source | https://github.com/modelcontextprotocol/inspector |
| Guardrails AI | Open-source | https://github.com/guardrails-ai/guardrails |

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling, LLM06 Excessive Agency
- DSGAI 2026: DSGAI06 Tool Plugin and Agent Data Exchange, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: ISO 27001 A.8.2 · AIUC-1 B006/B007 · ISA/IEC 62443 SR 2.2 (OT)

---

### ASI03 — Identity and Privilege Abuse

**Severity:** Critical

Agents inherit and cache credentials that, when compromised, expose
all systems the agent has access to. ASVS V4 (Access Control) and
V2 (Authentication) are the primary chapters — agent credentials
are authentication tokens requiring V2 management and V4 least
privilege enforcement. The most critical NHI-specific ASVS
requirement is V2.6 (look-up secret storage).

**ASVS framing:** Agent credential abuse is an authentication
failure (V2) that enables access control violations (V4). V2 controls
how agent credentials are stored and managed — V4 controls the
scope of access those credentials permit. Both must be addressed
to prevent lateral movement via agent identity abuse.

#### ASVS mapping

| Requirement | ID | Level | How it applies |
|---|---|---|---|
| Verify access control enforces least privilege | V4.1.3 | L1 | Agent credentials scoped to minimum required access — quarterly review, unused scope removed |
| Verify all sensitive functions protected | V4.1.1 | L1 | Agent access to sensitive systems enforced by access control — credential scope cannot be self-escalated |
| Verify lookup secrets random and not reused | V2.6.1 | L2 | Agent API keys and tokens generated with sufficient entropy — no sequential, predictable, or reused tokens |
| Verify credentials not hardcoded | V2.10.1 | L2 | No hardcoded agent credentials in source code, configuration files, or prompts — secret manager required |
| Verify all access control decisions logged | V7.2.1 | L2 | All agent credential operations logged — issuance, use, expiry, anomalous patterns detectable |

#### Mitigations by tier

**Foundational (L1)**
- V4.1.3: Scope all agent credentials to minimum required
  access — enforce least privilege at the identity layer,
  not just the application layer
- V4.1.1: Protect all sensitive system access with verified
  access controls — agent credentials cannot self-escalate
  beyond their defined scope
- Issue short-lived, task-scoped credentials per invocation —
  never long-lived tokens shared across tasks or sessions

**Hardening (L2)**
- V2.10.1: Store all agent credentials in a secret manager —
  no hardcoded credentials anywhere, rotate on schedule,
  V2 authentication requirement applied to NHI
- V2.6.1: Generate agent tokens with sufficient entropy —
  no sequential or predictable credential identifiers
- V7.2.1: Log all agent credential operations — issuance,
  use, expiry — anomalous patterns detected through SIEM

**Advanced (L3)**
- Implement PKI-backed agent identities — certificate-based
  authentication verified through V9 communication security
  requirements
- V4.1.3: Include agent NHIs in privileged access reviews —
  same rigour as human privileged accounts, automated
  detection of privilege creep
- Conduct agent credential red team — attempt lateral
  movement using agent credentials, include in L3
  penetration testing scope

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
loaded at runtime alter agent behaviour. ASVS V10 (Malicious Code)
and V14 (Configuration) are the primary chapters — agent components
are software dependencies requiring the same supply chain controls
as any other third-party software.

#### ASVS mapping

| Requirement | ID | Level | How it applies |
|---|---|---|---|
| Verify third-party components current and vulnerability-free | V10.2.1 | L2 | All agent component libraries and dependencies scanned for CVEs — ML SBOM maintained |
| Verify only minimal approved external components used | V10.2.2 | L2 | Approved component list for all agent deployments — unsigned or unverified components rejected |
| Verify build pipelines include security checks | V14.2.2 | L2 | CI/CD pipeline for agent components includes integrity verification and vulnerability scanning |
| Threat modelling of all data flows | V1.1.2 | L2 | All agent supply chain component interactions threat-modelled — runtime dynamic loading explicitly in scope |

#### Mitigations by tier

**Foundational (L1)**
- Maintain ML SBOM as part of software asset inventory —
  every agent component (model, adapters, MCP servers,
  runtime libraries) inventoried with version and source
- Pin all component versions — no automatic updates in
  production without review and approval
- V10.2.1: Include agent component CVE scanning in
  vulnerability management — model inference libraries
  and MCP server dependencies scanned on schedule

**Hardening (L2)**
- V10.2.2: Establish approved component list for all
  agent deployments — only sourced from approved vendors,
  cryptographic signatures verified before loading
- V14.2.2: Integrate agent component integrity verification
  into build pipeline — unsigned or modified components
  rejected before deployment
- Scan all tool descriptors for hidden instructions before
  agent loading — any hidden instruction triggers rejection

**Advanced (L3)**
- Operate isolated agent component evaluation environment —
  behavioural testing before each production promotion,
  results in security test records
- V10.2.1: Conduct adversarial supply chain testing —
  attempt to introduce compromised components, verify
  detection mechanisms hold
- V1.1.2: Include runtime dynamic tool loading in threat
  model — MCP servers fetched at inference treated as
  untrusted until verified

#### Tools

| Tool | Type | Link |
|---|---|---|
| CycloneDX | Open-source | https://cyclonedx.org |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| OWASP Dependency-Check | Open-source | https://owasp.org/www-project-dependency-check/ |

#### Cross-references
- LLM Top 10: LLM03 Supply Chain Vulnerabilities
- DSGAI 2026: DSGAI04 Data Model and Artifact Poisoning
- Other frameworks: ISO 27001 A.5.19/A.5.21 · NIST AI RMF MP-5.1 · NIST SP 800-218A

---

### ASI05 — Unexpected Code Execution

**Severity:** Critical

Agents that generate and execute code become RCE gateways. ASVS V5
(Validation, Sanitization and Encoding) is the most critical chapter —
V5.2.4 prohibits eval and dynamic code execution of untrusted data,
which directly governs agent-generated code. V12 (Files and Resources)
adds requirements for safe file upload and execution contexts.

**ASVS framing:** Agent code execution is a V5.2.4 violation waiting
to happen. The requirement "verify that the application does not use
eval() or other dynamic code execution features" applies with full
force to agent-generated code — the agent is generating untrusted
content that must not be executed without strict sandboxing.

#### ASVS mapping

| Requirement | ID | Level | How it applies |
|---|---|---|---|
| Verify application does not use eval or dynamic code execution | V5.2.4 | L1 | No eval, exec, or equivalent on agent-generated content — absolute prohibition enforced through code review |
| Verify application protects against OS command injection | V5.2.5 | L1 | Agent-generated commands validated before execution — allowlisted operations only, no raw shell access |
| Verify file upload malware scanning | V12.1.1 | L2 | Agent-generated scripts scanned before execution — static analysis as a V12 file security control |
| Verify server-side upload path validation | V12.3.1 | L2 | Code execution sandbox prevents path traversal — no access outside designated execution directory |
| Verify untrusted data not passed to dynamic code | V14.5.1 | L3 | Structural guarantee that agent-generated content cannot reach an execution context without allowlist validation |

#### Mitigations by tier

**Foundational (L1)**
- V5.2.4: Enforce no eval or dynamic code execution of
  agent-generated content — absolute prohibition, verified
  through code review and static analysis in CI/CD pipeline
- V5.2.5: Validate all agent-generated commands before
  execution — allowlisted operations only, no raw shell
  or OS command access from agent-generated content
- Avoid agents with code execution capability unless
  strictly necessary — default position, document
  justification and security review if deployed

**Hardening (L2)**
- V12.1.1: Implement static analysis of all agent-generated
  code before execution — scan for operations outside the
  allowlist, reject before execution
- V12.3.1: Enforce sandbox path constraints — code execution
  sandbox prevents any path traversal outside designated
  scratch directory
- V5.2.4: Conduct SAST scan specifically targeting eval
  and dynamic code execution patterns in all agent
  integration code

**Advanced (L3)**
- V14.5.1: Structural guarantee that agent-generated content
  cannot reach execution context without allowlist validation —
  verified through architecture review and L3 penetration test
- Hardware-level sandboxing — gVisor or Firecracker documented
  as V14 configuration control
- V5.2.4: Include sandbox escape in penetration testing scope —
  attempt to execute arbitrary code through agent code
  generation paths, document results

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
across all future interactions. ASVS V8 (Data Protection) governs
agent memory stores as data assets. V5.1 input validation applies
to every write operation to agent memory — content entering memory
must be treated as untrusted input requiring validation.

#### ASVS mapping

| Requirement | ID | Level | How it applies |
|---|---|---|---|
| Verify sensitive data not cached in cleartext | V8.1.1 | L1 | Agent memory stores do not cache sensitive data in cleartext — encrypted at rest, access-controlled |
| Verify all inputs validated against allowlist | V5.1.1 | L1 | All content entering agent memory validated before write — indirect injection via memory is in scope |
| Verify all sensitive data encrypted at rest | V6.1.1 | L2 | All agent memory content encrypted at rest — same protection as equivalent data assets |
| Verify file upload malware scanning | V12.1.1 | L2 | Content validation on all agent memory ingestion — adversarial patterns detected before write |

#### Mitigations by tier

**Foundational (L1)**
- V8.1.1: Ensure agent memory stores do not cache sensitive
  data in cleartext — encrypted at rest, access-controlled
  from day one
- V5.1.1: Apply input validation to all agent memory write
  operations — content entering memory is untrusted input
  requiring V5 validation controls
- Enforce memory TTL — entries expire per defined retention
  policy, no indefinite persistence

**Hardening (L2)**
- V6.1.1: Encrypt all agent memory content at rest —
  embeddings and memory stores require same encryption
  treatment as equivalent source documents
- V12.1.1: Implement content validation on memory ingestion —
  anomalous patterns, adversarial content, path traversal
  attempts detected and rejected before write
- Log all memory write operations — provenance of content
  traceable, anomalous writes detectable from audit logs

**Advanced (L3)**
- Cryptographic integrity verification of memory store
  contents — tamper detection between write and read
  operations, verified in L3 security assessment
- Conduct memory poisoning scenarios in penetration testing —
  attempt injection via each content source the agent
  processes, verify detection and isolation controls hold
- V8.1.1: Automated memory purge on agent decommission —
  deletion verified, documented in data protection records

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
enable spoofing and agent-in-the-middle attacks. ASVS V9
(Communication Security) is the primary chapter — A2A channels
are communication paths requiring TLS, certificate validation, and
mutual authentication per V9. V4 access control adds authentication
requirements, and V5.3 adds output encoding requirements for all
A2A message content.

#### ASVS mapping

| Requirement | ID | Level | How it applies |
|---|---|---|---|
| Verify TLS used for all communications | V9.1.1 | L1 | All A2A communication encrypted — TLS 1.2 minimum, TLS 1.3 recommended |
| Verify certificate validity | V9.1.2 | L1 | All A2A certificates validated — no self-signed certificates in production without explicit trust establishment |
| Verify access control enforces least privilege | V4.1.3 | L1 | A2A channels authenticated — unique identity per agent, no ambient trust |
| Verify output encoding in all contexts | V5.3.1 | L1 | A2A message content encoded appropriately — schema validation on all inter-agent message payloads |
| Verify all access control decisions logged | V7.2.1 | L2 | All A2A authentication events logged — failed authentication, unusual patterns detectable |

#### Mitigations by tier

**Foundational (L1)**
- V9.1.1: Enforce TLS on all A2A communication channels —
  no cleartext agent messaging, TLS 1.2 minimum on all
  inter-agent message paths
- V9.1.2: Validate all A2A certificates — certificate
  pinning or strict CA validation, no certificate errors
  silently ignored
- V4.1.3: Authenticate all A2A messages — unique agent
  identity, no ambient trust between agents

**Hardening (L2)**
- V5.3.1: Implement schema validation on all A2A message
  payloads — reject unexpected or malformed message structures
- V7.2.1: Log all A2A authentication events — feed into SIEM,
  failed authentication and unusual patterns alerted
- Implement replay attack protection — message nonces,
  timestamps, and sequence numbers on all A2A channels

**Advanced (L3)**
- Implement mutual TLS for all production A2A channels —
  both sides authenticate, verified in L3 security assessment
- Short-lived agent identity certificates — automated
  rotation, certificate revocation capability tested
- V9.1.1: Conduct A2A security testing — spoofing, replay,
  and man-in-the-middle scenarios against your specific
  A2A channel implementation

#### Tools

| Tool | Type | Link |
|---|---|---|
| SPIFFE / SPIRE | Open-source | https://spiffe.io |
| cert-manager | Open-source | https://cert-manager.io |
| Linkerd | Open-source | https://linkerd.io |

#### Cross-references
- DSGAI 2026: DSGAI02 Agent Identity and Credential Exposure
- Other frameworks: OWASP NHI Top 10 · ISO 27001 A.8.24 · ISA/IEC 62443 SR 3.1 (OT)

---

### ASI08 — Cascading Agent Failures

**Severity:** High

Single-point faults propagate through multi-agent workflows into
system-wide incidents. ASVS V11 (Business Logic) is the primary
chapter — cascade containment is a business logic constraint
requirement. V13 (API and Web Service) adds rate limiting and
payload size requirements that prevent resource-exhaustion-triggered
cascades. V7 (Error Handling and Logging) adds the requirement
to handle failures gracefully.

**ASVS framing:** Cascading failures are a V11 business logic failure
(no cascade depth limit defined) compounded by a V7 error handling
failure (no graceful degradation) and a V13 rate limiting failure
(no resource caps preventing saturation). All three must be addressed.

#### ASVS mapping

| Requirement | ID | Level | How it applies |
|---|---|---|---|
| Verify application limits implement business limits | V11.1.4 | L2 | Cascade depth limits and blast radius constraints enforced as business logic limits — circuit breaker thresholds |
| Verify API rate limiting | V13.1.1 | L1 | Rate limiting on all agent API endpoints — A2A communication volume caps preventing saturation |
| Verify API rejects large unexpected payloads | V13.1.3 | L1 | Token and payload limits on all agent interfaces — resource exhaustion triggers rejected before cascade |
| Verify error handling does not expose sensitive data | V7.4.1 | L1 | Agent cascade errors handled gracefully — no sensitive information in error responses, fail-safe defaults |
| Verify all flows verified for timing issues | V11.1.6 | L3 | Race conditions in multi-agent coordination identified and addressed — concurrent action conflicts prevented |

#### Mitigations by tier

**Foundational (L1)**
- V13.1.1: Implement rate limiting on all agent API endpoints —
  A2A communication volume caps, hard limits enforced at
  the gateway before reaching orchestration logic
- V13.1.3: Set payload and token limits on all agent
  interfaces — resource-exhaustion-triggering inputs
  rejected before they can initiate cascade
- V7.4.1: Implement graceful degradation for all agent
  failures — fail-safe defaults, no sensitive information
  in error responses, operators notified

**Hardening (L2)**
- V11.1.4: Enforce cascade depth limits and blast radius
  constraints as business logic limits — circuit breaker
  thresholds defined and tested before each deployment
- Segment agent clusters — blast radius bounded by design,
  failure in one cluster cannot cascade to adjacent clusters
- Operator-accessible kill switch — V11 business constraint,
  documented and tested before production

**Advanced (L3)**
- V11.1.6: Identify and address timing issues in multi-agent
  coordination — race conditions in concurrent agent
  action scenarios tested and resolved
- Conduct chaos engineering — intentional fault injection,
  circuit breaker effectiveness verified against defined
  blast radius
- V13.1.1: Include cascade resilience in L3 penetration
  test scope — verify rate limiting and circuit breakers
  hold under adversarial load conditions

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
exploit operators into approving harmful actions. ASVS V14.5
(HTTP Security Headers — including content type enforcement) and
V7.4 (error and state handling) apply to preventing UI deception.
V11.1 business logic controls apply to ensuring approval flows
cannot be bypassed through conversational manipulation.

**ASVS framing:** Trust exploitation is a V14 interface security
failure (advisory status not enforced at the UI layer) compounded
by a V11 business logic failure (approval flows accessible through
the agent chat interface). The fix is structural: advisory output
clearly distinguished at the rendering layer, approval flows
separated from the agent conversation channel.

#### ASVS mapping

| Requirement | ID | Level | How it applies |
|---|---|---|---|
| Verify application does not contain client-side secrets | V14.5.1 | L1 | Agent identity disclosure enforced — users cannot be deceived about AI nature through client-side manipulation |
| Verify error handling does not expose sensitive data | V7.4.1 | L1 | Agent advisory status clearly rendered — users cannot mistake AI output for authoritative source |
| Verify business logic abuse scenarios identified | V11.1.2 | L2 | Trust exploitation scenarios identified in business logic threat model — approval flow bypass scenarios documented |
| Verify application limits prevent abuse | V11.1.4 | L2 | Approval flows cannot be triggered or bypassed through agent conversation — separate interface required |

#### Mitigations by tier

**Foundational (L1)**
- V7.4.1: Ensure agent advisory status is clearly rendered
  in all interface contexts — users cannot mistake AI
  output for authoritative source through any rendering
  environment
- V14.5.1: Enforce AI identity disclosure at the application
  layer — users receive clear indication of AI interaction
  through verified interface controls, not just system
  prompt instruction
- Separate agent conversation from security approval flows —
  approval mechanisms are independent server-side controls

**Hardening (L2)**
- V11.1.2: Identify trust exploitation as a business logic
  abuse scenario — document in threat model, treatment
  controls assigned, approval flow bypass scenarios tested
- V11.1.4: Enforce approval flow separation — chat interface
  cannot trigger or bypass security approvals, structural
  guarantee verified through code review
- Implement output filtering to detect and block manipulative
  language patterns in agent responses

**Advanced (L3)**
- Conduct trust exploitation scenarios in penetration testing —
  test how effectively users identify manipulated agent
  recommendations in your specific deployment context
- V11.1.2: Verify approval flows cannot be bypassed through
  any agent conversation path — include in L3 business
  logic test scope
- Aggregate decision pattern monitoring — alert on patterns
  of systematic approval without independent verification

#### Cross-references
- LLM Top 10: LLM09 Misinformation
- DSGAI 2026: DSGAI21 Disinformation and Integrity Attacks
- Other frameworks: EU AI Act Art. 50/52 · AIUC-1 C/F · ISO 42001 A.8.1

---

### ASI10 — Rogue Agents

**Severity:** Critical

Malicious or compromised agents pursue hidden goals while appearing
compliant. ASVS V7 (Error Handling and Logging) is the most critical
chapter — without comprehensive logging per V7.2, a rogue agent
has no detection surface. V4 access control limits the blast radius
of rogue behaviour. V11 business logic constrains what a rogue agent
can accomplish within the system.

**ASVS framing:** Rogue agent detection depends entirely on V7.2
comprehensive logging — without it, no detection mechanism can
function. V4 least privilege bounds what a rogue agent can achieve —
a rogue agent with narrow scope causes bounded damage before
containment. V11 business logic constraints limit the action sequences
available to a rogue agent regardless of its internal goal state.

#### ASVS mapping

| Requirement | ID | Level | How it applies |
|---|---|---|---|
| Verify all security events logged | V7.2.1 | L2 | Comprehensive logging of all agent actions — tool invocations, data access, goal state, recommendations |
| Verify all business logic decisions logged | V7.2.2 | L2 | All agent business logic decisions logged — every recommendation, every goal state transition, every tool call |
| Verify access control enforces least privilege | V4.1.3 | L1 | Rogue agent cannot exceed defined permission scope — least privilege bounds blast radius |
| Verify business logic abuse scenarios identified | V11.1.2 | L2 | Rogue agent scenarios identified in business logic threat model — persistent hidden goal detection approach documented |
| Verify application limits enforce business limits | V11.1.4 | L2 | Scope constraints enforced — rogue agent cannot self-expand capability or load additional tools |

#### Mitigations by tier

**Foundational (L1)**
- V4.1.3: Enforce least privilege on all agent capabilities —
  rogue agent with narrow scope causes bounded damage before
  containment, implement before any production deployment
- Operator-accessible kill switch — absolute V11 business
  constraint, documented and tested before production
- Enable comprehensive audit logging — no production agent
  deployment without full V7.2 logging coverage

**Hardening (L2)**
- V7.2.1/V7.2.2: Collect all agent security events and
  business logic decisions in audit logs — integrate into
  SIEM, behavioural baseline deviation generates tiered
  response: log, alert, suspend, investigate
- V11.1.2: Identify rogue agent scenarios in business logic
  threat model — detection capability, blast radius, and
  defined response procedures documented per deployment
- V11.1.4: Enforce scope constraints at the orchestration
  layer — rogue agent cannot self-expand capability
  through any available mechanism

**Advanced (L3)**
- V7.2.1: Conduct rogue agent scenarios in penetration testing —
  simulate persistent hidden goal pursuit across extended
  sessions, verify detection capability through L3 assessment
- Establish behavioural baseline — expected invocation
  patterns and recommendation distributions documented,
  deviation triggers defined response
- Multi-agent consensus for high-stakes decisions — rogue
  single agent cannot influence critical outputs without
  cross-validation, verified in L3 business logic testing

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

## ASVS verification checklist for agentic AI applications

### L1 — Baseline (all agentic deployments)

- [ ] V5.1.1: Input validation on all agent input channels — including indirect content sources
- [ ] V5.2.4: No eval or dynamic code execution of agent-generated content
- [ ] V5.2.5: All agent-generated commands validated before execution
- [ ] V4.1.1/V4.1.3: Least privilege on all agent tool and system access
- [ ] V4.1.1: Irreversible tool operations protected — human confirmation required
- [ ] V8.1.1: Agent memory stores do not cache sensitive data in cleartext
- [ ] V9.1.1/V9.1.2: All A2A communication encrypted with validated certificates
- [ ] V7.4.1: Graceful degradation — fail-safe defaults, no sensitive data in error responses
- [ ] V13.1.1: Rate limiting on all agent API and A2A endpoints
- [ ] V13.1.3: Payload and token limits enforced on all agent interfaces

### L2 — Standard (agentic deployments with sensitive data)

- [ ] V1.1.2: All agent data flows in threat model — every content source mapped
- [ ] V7.2.1/V7.2.2: All agent security events and business logic decisions logged
- [ ] V10.2.1/V10.2.2: Agent supply chain — CVE scanning, approved component list
- [ ] V14.2.2: Build pipeline includes agent component integrity verification
- [ ] V11.1.2: Business logic abuse scenarios identified — goal hijack, tool misuse, rogue agent
- [ ] V11.1.4: Business logic limits enforced — cascade depth, scope constraints, approval flows
- [ ] V2.6.1: Agent credentials generated with sufficient entropy
- [ ] V2.10.1: No hardcoded agent credentials anywhere
- [ ] V6.1.1: All agent memory content encrypted at rest
- [ ] V12.1.1: Content validation on agent memory and code execution ingestion

### L3 — Advanced (high-assurance agentic deployments)

- [ ] Goal hijack adversarial testing — all indirect injection surfaces covered
- [ ] Tool misuse penetration testing — destructive parameter injection scenarios
- [ ] Agent credential abuse — lateral movement testing
- [ ] Supply chain adversarial testing — compromised component introduction
- [ ] Sandbox escape testing for any code execution agents
- [ ] A2A security testing — spoofing, replay, MITM scenarios
- [ ] Cascade resilience testing — circuit breaker effectiveness under adversarial load
- [ ] Rogue agent penetration testing — persistent hidden goal simulation
- [ ] V11.1.6: Timing issues in multi-agent coordination identified and resolved
- [ ] V14.5.1: Trust exploitation scenarios tested — approval flow bypass verification

---

## Implementation priority by ASVS level

| Phase | ASI entries | ASVS level | Priority requirements |
|---|---|---|---|
| 1 — L1 baseline | ASI01, ASI02, ASI07, ASI08 | L1 | V5.1.1, V4.1.3, V9.1.1, V13.1.1 |
| 2 — L1 complete | ASI03, ASI05, ASI09 | L1 | V4.1.1, V5.2.4, V7.4.1 |
| 3 — L2 standard | ASI04, ASI06, ASI10 | L2 | V10.2.1, V7.2.1, V6.1.1, V11.1.4 |
| 4 — L2 complete | ASI08, ASI10 | L2 | V11.1.2, V11.1.4 — business logic abuse scenarios |
| 5 — L3 advanced | All | L3 | Adversarial testing, red team, rogue agent simulation |

---

## References

- OWASP ASVS 4.0.3: https://owasp.org/www-project-application-security-verification-standard/
- OWASP ASVS GitHub: https://github.com/OWASP/ASVS
- OWASP Agentic Top 10 2026: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- OWASP NHI Top 10: https://owasp.org/www-project-non-human-identities-top-10/
- OWASP AI Testing Guide: https://owasp.org/www-project-ai-testing-guide/
- LLM Top 10 x ASVS mapping: see LLM_ASVS.md in this repository

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — ASI01-ASI10 full entries with L1/L2/L3 verification requirements and full checklist | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
