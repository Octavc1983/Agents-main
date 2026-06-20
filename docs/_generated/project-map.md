# Project Map

A plain-language overview of the major areas of this project. This map is intended for UX designers, PMs, and non-technical stakeholders who want to understand what lives where.

---

## Application Source Code (`src/`)

This is where the live prototype application code lives. It contains all the pages, components, features, data, and assets that make up the app.

### `src/pages/`
Individual screen pages — one folder per screen. Each page folder contains the page component and its styles. Examples: `ScansPage/`, `AccountSettingsPage/`, `ABTestingPage/`. These are the files that are created and modified when you ask Claude to build or update a screen.

### `src/components/`
Shared UI components used across multiple pages. Divided into two sub-areas:
- `src/components/ui/` — Generic UI building blocks like buttons, accordions, action menus, and other reusable interface elements
- `src/components/layout/` — Layout infrastructure like the AppShell (outer frame), Sidebar (navigation panel), and any other structural layout wrappers

### `src/features/review-annotations/`
The Review Annotations feature — the code that powers the annotation panel accessible through the "Review" button in the header. This includes the annotation panel, the add/edit/delete/resolve interactions, and the annotation data management.

### `src/mock/`
Centralized mock data files. All typed, domain-specific placeholder data is stored here. When Claude builds a new screen, it creates a mock data file in this folder rather than embedding placeholder data inside the page file. This allows mock data to be shared and reused across multiple components.

### `src/assets/icons/`
The SVG icon library. All icons in the project must be SVG components stored here. There are no icon font libraries or PNG icons in this project. The main icon file is `NavIcons.tsx`.

### `src/styles/`
Global SCSS styles and design token variables. The file `_variables.scss` contains the SCSS token definitions (colors, spacing, typography, shadows) that all screens use.

### `src/prototype-templates/`
Page-level prototype templates implemented as React components. These correspond to the registered template patterns in the template registry.

---

## Claude Workflow System (`.claude/`)

This folder contains everything that powers Claude's structured workflow system — the agents, skills, commands, tools, architecture registries, and quality systems. This is not application code — it is Claude's operating instructions and project memory.

### `.claude/agents/`
Specialist role definitions. Each agent is a markdown file that defines a role's responsibilities, decision boundaries, and behavior rules. Organized into sub-folders: `_core/` (routing, building, reviewing), `_figma/` (Figma integration), `_infra/` (component detection, navigation), `_documentation/` (review packages).

### `.claude/skills/`
Reusable workflow playbooks. Skills are step-by-step instructions for how specific types of work are done. Referenced by agents and commands. Organized similarly to agents.

### `.claude/commands/`
User-facing slash commands. These are the named shortcuts you can use (e.g., `/ux-add-page`, `/ux-review-page`). Each command file defines the intake form and which skills/agents it invokes.

### `.claude/tools/`
Registered tools that agents can use — named capabilities like `detect-screen-template`, `protect-existing-page`, and `generate-layout-aware-skeleton`.

### `.claude/architecture/`
Architecture registries and decision records:
- `component-registry.md` — Known shared components and candidates
- `data-contract-registry.md` — Known data types and API contracts
- `feature-api-registry.md` — Feature-level API shapes
- `shared-patterns.md` — Patterns identified but not yet extracted
- `template-registry.md` — Registered page templates
- `decisions/` — Architecture Decision Records (ADRs) for permanent decisions
- `user-decision-memory/` — Registered behavioral decisions (DEC-001 through DEC-015)

### `.claude/quality/`
Quality tracking — lesson candidates, approved lessons, QA reports, and UX audit reports:
- `lessons/lesson-candidates.md` — Active candidates under review
- `lessons/approved-lessons.md` — Promoted lessons applied to future work
- `lessons/rejected-lessons.md` — Rejected lessons with reasons
- `evals/` — Regression evaluation cases for each workflow type
- `reports/` — Latest QA reports, UX audits, and architecture reviews

### `.claude/content/`
Terminology and copy governance:
- `terminology-registry.md` — Approved product terms and preferred forms
- `ux-writing-style-guide.md` — Voice, tone, grammar, and mechanics rules
- `approved-microcopy-patterns.md` — Reusable approved copy blocks
- `deprecated-terms.md` — Terms that must not appear in the product UI

---

## Documentation (`docs/`)

This folder — where you are now. Plain-language documentation for UX designers, PMs, design leads, and product owners. No coding knowledge assumed.

---

## Configuration Files (root)

- `README.md` — Root project README for developers
- `CLAUDE.md` — Core rules for Claude's behavior in this project
- `AGENTS.md` — The Claude workflow system overview
- `package.json` — Project dependencies (developer reference)
- `vite.config.ts` — Build configuration (developer reference)

---

**Note:** This map is manually maintained. It describes the major areas rather than listing every file. For a complete live file listing, run `git ls-files` in the project root.

