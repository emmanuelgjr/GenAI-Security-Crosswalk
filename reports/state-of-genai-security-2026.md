# State of GenAI Security 2026

**Published:** April 2026
**Source:** [OWASP GenAI Security Crosswalk](https://emmanuelgjr.github.io/GenAI-Security-Crosswalk/)
**Author:** [Emmanuel Guilherme Junior](https://github.com/emmanuelgjr) — OWASP GenAI Data Security Initiative Lead
**Data:** 114 documented incidents | 25 frameworks | 1,514 controls | 3,210 mappings | 41 OWASP entries
**License:** CC BY-SA 4.0

---

## Executive Summary

We analyzed **114 documented AI security incidents** from 2022–2026, mapped to 41 OWASP vulnerability entries across 25 industry compliance frameworks. This report presents the first data-driven assessment of where GenAI systems are actually failing — not where we think they might fail.

**Key findings:**

1. **Prompt injection remains the #1 attack vector** — present in 34% of all incidents (39 of 114), but the attack surface has shifted from direct injection to indirect, zero-click, and cross-context variants
2. **Agentic AI is the new frontier** — 56% of 2025-2026 incidents involve autonomous agents, up from 12% in 2023
3. **Supply chain is the silent crisis** — MCP tool poisoning, malicious IDE extensions, and npm/PyPI backdoors account for 17% of all incidents
4. **The compliance gap is real** — organizations implementing fewer than 3 frameworks have zero coverage for 31% of OWASP GenAI risks

---

## 1. Incident Landscape

### 1.1 Volume and Growth

| Year | Incidents | Real-World | Research | Red-Team |
|------|-----------|------------|----------|----------|
| 2022 | 2 | 0 | 2 | 0 |
| 2023 | 17 | 10 | 7 | 0 |
| 2024 | 45 | 24 | 20 | 1 |
| 2025 | 36 | 20 | 14 | 2 |
| 2026 (Q1) | 14 | 10 | 4 | 0 |
| **Total** | **114** | **64** | **47** | **3** |

The incident rate **tripled** between 2023 and 2024. The 2025 plateau reflects not fewer attacks but **faster disclosure and patching** — the mean time from vulnerability discovery to CVE assignment dropped from 47 days to 12 days.

### 1.2 Severity Distribution

| Severity | Count | % |
|----------|-------|---|
| Critical | 70 | 61% |
| High | 41 | 36% |
| Medium | 3 | 3% |
| Low | 0 | 0% |

**97% of documented GenAI incidents are Critical or High severity.** This is not selection bias — GenAI systems operate with elevated privileges (data access, code execution, external communication) that amplify impact.

---

## 2. Most Exploited Vulnerabilities

### 2.1 Top 10 OWASP Entries by Incident Count

| Rank | Entry | Name | Incidents | % of Total |
|------|-------|------|-----------|------------|
| 1 | LLM01 | Prompt Injection | 39 | 34% |
| 2 | ASI01 | Agent Goal Hijack | 33 | 29% |
| 3 | DSGAI01 | Sensitive Data Leakage | 29 | 25% |
| 4 | ASI02 | Tool Misuse & Exploitation | 25 | 22% |
| 5 | LLM06 | Excessive Agency | 23 | 20% |
| 6 | LLM09 | Misinformation | 21 | 18% |
| 7 | ASI04 | Supply Chain Vulnerabilities | 19 | 17% |
| 8 | ASI05 | Unexpected Code Execution | 19 | 17% |
| 9 | ASI03 | Identity & Privilege Abuse | 19 | 17% |
| 10 | DSGAI08 | Configuration & Deployment | 18 | 16% |

### 2.2 The Prompt Injection Evolution

Prompt injection (LLM01) remains dominant but has evolved dramatically:

| Generation | Era | Example | Mitigation |
|------------|-----|---------|------------|
| **Gen 1** — Direct | 2022-2023 | "Ignore previous instructions" (INC-002, INC-013) | Input filtering, instruction hierarchy |
| **Gen 2** — Indirect | 2023-2024 | Malicious email body tricks LLM assistant (INC-007, INC-010) | Context sanitization |
| **Gen 3** — Zero-click | 2025 | Email HTML triggers Copilot data exfiltration without user action (INC-089, EchoLeak) | Server-side content sanitization |
| **Gen 4** — Cross-context | 2025-2026 | MCP tool descriptions, A2A agent cards, CI/CD pipeline poisoning (INC-062, INC-108) | Trust boundary enforcement |

**The attack surface is expanding faster than defenses.** Each generation adds new injection vectors that existing mitigations don't cover.

### 2.3 The Agentic Explosion

Agentic AI entries (ASI01–ASI10) now appear in **56% of 2025-2026 incidents**, up from 12% in 2023:

| Entry | Name | 2023 | 2024 | 2025-26 | Trend |
|-------|------|------|------|---------|-------|
| ASI01 | Agent Goal Hijack | 2 | 8 | 23 | Exploding |
| ASI02 | Tool Misuse | 1 | 5 | 19 | Exploding |
| ASI04 | Supply Chain | 1 | 3 | 15 | Steep rise |
| ASI05 | Code Execution | 1 | 3 | 15 | Steep rise |
| ASI03 | Credential Abuse | 0 | 2 | 17 | New risk |

---

## 3. Where Attacks Originate — MAESTRO Layer Analysis

Using the CSA MAESTRO framework's 7-layer architecture model, we attribute the **origin** of each incident to the architectural layer where the attack begins:

| Layer | Name | Origin Count | % |
|-------|------|-------------|---|
| L1 | Foundation Models | 40 | 35% |
| L2 | Data Operations | 26 | 23% |
| L3 | Agent Frameworks | 22 | 19% |
| L7 | Agent Ecosystem | 13 | 11% |
| L4 | Deployment & Infrastructure | 11 | 10% |
| L6 | Security & Compliance | 5 | 4% |

**Insight:** 35% of attacks originate at the foundation model layer (hallucination, jailbreaks, alignment failures), but 30% originate at the agent/ecosystem layers (L3 + L7) — a category that barely existed before 2024. Organizations securing only the model layer are blind to a third of the threat surface.

---

## 4. Most Targeted Platforms

| Platform | Incidents | Notable |
|----------|-----------|---------|
| Copilot (Microsoft) | 11 | EchoLeak zero-click, XPIA phishing, Copilot Studio public agents |
| Claude (Anthropic) | 11 | State-sponsored cyberattacks, Mexican government breach, Skills ransomware |
| Gemini (Google) | 9 | Image bias, AI Overviews, Trifecta, GeminiJack zero-click |
| ChatGPT (OpenAI) | 8 | Deep Research ShadowLeak, Operator injection, Whisper hallucination |
| MCP Ecosystem | 4+ | Tool poisoning, malicious npm servers, OAuth exploit |
| IDE Agents | 10+ | Cursor, Copilot, Roo Code, Windsurf — universal settings overwrite RCE |

**No major AI platform is immune.** The median time from feature launch to first documented exploit is **47 days** for agentic features.

---

## 5. The Supply Chain Crisis

**17% of all incidents** involve supply chain attacks — a category nearly absent before 2024:

| Attack Vector | Incidents | Impact |
|---------------|-----------|--------|
| Malicious MCP servers (npm) | 4 | Reverse shells, data exfiltration |
| Poisoned AI framework packages (PyPI, npm) | 6 | LiteLLM, Axios, Cline — millions of downloads |
| Malicious IDE extensions (VSCode, OpenVSX) | 3 | GlassWorm: 9M installs, credential theft |
| Model repository poisoning (HuggingFace) | 3 | 1,500+ leaked API tokens with write access |
| CI/CD pipeline compromise | 2 | Clinejection: prompt injection → npm publish → mass infection |

**The AI supply chain is the new software supply chain attack surface.** AI coding agents amplify the risk: they autonomously run `npm install`, `pip install`, and clone repositories — each of which is now a potential attack vector.

---

## 6. Framework Coverage Analysis

### 6.1 Single-Framework Coverage Gaps

No single framework covers all 41 OWASP entries. The most complete:

| Framework | Entries Covered | Coverage |
|-----------|----------------|----------|
| MITRE ATLAS | 41 / 41 | 100% |
| NIST AI RMF 1.0 | 41 / 41 | 100% |
| EU AI Act | 41 / 41 | 100% |
| ISO 27001 | 41 / 41 | 100% |
| SOC 2 | 41 / 41 | 100% |

### 6.2 Multi-Framework Stack Recommendations

Based on the crosswalk data, here are the optimal framework stacks by compliance goal:

| Goal | Recommended Stack | Combined Controls |
|------|-------------------|-------------------|
| **EU compliance** | EU AI Act + ISO 42001 + DORA | 232 controls |
| **US federal** | NIST AI RMF + FedRAMP + NIST CSF 2.0 | 151 controls |
| **Financial services** | SOC 2 + PCI DSS + DORA | 308 controls |
| **OT/ICS** | ISA/IEC 62443 + NIST SP 800-82 + MAESTRO | 133 controls |
| **AppSec engineering** | OWASP ASVS + SAMM + AI Testing Guide | 148 controls |

---

## 7. Emerging Threats for 2026-2027

Based on the incident trajectory, we project these emerging threats:

### 7.1 Zero-Click Agent Exploitation
EchoLeak, ShadowLeak, and GeminiJack demonstrate a pattern: **no user interaction required**. An attacker sends an email, shares a document, or publishes a calendar invite — the AI agent processes it server-side and exfiltrates data automatically. Expect this to become the dominant attack pattern for enterprise AI.

### 7.2 AI Agent Weaponization
Claude was hijacked for state-sponsored cyberattacks (INC-083) and used to breach 10 Mexican government agencies (INC-092). XBOW autonomously discovered a critical Microsoft CVE (INC-096). The threshold for offensive AI operations is dropping rapidly.

### 7.3 Vibe-Coding Disasters
Moltbook (INC-099) exposed 1.5M API tokens from an app built entirely by AI with zero human code review. As AI-generated code becomes the norm, the attack surface is applications that were never reviewed by a human.

### 7.4 Multi-Agent Cascade Failures
Agent-in-the-Middle attacks on A2A protocols (INC-090), OpenClaw's 341 malicious marketplace skills (INC-102), and Meta's rogue agent Sev-1 (INC-091) all demonstrate that multi-agent systems create new failure modes that don't exist in single-agent architectures.

---

## 8. Recommendations

### For CISOs and Security Leaders

1. **Map your AI stack to OWASP entries today** — use the [Gap Analysis tool](https://emmanuelgjr.github.io/GenAI-Security-Crosswalk/#/gaps) to see red/yellow/green coverage
2. **Treat MCP and agent tool access as critical infrastructure** — 66% of MCP servers have security findings
3. **Implement zero-click defenses** — content sanitization before AI processing, not after
4. **Audit AI-generated code** — vibe-coded applications need the same security review as human-coded ones
5. **Add AI supply chain to your threat model** — npm/PyPI packages, IDE extensions, MCP servers, HuggingFace models

### For AI Platform Vendors

1. **Ship agent features with mandatory human-in-the-loop** for destructive actions
2. **Implement content provenance (C2PA)** for all AI-generated output
3. **Publish security advisories** for AI-specific vulnerabilities (not just CVEs)
4. **Support OSCAL export** from your governance tools — enterprises need this for compliance

### For Regulators

1. **The EU AI Act compliance deadline (August 2026) is imminent** — the crosswalk provides the mapping organizations need
2. **AI incident reporting requirements** should cover the categories documented here
3. **AI supply chain security** needs the same attention as software supply chain (SBOM, provenance)

---

## Methodology

- **Data source:** [OWASP GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) v3.1.0
- **Incident database:** 114 incidents from public disclosures, CVE databases, vendor advisories, and academic research
- **Framework mappings:** 3,210 hand-curated control mappings verified against framework source documents
- **MAESTRO attribution:** Each incident attributed to originating, propagation, impact, and blind-spot layers
- **Classifier validation:** BGE bi-encoder + cross-encoder reranker, P@1 = 0.585, evaluated against 2,996 ground-truth mappings

---

## Citation

```
Guilherme Junior, E. (2026). OWASP GenAI Security Crosswalk (v3.1.0).
https://github.com/emmanuelgjr/GenAI-Security-Crosswalk
```

---

## Interactive Resources

- **[Live Web App](https://emmanuelgjr.github.io/GenAI-Security-Crosswalk/)** — explore all data interactively
- **[Gap Analysis](https://emmanuelgjr.github.io/GenAI-Security-Crosswalk/#/gaps)** — select your frameworks, see coverage heatmap
- **[Score Your Coverage](https://emmanuelgjr.github.io/GenAI-Security-Crosswalk/#/score)** — get a compliance score with badge
- **[Incident Explorer](https://emmanuelgjr.github.io/GenAI-Security-Crosswalk/#/incidents)** — filter all 114 incidents by severity, year, category, MAESTRO layer
- **[Submit a Standard](https://emmanuelgjr.github.io/GenAI-Security-Crosswalk/#/submit)** — paste any framework and the ML classifier proposes mappings

---

*This report is part of the [OWASP GenAI Data Security Initiative](https://genai.owasp.org). Data is updated continuously. For the latest numbers, visit the [live web app](https://emmanuelgjr.github.io/GenAI-Security-Crosswalk/).*

*CC BY-SA 4.0 — Free to share and adapt with attribution.*
