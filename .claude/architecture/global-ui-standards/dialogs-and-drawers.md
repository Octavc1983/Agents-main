# Dialogs and Drawers Standard

## Standard ID

`GUS-010`

## Category

`dialog`

## Status

`active`

---

## Rule

Use the approved Modal Service architecture. Classify intent before opening a modal. Never create one-off modal implementations.

---

## Required Classification

Before building or opening any modal:

| Intent | Service |
|---|---|
| User input, creation, editing, configuration | `FormDialogService` |
| Information, warning, confirmation, error, success, permission, destructive action | `SystemNoticeService` |

When classification is unclear: ask one focused question — "Is this for user input or a system message?"

---

## Architecture Boundary

| Layer | Location | Responsibility |
|---|---|---|
| DS Modal primitive | `packages/design-system/src/components/Modal/` | Visual shell, backdrop, a11y, focus trap |
| ModalProvider | `src/app/services/modal/ModalProvider.tsx` | Renders active modal from service |
| FormDialogService | `src/app/services/modal/FormDialogService.ts` | Creation, editing, forms, configuration |
| SystemNoticeService | `src/app/services/modal/SystemNoticeService.ts` | Information, warnings, confirmations, status |

---

## Drawers / Side Panels

Side panels and details drawers that open alongside the main content (not as overlays) do not use ModalService — they are part of the page layout.

Side panels must:
- Have a close button
- Not change the route unless the product explicitly requires it
- Preserve the underlying table/list state when open
- Close when user presses Escape

---

## Required States Per Dialog

- Default (content loaded)
- Loading (content fetching or action in progress)
- Error (load failed or action failed with recovery)
- Success (action completed — may auto-close or show confirmation)
- Confirmation (destructive / irreversible action)

---

## Forbidden

- One-off local modal component when `FormDialogService` or `SystemNoticeService` applies
- Dialogs that do not trap focus
- Dialogs without a close/cancel action
- Dialogs that navigate to a new route without product justification
- Dialogs opened by modifying a global state variable rather than the approved services

---

## QA Checks

1. Is the correct service used (Form vs SystemNotice)?
2. Does the dialog trap focus?
3. Does Escape close the dialog?
4. Is there a cancel/close action?
5. Does the dialog have loading, error, and success states?

---

## Standard Metadata

```ts
{ id: 'GUS-010', title: 'Dialogs and Drawers Standard', category: 'dialog', status: 'active', approvedAt: '2026-06-21' }
```
