# Glossary

Plain-language definitions for every term used in this project. Organized alphabetically.

---

**Agent**
A specialist role that Claude takes on automatically for a specific type of task. Agents run in sequence as part of a workflow pipeline. Examples: the template recognition agent, the component mapping agent, the UX audit agent. You do not invoke agents directly — they run automatically. See [Agent Directory](../agents/agent-directory.md).

**Annotation**
A review note attached to a specific screen in the prototype. Annotations have three severity levels (Note, Warning, Critical) and are managed through the Review Annotations panel. They support editing (with full history), resolving, and soft deletion. See [Review Annotations](../review-annotations/README.md).

**AppShell**
The permanent outer frame of the application — the top header bar and the left sidebar. The AppShell is always visible regardless of which page you are on. Claude never replaces or modifies the AppShell structure without explicit approval. It is treated as protected infrastructure.

**Approval Model**
The three-level system that determines what Claude applies automatically (Level 1), what it prefills and confirms (Level 2), and what always requires your explicit sign-off (Level 3). See [The Approval Model](../getting-started/approval-model.md).

**Architecture Registry**
A set of reference files that track what components, types, templates, and API contracts exist in the project. Claude consults these before creating anything new to avoid duplication. Located in `.claude/architecture/`.

**Breadcrumb**
The navigation trail shown at the top of a page that indicates where you are in the hierarchy. Example: "Accounts > Credentials > Rotations". Breadcrumbs should always match the sidebar hierarchy.

**Component**
A reusable piece of UI — a button, a table, a filter panel, a status badge. In this project, components come from the Design System (`@idira/design-system`) whenever possible. Local custom components are only created when the Design System genuinely lacks what is needed.

**Component Mapping**
The process of translating a set of screen requirements into specific Design System components. Example: "a table with sortable columns" maps to the DS DataTable component. Handled automatically by the component-mapping-agent before any implementation begins.

**Dark Mode**
A display mode where the UI uses dark background colors and light text. All screens in this project must be dark-mode compatible. Claude enforces this by using semantic Design System tokens (which automatically support both light and dark themes) rather than hardcoded colors.

**Decision Memory**
See User Decision Memory.

**Delta Report**
A structured summary that Claude produces before making any change to an existing screen. The delta report lists: what was found (the current state of the page), what will change (the specific proposed edits), and what will not be touched (everything outside scope). You approve the delta before any code changes. See [Update an Existing Screen](../workflows/update-an-existing-screen.md).

**Design System (DS)**
The shared UI component library used in this project: `@idira/design-system`. It contains the approved buttons, tables, forms, badges, icons, SCSS tokens, and layout components. All screens must use DS components through their public API. Custom styling or overrides of DS components are not permitted.

**Dialog**
A modal overlay that appears on top of the current screen to present a focused task or decision — saving a form, confirming a deletion, displaying a bulk operation result. The screen behind the dialog is still visible but not interactive.

**DS Gap**
A situation where the Design System does not have a component, token, or icon that is needed for a screen. When a DS gap is found, Claude stops and reports it. It never invents a local workaround. A DS gap requires a decision about how to proceed — either using the closest available DS component, or requesting a new component from the DS team.

**Empty State**
What a user sees when a screen has no data to display — for example, a table with no rows because there are no results. A good empty state explains why there is no data and offers a clear call to action where relevant. Example: "No rotation jobs configured yet. Create your first rotation job to get started."

**Error State**
What a user sees when a data request fails. A good error state tells the user what went wrong (in plain language), offers a way to retry, and provides a path forward if retry is not possible.

**Figma**
A design tool used for creating UI designs and prototypes. Claude can read Figma frames directly using a Figma integration, extracting component names, layout structure, and design tokens. See [Working with Figma or Screenshots](../workflows/work-with-figma-or-screenshots.md).

**Flow Gap**
A missing or incomplete interaction detected during a UX review. A flow gap means a user has no defined path in a specific situation — for example, no error state when data fails to load, or no confirmation before a destructive action. Flow gaps are surfaced during review, not during build. See [Flow Gaps and UX Notes](../review-annotations/flow-gaps-and-ux-notes.md).

**Infra**
Short for "infrastructure" — the collection of shared components, utilities, services, and layout components that exist in the project codebase (outside the Design System package). Infra components are project-specific and may include things like page shells, shared layout containers, or domain-specific feature components.

**Lesson Candidate**
A proposed rule or pattern improvement that the continuous-improvement-agent created from evidence of a recurring mistake. Lesson candidates require your review and approval before becoming permanent rules. See [UX Pattern Learning](../automation/ux-pattern-learning.md).

**Loading State**
What a user sees while data is being fetched from the backend. In this project, loading states use skeleton layouts — placeholder shapes that match the real page structure — rather than full-page spinners. This gives users a sense of the page's layout while data loads.

**Mock Data**
Realistic placeholder data used in prototype screens when a real backend connection is not available. In this project, mock data must be typed (has a defined structure), centralized (stored in `src/mock/`), domain-specific (looks like real data for the feature area), and reusable (can be shared across components that need the same data shape). It is never hardcoded inside page files.

**Navigation**
The sidebar menu that users use to move between screens in the app. Navigation is structured into Spaces (top-level groupings) with items and sub-items organized in a hierarchy. The navigation structure is maintained in a central registry.

**Page Composition Template**
A reusable layout pattern that assembles Design System components into a complete screen structure. Templates are not DS components — they are project-specific layout patterns that define how a common screen type is organized (table, form, wizard, dashboard, etc.). See [Page Composition Templates](./templates.md).

**Route**
The URL path for a page. Example: `/accounts/credentials/rotations`. Creating a new route always requires your explicit approval (Level 3 decision). Routes are registered in the router and linked to the corresponding navigation entry.

**Safety Gate**
The set of checks Claude runs before making any code changes. The safety gate confirms: which files are in scope, what already exists, what the approved behavior is, and whether a delta report is needed. Nothing is changed until the safety gate confirms the scope is clear.

**Sidebar**
The left-side navigation panel that is part of the AppShell. The sidebar shows the navigation structure (spaces, items, and sub-items). The active item is highlighted based on the current page route.

**Skeleton Loading**
A type of loading state that shows placeholder shapes matching the real page layout, rather than a spinner or blank page. Skeleton states use the same grid and panel structure as the actual page so users can perceive the layout while data loads. Generated automatically by the skeleton-loading-intelligence-agent.

**Soft Delete**
A deletion approach where the item is hidden from the active view but not permanently removed from the system. A soft-deleted item has a deletion timestamp stored and remains in the audit log. In this project, soft delete is used for data deletions (DEC-003) and annotation deletions (DEC-013).

**Space (navigation)**
A top-level group in the sidebar navigation. Spaces organize related navigation items together. Examples: "Accounts", "Security", "Administration". Navigation items are always placed within a specific space — Claude never places an item outside an existing space without your approval.

**State**
A mode or condition a screen can be in. The four data states are loading, empty, error, and success. Other states include validation error states (form fields with inline error messages), selected states (a row that is selected), disabled states (a button that is not available), and hover/focus states.

**Template**
See Page Composition Template.

**Template Registry**
A central catalog of all registered page composition templates. Claude consults the template registry before implementing any new screen to find the best matching template. Located at `.claude/architecture/template-registry.md`.

**Token**
A named design variable that stores a value — typically a color, spacing size, font size, shadow, or border radius. Tokens are defined in the Design System and referenced by name in SCSS. Using tokens instead of hardcoded values ensures dark mode compatibility and visual consistency across the product. Example: `$color-text-primary` instead of `#1a1a2e`.

**UX Note**
A reviewer observation about UX quality — typically added as a Note-severity annotation in the Review Annotations panel. UX Notes are improvements or suggestions, not blockers. See [Flow Gaps and UX Notes](../review-annotations/flow-gaps-and-ux-notes.md).

**Wizard**
A multi-step guided flow for complex tasks that require several decisions in sequence. Wizards use a progress indicator so users know how many steps remain. In this project, wizards use the WizardTemplate. A wizard must have a clearly defined path to completion and, where practical, a way to save progress and exit mid-way.

