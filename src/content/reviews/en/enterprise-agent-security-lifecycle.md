---
title: "Enterprise Agent Security: Lifecycle Governance from External Action Control to Continuous TEVV"
description: "Agent security cannot end at model output: identity, context, memory, tools, and downstream systems together form an action chain that requires continuous governance."
date: 2026-10-09
lang: en
translationKey: enterprise-agent-security-lifecycle
tags: [AI Agents, AI Security, Governance, TEVV]
---

The consequential risk of an enterprise agent is not merely that it may generate an unreliable sentence. It is whether its reasoning can become a real action through identities, data, and tools. Once a model can read email, retrieve from a knowledge base, invoke code execution, write to a database, or trigger an external system, the security object has expanded from model output to the full action chain.

The central argument is straightforward: **the model proposes candidate actions; a control plane outside the model decides whether an action may occur.** Security design must therefore put identity, authorization, context provenance, tool versioning, approval, audit, and recovery on one verifiable path.

## 1. How risk enters the action chain

Indirect prompt injection is the clearest example. Web pages, email, documents, retrieval results, and tool returns are meant to be processed as data, yet a model may interpret them as instructions to execute. An attacker need not speak directly to the agent: poisoning content that the agent can read may be enough to influence later planning and tool use. OWASP notes that RAG and fine-tuning do not fundamentally eliminate this problem; consequences can extend to unauthorized access and downstream execution.[1]

Risk is often amplified along a familiar path:

> External content → context → planning → tool call → data or system side effect

![Asset and trust boundaries across the agent action chain](/images/reviews/agent-security/agent-security-trust-boundaries-en.png)

*Figure 1. Assets and trust boundaries extend across the agent action chain.*

This is why inspecting prompts alone or filtering output alone is insufficient. PoisonedRAG reports a 90% attack success rate after inserting five poisoned passages per target query into a database containing millions of documents; it shows that a small amount of malicious content can persistently affect retrieved material.[3] This review treats persistent-memory poisoning as a distinct operational risk that deserves its own threat modeling and runtime monitoring; OWASP recommends validation, isolation, expiry, and integrity checks for retained memory.[6] Post-approval changes to MCP tool descriptions are another distinct risk surface.[7] Tool-integrated scenarios in InjecAgent likewise show that external content can alter later tool decisions. The benchmark contains 1,054 test cases across 17 user tools and 62 attacker tools, and evaluates 30 LLM agents. These experimental results are not production incident rates, but they demonstrate why action decisions cannot rely on a one-time, static acceptance test.[2]

## 2. Constrain agents through an external action-control plane

A practical principle is to separate reasoning from execution. A model may propose a tool call, but it should not decide by itself whether it owns that tool, may access the target data, or is allowed to execute that parameter combination in the present context and time window.

An external action-control plane should establish at least the following facts:

- **Who is acting:** every agent, subagent, and connector should have a distinct identity, accountable owner, and declared purpose. OWASP supports authenticating communicating agents and enforcing sender permissions; ownership and purpose binding are this review's operating-model additions.[6]
- **What is requested:** the tool, version, parameters, target resource, and expected side effect are expressed structurally.
- **Why it is permitted now:** task scope, data sensitivity, environment, time validity, and risk level enter the policy decision.
- **Whether authorization remains valid:** high-impact operations use one-time, short-lived approvals; changed parameters or resources trigger a new decision.
- **Whether the outcome is traceable and recoverable:** logs connect input provenance, planning summaries, tool versions, parameters, network destinations, and final side effects.

This does not require one particular product or framework. It requires authorization logic to sit outside the model context. For high-impact actions such as writes, deletion, payments, publication, or external egress, the model should provide only a candidate operation; a policy enforcement point and, where required, human approval must make the deterministic decision independently.

## 3. Every lifecycle stage needs a gate

![Seven lifecycle security gates](/images/reviews/agent-security/agent-security-lifecycle-gates-en.png)

*Figure 2. Lifecycle security gates form a feedback loop: changes send the system back through evaluation.*

An agent’s attack surface changes with its model, prompts, knowledge base, tools, permissions, and dependencies. Security should therefore not be treated as a single pre-deployment test, but as lifecycle gates backed by evidence.

| Stage | Question to answer | Minimum evidence |
| --- | --- | --- |
| Requirements and design | Is the use case low-risk, reversible, and bounded by a known loss limit? | Owner, prohibited actions, threat model, data boundary |
| Build and integration | Is every action-affecting component traceable? | Versions and permission review for model, prompt, tools, credentials, and dependencies |
| Testing and evaluation | Are normal utility and abuse paths tested together? | Injection, privilege abuse, exfiltration, memory-poisoning, and recovery cases |
| Deployment | Does production actually provide isolation, limits, and stopping capability? | Short-lived credentials, audit, rollback, emergency-stop exercises |
| Operations | Can the system connect anomalous actions to their source, sequence, and consequence? | Runtime observation, anomaly detection, downgrade or isolation policy |
| Change | Are version, permission, or tool changes revalidated? | Differential threat model, regression results, staged-release records |
| Retirement | Are triggers, credentials, memory, and orphaned authorizations removed? | Revocation, data disposition, retained audit evidence |

NIST AI RMF treats GOVERN as a cross-cutting function supporting MAP, MEASURE, and MANAGE, and calls for iterative risk management across the lifecycle.[4] The lifecycle gates in this review are an engineering operating model rather than a clause-by-clause NIST mapping. Each gate should retain an accountable owner, approved version, test result, risk acceptance, and rollback condition.

![External agent action-control plane](/images/reviews/agent-security/agent-security-action-control-plane-en.png)

*Figure 3. An external control plane governs identity, context, tools, execution, and recovery.*

## 4. Continuous TEVV: evaluation must follow system change

![Continuous TEVV security loop](/images/reviews/agent-security/agent-security-continuous-tevv-en.png)

*Figure 4. Continuous TEVV feeds production evidence and incidents back into policy and evaluation.*

TEVV—testing, evaluation, verification, and validation—should expand from pre-release red teaming into an operational capability. A one-time test describes only one version under one attack set; tool descriptions, data sources, knowledge-base writes, and attacker techniques continue to change in production.

A useful evaluation loop has four layers:

1. **Component layer:** test prompts, memory, tool schemas, policies, and dependencies.
2. **Production-like layer:** reproduce production identities, permissions, data classifications, and network boundaries.
3. **End-to-end layer:** execute indirect injection, privilege abuse, exfiltration, long-horizon composition, and recovery tests.
4. **Production layer:** feed real incidents, near misses, and tool-supply-chain drift back into regression suites.

Security metrics also cannot be reduced to attack success rate. Teams should measure normal-task completion, false-block rate, human-approval burden, detection and recovery time, and whether rollback actually succeeds. Otherwise, a system that lowers attack success simply by refusing everything may be operationally unusable. NIST's MEASURE guidance likewise cautions that metrics must be interpreted in their intended context, rather than in isolation.[9]

## 5. Autonomy should be earned with operational evidence

The safest launch strategy is not to seek autonomy immediately, but to grant it in stages:

- **L1: read-only observation** — read, analyze, and recommend.
- **L2: propose then approve** — generate an action, but require per-action human approval.
- **L3: constrained execution** — execute within approved resources, limits, and action domains while remaining continuously monitored.
- **L4: bounded-domain autonomy** — plan and execute autonomously only inside boundaries validated over time.

Advancing a level requires evidence across business utility, security testing, monitoring coverage, recovery exercises, and incident history. Material incidents, missing critical logs, an unknown supply-chain origin, or inability to recover promptly should automatically downgrade the system. For high-impact, irreversible, or cross-domain actions, independent policy decisions and explicit human approval should remain durable controls.

## 6. Implementation order: make action controllable first

An enterprise need not wait until every problem is solved to pilot an agent. It should start with low-risk use cases whose goals are clear, data scope is controlled, and actions are reversible. A minimum viable security baseline includes:

1. Inventory agents, tools, credentials, and data assets.
2. Give every agent and connector an independent identity and least privilege.
3. Deploy a policy enforcement point outside the model to block unknown tools, missing approvals, and parameter drift.
4. Isolate code execution, browsers, database writes, and sensitive external egress.
5. Record a complete evidence chain from input provenance to final side effect, and test emergency stop and recovery.
6. Use continuous TEVV and real operational data to decide whether to expand authorization.

Prompt injection should not be assumed to have a complete model-internal defense; connected tools and long-horizon tasks can turn individually low-risk calls into a high-risk outcome. MITRE ATLAS provides a common knowledge base for teams to classify and map adversarial AI techniques.[8] Maturity should therefore not be organized around whether the model is “smarter.” This review proposes five successive capabilities: **visible assets, attributable identities, policy-governed actions, recoverable outcomes, and continuously evolving risk management.** Without the preceding capability, the next one lacks credible evidence.

## References

1. [OWASP, "LLM01: Prompt Injection," 2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/). Accessed October 9, 2026.
2. [Zhan, Q., Liang, Z., Ying, Z., and Kang, D., "InjecAgent: Benchmarking Indirect Prompt Injections in Tool-Integrated Large Language Model Agents," arXiv:2403.02691, 2024](https://arxiv.org/abs/2403.02691).
3. [Zou, W., Geng, R., Wang, B., and Jia, J., "PoisonedRAG: Knowledge Corruption Attacks to Retrieval-Augmented Generation of Large Language Models," arXiv:2402.07867, 2024](https://arxiv.org/abs/2402.07867).
4. [NIST, "AI Risk Management Framework Core," January 26, 2023](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/). Accessed October 9, 2026.
5. [NIST, "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile," NIST AI 600-1, July 26, 2024](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf).
6. [OWASP, "AI Agent Security Cheat Sheet"](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html). Accessed October 9, 2026.
7. [Invariant Labs, "MCP Security Notification: Tool Poisoning Attacks," April 1, 2025](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).
8. [MITRE, "ATLAS"](https://atlas.mitre.org/). Accessed October 9, 2026.
9. [NIST, "AI RMF Playbook: MEASURE"](https://airc.nist.gov/airmf-resources/playbook/measure/). Accessed October 9, 2026.
