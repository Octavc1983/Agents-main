# Map Components

## Purpose

Run strict component mapping before any implementation begins.

This command maps a UX/UI requirement, Figma frame, screenshot, or page description to existing Infra / Design System components, existing local project components, existing layout patterns, existing tokens, and existing icon patterns.

The command must stop after mapping.

It must not implement the page.

---

## Agent to Use

Component Mapping Agent

Expected file:

```text
.claude/agents/component-mapping-agent.md
```

---

## Skill to Use

Component Mapping Skill

Expected file:

```text
.claude/skills/component-mapping/SKILL.md
```

---

## When to Use

Use this command before:

* Creating a new React prototype page
* Building from Figma MCP
* Building from screenshot
* Updating an existing generated page
* Running the Prototype Page Builder Agent
* Running a table / master-details template
* Running Design System review
* Adding a new route or sidebar item
* Creating dialogs, tables, filters, forms, cards, or details panels

---

## Required Inputs

Provide as much as possible:

```text
Page name:
Route:
Figma source:
Screenshot:
User goal:
Required layout:
Required interactions:
Required states:
Known constraints:
```

---

## Required User Intake Before Mapping

Before running the mapping workflow, check whether the user provided enough information.

**Minimum required fields:**

```text
Page name
Route
User goal
Page type
Required layout
Required interactions
Required states
Known constraints
```

**If any minimum required field is missing, stop and respond only with:**

```markdown
### Missing Required Information

Before I can continue, please fill the missing fields below.

\`\`\`text
Page name:
Route:
Figma source or screenshot:
User goal:
Page type:
Required layout:
Required interactions:
Required states:
Known constraints:
\`\`\`

### Why This Is Needed

I need these fields so I can map the screen to existing Infra / Design System components without guessing, inventing components, or creating incorrect implementation patterns.
```

Do not start mapping.
Do not inspect the project.
Do not generate code.
Do not continue until the user fills the form.

**If information is ambiguous, ask up to 5 focused clarifying questions before continuing.**

Examples:
1. Should this page appear in the sidebar navigation?
2. Should the details panel open on row click or row action click?
3. Should the details panel be closed by default?
4. Should filters remain visible when details is open?
5. Should state switching be hidden from the visible UI?

**After intake is complete:**

1. Summarize the provided intake.
2. Confirm the detected page type.
3. Run the full mapping workflow below.
4. Stop after the mapping report.

---

## Prompt

Use the Component Mapping Agent and Component Mapping Skill.

Goal:
Map the provided UX/UI requirement, Figma frame, screenshot, or page description to existing Infra / Design System components before implementation.

Input:
[PASTE_REQUIREMENT_OR_FIGMA_SOURCE_OR_SCREENSHOT_CONTEXT]

Target page:
[PAGE_NAME]

Target route:
[ROUTE]

---

## Critical Instructions

Inspect the project first.

Do not implement.

Do not create files.

Do not create components.

Do not create Design System components.

Do not create tokens.

Do not add UI libraries.

Do not add icon libraries.

Do not modify the Infra library.

Do not modify application source code.

Do not invent component names.

Do not invent import paths.

Do not invent props or APIs.

Do not use inline styles.

Do not hardcode visual values.

Do not provide generic mapping without checking the project.

If a component, token, icon, layout pattern, or import path cannot be verified, mark it as a gap or “needs verification”.

---

## Required Project Inspection

Before mapping, inspect these areas if they exist:

```text
src/components/
src/components/layout/
src/components/ui/
src/design-system/
src/app/router.tsx
src/mock/
src/types/
src/styles/
src/styles/_variables.scss
src/styles/_mixins.scss
src/styles/_typography.scss
src/styles/globals.scss
src/figma/
```

Also inspect:

* Existing page implementations
* Existing component exports
* Existing import paths
* Existing state components
* Existing navigation patterns
* Existing icon system
* Existing token usage
* Existing SCSS conventions
* Existing similar pages or flows

---

## Required Workflow

1. Understand the requested UI or flow.
2. Identify the page type.
3. Identify all visible or required screen regions.
4. Identify required interactions.
5. Identify required states.
6. Inspect existing project structure.
7. Search existing Infra / DS components.
8. Search existing local UI components.
9. Search existing layout components.
10. Search existing icon system.
11. Search existing token files.
12. Search similar existing pages or patterns.
13. Map every UI area to an existing component.
14. Provide verified import paths only when found.
15. Mark confidence for every mapping.
16. List components that must not be recreated.
17. List missing components, tokens, icons, and unclear patterns.
18. Provide implementation notes for the Prototype Page Builder Agent.
19. Stop before implementation.

---

## Confidence Levels

Use these confidence levels:

* High: component and usage pattern were found in the project
* Medium: component exists, but usage pattern needs review
* Low: likely component match, but import path or API needs verification
* Gap: no matching component was found

---

## Expected Output

### Component Mapping Summary

Short summary of the requested page or flow and the mapping decision.

### Requested UI / Flow

Describe:

* Page type
* User goal
* Main UI regions
* Required interactions
* Required states
* Known constraints

### Existing Project Patterns Found

| Pattern | File / Path | How It Should Be Used |
| ------- | ----------- | --------------------- |

### Recommended DS / Infra Components

| UI Need | Existing Component | Import Path | Confidence | Notes |
| ------- | ------------------ | ----------- | ---------- | ----- |

### Component Usage Map

| Screen Area | Component to Use | Data / Props Needed | Notes |
| ----------- | ---------------- | ------------------- | ----- |

### Suggested Imports

```ts
// Only verified imports.
// Do not invent import paths.
```

### Components That Must Not Be Recreated

List all components that already exist and must be reused.

### Missing Components or Gaps

#### Missing Components

#### Missing Tokens

#### Missing Icons

#### Ambiguous Patterns

#### Unclear Behavior

### Notes for Prototype Page Builder Agent

Give direct implementation guidance:

* Which components to use
* Which files to inspect
* Which patterns to follow
* Which components must not be recreated
* Which gaps must remain documented
* Which assumptions must be validated before implementation

### Implementation Safety

Choose one:

* Ready for implementation using existing components
* Ready only with documented placeholders
* Needs UX clarification
* Needs DS clarification
* Needs token clarification
* Not safe to implement

### Open Questions

List questions for UX / DS / R&D.

---

## Final Rule

Stop after the mapping report.

Do not continue to implementation unless the user explicitly asks to proceed.
