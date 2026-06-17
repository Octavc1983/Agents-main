# Figma to React Page

## Purpose

Create a React prototype page from a Figma frame using the existing project structure, existing Infra / DS components, existing tokens, existing routing patterns, and existing SCSS conventions.

This skill reads Figma through MCP (when available), maps sections to existing project patterns, and produces a prototype-ready page that follows the real Infra / DS — not a custom recreation of the visual.

---

## When to Use

Use this skill when:

- A Figma frame or link is provided and a React prototype page must be created
- A UX designer has delivered a screen design and development needs to prototype it
- A new route and page file must be created from a Figma source

Prerequisites — run these skills first if not already done:
1. Visual to Infra Mapping — identify components and tokens
2. Design System Token Mapping — confirm token coverage

---

## Inputs Required

- Figma frame link or MCP node ID
- Page name (used for file naming and route)
- Target route (e.g. `/accounts`)
- Brief description of the page purpose and main user goal
- Known table columns or content structure (optional, extracted from Figma if available)
- Known tabs or sections (optional)

---

## Required Project Inspection

Before writing any code:

1. Confirm existing `AppShell` and how pages are rendered inside it
2. Confirm existing `Sidebar` — do not replace
3. Confirm existing `Header` — do not replace
4. Confirm router file — identify how new routes are added
5. Confirm `src/pages/` structure — follow existing folder and file naming
6. Confirm `src/mock/` structure — follow existing mock data pattern
7. Confirm `src/types/` — follow existing TypeScript type pattern
8. Identify a similar existing page to use as implementation reference
9. Confirm SCSS import pattern — `@use` paths and token imports
10. Confirm icon system — use existing SVG components only

---

## Required Workflow

1. Read Figma frame through MCP (if MCP is available).
2. Identify the frame purpose, main user goal, and primary interaction.
3. Identify whether the frame shows a default state or an active/details-open state.
4. Run or reference the Visual to Infra Mapping skill to confirm component and token coverage.
5. Map Figma sections to existing project layout and components.
6. Identify all gaps — missing components, tokens, icons.
7. Report gaps before implementation.
8. Create the page file at `src/pages/[PageName]/[PageName].tsx`.
9. Create the SCSS file at `src/pages/[PageName]/[PageName].scss`.
10. Create mock data at `src/mock/[pageName]MockData.ts`.
11. Create TypeScript types at `src/types/[pageName].types.ts` if needed.
12. Register the route in the router file.
13. Add the page to the sidebar navigation config if relevant.
14. Add loading, empty, and error states using existing state components.
15. Provide Figma-to-React mapping document if the gap is significant.
16. Provide Pixel Perfect gap report.

---

## Must Do

- Read Figma through MCP before any implementation (when available)
- Identify the Figma frame state before assuming it is the default state
- Follow existing folder structure and file naming conventions
- Use existing Infra / DS components
- Use existing tokens
- Use existing SCSS variables and import patterns
- Use existing SVG icon system
- Use existing router and sidebar patterns
- Keep implementation simple and prototype-focused
- Add loading, empty, and error states
- Document all assumptions and gaps
- Provide Pixel Perfect gap report

---

## Must Not Do

- Replace the existing AppShell
- Replace the existing Sidebar
- Replace the existing Header
- Create a custom white prototype header
- Create new DS components
- Create new tokens
- Use inline styles
- Hardcode hex colors, spacing, typography, radius, or shadows
- Add Tailwind unless already present
- Add external UI libraries
- Add icon libraries
- Modify the official Infra library
- Replace existing routing architecture
- Change unrelated files
- Add backend integration or real API calls
- Claim Pixel Perfect accuracy without a gap report

---

## Output Format

```markdown
### Figma to React Page Summary

### Figma Source

Node / frame / link used.

### Page Purpose

What the user is trying to accomplish on this page.

### Figma Frame State

Choose one:
- Default / empty state
- Data loaded state
- Details open state
- Unknown — treated as default

### Files Created or Updated

List all files.

### Route Added

Path and router file change.

### Sidebar Navigation Change

If applicable.

### Infra Component Mapping Used

| Figma Section | Existing Component | Import Path | Notes |
|---|---|---|---|

### Token Coverage

Confirmed / gaps listed.

### Mock Data Added

Summary of mock records and edge cases.

### States Implemented

- Default
- Loading
- Empty
- Error
- [Any interaction states]

### Pixel Perfect Gap Report

List visual gaps against Figma.

### Assumptions

List decisions made without explicit Figma confirmation.

### Open Questions

For UX / PM.

### Final Recommendation

Choose one:
- Ready for UX review
- Needs Figma clarification
- Needs DS review
- Needs token review
```

---

## Example Prompt

```
Use the Figma to React Page skill.

Goal:
Create a React prototype page for [PAGE_NAME] at route /[route].

Figma source:
[Figma link or MCP node ID]

Page purpose:
[Brief description of the page and main user goal]

Important:
Use existing Infra / DS components only.
Use existing tokens only.
Do not create new components or tokens.
Do not use inline styles or hardcoded visual values.
Use existing routing and navigation patterns.
Use existing SVG icon system.
Do not modify the official Infra library.

Expected output:
Figma analysis, component mapping, files created, route added, states implemented, Pixel Perfect gap report.
```
