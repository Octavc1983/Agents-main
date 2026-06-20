# Automation and Intelligence

This project has a layer of intelligence that goes beyond just building screens. Claude remembers decisions you've made, learns from recurring mistakes, detects reusable patterns, and surfaces UX improvements from usage data. This section explains how that intelligence layer works.

---

## What This Section Covers

- [How Screens Are Built Automatically](./autonomous-screen-factory.md) — The full automatic build process: template detection, component selection, state generation, mock data, navigation wiring, and copy review. What you get without asking. What you must provide.

- [User Decision Memory](./user-decision-memory.md) — How Claude remembers behaviors you've approved and applies them automatically to future screens. The full list of all 15 registered decisions, what they do, and how to override them.

- [UX Pattern Learning](./ux-pattern-learning.md) — How Claude identifies recurring corrections, creates lesson candidates from evidence, and promotes approved lessons into permanent rules that improve future workflows.

- [Automatic Edge Case Detection](./automatic-edge-case-detection.md) — What Claude checks automatically on every screen: data states, form edge cases, backend timeouts, soft delete, focus management, and accessibility. What triggers a Flow Gap report.

---

## Why This Matters for UX and PM Teams

As the project grows, manually specifying every behavior for every screen becomes impractical. The automation layer ensures that:

- Decisions made once are not re-decided every time (User Decision Memory)
- Mistakes made once are less likely to recur (UX Pattern Learning)
- Quality standards are applied consistently across all screens (Automatic Edge Case Detection)
- Every screen gets a complete set of states without explicit requests (How Screens Are Built Automatically)

This does not reduce your control. You can override any automatic behavior, and anything with real impact (new routes, destructive changes, DS gaps) always requires your explicit sign-off. The automation handles the repetitive, predictable work so you can focus on the decisions that actually need your judgment.

