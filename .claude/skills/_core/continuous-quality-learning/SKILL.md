---
name: continuous-quality-learning
description: Use after UX audits, QA reviews, visual alignment checks, implementation failures, repeated user corrections, or architecture reviews to identify recurring mistakes, create lesson candidates, add regression evaluations, and improve future workflow accuracy through evidence-based learning.
when_to_use: Use when a completed UX/UI task produced defects, repeated manual corrections, visual mismatches, routing mistakes, code quality issues, runtime failures, repeated component duplication, or repeated data/API duplication.
user-invocable: false
allowed-tools: Read, Glob, Grep, Write, Edit
---

# Continuous Quality Learning

## Purpose

Improve workflow accuracy through structured, evidence-based learning.

Turn validated repeated issues into:
- lesson candidates and approved workflow rules
- regression evaluations
- architecture, QA, and routing safeguards
- component and data contract safeguards

Do not treat every issue as a permanent rule.

---

## Learning Loop

```text
Task completed
→ QA / UX / visual review
→ issue detected
→ root cause identified
→ lesson candidate created
→ regression test created
→ recurrence OR expert approval
→ approved lesson
→ controlled update to workflow guidance
```

---

## When to Trigger

Trigger when:
- the user corrects generated output
- QA finds a recurring issue
- UX audit finds repeated missing states
- screenshot comparison reveals repeated visual drift
- import/runtime/build problem repeats
- a template repeatedly generates wrong structure
- a page repeatedly duplicates UI logic
- multiple pages duplicate the same data transformation
- multiple pages repeat similar API shapes
- routing logic repeatedly breaks AppShell containment

---

## Evidence Threshold

Promote a lesson only when:
```text
Repeated twice
OR
Critical once
OR
Explicit user-approved project rule
OR
Validated through regression test
```

Otherwise save as: `Candidate only`.

---

## Step 1 — Collect Evidence

Read from:
```text
.claude/quality/reports/latest-qa-report.md
.claude/quality/reports/latest-ux-audit.md
.claude/quality/reports/latest-architecture-review.md
.claude/quality/evals/
.claude/quality/lessons/lesson-candidates.md
```

Also read relevant source files when issue requires code-level analysis.

---

## Step 2 — Root Cause Analysis

For each issue, answer:
```text
Did the workflow choose the wrong path?
Was required intake missing?
Was the wrong template selected?
Was a DS component missed?
Was a shared component opportunity missed?
Was a shared data shape duplicated?
Was a view model missing?
Was an API contract missing?
Was the QA rule missing?
Was the error caused by unclear requirements?
Is this one-off or recurring?
```

Do not create a lesson if root cause is unknown. Mark as `Needs investigation`.

---

## Step 3 — Create Lesson Candidate

Write to `.claude/quality/lessons/lesson-candidates.md`:

```markdown
## Lesson Candidate: [Short Name]

### Category
[workflow-routing / component-reuse-failure / design-system-violation /
 token-mapping-failure / visual-alignment-gap / state-management-gap /
 data-contract-gap / shared-component-missed / shared-api-missed /
 import-regression / scss-consistency-regression / runtime-exception / ...]

### Evidence
[Task references, file paths, or report sections]

### Root Cause

### Preventive Rule

### Suggested Workflow Change

### Regression Test Scenario

### Confidence
Low / Medium / High

### Promotion Status
Candidate
```

---

## Step 4 — Create Regression Evaluation

Write to `.claude/quality/evals/` in the relevant file.

Format:
```markdown
## Regression: [Lesson Name]

### Scenario
[User request that would trigger the issue]

### Expected Behavior
[What should happen]

### Failure Behavior
[What was happening before the lesson was applied]

### Check Method
[How to verify: typecheck / lint / visual / routing trace / import scan]

### Status
Active
```

---

## Step 5 — Propose Update

If a lesson is ready for approval, prepare a proposed update for the target file.

Do not apply updates automatically to `CLAUDE.md`, `AGENTS.md`, core Skills, or core Agents.

Format:
```markdown
### Proposed Update

Target file: [path]
Section: [section name]
Change: [exact proposed text]
Reason: [lesson name and evidence]
Approval required: yes
```

---

## Required Output Format

```markdown
### Learning Review

### Evidence Reviewed
[List of inputs inspected]

### Root Cause Analysis
[Per-issue breakdown]

### Lesson Candidates
[New or updated candidates with status]

### Regression Checks Added
[List with target eval file]

### Architecture Opportunities Found
[Any patterns that should trigger shared-architecture review]

### Proposed Workflow Updates
[Exact proposals pending approval]

### Approval Required
[Yes / No — list which updates need approval]

### Workflow State
[Learning active / No new lessons / Needs investigation]
```

---

## Files Maintained by This Skill

```text
.claude/quality/lessons/lesson-candidates.md   — active candidates
.claude/quality/lessons/approved-lessons.md    — approved and applied
.claude/quality/lessons/rejected-lessons.md    — rejected with reason
.claude/quality/evals/qa-regression-evals.md   — QA regression checks
.claude/quality/evals/workflow-router-evals.md — routing evaluations
.claude/quality/evals/page-build-evals.md      — page build evaluations
.claude/quality/evals/ux-flow-evals.md         — UX flow evaluations
```

---

## Must Not Do

- Do not silently update permanent rules
- Do not promote a lesson from a single non-critical occurrence
- Do not create a regression test without a clear failure scenario
- Do not invent metrics without evidence
- Do not skip root cause analysis before creating a lesson
