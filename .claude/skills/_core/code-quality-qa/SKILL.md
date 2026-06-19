# Code Quality QA Skill

## Purpose

This skill defines a reusable QA and code review workflow for existing React prototype pages, components, templates, styles, routes, and navigation.

It combines implementation QA, style consistency review, dead code cleanup, import validation, routing safety, UX state validation, telemetry coverage review, and runtime build safety.

---

## When to Use

Use this skill when:

- A generated page needs cleanup
- A prototype page needs quality review
- A feature is ready for UX review
- A page was changed by multiple agents
- Imports may be broken
- Styles may be inconsistent
- SCSS nesting became difficult to maintain
- Navigation routes may not exist
- Unknown routes may break the application shell
- You want to remove dead code safely
- You want to verify no debug UI is visible
- You want to verify telemetry coverage for a flow
- You want to confirm the build and types are clean

---

## Inputs Required

```text
QA scope:
Target page, route, feature, or folder:
Known issues:
Expected navigation behavior:
Files allowed to modify:
Files not allowed to modify:
Should fixes be applied automatically:       yes / no
Figma source or screenshot:
Known constraints:
Telemetry requirement:                        none / review only / add approved events
Existing telemetry utility or provider:       [path, utility name, or unknown]
Allowed telemetry events:                     [page views / user actions / errors / performance / all approved existing events]
Sensitive data restrictions:                  [for example: no raw search values, no domain names, no usernames, no API payloads]
Validation commands allowed:                  [typecheck / lint / tests / build / existing smoke tests]
Can runtime validation commands be run:       yes / no
```

---

## Required User Intake

Do not start QA until the minimum required fields are provided.

Minimum required fields:

```text
QA scope
Target page, route, feature, or folder
Files allowed to modify
Files not allowed to modify
Should fixes be applied automatically
Known constraints
```

If required information is missing, ask the user to fill the missing fields.

---

## Required Workflow

1. Validate user intake
2. Inspect project architecture
3. Inspect target files
4. Inspect connected components
5. Inspect routes and sidebar navigation
6. Inspect imports and exports
7. Inspect unused variables, handlers, helpers, props, and styles
8. Inspect SCSS nesting and local styling patterns
9. Inspect inline styles and hardcoded values
10. Inspect state handling and UX safety
11. Validate unknown route fallback behavior
12. Inspect existing telemetry conventions, utilities, and coverage
13. Identify safe telemetry gaps for the target flow
14. Add telemetry through approved existing utilities only if explicitly allowed and conditions are met
15. Verify telemetry payloads contain no sensitive data
16. Inspect for runtime exception risks
17. Run available typecheck, lint, test, and build commands if permitted
18. Produce review report
19. Apply safe fixes only if explicitly allowed
20. Re-check changed files
21. Re-run validation after fixes
22. Produce final validation report

---

## Required Routing Rule

Unknown routes must render an error page inside the existing AppShell.

Expected behavior:

```
AppShell
├── Sidebar
├── Header
└── Main content
    └── Not Found / Error State
```

Do not allow unknown routes to replace AppShell with a full-screen error page.

---

## SCSS Rules

- Prefer flat BEM-style classes
- Avoid nesting deeper than two levels
- Avoid selector dependency on DOM structure
- Avoid duplicate style blocks
- Use existing tokens
- Do not create local style variables that duplicate global tokens
- Do not add unnecessary `!important`
- Keep media queries grouped and consistent
- Remove unused local classes only when verified

---

## Telemetry Rules

- Check existing project telemetry patterns before touching anything
- Only add events through approved existing utilities
- Verify payloads contain no sensitive data (passwords, tokens, raw search text, domain names, API payloads)
- Use existing event naming conventions
- If no telemetry foundation exists, report a gap — do not create a new provider
- Report recommended events separately from added events

For prototype flows, the typical safe event set per page includes:

```text
{page}_page_viewed
{feature}_search_used
{feature}_filters_applied  /  {feature}_filters_cleared
{item}_selected
{item}_details_opened  /  {item}_details_closed
{action}_clicked
{page}_page_load_failed
route_not_found
unexpected_ui_exception
```

Safe payload fields:

```text
page_name / route / feature_name / item_type / status
filter_group / filter_count / search_used: true|false
result_count / selected_item_type / error_category
```

---

## Build and Runtime Validation Rules

Run only commands that exist in the project. Do not invent commands.

Preferred sequence:

1. `npm run typecheck` (or equivalent)
2. `npm run lint` (or equivalent)
3. `npm test` (if available)
4. `npm run build` (if permitted)

After fixes, re-run the same commands.

If a command fails:

- Do not claim QA passed
- Report the exact failing command
- Report whether the failure is pre-existing or introduced
- Do not use `@ts-ignore`, `any`, or lint suppression as shortcuts

---

## Must Do

- Inspect actual code
- Inspect routing
- Inspect navigation
- Inspect imports
- Inspect dead code
- Inspect SCSS
- Inspect style consistency
- Inspect UX state safety
- Inspect existing telemetry before adding anything
- Verify safe telemetry payloads
- Run available build / typecheck / lint commands
- Report pre-existing failures separately from introduced failures
- Report severity
- Apply only safe fixes when approved
- Preserve architecture

---

## Must Not Do

- Rewrite the entire app
- Modify Infra
- Replace AppShell, Sidebar, Header, or router architecture
- Create DS components
- Create tokens
- Add libraries
- Delete uncertain code
- Modify files when automatic fixes are disabled
- Add a telemetry provider or analytics package
- Create fake telemetry wrappers
- Log sensitive data
- Use `@ts-ignore` as a workaround
- Suppress lint to make the build pass
- Claim runtime safety if validation commands fail

---

## Output Format

Use the Code Quality QA Agent output format.

Full format defined in:

```text
.claude/agents/_core/code-quality-qa-agent.md
```

---

## Example Prompt

```text
Use the Code Quality QA Skill.

QA scope:
Review the Scans page, routing, navigation, and route fallback behavior.

Target page, route, feature, or folder:
ScansPage, /scans, router, sidebar navigation.

Known issues:
Check for broken imports, unused imports, dead code, SCSS nesting, local style duplication,
missing route fallback, and telemetry coverage for the scans flow.

Expected navigation behavior:
Unknown routes must show an error inside AppShell. Sidebar and Header must stay visible.

Files allowed to modify:
src/pages/ScansPage/
src/app/router.tsx
src/mock/
src/types/

Files not allowed to modify:
src/components/layout/
src/components/ui/
src/design-system/
src/styles/

Should fixes be applied automatically:
yes

Known constraints:
Use existing components and tokens only.
Do not create DS components.
Do not create new tokens.
Do not add libraries.
Do not use inline styles.

Telemetry requirement:
review only

Existing telemetry utility or provider:
unknown

Allowed telemetry events:
page views / user actions / errors

Sensitive data restrictions:
no raw search values, no domain names, no usernames, no API payloads

Validation commands allowed:
typecheck, lint, build

Can runtime validation commands be run:
yes
```
