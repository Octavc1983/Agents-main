# Create Table Page

## Purpose

Create a full-width table page with filters, search, and all required states using the existing AppShell and Design System components.

This command creates a simple table page. For a table page with a side details panel, use `/create-master-details`.

---

## Agents to Use

1. Component Mapping Agent
2. Application Shell Navigation Agent
3. Prototype Page Builder Agent
4. State Builder Agent

---

## Skills to Use

```text
.claude/skills/_templates/table-page-template/SKILL.md
.claude/skills/_core/component-mapping/SKILL.md
.claude/skills/_infra/prototype-state-patterns/SKILL.md
.claude/skills/_core/application-shell-navigation/SKILL.md
```

---

## When to Use

Use when:
- Creating a data table page without a side details panel
- The page shows a list, grid, or table of items
- No master-details behavior is required

Use `/create-master-details` if the page needs a side details panel on row click.

---

## Required User Intake

### Required intake fields

```text
Page name:             React component name (e.g. AssetsPage)
Route:                 Route path (e.g. /assets)
Navigation label:      Sidebar label (e.g. Assets) or 'none'
Navigation icon:       SVG icon name or 'none'
Data entity:           Name of the data entity (e.g. Asset, Policy, User)
Columns:               List of table columns
Filters:               List of filter options or 'none'
Search:                Yes / No
Required states:       Default / Loading / Empty / Error
Primary action:        Primary button in the toolbar (e.g. Add Asset) or 'none'
Known constraints:     e.g. SVG icons only, no new DS components
```

### Minimum required fields

```text
Page name
Route
Data entity
Columns
Required states
Known constraints
```

### Missing Information Response

If any minimum required field is missing, stop and respond only with:

```markdown
### Missing Required Information

Before I can run `/create-table-page`, please fill:

\`\`\`text
Page name:      [ReactPageName]
Route:          [/route-path]
Data entity:    [EntityName]
Columns:        [Column 1, Column 2, ...]
Required states: [Default, Loading, Empty, Error]
Known constraints: [e.g. SVG icons only]
\`\`\`
```

Do not create files.
Do not continue until minimum required fields are provided.

---

## Intake Gate

Do not create files.
Do not add routes.
Do not continue until Page name, Route, Data entity, Columns, and Required states are provided.

---

## Required Workflow

1. Inspect existing table page patterns in the project.
2. Run component mapping for a table page.
3. Create the page `.tsx` file with table, filters, search, and all states.
4. Create the page `.scss` file using SCSS tokens.
5. Create mock data TypeScript type and array.
6. Add route and navigation if requested.
7. Report what was created.

---

## Restrictions

- Do not use inline styles
- Do not hardcode visual values
- Do not add icon libraries
- Do not modify the Infra library
- Do not expose debug buttons in visible UI
- Do not create DS components

---

## Expected Output

```markdown
### Create Table Page Summary — [PAGE NAME]

### Files Created

### Table Structure

| Column | Data Property | Notes |
|---|---|---|

### Filters Implemented

### States Implemented

| State | How to Trigger |
|---|---|

### Route Added

### Navigation Added

### Components Used

### Gaps or Manual Review Needed
```
