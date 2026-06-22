# Migration Validation and Error Model

**Prototype note:** All validation and error outcomes are simulated. No live backend. Mock data only.

---

## Validation Types

| Type | When | Handling |
|---|---|---|
| Field validation | User input in user_action tasks (e.g. ChooseUploadMachine) | Inline field error — block Next until resolved |
| Step-level validation | User clicks Next on a step | Validate all required fields before proceeding |
| Backend validation | backend_operation task result (Pubsub) | Task status update: SUCCESS/FAILURE/TIMEOUT |
| Cross-step validation | Downstream steps depend on upstream decisions | Upstream change resets downstream (see reset rules) |

---

## Field Validation Rules

- Validate on blur, not on keystroke
- Show error below the affected field
- Block Next until all errors are resolved
- State = `invalid` while errors exist
- State returns to `dirty` when user edits any field

---

## Backend Operation Outcomes

Each `backend_operation` task maps its outcome to a UX state:

| CM Outcome | Task Status | UX State | User Action Available |
|---|---|---|---|
| SUCCEEDED | SUCCESS | ✓ Check mark, next step unlocks | Next (auto or manual) |
| SUCCEEDED with warnings | SUCCESS_WITH_WARNINGS | ⚠ Warning icon | Acknowledge warning, then Next |
| FAILED | FAILURE | ✗ Error icon | Retry |
| TIMED_OUT | TIMEOUT | ? Unknown outcome | Close + retry guidance (DEC-004) |
| ABORTED | FAILURE | ✗ Error icon | Retry |

---

## Timeout Handling (DEC-004)

**Timeout → unknown-outcome. Never auto-fail.**

When a backend_operation times out:
- Task status: `TIMEOUT`
- UX state: `unknown-outcome`
- Show: "We couldn't confirm whether this completed."
- Show: Close + "Try again" (only if retry is confirmed safe by backend)
- Do NOT automatically mark as failed
- Do NOT auto-retry

**Prototype:** Simulate timeout via mock timer that resolves to `unknown-outcome` after threshold (e.g. 30s mock → unknown-outcome).

---

## Retry Rules

Retry is available when:
1. Task status is `FAILURE` (not TIMEOUT unless explicitly confirmed safe)
2. The backend contract confirms the operation is safe to retry
3. The task has `update_policy: backend_operation` — user triggers retry via UI, which re-initiates the CM operation

Retry is NOT available when:
- Task status is `TIMEOUT` unless confirmed safe
- Task has `update_policy: user_action` — user simply resubmits the form instead
- The operation has already had side effects that cannot be reversed (non-idempotent)

---

## Error Display Rules

| Error type | Where shown | Format |
|---|---|---|
| Field validation error | Below affected field | Inline, red, specific message |
| Step-level validation error | Top of step content area | Summary or first error |
| Backend task failure | Task row in step UI | StatusIcon failed + localized error message |
| Backend timeout | Task row | StatusIcon unknown + localized "couldn't confirm" message |
| Step-level failure | Step bubble in stepper | Failed state bubble + connector line |
| Connectivity error (UI → backend) | Step content area | DS SystemMessage or Callout |

---

## Error Message Rules

- Never show raw backend error text to users
- Never show stack traces
- Never show internal task IDs in error messages
- Show safe localized messages only: "Connection test failed", "SSH configuration failed", etc.
- Show technical reason only when it is actionable for the user (e.g. "Firewall rule blocking port 22")

---

## Warning State (SUCCESS_WITH_WARNINGS)

When a task completes with warnings:
1. Task status = `SUCCESS_WITH_WARNINGS`
2. Step may still progress if warnings are non-blocking
3. User must explicitly acknowledge the warning before clicking Next
4. Warning detail must be clearly communicated
5. Stepper shows `warning` bubble for the affected step

Warning acknowledgment is NOT optional. Do not auto-advance past a warning.

---

## Non-Blocking vs Blocking Failures

| Failure type | Behavior |
|---|---|
| Blocking failure | Step cannot proceed; user must resolve |
| Non-blocking warning | Step may proceed after explicit acknowledgment |
| Blocked by external dependency | Step shows `blocked` state; no user action available until dependency resolves |
