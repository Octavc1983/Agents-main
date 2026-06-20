# How Screens Are Built Automatically

When you ask Claude to build a new screen, a significant amount of work happens automatically. You provide the intent and the domain knowledge. Claude handles the construction, compliance, and completeness. This page explains exactly what you get without having to ask for it.

---

## What You Must Provide

To build a complete screen, Claude needs the following from you:

| What | Example |
|---|---|
| Screen name or page title | "Credential Rotations" |
| Purpose of the screen | "Shows all active rotation jobs for privileged accounts" |
| Key data shown | "Status, target account, last run time, next scheduled run" |
| Key actions available | "View details, filter by status, search by account name, trigger manual rotation" |

Everything else is handled automatically.

---

## What Gets Built Automatically

### 1. Template Detection

Claude reads your description and matches it to the best-fit layout template from the template registry. You do not need to name the template. If your screen needs a table with a row-click details panel, Claude selects TableMasterDetailsTemplate. If it needs a card list on the left with details on the right, it selects CardListMasterDetailsTemplate. And so on.

If no template matches your description, Claude creates a Draft Template Candidate and asks for your approval before building.

### 2. Component Selection

Claude maps every part of your screen to the corresponding Design System component. The table uses the DS DataTable. The search bar uses the DS SearchInput. Status badges use the DS StatusBadge. Every component is selected from the approved Design System — no custom or local components are created unless the DS genuinely lacks what's needed (which is reported as a gap).

### 3. State Generation

All four data states are built automatically for every screen that fetches or displays data (DEC-005):

- **Loading state** — A skeleton layout that matches the real page structure (not a spinner alone)
- **Empty state** — A message explaining why there is nothing to show, plus a call to action where relevant
- **Error state** — A clear explanation of what went wrong, with a retry option and a path forward
- **Success state** — Confirmation feedback appropriate to the actions on the screen

You do not need to request these states. They are always included.

### 4. Mock Data Creation

Typed mock data is created automatically (DEC-006). This means:
- The data has a defined structure matching the domain (not just generic placeholder strings)
- It is stored in a centralized location (`src/mock/`) so it can be shared and reused
- It is not embedded inside the page component itself
- It includes realistic values for the domain (rotation job statuses, account names, timestamps)

### 5. Navigation Wiring

A sidebar entry is created for the new page and wired to the router. Claude determines the correct space and hierarchy position based on the existing navigation structure. You are asked to confirm the route (Level 3 decision) before the navigation entry is finalized.

### 6. Copy Review

After the screen is built, the technical-writing-agent checks all visible text against the terminology registry and style guide. Any deprecated terms are flagged and must be resolved. New product-specific terms are proposed for registry addition.

### 7. Dark Mode Compliance

Every screen is built using semantic Design System tokens, which means it automatically works in dark mode. No additional work is needed for dark mode compatibility.

### 8. Skeleton Loading States

The skeleton-loading-intelligence-agent generates a skeleton version of the screen that matches the real layout exactly. The skeleton uses the same grid, column proportions, and panel structure as the real page.

---

## What the Automatic Build Does NOT Include

Some things require explicit requests or your approval:

- **Custom interaction flows** — Confirmation dialogs, complex filter panels, bulk actions, and wizard flows must be explicitly requested (though Claude will flag their absence in the UX review)
- **New routes** — Always requires your explicit approval before the route is created
- **Figma pixel-perfect accuracy** — Requires a Figma link and a visual alignment review
- **Telemetry instrumentation** — Requires explicit instruction if needed

---

## Summary: What You Get Without Asking

| Automatically Included | Source Decision |
|---|---|
| All four data states (loading, empty, error, success) | DEC-005 |
| Typed, centralized mock data | DEC-006 |
| Skeleton loading matching real page layout | DEC-005 |
| Form values preserved after validation failure | DEC-002 |
| Submit button disabled during in-progress save | DEC-001 |
| Focus restoration after panel/drawer close | DEC-007 |
| SVG icons only | DEC-010 |
| SCSS tokens only (no hardcoded styles) | DEC-011 |
| DS components through public API only | DEC-009 |
| Dark mode compatibility | Architecture rule |
| Copy and terminology check | Architecture rule |
| Navigation wiring (pending route approval) | Architecture rule |

