# Quality Gates Policy

## Required Completion Gates

Every significant implementation must pass these gates before being marked complete:

```text
1. UX Content Alignment    — terminology, deprecated terms, microcopy
2. QA / Code Review        — imports, dead code, SCSS, runtime safety
3. UX Audit                — flow, states, edge cases, component misuse
4. Build / Runtime Validation — typecheck, lint, build where available
```

---

## UX Content Alignment Gate

Before UX review:

```text
- All user-facing text uses the localization system.
- No deprecated terms appear.
- All new navigation items are registered in the terminology registry.
- Confirmation labels name the specific action.
- Accessible labels do not expose sensitive data.
```

---

## QA Gate

Before completion:

```text
- No broken imports.
- No unused imports or dead code.
- No inline styles.
- No hardcoded hex colors or spacing values.
- All string table cells use @include table-cell-truncate + title={value}.
- All overflow-y containers use @include ds-scrollbar.
- Status columns use StatusIcon at 24px.
- Risk columns use SeverityBadge variant=fill.
- No debug UI visible in product.
```

---

## UX Audit Gate

After implementation:

```text
- All required states are present: loading, empty, no-results, error, permission.
- Timeout → unknown-outcome (never auto-failed).
- Partial success ≠ success.
- Warning acknowledgment is required before proceeding.
- Close/Back behavior is correct per template rules.
- Focus management is correct for dialogs.
- Sidebar item does not change when entering Master Details.
```

---

## Pixel Perfect Claim Rule

Do not claim Pixel Perfect accuracy without a gap report showing:

```text
- Figma comparison
- Token mapping for each measurement
- List of accepted deviations
```

---

## Continuous Improvement

After significant implementation, UX audit, QA review, or repeated user correction:

```text
1. Run controlled learning review.
2. Identify whether the issue is one-off or recurring.
3. Create lesson candidates only when evidence exists.
4. Add regression checks for approved lessons.
5. Do not silently rewrite CLAUDE.md, AGENTS.md, core Skills, or core Agents.
6. Propose updates for approval.
```
