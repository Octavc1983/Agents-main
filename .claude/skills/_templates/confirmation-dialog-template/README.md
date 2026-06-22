# ConfirmationDialogTemplate — Skill

## Template ID
`confirmation-dialog`

## Status
Approved

## Purpose
Implement explicit confirmation gates for destructive, security-sensitive, or state-reset actions. Ensures users cannot accidentally trigger irreversible operations.

## DS Primitive
`Modal` (size: small) + `Button` (danger variant) from `@idira/design-system`. Both verified available.

## When This Skill Runs
- User requests: "Add confirmation dialog", "Delete confirmation", "Discard warning", "Destructive action confirmation"
- Template detection matches: destructive CTA + cancel + consequence text
- Any destructive bulk action gate
- Dirty close from FormPage, DialogFlow, FullScreenForm, FullScreenWizard

## DEC-016 Check
Not applicable — account creation never uses a confirmation dialog as the primary action.

## Files
- [README.md](README.md) — this file
- [template-contract.md](template-contract.md) — props API, DS dependencies
- [state-model.md](state-model.md) — states and transitions
- [navigation-and-validation.md](navigation-and-validation.md) — close, focus, label rules
- [edge-cases.md](edge-cases.md) — stacked dialogs, read-only triggers, accidental double-confirm
- [qa-checklist.md](qa-checklist.md) — required checks before marking complete

## Architecture Spec
`.claude/architecture/templates/ConfirmationDialogTemplate.md`

## Related Policies
- design-system-policy — DS Modal + DS Button danger variant; no local destructive styling
- no-silent-fallback-policy — if DS cannot support the required destructive pattern, report DS Gap
- accessibility-policy — focus trap, Escape = cancel, focus restoration
- localization-policy — confirm label must be localized and action-specific
