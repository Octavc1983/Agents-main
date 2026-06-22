# TableMasterDetailsTemplate — Page Composition Template Specification

## Status
Approved (not yet implemented separately — built by combining TableFiltersTemplate with details panel logic at page level)

## Template ID
`table-master-details`

## Path
Not yet a standalone implementation. Composed from `TableFiltersTemplate` + details panel pattern.

## Primary User Goal
Allow users to browse tabular entity data and inspect a selected row in a persistent details panel — without losing table context, active filters, or scroll position.

## Presentation Type
Full-screen split view within Main Content. AppShell, Sidebar, and Header remain intact.

## When to Use

```text
- Table browsing where selected-row detail panel adds significant value
- User needs to reference the list while inspecting an entity
- Use cases: Scans (table mode with details), Accounts, Findings, Rules, Policies
```

## When NOT to Use

```text
- Full entity context requires breadth — use DetailsPageTemplate
- Dense rows with complex selection patterns — use FatlinesListMasterDetailsTemplate
- Card-format entity browsing — use CardListMasterDetailsTemplate
```

## Layout

```
AppShell
├── Sidebar (unchanged)
├── Application Header (unchanged)
└── Main Content
    └── TableMasterDetailsTemplate
        ├── Top: Full-width table with toolbar (filters, search, actions)
        │   └── TableFiltersTemplate pattern
        └── Bottom: Details panel (slides up on row click, or side panel)
            ├── Entity header (title, StatusIcon, actions)
            └── Tabbed detail sections (DS Tabs)
```

## DS Primitives Used

| Component | Source | Notes |
|---|---|---|
| `Tabs` | `@idira/design-system` | Details panel sections |
| `Button` / `ActionMenu` | `@idira/design-system` | Table and detail actions |
| `EmptyState` | `@idira/design-system` | Empty states |

## Shared Application Primitives

| Component | Source | Notes |
|---|---|---|
| `StatusIcon` | `src/components/shared/StatusIcon/` | Entity status — shared application primitive, not DS export |

## Scroll Ownership

```text
Table region  → scrolls independently
Details panel → scrolls independently
Page itself   → does not scroll
```

## States

```text
loading             → skeleton in table
table-empty         → EmptyState in table area
no-selection        → table shown, no details panel
selected            → table + details panel both visible
details-loading     → table ready, details panel skeleton
details-error       → table ready, details panel error state
```

## Relationship to TableFiltersTemplate

TableMasterDetailsTemplate is a composition:
- **Table layer** → identical to `TableFiltersTemplate` (toolbar, filters, search, sort, pagination, row actions, bulk)
- **Details layer** → adds a persistent details panel triggered by row click

A consumer page uses both patterns together. There is no separate standalone component file.

## Context Preservation

When details panel opens:
- Table scroll position preserved
- Active filters preserved
- Active search preserved
- Selected row highlighted

When details panel closes (X):
- Returns to table view
- Selected row highlight removed
- All table state preserved

## Rules

- Row click opens details panel — does not navigate to a new page
- X button in details panel closes it, returns to table-only view
- `StatusIcon` (shared) at 24px — not `SeverityBadge`
- `SeverityBadge` for risk severity classification only
- No inline styles
- SVG icons only

## Related Skills
`.claude/skills/_templates/table-master-details-template/SKILL.md`
