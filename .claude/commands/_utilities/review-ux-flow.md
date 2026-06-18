# Review UX Flow

## Purpose

Review a prototype page or flow from a UX/UI perspective: user goal clarity, primary action, state coverage, navigation logic, edge cases, microcopy, and UX completeness.

---

## Agent to Use

UX Flow Review Agent

Expected file: `.claude/agents/_core/ux-flow-review-agent.md`

---

## Skill to Use

UX Flow Validation Skill

Expected file: `.claude/skills/_core/ux-flow-validation/SKILL.md`

---

## When to Use

Use after building a page before sharing it for PM or stakeholder review.

---

## Required User Intake

### Required intake fields

```text
Target page or flow:   Page name or file path (e.g. src/pages/ScansPage/ScansPage.tsx)
User goal:             What the user is trying to accomplish on this page
Primary action:        The most important action the user can take
Required states:       States that should be covered in the review
Expected user path:    Step-by-step user flow (e.g. Lands on page → sees table → clicks row → views details → closes)
Known edge cases:      e.g. empty results, backend error, filtered-out selected item
Open questions:        Optional — any UX decisions that are uncertain
```

### Minimum required fields

```text
Target page or flow
User goal
Primary action
Required states
Expected user path
```

### Missing Information Response

If Target page or User goal is missing:

```markdown
### Missing Required Information

Before I can run `/review-ux-flow`, please provide:

\`\`\`text
Target page or flow:   [Page name or src/pages/PageName/PageName.tsx]
User goal:             [What the user is trying to do]
Primary action:        [Most important action]
Required states:       [Default, Loading, Empty, Error, ...]
Expected user path:    [Step 1 → Step 2 → Step 3]
Known edge cases:      [Optional]
\`\`\`
```

Do not read files.
Do not continue until Target page and User goal are provided.

---

## Intake Gate

Do not read files.
Do not generate a UX review.
Do not continue until Target page, User goal, Primary action, and Expected user path are provided.

---

## Required Workflow

1. Read the target page file.
2. Identify the main user goal and primary action.
3. Check if the primary action is clearly visible and accessible.
4. Check state coverage (empty, loading, error, success, validation).
5. Walk through the expected user path and verify each step is functional.
6. Check for microcopy: column headers, empty state messages, error messages, CTA labels.
7. Check navigation: does the page integrate correctly with the sidebar and routes?
8. Check edge cases.
9. Report findings.

---

## Restrictions

- Do not modify files unless fixes are explicitly requested
- Do not invent product decisions
- Do not modify the Infra library

---

## Expected Output

```markdown
### UX Flow Review — [PAGE NAME]

### User Goal

### Primary Action Check

### State Coverage

| State | Implemented | Notes |
|---|---|---|

### User Path Walkthrough

| Step | Works | Notes |
|---|---|---|

### Microcopy Review

| Element | Content | Status | Notes |
|---|---|---|---|

### Navigation Check

### Edge Cases Found

### Open Questions for PM / UX

### Recommendation

Choose one:
- Ready for PM review
- Minor UX issues — fix before review
- Major UX issues — fix required
- Needs UX clarification before building more
```
