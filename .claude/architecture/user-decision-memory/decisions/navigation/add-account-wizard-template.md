# DEC-016 — Add Account uses FullScreenWizardTemplate

## Status
Active

## Confidence
High

## Category
navigation / template-selection

## Scope
feature — Add Account flow

## Decision

Add Account must use `FullScreenWizardTemplate`, not a dialog (DialogFlowTemplate, WizardTemplate modal, or any dialog-based pattern).

The flow fills the full Main Content area. AppShell, Sidebar, Header, and the active Sidebar selection remain intact.

## Trigger Conditions

Apply automatically when:
- The request is to implement "Add Account", "Create Account", "Onboard Account", or any account creation flow
- A new multi-step account setup flow is requested

Apply with confirmation (Level 2) when:
- A variant of account creation is described that may be scoped to 1–2 fields only
- The request explicitly says "quick add" or "inline add"

## Reason

Account creation is a multi-step process with backend operations, validation dependencies, and potential irreversible stages (e.g. connector binding, credential configuration, permission grants). A dialog does not provide the space, step visibility, or navigation control required.

User explicitly confirmed: "Add account צריך להיות FullScreenWizardTemplate ולא DIALOG"

## Implementation Rules

- Use `FullScreenWizardTemplate` from `src/prototype-templates/FullScreenWizardTemplate/`
- Define steps using `FullScreenWizardStep[]`
- Assign `WizardStepStatus` per step
- Assign `WizardBackBehavior` per step based on whether the step triggers backend mutations
- Steps that bind a connector or write credentials must use `blocked-after-irreversible-action`
- Close action navigates back to the Accounts list (with filter/sort/scroll position preserved where supported)

## Related Decisions

- DEC-004 — Timeout = unknown-outcome, no auto-confirm
- DEC-001 — Disable duplicate submission during save
- DEC-005 — Loading skeleton for data-fetching screens

## Related Templates

- `FullScreenWizardTemplate` — `src/prototype-templates/FullScreenWizardTemplate/`
- `.claude/architecture/templates/FullScreenWizardTemplate.md`

## Approved By
User — 2026-06-22

## History

| Date | Change |
|---|---|
| 2026-06-22 | Created — user explicitly confirmed Add Account = FullScreenWizardTemplate, not dialog |
