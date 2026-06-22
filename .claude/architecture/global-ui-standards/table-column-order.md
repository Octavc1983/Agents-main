# Table Column Order Standard

## Standard ID

`GUS-016`

## Category

`table`

## Status

`active`

## Applies To

- Table pages
- Table + Master Details pages
- FATLINES list tables
- Split views
- Search result tables
- Inventory and management tables

---

## Default Column Order

Unless explicitly stated otherwise, every selectable entity table must use this column order:

```text
1. Bulk selection checkbox
2. Status icon  (24px DS Status Icon — GUS-001)
3. Primary identifier
4. Secondary identifier
5. Contextual metadata
6. Row actions
```

Example:

```text
[☐] | [Status 24px] | Account name | Username | Platform | Safe | Risk | Actions
```

---

## Column 1 — Bulk Selection Checkbox

Reserved for bulk selection when bulk actions are supported.

```text
Header: Select all visible rows
Row:    Select this entity
```

Rules:
- Checkbox column appears before all other data columns
- Checkbox click must NOT trigger row navigation or open FATLINES / Master Details
- Header checkbox selects only visible eligible rows unless product explicitly supports "select all matching"
- Disabled entities must show a disabled checkbox with explanation when relevant
- Selection must persist only for still-visible rows after filtering

If the table does not support bulk actions, the checkbox column may be omitted only with explicit product approval.

---

## Column 2 — Status Icon

The second column is always the status indicator.

```text
[24px approved DS Status Icon]
```

Rules:
- Use `StatusIcon` shared component (`src/components/shared/StatusIcon/`) — GUS-001
- Size is always `24px`
- Do not use local badges, colored dots, emoji, or text-only status
- Include accessible status text (via `showLabel` or `aria-label`)
- The same semantic status icon mapping must appear in table, FATLINES list, landing page, split view, and details panel

---

## Columns 3+ — Identifiers and Metadata

After status, show entity identifiers in priority order:

```text
1. Primary identifier (strongest recognition attribute)
2. Secondary identifier
3. Supporting identifiers / metadata
```

Rules:
- Primary identifier is the row click target when rows open FATLINES or Master Details
- Do not place technical metadata before the primary identifier
- Use readable identifiers before timestamps, risk data, or system-generated IDs
- Long identifiers must truncate with `text-overflow: ellipsis` and accessible full-text tooltip

---

## Risk Column Placement

When a Risk column is present, it appears after the main identifiers, before the row actions column.

IRON RULE: Risk column must use `SeverityBadge severity={row.riskLevel} variant="fill"` only. This column must be wired to Risk Management page aggregation logic.

---

## Row Actions Column

The last column is always row actions (three-dots menu or inline action buttons).

Rules:
- Row actions must not trigger row selection or open FATLINES / Master Details
- Use `event.stopPropagation()` on all action controls within a row
- Use DS `MoreActions` or approved inline action pattern

---

## Row Interaction Rules

```text
Checkbox click        → select/deselect row only
Status icon           → informational only (no navigation)
Primary identifier    → opens FATLINES / Master Details
Row body click        → opens FATLINES / Master Details (same as identifier click)
Row actions click     → opens row action menu only (stops propagation)
```

---

## Required Claude Checks Before Creating a Table

```text
1. Does this table support bulk actions? → Checkbox column first
2. Is the Status column second? → Use 24px StatusIcon (shared — src/components/shared/StatusIcon/ — not a DS package export)
3. Do identifiers begin immediately after status?
4. Is there a Risk column? → SeverityBadge only, wired to Risk Management
5. Are row actions last?
6. Does checkbox click stay independent from row navigation?
```

---

## QA Blocking Rules

```text
- Bulk checkbox appears after status or identifiers
- Status column appears before checkbox in a selectable table
- Status uses local badge, dot, text-only indicator, or non-24px icon
- Primary identifier appears after secondary metadata
- Checkbox click opens row details or navigation
- Risk column uses anything other than SeverityBadge variant="fill"
- Status icon mapping differs between table and FATLINES / split view / details panel
```

---

## Standard Metadata

```ts
{
  id: 'GUS-016',
  title: 'Table Column Order Standard',
  category: 'table',
  appliesTo: ['table page', 'master details', 'FATLINES', 'split view', 'inventory'],
  triggerConditions: [
    'creating a table with selectable rows',
    'adding a status column',
    'adding a risk column',
    'implementing FATLINES list',
  ],
  requiredBehavior: [
    'Checkbox first when bulk actions exist',
    'Status column second (24px StatusIcon)',
    'Primary identifier third',
    'Risk column uses SeverityBadge variant=fill only',
    'Row actions last',
  ],
  forbiddenBehavior: [
    'Checkbox after identifiers',
    'Status after identifiers',
    'Non-24px status icon',
    'Risk column using badge, dot, or text',
    'Checkbox click opening details',
  ],
  status: 'active',
  approvedAt: '2026-06-21',
}
```
