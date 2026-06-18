# Figma Scan

## Purpose

Read a Figma source through MCP and extract its full structural information before any mapping or implementation begins.

This command outputs a scan report only. It does not map to Infra/DS components. It does not implement anything.

---

## Agent to Use

Figma MCP Scanner Agent

Expected file: `.claude/agents/_figma/figma-mcp-scanner-agent.md`

---

## Skill to Use

Figma MCP Scan Skill

Expected file: `.claude/skills/_figma/figma-mcp-scan/SKILL.md`

---

## When to Use

Use this command before:
- /figma-map-components
- /figma-build-page
- /figma-align
- /figma-sync-navigation
- /figma-extract-tokens
- Any workflow that requires knowing what is in a Figma frame

---

## Required User Intake

Before running, verify the user has provided:

### Required intake fields

```text
Figma source:    Figma link, frame name, or node ID
Goal:            What to extract (full page / component / navigation / tokens / icons)
Target:          Page name, component name, or frame label
Known constraints: e.g. SVG icons only, no new DS components
```

### Minimum required fields

```text
Figma source
Goal
Target
```

### Missing Information Response

If Figma source is missing, stop and respond only with:

```markdown
### Missing Required Information

Before I can run `/figma-scan`, please provide:

\`\`\`text
Figma source:      [Paste Figma link or frame name]
Goal:              [What to extract]
Target:            [Page name or frame label]
Known constraints: [e.g. SVG icons only]
\`\`\`

### Why This Is Needed

`/figma-scan` reads Figma structure through MCP. Without a Figma source, there is nothing to read.
```

Do not inspect the project.
Do not read any Figma frame.
Do not generate any report.
Do not continue until a Figma source is provided.

---

## Intake Gate

Do not read Figma frames.
Do not extract structure.
Do not generate any output.
Do not continue until Figma source, Goal, and Target are provided.

---

## Required Workflow

1. Confirm Figma source received.
2. Read the Figma frame through MCP.
3. Extract layout structure, component instances, variables, icons, layout patterns, and visible states.
4. Produce the scan report.
5. Stop. Do not continue to mapping or implementation.

---

## Restrictions

- Do not map to Infra/DS components
- Do not inspect the project
- Do not implement code
- Do not create files
- Do not create components
- Do not create tokens
- Do not use inline styles
- Do not modify source files

---

## Expected Output

```markdown
### Figma Scan Report — [FRAME_NAME]

### Figma Source
- Link / Node ID:
- Page:
- Frame:

### Layout Structure

### Detected Component Instances
| Component Name | Variant | State | Layer Location |
|---|---|---|---|

### Detected Variables and Styles
| Name | Type | Value | Notes |
|---|---|---|---|

### Detected Icons
| Icon Name | Location | Size | Color Reference |
|---|---|---|---|

### Layout Patterns
| Area | Layout Type | Padding | Gap | Alignment |
|---|---|---|---|---|

### Detected States

### Open Questions

### Next Step
Recommended: Run /figma-map-components or /figma-build-page next.
```

---

## Final Rule

Stop after the scan report.

Do not continue to mapping or implementation unless the user explicitly asks.
