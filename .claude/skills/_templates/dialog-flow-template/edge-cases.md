# DialogFlowTemplate — Edge Cases

## EC-01: Close with unsaved changes

**Trigger:** User clicks X, Cancel, Escape, or backdrop when `isDirty=true`
**Expected behavior:**
- Open ConfirmationDialogTemplate: "Discard changes?"
- Cancel → return to dialog with unsaved data intact
- Confirm → discard, close dialog, focus returns to trigger (DEC-007)

**DO NOT:** Silently discard unsaved data.
**DO NOT:** Close without confirmation when dirty.

---

## EC-02: Back with partially filled step

**Trigger:** User clicks Back on step 2+ with data entered on current step
**Expected behavior:**
- Current step data is preserved (not cleared)
- User returns to previous step
- If step validation had failed, errors are cleared on back

**Decision:** If consumer needs to reset current step on back, show confirmation before calling `onBack`. Template calls `onBack` after consumer confirms.

---

## EC-03: Submitting state interrupted

**Trigger:** Network drops or timeout while `isSubmitting=true`
**Expected behavior:**
- After timeout → `unknown-outcome` state (DEC-004)
- Do not auto-close
- Show: "We couldn't confirm whether this was saved."
- Offer Close and optional Retry (only if backend confirms retry safety)

**Prototype:** Simulate via mock timer that resolves to `unknown-outcome` after threshold.

---

## EC-04: Backend returns field-specific error

**Trigger:** Submit completes with a backend error tied to a specific field
**Expected behavior:**
- Show field-level error below the affected field
- State remains or returns to `invalid`
- Do not show a generic dialog-level error if the error is field-specific

---

## EC-05: Warning state — continuation allowed

**Trigger:** Backend returns success with warnings
**Expected behavior:**
- Do not auto-advance or auto-close
- Show warning detail clearly
- Require explicit "Acknowledge" or "Continue" action
- User can also choose to cancel/go back

---

## EC-06: Dialog opened while another dialog is active

**Trigger:** ConfirmationDialogTemplate opens from within DialogFlowTemplate (e.g. dirty close)
**Expected behavior:**
- ConfirmationDialog is a separate Modal instance layered above
- DS Modal focus trap handles focus correctly for the topmost dialog
- Closing ConfirmationDialog returns focus to DialogFlowTemplate

---

## EC-07: Stepper DS component incompatibility

**Trigger:** DS Stepper cannot be composed inside Modal header (API or layout constraint)
**Expected behavior:**
- Stop implementation
- Create DS Gap: "Step indicator in modal header"
- Do not create a local inline stepper substitute
- Report gap and await DS resolution

---

## EC-08: Read-only mode attempt to submit

**Trigger:** `dialogState='read-only'` and user somehow triggers submit
**Expected behavior:**
- Submit button is disabled (`isSubmitting=false` but `read-only` disables it)
- No submission occurs
- No error shown — button is simply not clickable

---

## EC-09: Dialog with DEC-016 scope (Add Account)

**Trigger:** Request to build Add Account, Create Account, or Onboard Account as a dialog
**Expected behavior:**
- BLOCK — do not use DialogFlowTemplate
- Apply DEC-016: redirect to FullScreenWizardTemplate
- Report the routing decision in the implementation plan

---

## EC-10: Prototype — simulated operation failure on retry

**Trigger:** User retries after `failed` state
**Expected behavior:**
- State → `submitting`
- Mock: deterministic result (can succeed or fail again based on scenario)
- For demo purposes, retry should succeed on second attempt to demonstrate recovery flow
