# Application Shell Navigation Skill

## Purpose

Define the rules and workflow for adding pages, routes, and sidebar navigation items to the existing application architecture without replacing or breaking it.

---

## When to Use

Use this skill when:
- Adding a new page route to the project
- Adding a new sidebar navigation item
- Connecting a page to the AppShell
- Debugging a page that does not render inside the AppShell
- Syncing navigation after building a new page

---

## Inputs Required

```text
Goal:               add route / add sidebar item / connect page / inspect navigation
Page name:          React page component name
Route:              Target route path
Navigation label:   Sidebar display label
Icon:               SVG icon component name (or 'none')
Navigation level:   top-level / nested
Parent item:        Parent label if nested (or 'none')
```

Minimum required:
```text
Goal
Page name
Route
```

---

## Required User Intake

If Goal, Page name, or Route is missing, stop and ask:

```text
Goal:               [add route / add sidebar item / connect page]
Page name:          [ReactPageComponentName]
Route:              [/route-path]
Navigation label:   [Sidebar label]
Icon:               [SVGIconComponentName or 'none']
Navigation level:   [top-level / nested]
Parent item:        [Parent label or 'none']
```

Do not modify any routing or navigation files until all minimum required fields are provided.

---

## Required Project Inspection

Before making any change, inspect:

```text
src/app/router.tsx          (or equivalent router file)
src/app/navigation.ts       (or equivalent navigation data file)
src/components/layout/      (AppShell, Sidebar, Header components)
src/assets/icons/           (available SVG icons)
src/pages/                  (existing page implementations)
```

Identify:
- How existing routes are structured (nested under AppShell route)
- Where `<Outlet />` is rendered in AppShell
- How navigation items are defined (object array, config file, etc.)
- How active route is detected
- Which icon components are available

---

## Required Workflow

1. Receive navigation goal, page name, and route.
2. Inspect router file — find the AppShell route and its children.
3. Inspect navigation data file — find the sidebar item array pattern.
4. Inspect AppShell and Sidebar components — confirm Outlet usage.
5. Inspect available SVG icon components.
6. Add route as a child of the existing AppShell route.
7. Add sidebar item following the existing data pattern.
8. Use the requested SVG icon component.
9. Confirm the new page renders inside `<Outlet />`.
10. Report changes made.

---

## Architecture Rules

### Route rule
Always add new routes as children of the existing AppShell route.
Never create standalone routes that bypass the AppShell.
Never add a custom layout wrapper.

### Navigation item rule
Always follow the existing navigation data structure (object shape, property names).
Never invent a new navigation pattern.
Never hardcode icon colors or sizes.

### Icon rule
Use only SVG icon components from `src/assets/icons/`.
Never add icon libraries.
If a required icon is missing, document it as a gap and use a placeholder SVG.

### Outlet rule
The new page must render inside the existing `<Outlet />` in the AppShell.
The page must not add a duplicate Header.
The page must not add a duplicate Sidebar.

---

## Must Do

- Inspect existing router and navigation files first
- Add routes only under the existing AppShell route
- Follow existing navigation item data structure
- Use existing SVG icon components
- Confirm Outlet usage
- Report only the minimal change needed

---

## Must Not Do

- Do not replace AppShell
- Do not replace Sidebar
- Do not replace Header
- Do not replace router architecture
- Do not add a custom layout wrapper
- Do not hardcode navigation colors or sizing
- Do not add icon libraries
- Do not perform broad refactors

---

## Output Format

```markdown
### Navigation Integration Summary

### Goal

### Router Change
File:
Change:

### Navigation Data Change
File:
Change:

### Verification
- [ ] Route added as child of AppShell route
- [ ] Navigation data updated following existing pattern
- [ ] SVG icon used
- [ ] No duplicate Header
- [ ] No duplicate Sidebar
- [ ] Page renders inside <Outlet />

### Open Questions
```

---

## Example Prompt

```
Use the Application Shell Navigation Skill.

Goal: Add route and sidebar item for ScansPage.

Page name: ScansPage
Route: /scans
Navigation label: Scans
Icon: ScansIcon
Level: top-level

Expected output:
Exact router change and navigation data change.
Confirm page renders inside Outlet.
```
