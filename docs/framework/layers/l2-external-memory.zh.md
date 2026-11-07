# 第 2 层 — 外部化记忆

[English](l2-external-memory.md) | 中文

外部化记忆把「问人」与「重读对话」的默契渠道替换为仓库中的 Agent Note：决策及其理据留在仓库里，经验因此在 agent（智能体）更换与上下文限制之后仍然存续。系统记录决定了什么、为什么、放弃了什么，并且像治理存储一样刻意治理遗忘——删除是常规运维。它的价值在于删除了多少，而不在于保存了多少；参见[框架范式](../paradigm.zh.md)概述。

## 本层机制

- [mechanisms/note-lifecycle.md](../mechanisms/note-lifecycle.md) — 以目录路径编码的笔记生命周期：存活笔记从 proposed 走到 implemented，rejected 与 archived 是终态
- [mechanisms/note-triplet.md](../mechanisms/note-triplet.md) — 英文、中文、指纹伴随文件三件套，把每篇笔记与它的译文配对
- [mechanisms/note-alternatives.md](../mechanisms/note-alternatives.md) — 强制的 `Alternatives considered` 小节：不写打败过什么的决策记录会被拒绝，因为它招致重新翻案
- [mechanisms/note-freshness.md](../mechanisms/note-freshness.md) — 保鲜义务：笔记事实与所述代码在同一变更中更新；改变决策意味着新笔记加互链，而不是追加变更史
- [mechanisms/archive-freeze.md](../mechanisms/archive-freeze.md) — 归档即冻结：指纹进入仅追加的 manifest（元数据清单），归档内容永不修改，也不作为现行权威引用
- [mechanisms/delete-first.md](../mechanisms/delete-first.md) — 删除是常规运维：机械改动直接删除，被取代的笔记在合并时删除，只有具历史价值的内容才归档

## 移植分析

笔记生命周期连同其格式门禁是小团队的切入点，个人工作可简化为单目录模板；保鲜义务在所有档位原样适用。三件套与归档冻结是两项需要条件的加强：没有持续的双语人力，三件套就是常设税负；没有审计链需求，冻结就不值得投入。最小移植路径是先落生命周期、保鲜与删除优先的纪律，待条件成立再补三件套与冻结。
