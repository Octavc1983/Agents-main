# Table Filters Template Skill

## Purpose

Define the workflow for creating or using the `TableFiltersTemplate` Page Composition Template.

`TableFiltersTemplate` is a reusable prototype-layer template that assembles existing Infra / Design System components into a table page with search, filter panel, active filter chips, and item counter.

This is **not** a DS component. Do not modify the official Infra library to use it.

---

## When to Use

Use this skill when:
- Creating a new table page that requires filtering functionality
- The page needs a filter panel with groups, chips, and item counter
- Search + filters + active chips need to work together with local state
- The pattern should be reusable across multiple prototype pages

If the page is a simple table without filters, use the **Table Page Template Skill** instead.

If the page requires a side details panel on row click, use the **Table Master Details Template Skill** — and optionally compose it with this template's toolbar.

---

## Inputs Required

```text
Page name:             React page component name that will use the template (e.g. PoliciesPage)
Route:                 Route path (e.g. /policies)
Data entity:           Name of the data type (e.g. Policy, Asset, User)
Columns:               List of columns with labels
Filter groups:         List of filter groups (label + options + type: single/multi-select)
Searchable fields:     Which data fields to include in search
Required states:       Default / Loading / Empty / Error / No-results
Primary action:        Primary toolbar button label (e.g. Add Policy) or 'none'
Known constraints:     e.g. SVG icons only, no new DS components
```

---

## Required User Intake

Minimum required:

```text
Page name
Route
Data entity
Columns
Required states
```

If Page name, Route, Data entity, or Columns are missing, ask before continuing.

---

## Template Location

```text
src/prototype-templates/TableFiltersTemplate/
  TableFiltersTemplate.tsx        — template component
  TableFiltersTemplate.scss       — styles (SCSS tokens only)
  TableFiltersTemplate.types.ts   — TypeScript types
  index.ts                        — exports
```

The template already exists. Do not recreate it. Import it from this path.

---

## Required Project Inspection

Before creating a page that uses this template:

1. Read `src/prototype-templates/TableFiltersTemplate/TableFiltersTemplate.types.ts` — confirm the props API
2. Read `src/prototype-templates/TableFiltersTemplate/index.ts` — confirm the export
3. Check `src/types/prototype.types.ts` — check if the data entity type already exists
4. Check `src/mock/` — check if mock data already exists for the entity

---

## Required Workflow

1. Receive page requirements.
2. Inspect the template files to confirm the current API.
3. Check if the data entity type already exists in `src/types/prototype.types.ts`.
4. Create or reuse the TypeScript data type.
5. Create mock data for the entity in `src/mock/`.
6. Create the page `.tsx` file:
   - Import `TableFiltersTemplate` from the template
   - Define columns as `TableColumn<EntityType>[]`
   - Define filter groups as `TableFilterGroup[]`
   - Define `searchableFields` functions
   - Pass `isLoading`, `error`, `emptyTitle` for state control
   - Define `primaryAction` using the existing `Button` component
7. No separate SCSS file needed unless page-level overrides are required.
8. Add route and navigation using the Application Shell Navigation Skill.
9. Report what was created.

---

## Page Component Pattern

```tsx
import { TableFiltersTemplate } from '../../prototype-templates/TableFiltersTemplate';
import type { TableColumn, TableFilterGroup } from '../../prototype-templates/TableFiltersTemplate';
import type { EntityType } from '../../types/prototype.types';
import { mockEntities } from '../../mock/entityMockData';
import { Button } from '../../components/ui/Button/Button';

const COLUMNS: TableColumn<EntityType>[] = [
  {
    id: 'name',
    label: 'NAME',
    render: (row) => <span>{row.name}</span>,
    searchableValue: (row) => row.name,
  },
  // ...additional columns
];

const FILTER_GROUPS: TableFilterGroup[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'multi-select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
];

export const EntityPage: React.FC = () => (
  <TableFiltersTemplate
    title="Entities"
    rows={mockEntities}
    columns={COLUMNS}
    getRowId={(row) => row.id}
    searchableFields={[(row) => row.name]}
    filterGroups={FILTER_GROUPS}
    getFilterValue={(row, groupId) => {
      if (groupId === 'status') return row.status;
      return '';
    }}
    primaryAction={<Button variant="primary" size="sm">Add Entity</Button>}
    emptyTitle="No entities yet"
  />
);
```

---

## State Control Pattern

To test different states, pass props to the template:

```tsx
// Change to test loading state
isLoading={true}

// Change to test error state
error="Failed to load data."

// Change to test empty state — pass an empty rows array
rows={[]}
emptyTitle="No policies configured"
emptyDescription="Create a policy to get started."
```

No visible debug buttons. All state control is in code only.

---

## Filtering Logic — How It Works

The template handles all filtering internally:

- `searchableFields` — array of functions that extract text from a row for search matching
- `filterGroups` — defines filter panel sections (label, type, options)
- `getFilterValue` — maps a row to its value(s) for a given filter group
- `appliedFilters` affect the table; `draftFilters` exist only inside the panel until Apply
- Chip removal updates `appliedFilters` immediately
- Clear all resets search and all applied filters

---

## Must Do

- Import `TableFiltersTemplate` from `src/prototype-templates/TableFiltersTemplate`
- Define columns with typed generics: `TableColumn<EntityType>[]`
- Define filter groups with `TableFilterGroup[]`
- Use existing `Button` for primary action
- Use existing entity type or create a new one in `src/types/prototype.types.ts`
- Create mock data in `src/mock/`
- Keep state control as code constants — not visible buttons

---

## Must Not Do

- Do not recreate the template
- Do not add inline styles to the page
- Do not hardcode visual values in the page
- Do not add icon libraries
- Do not modify the Infra library
- Do not add backend calls
- Do not expose debug state buttons in the visible UI

---

## Output Format

```markdown
### Table Filters Page Summary — [PAGE NAME]

### Files Created

| File | Description |
|---|---|

### Template Used

TableFiltersTemplate from src/prototype-templates/TableFiltersTemplate

### Columns Defined

| Column ID | Label | Searchable |
|---|---|---|

### Filter Groups Defined

| Group ID | Label | Type | Options |
|---|---|---|---|

### States Supported

| State | How to Trigger |
|---|---|

### Route Added

### Navigation Added

### Restrictions Followed

- No new DS components created
- No new tokens created
- No inline styles
- No icon libraries
- Template reused (not recreated)
```

---

## Example Prompt

```
Use the Table Filters Template Skill.

Page name: PoliciesPage
Route: /policies
Data entity: Policy
Columns: Name, Type, Status, Owner, Created At, Actions
Filter groups:
  - Status: Active, Inactive, Pending (multi-select)
  - Type: Compliance, Security, Custom (multi-select)
Searchable fields: name, type, owner
Required states: Default, Loading, Empty, Error, No-results
Primary action: Create Policy
Known constraints: SVG icons only. No new DS components. Use TableFiltersTemplate.
```
