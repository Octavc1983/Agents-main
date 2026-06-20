# Project Tools Registry

Maps every project tool to its purpose, inputs, outputs, safe mode, apply mode, agents, skills, commands, and file scope.

## Registry

### detect-screen-template

| Field | Value |
|---|---|
| Purpose | Classify screen type before any implementation |
| Inputs | source (text/image/figma-url/route) |
| Outputs | Template match, confidence, navigation impact, candidate path |
| Dry Run | Always |
| Apply Mode | Write Draft Template Candidate only |
| Related Agent | template-recognition-and-lifecycle-agent |
| Related Skill | template-recognition-and-lifecycle/SKILL.md |
| Related Command | /ux-add-page, /ux-edit-page |
| Allowed File Scope | .claude/architecture/ (read), .claude/architecture/template-candidates/ (write) |
| Protected Scope | src/, packages/ |

### inspect-design-system

| Field | Value |
|---|---|
| Purpose | Discover DS components, icons, tokens before implementation |
| Inputs | capability (string), category (optional) |
| Outputs | Available components, icons, tokens, import recommendation, DS gap |
| Dry Run | Always (read-only) |
| Apply Mode | N/A |
| Related Agent | component-mapping-agent, design-system-review-agent |
| Related Skill | component-mapping/SKILL.md |
| Related Command | /map-components, /review-design-system |
| Allowed File Scope | packages/design-system/src/ (read-only) |
| Protected Scope | All files — read only |

### convert-screen-to-dark

| Field | Value |
|---|---|
| Purpose | Convert screen to dark mode using DS semantic tokens |
| Inputs | target (page/screenshot/figma) |
| Outputs | Semantic token mapping, hardcoded values, DS gaps, safe changes |
| Dry Run | Default |
| Apply Mode | Replace SCSS token references in confirmed target files only |
| Related Agent | design-system-review-agent, code-quality-qa-agent |
| Related Skill | design-system-review/SKILL.md |
| Related Command | /ux-edit-page, /ux-review-page |
| Allowed File Scope | Target page SCSS only (apply mode) |
| Protected Scope | packages/design-system/src/, src/styles/_variables.scss |

### classify-component-ownership

| Field | Value |
|---|---|
| Purpose | Determine correct ownership tier and file location for any component |
| Inputs | component_description, usage_count, has_domain_logic |
| Outputs | Classification, required location, creation decision |
| Dry Run | Always |
| Apply Mode | N/A |
| Related Agent | component-mapping-agent, shared-architecture-agent |
| Related Skill | component-mapping/SKILL.md |
| Related Command | /map-components |
| Allowed File Scope | src/, packages/ (read-only) |
| Protected Scope | packages/design-system/src/, src/components/layout/ |

### align-design-system-package

| Field | Value |
|---|---|
| Purpose | Audit and plan migration of package/legacy alignment issues |
| Inputs | scope (directories) |
| Outputs | Duplicates, internal imports, invalid ownership, migration plan |
| Dry Run | Default |
| Apply Mode | Execute approved migration steps only |
| Related Agent | code-quality-qa-agent, shared-architecture-agent |
| Related Skill | shared-component-and-data-architecture/SKILL.md |
| Related Command | N/A |
| Allowed File Scope | src/, packages/ (apply: per migration plan) |
| Protected Scope | packages/design-system/src/ core, CLAUDE.md, AGENTS.md |

### validate-spaces-navigation

| Field | Value |
|---|---|
| Purpose | Validate navConfig, routes, active state logic, collapsed/expanded behavior |
| Inputs | navconfig_path |
| Outputs | Rule failures, route coverage, active state report |
| Dry Run | Always (read-only) |
| Apply Mode | N/A |
| Related Agent | application-shell-navigation-agent |
| Related Skill | application-shell-navigation/SKILL.md |
| Related Command | /connect-navigation |
| Allowed File Scope | src/navigation/, src/app/router.tsx (read-only) |
| Protected Scope | All files — read only |

### generate-layout-aware-skeleton

| Field | Value |
|---|---|
| Purpose | Generate layout-matching skeleton loading states |
| Inputs | page_path, loading_scope |
| Outputs | Skeleton anatomy, DS component usage, skeleton file (apply) |
| Dry Run | Default |
| Apply Mode | Write skeleton component file |
| Related Agent | skeleton-loading-intelligence-agent |
| Related Skill | skeleton-loading-intelligence/SKILL.md |
| Related Command | /add-states |
| Allowed File Scope | Target page directory (apply) |
| Protected Scope | packages/design-system/src/, src/styles/, other pages |

### resolve-modal-service

| Field | Value |
|---|---|
| Purpose | Classify modals to FormDialogService or SystemNoticeService |
| Inputs | modal_description, action_type |
| Outputs | Classification, service, DS components |
| Dry Run | Always |
| Apply Mode | N/A |
| Related Agent | prototype-page-builder-agent |
| Related Skill | dialog-flow-template/SKILL.md |
| Related Command | /ux-add-flow-to-page |
| Allowed File Scope | N/A |
| Protected Scope | N/A |

### review-screen-ux-content

| Field | Value |
|---|---|
| Purpose | Review all user-facing copy, terminology, localization, RTL |
| Inputs | target (page/component path) |
| Outputs | Terminology issues, copy issues, localization coverage, RTL risks |
| Dry Run | Always (read-only) |
| Apply Mode | N/A |
| Related Agent | technical-writing-agent, ux-expert-page-audit-agent |
| Related Skill | ux-content-alignment/SKILL.md |
| Related Command | /ux-review-page |
| Allowed File Scope | target page/component (read-only) |
| Protected Scope | All files — read only |

### run-ui-quality-validation

| Field | Value |
|---|---|
| Purpose | Full QA pass: typecheck, lint, imports, DS integrity, mock data, localization, state coverage |
| Inputs | scope (files/directories) |
| Outputs | Full validation report with severity classifications |
| Dry Run | Default |
| Apply Mode | Apply safe auto-fixes only when explicitly approved |
| Related Agent | code-quality-qa-agent |
| Related Skill | code-quality-qa/SKILL.md |
| Related Command | /ux-review-page |
| Allowed File Scope | scope (apply: safe fixes only) |
| Protected Scope | packages/design-system/src/, CLAUDE.md, AGENTS.md, router |

### reconcile-navigation-screenshot

| Field | Value |
|---|---|
| Purpose | Detect nav items in screenshots missing from spacesRegistry and insert them at exact position |
| Inputs | visual_source (image/figma-url), navconfig_path |
| Outputs | Missing items detected, registry changes, route decisions, icon decisions, validation results |
| Dry Run | Default |
| Apply Mode | Write to navConfig.ts only |
| Related Agent | application-shell-navigation-agent |
| Related Skill | application-shell-navigation/SKILL.md |
| Related Command | /connect-navigation |
| Allowed File Scope | src/navigation/navConfig.ts (apply mode) |
| Protected Scope | src/app/router.tsx (read-only), all other src/ |

### protect-existing-page

| Field | Value |
|---|---|
| Purpose | Detect existing pages before any implementation and enforce delta-only updates |
| Inputs | target (route/page-name/screenshot) |
| Outputs | Delta report, approved changes, preserved logic, regression validation |
| Dry Run | Default (detection + delta report only) |
| Apply Mode | Apply approved delta files only |
| Related Agent | workflow-orchestrator-agent, prototype-page-builder-agent |
| Related Skill | auto-workflow-routing/SKILL.md |
| Related Command | /ux-edit-page, /ux-add-page |
| Allowed File Scope | Approved delta files only |
| Protected Scope | All files outside approved delta, AppShell, Sidebar, Header, Router |

### apply-user-decision-memory

| Field | Value |
|---|---|
| Purpose | Scan approved user decision memory before implementation; auto-apply high-confidence decisions; report medium-confidence recommendations; create Flow Gap for missing decisions |
| Inputs | target route/page/feature, action type |
| Outputs | Matching decisions applied, decisions recommended, gaps identified, conflicts flagged |
| Dry Run | Default (report only) |
| Apply Mode | Include matched decisions in implementation plan |
| Related Agent | workflow-orchestrator-agent, prototype-page-builder-agent |
| Related Skill | auto-workflow-routing/SKILL.md |
| Related Command | /ux-add-page, /ux-edit-page |
| Allowed File Scope | .claude/architecture/user-decision-memory/ (read) |
| Protected Scope | All src/ files — decisions inform but do not bypass approval gates |
