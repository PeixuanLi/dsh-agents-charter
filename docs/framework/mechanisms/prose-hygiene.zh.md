# 文风卫生：slop 清单与推理痕迹判据

[English](prose-hygiene.md) | 中文

- 所属层：[L4 — 指令分层](../layers/l4-instruction-layering.zh.md)
- 管辖范围：产出文本不带 LLM（大语言模型）文档病态——没有推理过程记录、没有代替精确对象的隐喻词、没有会话痕迹。

## 规则正文

[prose-standard skill（技能）](../../../.agents/skills/prose-standard/SKILL.md) 拥有标准本身：保全完整命题，把 `contract`、`boundary`、`shape` 当作使用前需要核对的词而不是禁词，在使用点保留完整约定，每个解释只有一个归属。[dsh-trim-cot-leakage skill](../../../.agents/skills/dsh-trim-cot-leakage/SKILL.md) 拥有那一条判据：一位位于 HEAD、看不到任何会话记录、PR（Pull Request）线程或未提交草稿的读者，能否解析每个引用并核验每个论断？两个 skill 都是写作与评审时应用的指引；机器可查的部分是被约定禁用的模糊来源标签（AGENTS.md 中的 `prove` + `nance`）。

## 执法

`pnpm run verify-concrete-terms`（[scripts/verify-concrete-terms.ts](../../../scripts/verify-concrete-terms.ts)）在每份受维护的被跟踪文件中拒绝被禁标签——刻意收窄，因为没有解析器能判断一个词是否命名了它的精确对象。其余一切是判断性检查：两个 skill 在写作与评审时运行，门禁只守住机械可判的部分。

## 成本与前提

skill 必须常驻并在评审中被调用——卫生是成文时的一次判断性检查，不是事后的批处理。成本集中在首次清扫继承文本；从一开始就按标准写出的文本几乎没有成本。

## 档位建议

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## 移植清单

- 以精确触发条件的 description 采纳两个 skill（`prose-standard`、`dsh-trim-cot-leakage`）。
- 用那条判据对继承文本做一次清扫，再把防线交给评审。
- 把被禁标签门禁接进 CI：`pnpm run verify-concrete-terms`。
- 每次文档变更后重跑 `pnpm run verify-concrete-terms`。

## 失效模式

无人把关的 slop 随产出线性累积：推理过程记录、失效引用与含糊的计划残留不断堆积，直到读者无法把结论与过程分开。没有哪一段坏到足以标记——这正是标准需要一条具名判据、门禁需要守住机械可查部分的原因。
