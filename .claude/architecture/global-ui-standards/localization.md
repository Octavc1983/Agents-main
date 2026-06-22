# Localization Standard

## Standard ID

`GUS-013`

## Category

`localization`

## Status

`active`

---

## Rule

All user-facing copy — including visible text, accessibility labels, placeholder text, tooltip content, error messages, and empty state messages — must use the approved localization system. Do not hardcode user-facing copy in JSX or TSX.

---

## Applies To

- Page titles and headings
- Navigation labels
- Button labels
- Form field labels, placeholders, and helper text
- Validation error messages
- Empty state messages and CTAs
- Loading state labels
- Status labels
- Toast and notification messages
- Dialog titles, messages, and action labels
- Accessibility labels (`aria-label`, `aria-describedby`)
- Tooltip content
- Column headers

---

## Forbidden

- Hardcoded English strings in JSX/TSX when a localization key exists
- Hardcoded accessibility labels when a localization key can be used
- Copy created without checking the terminology registry
- Deprecated terms — see `.claude/content/deprecated-terms.md`

---

## Terminology Check

Before finalizing any user-facing text, check:
- `.claude/content/terminology-registry.md` — approved terms
- `.claude/content/deprecated-terms.md` — terms that must not appear
- `.claude/content/ux-writing-style-guide.md` — voice and tone

---

## QA Checks

1. Are all visible strings using localization keys?
2. Are all `aria-label` values using localization keys?
3. Does any copy use deprecated terms?
4. Does any new navigation item need a terminology registry entry?

---

## Standard Metadata

```ts
{ id: 'GUS-013', title: 'Localization Standard', category: 'localization', status: 'active', approvedAt: '2026-06-21' }
```
