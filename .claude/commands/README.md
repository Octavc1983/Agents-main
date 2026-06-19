# Claude Commands

Commands are in `.claude/commands/`. Invoked with `/command-name`.

**Natural language is the recommended entry point.** Commands are optional helpers for focused or repeatable tasks.

---

## UX Flow Commands

End-to-end workflows. Each manages intake, orchestration, and validation internally.

| Command | Purpose |
|---|---|
| `/ux-add-page` | Create a new prototype page from scratch |
| `/ux-edit-page` | Edit an existing page based on UX feedback |
| `/ux-add-flow-to-page` | Add a new interaction flow to an existing page |
| `/ux-review-page` | Review a page: UX, DS, Figma alignment, state coverage |
| `/ux-fix-generated-page` | Fix a page that Claude generated incorrectly |

### Typical workflow

```
/ux-add-page             → create the page
/ux-add-flow-to-page     → add details panel, dialog, filters
/ux-review-page          → UX + DS review before sharing
/ux-edit-page            → apply feedback
```

---

## Build Commands

| Command | Purpose |
|---|---|
| `/build-component-from-image` | Build a pixel-perfect component from a screenshot |
| `/figma-reference` | Load Figma-to-React reference docs |
| `/ingest-template` | Convert a screenshot or Figma reference into a reusable Template specification — runs before any single-page build |

---

## Utility Commands — `_utilities/`

For focused steps, debugging, or when a UX Flow Command is too broad.

### Figma

| Command | Purpose |
|---|---|
| `/figma-scan` | Scan a Figma frame and extract structure |
| `/figma-map-components` | Map Figma elements to Infra/DS components |
| `/figma-build-page` | Build a page from a Figma source |
| `/figma-sync-navigation` | Update sidebar navigation from Figma |
| `/figma-extract-tokens` | Extract design tokens from Figma variables |
| `/figma-align` | Compare React implementation vs Figma |
| `/figma-create-icons` | Create SVG icon components from Figma icons |

### Component & Token Mapping

| Command | Purpose |
|---|---|
| `/map-components` | Map a requirement to existing DS components |
| `/detect-infra` | Detect DS components from a screenshot or visual |
| `/map-tokens` | Map visual styles to existing SCSS tokens |

### Navigation & States

| Command | Purpose |
|---|---|
| `/connect-navigation` | Wire a page to the router and sidebar |
| `/add-states` | Add loading, empty, error, and edge case states |
| `/generate-skeleton-loading` | Generate layout-aware skeleton loading for a page or template |

### Review & QA

| Command | Purpose |
|---|---|
| `/qa-code-review` | QA + code review: imports, styles, routing, telemetry, runtime |
| `/review-design-system` | DS compliance review |
| `/review-ux-flow` | UX flow review |
| `/review-icons` | SVG icon system review |
| `/create-review-package` | Generate a PM / R&D review package |

### Setup

| Command | Purpose |
|---|---|
| `/setup-claude-skills` | Validate or initialize Claude skills setup |

---

## Template Commands — `_templates/`

Create a specific page type directly, without the full `/ux-add-page` intake flow.

| Command | Template |
|---|---|
| `/create-table-page` | Full-width table |
| `/create-table-filters-template` | Table with search, filter panel, chips |
| `/create-table-master-details` | Table that narrows on row click, details panel |
| `/create-card-list-master-details` | 30% card list + 70% details panel |
| `/create-form-page` | Create / edit / settings / wizard form |
| `/create-dialog-flow` | Confirmation / form / multi-step dialog |
| `/create-dashboard-page` | Metric cards, summary sections |

---

## Global Restrictions

- Do not modify the official Infra library
- Do not create new DS components
- Do not create new SCSS tokens
- Do not use inline styles
- Do not hardcode hex colors, spacing, typography, radius, or shadows
- Do not add external UI libraries
- Do not add icon libraries — use `src/assets/icons/NavIcons.tsx` only
- Do not use PNG / JPG / emoji / icon fonts — SVG only
- Do not add backend logic or real API calls
- Do not expose debug state-switching buttons in the visible UI
- Do not replace AppShell, Sidebar, Header, or Router
- Do not perform broad refactors unless explicitly requested
