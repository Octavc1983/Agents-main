# Create Master Details

## Purpose

Create or refactor a table-to-master-details page: a full-width table that narrows when the user clicks a row, opening a side details panel.

---

## Agents to Use

1. Component Mapping Agent
2. Application Shell Navigation Agent
3. Prototype Page Builder Agent
4. State Builder Agent

---

## Skills to Use

```text
.claude/skills/_templates/table-master-details-template/SKILL.md
.claude/skills/_core/component-mapping/SKILL.md
.claude/skills/_infra/prototype-state-patterns/SKILL.md
.claude/skills/_core/application-shell-navigation/SKILL.md
```

---

## When to Use

Use when:
- Creating a table page where clicking a row opens a side details panel
- Refactoring an existing table page to add master-details behavior
- The details panel should replace a separate details page

---

## Required User Intake

### Required intake fields

```text
Page name:             React component name (e.g. ScansPage)
Route:                 Route path (e.g. /scans)
Navigation label:      Sidebar label or 'none'
Navigation icon:       SVG icon name or 'none'
Data entity:           Name of the data entity (e.g. Scan, Asset, Policy)
Columns:               List of table columns
Details tabs:          Tabs inside the details panel (e.g. Overview, Findings, Activity)
Details fields:        Key fields shown in the details panel
Required states:       Default / Loading / Empty / Error / Selected row / Details open
Primary action:        Primary toolbar button or 'none'
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

Before I can run `/create-master-details`, please fill:

\`\`\`text
Page name:      [ReactPageName]
Route:          [/route-path]
Data entity:    [EntityName]
Columns:        [Column 1, Column 2, ...]
Details tabs:   [Tab 1, Tab 2, ...] or 'none'
Required states: [Default, Loading, Empty, Error, Selected row, Details open]
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

## Master-Details Pattern Rules

These rules are mandatory:

- `isDetailsOpen` must be explicit `useState(false)` — not derived state
- Details panel is closed by default (page starts in full table view)
- Row click sets `selectedItem` and `setIsDetailsOpen(true)`
- Close button sets `setIsDetailsOpen(false)` and `setSelectedItem(null)`
- Table returns to full width when details is closed
- `viewState` for default/loading/empty/error is a constant in code — not exposed as visible debug buttons
- No custom AppShell, Sidebar, or Header
- SCSS tokens only — no inline styles, no hardcoded values

---

## Required Workflow

1. Inspect existing master-details pages in the project (ScansPage if it exists).
2. Run component mapping.
3. Create the page `.tsx` file following the master-details pattern.
4. Create the page `.scss` file using SCSS tokens and `$details-panel-width`.
5. Create mock TypeScript data type and array.
6. Add route and navigation if requested.
7. Verify `isDetailsOpen` is `useState(false)` — not derived.
8. Verify details panel is closed by default.
9. Report what was created.

---

## Restrictions

- Do not use `useEffect` to sync `isDetailsOpen`
- Do not expose debug state buttons in the visible UI
- Do not use inline styles
- Do not hardcode visual values
- Do not add icon libraries
- Do not replace AppShell, Sidebar, or Header
- Do not modify the Infra library
- Do not create DS components

---

## Expected Output

```markdown
### Master Details Page Summary — [PAGE NAME]

### Files Created

### Master-Details Structure

- Table columns:
- Details panel tabs:
- isDetailsOpen: useState(false) ✓
- Default view: full table ✓
- Row click behavior:
- Close behavior:

### States Implemented

| State | How to Trigger |
|---|---|

### Route Added

### Navigation Added

### Components Used

### Restrictions Verified

- [ ] isDetailsOpen is useState(false)
- [ ] Details closed by default
- [ ] No useEffect syncing isDetailsOpen
- [ ] No debug buttons in visible UI
- [ ] No inline styles
- [ ] AppShell preserved

### Gaps or Manual Review Needed
```
