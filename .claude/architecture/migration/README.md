# Migration Architecture Package

This package defines the architecture, state model, navigation rules, validation behavior, mock behavior, and open decisions for the H2P Migration feature.

## Prototype Constraint

This project is a UX prototype with mock data only. No live backend exists.
All state transitions must be simulated with deterministic mock behavior that is production-grade in UX and state accuracy.

## Files

| File | Purpose |
|---|---|
| [configuration-step-context.md](configuration-step-context.md) | Backend task hierarchy, status derivation, DynamoDB schema, task flow |
| [migration-lifecycle.md](migration-lifecycle.md) | Full migration step sequence, step states, lifecycle transitions |
| [migration-state-machine.md](migration-state-machine.md) | Formal state machine: step statuses, task statuses, transition rules |
| [migration-navigation-and-reset-rules.md](migration-navigation-and-reset-rules.md) | Back behavior, step click rules, reset impact, downstream clearing |
| [migration-validation-and-error-model.md](migration-validation-and-error-model.md) | Validation types, error states, timeout handling, retry rules |
| [migration-logs-reports-and-auditability.md](migration-logs-reports-and-auditability.md) | Logs, reports, audit trail — what is safe to show, what is blocked |
| [migration-prototype-mock-behavior.md](migration-prototype-mock-behavior.md) | Mock data contracts, simulated transitions, test scenarios |
| [migration-open-decisions.md](migration-open-decisions.md) | Open UX and architecture decisions requiring product resolution |

## Related Template
`FullScreenWizardTemplate` — `src/prototype-templates/FullScreenWizardTemplate/`

## Related Decision
DEC-016 — H2P Migration uses FullScreenWizardTemplate, not dialog.

## Related DS Gaps
DS-GAP-001 — Risk Status Icon semantic mapping
DS-GAP-002 — Risk Chart semantic token API
