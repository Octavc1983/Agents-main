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

## Recommended Entry Points

**Start with UX Flow Commands.** These manage the full workflow for you.

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
    _utilities/        figma, mapping, review, setup commands
    _templates/        page creation commands
    _archive/          superseded commands

  agents/
    README.md
    _core/             navigation, page-builder, DS review, UX review
    _figma/            Figma scanning, mapping, alignment, extraction
    _infra/            component detection, states, navigation integration
    _documentation/    PM / UX / R&D review packages
    _archive/          deprecated or out-of-scope agents

  skills/
    README.md
    _core/             application shell, component mapping, DS review, UX flow
    _figma/            Figma MCP, Figma-to-React, tokens, navigation, alignment
    _templates/        page composition templates (not DS components)
    _infra/            visual mapping, token mapping, SVG icons, state patterns
    _documentation/    review packages, prompt library
    _archive/          deprecated skills
```

---

## Agents

Full index: [`.claude/agents/README.md`](.claude/agents/README.md)

### `_core/`
- `application-shell-navigation-agent.md` — protects AppShell/Router; adds routes and nav safely
- `component-mapping-agent.md` — maps requirements to existing Infra/DS components
- `prototype-page-builder-agent.md` — creates and refactors React prototype pages
- `design-system-review-agent.md` — DS compliance: components, tokens, icons, no inline styles
- `ux-flow-review-agent.md` — UX clarity, state coverage, interaction completeness
- `ux-expert-page-audit-agent.md` — deep UX audit of an existing page: flow, states, edge cases, component misuse; audit only

### `_figma/`
- `figma-mcp-scanner-agent.md` — reads Figma frame, extracts structure
- `figma-to-infra-mapping-agent.md` — maps Figma output to Infra/DS components and tokens
- `figma-navigation-sidebar-extractor.agent.md` — extracts sidebar nav from Figma
- `figma-design-system-extractor.agent.md` — extracts DS components from Figma
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
- `application-shell-navigation/` — route and nav wiring workflow
- `component-mapping/` — requirement-to-component mapping
- `design-system-review/` — DS compliance workflow
- `ux-flow-validation/` — UX flow review workflow

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
