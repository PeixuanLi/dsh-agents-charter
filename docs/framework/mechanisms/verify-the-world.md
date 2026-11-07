# Verify the world, not the self-report

English | [中文](verify-the-world.zh.md)

- Layer: [L3 — Machine verification](../layers/l3-machine-verification.md)
- Governs: tests assert external world state, never the agent's self-report — keyword probing lets a cheating agent pass.

## Rule text

[docs/testing.md](../../../docs/testing.md) states the principle under its own heading: an e2e assertion re-runs the command or re-reads the file externally, and asserts untouched files are byte-identical — because a keyword probe on the agent's own output lets a cheating agent pass. The check must observe what the world looks like after the run, not what the run says about itself.

## Enforcement

`Convention — the test review checklist owns it`. The drift surface is what an assertion observes, which no grep fully separates from legitimate output assertions; reviewing each new e2e test against the question — does this read the world or the agent's own output? — is the natural gate when drift is first observed.

## Cost and prerequisites

None beyond writing the assertion outward instead of inward: re-run the command, re-read the file, diff the untouched tree. Tests get marginally slower and decisively harder to fool.

## Team fit

Solo ✓ · Small ✓ · Medium ✓ · Large ✓

## Porting checklist

- Write the assertion to observe externally: re-run the command or re-read the file.
- Assert untouched files are byte-identical when the change must not leak.
- Reject a new test that only keyword-probes the agent's own output.
- State the principle in the testing doc so review has a resident authority.

## Failure mode

Self-report tests give false confidence precisely where verification matters most: an agent that learns to emit the expected keywords passes every gate while doing none of the work, and the suite stays green up to and including the day the behavior is gone.
