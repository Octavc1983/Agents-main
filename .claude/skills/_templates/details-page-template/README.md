# DetailsPageTemplate — Skill

## Template ID
`details-page`

## Status
Approved

## Purpose
Implement full-page single-entity details views with structured sections, operational status, contextual actions, and tabbed content — without replacing the AppShell context.

## DS Primitives
- `Button`, `ActionMenu`, `Tabs`, `Card` — all verified ✓
- `SeverityBadge` — verified ✓ — **for risk severity only** (Critical/High/Medium/Low/Informational)
- `StatusIcon` (shared, `src/components/shared/StatusIcon/`) — **for operational status** ✓

## When This Skill Runs
- User requests: "Details page", "Entity details", "Account details", "Connector details", "Show full details for X"
- Row click from table/FATLINES that navigates to full page (not master details panel)
- Deep link to an entity

## DEC-016 Check
Not applicable — Details page is read/edit. Account creation uses FullScreenWizardTemplate.

## Files
- [README.md](README.md) — this file
- [template-contract.md](template-contract.md) — props API, DS dependencies, layout
- [state-model.md](state-model.md) — all page states and tab states
- [navigation-and-validation.md](navigation-and-validation.md) — back behavior, deep link resolution, sidebar rules
- [edge-cases.md](edge-cases.md) — not-found, permission-denied, deleted entity, stale data
- [qa-checklist.md](qa-checklist.md) — required checks

## Architecture Spec
`.claude/architecture/templates/DetailsPageTemplate.md`

## Related Decisions
- DEC-004 — Timeout = unknown-outcome
- DEC-007 — Focus restoration after dialogs
- DEC-016 — Account creation = FullScreenWizardTemplate (not this template)
