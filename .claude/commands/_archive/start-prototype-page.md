# Start Prototype Page

## Purpose

Create a new basic React prototype page using the existing AppShell, router, navigation, SCSS tokens, and Design System components.

Use this command when you need a clean starting point for a new page — without Figma source available.

---

## Agents to Use

1. Component Mapping Agent — identify components to use
2. Application Shell Navigation Agent — connect route and navigation
3. Prototype Page Builder Agent — build the page

Expected files:
```text
.claude/agents/component-mapping-agent.md
.claude/agents/application-shell-navigation-agent.md
.claude/agents/prototype-page-builder-agent.md
```

---

## Skills to Use

```text
.claude/skills/component-mapping/SKILL.md
.claude/skills/application-shell-navigation/SKILL.md
.claude/skills/prototype-state-patterns/SKILL.md
```

---

## When to Use

Use when:
- Starting a new page without a Figma source
- Creating a page stub that will be filled in later
- Prototyping before Figma designs are ready

If a Figma source exists, use `/figma-build-page` instead.

---

## Required User Intake

### Required intake fields

```text
Page name:             React component name (e.g. PoliciesPage)
Route:                 Route path (e.g. /policies)
Navigation label:      Sidebar label (e.g. Policies)
Navigation icon:       SVG icon name (e.g. PoliciesIcon) or 'none'
User goal:             What the user is trying to do on this page
Page type:             Full table / Table with filters / Table to master details / Form / Dashboard / Empty shell / Other
Required states:       Default / Loading / Empty / Error
Known constraints:     e.g. SVG icons only, no new DS components
```

### Minimum required fields

```text
Page name
Route
User goal
Page type
Required states
Known constraints
```

### Missing Information Response

If any minimum required field is missing, stop and respond only with:

```markdown
### Missing Required Information

Before I can run `/start-prototype-page`, please fill the missing fields:

\`\`\`text
Page name:           [ReactPageName]
Route:               [/route-path]
Navigation label:    [Sidebar label or 'none']
Navigation icon:     [SVGIconName or 'none']
User goal:           [What the user does on this page]
Page type:           [Full table / Form / Dashboard / Other]
Required states:     [Default, Loading, Empty, Error, ...]
Known constraints:   [e.g. SVG icons only, no new DS components]
\`\`\`
```

Do not inspect the project.
Do not create any files.
Do not continue until all minimum required fields are provided.

---

## Intake Gate

Do not inspect the project.
Do not create files.
Do not add routes.
Do not continue until Page name, Route, User goal, Page type, Required states, and Known constraints are provided.

---

## Required Workflow

1. Summarize intake.
2. Inspect existing project pages for reference patterns.
3. Run Component Mapping for the requested page type.
4. Create the React page `.tsx` file.
5. Create the page `.scss` file using SCSS tokens only.
6. Create mock data for all required states.
7. Add route inside the existing AppShell (Application Shell Navigation Agent).
8. Add sidebar navigation item if navigation label is provided.
9. Report what was created.

---

## Restrictions

- Do not replace AppShell, Sidebar, or Header
- Do not create a custom layout shell
- Do not use inline styles
- Do not hardcode hex colors, spacing, or typography
- Do not add icon libraries
- Do not modify the Infra library
- Do not add backend logic
- Do not expose debug state controls in visible UI
- Do not create DS components

---

## Expected Output

```markdown
### Start Prototype Page Summary — [PAGE NAME]

### Files Created

| File | Description |
|---|---|

### Components Used

### States Implemented

| State | How to Trigger |
|---|---|

### Route Added

### Navigation Added

### Gaps or Manual Review Needed

### Next Steps
```
