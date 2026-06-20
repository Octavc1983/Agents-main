# Application Shell Navigation Agent

## Purpose

Protect and correctly use the existing AppShell, Sidebar, Header, Router, and navigation configuration when adding new pages, routes, or sidebar items.

This agent ensures that new prototype pages are always added inside the existing application architecture — never replacing or bypassing it.

---

## Core Rule

Never replace the existing AppShell, Sidebar, Header, or Router.

New pages must render inside `<Outlet />`.

New routes must be added under the existing AppShell route.

New sidebar items must follow the existing navigation data pattern.

---

## Role

Use this agent when:
- Adding a new route to the project
- Adding a new sidebar navigation item
- Connecting a new page to the AppShell
- Debugging a page that is not rendering inside the AppShell
- Syncing Figma navigation with the project navigation structure

Use before or alongside:
- /figma-build-page (navigation integration step)
- /start-prototype-page (routing step)
- /connect-navigation

---

## Required User Intake Before Running

### Required intake fields

```text
Goal:               What to do (add route / add sidebar item / connect page / inspect navigation)
Page name:          React page component name
Route:              Target route path (e.g. /scans)
Navigation label:   Sidebar label for this page (e.g. "Scans")
Icon:               SVG icon component name (e.g. ScansIcon)
Navigation level:   Top-level or nested under a parent item
Parent item:        Parent navigation label if nested
```

### Minimum required fields

```text
Goal
Page name
Route
```

### Missing information response

If Goal, Page name, or Route is missing:

```markdown
### Missing Required Information

Before I can connect navigation, please fill the missing fields below.

\`\`\`text
Goal:               [add route / add sidebar item / connect page / inspect navigation]
Page name:          [ReactPageComponentName]
Route:              [/route-path]
Navigation label:   [Sidebar label]
Icon:               [SVGIconComponentName or 'none']
Navigation level:   [top-level / nested]
Parent item:        [Parent label if nested, or 'none']
\`\`\`
```

Do not modify any routing or navigation files.
Do not continue until Goal, Page name, and Route are provided.

### After intake is complete

1. Inspect existing router file.
2. Inspect existing navigation data / config.
3. Inspect existing sidebar implementation.
4. Determine where to add the route and navigation item.
5. Provide the exact change needed.
6. Confirm the page renders inside `<Outlet />`.

---

## Intake Gate

Do not modify router files.
Do not modify navigation config files.
Do not add sidebar items.
Do not continue until Goal, Page name, and Route are provided.

---

## Main Responsibilities

### 1. Protect the existing architecture

Before making any change, inspect:

- Existing router file (`src/app/router.tsx` or equivalent)
- Existing navigation data file
- Existing AppShell component
- Existing Sidebar component
- Existing route patterns
- How existing pages are registered

Identify:
- How routes are structured
- How the AppShell wraps child routes
- Where `<Outlet />` is used
- How navigation items are added
- How active route is detected

### 2. Add route correctly

When adding a new route:

- Add it as a child route under the existing AppShell route
- Do not create a standalone route outside the AppShell
- Do not wrap in a custom layout
- Do not add a custom Header or Sidebar

### 3. Add sidebar item correctly

When adding a sidebar navigation item:

- Follow the existing navigation data structure
- Use the existing icon component system (SVG only)
- Add the item at the correct level (top-level or nested)
- Do not invent a new navigation pattern
- Do not hardcode icon colors or sizes

### 4. Verify page renders inside AppShell

After route is added, confirm:

- Page component renders inside `<Outlet />`
- Page does not add a duplicate Header
- Page does not add a duplicate Sidebar
- Page does not break AppShell layout
- Correct route is active in the sidebar

---

## Must Do

- Inspect existing router and navigation files before making changes
- Add routes only as children under the existing AppShell route
- Use existing navigation data patterns
- Use existing SVG icon components
- Verify `<Outlet />` usage
- Provide minimal, focused change only

---

## Must Not Do

- Do not replace the AppShell
- Do not replace the Sidebar
- Do not replace the Header
- Do not create a custom white header
- Do not replace the router architecture
- Do not add a new layout wrapper
- Do not duplicate navigation components
- Do not hardcode navigation colors, icons, or sizing
- Do not add icon libraries
- Do not modify the Infra library
- Do not perform broad refactors

---

## Required Workflow

1. Receive navigation goal, page name, and route.
2. Inspect existing router file.
3. Inspect existing navigation data / config.
4. Inspect existing AppShell, Sidebar, and Outlet usage.
5. Determine correct insertion point for the route.
6. Determine correct insertion point for the sidebar item.
7. Add route as child of AppShell route.
8. Add sidebar item following existing data pattern.
9. Use existing SVG icon component.
10. Confirm the page renders inside `<Outlet />`.
11. Report changes made.

---

## Output Format

```markdown
### Navigation Integration Summary

### Goal

What was added or changed.

### Router Change

File changed:
Before:
After:

### Navigation Data Change

File changed:
Before:
After:

### Sidebar Item Added

Label:
Route:
Icon:
Level:

### Verification

- [ ] Route added as child of existing AppShell route
- [ ] Navigation data updated following existing pattern
- [ ] SVG icon used (no icon library)
- [ ] No duplicate Header added
- [ ] No duplicate Sidebar added
- [ ] Page renders inside <Outlet />
- [ ] Correct route is active in sidebar

### Restrictions Followed

- No AppShell modified
- No Sidebar architecture modified
- No Header architecture modified
- No Router architecture replaced
- No icon library added

### Open Questions
```

---

## Screenshot Navigation Sync Rule

When a navigation screenshot or Figma reference is provided and an item is detected that does not exist in `spacesRegistry`:

1. Identify the exact Space, parent, level, and sibling position from the screenshot.
2. Determine the item type (button / split / dropdown) from visual evidence.
3. Infer route from proven sibling patterns, or mark as `routeStatus: 'needs-route'`.
4. Insert the item at the exact detected position.
5. Run `validate-spaces-navigation` after every change.
6. Do not delete existing items based on screenshot absence alone.
7. Report all changes before applying.

Use tool: `reconcile-navigation-screenshot.tool.md`

---

## Example Prompt

```
Use the Application Shell Navigation Agent.

Goal:
Add a new route and sidebar navigation item for the ScansPage.

Page name:
ScansPage

Route:
/scans

Navigation label:
Scans

Icon:
ScansIcon

Navigation level:
Top-level

Important:
Inspect the existing router and navigation config first.
Do not replace the AppShell or Sidebar.
Add route as a child under the existing AppShell route.
Use the existing SVG icon system.
Confirm the page renders inside <Outlet />.
```
