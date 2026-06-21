# Global UI Standards Registry

## Purpose

Single source of truth for reusable visual, interaction, accessibility, and layout standards across all screens in the product.

Claude must read this registry before planning, building, updating, reviewing, or fixing any screen, component, state, table, split view, landing page, dialog, wizard, or navigation area.

---

## Mandatory Preflight Rule

Before any UI creation, edit, audit, or fix, Claude must run:

```text
Request received
→ detect screen / flow / template
→ read Global UI Standards Registry (this directory)
→ identify applicable standards
→ inspect Design System capability
→ scan existing implementation
→ create implementation plan
```

Claude must not begin visual implementation before this check.

---

## Required Output in Every Screen Plan

Before implementation, include this section:

```markdown
### Global UI Standards Applied

| Standard | Applies To | Decision |
|---|---|---|
| Status indicators | Status column, details panel | Use approved DS status icon at 24px |
| Loading and skeletons | Table loading state | Use layout-aware table skeleton |
| Empty state | Initial no-data state | Use approved empty-state pattern |
| No results | Active filters return zero results | Show clear-filters recovery action |
| Accessibility | Status rendering | Icon plus localized label |
| Dark mode | All status states | Use semantic DS tokens only |
```

If no standard applies:
```text
No applicable global UI standard found.
```

---

## Standards Index

| File | Category | Status |
|---|---|---|
| [status-indicators.md](status-indicators.md) | status | active |
| [loading-and-skeletons.md](loading-and-skeletons.md) | loading | active |
| [empty-and-no-results.md](empty-and-no-results.md) | empty-state | active |
| [error-and-recovery.md](error-and-recovery.md) | error | active |
| [buttons-and-actions.md](buttons-and-actions.md) | action | active |
| [tables-and-split-views.md](tables-and-split-views.md) | table | active |
| [table-filter-and-summary-bar.md](table-filter-and-summary-bar.md) | table | active |
| [table-interaction-animation-virtualization.md](table-interaction-animation-virtualization.md) | table | active |
| [forms-and-validation.md](forms-and-validation.md) | form | active |
| [dialogs-and-drawers.md](dialogs-and-drawers.md) | dialog | active |
| [navigation.md](navigation.md) | navigation | active |
| [accessibility.md](accessibility.md) | accessibility | active |
| [localization.md](localization.md) | localization | active |
| [dark-mode.md](dark-mode.md) | dark-mode | active |
| [spacing-and-layout.md](spacing-and-layout.md) | layout | active |
| [deprecated-standards.md](deprecated-standards.md) | — | reference |

---

## Standard Lifecycle

```text
User decision
→ documented as candidate standard
→ applied in one approved screen
→ validated
→ reused in another relevant screen
→ promoted to Global UI Standard
→ automatically applied in future work
```

Do not promote one-time product-specific behavior into a global standard.

---

## Global Rule

Before Claude asks the user how to implement a recurring UI behavior, it must ask internally:

```text
Does a relevant active Global UI Standard already define this?
```

If yes: Apply the standard automatically. Report it in the implementation plan. Ask only if the current screen needs an exception.

If no: Create a candidate standard or Flow Gap. Ask for a UX decision. Do not invent a new recurring visual pattern.

---

## Enforcement Levels

### Automatic Application

Claude applies the standard automatically when:
- the page displays a recognized pattern with an approved standard
- an approved DS component or pattern exists
- no screen-specific approved exception exists

### Warning Before Change

When Claude finds an existing violation:

```markdown
### Global UI Standard Violation Detected

Area: [location]
Current behavior: [what it does]
Required standard: [what the standard says]
Recommended change: [fix]
Approval required: yes / no
```

### QA Blocking Rule

The QA agent blocks completion when a global standard is violated without an approved exception.
