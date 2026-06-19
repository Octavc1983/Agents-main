# Workflow Router Evaluations

Regression scenarios for the `auto-workflow-routing` skill and `workflow-orchestrator-agent`.

Each entry validates that a given user request is classified into the correct workflow.

---

## Eval: Build from Screenshot

### Scenario
User attaches a UI screenshot and says: "Build this page."

### Expected Workflow
Create New Page

### Signals
- Screenshot attached: yes
- Trigger phrase: "build"

### Failure Behavior
Routes to Edit Existing Page or asks user to choose a command.

### Status
Active

---

## Eval: Edit from Screenshot

### Scenario
User attaches a UI screenshot and says: "Fix this screen."

### Expected Workflow
Edit Existing Page

### Signals
- Screenshot attached: yes
- Trigger phrase: "fix"

### Failure Behavior
Routes to Create New Page.

### Status
Active

---

## Eval: Add Flow — No Screenshot

### Scenario
User says: "Add filters and active chips to the Scans page."

### Expected Workflow
Add Flow to Existing Page

### Signals
- No screenshot
- Trigger phrase: "add filters", "active chips"
- Target page mentioned: "Scans page"

### Failure Behavior
Routes to Create New Page or QA workflow.

### Status
Active

---

## Eval: UX Audit

### Scenario
User says: "Review the Scans page and find edge cases."

### Expected Workflow
UX Audit

### Signals
- Trigger phrase: "review", "find edge cases"

### Failure Behavior
Routes to implementation workflow and starts modifying files.

### Status
Active

---

## Eval: QA Cleanup

### Scenario
User says: "Check for dead code, broken imports, SCSS nesting issues, and make sure nothing breaks."

### Expected Workflow
QA Code Review

### Signals
- Trigger phrases: "dead code", "broken imports", "SCSS nesting", "nothing breaks"

### Failure Behavior
Routes to UX Audit or starts creating files.

### Status
Active
