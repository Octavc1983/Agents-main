# Project Tools Evaluation Cases

## detect-screen-template

| Case | Input | Expected Output |
|---|---|---|
| Table with filters | Screenshot of table, search bar, filter chips | Table Filters Page, ≥90% confidence |
| Dashboard with KPI tiles | Screenshot of metric cards grid | Dashboard Page, ≥85% confidence |
| Unknown screen | Screenshot of canvas with drag-drop nodes | No Match, create Draft Template Candidate |
| Master details | Route `/manage/inventory/accounts` | Table Master Details |
| Dialog request | "Add dialog for creating an account" | resolve-modal-service → FormDialog |

## inspect-design-system

| Case | Input | Expected Output |
|---|---|---|
| KPI tile detected | "I need a metric tile with count and label" | DS Card found → use Card composition |
| Table row detected | "I need a table row" | Not Card — use DS Table |
| Card selectable missing | "I need a selectable card" | DS Gap — selectable Card variant missing |
| Direct src import | `import Button from 'packages/design-system/src/components/Button'` | Reject — use public export |

## convert-screen-to-dark

| Case | Input | Expected Output |
|---|---|---|
| Light table with filters and chips | ScansPage | Semantic token mapping, detect hardcoded colors |
| Modal with backdrop | SystemNotice dialog | Map backdrop to DS backdrop token |
| Dashboard KPI tiles | SystemHealthPage | Map all KPI tile backgrounds to DS surface tokens |
| Zero-state config page | Empty state page | Map background, icon, text to DS dark tokens |
| Hardcoded hex detected | `background: #101828` in SCSS | DS gap or replacement token identified |

## validate-spaces-navigation

| Case | Input | Expected Output |
|---|---|---|
| Valid config | Full navConfig with all spaces | PASS |
| Dropdown with path | dropdown item with path property | FAIL — dropdown must not have path |
| Duplicate path | Two items sharing `/manage/inventory/users` | FAIL — paths must be unique |
| Unregistered route | Sub-page not in navConfig | lastKnownNavRef fallback check passes |

## run-ui-quality-validation

| Case | Input | Expected Output |
|---|---|---|
| Direct DS internal import | `import from 'packages/design-system/src/components/Button'` | Critical |
| Copied DS Button in src | `src/components/ui/Button/Button.tsx` mirrors DS Button | Critical |
| Inline mock array in page JSX | `const rows = [{ id: '1', name: 'Test' }]` | High |
| Missing loading state | Page fetches data but has no loading state | High |
| !important on DS component | `.ds-card { background: red !important }` | Critical |
| Hardcoded copy in JSX | `<Button>Create account</Button>` | High |
