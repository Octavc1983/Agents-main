# Dark Theme Conversion Evaluation Cases

## Eval 1 — Light table with filters and chips

Input: `src/pages/ScansPage/ScansPage.scss`
Expected:
- Identify all hardcoded color values
- Map table header background to `$color-table-header-bg` or equivalent DS token
- Map filter chip background to DS chip token
- Map search input background to DS input surface token
- Report any DS dark token gaps
- Do not change layout, content, or behavior

## Eval 2 — Modal with 30% black backdrop

Input: SystemNotice dialog component
Expected:
- Map backdrop to DS `$color-overlay-backdrop` or equivalent
- Map modal surface to DS `$color-surface-overlay` or equivalent
- Map modal border to DS border token
- Report if token is missing — do not invent hex fallback

## Eval 3 — Dashboard with KPI tiles and charts

Input: SystemHealthPage
Expected:
- Map every card surface to DS Card dark background token
- Map metric value typography to DS text-primary token
- Map progress bar to DS ProgressBar component (no local override)
- Report chart/widget dark state if no DS chart token exists

## Eval 4 — Zero-state configuration page with side tabs

Input: Configuration page with no data
Expected:
- Map empty state illustration background to DS surface token
- Map empty state text to DS text-secondary token
- Map side tab active state to DS tab-active token
- Map side tab inactive to DS tab-inactive token

## Eval 5 — Hardcoded hex value replacement

Input: SCSS file with `background: #17243b`
Expected:
- Identify `#17243b` as a hardcoded value
- Match to known DS token `$color-sidebar-bg` or equivalent
- Recommend token replacement
- Report if no DS token matches this value → DS gap

## Eval 6 — Reject CSS filter approach

Input: Page with `filter: invert(1)` on dark mode class
Expected:
- Flag as forbidden approach
- Remove CSS filter
- Replace with semantic DS token mapping

## Eval 7 — Reject direct DS internal import

Input: Page importing `packages/design-system/src/theme/dark.ts`
Expected:
- Reject import
- Recommend using DS public theme export
- Do not proceed until import is corrected

## Eval 8 — Reject local tile when DS Card exists

Input: Page with `<div className="kpi-tile">` where DS Card exists
Expected:
- Flag local tile as forbidden
- Recommend Card composition
- Remove local tile in apply mode (with approval)

## Eval 9 — Detect FormDialog requirement

Input: "Dialog to configure connector credentials"
Expected:
- resolve-modal-service → FormDialogService
- DS components: Dialog, Form, Input, Button

## Eval 10 — Detect SystemNotice requirement

Input: "Confirmation before permanently deleting a safe"
Expected:
- resolve-modal-service → SystemNoticeService
- DS components: Dialog, destructive Button, secondary Button
