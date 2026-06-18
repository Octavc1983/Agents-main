# Create Dialog Flow

## Purpose

Add a dialog or modal flow to an existing page — confirmation dialogs, form dialogs, multi-step dialogs.

---

## Agents to Use

1. Component Mapping Agent
2. Prototype Page Builder Agent

---

## Skills to Use

```text
.claude/skills/_templates/dialog-flow-template/SKILL.md
.claude/skills/_core/component-mapping/SKILL.md
```

---

## Required User Intake

### Required intake fields

```text
Dialog name:           Component name (e.g. DeleteScanDialog)
Target page:           Page file where the dialog is triggered (e.g. src/pages/ScansPage/ScansPage.tsx)
Trigger:               What opens the dialog (button / row action / menu item)
Dialog type:           Confirmation / Form / Multi-step / Informational
Form fields:           List of fields if form dialog, or 'none'
Required states:       Default / Saving / Success / Error
Primary action:        Confirm button label (e.g. Delete, Save, Submit)
Cancel behavior:       Close dialog
Known constraints:     e.g. SVG icons only, no new DS components
```

### Minimum required fields

```text
Dialog name
Target page
Trigger
Dialog type
Primary action
Required states
```

### Missing Information Response

If any minimum required field is missing, stop and respond only with:

```markdown
### Missing Required Information

Before I can run `/create-dialog-flow`, please fill:

\`\`\`text
Dialog name:     [DialogComponentName]
Target page:     [src/pages/PageName/PageName.tsx]
Trigger:         [What opens the dialog]
Dialog type:     [Confirmation / Form / Multi-step]
Primary action:  [Button label]
Required states: [Default, Saving, Success, Error]
Known constraints: [e.g. SVG icons only]
\`\`\`
```

Do not read files.
Do not continue until minimum required fields are provided.

---

## Intake Gate

Do not read files.
Do not modify target page.
Do not create dialog component.
Do not continue until Dialog name, Target page, Trigger, Dialog type, and Primary action are provided.

---

## Required Workflow

1. Read the target page file.
2. Find the existing DS Dialog/Modal component.
3. Find existing dialog usage patterns.
4. Create the dialog component using the DS Dialog.
5. Add open/close state to the target page.
6. Wire the trigger to open the dialog.
7. Wire the primary action (prototype-only, no backend).
8. Wire cancel to close.
9. Report what was created.

---

## Restrictions

- Do not create a custom Dialog if DS Dialog exists
- Do not use inline styles
- Do not hardcode values
- Do not add backend calls
- Do not add icon libraries

---

## Expected Output

```markdown
### Dialog Flow Summary — [DIALOG NAME]

### Files Modified

### Dialog Structure

- Type:
- Trigger:
- Primary action:
- Cancel behavior:

### States Implemented

| State | How to Trigger |
|---|---|

### DS Components Used

### Gaps or Manual Review Needed
```
