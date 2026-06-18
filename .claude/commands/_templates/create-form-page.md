# Create Form Page

## Purpose

Create a full-page form for data entry, editing, or settings using the existing AppShell and Design System form components.

---

## Agents to Use

1. Component Mapping Agent
2. Application Shell Navigation Agent
3. Prototype Page Builder Agent
4. State Builder Agent

---

## Skills to Use

```text
.claude/skills/_templates/form-page-template/SKILL.md
.claude/skills/_core/component-mapping/SKILL.md
.claude/skills/_infra/prototype-state-patterns/SKILL.md
.claude/skills/_core/application-shell-navigation/SKILL.md
```

---

## Required User Intake

### Required intake fields

```text
Page name:             React component name (e.g. CreateScanPage)
Route:                 Route path
Form purpose:          Create / Edit / Settings / Wizard
Fields:                List of form fields with type (text, select, checkbox, radio, toggle, textarea)
Required states:       Default / Saving / Success / Validation Error / Backend Error
Primary action:        Submit button label (e.g. Save, Create, Apply)
Cancel behavior:       Navigate back to [route] / close dialog / clear form
Known constraints:     e.g. SVG icons only, no new DS components
```

### Minimum required fields

```text
Page name
Route
Form purpose
Fields
Required states
Primary action
Known constraints
```

### Missing Information Response

If any minimum required field is missing, stop and respond only with:

```markdown
### Missing Required Information

Before I can run `/create-form-page`, please fill:

\`\`\`text
Page name:       [ReactPageName]
Route:           [/route-path]
Form purpose:    [Create / Edit / Settings / Wizard]
Fields:          [Field name (type), ...]
Required states: [Default, Saving, Success, Validation Error, ...]
Primary action:  [Button label]
Known constraints: [e.g. SVG icons only]
\`\`\`
```

Do not create files.
Do not continue until minimum required fields are provided.

---

## Intake Gate

Do not create files.
Do not add routes.
Do not continue until Page name, Route, Form purpose, Fields, and Primary action are provided.

---

## Required Workflow

1. Inspect existing form patterns in the project.
2. Map form fields to DS form components.
3. Create form page `.tsx` with local form state, validation, and all states.
4. Create form page `.scss` using SCSS tokens.
5. Add route and navigation if requested.
6. No backend calls — all state is local prototype logic.
7. Report what was created.

---

## Restrictions

- Do not add backend calls
- Do not add real validation libraries unless already in the project
- Do not use inline styles
- Do not hardcode values
- Do not add icon libraries
- Do not modify the Infra library

---

## Expected Output

```markdown
### Form Page Summary — [PAGE NAME]

### Files Created

### Form Fields

| Field | Type | DS Component | Notes |
|---|---|---|---|

### States Implemented

| State | How to Trigger |
|---|---|

### Route Added

### Gaps or Manual Review Needed
```
