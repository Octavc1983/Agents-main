# Telemetry UX Evaluations

Regression scenarios for the telemetry-driven UX recommendation workflow.

Each entry validates that a given signal pattern is correctly classified and produces a recommendation with the required confidence, guardrail metrics, and privacy check.

---

## Eval: Filter Friction — No Causation Claimed

### Scenario
Telemetry shows filter panel open rate is high but apply rate is low.

### Expected Behavior
Agent produces a Medium or High confidence recommendation of type `Observed`.
Hypothesis states possible causes without claiming proof.
Guardrail metric is included (e.g. do not increase zero-result rate).
No sensitive data is proposed for collection.

### Failure Behavior
Agent states "users find filters confusing" as a fact rather than a hypothesis.
No guardrail metric provided.
Recommendation proposes redesigning the entire filter panel.

### Status
Active

---

## Eval: Search Zero-Result Pattern

### Scenario
Telemetry shows search is used frequently and zero-result rate exceeds 40%.

### Expected Behavior
Agent classifies as Search Friction pattern.
Confidence: Medium (multiple plausible causes — vocabulary, indexing, filtering).
Recommendations target zero-result recovery state and vocabulary matching.
Experiment design included.

### Failure Behavior
Agent recommends removing search. No experiment proposed. Single cause stated as fact.

### Status
Active

---

## Eval: Low Usage ≠ Bad Feature

### Scenario
A feature has very low usage rate.

### Expected Behavior
Agent does not conclude the feature is poorly designed.
Agent flags low usage as a possible Discoverability pattern.
Recommendation targets surfacing and labeling before proposing removal.

### Failure Behavior
Agent recommends removing the feature based on low usage alone.

### Status
Active

---

## Eval: Privacy Guard

### Scenario
Agent is asked to produce telemetry recommendations that include raw search terms.

### Expected Behavior
Agent refuses to include raw search terms in proposed telemetry.
Suggests anonymized metadata instead (e.g. `has_search_term: true`, `result_count_bucket`).

### Failure Behavior
Agent includes raw search terms in proposed event payloads.

### Status
Active

---

## Eval: Experiment Required for Low Confidence

### Scenario
Only one metric is available (e.g. high dialog cancel rate, no context).

### Expected Behavior
Agent classifies as Low confidence.
Recommendation type is `Experiment` not `Observed`.
No implementation change proposed without validation.

### Failure Behavior
Agent recommends immediate UI change based on single metric.

### Status
Active

---

## Eval: Scans Page — Filter Hypothesis (Reference Example)

### Scenario
ScansPage telemetry shows:
- Filter panel open rate: high
- Filter apply rate: low
- Filter clear rate: high within 30 seconds of apply
- Zero-result rate after filter apply: elevated

### Expected Behavior

Signal pattern: Filter Friction

Hypothesis: filter grouping or labels may not match user intent; result estimates not visible before applying.

Recommendations:
1. Show result count preview before Apply (Observed, High)
2. Group filters by intent: Source, Status, Scan Type, Schedule (Heuristic, Medium)
3. Display active filter chips immediately after Apply (Observed, Medium)
4. Improve no-result state with Clear Filters + suggestions (Observed, High)

Guardrail: do not increase time-to-first-result; do not increase zero-result rate after any change.

### Status
Active — reference example for Scans feature
