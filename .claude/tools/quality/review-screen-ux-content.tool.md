# review-screen-ux-content

## Purpose

Review all user-facing text on a page or component: page title, navigation labels, button labels, field help, validation, errors, empty states, loading copy, dialog copy, confirmation language, accessibility labels, and terminology consistency.

## Trigger Conditions

- A new page is completed
- UX content alignment stage runs
- Terminology registry check is required
- technical-writing-agent runs

## Required Inputs

| Input | Type | Description |
|---|---|---|
| target | page-path / component-path | What to review |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| check_localization | boolean | true | Validate localization key usage |
| check_rtl | boolean | true | Flag RTL risks |

## Validation Rules

- Every new page must pass terminology check before UX review
- Any navigation item must be registered in terminology registry
- Deprecated terms found → Critical issue, blocks review
- Hardcoded user-facing copy in JSX → High issue, blocks review
- Missing localization key for interactive control → Critical issue
- Missing localization for visible UI content → High issue
- RTL risk from fixed widths → Medium issue

## Output Contract

```markdown
### UX Content Review

### Terminology Check

| Term | Status | Approved Form |
|---|---|---|

### Copy Issues

| Location | Issue | Severity | Recommendation |
|---|---|---|---|

### Localization Coverage

| Text | Has Key | Issue |
|---|---|---|

### RTL Risks

### Overall Status: [PASS / FAIL / NEEDS REVIEW]
```

## Related Agents

- `.claude/agents/_core/technical-writing-agent.md`
- `.claude/agents/_core/ux-expert-page-audit-agent.md`

## Related Skills

- `.claude/skills/_core/ux-content-alignment/SKILL.md`

## Related Commands

- `/ux-review-page`

## Failure Handling

Deprecated terms and hardcoded copy block review completion. Report all issues before passing to UX audit.

## Manual Approval Required When

- A new product term is proposed for the terminology registry
- A copy exception is requested

## Examples

**Pass:** All copy uses approved terms, all buttons have localization keys, no deprecated terms found.
**Fail:** Term "Vault" used — deprecated, must use "Secret store". Button label hardcoded in JSX.
