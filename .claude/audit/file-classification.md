# `.claude` File Classification

**Audit Date:** 2026-06-22
**Total files:** 163

Categories:
- **P** = Policy
- **D** = Documentation
- **M** = Memory / Architecture registry
- **T** = Active Template (spec or skill)
- **A** = Active Agent
- **SK** = Active Skill
- **C** = Active Command
- **Q** = Quality / Learning
- **G** = Global UI Standard
- **TL** = Tool
- **CF** = Configuration
- **L** = Legacy candidate

---

## Root Files

| File | Category | Notes | Issues |
|---|---|---|---|
| `CLAUDE.md` | P+M | Entry point: rules, governance, workflow routing | Rules should be extracted to /policies/ in C2 |
| `AGENTS.md` | D+M | Agent index, routing table, workflow structure | Long — C2 should slim to index only |

---

## `.claude/policies/`

| File | Category | Notes | Issues |
|---|---|---|---|
| `page-creation-policy.md` | P | Screenshot context + open task management | Active |
| `ux-component-standards.md` | P | DS component standards (accordion → buttons) | Active — M (modified, uncommitted in git) |

**Gap:** 15 additional policy files needed (C2 task). Current rules are embedded in CLAUDE.md.

---

## `.claude/architecture/`

| File | Category | Notes | Issues |
|---|---|---|---|
| `template-registry.md` | M | Central template detection matrix + all template entries | 5 broken spec refs |
| `component-registry.md` | M | Known shared components and candidates | Active |
| `data-contract-registry.md` | M | Known types and API contracts | Active |
| `feature-api-registry.md` | M | Feature-level API shapes | Active |
| `shared-patterns.md` | M | Patterns under consideration | Active |
| `design-system-package-registry.md` | M | DS packages and versions | Active |
| `project-tools-registry.md` | M | Project tools | Active |
| `design-system-exceptions.md` | M | Approved temporary DS exceptions (empty) | Active |
| `localization-exceptions.md` | M | Localization exceptions | Active |
| `mock-data-exceptions.md` | M | Mock data exceptions | Active |

---

## `.claude/architecture/templates/` — Spec Files

| File | Category | Notes | Issues |
|---|---|---|---|
| `FullScreenWizardTemplate.md` | T | Full spec, reference format | Active ✓ |
| `FullScreenFormTemplate.md` | T | Full spec | Active ✓ |
| `VerticalTabsConfigurationTemplate.md` | T | Full spec | Active ✓ |
| `FatlinesListMasterDetailsTemplate.md` | T | Full spec | Active ✓ |
| `TableFiltersTemplate.md` | T | Full spec | Active ✓ |
| `WizardTemplate.md` | T | Full spec | Active ✓ |
| `HalfDashboardTemplate.md` | T | Full spec | Active ✓ |
| `CardListMasterDetailsTemplate.md` | — | **MISSING** | ⚠ Referenced in registry — spec does not exist |
| `TableMasterDetailsTemplate.md` | — | **MISSING** | ⚠ Referenced in registry — spec does not exist |
| `TilesDashboardTemplate.md` | — | **MISSING** | ⚠ Referenced in registry as "Specified" — spec does not exist |
| `CanvasTemplate.md` | — | **MISSING** | ⚠ Referenced in registry as "Specified" — spec does not exist |
| `ZeroStateConfigurationTemplate.md` | — | **MISSING** | ⚠ Referenced in registry as "Specified" — spec does not exist |

---

## `.claude/architecture/decisions/`

| File | Category | Notes | Issues |
|---|---|---|---|
| `ADR-001.md` | M | SVG-only icon system | Active |
| `ADR-002.md` | M | SCSS token system | Active |
| `DS-GAP-001.md` | M | DS Gap — Risk Status Icon | Active |
| `DS-GAP-002.md` | M | DS Gap — Risk Chart | Active |
| `INVESTIGATION-ScansPage.md` | M | ScansPage investigation | Active |

## `.claude/architecture/user-decision-memory/`

| File | Category | Notes | Issues |
|---|---|---|---|
| `decision-registry.md` | M | 16 active decisions (DEC-001 to DEC-016) | Active |
| `decision-history.md` | M | Historical decision log | Active |
| `conflicts/README.md` | M | Conflict registry (empty) | Active |
| `decisions/accessibility/focus-restoration.md` | M | DEC-007 | Active |
| `decisions/annotation/inspect-mode-explicit.md` | M | DEC-015 | Active |
| `decisions/annotation/review-mode-external.md` | M | DEC-014 | Active |
| `decisions/backend/timeout-unknown-outcome.md` | M | DEC-004 | Active |
| `decisions/data/mock-data-centralized.md` | M | DEC-006 | Active |
| `decisions/data/soft-delete-audit.md` | M | DEC-003 | Active |
| `decisions/design-system/ds-consume-only.md` | M | DEC-009 | Active |
| `decisions/design-system/no-silent-fallback.md` | M | DEC-008 | Active |
| `decisions/frontend/no-inline-styles.md` | M | DEC-011 | Active |
| `decisions/navigation/add-account-wizard-template.md` | M | **DEC-016 — ACTIVE, PROTECTED** | Active ✓ do not archive |
| `deprecated/README.md` | M | Deprecated decisions (empty) | Active |

---

## `.claude/content/`

| File | Category | Notes | Issues |
|---|---|---|---|
| `terminology-registry.md` | D | Approved product terminology | Active |
| `ux-writing-style-guide.md` | D | Voice, tone, grammar | Active |
| `approved-microcopy-patterns.md` | D | Reusable copy blocks | Active |
| `deprecated-terms.md` | D | Retired terminology (empty) | Active |

---

## `.claude/agents/`

All 25 agent files classified as **Active Agent (A)**.

| Agent | File | Status |
|---|---|---|
| workflow-orchestrator-agent | `_core/workflow-orchestrator-agent.md` | Active |
| template-recognition-and-lifecycle-agent | `_core/template-recognition-and-lifecycle-agent.md` | Active |
| skeleton-loading-intelligence-agent | `_core/skeleton-loading-intelligence-agent.md` | Active |
| continuous-improvement-agent | `_core/continuous-improvement-agent.md` | Active |
| shared-architecture-agent | `_core/shared-architecture-agent.md` | Active |
| telemetry-driven-ux-recommendation-agent | `_core/telemetry-driven-ux-recommendation-agent.md` | Active |
| technical-writing-agent | `_core/technical-writing-agent.md` | Active |
| application-shell-navigation-agent | `_core/application-shell-navigation-agent.md` | Active |
| component-mapping-agent | `_core/component-mapping-agent.md` | Active |
| prototype-page-builder-agent | `_core/prototype-page-builder-agent.md` | Active |
| design-system-review-agent | `_core/design-system-review-agent.md` | Active |
| ux-flow-review-agent | `_core/ux-flow-review-agent.md` | Active |
| ux-expert-page-audit-agent | `_core/ux-expert-page-audit-agent.md` | Active |
| code-quality-qa-agent | `_core/code-quality-qa-agent.md` | Active |
| pixel-perfect-component-builder | `_core/pixel-perfect-component-builder.md` | Active |
| figma-mcp-scanner-agent | `_figma/figma-mcp-scanner-agent.md` | Active |
| figma-to-infra-mapping-agent | `_figma/figma-to-infra-mapping-agent.md` | Active |
| figma-navigation-sidebar-extractor-agent | `_figma/figma-navigation-sidebar-extractor-agent.md` | Active |
| figma-design-system-extractor-agent | `_figma/figma-design-system-extractor-agent.md` | Active |
| figma-alignment-agent | `_figma/figma-alignment-agent.md` | Active |
| infra-component-detection-agent | `_infra/infra-component-detection-agent.md` | Active |
| state-builder-agent | `_infra/state-builder-agent.md` | Active |
| navigation-integration-agent | `_infra/navigation-integration-agent.md` | Active |
| prototype-documentation-agent | `_documentation/prototype-documentation-agent.md` | Active |
| README.md | agents/README.md | Active (index) |

---

## `.claude/skills/`

All 35+ skill files classified as **Active Skill (SK)**.

**Core skills (13):** auto-workflow-routing, template-recognition-and-lifecycle, skeleton-loading-intelligence, continuous-quality-learning, shared-component-and-data-architecture, telemetry-driven-ux-optimization, ux-content-alignment, template-ingestion, application-shell-navigation, component-mapping, design-system-review, ux-flow-validation, code-quality-qa — all Active

**Template skills (8):** table-page-template, table-filters-template, table-master-details-template, card-list-master-details-template, form-page-template, dialog-flow-template (SKILL.md + README.md just created), dashboard-page-template — all Active

**Figma skills (8):** figma-mcp-scan, figma-to-infra-mapping, figma-to-react-page, figma-navigation-sync, figma-token-extraction, figma-alignment-review, figma-project-reference (+ 5 sub-docs) — all Active

**Infra skills (4):** visual-to-infra-mapping, design-system-token-mapping, svg-icon-system, prototype-state-patterns — all Active

**Documentation skills (2):** prototype-documentation, agent-prompts-library — all Active

---

## `.claude/commands/`

All 31 command files classified as **Active Command (C)**.

**UX Flow (5), Build (3), Utilities (20), Templates (7)** — all linked to existing skills and agents.

---

## `.claude/quality/`

All 16 quality files classified as **Quality (Q)** — all active.

---

## `.claude/global-ui-standards/`

All 18 global UI standard files classified as **Global UI Standard (G)** — all active.

---

## `.claude/tools/`

All 14 tool files classified as **Tool (TL)** — all active.

---

## `.claude/project-management/`

| File | Category | Notes | Issues |
|---|---|---|---|
| `open-page-creation-tasks.md` | M | Active page creation tasks tracker | Active |

---

## Summary

| Category | Count | Issues |
|---|---|---|
| All active files | 163 | — |
| Legacy candidates | 0 | — |
| Files with broken refs | 2 | template-registry.md (5 missing specs), dialog-flow-template/README.md (partial from interrupted B) |
| Conflicts | 0 | — |
| Duplicates | 0 | — |
