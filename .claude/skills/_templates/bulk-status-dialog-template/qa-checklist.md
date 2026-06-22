# BulkStatusDialogTemplate — QA Checklist

---

## Purpose and Scope

- [ ] Template is used for async multi-entity operations where per-item feedback is needed
- [ ] Not used for single-entity operations
- [ ] Not used for short synchronous operations

---

## DS Compliance

- [ ] Uses DS `Modal` size="large" — no custom overlay
- [ ] Footer actions use DS `Button`
- [ ] `ProgressBar` (DS) used for operation-level progress
- [ ] `StatusIcon` (shared) used for per-item status — NOT `SeverityBadge`
- [ ] No inline styles
- [ ] No hardcoded hex colors or spacing
- [ ] SVG icons only

---

## Large List Limitation

- [ ] Implementation report documents: "Scrollable list only — not virtualized"
- [ ] Implementation report documents: "Safe for ~200 items; large collections may require future virtualization"
- [ ] Does NOT claim virtualization

---

## Close Behavior

- [ ] Close button disabled when `isOperationActive=true` and `canClose=false`
- [ ] Backdrop click blocked when Close is disabled
- [ ] Escape blocked when Close is disabled
- [ ] Minimize always available when `onMinimize` provided
- [ ] Focus restored to trigger element on close (DEC-007)

---

## State Coverage — Operation Level

- [ ] In-progress: ProgressBar status=active, Close disabled
- [ ] Completed all success: ProgressBar status=done, Close enabled, no retry needed
- [ ] Partial success: per-item failures visible, summary counts accurate
- [ ] All failed: ProgressBar status=failed, no global success message
- [ ] Timeout items: status=`unknown` (not `failed`) per DEC-004

---

## State Coverage — Item Level

- [ ] `pending`: queued indicator
- [ ] `in-progress`: spinner or in-progress StatusIcon
- [ ] `succeeded`: success StatusIcon
- [ ] `failed`: failed StatusIcon + reason + retry if `canRetry`
- [ ] `skipped`: localized label
- [ ] `cancelled`: localized label
- [ ] `unknown`: localized label (never "failed") + retry only if safe

---

## Retry Rules

- [ ] Retry button appears ONLY when `canRetry=true`
- [ ] `canRetry` reflects backend contract confirmation of idempotent retry
- [ ] Retry resets failed items to `pending`, not to previous state

---

## Logs and Reports

- [ ] "View logs" appears only when `item.hasLogs=true`
- [ ] "View report" appears only when `item.hasReport=true`
- [ ] Log content contains no secrets, passwords, SSH keys, or stack traces

---

## Accessibility

- [ ] `aria-live` region for operation progress updates
- [ ] StatusIcon has `aria-label` with localized status text
- [ ] Close button label reflects current state

---

## Localization

- [ ] `operationTitle`, `resultLabel`, `reason`, button labels use localization keys
- [ ] No hardcoded English strings

---

## Prototype

- [ ] Mock data in `src/mock/bulkOperationMockData.ts` — typed and centralized
- [ ] All state transitions simulated deterministically
- [ ] At least one mock scenario demonstrates partial success
- [ ] At least one mock scenario demonstrates timeout → unknown
- [ ] Implementation note: "Simulated operation state — mock result — no live backend"
