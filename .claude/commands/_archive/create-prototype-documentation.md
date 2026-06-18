# Create Prototype Documentation

## Purpose

Generate review-ready documentation for a completed prototype page: components used, states supported, interactions wired, known gaps, open questions, PM checklist, and R&D notes.

---

## Agent to Use

Prototype Documentation Agent

Expected file: `.claude/agents/prototype-documentation-agent.md`

---

## Skill to Use

Prototype Documentation Skill

Expected file: `.claude/skills/prototype-documentation/SKILL.md`

---

## When to Use

Use after a prototype page is built and reviewed, before sharing with PM or handing off to R&D.

---

## Required User Intake

### Required intake fields

```text
Target page:        React page name (e.g. ScansPage)
Page file:          File path (e.g. src/pages/ScansPage/ScansPage.tsx)
Route:              Route path (e.g. /scans)
Figma source:       Figma link or 'N/A'
User goal:          What the user accomplishes on this page
Known gaps:         Optional — the skill will also discover these
Open questions:     Optional — list any unresolved decisions
```

### Minimum required fields

```text
Target page
Page file
Route
User goal
```

### Missing Information Response

If Target page, Page file, or Route is missing:

```markdown
### Missing Required Information

Before I can run `/create-prototype-documentation`, please provide:

\`\`\`text
Target page:    [PageName]
Page file:      [src/pages/PageName/PageName.tsx]
Route:          [/route-path]
Figma source:   [Figma link or 'N/A']
User goal:      [What the user accomplishes]
Known gaps:     [Optional]
\`\`\`
```

Do not read files.
Do not generate documentation.
Do not continue until Target page, Page file, and Route are provided.

---

## Intake Gate

Do not read files.
Do not generate documentation.
Do not continue until Target page, Page file, Route, and User goal are provided.

---

## Required Workflow

1. Read the target `.tsx` file.
2. Read the target `.scss` file.
3. Read the mock data file if it exists.
4. Identify all DS components imported and used.
5. Identify all states implemented and how to trigger them.
6. Identify all interactions wired.
7. Check for hardcoded values, TODO comments, or placeholder text.
8. Generate the documentation in the output format.
9. Optionally save to `src/figma/[pageName]-prototype-docs.md`.

---

## Restrictions

- Do not modify implementation files
- Do not invent product decisions
- Do not claim a state is supported without verifying in the code
- Do not claim Pixel Perfect without a gap report

---

## Expected Output

```markdown
### Prototype Documentation — [PAGE_NAME]

### Feature / Flow Name

### Main User Goal

### Route

### Figma Source

### Components Used

| Component | Import Path | Notes |
|---|---|---|

### Tokens Used (Summary)

### States Supported

| State | Implemented | How to Trigger |
|---|---|---|

### Interactions Supported

| Interaction | Wired | Notes |
|---|---|---|

### Known Gaps

#### Visual Gaps
#### Functional Gaps
#### Token Gaps
#### Component Gaps
#### Data Gaps

### Open Questions

#### For PM
#### For UX
#### For R&D

### PM Review Checklist

### R&D Review Notes

### Final Recommendation
```
