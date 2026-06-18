# /ux-add-page

## Purpose

Create a new prototype page from start to finish based on UX intent.

This command manages the full workflow: intake → component mapping → page creation → navigation → states → DS review. You provide the UX goal; the command orchestrates the rest.

---

## Required User Intake

```text
Page name:                    React component name (e.g. PoliciesPage)
Route:                        URL path (e.g. /policies)
Navigation label:             Label shown in the sidebar (e.g. Policies)
Should appear in sidebar:     yes / no
Sidebar location:             Top-level / under [parent item] / at position [n]
Page template:                See supported templates below
Figma source or screenshot:   Figma link, MCP node, image attachment, or 'none'
User goal:                    What the user is trying to accomplish on this page
Required layout:              Brief description of the layout
Required interactions:        What the user can do (click, filter, select, open dialog, etc.)
Required states:              Default / Loading / Empty / Error / + page-specific states
Mock data requirements:       What entities and fields the page needs
Known constraints:            e.g. SVG icons only, no new DS components, no inline styles
Files allowed to modify:      e.g. src/App.tsx, src/components/layout/Sidebar/navConfig.ts
Files not allowed to modify:  e.g. existing pages, Infra library
```

### Supported Templates

```text
Table Filters Page            — full-width table with search, filter panel, chips
Table Master Details          — full-width table that narrows on row click, details panel opens right
Card List Master Details      — 30% card list + 70% details panel, persistent split
Form Page                     — create / edit / settings / wizard form
Dialog Flow                   — confirmation / form / multi-step dialogs
Dashboard Page                — metric cards, summary sections, charts
Settings Page                 — grouped settings form
Empty State Page              — placeholder page with empty state only
Custom Page                   — no predefined template
```

---

## Minimum Required Fields

```text
Page name
Route
Page template
User goal
Required layout
Required interactions
Required states
Known constraints
Files allowed to modify
Files not allowed to modify
```

---

## Missing Information Response

If any minimum required field is missing, stop immediately and respond only with:

```
### Missing Required Information

Before I can continue with `/ux-add-page`, please fill the missing fields below.

\`\`\`text
Page name:
Route:
Navigation label:
Should appear in sidebar:     yes / no
Sidebar location:
Page template:
Figma source or screenshot:
User goal:
Required layout:
Required interactions:
Required states:
Mock data requirements:
Known constraints:
Files allowed to modify:
Files not allowed to modify:
\`\`\`

### Why This Is Needed

I need this information so I can run the UX workflow safely without guessing, modifying the wrong files, inventing components, or breaking the existing AppShell / Infra / Design System structure.

After you provide the missing fields, I will continue with the workflow.
```

---

## Intake Gate

Do not inspect any project files.
Do not create any files.
Do not generate any code.
Do not guess the page name, route, template, or navigation placement.
Do not continue until all minimum required fields are provided.

---

## Required Workflow

Run these steps in order. Stop between steps that require review.

### Step 1 — Component Mapping

If Figma source is provided:
- Run **Figma MCP Scanner Agent** (`.claude/agents/_figma/figma-mcp-scanner-agent.md`)
- Then run **Figma to Infra Mapping Skill** (`.claude/skills/_figma/figma-to-infra-mapping/SKILL.md`)

If screenshot or visual reference is provided:
- Run **Visual to Infra Mapping Skill** (`.claude/skills/_infra/visual-to-infra-mapping/SKILL.md`)

Always:
- Run **Component Mapping Skill** (`.claude/skills/_core/component-mapping/SKILL.md`)
- Inspect `src/components/`, `src/design-system/`, `src/styles/`, `src/assets/icons/`
- Confirm all components, tokens, and icons before continuing

### Step 2 — Page Creation

Select the correct template skill based on `Page template`:

| Template | Skill to Use |
|---|---|
| Table Filters Page | `.claude/skills/_templates/table-filters-template/SKILL.md` |
| Table Master Details | `.claude/skills/_templates/table-master-details-template/SKILL.md` |
| Card List Master Details | `.claude/skills/_templates/card-list-master-details-template/SKILL.md` |
| Form Page | `.claude/skills/_templates/form-page-template/SKILL.md` |
| Dialog Flow | `.claude/skills/_templates/dialog-flow-template/SKILL.md` |
| Dashboard Page | `.claude/skills/_templates/dashboard-page-template/SKILL.md` |
| Custom Page | Use **Prototype Page Builder Agent** (`.claude/agents/_core/prototype-page-builder-agent.md`) |

Create:
- `src/pages/<PageName>/<PageName>.tsx`
- `src/mock/<entity>MockData.ts` (if not existing)
- Update `src/types/prototype.types.ts` if new entity type is needed

### Step 3 — Navigation

If `Should appear in sidebar: yes`:
- Run **Application Shell Navigation Skill** (`.claude/skills/_core/application-shell-navigation/SKILL.md`)
- Add route to `src/App.tsx` under existing AppShell route
- Add sidebar entry to `src/components/layout/Sidebar/navConfig.ts`
- Use an existing SVG icon from `src/assets/icons/NavIcons.tsx`

### Step 4 — States

Run **Prototype State Patterns Skill** (`.claude/skills/_infra/prototype-state-patterns/SKILL.md`):
- Confirm all required states are implemented
- State control is code constants only — no visible debug buttons

### Step 5 — DS Review

Run **Design System Review Agent** (`.claude/agents/_core/design-system-review-agent.md`):
- Check component usage, token usage, icons, inline styles, hardcoded values
- Confirm no new DS components or tokens were created

### Step 6 — UX Flow Review

Run **UX Flow Review Agent** (`.claude/agents/_core/ux-flow-review-agent.md`):
- Confirm page supports the user goal
- Confirm all required interactions are present
- Confirm all required states are reachable
- Flag missing behaviors

---

## Restrictions

- Do not create a new AppShell, Sidebar, or Header
- Do not replace the existing router architecture
- Do not create new DS components
- Do not create new SCSS tokens
- Do not use inline styles
- Do not hardcode hex colors, spacing, typography, radius, or shadows
- Do not add icon libraries or external UI libraries
- Do not add PNG / JPG / emoji / icon fonts — SVG only
- Do not add backend logic or real API calls
- Do not expose debug state-switching buttons in the visible UI
- Do not modify files outside the scope defined in `Files allowed to modify`
- Do not perform broad refactors on existing pages

---

## Expected Output

```markdown
### UX Add Page — [PAGE NAME]

### Intake Confirmed

| Field | Value |
|---|---|
| Page name | |
| Route | |
| Template | |
| Navigation | |

### Component Mapping Summary

List components mapped, gaps noted.

### Files Created

| File | Purpose |
|---|---|

### Template Used

### States Implemented

| State | How to Trigger |
|---|---|

### Navigation Added

Route and sidebar entry.

### DS Review

| Check | Status |
|---|---|

### UX Flow Review

Issues found (if any).

### Restrictions Followed

- [ ] No new DS components
- [ ] No new tokens
- [ ] No inline styles
- [ ] SVG icons only
- [ ] No debug buttons
- [ ] AppShell / Router preserved

### Final Recommendation

Choose one:
- Ready for UX review
- Needs DS review
- Needs UX clarification
- Needs Figma alignment
```

---

## Related Utility Commands

- `/figma-scan` — scan Figma frame before mapping
- `/map-components` — component mapping from requirement
- `/figma-map-components` — component mapping from Figma
- `/detect-infra` — detect components from screenshot
- `/add-states` — add states after page is created
- `/connect-navigation` — wire navigation separately
- `/review-design-system` — DS compliance review
- `/review-ux-flow` — UX flow review
