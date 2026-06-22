# Claude UX/UI MCP Workflow System

This project uses a structured Claude Code workflow system for UX/UI prototyping with Figma MCP, React, SCSS, and the existing Infra / Design System.

```text
Commands = User-facing slash commands  — what you run
Agents   = Specialist roles            — who does the work
Skills   = Reusable playbooks          — how the work is done
```

All files are in `.claude/`.

---

## Automatic Workflow Routing

**Natural language first. Slash commands are optional.**

When a user makes a UX/UI request, Claude must:
1. Inspect the user's message, attached screenshots, Figma links, page names, routes, and file references.
2. Detect the likely workflow automatically.
3. Select the smallest safe internal workflow.
4. Ask only for missing critical information.

Never ask: "Which command do you want to run?" / "Please use /ux-add-page." / "Please run /map-components first."

Routing owner: `.claude/agents/_core/workflow-orchestrator-agent.md`
Routing skill: `.claude/skills/_core/auto-workflow-routing/SKILL.md`

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

Screenshot + build/create → Create New Page. Screenshot + fix/edit → Edit Existing Page.

---

## Entry Points

| Command | Purpose |
|---|---|
| `/ux-add-page` | Create a new prototype page from scratch |
| `/ux-edit-page` | Edit an existing page based on feedback |
| `/ux-add-flow-to-page` | Add an interaction flow to an existing page |
| `/ux-review-page` | Review for UX, DS compliance, Figma alignment, state coverage |
| `/ux-fix-generated-page` | Fix a page Claude generated incorrectly |

Full command index: [`.claude/commands/README.md`](.claude/commands/README.md)

---

## Workflow Pipeline

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

---

## Active Agents

Full index: [`.claude/agents/README.md`](.claude/agents/README.md)

### `_core/` — Core Workflow Agents

| Agent | Role | When it runs | May NOT modify |
|---|---|---|---|
| `workflow-orchestrator-agent` | Top-level router | On every request | src/, AppShell, DS |
| `template-recognition-and-lifecycle-agent` | Template detection | Before every implementation | src/ until detection complete |
| `prototype-page-builder-agent` | Creates and refactors prototype pages | After component mapping | AppShell, Sidebar, Header, Router, DS |
| `component-mapping-agent` | Maps requirements to DS/Infra components | Before code generation | src/ (mapping only) |
| `application-shell-navigation-agent` | Routes and nav wiring | When navigation changes needed | DS internals, unrelated routes |
| `design-system-review-agent` | DS compliance check | After implementation | DS package |
| `ux-flow-review-agent` | UX clarity and state coverage | After implementation | src/ (review only) |
| `ux-expert-page-audit-agent` | Deep UX audit | After review request | src/ (audit only) |
| `code-quality-qa-agent` | Imports, dead code, SCSS, runtime safety | After implementation | Unrelated files |
| `skeleton-loading-intelligence-agent` | Skeleton loading states | After page implementation | DS tokens |
| `shared-architecture-agent` | Detects reuse opportunities | Before component creation | src/ (analysis only) |
| `technical-writing-agent` | Terminology and copy review | Before UX review | src/ (review only) |
| `continuous-improvement-agent` | Learning loop | After review or correction | CLAUDE.md, AGENTS.md without approval |
| `telemetry-driven-ux-recommendation-agent` | Behavioral analysis | When telemetry data exists | src/ (recommendations only) |

### `_figma/` — Figma Agents

| Agent | Role |
|---|---|
| `figma-mcp-scanner-agent` | Reads Figma frame, extracts structure |
| `figma-to-infra-mapping-agent` | Maps Figma output to Infra/DS components and tokens |
| `figma-navigation-sidebar-extractor-agent` | Extracts sidebar nav from Figma |
| `figma-design-system-extractor-agent` | Extracts DS components from Figma |
| `figma-alignment-agent` | Visual gap report: React vs Figma |

### `_infra/` — Infrastructure Agents

| Agent | Role |
|---|---|
| `infra-component-detection-agent` | Detects components and tokens from a screenshot |
| `state-builder-agent` | Adds loading, empty, error, success states |
| `navigation-integration-agent` | Wires pages to router and sidebar |

### `_documentation/` — Documentation Agents

| Agent | Role |
|---|---|
| `prototype-documentation-agent` | PM/UX/R&D review packages |

---

## Active Skills

Full index: [`.claude/skills/README.md`](.claude/skills/README.md)

### `_core/`
- `auto-workflow-routing/` — intent detection and routing
- `template-recognition-and-lifecycle/` — template detection (runs before component mapping)
- `skeleton-loading-intelligence/` — layout-aware skeleton loading (runs after page implementation)
- `continuous-quality-learning/` — learning loop: lesson candidates, regression evals
- `shared-component-and-data-architecture/` — reuse detection
- `telemetry-driven-ux-optimization/` — behavioral signals to recommendations
- `ux-content-alignment/` — terminology and copy alignment (runs before UX review)
- `template-ingestion/` — converts screenshots/Figma to registered template specs
- `application-shell-navigation/` — route and nav wiring
- `component-mapping/` — requirement-to-component mapping
- `design-system-review/` — DS compliance
- `ux-flow-validation/` — UX flow review
- `code-quality-qa/` — QA, dead code, SCSS, runtime safety

### `_figma/`
- `figma-mcp-scan/` — Figma frame extraction
- `figma-to-infra-mapping/` — Figma → Infra/DS mapping
- `figma-to-react-page/` — Figma → React page build
- `figma-navigation-sync/` — Figma sidebar → project nav
- `figma-token-extraction/` — Figma variables → SCSS tokens
- `figma-alignment-review/` — Pixel Perfect gap report

### `_templates/` — Page Composition Template Skills
- `table-page-template/` — full-width table, 4 states
- `table-filters-template/` — table + search + filter panel + chips
- `table-master-details-template/` — table → row click → details panel
- `card-list-master-details-template/` — card list + details panel
- `form-page-template/` — create / edit / settings / wizard form
- `dialog-flow-template/` — confirmation / form / multi-step dialog
- `dashboard-page-template/` — metric cards, summary sections

### `_infra/`
- `visual-to-infra-mapping/` — screenshot → component mapping
- `design-system-token-mapping/` — style values → SCSS tokens
- `svg-icon-system/` — SVG-only inline icon rules
- `prototype-state-patterns/` — state management patterns

---

## Project File Structure

```text
.claude/
  commands/          user-facing slash commands
  agents/            specialist role definitions
  skills/            reusable implementation playbooks
  policies/          mandatory enforcement rules
  architecture/      registries, templates, decisions, migration, global-ui-standards
  content/           terminology, style guide, microcopy, deprecated terms
  quality/           lessons, evals, reports
  audit/             C1 audit reports
```

---

## Core Rules

See full enforcement rules in `.claude/policies/`.

```text
- Intake first — every command requires intake before executing
- Inspect before mapping — inspect the project before recommending components
- Reuse before creation — DS → shared → template → type → contract → local
- Gaps over invention — report DS Gap; do not invent local substitute
- No inline styles — all styles must use existing SCSS tokens
- SVG icons only — no icon libraries, PNG, emoji, or icon fonts
- AppShell preserved — never replace AppShell, Sidebar, Header, or Router
- No debug UI — state controls are code constants, not visible buttons
- Stop after mapping — mapping commands stop before implementation
- No Pixel Perfect claims without a gap report
- Terminology first — check registry and deprecated terms before any user-facing text
- Mock data only — no live backend; no simulated behavior presented as real integration
- Prototype constraint — communicate mock behavior clearly in implementation notes
```
