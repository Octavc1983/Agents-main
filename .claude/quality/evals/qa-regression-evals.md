# QA Regression Evaluations

Regression scenarios for code quality and runtime safety.

Each entry validates that a specific type of defect does not reappear after being fixed.

---

## Eval: No Unused Imports

### Scenario
Any component file is created or modified.

### Expected Behavior
All imports are used. No unused import warnings from TypeScript or lint.

### Check Method
Run `npx tsc --noEmit`. Check for TS6133 (declared but never read).

### Status
Active

---

## Eval: No Broken Imports

### Scenario
A new component is created that imports from `@/` or relative paths.

### Expected Behavior
All imports resolve correctly. No `Cannot find module` errors.

### Check Method
Run `npx tsc --noEmit`.

### Status
Active

---

## Eval: SCSS Uses Tokens Only

### Scenario
Any SCSS file is created or modified.

### Expected Behavior
No hardcoded hex colors, spacing px values, font-size px values, or border-radius px values outside of `_variables.scss`.

### Check Method
Grep for `#[0-9a-fA-F]{3,6}` and raw `px` values in component SCSS files.

### Status
Active

---

## Eval: No setState in useEffect Synchronously

### Scenario
Any component uses a `useEffect` that calls `setState`.

### Expected Behavior
If state can be derived from props or URL, use `useMemo` instead. If `setState` is needed, it must be in an async callback or triggered by a user event.

### Check Method
Grep for `setState` calls inside `useEffect` bodies without async wrapping.

### Status
Active

---

## Eval: No Duplicate SCSS Selectors

### Scenario
A component SCSS file is created or extended.

### Expected Behavior
No duplicate selectors with conflicting styles.

### Check Method
Search for repeated class names in the same SCSS file.

### Status
Active
