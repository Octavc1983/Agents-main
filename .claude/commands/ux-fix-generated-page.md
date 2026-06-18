# /ux-fix-generated-page

## Purpose

Fix a prototype page that Claude generated incorrectly.

Use this command when Claude made structural mistakes that go beyond a simple edit — for example: invented a custom AppShell, used the wrong layout pattern, hardcoded values, ignored Infra/DS, added debug buttons, or misidentified which template to use.

---

## When to Use This Command

Use `/ux-fix-generated-page` when Claude:

- Created a custom AppShell, Sidebar, or Header instead of using the existing one
- Rendered a white prototype header that replaces the existing dark nav
- Added visible debug state-switching buttons (Loading / Empty / Error buttons in the UI)
- Opened details panel by default instead of waiting for a user action
- Invented new components instead of using existing Infra/DS
- Hardcoded hex colors, px values, or typography values instead of using tokens
- Ignored SCSS tokens entirely
- Used a table where a card list was required (or vice versa)
- Used the wrong layout pattern (wrong template)
- Added icon libraries (Font Awesome, Heroicons, Lucide, etc.) instead of using SVG components
- Added external UI libraries (MUI, Ant Design, Tailwind) not in the project
- Used raster images (PNG/JPG) for icons
- Wired real API calls instead of mock data
- Replaced the router architecture
- Duplicated existing navigation components

---

## Required User Intake

```text
Generated page:               React component name or route (e.g. PoliciesPage / /policies)
Target files:                 Files that need to be fixed
Problem summary:              What is wrong with the current output — be specific
Reference source:             Figma link, screenshot, or description of what it should look like
Correct template:             Which template should be used (see list below)
What must be removed:         Specific elements, imports, or patterns to delete
What must be preserved:       Existing logic, states, or behaviors that are correct
Expected behavior:            What the fixed page should do
Known constraints:            e.g. SVG icons only, no new DS components, no inline styles
Files allowed to modify:      Explicit list
Files not allowed to modify:  Explicit list
```

### Supported Templates

```text
Table Filters Page
Table Master Details
Card List Master Details
Form Page
Dialog Flow
Dashboard Page
Custom Page
```

---

## Minimum Required Fields

```text
Generated page or Target files
Problem summary
Correct template
Expected behavior
Known constraints
Files allowed to modify
Files not allowed to modify
```

---

## Missing Information Response

If any minimum required field is missing, stop immediately and respond only with:

```
### Missing Required Information

Before I can continue with `/ux-fix-generated-page`, please fill the missing fields below.

\`\`\`text
Generated page:
Target files:
Problem summary:
Reference source:
Correct template:
What must be removed:
What must be preserved:
Expected behavior:
Known constraints:
Files allowed to modify:
Files not allowed to modify:
\`\`\`

### Why This Is Needed

I need this information to remove only what is wrong, preserve what is correct, and rebuild the page against the right template and constraints — without guessing or causing additional damage.

After you provide the missing fields, I will continue with the fix.
```

---

## Intake Gate

Do not read any project files.
Do not generate any code.
Do not propose fixes.
Do not continue until Generated page, Problem summary, Correct template, and Expected behavior are provided.

---

## Required Workflow

### Step 1 — Inspect Existing Generated Page

Read the target files and identify:
- All structural problems matching the problem summary
- All incorrect imports (external libraries, icon libraries, hardcoded values)
- All incorrect layout patterns (custom AppShell, duplicated Header/Sidebar)
- All visible debug buttons
- What is already correct and must be preserved

### Step 2 — Component Mapping

Run **Component Mapping Skill** (`.claude/skills/_core/component-mapping/SKILL.md`):
- Map the page to existing project components
- Confirm all Infra/DS components and import paths
- Confirm all SCSS token usage

If reference source (Figma/screenshot) is provided:
- Run **Visual to Infra Mapping Skill** (`.claude/skills/_infra/visual-to-infra-mapping/SKILL.md`)

Run **Application Shell Navigation Skill** (`.claude/skills/_core/application-shell-navigation/SKILL.md`) in inspection mode:
- Confirm correct AppShell wrapping pattern
- Confirm router structure

### Step 3 — Remove Incorrect Structures

Remove only what is in `What must be removed`:
- Delete custom AppShell, Sidebar, or Header code
- Remove external library imports
- Remove icon library imports
- Remove debug state buttons from JSX
- Remove hardcoded visual values
- Remove incorrect layout wrappers
- Remove fake API calls

Do not remove anything listed in `What must be preserved`.

### Step 4 — Rebuild Against Correct Template

Select the template skill matching `Correct template`:

| Template | Skill |
|---|---|
| Table Filters Page | `.claude/skills/_templates/table-filters-template/SKILL.md` |
| Table Master Details | `.claude/skills/_templates/table-master-details-template/SKILL.md` |
| Card List Master Details | `.claude/skills/_templates/card-list-master-details-template/SKILL.md` |
| Form Page | `.claude/skills/_templates/form-page-template/SKILL.md` |
| Dialog Flow | `.claude/skills/_templates/dialog-flow-template/SKILL.md` |
| Dashboard Page | `.claude/skills/_templates/dashboard-page-template/SKILL.md` |
| Custom Page | Use **Prototype Page Builder Agent** |

Replace incorrect structures with the template pattern:
- Use `src/prototype-templates/` if a matching template exists
- Use existing Infra/DS components
- Use SCSS tokens from `src/styles/_variables.scss` and `src/design-system/tokens/_colors.scss`
- Replace icon libraries with SVG components from `src/assets/icons/NavIcons.tsx`
- Replace hardcoded values with tokens
- Replace debug buttons with code-constant `viewState` pattern

### Step 5 — Restore States

Run **State Builder Agent** (`.claude/agents/_infra/state-builder-agent.md`):
- Confirm all required states from `Expected behavior` are implemented correctly
- Confirm state control is code-only (no visible debug buttons)

### Step 6 — DS Review

Run **Design System Review Agent** (`.claude/agents/_core/design-system-review-agent.md`):
- Confirm the fixed page is DS-compliant
- Confirm no new violations were introduced during the fix

### Step 7 — UX Flow Review

Run **UX Flow Review Agent** (`.claude/agents/_core/ux-flow-review-agent.md`):
- Confirm the expected behavior is now achievable
- Confirm the fix did not break previously correct behaviors

---

## Restrictions

- Only remove what is explicitly listed in `What must be removed` or confirmed as a violation during inspection
- Do not remove anything listed in `What must be preserved`
- Do not modify files outside the `Files allowed to modify` list
- Do not create new DS components
- Do not create new SCSS tokens
- Do not use inline styles
- Do not hardcode visual values
- Do not add external libraries
- Do not add icon libraries
- Do not replace AppShell, Sidebar, Header, or Router with new versions
- Do not add backend logic or real API calls
- Do not expose debug state-switching buttons in the visible UI

---

## Expected Output

```markdown
### UX Fix Generated Page — [PAGE NAME]

### Problems Found

| # | Problem | Location | Severity |
|---|---|---|---|

### What Was Removed

List every incorrect element that was deleted.

### What Was Preserved

Confirm what existing correct logic was kept.

### Template Applied

Which template was used to rebuild.

### Files Modified

| File | Change |
|---|---|

### DS Review

| Check | Status |
|---|---|

### UX Flow Review

Issues remaining (if any).

### Restrictions Followed

- [ ] Only listed problems removed
- [ ] Preserved elements untouched
- [ ] No new DS components
- [ ] No new tokens
- [ ] No inline styles
- [ ] No external libraries
- [ ] No debug buttons
- [ ] AppShell / Router preserved

### Final Recommendation

Choose one:
- Fixed — ready for UX review
- Partially fixed — remaining issues listed above
- Needs Figma alignment check
- Needs UX clarification on expected behavior
```

---

## Related Utility Commands

- `/review-design-system` — confirm DS compliance after fix
- `/review-ux-flow` — confirm UX flow after fix
- `/ux-review-page` — comprehensive review after fix
- `/ux-edit-page` — make additional targeted edits
