# Dark Mode Standard

## Standard ID

`GUS-014`

## Category

`dark-mode`

## Status

`active`

---

## Rule

Every new UI screen, component, template, dialog, wizard, dashboard, table, form, configuration page, loading state, empty state, and error state must be compatible with the Design System dark theme.

---

## Required Behavior

1. Use semantic Design System tokens only (`$color-text-light`, `$color-background-dark`, etc.)
2. Do not hardcode light-only colors (`#ffffff`, `#f5f5f5`, etc.)
3. Do not add page-local theme values
4. Use CSS custom properties with `var(--token, #{$fallback})` for runtime theming

---

## Required States for Dark Mode Check

- Default content
- Hover state
- Focus state
- Selected state
- Disabled state
- Loading / skeleton state
- Empty state
- Error state

All states must have valid dark-theme behavior.

---

## Converting Existing Screens

When a screenshot or existing screen must be converted to dark mode, use `convert-screen-to-dark` skill.

---

## Forbidden

- Hardcoded hex colors in SCSS or JSX when a token exists
- `background: white` or `color: black` in component SCSS
- Light-only shadows without dark-mode counterpart tokens
- Page-local CSS variables that bypass the DS token system
- Inline `style={{ color: '#fff' }}` for theming purposes

---

## QA Checks

1. Are all color values using DS tokens?
2. Is there any hardcoded hex color in the component SCSS?
3. Do hover, focus, and selected states have dark-theme valid colors?
4. Do loading and empty states use DS token colors?

---

## Standard Metadata

```ts
{ id: 'GUS-014', title: 'Dark Mode Standard', category: 'dark-mode', status: 'active', approvedAt: '2026-06-21' }
```
