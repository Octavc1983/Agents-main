# Localization Policy

## All User-Facing Copy Must Use the Approved Localization System

Do not hardcode user-facing copy in:

```text
- JSX or TSX
- Page templates
- Dialog or wizard content
- Form labels, placeholders, helper text
- Navigation items
- Loading states
- Empty states
- Error states
- Feature code
- Accessible labels (aria-label, alt)
```

---

## Approved Terminology

Before writing or reviewing any user-facing text, inspect:

```text
.claude/content/terminology-registry.md        — approved terms and preferred forms
.claude/content/ux-writing-style-guide.md      — voice, tone, grammar, mechanics
.claude/content/approved-microcopy-patterns.md — reusable approved copy blocks
.claude/content/deprecated-terms.md            — retired terms that must not reappear
```

---

## Terminology Checks

```text
- Every new page must pass a terminology check before UX review.
- Any new navigation item must be registered in the terminology registry.
- Deprecated terms found in any page are Critical issues that block review.
- Unregistered product-specific terms must be proposed for registry addition.
- Do not invent new terminology without UX Writing review.
```

---

## Confirmation Labels

Confirmation dialog confirm labels must name the specific action — never use:

```text
Bad: "OK", "Yes", "Confirm", "Proceed"
Good: "Delete account", "Disable integration", "Reset configuration"
```

---

## Button Labels

Button labels must describe the outcome, not the gesture:

```text
Good: "Save changes", "Create account", "Apply filters", "Retry failed items"
Bad: "Click here", "Submit", "Continue", "OK"
```
