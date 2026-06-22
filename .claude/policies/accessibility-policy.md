# Accessibility Policy

## Minimum Requirements

Every UI screen, component, dialog, wizard, table, form, loading state, empty state, and error state must meet these accessibility requirements.

---

## Status and State Must Not Rely on Color Alone

```text
- Status must use StatusIcon (24px, with aria-label) in addition to color.
- Risk severity must use SeverityBadge label in addition to color.
- Error state must use icon + text in addition to color.
- Warning state must use icon + text in addition to color.
```

---

## Interactive Elements

```text
- Every interactive element must be keyboard operable.
- Focus order must be logical and follow visual order.
- Tab, Enter, Space, Arrow keys must behave as expected per ARIA pattern.
- Escape must close the nearest modal, dropdown, or overlay.
- Focus must be returned to the trigger element when a dialog closes.
```

---

## Accessible Names

```text
- Icon-only buttons must have aria-label.
- Status icons must have aria-label.
- All form inputs must have visible labels (not placeholder only).
- Images must have alt text.
- Do not expose sensitive data in aria-label or title attributes.
```

---

## Focus Management — Dialogs

```text
- On open: focus moves to the first interactive element inside the dialog.
- For ConfirmationDialogTemplate: focus defaults to Cancel, not Confirm.
- On close: focus returns to the trigger element.
```

---

## Loading States

```text
- Loading spinners must have aria-label.
- Skeleton loading regions must use role="status" or equivalent.
- Screen readers must be informed when content is loading.
```

---

## Scrollable Regions

```text
- Scrollable regions must be keyboard navigable.
- @include ds-scrollbar must be applied to all overflow-y containers.
```

---

## Motion

```text
- Respect prefers-reduced-motion.
- Use approved DS motion tokens — no custom animation values.
```
