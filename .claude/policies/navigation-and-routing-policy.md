# Navigation and Routing Policy

## AppShell Protection

Never replace AppShell, Sidebar, Header, or Router architecture.

```text
- Do not create a custom AppShell.
- Do not create a custom Sidebar.
- Do not create a custom Header.
- Do not create a custom Router.
```

When building any page or template: AppShell, Sidebar, and Header remain intact.

---

## Active Sidebar Item Rules

The active sidebar item reflects the page the user entered from.

```text
- Opening Master Details does NOT change the active sidebar item.
- Opening a FullScreenWizard does NOT change the active sidebar item.
- Opening a DetailsPage does NOT change the active sidebar item.
- Only top-level page navigation changes the sidebar selection.
```

---

## DEC-016 — Add Account Routing

Add Account / Create Account / Onboard Account must use `FullScreenWizardTemplate`.

```text
NEVER route Add Account / Create Account / Onboard Account to:
- DialogFlowTemplate
- ConfirmationDialogTemplate
- WizardTemplate (modal)
- Any dialog or modal pattern
```

See: `.claude/architecture/user-decision-memory/decisions/navigation/add-account-wizard-template.md`

---

## Route Registration

Every new page requires:

1. Route entry in `src/app/router.tsx`
2. Sidebar navigation entry in the appropriate Space
3. Route must render inside AppShell

Unknown route fallback must render inside AppShell — not replace Sidebar or Header.

---

## Back Navigation

Back must restore originating context:

```text
- Filters and search query
- Scroll position (where feasible)
- Active selection
- Pagination state
```

---

## Sidebar Navigation Sync Rule

When a navigation screenshot or Figma reference contains an item missing from `spacesRegistry`:

```text
- Add it in the exact detected Space, hierarchy level, item type, and sibling position.
- Do not append blindly or flatten hierarchy.
- Infer routes only from proven sibling route patterns.
- If route is unknown: create as route-pending and report.
```
