# Claude Skills

Skills are reusable playbooks, templates, and workflow instructions used by agents and commands.

---

## Structure

```
.claude/skills/
  _core/           — common workflow skills used across most page creation and review flows
  _figma/          — Figma MCP, Figma-to-React, tokens, navigation, alignment
  _templates/      — Page Composition Templates (assemble existing Infra/DS into page patterns)
  _infra/          — Infra detection, token mapping, SVG icons, prototype state management
  _documentation/  — review packages, prompt libraries
  _archive/        — deprecated or duplicate skills
```

---

## Important Rule

**Template skills are not Design System components.**

They are Page Composition Templates — they assemble existing Infra/DS components into reusable page patterns. They do not add new DS tokens, new DS components, or new design assets.

---

## Skill Index

### `_core/` — Core Skills

| Skill | Folder | Purpose | Used By |
|---|---|---|---|
| Application Shell Navigation | `_core/application-shell-navigation/` | Workflow for adding routes and sidebar items without breaking AppShell | `/ux-add-page`, `/connect-navigation` |
| Component Mapping | `_core/component-mapping/` | Maps UI requirements to existing Infra/DS components before implementation | `/map-components`, `/ux-add-page` |
| Design System Review | `_core/design-system-review/` | Validates DS compliance: components, tokens, icons, no inline styles | `/review-design-system`, `/ux-review-page` |
| UX Flow Validation | `_core/ux-flow-validation/` | Reviews page for UX clarity, state coverage, and interaction completeness | `/review-ux-flow`, `/ux-review-page` |

---

### `_figma/` — Figma Skills

| Skill | Folder | Purpose | Used By |
|---|---|---|---|
| Figma MCP Scan | `_figma/figma-mcp-scan/` | Reads a Figma frame and extracts component structure, variables, and icons | `/figma-scan`, `/ux-add-page` |
| Figma to Infra Mapping | `_figma/figma-to-infra-mapping/` | Maps Figma scan output to existing Infra/DS components and SCSS tokens | `/figma-map-components`, `/ux-add-page` |
| Figma to React Page | `_figma/figma-to-react-page/` | Full workflow: Figma frame → inspected mapping → React prototype page | `/figma-build-page` |
| Figma Navigation Sync | `_figma/figma-navigation-sync/` | Reads Figma sidebar design and updates project nav config | `/figma-sync-navigation` |
| Figma Token Extraction | `_figma/figma-token-extraction/` | Extracts Figma variables and maps them to existing SCSS tokens | `/figma-extract-tokens` |
| Figma Alignment Review | `_figma/figma-alignment-review/` | Pixel Perfect gap report: React prototype vs Figma frame | `/figma-align`, `/ux-review-page` |

---

### `_templates/` — Page Composition Template Skills

These are Page Composition Templates — not DS components.

| Skill | Folder | Template | Used By |
|---|---|---|---|
| Table Page Template | `_templates/table-page-template/` | Full-width table, 4 states | `/create-table-page`, `/ux-add-page` |
| Table Filters Template | `_templates/table-filters-template/` | Table + search + filter panel + chips + item counter | `/create-table-filters-template`, `/ux-add-page` |
| Table Master Details Template | `_templates/table-master-details-template/` | Full-width table that narrows on row click, details panel right | `/create-table-master-details`, `/ux-add-page` |
| Card List Master Details Template | `_templates/card-list-master-details-template/` | 30% card list + 70% details panel, persistent split | `/create-card-list-master-details`, `/ux-add-page` |
| Form Page Template | `_templates/form-page-template/` | Create / edit / settings / wizard form | `/create-form-page`, `/ux-add-page` |
| Dialog Flow Template | `_templates/dialog-flow-template/` | Confirmation / form / multi-step dialogs | `/create-dialog-flow`, `/ux-add-flow-to-page` |
| Dashboard Page Template | `_templates/dashboard-page-template/` | Metric cards, summary sections, activity feeds | `/create-dashboard-page`, `/ux-add-page` |

---

### `_infra/` — Infra / DS Skills

| Skill | Folder | Purpose | Used By |
|---|---|---|---|
| Visual to Infra Mapping | `_infra/visual-to-infra-mapping/` | Maps a screenshot or visual to existing Infra/DS components before implementation | `/detect-infra`, `/ux-add-page`, `/ux-fix-generated-page` |
| Design System Token Mapping | `_infra/design-system-token-mapping/` | Maps visual styles to existing SCSS tokens — confirms coverage before implementation | `/map-tokens`, `/ux-add-page` |
| SVG Icon System | `_infra/svg-icon-system/` | Rules and patterns for using the SVG-only inline icon system | `/figma-create-icons`, all page builds |
| Prototype State Patterns | `_infra/prototype-state-patterns/` | Defines how to implement loading, empty, error, and selection states in prototypes | `/add-states`, `/ux-add-flow-to-page` |

---

### `_documentation/` — Documentation Skills

| Skill | Folder | Purpose | Used By |
|---|---|---|---|
| Prototype Documentation | `_documentation/prototype-documentation/` | Creates PM / UX / R&D review packages from a completed prototype | `/create-review-package`, `/ux-review-page` |
| Agent Prompts Library | `_documentation/agent-prompts-library/` | Manages the reusable prompt library page inside the prototype app | `/create-agent-prompts-page` |

---

### `_archive/` — Archived Skills

No skills archived at this time. Archive candidates for future review:
- Skills that become superseded by newer template skills
- Skills that overlap with a refined core skill
