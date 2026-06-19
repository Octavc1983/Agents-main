# Claude Agents

Agents are specialist roles used by Claude Code in the UX/UI prototyping workflow.

UX Flow Commands and the Workflow Orchestrator orchestrate agents — do not invoke agents directly unless debugging or running a focused isolated task.

---

## Structure

```
.claude/agents/
  _core/           — routing, learning, architecture, page-builder, DS review, UX review
  _figma/          — Figma MCP, scanning, mapping, alignment, extraction
  _infra/          — Infra/DS detection, states, navigation
  _documentation/  — PM / UX / R&D documentation
```

---

## Agent Index

### `_core/` — Core Agents

| Agent | File | Purpose | Used By |
|---|---|---|---|
| Workflow Orchestrator Agent | `_core/workflow-orchestrator-agent.md` | Detects intent from natural language, screenshots, Figma links; selects and delegates to correct workflow | Auto-routing |
| Continuous Improvement Agent | `_core/continuous-improvement-agent.md` | Identifies recurring mistakes, creates evidence-based lesson candidates, adds regression checks | Post-task learning |
| Shared Architecture Agent | `_core/shared-architecture-agent.md` | Detects repeated UI patterns, domain data shapes, API contract opportunities; produces safe extraction proposals | Pre-implementation |
| Telemetry-Driven UX Recommendation Agent | `_core/telemetry-driven-ux-recommendation-agent.md` | Converts approved telemetry into observed/heuristic/experiment recommendations with confidence levels and guardrail metrics | Post-audit |
| Application Shell Navigation Agent | `_core/application-shell-navigation-agent.md` | Protects AppShell/Sidebar/Header/Router; adds routes and nav items safely | `/ux-add-page`, `/connect-navigation` |
| Component Mapping Agent | `_core/component-mapping-agent.md` | Maps UI requirements to existing Infra/DS components before implementation | All page workflows |
| Prototype Page Builder Agent | `_core/prototype-page-builder-agent.md` | Creates and refactors React prototype pages using existing components and tokens | `/ux-add-page`, `/ux-edit-page`, `/ux-fix-generated-page` |
| Pixel Perfect Component Builder | `_core/pixel-perfect-component-builder.md` | Builds pixel-perfect components from image/screenshot/Figma | `/build-component-from-image` |
| Design System Review Agent | `_core/design-system-review-agent.md` | Reviews pages for DS compliance: components, tokens, icons, no inline styles | `/ux-review-page`, `/review-design-system` |
| UX Flow Review Agent | `_core/ux-flow-review-agent.md` | Reviews pages for UX clarity, state coverage, and interaction completeness | `/ux-review-page`, `/review-ux-flow` |
| UX Expert Page Audit Agent | `_core/ux-expert-page-audit-agent.md` | Deep UX audit of an existing page: flow, states, edge cases, component misuse — audit only | `/ux-review-page` |
| Code Quality QA Agent | `_core/code-quality-qa-agent.md` | QA review: imports, dead code, SCSS consistency, routing, telemetry, runtime safety | `/qa-code-review` |

---

### `_figma/` — Figma Agents

| Agent | File | Purpose | Used By |
|---|---|---|---|
| Figma MCP Scanner Agent | `_figma/figma-mcp-scanner-agent.md` | Reads Figma frame structure and extracts components, variables, icons — does not map or implement | `/figma-scan`, `/figma-map-components`, `/ux-add-page` |
| Figma to Infra Mapping Agent | `_figma/figma-to-infra-mapping-agent.md` | Maps Figma scan output to existing Infra/DS components, tokens, SVG icons | `/figma-map-components`, `/ux-add-page` |
| Figma Navigation Sidebar Extractor Agent | `_figma/figma-navigation-sidebar-extractor-agent.md` | Extracts sidebar navigation structure from Figma and generates React nav config | `/figma-sync-navigation` |
| Figma Design System Extractor Agent | `_figma/figma-design-system-extractor-agent.md` | Extracts DS components from Figma and generates a prototype component library | `/figma-build-page` (DS extraction mode) |
| Figma Alignment Agent | `_figma/figma-alignment-agent.md` | Compares React prototype vs Figma frame and produces a visual gap report | `/figma-align`, `/ux-review-page` |

---

### `_infra/` — Infra / DS Agents

| Agent | File | Purpose | Used By |
|---|---|---|---|
| Infra Component Detection Agent | `_infra/infra-component-detection-agent.md` | Analyzes a screenshot or visual and maps elements to existing Infra/DS components and tokens | `/detect-infra`, `/ux-add-page` |
| State Builder Agent | `_infra/state-builder-agent.md` | Adds loading, empty, error, success, and edge-case states to prototype pages | `/add-states`, `/ux-add-page`, `/ux-add-flow-to-page` |
| Navigation Integration Agent | `_infra/navigation-integration-agent.md` | Connects prototype pages to the existing routing and sidebar structure | `/connect-navigation`, `/ux-add-page` |

---

### `_documentation/` — Documentation Agents

| Agent | File | Purpose | Used By |
|---|---|---|---|
| Prototype Documentation Agent | `_documentation/prototype-documentation-agent.md` | Documents completed prototypes for UX, Product, and R&D review | `/create-review-package`, `/ux-review-page` |

---

## Recommended Usage

```
Natural language request
  └── Workflow Orchestrator Agent (auto-routing)
        └── Core Agents
              └── Figma / Infra / Documentation agents as needed
```

Do not invoke agents directly unless:
- Debugging a specific step
- Running a focused one-off task (e.g. scan a single Figma frame)
- The full workflow is too broad for what you need
