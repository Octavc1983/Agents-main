# Figma MCP Scan Skill

## Purpose

Define the reusable workflow for reading a Figma source through MCP and extracting its full structure before any mapping or implementation begins.

---

## When to Use

Use this skill before:
- Mapping Figma components to Infra/DS
- Building a React page from Figma
- Syncing navigation from Figma
- Extracting tokens from Figma
- Running Pixel Perfect alignment review

---

## Inputs Required

```text
Figma source:     Figma link, frame name, or node ID
Goal:             What to extract
Target:           Page, component, or frame label
Known constraints: e.g. SVG icons only, no new DS components
```

---

## Required User Intake

Minimum required before running:

```text
Figma source
Goal
Target
```

If Figma source is missing, state clearly: "This skill cannot run without a Figma source." Do not proceed.

---

## Required Project Inspection

Not required for scan-only phase. This skill reads Figma only — project inspection happens in the mapping phase.

---

## Required Workflow

1. Receive Figma source and extraction goal.
2. Read the Figma frame or node through MCP.
3. Extract frame name, node ID, and page label.
4. Extract the overall layout structure (app shell, header, sidebar, content areas, panels).
5. Extract all component instances (name, variant, state, parent layer).
6. Extract all variables and styles (color, typography, spacing, radius, shadow).
7. Extract all icon instances (name, size, color reference).
8. Extract layout patterns (auto layout, grid, padding, gap, alignment).
9. Identify visible states (default, loading, empty, error, selected).
10. Produce the scan report.
11. Stop. Do not continue to mapping or implementation.

---

## Must Do

- Read the Figma frame completely before reporting
- Report every detected component instance by name and variant
- Report every detected variable and style
- Report every detected icon
- Report frame layout patterns
- Report detected states
- Ask about unclear layer names or ambiguous structure
- Stop after the report

---

## Must Not Do

- Do not map to Infra/DS components in this phase
- Do not inspect the project in this phase
- Do not implement any code
- Do not invent component names not present in Figma
- Do not create files

---

## Output Format

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
```

---

## Example Prompt

```
Use the Figma MCP Scan Skill.

Goal:
Read the provided Figma frame and extract full structure.

Figma source:
[FIGMA LINK OR FRAME NAME]

Target:
[PAGE OR COMPONENT NAME]

Expected output:
Scan report with component instances, variables, icons, layout patterns, states.
Do not map to Infra. Do not implement.
```
