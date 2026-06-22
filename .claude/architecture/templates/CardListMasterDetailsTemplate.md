# CardListMasterDetailsTemplate — Page Composition Template Specification

## Status
Implemented

## Template ID
`card-list-master-details`

## Path
`src/prototype-templates/CardListMasterDetailsTemplate/`

## Primary User Goal
Allow users to browse a scrollable card list and inspect one selected entity in a persistent details panel — without losing list context.

## Presentation Type
Full-screen split view within Main Content. AppShell, Sidebar, and Header remain intact.

## When to Use

```text
- Entity browsing where card format communicates identity better than rows
- User needs to inspect an entity while staying aware of the full list
- List-to-detail navigation without full page replacement
- Use cases: Scans (card mode), Accounts, Resources, Findings with rich visual detail
```

## When NOT to Use

```text
- Dense row data with many columns → use TableFiltersTemplate or FatlinesListMasterDetailsTemplate
- Full entity context requires breadth not available in a panel → use DetailsPageTemplate
- No comparison against list context is needed → use DetailsPageTemplate directly
```

## Layout

```
AppShell
├── Sidebar (unchanged)
├── Application Header (unchanged)
└── Main Content
    └── CardListMasterDetailsTemplate
        ├── Left panel: Card list (30% width, scrollable)
        │   ├── Search / filter controls (optional)
        │   └── Scrollable card list
        │       └── Card (DS) — entity name, status, key metadata
        └── Right panel: Details (70% width, scrollable)
            ├── Entity header (title, StatusIcon, actions)
            ├── Summary metadata
            └── Tabbed detail sections (DS Tabs)
```

## DS Primitives Used

| Component | Source | Notes |
|---|---|---|
| `Card` | `@idira/design-system` | Card list items |
| `Tabs` | `@idira/design-system` | Details panel sections |
| `Button` / `ActionMenu` | `@idira/design-system` | Detail panel actions |
| `EmptyState` | `@idira/design-system` | Empty list and empty selection states |

## Shared Application Primitives

| Component | Source | Notes |
|---|---|---|
| `StatusIcon` | `src/components/shared/StatusIcon/` | Entity status — shared application primitive, not DS export |

## Scroll Ownership

```text
Left card list  → scrolls independently
Right details   → scrolls independently
Neither panel scrolls the page — both are fixed-height regions
```

## States

```text
loading         → skeleton in both panels
list-empty      → EmptyState in left panel, no selection
no-selection    → list visible, right panel shows "Select an item" empty state
selected        → both panels populated
details-loading → list ready, right panel skeleton
details-error   → list ready, right panel error state
```

## Rules

- Card selection state persists when user scrolls the list
- Selecting a new card updates details panel without resetting list scroll position
- `StatusIcon` (shared) at 24px for entity status — not `SeverityBadge`
- `SeverityBadge` only for risk severity classification
- No inline styles
- SVG icons only
- All user-facing copy localized

## Related Skills
`.claude/skills/_templates/card-list-master-details-template/SKILL.md`
