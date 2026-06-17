# UX Flow Validation

## Purpose

Review a Figma mockup or React prototype from a UX/UI flow perspective before PM or R&D review.

This skill checks whether the user can accomplish the main goal, whether all states are covered, whether interactions are clear, and whether edge cases and microcopy are handled — without reviewing code quality or Design System implementation.

---

## When to Use

Use this skill when:

- A Figma mockup has been created and needs UX review before prototyping
- A React prototype has been built and needs a UX review before stakeholder review
- A flow needs to be validated for state coverage, interaction clarity, and microcopy
- A PM or R&D review is upcoming and UX gaps should be identified first

This skill does not replace Design System Review. It focuses on user experience, not code structure.

---

## Inputs Required

- Figma frame link, MCP node, screenshot, or React prototype page path
- Brief description of the main user goal for the flow
- Known product context or constraints (optional)

---

## Required Project Inspection

When reviewing a React prototype:

1. Read the target page file
2. Identify which states are implemented
3. Identify which interactions are wired (row click, close, form submit, etc.)
4. Identify any hardcoded or placeholder content that might obscure the flow
5. Check whether empty, loading, and error states exist and are meaningful

When reviewing a Figma frame:

1. Read the frame through MCP (if available)
2. Identify visible states and visible interactions
3. Note what is missing from the frame

---

## Review Checklist

Work through every item before producing the output:

**Goal clarity**
- [ ] What is the main user goal on this screen?
- [ ] Is the primary action immediately obvious?
- [ ] Are secondary actions correctly prioritized (not competing with the primary)?

**Empty state**
- [ ] Does the user know what to do when there is no data?
- [ ] Is the empty state actionable?

**Loading state**
- [ ] Does the user know something is loading?
- [ ] Are partial loads handled (table loading but header visible)?

**Error state**
- [ ] Is the error message clear and non-technical?
- [ ] Does the user know what to do after an error?
- [ ] Is user input preserved after a backend error?

**Validation**
- [ ] Are validation messages close to the relevant field?
- [ ] Are they shown at the right moment (on submit vs. on blur)?

**Saving / success**
- [ ] Does the user know the action is in progress?
- [ ] Are conflicting actions disabled during saving?
- [ ] Is the success state visible and meaningful?

**Disabled state**
- [ ] Is it clear why an action is unavailable?
- [ ] Is there a tooltip or helper text explaining the disabled state?

**Destructive actions**
- [ ] Are destructive actions protected with a confirmation step?

**Master details (if applicable)**
- [ ] Is the default state full table view?
- [ ] Is it clear that clicking a row opens details?
- [ ] Is the close action clearly visible?
- [ ] Does the table return to full view after close?

**Navigation**
- [ ] Can the user navigate away and return without losing context?
- [ ] Is the back/exit behavior obvious?

**Microcopy**
- [ ] Are button labels action-oriented and specific (not generic "Submit")?
- [ ] Are helper texts short and clear?
- [ ] Are error messages human-readable?
- [ ] Are empty state messages guiding, not apologetic?

**Edge cases**
- [ ] Long text / long names?
- [ ] Zero items?
- [ ] One item?
- [ ] Maximum items?
- [ ] Special characters?
- [ ] Permissions edge cases?

---

## Must Do

- Review every checklist item
- Understand the user goal before reviewing the flow
- Separate UX issues from product questions
- Provide specific, actionable recommendations
- Score the flow objectively

---

## Must Not Do

- Modify the Infra library
- Create or modify DS components
- Focus on code structure instead of user experience
- Rewrite the full page unless explicitly requested
- Add new product requirements
- Invent backend logic
- Perform broad refactors
- Approve a flow without reviewing all checklist items

---

## Output Format

```markdown
### UX Review Summary

Short description of the flow reviewed.

### UX Score

1 = Unclear flow, major UX gaps
2 = Partially understandable, many missing states
3 = Usable but needs UX improvements
4 = Mostly clear, minor improvements needed
5 = Clear, complete, ready for stakeholder review

### Main User Goal

What the user is trying to accomplish.

### Flow Gaps

List missing or unclear states and interactions.

### State Coverage

| State | Present | Notes |
|---|---|---|
| Default | ✓ / ✗ | |
| Loading | ✓ / ✗ | |
| Empty | ✓ / ✗ | |
| Error | ✓ / ✗ | |
| Backend error | ✓ / ✗ | |
| Validation | ✓ / ✗ | |
| Saving | ✓ / ✗ | |
| Success | ✓ / ✗ | |
| Disabled | ✓ / ✗ | |
| Selected row (if applicable) | ✓ / ✗ | |
| Details open (if applicable) | ✓ / ✗ | |

### Interaction Issues

List unclear or broken interactions.

### Microcopy Issues

List labels, messages, or helper texts that need improvement.

### Edge Cases Not Covered

### Questions for Product / UX

Questions that require product decision before the flow can be completed.

### Recommended UX Fixes

Prioritized list of improvements.

### Final Recommendation

Choose one:
- Ready for PM review
- Needs UX fixes first — list them
- Needs product decision before continuing
- Needs rework
```

---

## Example Prompt

```
Use the UX Flow Validation skill.

Goal:
Review the [PAGE_NAME] flow for UX clarity, state coverage, and interaction completeness before PM review.

Input:
[Figma link / MCP node / React page path]

Main user goal:
[Brief description]

Known context:
[Any product constraints or decisions already made]

Expected output:
UX score, flow gaps, state coverage table, interaction issues, microcopy issues, questions for PM, recommended fixes, final recommendation.
```
