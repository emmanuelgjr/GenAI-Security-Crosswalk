<!--
  GenAI Security Crosswalk
  Source list : OWASP GenAI Data Security Risks 2026 (DSGAI01-DSGAI21)
  Framework   : OWASP Non-Human Identities (NHI) Top 10
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# DSGAI 2026 × OWASP NHI Top 10

Mapping the [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
(DSGAI01–DSGAI21) to the [OWASP Non-Human Identities (NHI) Top 10](https://owasp.org/www-project-non-human-identities-top-10/) —
the framework for securing the machine identities, service accounts, tokens,
and secrets that every GenAI data flow depends on.

---

## Why NHI matters for GenAI data security

The DSGAI taxonomy is fundamentally about data: how GenAI data flows
are configured, accessed, protected, and governed. Every data flow
requires credentials — NHI. Training pipelines, embedding stores,
RAG retrieval systems, tool integrations, inference APIs, and audit
logging systems all authenticate with Non-Human Identities.

The NHI risks that most directly amplify DSGAI vulnerabilities:

- **Agent identity & credential exposure (DSGAI02):** the most
  NHI-central risk — secrets in prompts/memory, weak storage, and
  long-lived tokens (NHI-2, NHI-6, NHI-7) are exactly what attackers
  extract and replay.
- **Sensitive data leakage (DSGAI01):** over-privileged service
  accounts turn RAG over-retrieval into mass disclosure (NHI-5).
- **Data, model & artifact poisoning (DSGAI04):** possible only when
  pipeline credentials have write access to training/RAG stores (NHI-5, NHI-7).
- **Vector store platform security (DSGAI13):** weak machine-to-machine
  auth and over-scoped tokens expose the embedding tier (NHI-4, NHI-5).
- **Model exfiltration (DSGAI20):** long-lived, over-scoped inference
  API credentials enable sustained extraction campaigns (NHI-5, NHI-7).

NHI programme maturity is a prerequisite for DSGAI risk reduction —
you cannot secure GenAI data flows without securing the credentials
that access them.

---

## OWASP NHI Top 10 reference

| NHI Entry | Name | Description |
|---|---|---|
| NHI-1 | Improper Offboarding | NHIs not revoked when systems decommission or integrations end |
| NHI-2 | Secret Leakage | Credentials exposed in code, logs, config, model outputs |
| NHI-3 | Vulnerable Third-Party NHI | Third-party tokens and identities with excessive permissions |
| NHI-4 | Insecure Authentication | Weak or missing authentication for machine-to-machine communication |
| NHI-5 | Over-Privileged NHI | NHIs with more permissions than required |
| NHI-6 | Insecure Credential Storage | Credentials stored insecurely — plaintext, weak encryption |
| NHI-7 | Long-Lived Credentials | Credentials without rotation, expiry, or revocation |
| NHI-8 | Environment Isolation Failure | Credentials shared across environments |
| NHI-9 | NHI Reuse | Same credentials used across multiple services or data flows |
| NHI-10 | Human Use of NHI | Humans using machine credentials — no attribution |

---

## Quick-reference summary

| DSGAI ID | Name | Severity | Primary NHI Entries | Tier |
|---|---|---|---|---|
| DSGAI01 | Sensitive Data Leakage | Critical | NHI-5, NHI-2 | Foundational–Advanced |
| DSGAI02 | Agent Identity & Credential Exposure | Critical | NHI-2, NHI-6, NHI-7, NHI-5 | Hardening–Advanced |
| DSGAI03 | Shadow AI & Unsanctioned Data Flows | High | NHI-3, NHI-10, NHI-8 | Foundational–Hardening |
| DSGAI04 | Data, Model & Artifact Poisoning | Critical | NHI-5, NHI-7 (write access) | Hardening–Advanced |
| DSGAI05 | Data Integrity & Validation Failures | High | NHI-4, NHI-5 | Foundational–Hardening |
| DSGAI06 | Tool, Plugin & Agent Data Exchange | High | NHI-3, NHI-5, NHI-9 | Foundational–Hardening |
| DSGAI07 | Data Governance, Lifecycle & Classification | High | NHI-1, NHI-10 | Foundational–Hardening |
| DSGAI08 | Non-Compliance & Regulatory Violations | High | NHI-10, NHI-1 (attribution) | Foundational–Hardening |
| DSGAI09 | Multimodal Cross-Channel Data Leakage | High | NHI-5, NHI-2 | Hardening–Advanced |
| DSGAI10 | Synthetic Data & Anonymisation Pitfalls | Medium | NHI-5 (pipeline access) | Hardening–Advanced |
| DSGAI11 | Cross-Context Conversation Bleed | High | NHI-9, NHI-8 | Hardening–Advanced |
| DSGAI12 | Unsafe NL Data Gateways | Critical | NHI-5, NHI-4 | Foundational–Advanced |
| DSGAI13 | Vector Store Platform Security | High | NHI-4, NHI-5, NHI-6 | Foundational–Hardening |
| DSGAI14 | Excessive Telemetry & Monitoring Leakage | High | NHI-2, NHI-5 (log access) | Foundational–Hardening |
| DSGAI15 | Over-Broad Context Windows | High | NHI-5 | Hardening–Advanced |
| DSGAI16 | Endpoint & Browser Assistant Overreach | High | NHI-5, NHI-10 | Foundational–Hardening |
| DSGAI17 | Data Availability & Resilience Failures | High | NHI-1, NHI-8 | Foundational–Hardening |
| DSGAI18 | Inference & Data Reconstruction | High | NHI-5, NHI-7 (API access) | Hardening–Advanced |
| DSGAI19 | Human-in-Loop & Labeler Overexposure | Medium | NHI-10, NHI-5 | Foundational–Hardening |
| DSGAI20 | Model Exfiltration & IP Replication | High | NHI-5, NHI-7, NHI-6 | Hardening–Advanced |
| DSGAI21 | Disinformation via Data Poisoning | High | NHI-3, NHI-5, NHI-7 | Hardening–Advanced |

---

## Audience tags

- **Identity and access management (IAM) team** — full file
- **Data engineer / ML engineer** — DSGAI04, DSGAI13 — pipeline and vector-store NHI
- **Security engineer** — NHI-2/NHI-5/NHI-7 most actionable
- **Platform engineer** — NHI-4/NHI-8/NHI-9 for infrastructure design
- **Auditor** — NHI-1/NHI-10 for attribution and offboarding evidence

---

## Detailed mappings

---

### DSGAI01 — Sensitive Data Leakage

Over-privileged service accounts turn a single RAG query into mass disclosure:
the model can only return what the retrieval identity is allowed to read, and
secrets reachable by that identity may surface in outputs.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-5 Over-Privileged NHI | Retrieval/service account scope defines the disclosure blast radius | Least-privilege, per-tenant retrieval identities |
| NHI-2 Secret Leakage | Credentials reachable by the pipeline can leak into outputs/logs | Keep secrets out of context; scan outputs for credential patterns |

**Mitigations:**
- NHI-5: scope retrieval credentials to the caller's authorised data only.
- NHI-2: vault all secrets; never place them in prompts or system messages.

---

### DSGAI02 — Agent Identity & Credential Exposure

The most NHI-central DSGAI risk: agents inherit, cache, and pass machine
credentials that attackers extract or replay. Secrets in prompts, weak storage,
and long-lived tokens are the direct failure modes.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-2 Secret Leakage | Agent secrets surface in prompts, memory, logs, tool payloads | Secret-scan all agent I/O; never embed secrets in context |
| NHI-6 Insecure Credential Storage | Cached agent credentials stored insecurely | Store all credentials in a vault, encrypted at rest |
| NHI-7 Long-Lived Credentials | Stolen agent tokens remain valid indefinitely | Issue short-lived, auto-rotated tokens |
| NHI-5 Over-Privileged NHI | A compromised agent identity has excessive reach | Scope each agent identity to least privilege |

**Mitigations:**
- NHI-2/NHI-6: vault + secret-scan; remove credentials from model context entirely.
- NHI-7: short-lived tokens with automated rotation and revocation.
- NHI-5: per-agent scoped identities; no shared high-privilege secret.

---

### DSGAI03 — Shadow AI & Unsanctioned Data Flows

Unapproved AI tools authenticate with unmanaged third-party identities and
machine credentials used without attribution, moving data outside the boundary.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-3 Vulnerable Third-Party NHI | Unsanctioned tools hold unreviewed, over-scoped tokens | Inventory and gate third-party AI integrations |
| NHI-10 Human Use of NHI | Staff use shared machine credentials for shadow tools, no attribution | Enforce human identity; block shared-credential use |
| NHI-8 Environment Isolation Failure | Shadow flows reuse prod credentials in unmanaged contexts | Separate and scope credentials per environment |

**Mitigations:**
- NHI-3: allowlist and scope-review every third-party AI integration.
- NHI-10: attribute all access to a human or governed service identity.

---

### DSGAI04 — Data, Model & Artifact Poisoning

Poisoning of training data, weights, or RAG corpora is only possible when the
pipeline identity holds write access — and long-lived write tokens widen the window.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-5 Over-Privileged NHI | Write access to training/RAG stores enables poisoning | Read-only by default; write scoped to vetted ingestion jobs |
| NHI-7 Long-Lived Credentials | Persistent write tokens give attackers a durable poisoning path | Short-lived, job-scoped write credentials |

**Mitigations:**
- NHI-5: separate read vs write identities; restrict write to signed ingestion.
- NHI-7: ephemeral write tokens per ingestion run; revoke on completion.

---

### DSGAI05 — Data Integrity & Validation Failures

Weak machine-to-machine authentication lets unvalidated or spoofed data enter
pipelines; over-scoped identities let it propagate.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-4 Insecure Authentication | Unauthenticated pipeline stages accept spoofed/malformed data | Enforce mTLS / signed requests between stages |
| NHI-5 Over-Privileged NHI | Over-scoped jobs persist bad data widely | Scope each pipeline stage's identity to its inputs/outputs |

**Mitigations:**
- NHI-4: mutual authentication on every inter-service data hop.
- NHI-5: per-stage least-privilege identities.

---

### DSGAI06 — Tool, Plugin & Agent Data Exchange

Tool and plugin integrations authenticate with third-party and reused
identities; over-scoped or shared credentials widen the exchange's trust gap.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-3 Vulnerable Third-Party NHI | Tool tokens carry excessive permissions | Vet and minimum-scope every tool credential |
| NHI-5 Over-Privileged NHI | A tool identity can reach more data than the task needs | Scope tool identities per function |
| NHI-9 NHI Reuse | One credential shared across tools amplifies compromise | Distinct credential per tool/integration |

**Mitigations:**
- NHI-3/NHI-5: per-tool least-privilege, reviewed credentials.
- NHI-9: never reuse a credential across tools or data flows.

---

### DSGAI07 — Data Governance, Lifecycle & Classification

Ungoverned identities outlive the integrations they served and obscure who/what
touched data, undermining lifecycle and classification controls.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-1 Improper Offboarding | Identities for retired data flows linger with live access | Auto-revoke NHI on component decommission |
| NHI-10 Human Use of NHI | Shared machine identities break data-access attribution | Enforce attributable identity per access |

**Mitigations:**
- NHI-1: tie identity lifecycle to component lifecycle.
- NHI-10: attributable access underpins classification/lifecycle audit.

---

### DSGAI08 — Non-Compliance & Regulatory Violations

Compliance requires attribution and lawful, revocable access — undermined when
machine identities are unattributable or not offboarded.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-10 Human Use of NHI | No attribution → cannot demonstrate lawful, accountable processing | Enforce human/governed identity for regulated data |
| NHI-1 Improper Offboarding | Stale access breaches retention and access obligations | Revoke access on offboarding; evidence it |

**Mitigations:**
- NHI-10: attributable access for every regulated-data operation.
- NHI-1: auditable revocation tied to lawful-basis lifecycle.

---

### DSGAI09 — Multimodal Cross-Channel Data Leakage

Multimodal pipelines add ingestion identities (image/audio/doc processors);
over-scoped ones widen leakage paths, and secrets can surface in extracted content.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-5 Over-Privileged NHI | Modality processors reach more data than needed | Scope each modality pipeline identity |
| NHI-2 Secret Leakage | Secrets embedded in media/metadata surface via processors | Strip metadata; scan extracted content for secrets |

**Mitigations:**
- NHI-5: least-privilege per modality processor.
- NHI-2: redact secrets from all extracted modality content.

---

### DSGAI10 — Synthetic Data & Anonymisation Pitfalls

Synthetic-data generation jobs need access to source (often sensitive) data;
over-scoped generation identities expand the re-identification exposure.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-5 Over-Privileged NHI | Generation jobs read broad source data, raising linkage risk | Scope generation identities to the minimum source set |

**Mitigations:**
- NHI-5: minimum-scope source access for synthetic-data pipelines; isolate outputs.

---

### DSGAI11 — Cross-Context Conversation Bleed

Reused identities and shared environments cause session/tenant state to bleed
across contexts.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-9 NHI Reuse | A shared session-store identity links tenants/sessions | Distinct identity per tenant/session boundary |
| NHI-8 Environment Isolation Failure | Shared-environment credentials cross context boundaries | Enforce per-environment credential isolation |

**Mitigations:**
- NHI-9: no shared credential across tenants/sessions.
- NHI-8: isolate credentials and state per environment.

---

### DSGAI12 — Unsafe NL Data Gateways

NL-to-SQL/API gateways execute under a machine identity; if that identity is
over-privileged, generated queries inherit excessive reach.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-5 Over-Privileged NHI | Gateway service account can run destructive/over-broad queries | Execute under the user's scoped permissions, not a privileged account |
| NHI-4 Insecure Authentication | Weak gateway-to-DB auth enables spoofing | Strong mutual auth to the data source |

**Mitigations:**
- NHI-5: identity passthrough; read-scoped, parameterised execution.
- NHI-4: authenticated, least-privilege DB connections.

---

### DSGAI13 — Vector Store Platform Security

The embedding tier authenticates with machine identities; weak auth, over-scope,
or insecure secret storage exposes the whole RAG corpus.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-4 Insecure Authentication | Vector DB exposed via weak/no auth | Enforce strong auth and network restriction |
| NHI-5 Over-Privileged NHI | Service accounts read across namespaces/tenants | Per-namespace scoped identities |
| NHI-6 Insecure Credential Storage | Vector-store credentials stored in plaintext | Vault all vector-store credentials |

**Mitigations:**
- NHI-4/NHI-5: authenticated, per-namespace least-privilege access.
- NHI-6: vault credentials; rotate regularly.

---

### DSGAI14 — Excessive Telemetry & Monitoring Leakage

Telemetry systems both capture secrets (NHI-2) and run under identities that, if
over-scoped, expose the captured data.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-2 Secret Leakage | Credentials captured in logs/traces | Redact secrets before logging; scan sinks |
| NHI-5 Over-Privileged NHI | Broad log-store access widens exposure | Scope log-store access; restrict who/what reads telemetry |

**Mitigations:**
- NHI-2: redaction in the telemetry path; CI secret scanning.
- NHI-5: least-privilege access to log/trace stores.

---

### DSGAI15 — Over-Broad Context Windows

Context assembly runs under a retrieval identity; an over-scoped one pulls more
data into the window than the task authorises.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-5 Over-Privileged NHI | The assembling identity can fetch beyond task need | Scope context-assembly identity to the caller's authorised data |

**Mitigations:**
- NHI-5: authorise each context item against the caller's identity, not a broad service account.

---

### DSGAI16 — Endpoint & Browser Assistant Overreach

Endpoint assistants act under local/machine identities; over-scope or human use
of machine credentials lets them reach data beyond their mandate.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-5 Over-Privileged NHI | The assistant identity can access files/resources beyond scope | Grant minimal, declared local permissions |
| NHI-10 Human Use of NHI | Assistant acts as the user without attribution | Bind actions to an attributable identity with consent |

**Mitigations:**
- NHI-5: least-privilege endpoint permissions; explicit consent.
- NHI-10: attributable, consented local actions.

---

### DSGAI17 — Data Availability & Resilience Failures

Resilience depends on identity lifecycle and environment separation — stale
identities and shared-environment credentials undermine recovery integrity.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-1 Improper Offboarding | Orphaned identities complicate clean recovery/failover | Lifecycle-managed identities for data/model assets |
| NHI-8 Environment Isolation Failure | Shared credentials let one environment's failure cascade | Separate credentials per environment |

**Mitigations:**
- NHI-1: identity lifecycle tied to asset lifecycle; tested recovery.
- NHI-8: environment-isolated credentials limit cascade scope.

---

### DSGAI18 — Inference & Data Reconstruction

Sustained extraction needs API access; over-scoped, long-lived inference
credentials enable large query campaigns that reconstruct training data.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-5 Over-Privileged NHI | Broad inference API scope enables high-volume probing | Scope and rate-limit inference identities |
| NHI-7 Long-Lived Credentials | Durable API keys sustain extraction campaigns | Short-lived inference tokens with per-principal budgets |

**Mitigations:**
- NHI-5/NHI-7: scoped, short-lived, budgeted inference credentials.

---

### DSGAI19 — Human-in-Loop & Labeler Overexposure

Reviewers often use shared machine identities to access labeling data, removing
attribution and over-exposing sensitive records.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-10 Human Use of NHI | Labellers share a machine identity, no per-reviewer attribution | Attributable per-reviewer identity |
| NHI-5 Over-Privileged NHI | Reviewer tooling reaches more records than the queue needs | Scope reviewer access to assigned items |

**Mitigations:**
- NHI-10: attributable reviewer identities; audit access.
- NHI-5: queue-scoped access; mask non-essential fields.

---

### DSGAI20 — Model Exfiltration & IP Replication

Weights and inference APIs are accessed via machine identities; over-scope,
long-lived keys, and insecure weight storage enable extraction and theft.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-5 Over-Privileged NHI | Broad API/weight access enables extraction | Scope inference and artifact-store identities |
| NHI-7 Long-Lived Credentials | Durable keys sustain stealing campaigns | Short-lived keys; per-principal query budgets |
| NHI-6 Insecure Credential Storage | Weight-store credentials in plaintext enable direct theft | Vault weight-store credentials; encrypt at rest |

**Mitigations:**
- NHI-5/NHI-7: scoped, short-lived, budgeted access; anomaly detection.
- NHI-6: protect weight artefacts behind vaulted, least-privilege identities.

---

### DSGAI21 — Disinformation via Data Poisoning

Disinformation injection mirrors poisoning: it requires write/ingest access via
third-party or over-scoped identities, often with long-lived tokens.

#### NHI mapping

| NHI Entry | How it applies | Mitigation |
|---|---|---|
| NHI-3 Vulnerable Third-Party NHI | Third-party source credentials inject tainted content | Vet and scope third-party data-source identities |
| NHI-5 Over-Privileged NHI | Write access to corpora enables systematic injection | Read-only by default; scoped, signed ingestion |
| NHI-7 Long-Lived Credentials | Durable write tokens sustain a poisoning campaign | Ephemeral, job-scoped write credentials |

**Mitigations:**
- NHI-3/NHI-5/NHI-7: vetted, scoped, short-lived ingestion identities; provenance tracking.

---

## NHI programme maturity for GenAI data security

| NHI Risk | DSGAI entries most affected | Target state | Owner |
|---|---|---|---|
| NHI-1 Improper Offboarding | DSGAI07, DSGAI08, DSGAI17 | Automated on component decommission | IAM |
| NHI-2 Secret Leakage | DSGAI01, DSGAI02, DSGAI14 | Automated scanning in CI/CD | DevSecOps |
| NHI-3 Third-Party NHI | DSGAI03, DSGAI06, DSGAI21 | Assessed and minimum-scoped | Security |
| NHI-4 Insecure Authentication | DSGAI05, DSGAI12, DSGAI13 | mTLS enforced across pipelines | Platform |
| NHI-5 Over-Privileged NHI | DSGAI01, DSGAI04, DSGAI18, DSGAI20 | Least-privilege per component | IAM |
| NHI-6 Insecure Storage | DSGAI02, DSGAI13, DSGAI20 | All credentials in vault | Platform |
| NHI-7 Long-Lived | DSGAI02, DSGAI04, DSGAI18, DSGAI20 | Rotation automated | IAM |
| NHI-8 Env Isolation | DSGAI11, DSGAI17 | Env separation enforced | DevSecOps |
| NHI-9 NHI Reuse | DSGAI06, DSGAI11 | Separate credential per component | IAM |
| NHI-10 Human Use | DSGAI03, DSGAI08, DSGAI19 | Human identity enforced for compliance | IAM |

---

## See also

- [Agentic Top 10 × NHI](../agentic-top10/Agentic_NHI.md)
- [LLM Top 10 × NHI](../llm-top10/LLM_NHI.md)

---

## References

- [OWASP NHI Top 10](https://owasp.org/www-project-non-human-identities-top-10/)
- [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
- [Agentic_NHI.md](../agentic-top10/Agentic_NHI.md) — NHI-to-ASI cross-mapping
- [LLM_NHI.md](../llm-top10/LLM_NHI.md) — NHI for LLM deployments
- [shared/RECIPES.md](../shared/RECIPES.md) — Pattern 3: JIT Credential Issuance

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-03-27 | Initial release — full mapping DSGAI01–DSGAI21 to NHI Top 10 |
| 1.1.0 | 2026-05-29 | Corrected to canonical DSGAI 2026 taxonomy (entries had used a pre-release taxonomy); NHI mappings, mitigations, and cross-references rewritten to match |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) —
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
*License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)*
