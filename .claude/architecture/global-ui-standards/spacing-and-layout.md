# Spacing and Layout Standard

## Standard ID

`GUS-015`

## Category

`layout`

## Status

`active`

---

## Rule

Use DS spacing tokens for all padding, margin, and gap values. Do not hardcode pixel values when a token exists. Use the minimal valid DOM and CSS structure.

---

## Token Usage

```scss
// Spacing tokens: $spacing-1 (4px) through $spacing-12 (48px)
padding: $spacing-4;    // 16px
gap: $spacing-3;        // 12px
margin-bottom: $spacing-6; // 24px

// Border radius
border-radius: $border-radius-base;  // 8px
border-radius: $border-radius-xl;    // 24px
border-radius: $border-radius-full;  // 9999px
```

---

## Page Layout

All pages render inside the existing AppShell. The main content area is the only region pages should control.

```text
AppShell
├── Sidebar  (fixed, do not modify)
├── Header   (fixed, do not modify)
└── Main content  (page-owned area)
    ├── Page header (optional)
    ├── Summary Bar / toolbar (when applicable)
    └── Content area
```

---

## Minimal Layer Rule

Use the smallest valid DOM, component, state, and styling structure.

Do not create:
- Wrappers that add no layout semantics
- Abstractions that are not shared across at least two places
- SCSS layers that duplicate existing tokens
- Providers or hooks that own no meaningful state

---

## Responsive Behavior

- Use CSS Grid and Flexbox with token-based gap and padding
- Do not use fixed widths for main content areas (except where design explicitly requires it)
- Use `min-width` / `max-width` constraints for bounded panels (e.g., KPI panel at `width: 188px`)
- `minmax()` for responsive column sizing in grids

---

## Forbidden

- Inline `style={{ padding: '16px' }}` when `$spacing-4` token exists
- Hardcoded `margin: 24px` when `$spacing-6` token exists
- Wrapper `<div>` elements with no class, no semantic role, and no layout purpose
- Creating a new layout abstraction before checking if one already exists

---

## QA Checks

1. Are spacing values using DS tokens?
2. Are there unnecessary wrapper elements?
3. Are border-radius values using tokens?
4. Are hardcoded pixel values present where tokens exist?

---

## Standard Metadata

```ts
{ id: 'GUS-015', title: 'Spacing and Layout Standard', category: 'layout', status: 'active', approvedAt: '2026-06-21' }
```
