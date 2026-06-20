# UX Pattern Learning

Claude gets better at this project over time by tracking recurring corrections and mistakes. When the same type of issue appears multiple times, it creates a lesson candidate. Approved lessons become permanent rules applied to all future work.

---

## How Learning Works

### Step 1 — A recurring issue is detected

The continuous-improvement-agent monitors findings from UX reviews, QA reports, and user corrections. When the same type of issue appears two or more times, a lesson candidate is created.

A "same type" issue means the same category of mistake across different screens — not just the same mistake on the same screen.

Examples of recurring issues that would trigger a lesson candidate:
- The same QA finding (e.g., "import contains unused component") appears in 3 different page builds
- The same UX audit finding (e.g., "confirmation dialog missing for bulk delete") appears in 2 different flows
- The same copy correction (e.g., "use 'account' not 'Account' in filter labels") is made in 3 different screens
- The user overrides the same auto-applied decision in the same way 2+ times

### Step 2 — A lesson candidate is created

A lesson candidate is a structured record that describes:
- What the recurring issue is
- How many times it has appeared (evidence count)
- Which screens or sessions it was observed in
- A proposed rule to prevent it in the future
- A proposed regression check (a test or check that would catch this issue if it recurs)

Lesson candidates are stored in the project files as active candidates under review.

### Step 3 — You review and approve (or reject) the candidate

Lesson candidates are not applied automatically. They require your review and explicit approval.

To approve: confirm the lesson and the proposed rule. The lesson is promoted to the approved lessons list and applied to future work from that point on.

To reject: provide the reason. The lesson is moved to the rejected list with the reason documented. It will not be re-raised unless new evidence emerges.

To defer: mark it as "pending more evidence". It stays in the candidates list and is re-evaluated as more data arrives.

### Step 4 — Approved lessons are applied

Once approved, the lesson is applied automatically to all future relevant work. Claude checks for the covered issue before it can occur, rather than catching it in QA or review.

---

## The Three Lesson Files

| File | What It Contains |
|---|---|
| `lesson-candidates.md` | Active lessons under review — have evidence but not yet approved |
| `approved-lessons.md` | Promoted lessons that are now part of the workflow |
| `rejected-lessons.md` | Rejected lessons with documented reasons |

These files are stored at `.claude/quality/lessons/` in the project.

---

## What Triggers a Lesson Candidate

| Trigger | Threshold |
|---|---|
| Same QA issue in multiple pages | 2+ occurrences |
| Same UX audit finding in multiple flows | 2+ occurrences |
| Same copy correction in multiple screens | 2+ occurrences |
| User overrides same auto-applied decision | 2+ overrides in the same direction |
| Same flow gap type in multiple screens | 2+ occurrences |

One occurrence is not enough to create a lesson candidate. The system requires evidence of a pattern, not a one-time exception.

---

## What Cannot Be Changed Through Learning

The learning system can improve how individual screens are built and reviewed. It cannot:

- Modify core workflow rules, CLAUDE.md, or AGENTS.md
- Change core agents or core skills
- Promote a lesson to a global rule without your explicit approval
- Retroactively apply an approved lesson to screens that were already built (it only applies to future work)

Major architectural or rule changes require a separate, explicit approval process — not the lesson candidate system.

---

## How This Improves Your Experience

Over time, as more screens are built and more corrections are documented, the project develops a project-specific quality memory. Issues that were common early in the project become automatically prevented. Review cycles get shorter because predictable issues are caught before they reach you.

This is not a replacement for good design judgment. It is a system that ensures Claude never makes the same mistake twice — and that your decisions about this project's conventions are preserved and applied consistently, even in long, complex sessions.

