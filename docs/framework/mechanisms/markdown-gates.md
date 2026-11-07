# Documentation is machine-checked output

English | [中文](markdown-gates.zh.md)

- Layer: [L3 — Machine verification](../layers/l3-machine-verification.md)
- Governs: produced documentation is machine-checked — links resolve, paragraphs wrap as one physical line, diagram fences parse.

## Rule text

Three gates own the medium, each one executable: [scripts/verify-md-links.ts](../../../scripts/verify-md-links.ts) rejects a relative cross-link whose target does not exist; [scripts/verify-md-wrap.ts](../../../scripts/verify-md-wrap.ts) rejects a prose paragraph spanning more than one physical line, so wrapping stays a renderer concern; [scripts/verify-mermaid.ts](../../../scripts/verify-mermaid.ts) parses every repo-authored Mermaid fence with Mermaid itself, catching syntax that link and fence checks cannot. Documentation then behaves like any build output: a broken artifact fails a command instead of shipping.

## Enforcement

`pnpm run verify-md-links`, `pnpm run verify-md-wrap`, and `pnpm run verify-mermaid`, all composed into the `doc-sync` aggregate so the whole matrix runs as one command.

## Cost and prerequisites

Nothing to adopt — the checks are scripts that run in seconds. The standing cost is writing discipline: one paragraph per physical line and links only to real targets; both are mechanically enforced, so the cost surfaces as gate output rather than review debate.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Adopt the three checks as package scripts: `verify-md-links`, `verify-md-wrap`, `verify-mermaid`.
- Compose them into one aggregate so the set runs as a single command.
- Write one paragraph per physical line; let the renderer wrap.
- Link only to paths that exist; repair or delete the link when the target moves.
- Verify: `pnpm run doc-sync`.

## Failure mode

Broken links and drifting format turn documentation from an asset into noise no one trusts: a reader who hits one dead link stops trusting every link, and prose that renders differently per viewer stops being a reliable carrier for rules.
