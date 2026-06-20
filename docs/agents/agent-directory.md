# Agent Directory

This directory lists all agents in the project, organized by category. Each entry describes the agent's role and when it runs.

---

## Workflow and Routing

### workflow-orchestrator-agent
**Role:** The top-level router that receives every request and decides which workflow to run.

This agent reads your message, any attached screenshots or Figma links, and the full context of what you are asking. It classifies the request type (new page, edit, review, navigation, Figma, etc.) and delegates to the correct downstream workflow. You never interact with this agent directly — it runs automatically for every request.

**When it runs:** First, on every request.

---

### template-recognition-and-lifecycle-agent
**Role:** Matches your request to the best-fit page template from the template registry.

Before any implementation begins, this agent checks whether your request matches an existing registered template (table, form, wizard, dashboard, etc.). If a match is found, it loads the template's standard logic automatically. If no match is found, it creates a Draft Template Candidate specification and asks for your approval before building. This prevents one-off screen designs when a reusable template already exists.

**When it runs:** After workflow routing, before component mapping and implementation.

---

## Implementation

### prototype-page-builder-agent
**Role:** Builds the React prototype pages.

This agent takes the output of component mapping and template recognition and generates the actual screen — the layout, component usage, mock data wiring, and state handling. It follows approved templates and Design System rules exactly. It does not invent new components or tokens, and it does not modify files outside the confirmed scope.

**When it runs:** After component mapping is complete and you have approved the plan.

---

### component-mapping-agent
**Role:** Maps your screen requirements to existing Design System and infrastructure components.

Before any implementation, this agent reads your requirements and finds the correct Design System components to use for each part of the screen. It checks the component registry, the Design System component catalog, and the current page structure. If a component is missing from the DS, it reports a gap rather than inventing a workaround.

**When it runs:** After template recognition, before implementation.

---

### application-shell-navigation-agent
**Role:** Protects the AppShell, Router, and Sidebar, and safely adds new routes and navigation entries.

This agent manages all changes to navigation and routing. It reads the current navigation structure, determines the correct position for new items based on sibling context, and wires new pages to the router. It requires your explicit approval before creating any new route. It will never flatten the hierarchy, blindly append items, or remove existing entries.

**When it runs:** When navigation or routing changes are needed, as part of the page build or a navigation update request.

---

### state-builder-agent
**Role:** Adds loading, empty, error, and success states to screens.

This agent generates all four data states for any screen that fetches or displays data. Loading states use skeleton layouts that match the real page structure. Empty states include an explanation and a call to action where appropriate. Error states include the reason, a retry option, and a path forward. Success states are context-appropriate (inline feedback for actions, full views for completed flows).

**When it runs:** After the main page structure is built.

---

### navigation-integration-agent
**Role:** Wires new pages to the router and sidebar.

This agent ensures every new page is properly connected — the route is registered, the sidebar entry is created, the active state highlights the correct item, and breadcrumbs reflect the hierarchy. Works closely with the application-shell-navigation-agent.

**When it runs:** As part of any page creation workflow.

---

### pixel-perfect-component-builder
**Role:** Converts visual references (screenshots, Figma frames) into Design System-compliant React components with pixel-level accuracy.

When you provide a visual reference and ask for a pixel-perfect build, this agent extracts the layout, spacing, component structure, and design tokens from the reference and implements the component using approved Design System components and tokens. It produces a gap report after building, listing any differences between the reference and the implementation.

**When it runs:** When a pixel-perfect build is explicitly requested with a visual reference.

---

## Quality and Review

### design-system-review-agent
**Role:** Checks every screen for Design System compliance.

This agent verifies that all components are from the approved Design System, all styles use SCSS tokens (no hardcoded colors or spacing), all icons are SVG, and no DS components are visually overridden from application code. If a gap is found — a required DS component that does not exist — this agent stops and reports it rather than passing the screen.

**When it runs:** After implementation, as part of every build and review workflow.

---

### ux-flow-review-agent
**Role:** Reviews screens for UX clarity, state coverage, and interaction completeness.

This agent checks whether all four data states are present, whether every action has a clear outcome, whether edge cases are handled, and whether the flow makes sense from the user's perspective. It works in concert with the ux-expert-page-audit-agent but focuses on flow logic rather than deep UX expertise.

**When it runs:** After implementation, as part of every review.

---

### ux-expert-page-audit-agent
**Role:** Deep UX audit of existing pages.

This agent performs a comprehensive UX audit of a finished screen, examining the full interaction flow, all states, all edge cases, component usage appropriateness, information hierarchy, and user mental model alignment. Produces categorized findings (Critical, Warning, Note). Always read-only — it never modifies anything.

**When it runs:** When a UX audit is requested, or as the final quality stage in the full workflow pipeline.

---

### code-quality-qa-agent
**Role:** QA validation — imports, dead code, runtime safety, SCSS correctness.

This agent validates that the built screen has no broken imports, unused code, unsafe runtime patterns, or SCSS errors. It also checks that telemetry hooks (if present) are correctly instrumented. This is a technical quality check, not a visual or UX check.

**When it runs:** After implementation, before the screen is marked complete.

---

### technical-writing-agent
**Role:** Reviews all visible UI copy for terminology consistency and UX writing quality.

This agent checks every piece of visible text in a screen — page titles, column headers, button labels, error messages, empty state copy, tooltips, and confirmation text — against the approved terminology registry, style guide, deprecated terms list, and approved microcopy patterns. If a deprecated term is found, the review is blocked. If a new product-specific term is introduced, it flags it for registry addition.

**When it runs:** After implementation, before UX review.

---

## Loading and Skeleton

### skeleton-loading-intelligence-agent
**Role:** Generates layout-aware skeleton loading states that match the real page structure.

This agent does not generate generic spinners or placeholder rectangles. It reads the actual page layout and generates skeleton states that match the structure precisely — if the page has a table with five columns and a details panel, the skeleton has the same shape. Uses Design System tokens throughout. Never invents local skeleton styles.

**When it runs:** Immediately after the main page implementation is complete.

---

## Figma

### figma-mcp-scanner-agent
**Role:** Reads Figma frames and extracts their structure.

This agent connects to Figma through the Figma integration and reads a frame's layer structure, component names, spacing values, and design tokens. The output feeds into the mapping and build pipeline.

**When it runs:** When a Figma link is provided and you ask Claude to work from it.

---

### figma-to-infra-mapping-agent
**Role:** Maps Figma component names to their Design System equivalents.

After reading a Figma frame, this agent translates each Figma component name to the corresponding Design System component in the codebase. It identifies gaps where Figma uses a component that has no DS equivalent.

**When it runs:** After Figma scanning, before implementation.

---

### figma-navigation-sidebar-extractor-agent
**Role:** Extracts navigation sidebar structure from a Figma frame.

When a Figma frame includes a sidebar navigation, this agent extracts each item's label, hierarchy level, space, and sibling order. The output is used to sync the navigation structure in the project.

**When it runs:** When a Figma frame includes navigation and you ask Claude to sync it.

---

### figma-design-system-extractor-agent
**Role:** Extracts Design System component usage from Figma.

Identifies all DS components used in a Figma frame and produces a component usage report. Used during design system alignment reviews.

**When it runs:** During Figma-based DS compliance reviews.

---

### figma-alignment-agent
**Role:** Produces a visual gap report comparing the React implementation against the Figma reference.

After a screen is built from a Figma reference, this agent compares the two and lists every difference — missing components, layout differences, spacing mismatches, color differences, copy variations. Required before a pixel-perfect claim can be made.

**When it runs:** After a Figma-based build, when a visual alignment review is requested.

---

### infra-component-detection-agent
**Role:** Detects component types and layout patterns from a screenshot.

When a screenshot is provided (rather than a Figma link), this agent identifies the visible component types, layout pattern, and likely template match. Less precise than Figma scanning but enables useful detection from any visual source.

**When it runs:** When a screenshot is provided and component detection is needed.

---

## Intelligence and Learning

### continuous-improvement-agent
**Role:** Identifies recurring mistakes and creates evidence-based lesson candidates.

This agent monitors review findings, QA reports, and user corrections. When the same type of issue appears two or more times, it creates a lesson candidate for review. Approved lessons become permanent rules that improve future workflows. Rejected lessons are documented with a reason. This agent never silently modifies workflow rules — all changes require evidence and approval.

**When it runs:** After significant implementation, UX audits, QA reviews, or repeated user corrections.

---

### shared-architecture-agent
**Role:** Detects repeated UI patterns, data shapes, and API contract opportunities.

This agent scans existing pages and components for duplication — repeated UI patterns that could become shared components, repeated data shapes that could become shared types, or duplicated logic that could be extracted. It produces safe extraction proposals rather than applying changes directly. A shared abstraction requires evidence of repeated use, stable behavior, and clear ownership.

**When it runs:** After significant implementation, or when a shared architecture review is requested.

---

### telemetry-driven-ux-recommendation-agent
**Role:** Converts usage telemetry data into evidence-based UX improvement recommendations.

When telemetry data is available (usage patterns, error rates, flow drop-off points), this agent analyzes it and produces UX improvement recommendations with confidence levels, guardrail metrics, and suggested experiments. It never invents data — if no telemetry is available, this stage is skipped.

**When it runs:** Optional stage, only when telemetry data has been provided.

---

## Documentation

### prototype-documentation-agent
**Role:** Generates structured review packages for PM, UX, and R&D audiences.

This agent produces stakeholder-facing documentation for completed screens — summaries of what was built, key design decisions, open questions, known gaps, and recommended next steps. Output is formatted for non-technical audiences and can be shared directly with stakeholders who are not in the Claude chat.

**When it runs:** When a review package is requested.

