# 双语文档是带指纹的配对

[English](bilingual-pairing.md) | 中文

- 所属层：[L3 — 机器验证](../layers/l3-machine-verification.zh.md)
- 管辖范围：可选模块——双语文档通过分节指纹记录保持结构对齐，翻译漂移因此立即可见。

## 规则正文

[i18n 约定](../../../docs/i18n/README.zh.md)固定了配对形式：每份受治理的文档是英文 `.md` 加中文 `.zh.md` 对侧文件，第 2 行是语言切换行，另有一份 `.i18n.yaml` 伴随记录为每一侧按标题分节记录 hash。指纹让两种语言之间的结构漂移无需人工重读即可发现；记录是数据，重新生成而不是手工维护。

## 执法

`pnpm run verify-translation-pairing`（[scripts/verify-translation-pairing.ts](../../../scripts/verify-translation-pairing.ts)）拒绝不完整的配对、两侧的结构不匹配、未记录的一侧，以及指向错误语言侧的链接。正当编辑之后，`--write <pair>` 重录确认过的配对；指定配对的用法让编辑迭代不必为全语料扫描买单。

## 成本与前提

每对多一份文件，外加翻译本身，以及长期规则：任何内容编辑都要在同一变更中更新对侧文件并重录伴随记录。只在确实维持两种语言的地方采纳。

## 档位建议

跟随双语人力而不是人数：团队维持两种语言时，配对在每个档位都适用；没有这种人力，该模块就是僵尸税，不应采纳。

## 移植清单

- 先决定语言政策；只在维持两种语言的地方启用该模块。
- 把语言切换行写成两侧的第 2 行，各自指向对侧。
- 生成伴随记录：`pnpm run verify-translation-pairing --write <pair>`。
- 任何内容编辑都在同一变更中更新对侧文件并重录伴随记录。
- 验证：`pnpm run verify-translation-pairing`。

## 失效模式

没有双语人力，[英文、中文、指纹伴随记录三件套](../mechanisms/note-triplet.zh.md)就变成僵尸税：记录漂移，门禁长期红着，团队学会无视它——这条红信号于是不再保护那些仍值得保护的配对。
