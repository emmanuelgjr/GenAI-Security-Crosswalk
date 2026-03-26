<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks and Mitigations 2026 (DSGAI01-DSGAI21)
  Framework   : MITRE ATLAS (Adversarial Threat Landscape for AI Systems)
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 x MITRE ATLAS

Mapping the [OWASP GenAI Data Security Risks and Mitigations 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
(DSGAI01-DSGAI21) to [MITRE ATLAS](https://atlas.mitre.org)
(Adversarial Threat Landscape for AI Systems) — the knowledge base
of adversarial ML tactics, techniques, and case studies maintained
by MITRE.

ATLAS is organised analogously to MITRE ATT&CK: tactics represent
adversary goals at a stage of attack, techniques represent the methods
used to achieve those goals. This mapping identifies the ATLAS tactics
and techniques that adversaries use to create or exploit each DSGAI
risk — giving defenders a threat-intelligence-grounded view of the
data security attack surface.

The DSGAI taxonomy follows data through the GenAI lifecycle. ATLAS
follows adversaries through their attack lifecycle. This mapping
connects the two: for each data security risk, it identifies which
adversary techniques are exercised to create or exploit that risk.

For the LLM Top 10 x MITRE ATLAS mapping see LLM_MITREATLAS.md.
For the Agentic Top 10 x MITRE ATLAS mapping see Agentic_MITREATLAS.md.

---

## ATLAS tactics reference

| Tactic | ID | Adversary goal |
|---|---|---|
| Reconnaissance | AML.TA0002 | Gathering information about the AI system |
| Resource Development | AML.TA0000 | Establishing resources for attacks |
| Initial Access | AML.TA0001 | Gaining access to the ML system |
| ML Attack Staging | AML.TA0005 | Preparing adversarial inputs and capabilities |
| Model Access | AML.TA0006 | Acquiring access to query the model |
| Execution | AML.TA0004 | Executing adversarial techniques |
| Persistence | AML.TA0003 | Maintaining foothold in the ML system |
| Privilege Escalation | AML.TA0007 | Gaining elevated capabilities |
| Defense Evasion | AML.TA0008 | Avoiding detection |
| Discovery | AML.TA0009 | Learning about the ML environment |
| Collection | AML.TA0010 | Gathering data from the ML system |
| Exfiltration | AML.TA0011 | Extracting information from the ML system |
| Impact | AML.TA0012 | Degrading or manipulating the ML system |

---

## Quick-reference summary

| ID | Name | Severity | Primary ATLAS Tactics | Key ATLAS Techniques |
|---|---|---|---|---|
| DSGAI01 | Sensitive Data Leakage | Critical | Exfiltration, Collection | AML.T0024, AML.T0025, AML.T0037 |
| DSGAI02 | Agent Identity and Credential Exposure | Critical | Initial Access, Privilege Escalation | AML.T0012, AML.T0021, AML.T0047 |
| DSGAI03 | Shadow AI and Unsanctioned Data Flows | High | Initial Access, Collection | AML.T0012, AML.T0037, AML.T0025 |
| DSGAI04 | Data, Model and Artifact Poisoning | Critical | ML Attack Staging, Impact | AML.T0020, AML.T0032, AML.T0031 |
| DSGAI05 | Data Integrity and Validation Failures | High | ML Attack Staging, Execution | AML.T0020, AML.T0054, AML.T0031 |
| DSGAI06 | Tool, Plugin and Agent Data Exchange | High | Collection, Exfiltration | AML.T0037, AML.T0025, AML.T0024 |
| DSGAI07 | Data Governance, Lifecycle and Classification | High | Discovery, Collection | AML.T0035, AML.T0037, AML.T0025 |
| DSGAI08 | Non-Compliance and Regulatory Violations | High | Reconnaissance, Discovery | AML.T0007, AML.T0035, AML.T0040 |
| DSGAI09 | Multimodal Cross-Channel Data Leakage | High | Collection, Exfiltration | AML.T0037, AML.T0025, AML.T0024 |
| DSGAI10 | Synthetic Data and Anonymisation Pitfalls | Medium | Reconnaissance, Exfiltration | AML.T0007, AML.T0024, AML.T0040 |
| DSGAI11 | Cross-Context Conversation Bleed | High | Collection, Exfiltration | AML.T0025, AML.T0037, AML.T0024 |
| DSGAI12 | Unsafe NL Data Gateways | Critical | Execution, Exfiltration | AML.T0051, AML.T0025, AML.T0047 |
| DSGAI13 | Vector Store Platform Security | High | Initial Access, Collection | AML.T0012, AML.T0025, AML.T0037 |
| DSGAI14 | Excessive Telemetry and Monitoring Leakage | High | Collection, Exfiltration | AML.T0037, AML.T0025, AML.T0024 |
| DSGAI15 | Over-Broad Context Windows | High | Collection, ML Attack Staging | AML.T0051, AML.T0037, AML.T0025 |
| DSGAI16 | Endpoint and Browser Assistant Overreach | High | Initial Access, Collection | AML.T0012, AML.T0037, AML.T0047 |
| DSGAI17 | Data Availability and Resilience Failures | High | Impact | AML.T0029, AML.T0034, AML.T0057 |
| DSGAI18 | Inference and Data Reconstruction | High | Exfiltration, Reconnaissance | AML.T0024, AML.T0040, AML.T0007 |
| DSGAI19 | Human-in-Loop and Labeler Overexposure | Medium | Collection, Initial Access | AML.T0037, AML.T0012, AML.T0025 |
| DSGAI20 | Model Exfiltration and IP Replication | High | Exfiltration, Reconnaissance | AML.T0016, AML.T0040, AML.T0007 |
| DSGAI21 | Disinformation via Data Poisoning | High | ML Attack Staging, Impact | AML.T0045, AML.T0020, AML.T0054 |

---

## Audience tags

- **Threat intelligence analyst** — full file, ATLAS technique mapping for GenAI data risks
- **Red team** — ATLAS techniques as adversarial test scenarios
- **Security engineer** — detection and mitigation mapping per technique
- **CISO** — tactics coverage overview for risk programme
- **OT security engineer** — DSGAI04, DSGAI12, DSGAI17 elevated OT severity entries

---

## Detailed mappings

---

### DSGAI01 — Sensitive Data Leakage

**Severity:** Critical

Sensitive data leaks from GenAI systems through model outputs, RAG
retrieval, embedding exposure, or observability pipelines. Adversaries
use inference, inversion, and query-based extraction techniques to
exploit these leakage paths.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Infer Training Data Membership | AML.T0024 | Exfiltration | Adversary queries model systematically to determine if specific sensitive records were in training data |
| LLM Data Leakage | AML.T0025 | Exfiltration | Adversary crafts prompts that cause the model to reproduce training data including PII and credentials |
| Data from Inference API | AML.T0037 | Collection | Adversary uses inference API to extract data the model has memorised or can reconstruct from training |

#### Threat scenario

An adversary targets a healthcare LLM by systematically querying
patient-specific terms using AML.T0024 membership inference to confirm
which patient records were in the training set. They then use AML.T0025
to craft prompts that cause the model to reproduce specific records.
The exfiltrated data is used for targeted fraud. The attack requires
only inference API access — no training data access needed.

#### Mitigations aligned to ATLAS

**Against AML.T0024 (Infer Training Data Membership):**
- Suppress confidence scores and logits — membership inference
  requires confidence values to determine training set membership
- Apply differential privacy during training — limits the
  information any single training example contributes
- Implement output rate limiting — limits the number of
  membership inference queries an adversary can submit

**Against AML.T0025 (LLM Data Leakage):**
- Deploy output scanning for PII and sensitive patterns —
  DLP on all model output channels before delivery to users
- Implement output redaction — mask sensitive patterns
  before responses leave the service boundary
- Audit RAG access controls — verify retrieval scope matches
  authorised user access rights

**Against AML.T0037 (Data from Inference API):**
- Implement API rate limiting and query diversity monitoring —
  systematic extraction requires high query volumes and
  unusual diversity patterns
- Log all inference API queries with user identity —
  extraction attempts detectable through aggregate analysis

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- Agentic Top 10: ASI03 Identity and Privilege Abuse
- Other frameworks: ISO 27001 A.8.11/A.8.12 · NIST AI RMF MS-2.5 · EU AI Act Art. 10

---

### DSGAI02 — Agent Identity and Credential Exposure

**Severity:** Critical

AI agents inherit and cache credentials — API keys, OAuth tokens,
session credentials — that adversaries exploit for lateral movement
into all systems the agent has access to.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Valid Accounts | AML.T0012 | Initial Access | Adversary uses stolen agent credentials to access target ML systems and downstream infrastructure |
| Compromise ML Software Dependencies | AML.T0021 | Initial Access | Adversary compromises agent runtime dependencies to extract credentials from agent memory |
| Bypass ML Model | AML.T0047 | Privilege Escalation | Adversary manipulates agent to exfiltrate credentials via crafted tool call parameters |

#### Threat scenario

An adversary compromises an MCP server in the agent supply chain
using AML.T0021. The malicious MCP server extracts agent OAuth
tokens from tool call payloads. Using AML.T0012 (valid accounts),
the adversary authenticates as the agent against all downstream
systems — historian, CMMS, email — achieving broad lateral movement
from a single credential exposure.

#### Mitigations aligned to ATLAS

**Against AML.T0012 (Valid Accounts):**
- Short-lived, task-scoped credentials — stolen credentials
  expire within minutes, limiting the lateral movement window
- Anomaly detection on credential usage — agent credentials
  used from unexpected contexts trigger immediate alert
- JIT credential issuance — credentials only valid for the
  current task, automatically revoked on completion

**Against AML.T0021 (Compromise ML Software Dependencies):**
- Verify cryptographic signatures of all MCP servers and
  tool components before loading
- Scan all tool descriptors for credential extraction
  patterns before agent loading

**Against AML.T0047 (Bypass ML Model):**
- Deploy input filtering on all tool call parameters —
  credential patterns in tool call inputs detected and blocked
- Log all tool call payloads — credential exfiltration via
  tool calls detectable through log analysis

#### Cross-references
- Agentic Top 10: ASI03 Identity and Privilege Abuse
- Other frameworks: OWASP NHI Top 10 · ISO 27001 A.8.2/A.5.16 · EU AI Act Art. 15

---

### DSGAI03 — Shadow AI and Unsanctioned Data Flows

**Severity:** High

Employees use unapproved GenAI SaaS tools — creating ungoverned data
flows where sensitive data is exfiltrated to external AI systems
without any security controls.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Valid Accounts | AML.T0012 | Initial Access | Employees use legitimate corporate credentials to access unsanctioned AI SaaS tools — valid access to unapproved systems |
| Data from Inference API | AML.T0037 | Collection | Sensitive corporate data entered into external AI inference APIs — data collected by unapproved vendor |
| LLM Data Leakage | AML.T0025 | Exfiltration | Sensitive data entered into external LLMs may be reproduced in vendor's model outputs for other users |

#### Threat scenario

An employee pastes a confidential product roadmap into a public AI
assistant using AML.T0012 valid corporate credentials to access the
service. The AI vendor retains the input for model training. Six months
later, another user's query causes the model to reproduce portions of
the roadmap using AML.T0025. The exfiltration was unintentional from
the employee's perspective but achieves the same outcome as a targeted
attack.

#### Mitigations aligned to ATLAS

**Against AML.T0012 (Valid Accounts — shadow AI context):**
- Acceptable use policy covering AI tool usage — employees
  informed of approved tools and prohibited sharing
- CASB (Cloud Access Security Broker) controls on AI SaaS —
  unapproved AI endpoints blocked or alerted

**Against AML.T0037 (Data from Inference API):**
- DLP monitoring for data transfer to known AI SaaS endpoints —
  sensitive patterns detected before reaching external systems
- Network-level controls blocking unapproved AI API endpoints

**Against AML.T0025 (LLM Data Leakage via vendor):**
- Contractual zero-training-use requirements for approved AI
  vendors — data submitted to approved tools not used for
  model training
- Data processing agreements with all approved AI vendors

#### Cross-references
- DSGAI 2026: DSGAI07 Data Governance, DSGAI08 Non-Compliance
- Other frameworks: ISO 27001 A.5.10/A.5.23 · NIST CSF 2.0 GV.RM-06

---

### DSGAI04 — Data, Model and Artifact Poisoning

**Severity:** Critical

Adversaries corrupt training data, model weights, or supply chain
components to embed backdoors. ATLAS documents this as a primary
adversarial ML attack class with multiple documented real-world cases.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Poison Training Data | AML.T0020 | ML Attack Staging | Adversary injects malicious data into training pipeline to influence model behaviour |
| Backdoor ML Model | AML.T0032 | ML Attack Staging | Adversary embeds a backdoor trigger in model weights — specific input activates attacker-controlled behaviour |
| Poison ML Model | AML.T0031 | Impact | Adversary corrupts model weights post-training — modifies model behaviour without retraining |

**OT amplifier:** In OT environments, a backdoored LLM providing
process recommendations can cause equipment damage, environmental
incidents, or safety events when the trigger condition appears during
normal operations. Severity elevated to Critical in OT deployments.

#### Threat scenario

A nation-state actor targets an energy company's predictive
maintenance LLM using AML.T0032. A backdoor is embedded during
fine-tuning on operational data by a compromised training data
provider (AML.T0020). The backdoor causes the model to classify
genuine safety alarms as nuisance events when a specific combination
of process conditions appears — the trigger condition that matches
a planned sabotage scenario.

#### Mitigations aligned to ATLAS

**Against AML.T0020 (Poison Training Data):**
- Training data governance — source allowlisting, provenance
  documentation, anomaly detection on distributions
- Supply chain security for training data providers —
  AML.T0020 requires access to the training pipeline

**Against AML.T0032 (Backdoor ML Model):**
- Post-training backdoor detection as mandatory deployment gate —
  neural cleanse or equivalent before each production promotion
- Model integrity verification before each deployment —
  hash-based check against approved baseline

**Against AML.T0031 (Poison ML Model):**
- Model rollback capability — clean checkpoint always
  available, tested restoration procedure
- Continuous model output monitoring — statistical anomaly
  detection on recommendation distributions

#### Cross-references
- LLM Top 10: LLM03 Supply Chain, LLM04 Data and Model Poisoning
- Agentic Top 10: ASI04 Supply Chain, ASI06 Memory and Context Poisoning
- Other frameworks: NIST AI RMF MS-3.3 · ISO 27001 A.8.27 · ISA/IEC 62443 SR 3.3 (OT)

---

### DSGAI05 — Data Integrity and Validation Failures

**Severity:** High

Adversarially crafted payloads passing syntactic validation corrupt
training sets or exploit snapshot import path traversal to achieve
arbitrary file write on vector DB hosts.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Poison Training Data | AML.T0020 | ML Attack Staging | Adversarially crafted payloads pass syntactic validation but corrupt training data semantically |
| Exploit Public-Facing Application | AML.T0054 | Initial Access | Path traversal in snapshot import endpoints (CVE-2024-3584) exploited for arbitrary file write |
| Poison ML Model | AML.T0031 | Impact | Training data corruption results in model behaviour modification |

#### Threat scenario

An adversary exploits CVE-2024-3584 (Qdrant path traversal) using
AML.T0054 — a crafted snapshot archive achieves arbitrary file write
on the vector DB host with no authentication bypass required. The
adversary writes a modified embedding that redirects retrieval for
safety-critical queries to attacker-controlled content (AML.T0020).

#### Mitigations aligned to ATLAS

**Against AML.T0054 (Exploit Public-Facing Application):**
- Patch CVE-2024-3584 and equivalent vector database
  vulnerabilities — treat as urgent
- Harden snapshot import endpoints — path traversal
  prevention mandatory, restrict or disable by default
- Sandbox all snapshot import operations — no direct
  write to production filesystem paths

**Against AML.T0020 (Poison Training Data via validation bypass):**
- Multi-stage validation at all ingestion boundaries —
  syntax, schema, semantic, and statistical validation
  in sequence with rejection logging
- Content-aware anomaly detection — statistical outliers
  and unusual encoding flagged before pipeline completion

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling
- DSGAI 2026: DSGAI13 Vector Store Platform Security
- Other frameworks: ISO 27001 A.8.26/A.8.28 · OWASP ASVS V5 · CWE-20

---

### DSGAI06 — Tool, Plugin and Agent Data Exchange Risks

**Severity:** High

AI tools and plugins receive full context payloads — adversaries
compromise tool providers to collect sensitive data flowing through
agent workflows.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Data from Inference API | AML.T0037 | Collection | Compromised tool provider collects sensitive context payloads flowing through legitimate tool API calls |
| LLM Data Leakage | AML.T0025 | Exfiltration | Sensitive agent context — customer records, internal documents — leaked via tool call payloads to third-party provider |
| Infer Training Data Membership | AML.T0024 | Exfiltration | Tool provider uses accumulated context payloads to reconstruct sensitive training data patterns |

#### Threat scenario

An adversary compromises an MCP server providing CRM query capability
to an enterprise agent. Using AML.T0037, the malicious server logs all
context payloads passing through the tool call interface — customer
records, internal sales data, system prompt content. The data is
exfiltrated through the tool's legitimate outbound connection without
triggering any network security alert.

#### Mitigations aligned to ATLAS

**Against AML.T0037 (Data from Inference API via tool):**
- Context minimisation — tools receive only minimum payload
  required for their function, not full conversation history
- Deploy outbound DLP on all tool API calls — sensitive
  patterns detected before leaving the controlled environment

**Against AML.T0025 (LLM Data Leakage via tool provider):**
- Security due diligence on all tool providers before
  integration — what data they receive, retain, and use
- Contractual zero-training-use requirements for all
  tool providers receiving agent context

#### Cross-references
- LLM Top 10: LLM06 Excessive Agency
- Agentic Top 10: ASI02 Tool Misuse, ASI04 Supply Chain
- Other frameworks: ISO 27001 A.5.19/A.5.20 · NIST AI RMF MP-5.1

---

### DSGAI07 — Data Governance, Lifecycle and Classification

**Severity:** High

GenAI creates ungoverned derived data assets — embeddings, agent
traces, cached retrievals — that adversaries can discover and exploit
as secondary attack surfaces when primary data stores are protected.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Discover ML Artifacts | AML.T0035 | Discovery | Adversary discovers unprotected derived assets — embedding stores, model caches, agent traces — through reconnaissance |
| Data from Inference API | AML.T0037 | Collection | Unprotected derived assets queried directly — embedding stores without RBAC accessed as a secondary attack surface |
| LLM Data Leakage | AML.T0025 | Exfiltration | Derived assets (embeddings, cached retrievals) that are not governed leak source content |

#### Threat scenario

An adversary conducts discovery using AML.T0035 and finds an
unprotected Chroma embedding store exposed on an internal network
segment. The store contains embeddings of sensitive HR documents.
Using AML.T0037, the adversary queries the store directly — bypassing
all LLM-layer access controls — and exfiltrates the raw embeddings,
which are then subject to embedding inversion to recover source content.

#### Mitigations aligned to ATLAS

**Against AML.T0035 (Discover ML Artifacts):**
- Maintain complete asset inventory of all GenAI data assets —
  unknown assets cannot be protected
- Network isolation of all GenAI data stores — embedding
  stores not accessible from unexpected network segments
- Classification labels propagate to all derived assets —
  embeddings inherit source document classification

**Against AML.T0037 (Data from Inference API — direct store access):**
- RBAC on all embedding stores and derived asset databases —
  no unauthenticated access in any environment
- Encrypt all derived assets at rest

#### Cross-references
- DSGAI 2026: DSGAI08 Non-Compliance, DSGAI01 Sensitive Data Leakage
- Other frameworks: ISO 27001 A.5.9/A.8.10 · NIST AI RMF GV-1.6

---

### DSGAI08 — Non-Compliance and Regulatory Violations

**Severity:** High

Adversaries exploit AI systems operating in regulatory grey zones —
systems that have not been assessed for compliance create attack
surfaces that regulators and litigants can exploit alongside technical
adversaries.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Search for Victim AI/ML Information | AML.T0007 | Reconnaissance | Adversary researches target AI system's compliance posture — looking for disclosed training data sources, known vulnerabilities, regulatory gaps |
| Discover ML Artifacts | AML.T0035 | Discovery | Adversary discovers undisclosed AI system components — training data sources, third-party model integrations — through public documentation and API responses |
| Verify Attack | AML.T0040 | Exfiltration | Adversary confirms exploitable compliance gaps — verifies personal data is in training corpus without consent |

#### Threat scenario

A privacy researcher uses AML.T0007 to research a company's AI
system — examining public documentation, API responses, and model
outputs to identify that the system was trained on scraped web data
that likely includes personal information without a valid lawful basis.
Using AML.T0040, they craft queries that cause the model to reproduce
specific personal data records, providing evidence for a GDPR
regulatory complaint — no technical breach required, just exploitation
of a compliance gap.

#### Mitigations aligned to ATLAS

**Against AML.T0007 (Reconnaissance):**
- Establish clear public documentation of data governance
  practices — transparent documentation of training data
  sources, lawful basis, and privacy measures reduces the
  attack surface for compliance-based attacks
- Conduct proactive compliance assessments before deployment —
  identify and close gaps before adversaries do

**Against AML.T0040 (Verify Attack — compliance validation):**
- Implement output scanning for personal data — reduces
  the evidence an adversary can gather through outputs
- Apply differential privacy — reduces confidence of
  membership inference attacks used to verify compliance
  violations

#### Cross-references
- DSGAI 2026: DSGAI07 Data Governance
- Other frameworks: EU AI Act Art. 10/17 · ISO 27001 A.5.31 · GDPR Art. 5/25/30

---

### DSGAI09 — Multimodal Cross-Channel Data Leakage

**Severity:** High

Multimodal AI systems process sensitive visual and audio data —
adversaries exploit OCR and transcription pipelines as secondary
leakage paths that are often less protected than text data paths.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Data from Inference API | AML.T0037 | Collection | Adversary exploits multimodal inference API to extract OCR output and transcription results containing sensitive content |
| LLM Data Leakage | AML.T0025 | Exfiltration | Multimodal model causes reproduced sensitive visual content — passport numbers, medical images — in text responses |
| Infer Training Data Membership | AML.T0024 | Exfiltration | Multimodal model's training on sensitive images enables membership inference attacks against the image training set |

#### Threat scenario

An adversary submits carefully crafted queries to a multimodal AI
system that was trained on medical imaging data. Using AML.T0024
membership inference adapted for visual inputs, they determine which
specific patient scans were in the training data. Follow-up queries
using AML.T0025 cause the model to reproduce diagnostic annotations
from those scans in text output — leaking medical information without
accessing the original image store.

#### Mitigations aligned to ATLAS

**Against AML.T0037 (Data from Inference API — multimodal):**
- Apply the same access controls and DLP to OCR output and
  transcription results as to equivalent text data
- Short retention windows for all multimodal derived content

**Against AML.T0025 (LLM Data Leakage — multimodal):**
- Output scanning for sensitive patterns across all modalities —
  not just text outputs but image analysis and transcription results
- Classify multimodal uploads at the same level as their content

#### Cross-references
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI14 Telemetry Leakage
- Other frameworks: ISO 27001 A.8.11/A.8.12 · GDPR Art. 9

---

### DSGAI10 — Synthetic Data and Anonymisation Pitfalls

**Severity:** Medium

Synthetic data and anonymised datasets that fail to meet the legal
standard of anonymisation are vulnerable to re-identification attacks
— adversaries use inference techniques to recover individual records.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Infer Training Data Membership | AML.T0024 | Exfiltration | Adversary uses membership inference against models trained on supposedly anonymised data to confirm re-identifiable individuals |
| Search for Victim AI/ML Information | AML.T0007 | Reconnaissance | Adversary researches synthetic data generation methodology — looking for known weaknesses in the anonymisation approach |
| Verify Attack | AML.T0040 | Exfiltration | Adversary verifies re-identification success — queries model to confirm specific individuals are recoverable from synthetic dataset |

#### Threat scenario

A research team publishes a synthetic version of a sensitive HR
dataset, claiming it is anonymised. An adversary uses AML.T0007 to
identify the synthetic data generation tool used and known weaknesses
in its privacy guarantees for small datasets. Using AML.T0024, they
demonstrate membership inference against the published model — confirming
that specific individuals from the original dataset are recoverable —
and report this as a re-identification vulnerability to the regulator.

#### Mitigations aligned to ATLAS

**Against AML.T0024 (Inference against synthetic data):**
- Apply differential privacy to synthetic data generation —
  provides a mathematically verifiable privacy guarantee
- Conduct membership inference testing before releasing
  synthetic datasets — document results as privacy evidence

**Against AML.T0007 (Reconnaissance on anonymisation method):**
- Document anonymisation methodology but do not disclose
  specific implementation details that reveal exploitable
  weaknesses

#### Cross-references
- DSGAI 2026: DSGAI08 Non-Compliance, DSGAI18 Inference and Data Reconstruction
- Other frameworks: ISO 27001 A.5.34 · GDPR Recital 26 · EU AI Act Art. 10

---

### DSGAI11 — Cross-Context Conversation Bleed

**Severity:** High

Sensitive data from one user's conversation leaks into another
user's responses — adversaries exploit multi-tenant isolation
failures to access other users' context.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| LLM Data Leakage | AML.T0025 | Exfiltration | Adversary crafts queries that cause the model to reproduce context from other users' sessions |
| Data from Inference API | AML.T0037 | Collection | Adversary systematically queries the LLM to extract other users' context through session isolation failures |
| Infer Training Data Membership | AML.T0024 | Exfiltration | Adversary confirms that other users' sensitive data is accessible through the shared inference context |

#### Threat scenario

An adversary identifies that a multi-tenant LLM deployment uses a
shared KV cache with insufficient tenant isolation. Using AML.T0037,
they craft queries that overflow into adjacent cache entries, causing
the model to reproduce fragments of other users' conversations. The
technique is used to extract customer personally identifiable information
from the sessions of other enterprise users.

#### Mitigations aligned to ATLAS

**Against AML.T0025 (LLM Data Leakage via session bleed):**
- Strict session isolation — each user's context inaccessible
  to all other sessions by design
- Per-user RAG namespaces — shared vector stores enforce
  tenant isolation at query time

**Against AML.T0037 (Data from Inference API — cross-tenant):**
- Test multi-tenant isolation explicitly — verify user A cannot
  retrieve user B's documents through any query formulation
- KV cache isolation for shared inference infrastructure

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- DSGAI 2026: DSGAI13 Vector Store Platform Security
- Other frameworks: ISO 27001 A.8.3 · NIST AI RMF MS-2.5

---

### DSGAI12 — Unsafe Natural-Language Data Gateways

**Severity:** Critical

LLM-to-SQL and LLM-to-Graph interfaces collapse the security boundary
between user input and database logic. ATLAS documents the prompt
injection technique used to exploit these interfaces and the privilege
escalation that results from high-privilege service accounts.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Prompt Injection | AML.T0051 | Execution | Adversary injects instructions into natural language queries that cause the LLM to generate destructive database operations |
| LLM Data Leakage | AML.T0025 | Exfiltration | Adversary uses NL gateway to extract bulk data through LLM-generated SELECT queries beyond intended scope |
| Bypass ML Model | AML.T0047 | Privilege Escalation | Adversary manipulates LLM to generate queries that escalate from read to write/delete permissions |

**OT amplifier:** In OT environments, LLM-to-historian or LLM-to-SCADA
gateways with write access are Critical severity — destructive queries
can modify process parameters with physical consequences. See
LLM_ISA62443.md for OT-specific controls.

#### Threat scenario

An adversary crafts a natural language query to an LLM-powered
analytics interface using AML.T0051. The prompt injection causes the
LLM to generate a SQL query that bypasses the intended read-only
restriction and executes a DELETE on a customer transaction table
(AML.T0047). The query executes under the shared high-privilege service
account that the NL gateway uses, with no per-user access enforcement.

#### Mitigations aligned to ATLAS

**Against AML.T0051 (Prompt Injection via NL gateway):**
- Input validation at the NL gateway — query intent analysis
  before SQL generation
- Read-only by default — write, delete, and DDL require
  explicit approval with human confirmation

**Against AML.T0025 (LLM Data Leakage via bulk query):**
- Rate limiting on LLM-generated database queries —
  bulk extraction through high-frequency queries detectable
- Row-level security — LLM-generated queries cannot exceed
  what the requesting user can access directly

**Against AML.T0047 (Bypass ML Model — privilege escalation):**
- LLM-generated queries execute under requesting user's
  database permissions — never a shared high-privilege
  service account

#### Cross-references
- LLM Top 10: LLM05 Insecure Output Handling
- Agentic Top 10: ASI02 Tool Misuse, ASI05 Unexpected Code Execution
- Other frameworks: ISO 27001 A.8.26/A.8.28 · CWE-89 · ISA/IEC 62443 SR 2.2 (OT)

---

### DSGAI13 — Vector Store Platform Security

**Severity:** High

Vector databases store sensitive embeddings with weaker default
security posture than traditional databases — unauthenticated stores
and path traversal vulnerabilities create direct attack surfaces.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Valid Accounts | AML.T0012 | Initial Access | Adversary uses stolen API keys or default credentials to access unauthenticated vector stores |
| LLM Data Leakage | AML.T0025 | Exfiltration | Adversary queries vector store directly — bypassing all LLM-layer controls — to extract embeddings |
| Data from Inference API | AML.T0037 | Collection | Adversary uses vector store query API to bulk-extract embeddings for offline inversion |

#### Threat scenario

An adversary discovers an exposed Chroma instance with no
authentication using AML.T0012 default credential exploitation.
Using AML.T0037, they bulk-extract all embedding vectors from the
store. The embeddings contain encoded PII from a document corpus.
Offline embedding inversion recovers source document text without
ever querying the LLM — the vector store is a secondary data store
with weaker controls than the primary systems.

#### Mitigations aligned to ATLAS

**Against AML.T0012 (Valid Accounts — vector store default access):**
- Enable RBAC on all vector store collections from day one —
  no unauthenticated access in any environment
- Patch all known vector database CVEs — CVE-2024-3584 class

**Against AML.T0037 (Data from Inference API — bulk vector extraction):**
- Implement query rate limiting and volume anomaly detection
  on vector store APIs — bulk extraction patterns alerted
- Network isolation — vector stores accessible only from
  authorised services, never public internet

**Against AML.T0025 (LLM Data Leakage via vector store):**
- Encrypt all vector store content at rest — offline
  extraction requires decryption
- Embed access watermarks in sensitive embeddings — bulk
  extraction detectable through watermark analysis

#### Cross-references
- LLM Top 10: LLM08 Vector and Embedding Weaknesses
- Agentic Top 10: ASI06 Memory and Context Poisoning
- Other frameworks: ISO 27001 A.8.3/A.8.24 · NIST AI RMF MS-2.5

---

### DSGAI14 — Excessive Telemetry and Monitoring Leakage

**Severity:** High

Observability pipelines capture full prompt text and tool payloads —
adversaries target these secondary data stores as they often have
weaker access controls than production systems.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Data from Inference API | AML.T0037 | Collection | Adversary accesses observability stores through weaker access controls — extracts full prompt and response history |
| LLM Data Leakage | AML.T0025 | Exfiltration | Sensitive content captured in telemetry — PII, credentials — leaked through observability API endpoints |
| Infer Training Data Membership | AML.T0024 | Exfiltration | Accumulated telemetry data used to reconstruct training data patterns and sensitive operational intelligence |

#### Threat scenario

An adversary gains access to a Langfuse observability instance with
weaker authentication than the production LLM API using AML.T0037.
The telemetry store contains full prompt and response history including
customer PII, internal system names, and partial API keys in debug
traces. The adversary exfiltrates months of conversation history —
more sensitive than any single model query — through a system designed
to improve model performance.

#### Mitigations aligned to ATLAS

**Against AML.T0037 (Data from Inference API — telemetry):**
- Apply access controls to telemetry stores equivalent to
  production data — not relaxed because "just logs"
- Implement least-logging defaults — do not capture full
  prompt and response bodies in production telemetry

**Against AML.T0025 (LLM Data Leakage via telemetry):**
- Redact PII and sensitive patterns from telemetry streams
  before storage — tokenisation or masking at ingestion
- Short TTL for debug traces — automated deletion after
  defined window, not indefinite retention

#### Cross-references
- DSGAI 2026: DSGAI01 Sensitive Data Leakage, DSGAI07 Data Governance
- Other frameworks: ISO 27001 A.8.15/A.8.12 · GDPR Art. 32

---

### DSGAI15 — Over-Broad Context Windows and Prompt Over-Sharing

**Severity:** High

RAG pipelines inject excessive content into context windows —
creating a single flat namespace that amplifies the impact of any
prompt injection achieving access to the context.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Prompt Injection | AML.T0051 | ML Attack Staging | Adversary uses prompt injection to access and extract all content injected into the over-broad context window |
| Data from Inference API | AML.T0037 | Collection | Adversary crafts queries that cause the model to reproduce cross-trust-domain content from the aggregated context |
| LLM Data Leakage | AML.T0025 | Exfiltration | Over-broad context injection amplifies the amount of sensitive data accessible through a single successful prompt injection |

#### Threat scenario

An adversary exploits a RAG system that injects full document texts
from multiple trust domains into every query context. A single
successful prompt injection using AML.T0051 gives the adversary
access to all injected content — including Confidential documents
from trust domains the adversary should not access. The over-broad
context injection transformed a limited prompt injection into a
full cross-domain data breach.

#### Mitigations aligned to ATLAS

**Against AML.T0051 (Prompt Injection amplified by over-broad context):**
- Minimum-necessary context injection — reduces the damage
  radius of any successful injection
- Trust-domain-aware context assembly — content from
  different trust domains isolated within context window

**Against AML.T0037 (Data from Inference API via context):**
- Track classification ceiling of context window content —
  highest classification drives response handling
- Never inject content from a higher classification tier
  than the requesting user is authorised to access

#### Cross-references
- LLM Top 10: LLM07 System Prompt Leakage
- Agentic Top 10: ASI01 Agent Goal Hijack
- Other frameworks: AIUC-1 A/B005 · NIST AI RMF MS-2.5

---

### DSGAI16 — Endpoint and Browser Assistant Overreach

**Severity:** High

Browser-integrated AI assistants access data across all open tabs —
adversaries use malicious web content to weaponise these agents for
data exfiltration.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Valid Accounts | AML.T0012 | Initial Access | Adversary compromises browser AI extension through supply chain attack — malicious update distributed through legitimate extension marketplace |
| Data from Inference API | AML.T0037 | Collection | Compromised browser agent collects all data accessible across open tabs — clipboard, form fields, document content |
| Bypass ML Model | AML.T0047 | Privilege Escalation | Adversary injects hidden instructions in web content that redirect browser agent to exfiltrate data to attacker-controlled endpoint |

#### Threat scenario

An adversary publishes a malicious update to a popular browser AI
extension through a compromised extension developer account using
AML.T0012. The update contains a hidden instruction that, when the
agent processes any web page containing financial keywords, uses
AML.T0047 to redirect the agent to capture and exfiltrate clipboard
content and visible form fields — including authentication tokens and
financial data — to an attacker-controlled server.

#### Mitigations aligned to ATLAS

**Against AML.T0012 (Valid Accounts — extension supply chain):**
- Approved extension list enforced at device management layer —
  unapproved extensions blocked
- Extension integrity verification before approval —
  cryptographic signature verification

**Against AML.T0047 (Bypass ML Model — prompt injection via web):**
- Adversarial testing of approved extensions before deployment —
  hidden prompt injection via web content scenarios tested
- Browser isolation for highest-risk tasks

#### Cross-references
- Agentic Top 10: ASI10 Rogue Agents
- DSGAI 2026: DSGAI03 Shadow AI
- Other frameworks: ISO 27001 A.8.1/A.8.7 · EU AI Act Art. 9

---

### DSGAI17 — Data Availability and Resilience Failures

**Severity:** High

RAG pipelines fail silently when vector stores degrade — adversaries
can trigger this failure mode deliberately through resource exhaustion
attacks.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Denial of ML Service | AML.T0029 | Impact | Adversary saturates vector store with resource-exhausting queries — RAG pipeline degrades silently |
| Erode ML Model Integrity | AML.T0034 | Impact | Adversary triggers silent RAG degradation — stale or empty retrieval causes model to generate plausible misinformation |
| Cost Harvesting | AML.T0057 | Impact | Adversary submits computationally expensive vector similarity search queries — cost exhaustion affects availability |

**OT amplifier:** In OT environments, silent RAG failures producing
incorrect operational guidance can propagate to process control before
detection — elevated to Critical severity. See LLM_ISA62443.md
and DSGAI_ISA62443.md for OT-specific controls.

#### Threat scenario

An adversary targets a predictive maintenance system that uses RAG
to retrieve equipment-specific procedures. Using AML.T0029, they
flood the vector store with high-cardinality queries that saturate
the search index. The vector store degrades silently — returning
empty results that the LLM fills with plausible but hallucinated
procedures using AML.T0034. Maintenance technicians follow the
incorrect procedures, causing equipment damage.

#### Mitigations aligned to ATLAS

**Against AML.T0029 (Denial of ML Service):**
- Rate limiting on vector similarity search endpoints —
  prevent adversarial saturation attacks on retrieval tier
- Circuit breakers — degrade gracefully to non-RAG
  responses rather than silently serving empty or stale
  results

**Against AML.T0034 (Erode ML Model Integrity via silent failure):**
- Health checks on vector store freshness — alert when
  index staleness exceeds threshold before misinformation
  reaches users
- Graceful degradation notices — users informed when
  retrieval is unavailable, not silently served bad results

**Against AML.T0057 (Cost Harvesting):**
- Token limits and query complexity limits on vector search —
  computationally expensive queries rejected before execution

#### Cross-references
- LLM Top 10: LLM10 Unbounded Consumption
- Agentic Top 10: ASI08 Cascading Agent Failures
- Other frameworks: ISA/IEC 62443 SR 7.6 (OT) · NIST SP 800-82 (OT) · AIUC-1 D

---

### DSGAI18 — Inference and Data Reconstruction

**Severity:** High

Adversaries reconstruct sensitive training data through membership
inference, model inversion, and embedding inversion attacks. ATLAS
documents this as a primary adversarial ML exfiltration tactic with
multiple documented real-world cases.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Infer Training Data Membership | AML.T0024 | Exfiltration | Adversary systematically queries model to determine if specific individuals or records are in the training data |
| Verify Attack | AML.T0040 | Exfiltration | Adversary confirms inference attack success — verifies membership inference results through targeted queries |
| Search for Victim AI/ML Information | AML.T0007 | Reconnaissance | Adversary researches target model's training data sources and privacy measures before launching inference attack |

#### Threat scenario

A financial institution deploys an LLM trained on customer transaction
data for internal analytics. An adversary uses AML.T0007 to identify
that the model was trained on transaction records and that no
differential privacy was applied. Using AML.T0024, they confirm that
specific high-value customer accounts are in the training set. Using
AML.T0040, they verify that transaction patterns for those accounts
can be recovered through targeted output analysis — without accessing
the underlying database.

#### Mitigations aligned to ATLAS

**Against AML.T0024 (Infer Training Data Membership):**
- Apply differential privacy during training — limits
  membership inference success rate
- Suppress confidence scores and logits — membership inference
  requires these values to make statistical determinations
- Output rate limiting — limits inference query volume

**Against AML.T0040 (Verify Attack):**
- Anomaly detection on systematic query patterns —
  membership inference verification requires distinctive
  query patterns detectable through monitoring

**Against AML.T0007 (Reconnaissance):**
- Document privacy measures publicly — transparent
  disclosure of differential privacy use reduces attacker
  intelligence advantage and demonstrates due diligence

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure, LLM08 Vector and Embedding Weaknesses
- DSGAI 2026: DSGAI10 Synthetic Data Pitfalls
- Other frameworks: ISO 27001 A.8.11 · GDPR Art. 25 · EU AI Act Art. 10

---

### DSGAI19 — Human-in-Loop and Labeler Overexposure

**Severity:** Medium

Human annotators and HITL reviewers access sensitive model inputs —
adversaries target labelling platforms as a secondary access path
to data that is more accessible than production systems.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Data from Inference API | AML.T0037 | Collection | Adversary compromises labelling platform to access sensitive data exposed to annotators |
| Valid Accounts | AML.T0012 | Initial Access | Adversary uses compromised annotator credentials to access labelling platform and view sensitive tasks |
| LLM Data Leakage | AML.T0025 | Exfiltration | Sensitive data in labelling tasks exfiltrated through annotator access — less protected than production system |

#### Threat scenario

A medical AI company uses a third-party labelling platform for
annotation of sensitive clinical notes. An adversary compromises
a contractor annotator account using AML.T0012 and uses AML.T0037
to access the labelling platform's task queue — which exposes full
clinical notes to annotators. The labelling platform has weaker
access controls than the production model, making it a softer
target for the same data.

#### Mitigations aligned to ATLAS

**Against AML.T0012 (Valid Accounts — labelling platform):**
- MFA required for all labelling platform access
- Security assessment of all labelling vendors before use

**Against AML.T0037 (Data from Inference API — labelling):**
- Data minimisation for labelling tasks — annotators see
  only minimum content required, not full source records
- Anonymise or pseudonymise sensitive content before
  exposure to annotators

#### Cross-references
- DSGAI 2026: DSGAI07 Data Governance, DSGAI08 Non-Compliance
- Other frameworks: ISO 27001 A.5.34/A.6.3 · GDPR Art. 28

---

### DSGAI20 — Model Exfiltration and IP Replication

**Severity:** High

Adversaries reconstruct a functional model replica through systematic
querying — stealing proprietary training investment without accessing
original weights. ATLAS documents this as a primary adversarial
ML exfiltration tactic.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| ML Model Extraction Attack | AML.T0016 | Exfiltration | Adversary systematically queries the model to reconstruct a functional replica — stealing IP without accessing weights |
| Verify Attack | AML.T0040 | Exfiltration | Adversary benchmarks replicated model against original — verifies extraction quality through comparative queries |
| Search for Victim AI/ML Information | AML.T0007 | Reconnaissance | Adversary researches target model architecture and capabilities before designing extraction strategy |

#### Threat scenario

A competitor targets a proprietary fine-tuned LLM using AML.T0007
to research the model's capabilities and likely architecture from
public documentation and API responses. Using AML.T0016, they
design a systematic query strategy that covers the model's output
space across key use cases. After 50,000 API calls, they have
sufficient input-output pairs to train a functional replica. Using
AML.T0040, they verify the replica matches the original on benchmark
tasks. The proprietary training investment is replicated at a fraction
of the cost.

#### Mitigations aligned to ATLAS

**Against AML.T0016 (ML Model Extraction Attack):**
- API rate limiting and query volume caps — systematic
  extraction requires high query volumes
- Output perturbation — add calibrated noise to confidence
  scores without degrading utility, increasing extraction noise
- Query diversity anomaly detection — extraction requires
  systematically diverse queries, detectable through monitoring

**Against AML.T0040 (Verify Attack — model quality verification):**
- Detect systematic benchmarking behaviour — repeated
  queries on known benchmark datasets from a single source
  triggers investigation

**Against AML.T0007 (Reconnaissance):**
- Limit publicly disclosed model architecture and capability
  details — reduce attacker intelligence for extraction strategy

#### Cross-references
- LLM Top 10: LLM02 Sensitive Information Disclosure
- DSGAI 2026: DSGAI18 Inference and Data Reconstruction
- Other frameworks: ISO 27001 A.5.12/A.8.3 · NIST AI RMF MS-2.5

---

### DSGAI21 — Disinformation and Integrity Attacks via Data Poisoning

**Severity:** High

Adversaries inject false content into trusted retrieval sources so
AI systems surface it as authoritative output. ATLAS documents the
data poisoning technique and the backdoor technique used for persistent
disinformation at the RAG layer.

#### ATLAS mapping

| Technique | ID | Tactic | How it applies |
|---|---|---|---|
| Publish Poisoned Datasets | AML.T0045 | ML Attack Staging | Adversary injects false or misleading content into trusted retrieval sources — RAG corpora, knowledge bases, web indexes |
| Poison Training Data | AML.T0020 | ML Attack Staging | Adversary poisons the RAG corpus with adversarially crafted documents designed to be retrieved for specific queries |
| Exploit Public-Facing Application | AML.T0054 | Execution | Adversary exploits weaknesses in RAG ingestion pipeline to inject poisoned content into the corpus |

#### Threat scenario

A nation-state actor targets a financial AI assistant's RAG corpus
using AML.T0045 — they publish authoritative-looking but false
regulatory guidance documents on public web sources that the RAG
system indexes. Using AML.T0020, they craft the documents to rank
highly for specific regulatory compliance queries. The AI assistant
surfaces the false guidance as authoritative to financial analysts —
with no need to compromise the model itself, just the data sources
it trusts.

#### Mitigations aligned to ATLAS

**Against AML.T0045 (Publish Poisoned Datasets):**
- Source trust tiering in RAG retrieval — weight results
  by provenance and trust score, not only semantic similarity
- Threat intelligence on disinformation campaigns targeting
  your specific domain and retrieval sources

**Against AML.T0020 (Poison Training Data — RAG corpus):**
- Ingestion anomaly detection — statistical and semantic
  scanning for unusual content before production indexing
- Dataset Bill of Materials with cryptographic provenance —
  detect unauthorised modification to retrieval corpora

**Against AML.T0054 (Exploit Public-Facing Application — RAG ingestion):**
- Harden all RAG ingestion endpoints — input validation,
  schema enforcement, path traversal prevention

#### Cross-references
- LLM Top 10: LLM04 Data and Model Poisoning, LLM09 Misinformation
- Agentic Top 10: ASI06 Memory and Context Poisoning
- Other frameworks: MITRE ATT&CK · ISO 27001 A.5.7 · EU AI Act Art. 55(1)(a)

---

## ATLAS technique coverage summary

| ATLAS Technique | ID | DSGAI entries that exploit it |
|---|---|---|
| Infer Training Data Membership | AML.T0024 | DSGAI01, DSGAI09, DSGAI10, DSGAI11, DSGAI18 |
| LLM Data Leakage | AML.T0025 | DSGAI01, DSGAI03, DSGAI06, DSGAI09, DSGAI11, DSGAI12, DSGAI13, DSGAI14 |
| Poison Training Data | AML.T0020 | DSGAI04, DSGAI05, DSGAI21 |
| Data from Inference API | AML.T0037 | DSGAI01, DSGAI03, DSGAI06, DSGAI07, DSGAI09, DSGAI13, DSGAI14, DSGAI15, DSGAI16, DSGAI19 |
| Valid Accounts | AML.T0012 | DSGAI02, DSGAI03, DSGAI13, DSGAI16, DSGAI19 |
| ML Model Extraction Attack | AML.T0016 | DSGAI20 |
| Backdoor ML Model | AML.T0032 | DSGAI04 |
| Prompt Injection | AML.T0051 | DSGAI12, DSGAI15 |
| Publish Poisoned Datasets | AML.T0045 | DSGAI21 |
| Denial of ML Service | AML.T0029 | DSGAI17 |
| Verify Attack | AML.T0040 | DSGAI08, DSGAI10, DSGAI18, DSGAI20 |
| Bypass ML Model | AML.T0047 | DSGAI02, DSGAI12, DSGAI16 |
| Exploit Public-Facing Application | AML.T0054 | DSGAI05, DSGAI21 |

---

## References

- MITRE ATLAS: https://atlas.mitre.org
- ATLAS tactics and techniques: https://atlas.mitre.org/matrices/ATLAS
- OWASP GenAI Data Security Risks 2026: https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/
- MITRE ATT&CK for ICS: https://attack.mitre.org/matrices/ics/
- LLM Top 10 x MITRE ATLAS: see LLM_MITREATLAS.md in this repository
- Agentic Top 10 x MITRE ATLAS: see Agentic_MITREATLAS.md in this repository

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-25 | 2026-Q1 | Initial mapping — DSGAI01-DSGAI21 full entries with ATLAS technique coverage summary | OWASP GenAI Data Security Initiative |

---

Maintained by the OWASP GenAI Data Security Initiative.
Part of the GenAI Security Crosswalk: https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
