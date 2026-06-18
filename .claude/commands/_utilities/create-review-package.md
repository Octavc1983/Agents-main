# Create Review Package

## Purpose

Run a full pre-review audit on a completed prototype page and generate a complete review package: DS compliance, UX flow, Figma alignment, prototype documentation.

This command runs multiple review agents in sequence and consolidates their outputs.

---

## Agents to Use

Run in order:
1. Design System Review Agent — DS compliance check
2. UX Flow Review Agent — UX/flow check
3. Figma Alignment Agent — Pixel Perfect gap report (if Figma source provided)
4. Prototype Documentation Agent — generate documentation

---

## Skills to Use

```text
.claude/skills/_core/design-system-review/SKILL.md
.claude/skills/_core/ux-flow-validation/SKILL.md
.claude/skills/_figma/figma-alignment-review/SKILL.md
.claude/skills/_documentation/prototype-documentation/SKILL.md
```

---

## When to Use

Use before:
- A PM review session
- An R&D handoff
- A UX/DS stakeholder walkthrough
- Sharing the prototype for feedback

---

## Required User Intake

### Required intake fields

```text
Target page:        React page name (e.g. ScansPage)
Page file:          File path (e.g. src/pages/ScansPage/ScansPage.tsx)
Route:              Route path
Figma source:       Figma link or 'N/A'
User goal:          What the user accomplishes on this page
Review audience:    PM / UX / R&D / All
Known gaps:         Optional — any known issues
```

### Minimum required fields

```text
Target page
Page file
Route
User goal
Review audience
```

### Missing Information Response

If any minimum required field is missing:

```markdown
### Missing Required Information

Before I can run `/create-review-package`, please provide:

\`\`\`text
Target page:       [PageName]
Page file:         [src/pages/PageName/PageName.tsx]
Route:             [/route-path]
Figma source:      [Figma link or 'N/A']
User goal:         [What the user accomplishes]
Review audience:   [PM / UX / R&D / All]
Known gaps:        [Optional]
\`\`\`
```

Do not read files.
Do not generate any review.
Do not continue until minimum required fields are provided.

---

## Intake Gate

Do not read files.
Do not generate any review.
Do not continue until Target page, Page file, Route, User goal, and Review audience are provided.

---

## Required Workflow

1. Summarize the page and review goal.
2. Run DS compliance check.
3. Run UX flow review.
4. If Figma source provided: run Figma alignment review.
5. Generate prototype documentation.
6. Consolidate findings into a review package.

---

## Restrictions

- Do not modify files unless fixes are explicitly requested
- Do not claim Pixel Perfect without alignment review
- Do not invent product decisions

---

## Expected Output

```markdown
### Review Package — [PAGE_NAME]

### Page Summary

### DS Compliance Summary

| Check | Status | Issues |
|---|---|---|

### UX Flow Summary

| Check | Status | Issues |
|---|---|---|

### Figma Alignment Summary

| Area | Status | Gaps |
|---|---|---|

### Overall Status

Choose one:
- Ready for [audience] review
- Minor issues — fix before review
- Major issues — fix required

### Full Documentation

[Prototype Documentation output]

### Open Questions for Review

### Next Steps
```
