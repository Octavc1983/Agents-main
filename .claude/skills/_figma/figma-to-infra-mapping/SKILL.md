# Figma to Infra Mapping Skill

## Purpose

Map every element detected in a Figma scan to existing Infra / Design System components, SCSS tokens, and SVG icons in the project.

This skill produces the mapping report that implementation agents must follow. It does not implement anything.

---

## When to Use

Use this skill after:
- Figma MCP Scan Skill (scan report available)

Use before:
- /figma-build-page
- /map-components (Figma variant)
- Prototype Page Builder Agent

---

## Inputs Required

At least one of:
- Figma scan report (from Figma MCP Scan Skill)
- Raw Figma link or frame name

Plus:
- Goal: what to map (full page / component / navigation / tokens only)
- Known constraints

---

## Required User Intake

Minimum required:
```text
Figma source or scan report
Goal
Known constraints
```

If no Figma source or scan report is provided, state clearly: "This skill requires a Figma scan report or Figma source." Do not proceed.

---

## Required Project Inspection

Before mapping, inspect:

```text
src/components/
src/components/layout/
src/components/ui/
src/design-system/
src/styles/_variables.scss
src/assets/icons/
```

Also inspect:
- Existing page implementations (to understand usage patterns)
- Existing import paths
- Existing SCSS token usage

---

## Required Workflow

1. Receive Figma scan report or raw Figma source.
2. If raw source: run Figma MCP Scan Skill first to extract structure.
3. Inspect project components, tokens, and icon files.
4. For each detected Figma component: find matching Infra/DS component.
5. For each detected variable/style: find matching SCSS token.
6. For each detected icon: find matching SVG icon component.
7. Confirm all import paths by reading the project files.
8. Mark confidence level for every mapping.
9. List components that must not be recreated.
10. List all gaps (missing components, tokens, icons).
11. Provide implementation notes for Prototype Page Builder Agent.
12. Stop before implementation.

---

## Mapping Rules

### Component mapping confidence
- **High** — component and import path confirmed in project files
- **Medium** — component found, usage pattern needs review
- **Low** — likely match, import path needs verification
- **Gap** — no matching component found

### Token mapping rule
Only use tokens confirmed in project SCSS files.
If a Figma style has no matching token, document as a token gap.

### Icon mapping rule
Only map to SVG components found in `src/assets/icons/`.
Do not suggest adding icon libraries.
If an icon is missing, document as an icon gap.

### Import path rule
Only include import paths verified by reading project files.
Write "needs verification" if path is not confirmed.

---

## Must Do

- Inspect project before mapping
- Confirm every component exists before listing it
- Confirm every import path by reading project files
- Confirm every token exists in SCSS token files
- Mark confidence for every mapping
- List all gaps clearly
- Stop before implementation

---

## Must Not Do

- Do not implement code
- Do not create components
- Do not create tokens
- Do not invent import paths
- Do not suggest adding UI libraries
- Do not suggest adding icon libraries
- Do not use inline styles
- Do not hardcode visual values

---

## Output Format

```markdown
### Figma to Infra Mapping Report — [PAGE/COMPONENT NAME]

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

## Example Prompt

```
Use the Figma to Infra Mapping Skill.

Goal:
Map Figma frame elements to existing Infra/DS components and tokens.

Input:
[PASTE SCAN REPORT OR FIGMA LINK]

Target:
[PAGE NAME]

Known constraints:
SVG icons only. No new DS components. No inline styles.

Expected output:
Full mapping report. Do not implement.
```
