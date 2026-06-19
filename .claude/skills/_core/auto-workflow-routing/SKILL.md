---
name: auto-workflow-routing
description: Automatically detect and route natural-language UX/UI requests to the correct internal workflow. Use when a user attaches a screenshot, provides a Figma link, asks to build/edit/review/fix/clean a page or component, requests QA or code review, or asks about navigation. Routes without requiring slash commands.
when_to_use: Use for any UX/UI request involving screenshots, Figma frames, React pages, navigation, component mapping, DS review, UX audit, QA, code cleanup, runtime validation, or prototype page creation or editing.
user-invocable: false
allowed-tools: Read, Glob, Grep
---

# Auto Workflow Routing Skill

## Purpose

Convert natural-language user requests into a selected internal workflow.

This skill runs before any implementation. It detects intent, classifies the request, and delegates to the appropriate Agents and Skills.

The user should never need to know or type a slash command.

---

## Trigger

This skill applies whenever a user message includes one or more of:

- An attached screenshot or UI image
- A Figma link or frame reference
- A page name, route, or file path
- A request to build, create, generate, implement, recreate
- A request to fix, edit, update, refine, correct, improve
- A request to add a flow, interaction, filter, dialog, panel, or state
- A request to review, audit, find edge cases, check usability
- A request to clean code, remove dead code, fix imports, check telemetry, check exceptions
- A request to update navigation, sidebar, menu, or route

---

## Step 1 — Inspect Context

Collect everything already provided:

```text
User message text
Attached screenshot or image: yes / no
Figma link: yes / no / [url]
Target page name: [if mentioned]
Target route: [if mentioned]
Target files: [if mentioned]
Requested outcome: create / edit / add flow / review / QA / navigation / template
Known constraints: [if mentioned]
```

Do not ask the user for fields already present in the message.

---

## Step 2 — Classify Intent

Apply this detection matrix:

| Request Type | Trigger Phrases | Image Signal | Workflow |
|---|---|---|---|
| Create page | build, create, generate, implement, recreate, pixel perfect | yes | Create New Page |
| Edit page | fix, edit, update, refine, correct, improve | yes | Edit Existing Page |
| Add flow | add filters, add search, add dialog, add tabs, open details, add chips | any | Add Flow to Page |
| UX audit | review, audit, edge cases, what is wrong, usability, missing states | any | UX Audit |
| QA / cleanup | imports, dead code, telemetry, exceptions, SCSS, runtime, build | any | QA Code Review |
| Navigation | sidebar, menu, navigation, route, AppShell, parent item, active state | any | Navigation Workflow |
| Template | table template, master details, card list, form page, dashboard, dialog | any | Template Workflow |

---

## Step 3 — Apply Image Rules

**Build from image:**
If a screenshot or image is attached AND the user uses build/create/generate/implement/recreate/make/pixel-perfect language → classify as Create New Page regardless of other signals.

**Edit from image:**
If a screenshot or image is attached AND the user uses fix/edit/update/refine/correct/improve language → classify as Edit Existing Page.

**Figma:**
If a Figma link exists: require Figma MCP Scanner before implementation. Use Visual to Infra Mapping if MCP is unavailable. Do not build from Figma without identifying the target frame first.

---

## Step 4 — Ambiguity Rule

When more than one workflow could apply:

1. Choose the smallest safe workflow.
2. Default to analysis before implementation.
3. State the selected workflow in one sentence.
4. Ask only for the missing critical fields.

Example:

```
I identified this as an Edit Existing Page request because you want to update the filter behavior on an existing screen.
Before I continue I need: target page name, files allowed to modify, files not allowed to modify.
```

---

## Step 5 — Check for Missing Critical Fields

Check only the fields required by the detected workflow.

| Workflow | Minimum Required Fields |
|---|---|
| Create New Page | page name, route, page template, user goal, required layout, required interactions, required states, known constraints, files allowed to modify, files not allowed to modify |
| Edit Existing Page | target page or files, edit type, requested change, behavior to preserve, known constraints, files allowed/not allowed |
| Add Flow to Page | target page or files, flow name, flow trigger, flow behavior, state changes, known constraints, files allowed/not allowed |
| UX Audit | target page or files, user goal, expected user flow, primary action, required states, known concerns |
| QA Code Review | QA scope, target page/route/folder, files allowed/not allowed, automatic fixes yes/no, known constraints |
| Navigation | navigation goal, target route or Figma source, navigation label, known constraints, files allowed/not allowed |
| Template | template type, page name, route, user goal, required interactions, required states, known constraints, files allowed/not allowed |

---

## Step 6 — Missing Information Response

When fields are missing, respond using this format exactly:

```markdown
### Missing Required Information

I identified this request as: [WORKFLOW_TYPE]

Before I continue, please fill the missing fields below:

```text
[ONLY MISSING FIELDS]
```

### Why I'm Asking

I already identified the correct workflow. I need this to continue safely without guessing, modifying the wrong files, or breaking the existing AppShell, Infra, Design System, routing, or page structure.
```

Do not ask the user to select a command. Do not ask about fields already provided.

---

## Step 7 — Select Agents and Skills

Once intake is complete, select the downstream sequence for the detected workflow.

### Create New Page

1. Figma MCP Scanner Agent — if Figma source
2. Visual to Infra Mapping Skill — if screenshot
3. Component Mapping Agent
4. Relevant Page Composition Template Skill
5. Prototype Page Builder Agent
6. Navigation Integration Agent — if sidebar/route placement requested
7. State Builder Agent
8. Design System Review Agent
9. UX Flow Review Agent

### Edit Existing Page

1. Inspect current page and connected components
2. Component Mapping Agent
3. Visual to Infra Mapping or Figma Alignment — if reference provided
4. Prototype Page Builder Agent — targeted changes only
5. State Builder Agent — if states affected
6. Design System Review Agent
7. UX Flow Review Agent

### Add Flow to Existing Page

1. Component Mapping Agent
2. Prototype State Patterns Skill
3. Relevant Template Skill — if applicable
4. Prototype Page Builder Agent — flow scope only
5. State Builder Agent
6. Design System Review Agent
7. UX Flow Review Agent

### UX Audit

1. UX Expert Page Audit Agent
2. UX Flow Review Agent
3. Documentation Agent — only if review package requested

Default: review only. No file modifications without explicit approval.

### QA Code Review

1. Code Quality QA Agent
2. Code Quality QA Skill
3. Existing validation scripts — if allowed
4. Safe fixes only if approved

### Navigation Workflow

1. Application Shell Navigation Agent
2. Figma Navigation Sync Skill — if Figma source
3. Navigation Integration Agent
4. Design System Review Agent

### Template Workflow

1. Component Mapping Agent
2. Relevant Template Skill
3. Prototype Page Builder Agent
4. State Builder Agent
5. Design System Review Agent
6. UX Flow Review Agent

---

## Safety Rules

Before implementation begins, confirm:

- Target files identified
- Files allowed to modify confirmed
- Files not allowed to modify confirmed
- AppShell, Sidebar, Header, Router, Infra, Design System, tokens preserved
- Whether this is analysis-only or implementation-approved

---

## Must Not Do

- Ask the user which command to run
- Require slash command usage
- Ignore image attachments
- Ignore Figma links
- Create new workflows when existing ones fit
- Implement before identifying the workflow and intake
- Guess critical requirements
- Replace AppShell, Sidebar, Header, Router, Infra, or Design System

---

## Output Format

```markdown
### Workflow Detected

[workflow name]

### Why This Workflow Was Selected

[one sentence]

### Context Found

- User request: [summary]
- Image/screenshot: yes / no
- Figma source: yes / no
- Target page or route: [if found]

### Missing Information

[fields or "none"]

### Selected Agents and Skills

| Order | Agent / Skill | Purpose |
|---|---|---|

### Safety Gate

[Ready to start / Needs intake completion / Needs clarification]
```
