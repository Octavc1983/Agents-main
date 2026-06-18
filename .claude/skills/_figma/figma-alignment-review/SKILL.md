# Figma Alignment Review Skill

## Purpose

Compare a React prototype implementation against a Figma source and produce a Pixel Perfect gap report.

This skill identifies visual, structural, and behavioral differences between the Figma design and the React implementation.

---

## When to Use

Use this skill after:
- A prototype page has been built
- A Figma source is available for comparison

Use before:
- PM review
- R&D handoff

---

## Inputs Required

- Target React page file path
- Figma source (link, frame name, or node ID)
- Comparison goal (full page / component / specific section)

---

## Required User Intake

Minimum required:

```text
Target React page:    File path of the .tsx file to review
Figma source:         Figma link or frame name
Comparison goal:      What to compare (layout / typography / colors / spacing / all)
```

If Figma source is missing, state: "Figma Alignment Review cannot run without a Figma source." Do not proceed.
If React page path is missing, ask for the file path before continuing.

---

## Required Project Inspection

Before reviewing:

1. Read the target React `.tsx` file
2. Read the target `.scss` file
3. Read the Figma source through MCP
4. Identify all visual elements in both
5. Compare structure, spacing, typography, colors, radius, shadows, icons

---

## Required Workflow

1. Receive React page path and Figma source.
2. Read the React implementation.
3. Read the Figma frame through MCP.
4. Compare layout structure (columns, sections, panels).
5. Compare spacing and padding (token values vs Figma values).
6. Compare typography (size, weight, line height, family).
7. Compare colors (token usage vs Figma color values).
8. Compare border radius and shadows.
9. Compare icons (name, size, color).
10. Compare interaction states if visible.
11. Produce the gap report.
12. Do not modify any files unless explicitly asked.

---

## Must Do

- Read both sources completely before comparing
- Report every detected gap with specific values
- Separate visual gaps from functional gaps from token gaps
- Mark severity for each gap (Critical / Major / Minor / Informational)
- Confirm which gaps require token additions (report as token gap, not inline style)
- List items that are correctly aligned

---

## Must Not Do

- Do not modify implementation files
- Do not add inline styles to fix gaps
- Do not hardcode values to close gaps
- Do not claim Pixel Perfect without a gap report
- Do not modify the Infra library
- Do not create new DS tokens

---

## Output Format

```markdown
### Figma Alignment Review — [PAGE_NAME]

### Sources Compared

- React page:
- Figma source:

### Summary

Overall alignment status.

### Gaps Found

| Area | React Value | Figma Value | Severity | Fix Approach |
|---|---|---|---|---|

### Visual Gaps (Layout, Spacing, Typography)

### Color Gaps

### Icon Gaps

### Component Gaps (wrong component used)

### Token Gaps (missing tokens)

### Correctly Aligned Items

### Severity Legend
- Critical: User-visible error or broken layout
- Major: Clear visual difference from design
- Minor: Small offset or color shade difference
- Informational: Difference noted but not blocking

### Recommendation

Choose one:
- Pixel Perfect — no significant gaps
- Minor gaps only — ready for review
- Major gaps — needs visual fixes before review
- Critical gaps — not ready for review

### Next Steps
```

---

## Example Prompt

```
Use the Figma Alignment Review Skill.

Goal:
Compare the React implementation to the Figma source and produce a gap report.

React page:
[src/pages/PageName/PageName.tsx]

Figma source:
[FIGMA LINK OR FRAME NAME]

Comparison goal:
Full page alignment review.

Expected output:
Gap report with severity levels. Do not modify files.
```
