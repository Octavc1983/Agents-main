@AGENTS.md

# Claude Code Project Rules

## Natural-Language UX/UI Routing

Treat natural-language UX/UI requests as workflow triggers.

Do not require users to know or manually invoke slash commands.

When a user provides a screenshot, Figma link, page name, route, or requests to build / edit / review / fix / clean / add a flow, detect the workflow automatically before taking any action.

Use the `auto-workflow-routing` skill and the `workflow-orchestrator-agent` as the routing layer.

## Routing Priority

1. Inspect the user message and all attached context.
2. Detect the request type:
   - create a page
   - edit an existing page
   - add a flow or interaction
   - UX audit
   - QA / code review
   - navigation update
   - template creation
3. Extract information already provided — do not re-ask for it.
4. Ask only for missing critical fields.
5. Run analysis and mapping before implementation.
6. Preserve existing AppShell, Sidebar, Header, Router, Infra, Design System, SCSS tokens, and SVG icon system.

## Non-Negotiable Rules

- Do not create a custom AppShell, Sidebar, Header, Router, or Design System.
- Do not create new SCSS tokens unless explicitly approved.
- Do not use inline styles.
- Do not hardcode hex colors, spacing, radius, shadows, or typography when tokens exist.
- Do not modify files outside the confirmed scope.
- Do not claim Pixel Perfect accuracy without a gap report.
- Do not expose debug controls in visible product UI.
- Do not implement if target files or modification scope are unclear.
- Do not ask the user which command to run.
- SVG icons only — no icon libraries, no PNG/JPG/emoji/icon fonts.

## Safety Gate

Before changing any code, confirm:

- Target page or files
- Files allowed to modify
- Files not allowed to modify
- Required behavior
- Whether reference image/Figma is visual reference only or implementation-approved
- Whether the request is analysis-only or implementation-approved

## Template Recognition Before Implementation

Before building or editing any UX/UI screen from text, screenshot, image, Figma, or existing page reference:

1. Detect the screen type using the template registry.
2. Match to an existing Page Composition Template where possible.
3. Load the matched template's standard logic automatically.
4. Ask whether the request affects navigation, routing, sidebar placement, breadcrumbs, or browser Back behavior.
5. Determine whether the UI is: full page / nested page / modal / dialog / wizard / configuration form / side panel / embedded component.
6. Do not generate a one-off page if an existing template already matches.
7. If no template matches:
   - Create a Draft Template Candidate Specification
   - Register it in `.claude/architecture/template-candidates/`
   - Explain why it is new and its future reuse cases
   - Ask for approval before implementation

Template detection is owned by:
- Agent: `.claude/agents/_core/template-recognition-and-lifecycle-agent.md`
- Skill: `.claude/skills/_core/template-recognition-and-lifecycle/SKILL.md`
- Registry: `.claude/architecture/template-registry.md`

## Full Workflow Stages

Every significant implementation runs through these stages in order:

```text
1.  Detect Intent                        — auto-workflow-routing skill
2.  Collect Missing Context              — workflow-orchestrator-agent
3.  Template Recognition                 — template-recognition-and-lifecycle-agent + skill
4.  Inspect Existing Architecture        — shared-component-and-data-architecture skill
5.  Component Mapping                    — component-mapping-agent
6.  Shared Architecture Discovery        — shared-architecture-agent
7.  Implement or Update                  — prototype-page-builder-agent
8.  Skeleton Loading States              — skeleton-loading-intelligence-agent + skill
9.  UX Content Alignment                 — ux-content-alignment skill + technical-writing-agent
10. QA + Runtime Validation              — code-quality-qa-agent
11. UX Audit                             — ux-expert-page-audit-agent
12. Telemetry Review (when data exists)  — telemetry-driven-ux-recommendation-agent
13. Continuous Learning Review           — continuous-quality-learning skill
14. Update Lessons + Regression          — lesson-candidates.md + evals/
```

Stage 3 (Template Recognition) runs before all implementation. Stages 4–6 run before code generation. Stage 8 runs immediately after implementation. Stage 9 runs before review. Stages 11–14 run after review. Stage 12 is optional when no telemetry data exists.

## Continuous Improvement and Shared Architecture

After significant implementation, UX audit, QA review, or repeated user correction:

1. Run a controlled learning review using the `continuous-quality-learning` skill.
2. Identify whether the issue is one-off or recurring.
3. Create lesson candidates only when evidence exists.
4. Add regression checks for approved lessons.
5. Do not silently rewrite `CLAUDE.md`, `AGENTS.md`, core Skills, or core Agents.
6. Propose updates for approval. Apply only after confirmation.

Before generating or editing a page, inspect whether the requested UI, state logic, domain data, mock data, API shape, filter logic, or view model already exists elsewhere.

Prefer reuse in this order:

1. Existing Design System component
2. Existing shared feature component
3. Existing page composition template
4. Existing shared type or view model
5. Existing adapter, service, repository, or API contract
6. New local implementation only when reuse does not exist

Do not extract shared components or shared APIs prematurely.

A shared abstraction requires evidence of repeated use, stable behavior, clear ownership, and a safe API.

## Architecture Registries

Inspect these files before creating a new component, type, or data shape:

```text
.claude/architecture/component-registry.md     — known components and candidates
.claude/architecture/data-contract-registry.md — known types and API contracts
.claude/architecture/feature-api-registry.md   — feature-level API shapes
.claude/architecture/shared-patterns.md        — patterns under consideration
.claude/architecture/decisions/                — ADRs for permanent decisions
```

Update the relevant registry after creating a new shared component or contract.

## Content and Terminology

Inspect these files before writing or reviewing any user-facing text:

```text
.claude/content/terminology-registry.md        — approved terms and preferred forms
.claude/content/ux-writing-style-guide.md      — voice, tone, grammar, mechanics
.claude/content/approved-microcopy-patterns.md — reusable approved copy blocks
.claude/content/deprecated-terms.md            — retired terms that must not reappear
```

Rules:
- Every new page must pass a terminology check before UX review
- Any new navigation item must be registered in the terminology registry
- Deprecated terms found in any page are Critical issues that block review
- Unregistered product-specific terms must be proposed for registry addition
- Do not invent new terminology without UX Writing review

## Governance Rules

1. Natural-language requests trigger workflows automatically — slash commands are optional.
2. Before implementation, inspect existing components, templates, data shapes, API contracts, terminology, and routing patterns.
3. Prefer reuse in order: DS component → shared feature component → page template → shared type/view model → adapter/service/contract → local implementation.
4. Do not create shared abstractions prematurely. Extraction requires evidence, stable behavior, clear ownership, and approval.
5. Every completed substantial page or flow must pass: UX Content Alignment → QA/code review → UX audit → build/runtime validation where available.
6. Recurring mistakes must create lesson candidates and regression evaluation cases.
7. Do not silently modify permanent workflow rules, CLAUDE.md, AGENTS.md, core Skills, or core Agents from a single mistake.
8. Do not modify `src/` during workflow or infrastructure setup.

## Dark Mode Readiness Rule

Every new UI screen, component, template, dialog, wizard, dashboard, table, form, configuration page, loading state, empty state, and error state must be compatible with the Design System dark theme.

Before implementation:
1. Inspect `@idira/design-system` dark-theme tokens and public component APIs.
2. Use semantic Design System tokens only.
3. Do not hardcode light-only colors.
4. Do not add page-local theme values.
5. Ensure hover, focus, selected, disabled, loading, empty, and error states have valid dark-theme behavior.

When a screenshot or existing screen must be converted:
use `convert-screen-to-dark`.

## Card-First Tile Rule

When visual tiles, blocks, widgets, KPI panels, or repeated content surfaces are detected, always inspect and reuse the existing Design System Card component before creating any local container or component.

## DS Components Are Consume-Only

Existing `@idira/design-system` components must be consumed through public APIs only.

Do not visually override, recolor, restyle, or mutate Design System components from application code.

When a required appearance or behavior is missing, report a Design System gap and request a new approved variant instead of creating local overrides.

## No Silent Fallback Rule

When an approved Design System component, token, icon, mock-data contract, localization key, state pattern, or API contract is missing, do not invent a local replacement.

Stop and report a structured gap.

Use only approved public APIs, centralized mock data, and approved localization resources.

## Mock Data Rule

Mock data must be typed, centralized, reusable, domain-specific, and stored outside page/component JSX.

Mock data must never exist inside the Design System package.

## Localization Rule

All user-facing copy, including visible text and accessibility labels, must use the approved localization system.

Do not hardcode user-facing copy in JSX, TSX, page templates, dialogs, forms, navigation, loading states, error states, or feature code.

## Minimal Layer Rule

Use the smallest valid DOM, component, state, and styling structure.

Do not create wrappers, abstractions, hooks, providers, services, or SCSS layers unless they own meaningful behavior, semantics, accessibility, state, layout responsibility, or proven reuse.

No speculative abstractions. No wrapper-only styling. No DS component restyling through wrappers.

## Screenshot Navigation Sync Rule

When a navigation screenshot or Figma reference contains an item missing from `spacesRegistry`, add it in the exact detected Space, hierarchy level, item type, and sibling position.

Do not append blindly, flatten hierarchy, or place items in another Space.

Infer routes only from proven sibling route patterns. Otherwise create the item as route-pending and report the missing route decision.

## Existing Page Protection

When a requested page already exists, do not create or regenerate it.

First inspect the current page and related route, navigation, state, services, components, mocks, localization, and tests.

Provide a delta report and wait for user approval.

After approval, apply only the approved additions or corrections while preserving all unrelated layout, logic, routes, navigation, state behavior, DS usage, and accessibility behavior.

## User Decision Memory Rule

Before asking the user to define a behavior, Claude must ask internally: Does the user already have an approved decision for this type of flow?

If yes (high confidence): Apply automatically. Include in implementation report.
If yes (medium confidence): Prefill and ask one focused confirmation.
If no: Create a Flow Gap. Ask for a UX Note. After approval and validated reuse, propose as a reusable decision.

Approved decisions are in `.claude/architecture/user-decision-memory/`.

Screen-specific decisions override route-specific, which override feature-specific, which override template-specific, which override global.

Never apply a deprecated or conflicted decision without explicit resolution.
