# Error and Recovery Standard

## Standard ID

`GUS-006`

## Category

`error`

## Status

`active`

---

## Rule

Every error state must include a clear explanation and a recovery action. Never leave the user at a dead end.

---

## Required Pattern

```text
Error indicator (icon or visual)
Message: What went wrong (user-facing, not technical)
Recovery action: "Try again" / "Refresh" / "Go back" / "Contact support"
```

---

## Error State Types

### Backend / Network Error

```text
Message: "Something went wrong. Please try again."
CTA: "Try again" (retries the failed request)
```

### Page Load Error

```text
Message: "This page could not be loaded."
CTA: "Refresh page" or "Go to [parent page]"
```

### Inline Data Error (table row, card, details)

```text
Message: "Failed to load [entity] details."
CTA: "Retry" (inline, does not navigate away)
```

### Permission / Access Denied

```text
Message: "You do not have permission to view this."
CTA: "Go back" or "Request access" (if applicable)
```

### Not Found (404)

```text
Message: "This [entity] could not be found."
CTA: "Go to [parent list]"
Must render inside AppShell — never replace AppShell
```

---

## Forbidden

- Error state with no message
- Error state with no recovery action
- Error state that replaces the AppShell
- Technical error messages exposed directly to users (stack traces, DB errors)
- Errors that are silently swallowed with no UI feedback

---

## QA Checks

1. Does every remote-data area have an error state?
2. Does every error state have a user-facing message and a recovery CTA?
3. Does the 404 / Not Found state render inside AppShell?
4. Are technical error details hidden from users?

---

## Standard Metadata

```ts
{ id: 'GUS-006', title: 'Error and Recovery Standard', category: 'error', status: 'active', approvedAt: '2026-06-21' }
```
