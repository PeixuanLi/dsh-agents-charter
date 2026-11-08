# Layer 1 — Role separation

English | [中文](l1-role-separation.zh.md)

Role separation replaces the unspoken division of labor between humans and agents with authority boundaries defined by executable code: AI agents produce the output, humans decide direction, machines enforce the rules, and Agent Notes keep the rationale. Each role's authority is computed from observable facts rather than assumed from mutual understanding, so any participant can be replaced without changing how the team works. The other four layers operate within the boundaries this layer defines; see the [framework paradigm](../paradigm.md) overview.

## Mechanisms in this layer

- [mechanisms/role-separation.md](../mechanisms/role-separation.md) — the four-role authority split (AI produces, humans decide, machines enforce, Agent Notes keep rationale) with every boundary expressed as executable code
- [mechanisms/weighted-review.md](../mechanisms/weighted-review.md) — review authority as a computable formula of designated owners, code ownership, and contribution history

## Porting analysis

The role split itself ports as written convention, but weighted review is tier-sensitive: the weight formula needs a mid-size or larger team with stable membership, because it draws value from code ownership and contribution history that only accumulate over time. The minimal porting path is to designate review owners and adopt the formula while contribution volume is still growing, not after. This layer's reference configurations — the weighted-review governance — are restored under [reference/github/](../../../reference/github/README.md).
