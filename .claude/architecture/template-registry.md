# UX/UI Template Registry

## Purpose

This registry is the source of truth for reusable UX/UI Page Composition Templates.

Before creating or editing a screen, Claude must:

1. Inspect the user request, screenshot, Figma frame, route, and existing page context.
2. Match the screen to an existing template when confidence is high.
3. Load the matched template's default layout, state logic, interaction rules, accessibility requirements, telemetry recommendations, QA checks, and Technical Writing rules.
4. Ask only for missing context — primarily navigation impact and presentation type.
5. Create a Draft Template Candidate only when no existing template fits safely.

Templates are not automatically Design System components.
Templates assemble existing AppShell, Infra, DS components, tokens, shared feature components, and shared data contracts.

---

## Status Definitions

| Status | Meaning |
|---|---|
| Specified | Specification produced, awaiting approval |
| Approved | Specification approved, ready for implementation |
| Implemented | Code exists in src/prototype-templates/ |
| Deprecated | Replaced by another template |

---

# Template Detection Decision Matrix

| User Request / Visual Signals | Detected Template | Confidence Signals | Default Included Logic |
|---|---|---|---|
| Table, rows, columns, filters, search, sorting, bulk actions, pagination | TableFiltersTemplate | Table header, filter toolbar, row menu, checkbox selection | Search, filters, chips, result summary, sort, selection, row actions, bulk actions, Bulk Status Dialog, all states |
| Table plus row click opening details | TableMasterDetailsTemplate | Full table default, item selection, details content | Persistent toolbar, table mode, details mode, context preservation, details states |
| Dense entity rows, checkbox, status icon, row click opens details panel, tabbed master details | FatlinesListMasterDetailsTemplate | FATLINES list, row selection, master details panel, summary bar | Column order (checkbox→status→identifiers→risk→actions), virtualization, filter/search preservation, bulk actions, all states |
| Cards/list left, details right, 30/70 split | CardListMasterDetailsTemplate | Vertical cards, selected item, details panel | Card list, selected state, details states, item switching |
| KPI tiles, widgets, charts, summary metrics | TilesDashboardTemplate | KPI cards, widgets, metric groups | Widget layout, dashboard filters, freshness state, drill-down actions, widget states |
| Single card, category tile grid + line chart + KPI sidebar, horizontal 3-column | HalfDashboardTemplate | Category breakdown tiles, time range selector, dark KPI panel | Tile grid with collapsed borders, gradient chart, KPI metric sidebar |
| Canvas, nodes, connections, pan, zoom, minimap | CanvasTemplate | Infinite canvas, nodes, connections, toolbar | Canvas state, zoom/pan, selection, node actions, keyboard shortcuts |
| Zero-state config with vertical tabs, setup CTA | ZeroStateConfigurationTemplate | Side vertical tabs, no configured data, setup CTA | Vertical tabs, zero state, setup guidance, config sections, save/cancel, permission states |
| Form fields, save, validation | FormPageTemplate | Form groups, inputs, validation, actions | Validation, save states, backend errors, unsaved changes, cancel behavior |
| System settings, connection setup, dependent configuration | ConfigurationFormTemplate | Section groups, dependent fields, advanced settings | Section navigation, defaults, dependencies, validation, permissions |
| Multi-step setup, progress, next/previous | WizardTemplate | Stepper, multi-step layout, progress | Step validation, save/resume, back/next/cancel, completion state |
| Modal, dialog, confirmation, overlay | DialogFlowTemplate | Overlay, constrained surface, backdrop | Focus management, close behavior, validation, saving/error states |
| Delete or destructive action confirmation | ConfirmationDialogTemplate | Warning text, destructive CTA, cancel action | Consequence copy, "can't be undone", destructive styling |
| Bulk operation result list | BulkStatusDialogTemplate | Per-item statuses, progress, success/failure summary | Pending/in-progress/success/failure/retry states |
| Settings categories with left nav | SettingsPageTemplate | Vertical settings nav, grouped configuration | Category navigation, unsaved changes, save flow, permissions |
| Single entity details | DetailsPageTemplate | Detail header, metadata, tabs, action toolbar | Details loading/error/empty states, actions, related items |
| Unknown or mixed composition | Draft Template Candidate | Existing templates do not fit safely | Template discovery only, no code until approval |

---

# Registered Templates

## TableFiltersTemplate

**Category:** Table / Search / Filters / Bulk Actions / Row Actions
**Status:** Implemented
**Path:** src/prototype-templates/TableFiltersTemplate/
**Specification:** .claude/architecture/templates/TableFiltersTemplate.md
**Primary User Goal:** Allow users to find, filter, review, and act on a large set of entities
**Best Use Cases:** Scans, Accounts, Findings, Rules, Tags, Risks, Inventory, Users, Policies
**Last Reviewed:** 2026-06-19

---

## CardListMasterDetailsTemplate

**Category:** Card List / Master Details / Split Panel
**Status:** Implemented
**Path:** src/prototype-templates/CardListMasterDetailsTemplate/
**Specification:** .claude/architecture/templates/CardListMasterDetailsTemplate.md
**Primary User Goal:** Allow users to browse a list and view details without losing list context
**Best Use Cases:** Scans (card mode), Accounts, Resources, Findings with rich detail
**Last Reviewed:** 2026-06-19

---

## TableMasterDetailsTemplate

**Category:** Table + Row Click + Details Panel
**Status:** Approved (not yet implemented separately — built by combining TableFiltersTemplate with CardListMasterDetailsTemplate logic at page level)
**Specification:** .claude/architecture/templates/TableMasterDetailsTemplate.md
**Primary User Goal:** Table browsing with persistent details panel on row click
**Best Use Cases:** Scans (table mode with details), Accounts, Findings, Rules
**Last Reviewed:** 2026-06-19

---

## TilesDashboardTemplate

**Category:** KPI Tiles / Charts / Summary Metrics / Dashboard
**Status:** Specified
**Specification:** .claude/architecture/templates/TilesDashboardTemplate.md
**Primary User Goal:** High-level overview of metrics, trends, statuses, and insights
**Best Use Cases:** Risk dashboard, scan health, compliance summary, usage analytics
**Last Reviewed:** 2026-06-19

---

## CanvasTemplate

**Category:** Visual Workspace / Node Graph / Drag-and-Drop Builder
**Status:** Specified
**Specification:** .claude/architecture/templates/CanvasTemplate.md
**Primary User Goal:** Visualize, create, or connect objects in a spatial workspace
**Best Use Cases:** Rule builder, workflow builder, dependency map, topology view
**Last Reviewed:** 2026-06-19

---

## ZeroStateConfigurationTemplate

**Category:** Zero State / Configuration / Vertical Tabs
**Status:** Specified
**Specification:** .claude/architecture/templates/ZeroStateConfigurationTemplate.md
**Primary User Goal:** Guide users through initial feature setup or configuration
**Best Use Cases:** Integration setup, account configuration, policy configuration, connection settings
**Last Reviewed:** 2026-06-19

---

## WizardTemplate

**Category:** Multi-Step Wizard / Modal Dialog / Vertical Stepper
**Status:** Implemented
**Path:** src/prototype-templates/WizardTemplate/
**Specification:** .claude/architecture/templates/WizardTemplate.md
**Primary User Goal:** Guide users through a short sequential multi-step flow in a modal dialog overlay
**Best Use Cases:** Create account (short flows), simple onboarding modals, 2–4 step setup dialogs
**When NOT to use:** Long guided operations, migration flows, processes with backend operations, logs/reports, or irreversible stages → use FullScreenWizardTemplate instead
**Last Reviewed:** 2026-06-22

---

## FullScreenWizardTemplate

**Category:** Full-Screen Wizard / Main Content Replacement / Guided Multi-Step Flow
**Status:** Implemented
**Path:** src/prototype-templates/FullScreenWizardTemplate/
**Specification:** .claude/architecture/templates/FullScreenWizardTemplate.md
**Primary User Goal:** Guide users through a structured multi-step process with dependencies, validation, state persistence, and controlled navigation — filling the Main Content area while AppShell, Sidebar, and Header remain intact
**Best Use Cases:** H2P Migration, tenant onboarding, infrastructure configuration, connector setup, provisioning workflows, data import, security compliance setup — any process that is too complex for a modal dialog
**Step Status Support:** not-started, locked, ready, in-progress, completed, warning, failed, blocked, unknown-outcome, skipped, reset
**Back Behavior:** allowed-no-reset, allowed-with-downstream-reset, allowed-before-lock, blocked-after-irreversible-action, hidden
**Last Reviewed:** 2026-06-22

---

## FatlinesListMasterDetailsTemplate

**Category:** Entity Management / FATLINES List / Master Details / Tabbed Details
**Status:** Approved
**Specification:** .claude/architecture/templates/FatlinesListMasterDetailsTemplate.md
**Primary User Goal:** Scan dense entity records and inspect one entity in full context without losing list position, filters, or bulk selection
**Best Use Cases:** Managed Accounts, Identities, Risk Findings, Policies, Access relationships, any management inventory page requiring both browsing and deep inspection
**Column Order:** Checkbox → 24px Status Icon → Primary Identifier → Metadata → Risk → Actions
**Last Reviewed:** 2026-06-22

---

## HalfDashboardTemplate

**Category:** Half Dashboard / Category Breakdown + Chart + KPI Metrics
**Status:** Implemented
**Path:** src/prototype-templates/HalfDashboardTemplate/
**Specification:** .claude/architecture/templates/HalfDashboardTemplate.md
**Primary User Goal:** Present a compact, data-dense domain summary combining categorical tile grid, time-series chart, and KPI sidebar — all above the fold in a single card
**Best Use Cases:** Risk Management, Compliance Overview, Identity Risk Summary, Scan Health, Coverage Overview
**Last Reviewed:** 2026-06-21

---

## FullScreenFormTemplate

**Category:** Full-Screen Form / Create / Edit / Configuration
**Status:** Implemented
**Path:** src/prototype-templates/FullScreenFormTemplate/
**Specification:** .claude/architecture/templates/FullScreenFormTemplate.md
**Primary User Goal:** Create, edit, or configure a single entity with a fixed header, scrollable form body, and fixed footer — AppShell, Sidebar, and Header remain intact
**Best Use Cases:** Create Managed Account, Edit Account, Create Policy, Integration Setup, Entity Details Edit
**FormState support:** initial, loading, ready, dirty, valid, invalid, submitting, saved, save-failed, warning, blocked, unknown-outcome, read-only
**When NOT to use:** Sequential dependent steps → FullScreenWizardTemplate; Multiple independent sections → VerticalTabsConfigurationTemplate
**Last Reviewed:** 2026-06-22

---

## VerticalTabsConfigurationTemplate

**Category:** Vertical Tabs / Configuration / Multi-Section Administration
**Status:** Implemented
**Path:** src/prototype-templates/VerticalTabsConfigurationTemplate/
**Specification:** .claude/architecture/templates/VerticalTabsConfigurationTemplate.md
**Primary User Goal:** Allow users to freely navigate and edit multiple independent configuration sections with persistent orientation, per-tab state, and flexible save models
**Best Use Cases:** Migration Configuration, Integration Settings, Security Settings, Tenant Configuration, Advanced Settings pages
**Tab Status support:** default, dirty, valid, invalid, saving, saved, warning, failed, blocked, locked, read-only
**Save models:** page-level-save, tab-level-save, auto-save, mixed
**When NOT to use:** Sequential steps with dependencies → FullScreenWizardTemplate
**Last Reviewed:** 2026-06-22

---

## Candidates (Not Yet Specified)

| Candidate | Evidence | Status |
|---|---|---|
| DialogFlowTemplate | No existing instances — dialogs are page-level | Candidate |
| ConfirmationDialogTemplate | No existing instances — destructive actions anticipated | Candidate |
| BulkStatusDialogTemplate | TableFiltersTemplate Bulk contract describes it | Candidate |
| DetailsPageTemplate | No existing instances | Candidate |

---

# Template Candidate Creation Rules

When no existing template fits:

1. Create: `.claude/architecture/template-candidates/[template-name]-candidate.md`

2. Use this structure:
```markdown
# Template Candidate: [Template Name]

## Status
Draft

## Detected From

## Why Existing Templates Do Not Match

## Primary User Goal

## Presentation Type
Full page / nested page / modal / wizard / configuration form / side panel / embedded component

## Navigation Impact

## Layout Pattern

## Interaction Pattern

## Persistent Context Requirements

## Reusable Slots

## Required States

## Data Contract Candidates

## Shared Component Candidates

## Technical Writing Requirements

## Telemetry Candidates

## Accessibility Requirements

## Future Reuse Cases

## Risks and Unknowns

## Recommendation
```

3. Notify the user and wait for approval before generating implementation code.

---

# Governance Rules

- All templates must have a specification in `.claude/architecture/templates/` before implementation
- Status must be updated when a template is implemented or deprecated
- A template may not be promoted to a DS component without architecture review
- New tokens must not be created as part of template implementation
- Template implementation must not include inline styles
- Do not create duplicate templates — check this registry before proposing a new one
