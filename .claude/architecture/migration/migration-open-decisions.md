# Migration Open Decisions

These decisions require product, UX, or architecture resolution before implementation can proceed on the affected flows.

Items marked **Blocked** cannot be implemented until resolved.
Items marked **Prototype-safe** can be implemented with mock behavior while the decision is pending.

---

## OD-001 — DownloadDrSsh UX Flow

**Status:** Open
**Blocking?** No — Prototype-safe

**Question:**
SshOnUploadServer success creates a `DownloadDrSsh` task (IDLE). What is the UX for the user to download the DR SSH public key?

Options:
- Show a "Download SSH key" button in the Configuration step UI
- Auto-display the key in a masked/copyable field
- Redirect to a separate configuration page

**Prototype guidance:** Show a mock "Download SSH public key" button that copies mock key value to clipboard. Do not display the raw key in the UI.

---

## OD-002 — Retry After Timeout Safety

**Status:** Open
**Blocking?** No — Prototype-safe with "Retry" hidden by default

**Question:**
Which `backend_operation` tasks are confirmed safe to retry after a TIMEOUT (vs FAILURE)?

Currently known:
- FAILURE → Retry is user-initiated (safe, confirmed by backend contract)
- TIMEOUT → Retry safety is NOT confirmed for all tasks

**Prototype guidance:** Show Retry for FAILURE state. For TIMEOUT, show "We couldn't confirm the outcome" with a "Contact support or try again" message, but do not auto-show Retry unless confirmed.

---

## OD-003 — Warning Acknowledgment: Continue vs. Block

**Status:** Open
**Blocking?** No — Prototype-safe

**Question:**
For tasks that complete with `SUCCESS_WITH_WARNINGS`, can the user always continue to the next step after acknowledging the warning? Or are some warnings blocking?

**Prototype guidance:** Implement acknowledgment-required warning state for all warnings. Show "Continue despite warning" button after acknowledgment. Mark all warnings as continuable in prototype.

---

## OD-004 — ConfigureAdditionalServices — Required vs Optional

**Status:** Open
**Blocking?** No — Prototype-safe

**Question:**
Is ConfigureAdditionalServices a required step (user must configure at least something) or can the user skip it entirely?

**Prototype guidance:** Show a "Skip (no additional services needed)" option alongside the form. Implement skip as immediate SUCCESS.

---

## OD-005 — Migration Wizard Entry Point

**Status:** Open
**Blocking?** No — Prototype-safe

**Question:**
How does the user initiate the H2P Migration wizard?

Options:
- From a dedicated "Migration" section in the sidebar
- From a dashboard card/CTA
- From the Managed Accounts page via an action
- From an onboarding flow

**Prototype guidance:** Use a temporary route `/migration` with a sidebar entry. Mark as prototype navigation — not final product navigation.

---

## OD-006 — Post-Migration: Stay or Redirect

**Status:** Open
**Blocking?** No — Prototype-safe

**Question:**
After migration completes, where does the user go?

Options:
- Stay on the migration wizard with a completion screen
- Redirect to the Managed Accounts page
- Redirect to a post-migration summary page
- Show a completion modal that routes to the next logical workflow

**Prototype guidance:** Show a completion screen within the FullScreenWizardTemplate with mock summary data and a "Go to accounts" CTA.

---

## OD-007 — Stepper: Concurrent vs Sequential Steps

**Status:** Open
**Blocking?** Partially — Prototype-safe

**Question:**
Are any migration steps intended to run concurrently (e.g. post-migration validation while migration data transfer is still finishing)?

Currently assumed: strictly sequential.

**Prototype guidance:** Implement sequential only. Mark concurrent as an open option.

---

## OD-008 — Session Timeout During Active Backend Operation

**Status:** Open
**Blocking?** No — Prototype-safe

**Question:**
If the user's session expires while a `backend_operation` task is IN_PROGRESS, what happens?

Options:
- Task completes on backend; user resumes to completed state on next login
- Task is cancelled on session expiry
- Task is paused and resumed on next login

**Prototype guidance:** Simulate resume-to-completed. Do not implement session expiry in prototype.
