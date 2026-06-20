# How Agents Work Together

When you send a request to Claude, you are not talking to a single system. You are triggering a pipeline of specialist agents, each handling one part of the work. This page explains how the pipeline works in plain language.

---

## The Full Pipeline

### Stage 1 — You Say What You Want

You describe your request in plain English. This could be as simple as "Build the Scans page" or as detailed as a full description with a Figma link and a list of requirements.

---

### Stage 2 — Workflow Router Detects Your Intent

The **workflow-orchestrator-agent** reads your message and classifies the request:
- Is this a new page build?
- An edit to an existing page?
- A review or audit?
- A navigation update?
- A Figma-based workflow?

If any required information is missing (like the screen name for a new build), the router identifies what's missing and asks you before any other work begins.

---

### Stage 3 — Template Recognition

The **template-recognition-and-lifecycle-agent** checks whether your request matches a registered layout template.

If a match is found (e.g., a table with a row-click details panel matches TableMasterDetailsTemplate), it loads the template logic and passes it to the next stage.

If no match is found, it creates a Draft Template Candidate — a specification for a new reusable template — and asks for your approval before proceeding.

This stage runs before any implementation, every time.

---

### Stage 4 — Architecture Discovery

The **shared-architecture-agent** checks whether any parts of the screen you're building already exist in the project:
- Is there a component that already does this?
- Is there a data shape or mock data structure that matches?
- Is there a service or utility that handles this behavior?

This prevents duplicate implementations. If something already exists, the pipeline reuses it.

---

### Stage 5 — Component Mapping

The **component-mapping-agent** maps each requirement in your request to the specific Design System component it corresponds to.

For example:
- "A table with sortable columns" → DS DataTable component
- "A search bar above the table" → DS SearchInput component
- "A status badge in each row" → DS StatusBadge component

If a required component does not exist in the Design System, the agent reports a DS gap and stops. It never invents a replacement.

---

### Stage 6 — Implementation

The **prototype-page-builder-agent** takes the template, the component map, and the architecture output and builds the screen.

Simultaneously:
- **application-shell-navigation-agent** prepares the navigation entry and route
- **navigation-integration-agent** wires the page to the router and sidebar

The page is built exactly as described in the plan. No files outside the confirmed scope are touched.

---

### Stage 7 — Skeleton Loading States

Immediately after the page is built, the **skeleton-loading-intelligence-agent** reads the page layout and generates a skeleton loading state that matches the actual structure of the screen.

The skeleton mirrors the real layout — if the page has a table with a sidebar, the skeleton has the same shape. No generic spinners or full-page loading overlays.

---

### Stage 8 — Copy Review

The **technical-writing-agent** checks all visible text on the built screen against the approved terminology registry, style guide, deprecated terms, and approved microcopy patterns.

If a deprecated term is found, this stage blocks the pipeline until the issue is resolved.
If a new product-specific term is introduced, it flags it for registry addition.

---

### Stage 9 — QA Validation

The **code-quality-qa-agent** validates the technical quality of the built screen:
- No broken imports
- No unused code
- No unsafe runtime patterns
- SCSS correctness
- Telemetry instrumentation (if applicable)

If QA finds an error, it reports it and the pipeline pauses for resolution.

---

### Stage 10 — UX Audit

The **ux-expert-page-audit-agent** and **ux-flow-review-agent** perform a read-only UX review of the completed screen. They check all four data states, edge cases, interaction completeness, accessibility, and dark mode compatibility.

Findings are categorized as Critical, Warning, or Note. Critical findings are surfaced for your attention. The pipeline does not automatically fix findings — you decide what to address.

---

### Stage 11 — Telemetry Analysis (Optional)

If telemetry data has been provided for this screen or feature area, the **telemetry-driven-ux-recommendation-agent** analyzes usage patterns and produces evidence-based recommendations. This stage is skipped if no telemetry data exists.

---

### Stage 12 — Learning Review

The **continuous-improvement-agent** reviews the session for any recurring patterns or mistakes. If the same type of issue appeared in multiple stages, it creates a lesson candidate. Lesson candidates require evidence and your approval before becoming permanent rules.

---

## What Happens If a Stage Finds a Problem

Every stage in the pipeline can stop and report. When a problem is found, the pipeline does not silently continue. It stops, surfaces the specific finding, and waits for your input before proceeding.

This applies to:
- Missing DS components (Stage 5)
- DS compliance failures (after Stage 6)
- Deprecated terms in copy (Stage 8)
- QA errors (Stage 9)
- Critical UX findings (Stage 10)

Nothing is ever "worked around" silently. Every gap and every blocker is reported explicitly.

---

## A Simplified View

```
You → Workflow Router → Template Recognition → Architecture Discovery
    → Component Mapping → Implementation → Skeleton Loading
    → Copy Review → QA → UX Audit → Learning Review
```

Each arrow is a handoff between agents. You stay in control at any stage where a decision is needed.

