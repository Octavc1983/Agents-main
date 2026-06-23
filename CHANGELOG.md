# Changelog

Versioning: `V MAJOR.FEATURE.FIX.PATCH`
- MAJOR — large initiative or architecture boundary
- FEATURE — new page, domain, or shared capability
- FIX — targeted bug fix or policy correction
- PATCH — micro-correction, typo, config

When MAJOR increments, all logs for the previous MAJOR version are removed.

---

## V5.1.0.0 — 2026-06-23 — Phase A–D Cleanup: Shared Infrastructure

### A1 · ModalProvider semantic tokens
- Removed `TONE_COLORS` hardcoded hex map
- Replaced inline `style={{ color, display, padding }}` with SCSS class `.modal-notice-icon--{tone}`
- Token mapping: `info→$color-btn-primary-idle`, `success→$color-status-success`, `warning→$color-status-warning`, `destructive→$color-status-error`
- `neutral` mapped to `info` treatment — DS-GAP-004 recorded

### A2 · Shared provider icons
- Extracted AWS / Azure / GCP / HashiCorp / CyberArk SVG brand marks from `SecretsPage` and `BriefingBar` (were duplicated)
- Moved to `src/components/shared/provider-icons/` (4-file split: component, types, config, barrel)
- Both consumers now import from shared location

### A2 · BriefingBar pre-existing bug
- Fixed `overflowProviders` → `overflowEnriched` (3 references; variable was undefined, caused runtime error)

### B · `usePopoverPosition` hook
- Created `src/components/shared/hooks/usePopoverPosition.ts`
- API: `usePopoverPosition(opts, width, maxHeight)` + exported `computePopoverPosition` for pre-computed DOMRect callers
- Owns: trigger geometry, viewport clamping, placement fallback (flip), scroll + resize recalculation
- Does NOT own: open state, portal rendering, focus, click-outside
- Migrated 4 consumers: `ManagedAccountsPage` (TagsCell + RowActionsMenu), `SecretsPage` (TagsCell), `BriefingBar` (OverflowPopover), `EntityPickerPopover`

### C · Tags domain — Local Backend
- Created full CRUD service: `tag.repository`, `tag.service`, `tag.validation`, `tag.mapper`, `tag.relations`
- OOB tags (`source: 'oob'`) are protected — cannot be edited or removed
- Tag deletion validates zero dependent accounts before proceeding
- `LocalDatabaseStore.tags` upgraded from `TagCatalogEntry[]` to `TagEntity[]` (versioned + soft-deletable); seed loader injects defaults
- `useTags` hook: `tags`, `suggestions`, `isLoading`, `error`, `refetch`
- `accountService.getTagSuggestions()` removed; `useManagedAccounts` now calls `tagService.getSuggestions()`

### D · Legacy mock deletion
- Import audit: zero active references confirmed
- Deleted: `abTestingMockData`, `accountMockData`, `prototypeMockData`, `scansMockData`, `confirmationDialogFixtures`, `managedAccountsMockData`, `tagsMockData`

### Quality gates
- `tsc --noEmit` — 0 errors
- ESLint (changed files) — 0 errors
- Build failures — all pre-existing (ModalProvider ghost variant, RuleBuilderPage, AnnotationPanel, DS stories)

---

## V5.0.0.0 — 2026-06-22 — Local Backend Foundation + Accounts Migration

### Infrastructure
- Created `src/local-backend/` — JSON seed data, `LocalDatabaseStore`, repositories, services, safety kernel, event bus
- 13-step CRUD safety pipeline: permission guard → validation → relations → version check → idempotency → transaction → audit → domain event
- `AccountEntity` (stored, FK IDs) vs `ManagedAccount` (view model, resolved labels + derived risk)
- `account.mapper.ts` owns all FK→label resolution and risk derivation
- Safety kernel: `transaction.runner`, `idempotency.guard`, `concurrency.guard`, `permission.guard`, `audit.service`
- Event bus: `localDatabaseEvents` (typed `account:created|updated|deleted|tags-updated`)

### ManagedAccountsPage migration
- Removed `managedAccountsMock` and `MOCK_TAG_SUGGESTIONS`
- Wired to `useManagedAccounts` hook (accounts, tagSuggestions, isLoading, CRUD actions)
- ManageTagsDialog resolves tag IDs via catalog match
- CreateManagedAccountWizard calls `accountService.create()` on final step

### Seed data
- 30 accounts, 9 safes, 5 organizations, 15 users, 29 tag catalog entries
- All stored with FK IDs only — no duplicate label strings

---

## V1–V4 Summary (archived)

| Version | Shipped | Key deliverables |
|---|---|---|
| V4.x | 2026-06-22 | RuleCenterPage, RuleBuilderPage, HalfDashboardTemplate |
| V3.x | 2026-06-22 | SecretsPage + BriefingBar, FatlinesListMasterDetails, dark/light theme, ScansPage |
| V2.x | 2026-06-21 | ManagedAccountsPage, RiskManagementPage, SessionDiagnosticsPage, MigrationsPage |
| V1.x | 2026-06-20 | AppShell, Sidebar (dark navy theme), Router, design system wiring, SVG icon system |
