# Validation and Error Policy

## Field Validation Rules

```text
- Validate on blur, not on every keystroke.
- Show error below the affected field.
- Block primary action until all errors are resolved.
- State = `invalid` while errors exist.
- State returns to `dirty` when user edits any field.
```

---

## Timeout → Unknown Outcome (DEC-004)

**Never auto-map timeout to failure.**

When a backend operation times out:

```text
- UX state: unknown-outcome
- Show: "We couldn't confirm whether this completed."
- Show: Close + contextual retry guidance (only if retry is confirmed safe)
- Do NOT automatically mark as failed.
- Do NOT auto-retry.
```

---

## Duplicate Submission Prevention (DEC-001)

When a form or dialog is submitting:

```text
- Set isSubmitting=true immediately on first click.
- Disable both primary action and cancel/back while isSubmitting.
- Do not allow a second submission until the first resolves.
```

---

## Confirmation Label Rule

`confirmLabel` in ConfirmationDialogTemplate MUST name the specific action:

```text
Good: "Delete account", "Disable integration", "Reset configuration", "Change machine and reset"
Bad: "OK", "Yes", "Confirm", "Proceed"
```

Focus defaults to Cancel on open — never Confirm.

---

## Error Message Rules

```text
- Never show raw backend error text to users.
- Never show stack traces.
- Never show internal task IDs or DynamoDB record IDs.
- Show safe localized messages only.
- Show technical reason only when it is actionable for the user.
```

---

## Warning State

When a task or step completes with warnings:

```text
- User must explicitly acknowledge the warning before proceeding.
- Warning acknowledgment is NOT optional.
- Do not auto-advance past a warning.
```

---

## Partial Success

Partial success is NOT success.

```text
- Show succeeded, failed, and skipped counts separately.
- Do not present partial success as generic success.
```

---

## Retry Rules

Retry is available only when:

```text
1. Task status is FAILURE (not TIMEOUT unless explicitly confirmed safe).
2. The backend contract confirms the operation is safe to retry.
3. The operation is idempotent.
```

Do not show Retry for TIMEOUT without explicit backend confirmation of idempotency.

---

## Unknown Route / Not Found States

```text
- Unknown route fallback renders inside AppShell.
- Not Found state does not replace Sidebar or Header.
- Error state renders in the content area only.
```
