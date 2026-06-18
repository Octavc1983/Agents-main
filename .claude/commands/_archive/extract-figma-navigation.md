# Extract Figma Navigation

## Purpose

Read a navigation sidebar from Figma MCP and generate the corresponding project navigation configuration and SVG icon list.

This is focused on extracting navigation structure only — it does not build pages.

---

## Agents to Use

1. Figma Navigation Sidebar Extractor Agent — read Figma navigation structure
2. Application Shell Navigation Agent — apply to project navigation config

Expected files:
```text
.claude/agents/figma-navigation-sidebar-extractor-agent.md
.claude/agents/application-shell-navigation-agent.md
```

---

## Skills to Use

```text
.claude/skills/figma-mcp-scan/SKILL.md
.claude/skills/figma-navigation-sync/SKILL.md
.claude/skills/application-shell-navigation/SKILL.md
.claude/skills/svg-icon-system/SKILL.md
```

---

## When to Use

Use when:
- You need to extract the full navigation structure from a Figma sidebar frame
- You want to generate a navigation config from Figma before building pages
- You need to map Figma navigation icons to project SVG icons

If you only want to sync changes to existing navigation, use `/figma-sync-navigation` instead.

---

## Required User Intake

### Required intake fields

```text
Figma source:           Figma link or navigation sidebar frame name
Goal:                   What to extract (full nav structure / items only / icons only / structure + config)
Output format:          Navigation config object / Route list / Both
Known constraints:      e.g. SVG icons only, preserve existing routes, no architecture replacement
```

### Minimum required fields

```text
Figma source
Goal
Known constraints
```

### Missing Information Response

If Figma source is missing:

```markdown
### Missing Required Information

Before I can run `/extract-figma-navigation`, please provide:

\`\`\`text
Figma source:     [Figma link or navigation frame name]
Goal:             [What to extract]
Output format:    [Navigation config / Route list / Both]
Known constraints: [e.g. SVG icons only, preserve existing routes]
\`\`\`
```

Do not read Figma.
Do not inspect the project.
Do not generate navigation config.
Do not continue until Figma source is provided.

---

## Intake Gate

Do not read Figma.
Do not inspect project files.
Do not generate navigation config.
Do not continue until Figma source and Goal are provided.

---

## Required Workflow

1. Read the Figma navigation frame through MCP.
2. Extract all navigation items (labels, hierarchy, icons).
3. Inspect existing project navigation data file.
4. Map each Figma navigation item to project format.
5. Map Figma icons to existing SVG icon components.
6. Document icon gaps.
7. Generate navigation config output.
8. Do not apply changes unless explicitly requested.
9. Report extracted navigation structure.

---

## Restrictions

- Do not replace existing navigation architecture
- Do not add icon libraries
- Do not apply changes to project files unless explicitly requested
- Do not create new pages

---

## Expected Output

```markdown
### Figma Navigation Extraction — [FRAME NAME]

### Navigation Items Detected

| Label | Route | Icon | Level | Parent |
|---|---|---|---|---|

### Proposed Navigation Config

```ts
// Navigation data — to be added to existing navigation config file
```

### Icon Status

| Figma Icon | Project SVG Component | Status |
|---|---|---|

### Icon Gaps

Icons required but not in project icon file.

### Next Steps

- To apply: run `/connect-navigation` for each item
- To create missing icons: run `/figma-create-icons`
- To sync: run `/figma-sync-navigation`
```
