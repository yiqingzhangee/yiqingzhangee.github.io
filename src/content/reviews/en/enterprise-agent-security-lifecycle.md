---
title: "Lifecycle Security for AI Agents: An Intelligent Offense-and-Defense Framework"
description: "From model security to an action control plane: lifecycle gates, model-external controls, and continuous TEVV for enterprise AI agents."
date: 2026-10-09
lang: en
translationKey: enterprise-agent-security-lifecycle
tags: [AI Agents, AI Security, Governance, TEVV]
---

> Public-evidence technical review | Current through October 9, 2026

## Core judgments

1. Agent security extends beyond model output: identity, memory, tools, and downstream systems are all in scope.[1]
2. Requirements, build, testing, deployment, operations, change, and retirement each need independent gates; changes to versions, permissions, or tools require renewed evidence and rollback validation.[4]
3. A control plane outside the model should decide high-impact actions and constrain their blast radius with short-lived credentials, least privilege, sandboxing, and human approval.[2]
4. AgentLAB’s 644 cases and runtime MCP tool changes show that one-time acceptance cannot cover long-horizon tasks or component drift.[9][13]
5. Enterprises should accumulate operational evidence in low-autonomy, reversible settings before expanding authority; major incidents should trigger automatic downgrade.[16]

This review addresses enterprise agent security across identity, context, memory, tools, actions, evaluation, and governance. Its factual evidence comes from public standards, government guidance, vendor vulnerability records, and original papers. The lifecycle phases and control combination are engineering guidance, not an official mapping of any standard. Public vulnerabilities and academic evaluations jointly support the conclusion that risk has entered the real action chain. The 90-, 180-, and 365-day implementation cadence is a feasibility plan that must be recalibrated for an organization’s industry, jurisdiction, and loss limit.

## 1. Boundaries and threats: risk has entered the action chain

When a probabilistic model connects to identity, data, and an execution environment, the protected object becomes the entire action chain. Low-trust content can influence planning through context and then be amplified through tool calls into data exfiltration, unauthorized writes, or code execution.

### 1.1 Security objects and trust boundaries

AI agents are typically driven by large language models and can plan, invoke tools, retain memory, and act. An ordinary LLM application mainly emits text; an agent additionally holds goals, triggers, identities, credentials, runtime context, tool interfaces, and mutable state. OWASP therefore includes goal hijacking, tool misuse, identity abuse, memory poisoning, code execution, and cascading failures in the security scope.[1] Joint guidance from multiple national cybersecurity agencies likewise treats the model, external data sources, memory, planning workflow, and tools as one system.[2]

![Assets and trust boundaries in the agent action chain](/images/reviews/agent-security/agent-security-trust-boundaries-en.png)

*Figure 1. Assets and trust boundaries extend along the action chain; the model is only one layer. Sources: OWASP [1]; joint multinational guidance [2].*

The control objective changes accordingly. Security teams need to know who acted, what context they relied on, which tool version they invoked, what data they accessed, and what irreversible effects followed. Execution authorization must sit outside agent context. Approval must bind subject, tool, parameters, and validity window, and any parameter change must trigger a new decision. If the model decides whether approval exists, prompt injection can still influence that decision.[1]

### 1.2 How context contamination becomes real action

Indirect prompt injection exploits the unreliable separation of data and instructions in one shared context. Web pages, email, documents, retrieved results, and tool returns are meant to be processed as data, but a model may construe malicious text as a higher-priority task. OWASP notes that retrieval-augmented generation (RAG) and fine-tuning do not fully eliminate this risk; outcomes can extend to unauthorized data access and downstream command execution.[6]

| Attack surface | Entry path | Amplification mechanism | Visible outcome |
| --- | --- | --- | --- |
| Indirect prompt injection | Email, web pages, files, tool returns | External data is mistaken for a control instruction | Goal hijacking, sensitive reads, egress |
| RAG poisoning | Malicious documents enter the knowledge base | Retrieved material persistently affects answers and decisions | Targeted wrong answers, policy manipulation |
| Memory poisoning | Content is extracted as a persistent “preference” | Delayed cross-session activation and forged precedent | Refusal bypass, sensitive-data disclosure |
| MCP tool poisoning | Tool descriptions, server metadata | Tool shadowing and post-approval changes | Credential theft, unauthorized calls, code execution |
| Long-horizon task attack | Multi-turn messages and consecutive tool observations | Harmful objectives split into individually low-risk steps | Composed harm, difficult audit correlation |

*Table 1. Risk is amplified stage by stage along “external content → context → planning → tools → outcome.” Sources: OWASP [6]; AgentLAB [9].*

InjecAgent contains 1,054 indirect prompt-injection cases spanning 17 user-tool categories, 62 attacker-tool categories, and 30 agents.[7] PoisonedRAG reports that inserting five malicious documents into a million-scale corpus can push the attack success rate on target queries above 90%.[8] The studies use different test environments, so their results are not production incidence rates; they demonstrate that small amounts of contaminated content can alter later tool decisions.

### 1.3 Tool chains, long-horizon tasks, and real vulnerabilities

Public vulnerabilities show that these attacks have reached production systems. EchoLeak (CVE-2025-32711) chained malicious email, prompt-injection-detection bypass, Markdown link handling, and automatic image loading into a zero-click exfiltration path; Microsoft recorded it as an M365 Copilot information-disclosure vulnerability.[10][11] Context7’s CVE-2026-75130 shows that an ordinary documentation query can accept poisoned MCP instructions, then leak environment-file credentials and delete files.[12]

MCP tool descriptions also have a post-approval-change problem: a server can modify its description after first being trusted, or a malicious tool can shadow a trusted tool in the same client. Passing install-time review does not establish continuing runtime trust.[13] CVE-2025-6514 in mcp-remote shows that connection components can themselves become remote-code-execution entry points. Docker’s retrospective cites CVSS 9.6 and names call chains involving Claude Desktop, VS Code, and Cursor.[14]

Autonomous planning lengthens the attack window. AgentLAB constructs 644 security cases in 28 real-tool environments, covering intent hijacking, chained tool composition, task injection, goal drift, and memory poisoning; the paper finds that single-turn defenses do not transfer reliably to long-horizon tasks.[9] A staged prompt-injection study published in October 2026 also identified eight workflows, seven attack objectives, and six injection surfaces in native Claude Code and Codex runtimes.[25] Auditing must therefore reconstruct action sequences and final data flows, because individually benign calls can combine into a harmful result.

## 2. Lifecycle security: all seven stages need gates

Whenever models, prompts, data sources, tools, permissions, or orchestration change, the security gates must run again. Each gate must retain verifiable evidence: accountable owner, approved version, test results, risk acceptance, rollback conditions, and retirement proof.

![Seven lifecycle security gates](/images/reviews/agent-security/agent-security-lifecycle-gates-en.png)

*Figure 2. Seven security gates form a feedback loop; changes send the system back through evaluation. Sources: NIST AI RMF [4]; joint multinational guidance [2].*

### 2.1 Requirements, build, and testing

The requirements phase should constrain the task before discussing capability. Initial deployment candidates should meet four conditions: explicit goals, controlled data scope, reversible actions, and an estimable loss limit. System registration should include owner, objective, trigger, model, memory, data sources, tools, credentials, downstream systems, and prohibited actions. Joint multinational guidance recommends beginning with low-risk tasks and designing threat modeling, permission limits, sandboxing, rate limits, short-lived credentials, and human review at this stage.[2]

The build phase requires traceability for every action-affecting component. Models, system prompts, policies, tool descriptions, MCP/A2A connectors, memory structures, dependencies, and datasets should all be versioned. Secret scanning, dependency review, permission review, and authorization-middleware checks must pass before integration testing. Memory writes also require source validation, user and session isolation, expiry, and an integrity summary.[1]

Testing must cover normal tasks and abuse paths together. The test matrix should include direct and indirect prompt injection, tool overreach, data exfiltration, memory poisoning, multi-agent cascades, unintended code execution, resource exhaustion, and high-impact actions. In addition to attack success, gates should report normal task completion, false-block rate, human-approval burden, and blast radius on failure. AgentDojo jointly evaluates security and utility with 97 realistic tasks and 629 security cases, providing a baseline for dual-objective testing.[19]

### 2.2 Deployment, operations, change, and retirement

The deployment gate must establish that production isolation, short-lived credentials, a centralized policy enforcement point, rate and quota controls, action previews, audit trails, rollback, and emergency stop are available. High-impact or irreversible operations should show exact parameters before execution and obtain explicit approval; approval expires once used. Deployment only means that one version is approved to run; later changes still require revalidation.

At runtime, identity, authorization, and context should be revalidated for each privileged call. Signals to watch include privilege spikes, deviations in tool sequences, anomalous resource consumption, sensitive reads followed by egress, guardrail bypasses, and cross-agent cascades. When thresholds are exceeded, the system should reduce authority, isolate the session, or stop execution before escalating to human response. NIST places governance above MAP, MEASURE, and MANAGE and calls for risk identification, measurement, and treatment throughout the lifecycle.[4]

Changes to a model, prompt, policy, data source, tool, permission, or dependency can alter the attack surface. The change gate requires differential threat modeling, regression and adversarial testing, permission review, and staged release. At retirement, revoke agent and sub-agent credentials, remove triggers and routes, dispose of memory and vector data, confirm that no orphaned authorization remains, and retain audit and forensic evidence. NIST’s Generative AI Profile explicitly calls for secure retirement procedures and a risk-prioritized system inventory.[5]

## 3. Defensive architecture: an external control plane decides action

Model-side detection can reduce malicious input; deterministic authorization blocks unauthorized actions; isolation and least privilege constrain the blast radius; observability and rollback handle the events that get through. All four control types are required.

![External agent action-control plane](/images/reviews/agent-security/agent-security-action-control-plane-en.png)

*Figure 3. Identity and policy anchor a control plane spanning context, tools, execution, and response. Sources: CSA Agentic Trust Framework [16]; OWASP [6].*

### 3.1 Identity, credentials, and the policy enforcement point

Every agent, sub-agent, and tool connector needs a distinct identity tied to an owner, purpose, capability inventory, and environment. Credentials should be issued per task, short-lived, and narrowly scoped; read, write, delete, payment, publish, and egress permissions should be separate. CSA recommends beginning with unique identifiers and cryptographic credentials, then adding OAuth2/OIDC, attribute-based access control (ABAC), and policy as code at higher autonomy levels.[16]

The policy enforcement point sits between the model and real tools. It receives a structured call request and makes a deterministic decision based on subject, task, data sensitivity, tool version, parameters, time, and risk score. Unknown tools, missing approval, parameter drift, and out-of-bound resources deny by default. For high-impact actions, the model may only propose a candidate operation; independent rules and human approval jointly determine execution.

### 3.2 Context, memory, and tool isolation

Input protections should label provenance and reduce contamination probability through schema validation, sanitization, prompt-injection detection, sensitive-information detection, and data lineage. External content should enter context with trust labels, while system instructions, user goals, and third-party data are processed in separate partitions. Output controls validate structure, sensitive data, and allowed actions to prevent the model from passing unauthorized information directly to a tool.

Memory and RAG need independent governance. Validate source and content before writing; isolate tenants, users, and sessions; set expiry and capacity limits; and retain document ID, ingestion time, retrieval rank, and the final evidence chain. High-risk knowledge bases should have trusted snapshots and canary questions. On discovery of poisoning, teams should isolate entries, rebuild indexes, and replay tool calls in the affected time window. PoisonedRAG’s small-document poisoning results show that sampled manual review alone cannot establish sufficient assurance.[8]

Tools and execution environments should use allowlists, egress controls, filesystem isolation, resource quotas, per-transaction limits, and cumulative-impact limits. Browsers, code execution, database writes, and payment tools belong in separate sandboxes and credential domains. Lock and monitor MCP tool descriptions, schemas, binaries, and origins by version so post-approval changes cannot bypass install-time review.[13]

### 3.3 Monitoring, human gates, and recoverability

End-to-end logging should at least correlate agent identity, session, input source, memory writes and retrievals, planning summary, tool version, parameters, returns, approval records, network destinations, and final side effects. Microsoft’s AI Security Benchmark identifies anomalous API use, unexpected model output, and irregular data access as actionable signals, and recommends linking them to threat intelligence such as MITRE ATLAS and OWASP.[21]

Detection must correlate the complete chain from source to outcome. EchoLeak involved low-trust email entering context, an internal sensitive-data read, and automatic access to an attacker-controlled resource. Each event can appear normal in isolation; together they clearly indicate exfiltration.[10] A sequence-level policy should also block multiple low-risk tool calls when their combination produces a high-risk result.

Response capability determines the loss caused by failure. Minimum controls include session revocation, credential rotation, connector isolation, tool disablement, manual emergency stop, action rollback, and restoration from a trusted state. CSA targets include automatic circuit breaking, human stop time below one second, rollback where conditions permit, and downgrade to lower autonomy on failure.[16] These targets require testing in real infrastructure and cannot be treated as universal service-level agreements.

## 4. Offense-and-defense operations: evaluation follows system change

Pre-release red teaming can only establish how one version performs against one attack set. Model updates, tool-description changes, knowledge-base writes, and attacker adaptation continuously change risk, so evaluation, detection, blocking, forensics, and rule feedback must operate continuously.

![Continuous TEVV security loop](/images/reviews/agent-security/agent-security-continuous-tevv-en.png)

*Figure 4. Continuous defense connects red teaming, gates, runtime detection, response, and rule feedback in one loop. Sources: NIST AI RMF Playbook [17]; MITRE ATLAS [20].*

### 4.1 Four evaluation layers from components to production

Continuous evaluation can be organized into four layers. The component layer verifies models, prompts, memory, tools, policies, and dependencies. The production-like layer recreates production identities, permissions, data, and networks. The end-to-end layer runs indirect injection, overreach, exfiltration, long-horizon composition, and recovery tests. The production layer continuously performs testing, evaluation, verification, and validation (TEVV), then adds actual incidents and near misses to the test set. This is an engineering synthesis of NIST MEASURE/MANAGE guidance, not NIST-native level naming.[18]

Test suites need fixed regression cases and dynamically generated cases. Fixed suites compare versions; dynamic suites introduce current attacks, semantic randomization, varied tool sequences, and multi-turn adaptation. AgentLAB shows that single-turn defenses do not stably cover cross-session and long-horizon tasks.[9] MCP tools can also change their descriptions after approval, so supply-chain version drift belongs in production regression.[13]

### 4.2 Metrics must constrain security and business utility together

| Dimension | Core metrics | Detection signals | Triggered action |
| --- | --- | --- | --- |
| Attack effectiveness | Attack success rate, unauthorized-call rate, sensitive source-to-sink completion rate | Goal drift, anomalous tool sequences, sensitive read followed by egress | Block, downgrade, isolate |
| Normal utility | Task completion, correct-tool rate, user correction rate | Surge in refusals, repeated planning, timeout | Roll back version, adjust policy |
| Operating cost | False-block rate, human-approval rate, per-task cost | Approval backlog, anomalous token or call volume | Narrow scope, tune thresholds |
| Resilience and recovery | Detection, response, and recovery time; rollback success rate | Circuit-breaker failure, logging gaps, unreconstructable state | Stop service, enter incident response |

*Table 2. Evaluation reports security, utility, operating cost, and recoverability together. Sources: NIST [18]; AgentDojo [19].*

A single attack-success metric cannot represent production safety. Frontier models can fail absent an attack, any one attack covers only part of the security property, and a defense can “improve” its security figure through excessive blocking. NIST likewise warns that metrics may be oversimplified, gamed, or detached from their original context.[18] Every release threshold should state its test environment, attacker capability, tool permissions, data sensitivity, confidence intervals, and business-utility floor.

### 4.3 Incident response feeds rules back into the system

Incident response proceeds through containment, evidence preservation, eradication, restoration, and retrospective review. For a Context7-type incident, first isolate the malicious MCP source and session, rotate potentially exposed environment credentials, audit file operations, and restore from a trusted state.[12] For memory poisoning, deleting the current session is not enough: identify contaminated memory by source and write time, then inspect its retrieval and action effects in later sessions.

Retrospective findings must update the threat model, policy enforcement point, and evaluation suite. MITRE ATLAS is continually updated from observed attacks and red-team demonstrations and can standardize tactics, techniques, and detection-coverage terminology.[20] NIST recommends red teaming at a fixed cadence and revising security processes using incidents and test results.[17] Whether analogous incidents are discovered earlier and blocked automatically is the direct test of whether the loop works.

## 5. Governance implementation: tiered authority earns expansion

Authority should grow with operating evidence. Agents first demonstrate business value and effective controls in low-autonomy modes, then advance based on operational records, security validation, incident performance, and governance sign-off. Major incidents trigger automatic downgrade.

### 5.1 Four autonomy levels have different release thresholds

| Autonomy level | Permitted behavior | Minimum controls | Evidence for advancement |
| --- | --- | --- | --- |
| L1: read-only observation | Read, analyze, recommend | Identity, data boundaries, complete logging | Stable task completion and zero sensitive writes |
| L2: propose then approve | Generate actions, each approved by a human | Precise action preview, one-time approval | Low false positives, approval quality, rollback capability |
| L3: guarded execution | Execute inside approved domains with post-action notification | Policy as code, limits, anomaly circuit breaker | Sustained operation, security testing, zero serious incidents |
| L4: bounded-domain autonomy | Plan and execute autonomously in approved domains | Continuous validation, independent monitoring, automatic downgrade | Multi-party governance sign-off and periodic recertification |

*Table 3. Operational evidence earns autonomy, while major incidents trigger downgrade. Source: CSA Agentic Trust Framework [16].*

CSA’s example thresholds are at least two weeks for read-only operation, at least four weeks with more than 95% recommendation acceptance for approval-based operation, and at least eight weeks with no serious incidents for notification-level operation.[16] Organizations must not copy these figures directly. Financial transfers, production changes, personnel actions, and highly sensitive data exports require longer observation and durable human approval.

### 5.2 A 90-, 180-, and 365-day implementation path

- **Days 0–90:** Inventory agents, tools, credentials, and data assets; establish a unique identity for every agent; add the policy enforcement point, short-lived credentials, end-to-end logging, and emergency stop; run one or two low-risk L1/L2 cases; and establish initial regression cases for prompt injection, overreach, and exfiltration. CSA’s engineering sequence similarly puts identity, data governance, behavior monitoring, isolation, and incident response into the first five weeks.[16]
- **Days 91–180:** Put TEVV, fixed-cadence red teaming, and third-party component review into release; establish production anomaly detection, SOC integration, credential rotation, and memory/RAG-poisoning response; exercise isolation, downgrade, rollback, and recovery; calibrate L2/L3 thresholds using measured results.[17]
- **Days 181–365:** Extend policy as code and cross-environment evidence retention; reassess risk tolerance and metric validity; recertify suppliers, models, and tools; complete retirement and recovery drills; use independent audit in high-risk domains; and decide whether to open L4.

Identity and boundary construction must precede the expansion of action authority. If logs cannot correlate subject and action, policy cannot be enforced outside the model, or the system cannot roll back, increasing autonomy only enlarges unexplained and uncontrolled risk.

### 5.3 Responsibilities, compliance, and stop conditions

Governance responsibilities should include the business owner, product and engineering, security, privacy and legal, model risk, vendor management, and incident response. The business owner defines permitted objectives and loss limits. Security maintains threat models, policies, and detection; engineering owns isolation, rollback, and logging; model risk maintains evaluation; vendor management owns the component inventory, vulnerability channel, and exit plan. NIST calls for clear responsibilities and delegations for those who design, develop, deploy, evaluate, monitor, and update systems.[17]

Stop conditions should be written before launch: metrics exceed tolerance, a serious incident occurs, monitoring fails, a tool or supply-chain origin is unknown, critical logs are absent, or imminent risk cannot be mitigated in time. On a trigger, bypass or disable the system, preserve evidence, perform root-cause analysis, and satisfy relaunch conditions. The EU AI Act also requires human oversight for high-risk AI and, in specified risk or serious-incident conditions, suspension and notification.[22] Whether a particular agent belongs to a high-risk category still depends on its intended use, role, and jurisdiction.

## 6. Integrated conclusion: validate in small steps, then expand autonomy

Public vulnerabilities prove that risk has reached the data, credential, and code-execution layers. NIST, OWASP, CSA, and joint multinational guidance all call for least privilege, independent authorization, continuous monitoring, human gates, and recoverability. The technical components are available, but system-level assurance must still be established incrementally in real business settings.

### 6.1 Maturity advances through controllable action

Maturity consists of five continuous capabilities: visible assets, attributable identity, decidable action, recoverable outcomes, and continuously evolving risk control. Until one capability is established, the next lacks credible evidence. Model filters cannot replace identity and policy enforcement; logs without rollback can only explain accidents; and pre-release red teaming cannot cover runtime drift in knowledge bases and tool supply chains.

Existing frameworks should be used together. NIST AI RMF and ISO/IEC 42001 provide the governance and lifecycle shell;[4][23] OWASP's AI Agent Security Cheat Sheet provides the agent-risk taxonomy and operational controls used in this review,[1] while the OWASP Top 10 for Agentic Applications complements it with an application-risk inventory.[15] MITRE ATLAS supports adversary tactics, red teaming, and detection mapping;[20] CSA adds identity, autonomy tiers, and incident controls. No single framework fully covers governance, engineering controls, attack knowledge, and runtime assurance.

### 6.2 Adoption guidance and applicability boundaries

Implementation should validate in small steps before expanding autonomy. Initial scenarios should be read-only or individually approved, have explicit data scope, use reversible actions, and have an estimable loss limit. Once the minimum control plane is in place, normal task completion, security cases, human burden, incident records, and recovery exercises should determine whether the system advances. High-impact, irreversible, or cross-domain actions should retain independent policy decisions and explicit human approval over the long term.

Before moving to high autonomy, agents and tools must have separate identities; credentials must narrow permission and duration per task; tool calls must be denyable outside the model; context, memory, and tool versions must be traceable; anomalies must permit immediate stop and recovery; and continuous evaluation must cover real permissions and long-horizon tasks. Meeting these conditions establishes only pilot readiness; production evidence must ultimately show that risk is within business tolerance.

## Verification and qualification notes

1. CSA MAESTRO’s current official version, stable download URL, and exact layer names require verification against official sources; this review does not build a mandatory mapping on it.
2. The full ISO/IEC 23894 text requires paid access; correspondences between the seven security gates and specific clauses must be verified against licensed text.
3. MINJA’s exact injection-success rate and Prompt Infection’s cross-agent propagation rate were not verified against their original test configurations, so the review makes no quantitative claim from them.
4. CVE-2026-75130’s scope, affected versions, and remediation details require confirmation against the NVD record and original vendor advisory; the Context7 discussion should be read as a reported case pending that confirmation.
5. The staged prompt-injection study cited as [25] requires confirmation against its paper version and experimental setup; the reported workflow, goal, and injection-surface counts should not be generalized beyond that study until confirmed.
6. CVE-2025-6514’s complete affected and fixed versions require confirmation from NVD or the original vendor advisory; the body uses only the public risk characterization and CVSS framing.
5. There is no unified agent-specific reference implementation for operating-system/container sandboxing, network microsegmentation, or key rotation; technical choices require validation against enterprise infrastructure.
6. No universal 90/180/365-day benchmark exists. The path follows control dependencies, while acceptable error, human-review, and recovery limits require industry-specific calibration.
7. Whether the EU AI Act applies to a general-purpose agent depends on intended use, deployer role, and jurisdiction and requires legal assessment.

## References

1. [OWASP, *AI Agent Security Cheat Sheet*](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html), continuously updated; accessed 2026-10-09.
2. [Australian Signals Directorate et al., *Engaging with Artificial Intelligence*](https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/careful-adoption-of-agentic-ai-services), 2026-05-01.
3. [Cloud Security Alliance, *Agentic Universe*](https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/04/agentic-universe-april-2026-v1.pdf), 2026-04.
4. [NIST, *AI Risk Management Framework Core*](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/), 2023-01-26.
5. [NIST, *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), 2024-07-26.
6. [OWASP, *LLM01:2025 Prompt Injection*](https://genai.owasp.org/llmrisk/llm01-prompt-injection/), 2025.
7. [Zhan et al., *InjecAgent: Benchmarking Indirect Prompt Injections in Tool-Integrated LLM Agents*](https://arxiv.org/abs/2403.02691), 2024-03-05.
8. [Zou et al., *PoisonedRAG: Knowledge Corruption Attacks to Retrieval-Augmented Generation*](https://arxiv.org/abs/2402.07867), 2024-02-12.
9. [Jiang et al., *AgentLAB: Benchmarking LLM Agents against Long-Horizon Attacks*](https://arxiv.org/abs/2602.16901), 2026-02-18.
10. [*EchoLeak: The First Real-World Zero-Click Prompt Injection Exploit in a Production LLM System*](https://arxiv.org/abs/2509.10540), 2025-09-12.
11. [Microsoft Security Response Center, *CVE-2025-32711*](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-32711), 2025.
12. [NVD, *CVE-2026-75130*](https://nvd.nist.gov/vuln/detail/CVE-2026-75130), 2026-08-19; see the verification notes for scope confirmation.
13. [Invariant Labs, *MCP Security Notification: Tool Poisoning Attacks*](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks), 2025-04-01.
14. [Docker, *MCP Horror Stories: The Supply Chain Attack*](https://www.docker.com/blog/mcp-horror-stories-the-supply-chain-attack/), 2025-08-07.
15. [OWASP, *Top 10 for Agentic Applications*](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/), 2025-12-09.
16. [Cloud Security Alliance, *The Agentic Trust Framework*](https://cloudsecurityalliance.org/blog/2026/02/02/the-agentic-trust-framework-zero-trust-governance-for-ai-agents), 2026-02-02.
17. [NIST, *AI RMF Playbook: Manage*](https://airc.nist.gov/airmf-resources/playbook/manage/), continuously updated; accessed 2026-10-09.
18. [NIST, *AI RMF Playbook: Measure*](https://airc.nist.gov/airmf-resources/playbook/measure/), continuously updated; accessed 2026-10-09.
19. [Debenedetti et al., *AgentDojo*, v3](https://arxiv.org/abs/2406.13352), 2024-11-24.
20. [MITRE, *ATLAS*](https://atlas.mitre.org/), continuously updated; accessed 2026-10-09.
21. [Microsoft, *Artificial Intelligence Security Benchmark*](https://learn.microsoft.com/en-us/security/benchmark/Azure/mcsb-v2-artificial-intelligence-security), 2026-04-30.
22. [European Union, *Regulation (EU) 2024/1689*](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1689), 2024-06-13.
23. [ISO, *ISO/IEC 42001:2023*](https://www.iso.org/obp/ui/en/#!iso:std:81230:en), 2023-12.
24. [ISO/IEC, *ISO/IEC 23894:2023 Preview*](https://webstore.iec.ch/preview/info_isoiec23894%7Bed1.0%7Den.pdf), 2023-02.
25. [*Blocking at the Boundary: Auditing Long-Horizon Agents against Staged Prompt Injection*](https://arxiv.org/abs/2610.05163), 2026-10-04; see the verification notes for claim confirmation.
