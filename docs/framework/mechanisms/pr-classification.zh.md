# 每个 PR（Pull Request）一种 kind；area 多选

[English](pr-classification.md) | 中文

- 所属层：[L5 — 流程自动化](../layers/l5-process-automation.zh.md)
- 管辖范围：每个 PR 一种 kind，area 多选，通过原生 Issue Types 机器可聚合。

## 规则正文

分类没有常驻规则文本；它的源是 PR 模板加平台的原生类型。一个 PR 恰好声明一种 kind——模板只把问题问一次，原生 Issue Type 把答案记录在机器可读的位置——而 area 是多选，列出变更实际触及的一切。两个字段都无需解析标题或自由格式标签即可聚合，这正是路由与度量得以廉价构建在其上的原因。

## 执法

模板在创作时执法，方式是把 kind 问题只问一次；每个下游消费方都从原生类型重新推导自己的视图，而不是重新解析文字，这让分类因为有活干而保持诚实。移植配置参照：[pull_request_template.md](../../../reference/github/pull_request_template.md) 与 `ISSUE_TEMPLATE/` 的表单，恢复于 [reference/github/](../../../reference/github/README.md) 之下。

## 成本与前提

一套所有人同意保持稳定的分类词汇：kind 词汇表必须小到几秒内能选完，稳到消费方能在其上构建。模板是便宜的前提；真正的前提是至少一个消费方——路由、度量、评审分派，或 [issue 状态机](../mechanisms/issue-state-machine.zh.md) 的 `typed`/`untyped` 监听器——因为没有读者的分类就是纯粹的填表。

## 档位建议

Solo ✗ · Small ✓ · Medium ✓ · Large ✓ —— 分类在作者之外有人消费时才值回成本；solo 工作没有这样的读者。

## 移植清单

- 把 kind 问题作为单选放进 PR 模板，把答案记录为原生 Issue Type，而不是标签命名约定。
- 把 area 记为多选，覆盖变更实际触及的一切——一种 kind，多个 area。
- 在扩展分类之前先接好第一个消费方；只有当消费方提出需求时才新增类别。
- 验证：开一个 PR，确认恰好记录了一种 kind，且每个实际触及的 area 都出现在多选里。

## 失效模式

没有消费方的分类是填表税：作者挑最接近的值，词汇表烂掉，而没有人察觉，因为没有任何东西在读它；有了消费方，路由与度量就在同样的字段上复利。
