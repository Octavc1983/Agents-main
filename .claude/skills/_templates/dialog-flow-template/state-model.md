# DialogFlowTemplate — State Model

## DialogFlowState — All States

| State | When | Footer Primary | Body Content |
|---|---|---|---|
| `initial` | Dialog just opened | Next/Submit enabled | Empty or prefilled form |
| `loading` | Loading existing data | Disabled | Loading skeleton |
| `ready` | Data loaded, no changes | Next/Submit enabled | Form with values |
| `dirty` | User has made changes | Next/Submit enabled | Form with unsaved values |
| `invalid` | Validation failed | Next/Submit disabled | Form with inline errors |
| `submitting` | Save/Next in progress | Disabled (loading) | Form locked |
| `completed` | Operation succeeded | Close (relabeled) | Success state content |
| `warning` | Success with warnings | Acknowledge (explicit) | Warning content + detail |
| `failed` | Backend error | Retry (if safe) | Error message at dialog level |
| `unknown-outcome` | Timeout | Close + retry guidance | "We don't know if this worked" |
| `read-only` | Viewing non-editable data | Close only | Non-editable fields |

## State Transitions

```
initial
  → ready (on data load)
  → loading (if async prefill needed)

loading
  → ready (on success)
  → failed (on load error)

ready / dirty
  → invalid (on validation failure)
  → submitting (on Next/Submit)

invalid
  → dirty (on field change)
  → submitting (if all errors resolved)

submitting
  → completed (on success)
  → warning (on success with warnings)
  → failed (on backend error)
  → unknown-outcome (on timeout)

completed → [dialog closes or user clicks Close]
warning → [user acknowledges → continues or closes]
failed → [user retries → submitting] or [user closes]
unknown-outcome → [user closes] or [user retries]
```

## Prototype State Simulation

All transitions must be simulated with deterministic mock logic:

```ts
// Example mock transition for submitting
const simulateSubmit = async () => {
  setState('submitting');
  await mockDelay(1500);
  // deterministic: pick one outcome per mock scenario
  setState('completed'); // or 'failed' or 'unknown-outcome'
};
```

Prototype mock outcomes must demonstrate all states listed above.

## Dirty Close Confirmation

When `isDirty=true` and user attempts to close (X, Cancel, Escape, backdrop):
→ Open ConfirmationDialogTemplate with:
  - title: "Discard changes?"
  - consequence: "Your unsaved changes will be lost."
  - confirmLabel: "Discard changes"
  - variant: "discard"

On Confirm: close dialog, discard
On Cancel: return focus to dialog, unsaved data preserved

## Warning Acknowledgment

When state is `warning`:
- Do not auto-close
- Show warning detail
- Require explicit acknowledgment before continuing
- Continue = deliberate user action

## Unknown Outcome (DEC-004)

Timeout → `unknown-outcome` state. Never auto-map to `failed`.
Show: "We couldn't confirm whether this was saved."
Provide: "Close" and optional "Try again" (only if retry is safe per backend contract).
