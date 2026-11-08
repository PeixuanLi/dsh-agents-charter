# 第 1 层 — 角色分权

[English](l1-role-separation.md) | 中文

角色分权把人与 agent（智能体）之间不成文的分工替换为由可执行代码界定的权威边界：AI agent 产出成果，人类裁决方向，机器执行规则，Agent Note 保存理据。每个角色的权威从可观察的事实计算得出，而不是靠默契假定，因此替换任何一个参与者都不改变团队的协作方式。其余四层都在这一层界定的边界内运行；参见[框架范式](../paradigm.zh.md)概述。

## 本层机制

- [mechanisms/role-separation.zh.md](../mechanisms/role-separation.zh.md) — 四角色权威分立（AI 产出、人类裁决、机器执行、Agent Note 保存理据），每条边界都以可执行代码表达
- [mechanisms/weighted-review.zh.md](../mechanisms/weighted-review.zh.md) — 评审权威是可计算的公式，由指定 owner、代码所有权与贡献历史共同决定

## 移植分析

角色分立本身可以作为书面约定移植，但加权评审（weighted review）对档位敏感：权重公式需要中型及以上、成员稳定的团队，因为公式依赖的代码所有权与贡献历史都要靠时间积累。最小移植路径是在贡献量还在增长时指定评审 owner 并采用公式，而不是事后补建。本层的参照配置——加权评审治理——在里程碑 M3 恢复于 `reference/github/` 目录。
