# Review Icons

## Purpose

Audit icon usage across a page or the full project and check for compliance with the SVG icon system rules: inline SVG components only, no icon libraries, no hardcoded colors, correct SvgIconProps interface.

---

## Skill to Use

SVG Icon System Skill

Expected file: `.claude/skills/_infra/svg-icon-system/SKILL.md`

---

## When to Use

Use when:
- Checking if a page uses the correct SVG icon system
- Auditing for icon library imports (not allowed)
- Identifying missing icons before a DS review
- Checking that new icons follow the SvgIconProps pattern

---

## Required User Intake

### Required intake fields

```text
Target:           File path, page folder, or 'full project'
Review goal:      Usage compliance / Missing icons / Icon library check / All
Known constraints: e.g. SVG icons only, no icon libraries, currentColor only
```

### Minimum required fields

```text
Target
Review goal
```

### Missing Information Response

If Target is missing:

```markdown
### Missing Required Information

Before I can run `/review-icons`, please provide:

\`\`\`text
Target:       [src/pages/PageName/PageName.tsx or src/pages/ or 'full project']
Review goal:  [Usage compliance / Missing icons / Icon library check / All]
Known constraints: [e.g. SVG icons only]
\`\`\`
```

Do not read files.
Do not continue until Target is provided.

---

## Intake Gate

Do not read files.
Do not generate a review.
Do not continue until Target is provided.

---

## Required Workflow

1. Read target file(s).
2. Check for icon library imports (Heroicons, Lucide, FontAwesome, MUI icons, etc.) — these are not allowed.
3. Check icon components follow SvgIconProps interface.
4. Check icons use `currentColor` for stroke/fill.
5. Check icons are imported from the project icon file.
6. Check for any PNG/JPG/emoji used as icons.
7. List any icon gaps (icons needed but not in the project icon file).
8. Report findings.

---

## Restrictions

- Do not add icon libraries
- Do not modify existing icon components
- Only report — do not fix unless explicitly requested

---

## Expected Output

```markdown
### Icon System Review — [TARGET]

### Files Reviewed

### Icon Library Check

| Library Found | File | Status |
|---|---|---|
| (none) / [library name] | | ✓ Compliant / ✗ Not allowed |

### Icon Usage Check

| Icon Component | Import Source | Follows SvgIconProps | Uses currentColor | Notes |
|---|---|---|---|---|

### Icon Gaps

Icons referenced but not found in project icon file:

| Icon Name | File | Notes |
|---|---|---|

### Recommendation

Choose one:
- Icon system compliant — no issues
- Minor issues — fix before DS review
- Major issues — icon library usage found
```
