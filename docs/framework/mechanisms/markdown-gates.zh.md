# 文档是被机器检查的产物

[English](markdown-gates.md) | 中文

- 所属层：[L3 — 机器验证](../layers/l3-machine-verification.zh.md)
- 管辖范围：产出的文档受机器检查——链接可解析，段落按一个物理行换行，图表围栏可解析。

## 规则正文

三道门禁拥有这个介质，每道都可执行：[scripts/verify-md-links.ts](../../../scripts/verify-md-links.ts) 拒绝目标不存在的相对交叉链接；[scripts/verify-md-wrap.ts](../../../scripts/verify-md-wrap.ts) 拒绝跨多个物理行的散文段落，让换行留给渲染器；[scripts/verify-mermaid.ts](../../../scripts/verify-mermaid.ts) 用 Mermaid 本身解析仓库撰写的每个 Mermaid 围栏，捕获链接与围栏检查发现不了的语法。文档于是和任何构建产物一样：坏掉的产物让命令失败，而不是被发布出去。

## 执法

`pnpm run verify-md-links`、`pnpm run verify-md-wrap` 与 `pnpm run verify-mermaid`，全部编入 `doc-sync` 聚合，整个矩阵作为一条命令运行。

## 成本与前提

采纳零成本——检查就是几秒内跑完的脚本。长期成本是写作纪律：一个物理行一个段落、链接只指向真实目标；两者都被机械执法，因此成本以门禁输出而不是评审争论的形式出现。

## 档位建议

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## 移植清单

- 把三道检查接纳为 package script：`verify-md-links`、`verify-md-wrap`、`verify-mermaid`。
- 编入同一个聚合，让这组检查作为一条命令运行。
- 一个段落写成一个物理行；换行交给渲染器。
- 只链接真实存在的路径；目标移动时修复或删除链接。
- 验证：`pnpm run doc-sync`。

## 失效模式

断链与格式漂移把文档从资产变成没人信任的噪音：读者碰到一条死链就会不再信任所有链接，渲染结果随查看器漂移的正文也不再是规则的可靠载体。
