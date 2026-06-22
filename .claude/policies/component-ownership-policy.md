# Component Ownership Policy

## StatusIcon — Shared Application Primitive

**Location:** `src/components/shared/StatusIcon/`

StatusIcon is a shared application-layer component. It is NOT a DS package export.

```text
- Do not import StatusIcon from @idira/design-system.
- Do not recreate StatusIcon locally.
- Do not treat StatusIcon as a DS package primitive.
```

Use StatusIcon for operational entity status:

```text
Connected / Disconnected / Failed / Succeeded / Pending / In progress /
Blocked / Skipped / Unknown outcome / Active / Inactive / Locked /
Warning / Enabled / Disabled
```

StatusIcon must render at 24px in list/table contexts. All StatusIcon usages must include `aria-label`.

---

## SeverityBadge — DS Component, Risk Severity Only

SeverityBadge is an approved DS component.

```text
Use SeverityBadge for risk classification only:
- Critical / High / Medium / Low / Informational / Unknown (risk)

Never use SeverityBadge for:
- Operational status (use StatusIcon)
- Task or lifecycle status (use StatusIcon)
- Entity health (use StatusIcon)
```

Usage: `<SeverityBadge severity={row.riskLevel} variant="fill" />`

---

## Reuse Priority Order

Before creating a new component:

```text
1. Existing DS component (public API)
2. Existing shared feature component (src/components/shared/)
3. Existing page composition template (src/prototype-templates/)
4. Existing shared type or view model
5. Existing adapter, service, or repository
6. New local implementation — only when none of the above apply
```

---

## No Premature Shared Extraction

A shared abstraction requires:

```text
- Evidence of repeated use (2+ distinct call sites)
- Stable behavior
- Clear ownership
- Safe API
```

Do not extract shared components speculatively. Three similar lines is better than a premature abstraction.

---

## Minimal Layer Rule

Use the smallest valid DOM, component, state, and styling structure.

```text
- No wrappers that only apply styling.
- No providers that only forward props.
- No hooks that wrap one built-in hook with no additional behavior.
- No abstractions for hypothetical future requirements.
```
