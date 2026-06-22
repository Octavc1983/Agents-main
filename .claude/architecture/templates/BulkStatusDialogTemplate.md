# BulkStatusDialogTemplate — Page Composition Template Specification

## Status
Approved with limitation

## Approval Conditions
- `Modal` (DS) is available ✓
- `Button` (DS) is available ✓
- `ProgressBar` (DS) is available — status: active/paused/failed/done ✓
- `StatusIcon` (shared) is available at `src/components/shared/StatusIcon/` ✓
- Virtualization: **NOT available** — CSS scrollable list only (see Known Limitations)

## Template ID
`bulk-status-dialog`

## Path
`src/prototype-templates/BulkStatusDialogTemplate/` *(not yet implemented — Approved with limitation)*

## Primary User Goal
Give users persistent, item-level visibility into the progress and outcome of an asynchronous operation that affects multiple entities — and provide actions to retry, check status, view logs, or close when appropriate.

## Presentation Type
Modal overlay (large size, non-dismissible during active operation). AppShell, Sidebar, Header, and Main Content remain intact.

## When to Use

```text
- Bulk tag update
- Bulk account onboarding
- Bulk rotation
- Bulk export
- Bulk remediation
- Migration sub-operation results
- Any async operation affecting 2+ entities where per-item outcome matters
```

## When NOT to Use

```text
- Single-entity operation → use loading state inline or in DetailsPage
- Short synchronous operations → use inline success/error toast or inline state
- Operations where item-level feedback is not required
```

## Layout

```
AppShell (intact beneath backdrop)
└── Modal backdrop (DS Modal portal to document.body)
    └── Modal (DS) — size: large
        ├── Fixed Header
        │   ├── Operation title
        │   ├── Item count ("X of Y completed")
        │   ├── Minimize control (available during active operation)
        │   └── Close button (disabled while operation is active and close would hide the only visible state)
        ├── Summary Strip
        │   ├── Completed count (DS ProgressBar or count badges)
        │   ├── Failed count
        │   ├── Skipped count
        │   ├── Pending count
        │   └── Unknown count
        ├── Scrollable Result List (owns vertical scroll)
        │   └── Per-item row:
        │       ├── Entity identifier (truncated with title tooltip)
        │       ├── 24px StatusIcon (from shared StatusIcon component)
        │       ├── Localized result label
        │       ├── Safe reason (no raw backend traces)
        │       └── Actions: Retry | View logs | View report (when supported)
        └── Fixed Footer
            ├── Left: Retry failed (visible only when retry is safe per backend contract)
            ├── Center: Check status (for long-running operations)
            └── Right: Close (enabled when operation is complete or user explicitly dismisses)
```

## DS Primitives Used

| Primitive | Source | Verified |
|---|---|---|
| `Modal` | `@idira/design-system` | ✓ size: large; non-dismissible option |
| `Button` | `@idira/design-system` | ✓ |
| `ProgressBar` | `@idira/design-system` | ✓ status: active/paused/failed/done; value/max props |

## Shared Application Primitives Used

| Primitive | Source | Verified |
|---|---|---|
| `StatusIcon` | `src/components/shared/StatusIcon/` | ✓ Use for operational status (pending, in-progress, succeeded, failed, skipped, unknown) |

## StatusIcon — Required Semantic Mapping

Use `StatusIcon` (shared) for all operational result states:

| Result | StatusIcon semantic |
|---|---|
| pending | pending |
| in-progress | in_progress |
| succeeded | completed or active (per domain mapping) |
| failed | failed |
| skipped | — (use localized label, no icon or muted icon) |
| cancelled | — (use localized label) |
| unknown | — (use localized label + warning icon if available) |

Do NOT use `SeverityBadge` for operation results. `SeverityBadge` is for risk severity only (Critical/High/Medium/Low/Informational).

## Known Limitations

### Large List Performance

```
Current implementation: Scrollable list only (overflow-y: auto + @include ds-scrollbar).
This is NOT virtualization.

For collections up to ~200 items: scrollable list is acceptable.
For collections above ~200 items: performance may degrade.

Large result sets require virtualization support.
No approved virtualization library is currently available in this project.

Status: Open architecture / capability gap.
```

**Do not claim virtualization is implemented.** If a use case requires >200 items, document this limitation in the implementation report.

## Open DS Gaps

None for core functionality. Large-list virtualization is an open capability gap, not a DS Gap.

## Prototype Note

This is a UX prototype. All bulk operations must be simulated with mock data:

```text
- Simulate operation state: pending → in-progress → succeeded/failed/partial
- Use deterministic mock timer to transition states
- Each mock item can have an independently simulated outcome
- Retry must update mock item state (failed → pending → succeeded/failed)
- No real API calls, no real file downloads, no real log access
```

Prototype wording in implementation: "Simulated operation state — mock result — no live backend."

## Required Item Statuses

```ts
export type BulkItemStatus =
  | 'pending'
  | 'in-progress'
  | 'succeeded'
  | 'failed'
  | 'skipped'
  | 'cancelled'
  | 'unknown';
```

## Types

```ts
export interface BulkOperationItem {
  id: string;
  identifier: string;
  status: BulkItemStatus;
  resultLabel?: string;
  reason?: string;
  canRetry?: boolean;
  hasLogs?: boolean;
  hasReport?: boolean;
}

export interface BulkStatusDialogTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onRetryFailed?: () => void;
  onCheckStatus?: () => void;
  operationTitle: string;
  items: readonly BulkOperationItem[];
  isOperationActive: boolean;
  canClose?: boolean;
  canRetry?: boolean;
  children?: React.ReactNode;
}
```

## Close Behavior

```text
isOperationActive=true AND canClose=false → Close button disabled
isOperationActive=true AND canClose=true  → Close button enabled (user has explicitly dismissed)
isOperationActive=false                   → Close button always enabled
```

Minimize is always available when `onMinimize` is provided — even during active operations.

## Retry Rules

- Retry button appears only when `canRetry=true`
- `canRetry` must reflect backend contract confirmation that retry is safe
- Do not show Retry unless backend guarantees idempotent retry behavior
- In prototype: simulate retry via mock state reset

## Partial Success

Partial success (some succeeded, some failed) is not generic success. Do not show a global success state when any item failed. Show:
- Summary strip with distinct counts per status
- Per-item status rows for failed items
- Retry for failed items if retry is safe

## Timeout

Timeout → `unknown` status for that item. Not `failed`. (DEC-004)
Do not auto-retry on timeout.

## Logs and Reports

- Show "View logs" link only when backend has log artifacts available
- Show "View report" link only when backend has generated a report
- In prototype: simulate log/report availability as a mock prop

## Scroll Ownership

```text
Modal header   → fixed
Summary strip  → fixed (part of header area)
Result list    → owns vertical scroll (overflow-y: auto; @include ds-scrollbar)
Modal footer   → fixed
```

## Accessibility

- Focus trap within modal ✓
- Close button labeled with current state context (e.g. "Close — operation in progress" vs "Close") ✓
- All status changes announced via `aria-live` region ✓
- StatusIcon has `aria-label` with localized status text ✓

## Tokens Used

```text
$color-dialog-bg, $color-dialog-separator, $color-dialog-text
$color-status-success, $color-status-warning, $color-status-error
$spacing-*, $font-size-*, $font-weight-*, $border-radius-*
@include ds-scrollbar
@include text-truncate (for entity identifiers)
```

## Rules

- Use DS `Modal` size="large" — do not create a custom overlay
- `StatusIcon` for operational results, never `SeverityBadge`
- Do not show Retry unless backend contract confirms retry safety
- Do not show Logs/Reports unless artifacts exist
- Partial success ≠ success
- Timeout = unknown, not failed
- SVG icons only
- No inline styles

## Related Decisions
- DEC-001 — Disable duplicate submission
- DEC-004 — Timeout = unknown-outcome
- DEC-006 — Mock data centralized and typed
- DEC-007 — Focus restoration
