# The Approval Model — What Needs Your Sign-off

Claude uses a three-level approval system. Some things happen automatically and are reported to you after. Some things are prefilled with a single confirmation question. Some things always stop and wait for your explicit sign-off. This page explains all three levels so you know what to expect.

---

## The Three Levels

### Level 1 — Fully Automatic

Claude applies these without asking. They are based on decisions you have already approved and that are registered in the project's decision memory. After applying them, Claude reports what it did in the implementation summary.

These are safe to apply automatically because they have high confidence, they match a stable registered decision, and they have no destructive side effects.

**Examples of Level 1 behaviors:**
- Adding a skeleton loading state to any data-fetching screen (DEC-005)
- Preserving form field values after a validation failure (DEC-002)
- Disabling the submit button during an in-progress save (DEC-001)
- Storing mock data as typed fixtures in the centralized mock folder (DEC-006)
- Restoring keyboard focus to the trigger element when a panel or drawer closes (DEC-007)
- Using SVG icons only — no icon libraries (DEC-010)
- Using SCSS tokens only — no inline styles (DEC-011)
- Consuming Design System components through their public API only (DEC-009)

---

### Level 2 — Auto-Draft with One Confirmation

Claude prefills a plan and asks a single focused question before proceeding. This applies when the situation is similar to an approved decision but not identical, or when the change affects something adjacent to the confirmed scope.

**Examples of Level 2 behaviors:**
- Placing a new navigation item: Claude determines the space and position based on siblings, then asks "I'll place this under the Accounts space, between Policies and Rotations — does that look right?"
- Extending an existing template with a new column or filter: Claude describes the proposed change and asks for confirmation before touching the file
- Applying a decision from a similar flow type: "I found a comparable decision for table screens — applying it here. Does this match your intent?"

---

### Level 3 — Mandatory Approval Required

Claude always stops and asks before proceeding with these. No exceptions.

**Examples of Level 3 situations:**
- Creating a new URL route that has never been used before
- Modifying an existing page for the first time in a session (shows delta report first)
- Discovering a Design System gap — a required component or token does not exist
- A destructive action: deleting data, archiving records, resetting settings
- A conflicting decision — two previously approved rules that contradict each other
- Building a screen using a template that does not yet exist (creates a Draft Template Candidate instead)
- Any change to core workflow files, permanent rules, or architecture registries
- Adding a navigation item to a hierarchy level or space that does not yet exist

---

## Quick Reference Table

| Situation | Level | What Claude Does |
|---|---|---|
| Adding skeleton loading to a new screen | 1 — Automatic | Adds it, reports it |
| Preserving form values after validation failure | 1 — Automatic | Applies it, reports it |
| Disabling submit button during save | 1 — Automatic | Applies it, reports it |
| Using SVG icons | 1 — Automatic | Enforces it throughout |
| Using SCSS tokens (no hardcoded colors) | 1 — Automatic | Enforces it throughout |
| Placing a new nav item in an existing space | 2 — Confirm | Prefills position, asks one question |
| Adding a new column to an existing table | 2 — Confirm | Shows delta, asks for confirmation |
| Extending filter panel with new filters | 2 — Confirm | Shows proposed change, asks for confirmation |
| Creating a new page route | 3 — Mandatory | Stops and asks for route approval |
| Editing a page that already exists | 3 — Mandatory | Reads first, shows delta, waits for approval |
| Destructive action (delete, archive, reset) | 3 — Mandatory | Stops, describes impact, waits |
| Design System gap found | 3 — Mandatory | Stops, reports gap, never invents workaround |
| No matching template for the screen type | 3 — Mandatory | Creates Draft Template Candidate, waits |
| Conflicting approved decisions | 3 — Mandatory | Surfaces conflict, asks for resolution |
| Modifying core agents or workflow rules | 3 — Mandatory | Never does this from a single correction |

---

## How to Override a Decision

If you want to override a decision that is normally applied automatically (Level 1), simply describe what you want instead. Claude will:

1. Recognize that the request conflicts with a stored decision
2. Surface the conflict: "This request conflicts with DEC-005 (loading skeleton for data-fetching screens). You are asking for a spinner instead. Shall I override DEC-005 for this screen only, or update the global decision?"
3. Apply your instruction after you confirm

Overrides can be scoped to a single screen or applied globally. Global overrides update the decision registry and apply to all future screens.

---

## How Registered Decisions Get Created

The 15 currently registered decisions (DEC-001 through DEC-015) were approved by the team at some point during the project. They cover universal behaviors like form handling, data states, and icon rules.

New decisions are proposed when:
- You explicitly request a behavior and confirm it should apply everywhere
- Claude detects a pattern being applied consistently and proposes registering it
- A lesson candidate is promoted after repeated evidence

You must approve any new decision before it is registered. See [User Decision Memory](../automation/user-decision-memory.md) for the full list.

