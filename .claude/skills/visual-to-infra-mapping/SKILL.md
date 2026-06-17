# Visual to Infra Mapping

## Purpose

Analyze a screenshot, Figma frame, or visual reference and map every visible UI element to existing Infra / Design System components and existing tokens before any implementation begins.

The image is only a visual reference. The existing Infra / DS is the source of truth.

This skill is the prerequisite gate for all prototype implementation tasks.

---

## When to Use

Use this skill when you have any of the following and need to know what to build with:

- A UI screenshot
- A Figma frame or link
- A product screen mockup
- A navigation design image
- Any visual reference before writing code

Always run this skill before the Figma to React Page skill, the Table Master Details Template skill, or any prototype page build.

---

## Inputs Required

- Visual reference: screenshot, Figma frame, or image attachment
- Target page or component name (optional but helpful)
- Known project context (optional)

---

## Required Project Inspection

Before producing the mapping, inspect the project for:

1. All Infra / DS component folders — list every available component
2. All SCSS token files — `_colors.scss`, `_variables.scss`, `design-system/tokens/`
3. Existing CSS custom properties (`:root` definitions)
4. Existing icon system — `NavIcons.tsx` or equivalent
5. Existing page patterns — use the closest existing page as a reference
6. Existing layout patterns — AppShell, Sidebar, Header
7. Existing state components — `LoadingState`, `EmptyState`, `ErrorState`

---

## Required Workflow

1. Receive visual input.
2. Analyze the image and identify every visible UI section:
   - Page layout, shell, header, sidebar
   - Toolbar, filter trigger, search input
   - Table, list, card, grid
   - Buttons, icon buttons, chips, badges, status indicators
   - Tabs, dialogs, drawers, panels
   - Empty, loading, error states
   - Text hierarchy, spacing, color usage, icons, dividers
3. Inspect the project for existing components and tokens.
4. Map each visual element to the closest existing Infra / DS component.
5. Map each visual style to an existing token.
6. Map each icon to an existing SVG component.
7. Identify all gaps — missing components, missing tokens, missing icons, ambiguous behavior.
8. Decide implementation safety.
9. **Do not implement anything** until the mapping and gap report are complete and reviewed.

---

## Must Do

- Analyze visual input before touching the project
- Inspect the project before producing any mapping
- Map every visible element — do not skip sections
- Use the closest existing component, even if imperfect
- Report confidence level for each mapping (High / Medium / Low)
- Document every gap explicitly
- Stop and ask for clarification if the image is unclear or ambiguous
- Declare implementation safety before any code is written

---

## Must Not Do

- Create new DS components
- Create new tokens
- Use inline styles
- Hardcode hex colors, spacing, typography, radius, or shadows
- Invent component variants that do not exist
- Skip the mapping step and go directly to implementation
- Claim confidence without inspecting the project
- Treat visual similarity as DS alignment
- Add external UI libraries
- Add icon libraries
- Modify the official Infra library
- Claim Pixel Perfect accuracy without a gap report

---

## Output Format

```markdown
### Visual Analysis Summary

Short description of the screen analyzed.

### Screenshot State

Choose one:
- Default / empty state
- Active / data loaded state
- Details open state
- Error state
- Unknown — requires clarification

### Detected UI Sections

List every visible section:
- Page shell
- Sidebar / navigation
- Top header
- Page title / description
- Toolbar
- Filter
- Search
- Table / list / grid
- Row actions
- Status indicators
- Details panel
- Tabs
- Buttons / actions
- Empty / loading / error states

### Infra Component Mapping

| Visual Element | Existing Infra / DS Component | Import Path | Confidence | Notes |
|---|---|---|---|---|

### Token Mapping

| Style Type | Visual Usage | Existing Token | Notes |
|---|---|---|---|

### Icon Mapping

| Visual Icon | Existing SVG Component | Import Path | Confidence | Notes |
|---|---|---|---|---|

### Existing Patterns Found

List existing project pages or components to use as implementation reference.

### Gaps

#### Missing Components
#### Missing Tokens
#### Missing Icons
#### Ambiguous Behavior

### Implementation Safety

Choose one:
- Safe to implement with existing Infra
- Safe with documented placeholders
- Needs UX clarification before implementation
- Needs DS clarification before implementation
- Not safe — requires new DS assets
```

---

## Example Prompt

```
Use the Visual to Infra Mapping skill.

Goal:
Analyze the attached screenshot and map every visible UI element to existing Infra / DS components and tokens.

Input:
[Attach screenshot or Figma frame]

Target:
[PAGE_NAME or component name — optional]

Important:
The existing Infra / DS is the source of truth.
The image is only a visual reference.
Do not implement anything until the mapping and gap report are complete.
Do not create new components or tokens.
Do not use inline styles or hardcoded values.

Expected output:
Visual analysis summary, component mapping table, token mapping table, icon mapping table, gap report, implementation safety decision.
```
