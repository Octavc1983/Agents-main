# Create Agent Prompts Page

## Purpose

Create a prototype page that displays a library of Claude agent prompts for this project — to make prompts discoverable and reusable across the team.

---

## Agent to Use

Prototype Page Builder Agent

Expected file: `.claude/agents/prototype-page-builder-agent.md`

---

## Skill to Use

Agent Prompts Library Skill

Expected file: `.claude/skills/agent-prompts-library/SKILL.md`

---

## When to Use

Use when you want a visual, browsable page inside the prototype that shows the available Claude agents, their prompts, and how to use them.

---

## Required User Intake

### Required intake fields

```text
Route:              Route for the prompts page (e.g. /claude-prompts or /agent-library)
Navigation label:   Sidebar label (e.g. Agent Prompts) or 'none'
Sections:           Which agents/categories to cover (e.g. All / Figma / DS Review / Page Building)
Known constraints:  e.g. SVG icons only, no new DS components
```

### Minimum required fields

```text
Route
Sections
```

### Missing Information Response

If Route is missing:

```markdown
### Missing Required Information

Before I can run `/create-agent-prompts-page`, please provide:

\`\`\`text
Route:             [/route-path]
Navigation label:  [Sidebar label or 'none']
Sections:          [All / Figma / DS Review / Page Building / ...]
Known constraints: [e.g. SVG icons only]
\`\`\`
```

Do not create files.
Do not continue until Route is provided.

---

## Intake Gate

Do not create files.
Do not add routes.
Do not continue until Route is provided.

---

## Required Workflow

1. Inspect the `.claude/agents/` folder to list all agents.
2. Inspect the `.claude/commands/` folder to list all commands.
3. Inspect the `.claude/skills/` folder to list all skills.
4. Create a React page that lists agents, their purpose, and usage examples.
5. Group by category: Figma, Component Mapping, Page Building, Review, Navigation, Documentation.
6. Add route and navigation if requested.
7. Report what was created.

---

## Restrictions

- Do not use inline styles
- Do not hardcode values
- Do not add icon libraries

---

## Expected Output

```markdown
### Agent Prompts Page Summary

### Files Created

### Sections Covered

| Category | Agents / Commands Listed |
|---|---|

### Route Added

### Navigation Added
```
