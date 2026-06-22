# Forms and Validation Standard

## Standard ID

`GUS-009`

## Category

`form`

## Status

`active`

---

## Rule

Use DS form components for all form fields. Validate at submit and on blur (not on every keystroke unless the pattern explicitly requires live validation). Show inline field-level errors below the field.

---

## Required Pattern

```text
Label (required marker if required)
Input / Select / Checkbox / Radio (DS component)
Helper text (optional, below field)
Validation error (below field, on submit or blur)
```

---

## Validation Behavior

- Validate on submit (always)
- Validate on blur (after first submit attempt)
- Do not validate on every keystroke unless live search or character count
- Show inline error below the field with `aria-describedby` pointing to the error message
- Scroll to first error field on submit failure

---

## Required States Per Field

- Default
- Focus
- Filled
- Error (with message)
- Disabled
- Read-only (when applicable)

---

## Form-Level States

- Default
- Saving / Submitting (primary button shows loading state)
- Success (toast or success message)
- Backend error (inline error above form or inline per-field)
- Validation error (inline per-field)
- Unsaved changes (discard confirmation on navigate away)

---

## Forbidden

- Custom input components when DS Input exists
- Inline styles on form fields
- Error messages that disappear before the user can read them
- Validation errors shown only as toast (must also be inline at the field)
- Form submission that does not prevent double-submit

---

## QA Checks

1. Are DS form components used?
2. Are inline field-level errors shown on submit and blur?
3. Is there a loading state during submit?
4. Is there an unsaved changes warning on navigate away?
5. Are required fields marked?

---

## Standard Metadata

```ts
{ id: 'GUS-009', title: 'Forms and Validation Standard', category: 'form', status: 'active', approvedAt: '2026-06-21' }
```
