# ConfirmationDialogTemplate — QA Checklist

---

## Purpose and Scope

- [ ] Dialog is used for a genuinely consequential action (not safely reversible)
- [ ] Dialog does not substitute for validation
- [ ] Dialog does not contain form fields (if input needed → use DialogFlowTemplate)

---

## DS Compliance

- [ ] Uses DS `Modal` size="small" — no custom dialog primitive
- [ ] Destructive confirm uses `Button variant="danger"` — no local color override
- [ ] Cancel uses `Button variant="text"`
- [ ] No inline styles anywhere
- [ ] No hardcoded hex colors, spacing, or typography
- [ ] SVG icons only

---

## Required Props

- [ ] `confirmLabel` is provided and names the specific action
- [ ] `confirmLabel` is NOT "OK", "Yes", "Confirm", or "Proceed"
- [ ] `consequence` clearly states what will happen and what will be affected
- [ ] `consequence` states whether the action can be undone (when irreversible)

---

## State Coverage

- [ ] `isConfirming=true` disables Confirm AND Cancel (DEC-001)
- [ ] Loading label shown on Confirm button during `isConfirming` (e.g. "Deleting…")
- [ ] Failed state shows error message, re-enables Confirm and Cancel
- [ ] Dialog stays open on failure (does not auto-close)

---

## Close Behavior

- [ ] X button = Cancel (no action)
- [ ] Cancel button = Cancel (no action)
- [ ] Escape = Cancel (DS Modal handles this)
- [ ] Backdrop click = Cancel (unless `isConfirming=true`)
- [ ] Backdrop click blocked while `isConfirming=true`
- [ ] Focus restored to trigger element on cancel (DEC-007)

---

## Accessibility

- [ ] Initial focus on Cancel button (not Confirm)
- [ ] Focus trap active (DS Modal)
- [ ] Confirm button label announced correctly
- [ ] Destructive nature communicated to screen readers (via `role="alertdialog"` when appropriate)

---

## Localization

- [ ] `title`, `consequence`, `confirmLabel`, `cancelLabel` use localization keys
- [ ] No hardcoded English strings in JSX

---

## Dark Mode

- [ ] All colors use semantic DS tokens
- [ ] `Button variant="danger"` uses DS dark theme treatment — no local override
