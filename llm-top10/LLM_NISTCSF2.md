<!--
  GenAI Security Crosswalk
  Source list : OWASP Top 10 for LLM Applications 2025 (LLM01-LLM10)
  Framework   : NIST Cybersecurity Framework 2.0 (CSF 2.0)
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# LLM Top 10 2025 x NIST CSF 2.0

Mapping the [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/)
to the [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
published February 2024.

CSF 2.0 is the most widely adopted cybersecurity framework globally,
used by organisations across all sectors and sizes. The 2.0 revision
added a sixth function — GOVERN — making it the first version of the
CSF to explicitly address organisational governance, risk management
culture, and supply chain cybersecurity risk as first-class framework
elements. All six are directly relevant to LLM application security.

CSF 2.0 is framework-agnostic and outcome-oriented: it describes what
to achieve, not prescriptively how. Use this mapping alongside the
ISO 27001, NIST AI RMF, and CIS Controls mappings in this repo for
implementation-level detail. CSF 2.0 is the governance layer; the
other frameworks provide the technical controls.

---

## CSF 2.0 functions

| Function | Abbreviation | Core purpose |
|---|---|---|
| GOVERN | GV | Organisational context, risk strategy, roles, policy, supply chain |
| IDENTIFY | ID | Asset management, risk assessment, improvement |
| PROTECT | PR | Access control, awareness, data security, platform security, resilience |
| DETECT | DE | Continuous monitoring, adverse event analysis |
| RESPOND | RS | Incident management, analysis, mitigation, communication |
| RECOVER | RC | Incident recovery, communication, improvements |

---

## Quick-reference summary

| ID | Name | Severity | Primary CSF 2.0 Categories | Tier |
|---|---|---|---|---|
| LLM01 | Prompt Injection | Critical | GV.RM-06, PR.PS-04, DE.CM-09, RS.MA-02 | Foundational-Advanced |
| LLM02 | Sensitive Information Disclosure | High | PR.DS-01, PR.DS-02, PR.AA-05, DE.CM-01 | Foundational-Advanced |
| LLM03 | Supply Chain Vulnerabilities | High | GV.SC-06, GV.SC-07, ID.RA-01, PR.PS-02 | Foundational-Hardening |
| LLM04 | Data and Model Poisoning | Critical | PR.DS-01, PR.PS-04, DE.CM-09, RS.MA-02 | Hardening-Advanced |
| LLM05 | Insecure Output Handling | High | PR.PS-04, PR.PS-02, DE.CM-01, RS.MA-01 | Foundational-Hardening |
| LLM06 | Excessive Agency | High | GV.RM-06, PR.AA-05, PR.AA-02, DE.CM-01 | Foundational-Hardening |
| LLM07 | System Prompt Leakage | High | PR.DS-01, PR.AA-05, DE.CM-01, ID.AM-01 | Foundational-Hardening |
| LLM08 | Vector and Embedding Weaknesses | Medium | PR.DS-01, PR.DS-02, DE.CM-09, PR.AA-05 | Hardening-Advanced |
| LLM09 | Misinformation | Medium | GV.RM-06, DE.CM-09, RS.MA-01, GV.OC-01 | Foundational-Hardening |
| LLM10 | Unbounded Consumption | Medium | PR.IR-01, DE.CM-01, RS.MA-02, RC.RP-02 | Foundational-Hardening |

---

## Audience tags

- **CISO / governance** — full file, CSF 2.0 organisational profile for LLM applications
- **Risk manager** — GV and ID function categories
- **Security engineer** — PR, DE, RS function categories
- **Compliance officer** — GV.SC supply chain categories, regulatory alignment
- **Executive / board** — GV.OC organisational context, GV.RM risk management
- **OT engineer** — LLM01, LLM04, LLM10 with ISA 62443 crosswalk notes

---

## Detailed mappings

---

### LLM01 — Prompt Injection

**Severity:** Critical

Malicious instructions in user input or processed content manipulate
LLM behaviour, bypassing safety controls and executing unauthorised
actions. In CSF 2.0 terms this is a platform security failure (PR.PS)
and a risk management governance gap (GV.RM) — organisations that
have not identified prompt injection as a foreseeable risk cannot
have appropriate controls in place.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Prompt injection documented as a foreseeable risk in the organisational risk register — treatment decisions made and owned |
| Platform security — software integrity | PR.PS-04 | PROTECT | Secure software development practices applied to LLM integration code — input validation as a platform security control |
| Continuous monitoring | DE.CM-09 | DETECT | Runtime monitoring for prompt injection indicators on all LLM input channels |
| Incident analysis | RS.MA-02 | RESPOND | Prompt injection incidents analysed — indicators of compromise documented, root cause identified |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Add prompt injection to the organisational risk
  register — document as a foreseeable risk for every LLM
  integration, assign an owner and treatment decision
- PR.PS-04: Establish secure development practice requiring
  input validation for all LLM integrations — enforced
  through code review, not just guidelines
- Treat all external content processed by the LLM as
  untrusted regardless of source — policy documented

**Hardening**
- DE.CM-09: Deploy runtime monitoring for injection indicators
  on all LLM input channels — alerts integrated into
  security operations workflow
- Include prompt injection in security testing programme —
  direct, indirect via RAG, and jailbreak vectors tested
  before each production release
- RS.MA-02: Define incident response procedures for confirmed
  prompt injection — containment, impact scoping, root cause

**Advanced**
- Implement architectural separation between system prompt
  and user input — structural control, not just policy
- Extend DE.CM-09 monitoring to cover all indirect injection
  surfaces specific to your deployment — RAG sources, tool
  descriptors, document processing pipelines
- Conduct adversarial testing quarterly — novel injection
  techniques tested before they reach production

#### Tools

| Tool | Type | Link |
|---|---|---|
| Garak | Open-source | https://github.com/leondz/garak |
| LLM Guard | Open-source | https://github.com/protectai/llm-guard |
| Rebuff | Open-source | https://github.com/protectai/rebuff |

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack
- DSGAI 2026: DSGAI01 Sensitive Data Leakage
- Other frameworks: ISO 27001 A.8.28 · NIST AI RMF MS-2.5 · CIS Controls CIS 16

---

### LLM02 — Sensitive Information Disclosure

**Severity:** High

LLMs expose PII, credentials, financial data, or proprietary content
through outputs — from training data memorisation or over-permissive
RAG retrieval. CSF 2.0 PR.DS (data security) is the primary function —
data protection controls must extend to all LLM data assets including
embeddings, caches, and derived content.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Data security — data at rest | PR.DS-01 | PROTECT | All LLM data assets encrypted at rest — training data, embeddings, RAG stores, prompt caches |
| Data security — data in transit | PR.DS-02 | PROTECT | All LLM data flows encrypted in transit — API calls, RAG retrieval, observability pipelines |
| Identity management — least privilege | PR.AA-05 | PROTECT | RAG retrieval access controls — users retrieve only data they are authorised to access |
| Continuous monitoring | DE.CM-01 | DETECT | DLP monitoring on all LLM output channels — PII and sensitive patterns detected before delivery |

#### Mitigations by tier

**Foundational**
- PR.DS-01: Encrypt all LLM data assets at rest —
  training corpora, embedding databases, RAG document
  stores, prompt caches, and observability logs
- PR.AA-05: Implement access controls on RAG data sources —
  users retrieve only documents they are authorised to
  access, enforced at the retrieval layer
- ID.AM-01: Inventory all LLM data assets — training data,
  embeddings, RAG sources, outputs — know what exists
  before you can protect it

**Hardening**
- PR.DS-02: Enforce encryption on all LLM data flows in
  transit — API calls, RAG retrieval, embedding pipelines,
  observability streams
- DE.CM-01: Deploy DLP monitoring on all LLM output channels —
  PII and sensitive patterns detected and alerted before
  responses reach users
- Apply output redaction for sensitive patterns — masking
  before responses leave the LLM service boundary

**Advanced**
- Apply differential privacy in training and embedding
  generation for sensitive corpora
- Conduct model inversion red team exercises — validate
  that sensitive training data cannot be reconstructed
- Extend DE.CM-01 to cover all derived assets —
  embeddings, summaries, cached retrievals

#### Tools

| Tool | Type | Link |
|---|---|---|
| Microsoft Presidio | Open-source | https://github.com/microsoft/presidio |
| Nightfall AI | Commercial | https://nightfall.ai |

#### Cross-references
- Agentic Top 10: ASI03 Identity and Privilege Abuse
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI18 Inference and Data Reconstruction
- Other frameworks: ISO 27001 A.8.11/A.8.12 · NIST AI RMF GV-1.6 · EU AI Act Art. 10

---

### LLM03 — Supply Chain Vulnerabilities

**Severity:** High

LLM applications depend on third-party model weights, datasets,
libraries, and plugins. CSF 2.0 added GV.SC (supply chain risk
management) as a new governance category in the 2.0 revision —
it is the primary framework anchor for LLM component supply chain
security.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Supply chain risk management — suppliers | GV.SC-06 | GOVERN | Security requirements applied to all LLM component vendors — provenance, integrity, disclosure obligations |
| Supply chain risk management — due diligence | GV.SC-07 | GOVERN | Due diligence conducted on all LLM component vendors before use in production |
| Risk assessment — threat identification | ID.RA-01 | IDENTIFY | Supply chain attack vectors identified and assessed for each LLM component source |
| Platform security — approved software | PR.PS-02 | PROTECT | Only approved, integrity-verified LLM components permitted in production |

#### Mitigations by tier

**Foundational**
- GV.SC-06: Establish supply chain security requirements
  for all LLM component vendors — provenance documentation,
  integrity guarantees, and vulnerability disclosure
  obligations required before any component enters
  production
- PR.PS-02: Maintain approved component list for all LLM
  deployments — only sourced from approved vendors,
  cryptographic signatures verified before deployment
- Maintain ML SBOM for every production LLM — model,
  adapters, inference runtime, and libraries

**Hardening**
- GV.SC-07: Conduct security due diligence on all LLM
  component vendors — assess security practices, incident
  history, and vulnerability notification responsiveness
- ID.RA-01: Identify supply chain attack vectors per
  component — assess which components represent the
  highest supply chain risk in your deployment
- Pin all component versions — no automatic updates
  in production without review and approval

**Advanced**
- Operate isolated model evaluation environment —
  backdoor detection testing before each production
  promotion
- Conduct adversarial supply chain testing — attempt
  to introduce compromised components and verify detection
- GV.SC-06: Establish responsible disclosure relationship
  with LLM vendors — defined vulnerability notification
  SLA, tested annually

#### Tools

| Tool | Type | Link |
|---|---|---|
| CycloneDX | Open-source | https://cyclonedx.org |
| ModelScan | Open-source | https://github.com/protectai/modelscan |
| Syft | Open-source | https://github.com/anchore/syft |

#### Cross-references
- Agentic Top 10: ASI04 Agentic Supply Chain Vulnerabilities
- DSGAI 2026: DSGAI04 Data Model and Artifact Poisoning
- Other frameworks: ISO 27001 A.5.19/A.5.21 · NIST AI RMF MP-5.1 · NIST SP 800-218A

---

### LLM04 — Data and Model Poisoning

**Severity:** Critical

Attackers corrupt training datasets or model weights to embed
backdoors — effects baked into weights and invisible until a trigger
condition is reached. CSF 2.0 PR.DS data security and DE.CM monitoring
are the primary categories — poisoning is both a data integrity failure
and a detection gap.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Data security — data at rest | PR.DS-01 | PROTECT | Training data integrity controls — cryptographic lineage, source allowlisting, tamper detection |
| Platform security — software integrity | PR.PS-04 | PROTECT | Model integrity verification before each deployment — hash-based check against approved baseline |
| Continuous monitoring | DE.CM-09 | DETECT | Anomaly detection on training data distributions and model outputs — poisoning indicators monitored |
| Incident analysis | RS.MA-02 | RESPOND | Model rollback capability — approved baseline version available for immediate revert on poisoning detection |

#### Mitigations by tier

**Foundational**
- PR.DS-01: Implement training data integrity controls —
  source allowlisting, cryptographic lineage from source
  to training dataset, anomaly detection on distributions
- PR.PS-04: Implement model integrity verification before
  each deployment — hash-based check against approved
  baseline, deviation triggers rejection
- Establish model rollback capability — approved clean
  checkpoint always available, tested restoration procedure

**Hardening**
- DE.CM-09: Deploy anomaly detection on training pipelines
  and model outputs — statistical distribution shifts,
  unexpected capability changes, and backdoor trigger
  patterns monitored
- Include poisoning detection in security testing —
  backdoor trigger testing before every production
  model promotion
- GV.SC-06: Apply supply chain security requirements to
  all training data sources — provenance and integrity
  guarantees required

**Advanced**
- Conduct post-training backdoor detection as a mandatory
  pre-deployment gate
- Apply differential privacy during training — document
  as PR.DS data protection measure
- RS.MA-02: Define incident response for confirmed poisoning —
  model rollback procedure, downstream impact assessment,
  root cause investigation before redeployment

#### Tools

| Tool | Type | Link |
|---|---|---|
| IBM Adversarial Robustness Toolbox | Open-source | https://github.com/Trusted-AI/adversarial-robustness-toolbox |
| CleanLab | Open-source | https://github.com/cleanlab/cleanlab |
| Great Expectations | Open-source | https://greatexpectations.io |

#### Cross-references
- Agentic Top 10: ASI06 Memory and Context Poisoning
- DSGAI 2026: DSGAI04 Data Model and Artifact Poisoning, DSGAI21 Disinformation via Data Poisoning
- Other frameworks: NIST AI RMF MS-3.3 · MITRE ATLAS AML.T0032 · ISO 27001 A.8.27

---

### LLM05 — Insecure Output Handling

**Severity:** High

LLM output passed to downstream systems without validation enables
XSS, command injection, or SQL injection via AI-generated content.
CSF 2.0 PR.PS platform security requires secure software development
practices — output validation is a platform security control.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Platform security — software integrity | PR.PS-04 | PROTECT | Secure coding requirements mandating output encoding and validation before passing to downstream systems |
| Platform security — approved software | PR.PS-02 | PROTECT | Allowlisted output formats enforced — only outputs conforming to defined safe structures passed downstream |
| Continuous monitoring | DE.CM-01 | DETECT | Runtime monitoring for injection patterns in LLM output channels |
| Incident analysis | RS.MA-01 | RESPOND | Incident response for output injection events — containment, affected system identification |

#### Mitigations by tier

**Foundational**
- PR.PS-04: Establish secure coding practice requiring that
  all LLM output is treated as untrusted input to downstream
  systems — encoding, validation, and sanitisation mandatory
- Never pass raw LLM output to database queries, shell
  commands, or eval functions — enforced through code review
- DE.CM-01: Enable logging of all LLM outputs — injection
  patterns in model responses detectable through log analysis

**Hardening**
- PR.PS-02: Implement output schema validation — only
  outputs conforming to predefined safe structures passed
  to downstream consumers
- Include output injection in security testing programme —
  XSS, SQL injection, and command injection via LLM output
  tested before each release
- RS.MA-01: Define incident response for output injection —
  which downstream systems are affected, containment steps,
  forensic evidence preservation

**Advanced**
- Deploy dedicated output security layer independent of
  the LLM — structural guarantee against output injection
- Conduct DAST on all interfaces consuming LLM output —
  test injection scenarios against your specific downstream
  consumers
- DE.CM-01: Extend monitoring to cover all LLM output
  paths including background task queues and batch outputs

#### Tools

| Tool | Type | Link |
|---|---|---|
| OWASP ZAP | Open-source | https://www.zaproxy.org |
| Semgrep | Open-source | https://semgrep.dev |

#### Cross-references
- Agentic Top 10: ASI02 Tool Misuse, ASI05 Unexpected Code Execution
- DSGAI 2026: DSGAI05 Data Integrity and Validation Failures, DSGAI12 Unsafe NL Data Gateways
- Other frameworks: OWASP ASVS V5 · CIS Controls CIS 16 · CWE-79

---

### LLM06 — Excessive Agency

**Severity:** High

LLMs with excessive autonomy over tools and systems execute
unintended or harmful actions when manipulated. CSF 2.0 GV.RM
risk management strategy and PR.AA access management are the
primary categories — excessive agency is simultaneously a governance
failure and an access control failure.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Policy defining permissible LLM autonomous actions — documented as a risk management strategy decision |
| Identity management — least privilege | PR.AA-05 | PROTECT | LLM tool access managed at minimum required scope — least privilege enforced and reviewed |
| Access management — account management | PR.AA-02 | PROTECT | LLM tool permissions managed as privileged access — lifecycle management including regular review |
| Continuous monitoring | DE.CM-01 | DETECT | All LLM tool invocations logged — anomalous patterns detected and alerted |

#### Mitigations by tier

**Foundational**
- GV.RM-06: Document organisational policy on LLM autonomous
  actions — what actions require human confirmation, what
  tool access is permitted per deployment context
- PR.AA-05: Enforce least privilege on all LLM tool access —
  read-only by default, write access requires documented
  justification and is scoped to minimum required operations
- Require human confirmation for all irreversible actions —
  separate confirmation interface, not the LLM chat itself

**Hardening**
- PR.AA-02: Manage LLM tool permissions as privileged access —
  formal lifecycle management, regular reviews, any permission
  not actively used is removed
- DE.CM-01: Log all LLM tool invocations with full context —
  tool identity, parameters, user session, timestamp —
  immutable audit trail
- Deploy action guardrails as an independent layer from
  the model — structural enforcement of permitted scope

**Advanced**
- Formally specify permitted action graphs — only
  pre-approved action sequences can execute in production
- Conduct red team exercises testing excessive agency
  through indirect prompt injection
- GV.RM-06: Include LLM excessive agency in board-level
  risk reporting — measurable governance objective

#### Tools

| Tool | Type | Link |
|---|---|---|
| Guardrails AI | Open-source | https://github.com/guardrails-ai/guardrails |
| NeMo Guardrails | Open-source | https://github.com/NVIDIA/NeMo-Guardrails |

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack, ASI02 Tool Misuse
- DSGAI 2026: DSGAI06 Tool Plugin and Agent Data Exchange
- Other frameworks: AIUC-1 B006 · ISO 27001 A.8.2 · ISA/IEC 62443 SR 2.1 (OT)

---

### LLM07 — System Prompt Leakage

**Severity:** High

System prompts containing internal instructions or security controls
are extracted by adversaries — enabling targeted attacks. CSF 2.0
PR.DS data security applies to system prompts as sensitive
configuration data.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Asset management | ID.AM-01 | IDENTIFY | System prompts inventoried as sensitive assets — classified and governed accordingly |
| Data security — data at rest | PR.DS-01 | PROTECT | System prompts encrypted at rest — not stored in cleartext configuration files |
| Identity management — least privilege | PR.AA-05 | PROTECT | System prompt access restricted to authorised personnel — version controlled, access logged |
| Continuous monitoring | DE.CM-01 | DETECT | Access to system prompt storage logged — anomalous access attempts detectable |

#### Mitigations by tier

**Foundational**
- ID.AM-01: Inventory all system prompts as sensitive assets —
  classified at the same level as application secrets and
  operational configuration
- PR.DS-01: Encrypt all system prompts at rest — never stored
  in cleartext source code, configuration files, or
  environment variables without encryption
- PR.AA-05: Restrict system prompt access — version controlled,
  access controlled, all access logged

**Hardening**
- DE.CM-01: Monitor and retain system prompt access logs —
  detect and alert on anomalous access patterns
- Conduct prompt extraction testing before each deployment —
  verify extraction resistance under known attack techniques
- Remove all secrets and sensitive identifiers from system
  prompts — use runtime token resolution instead

**Advanced**
- Implement system prompt tokenisation — sensitive phrases
  replaced with opaque tokens resolved at runtime
- Deploy output classifier to detect and block responses
  containing system prompt content
- GV.RM-06: Include system prompt security in risk register —
  formal risk with defined treatment and measurement criteria

#### Cross-references
- Agentic Top 10: ASI01 Agent Goal Hijack
- DSGAI 2026: DSGAI15 Over-Broad Context Windows
- Other frameworks: AIUC-1 B003/B009 · CWE-200 · CIS Controls CIS 3

---

### LLM08 — Vector and Embedding Weaknesses

**Severity:** Medium

Weaknesses in vector stores enable adversarial retrieval manipulation
and inference of sensitive information from embeddings. CSF 2.0
PR.DS data security covers the embedding stores as data assets
requiring protection.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Data security — data at rest | PR.DS-01 | PROTECT | All vector store content encrypted at rest — embeddings require same protection as source documents |
| Data security — data in transit | PR.DS-02 | PROTECT | All vector store communication encrypted in transit — query and response paths |
| Continuous monitoring | DE.CM-09 | DETECT | Anomaly detection on vector store query patterns — bulk extraction and poisoning indicators |
| Identity management — least privilege | PR.AA-05 | PROTECT | RBAC on all vector store collections — no unauthenticated access in any environment |

#### Mitigations by tier

**Foundational**
- PR.AA-05: Enable RBAC on all vector store collections —
  no unauthenticated access in any environment including
  development and staging
- PR.DS-01: Encrypt all vector store content at rest —
  embeddings can leak source content through inversion
  attacks if unencrypted
- Patch all known vector database CVEs promptly —
  CVE-2024-3584 class vulnerabilities treated as urgent

**Hardening**
- DE.CM-09: Implement anomaly detection on vector store
  query patterns — alert on bulk extraction and unusual
  retrieval volumes
- Apply trust-tiered retrieval — weight results by source
  provenance and trust score alongside semantic similarity
- PR.DS-02: Enforce TLS on all vector store communication

**Advanced**
- Apply differential privacy in embedding generation for
  sensitive corpora — document privacy budget
- Conduct embedding inversion testing — validate source
  content cannot be reconstructed from embeddings
- DE.CM-09: Integrate vector store anomaly alerts into
  SIEM — unusual patterns treated as potential reconnaissance

#### Tools

| Tool | Type | Link |
|---|---|---|
| Weaviate | Open-source | https://weaviate.io |
| Qdrant | Open-source | https://qdrant.tech |
| ML Privacy Meter | Open-source | https://github.com/privacytrustlab/ml_privacy_meter |

#### Cross-references
- Agentic Top 10: ASI06 Memory and Context Poisoning
- DSGAI 2026: DSGAI13 Vector Store Platform Security, DSGAI18 Inference and Data Reconstruction
- Other frameworks: NIST AI RMF MS-2.5 · ISO 27001 A.8.3/A.8.24 · CWE-284

---

### LLM09 — Misinformation

**Severity:** Medium

LLMs generate plausible but incorrect content that users or downstream
systems act upon. CSF 2.0 GV.OC organisational context and GV.RM
risk management are the governance anchors — defining the acceptable
accuracy threshold for LLM advisory outputs is a governance decision
that must precede deployment.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Risk management strategy | GV.RM-06 | GOVERN | Acceptable accuracy thresholds for LLM outputs defined per use case — low-confidence outputs require human verification |
| Organisational context | GV.OC-01 | GOVERN | Stakeholders informed of LLM output limitations — users and deployers understand advisory nature |
| Continuous monitoring | DE.CM-09 | DETECT | Production monitoring for hallucination patterns — accuracy metrics tracked per domain, drift detected |
| Incident analysis | RS.MA-01 | RESPOND | Response for misinformation incidents — correction, notification, root cause investigation |

#### Mitigations by tier

**Foundational**
- GV.OC-01: Communicate LLM output limitations to all
  stakeholders — users, deployers, and operators trained
  before access is granted
- GV.RM-06: Define acceptable accuracy thresholds per
  deployment context — use cases requiring high accuracy
  require human verification before action
- Display source citations alongside LLM responses —
  users verify claims against cited sources before acting

**Hardening**
- DE.CM-09: Implement production monitoring for hallucination —
  accuracy metrics per domain, drift detection, alert when
  accuracy degrades beyond defined thresholds
- Deploy RAG grounded on authoritative, version-controlled
  sources — not uncontrolled web content
- RS.MA-01: Define incident response for misinformation events —
  who corrects the record, how affected users are notified

**Advanced**
- Build automated fact-checking for high-stakes output domains —
  accuracy gate before responses reach regulated workflows
- Conduct domain-specific accuracy testing before deployment —
  hallucination rate measured per equipment type, domain, use case
- GV.RM-06: Include misinformation risk in board-level AI
  risk reporting — measurable accuracy objectives reviewed

#### Tools

| Tool | Type | Link |
|---|---|---|
| TruLens | Open-source | https://github.com/truera/trulens |
| RAGAS | Open-source | https://github.com/explodinggradients/ragas |
| DeepEval | Open-source | https://github.com/confident-ai/deepeval |

#### Cross-references
- Agentic Top 10: ASI09 Human-Agent Trust Exploitation
- DSGAI 2026: DSGAI21 Disinformation and Integrity Attacks
- Other frameworks: EU AI Act Art. 13/50 · AIUC-1 F · NIST AI RMF GV-1.7

---

### LLM10 — Unbounded Consumption

**Severity:** Medium

Adversarial inputs trigger disproportionate resource consumption —
causing denial of service or runaway API cost. CSF 2.0 PR.IR
infrastructure resilience and DE.CM monitoring are the primary
categories.

#### CSF 2.0 mapping

| Category | ID | Function | How it applies |
|---|---|---|---|
| Infrastructure resilience | PR.IR-01 | PROTECT | Rate limiting and resource controls implemented as resilience controls — LLM services protected against DoS |
| Continuous monitoring | DE.CM-01 | DETECT | Real-time monitoring of LLM resource consumption — cost anomaly detection and alerting |
| Incident analysis | RS.MA-02 | RESPOND | Automated response to consumption anomalies — rate limit tightening, session suspension, cost circuit breakers |
| Incident recovery | RC.RP-02 | RECOVER | Defined recovery procedures for LLM availability events — tested failover and graceful degradation |

#### Mitigations by tier

**Foundational**
- PR.IR-01: Implement rate limiting as a resilience control —
  hard caps per user, session, and API key enforced at
  the gateway before requests reach the model
- Set hard token limits on input and output per request —
  reject requests exceeding thresholds before inference
- DE.CM-01: Monitor LLM resource consumption in real time —
  cost spikes and unusual volume patterns alerted immediately

**Hardening**
- RS.MA-02: Define automated response for consumption anomalies —
  automated rate limit tightening, cost circuit breakers,
  owner notification workflow — not just alerting
- Per-tenant cost budgets with automatic suspension on breach
- PR.IR-01: Include LLM services in infrastructure resilience
  planning — BCP coverage, RTO and RPO defined

**Advanced**
- Deploy sponge example detection — inputs designed to
  maximise computation identified and rejected
- Conduct adversarial cost-maximisation testing — identify
  the highest-cost inputs for your model and guard those paths
- RC.RP-02: Test LLM failover and graceful degradation
  procedures — verified recovery time against defined RTO

#### Tools

| Tool | Type | Link |
|---|---|---|
| LiteLLM | Open-source | https://github.com/BerriAI/litellm |
| Kong Gateway | Open-source | https://github.com/Kong/kong |
| OpenTelemetry | Open-source | https://opentelemetry.io |

#### Cross-references
- Agentic Top 10: ASI08 Cascading Agent Failures
- DSGAI 2026: DSGAI17 Data Availability and Resilience Failures
- Other frameworks: ISA/IEC 62443 SR 7.6 (OT) · CIS Controls CIS 4/CIS 12 · CWE-400

---

## CSF 2.0 organisational profile for LLM applications

Use this profile to define current and target state for your LLM
security programme aligned to CSF 2.0.

| Function | Priority categories | Current state indicator | Target state |
|---|---|---|---|
| GOVERN | GV.RM-06, GV.SC-06, GV.OC-01 | LLM risks in risk register, supply chain policy documented | Board-level AI risk reporting, measurable objectives |
| IDENTIFY | ID.AM-01, ID.RA-01 | LLM assets inventoried, supply chain risks assessed | Continuous asset discovery, automated risk scoring |
| PROTECT | PR.DS-01/02, PR.AA-05, PR.PS-04 | Encryption at rest/transit, least privilege enforced, secure coding | DLP deployed, output redaction live, SBOM maintained |
| DETECT | DE.CM-01, DE.CM-09 | Basic logging active | Real-time anomaly detection, injection monitoring, consumption alerts |
| RESPOND | RS.MA-01, RS.MA-02 | Incident response plan exists | LLM-specific playbooks tested, automated response active |
| RECOVER | RC.RP-02 | Backup/restore documented | Failover tested, degraded mode validated, RTO/RPO met |

---

## Implementation priority

| Phase | LLM entries | CSF categories | Rationale |
|---|---|---|---|
| 1 — Do now | LLM01, LLM06 | GV.RM-06, PR.AA-05 | Risk register and least privilege close the most common breach paths |
| 2 — This sprint | LLM02, LLM07 | PR.DS-01, ID.AM-01 | Data asset inventory and encryption protect what already exists |
| 3 — This quarter | LLM03, LLM04 | GV.SC-06, PR.PS-04 | Supply chain and integrity require pipeline-level changes |
| 4 — Ongoing | LLM05, LLM08, LLM09, LLM10 | DE.CM-01/09, PR.IR-01 | Monitoring, resilience, output security, and misinformation hardening |

---

## References

- NIST Cybersecurity Framework 2.0: https://www.nist.gov/cyberframework
- CSF 2.0 full document: https://doi.org/10.6028/NIST.CSWP.29
- CSF 2.0 reference tool: https://csf.tools
- OWASP LLM Top 10 2025: https://genai.owasp.org/llm-top-10/
- NIST AI RMF 1.0: https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — LLM01-LLM10 full entries with CSF 2.0 profile | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
