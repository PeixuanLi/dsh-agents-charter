# Agents 协作框架

[English](README.md) | 中文

本目录是 Agents 协作框架的规范层，可以从其活的参照实现中整体抽出——参照实现是同一个仓库，横跨执行面与这份规范层。框架把此前依赖人类默契的协作规范转化为机器可执行的约束：AI agent（智能体）产出成果，人类裁决方向，机器执行规则，Agent Note 保存理据。[框架范式](paradigm.zh.md)陈述这套模型——五个机制层与四条论断——并写明这份语料的来源。

## 如何阅读本规范

从[框架范式](paradigm.zh.md)入手，读模型与它的四条论断，然后下钻到 `layers/` 下的各层章节；[第 1 层 — 角色分权](layers/l1-role-separation.zh.md)是入口，因为其余四层都在它界定的边界内运行。每个层章节索引自己的机制卡片。每张卡片自成一体：管辖什么、规则正文在哪里、靠什么执法、移植要付什么成本、适合哪些档位、缺了前提会如何失效。

## 使用本框架

采纳按机制进行：按档位挑选卡片，跟随每张卡片的移植清单，并把卡片的执法一节当作验收检查——卡片写明了命令的，运行该命令。按档位打包的 profile 见 [profiles.zh.md](profiles.zh.md)，L1/L5 卡片的参照配置恢复于 [reference/github/](../../reference/github/README.md) 之下。

## 这份语料治理自身

本目录位于参照实现内部，受它自己的门禁约束：`verify-translation-pairing` 检查每个双语配对，`verify-md-links` 检查每个链接目标，`verify-md-wrap` 让每个段落保持一个物理行，`verify-doc-budgets` 在已注册的页面上适用，`verify-concrete-terms` 拒绝它禁用的标签。规范与实现之间的漂移和其他缺陷一样让 CI 变红，因此不要在这里添加不受治理的页面。
