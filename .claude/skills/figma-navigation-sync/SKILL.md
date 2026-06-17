# Figma Navigation Sync

## Purpose

Read a navigation sidebar from Figma MCP and update the project navigation configuration, sidebar styling, hierarchy, routes, active state, and icon mapping — using existing project patterns only.

This skill does not replace the existing navigation architecture. It updates the content and styling of what is already there.

---

## When to Use

Use this skill when:

- A UX designer provides a Figma link or frame containing a sidebar or navigation design
- The sidebar navigation items, hierarchy, icons, or labels need to match Figma
- New navigation items must be added to the existing sidebar config
- Route paths need to be aligned with the Figma navigation structure
- The sidebar active state or icon set needs updating

---

## Inputs Required

- Figma frame link or MCP node ID containing the navigation sidebar
- Confirmation of which sidebar config file or mock data file stores navigation items
- List of currently active routes (to avoid breaking existing navigation)
- Any known icon constraints or icon naming conventions

---

## Required Project Inspection

Before making any changes:

1. Find the existing `Sidebar` component — do not replace it
2. Find the existing navigation config or mock data (e.g. `sidebarLinks` in `prototypeMockData.ts`)
3. Find the existing `AppShell` — confirm how Sidebar receives its props
4. Find the existing icon system — `NavIcons.tsx` or equivalent
5. Find the existing router file — list all current routes
6. Identify which navigation items already exist and must be preserved

---

## Required Workflow

1. Read the Figma navigation frame through MCP.
2. Extract: all navigation sections, groups, items, labels, hierarchy, icons, badges, active states, expanded states, and ordering.
3. Convert Figma labels to stable IDs and route-safe paths.
4. Map each Figma navigation item to an existing route or propose a new route.
5. Map each Figma icon to an existing SVG component.
6. Identify missing icons — do not invent new icons automatically.
7. Compare extracted navigation with current sidebar config.
8. Update only the navigation config / mock data — do not touch Sidebar component internals.
9. Add missing icons to the icon file only if following the existing SVG inline pattern.
10. Report all changes, assumptions, missing icons, and missing routes.

---

## Must Do

- Read Figma through MCP before any changes
- Preserve the existing Sidebar component
- Preserve the existing AppShell
- Preserve the existing routing conventions
- Preserve all existing navigation items unless explicitly told to remove them
- Map Figma labels to stable kebab-case IDs
- Use existing SVG icon components
- Report every missing icon as a gap
- Report every ambiguous hierarchy item
- Keep implementation scoped to navigation config only

---

## Must Not Do

- Replace the existing Sidebar component
- Replace the existing navigation architecture
- Replace the existing AppShell
- Create full page implementations
- Add non-navigation page code
- Use PNG, JPG, emoji, or icon font icons
- Add icon libraries
- Add external UI libraries
- Modify the official Infra library
- Delete existing navigation items without explicit approval
- Invent navigation hierarchy not visible in Figma
- Add Tailwind unless already present

---

## Output Format

```markdown
### Navigation Sync Summary

### Figma Source

Node / frame / link used.

### Extracted Navigation Structure

List all items extracted from Figma with hierarchy.

### Navigation Config Mapping

| Figma Label | ID | Route | Existing Route | Icon | Notes |
|---|---|---|---|---|---|

### Icon Mapping

| Figma Icon | Existing SVG Component | Import Path | Confidence | Notes |
|---|---|---|---|---|

### Active / Expanded State Mapping

How active state and expanded state are handled.

### Files Updated

List all files changed.

### Items Preserved

List existing navigation items that were kept unchanged.

### Gaps

#### Missing Icons
#### Missing Routes
#### Ambiguous Hierarchy
#### Items Needing UX Clarification

### Assumptions

### Final Recommendation

Choose one:
- Navigation config ready for review
- Requires UX clarification on hierarchy
- Requires icon additions before complete
- Needs manual review before merging
```

---

## Example Prompt

```
Use the Figma Navigation Sync skill.

Goal:
Read the navigation sidebar from Figma and update the project navigation config to match.

Figma source:
[Figma link or MCP node ID]

Important:
Do not replace the existing Sidebar component.
Do not replace the existing navigation architecture.
Do not replace the existing AppShell.
Preserve all existing navigation items.
Use existing SVG icon system only.
Do not add icon libraries.
Do not modify the official Infra library.
Map Figma icons to existing SVG components where possible.
Report missing icons as gaps.

Expected output:
Extracted navigation structure, navigation config mapping, icon mapping, files updated, gaps report, final recommendation.
```
