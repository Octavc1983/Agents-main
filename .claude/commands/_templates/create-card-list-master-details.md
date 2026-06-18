# /create-card-list-master-details

## Purpose

Create a new prototype page that uses `CardListMasterDetailsTemplate` — an existing Page Composition Template with a 30% card list on the left and a 70% details panel on the right.

This command creates a **page** that consumes the template. It does **not** recreate the template itself.

Template location: `src/prototype-templates/CardListMasterDetailsTemplate/`

---

## Required User Intake

Collect these fields from the user before running:

```text
Page name:                  React component name (e.g. PoliciesPage)
Route:                      URL path (e.g. /policies)
Data entity:                Name of the data type (e.g. Policy, Asset, User)
Card fields:                Which fields to render in each card (title, subtitle, status, meta, chips)
Details content:            What to render in the right panel (sections, tabs, metadata grid, actions)
Select first by default:    true or false
Searchable fields:          Which data properties to search (e.g. name, type, owner)
Required states:            Default / Loading / Empty / Error / No selection / No results
Primary action:             Primary toolbar button label, or 'none'
Known constraints:          e.g. SVG icons only, no new DS components
```

---

## Minimum Required Fields

The command cannot run without:

```text
Page name
Route
Data entity
Card fields (minimum: title)
Details content
Required states
```

---

## Missing Information Response

If any minimum required field is missing, respond with this form — do not proceed:

```
### Missing Required Information

Before I can run `/create-card-list-master-details`, please fill in the missing fields.

**Page name:** [required — not provided]
**Route:** [required — not provided]
**Data entity:** [required — not provided]
**Card fields:** [required — not provided]
**Details content:** [required — not provided]
**Required states:** [required — not provided]

**Select first by default:** [optional — defaults to false]
**Searchable fields:** [optional — search will match nothing if not provided]
**Primary action:** [optional — no primary button if not provided]
**Known constraints:** [optional]
```

Fill in only the fields that are actually missing.

---

## Intake Gate

Do not inspect any project files.
Do not create any files.
Do not generate any code.
Do not continue until Page name, Route, Data entity, Card fields, and Details content are all provided.

---

## Required Workflow

### Step 1 — Inspect the template

Read these files before creating the page:

```text
src/prototype-templates/CardListMasterDetailsTemplate/CardListMasterDetailsTemplate.types.ts
src/prototype-templates/CardListMasterDetailsTemplate/index.ts
```

### Step 2 — Inspect existing types and mock data

```text
src/types/prototype.types.ts     — check if the entity type already exists
src/mock/                        — check if mock data already exists for the entity
src/assets/icons/NavIcons.tsx    — confirm which icons are available for cards
```

### Step 3 — Create the data entity type (if not already defined)

Add to `src/types/prototype.types.ts` if the type does not exist.

### Step 4 — Create mock data

Create `src/mock/<entityName>MockData.ts` with representative records.

Include enough variety in the data to:
- Test card title, subtitle, status, meta, and chips rendering
- Test search matching and non-matching
- Represent all status values

### Step 5 — Create the page component

Create `src/pages/<PageName>/<PageName>.tsx`.

Required patterns:
- Import `CardListMasterDetailsTemplate` from `../../prototype-templates/CardListMasterDetailsTemplate`
- Use generic typing: `CardListMasterDetailsTemplate<EntityType>`
- Define `getItemTitle`, `getItemSubtitle`, `getItemStatus`, `getItemMeta`, `getItemChips` based on card fields
- Define `renderDetails` as a named `DetailsPanel` sub-component if it needs local state (e.g. tabs)
- Pass `selectFirstItemByDefault` per requirements
- Pass `isLoading`, `error`, `emptyTitle`, `emptyDescription` for state support
- Pass `primaryAction` using the existing `Button` component if a primary action was specified
- Pass `searchableFields` if searchable fields were specified
- No page-level SCSS file needed unless page-level overrides are required

Important — `renderDetails` and hooks:
If the details panel requires local state (e.g. tab selection), extract it into a named sub-component:

```tsx
const DetailsPanel: React.FC<{ item: EntityType }> = ({ item }) => {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    // tab content here
  );
};

// Then in the template:
renderDetails={(item) => <DetailsPanel item={item} />}
```

State control is implemented as code constants, not visible buttons:
```tsx
const viewState = 'default'; // change to 'loading' | 'error' | 'empty' to test
```

### Step 6 — Wire route and navigation

Follow the Application Shell Navigation Skill to:
- Add the route under the existing AppShell layout route in `src/App.tsx`
- Add the navigation entry with an SVG icon to `src/components/layout/Sidebar/navConfig.ts`

Use an existing SVG icon from `src/assets/icons/NavIcons.tsx`.

### Step 7 — Report

Produce the output report defined in the Output Format section.

---

## Restrictions

- Do not recreate or modify `src/prototype-templates/CardListMasterDetailsTemplate/`
- Do not create new DS components
- Do not create new SCSS tokens
- Do not use inline styles
- Do not hardcode hex colors, spacing values, typography values, radius values, or shadows
- Do not add icon libraries or external UI libraries
- Do not add PNG / JPG / emoji / icon fonts — SVG only
- Do not add backend logic or real API calls
- Do not expose debug state-switching buttons in the visible UI
- Do not assume first-item selection unless `selectFirstItemByDefault={true}` is explicitly configured
- Do not call React hooks inside a render prop — extract to a named sub-component
- Do not modify existing pages, components, or styles not in scope
- Do not perform broad refactors
- Do not modify the AppShell / Sidebar / Header architecture

---

## Output Format

```markdown
### Card List Master Details Page Created — [PAGE NAME]

### Files Created

| File | Purpose |
|---|---|
| src/pages/[PageName]/[PageName].tsx | Page using CardListMasterDetailsTemplate |
| src/mock/[entity]MockData.ts | Mock data for [entity] |
| (src/types/prototype.types.ts updated) | [EntityType] added — or: "type already existed" |

### Template Used

CardListMasterDetailsTemplate — imported from src/prototype-templates/CardListMasterDetailsTemplate

### Layout

30% card list (left) / 70% details panel (right)

### Card Fields Rendered

| Field | Prop | Data Source |
|---|---|---|

### Details Panel Content

### Selection Behavior

selectFirstItemByDefault: [true / false]

### States Supported

| State | How to Trigger |
|---|---|
| Default (no selection) | selectFirstItemByDefault={false} (current) |
| Default (first selected) | selectFirstItemByDefault={true} |
| Loading | isLoading={true} |
| Error | error="Failed to load data." |
| Empty list | items={[]} |
| No results | Search with no matching query |

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
- [ ] renderDetails extracted to sub-component where hooks needed
```

---

## Example Prompt

```
/create-card-list-master-details

Page name: PoliciesPage
Route: /policies
Data entity: Policy
Card fields:
  - Title: policy name
  - Subtitle: policy type
  - Status: active/inactive/pending
  - Meta: last modified date
  - Chips: environment tags (prod, staging, dev)
Details content:
  - Header: name, status badge, Run/Stop actions, more-actions button
  - Tabs: Overview, Rules, Activity
  - Overview tab: metadata grid (type, owner, created, last modified)
  - Rules tab: list of rule names and conditions
  - Activity tab: list of recent events
Select first by default: false
Searchable fields: name, type, owner
Required states: Default (no selection), Loading, Empty list, Error, No results
Primary action: Create Policy
Known constraints: SVG icons only. No new DS components. Use CardListMasterDetailsTemplate.
```

---

## Related

- Skill: `.claude/skills/_templates/card-list-master-details-template/SKILL.md`
- Template: `src/prototype-templates/CardListMasterDetailsTemplate/`
- Navigation: `.claude/skills/_core/application-shell-navigation/SKILL.md`
- Compare with: `.claude/skills/_templates/table-filters-template/SKILL.md` (full-width table, no split)
