# Figma Map Components

## Purpose

Map a Figma frame's detected elements to existing Infra / Design System components, SCSS tokens, and SVG icons before implementation begins.

This command must stop after the mapping report. It does not implement anything.

---

## Agents to Use

1. Figma MCP Scanner Agent — if a scan report is not already available
2. Figma to Infra Mapping Agent — to produce the component/token/icon mapping

Expected files:
```text
.claude/agents/_figma/figma-mcp-scanner-agent.md
.claude/agents/_figma/figma-to-infra-mapping-agent.md
```

---

## Skills to Use

1. Figma MCP Scan Skill
2. Figma to Infra Mapping Skill
3. Component Mapping Skill

Expected files:
```text
.claude/skills/_figma/figma-mcp-scan/SKILL.md
.claude/skills/_figma/figma-to-infra-mapping/SKILL.md
.claude/skills/_core/component-mapping/SKILL.md
```

---

## When to Use

Use this command before:
- /figma-build-page
- Running the Prototype Page Builder Agent
- Implementing any Figma-driven page

---

## Required User Intake

### Required intake fields

```text
Figma source:          Figma link, frame name, or node ID
                       OR: paste scan report from /figma-scan
Goal:                  What to map (full page / component / navigation / tokens)
Target page:           Page name or component to map to
Known constraints:     e.g. SVG icons only, no new DS components, no inline styles
```

### Minimum required fields

```text
Figma source or scan report
Goal
Target page
Known constraints
```

### Missing Information Response

If Figma source is missing:

```markdown
### Missing Required Information

Before I can run `/figma-map-components`, please provide:

\`\`\`text
Figma source or scan report:  [Figma link / frame name / or paste /figma-scan output]
Goal:                         [What to map]
Target page:                  [Page name]
Known constraints:            [e.g. SVG icons only, no new DS components]
\`\`\`

### Why This Is Needed

Component mapping requires a Figma visual reference to map against existing Infra/DS components and tokens.
```

Do not inspect the project.
Do not generate a mapping.
Do not continue until a Figma source or scan report is provided.

---

## Intake Gate

Do not inspect the project.
Do not generate a component mapping.
Do not generate a token mapping.
Do not generate code.
Do not continue until Figma source, Goal, and Target page are provided.

---

## Required Workflow

1. If scan report not available: run /figma-scan first to extract Figma structure.
2. Inspect project structure (components, tokens, icons).
3. Map each Figma component to an existing Infra/DS component.
4. Map each Figma variable/style to an existing SCSS token.
5. Map each Figma icon to an existing SVG component.
6. Confirm all import paths by reading project files.
7. Mark confidence levels for every mapping.
8. List components that must not be recreated.
9. List all gaps.
10. Provide notes for Prototype Page Builder Agent.
11. Stop before implementation.

---

## Restrictions

- Do not implement the page
- Do not create components
- Do not create tokens
- Do not invent import paths
- Do not invent props or APIs
- Do not use inline styles
- Do not hardcode visual values
- Do not modify the Infra library
- Do not add external UI libraries
- Do not add icon libraries
- Do not claim a match without verifying the file exists

---

## Expected Output

```markdown
### Figma Component Mapping Report — [PAGE NAME]

### Component Mapping
| Figma Component | Infra/DS Component | Import Path | Confidence | Notes |
|---|---|---|---|---|

### Token Mapping
| Figma Variable/Style | Existing Token | Token File | Confidence | Notes |
|---|---|---|---|---|

### Icon Mapping
| Figma Icon | SVG Component | Export Path | Confidence | Notes |
|---|---|---|---|---|

### Components That Must Not Be Recreated

### Gaps
#### Missing Components
#### Missing Tokens
#### Missing Icons
#### Ambiguous Decisions

### Notes for Prototype Page Builder Agent

### Implementation Safety
Choose one:
- Ready for implementation using existing Infra
- Ready only with documented placeholders
- Needs UX clarification
- Needs DS clarification
- Not safe to implement without creating new DS assets

### Open Questions
```

---

## Final Rule

Stop after the mapping report.

Do not continue to implementation unless the user explicitly asks to proceed.
