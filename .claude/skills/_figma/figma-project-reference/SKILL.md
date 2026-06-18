# Figma Project Reference Skill

## Purpose

Load and apply the project's Figma-to-React reference documentation before any implementation, component mapping, or Figma alignment task.

This skill is a reference loader — it does not implement anything. It gives implementation agents a complete, up-to-date map of:
- Which Figma component patterns map to which React components
- The exact component API (props, variants, sizes)
- Design token mappings (colors, spacing, typography, radius)
- Icon system rules
- Layout utility class patterns
- The Figma-to-React implementation checklist
- Historical screen mappings for ScansPage and the Sidebar

---

## When to Use

Use this skill before:
- `/ux-add-page` — to ensure component mapping uses verified project patterns
- `/figma-map-components` — as the base reference layer
- `/figma-build-page` — to confirm what exists before generating code
- `/map-components` — to supplement requirement-based mapping with project history
- `/figma-align` — to verify a page against Figma using known token mappings
- Any Figma MCP scan or frame analysis

---

## Reference Files

All files live at `.claude/skills/_figma/figma-project-reference/`:

| File | What It Contains |
|---|---|
| `component-mapping.md` | Full Figma → React component mapping with props, variants, SCSS classes, and decision tree |
| `figma-mcp-guidelines.md` | Figma MCP workflow: how to read a frame, map layers, identify tokens, and generate code |
| `figma-to-react-checklist.md` | 10-phase implementation checklist: analysis → mapping → setup → HTML → SCSS → state → QA → docs → testing → handoff |
| `figma-screen-mapping.md` | ScansPage Figma screen mapping: layout, components used, icons, tokens, mock data, pixel-perfect gaps |
| `navigation-sidebar-mapping.md` | Sidebar Figma mapping: dark IDIRA theme (#17243b), SVG icon system, token changes, before/after diff |

---

## Required Workflow

### Step 1 — Load Reference Files

Read all five reference files in this directory before beginning any mapping or implementation work.

### Step 2 — Extract Relevant Sections

Based on the task, extract only the sections relevant to the current work:

| Task type | Files to prioritise |
|---|---|
| Component mapping | `component-mapping.md` |
| Full page from Figma | `figma-mcp-guidelines.md` + `figma-to-react-checklist.md` |
| Token / color mapping | `component-mapping.md` (Design Token section) |
| Sidebar or navigation | `navigation-sidebar-mapping.md` |
| Scans page reference | `figma-screen-mapping.md` |
| New page checklist | `figma-to-react-checklist.md` |

### Step 3 — Apply to Current Task

Feed the extracted reference into the implementation agent as constraints and verified patterns. Do not override verified mappings with guesses.

### Step 4 — Flag Gaps

If the reference files do not cover a component or pattern needed for the current task, flag it explicitly as a gap and do not invent a mapping.

---

## Key Rules (from reference docs)

### Components — always use existing
- `AppShell`, `Header`, `Sidebar` — never recreate
- `Button`, `Card`, `LoadingState`, `EmptyState`, `ErrorState` — always import from their verified paths
- `VerticalTabs`, `HorizontalTabs` — from `src/design-system/components/`
- Never add external UI libraries

### Tokens — always use variables
- Colors: `var(--color-*)` CSS custom properties
- Spacing: `$spacing-*` SCSS variables (8px base)
- Typography: `$font-size-*`, `$font-weight-*`
- Radius: `$border-radius-*`
- Shadows: `$shadow-*`
- Never hardcode hex values, pixel sizes, or font sizes

### Icons — SVG only
- All icons from `src/assets/icons/NavIcons.tsx`
- Inline SVG React components only
- No PNG, no emoji, no icon fonts, no external icon libraries
- `size`, `className`, `aria-label` props supported on all icons

### Sidebar dark theme
- Background: `$color-background-dark` (#17243b)
- Border: `$color-border-dark` (#283f67)
- Active item: gradient `#223658 → #1d2d49` + 3px left accent bar (`$color-primary`)
- Icon colour on active: `$color-primary` (#7a80ff)
- Never change `Sidebar.tsx` for new pages — only add entries to `sidebarLinks` in `src/mock/prototypeMockData.ts`

---

## Output

After loading this skill, output a short confirmation:

```
Reference loaded: component-mapping · figma-mcp-guidelines · figma-to-react-checklist · figma-screen-mapping · navigation-sidebar-mapping

Key constraints active:
- Components: [list confirmed components relevant to current task]
- Tokens: CSS custom properties + SCSS variables only
- Icons: SVG from NavIcons.tsx only
- Sidebar: entries in prototypeMockData.ts only
- Gaps: [list any gaps not covered by reference docs]
```

Then proceed with the task.

---

## Restrictions

- Do not modify any of the reference files during a task
- Do not generate code in this skill — reference only
- Do not invent mappings not found in the reference docs
- Do not use this skill to bypass the Component Mapping Skill — run both
