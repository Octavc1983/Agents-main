---
name: telemetry-driven-ux-optimization
description: Use when telemetry, analytics, error patterns, flow drop-off, task completion data, search behavior, filter behavior, dialog outcomes, performance metrics, or runtime failures should inform UX improvement recommendations.
when_to_use: Use after telemetry review, QA, UX audit, feature performance review, or when a user asks why a flow is underperforming, where users drop off, how to improve adoption, or how to improve task completion.
user-invocable: false
allowed-tools: Read, Glob, Grep, Write
---

# Telemetry-Driven UX Optimization

## Goal

Transform approved telemetry into safe, testable UX recommendations.

Do not produce recommendations from metrics alone.

```text
Telemetry pattern
→ UX hypothesis
→ relevant best practice
→ proposed intervention
→ measurable success criteria
→ experiment or validation
```

---

## Step 1 — Review Available Metrics

Collect available data across:

```text
Task completion rate
Task duration
Error rate
Validation failure rate
Abandonment rate
Retry rate
No-result search rate
Filter open / apply / clear rate
Dialog open / confirm / cancel rate
Details open / close / reopen rate
Primary action activation
Feature adoption rate
Route-not-found rate
Runtime exception rate
Page load and interaction latency
```

Note which metrics are missing. Flag gaps for the Telemetry Gaps section.

---

## Step 2 — Detect Signal Patterns

A single metric is weak evidence. Look for co-occurring signals.

### Pattern: Search Friction

Signals:
- High search usage + high no-result rate
- Repeated query edits, frequent clear after search

Possible causes: terminology mismatch, weak indexing, unclear searchable fields, missing filters.

Recommended tests: add search examples, expose searchable field hints, add suggested filters, improve zero-result recovery state, show active search chip.

---

### Pattern: Filter Friction

Signals:
- High filter panel open rate + low apply rate
- High clear rate, repeated filter changes, no-result after apply

Recommended tests: group filters by user goal, show result estimates, add selected count, use better defaults, simplify multi-select, show active chips.

---

### Pattern: Details Panel Friction

Signals:
- Frequent open-close cycles, frequent item switching
- Low interaction inside details, repeated reopen of same item

Recommended tests: improve list preview data, improve details hierarchy, surface key details in list cards, preserve selection and scroll, improve empty details state.

---

### Pattern: Form and Save Friction

Signals:
- High validation failures, high save failure
- High cancel after edit, high retry, long save duration

Recommended tests: move validation earlier, add format examples, preserve entered data, clarify required fields, improve inline errors, add saving and success feedback.

---

### Pattern: Navigation Friction

Signals:
- High route-not-found events, repeated back navigation
- Low engagement after navigation, frequent sidebar expand/collapse

Recommended tests: fix deep links, improve labels, improve information architecture, keep active route visible, add in-shell Not Found recovery.

---

## Step 3 — Classify by Confidence

```text
High confidence: repeated pattern + UX audit confirmation + clear related flow
Medium confidence: strong pattern but multiple plausible causes
Low confidence: limited data, incomplete events, or heuristic evidence only
```

Do not recommend implementation for low-confidence findings without an experiment first.

---

## Step 4 — Assign Recommendation Type

```text
Observed   — based on actual telemetry patterns
Heuristic  — based on UX best practice, accessibility, or known interaction principles
Experiment — proposed A/B test or before/after measurement plan
```

---

## Step 5 — Define Guardrail Metrics

Every recommendation must include at least one guardrail.

Examples:
```text
Improve filter apply rate
→ Guardrail: do not increase zero-result rate

Improve primary CTA usage
→ Guardrail: do not increase dialog cancel rate

Reduce form completion time
→ Guardrail: do not increase validation error rate

Reduce page load time
→ Guardrail: do not reduce task completion rate
```

---

## Step 6 — Check Architecture Before Proposing UI

Before proposing a new UI change, check:
- Does a shared component already exist? (`component-registry.md`)
- Does a shared data pattern exist? (`data-contract-registry.md`)
- Does a template already handle this layout? (`shared-patterns.md`)

Prefer reusing existing patterns over creating new ones.

---

## Step 7 — Connect to Continuous Learning

After recommendations are produced:
- Flag any pattern that should trigger a lesson candidate in `continuous-quality-learning`
- Flag any telemetry gap that should be added to `qa-regression-evals.md`
- Flag any experiment result that can validate an existing lesson candidate

---

## Privacy Guard

Before producing output, confirm:
- No sensitive data fields in proposed events
- No PII, tokens, secrets, raw form content, or private entity metadata
- Only aggregated, anonymous metadata proposed

---

## Required Output

```markdown
### UX Optimization Summary

### Metrics Reviewed

| Metric | Source | Available | Notes |
|---|---|---|---|

### Top Signal Patterns

| Pattern | Signals | Category | Confidence |
|---|---|---|---|

### Recommendations

[One entry per recommendation]

### Experiment Backlog

| Experiment | Hypothesis | Primary Metric | Guardrail | Priority |
|---|---|---|---|---|

### Telemetry Gaps

| Missing Metric | Why Needed | Proposed Event |
|---|---|---|

### Privacy Check

Confirmed / Issues found

### Shared Component / Data Opportunities

[Any reuse candidates surfaced by this review]

### Continuous Learning Triggers

[Patterns that should create or update lesson candidates]

### Guardrail Metrics Summary

### Final Priority Order

[Ordered by: confidence × estimated impact × implementation cost]
```

---

## Must Not Do

- Do not claim telemetry proves causation
- Do not produce recommendations from a single metric
- Do not propose new telemetry events without checking existing project utilities
- Do not expose or recommend collecting sensitive data
- Do not recommend full page redesigns from low-confidence findings
- Do not skip guardrail metrics
- Do not optimize engagement metrics at the expense of task success or trust
