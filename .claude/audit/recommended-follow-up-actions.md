# Recommended Follow-Up Actions

**Audit Date:** 2026-06-22
**Last Updated:** C3 — Final Validation + Delivery Order approved by user

---

## Completed — C1, C2, C3

| ID | Action | Status |
|---|---|---|
| B-01 | Complete `dialog-flow-template/` skill folder | Done ✓ |
| B-02–B-04 | Create Confirmation, BulkStatus, DetailsPage architecture specs + skill folders | Done ✓ |
| B-05 | Register TPL-002 through TPL-005 in template-registry.md | Done ✓ |
| C2 | Create 19 policy files | Done ✓ |
| C2 | Refactor CLAUDE.md and AGENTS.md | Done ✓ |
| C2 | Create 9 migration architecture files | Done ✓ |
| C2 | Create layout specs: FATLINES, FullScreen shared, nav items CSS | Done ✓ |
| C3 | Create 3 missing SKILL.md files | Done ✓ |
| C3 | Verify all broken references resolved | Done ✓ |
| C3 | Final validation gates | All passed ✓ |

---

## Phase 2 — Shared Runtime Templates (approved delivery order)

Build in this order. Each unblocks the next.

| Priority | Template | Blocks |
|---|---|---|
| 1 | `ConfirmationDialogTemplate` — src implementation | Reset-impact, discard changes, destructive actions in all product pages |
| 2 | `FatlinesListMasterDetailsTemplate` — src implementation | DiscoveredAccountsPage, CloudServiceEntitlementsPage |
| 3 | `BulkStatusDialogTemplate` — src implementation | H2P async mock operations, bulk actions, partial success, unknown-outcome simulation |
| 4 | `DialogFlowTemplate` — src implementation | Focused short flows only (NOT Add Account / H2P) |
| 5 | `DetailsPageTemplate` — src implementation | Single-entity detail views |

Guardrails:
- FATLINES desktop layout is horizontal split only — stacked is forbidden
- Main Content owns outer padding 48px 24px — templates must not add outer padding
- ConfirmationDialogTemplate is required by H2P before Phase 3 can begin

---

## Phase 3 — TPL-001 H2P Migration Page

Build H2P after ConfirmationDialogTemplate and BulkStatusDialogTemplate are available.

**Route:** `/setup/migrations/:migrationId`

**Step structure (approved lifecycle — do not flatten):**

```text
Step 0 — Enable Migration
Step 1 — Prepare Environment
Step 2 — Prepare for Migration           ← internal technical sub-steps
Step 3 — Configure Additional Services
Step 4 — Check System Readiness          ← internal technical sub-steps
Step 5 — Migrate Data                    ← internal technical sub-steps
Step 6 — Post-Migration Validations
```

**MVP scope:**
- FullScreenWizardTemplate integration
- Centralized typed migration mock data
- Persisted simulated step state
- Choose Upload Machine
- Test Connectivity simulation
- Warning, failed, succeeded, unknown-outcome states
- Reset-impact ConfirmationDialog
- Simulated logs and reports
- Irreversible Import lock behavior
- No real server, API, authentication, upload, or download

**Architecture files to read before implementation:**
```text
.claude/architecture/migration/README.md
.claude/architecture/migration/migration-lifecycle.md
.claude/architecture/migration/migration-state-machine.md
.claude/architecture/migration/migration-navigation-and-reset-rules.md
.claude/architecture/migration/migration-validation-and-error-model.md
.claude/architecture/migration/migration-prototype-mock-behavior.md
.claude/architecture/migration/migration-open-decisions.md
.claude/architecture/migration/migration-logs-reports-and-auditability.md
.claude/architecture/migration/configuration-step-context.md
```

---

## Phase 4 — Router Pages (approved delivery order)

Build one reference page per template family before generating the rest.

| Order | Page | Template | Note |
|---|---|---|---|
| 1 | `DiscoveredAccountsPage` | FatlinesListMasterDetailsTemplate | Reference implementation |
| 2 | `CloudServiceEntitlementsPage` | FatlinesListMasterDetailsTemplate | Reuse FATLINES contracts |
| 3 | `InventoryPage` | TableFiltersTemplate | Reference implementation |
| 4–9 | `PoliciesPage`, `RulesPage`, `ScansPage`, `ApplicationsAccessReviewPage`, `ThreatDetectionPage`, `SystemActivitiesPage` | By product priority | Only after reference pages approved |

---

## Open Design System Dependencies (active blockers)

| Gap ID | Description |
|---|---|
| DS-GAP-001 | Risk Status Icon semantic mapping |
| DS-GAP-002 | Risk Chart semantic token API |
| DS-GAP-003 | DS Stepper compatibility inside Modal header |
| BulkStatusDialog limitation | Scrollable list only, not virtualized — safe for ~200 items |

---

## Guardrails (permanent)

```text
- Add Account / Create Account / Onboard Account → FullScreenWizardTemplate only (DEC-016)
- H2P → FullScreenWizardTemplate only
- H2P does not use DialogFlowTemplate
- FATLINES desktop layout is horizontal split only
- Main Content owns outer padding: 48px 24px
- All prototype operations use centralized typed mock data + simulated state transitions
- No real backend behavior may be claimed or implemented
- Do not create local DS fallbacks for missing generic capabilities — report DS Gap
```

---

## Protected — Do Not Touch

| Item | Reason |
|---|---|
| DEC-016 and its decision file | Active user-approved decision |
| All 9 implemented template specs | Active and correct |
| All 25 agents | Active and linked correctly |
| All 38 skills | Active and linked correctly |
| All 31 commands | Active and linked correctly |
| `decision-registry.md` DEC-001 through DEC-016 | All active |
