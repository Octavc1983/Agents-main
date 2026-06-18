# Form Page Template Skill

## Purpose

Define the standard pattern for creating a form page in the prototype project.

Covers: create, edit, settings, and wizard-style forms.

---

## When to Use

Use this skill when:
- Creating a form for data entry or editing
- Building a settings page with form fields
- Creating a multi-step wizard flow
- Adding a full-page form (not a dialog form)

---

## Inputs Required

```text
Page name:            React component name (e.g. CreateScanPage)
Route:                Route path
Form purpose:         Create / Edit / Settings / Wizard
Form fields:          List all fields with type (text, select, checkbox, radio, toggle)
Required states:      Default / Loading / Saving / Success / Validation Error / Backend Error
Primary action:       Submit button label (e.g. Save, Create, Apply)
Cancel behavior:      Navigate back / close dialog / clear form
Known constraints:    e.g. SVG icons only, no new DS components
```

Minimum required:
```text
Page name
Route
Form purpose
Form fields
Required states
Primary action
```

---

## Required User Intake

If Page name, Form purpose, Form fields, or Primary action is missing, ask before continuing.

---

## Required Project Inspection

```text
src/pages/                    (existing form page patterns)
src/components/ui/            (form components: Input, Select, Checkbox, etc.)
src/design-system/            (DS form components)
src/styles/_variables.scss    (spacing tokens for form layout)
```

---

## Page Structure

```
AppShell (existing)
  └── Form Page
       ├── Page Header (title + breadcrumb if needed)
       ├── Form Body
       │    ├── Section headers
       │    ├── Form fields (using DS Input, Select, Checkbox, etc.)
       │    └── Validation messages
       └── Form Footer
            ├── Primary action button
            └── Cancel / Back button
```

---

## Required Workflow

1. Receive form requirements.
2. Inspect existing form patterns in the project.
3. Inspect DS form components (Input, Select, Checkbox, Toggle, etc.).
4. Create page `.tsx` with:
   - Local state for form fields
   - Local state for form submit state (idle / saving / success / error)
   - Validation logic (client-side only for prototype)
   - Form field rendering using DS components
5. Create page `.scss` using SCSS tokens for layout.
6. No backend calls. Form submit is prototype-only.

---

## State Pattern

```tsx
type FormState = 'idle' | 'saving' | 'success' | 'error';
const [formState, setFormState] = useState<FormState>('idle');
```

---

## Must Do

- Use existing DS form components (Input, Select, Checkbox, etc.)
- Use SCSS tokens for all spacing and typography
- Use SVG icons only
- Handle all required states
- Keep validation simple and prototype-focused
- No backend calls

---

## Must Not Do

- Do not create custom form input components if DS equivalents exist
- Do not use inline styles
- Do not hardcode values
- Do not add backend integration
- Do not add real validation libraries unless already in the project

---

## Output Format

```markdown
### Form Page Creation Summary

### Files Created

### Form Fields Implemented

| Field Name | Type | DS Component Used | Notes |
|---|---|---|---|

### States Supported

| State | Implemented | How to Trigger |
|---|---|---|

### Gaps or Manual Review Needed

### Next Steps
```

---

## Example Prompt

```
Use the Form Page Template Skill.

Page name: CreateScanPage
Route: /scans/create
Form purpose: Create
Form fields: Name (text), Type (select), Schedule (select), Target (text), Description (textarea)
Required states: Default, Saving, Success, Validation Error, Backend Error
Primary action: Create Scan
Cancel behavior: Navigate back to /scans
Known constraints: SVG icons only. No new DS components.
```
