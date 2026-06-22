# Navigation Standard

## Standard ID

`GUS-011`

## Category

`navigation`

## Status

`active`

---

## Rule

Use the existing AppShell, Sidebar, and Router architecture. Never replace or recreate them. Add navigation items only through the approved `spacesRegistry` and router configuration.

---

## Required Navigation Behavior

- Active sidebar item must reflect the current route
- Opening a Wizard or Form must not change the active sidebar selection
- Browser Back must navigate to the logical parent context
- Unknown routes must render a Not Found state inside the AppShell content area — never replace the AppShell

---

## Screenshot Navigation Sync Rule

When a navigation screenshot or Figma reference contains an item missing from `spacesRegistry`:
- Add it in the exact detected Space, hierarchy level, item type, and sibling position
- Do not append blindly, flatten hierarchy, or place in the wrong Space
- Infer routes only from proven sibling route patterns — otherwise create as route-pending

---

## Forbidden

- Replacing AppShell, Sidebar, Header, or Router
- Creating a custom navigation shell for a page
- Hardcoding navigation items in page JSX
- Navigation items that point to missing routes
- Changing sidebar selection when opening an overlay, dialog, or wizard

---

## QA Checks

1. Does every navigation item point to an existing route?
2. Does every route render inside AppShell?
3. Does the active sidebar item correctly reflect the current route?
4. Does opening a Wizard/Form preserve the sidebar selection?
5. Does the 404 state render inside AppShell?

---

## Standard Metadata

```ts
{ id: 'GUS-011', title: 'Navigation Standard', category: 'navigation', status: 'active', approvedAt: '2026-06-21' }
```
