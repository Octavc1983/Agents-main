# Figma Build Page

## Purpose

Build a complete React prototype page from a Figma source.

This command runs the full workflow: Figma scan → component mapping → page implementation → navigation integration → alignment gap report.

---

## Agents to Use

Run in this order:
1. Figma MCP Scanner Agent — read Figma structure
2. Figma to Infra Mapping Agent — map to Infra/DS
3. Component Mapping Agent — confirm component mapping
4. Application Shell Navigation Agent — connect route and navigation
5. Prototype Page Builder Agent — build the page
6. State Builder Agent — add required states
7. Figma Alignment Agent — produce gap report

Expected files:
```text
.claude/agents/_figma/figma-mcp-scanner-agent.md
.claude/agents/_figma/figma-to-infra-mapping-agent.md
.claude/agents/_core/component-mapping-agent.md
.claude/agents/_core/application-shell-navigation-agent.md
.claude/agents/_core/prototype-page-builder-agent.md
.claude/agents/_infra/state-builder-agent.md
.claude/agents/_figma/figma-alignment-agent.md
```

---

## Skills to Use

```text
.claude/skills/_figma/figma-mcp-scan/SKILL.md
.claude/skills/_figma/figma-to-infra-mapping/SKILL.md
.claude/skills/_core/component-mapping/SKILL.md
.claude/skills/_core/application-shell-navigation/SKILL.md
.claude/skills/_figma/figma-to-react-page/SKILL.md
.claude/skills/_infra/prototype-state-patterns/SKILL.md
.claude/skills/_figma/figma-alignment-review/SKILL.md
```

---

## When to Use

Use when you have a Figma source and want to build the full page — scanning, mapping, implementing, and reviewing in one workflow.

If you only want the mapping (no implementation), use /figma-map-components instead.

---

## Required User Intake

### Required intake fields

```text
Figma source:          Figma link, frame name, or node ID
Page name:             React page component name (e.g. ScansPage)
Route:                 Target route (e.g. /scans)
Navigation label:      Sidebar label (e.g. Scans)
Navigation icon:       SVG icon name (e.g. ScansIcon)
User goal:             What the user is trying to do on this page
Page type:             Full table / Table with filters / Table to master details / Form / Dashboard / Other
Required states:       Default / Loading / Empty / Error / [others]
Pixel Perfect goal:    Strict match / Best effort / Layout only
Known constraints:     e.g. SVG icons only, no new DS components, no inline styles
```

### Minimum required fields

```text
Figma source
Page name
Route
User goal
Page type
Required states
Known constraints
```

### Missing Information Response

If Figma source is missing:

```markdown
### Missing Required Information

Before I can run `/figma-build-page`, please provide:

\`\`\`text
Figma source:        [Paste Figma link or frame name]
Page name:           [ReactPageName]
Route:               [/route-path]
Navigation label:    [Sidebar label]
Navigation icon:     [SVGIconName or 'none']
User goal:           [What the user does on this page]
Page type:           [Full table / Table to master details / Form / Dashboard / Other]
Required states:     [Default, Loading, Empty, Error, ...]
Pixel Perfect goal:  [Strict match / Best effort / Layout only]
Known constraints:   [e.g. SVG icons only, no new DS components]
\`\`\`
```

Do not scan Figma.
Do not map components.
Do not implement.
Do not continue until Figma source, Page name, Route, and User goal are provided.

---

## Intake Gate

Do not scan Figma.
Do not map components.
Do not build the page.
Do not add routes.
Do not continue until Figma source, Page name, Route, User goal, and Known constraints are provided.

---

## Required Workflow

1. Summarize provided intake.
2. Read Figma source through MCP (Figma MCP Scanner Agent).
3. Map Figma elements to Infra/DS components and tokens (Figma to Infra Mapping Agent).
4. Confirm component mapping and identify gaps (Component Mapping Agent).
5. Inspect existing project structure.
6. Build the React page using existing AppShell and DS components.
7. Create SCSS file using SCSS tokens only.
8. Add mock data for all required states.
9. Connect route inside existing AppShell (Application Shell Navigation Agent).
10. Add sidebar navigation item if requested.
11. Add all required states (State Builder Agent).
12. Produce Pixel Perfect gap report (Figma Alignment Agent).
13. Report implementation summary.

---

## Restrictions

- Do not replace AppShell, Sidebar, or Header
- Do not create custom layout shell
- Do not use inline styles
- Do not hardcode hex colors, spacing, or typography
- Do not add icon libraries
- Do not modify the Infra library
- Do not add backend logic
- Do not add real API calls
- Do not expose debug state controls in visible UI
- Do not claim Pixel Perfect without gap report
- Do not create DS components
- Do not create new tokens

---

## Expected Output

```markdown
### Figma Build Page Summary — [PAGE NAME]

### Figma Source Scanned

### Component Mapping Summary
[Brief mapping summary or link to /figma-map-components output]

### Files Created

| File | Description |
|---|---|

### Components Used

| Component | Import Path | Notes |
|---|---|---|

### Tokens Used

### States Implemented

| State | How to Trigger |
|---|---|

### Route Added

### Navigation Added

### Pixel Perfect Gap Report

| Area | React Value | Figma Value | Severity | Fix Approach |
|---|---|---|---|---|

### Restrictions Followed

- No AppShell modified
- No Sidebar modified
- No inline styles used
- No hardcoded values
- No icon libraries added
- No DS components created

### Gaps and Manual Review

### Open Questions
```
