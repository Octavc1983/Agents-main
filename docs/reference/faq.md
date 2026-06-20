# Frequently Asked Questions

---

**1. Can Claude overwrite a screen I've already built?**

No. If a screen already exists, Claude reads it first and produces a delta report — what it found, what it proposes to change, and what it will not touch. Nothing changes until you review and approve the delta. This is enforced automatically by the existing page protection system.

---

**2. How do I ask Claude to build a screen without using a command?**

Just describe it in plain English. You do not need slash commands. For example: "Build the Credential Rotations page — it shows a table of rotation jobs with status, target account, and a details panel." Claude detects the intent, selects the right template, and asks only for what it needs before proceeding.

---

**3. What happens if Claude can't find a matching template?**

Claude creates a Draft Template Candidate — a specification describing the new template, why it is unique, and what its future reuse cases would be. It then asks for your approval before building the screen. If approved, the template is registered so it can be reused in future screens of the same type.

---

**4. Can I attach a Figma link to my request?**

Yes. Paste the Figma frame URL directly into your message. Claude connects to Figma and reads the frame structure — components, layout, design tokens, and navigation structure. This gives much more detail than a screenshot and enables accurate pixel-perfect builds and alignment reviews. See [Working with Figma or Screenshots](../workflows/work-with-figma-or-screenshots.md).

---

**5. What does "DS gap" mean?**

A DS gap means the Design System (`@idira/design-system`) does not have a component, token, or icon that a screen needs. When Claude finds a DS gap, it stops and reports the missing element instead of inventing a custom workaround. This is by design — you decide how to proceed, whether by using the closest available DS component, requesting a new DS component from the design system team, or approving a temporary exception.

---

**6. Can Claude add a new page to the navigation automatically?**

Claude can prepare the navigation entry and determine the correct position based on the existing hierarchy. However, adding a new route (the URL for the page) always requires your explicit approval. Claude will propose the route, explain where it fits in the hierarchy, and wait for your confirmation before finalizing the navigation entry.

---

**7. What is a Flow Gap?**

A Flow Gap is a missing or incomplete interaction detected during a UX review. It represents a situation where a user has no defined path — for example, no error state when data fails to load, no confirmation before a destructive action, or no way to exit a wizard mid-way. Flow gaps are surfaced as review findings but are not automatically fixed — you decide which ones to address. See [Flow Gaps and UX Notes](../review-annotations/flow-gaps-and-ux-notes.md).

---

**8. What is a Lesson Candidate?**

A lesson candidate is a proposed improvement rule created when the same type of mistake occurs two or more times. For example, if the same QA issue appears in three different screen builds, the continuous-improvement-agent creates a lesson candidate proposing a rule to prevent it automatically in the future. Lesson candidates require your review and approval before they become permanent. See [UX Pattern Learning](../automation/ux-pattern-learning.md).

---

**9. How does User Decision Memory work?**

You approve a behavior once (for example, "always preserve form values after a validation failure") and it is registered as a decision (DEC-002). On future screens, Claude applies it automatically without asking. Every auto-applied decision is listed in the implementation summary so you know what was applied. You can override any decision at any time by describing what you want instead. See [User Decision Memory](../automation/user-decision-memory.md).

---

**10. What's the difference between a Warning and a Critical annotation?**

A **Warning** annotation means the screen has a concern that should be addressed before it is considered done. The user can still use the screen, but there is friction, a missing state, or an inconsistency. A **Critical** annotation means the screen has a must-fix issue — a real user would be blocked, confused, or could accidentally lose data. Critical findings block review sign-off until resolved. A **Note** is an observation or suggestion with no urgency.

---

**11. Can I delete an annotation permanently?**

No. Annotations use soft delete — when you delete an annotation, it is hidden from the active list but retained in the audit log. The deletion timestamp is stored. This ensures the review history is always complete. You can view deleted annotations by enabling the "Show all" option in the annotation panel. See [Editing, Deleting, and Restoring Notes](../review-annotations/edit-delete-and-restore-notes.md).

---

**12. What is dark mode compliance and why does it matter?**

Dark mode compliance means a screen works correctly when the app is displayed in dark theme — dark backgrounds, light text, appropriate contrast for all states. Claude enforces this by using semantic Design System tokens (which automatically adapt between light and dark themes) rather than hardcoded colors. Every new screen must pass dark mode compliance before it is considered complete. This is not optional — it is a project-wide requirement.

---

**13. What does "soft delete" mean?**

Soft delete is a deletion approach where the item is marked as deleted and hidden from the active view, but not permanently removed from the system. A soft-deleted item remains in the audit log and can be recovered by authorized users. The deletion timestamp is stored. This applies to data deletions (DEC-003) and annotation deletions (DEC-013). See the [Glossary](./glossary.md) for a full definition.

---

**14. How do I ask Claude to review a screen for UX quality?**

Describe the screen and ask for a review in plain English. Examples: "Review the Scans page for edge cases and missing states", "Audit the Create Policy wizard — I want to know if any states are missing", "Check the Accounts page for UX quality". Claude runs a read-only UX audit and produces categorized findings (Critical, Warning, Note). Nothing changes during the review. See [Review a Flow for UX Quality](../workflows/review-a-flow.md).

---

**15. What is a delta report?**

A delta report is the summary Claude produces before changing any existing page. It lists: what the page currently contains (what was found), what Claude proposes to change, and what it will not touch. You review and approve the delta before any code changes. This ensures you are always in control of what changes and what doesn't. See [Update an Existing Screen](../workflows/update-an-existing-screen.md).

---

**16. Can I override a stored decision?**

Yes. If you want different behavior from a registered decision, describe what you want. Claude will surface the conflict — for example: "This differs from DEC-005 (loading skeleton). You're asking for a spinner instead." — and ask whether to override for this screen only or update the global decision. If you confirm, Claude applies your instruction. Global overrides update the decision registry and apply to all future screens.

---

**17. What happens if Claude finds a Design System gap?**

Claude stops and reports the gap with a structured explanation: what component or token is missing, which screen needs it, and what the closest available alternative is (if any). Claude never invents a workaround or local override. You decide how to proceed: use the closest DS alternative, request a new DS component from the design system team, or approve a one-time exception. This is DEC-008 — No Silent Fallback.

