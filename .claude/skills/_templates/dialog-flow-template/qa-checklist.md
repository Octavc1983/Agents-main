# DialogFlowTemplate — QA Checklist

Run this checklist before marking any DialogFlowTemplate implementation complete.

---

## Purpose and Scope

- [ ] Dialog has one clear, scoped purpose
- [ ] Dialog does not overlap with FullScreenWizardTemplate use cases
- [ ] DEC-016 check passed: flow is NOT Add Account / Create Account / Onboard Account
- [ ] Dialog does not contain long-running backend operations, log/report requirements, or irreversible stages

---

## DS Compliance

- [ ] Uses DS `Modal` as base — no custom dialog primitive
- [ ] Footer actions use DS `Button`
- [ ] Destructive confirm uses `Button variant="danger"` — no local color override
- [ ] No inline styles anywhere in component or SCSS
- [ ] No hardcoded hex colors, spacing, or typography values
- [ ] All SCSS uses tokens: `@use 'tokens' as *; @use '../../styles/mixins' as *;`
- [ ] SVG icons only — no icon libraries, no PNG, no emoji

---

## Layout and Scroll

- [ ] Modal header is fixed
- [ ] Modal body scrolls (`overflow-y: auto; @include ds-scrollbar`)
- [ ] Modal footer is fixed
- [ ] Body does not overflow the viewport

---

## State Coverage

- [ ] `loading` state shows skeleton or spinner
- [ ] `ready` state shows form with data
- [ ] `dirty` state is tracked (enables dirty close confirmation)
- [ ] `invalid` state shows inline field errors, disables Next/Submit
- [ ] `submitting` state disables all footer actions (DEC-001)
- [ ] `completed` state shows success content or closes dialog
- [ ] `warning` state requires explicit acknowledgment before continuing
- [ ] `failed` state shows dialog-level error, offers retry if safe
- [ ] `unknown-outcome` state shown on timeout (DEC-004) — not `failed`
- [ ] `read-only` state disables all edit actions

---

## Navigation

- [ ] Single-step: no Back, no step indicator
- [ ] Multi-step: Back hidden on step 1, visible on step > 1
- [ ] Next/Submit disabled when `canNext=false` or state is invalid/submitting
- [ ] Submit label names the action (not "OK" or "Yes")
- [ ] X / Cancel / Escape trigger dirty check before closing
- [ ] Backdrop click triggers dirty check (if `closeOnBackdropClick=true`)
- [ ] Dialog does not change sidebar navigation or active route

---

## Validation

- [ ] Field errors are inline, below each field
- [ ] Backend errors appear at dialog level (or field level if field-specific)
- [ ] Timeout → `unknown-outcome`, not `failed`
- [ ] Warning state requires explicit acknowledgment

---

## Accessibility

- [ ] Focus trap active within modal (DS Modal handles this)
- [ ] Escape closes dialog (DS Modal handles this)
- [ ] Focus restored to trigger element on close (DEC-007)
- [ ] All interactive elements are keyboard accessible
- [ ] StatusIcon (if used) has `aria-label`
- [ ] Submit button label is announced correctly by screen reader

---

## Dirty Close Confirmation

- [ ] ConfirmationDialogTemplate opens when dirty and user attempts close
- [ ] Cancel on confirmation returns to dialog with unsaved data intact
- [ ] Confirm on confirmation closes dialog and discards data

---

## Prototype

- [ ] Mock data is typed, centralized in `src/mock/`, not in JSX
- [ ] All state transitions are simulated with deterministic mock logic
- [ ] Retry simulates recovery (succeeds on second attempt for demo)
- [ ] Implementation note includes "Simulated operation state — mock result — no live backend"

---

## Localization

- [ ] All visible labels use localization keys
- [ ] All accessibility labels use localization keys
- [ ] No hardcoded English strings in JSX or SCSS

---

## Dark Mode

- [ ] All colors use semantic DS tokens
- [ ] No light-only hardcoded colors
- [ ] All states (loading, error, warning, success) render correctly in dark theme
