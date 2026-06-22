# ConfirmationDialogTemplate — Navigation and Validation

## Close Behavior

Every close path = Cancel. No accidental confirmation.

| Close trigger | Behavior |
|---|---|
| X button | Cancel — dialog closes, no action taken |
| Cancel button | Cancel — dialog closes, no action taken |
| Escape key | Cancel — dialog closes, no action taken |
| Backdrop click | Cancel — dialog closes, no action taken (unless `isConfirming=true`) |

While `isConfirming=true`:
- All close paths are disabled
- `closeOnBackdropClick=false`
- `closeOnEscape=false`

## Focus Rules

- On open: focus moves to Cancel button (safest default — never to Confirm)
- On close (cancel): focus returns to trigger element (DEC-007)
- On close (confirmed + success): focus returns to trigger element or next logical element

## Confirm Label Rules

The `confirmLabel` prop is **required**. It must name the specific action:

| Action type | Required label format |
|---|---|
| Delete | "Delete [entity type]" e.g. "Delete account" |
| Discard | "Discard changes" |
| Reset | "Reset configuration" or "Reset affected steps" |
| Abort | "Abort migration" |
| Remove | "Remove access" / "Remove [item]" |
| Revoke | "Revoke permission" |
| Disable | "Disable integration" |
| Proceed after warning | "Continue" (acceptable when risk is stated clearly) |

**Forbidden:** "OK", "Yes", "Confirm", "Proceed" without naming the action.

## Validation

This template has no form fields and requires no validation.

If the user needs to type something to confirm (e.g. "type the name to confirm deletion"), that is a DialogFlowTemplate with a confirmation step — not a ConfirmationDialogTemplate.

## Sidebar and Routing

This template does NOT:
- Change sidebar navigation
- Change the active route
- Navigate to a new page

Post-confirmation navigation (e.g. return to list after deletion) is the consumer's responsibility.

## Consequence Copy Requirements

The `consequence` prop must state:
1. What will happen (the action)
2. What will be affected (entities, relationships, dependent data)
3. Whether it can be undone

Example:
```
"This will permanently delete the account and all associated secrets and session data.
This action cannot be undone."
```

Forbidden:
- "Are you sure?"
- "This will make changes."
- Raw backend error text
