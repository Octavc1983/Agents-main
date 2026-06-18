# Dashboard Page Template Skill

## Purpose

Define the standard pattern for creating a dashboard or summary page in the prototype project.

Dashboard pages display metrics, cards, charts, and summary data rather than a primary table.

---

## When to Use

Use this skill when:
- Creating an overview/home page
- Creating a summary with metric cards
- Creating a page with multiple data sections
- Creating a risk/status overview page

---

## Inputs Required

```text
Page name:             React component name (e.g. DashboardPage, OverviewPage)
Route:                 Route path
Sections:              List of dashboard sections (e.g. Metric cards, Risk chart, Recent activity table)
Data entities:         What data is displayed in each section
Required states:       Default / Loading / Empty / Error
Known constraints:     e.g. SVG icons only, no new DS components
```

Minimum required:
```text
Page name
Route
Sections
Required states
```

---

## Required User Intake

If Page name, Route, or Sections are missing, ask before continuing.

---

## Required Project Inspection

```text
src/pages/                    (existing page implementations)
src/components/ui/            (Card, Badge, Chart if available)
src/design-system/            (DS Card, Stat, Chart components)
src/mock/                     (mock data patterns)
src/styles/_variables.scss    (layout tokens)
```

---

## Page Structure

```
AppShell (existing)
  └── Dashboard Page
       ├── Page Header (title + date range or action)
       ├── Metric Cards Row
       ├── Charts or Visual Section (if applicable)
       ├── Summary Table or List
       └── State overlays (Loading, Empty, Error)
```

---

## Required Workflow

1. Receive dashboard requirements.
2. Inspect existing pages for reference patterns.
3. Inspect DS Card, Stat, and chart components.
4. Design grid layout using SCSS tokens.
5. Create page `.tsx` with:
   - Mock metric data
   - Card/stat rendering
   - Summary table or list
   - All required states
6. Create page `.scss` using SCSS grid and token spacing.

---

## Must Do

- Use existing DS Card/Stat components if available
- Use SCSS grid tokens for layout (no inline styles)
- Use SVG icons for metric card icons
- Keep data mock-only
- Handle all required states

---

## Must Not Do

- Do not add chart libraries not already in the project
- Do not use inline styles
- Do not hardcode values
- Do not add backend calls

---

## Output Format

```markdown
### Dashboard Page Creation Summary

### Files Created

### Sections Implemented

| Section | Component Used | Data Source | Notes |
|---|---|---|---|

### States Supported

### Gaps or Manual Review Needed

### Next Steps
```

---

## Example Prompt

```
Use the Dashboard Page Template Skill.

Page name: OverviewPage
Route: /overview
Sections: Risk score card, Scan summary cards (4), Recent scans table, Status breakdown chart
Required states: Default, Loading, Empty, Error
Known constraints: SVG icons only. No chart library unless already in project.
```
