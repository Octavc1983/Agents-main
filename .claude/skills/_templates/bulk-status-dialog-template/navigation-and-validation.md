# BulkStatusDialogTemplate — Navigation and Validation

## Close Behavior

| Condition | Close available? |
|---|---|
| `isOperationActive=true` and `canClose=false` | No — Close button disabled |
| `isOperationActive=true` and `canClose=true` | Yes — user has explicitly dismissed |
| `isOperationActive=false` | Yes — always |

When Close is disabled:
- X button: disabled
- Backdrop click: blocked
- Escape: blocked

The user must always have Minimize available as an alternative to Close during active operations.

## Minimize Behavior

Minimize is always available when `onMinimize` is provided — even during active operations.
Minimize collapses the dialog but does NOT stop the operation.
The operation continues in the background.
User can re-open to check progress.

**Prototype:** Simulate minimize with a minimized indicator in the page footer or a floating status badge.

## Retry Rules

`canRetry` controls the Retry Failed button:
- `canRetry=true`: Retry button visible in footer; retry icon available per-item
- `canRetry=false` (default): No retry UI shown

**Critical:** `canRetry` must reflect backend contract confirmation that retry is idempotent.
Do not show Retry unless explicitly safe.

Retry behavior:
- Failed items → status resets to `pending`
- Operation becomes active again (`isOperationActive=true`)
- New results replace old failed results

## Logs and Reports

- "View logs" per item: show only when `item.hasLogs=true`
- "View report": show only when `item.hasReport=true`
- **Prototype:** simulate log/report availability; clicking opens mock log content (modal or drawer)
- Never expose raw backend traces or stack traces in logs
- Never expose secrets, passwords, or SSH keys in log output

## Sidebar and Routing

This template does NOT:
- Change sidebar navigation
- Change active route
- Navigate to a new page

Post-close navigation (e.g. refresh entity list) is the consumer's responsibility.

## Accessibility

- `aria-live="polite"` region for operation progress updates
- `aria-live="assertive"` when operation completes with failures
- StatusIcon has `aria-label` with localized status text
- Close button label reflects current state: "Close — operation in progress" vs "Close"
- Focus management: on close, return focus to the triggering element (DEC-007)
