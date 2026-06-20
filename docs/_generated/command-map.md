# Command Map

A structured reference listing all available commands, organized by category, with their file paths relative to the repository root.

---

## Main UX Commands

These are the primary commands for day-to-day prototyping work. You can invoke these as slash commands or simply describe your intent in plain English.

| Command | What It Does | File Path |
|---|---|---|
| `/ux-add-page` | Create a new prototype page from scratch | `.claude/commands/ux-add-page.md` |
| `/ux-edit-page` | Edit an existing page based on feedback or a delta request | `.claude/commands/ux-edit-page.md` |
| `/ux-add-flow-to-page` | Add an interaction flow to an existing page (dialog, filter panel, details panel, tabs) | `.claude/commands/ux-add-flow-to-page.md` |
| `/ux-review-page` | Review a page for UX quality, DS compliance, Figma alignment, and state coverage | `.claude/commands/ux-review-page.md` |
| `/ux-fix-generated-page` | Fix a page that Claude generated incorrectly — targeted corrections to a broken build | `.claude/commands/ux-fix-generated-page.md` |
| `/build-component-from-image` | Build a Design System-compliant component from a visual reference (screenshot or Figma frame) | `.claude/commands/build-component-from-image.md` |
| `/figma-reference` | Set or update the Figma reference for the current page | `.claude/commands/figma-reference.md` |
| `/ingest-template` | Convert a screenshot or Figma frame into a registered reusable template specification | `.claude/commands/ingest-template.md` |

---

## Template Commands (`_templates/`)

Commands for building specific template types directly. These are shortcuts that skip template detection and go straight to a known template.

| Command | What It Creates |
|---|---|
| `/create-table-page` | A full-width table page with standard states |
| `/create-table-filters-template` | A table page with search, filter panel, and filter chips |
| `/create-table-master-details` | A table page with a row-click details panel |
| `/create-card-list-master-details` | A card list (30%) + details panel (70%) layout |
| `/create-form-page` | A form page for creating or editing a single entity |
| `/create-dialog-flow` | A modal/dialog overlay flow |
| `/create-dashboard-page` | A dashboard with metric tiles, charts, and summary widgets |

Template command files are located at `.claude/commands/_templates/`.

---

## Utility Commands (`_utilities/`)

Commands for specific focused tasks — analysis, mapping, Figma integration, QA, and setup. These run a single stage rather than a full workflow.

| Command | What It Does |
|---|---|
| `/add-states` | Add loading, empty, error, and success states to an existing page |
| `/connect-navigation` | Wire an existing page to the router and sidebar |
| `/create-review-package` | Generate a PM/UX/R&D review package for a completed page |
| `/detect-infra` | Detect which Design System and infrastructure components are used in a screenshot or page |
| `/figma-align` | Run a visual alignment review comparing the React page to a Figma reference |
| `/figma-build-page` | Build a page directly from a Figma frame (full Figma-to-React workflow) |
| `/figma-create-icons` | Extract SVG icons from a Figma frame and register them in the icon library |
| `/figma-extract-tokens` | Extract design tokens from Figma variables and map them to SCSS tokens |
| `/figma-map-components` | Map Figma components to their Design System equivalents |
| `/figma-scan` | Scan a Figma frame and extract its structure (layer names, components, layout) |
| `/figma-sync-navigation` | Extract navigation structure from a Figma sidebar and sync it to the project |
| `/map-components` | Map screen requirements to Design System components (without building) |
| `/map-tokens` | Map style values in a screenshot or design to SCSS token names |
| `/qa-code-review` | Run a QA pass on a page (imports, dead code, SCSS, runtime safety) |
| `/review-design-system` | Run a Design System compliance review on a page |
| `/review-icons` | Check that all icons on a page are SVG and correctly registered |
| `/review-ux-flow` | Run a UX flow review on a page (states, edge cases, interactions) |
| `/setup-claude-skills` | Set up or refresh the Claude skill system for this project |

Utility command files are located at `.claude/commands/_utilities/`.

---

**Note:** All commands can also be triggered through plain-language requests — you do not need to use the slash command syntax. Claude detects the intent automatically and selects the appropriate command or workflow. See [How to Work with Claude](../getting-started/how-to-work-with-claude.md).

