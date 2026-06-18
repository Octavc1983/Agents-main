# /create-table-filters-template

## Purpose

Create a new prototype page that uses `TableFiltersTemplate` — an existing Page Composition Template that assembles search, filter panel, active filter chips, item counter, and table into a single reusable layout.

This command creates a **page** that consumes the template. It does **not** recreate the template itself.

Template location: `src/prototype-templates/TableFiltersTemplate/`

---

## Required User Intake

Before running, collect these fields from the user:

```text
Page name:             React component name for the new page (e.g. PoliciesPage)
Route:                 URL path (e.g. /policies)
Data entity:           Name of the data type (e.g. Policy, Asset, User)
Columns:               List of column IDs and labels
Filter groups:         List of filter groups: label, type (single/multi-select), options
Searchable fields:     Which data properties to search across
Required states:       Which states to support: Default / Loading / Empty / Error / No-results
Primary action:        Label for the primary CTA button, or 'none'
Known constraints:     e.g. SVG icons only, no new DS components
```

---

## Minimum Required Fields

The following fields are mandatory. The command cannot run without them:

```text
Page name
Route
Data entity
Columns
Required states
```

---

## Missing Information Response

If any minimum required field is missing, respond with this form — do not proceed:

```
### Missing Required Information

Before I can run `/create-table-filters-template`, please fill in the missing fields.

**Page name:** [required — not provided]
**Route:** [required — not provided]
**Data entity:** [required — not provided]
**Columns:** [required — not provided]
**Required states:** [required — not provided]

**Filter groups:** [optional — if not provided, filter panel will be omitted]
**Searchable fields:** [optional — if not provided, search will not match any fields]
**Primary action:** [optional — if not provided, no primary button will be rendered]
**Known constraints:** [optional]
```

Fill in only the fields that are actually missing. If a field was provided, do not list it.

---

## Intake Gate

Do not inspect any project files.
Do not create any files.
Do not generate any code.
Do not continue until Page name, Route, Data entity, and Columns are all provided.

---

## Required Workflow

### Step 1 — Inspect the template

Before creating the page, read these files to confirm the current API:

```text
src/prototype-templates/TableFiltersTemplate/TableFiltersTemplate.types.ts
src/prototype-templates/TableFiltersTemplate/index.ts
```

### Step 2 — Inspect existing types and mock data

```text
src/types/prototype.types.ts         — check if the entity type already exists
src/mock/                            — check if mock data already exists for the entity
```

### Step 3 — Create the data entity type (if not already defined)

If the entity type does not exist, add it to `src/types/prototype.types.ts`.

### Step 4 — Create mock data

Create `src/mock/<entityName>MockData.ts` with representative mock records.

Use realistic-looking data with variety across the filter values — enough to verify filtering works.
Include records that represent every filter option so all states can be tested.

### Step 5 — Create the page component

Create `src/pages/<PageName>/<PageName>.tsx`.

Required patterns:
- Import `TableFiltersTemplate` from `../../prototype-templates/TableFiltersTemplate`
- Import `TableColumn`, `TableFilterGroup` types from the same path
- Define `COLUMNS` as `TableColumn<EntityType>[]` — module-level constant
- Define `FILTER_GROUPS` as `TableFilterGroup[]` — module-level constant (omit if no filter groups provided)
- Pass all required props: `title`, `rows`, `columns`, `getRowId`
- Pass `searchableFields` if searchable fields were specified
- Pass `filterGroups` and `getFilterValue` if filter groups were specified
- Pass `primaryAction` using the existing `Button` component if a primary action was specified
- Pass `isLoading`, `error`, `emptyTitle`, `emptyDescription` for state support
- No page-level SCSS file needed unless overrides are required

State control is implemented as code constants, not visible buttons:
```tsx
const viewState = 'default'; // change to 'loading' | 'error' | 'empty' to test
```

### Step 6 — Wire route and navigation

Follow the Application Shell Navigation Skill to:
- Add the page route under the existing AppShell layout route in `src/App.tsx`
- Add the navigation entry with an SVG icon to `src/components/layout/Sidebar/navConfig.ts`

Use an existing SVG icon from `src/assets/icons/NavIcons.tsx`. Do not add new icons unless explicitly requested.

### Step 7 — Report

Produce the output report defined in the Output Format section below.

---

## Restrictions

- Do not recreate or modify `src/prototype-templates/TableFiltersTemplate/`
- Do not create new DS components
- Do not create new SCSS tokens
- Do not use inline styles
- Do not hardcode hex colors, spacing values, typography values, radius values, or shadow values
- Do not add icon libraries or external UI libraries
- Do not add PNG / JPG / emoji / icon fonts — SVG only
- Do not add backend logic or real API calls
- Do not expose debug state-switching buttons in the visible UI
- Do not modify existing pages, components, or styles that are not in scope
- Do not perform broad refactors
- Do not modify the AppShell / Sidebar / Header architecture

---

## Output Format

```markdown
### Table Filters Page Created — [PAGE NAME]

### Files Created

| File | Purpose |
|---|---|
| src/pages/[PageName]/[PageName].tsx | Page component using TableFiltersTemplate |
| src/mock/[entity]MockData.ts | Mock data for [entity] |
| (src/types/prototype.types.ts updated) | [EntityType] type added — or: "type already existed" |

### Template Used

TableFiltersTemplate — imported from src/prototype-templates/TableFiltersTemplate

### Columns

| Column ID | Label | Searchable |
|---|---|---|

### Filter Groups

| Group ID | Label | Type | Options |
|---|---|---|---|

### States Supported

| State | How to Trigger |
|---|---|
| Default | viewState = 'default' (current) |
| Loading | isLoading={true} |
| Error | error="Failed to load data." |
| Empty | rows={[]} |
| No results | Apply filters that match no rows |

### Route Added

`/[route]` → [PageName]

### Navigation Added

[Nav label] — [Icon name] icon

### Restrictions Followed

- [ ] Template reused — not recreated
- [ ] No new DS components created
- [ ] No new tokens created
- [ ] No inline styles
- [ ] No icon libraries
- [ ] State control is code-only (no visible debug buttons)
- [ ] SVG icons only
```

---

## Example Prompt

```
/create-table-filters-template

Page name: PoliciesPage
Route: /policies
Data entity: Policy
Columns:
  - name: Name
  - type: Type
  - status: Status
  - owner: Owner
  - createdAt: Created At
  - actions: (row actions)
Filter groups:
  - Status: Active, Inactive, Pending (multi-select)
  - Type: Compliance, Security, Custom (multi-select)
Searchable fields: name, type, owner
Required states: Default, Loading, Empty, Error, No-results
Primary action: Create Policy
Known constraints: SVG icons only. No new DS components. Use TableFiltersTemplate.
```

---

## Related

- Skill: `.claude/skills/_templates/table-filters-template/SKILL.md`
- Template: `src/prototype-templates/TableFiltersTemplate/`
- Navigation: `.claude/skills/_core/application-shell-navigation/SKILL.md`
- Agent: `.claude/agents/_core/application-shell-navigation-agent.md`
