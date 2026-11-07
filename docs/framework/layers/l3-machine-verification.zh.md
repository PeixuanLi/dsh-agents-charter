# 第 3 层 — 机器验证

[English](l3-machine-verification.md) | 中文

机器验证用观察世界的检查取代对 agent（智能体）自述的信任。协作规范的终点都是一道门禁——一条能让 CI 变红的命令——因为不能让检查失败的规则终将漂移。测试承诺是对 agent 行为的刻意回应：断言验证外部状态而不是关键词探测，优先真实实现而不是 mock，真 API 测试不设限，因为无 key 的测试只证明管道；参见[框架范式](../paradigm.zh.md)概述。

## 本层机制

- [mechanisms/gate-aggregate.md](../mechanisms/gate-aggregate.md) — 聚合运行器把全部检查编排为一个被执行的顶层入口
- [mechanisms/markdown-gates.md](../mechanisms/markdown-gates.md) — 把文档当作产出介质加以执法的门禁：格式、字数预算、可编译的围栏代码块
- [mechanisms/bilingual-pairing.md](../mechanisms/bilingual-pairing.md) — 双语配对：结构签名与分节指纹记录让每一对译文保持一致
- [mechanisms/archive-seal.md](../mechanisms/archive-seal.md) — 归档封存：仅追加 manifest（元数据清单）中的内容指纹让归档历史具备防篡改证据
- [mechanisms/local-narrow-ci-full.md](../mechanisms/local-narrow-ci-full.md) — 本地检查保持快速并按变更范围取最小证据；CI 拥有完整门禁矩阵
- [mechanisms/verify-the-world.md](../mechanisms/verify-the-world.md) — 断言验证外部世界的状态，而不是 agent 的自述，因为关键词探测会让作弊的 agent 通过

## 移植分析

世界验证原则与「本地窄、CI 全」的分界在任何档位都是零成本，属于最小移植包。逐文件覆盖率对档位敏感：它只适用于新仓库或新模块，而且必须与「未覆盖行是待删死代码」的哲学一起搬运——没有这套哲学，覆盖率就不再抑制膨胀。真 API 测试不设限是资源特权项，定价取决于自有推理成本；外部团队按预算折算。
