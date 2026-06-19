# UX Flow Evaluations

Regression scenarios for UX flow completeness.

Each entry validates that a required state, interaction, or UX pattern is present and reachable.

---

## Eval: Loading State Present

### Scenario
Any data-driven page is generated.

### Expected Behavior
A loading state is visible when data is being fetched or simulated.

### Failure Behavior
Page renders empty or skeleton-free while loading.

### Status
Active

---

## Eval: Empty State Present

### Scenario
A list or table page is generated.

### Expected Behavior
An empty state is shown when the list has zero items.

### Failure Behavior
An empty array renders as a blank table with no feedback to the user.

### Status
Active

---

## Eval: Error State Present

### Scenario
A page or flow that fetches or processes data is generated.

### Expected Behavior
An error state is shown when something fails.

### Failure Behavior
No error state. Page hangs or shows nothing.

### Status
Active

---

## Eval: Primary Action Reachable

### Scenario
A page with a defined primary action is generated.

### Expected Behavior
The primary action is visible and reachable in the default state.

### Failure Behavior
Primary action is hidden, disabled with no explanation, or only reachable after multiple steps.

### Status
Active

---

## Eval: Details Panel Closes on Dismiss

### Scenario
A master-details layout is generated.

### Expected Behavior
The details panel closes when the user dismisses it or clicks outside.

### Failure Behavior
No dismiss mechanism. Panel is always visible.

### Status
Active
