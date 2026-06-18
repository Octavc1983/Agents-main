# Table Page Template Skill

## Purpose

Define the standard pattern for creating a simple table page (without master-details) in the prototype project.

---

## When to Use

Use this skill when:
- Creating a new full-width table page
- The page does not require a side details panel
- The page requires filters, search, and table only

---

## Inputs Required

```text
Page name:            React component name (e.g. AssetsPage)
Route:                Route path (e.g. /assets)
Data type:            Name of the data entity (e.g. Asset, Policy, User)
Columns:              List of table columns
Required states:      Default / Loading / Empty / Error
Required filters:     List of filter options (or 'none')
Required search:      Yes / No
Known constraints:    e.g. SVG icons only, no new DS components
```

Minimum required:
```text
Page name
Route
Data type
Columns
Required states
```

---

## Required User Intake

If Page name, Route, Data type, or Columns are missing, ask for them before continuing.

---

## Required Project Inspection

Before creating the page:

```text
src/pages/                    (existing page implementations for reference)
src/components/ui/            (existing table / filter / search components)
src/design-system/            (DS components)
src/mock/                     (mock data patterns)
src/types/                    (existing type definitions)
src/app/router.tsx            (routing pattern)
src/styles/_variables.scss    (tokens)
```

---

## Page Structure

A standard table page has:

```
AppShell (existing)
  └── Page
       ├── Page Header (title + primary action button)
       ├── Toolbar (filters + search + secondary actions)
       └── Table Section
            ├── Default state: full table
            ├── Loading state: loading indicator
            ├── Empty state: EmptyState component
            └── Error state: ErrorState component
```

---

## Required Workflow

1. Receive page requirements.
2. Inspect existing project pages for reference patterns.
3. Inspect existing table, filter, search, and state components.
4. Define mock data type in TypeScript.
5. Create mock data array.
6. Create page `.tsx` file with:
   - `viewState` constant (default / loading / empty / error)
   - Table rendering with mock data
   - Loading/Empty/Error states using existing DS components
   - Search and filter if required
7. Create page `.scss` file using existing SCSS tokens only.
8. Add route and navigation if requested.
9. Report what was created.

---

## State Pattern

```tsx
// Change this constant to test different states
const viewState: 'default' | 'loading' | 'empty' | 'error' = 'default';
```

States must NOT be exposed as visible debug buttons.

---

## Must Do

- Use existing AppShell (never create a custom shell)
- Use existing table/list component from DS
- Use existing EmptyState, LoadingState, ErrorState from DS
- Use SCSS tokens (no inline styles, no hardcoded values)
- Use SVG icons only
- Add mock TypeScript data
- Keep implementation prototype-focused

---

## Must Not Do

- Do not create a custom layout shell
- Do not add a duplicate Header or Sidebar
- Do not use inline styles
- Do not hardcode hex colors, spacing, or typography
- Do not add icon libraries
- Do not add backend logic
- Do not add real API calls

---

## Output Format

```markdown
### Table Page Creation Summary

### Files Created

### Components Used

### Mock Data

### States Supported

| State | Implemented | How to Trigger |
|---|---|---|

### Tokens Used

### Gaps or Manual Review Needed

### Next Steps
```

---

## Example Prompt

```
Use the Table Page Template Skill.

Page name: AssetsPage
Route: /assets
Data type: Asset
Columns: Name, Type, Status, Owner, Last Updated, Actions
Required states: Default, Loading, Empty, Error
Required filters: Type, Status
Required search: Yes
Known constraints: SVG icons only. No new DS components.
```
