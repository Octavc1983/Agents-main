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

## Template Boundary

The template does NOT include:

```text
- Application Header
- Global navigation Sidebar
- Space switcher
- Global utility actions
- AppShell layout
```

The template begins inside Main Content:

```text
AppShell
├── Sidebar                        ← outside template
├── Application Header             ← outside template
└── Main Content
    ├── padding: 48px 24px         ← owned by Main Content only
    └── FatlinesListMasterDetailsTemplate
        └── uses available padded area — does not add outer padding
```

---

## FORBIDDEN Layout — Stacked Vertical (Desktop)

**This layout pattern is forbidden on desktop:**

```text
Main Content
├── FATLINES List        ← full-width at top
└── Master Details       ← full-width Card below     ← WRONG
```

Problems with the stacked pattern:
- Details are detached from the selected row context.
- User must scroll away from the list to inspect the selected entity.
- List and Details do not have independent scroll ownership.
- The layout behaves like a stacked Details Page, not Master Details.
- The Details panel incorrectly consumes the entire workspace width.

**Never render Master Details as a full-width Card below the FATLINES list on desktop.**

---

## Required Desktop Layout — Horizontal Split

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Context / Action Bar                                                        │
│ Filter | Search | Result count | Page actions | View controls              │
├──────────────┬──────────────────────────────┬──────────────────────────────┤
│              │                              │                              │
│ Filter Panel │       FATLINES List           │       Master Details         │
│  (optional)  │                              │                              │
│              │       independent scroll      │       fixed header           │
│              │                              │       independent scroll      │
│              │                              │                              │
└──────────────┴──────────────────────────────┴──────────────────────────────┘
```

---

## Required Component Structure

```tsx
<MainContent>
  {/* Main Content owns padding: 48px 24px */}
  <FatlinesMasterDetailsTemplate>
    {/* template adds only internal layout spacing */}
    <ContextActionBar />
    <SplitWorkspace>
      <FilterPanel />          {/* optional, left column */}
      <FatlinesListPane>       {/* owns vertical scroll */}
        <FatlinesList />
      </FatlinesListPane>
      <SplitDivider />
      <MasterDetailsPane>      {/* right column */}
        <MasterDetailsHeader />{/* fixed */}
        <MasterDetailsContent />{/* owns vertical scroll */}
      </MasterDetailsPane>
    </SplitWorkspace>
  </FatlinesMasterDetailsTemplate>
</MainContent>
```

**Do NOT use:**

```tsx
<FatlinesList />
<DetailsCard />    {/* as sibling vertical blocks — FORBIDDEN */}
```

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

## Required Layout Structure

```text
FatlinesListMasterDetailsTemplate
├── Persistent Summary Bar
│   ├── Filter trigger
│   ├── Search
│   ├── Optional saved-view / bookmark control
│   ├── Result count
│   ├── Page-level actions
│   └── View-mode controls
│
└── Split Workspace
    ├── FATLINES List Pane
    │   └── Scrollable FATLINES list
    │
    ├── Resizable Split Divider
    │   └── Drag handle
    │
    └── Master Details Pane
        ├── Details Header
        │   ├── Entity title
        │   ├── Contextual actions
        │   └── Close Details action
        │
        └── Scrollable Details Content
```

---

## Persistent Summary Bar

The Summary Bar belongs to the template and remains above both panes.

It is not part of the List Pane and not part of the Master Details Pane.

```text
Persistent Summary Bar
→ fixed within the template
→ remains visible while List and Details content scroll independently
→ controls the shared list context
```

It owns:

```text
- search query
- applied filters
- filter trigger
- result count
- selection summary
- bulk actions
- optional saved-view controls
- optional view-mode switch
- page-level actions
```

The Summary Bar must remain stable when:

```text
- a list row is selected
- Master Details opens
- Master Details closes
- filters are applied
- search changes
- list scroll position changes
```

---

## Split Workspace

The workspace below the Summary Bar is a horizontal split layout.

```text
┌───────────────────────────┬────────────────────────────────┐
│                           │                                │
│      FATLINES List        │         Master Details         │
│                           │                                │
│      scrollable           │          scrollable            │
│                           │                                │
└───────────────────────────┴────────────────────────────────┘
              ↑
       Resizable divider
```

Rules:

```text
- The List Pane and Master Details Pane are sibling regions.
- Each pane owns its own vertical scrolling.
- The split workspace itself does not own vertical scrolling.
- The Summary Bar remains fixed above both panes.
- The Details Header remains fixed above Details Content.
- Opening details must not reset the list query, filters, sort, selection, pagination, or scroll position.
```

---

## Default Width Behavior

Default composition (from screenshot):

```text
List Pane:    ~47% of available workspace width
Details Pane: ~53% of available workspace width
```

Do not hardcode these values in page CSS. Map to closest approved layout token, grid definition, or split-pane capability.

The divider must allow resizing only when the available Design System or approved application layout primitive supports it. If no approved split-pane primitive exists → create a capability gap rather than implementing a custom local resizer.

---

## Filter Panel Behavior

When filters are expanded, the workspace becomes a three-column layout:

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Context / Action Bar                                                  │
│ Filter | Search | Saved view | Actions | View controls                │
├───────────────┬───────────────────────────┬──────────────────────────┤
│               │                           │                          │
│ Filter Panel  │      FATLINES List         │      Master Details      │
│               │                           │                          │
│ independently │      independently         │      independently       │
│ scrollable    │      scrollable             │      scrollable          │
│               │                           │                          │
└───────────────┴───────────────────────────┴──────────────────────────┘
```

### Filter Panel Anatomy

```text
Filter Panel
├── Panel Header (fixed)
│   ├── Filter title
│   ├── Optional applied-count summary
│   └── Close action
│
├── Filter Content (owns vertical scroll)
│   ├── Filter category groups
│   │   ├── Category label
│   │   ├── Optional search within values
│   │   ├── Checkbox / radio / select controls
│   │   └── Optional expand / collapse control
│   │
│   ├── Loading state
│   ├── Empty state
│   ├── Error state
│   └── Permission state
│
└── Panel Footer (fixed)
    ├── Clear all
    ├── Cancel
    └── Apply filters
```

### Draft and Applied Filter Model

Separate draft from applied:

```ts
type FilterState = {
  draftFilters: FilterGroup[];
  appliedFilters: FilterGroup[];
  isPanelOpen: boolean;
};
```

Behavior:
- User changes values → update draft only
- Apply → draft becomes applied → results update → pagination resets → list scroll returns to top → selected entity revalidated
- Cancel or close without Apply → discard draft → preserve applied → results unchanged

Do not apply filter changes immediately unless an explicit product decision requires live filtering.

### Multi-Select Logic

```text
Multiple values inside one category → OR
Different filter categories           → AND
```

### Applied Filter Summary (chips)

Applied filters must remain visible outside the panel in the Summary Bar using grouped chips:

```text
Environment: Production, Staging
Status: Active
Provider: AWS +3
```

The Filter Panel and chips must always reflect the same applied filter state.

### Filter Panel Modes

```ts
type FilterPanelMode = 'expanded' | 'collapsed';
```

When collapsed: List Pane expands into released width. Master Details retains its split relationship with List Pane.

Do not render the Filter Panel as a modal by default. Do not use a Drawer unless responsive behavior requires it.

### Filter Panel States

```ts
type FilterPanelState =
  | 'collapsed' | 'loading' | 'ready' | 'empty'
  | 'error' | 'permission-denied' | 'applying' | 'applied';
```

---

## Required Page Structure

```text
Page
├── Persistent Summary Bar
│   ├── Search
│   ├── Filter trigger
│   ├── Applied filter chips
│   ├── Result count
│   ├── Selection summary
│   ├── Bulk actions
│   └── Optional view controls
└── Split Workspace
    ├── [Optional] Filter Panel
    ├── FATLINES List Pane
    │   ├── Bulk selection checkbox
    │   ├── 24px StatusIcon (shared)
    │   ├── Primary identifiers
    │   ├── Secondary identifiers
    │   ├── Contextual metadata
    │   └── Row actions
    ├── Resizable Split Divider
    └── Master Details Pane
        ├── Details Header (fixed)
        │   ├── Entity title
        │   ├── Contextual actions
        │   └── Close action
        └── Details Content (scrollable)
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

## Scroll Ownership

```text
Persistent Summary Bar         → fixed
Filter Panel Header            → fixed
Filter Panel Content           → owns vertical scroll
Filter Panel Footer            → fixed
FATLINES List Pane             → owns vertical scroll
Master Details Header          → fixed within Details Pane
Master Details Content         → owns vertical scroll
Split Workspace                → does not own vertical scroll
Full page                      → does not own vertical scroll by default
```

The Filter Panel must never share its scroll container with the FATLINES list or Master Details content.

---

## QA Blocking Rules

```text
- FATLINES List rendered above Master Details as stacked full-width sections on desktop.
- Master Details implemented as a full-width Card below the list on desktop.
- Opening details requires scrolling away from the selected list row.
- Checkbox click opens Master Details.
- Row action interaction opens Master Details.
- StatusIcon is not 24px (shared application primitive).
- Different status icon mapping in list vs Master Details vs Details Header.
- Risk column uses badge, dot, or text instead of SeverityBadge.
- Filters reset when Master Details opens.
- Sidebar selection changes when row is selected.
- Selected entity is not highlighted in list while details are open.
- Virtualization not used for large data sets.
- Master Details does not close safely when selected entity is filtered out.
- AppShell Header or Sidebar included inside the template.
- Summary Bar scrolls with List or Details content.
- List and Details share one vertical scroll container.
- Details Header scrolls away with content.
- Filter Panel Header or Footer scrolls away.
- Split divider implemented as unsupported local resizer.
- Draft filter changes update results before Apply.
- Closing filter panel silently applies draft changes.
- Filter count reflects draft rather than applied filters.
- Filtered-out selected entities remain active in Master Details.
- Template adds outer padding that duplicates Main Content padding (48px 24px).
- Screenshot colors or component styling are copied locally.
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
