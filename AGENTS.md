# Claude UX/UI MCP Workflow System

This project uses a structured Claude Code workflow system for UX/UI prototyping with Figma MCP, React, SCSS, and the existing Infra / Design System.

The system has three layers:

```text
Commands = User-facing slash commands  — what you run
Agents   = Specialist roles            — who does the work
Skills   = Reusable playbooks          — how the work is done
```

All files are in `.claude/`.

---

## Automatic Workflow Routing

**Natural language first. Slash commands are optional helpers, not required entry points.**

When a user makes a UX/UI request, Claude must:

1. Inspect the user's message, attached screenshots, Figma links, page names, routes, and file references.
2. Detect the likely workflow automatically.
3. Select the smallest safe internal workflow.
4. Ask only for missing critical information.
5. Continue with the selected workflow.
6. Preserve the existing AppShell, Sidebar, Header, Router, Infra, Design System, tokens, and SVG icon system.

Claude must never ask:
```text
Which command do you want to run?
Please use /ux-add-page.
Please run /map-components first.
```

The internal routing owner is `.claude/agents/_core/workflow-orchestrator-agent.md`.
The routing methodology is `.claude/skills/_core/auto-workflow-routing/SKILL.md`.

### Routing Table

| User Intent | Common Signals | Workflow |
|---|---|---|
| Create a page | build, create, generate, implement, recreate, pixel perfect | Create New Page |
| Edit a page | fix, edit, update, refine, correct, improve | Edit Existing Page |
| Add an interaction | add flow, add filters, add search, add dialog, add tabs | Add Flow to Existing Page |
| UX review | review, audit, edge cases, what is wrong, usability | UX Audit |
| QA / cleanup | imports, dead code, SCSS, telemetry, exceptions, runtime, build | QA Code Review |
| Navigation | sidebar, menu, navigation, route, AppShell, active item | Navigation Workflow |
| Template | table template, master details, form, dialog, dashboard | Page Composition Template |
| Figma | Figma link, frame, tokens, alignment, sync | Figma Workflow |

### Image and Screenshot Rules

If a screenshot is attached and the user says build / create / generate / implement / recreate / pixel perfect → **Create New Page**.

If a screenshot is attached and the user says fix / edit / update / refine / correct / improve → **Edit Existing Page**.

### Missing Information Rule

When critical fields are missing, Claude must identify the workflow first, then respond:

```markdown
### Missing Required Information

I identified this request as: [WORKFLOW_TYPE]

Before I continue, please fill the missing fields below:

[ONLY MISSING REQUIRED FIELDS]

### Why I'm Asking
I already identified the correct workflow. I need this to continue safely without guessing or modifying the wrong files.
```

---

## Entry Points

**Natural language** is now the recommended entry point. Describe what you want and Claude will route automatically.

**Slash commands** are still available as optional helpers for focused or repeatable tasks.

| Command | Purpose |
|---|---|
| `/ux-add-page` | Create a new prototype page from scratch |
| `/ux-edit-page` | Edit an existing page based on feedback |
| `/ux-add-flow-to-page` | Add an interaction flow to an existing page |
| `/ux-review-page` | Review for UX, DS compliance, Figma alignment, state coverage |
| `/ux-fix-generated-page` | Fix a page Claude generated incorrectly |

Utility and template commands are still available for focused tasks — see [`.claude/commands/README.md`](.claude/commands/README.md).

---

## Typical UX Workflow

```
/ux-add-page             → create the page
/ux-add-flow-to-page     → add details panel, dialog, filters
/ux-review-page          → UX + DS review before sharing
/ux-edit-page            → apply review feedback
```

### Starting from Figma

```
/ux-add-page  (with Figma source)
  └── /figma-scan → /figma-map-components → template → /connect-navigation → /review-design-system
```

### Starting without Figma

```
/ux-add-page  (with requirement only)
  └── /map-components → template → /connect-navigation → /add-states → /review-ux-flow
```

---

## Structure

```
.claude/
  commands/
    README.md
    ux-add-page.md
    ux-edit-page.md
    ux-add-flow-to-page.md
    ux-review-page.md
    ux-fix-generated-page.md
    build-component-from-image.md
    figma-reference.md
    _utilities/        figma, mapping, review, QA, setup commands
    _templates/        page creation commands

  agents/
    README.md
    _core/             router, learning, architecture, telemetry, navigation, page-builder, DS review, UX review
    _figma/            Figma scanning, mapping, alignment, extraction
    _infra/            component detection, states, navigation integration
    _documentation/    PM / UX / R&D review packages

  skills/
    README.md
    _core/             routing, learning, architecture, telemetry, component mapping, DS review, UX flow, QA
    _figma/            Figma MCP, Figma-to-React, tokens, navigation, alignment
    _templates/        page composition templates (not DS components)
    _infra/            visual mapping, token mapping, SVG icons, state patterns
    _documentation/    review packages, prompt library

  quality/
    lessons/
      lesson-candidates.md   active candidates under review
      approved-lessons.md    promoted and applied lessons
      rejected-lessons.md    rejected candidates with reason
    evals/
      workflow-router-evals.md
      page-build-evals.md
      ux-flow-evals.md
      qa-regression-evals.md
      telemetry-ux-evals.md
    reports/
      latest-qa-report.md
      latest-ux-audit.md
      latest-architecture-review.md

  architecture/
    component-registry.md      known shared components and candidates
    data-contract-registry.md  known shared types and API contracts
    feature-api-registry.md    feature-level API shapes
    shared-patterns.md         patterns identified, not yet extracted
    decisions/
      ADR-001.md               SVG-only icon system
      ADR-002.md               SCSS token system, no inline styles

  content/
    terminology-registry.md    approved product terms and preferred forms
    ux-writing-style-guide.md  voice, tone, grammar, mechanics
    approved-microcopy-patterns.md  reusable approved copy blocks
    deprecated-terms.md        retired terms — must not reappear in UI
```

---

## Agents

Full index: [`.claude/agents/README.md`](.claude/agents/README.md)

### `_core/`
- `workflow-orchestrator-agent.md` — **top-level router**: detects intent from natural language, screenshots, Figma links; selects and delegates to correct workflow automatically
- `template-recognition-and-lifecycle-agent.md` — **template detector**: matches requests and screenshots to existing registered templates, loads template logic automatically, creates Draft Template Candidates when no match exists
- `skeleton-loading-intelligence-agent.md` — **skeleton loading**: generates layout-aware skeleton states matching real page structure, using existing tokens and DS patterns only
- `continuous-improvement-agent.md` — **learning loop**: identifies recurring mistakes, creates evidence-based lesson candidates, adds regression checks, proposes controlled workflow updates
- `shared-architecture-agent.md` — **reuse detector**: finds repeated UI patterns, domain data shapes, duplicated logic, and API contract opportunities; produces safe extraction proposals
- `telemetry-driven-ux-recommendation-agent.md` — **behavioral analysis**: converts approved telemetry into observed/heuristic/experiment recommendations with confidence levels, guardrail metrics, and privacy guards
- `technical-writing-agent.md` — **terminology and copy review**: checks all user-facing text against terminology registry, style guide, deprecated terms, and approved microcopy patterns
- `application-shell-navigation-agent.md` — protects AppShell/Router; adds routes and nav safely
- `component-mapping-agent.md` — maps requirements to existing Infra/DS components
- `prototype-page-builder-agent.md` — creates and refactors React prototype pages
- `design-system-review-agent.md` — DS compliance: components, tokens, icons, no inline styles
- `ux-flow-review-agent.md` — UX clarity, state coverage, interaction completeness
- `ux-expert-page-audit-agent.md` — deep UX audit of an existing page: flow, states, edge cases, component misuse; audit only
- `code-quality-qa-agent.md` — import validation, dead code, SCSS, telemetry, runtime safety

### `_figma/`
- `figma-mcp-scanner-agent.md` — reads Figma frame, extracts structure
- `figma-to-infra-mapping-agent.md` — maps Figma output to Infra/DS components and tokens
- `figma-navigation-sidebar-extractor-agent.md` — extracts sidebar nav from Figma
- `figma-design-system-extractor-agent.md` — extracts DS components from Figma
- `figma-alignment-agent.md` — visual gap report: React vs Figma

### `_infra/`
- `infra-component-detection-agent.md` — detects components and tokens from a screenshot
- `state-builder-agent.md` — adds loading, empty, error, success states
- `navigation-integration-agent.md` — wires pages to router and sidebar

### `_documentation/`
- `prototype-documentation-agent.md` — PM/UX/R&D review packages

---

## Skills

Full index: [`.claude/skills/README.md`](.claude/skills/README.md)

### `_core/`
- `auto-workflow-routing/` — **intent detection and routing**: classifies requests, applies image/Figma rules, selects downstream workflow
- `template-recognition-and-lifecycle/` — **template detection**: matches requests and screenshots to the template registry, loads template logic, creates Draft Template Candidates; runs before component mapping
- `skeleton-loading-intelligence/` — **layout-aware skeleton loading**: maps skeleton to real page regions, enforces token-only styling, runs after page implementation
- `continuous-quality-learning/` — **learning loop skill**: evidence threshold, lesson candidate creation, regression evaluation, controlled promotion
- `shared-component-and-data-architecture/` — **reuse detection**: scans for repeated UI, data shapes, adapters, API contracts; maintains architecture registries
- `telemetry-driven-ux-optimization/` — **behavioral signals to recommendations**: pattern detection library, guardrail metrics, privacy guard, experiment backlog
- `ux-content-alignment/` — **terminology and copy alignment**: checks user-facing text against terminology registry, style guide, deprecated terms; runs before UX review
- `template-ingestion/` — **template ingestion**: converts screenshots/Figma to registered reusable template specifications; runs before implementation when a new template is proposed
- `application-shell-navigation/` — route and nav wiring workflow
- `component-mapping/` — requirement-to-component mapping
- `design-system-review/` — DS compliance workflow
- `ux-flow-validation/` — UX flow review workflow
- `code-quality-qa/` — QA, dead code, telemetry, runtime safety workflow

### `_figma/`
- `figma-mcp-scan/` — Figma frame extraction
- `figma-to-infra-mapping/` — Figma → Infra/DS mapping
- `figma-to-react-page/` — Figma → React page build
- `figma-navigation-sync/` — Figma sidebar → project nav
- `figma-token-extraction/` — Figma variables → SCSS tokens
- `figma-alignment-review/` — Pixel Perfect gap report

### `_templates/` — Page Composition Templates

These are not DS components. They assemble existing Infra/DS into reusable page patterns.

- `table-page-template/` — full-width table, 4 states
- `table-filters-template/` — table + search + filter panel + chips
- `table-master-details-template/` — table → row click → details panel
- `card-list-master-details-template/` — 30% card list + 70% details panel
- `form-page-template/` — create / edit / settings / wizard form
- `dialog-flow-template/` — confirmation / form / multi-step dialog
- `dashboard-page-template/` — metric cards, summary sections

### `_infra/`
- `visual-to-infra-mapping/` — screenshot → component mapping
- `design-system-token-mapping/` — style values → SCSS tokens
- `svg-icon-system/` — SVG-only inline icon rules
- `prototype-state-patterns/` — state management patterns

### `_documentation/`
- `prototype-documentation/` — PM/UX/R&D review documentation
- `agent-prompts-library/` — reusable prompt library

---

## Commands

Full index: [`.claude/commands/README.md`](.claude/commands/README.md)

---

## Workflow Intelligence Lifecycle

Every substantial page or flow moves through this pipeline:

```text
Natural Language Request
→ Workflow Router               (auto-workflow-routing + workflow-orchestrator-agent)
→ Template Recognition          (template-recognition-and-lifecycle-agent + skill)
→ Architecture Discovery        (shared-architecture-agent + shared-component-and-data-architecture)
→ Component Mapping             (component-mapping-agent)
→ Implementation or Review      (prototype-page-builder-agent / ux-expert-page-audit-agent)
→ Skeleton Loading States       (skeleton-loading-intelligence-agent + skill)
→ UX Content Alignment          (ux-content-alignment + technical-writing-agent)
→ QA / Runtime Validation       (code-quality-qa-agent + code-quality-qa skill)
→ UX Audit                      (ux-expert-page-audit-agent + ux-flow-review-agent)
→ Telemetry Analysis            (telemetry-driven-ux-recommendation-agent, when data exists)
→ Continuous Learning Review    (continuous-quality-learning + continuous-improvement-agent)
→ Lesson Candidate / Regression (quality/lessons/ + quality/evals/)
```

Registries consulted at every stage:
```text
.claude/architecture/            — component, data, API reuse decisions
.claude/architecture/template-registry.md  — registered templates and detection matrix
.claude/architecture/templates/  — full template specifications
.claude/architecture/template-candidates/  — draft candidates awaiting approval
.claude/content/                 — terminology, style, microcopy, deprecated terms
.claude/quality/                 — lessons, evals, reports
```

---

## Core Rules

These apply across all commands, agents, and skills:

- **Intake first** — every command requires a filled intake form before executing
- **Inspect before mapping** — inspect the project before recommending components
- **Reuse before creation** — existing Infra/DS components are the source of truth
- **Gaps over invention** — if something doesn't exist, report a gap; do not invent it
- **No inline styles** — all styles must use existing SCSS tokens
- **SVG icons only** — no icon libraries, no PNG/JPG/emoji/icon fonts
- **AppShell preserved** — never replace AppShell, Sidebar, Header, or Router
- **No debug UI** — state controls are code constants, not visible buttons
- **Stop after mapping** — mapping commands stop before implementation
- **No Pixel Perfect claims** without a gap report
- **Terminology first** — check terminology-registry and deprecated-terms before finalizing any user-facing text

## Dark Mode Readiness Rule

Every new UI screen, component, template, dialog, wizard, dashboard, table, form, configuration page, loading state, empty state, and error state must be compatible with the Design System dark theme.

Before implementation:
1. Inspect `@idira/design-system` dark-theme tokens and public component APIs.
2. Use semantic Design System tokens only.
3. Do not hardcode light-only colors.
4. Do not add page-local theme values.

When a screenshot or existing screen must be converted: use `convert-screen-to-dark`.

## Card-First Tile Rule

When visual tiles, blocks, widgets, KPI panels, or repeated content surfaces are detected, always inspect and reuse the existing Design System Card component before creating any local container or component.

## DS Components Are Consume-Only

Existing `@idira/design-system` components must be consumed through public APIs only. Do not visually override, recolor, restyle, or mutate Design System components from application code.

## No Silent Fallback Rule

When an approved DS component, token, icon, mock-data contract, localization key, or state pattern is missing, stop and report a structured gap. Do not invent a local replacement.

## Mock Data Rule

Mock data must be typed, centralized, reusable, domain-specific, and stored outside page/component JSX. Never inside the Design System package.

## Localization Rule

All user-facing copy must use the approved localization system. Do not hardcode user-facing copy in JSX, TSX, templates, dialogs, forms, or navigation.

## Minimal Layer Rule

Use the smallest valid DOM, component, state, and styling structure. No speculative abstractions. No wrapper-only styling. No DS component restyling through wrappers.

## Screenshot Navigation Sync Rule

When a navigation screenshot or Figma reference contains an item missing from `spacesRegistry`, add it in the exact detected Space, hierarchy level, item type, and sibling position.

Do not append blindly, flatten hierarchy, or place items in another Space.

Infer routes only from proven sibling route patterns. Otherwise mark as route-pending and report.

## Existing Page Protection

When a requested page already exists, do not create or regenerate it.

Inspect the current page first. Provide a delta report. Wait for user approval. Apply only the approved delta. Preserve all unrelated logic, routes, navigation, DS usage, and state behavior.
