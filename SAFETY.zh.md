# 安全

[English](SAFETY.md) | 中文

## 本仓库交付什么

本仓库是一份治理语料：文档、治理门禁与参照配置。它不交付任何运行时产品，也不运行任何网络服务，仓库中没有内容读取模型凭据（[密钥策略](AGENTS.md#secrets--env)）。

## 报告

门禁脚本或其他维护文件的缺陷与漏洞，请通过本仓库的 [GitHub 安全公告](https://github.com/PeixuanLi/dsh-agents-charter/security/advisories/new)或 [issue](https://github.com/PeixuanLi/dsh-agents-charter/issues) 报告。上游 DeepSeek Harness 的产品安全事项属于 [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)，不属于本仓库。

## 参照配置

[参照附录](reference/github/README.md)逐字恢复上游的 GitHub workflow 配置，因此这些文件会提到本仓库不存在的上游服务与密钥。部署它们是移植者的责任，包括附录列出的[移植前置条件](reference/github/README.md#porting-prerequisites)。
