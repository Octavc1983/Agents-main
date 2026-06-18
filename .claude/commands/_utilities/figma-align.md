# Figma Align

## Purpose

Compare a React prototype page against its Figma source and produce a Pixel Perfect gap report.

This command identifies visual, structural, spacing, typography, and color differences between Figma design and React implementation.

---

## Agent to Use

Figma Alignment Agent

Expected file: `.claude/agents/_figma/figma-alignment-agent.md`

---

## Skill to Use

Figma Alignment Review Skill

Expected file: `.claude/skills/_figma/figma-alignment-review/SKILL.md`

---

## When to Use

Use after building a page to verify visual accuracy before review.

---

## Required User Intake

### Required intake fields

```text
React page:            File path of the .tsx file to review (e.g. src/pages/ScansPage/ScansPage.tsx)
Figma source:          Figma link or frame name
Comparison goal:       Full page / Layout only / Typography only / Colors only / Components only / All
Pixel Perfect goal:    Strict match / Best effort / Layout only
Known constraints:     e.g. do not modify files, report only
```

### Minimum required fields

```text
React page
Figma source
Comparison goal
```

### Missing Information Response

If either React page or Figma source is missing:

```markdown
### Missing Required Information

Before I can run `/figma-align`, please provide:

\`\`\`text
React page:        [src/pages/PageName/PageName.tsx]
Figma source:      [Figma link or frame name]
Comparison goal:   [Full page / Layout only / Colors only / All]
\`\`\`
```

Do not read files.
Do not read Figma.
Do not compare anything.
Do not continue until React page path and Figma source are provided.

---

## Intake Gate

Do not read any files.
Do not read Figma.
Do not generate a gap report.
Do not continue until React page and Figma source are both provided.

---

## Required Workflow

1. Read the React `.tsx` file.
2. Read the React `.scss` file.
3. Read the Figma source through MCP.
4. Compare layout structure (sections, panels, columns).
5. Compare spacing and padding.
6. Compare typography (size, weight, line height).
7. Compare colors (token usage vs Figma values).
8. Compare border radius and shadows.
9. Compare icons (name, size, color).
10. Compare interaction states visible in Figma.
11. Produce gap report with severity levels.
12. Do not modify any files unless explicitly asked.

---

## Restrictions

- Do not modify implementation files
- Do not add inline styles
- Do not hardcode values
- Do not claim Pixel Perfect without this gap report
- Do not modify the Infra library

---

## Expected Output

```markdown
### Figma Alignment Review — [PAGE_NAME]

### Sources Compared
- React page:
- Figma source:

### Gap Report

| Area | React Value | Figma Value | Severity | Fix Approach |
|---|---|---|---|---|

### Visual Gaps (Layout, Spacing, Typography)

### Color Gaps

### Icon Gaps

### Component Gaps

### Token Gaps

### Correctly Aligned Items

### Severity Legend
- Critical: Broken layout or missing section
- Major: Clear visual difference visible to users
- Minor: Small offset or shade difference
- Informational: Noted but not blocking

### Recommendation
Choose one:
- Pixel Perfect — no significant gaps
- Minor gaps only — ready for review
- Major gaps — needs visual fixes before review
- Critical gaps — not ready for review

### Next Steps
```

---

## Final Rule

Stop after the gap report.

Do not modify files unless the user explicitly asks to apply fixes.
