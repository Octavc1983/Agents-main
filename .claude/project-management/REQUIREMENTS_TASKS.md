# Requirements & Task Backlog

_Canonical open-task audit. Updated every time a task is requested or completed._

## Units

**AI Time:** S = 15–30 min · M = 45–90 min · L = 2–4 hr · XL = 4–8 hr (multi-session)

**Token estimate** = approximate output tokens per task (input context not counted).
Token bands: ~5k · ~15k · ~30k · ~60k · ~120k+

**Priority:**
- P0 — Broken / blocks users or other tasks
- P1 — High value, unblocking, near-term
- P2 — Important, planned next sprint
- P3 — Valuable, deferrable
- P4 — Nice to have / polish

---

## NAV · Navigation

### NAV-001 · Wire ScansPage to router
_Requested: 2026-06-23 · P1 · S · ~5k tokens_

| Sub | Task |
|---|---|
| NAV-001-1 | Add `{ path: '/manage/scans', element: <ScansPage /> }` to router.tsx |
| NAV-001-2 | Verify active sidebar item highlights correctly on `/manage/scans` |

**Status:** Open

---

### NAV-002 · Fix CP Applications hardcoded path
_Requested: 2026-06-23 · P1 · S · ~5k tokens_

| Sub | Task |
|---|---|
| NAV-002-1 | Identify correct destination route for CP Applications |
| NAV-002-2 | Update `navConfig.ts` — replace `/manage/inventory/identities/users` with correct path |

**Status:** Blocked — need correct path from product

---

### NAV-003 · Define route → page mapping
_Requested: 2026-06-23 · P1 · M · ~15k tokens_

| Sub | Task |
|---|---|
| NAV-003-1 | Audit all 100+ navConfig routes against router.tsx |
| NAV-003-2 | Classify each route: has real page / needs page / stays ComingSoonPage |
| NAV-003-3 | Produce approved mapping table |
| NAV-003-4 | Document in project-management |

**Status:** Open — product decision required

---

### NAV-004 · Verify active highlight for all routes
_Requested: 2026-06-23 · P2 · S · ~8k tokens_

| Sub | Task |
|---|---|
| NAV-004-1 | Walk each implemented route, verify `resolveActiveNavigationState` returns correct space + item |
| NAV-004-2 | Fix any mismatches in navConfig path definitions |

**Status:** Open

---

## INV · Inventory — Means of Access

### INV-002 · DiscoveredAccountsPage
_Requested: 2026-06-22 · P2 · L · ~40k tokens_

| Sub | Task |
|---|---|
| INV-002-1 | Define entity fields with product: name, platform, address, safe, discovery date, status, risk |
| INV-002-2 | Create `DiscoveredAccount` type in `prototype.types.ts` |
| INV-002-3 | Create `discoveredAccountsMock.ts` seed data (20 rows) |
| INV-002-4 | Build `DiscoveredAccountsPage` using `FatlinesListMasterDetailsTemplate` |
| INV-002-5 | Add filter groups: platform, status, risk, safe |
| INV-002-6 | Wire `StatusIcon` and `SeverityBadge` columns |
| INV-002-7 | Add route to `router.tsx` |
| INV-002-8 | Verify active nav highlight |

**Status:** Open — awaiting field approval

---

### INV-003 · CloudServiceEntitlementsPage
_Requested: 2026-06-22 · P2 · L · ~40k tokens_

| Sub | Task |
|---|---|
| INV-003-1 | Define entity fields: entitlement, provider, account, permissions, risk, last used |
| INV-003-2 | Create `CloudServiceEntitlement` type |
| INV-003-3 | Create mock seed data (20 rows) |
| INV-003-4 | Build page using `TableFiltersTemplate` |
| INV-003-5 | Wire provider icons (AWS/Azure/GCP) from shared provider-icons |
| INV-003-6 | Add filter groups: provider, risk |
| INV-003-7 | Add route to `router.tsx` |

**Status:** Open — awaiting field approval

---

## ID · Inventory — Identities

### ID-001 · UsersPage
_Requested: 2026-06-22 · P2 · L · ~35k tokens_

| Sub | Task |
|---|---|
| ID-001-1 | Define fields: username, type, org, status, risk, last login |
| ID-001-2 | Create `IdentityUser` type |
| ID-001-3 | Create mock seed (20 rows) |
| ID-001-4 | Build page — `FatlinesListMasterDetailsTemplate` |
| ID-001-5 | Filters: type, org, status, risk |
| ID-001-6 | Add route |

**Status:** Open

---

### ID-002 · RolesPage
_Requested: 2026-06-22 · P3 · L · ~30k tokens_

| Sub | Task |
|---|---|
| ID-002-1 | Define fields: role name, scope, members count, permissions, risk |
| ID-002-2 | Create type + mock (15 rows) |
| ID-002-3 | Build page — `TableFiltersTemplate` |
| ID-002-4 | Add route |

**Status:** Open

---

### ID-003 · OrganizationsPage
_Requested: 2026-06-22 · P3 · M · ~20k tokens_

| Sub | Task |
|---|---|
| ID-003-1 | Define fields: org name, type, members count, risk |
| ID-003-2 | Create type + mock (10 rows) |
| ID-003-3 | Build page — `TableFiltersTemplate` |
| ID-003-4 | Add route |

**Status:** Open

---

### ID-004 · MachineIdentitiesPage
_Requested: 2026-06-22 · P3 · L · ~35k tokens_

| Sub | Task |
|---|---|
| ID-004-1 | Define fields: identity name, type, platform, cert expiry, risk |
| ID-004-2 | Create type + mock (20 rows) |
| ID-004-3 | Build page — `FatlinesListMasterDetailsTemplate` |
| ID-004-4 | Add route |

**Status:** Open

---

## AI · Inventory — AI

### AI-001 · AIAgentsPage
_Requested: 2026-06-22 · P3 · L · ~35k tokens_

| Sub | Task |
|---|---|
| AI-001-1 | Define fields: agent name, type, platform, status, risk |
| AI-001-2 | Create type + mock (15 rows) |
| AI-001-3 | Build page — `FatlinesListMasterDetailsTemplate` |
| AI-001-4 | Add route |

**Status:** Open

---

### AI-002 · ManagedAIAgentsPage
_Requested: 2026-06-22 · P3 · L · ~30k tokens_

| Sub | Task |
|---|---|
| AI-002-1 | Define fields with product |
| AI-002-2 | Create type + mock |
| AI-002-3 | Build page |
| AI-002-4 | Add route |

**Status:** Open — fields TBD

---

### AI-003 · MCPServersPage
_Requested: 2026-06-22 · P3 · L · ~30k tokens_

| Sub | Task |
|---|---|
| AI-003-1 | Define fields with product |
| AI-003-2 | Create type + mock |
| AI-003-3 | Build page |
| AI-003-4 | Add route |

**Status:** Open — fields TBD

---

## TGT · Inventory — Targets

### TGT-001 · ApplicationsPage
_Requested: 2026-06-22 · P3 · L · ~30k tokens_

| Sub | Task |
|---|---|
| TGT-001-1 | Define fields: app name, type, owner, platform, risk |
| TGT-001-2 | Create type + mock (20 rows) |
| TGT-001-3 | Build page — `FatlinesListMasterDetailsTemplate` |
| TGT-001-4 | Add route |

**Status:** Open

---

### TGT-002 · VirtualMachinesPage
_Requested: 2026-06-22 · P3 · L · ~30k tokens_

| Sub | Task |
|---|---|
| TGT-002-1 | Define fields: VM name, OS, address, status, risk |
| TGT-002-2 | Create type + mock (20 rows) |
| TGT-002-3 | Build page — `FatlinesListMasterDetailsTemplate` |
| TGT-002-4 | Add route |

**Status:** Open

---

## BE · Local Backend Migrations

### BE-001 · Secrets domain + SecretsPage migration
_Requested: 2026-06-22 · P1 · L · ~50k tokens_

| Sub | Task |
|---|---|
| BE-001-1 | Create `SecretEntity` in `localDatabase.types.ts` |
| BE-001-2 | Create `database/secrets.json` seed (20 rows with FK IDs) |
| BE-001-3 | Build `src/local-backend/repositories/secret.repository.ts` |
| BE-001-4 | Build `secret.types.ts`, `secret.validation.ts`, `secret.relations.ts`, `secret.mutations.ts` |
| BE-001-5 | Build `secret.mapper.ts` — resolve provider label, status, risk derivation |
| BE-001-6 | Build `secret.service.ts` — list, getById, create, update, remove |
| BE-001-7 | Build `useSecrets.ts` hook |
| BE-001-8 | Migrate `SecretsPage.tsx` — remove `secretsMockData` import, wire `useSecrets` |
| BE-001-9 | Delete `src/mock/secretsMockData.ts` after import audit |
| BE-001-10 | Export from `local-backend/index.ts` |

**Status:** Open — next migration

---

### BE-002 · Sessions domain + SessionDiagnosticsPage migration
_Requested: 2026-06-22 · P2 · M · ~30k tokens_

| Sub | Task |
|---|---|
| BE-002-1 | Create `SessionEntity` type + seed JSON |
| BE-002-2 | Build repository + service (list, getById) |
| BE-002-3 | Build `useSessions` hook |
| BE-002-4 | Migrate `SessionDiagnosticsPage.tsx` |
| BE-002-5 | Delete `sessionDiagnosticsMockData.ts` after audit |

**Status:** Open

---

### BE-003 · Migrations domain + MigrationsPage migration
_Requested: 2026-06-22 · P2 · L · ~40k tokens_

| Sub | Task |
|---|---|
| BE-003-1 | Create `MigrationEntity` type + seed JSON |
| BE-003-2 | Build repository + service (list, getById, status transitions) |
| BE-003-3 | Build `useMigrations` + `useMigrationDetail` hooks |
| BE-003-4 | Migrate `MigrationsPage.tsx` |
| BE-003-5 | Migrate `MigrationDetailPage.tsx` |
| BE-003-6 | Delete both mock files after audit |

**Status:** Open

---

### BE-004 · Rules domain + RuleCenterPage + RuleBuilderPage migration
_Requested: 2026-06-22 · P3 · XL · ~120k tokens_

| Sub | Task |
|---|---|
| BE-004-1 | Design `RuleEntity` schema — graph structure, conditions, actions |
| BE-004-2 | Create seed JSON (5–10 rules) |
| BE-004-3 | Build `rule.repository.ts` |
| BE-004-4 | Build `rule.types.ts`, `rule.validation.ts`, `rule.relations.ts`, `rule.mutations.ts` |
| BE-004-5 | Build `rule.mapper.ts` — rule entity → RuleCenter view model |
| BE-004-6 | Build `rule.service.ts` — list, getById, create, update, publish, archive |
| BE-004-7 | Build `useRules.ts` hook (list) |
| BE-004-8 | Build `useRuleBuilder.ts` hook (single rule CRUD + graph state) |
| BE-004-9 | Fix pre-existing type errors in `RuleBuilderPage.tsx` (4 errors) |
| BE-004-10 | Migrate `RuleCenterPage.tsx` — remove mock imports |
| BE-004-11 | Migrate `RuleBuilderPage.tsx` — remove mock imports, wire persistence |
| BE-004-12 | Delete `ruleCenterMockData.ts` + `ruleBuilderMockData.ts` after audit |

**Status:** Open — most complex migration

---

### BE-005 · Risk domain + RiskManagementPage migration
_Requested: 2026-06-22 · P3 · L · ~45k tokens_

| Sub | Task |
|---|---|
| BE-005-1 | Create `RiskEntity` type + seed JSON (state machine: Open/Resolved/Snoozed/Disabled/Deleted) |
| BE-005-2 | Build `risk.repository.ts` |
| BE-005-3 | Build `risk.service.ts` — list, update status, snooze, reopen |
| BE-005-4 | Build `useRisks.ts` hook |
| BE-005-5 | Migrate `RiskManagementPage.tsx` |

**Status:** Open

---

### BE-006 · System Health domain + SystemHealthPage migration
_Requested: 2026-06-22 · P4 · M · ~25k tokens_

| Sub | Task |
|---|---|
| BE-006-1 | Create `SystemHealthEntity` type + seed JSON |
| BE-006-2 | Build service (read-only list) |
| BE-006-3 | Build `useSystemHealth` hook |
| BE-006-4 | Migrate `SystemHealthPage.tsx` |

**Status:** Open

---

## CQ · Code Quality Fixes

### CQ-001 · RiskManagementPage hex colors
_Requested: 2026-06-23 · P2 · S · ~8k tokens_

| Sub | Task |
|---|---|
| CQ-001-1 | Identify token equivalents for `#F54E85`, `#FFA033`, `#888DFF`, `#C45BE7` |
| CQ-001-2 | Replace 9 hardcoded SVG stroke colors + 1 inline border-color |
| CQ-001-3 | If no token exists → create DS Gap entries |

**Status:** Open

---

### CQ-002 · ModalProvider `ghost` variant type error
_Requested: 2026-06-23 · P1 · S · ~5k tokens_

| Sub | Task |
|---|---|
| CQ-002-1 | Check DS `ButtonVariantAll` type — confirm available variants |
| CQ-002-2 | Replace `ghost` with correct variant or request DS to add it |

**Status:** Open

---

### CQ-003 · ModalProvider `subscribe` return type
_Requested: 2026-06-23 · P1 · S · ~5k tokens_

| Sub | Task |
|---|---|
| CQ-003-1 | Fix `ModalService.subscribe` return type to `() => void` |

**Status:** Open

---

### CQ-004 · RuleBuilderPage type errors (4)
_Requested: 2026-06-23 · P2 · S · ~8k tokens_

| Sub | Task |
|---|---|
| CQ-004-1 | Fix `RefObject<HTMLButtonElement | null>` → `RefObject<HTMLButtonElement>` (3 refs) |
| CQ-004-2 | Fix `ActionBoxStatus` — add `'idle'` to union or replace with correct value |
| CQ-004-3 | Fix `setState` type mismatch on rule name |

**Status:** Open

---

### CQ-005 · RuleCenterPage unused Button import
_Requested: 2026-06-23 · P3 · S · ~2k tokens_

| Sub | Task |
|---|---|
| CQ-005-1 | Remove unused `Button` import from `RuleCenterPage.tsx:3` |

**Status:** Open

---

### CQ-006 · AnnotationPanel unused variable
_Requested: 2026-06-23 · P3 · S · ~2k tokens_

| Sub | Task |
|---|---|
| CQ-006-1 | Remove or use `setPendingPin` in `AnnotationPanel.tsx:33` |

**Status:** Open

---

## DS · Design System Gap Requests

| ID | Gap | Requested | Priority | Est. Tokens | Status |
|---|---|---|---|---|---|
| DS-GAP-001 | Risk Status Icon semantic mapping | 2026-06-21 | P2 | ~3k | Open — awaiting DS |
| DS-GAP-002 | Risk Chart semantic token API | 2026-06-21 | P2 | ~3k | Open — awaiting DS |
| DS-GAP-003 | DS Stepper compatibility with Modal header | 2026-06-22 | P2 | ~5k | Open — needs verification |
| DS-GAP-004 | `$color-notice-accent-neutral` token | 2026-06-23 | P3 | ~3k | Open — workaround active |

---

## COMPLETED (V5.x only)

| ID | Task | Completed | Tokens Used |
|---|---|---|---|
| Phase A1 | ModalProvider semantic token migration | 2026-06-23 | ~12k |
| Phase A2 | Shared provider icons + BriefingBar bug fix | 2026-06-23 | ~10k |
| Phase B | usePopoverPosition hook + 4 consumers migrated | 2026-06-23 | ~20k |
| Phase C | Tags domain (repo, service, validation, mapper, relations, hook, store) | 2026-06-23 | ~30k |
| Phase D | Import audit + 7 legacy mock files deleted | 2026-06-23 | ~5k |
| BE-000 | Local Backend foundation + Accounts domain + ManagedAccountsPage | 2026-06-22 | ~120k |
| INV-001 | SecretsPage | 2026-06-22 | ~50k |

---

## PRIORITY SUMMARY

| Priority | Open Tasks | Sub-tasks | Est. AI Time | Est. Tokens |
|---|---|---|---|---|
| P0 | 0 | 0 | — | — |
| P1 | 5 | 14 | ~3–5 hr | ~70k |
| P2 | 10 | 38 | ~10–18 hr | ~300k |
| P3 | 12 | 46 | ~12–20 hr | ~370k |
| P4 | 2 | 4 | ~1–2 hr | ~25k |
| **Total** | **29** | **102** | **~26–45 hr** | **~765k** |
