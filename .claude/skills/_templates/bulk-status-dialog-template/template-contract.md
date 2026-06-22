# BulkStatusDialogTemplate — Template Contract

## DS Primitives Required

| Component | Package | Verified | Notes |
|---|---|---|---|
| `Modal` | `@idira/design-system` | ✓ | size: large; `isDismissible=false` during active op |
| `Button` | `@idira/design-system` | ✓ | Retry, Check status, Close, Minimize |
| `ProgressBar` | `@idira/design-system` | ✓ | Operation-level progress; status: active/paused/failed/done |

## Shared Application Primitives

| Component | Path | Verified | Notes |
|---|---|---|---|
| `StatusIcon` | `src/components/shared/StatusIcon/` | ✓ | Per-item operational status, 24px, accessible labels |

## StatusIcon Semantic Mapping for Bulk Results

| Item status | Use |
|---|---|
| pending | StatusIcon — pending |
| in-progress | StatusIcon — in_progress |
| succeeded | StatusIcon — completed/active (per domain) |
| failed | StatusIcon — failed |
| skipped | Localized label — no icon (or muted icon if available) |
| cancelled | Localized label |
| unknown | Localized label + StatusIcon warning if available |

**Never use `SeverityBadge` for operation results.**

## Props API

```ts
export type BulkItemStatus =
  | 'pending' | 'in-progress' | 'succeeded'
  | 'failed' | 'skipped' | 'cancelled' | 'unknown';

export interface BulkOperationItem {
  id: string;
  identifier: string;     // entity name/id — truncated with title tooltip
  status: BulkItemStatus;
  resultLabel?: string;   // localized result description
  reason?: string;        // safe reason — no raw backend traces
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
  canClose?: boolean;       // default: !isOperationActive
  canRetry?: boolean;       // only when backend confirms retry is safe
}
```

## Layout Contract

```text
Modal (DS, size: large, non-dismissible when isOperationActive && !canClose)
  ├── Fixed Header
  │   ├── operationTitle
  │   ├── "X of Y completed" count
  │   ├── Minimize button (when onMinimize provided)
  │   └── Close button (disabled when !canClose)
  ├── Summary Strip (fixed, part of header area)
  │   ├── Completed: N | Failed: N | Skipped: N | Pending: N | Unknown: N
  │   └── ProgressBar (DS) — overall operation progress
  ├── Scrollable Result List (overflow-y: auto; @include ds-scrollbar)
  │   └── Per-item row:
  │       ├── Entity identifier (truncated, title tooltip)
  │       ├── 24px StatusIcon
  │       ├── Localized result label
  │       ├── Safe reason (no raw errors)
  │       └── Action buttons: Retry | View logs | View report (conditional)
  └── Fixed Footer
      ├── Left: Retry failed (when canRetry=true)
      ├── Center: Check status (when onCheckStatus provided)
      └── Right: Close
```

## Scroll Ownership
- Header + Summary: fixed
- Result list: `overflow-y: auto; @include ds-scrollbar`
- Footer: fixed

## Large List Limitation

```
Scrollable list only — NOT virtualized.
Safe for ~200 items.
For >200 items: document limitation in implementation report.
Status: Open architecture / capability gap.
```

## Localization Contract
`operationTitle`, `resultLabel`, `reason`, button labels, status labels — all must use localization keys.

## Mock Data Contract
`src/mock/bulkOperationMockData.ts` — typed array of `BulkOperationItem[]`. Simulate transitions: pending → in-progress → succeeded/failed. Deterministic per scenario.
