# Loading and Skeletons Standard

## Standard ID

`GUS-004`

## Category

`loading`

## Status

`active`

---

## Rule

Every page, table, list, card, and details panel must have a defined loading state using layout-aware skeleton patterns — not generic spinners or blank screens.

---

## Required Pattern

Use the `skeleton-loading-intelligence` skill and `skeleton-loading-intelligence-agent` to generate loading states.

Skeleton shapes must match the real UI region layout:
- Table → skeleton rows with column widths matching real columns
- Card list → skeleton card shapes
- Details panel → skeleton field/label layout
- Dashboard tiles → skeleton tile shapes

---

## Applies To

- Tables (initial load, filter apply, page change)
- Details panels (row click, details load)
- Cards and tile grids
- Form pages (field population)
- Dashboards (chart and KPI loading)
- Any area that fetches remote data

---

## Forbidden

- Generic centered spinner as the only loading state
- Blank page during data fetch
- Showing stale data without a loading indicator during refresh
- Layout shift when skeleton transitions to real content
- Skeleton shapes that do not match the real content layout

---

## Dark Mode

Use DS semantic token colors for skeleton backgrounds and shimmer. Do not hardcode shimmer colors.

---

## QA Checks

1. Does every remote-data area have a loading state?
2. Does the skeleton shape match the real content layout?
3. Is there layout shift between skeleton and real content?
4. Does the loading state use DS tokens only?

---

## Standard Metadata

```ts
{ id: 'GUS-004', title: 'Loading and Skeletons', category: 'loading', status: 'active', approvedAt: '2026-06-21' }
```
