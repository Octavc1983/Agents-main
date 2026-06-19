# Page Build Evaluations

Regression scenarios for the page build workflow.

Each entry validates that a page was generated correctly, uses the right template, respects architecture constraints, and passes QA.

---

## Eval: AppShell Containment

### Scenario
User asks to build a new page with a sidebar and header.

### Expected Behavior
Page renders inside the existing AppShell. No new AppShell, Sidebar, or Header is created.

### Failure Behavior
A new AppShell or duplicate header is created inside the page component.

### Check Method
Grep for AppShell / Sidebar / Header imports inside the new page file.

### Status
Active

---

## Eval: No Inline Styles

### Scenario
Any page or component is generated.

### Expected Behavior
All styling uses SCSS tokens. No `style={{}}` props or hardcoded hex/px values.

### Failure Behavior
Inline styles appear in the generated JSX.

### Check Method
Grep for `style={{` in the generated files.

### Status
Active

---

## Eval: No New Tokens Created

### Scenario
A page references a color, spacing value, or radius not yet in `_variables.scss`.

### Expected Behavior
The generator flags a DS gap and uses the nearest existing token or reports the gap.

### Failure Behavior
A new token is silently added to `_variables.scss`.

### Check Method
Review git diff on `_variables.scss` after page generation.

### Status
Active

---

## Eval: Route Registered

### Scenario
A new page is created with navigation placement requested.

### Expected Behavior
Route is added to `src/app/router.tsx` and sidebar entry added to `navConfig.ts`.

### Failure Behavior
Page exists but has no route or no sidebar entry.

### Check Method
Grep router.tsx and navConfig.ts for the new page path.

### Status
Active
