# 第 4 层 — 指令分层

[English](l4-instruction-layering.md) | 中文

指令分层把 agent（智能体）上下文当作受治理、有预算的经济，取代「此刻需要知道什么」的默契判断。常驻层由 AGENTS.md 文件承载常设指令，每条规则一到三行并链接其归属文档；按需层由 skill（技能）承载流程，description 写成精确的触发条件。上下文本身有预算：每个事实只有一个归属，逐文件字数预算带只紧不松的棘轮，以及把会话痕迹从产出中剥离的卫生标准；参见[框架范式](../paradigm.zh.md)概述。

## 本层机制

- [mechanisms/agents-md-symlink.md](../mechanisms/agents-md-symlink.zh.md) — 通过 CLAUDE.md → AGENTS.md 符号链接，一份规则源服务多个 agent 工具命名空间
- [mechanisms/instruction-layering.md](../mechanisms/instruction-layering.zh.md) — 常驻的 AGENTS.md 规则与按需的 skill 对照：后者的 description 写明精确触发条件
- [mechanisms/doc-budget-ratchet.md](../mechanisms/doc-budget-ratchet.zh.md) — 带余量的逐文件字数预算与只紧不松的棘轮：上下文经济成为受执法的资源
- [mechanisms/prose-hygiene.md](../mechanisms/prose-hygiene.zh.md) — slop 清单与推理痕迹判据把会话痕迹与 LLM（大语言模型）文档病态挡在产出之外

## 移植分析

本层移植成本最低、应当最先采用：AGENTS.md 树加 CLAUDE.md 符号链接、skill 层、slop 与推理痕迹卫生都不需要基础设施，在所有档位直接适用，共同构成最小移植包的核心。一旦有不止一份文档争夺上下文，预算与棘轮就值得启用——从第一份常驻文件开始建立配额，而不是事后给既有语料补配额。
