# Connect Navigation

## Purpose

Connect an existing prototype page to the application routing and sidebar navigation.

Use this command when a page file already exists but has not been wired into the router or sidebar yet.

---

## Agent to Use

Application Shell Navigation Agent

Expected file: `.claude/agents/_core/application-shell-navigation-agent.md`

---

## Skill to Use

Application Shell Navigation Skill

Expected file: `.claude/skills/_core/application-shell-navigation/SKILL.md`

---

## When to Use

Use when:
- A page was created but not added to the router
- A page is not appearing in the sidebar
- A route needs to be changed or corrected
- A sidebar item needs to be updated

---

## Required User Intake

### Required intake fields

```text
Page name:          React component name (e.g. ScansPage)
Page file:          File path (e.g. src/pages/ScansPage/ScansPage.tsx)
Route:              Target route path (e.g. /scans)
Navigation label:   Sidebar label (e.g. Scans)
Icon:               SVG icon name (e.g. ScansIcon) or 'none'
Navigation level:   top-level / nested
Parent item:        Parent label if nested, or 'none'
```

### Minimum required fields

```text
Page name
Page file
Route
```

### Missing Information Response

If Page name, Page file, or Route is missing:

```markdown
### Missing Required Information

Before I can run `/connect-navigation`, please provide:

\`\`\`text
Page name:         [ReactPageName]
Page file:         [src/pages/PageName/PageName.tsx]
Route:             [/route-path]
Navigation label:  [Sidebar label or 'none']
Icon:              [SVGIconName or 'none']
Navigation level:  [top-level / nested]
Parent item:       [Parent label or 'none']
\`\`\`
```

Do not modify any routing or navigation files.
Do not continue until Page name, Page file, and Route are provided.

---

## Intake Gate

Do not modify router files.
Do not modify navigation config.
Do not continue until Page name, Page file, and Route are provided.

---

## Required Workflow

1. Read the page file to confirm it exists and exports the component.
2. Inspect existing router file.
3. Inspect existing navigation data file.
4. Add route as child of existing AppShell route.
5. Add sidebar item following existing navigation pattern.
6. Use existing SVG icon component.
7. Confirm page renders inside `<Outlet />`.
8. Report changes made.

---

## Restrictions

- Do not replace AppShell, Sidebar, Header, or Router
- Do not add a custom layout wrapper
- Do not add icon libraries
- Do not modify unrelated files

---

## Expected Output

```markdown
### Navigation Connection Summary — [PAGE NAME]

### Route Added

File:
Change:

### Sidebar Item Added

Label:
Route:
Icon:
Level:

### Verification

- [ ] Route added as child of AppShell route
- [ ] Navigation data updated
- [ ] SVG icon used
- [ ] No duplicate Header
- [ ] Page renders inside <Outlet />

### Open Questions
```
