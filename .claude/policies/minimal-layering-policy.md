# Minimal Layering Policy

## Rule

Use the smallest valid DOM, component, state, and styling structure.

---

## Prohibited Patterns

```text
- Wrapper elements that only apply CSS without owning semantics, accessibility, state, or layout.
- Wrapper components that only forward props.
- Hooks that wrap one built-in hook with no additional behavior.
- Providers that only forward context without transformation.
- SCSS layers that only override DS component visuals.
- Abstractions created for hypothetical future requirements.
```

---

## When Abstraction Is Justified

A shared abstraction requires all of the following:

```text
✓ Evidence of repeated use at 2+ distinct call sites
✓ Stable behavior (not likely to change per feature)
✓ Clear ownership
✓ Safe public API
```

If any of these is missing → implement locally first.

---

## Three Similar Lines Rule

Three similar lines of implementation code is better than a premature abstraction.

Do not extract until the pattern is stable and repeated.

---

## DS Component Restyling

Do not reuse a DS component through a wrapper whose sole purpose is to restyle it:

```text
Bad: <StyledModal> wraps DS Modal with local color overrides
Bad: <MyButton> wraps DS Button with local hover behavior
```

If a required style is missing from DS → create a DS Gap.

---

## No Debug UI in Visible Product

State controls for debug/prototype scenarios must be code constants — not visible buttons or UI controls:

```ts
// In development constants file — not in visible UI
export const MOCK_SCENARIO = 'happy-path';
```
