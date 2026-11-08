# Agents collaboration framework

English | [中文](README.zh.md)

This directory is the extractable spec layer of the agents collaboration framework over its living reference implementation. The framework turns collaboration norms that previously depended on human tacit understanding into machine-executable constraints: AI agents produce the output, humans decide direction, machines enforce the rules, and Agent Notes keep the rationale. The [framework paradigm](paradigm.md) states the model — its five mechanism layers and four assertions — and names the sources this corpus derives from.

## How to read this spec

Start at [the framework paradigm](paradigm.md) for the model and its four assertions, then descend into the layer chapters under `layers/`; [Layer 1 — Role separation](layers/l1-role-separation.md) is the entry point, because the other four layers operate within the boundaries it defines. Each layer chapter indexes its mechanism cards. Each card is self-contained: what it governs, where its rule text lives, what enforces it, what porting costs, which team tiers it fits, and how it fails without its prerequisites.

## Using the framework

Adoption is per-mechanism: pick cards by team tier, follow each card's porting checklist, and take the card's Enforcement section as the acceptance check — run the command where the card names one. Tier-bundled profiles live in [profiles.md](profiles.md), and the L1/L5 cards' reference configurations are restored under [reference/github/](../../reference/github/README.md).

## This corpus governs itself

This directory lives inside the reference implementation and is subject to its own gates: `verify-translation-pairing` checks each bilingual pair, `verify-md-links` checks every link target, `verify-md-wrap` keeps each paragraph to one physical line, `verify-doc-budgets` applies where a page is registered, and `verify-concrete-terms` rejects its banned label. Spec-implementation drift fails CI exactly like any other defect, so do not add ungoverned pages here.
