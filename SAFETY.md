# Safety

English | [中文](SAFETY.zh.md)

## What this repository ships

This repository is a governance corpus: documentation, governance gates, and reference configurations. It ships no runtime product and runs no network service, and nothing in it reads model credentials ([secrets policy](AGENTS.md#secrets--env)).

## Reporting

Report defects and vulnerabilities in the gate scripts or other maintained files through a [GitHub security advisory](https://github.com/PeixuanLi/dsh-agents-charter/security/advisories/new) or [issues](https://github.com/PeixuanLi/dsh-agents-charter/issues) of this repository. Product-security matters for the upstream DeepSeek Harness belong to [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness), not this repository.

## Reference configurations

The [reference appendix](reference/github/README.md) restores upstream GitHub workflow configurations verbatim, so those files name upstream services and secrets that do not exist here. Deploying them is the porter's responsibility, including the [porting prerequisites](reference/github/README.md#porting-prerequisites) the appendix lists.
