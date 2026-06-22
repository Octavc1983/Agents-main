# Dark Mode Policy

## All Screens Must Support Dark Mode

Every new UI screen, component, template, dialog, wizard, dashboard, table, form, configuration page, loading state, empty state, and error state must be compatible with the Design System dark theme.

---

## Before Implementation

1. Inspect `@idira/design-system` dark-theme tokens and public component APIs.
2. Use semantic DS tokens only.
3. Do not hardcode light-only colors.
4. Do not add page-local theme values.
5. Ensure hover, focus, selected, disabled, loading, empty, and error states have valid dark-theme behavior.

---

## Prohibitions

```text
- No hardcoded hex colors.
- No page-level dark mode overrides.
- No custom theme values outside DS tokens.
- No DS component color overrides.
```

---

## Dark Mode Conversion

When a screenshot or existing screen must be converted: use `convert-screen-to-dark` skill.

---

## ThemeContext

Dark/Light theme switch is mandatory for all screens. Use DS ThemeContext + data-theme attribute. Use semantic DS tokens throughout — never light-mode-only values.
