# Buttons and Actions Standard

## Standard ID

`GUS-007`

## Category

`action`

## Status

`active`

---

## Rule

Use the Design System `Button` component for all clickable actions. Map action intent to the correct variant. Never create local button components.

---

## Required Variant Mapping

| Intent | DS Variant | When to use |
|---|---|---|
| Primary action | `variant="main"` | One per page/dialog, the most important action |
| Secondary action | `variant="secondary"` | Supporting actions alongside primary |
| Destructive action | `variant="danger"` | Delete, remove, disable, revoke |
| Ghost / Text | `variant="ghost"` or `variant="text"` | Low-emphasis actions, inline actions |
| Icon button | `IconButton` | Actions without a text label |

---

## Action Hierarchy

Each page / dialog should have:
- One primary action (maximum)
- One or two secondary actions
- Destructive actions clearly separated and labeled

---

## Forbidden

- Custom local `<button>` styled to look like DS Button
- More than one `variant="main"` in the same view
- Inline `style={{}}` on buttons
- Hardcoded button colors, padding, or border radius
- Emoji or image icons inside buttons (SVG icons only)

---

## Bulk Actions

Bulk actions appear in the Summary Bar SelectionBar when one or more rows are selected. They must use DS `Button` or `IconButton` with `variant="secondary"` unless the action is destructive.

---

## QA Checks

1. Is `@idira/design-system` `Button` used for all actions?
2. Is there at most one primary action per view?
3. Are destructive actions using `variant="danger"`?
4. Are icon-only buttons using `IconButton` with `aria-label`?

---

## Standard Metadata

```ts
{ id: 'GUS-007', title: 'Buttons and Actions Standard', category: 'action', status: 'active', approvedAt: '2026-06-21' }
```
