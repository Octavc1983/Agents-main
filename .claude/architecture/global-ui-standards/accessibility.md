# Accessibility Standard

## Standard ID

`GUS-012`

## Category

`accessibility`

## Status

`active`

---

## Rule

Every interactive element must be keyboard accessible. Every non-text visual indicator must have an accessible text alternative.

---

## Required Behaviors

### Icon Buttons

```tsx
<IconButton aria-label="Close panel" />
<button aria-label="Delete account">...</button>
```

### Status Icons (Icon-Only Usage)

```tsx
<StatusIcon status="active" size={24} aria-label="Active" />
// or use showLabel to include visible label
<StatusIcon status="active" size={24} showLabel />
```

When a visible label accompanies the icon, the icon must be `aria-hidden="true"` (handled inside `StatusIcon` component).

### Focus Management

- After closing a dialog: return focus to the element that opened it
- After opening a details panel: move focus to the panel header or first interactive element
- After completing a wizard step: move focus to the next step content

### Keyboard Navigation

- All interactive elements reachable by Tab
- Escape closes overlays, dialogs, panels, and dropdowns
- Enter / Space activate buttons and interactive controls
- Arrow keys navigate within menus, tabs, and select dropdowns

### Color

- Color must not be the only differentiator for status, error, or any state
- All status indications use icon + color + label (GUS-001)

---

## Forbidden

- Icon-only interactive elements without `aria-label`
- Color-only status communication
- Focus traps that cannot be escaped with keyboard
- Interactive elements that are not reachable by keyboard
- Dialogs that do not trap focus within their boundary

---

## QA Checks

1. Do all icon buttons have `aria-label`?
2. Are all interactive elements keyboard reachable?
3. Does Escape close all overlays and dialogs?
4. Is focus returned to the opener after dialog/panel close?
5. Is color never the only status differentiator?

---

## Standard Metadata

```ts
{ id: 'GUS-012', title: 'Accessibility Standard', category: 'accessibility', status: 'active', approvedAt: '2026-06-21' }
```
