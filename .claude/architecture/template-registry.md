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
| Cards/list left, details right, 30/70 split | CardListMasterDetailsTemplate | Vertical cards, selected item, details panel | Card list, selected state, details states, item switching |
| KPI tiles, widgets, charts, summary metrics | TilesDashboardTemplate | KPI cards, widgets, metric groups | Widget layout, dashboard filters, freshness state, drill-down actions, widget states |
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

**Category:** Multi-Step Wizard / Vertical Stepper / Guided Flow
**Status:** Implemented
**Path:** src/prototype-templates/WizardTemplate/
**Specification:** .claude/architecture/templates/WizardTemplate.md
**Primary User Goal:** Guide users through a sequential multi-step creation or configuration flow with persistent step context
**Best Use Cases:** Create account wizard, onboarding flows, multi-step setup, guided configuration
**Last Reviewed:** 2026-06-21

---

## Candidates (Not Yet Specified)

| Candidate | Evidence | Status |
|---|---|---|
| FormPageTemplate | No existing instances — common form pattern | Candidate |
| ConfigurationFormTemplate | No existing instances — complex settings form | Candidate |
| WizardTemplate | Implemented for CreateManagedAccountWizard | Implemented |
| DialogFlowTemplate | No existing instances — dialogs are page-level | Candidate |
| ConfirmationDialogTemplate | No existing instances — destructive actions anticipated | Candidate |
| BulkStatusDialogTemplate | TableFiltersTemplate Bulk contract describes it | Candidate |
| SettingsPageTemplate | No existing instances | Candidate |
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
