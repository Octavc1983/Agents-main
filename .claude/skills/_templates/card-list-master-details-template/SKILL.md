# Card List Master Details Template Skill

## Purpose

Define the workflow for creating or using the `CardListMasterDetailsTemplate` Page Composition Template.

`CardListMasterDetailsTemplate` is a reusable prototype-layer template that assembles existing components into a master-details page where:
- The **left side (30%)** is a vertical list of selectable cards
- The **right side (70%)** is a large details panel

This is **not** a DS component. Do not modify the official Infra library to use it.

---

## How This Differs from TableFiltersTemplate and TableMasterDetails

| Pattern | Left side | Right side | Primary interaction |
|---|---|---|---|
| TableFiltersTemplate | — (no split) | Full-width table | Filter / search |
| TableMasterDetails | Table | Details panel | Row click opens panel |
| **CardListMasterDetailsTemplate** | **Vertical card list** | **Details panel (dominant)** | **Card click selects item** |

Key behavioral difference: in `CardListMasterDetailsTemplate`, the details panel is always visible. The right side is the dominant area. Empty details state shows until a card is selected.

---

## When to Use

Use this skill when:
- The page shows a list of selectable entities as cards on the left
- Selecting a card shows details on the right
- The page layout is a persistent 30 / 70 split — not a table
- The details area needs tabs, sections, or rich content
- The page may start with no item selected (empty details state)

If the left side should be a table, use the **Table Master Details Skill** instead.

If there is no split layout and no details panel, use the **Table Filters Template Skill** instead.

---

## Inputs Required

```text
Page name:             React component name (e.g. PoliciesPage)
Route:                 URL path (e.g. /policies)
Data entity:           Name of the data type (e.g. Policy, Asset, User)
Card fields:           Which fields to show in each card (title, subtitle, status, meta, chips)
Details content:       What to render in the right panel (sections, tabs, metadata grid)
Select first by default: true or false
Searchable fields:     Which data properties to search
Required states:       Default / Loading / Empty / Error / No selection / No results
Primary action:        Primary toolbar button label or 'none'
Known constraints:     e.g. SVG icons only, no new DS components
```

---

## Required User Intake

Minimum required:

```text
Page name
Route
Data entity
Card fields (at minimum: title)
Details content
Required states
```

If Page name, Route, Data entity, or Card fields are missing, ask before continuing.

---

## Template Location

```text
src/prototype-templates/CardListMasterDetailsTemplate/
  CardListMasterDetailsTemplate.tsx        — template component
  CardListMasterDetailsTemplate.scss       — styles (SCSS tokens only)
  CardListMasterDetailsTemplate.types.ts   — TypeScript types
  index.ts                                 — exports
```

The template already exists. Do not recreate it. Import it from this path.

---

## Required Project Inspection

Before creating a page:

1. Read `src/prototype-templates/CardListMasterDetailsTemplate/CardListMasterDetailsTemplate.types.ts` — confirm the props API
2. Read `src/prototype-templates/CardListMasterDetailsTemplate/index.ts` — confirm the export
3. Check `src/types/prototype.types.ts` — check if the data entity type already exists
4. Check `src/mock/` — check if mock data already exists for the entity
5. Check `src/assets/icons/NavIcons.tsx` — confirm which SVG icons are available for cards

---

## Required Workflow

1. Receive page requirements.
2. Inspect the template and existing project files.
3. Create or reuse the TypeScript data entity type.
4. Create mock data in `src/mock/`.
5. Create the page component:
   - Import `CardListMasterDetailsTemplate` from the template
   - Define all `getItem*` functions for card rendering
   - Define the `renderDetails` function for the right panel
   - Pass `selectFirstItemByDefault` based on requirements
   - Pass `isLoading`, `error`, `emptyTitle` for state support
6. Add route and navigation using the Application Shell Navigation Skill.
7. Report what was created.

---

## Page Component Pattern

```tsx
import { CardListMasterDetailsTemplate } from '../../prototype-templates/CardListMasterDetailsTemplate';
import type { EntityType } from '../../types/prototype.types';
import { mockEntities } from '../../mock/entityMockData';
import { Button } from '../../components/ui/Button/Button';

export const EntityPage: React.FC = () => (
  <CardListMasterDetailsTemplate<EntityType>
    title="Entities"
    items={mockEntities}
    getItemId={(item) => item.id}
    getItemTitle={(item) => item.name}
    getItemSubtitle={(item) => item.description}
    getItemStatus={(item) => <StatusBadge status={item.status} />}
    getItemMeta={(item) => <span>{item.createdAt}</span>}
    renderDetails={(item) => (
      <div className="entityDetails">
        <div className="entityDetails__header">
          <h2>{item.name}</h2>
        </div>
        {/* details content */}
      </div>
    )}
    selectFirstItemByDefault={false}
    searchableFields={[(item) => item.name, (item) => item.description]}
    primaryAction={<Button variant="primary" size="sm">Add Entity</Button>}
    emptyTitle="No entities yet"
    isLoading={false}
  />
);
```

---

## Selection Behavior

Two supported modes:

### No default selection (default behavior)
- `selectFirstItemByDefault={false}` (or omitted)
- Details panel shows empty state on load
- User selects a card → details update

### Select first item by default
- `selectFirstItemByDefault={true}`
- First item is selected on mount if items exist
- Details panel is populated immediately

---

## State Control Pattern

All state control is in code only — no visible debug buttons:

```tsx
// Change to test states
isLoading={true}           // loading state
error="Failed to load."    // error state
items={[]}                 // empty list state
```

For no-results state: search for a query that matches nothing.
For no-selection state: ensure `selectFirstItemByDefault={false}` and no item has been clicked.

---

## Details Panel Pattern

The `renderDetails` prop accepts any React content. For pages with tabs, use `HorizontalTabs`:

```tsx
import { HorizontalTabs } from '../../design-system/components/HorizontalTabs/HorizontalTabs';

renderDetails={(item) => {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <div className="entityDetails">
      <div className="entityDetails__header">
        <h2>{item.name}</h2>
      </div>
      <HorizontalTabs
        items={[{ id: 'overview', label: 'Overview' }, { id: 'activity', label: 'Activity' }]}
        activeId={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === 'overview' && <div>...</div>}
    </div>
  );
}}
```

Note: React hooks cannot be used inside a render prop that is not itself a component. Extract `renderDetails` into a named `DetailsPanel` sub-component if tabs or local state are needed.

---

## Must Do

- Import `CardListMasterDetailsTemplate` from `src/prototype-templates/CardListMasterDetailsTemplate`
- Use generic typing: `CardListMasterDetailsTemplate<EntityType>`
- Keep `renderDetails` clean — extract to a named sub-component if it needs hooks
- Use existing SVG icons from `src/assets/icons/NavIcons.tsx`
- Create mock data in `src/mock/`
- Keep state control as code constants — not visible debug buttons

---

## Must Not Do

- Do not recreate the template
- Do not add inline styles to the page or details content
- Do not hardcode visual values
- Do not add icon libraries
- Do not modify the Infra library
- Do not add backend calls
- Do not expose debug state buttons in the visible UI
- Do not assume first-item selection unless explicitly configured via prop

---

## Output Format

```markdown
### Card List Master Details Page Summary — [PAGE NAME]

### Files Created

| File | Description |
|---|---|

### Template Used

CardListMasterDetailsTemplate from src/prototype-templates/CardListMasterDetailsTemplate

### Card Fields Rendered

| Field | Prop Used |
|---|---|

### Details Panel Content

### States Supported

| State | How to Trigger |
|---|---|
| Default (no selection) | selectFirstItemByDefault={false} |
| Default (first selected) | selectFirstItemByDefault={true} |
| Loading | isLoading={true} |
| Error | error="..." |
| Empty list | items={[]} |
| No results | Search with no matches |

### Route Added

### Navigation Added

### Restrictions Followed

- No new DS components created
- No new tokens created
- No inline styles
- No icon libraries
- Template reused (not recreated)
- No visible debug buttons
```

---

## Example Prompt

```
Use the Card List Master Details Template Skill.

Page name: PoliciesPage
Route: /policies
Data entity: Policy
Card fields:
  - Title: policy name
  - Subtitle: policy type
  - Status: active/inactive badge
  - Meta: last modified date
  - Chips: environment tags
Details content:
  - Header: name, status, action buttons
  - Tabs: Overview, Rules, Activity
  - Overview tab: metadata grid (type, owner, created, last run)
Select first by default: false
Searchable fields: name, type, owner
Required states: Default, Loading, Empty, Error, No selection, No results
Primary action: Create Policy
Known constraints: SVG icons only. No new DS components. Use CardListMasterDetailsTemplate.
```
