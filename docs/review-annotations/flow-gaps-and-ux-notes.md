# Flow Gaps and UX Notes

During review and build, Claude may surface two types of findings that are not standard annotations: Flow Gaps and UX Notes. This guide explains what each is, how they are raised, and how to respond to them.

---

## What Is a Flow Gap?

A Flow Gap is a missing or incomplete interaction that Claude detected during a review or build. It represents a situation where the user has no defined path — the screen exists but something is missing that would leave a user stuck, confused, or without feedback.

Flow Gaps are different from regular annotations because they describe a structural gap in the interaction design, not just a visual or copy issue.

**Flow Gaps are raised during review, not during build.** When Claude builds a screen, it adds the standard states (loading, empty, error, success) automatically. Flow Gaps are raised afterward, during the UX audit, when Claude examines the full interaction in context.

---

## What Is a UX Note?

A UX Note is a reviewer's observation about UX quality. It may be added manually by a reviewer using the annotation panel, or surfaced by Claude during a UX audit as a Note-severity finding.

UX Notes are less urgent than Flow Gaps — they represent improvements, refinements, or open questions rather than structural gaps.

---

## How Flow Gaps Are Raised

Claude surfaces Flow Gaps during:
- A UX review (`"Review the Policies page for edge cases and missing states"`)
- A backend edge case review
- The automated QA pass that runs after every page build
- The UX audit stage in the full workflow pipeline

Flow Gaps appear in Claude's review output as structured findings, typically at Warning or Critical severity. They are not automatically converted to annotation panel entries — you choose whether to add them as annotations.

---

## How to Respond to a Flow Gap

For each Flow Gap Claude surfaces, you have four options:

1. **Approve a resolution** — "Fix this: add an empty state for the Policies table when no policies match the active filters." Claude will propose a specific fix, you confirm, and it applies the change.

2. **Mark as known / defer** — "We know about this — it's planned for next sprint." Claude notes this in the implementation report but does not apply a fix.

3. **Mark as out of scope** — "This screen intentionally doesn't have that state — it's always pre-populated." Claude records the decision and does not raise it again for this screen.

4. **Add it as an annotation** — Add the gap to the Review Mode annotation panel so it is visible during stakeholder review sessions.

---

## How to Add a Manual UX Note

You can add a UX Note at any time using the annotation panel:

1. Open Review Mode (click **Review** in the header)
2. Click **Add annotation**
3. Choose **Note** as the severity level
4. Write your observation
5. Save

Manual UX Notes work exactly like regular annotations — they support editing, history, resolve, and soft delete.

---

## Flow Gap Examples

### Missing empty state for filtered results

> **Flow Gap (Warning):** No empty state defined for the Policies table when no policies match the active filters. If a user applies filters that return zero results, the table shows its default empty state ("No policies yet") instead of a filter-specific message ("No policies match your filters — try adjusting the filter settings"). This is confusing because the user may think there are genuinely no policies in the system.

**Resolution options:**
- Add a filter-specific empty state message and a "Clear filters" action
- Use the existing empty state copy and add a "Clear filters" link
- Mark as deferred (low priority)

---

### No save-and-exit path in a wizard

> **Flow Gap (Critical):** The New Integration wizard has no "Save draft and exit" path. If a user is mid-way through a multi-step wizard and needs to close the browser or switch tasks, their progress is lost. Users may need to restart the wizard from the beginning on return.

**Resolution options:**
- Add draft saving with a "Continue where you left off" entry point
- Add a "Cancel and lose progress" warning dialog so users are at least informed
- Mark as out of scope if the wizard is short and progress loss is acceptable

---

## UX Note Examples

### Ambiguous action label

> **UX Note (Note):** The "Archive" action label is ambiguous. Users may not know if archiving is reversible. Consider adding "(reversible)" to the label, a tooltip explaining what archive does, or a confirmation dialog that clarifies "This account will be archived and can be restored at any time."

### Copy inconsistency

> **UX Note (Note):** The "Rotate Credentials" button on the details panel says "Rotate" but the same action on the table row says "Rotate credentials". These should be consistent. Recommend "Rotate credentials" in both places to match the approved terminology.

