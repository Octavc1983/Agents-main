# BulkStatusDialogTemplate — State Model

## Operation-Level States

| State | `isOperationActive` | `canClose` | ProgressBar status |
|---|---|---|---|
| Initializing | true | false | active |
| In progress (partial) | true | false | active |
| Completed (all success) | false | true | done |
| Completed (partial success) | false | true | done |
| Completed (all failed) | false | true | failed |
| Paused / minimized | true | false | paused |
| Unknown (timeout) | false | true | done (with unknowns) |

## Item-Level States

```ts
type BulkItemStatus =
  | 'pending'      // queued, not yet started
  | 'in-progress'  // actively processing
  | 'succeeded'    // completed successfully
  | 'failed'       // failed — retry may be available
  | 'skipped'      // intentionally skipped
  | 'cancelled'    // operation cancelled before this item ran
  | 'unknown';     // timeout or unconfirmed outcome (DEC-004)
```

## State Transitions — Item Level

```
pending → in-progress → succeeded
                      → failed
                      → unknown (on timeout)
pending → cancelled (if operation is aborted before item runs)
succeeded → [final]
failed → pending (on retry, if retry is safe)
unknown → [final unless retry is explicitly available]
```

## Prototype State Simulation

```ts
// Simulate operation progress with deterministic mock
const simulateBulkOperation = async (items: BulkOperationItem[]) => {
  for (const item of items) {
    setItemStatus(item.id, 'in-progress');
    await mockDelay(800);
    // deterministic outcome per scenario
    setItemStatus(item.id, 'succeeded'); // or 'failed' or 'unknown'
  }
  setOperationComplete();
};
```

Prototype must demonstrate:
- All succeeded (happy path)
- Partial success (some failed, some succeeded)
- All failed
- Timeout → unknown items
- Retry → pending → succeeded

## Partial Success Rule

Partial success ≠ success. When any item has status `failed` or `unknown`:
- Summary strip shows accurate counts
- ProgressBar status = `done` but individual failures are visible
- Do not show a global "Success" message
- Show per-item failure reasons

## Timeout → Unknown Outcome (DEC-004)

Timeout → item status `unknown`. Not `failed`.
Reason label: "We couldn't confirm whether this completed."
Do not auto-retry on timeout.
Show retry only if backend confirms it is safe for timed-out items.

## Operation-Level Completion

Operation is complete when no items remain in `pending` or `in-progress` state.
At completion: `isOperationActive=false`, `canClose=true`.
