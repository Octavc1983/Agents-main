# Component Mapping Skill

## Purpose

This skill defines the reusable workflow for mapping a UX/UI requirement, Figma frame, screenshot, or page description to existing Infra / Design System components before implementation.

Use this skill to make sure implementation starts from real project components, existing Design System patterns, existing tokens, and existing examples instead of invented UI.

---

## When to Use

Use this skill before:

* Creating a new React prototype page
* Creating a page from Figma MCP
* Creating a page from screenshots
* Refactoring a generated page
* Building table/list pages
* Building master-details pages
* Building dialogs
* Building forms
* Building navigation updates
* Running the Prototype Page Builder Agent
* Running the Figma Alignment Agent
* Running the Design System Review Agent

---

## Inputs Required

At least one of:

* UX/UI requirement
* Figma link
* Figma frame name
* Screenshot
* Page description
* User flow description
* Existing generated page path
* Target page name
* Target route

Recommended input format:

```text
Page name:
Route:
Figma source:
Screenshot:
User goal:
Required components:
Required states:
Required interactions:
Known constraints:
```

---

## Required Project Inspection

Before mapping, inspect the project.

Required files and folders to check when available:

```text
src/components/
src/components/layout/
src/components/ui/
src/design-system/
src/app/router.tsx
src/mock/
src/types/
src/styles/
src/styles/_variables.scss
src/styles/_mixins.scss
src/styles/_typography.scss
src/styles/globals.scss
src/figma/
```

Also inspect:

* Existing page implementations
* Existing component exports
* Existing import paths
* Existing state components
* Existing navigation patterns
* Existing icon system
* Existing token usage
* Existing SCSS conventions

---

## Required Workflow

1. Understand the requested UI or flow.
2. Identify all screen regions.
3. Identify all required user interactions.
4. Identify all required states.
5. Inspect the existing project structure.
6. Search existing layout components.
7. Search existing UI components.
8. Search existing Infra / Design System components.
9. Search existing icons.
10. Search existing token files.
11. Search similar implemented pages.
12. Map each UI area to an existing component.
13. Provide exact import paths only when verified.
14. Mark mapping confidence.
15. List components that must not be recreated.
16. List missing components, tokens, icons, or unclear patterns.
17. Provide direct notes for implementation agents.
18. Stop before implementation unless explicitly asked to continue.

---

## Mapping Rules

### Component mapping

Every visible or required UI area must be mapped.

| UI Area | Existing Component |
|---|---|
| Application shell | AppShell |
| Left navigation | Sidebar |
| Page title | Header / PageHeader |
| Toolbar | Toolbar / layout wrapper |
| Filter button | Button / FilterButton |
| Search field | SearchInput / Input |
| Table | Table / DataGrid / List |
| Row checkbox | Checkbox |
| Status | StatusIndicator / Badge / Chip |
| Row actions | MoreActions / Menu |
| Details panel | Drawer / Panel / Card / DetailsPanel |
| Tabs | Tabs |
| Empty state | EmptyState |
| Loading state | LoadingState |
| Error state | ErrorState |

### Import path rule

Only include import paths that were found in the project.

Do not invent paths.

If a component is likely but the path is not verified, write:

```text
Import path: needs verification
```

### Confidence rule

Every component mapping must include confidence:

* **High** — component and usage pattern confirmed in project
* **Medium** — component found but usage pattern unclear
* **Low** — likely match but needs verification
* **Gap** — no matching component found

### Reuse rule

If a component exists, it must not be recreated.

If an equivalent component exists under a placeholder UI folder, it may be used as a prototype placeholder and documented as such.

### Gap rule

If a component, token, icon, or behavior is missing, document it as a gap.

Do not solve the gap by inventing new DS components.

---

## Must Do

* Inspect project before mapping
* Map all visible UI regions
* Use existing Infra / DS components first
* Use existing local components second
* Use existing placeholder components only when official Infra component is unavailable
* Find similar page examples
* Provide verified import paths where possible
* Mark mapping confidence
* List components that must not be recreated
* Document gaps and assumptions
* Give implementation notes to the Prototype Page Builder Agent

---

## Must Not Do

* Do not implement the page
* Do not create components
* Do not create DS components
* Do not create tokens
* Do not add libraries
* Do not add icon libraries
* Do not modify Infra
* Do not invent imports
* Do not invent props
* Do not invent APIs
* Do not use inline styles
* Do not hardcode visual values
* Do not skip project inspection
* Do not provide generic mapping without checking project files

---

## Output Format

````markdown
### Component Mapping Summary

### Requested UI / Flow

### Existing Project Patterns Found

| Pattern | File / Path | How It Should Be Used |
|---|---|---|

### Recommended DS / Infra Components

| UI Need | Existing Component | Import Path | Confidence | Notes |
|---|---|---|---|---|

### Component Usage Map

| Screen Area | Component to Use | Data / Props Needed | Notes |
|---|---|---|---|

### Suggested Imports

```ts
// Only verified imports.
// Do not invent import paths.
```

### Components That Must Not Be Recreated

### Missing Components or Gaps

#### Missing Components

#### Missing Tokens

#### Missing Icons

#### Ambiguous Patterns

#### Unclear Behavior

### Notes for Prototype Page Builder Agent

### Implementation Safety

Choose one:

* Ready for implementation using existing components
* Ready only with documented placeholders
* Needs UX clarification
* Needs DS clarification
* Needs token clarification
* Not safe to implement

### Open Questions
````

---

## Example Prompt

```
Use the Component Mapping Skill.

Goal:
Map the following page requirement to existing Infra / Design System components before implementation.

Page:
[PAGE_NAME]

Route:
[ROUTE]

Requirement:
[PASTE REQUIREMENT OR FIGMA DESCRIPTION]

Figma source:
[PASTE FIGMA LINK IF AVAILABLE]

Important:
Analyze first.
Inspect the project.
Do not implement.
Do not create components.
Do not invent imports.
Return a complete component mapping report and gaps.
```
