# Framework paradigm

English | [中文](paradigm.zh.md)

This framework turns collaboration norms that previously depended on human tacit understanding into machine-executable constraints. AI agents produce the output, humans decide direction, machines enforce the rules, and Agent Notes keep the rationale behind every rule; each role's authority is defined by executable code rather than by mutual understanding. Agents therefore become replaceable constants rather than scarce variables: any instance can be replaced without changing how the team works.

## The five mechanism layers

- [L1 — Role separation](layers/l1-role-separation.md) — AI produces, humans decide, machines enforce; three powers separated
- [L2 — External memory](layers/l2-external-memory.md) — the Agent Note system moves experience out of agent context into the repository
- [L3 — Machine verification](layers/l3-machine-verification.md) — trust replaced by gates
- [L4 — Instruction layering](layers/l4-instruction-layering.md) — resident rules vs on-demand skills; context economy
- [L5 — Process automation](layers/l5-process-automation.md) — event-driven process execution

## Four assertions

1. Collaboration norms become machine-executable constraints, and agents become replaceable. Every rule ends as a command that can turn CI red, rule text only indexes its enforcing gate, and collaboration order does not depend on any individual's memory.
2. Trust is layered and quantified, not a slogan. AI output receives zero trust: gates verify the state of the world instead of accepting an agent's self-report. Human judgment is highly trusted, and its authority is quantified into computable review weight.
3. External memory stays useful by daring to delete. Its value lies in how much is removed, not in how much is stored; quotas on resident content and routine deletion keep the signal-to-noise ratio while notes keep arriving.
4. The gate is the end point of every rule: convention produces observed drift, and observed drift produces an enforced gate. The progression applies recursively to governance itself — the rules about rules are also gates, and a rule that cannot turn CI red eventually drifts.

## Sources

The framework derives from three material sources. The primary source is the deepseek-harness repository stripped to its agent-constraint corpus on branch `worktree-agents-framework`, whose two foundation commits are `strip(dsh): reduce tree to agents collaboration framework skeleton` and `strip(dsh): thin Agent Notes to inbound rationale plus category examples`. The paradigm analysis comes from the research report `survey-dsh-paradigm/report.md`, an untracked working directory that is not committed. `ai-mono-template` (github.com/PeixuanLi/ai-mono-template) is the framework's first JS-monorepo instance.
