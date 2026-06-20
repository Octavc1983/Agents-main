# run-ui-quality-validation

## Purpose

Run all available quality checks: typecheck, lint, import validation, dead code detection, SCSS token compliance, DS override detection, mock data location, localization coverage, navigation validation, and state coverage.

## Trigger Conditions

- A page or component implementation is complete
- QA stage runs
- Pre-merge validation runs
- code-quality-qa-agent runs

## Required Inputs

| Input | Type | Description |
|---|---|---|
| scope | string[] | Files or directories to validate |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| run_build | boolean | false | Run full build check |
| apply_safe_fixes | boolean | false | Auto-apply safe fixes |

## Allowed Commands

Run only scripts already defined in the project:
```text
typecheck
lint
test (if available)
build (only when explicitly approved)
```

## Validation Checks

```text
broken imports
direct packages/design-system/src imports → Critical
unused imports
dead state
invalid nested button controls
missing keys in lists
missing loading/error/empty states → High
hardcoded hex values in SCSS/JSX → High
token violations
DS component visual overrides → Critical/High
DS component visual overrides via !important → Critical
focus management risks
route mismatches
inline mock data in page/component JSX → High
mock data in packages/design-system → Critical
copied DS component in src → Critical
local tile/container when DS Card exists → High
unnecessary wrapper components → High
redundant DOM layers → Medium
hardcoded user-facing copy → High/Critical
missing localization keys → Critical/High
```

## Failure Severity Model

```text
Critical (blocks merge):
- Direct DS internal import
- Copied DS component
- Unsafe DS state override (focus, disabled, error, loading, selected)
- Mock data inside Design System package
- Hardcoded production user-facing copy
- Missing localization for interactive control

High (blocks merge):
- Color/border/radius/shadow/spacing/typography override on DS component
- Inline mock data in page JSX
- Missing loading/error/empty states on data-bearing page
- Hardcoded hex colors in SCSS

Medium (warning):
- Unnecessary wrapper component
- Incomplete RTL support
- Redundant SCSS class
- Weak mock naming

Low (note):
- Readability improvement opportunity
```

## Failure Classification

Every failure must be classified as:
```text
Pre-existing
Introduced by current change
Unrelated
Unknown
```

## Output Contract

```markdown
### UI Quality Validation Report

### Scope

### Typecheck: [PASS / FAIL]

### Lint: [PASS / FAIL]

### Import Validation

| Issue | File | Severity | Classification |
|---|---|---|---|

### DS Integrity

| Issue | File | Severity | Classification |
|---|---|---|---|

### Mock Data

| Issue | File | Severity | Classification |
|---|---|---|---|

### Localization

| Issue | File | Severity | Classification |
|---|---|---|---|

### State Coverage

| Page | Loading | Empty | Error | Status |
|---|---|---|---|---|

### Overall: [PASS / FAIL / BLOCKED]

### Critical Issues Requiring Approval
```

## Related Agents

- `.claude/agents/_core/code-quality-qa-agent.md`

## Related Skills

- `.claude/skills/_core/code-quality-qa/SKILL.md`

## Related Commands

- `/ux-review-page`

## Failure Handling

Critical and High violations block completion. Report all issues with file paths and severity before any fixes are applied.

## Manual Approval Required When

- A Critical violation cannot be auto-fixed
- A High violation requires architectural change

## Examples

**Pass:** 0 critical, 0 high, 2 medium (noted).
**Fail:** Direct DS internal import found in `ScansPage.tsx` line 3 — Critical, blocks merge.
