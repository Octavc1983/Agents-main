# ConfirmationDialogTemplate — Edge Cases

## EC-01: Stacked dialogs (confirmation on top of DialogFlow)

**Trigger:** User closes a dirty DialogFlowTemplate — ConfirmationDialogTemplate opens on top
**Expected behavior:**
- ConfirmationDialog is a new Modal instance above DialogFlow
- DS Modal focus trap handles the topmost dialog
- Cancel on confirmation: ConfirmationDialog closes, focus returns to DialogFlow
- Confirm on confirmation: both dialogs close, focus returns to original trigger

---

## EC-02: Confirming while `isConfirming` already true

**Trigger:** User clicks Confirm twice rapidly
**Expected behavior:**
- Second click has no effect — button is disabled immediately on first click (DEC-001)
- No duplicate API call is triggered

---

## EC-03: Action fails after confirmation

**Trigger:** `onConfirm` callback results in a backend error
**Expected behavior:**
- `isConfirming` → `false`
- Error message shown in dialog body (below consequence text)
- Confirm re-enabled for retry
- Cancel re-enabled
- Dialog stays open

---

## EC-04: Confirmation for bulk destructive action with large impacted list

**Trigger:** Bulk delete of 500+ entities — `impactedItems` is too long to display
**Expected behavior:**
- Do not render all 500 items in the modal body
- Show count: "500 accounts will be permanently deleted."
- If showing a sample, show first 3–5 with "+X more" label
- Body scrolls if list overflows (`@include ds-scrollbar`)

---

## EC-05: Non-destructive confirmation misuse

**Trigger:** Consumer tries to use ConfirmationDialogTemplate for a non-consequential action
**Expected behavior:**
- Flag: if action can be safely undone, a ConfirmationDialog is not needed
- Recommend inline cancel/undo pattern instead
- Only use ConfirmationDialog for genuinely consequential actions

---

## EC-06: Generic labels

**Trigger:** Consumer passes `confirmLabel="OK"` or `confirmLabel="Yes"`
**Expected behavior:**
- Block at implementation review (QA checklist item)
- Require action-specific label
- Fail QA check until corrected

---

## EC-07: Backdrop click while confirming

**Trigger:** User clicks backdrop while `isConfirming=true`
**Expected behavior:**
- No action taken — `closeOnBackdropClick=false` during confirming state
- Dialog remains open

---

## EC-08: Read-only page tries to trigger destructive action

**Trigger:** Confirmation triggered from a `read-only` page state
**Expected behavior:**
- The triggering action button should be disabled on the page — ConfirmationDialog should not even open
- If somehow opened, Confirm should do nothing and close
- Prevent: never execute destructive actions when source context is read-only
