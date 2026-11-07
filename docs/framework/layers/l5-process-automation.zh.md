# 第 5 层 — 流程自动化

[English](l5-process-automation.md) | 中文

流程自动化把手工驱动的流程替换为事件驱动的执行，并显式划定信任边界。流程策略是从默认分支检出的代码，事件数据只是输入，因此构造出来的事件无法夹带策略。发布经过双闸——每次变更先在无凭证条件下演练打包，再由人从 tag 手动触发发布——依赖式 PR（Pull Request）评审由原生 stack 对象治理；参见[框架范式](../paradigm.zh.md)概述。

## 本层机制

- [mechanisms/issue-state-machine.md](../mechanisms/issue-state-machine.md) — 事件驱动的工作项生命周期：策略代码从默认分支加载，事件数据只是输入
- [mechanisms/pr-classification.md](../mechanisms/pr-classification.md) — 原生 Issue Types 作为分类权威，驱动标签与流程路由
- [mechanisms/stacked-pr.md](../mechanisms/stacked-pr.md) — 依赖式 PR 链（stacked PR）以原生 stack 对象治理：重写必带 `--force-with-lease`，每次发布后必须补验证
- [mechanisms/release-double-gate.md](../mechanisms/release-double-gate.md) — 每次变更都以无凭证方式演练打包，发布由人从 tag 手动触发

## 移植分析

发布双闸在所有档位直接适用，是本层唯一的零成本采用项：一个无凭证打包演练 job 加一个人工 dispatch 步骤。issue 生命周期机制、原生类型分类与基于 stack 的评审，预设了工作本就完整运行在该平台全流程上的仓库；更小的配置没有需要解决的对应问题。本层的参照配置——workflow 定义与 issue 策略——在里程碑 M3 恢复于 `reference/github/` 目录。
