<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks 2026 (DSGAI01-DSGAI21)
  Framework   : OWASP SAMM v2.0 — Software Assurance Maturity Model
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 × OWASP SAMM v2.0

Mapping the [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
(DSGAI01–DSGAI21) to the [OWASP Software Assurance Maturity Model (SAMM) v2.0](https://owaspsamm.org/) —
the framework for measuring and improving software security programme
maturity across the software development lifecycle.

---

## Why SAMM for GenAI data security

The DSGAI taxonomy documents 21 data-oriented risks that emerge when
organisations build, deploy, and operate GenAI systems. SAMM is the
right lens for these risks because it answers a question that pure
control frameworks cannot: **how mature does our security programme
need to be before we can safely operate these data flows?**

Three SAMM properties are especially valuable for DSGAI:

**Data governance is a SAMM Design problem.** DSGAI's risks — from
data, model & artifact poisoning (DSGAI04) to vector-store platform
weaknesses (DSGAI13) to model exfiltration (DSGAI20) — originate in
design decisions made before a single line of production code is
written. SAMM Design practices (D-TA, D-SR, D-SA) provide the
structured approach to catching these risks early.

**Implementation practices determine data pipeline security.** DSGAI
data risks live in pipelines: ingestion, preprocessing, embedding,
training, retrieval. SAMM's Implementation function (I-SB, I-SD)
provides the maturity model for securing these pipelines.

**Operations maturity determines detection and response.** DSGAI
risks often manifest as subtle degradation — poisoned embeddings,
drifting model behaviour — rather than hard failures. SAMM Operations
practices (O-IM, O-OM, O-EM) provide the monitoring and incident
response maturity to detect and respond.

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
| DSGAI01 | Sensitive Data Leakage | Critical | D-SR, I-SB, V-ST, O-OM | L2 min / L3 high-risk | Foundational–Advanced |
| DSGAI02 | Agent Identity & Credential Exposure | Critical | D-SA, I-SD, G-PC, O-EM | L2 min / L3 high-risk | Hardening–Advanced |
| DSGAI03 | Shadow AI & Unsanctioned Data Flows | High | G-PC, G-SM, V-AA, O-EM | L2 min | Foundational–Hardening |
| DSGAI04 | Data, Model & Artifact Poisoning | Critical | D-TA, I-SB, V-ST, O-IM | L2 min / L3 high-risk | Hardening–Advanced |
| DSGAI05 | Data Integrity & Validation Failures | High | D-SR, I-SB, V-ST | L2 min | Foundational–Hardening |
| DSGAI06 | Tool, Plugin & Agent Data Exchange | High | D-SA, I-SB, V-ST, G-PC | L2 min | Foundational–Hardening |
| DSGAI07 | Data Governance, Lifecycle & Classification | High | G-PC, G-SM, D-SR, O-OM | L2 min | Foundational–Hardening |
| DSGAI08 | Non-Compliance & Regulatory Violations | High | G-PC, G-SM, D-SR, O-OM | L2 min | Foundational–Hardening |
| DSGAI09 | Multimodal Cross-Channel Data Leakage | High | D-TA, I-SB, V-ST | L2 min | Hardening–Advanced |
| DSGAI10 | Synthetic Data & Anonymisation Pitfalls | Medium | D-SR, V-ST, G-PC | L1 min | Hardening–Advanced |
| DSGAI11 | Cross-Context Conversation Bleed | High | D-SA, I-SB, V-ST, O-EM | L2 min | Hardening–Advanced |
| DSGAI12 | Unsafe NL Data Gateways | Critical | D-SR, I-SB, V-ST | L2 min / L3 high-risk | Foundational–Advanced |
| DSGAI13 | Vector Store Platform Security | High | D-SA, I-SD, V-AA, O-EM | L2 min | Foundational–Hardening |
| DSGAI14 | Excessive Telemetry & Monitoring Leakage | High | O-OM, G-PC, I-SB | L2 min | Foundational–Hardening |
| DSGAI15 | Over-Broad Context Windows | High | D-SA, D-SR, V-ST | L2 min | Hardening–Advanced |
| DSGAI16 | Endpoint & Browser Assistant Overreach | High | D-SA, I-SD, V-AA | L2 min | Foundational–Hardening |
| DSGAI17 | Data Availability & Resilience Failures | High | O-EM, O-IM, D-SA | L2 min | Foundational–Hardening |
| DSGAI18 | Inference & Data Reconstruction | High | D-TA, V-ST, O-OM | L2 min | Hardening–Advanced |
| DSGAI19 | Human-in-Loop & Labeler Overexposure | Medium | G-PC, D-SR, O-OM | L1 min | Foundational–Hardening |
| DSGAI20 | Model Exfiltration & IP Replication | High | D-TA, V-ST, O-OM, G-PC | L2 min | Hardening–Advanced |
| DSGAI21 | Disinformation via Data Poisoning | High | D-TA, I-SB, V-ST, O-IM | L2 min | Hardening–Advanced |

---

## Target audience

| Role | Files to prioritise |
|---|---|
| Security programme lead | Full file — maturity scorecard for DSGAI programme roadmap |
| Data engineer / ML engineer | Design and Implementation sections per relevant entry |
| AppSec / security engineer | Verification sections; V-ST test cases for data pipelines |
| Compliance / GRC | Governance columns, regulatory alignment notes |
| AI red team | V-ST columns — adversarial data pipeline testing |

---

## Detailed mappings

---

### DSGAI01 — Sensitive Data Leakage

PII, financial data, credentials, and proprietary content are exposed through
model outputs, RAG over-retrieval, training-data memorisation, or inadequate
output filtering — amplified when multiple sources aggregate in one context.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Requirements (D-SR) | A — Requirements | Data classification & handling requirements | L2 required | Define what data may enter prompts/RAG and how outputs must be filtered |
| Implementation / Secure Build (I-SB) | B — Software Dependencies | Output DLP in the response path | L2 required | Scan and redact PII/secrets before responses leave the system |
| Verification / Security Testing (V-ST) | B — Deep Testing | Leakage & over-retrieval test suite | L2 required | Probe for memorisation and RAG over-retrieval under low-privilege identities |
| Operations / Operational Management (O-OM) | A — Data Protection | Data-at-rest & access governance | L2 required | Encrypt corpora; enforce least-privilege on data stores feeding the model |

**Maturity target:** L2 minimum; L3 where leakage would breach regulated data.

#### Three-tier mitigations

**Tier 1 — Immediate:** inventory data entering context; enable output PII/secret redaction; enforce deny-by-default RAG access.
**Tier 2 — Short-term:** add leakage/over-retrieval tests to CI; encrypt corpora at rest; log retrieval decisions with principal + ACL.
**Tier 3 — Strategic:** D-SR L3 classification on all data sources; continuous DLP monitoring on the response path.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure)
- Agentic: ASI03 (Identity & Privilege Abuse)

---

### DSGAI02 — Agent Identity & Credential Exposure

Agent credentials, API keys, tokens, and service-account secrets are embedded
in prompts, cached in memory, or passed through tool calls where attackers can
extract or replay them.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Architecture (D-SA) | B — Architecture Design | Scoped, short-lived agent identities | L2 required | Each agent acts under a least-privilege, time-bound identity — never a shared secret |
| Implementation / Secure Deployment (I-SD) | A — Deployment Process | Secret management & injection | L2 required | Inject secrets from a vault at runtime; never bake them into prompts or images |
| Governance / Policy & Compliance (G-PC) | A — Policy & Standards | Credential-handling policy for agents | L2 required | Mandate rotation, scoping, and prohibition of secrets in model context |
| Operations / Environment Management (O-EM) | B — Configuration Hardening | Secret hygiene in agent runtime | L2 required | Scrub secrets from logs, memory, and tool payloads |

**Maturity target:** L2 minimum; L3 for agents with privileged tool access.

#### Three-tier mitigations

**Tier 1 — Immediate:** remove secrets from prompts/system messages; route all credentials through a vault.
**Tier 2 — Short-term:** issue scoped short-lived tokens per agent; secret-scan logs and tool payloads.
**Tier 3 — Strategic:** D-SA L3 per-agent identity model; automated rotation and replay detection.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency)
- Agentic: ASI03 (Identity & Privilege Abuse)

---

### DSGAI03 — Shadow AI & Unsanctioned Data Flows

Employees route corporate data through unapproved AI tools, creating
unmonitored egress and unmanaged data flows outside the security boundary.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Governance / Policy & Compliance (G-PC) | A — Policy & Standards | Sanctioned-AI policy & allowlist | L2 required | Define approved AI services and prohibited data classes |
| Governance / Strategy & Metrics (G-SM) | B — Application Risk Profile | Shadow-AI risk visibility | L2 required | Track unsanctioned-AI usage as a tracked programme metric |
| Verification / Architecture Assessment (V-AA) | A — Architecture Validation | Egress-path discovery | L2 required | Identify all paths by which data can reach external AI endpoints |
| Operations / Environment Management (O-EM) | A — Configuration | DLP / egress monitoring | L2 required | Detect and block data flow to non-allowlisted AI services |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** publish an approved-AI list and data-handling policy; enable egress logging.
**Tier 2 — Short-term:** deploy DLP rules blocking classified data to unsanctioned endpoints; survey actual usage.
**Tier 3 — Strategic:** G-SM L3 metrics on shadow-AI; sanctioned self-service alternatives reduce demand.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure)
- Agentic: ASI04 (Agentic Supply Chain)

---

### DSGAI04 — Data, Model & Artifact Poisoning

Attackers corrupt training data, fine-tuning sets, model weights, or RAG
corpora to implant backdoors or degrade integrity.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Threat Assessment (D-TA) | A — Threat Modeling | Poisoning threat model per data source | L2 required | Model every ingestion path as an integrity threat surface |
| Implementation / Secure Build (I-SB) | A — Build Process | Dataset/artifact integrity & provenance | L2 required | Verify checksums, signatures, and provenance on data and weights |
| Verification / Security Testing (V-ST) | B — Deep Testing | Backdoor / trigger probing | L2 required | Probe for trigger-conditioned behaviour and label-flip anomalies |
| Operations / Incident Management (O-IM) | A — Incident Detection | Integrity-drift alerting | L2 required | Alert on anomalous ingestion and behaviour drift |

**Maturity target:** L2 minimum; L3 where poisoning could cause harm or regulatory breach.

#### Three-tier mitigations

**Tier 1 — Immediate:** validate/quarantine anomalous records at ingest; verify weight signatures at load.
**Tier 2 — Short-term:** provenance-track all training/RAG sources; add poisoning tests to CI.
**Tier 3 — Strategic:** D-TA L3 refreshed per new data source; continuous integrity monitoring.

#### Cross-references

- LLM Top 10: LLM04 (Data and Model Poisoning)
- Agentic: ASI04 (Agentic Supply Chain)

---

### DSGAI05 — Data Integrity & Validation Failures

GenAI systems ingest data without sufficient validation, allowing malformed or
adversarial inputs to corrupt downstream behaviour.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Requirements (D-SR) | A — Requirements | Validation requirements per data boundary | L2 required | Specify schema/type/size validation at every ingestion point |
| Implementation / Secure Build (I-SB) | A — Build Process | Boundary validation in pipelines | L2 required | Enforce validation before data is persisted or used |
| Verification / Security Testing (V-ST) | B — Deep Testing | Malformed-input test suite | L2 required | Fuzz ingestion channels with malformed and adversarial records |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** schema-validate all ingested data; reject on violation with safe errors.
**Tier 2 — Short-term:** fuzz ingestion paths in CI; add integrity-drift detection.
**Tier 3 — Strategic:** formal data contracts between pipeline stages.

#### Cross-references

- LLM Top 10: LLM05 (Improper Output Handling)
- Agentic: ASI05 (Unexpected Code Execution)

---

### DSGAI06 — Tool, Plugin & Agent Data Exchange

Data exchanged with external tools, plugins, or sub-agents crosses trust
boundaries with insufficient validation in both directions.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Architecture (D-SA) | B — Architecture Design | Tool trust-boundary model | L2 required | Treat all tool I/O as crossing a trust boundary |
| Implementation / Secure Build (I-SB) | A — Build Process | Validate tool returns; minimise tool inputs | L2 required | Validate tool responses before use; send only required fields |
| Verification / Security Testing (V-ST) | B — Deep Testing | Untrusted tool-return tests | L2 required | Inject malicious tool responses and verify handling |
| Governance / Policy & Compliance (G-PC) | A — Policy & Standards | Third-party tool vetting | L2 required | Require review before a tool/plugin is connected |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** treat tool output as untrusted; strip sensitive fields from tool inputs.
**Tier 2 — Short-term:** add tool-return validation tests; maintain a vetted-tool registry.
**Tier 3 — Strategic:** D-SA L3 boundary model reviewed per new integration.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency)
- Agentic: ASI02 (Tool Misuse & Exploitation)

---

### DSGAI07 — Data Governance, Lifecycle & Classification

GenAI systems lack data classification, retention, and lifecycle controls,
leaving sensitive data unmanaged across its lifecycle.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Governance / Policy & Compliance (G-PC) | A — Policy & Standards | Data classification & retention policy | L2 required | Mandate classification and lifecycle rules for GenAI data |
| Governance / Strategy & Metrics (G-SM) | A — Create & Promote | Governance ownership & metrics | L2 required | Assign owners; track classification coverage |
| Design / Security Requirements (D-SR) | A — Requirements | Lifecycle requirements per data store | L2 required | Specify retention, deletion, and access per data class |
| Operations / Operational Management (O-OM) | A — Data Protection | Lifecycle enforcement & auditability | L2 required | Enforce retention/deletion; make access auditable |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** classify data on ingest; assign data owners.
**Tier 2 — Short-term:** enforce retention/deletion; audit access to classified stores.
**Tier 3 — Strategic:** G-SM L3 governance metrics; automated lifecycle enforcement.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure)
- Agentic: ASI06 (Memory & Context Poisoning)

---

### DSGAI08 — Non-Compliance & Regulatory Violations

GenAI deployments process data in ways that violate GDPR, the EU AI Act, HIPAA,
PCI DSS, or sector rules, or fail to honour data-subject rights.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Governance / Policy & Compliance (G-PC) | B — Compliance Management | Regulatory mapping & lawful basis | L2 required | Map processing to applicable regulation and recorded lawful basis |
| Governance / Strategy & Metrics (G-SM) | B — Application Risk Profile | Compliance risk in the risk profile | L2 required | Track regulatory exposure as a programme metric |
| Design / Security Requirements (D-SR) | A — Requirements | Data-subject-rights requirements | L2 required | Build erasure/access/rectification into the design |
| Operations / Operational Management (O-OM) | A — Data Protection | Processing records & evidence | L2 required | Log processing activities for accountability/audit |

**Maturity target:** L2 minimum (legal baseline under GDPR/CCPA).

#### Three-tier mitigations

**Tier 1 — Immediate:** record lawful basis; map regulated data flows.
**Tier 2 — Short-term:** implement end-to-end data-subject-rights handling incl. RAG/embeddings.
**Tier 3 — Strategic:** continuous compliance monitoring and evidence generation.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure)
- Agentic: ASI03 (Identity & Privilege Abuse)

---

### DSGAI09 — Multimodal Cross-Channel Data Leakage

Sensitive data embedded in images, audio, video, or documents traverses
channels that text-centric controls miss.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Threat Assessment (D-TA) | A — Threat Modeling | Per-modality threat model | L2 required | Model hidden-data and injection paths across every modality |
| Implementation / Secure Build (I-SB) | A — Build Process | Cross-modal extraction & redaction | L2 required | Extract and redact sensitive content from all modalities |
| Verification / Security Testing (V-ST) | B — Deep Testing | Multimodal leakage tests | L2 required | Probe EXIF/steganography/embedded-text and generated-media leakage |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** strip metadata; scan non-text inputs for embedded data.
**Tier 2 — Short-term:** modality-aware redaction; multimodal leakage tests in CI.
**Tier 3 — Strategic:** D-TA L3 modality threat model maintained per new input type.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure)
- Agentic: ASI01 (Agent Goal Hijack)

---

### DSGAI10 — Synthetic Data & Anonymisation Pitfalls

Synthetic data re-identifies original subjects, or anonymisation fails under
linkage attacks.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Requirements (D-SR) | A — Requirements | Privacy/anonymisation requirements | L2 required | Specify privacy thresholds and re-identification limits |
| Verification / Security Testing (V-ST) | B — Deep Testing | Re-identification / linkage testing | L2 required | Attack synthetic/anonymised sets with linkage and membership attacks |
| Governance / Policy & Compliance (G-PC) | A — Policy & Standards | Anonymisation standard | L1 minimum | Mandate a documented anonymisation method and review |

**Maturity target:** L1 minimum; L2 for regulated data.

#### Three-tier mitigations

**Tier 1 — Immediate:** document the anonymisation method and its assumptions.
**Tier 2 — Short-term:** run linkage/membership attacks against released data.
**Tier 3 — Strategic:** differential-privacy guarantees with measured budgets.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure)
- Agentic: ASI03 (Identity & Privilege Abuse)

---

### DSGAI11 — Cross-Context Conversation Bleed

Context from one user session leaks into another through shared caches, memory,
or improper isolation.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Architecture (D-SA) | B — Architecture Design | Session/tenant isolation model | L2 required | Design per-session/tenant isolation for memory and caches |
| Implementation / Secure Build (I-SB) | A — Build Process | State scrubbing & isolation | L2 required | Scrub session state on teardown; key caches per principal |
| Verification / Security Testing (V-ST) | B — Deep Testing | Cross-session bleed tests | L2 required | Probe for context bleed under concurrency and reuse |
| Operations / Environment Management (O-EM) | A — Configuration | Cache/memory configuration hardening | L2 required | Configure isolation in shared memory/cache layers |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** key all session state per user/tenant; clear on teardown.
**Tier 2 — Short-term:** add cross-session bleed tests; review cache configs.
**Tier 3 — Strategic:** D-SA L3 isolation model verified under load.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure)
- Agentic: ASI06 (Memory & Context Poisoning)

---

### DSGAI12 — Unsafe NL Data Gateways

Natural-language interfaces to databases and APIs execute unvalidated,
model-generated queries (NL-to-SQL/API), enabling injection and over-broad access.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Requirements (D-SR) | A — Requirements | Generated-query safety requirements | L2 required | Require parameterisation, allowlisting, and scope limits |
| Implementation / Secure Build (I-SB) | A — Build Process | Parameterised execution & identity passthrough | L2 required | Execute under the user's permissions; never a privileged service account |
| Verification / Security Testing (V-ST) | B — Deep Testing | NL-to-SQL injection tests | L2 required | Probe for destructive/over-broad generated queries |

**Maturity target:** L2 minimum; L3 for write-capable gateways.

#### Three-tier mitigations

**Tier 1 — Immediate:** parameterise generated queries; read-scope by default.
**Tier 2 — Short-term:** enforce execution-time user identity; add injection tests.
**Tier 3 — Strategic:** allowlist query patterns; D-SR L3 gateway requirements.

#### Cross-references

- LLM Top 10: LLM05 (Improper Output Handling)
- Agentic: ASI05 (Unexpected Code Execution)

---

### DSGAI13 — Vector Store Platform Security

Vector databases are inadequately secured — weak authentication, injection,
unencrypted embeddings, or tenant bleed.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Architecture (D-SA) | B — Architecture Design | Vector-store access & isolation design | L2 required | Per-namespace/tenant access control on the vector store |
| Implementation / Secure Deployment (I-SD) | A — Deployment Process | Hardened vector-DB deployment | L2 required | Authenticated, network-restricted, encrypted-at-rest deployment |
| Verification / Architecture Assessment (V-AA) | A — Architecture Validation | Vector-store config review | L2 required | Validate auth, isolation, and exposure |
| Operations / Environment Management (O-EM) | B — Configuration Hardening | Patch & config management | L2 required | Keep the vector DB patched and hardened |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** authenticate and network-restrict the vector store; encrypt embeddings at rest.
**Tier 2 — Short-term:** namespace isolation tests; config review in CI.
**Tier 3 — Strategic:** V-AA L2+ recurring assessment of the RAG data tier.

#### Cross-references

- LLM Top 10: LLM08 (Vector and Embedding Weaknesses)
- Agentic: ASI06 (Memory & Context Poisoning)

---

### DSGAI14 — Excessive Telemetry & Monitoring Leakage

Observability pipelines capture and retain sensitive data (prompts, outputs,
PII) in logs and traces.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Operations / Operational Management (O-OM) | A — Data Protection | Telemetry redaction & retention | L2 required | Redact/hash sensitive fields before logging; bound retention |
| Governance / Policy & Compliance (G-PC) | A — Policy & Standards | Logging data-handling policy | L2 required | Define what telemetry may capture and for how long |
| Implementation / Secure Build (I-SB) | A — Build Process | Redaction in the telemetry path | L2 required | Build redaction into logging/tracing libraries |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** redact prompts/outputs in logs; restrict log access.
**Tier 2 — Short-term:** enforce retention limits; scan telemetry sinks for PII.
**Tier 3 — Strategic:** privacy-by-design telemetry with field-level governance.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure)
- Agentic: ASI03 (Identity & Privilege Abuse)

---

### DSGAI15 — Over-Broad Context Windows

Context windows populated with excessive data create a single concentrated
exfiltration target.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Architecture (D-SA) | B — Architecture Design | Context-minimisation design | L2 required | Assemble only need-to-know data into context per task |
| Design / Security Requirements (D-SR) | A — Requirements | Per-item context authorisation | L2 required | Require each context item to be authorised for the caller |
| Verification / Security Testing (V-ST) | B — Deep Testing | Context-extraction tests | L2 required | Attempt to extract the full assembled context |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** trim context to task need; authorise each item.
**Tier 2 — Short-term:** add context-extraction tests; cap context assembly.
**Tier 3 — Strategic:** D-SA L3 data-need model per task type.

#### Cross-references

- LLM Top 10: LLM08 (Vector and Embedding Weaknesses)
- Agentic: ASI06 (Memory & Context Poisoning)

---

### DSGAI16 — Endpoint & Browser Assistant Overreach

AI assistants embedded on endpoints and browsers access data beyond their
defined scope (files, tabs, clipboard).

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Security Architecture (D-SA) | B — Architecture Design | Endpoint scope & permission model | L2 required | Constrain assistant access to declared resources only |
| Implementation / Secure Deployment (I-SD) | A — Deployment Process | Least-privilege endpoint permissions | L2 required | Grant minimal local permissions; require explicit consent |
| Verification / Architecture Assessment (V-AA) | A — Architecture Validation | Scope-enforcement review | L2 required | Validate the assistant cannot read out-of-scope data |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** restrict local file/tab/clipboard access; require consent.
**Tier 2 — Short-term:** test out-of-scope access; log local actions.
**Tier 3 — Strategic:** D-SA L3 endpoint permission model.

#### Cross-references

- LLM Top 10: LLM06 (Excessive Agency)
- Agentic: ASI02 (Tool Misuse & Exploitation)

---

### DSGAI17 — Data Availability & Resilience Failures

GenAI systems lack resilience controls — training data, model artefacts, and
vector stores have no tested backup/recovery, and pipelines have no DoS protection.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Operations / Environment Management (O-EM) | A — Configuration | Backup & recovery for data/model assets | L2 required | Back up corpora, weights, and indices with tested restore |
| Operations / Incident Management (O-IM) | B — Incident Response | Availability incident response | L2 required | Detect and respond to exhaustion/degradation |
| Design / Security Architecture (D-SA) | B — Architecture Design | Resilience & rate-limit design | L2 required | Design quotas, rate limits, and graceful degradation |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** back up data/model/index assets; add rate limits.
**Tier 2 — Short-term:** run restore drills (measure RTO/RPO); alert on exhaustion.
**Tier 3 — Strategic:** D-SA L3 resilience architecture; chaos/availability testing.

#### Cross-references

- LLM Top 10: LLM10 (Unbounded Consumption)
- Agentic: ASI08 (Cascading Agent Failures)

---

### DSGAI18 — Inference & Data Reconstruction

Attackers extract training data through membership inference, model inversion,
or attribute inference.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Threat Assessment (D-TA) | A — Threat Modeling | Inference-attack threat model | L2 required | Model membership/inversion/attribute-inference exposure |
| Verification / Security Testing (V-ST) | B — Deep Testing | Membership-inference testing | L2 required | Measure attack advantage against a documented threshold |
| Operations / Operational Management (O-OM) | A — Data Protection | Confidence/output limiting | L2 required | Limit signals (logits/confidence) that aid inference |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** suppress raw logits/confidence; rate-limit queries.
**Tier 2 — Short-term:** run membership-inference tests; measure AUC.
**Tier 3 — Strategic:** differential privacy / output-perturbation controls.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure)
- Agentic: ASI03 (Identity & Privilege Abuse)

---

### DSGAI19 — Human-in-Loop & Labeler Overexposure

Human reviewers, labellers, and RLHF annotators access sensitive data without
minimisation or controls.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Governance / Policy & Compliance (G-PC) | A — Policy & Standards | Reviewer data-handling policy | L1 minimum | Define what labellers may see and how it is controlled |
| Design / Security Requirements (D-SR) | A — Requirements | Reviewer-facing minimisation | L2 required | Mask non-essential sensitive fields in review/labeling UIs |
| Operations / Operational Management (O-OM) | A — Data Protection | Reviewer access audit | L2 required | Authorise and log reviewer access to records |

**Maturity target:** L1 minimum; L2 for regulated data.

#### Three-tier mitigations

**Tier 1 — Immediate:** mask non-essential PII in labeling UIs; restrict queues.
**Tier 2 — Short-term:** log/audit reviewer access; minimise per-task data.
**Tier 3 — Strategic:** privacy-preserving review workflows.

#### Cross-references

- LLM Top 10: LLM02 (Sensitive Information Disclosure)
- Agentic: ASI03 (Identity & Privilege Abuse)

---

### DSGAI20 — Model Exfiltration & IP Replication

Adversaries extract model weights or build functional equivalents via
extraction queries.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Threat Assessment (D-TA) | A — Threat Modeling | Extraction threat model | L2 required | Model query-based extraction and weight-theft paths |
| Verification / Security Testing (V-ST) | B — Deep Testing | Extraction-pattern testing | L2 required | Simulate model-stealing query campaigns |
| Operations / Operational Management (O-OM) | A — Data Protection | Query budgeting & anomaly detection | L2 required | Per-principal budgets; detect systematic querying |
| Governance / Policy & Compliance (G-PC) | A — Policy & Standards | Model-as-IP protection policy | L2 required | Access-control weights; classify the model as IP |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** access-control weight artefacts; add per-principal rate limits.
**Tier 2 — Short-term:** detect extraction query patterns; throttle/alert.
**Tier 3 — Strategic:** watermarking / output-perturbation defences.

#### Cross-references

- LLM Top 10: LLM10 (Unbounded Consumption)
- Agentic: ASI04 (Agentic Supply Chain)

---

### DSGAI21 — Disinformation via Data Poisoning

Attackers poison training or RAG data to cause systematic, targeted false outputs.

#### SAMM mapping

| Practice | Stream | Activity | Maturity Level | How it applies |
|---|---|---|---|---|
| Design / Threat Assessment (D-TA) | A — Threat Modeling | Source-integrity threat model | L2 required | Model disinformation injection into training/RAG sources |
| Implementation / Secure Build (I-SB) | A — Build Process | Source vetting & provenance | L2 required | Vet, sign, and provenance-track training/RAG sources |
| Verification / Security Testing (V-ST) | B — Deep Testing | Targeted-falsehood probing | L2 required | Probe for systematically false outputs on poisoned topics |
| Operations / Incident Management (O-IM) | A — Incident Detection | Corpus-integrity monitoring | L2 required | Detect anomalous content injected over time |

**Maturity target:** L2 minimum.

#### Three-tier mitigations

**Tier 1 — Immediate:** vet RAG/training sources; ground outputs with citations.
**Tier 2 — Short-term:** corpus-integrity monitoring; targeted-falsehood tests.
**Tier 3 — Strategic:** D-TA L3 provenance model across the data supply chain.

#### Cross-references

- LLM Top 10: LLM09 (Misinformation)
- Agentic: ASI04 (Agentic Supply Chain)

---

## SAMM maturity scorecard — GenAI data security minimum viable levels

| Practice | Minimum Viable Level | Current Level | Gap | Priority |
|---|:---:|:---:|:---:|:---:|
| G-SM Strategy & Metrics | L2 | | | |
| G-PC Policy & Compliance | L2 | | | |
| G-EG Education & Guidance | L1 | | | |
| D-TA Threat Assessment | L2 | | | |
| D-SR Security Requirements | L2 | | | |
| D-SA Security Architecture | L2 | | | |
| I-SB Secure Build | L2 | | | |
| I-SD Secure Deployment | L2 | | | |
| I-DM Defect Management | L1 | | | |
| V-AA Architecture Assessment | L2 | | | |
| V-RT Requirements-Driven Testing | L1 | | | |
| V-ST Security Testing | L2 | | | |
| O-IM Incident Management | L2 | | | |
| O-EM Environment Management | L2 | | | |
| O-OM Operational Management | L2 | | | |

**Scoring:** Any practice below Minimum Viable Level with active DSGAI-listed
data flows in production is a compliance and security risk.

**GDPR note:** G-PC at L2 is a legal baseline for any organisation processing
personal data in GenAI systems operating in jurisdictions covered by GDPR or CCPA.

---

## Implementation priority table

| Priority | Practices | DSGAI entries addressed |
|---|---|---|
| P1 — Pre-production gate | D-SR L2, I-SB L2, G-PC L2 | DSGAI01, DSGAI02, DSGAI04, DSGAI12 |
| P2 — First 30 days | D-SA L2, V-ST L2, O-IM L2 | DSGAI05, DSGAI06, DSGAI11, DSGAI13 |
| P3 — 60-day milestone | V-AA L2, O-OM L2, G-PC L2 | DSGAI03, DSGAI07, DSGAI08, DSGAI14 |
| P4 — Programme maturity | All practices L3, formal audits | DSGAI18, DSGAI20, DSGAI21 |

---

## See also

- [LLM Top 10 × SAMM](../llm-top10/LLM_SAMM.md)
- [Agentic Top 10 × SAMM](../agentic-top10/Agentic_SAMM.md)
- [Agentic Top 10 × MAESTRO](../agentic-top10/Agentic_MAESTRO.md)

Related DSGAI 2026 mappings:
[ASVS](DSGAI_ASVS.md) ·
[CIS Controls](DSGAI_CISControls.md) ·
[CWE/CVE](DSGAI_CWE_CVE.md) ·
[ENISA](DSGAI_ENISA.md) ·
[EU AI Act](DSGAI_EUAIAct.md) ·
[ISO 27001](DSGAI_ISO27001.md) ·
[ISO 42001](DSGAI_ISO42001.md) ·
[MITRE ATLAS](DSGAI_MITREATLAS.md) ·
[NIST AI RMF](DSGAI_NISTAIRMF.md) ·
[NIST CSF 2.0](DSGAI_NISTCSF2.md) ·
[PCI DSS](DSGAI_PCIDSS.md) ·
[SOC 2](DSGAI_SOC2.md)

---

## References

- [OWASP SAMM v2.0](https://owaspsamm.org/)
- [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
- [OWASP LLM Top 10 2025 × SAMM](../llm-top10/LLM_SAMM.md)
- [Agentic Top 10 2026 × SAMM](../agentic-top10/Agentic_SAMM.md)
- [shared/RECIPES.md](../shared/RECIPES.md) — Pattern 1: Access-Controlled RAG Retrieval
- [DSGAI_ISO42001.md](DSGAI_ISO42001.md) — AIMS controls complement SAMM data governance practices

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-03-27 | Initial release — full mapping DSGAI01–DSGAI21 to SAMM v2.0 |
| 1.1.0 | 2026-05-29 | Corrected to canonical DSGAI 2026 taxonomy (entries had used a pre-release taxonomy); SAMM practice mappings, mitigations, and cross-references rewritten to match |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) —
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
*License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)*
