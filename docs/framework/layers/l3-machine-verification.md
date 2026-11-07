# Layer 3 — Machine verification

English | [中文](l3-machine-verification.zh.md)

Machine verification replaces trust in an agent's self-report with checks that observe the world. Every collaboration norm ends as a gate — a command that can turn CI red — because a rule that cannot fail a check eventually drifts. The testing commitments are deliberate responses to agent behavior: assertions verify external state rather than keyword probes, real implementations are preferred over mocks, and real-API tests are not rationed, because a keyless test only proves plumbing; see the [framework paradigm](../paradigm.md) overview.

## Mechanisms in this layer

- [mechanisms/gate-aggregate.md](../mechanisms/gate-aggregate.md) — one aggregate runner composes every check into a single executed top-level entry point
- [mechanisms/markdown-gates.md](../mechanisms/markdown-gates.md) — gates that enforce documentation as an output medium: format, word budgets, and compilable fenced blocks
- [mechanisms/bilingual-pairing.md](../mechanisms/bilingual-pairing.md) — bilingual pairing: structural signatures and recorded per-section fingerprints keep every translation pair consistent
- [mechanisms/archive-seal.md](../mechanisms/archive-seal.md) — the archive seal: content fingerprints in an append-only manifest make archived history tamper-evident
- [mechanisms/local-narrow-ci-full.md](../mechanisms/local-narrow-ci-full.md) — local checkpoints stay fast and scoped to the change; CI owns the full gate matrix
- [mechanisms/verify-the-world.md](../mechanisms/verify-the-world.md) — assertions verify the state of the world, not the agent's self-report, because keyword probing lets a cheating agent pass

## Porting analysis

The verify-the-world principle and the narrow-local, full-CI split cost nothing to adopt at any tier and belong in the minimal porting package. Per-file coverage is tier-sensitive: it fits new repositories or new modules only, and it must move together with the philosophy that an uncovered line is dead code to delete — without that philosophy, coverage stops suppressing bloat. Unlimited real-API testing is a resource-privilege item priced on in-house inference cost; external teams scale it to budget.
