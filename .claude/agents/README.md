# Claude Agents

Agents are specialist roles used by Claude Code in the UX/UI prototyping workflow.

UX Flow Commands orchestrate agents — do not invoke agents directly unless debugging or running a focused isolated task.

---

## Structure

```
.claude/agents/
  _core/           — shared agents used across most workflows
  _figma/          — Figma MCP, scanning, mapping, alignment
  _infra/          — Infra/DS detection, states, navigation
  _documentation/  — PM / UX / R&D documentation
  _archive/        — deprecated, duplicate, or out-of-scope agents
```

---

## Agent Index

### `_core/` — Core Agents

Used by most UX/UI workflows. Protect the AppShell, DS compliance, and UX quality.

| Agent | File | Purpose | Used By |
|---|---|---|---|
| Application Shell Navigation Agent | `_core/application-shell-navigation-agent.md` | Protects AppShell/Sidebar/Header/Router; adds routes and nav items safely | `/ux-add-page`, `/connect-navigation` |
| Component Mapping Agent | `_core/component-mapping-agent.md` | Maps UI requirements to existing Infra/DS components before implementation | `/ux-add-page`, `/map-components`, `/ux-fix-generated-page` |
| Prototype Page Builder Agent | `_core/prototype-page-builder-agent.md` | Creates and refactors React prototype pages using existing components and tokens | `/ux-add-page`, `/ux-edit-page`, `/ux-fix-generated-page` |
| Design System Review Agent | `_core/design-system-review-agent.md` | Reviews pages for DS compliance: components, tokens, icons, no inline styles | `/ux-review-page`, `/review-design-system` |
| UX Flow Review Agent | `_core/ux-flow-review-agent.md` | Reviews pages for UX clarity, state coverage, and interaction completeness | `/ux-review-page`, `/review-ux-flow` |
| UX Expert Page Audit Agent | `_core/ux-expert-page-audit-agent.md` | Deep UX audit of an existing page: inspects implementation, flow, states, edge cases, component misuse — audit only, no fixes | `/ux-review-page` |

> `design-system-review-agent` is used by both core UX workflows and Infra/DS validation tasks.

---

### `_figma/` — Figma Agents

Handle Figma MCP scanning, Figma-to-Infra mapping, navigation extraction, and alignment review.

| Agent | File | Purpose | Used By |
|---|---|---|---|
| Figma MCP Scanner Agent | `_figma/figma-mcp-scanner-agent.md` | Reads Figma frame structure and extracts components, variables, icons — does not map or implement | `/figma-scan`, `/figma-map-components`, `/ux-add-page` |
| Figma to Infra Mapping Agent | `_figma/figma-to-infra-mapping-agent.md` | Maps Figma scan output to existing Infra/DS components, tokens, SVG icons | `/figma-map-components`, `/ux-add-page` |
| Figma Navigation Sidebar Extractor Agent | `_figma/figma-navigation-sidebar-extractor.agent.md` | Extracts sidebar navigation structure from Figma and generates React nav config | `/figma-sync-navigation`, `/extract-figma-navigation` |
| Figma Design System Extractor Agent | `_figma/figma-design-system-extractor.agent.md` | Extracts DS components from Figma and generates a prototype component library | `/figma-build-page` (Figma DS extraction mode) |
| Figma Alignment Agent | `_figma/figma-alignment-agent.md` | Compares React prototype vs Figma frame and produces a visual gap report | `/figma-align`, `/ux-review-page` |

---

### `_infra/` — Infra / DS Agents

Focus on detecting existing components from visuals, adding prototype states, and wiring navigation.

| Agent | File | Purpose | Used By |
|---|---|---|---|
| Infra Component Detection Agent | `_infra/infra-component-detection-agent.md` | Analyzes a screenshot or visual and maps elements to existing Infra/DS components and tokens | `/detect-infra`, `/ux-add-page` |
| State Builder Agent | `_infra/state-builder-agent.md` | Adds loading, empty, error, success, and edge-case states to prototype pages | `/add-states`, `/ux-add-page`, `/ux-add-flow-to-page` |
| Navigation Integration Agent | `_infra/navigation-integration-agent.md` | Connects prototype pages to the existing routing and sidebar structure | `/connect-navigation`, `/ux-add-page` |

---

### `_documentation/` — Documentation Agents

Prepare PM / UX / R&D review packages and documentation.

| Agent | File | Purpose | Used By |
|---|---|---|---|
| Prototype Documentation Agent | `_documentation/prototype-documentation-agent.md` | Documents completed prototypes for UX, Product, and R&D review | `/create-prototype-documentation`, `/create-review-package`, `/ux-review-page` |

---

### `_archive/` — Archived Agents

Deprecated, duplicate, or out-of-scope agents. Not used in active workflows.

| Agent | File | Archived Reason |
|---|---|---|
| Mock Data Agent | `_archive/mock-data-agent.md` | Mock data creation is now handled inline by page-builder agents and template skills |
| Page Structure Agent | `_archive/page-structure-agent.md` | Superseded by template skills (`_templates/`) and Prototype Page Builder Agent |
| Product Brief Agent | `_archive/product-brief-agent.md` | Out of scope for UX/UI prototype workflow |
| Prompt Optimizer Agent | `_archive/prompt-optimizer-agent.md` | Out of scope for UX/UI prototype workflow |
| Research Assistant Agent | `_archive/research-assistant-agent.md` | Out of scope for UX/UI prototype workflow |
| Copilot Instructions | `_archive/copilot-instructions.md` | GitHub Copilot config — not a Claude agent |

---

## Recommended Usage

```
UX Flow Command
  └── orchestrates Core Agents
        └── which call Figma / Infra / Documentation agents as needed
```

Do not invoke low-level agents directly unless:
- Debugging a specific step
- Running a focused one-off task (e.g. scan a single Figma frame)
- A UX Flow Command is too broad for what you need
