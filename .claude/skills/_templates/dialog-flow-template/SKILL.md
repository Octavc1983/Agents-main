# Dialog Flow Template Skill

## Purpose

Define the standard pattern for creating dialogs, modals, and confirmation flows in the prototype project.

---

## When to Use

Use this skill when:
- Adding a confirmation dialog
- Adding a create/edit form inside a dialog
- Adding a multi-step dialog flow
- Adding a delete confirmation

---

## Inputs Required

```text
Dialog name:          Name for the dialog component (e.g. DeleteScanDialog)
Trigger:              What opens the dialog (button click / row action / menu item)
Dialog type:          Confirmation / Form / Multi-step / Informational
Form fields:          List of fields if form dialog
Required states:      Default / Loading / Saving / Success / Error
Primary action:       Confirm button label
Cancel behavior:      Close dialog / Navigate back
Known constraints:    e.g. SVG icons only, no new DS components
```

Minimum required:
```text
Dialog name
Trigger
Dialog type
Primary action
Required states
```

---

## Required User Intake

If Dialog name, Trigger, Dialog type, or Primary action is missing, ask before continuing.

---

## Required Project Inspection

```text
src/components/ui/        (existing Dialog/Modal component)
src/design-system/        (DS Dialog component)
src/pages/                (existing dialog usage patterns)
```

---

## Dialog Structure

```
Dialog / Modal (DS component)
  ├── Dialog Header (title + close button)
  ├── Dialog Body
  │    ├── Confirmation message or form fields
  │    └── Warning or informational content
  └── Dialog Footer
       ├── Primary action button
       └── Cancel button
```

---

## Required Workflow

1. Receive dialog requirements.
2. Inspect existing DS Dialog/Modal component.
3. Inspect existing dialog usage patterns.
4. Create dialog component using existing DS Dialog.
5. Add local state for open/close and dialog form state.
6. Wire trigger to open dialog.
7. Wire cancel to close dialog.
8. Wire primary action (prototype-only, no backend).

---

## Must Do

- Use existing DS Dialog/Modal component
- Use SCSS tokens for any custom spacing
- Use SVG icons for close button and action icons
- Handle all required states
- Keep dialog logic prototype-focused

---

## Must Not Do

- Do not create a custom Dialog component if DS Dialog exists
- Do not use inline styles
- Do not hardcode values
- Do not add backend calls

---

## Output Format

```markdown
### Dialog Flow Creation Summary

### Dialog Component

### Trigger Wired

### States Supported

### DS Components Used

### Gaps or Manual Review Needed
```

---

## Example Prompt

```
Use the Dialog Flow Template Skill.

Dialog name: DeleteScanDialog
Trigger: Row action menu "Delete"
Dialog type: Confirmation
Primary action: Delete
Cancel behavior: Close dialog
Required states: Default, Deleting (loading), Success
Known constraints: SVG icons only. No new DS components.
```
