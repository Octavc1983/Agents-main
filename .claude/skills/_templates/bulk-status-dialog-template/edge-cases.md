# BulkStatusDialogTemplate — Edge Cases

## EC-01: All items fail

**Trigger:** Every item in the operation results in `failed`
**Expected behavior:**
- ProgressBar status = `failed`
- Summary shows: Completed: 0 | Failed: N | Skipped: 0
- Do NOT show a success message
- Retry Failed button visible if `canRetry=true`
- "No items completed successfully." shown in summary

---

## EC-02: Timeout on all items

**Trigger:** Backend operation times out for every item
**Expected behavior:**
- Items → `unknown` (not `failed`) per DEC-004
- ProgressBar status = `done` (operation concluded, outcomes uncertain)
- Summary shows: Unknown: N
- Show: "We couldn't confirm the outcome for these items."
- Do not auto-retry
- Retry available only if explicitly confirmed safe by backend contract

---

## EC-03: Mixed outcomes (partial success)

**Trigger:** Some items succeed, some fail, some are unknown
**Expected behavior:**
- Summary strip shows accurate counts for each status
- Per-item rows show individual statuses
- Partial success is NOT shown as global success
- Retry available for `failed` items if `canRetry=true`

---

## EC-04: Operation aborted mid-run

**Trigger:** User or system aborts the bulk operation while items are still `pending` or `in-progress`
**Expected behavior:**
- In-progress items → `cancelled` or `unknown`
- Pending items → `cancelled`
- `isOperationActive=false`
- `canClose=true`
- Show: "Operation was cancelled. X items completed, Y items were not processed."

---

## EC-05: Large result set (200+ items)

**Trigger:** Bulk operation runs on 200+ entities
**Expected behavior:**
- Scrollable list renders all items
- Performance may degrade — documented limitation
- Implementation report must note: "Large result set — virtualization not available. Performance limitation for collections above ~200 items."
- Do NOT claim virtualization

---

## EC-06: Retry after timeout

**Trigger:** `canRetry=true` and some items have `unknown` status from timeout
**Expected behavior:**
- Retry resets `unknown` items to `pending` only if backend explicitly confirms retry is safe for timed-out operations
- If backend does not confirm: do not show Retry for `unknown` items, only for `failed` items

---

## EC-07: ConfirmationDialog for destructive bulk action

**Trigger:** Bulk delete — user clicks "Delete selected" which should confirm before triggering
**Expected behavior:**
- ConfirmationDialogTemplate opens BEFORE BulkStatusDialogTemplate
- User confirms → ConfirmationDialog closes → BulkStatusDialog opens and starts operation
- These are two separate dialogs in sequence, not nested

---

## EC-08: Minimize then page navigation

**Trigger:** User minimizes dialog then navigates to another section
**Expected behavior:**
- Operation continues in background
- Minimized indicator persists across navigation
- **Prototype:** This is a complex stateful behavior — simulate with a fixed position toast or status bar; do not attempt full persistence across routes in prototype

---

## EC-09: Logs contain sensitive data

**Trigger:** Log content would expose secrets, passwords, SSH keys, or stack traces
**Expected behavior:**
- Never render sensitive data in log output, even in prototype
- Mock log data must be sanitized: no secrets, no passwords, no stack traces
- Show: "[Log content redacted for security]" if needed in prototype
