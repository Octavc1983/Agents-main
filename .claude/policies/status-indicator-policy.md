# Status Indicator Policy

## Two Distinct Status Patterns

| Pattern | Component | Location | Used For |
|---|---|---|---|
| Operational status | `StatusIcon` (shared) | `src/components/shared/StatusIcon/` | Entity and task operational state |
| Risk severity | `SeverityBadge` | `@idira/design-system` | Risk classification only |

---

## StatusIcon — Shared Application Primitive

**NOT a DS package export.** Import from `src/components/shared/StatusIcon/`.

Use for:

```text
Connected / Disconnected / Failed / Succeeded / Pending / In progress /
Blocked / Skipped / Unknown outcome / Active / Inactive / Locked /
Warning / Enabled / Disabled
```

Rules:

```text
- Render at 24px in list/table contexts.
- Must include aria-label.
- Same icon mapping must appear consistently: FATLINES list, Master Details header, Details Page header.
- Must not rely on color alone.
```

---

## SeverityBadge — DS Component, Risk Only

Use for:

```text
Critical / High / Medium / Low / Informational / Unknown (risk level)
```

Usage: `<SeverityBadge severity={row.riskLevel} variant="fill" />`

**Never use SeverityBadge for operational or task status.**

---

## IRON RULE — Status Column

Every Status column in a table or FATLINES list must use `StatusIcon` at 24px.

No substitute (badge, dot, text, color) is permitted.

---

## IRON RULE — Risk Column

Every Risk column in a table or FATLINES list must use `SeverityBadge severity={row.riskLevel} variant="fill"`.

No substitute is permitted.

---

## Consistency Rule

The same entity must use the same status icon across all surfaces:

```text
- FATLINES list row
- Master Details header
- Details Page header
- Bulk Status Dialog result row
```
