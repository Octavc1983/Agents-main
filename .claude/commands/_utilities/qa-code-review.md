# QA Code Review

## Purpose

Run a QA and code review on an existing page, feature, route, component, or prototype template.

This command checks implementation quality, routing safety, navigation behavior, imports, dead code, style consistency, SCSS nesting, local style duplication, UX state safety, telemetry coverage, runtime exception risks, and build validity.

The command applies safe targeted fixes only when explicitly approved.

---

## Agent to Use

Code Quality QA Agent

Expected file:

```text
.claude/agents/_core/code-quality-qa-agent.md
```

---

## Skill to Use

Code Quality QA Skill

Expected file:

```text
.claude/skills/_core/code-quality-qa/SKILL.md
```

---

## When to Run

Run this command after:

- `/ux-add-page`
- `/ux-edit-page`
- `/ux-add-flow-to-page`
- Any agent-generated page or component
- Any navigation or routing change
- Any SCSS refactor

---

## Required User Intake

Before running QA, verify that the user provided the required information.

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

### Minimum Required Fields

```text
QA scope
Target page, route, feature, or folder
Files allowed to modify
Files not allowed to modify
Should fixes be applied automatically
Known constraints
```

---

## Missing Information Response

If required information is missing, respond only with:

```markdown
### Missing Required Information

Before I can continue with `/qa-code-review`, please fill the missing fields below.

\`\`\`text
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
Allowed telemetry events:
Sensitive data restrictions:
Validation commands allowed:
Can runtime validation commands be run:       yes / no
\`\`\`

### Why This Is Needed

I need this information to inspect the correct files, avoid modifying protected parts of the project, and apply only safe targeted fixes.
```

---

## Intake Gate

Do not inspect project files until required intake is complete.

Do not modify files unless:

```text
Should fixes be applied automatically: yes
```

Do not add telemetry unless:

```text
Telemetry requirement: add approved events
Existing telemetry utility or provider: [known utility path or name]
```

Do not guess missing critical information.

---

## Required Workflow

1. Validate intake
2. Inspect target files and connected components
3. Inspect navigation and router
4. Verify unknown route fallback renders inside AppShell
5. Check broken imports
6. Check unused imports
7. Check unused variables and dead code
8. Check style consistency
9. Check local style duplication against tokens
10. Check excessive SCSS nesting
11. Check inline styles and hardcoded visual values
12. Check component integration
13. Check state and UX safety
14. Inspect existing telemetry conventions and utilities
15. Identify safe telemetry gaps
16. Add telemetry only through approved existing utilities if explicitly allowed
17. Verify telemetry payloads contain no sensitive data
18. Inspect for runtime exception risks
19. Run available validation commands if permitted
20. Produce severity-based report
21. Apply safe fixes only if approved
22. Re-run validation after fixes
23. Produce final report

---

## Required Navigation Validation

Verify:

- Every visible sidebar item has a valid route
- Every route renders inside AppShell
- Unknown route fallback exists under AppShell
- Not Found / Error state does not replace Sidebar or Header
- Invalid route shows error in content area only

---

## Telemetry Validation

For the Scans flow, safe and recommended events include:

```text
scans_page_viewed
scan_search_used
scan_filters_applied
scan_filters_cleared
scan_selected
scan_details_opened
scan_details_closed
scan_run_clicked
scans_page_load_failed
route_not_found
```

Do not include in any event payload:

```text
username / domain name / raw search text / scan definition ID / API response payloads
```

Use safe metadata only:

```text
page_name / route / filter_count / search_used: true|false / result_count
selected_item_type / status / error_category
```

---

## Restrictions

Do not:

- Replace AppShell, Sidebar, Header, or router architecture
- Modify Infra
- Create DS components or tokens
- Add external libraries
- Delete uncertain code
- Perform broad refactors
- Modify protected files
- Expose debug UI
- Add a telemetry provider or analytics package
- Create fake telemetry wrappers
- Log sensitive data
- Use `@ts-ignore` as a workaround
- Suppress lint to make the build pass
- Claim runtime safety if validation commands fail

---

## Expected Output

```markdown
### QA and Code Review Summary

### Scope Inspected

### Files Inspected

### Architecture Validation

| Area | Status | Notes |
|---|---|---|

### Navigation and Routing Review

| Check | Status | Issue | Recommended Fix |
|---|---|---|---|

### Import and Export Issues

| Severity | File | Issue | Recommended Fix |
|---|---|---|---|

### Dead Code Findings

| Severity | File | Code / Symbol | Why It Is Dead | Recommended Action |
|---|---|---|---|---|

### Style Consistency Issues

| Severity | File | Issue | Existing Token / Pattern | Recommended Fix |
|---|---|---|---|---|

### SCSS Nesting and Structure Issues

| Severity | File | Issue | Recommended Fix |
|---|---|---|

### Inline Styles and Hardcoded Values

| Severity | File | Value / Pattern | Recommended Replacement |
|---|---|---|---|

### Component Integration Issues

| Severity | File | Current Behavior | Expected Behavior | Recommended Fix |
|---|---|---|---|---|

### State and UX Safety Issues

| Severity | File | Missing / Broken State | Expected Behavior | Recommended Fix |
|---|---|---|---|---|

### Telemetry Review

| User Action / Failure | Existing Event | Coverage | Recommendation | Safe Metadata |
|---|---|---|---|---|

### Telemetry Added

| Event Name | Trigger | Payload Fields | Existing Utility Used | File |
|---|---|---|---|---|

### Telemetry Gaps

List events recommended but not added because no approved integration, naming convention, or permission exists.

### Build and Runtime Validation

| Validation | Command Run | Result | Notes |
|---|---|---|---|

### Exception Safety Review

| Severity | File | Risk | Expected Safe Behavior | Recommended Fix |
|---|---|---|---|---|

### Safe Fixes Applied

List every file changed and every exact fix applied.

### Fixes Not Applied

List issues that require UX, DS, PM, R&D, or infrastructure approval.

### Pre-existing Failures

List failures that existed before this review.

### Failures Introduced by This Change

List failures directly caused by changes applied in this session.

### Runtime Failures Not Fixed

List failures that require product, R&D, or infrastructure decisions.

### Validation Results

Confirm:
- Navigation routes checked
- Unknown route fallback checked
- Error renders inside AppShell
- Broken imports checked
- Unused imports checked
- Dead code checked
- SCSS nesting checked
- Local style duplication checked
- Inline styles checked
- Hardcoded values checked
- Telemetry conventions checked
- Telemetry payloads verified safe
- Typecheck run
- Lint run
- Build run

### Final Recommendation

Choose one:
- QA passed
- QA passed with cleanup recommendations
- Needs targeted fixes
- Needs UX clarification
- Needs DS clarification
- Not safe to continue
```
