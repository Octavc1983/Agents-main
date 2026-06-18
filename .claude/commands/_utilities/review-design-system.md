# Review Design System

## Purpose

Review a prototype page or component for Design System compliance: correct DS component usage, SCSS token usage, no inline styles, no hardcoded visual values, SVG icons only, and no Infra library modifications.

---

## Agent to Use

Design System Review Agent

Expected file: `.claude/agents/_core/design-system-review-agent.md`

---

## Skill to Use

Design System Review Skill

Expected file: `.claude/skills/_core/design-system-review/SKILL.md`

---

## When to Use

Use after building any prototype page — including pages built from Figma (`/figma-build-page`) or from requirements — to verify DS compliance before sharing for review.

---

## Required User Intake

### Required intake fields

```text
Target file:           Path to the .tsx file to review (e.g. src/pages/ScansPage/ScansPage.tsx)
SCSS file:             Path to the .scss file (usually same folder)
Figma source:          Optional — Figma link for comparison context, or 'N/A'
Review scope:          Component usage / Token usage / Icons / Full DS review
Known constraints:     e.g. SVG icons only, no new DS components, no inline styles
```

### Minimum required fields

```text
Target file
Review scope
Known constraints
```

### Missing Information Response

If Target file is missing, stop and respond only with:

```markdown
### Missing Required Information

Before I can run `/review-design-system`, please provide:

\`\`\`text
Target file:     [src/pages/PageName/PageName.tsx]
SCSS file:       [src/pages/PageName/PageName.scss or 'N/A']
Review scope:    [Component usage / Token usage / Full DS review]
Known constraints: [e.g. SVG icons only, no new DS components]
\`\`\`
```

Do not read any files.
Do not continue until Target file is provided.

---

## Intake Gate

Do not read files.
Do not generate a review.
Do not continue until Target file is provided.

---

## Required Workflow

1. Read the target `.tsx` file.
2. Read the target `.scss` file.
3. Check: existing DS/Infra components used (no duplicates created).
4. Check: all imports from verified project paths.
5. Check: no inline styles.
6. Check: no hardcoded hex, spacing, typography, radius, shadow values.
7. Check: SVG icons only (no icon libraries).
8. Check: correct SCSS token usage.
9. Check: no Infra library modifications.
10. Produce compliance report.

---

## Restrictions

- Do not modify files unless fixes are explicitly requested
- Do not create new DS components
- Do not create new tokens
- Do not modify the Infra library

---

## Expected Output

```markdown
### Design System Review — [FILE NAME]

### Files Reviewed

### Compliance Check

| Check | Status | Notes |
|---|---|---|
| Existing DS components used (no duplicates) | ✓ / ✗ | |
| No duplicate components created | ✓ / ✗ | |
| No inline styles | ✓ / ✗ | |
| No hardcoded colors | ✓ / ✗ | |
| No hardcoded spacing | ✓ / ✗ | |
| No hardcoded typography | ✓ / ✗ | |
| SVG icons only | ✓ / ✗ | |
| Correct SCSS tokens | ✓ / ✗ | |
| No Infra modifications | ✓ / ✗ | |
| Verified import paths | ✓ / ✗ | |

### Issues Found

### Recommendation

Choose one:
- DS compliant — ready for review
- Minor issues — fix before review
- Major issues — fix required
- Not safe to share without fixes
```
