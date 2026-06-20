# User Decision Memory Registry

Central registry of approved, reusable decisions that Claude may apply automatically to future screens and flows.

## Core Principle

```text
Approved decision
→ approved implementation
→ validated outcome
→ reusable decision memory
→ future similar request
→ automatic recommendation or implementation
→ user is asked only when the new case is materially different
```

## Promotion Criteria

A decision may be promoted to reusable memory only when:
- It has explicit user approval
- It has been implemented successfully
- Validation passed
- It is not tied to a one-time product exception
- It can apply to at least two similar flows
- It does not conflict with existing decision memory
- It has clear trigger conditions

## Automatic Application Levels

| Level | Condition | Claude Behavior |
|---|---|---|
| 1 — Fully Automatic | Active, high confidence, same template/flow, no conflict, no destructive behavior, no new DS gap, no new backend contract | Apply without asking |
| 2 — Auto-Draft | Similar but not identical, backend partially known, existing screen may be affected | Prefill and include in report — ask one focused confirmation |
| 3 — Mandatory User Decision | Destructive behavior, unknown backend outcome, new permission, new route, DS gap, data loss risk, conflicting decisions | Always ask |

## Scope Priority

```text
Screen-specific decision
→ route-specific decision
→ feature-specific decision
→ template-specific decision
→ global decision
```

Claude must never apply a global memory when a more specific approved decision exists.

## Decision Index

| ID | Title | Category | Scope | Status | Confidence |
|---|---|---|---|---|---|
| DEC-001 | Disable duplicate submission during save | form | global | active | high |
| DEC-002 | Preserve form values after validation failure | form | global | active | high |
| DEC-003 | Soft delete with audit history | data | global | active | high |
| DEC-004 | Timeout = unknown outcome, no auto-confirm | backend | global | active | high |
| DEC-005 | Loading skeleton for data-fetching screens | loading | global | active | high |
| DEC-006 | Typed mock fixtures centralized in src/mock/ | data | global | active | high |
| DEC-007 | Focus restoration after drawer/panel closes | accessibility | global | active | high |
| DEC-008 | No Silent Fallback — report DS Gap instead | design-system | global | active | high |
| DEC-009 | DS components consumed through public API only | design-system | global | active | high |
| DEC-010 | SVG icons only — no icon libraries | design-system | global | active | high |
| DEC-011 | No inline styles — SCSS tokens only | frontend | global | active | high |
| DEC-012 | Annotation edit preserves full version history | annotation | global | active | high |
| DEC-013 | Annotation delete = soft delete retained in audit | annotation | global | active | high |
| DEC-014 | Review Mode is external utility, not product flow | annotation | global | active | high |
| DEC-015 | Inspect Mode off by default, explicit activation only | annotation | global | active | high |

## Conflict Resolution

When stored decisions conflict:
1. Find the most specific applicable decision
2. If scope does not resolve the conflict → mark conflicted
3. Create a Flow Gap
4. Show the conflicting decisions to the user
5. Ask for one focused decision
6. Update or deprecate the old decision after approval

## Deprecation

When a decision is replaced:
- Mark old decision deprecated
- Record replacement decision ID
- Retain full history
- Prevent future automatic reuse
- Identify impacted templates and screens

Never delete historical decision records.
