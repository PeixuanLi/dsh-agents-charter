# 采纳 profile

[English](profiles.md) | 中文

profile 是按团队投入排序的机制卡片打包：P0 只需成文规则，P1 加脚本，P2 加工程，P3 加平台机制。每个档位建立在前一档位验收通过之上。

## 先读警告

- 没有双语人力却照搬三件套是僵尸税——只在翻译产能可持续时才采纳双语配对。
- 没有[删除优先](mechanisms/delete-first.zh.md)哲学的覆盖率门禁会成为负担——删除是常规运维，棘轮才有收益。
- 与组织规模不匹配的重型流程会空转——加权评审与 issue 状态机预设成员稳定和真实的流转量。

## P0 — 原则

- [agent（智能体）指令与 CLAUDE.md 符号链接](mechanisms/agents-md-symlink.zh.md)
- [验证世界，而不是自述](mechanisms/verify-the-world.zh.md)
- [保鲜义务](mechanisms/note-freshness.zh.md)
- [本地只跑窄集，CI 拥有完整矩阵](mechanisms/local-narrow-ci-full.zh.md)
- [AI 产出，人类裁决，机器执行](mechanisms/role-separation.zh.md)

采纳形态是纯文本规则加一份评审清单；没有脚本。验收：规则常驻每个会话，清单在评审中执行。

## P1 — 脚本级

- [以目录路径编码的笔记生命周期](mechanisms/note-lifecycle.zh.md)——笔记树的布局与分类变成机械检查。
- [文档是被机器检查的产物](mechanisms/markdown-gates.zh.md)——链接解析、段落换行与图表解析变成命令。
- [门禁运行器是被测试的工程代码](mechanisms/gate-aggregate.zh.md)——完整门禁集的运行变成一条聚合命令。
- [每个 PR（Pull Request）都演练，发布由人工触发](mechanisms/release-double-gate.zh.md)——打包演练与人工发布触发变成 CI job。

验收：移植后，对应的门禁在采纳仓库中运行并通过。

## P2 — 工程级

- [英文、中文、指纹伴随记录三件套](mechanisms/note-triplet.zh.md)——只在确实维持两种语言的地方适用；单语团队退化为单文件加格式门禁。
- [强制携带 `Alternatives considered` 小节](mechanisms/note-alternatives.zh.md)
- [逐文件字数预算与只紧不松的棘轮](mechanisms/doc-budget-ratchet.zh.md)
- [归档即冻结](mechanisms/archive-freeze.zh.md)——只在审计链重要的地方适用。
- [文风卫生：slop 清单与推理痕迹判据](mechanisms/prose-hygiene.zh.md)
- [双语文档是带指纹的配对](mechanisms/bilingual-pairing.zh.md)——可选项，只在翻译产能可持续时采纳。

验收：`verify-agent-note-format`、`verify-doc-budgets`、`verify-archived-agent-notes` 与 `verify-concrete-terms` 在采纳仓库中运行保持绿色；采纳配对时加上 `verify-translation-pairing`。

## P3 — 重型

- [评审权威是公布的公式](mechanisms/weighted-review.zh.md)
- [issue 状态由事件推动](mechanisms/issue-state-machine.zh.md)
- [每个 PR 一种 kind；area 多选](mechanisms/pr-classification.zh.md)
- [依赖式 PR 链在租约下重写，sync 后立即验证](mechanisms/stacked-pr.zh.md)

这些机制从恢复于 [reference/github/](../../reference/github/README.md) 的参照配置部署，该目录位于本规范目录之外。验收：加权评审 workflow 在 org app、secrets 与稳定成员就位后即可部署；issue workflow 在移植者提供 Project App、改写 org 钉死值后即可部署。

## 移植顺序

按 P0 到 P3 的顺序采纳：较早档位的习惯是下一档位的前提，跳级引入的是执法，却没有它所预设的习惯。

## 里程碑

- M1（已完成）——规范骨架：范式、五个层章节与 22 张卡片。
- M2（已完成）——参照实现的去 DSH 化。
- M3（已完成）——本 profile 页与 `reference/github/` 附录。
- M4（待办）——抽出为保留历史的独立仓库。
