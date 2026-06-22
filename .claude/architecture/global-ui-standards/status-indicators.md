# Status Indicators

## Standard ID

`GUS-001`

## Category

`status`

## Status

`active`

## Source Decision IDs

`feedback-status-icon-rule` (memory), `ADR-001` (SVG-only icons)

---

## Rule

Whenever the UI shows an entity status, lifecycle state, operational state, risk state, health state, or result state, use the approved Design System status icon at **24×24px, stroke style, no circle background**.

Status icons are bare SVG stroke icons at 24×24px. They must **not** be placed inside a colored circle, pill, or container background.

---

## Required Pattern

```text
24×24px DS Status Icon (stroke, no background container)
```

In table status columns — icon only, no label. The icon communicates status via shape + color.

Implemented via the shared `StatusIcon` component:

```tsx
import { StatusIcon } from '../../components/shared/StatusIcon';

// Icon only (table, card list, status column)
<StatusIcon status={status} size={24} />

// Icon + label (details panel, empty state, form field)
<StatusIcon status={status} size={24} showLabel />
```

---

## Supported Status Values

### Account / Entity Status

| Value | Icon | Visual | Semantic |
|---|---|---|---|
| `active` | `StatusActiveIcon` | Warning triangle amber `#FFB45D` | Active with alert |
| `inactive` | `StatusInactiveIcon` | Error circle red `#F22267` | Inactive / errored |
| `pending` | `StatusPendingIcon` | Three dots gray `#6C6E83` | Pending / unknown |
| `locked` | `StatusLockedIcon` | Padlock white stroke | Locked |
| `marked_for_deletion` | `StatusMarkedForDeletionIcon` | Flag amber `#FFB45D` | Marked for deletion |
| `deleted` | `StatusDeletedIcon` | Trash bin white stroke | Deleted |

### Step / Operation Status

| Value | Icon | Color |
|---|---|---|
| `not_performed` | `StatusPendingIcon` | gray `#6C6E83` |
| `in_progress` | `StatusRunningIcon` | blue `#3E68FF` |
| `done` | `StatusCompletedIcon` | green `#00C898` |
| `failed` | `StatusFailedIcon` | red `#F22267` |

---

## Applies To

- Landing pages
- Dashboard tiles
- Tables (status column)
- Split views and master-details pages
- Cards
- Details panels
- Dialogs and modals
- Bulk operation results
- Status summaries
- Navigation items with status indicators
- Any repeated entity surface showing operational state

---

## Forbidden

- **Circle or pill background behind status icon** — icons are bare strokes, no container fill
- Colored dots as the primary status indicator
- Local one-off SVG icons for status
- Emoji as status indicators
- Color-only status communication (color must be supplemented by shape + label)
- Icon sizes other than 24×24px (except in space-constrained compact contexts — requires explicit exception)
- Different icon mappings for the same semantic status across page types
- Local icon recoloring
- Generic unrelated icon substitutions
- Text-only pill badges (e.g., colored border + text label only) when icons can be used
- Old small-circle status icons (`viewBox="0 0 14 14"` with filled circle background) — these are deprecated

---

## Design System Gap Behavior

When a required status icon does not exist in the Design System:

```text
Create a DS Gap report.
Do not create a local replacement.
Report the gap in the implementation plan.
```

---

## Accessibility Requirements

- Icon must have `aria-hidden="true"` when accompanied by a text label
- When icon is used alone (no label), use `aria-label` with the status value in localized text
- Color must not be the only differentiator — use shape + label

---

## Dark Mode

- All status icon colors are self-contained SVG fills — they do not change with theme
- Do not wrap icons in themed containers that invert or recolor them
- The `status-icon-cell__label` text must use `$color-text-light` token (not hardcoded)

---

## QA Checks

Claude must verify:

1. Is this a real product status?
2. Is the `StatusIcon` shared component used?
3. Is the icon 24px?
4. Is a visible status label present or is the icon accessible without one?
5. Is the same semantic status value mapped to the same icon everywhere on the page?
6. Are there no text-only pill badges for the same status in any related page?

---

## Standard Metadata

```ts
{
  id: 'GUS-001',
  title: 'Status Indicators',
  category: 'status',
  appliesTo: ['table', 'landing page', 'split view', 'card', 'details panel', 'dialog'],
  triggerConditions: [
    'page shows entity status',
    'page shows operational state',
    'page shows lifecycle state',
    'status column in table',
    'status indicator in card',
    'step result state',
  ],
  requiredBehavior: [
    'Use StatusIcon shared component',
    'Use size={24}',
    'Pair icon with localized label',
  ],
  forbiddenBehavior: [
    'colored dot only',
    'text pill only',
    'local SVG icon',
    'inline SVG in page JSX',
    'icon size other than 24px without exception',
  ],
  designSystemRequirements: [
    'Account: StatusActiveIcon, StatusInactiveIcon, StatusPendingIcon, StatusLockedIcon, StatusMarkedForDeletionIcon, StatusDeletedIcon',
    'Step: StatusRunningIcon, StatusCompletedIcon, StatusFailedIcon, StatusStoppedIcon, StatusPendingIcon',
    'All in packages/design-system/src/icons/NavIcons.tsx',
    'All icons are 24×24px stroke style — NO circle background, NO fill container',
  ],
  accessibilityRequirements: [
    'aria-hidden on icon when label present',
    'aria-label on icon when used standalone',
  ],
  qaChecks: [
    'StatusIcon component used',
    'size={24}',
    'label present or accessible aria-label',
    'consistent mapping across page types',
  ],
  status: 'active',
  approvedAt: '2026-06-21',
}
```
