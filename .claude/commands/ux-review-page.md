# /ux-review-page

## Purpose

Review an existing prototype page from UX, DS, Figma alignment, and implementation safety perspectives.

Default behavior: review only. Do not modify any files unless explicitly asked.

---

## Required User Intake

```text
Target page or route:         Page component name or route (e.g. ScansPage or /scans)
Review type:                  See review types below (multiple allowed)
User goal:                    What the user is trying to accomplish on this page
Expected user path:           Step-by-step flow the user should follow
Required states:              Which states should exist and be reachable
Required interactions:        What the user can do (click, filter, select, etc.)
Figma source:                 Figma link for alignment comparison, or 'none'
Known concerns:               Specific issues or doubts you want checked
Target audience:              UX / PM / R&D / DS — who this review is for
Known constraints:            e.g. SVG icons only, no new DS components
```

### Review Types

```text
UX flow review           — interactions, state coverage, user path clarity
Design System review     — component usage, token usage, no inline styles, no hardcoded values
Figma alignment review   — visual and structural gap report vs Figma source
State coverage review    — loading, empty, error, and edge case coverage
Navigation review        — route, sidebar entry, active state, breadcrumbs
Accessibility review     — keyboard navigation, aria labels, focus management (basic check only)
PM review package        — summary of what was built vs the original goal
R&D handoff review       — implementation notes, component list, token list, gaps
```

---

## Minimum Required Fields

```text
Target page or route
Review type
User goal
Expected user path
Known constraints
```

---

## Missing Information Response

If any minimum required field is missing, stop immediately and respond only with:

```
### Missing Required Information

Before I can continue with `/ux-review-page`, please fill the missing fields below.

\`\`\`text
Target page or route:
Review type:
User goal:
Expected user path:
Required states:
Required interactions:
Figma source:
Known concerns:
Target audience:
Known constraints:
\`\`\`

### Why This Is Needed

I need this information to run the correct review agents, check the right states and interactions, and produce a focused report for the right audience.

After you provide the missing fields, I will continue with the review.
```

---

## Intake Gate

Do not read any project files.
Do not generate any review output.
Do not continue until Target page/route, Review type, User goal, and Expected user path are provided.

---

## Required Workflow

Run the agents that match the requested review types.

### For UX flow review

Run **UX Flow Review Agent** (`.claude/agents/_core/ux-flow-review-agent.md`):
- Verify the user path is reachable and logical
- Verify all required interactions exist
- Verify all required states are reachable
- Check edge cases and missing flows
- Report issues by priority

### For Design System review

Run **Design System Review Agent** (`.claude/agents/_core/design-system-review-agent.md`):
- Check component usage (no duplicates, no invented components)
- Check token usage (no hardcoded colors, spacing, typography, radius, shadows)
- Check icons (SVG only, no libraries)
- Check SCSS imports
- Check import paths

Use command: `/review-design-system`

### For Figma alignment review

Requires `Figma source` to be provided.

Run **Figma Alignment Agent** (`.claude/agents/_figma/figma-alignment-agent.md`):
- Compare React implementation vs Figma frame
- Report visual gaps: spacing, sizing, color, layout
- Report structural gaps: missing sections, extra sections
- Report component gaps: wrong component used
- Report state gaps: states visible in Figma not implemented

Use skill: `.claude/skills/_figma/figma-alignment-review/SKILL.md`

### For State coverage review

Run **State Builder Agent** (`.claude/agents/_infra/state-builder-agent.md`) in review mode:
- List all states required for the page
- Confirm which states are implemented
- Confirm each state is reachable without debug buttons
- Report missing states

### For Navigation review

Run **Application Shell Navigation Skill** (`.claude/skills/_core/application-shell-navigation/SKILL.md`) in review mode:
- Confirm route exists in router
- Confirm sidebar entry exists
- Confirm active state works
- Confirm no AppShell duplication

### For PM review package or R&D handoff review

Run **Prototype Documentation Agent** (`.claude/agents/_documentation/prototype-documentation-agent.md`):
- Produce a review summary matching the target audience
- List what was built vs the original goal
- List components used, tokens used, gaps

Use command: `/create-review-package`

---

## Restrictions

- Do not modify any files unless the user explicitly requests fixes
- Default is read-only review
- Do not create new DS components
- Do not create new tokens
- Do not use inline styles
- Do not perform broad refactors

---

## Expected Output

```markdown
### UX Review — [PAGE NAME]

### Review Types Run

List which reviews were performed.

### Page Summary

Brief description of what was found.

---

### UX Flow Review

#### User Path

Step-by-step: does it work?

#### Interactions Found

#### Interactions Missing or Broken

#### States Found

#### States Missing

#### Issues

| Priority | Issue | Location | Recommendation |
|---|---|---|---|

---

### Design System Review

| Check | Status | Notes |
|---|---|---|
| Existing DS components used | ✓ / ✗ | |
| No duplicate components | ✓ / ✗ | |
| No inline styles | ✓ / ✗ | |
| No hardcoded colors | ✓ / ✗ | |
| No hardcoded spacing | ✓ / ✗ | |
| SVG icons only | ✓ / ✗ | |
| Correct SCSS tokens | ✓ / ✗ | |
| No Infra modifications | ✓ / ✗ | |

---

### Figma Alignment Review

(Only if Figma source was provided)

#### Visual Gaps

#### Structural Gaps

#### Component Gaps

#### State Gaps

---

### Navigation Review

| Check | Status |
|---|---|
| Route exists | ✓ / ✗ |
| Sidebar entry exists | ✓ / ✗ |
| Active state works | ✓ / ✗ |

---

### Priority Issues Summary

| # | Priority | Area | Issue | Action |
|---|---|---|---|---|

---

### Final Recommendation

Choose one:
- Ready for UX review — no issues
- Minor issues — fix before sharing
- Major issues — fix required before review
- Needs Figma alignment before sharing
- Not ready — significant gaps found
```

---

## Related Utility Commands

- `/review-design-system` — standalone DS compliance review
- `/review-ux-flow` — standalone UX flow review
- `/figma-align` — standalone Figma alignment review
- `/create-review-package` — generate a PM/R&D review document
- `/ux-fix-generated-page` — fix issues found in this review
- `/ux-edit-page` — make targeted edits based on review findings
