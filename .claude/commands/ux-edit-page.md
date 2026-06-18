# /ux-edit-page

## Purpose

Edit an existing prototype page based on UX feedback or design changes.

This command manages a targeted, safe edit workflow: intake → inspect current state → map changes → apply targeted updates → review. It does not rewrite the full page unless explicitly asked.

---

## Required User Intake

```text
Target page name:             React component name (e.g. ScansPage)
Target route:                 URL path (e.g. /scans)
Target files:                 e.g. src/pages/ScansPage/ScansPage.tsx, ScansPage.scss
Edit type:                    See edit types below
Requested change:             What specifically should change
Figma source or screenshot:   Figma link, image attachment, or 'none'
Behavior to preserve:         What must not change
Behavior to change:           What must change
States affected:              Which states are impacted, or 'none'
Navigation affected:          yes / no
Known constraints:            e.g. SVG icons only, no new DS components, no inline styles
Files allowed to modify:      Explicit list of files that may be changed
Files not allowed to modify:  Explicit list of files that must not be touched
```

### Edit Types

```text
Visual alignment         — spacing, sizing, color, typography adjustments
Layout adjustment        — grid, flex, column structure changes
Component replacement    — swap one component for another
Interaction change       — add/remove/modify click, hover, or keyboard behavior
State update             — add, fix, or change a loading/empty/error/success state
Microcopy update         — labels, placeholders, empty state text, button labels
Navigation update        — add/change route or sidebar entry
Filter/search behavior   — change how search or filter panel works
Details panel behavior   — change how details panel opens, closes, or renders
Bug fix                  — fix a specific broken behavior
Refactor generated page  — clean up a page Claude generated incorrectly
```

---

## Minimum Required Fields

```text
Target page name or Target files
Edit type
Requested change
Behavior to preserve
Known constraints
Files allowed to modify
Files not allowed to modify
```

---

## Missing Information Response

If any minimum required field is missing, stop immediately and respond only with:

```
### Missing Required Information

Before I can continue with `/ux-edit-page`, please fill the missing fields below.

\`\`\`text
Target page name:
Target route:
Target files:
Edit type:
Requested change:
Figma source or screenshot:
Behavior to preserve:
Behavior to change:
States affected:
Navigation affected:          yes / no
Known constraints:
Files allowed to modify:
Files not allowed to modify:
\`\`\`

### Why This Is Needed

I need this information to make only the requested change without rewriting existing logic, breaking states, or modifying files outside the defined scope.

After you provide the missing fields, I will continue with the workflow.
```

---

## Intake Gate

Do not read any project files.
Do not generate any code.
Do not propose changes.
Do not continue until Target files, Edit type, Requested change, and Behavior to preserve are provided.

---

## Required Workflow

### Step 1 — Inspect Current State

Read the target files to understand:
- Current component structure
- Current state management
- Current SCSS usage
- What the page already does correctly

Do not suggest changes until inspection is complete.

### Step 2 — Map the Change

If Figma source or screenshot is provided:
- Run **Visual to Infra Mapping Skill** (`.claude/skills/_infra/visual-to-infra-mapping/SKILL.md`)
- Run **Figma Alignment Agent** (`.claude/agents/_figma/figma-alignment-agent.md`) if Figma source exists

Always:
- Identify which components are affected
- Identify which tokens are affected
- Confirm nothing outside the scope needs to change

### Step 3 — Apply Targeted Changes

Use **Prototype Page Builder Agent** (`.claude/agents/_core/prototype-page-builder-agent.md`) for targeted edits only:
- Apply only the requested change
- Preserve all existing behavior not in scope
- Do not rewrite the full page

If states are affected:
- Run **State Builder Agent** (`.claude/agents/_infra/state-builder-agent.md`)

If navigation is affected:
- Run **Application Shell Navigation Skill** (`.claude/skills/_core/application-shell-navigation/SKILL.md`)

### Step 4 — DS Review

Run **Design System Review Agent** (`.claude/agents/_core/design-system-review-agent.md`):
- Confirm the change follows DS rules
- Confirm no new DS components or tokens were created
- Confirm no inline styles or hardcoded values were introduced

### Step 5 — UX Flow Review

Run **UX Flow Review Agent** (`.claude/agents/_core/ux-flow-review-agent.md`):
- Confirm the change achieves the UX goal
- Confirm existing behaviors that should be preserved still work

---

## Restrictions

- Do not rewrite the full page unless explicitly requested with `Edit type: Refactor generated page`
- Do not perform broad refactors on unrelated code
- Do not change files outside the `Files allowed to modify` list
- Do not create new DS components
- Do not create new SCSS tokens
- Do not use inline styles
- Do not hardcode visual values
- Do not add icon libraries or external UI libraries
- Do not add PNG / JPG / emoji / icon fonts
- Do not replace the AppShell, Sidebar, Header, or Router
- Do not add backend logic or real API calls
- Do not expose debug state-switching buttons in the visible UI

---

## Expected Output

```markdown
### UX Edit Page — [PAGE NAME]

### Change Applied

| Field | Value |
|---|---|
| Edit type | |
| Requested change | |
| Files modified | |

### What Was Changed

Brief description of what was changed and why.

### What Was Preserved

Confirm existing behaviors that were protected.

### DS Review

| Check | Status |
|---|---|

### UX Flow Review

Issues found (if any).

### Restrictions Followed

- [ ] Only targeted changes made
- [ ] No full page rewrite (unless requested)
- [ ] No new DS components
- [ ] No new tokens
- [ ] No inline styles
- [ ] AppShell / Router preserved

### Final Recommendation

Choose one:
- Ready for UX review
- Needs DS review
- Needs Figma alignment check
- Needs UX clarification
```

---

## Related Utility Commands

- `/figma-align` — visual alignment review against Figma
- `/review-design-system` — DS compliance review
- `/review-ux-flow` — UX flow review
- `/add-states` — add missing states
- `/ux-fix-generated-page` — if Claude originally generated the page incorrectly
