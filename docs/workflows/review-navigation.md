# Review and Update Navigation

The app has a sidebar on the left that users navigate through to reach different screens. This guide explains how the navigation is structured, how to add or update items, and what Claude protects automatically.

---

## 1. How Navigation Is Structured

The sidebar is organized into **Spaces** — top-level groupings that contain navigation items. Within each space, items can be nested into a hierarchy (parent items with child items underneath them).

For example:
- **Accounts** (Space)
  - Accounts List (top-level item)
  - Policies (top-level item)
  - Credentials (top-level item)
    - Rotations (child item under Credentials)

Each navigation item has:
- A label (the text shown in the sidebar)
- A route (the URL it links to)
- An icon (always an SVG icon)
- A position relative to its siblings

The navigation structure is maintained in a central registry. Claude reads this registry before placing any new item.

---

## 2. What a Navigation Review Checks

When you ask Claude to review the navigation, it checks:

- **Missing items** — navigation items referenced in the app that are not in the sidebar
- **Active states** — does the correct item highlight when you visit a page?
- **Hierarchy errors** — items placed at the wrong level (child treated as parent, or vice versa)
- **Route conflicts** — two items pointing to the same route, or an item with no valid route
- **Orphan pages** — pages that exist in the app but have no navigation entry
- **Label consistency** — sidebar labels should match page titles and breadcrumbs
- **Breadcrumb alignment** — does the breadcrumb trail reflect the sidebar hierarchy?

---

## 3. How to Add a New Navigation Item

Describe the item you want to add in plain English. You do not need to know the technical structure.

Examples:
- "Add 'Credential Rotations' to the sidebar under 'Credentials'"
- "Add a 'Reports' section to the top navigation with 'Audit Log' and 'Export History' underneath"
- "The Scans page needs a sidebar entry — it should appear under the 'Security' space"

Claude will:
1. Read the current navigation structure
2. Determine the correct space and hierarchy level based on your description and the existing siblings
3. Propose the exact placement and ask for your confirmation before making the change
4. Create the sidebar entry and route wiring after your approval

---

## 4. The Screenshot Navigation Sync Rule

If you attach a screenshot that shows a navigation sidebar, Claude reads it and syncs the navigation to match. This is called navigation reconciliation.

How it works:
1. You attach a screenshot showing the sidebar (e.g., from a Figma design or product screenshot)
2. Claude reads the screenshot and extracts each visible item, its space, hierarchy level, and sibling position
3. Claude compares this to the current navigation structure
4. For each item in the screenshot that is missing from the live navigation, Claude adds it in the exact position shown — same space, same level, same order
5. Claude reports what was added and what was already present

Important rules for screenshot sync:
- Claude adds items in the exact detected position — it does not guess or reorder
- If a route cannot be inferred from the sibling pattern, the item is created as "route-pending" and you are asked to confirm the route separately
- Claude does not remove existing items based on a screenshot — it only adds what is missing
- Claude does not flatten the hierarchy to make it simpler — it preserves the exact structure

---

## 5. What Claude Will NOT Do

- **Flatten the hierarchy** — Claude will not merge levels to make the structure simpler without your approval
- **Blindly append at the bottom** — every new item is placed in the correct position relative to its siblings
- **Create a new route without your approval** — routes are always Level 3 decisions that require your sign-off
- **Rename existing items** — unless you explicitly ask for a rename
- **Remove navigation items** — Claude never removes items from the sidebar without a specific instruction
- **Change the navigation structure of another space** — changes are scoped to the space you described

---

## 6. How to Update Breadcrumbs, Routes, or Active States

### Breadcrumbs
If a breadcrumb trail does not match the sidebar hierarchy, describe the mismatch:
> "The Rotations page breadcrumb shows 'Home > Rotations' but it should show 'Accounts > Credentials > Rotations'"

Claude reads the current breadcrumb configuration and proposes the correct path.

### Routes
If a page's URL needs to change:
> "The Credential Rotations page is at /rotations — can we move it to /accounts/credentials/rotations to match the hierarchy?"

This is a Level 3 decision (mandatory approval) because routes affect links, bookmarks, and navigation history.

### Active states
If the wrong sidebar item is highlighted when you visit a page:
> "When I'm on the Credential Rotations page, the 'Credentials' item is highlighted in the sidebar instead of 'Credential Rotations'"

Claude checks the active state configuration and corrects the mismatch.

