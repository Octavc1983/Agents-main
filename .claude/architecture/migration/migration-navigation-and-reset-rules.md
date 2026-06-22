# Migration Navigation and Reset Rules

**Prototype note:** Navigation behavior must be simulated accurately. No live backend. Mock state only.

---

## FullScreenWizardTemplate Integration

The migration uses `FullScreenWizardTemplate` (DEC-016). The template provides:
- Left nav panel with vertical stepper (one bubble per step)
- Right body with scrollable step content + fixed footer
- Footer: Close | Back | Primary action (Next / Confirm / Start migration)

---

## Stepper Click Rules

| Step status | Clickable? | Condition |
|---|---|---|
| `completed` | Yes | `isAccessible=true` AND `onStepClick` provided |
| `warning` | Yes | User may revisit and re-examine |
| `failed` | Yes | User may retry or review |
| `current` (in-progress) | No | Already active |
| `not-started` | No | Not yet reachable |
| `locked` | No | Predecessor not complete |
| `blocked` | No | External dependency |
| `in-progress` | No | Backend operation running |
| `unknown-outcome` | No | Outcome not confirmed — do not allow navigation away |

---

## Back Behavior Per Step

| Step | `WizardBackBehavior` | Behavior |
|---|---|---|
| Prerequisites | `allowed-no-reset` | Back always enabled; returns to pre-migration context |
| Configuration | `allowed-with-downstream-reset` | Back enabled; consumer must show reset confirmation when machine changes |
| Validation | `blocked-after-irreversible-action` | Back button visible but disabled once backend validation has run |
| Migration | `blocked-after-irreversible-action` | Back disabled once migration operation has started |
| Post-migration | `allowed-no-reset` | Back returns to migration step for review |

---

## ChooseUploadMachine — Reset Impact Protocol

When the user selects a new upload machine:

1. Show `ConfirmationDialogTemplate`:
   - Title: "Change upload machine?"
   - Consequence: "Selecting a new machine will reset all configuration progress. You will need to re-run all configuration tasks."
   - Impacted: List affected tasks
   - Confirm label: "Change machine and reset"
   - Variant: `reset`

2. On Confirm:
   - Mock: clear all Configuration step task statuses
   - Mock: set subsequent steps to `locked`
   - Proceed with new machine selection

3. On Cancel:
   - Return to current configuration state
   - No changes made

---

## Close / Cancel Behavior

The stepper footer has a **Close** button (not "Cancel") throughout the migration flow.

| State | Close behavior |
|---|---|
| Steps not started / ready | Close navigates away — no confirmation needed |
| Step in progress (user has dirty form) | Close triggers `ConfirmationDialogTemplate` — "Leave migration setup?" |
| Backend operation running | Close does NOT stop the operation. Show: "The operation will continue running. You can return to check the status." |
| Migration operation actively running | Close is visible but shows a modal: "Migration is in progress. Closing this view will not stop the migration." |

---

## Navigation While Backend Operation Is Running

When a `backend_operation` task is `IN_PROGRESS` (PENDING state, awaiting Pubsub):
- The stepper shows a spinner on the current step
- Next is disabled
- Back is disabled (`blocked-after-irreversible-action` when applicable)
- The user can close the wizard view — the operation continues on the backend
- On returning: the wizard re-reads step status and resumes from current state

**Prototype:** Simulate this by running a mock timer. When user returns (navigates back), load mock current state.

---

## Deep Link and Session Resume

The migration wizard must support session resume:
- User closes browser and returns later
- Wizard reads current step status from backend
- Resumes at the current step
- Completed steps remain `completed`
- In-progress steps re-enter their current state (PENDING/IN_PROGRESS)

**Prototype:** Simulate resume via persisted mock state in localStorage or React context.

---

## Sidebar Behavior

The active sidebar item does NOT change during migration.
The migration wizard fills Main Content only.
AppShell, Sidebar, Header remain intact.
