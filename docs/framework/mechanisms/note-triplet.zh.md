# 英文、中文、指纹伴随记录三件套

[English](note-triplet.md) | 中文

- 所属层：[L2 — 外部化记忆](../layers/l2-external-memory.zh.md)
- 管辖范围：每份笔记的语言文件与一致性记录以集合形式存在——`.md`、它的 `.zh.md` 对侧文件，以及指纹 `.i18n.yaml` 伴随记录。

## 规则正文

[notes README 的「文件格式」一节](../../../.agents/notes/README.zh.md#the-file-format)固定了两种语言中逐字保留英文的头部标记（`# Agent Note: ` 与 `Status:` 行）；中文对侧文件在 [i18n 约定](../../../docs/i18n/README.zh.md)下逐章节镜像结构。伴随记录（仓库内的样例是 [README.i18n.yaml](../../../.agents/notes/README.i18n.yaml)）按标题章节记录每一侧的 hash，因此两种语言之间的结构漂移无需人工重读即可发现。

## 执法

`pnpm run verify-translation-pairing`（[scripts/verify-translation-pairing.ts](../../../scripts/verify-translation-pairing.ts)）拒绝不完整的配对、结构不匹配、未记录的一侧，以及指向错误语言对侧的链接；`--write` 在编辑后重新记录已确认的配对。

## 成本与前提

每份笔记多一个文件，加上翻译本身。常设成本是同步：每次内容编辑都要在同一变更中更新对侧文件并重录伴随记录。只在确实维持两种语言的地方支付这笔成本——单语团队退化为单文件加格式门禁。

## 档位建议

跟随双语选择而非人数：团队维持两种语言时，三件套在所有档位适用；单语团队改为单文件加格式门禁。

## 移植清单

- 先决定语言策略；只有维持两种语言的地方才存在三件套。
- 为新配对生成伴随记录：`pnpm run verify-translation-pairing --write <note>.md`。
- 头部标记（`# Agent Note: `、`Status:`）在两侧逐字保留英文。
- 内容编辑的同一变更中更新对侧文件并重录伴随记录。

## 失效模式

缺失任何一个成员都会让集合存在的理由作废：没有对侧文件，跨语言读者无法确认两侧一致；没有伴随记录，漂移无人可见，直到有人把两侧都读一遍。残缺的三件套比没有更糟——它承诺配对，交付的却是陈旧的一半。
