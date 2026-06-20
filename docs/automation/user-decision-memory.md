# User Decision Memory

User Decision Memory is the system that allows Claude to remember behaviors you have approved and apply them automatically to future screens. Instead of re-approving the same behavior every time you build a screen, you approve it once and it becomes a registered decision.

---

## How It Works

1. A behavior is discussed and you approve it (for example: "yes, always show a loading skeleton on data-fetching screens")
2. It is registered as a decision with a unique ID (for example: DEC-005)
3. On future screens, Claude applies it automatically without asking
4. The implementation summary lists every auto-applied decision: "Auto-applied: DEC-005 — Loading skeleton for data-fetching screens"

You never lose visibility. Every auto-applied decision is reported. You can override any of them at any time.

---

## The 15 Registered Decisions

| ID | What It Does | Where It Applies |
|---|---|---|
| DEC-001 | Disable the submit button after the first click and keep it disabled until the backend response arrives | All forms and save actions — global |
| DEC-002 | Preserve all form field values after a validation failure (do not clear the form) | All forms — global |
| DEC-003 | Deleted items use soft delete — they remain in the audit history and are not permanently removed | All data deletion — global |
| DEC-004 | A timeout means an unknown outcome — never show a success message when the outcome could not be confirmed | All backend interactions — global |
| DEC-005 | Show a skeleton loading state (matching the real page layout) on all data-fetching screens | All data-fetching screens — global |
| DEC-006 | Mock data is typed, centralized, and stored in `src/mock/` — never embedded inside page or component files | All mock data — global |
| DEC-007 | When a drawer, panel, or dialog closes, return keyboard focus to the element that opened it | All drawers, panels, and dialogs — global |
| DEC-008 | When an approved Design System component, token, or icon is missing, report the gap and stop — never invent a local replacement | All Design System usage — global |
| DEC-009 | Design System components are consumed through their public API only — no visual overrides, recoloring, or mutation from application code | All DS component usage — global |
| DEC-010 | All icons must be SVG — no icon libraries, no PNG, no emoji, no icon fonts | All icon usage — global |
| DEC-011 | All styles must use SCSS tokens — no hardcoded hex colors, spacing values, shadows, or typography | All styling — global |
| DEC-012 | When an annotation is edited, all previous versions are saved in a version history — no edit history is lost | Annotation editing — global |
| DEC-013 | When an annotation is deleted, it is soft-deleted — it is hidden from the active list but retained in the audit log | Annotation deletion — global |
| DEC-014 | Review Mode (the annotation panel) is a reviewer utility and is not part of the product flow end users see | Review Mode behavior — global |
| DEC-015 | Inspect Mode is off by default and must be activated explicitly — it is never on by default | Inspect Mode behavior — global |

---

## The Three Application Levels

Not all decisions are applied the same way. The three levels control how much Claude acts autonomously vs. how much it checks with you.

### Level 1 — Applied Automatically, Reported After

These are decisions with high confidence that have no destructive side effects. Claude applies them and tells you afterward in the implementation summary.

Examples: DEC-001 (disable submit during save), DEC-005 (loading skeleton), DEC-010 (SVG icons only), DEC-011 (SCSS tokens only)

### Level 2 — Prefilled, Confirmed with One Question

These are decisions where the situation is similar to an approved decision but not identical, or where the scope is slightly outside the norm. Claude proposes the application and asks one focused question.

Example: "I'm applying DEC-005 (loading skeleton) to this panel. The panel fetches supplementary data on open — not on page load. Does that qualify as a data-fetching surface for this decision?"

### Level 3 — Always Asks

These are decisions with real consequences — destructive behavior, new routes, DS gaps, or conflicts between decisions. Claude always stops and asks.

Examples: new routes, deleting or archiving data, conflicting decisions, DS gaps

---

## How to Override a Decision

If you want different behavior from a registered decision for a specific screen or globally, describe what you want. Claude will:

1. Recognize that your request differs from a registered decision
2. Surface the conflict: "This differs from DEC-005 (loading skeleton). You're asking for a spinner instead. Should I override DEC-005 for this screen only, or update the global decision?"
3. Apply your instruction after you confirm
4. If you request a global update, the decision registry is updated for all future screens

---

## How New Decisions Are Created

New decisions are registered when:
- You explicitly request a behavior and say it should apply to all future screens
- Claude detects a pattern applied consistently across multiple sessions and proposes registering it
- A lesson candidate is promoted after evidence of consistent application

You must approve any new decision before it is registered. New decisions are not created from a single request.

---

## Where Decisions Are Stored

Decisions are stored in `.claude/architecture/user-decision-memory/decision-registry.md`. This file is part of the project and travels with the codebase. It is visible to the team and can be reviewed at any time.

