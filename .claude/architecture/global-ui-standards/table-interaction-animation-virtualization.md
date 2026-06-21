# Table Interaction, Animation, and Virtualization Standard

## Standard ID

`GUS-003`

## Category

`table`

## Status

`active`

---

## 1. Default Table Interaction Pattern

For entity-management pages, the default interaction pattern is **Table + Master Details**.

Selecting an entity opens its details inside the main content experience without resetting:
- applied filters
- search query
- sort
- pagination
- visible result set
- selected navigation item
- page context

The selected item must remain visibly selected in the table.

---

## FATLINES Default Rule

When the target page uses the approved FATLINES pattern, it is the default details behavior for that page type.

```text
Table → user selects row → FATLINES opens → table context preserved → filters and Summary Bar unchanged
```

Claude must not replace FATLINES with a modal, route change, drawer, or unrelated master-details pattern unless explicitly requested.

Before implementation, Claude must detect whether the page already uses FATLINES and preserve that pattern.

---

## 2. Wizard and Form Main Content Replacement

Wizards and full forms replace the **entire main content area**.

```text
AppShell
├── Sidebar  (unchanged)
├── Header   (unchanged)
└── Main content
    └── Wizard or Form (replaces table / split view)
```

When a user opens a Wizard or Form:
- Replace the full main content area
- Keep AppShell, Sidebar, and Header visible
- Do not open it as a right panel by default
- Do not change the selected navigation item
- Do not change the active Space
- Do not reset the route context unless the approved route model requires it

The selected sidebar item must continue to show where the user came from.

### Return Behavior

When the user cancels, completes, or exits a Wizard or Form:
- Return to originating page context
- Preserve active filters, search, sorting, pagination
- Preserve table / FATLINES state where possible
- Preserve selected navigation item

### Unsaved Changes

```text
Detect unsaved changes → show approved discard-changes confirmation → preserve origin context → do not change sidebar selection
```

---

## 3. Animation Standard

Animations must communicate state transitions, not decorate.

Use approved motion tokens only. Do not use custom timing, arbitrary easing, or page-local animation values.

### Table / FATLINES → Wizard or Form

- Main content transitions as one coherent region
- Sidebar remains static
- Header remains static
- Navigation selection remains unchanged
- Do not animate every child element independently
- Do not create a full-screen modal-like transition

### Wizard or Form → Table

- Restore prior page context smoothly
- Preserve scroll position when feasible
- Restore focus to the originating action or relevant updated row

### Reduced Motion

- Respect `prefers-reduced-motion`
- Replace movement with immediate state change or minimal opacity transition

---

## 4. Virtualization Standard

Use virtualization when a table, list, dropdown, or repeated entity surface can contain a large number of items.

Required for:
- large data tables
- table rows
- autocomplete suggestion lists
- tag value dropdowns
- filter value lists
- bulk operation result lists
- review annotation lists
- audit history lists
- activity feeds

Do not render all items at once when the data set may be large.

### Table Virtualization Requirements

- Preserve row selection
- Preserve keyboard navigation
- Preserve aria row semantics where supported
- Preserve scroll position during non-destructive updates
- Do not recycle row state incorrectly (status, selection, action menus)
- Keep pinned headers and Summary Bar stable
- Support loading placeholders that match row layout

### Virtualization and Filters

When filters change:
1. Apply filter state
2. Reset scroll position to top
3. Reset pagination or cursor
4. Load filtered data set
5. Render layout-aware loading rows
6. Preserve only selections still visible in filtered results

Do not keep a selected row open in FATLINES / Master Details if it no longer exists in the filtered dataset.

### Virtualization and Details

When a selected row is virtualized out of view:
- Preserve selected entity state by stable entity ID
- Do not lose open FATLINES / Master Details state because the DOM row was recycled
- Reconnect visual row selection when the entity returns to the visible viewport

---

## 5. Required Claude Checks

Before creating or changing a table, split view, FATLINES, Wizard, or Form:

```text
1. Is Table + Master Details the existing/default page pattern?
2. Does this page use FATLINES?
3. Does the action require a Wizard or full Form?
4. Does the Wizard/Form replace only the Main content?
5. Does the sidebar selection remain tied to the originating page?
6. Are filters, search, sorting, pagination, and selection preserved?
7. Does the page require virtualization?
8. Is selection stable when rows are virtualized?
9. Are transition animations using approved motion tokens?
10. Does reduced-motion behavior exist?
```

---

## 6. QA Blocking Rules

Implementation fails QA when:
- Wizard or Form changes the active sidebar navigation item
- Wizard or Form replaces AppShell, Sidebar, or Header
- Return from Wizard/Form resets filters/search/sort/pagination without product reason
- Existing FATLINES behavior is replaced without approval
- Large repeated lists render without required virtualization
- Virtualization breaks row selection, status, keyboard navigation, or details state
- Filter changes do not reset table scroll position
- Custom animation values replace approved motion tokens
- Reduced-motion behavior is missing

---

## Standard Metadata

```ts
{
  id: 'GUS-003',
  title: 'Table Interaction, Animation, and Virtualization Standard',
  category: 'table',
  appliesTo: ['table page', 'master details', 'split view', 'FATLINES', 'wizard', 'form'],
  status: 'active',
  approvedAt: '2026-06-21',
}
```
