# DetailsPageTemplate — QA Checklist

---

## Purpose and Scope

- [ ] Page renders a single entity with full detail (not a list)
- [ ] AppShell, Sidebar, and Header remain intact
- [ ] Active sidebar item does NOT change when entering the details page
- [ ] DEC-016 check: account creation is never triggered from this template

---

## DS Compliance

- [ ] `Tabs` (DS) used for content section navigation
- [ ] `Button` + `ActionMenu` (DS) used for contextual actions
- [ ] `Card` (DS) used for summary strip sections
- [ ] `StatusIcon` (shared) used for entity operational status — NOT SeverityBadge
- [ ] `SeverityBadge` (DS) used for risk severity only — NOT operational status
- [ ] `Skeleton` (DS) used for loading state
- [ ] `EmptyState` (DS) used for not-found state
- [ ] No inline styles
- [ ] No hardcoded hex colors or spacing
- [ ] SVG icons only

---

## State Coverage

- [ ] `loading` state shows layout-aware skeleton (matches real structure)
- [ ] `ready` state shows full entity content
- [ ] `not-found` state shows DS EmptyState, Back available
- [ ] `permission-denied` state shows accessible error, no entity data exposed, Back available
- [ ] `read-only` state disables all edit actions, shows read-only indicator
- [ ] `stale` state shows stale indicator + refresh option
- [ ] `error` state shows DS ErrorState + retry option
- [ ] `entity-deleted` state shows deletion message + Back to list

---

## Back Navigation

- [ ] `onBack` prop used — not `window.history.back()`
- [ ] Back label names the destination (not just "Back")
- [ ] Back available in all states including error states
- [ ] Deep link back falls back to parent list at default state

---

## Deep Link Resolution

- [ ] Not-found entity ID → `not-found` state
- [ ] Permission-denied entity → `permission-denied` state
- [ ] Deleted entity → `entity-deleted` state

---

## Sensitive Data

- [ ] Configuration tab: no passwords, secrets, SSH keys in plain text
- [ ] Activity/Logs tab: no raw backend traces, no stack traces
- [ ] Mock log data is sanitized

---

## Accessibility

- [ ] Back button has accessible label naming destination
- [ ] StatusIcon has `aria-label` with localized status text
- [ ] DS Tabs: correct `role="tab"`, `aria-selected`, `role="tabpanel"`
- [ ] All contextual actions have accessible labels

---

## Localization

- [ ] All field labels, tab labels, action labels use localization keys
- [ ] `statusLabel`, `backLabel`, entity type references are localized
- [ ] No hardcoded English strings in JSX

---

## Prototype

- [ ] Entity data from `src/mock/[domain]MockData.ts` — typed and centralized
- [ ] Mock data includes at least one entity in each required state
- [ ] Deep link mock resolution uses entity ID lookup in mock array
- [ ] No mock data in JSX

---

## Dark Mode

- [ ] All colors use semantic DS tokens
- [ ] `SeverityBadge` dark theme: no local overrides
- [ ] All states render correctly in dark theme
