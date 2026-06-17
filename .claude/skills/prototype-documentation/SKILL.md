# Prototype Documentation

## Purpose

Generate concise, review-ready documentation for a completed prototype page or flow so that PM, UX, and R&D can evaluate it efficiently.

This skill produces a document that covers what was built, what states are supported, what interactions work, what is known to be missing, and what questions remain open.

---

## When to Use

Use this skill when:

- A prototype page has been built and reviewed and is ready for stakeholder sharing
- PM or R&D needs a summary of what was implemented before a review session
- A handoff document is needed for R&D implementation guidance
- Open questions and known gaps need to be formally captured before moving forward

Prerequisites — these should be complete before documentation:
1. Prototype State Patterns skill — confirm state coverage
2. UX Flow Validation skill — confirm flow clarity
3. Design System Review skill — confirm DS compliance

---

## Inputs Required

- Target page name and file path
- Route
- Figma source reference (if applicable)
- Brief description of the main user goal
- List of known gaps or open questions (if any — the skill will also discover them)

---

## Required Project Inspection

Before writing documentation:

1. Read the target page `.tsx` file
2. Read the target page `.scss` file (briefly — confirm tokens and no inline styles)
3. Read the target mock data file (if it exists)
4. Identify all DS components imported and used
5. Identify all states implemented in the component
6. Identify all interactions wired (row click, close, form submit, tab change, etc.)
7. Check for any hardcoded values, placeholder text, or TODO comments
8. Check for any console warnings or TypeScript errors in related files

---

## Required Workflow

1. Inspect target files as listed above.
2. Identify feature name, route, Figma source, and main user goal.
3. List all DS components used.
4. List all tokens used (summary by category).
5. List all states supported and confirm how to trigger each.
6. List all interactions wired in the prototype.
7. List all known gaps — visual, functional, and token.
8. List all open questions for PM, UX, and R&D.
9. Generate PM review checklist and R&D review notes.
10. Produce the documentation in the output format below.

Optionally save the document to:
`src/figma/[pageName]-prototype-docs.md`

---

## Must Do

- Read the full implementation before writing documentation
- Be explicit about every known gap
- Separate PM questions (product decisions) from R&D questions (technical decisions)
- Keep documentation concise — one clear sentence per item
- Document how to trigger each state by code change
- Note which interactions are prototype-only and which are production-ready behaviors
- Avoid inventing decisions that were not made in the implementation

---

## Must Not Do

- Hide known gaps or limitations
- Write long unnecessary documentation
- Claim Pixel Perfect accuracy without a gap report
- Modify implementation files
- Modify the Infra library or DS
- Invent product decisions
- Claim a state is supported without verifying it in the code

---

## Output Format

```markdown
### Prototype Documentation — [PAGE_NAME]

### Feature / Flow Name

### Main User Goal

What the user is trying to accomplish on this page.

### Route

`/route-path`

### Figma Source

Link or node ID (if applicable).

### Components Used

| Component | Import Path | Notes |
|---|---|---|

### Tokens Used (Summary)

- Colors: [list key tokens]
- Spacing: [scale used]
- Typography: [sizes and weights used]
- Radius: [values used]
- Transitions: [values used]

### States Supported

| State | Implemented | How to Trigger |
|---|---|---|
| Default | ✓ | Initial render |
| Loading | ✓ / ✗ | Change viewState to 'loading' |
| Empty | ✓ / ✗ | Change viewState to 'empty' |
| Error | ✓ / ✗ | Change viewState to 'error' |
| Selected row | ✓ / ✗ | Click a table row |
| Details open | ✓ / ✗ | Click a table row |
| [Other states] | ✓ / ✗ | [How to trigger] |

### Interactions Supported

| Interaction | Wired | Notes |
|---|---|---|
| Row click opens details | ✓ / ✗ | |
| X closes details | ✓ / ✗ | |
| Search / filter | ✓ / ✗ | |
| Checkbox selection | ✓ / ✗ | |
| Tab navigation | ✓ / ✗ | |
| [Other interactions] | ✓ / ✗ | |

### Known Gaps

#### Visual gaps (Pixel Perfect)
#### Functional gaps (interactions not yet wired)
#### Token gaps
#### Component gaps
#### Data gaps (mock data limitations)

### Open Questions

#### Questions for PM
#### Questions for UX
#### Questions for R&D

### PM Review Checklist

- [ ] Main user goal is clear
- [ ] Primary action is correct
- [ ] Empty state content is approved
- [ ] Error message copy is approved
- [ ] All column names and labels are final
- [ ] All status labels are final
- [ ] Open questions above are answered

### R&D Review Notes

- Prototype is mock-data only — no backend integration
- [List any specific technical notes or decisions made during prototyping]
- [Note any patterns used that should be aligned with production implementation]

### Final Recommendation

Choose one:
- Ready for PM review
- Ready for R&D handoff
- Needs UX fixes before review
- Needs DS review before review
- Needs clarification on open questions
```

---

## Example Prompt

```
Use the Prototype Documentation skill.

Goal:
Generate review-ready documentation for [PAGE_NAME].

Target files:
- [src/pages/PageName/PageName.tsx]
- [src/mock/pageNameMockData.ts]

Route:
/[route]

Figma source:
[Link or N/A]

Main user goal:
[Brief description]

Known gaps or questions:
[Optional — the skill will also discover these]

Expected output:
Full prototype documentation including components used, tokens summary, states table, interactions table, known gaps, open questions, PM checklist, R&D notes, and final recommendation.
```
