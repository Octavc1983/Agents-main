# Tool Map

A reference listing of all registered tools in the project, organized by category, with plain-language descriptions of what each tool does.

Tools are internal capabilities that agents use during workflow execution. You do not invoke tools directly — they run automatically as part of the agent pipeline. This list is provided for reference so you can understand what happens during a workflow.

---

## Screen Tools

These tools manage screen identification, protection, and theme conversion.

| Tool | What It Does |
|---|---|
| `detect-screen-template` | Identifies which page composition template best fits a given screen based on its layout, content type, and interaction pattern. Runs before any implementation to ensure the correct template is matched. |
| `protect-existing-page` | Checks whether a requested page already exists before any code changes. If the page exists, it prevents overwriting and triggers the delta report workflow instead. This is the enforcement mechanism for the Existing Page Protection rule. |
| `convert-screen-to-dark` | Converts a screen's color usage from hardcoded or light-mode values to semantic Design System tokens that work correctly in dark theme. Used when an existing screen needs dark mode compatibility. |

---

## Design System Tools

These tools manage Design System compliance and gap detection.

| Tool | What It Does |
|---|---|
| `inspect-design-system` | Reads the Design System component API before using a component. Ensures the correct props, variants, and usage patterns are applied. Prevents incorrect usage that would be caught later in the DS review. |
| `classify-component-ownership` | Determines whether a component being used or proposed belongs to the Design System package or is a local project component. Ensures DS components are not accidentally reimplemented locally. |
| `align-design-system-package` | Runs a full DS alignment check — identifies gaps (missing components or tokens), misuses (overrides or mutations), and components used through incorrect APIs. Produces a structured gap report. |

---

## Navigation Tools

These tools manage the navigation structure and route registry.

| Tool | What It Does |
|---|---|
| `reconcile-navigation-screenshot` | Reads a navigation screenshot or Figma sidebar reference and syncs it to the `spacesRegistry`. Adds missing items at their exact detected position (space, hierarchy level, sibling order). Does not remove existing items. |
| `validate-spaces-navigation` | Validates the current navigation structure for completeness and correctness — checks hierarchy consistency, route validity, active state configuration, and label alignment with page titles and breadcrumbs. |

---

## Quality Tools

These tools run quality checks on screens and copy.

| Tool | What It Does |
|---|---|
| `review-screen-ux-content` | Checks all visible text on a screen against the terminology registry, style guide, deprecated terms list, and approved microcopy patterns. Flags deprecated terms (blocking), unregistered product terms (warning), and style guide violations. |
| `run-ui-quality-validation` | Runs the full UI quality pass — DS compliance, copy review, state coverage, import validation, and SCSS correctness. The comprehensive quality gate that runs before a screen is marked complete. |
| `generate-layout-aware-skeleton` | Generates a skeleton loading state that matches the real page layout. Reads the page structure and creates placeholder shapes that mirror the actual component positions, column widths, and panel proportions. Uses DS tokens throughout. |

---

## Dialog Tools

These tools manage modal and dialog wiring.

| Tool | What It Does |
|---|---|
| `resolve-modal-service` | Wires modals and dialogs to the project's modal service. Ensures dialogs are opened and closed through the correct service layer rather than local component state, which is needed for correct focus management, accessibility, and routing behavior. |

---

**Note:** Tools are not slash commands and cannot be called by name in the chat. They run automatically as part of the agent pipeline. For commands you can invoke directly, see the [Command Map](./command-map.md).

