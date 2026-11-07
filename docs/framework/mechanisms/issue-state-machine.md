# Issue state is moved by events

English | [中文](issue-state-machine.zh.md)

- Layer: [L5 — Process automation](../layers/l5-process-automation.md)
- Governs: issue status updates are driven by specific events, not manual curation.

## Rule text

The mechanism has no resident rule text; its source is the event-driven workflows themselves. Listeners subscribe to the platform's native type events (`typed`, `untyped`) and board-field events (`field_added`, `field_removed`) and move the work item in response. The policy code is checked out from the default branch, where branch protection makes it trusted, and event data is input only — a crafted event cannot carry policy with it.

## Enforcement

The workflows are the enforcement: state changes happen when an event fires, so hand-maintained status visibly drifts from what the events produced. `Ported-config reference: reference/github/issue-lifecycle.yml and reference/github/issue-policy.yml` (restored in milestone M3).

## Cost and prerequisites

A live process to drive: the machinery earns its upkeep only once issue flow is steady enough that manual curation is the bottleneck. The prerequisite is a protected default branch — the trust boundary that makes checked-out policy trustworthy — and consumers such as boards and routing that read the state the events write.

## Team fit

Solo ✗ · Small ✓ · Medium ✓ · Large ✓ — it needs a live process to drive; solo issue volume is too low for the machinery to pay for itself.

## Porting checklist

- Start each state transition as a listener on the event that should cause it — native type events for classification changes, board-field events for board moves.
- Check policy code out from the default branch at run time; consume event payloads as data, never as instructions.
- Protect the default branch first; unchecked policy code inverts the trust boundary.
- Verify by driving the events: open a test issue, fire each transition, and confirm the state moved without a manual edit.

## Failure mode

Without events driving status, the board decays into stale labels nobody trusts: statuses change when someone remembers, triage state diverges from reality, and the board stops being evidence. The decay is gradual enough that each manual edit feels harmless — which is exactly how the curation habit re-forms.
