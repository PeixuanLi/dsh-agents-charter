# 框架范式

[English](paradigm.md) | 中文

本框架把此前依赖人类默契的协作规范转化为机器可执行的约束。AI 产出成果，人类裁决方向，机器执行规则，Agent Note 保存每条规则背后的理据；每个角色的权威由可执行代码界定，而不是由人与人之间的默契界定。AI agent（智能体）因此成为可替换的常量而非稀缺的变量：替换任何一个实例都不改变团队的协作方式。

## 五个机制层

- [L1 — 角色分权](layers/l1-role-separation.md) — AI 产出，人类裁决，机器执行；三种权力相互分离
- [L2 — 外部化记忆](layers/l2-external-memory.md) — Agent Note 系统把经验从 agent 上下文移入仓库
- [L3 — 机器验证](layers/l3-machine-verification.md) — 以门禁取代信任
- [L4 — 指令分层](layers/l4-instruction-layering.md) — 常驻规则与按需 skill（技能）；上下文经济
- [L5 — 流程自动化](layers/l5-process-automation.md) — 事件驱动的流程执行

## 四条论断

1. 协作规范成为机器可执行的约束，agent 因此可以替换。每条规则最终都是一条能让 CI 变红的命令，规则文本只是指向执法门禁的索引，协作秩序不依赖任何个体的记忆。
2. 信任分层计量，而不是笼统口号。对 AI 产出零信任：门禁验证外部世界的状态，而不是采信 agent 的自述。对人类判断高信任，但其权威被量化为可计算的评审权重。
3. 外部化记忆靠敢于删除保持可用。它的价值在于删除了多少，而不在于保存了多少；常驻内容受配额约束、删除是常规运维，两者在笔记持续新增时维持信噪比。
4. 门禁是每条规则的终点：约定产生漂移实证，漂移实证产生门禁。这条规律递归适用于治理自身——关于规则的规则同样是门禁，不能让 CI 变红的规则终将漂移。

## 材料来源

框架材料来自三处：`worktree-agents-framework` 分支上裁剪为智能体约束语料的 deepseek-harness 仓库（提交 `2a616084ea` 与 `a9c1a7f42a`）、调研报告 `survey-dsh-paradigm/report.md`（未跟踪的工作目录，未提交），以及作为框架第一个 JS monorepo 实例的 `ai-mono-template`（github.com/PeixuanLi/ai-mono-template）。
