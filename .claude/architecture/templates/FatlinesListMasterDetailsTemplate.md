# FatlinesListMasterDetailsTemplate

## Status

Approved

## Classification

```text
Type:
Approved Screen Template

Applies to:
- Entity management pages
- Inventory pages
- Accounts and identities pages
- Risk and operational lists
- Pages where users need to scan dense records and inspect one entity in context
```

## Category

Entity Management / FATLINES List / Master Details / Tabbed Details

## Primary User Goal

Allow users to scan dense entity records in a compact list and inspect one entity in full context — without losing their list position, applied filters, search state, or bulk selection.

## Best Use Cases

- Managed Accounts
- Identities and Users
- Risk Findings
- Policies and Rules
- Access and Relationships
- Operational entities that require both browsing and deep inspection

---

## Core Pattern

```text
Persistent Summary Bar
→ FATLINES List (dense row-per-entity)
→ Row click → Master Details opens in main content
```

The list remains the primary context.

Master Details provides deep inspection without replacing the page, changing navigation selection, clearing filters, or losing the user's position.

---

## Required Page Structure

```text
Page
├── Optional page header
├── Persistent Summary Bar
│   ├── Search
│   ├── Filter trigger
│   ├── Applied filter chips
│   ├── Result count
│   ├── Selection summary
│   ├── Bulk actions
│   └── Optional view controls
└── Main content
    ├── FATLINES List
    │   ├── Bulk selection checkbox
    │   ├── 24px status icon
    │   ├── Primary identifiers
    │   ├── Secondary identifiers
    │   ├── Contextual metadata
    │   └── Row actions
    └── Master Details
        ├── Entity header
        ├── Status
        ├── Primary metadata
        ├── Details sections
        ├── Related activity / data
        └── Contextual actions
```

---

## FATLINES List Row — Default Column Order

```text
[Checkbox] | [24px Status Icon] | Account name + address | Platform | Safe | Risk badge | Actions
```

Default row content order:

```text
1. Checkbox for bulk action
2. 24px DS status icon
3. Primary identifier
4. Secondary identifier
5. Supporting metadata
6. Row actions
```

Example:

```text
[Checkbox] [Status] prod-db-admin | admin@production | Oracle | Production Safe | Updated 2 hours ago | Actions
```

---

## FATLINES List Rules

- Checkbox selection does NOT open Master Details
- Status icon is informational only
- Clicking the primary identifier or the row body opens Master Details
- Row actions must not trigger selection or details opening — use `stopPropagation`
- Selected row remains visually active (highlighted) while Master Details is open
- List must support virtualization for large data sets

---

## Master Details Rules

Selecting a FATLINES row opens Master Details in the main content region.

```text
FATLINES List
→ select entity
→ Master Details opens
→ list context remains preserved
```

Preserve:

```text
- search
- filters
- sort
- pagination or cursor
- scroll position where feasible
- bulk selection
- active navigation selection
- selected Space
```

If the selected entity is filtered out, deleted, or becomes unavailable:

```text
- Close Master Details safely.
- Keep the FATLINES list and active filters unchanged.
- Return focus to the list context.
- Show an appropriate unavailable or filtered-out message when relevant.
```

---

## Navigation Rules

Opening Master Details must NOT:

```text
- change the selected sidebar item
- change the active Space
- reset the Summary Bar
- create a new navigation hierarchy state
```

The sidebar continues to indicate the page the user entered from.

---

## Filters and Summary Bar Rules

Filters belong to page context, not the FATLINES List or Master Details panel.

```text
Summary Bar
→ controls list result set
→ same result set drives FATLINES and Master Details
```

When filters change:

```text
- Reset list scroll to top.
- Preserve selection only for entities still visible.
- Close Master Details when selected entity no longer matches.
- Keep filter chips visible in Summary Bar.
- Do not reset unrelated filter groups.
```

Same-key multi-value filters → OR logic
Different filter keys → AND logic

---

## Bulk Action Rules

Bulk actions operate on selected entities from the FATLINES List.

```text
Selected rows
→ Summary Bar selection state
→ Bulk action trigger
→ Bulk dialog or Bulk Status flow
```

Master Details must not replace or clear bulk selection.

---

## Required States

```text
default
loading (skeleton rows)
virtualized loading (skeleton for next page)
initial empty
filtered no-results
backend error
permission denied
row selected (highlighted in list)
master-details open
selected entity unavailable / filtered out
partial data response
bulk selection active
bulk operation in progress
bulk partial success
bulk failure
```

---

## Master Details Tab Structure

Standard tab order (product may add or reorder):

```text
Overview | Details | Activities | Versions | Dependents | Risk findings | Access & relationships
```

Each tab must support:
- Loading state
- Empty state (no data for this tab)
- Error state

---

## Virtualization Rules

Use virtualization by default when the list can contain large data sets.

```text
- Stable entity IDs are required.
- Recycled rows must not display incorrect selection or status.
- Selected entity state must survive row recycling.
- Opening Master Details must not depend on DOM row persistence.
- Scroll position should remain stable for non-destructive updates.
```

---

## Animation Rules

```text
- FATLINES List remains stable.
- Master Details transition is contained inside Main content.
- Sidebar and Header remain static.
- Use approved motion tokens only.
- Respect prefers-reduced-motion.
- Do not animate every row independently.
```

---

## Risk Column Rule

IRON RULE: When a Risk column is present in the FATLINES List, it must use `SeverityBadge severity={row.riskLevel} variant="fill"` only. No other component, badge, dot, or color indicator is permitted. This column must be wired to the Risk Management page aggregation logic.

---

## Status Column Rule

IRON RULE: The status column must use `StatusIcon` at 24px. Same icon mapping must appear in the FATLINES list, Master Details panel header, and any related landing page. See GUS-001.

---

## Required Claude Checks Before Using This Template

```text
1. Is dense entity scanning required?
2. Does the user need to inspect one entity without losing list context?
3. Are filters, search, and bulk actions persistent in the Summary Bar?
4. Is Master Details the correct behavior (not a route, modal, or wizard)?
5. Is virtualization required for the expected data size?
6. Does the existing page already use FATLINES — do not replace it?
7. Does the Risk column exist — if so, wire to Risk Management page?
```

---

## QA Blocking Rules

```text
- Checkbox click opens Master Details
- Status icon is not 24px DS icon
- Different status icon mapping in list vs Master Details
- Risk column uses badge, dot, or text instead of SeverityBadge
- Filters reset when Master Details opens
- Sidebar selection changes when row is selected
- Selected entity is not highlighted in list while details are open
- Virtualization not used for large data sets
- Master Details does not close safely when selected entity is filtered out
```

---

## Template Registry Entry

```ts
{
  id: 'fatlines-list-master-details',
  name: 'FatlinesListMasterDetailsTemplate',
  category: 'entity-management',
  status: 'approved',
  supports: [
    'search',
    'filters',
    'summary-bar',
    'bulk-selection',
    'bulk-actions',
    'virtualization',
    'master-details',
    'tabbed-details',
    'loading',
    'empty',
    'no-results',
    'error',
    'permission',
    'risk-column',
    'status-column',
  ],
  defaultInteraction: 'fatlines-row-click-opens-master-details',
  columnOrder: ['checkbox', 'status', 'primary-identifier', 'metadata', 'risk', 'actions'],
  approvedAt: '2026-06-22',
}
```
