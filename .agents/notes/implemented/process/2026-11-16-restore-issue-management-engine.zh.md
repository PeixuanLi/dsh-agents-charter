# Agent Note: Restore the issue-management engine into the reference appendix

Status: implemented

[English](2026-11-16-restore-issue-management-engine.md) | 中文

## 问题

附录从修订版 `fcc0ad4621` 恢复了两个 issue workflow（`issue-lifecycle.yml`、`issue-policy.yml`），却没有恢复它们调用的 `.github/issue-management/` 引擎，于是 issue-state-machine 与 pr-classification 两张卡背后的执法在参照集里只剩 workflow 配置、没有它们调用的代码。排除决策没有留下书面理由——恢复提交只列了收进来的文件，没有列留在上游的文件及其原因；可能的原因，org 专属钉死值与引擎体积，从未被记录。`docs/framework/profiles.md` 的 P3 验收句因此把缺口委托给移植者，恢复与否成为一个开放决策。

## 决策

引擎全树——11 个文件、97,737 字节——按字节精确恢复自 `fcc0ad4621`，落位 `reference/github/issue-management/`，并以每个文件的 Git blob 哈希对上游树逐一比对作为证据。附录的恢复原则原样成立：`fcc0ad4621` 同时是每个引擎文件的最新版（其后上游没有任何提交触碰该树），恢复没有为原则开口子。附录 README 现在点名移植者的运营前提——与 `config.json` 的 `lifecycleActor` 对应的 GitHub App、引擎与两个 workflow 里的 org 钉死值、仓库 Issue Types、标签集、以及带 Status 与 Priority 字段的 Projects 看板——P3 验收句点名 App 与 org 钉死值，而不再是缺失的引擎。

## 备选方案

**不恢复引擎，只补记排除理由。** 否决：参照集将持续残缺，P3 验收将持续点名一棵移植者必须从上游仓库自行重建的树，而上游仓库在本抽取保留的历史之外。

**恢复但裁掉 48,163 字节的测试。** 否决：破坏字节精确性，为附录原则开例外，并且丢掉移植者最先运行的无密钥测试套件。

**推迟到 M4 独立仓库抽取。** 否决：M4 没有日期，且届时本来就要重审附录；参照材料在本仓库不产生运行时成本，等待无所获。

## 后果

附录从 224K 增长到 322K，引擎的双语 README 对落在既有 `reference/**` 排除范围之外、无需配对记录。引擎测试套件 51 项中 50 项在仓库根目录无密钥跑通；唯一失败的是按上游 `.github/` 深度解析仓库根的对齐测试——比附录映射高一层目录——附录 README 已如实记录。恢复换来的是：L5 参照集完整，两张 P3 卡的执法随树交付，移植者复制一棵树即可，而不必反向推导 workflow 调用了哪些文件。
