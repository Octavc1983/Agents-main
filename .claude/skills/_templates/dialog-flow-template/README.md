# DialogFlowTemplate — Skill

## Template ID
`dialog-flow`

## Status
Approved

## Purpose
Define and implement focused multi-step dialog flows that do not justify replacing Main Content.
Covers: single-step forms, 2–4 step guided flows, upload flows, small integrations, connector selection, configuration subsets.

## DS Primitive
`Modal` from `@idira/design-system` — required base.
`Stepper` from `@idira/design-system` — optional, for step indicator when steps > 1.

## When This Skill Runs
- User requests: "Add dialog", "Create a form dialog", "Multi-step dialog", "Upload dialog", "Select connector dialog"
- Template detection matches: overlay + constrained surface + focused scope

## DEC-016 Mandatory Check
Before using DialogFlowTemplate, verify the flow is NOT:
- Add Account / Create Account / Onboard Account → those must use FullScreenWizardTemplate (DEC-016)
- Any flow with backend operations, connector binding, credential configuration, or irreversible stages → use FullScreenWizardTemplate
- Any flow too long or complex for a dialog → use FullScreenWizardTemplate

## Files
- [README.md](README.md) — this file
- [template-contract.md](template-contract.md) — props API, DS dependencies, layout structure
- [state-model.md](state-model.md) — all required states and transitions
- [navigation-and-validation.md](navigation-and-validation.md) — step navigation, validation behavior
- [edge-cases.md](edge-cases.md) — dirty close, back with unsaved data, backend failure, timeout
- [qa-checklist.md](qa-checklist.md) — required checks before marking implementation complete

## Architecture Spec
`.claude/architecture/templates/DialogFlowTemplate.md`

## Related Policies
- design-system-policy — DS Modal must be used; no custom dialog primitives
- no-silent-fallback-policy — if DS Modal cannot support required behavior, report DS Gap
- validation-and-error-policy — inline field errors; backend error → dialog-level error
- scrolling-and-layout-policy — dialog body owns scroll; header and footer are fixed
- localization-policy — all labels and copy must use localization keys
- accessibility-policy — focus trap, Escape close, focus restoration on close

## Related Decisions
- DEC-001 — Disable duplicate submission during save
- DEC-004 — Timeout = unknown-outcome, not failed
- DEC-007 — Focus restoration after dialog closes
- DEC-016 — Add Account uses FullScreenWizardTemplate, not dialog
