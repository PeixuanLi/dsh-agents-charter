# 每个 PR（Pull Request）都演练，发布由人工触发

[English](release-double-gate.md) | 中文

- 所属层：[L5 — 流程自动化](../layers/l5-process-automation.zh.md)
- 管辖范围：每个 PR 都在无凭证条件下演练打包；发布由人从 tag 手动触发。

## 规则正文

本机制没有常驻规则文本；它是两个 workflow。第一个跑在每个 PR 上，在没有任何凭证在场的情况下演练发布要走的打包步骤，让打包破坏以平常 CI 噪音的面目出现，而不是发布日的紧急事故。第二个是人工 dispatch：人从 tag 触发发布，workflow 在评估之前先挂 pending 状态，因此失败的 setup 不能留下旧的成功状态。

## 执法

两道闸都是 workflow：演练是每个 PR 上的必需检查，发布只作为 tag 上的人工 dispatch 存在——绝不是 push 上的自动步骤。`Ported-config reference: reference/github/release.yml`（里程碑 M3 恢复）。

## 成本与前提

一个无凭证 job 加一个 dispatch 入口——这是仍然能把「人记忆中的步骤」从发布里移除的最便宜的一对闸。双闸从第一个打 tag 的发布起适用：它需要一个无需凭证即可构建发布产物的 CI job；还没有任何发布时，就没有可演练的东西。

## 档位建议

Solo ✓ · Small ✓ · Medium ✓ · Large ✓ —— 一个 CI job 加一个 dispatch 入口，从第一个打 tag 的发布起就值得运行；还没有发布流程的仓库，演练没有可覆盖的对象。

## 移植清单

- 在每个 PR 上运行无凭证的打包演练：步骤与发布相同，只是抽掉所有 secret。
- 把演练设为必需检查，让打包破坏挡住合并。
- 只从 tag 上的人工 dispatch 发布；绝不在 push 上自动发布。
- 发布 workflow 在评估之前先挂 pending 状态，让失败的 setup 不能留下旧的成功状态。
- 验证：开一个破坏打包的 PR，确认演练在合并前拒绝它。

## 失效模式

凭记忆发布恰恰在压力最大时漏掉步骤：今天就要发布，清单在某人脑子里，漏掉的步骤直接出门；演练的存在，是为了让每个步骤在发布日之前至少真正跑过一次。
