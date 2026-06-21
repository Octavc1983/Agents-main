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

Whenever the UI shows an entity status, lifecycle state, operational state, risk state, health state, or result state, use the approved Design System status icon at **24px**.

---

## Required Pattern

```text
24px DS Status Icon + localized readable status label
```

Implemented via the shared `StatusIcon` component:

```tsx
import { StatusIcon } from '../../components/shared/StatusIcon';

// Icon only
<StatusIcon status={status} size={24} />

// Icon + label
<StatusIcon status={status} size={24} showLabel />
```

---

## Supported Status Values

### Account / Entity Status

| Value | Icon | Color |
|---|---|---|
| `active` | `StatusActiveIcon` | green `#00C898` |
| `inactive` | `StatusInactiveIcon` | gray `#6C6E83` |
| `pending` | `StatusPendingIcon` | gray `#6C6E83` |
| `locked` | `StatusLockedIcon` | red `#F22267` |

### Step / Operation Status

| Value | Icon | Color |
|---|---|---|
| `not_performed` | `StatusPendingIcon` | gray `#6C6E83` |
| `in_progress` | `StatusRunningIcon` | blue `#3E68FF` |
| `done` | `StatusCompletedIcon` | green `#00C898` |
| `failed` | `StatusFailedIcon` | red `#F22267` |

### Additional Available Icons

| Icon | Color | Use for |
|---|---|---|
| `StatusStoppedIcon` | amber `#FFB45D` | stopped / paused |
| `StatusCompletedIcon` | green | success / healthy |
| `StatusFailedIcon` | red | failed / critical / unhealthy |
| `StatusRunningIcon` | blue | running / in progress |
| `StatusPendingIcon` | gray | pending / unknown / not started |

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

- Colored dots as the primary status indicator
- Local one-off SVG icons for status
- Emoji as status indicators
- Color-only status communication (color must be supplemented by shape + label)
- Icon sizes other than 24px (except in space-constrained compact contexts — requires explicit exception)
- Different icon mappings for the same semantic status across page types
- Local icon recoloring
- Generic unrelated icon substitutions
- Text-only pill badges (e.g., colored border + text label only) when icons can be used

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
    'StatusActiveIcon, StatusInactiveIcon, StatusPendingIcon, StatusLockedIcon',
    'StatusRunningIcon, StatusCompletedIcon, StatusFailedIcon, StatusStoppedIcon',
    'All in packages/design-system/src/icons/NavIcons.tsx',
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
