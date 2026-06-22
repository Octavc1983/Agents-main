# Design System Policy

## Scope

Applies to all implementation work in this project. Non-negotiable.

---

## DS Components Are Consume-Only

Existing `@idira/design-system` components must be consumed through public APIs only.

```text
- Do not visually override, recolor, restyle, or mutate DS components.
- Do not wrap DS components solely to apply local styling.
- Do not patch DS component internals through CSS selectors.
```

When a required appearance or behavior is missing:
1. Stop.
2. Report a structured DS Gap.
3. Request an approved DS variant.
4. Do not create a local substitute.

---

## No Silent Fallback Rule

When an approved DS component, token, icon, state pattern, or API is missing:

```text
Stop → Report a structured DS Gap → Wait for approval
```

Do not invent a local replacement.

---

## Token Rule

All spacing, color, radius, shadow, and typography must use approved SCSS tokens.

```text
- Do not hardcode hex colors.
- Do not hardcode px spacing when a token exists.
- Do not hardcode border-radius, shadow, or typography values.
```

Token import pattern: `@use 'tokens' as *; @use '../../styles/mixins' as *`

---

## Dark Mode Readiness

Every screen, component, dialog, wizard, table, form, loading state, empty state, and error state must be compatible with the DS dark theme.

```text
- Use semantic DS tokens only.
- Do not hardcode light-only colors.
- Do not add page-local theme values.
```

---

## Card-First Tile Rule

When visual tiles, blocks, widgets, KPI panels, or repeated content surfaces are detected, always inspect and reuse the existing DS Card component before creating any local container.

---

## DS Gap Reporting Format

```markdown
## DS Gap: [ID]

**Missing capability:** [what is needed]
**Affected page/component:** [where]
**Workaround attempted:** none — blocked per policy
**Requested from DS team:** [approved variant or new API]
```

---

## Related Policies

- [component-ownership-policy.md](component-ownership-policy.md)
- [no-silent-fallback-policy.md](no-silent-fallback-policy.md)
- [status-indicator-policy.md](status-indicator-policy.md)
- [design-system-gap-policy.md](design-system-gap-policy.md)
