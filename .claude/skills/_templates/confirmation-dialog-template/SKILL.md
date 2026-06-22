# Confirmation Dialog Template Skill

## Purpose

Define the standard pattern for implementing destructive action confirmations using `ConfirmationDialogTemplate`.

---

## When to Use

Use this skill when:
- Adding a delete confirmation
- Adding a disable / deactivate confirmation
- Adding a reset configuration confirmation
- Adding a discard unsaved changes confirmation
- Adding any irreversible-action gate

---

## Inputs Required

```text
Entity name:          What entity is being acted on (e.g. Managed Account)
Action:               Destructive action label (e.g. Delete, Disable, Reset)
Variant:              destructive / warning / reset / discard
Consequence copy:     What happens if confirmed (e.g. "This account will be permanently deleted.")
Confirm label:        Specific action label — MUST name the action (e.g. "Delete account")
Trigger:              What opens the dialog (row action / button / bulk action)
Known constraints:    e.g. SVG icons only, no new DS components
```

Minimum required:
```text
Entity name
Action
Variant
Confirm label
Trigger
```

---

## Required Project Inspection

```text
.claude/architecture/templates/ConfirmationDialogTemplate.md
.claude/skills/_templates/confirmation-dialog-template/template-contract.md
.claude/skills/_templates/confirmation-dialog-template/state-model.md
```

---

## Critical Rules

- `confirmLabel` MUST name the specific action — never "OK", "Yes", "Confirm", "Proceed"
- Focus defaults to Cancel on open — never Confirm
- Closing = Cancel — never triggers the action
- `isConfirming=true` disables both Confirm AND Cancel (DEC-001)
- Use `ConfirmationVariant`: `destructive` / `warning` / `reset` / `discard`

---

## Required Workflow

1. Receive confirmation requirements.
2. Inspect existing ConfirmationDialogTemplate spec.
3. Determine correct variant.
4. Create confirmation dialog component.
5. Wire trigger to open dialog.
6. Wire Cancel to close without action.
7. Wire Confirm to execute destructive action (mock only).
8. Verify focus defaults to Cancel on open.

---

## Must Do

- Use DS Modal size=small
- Use DS Button danger variant for destructive Confirm
- Focus Cancel on open
- Disable both buttons during `isConfirming`
- Show consequence copy clearly above the confirm button

---

## Must Not Do

- Confirm label must not be generic ("Yes", "OK", "Confirm")
- Do not execute action on Cancel
- Do not auto-close after open without user interaction
- Do not add inline styles
- Do not hardcode colors

---

## Output Format

```markdown
### Confirmation Dialog Summary

### Component Name

### Variant

### Confirm Label

### States Supported

### DS Components Used

### Focus Behavior

### Gaps or Manual Review Needed
```
