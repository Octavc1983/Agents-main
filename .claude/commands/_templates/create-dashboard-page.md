# Create Dashboard Page

## Purpose

Create a dashboard or overview page with metric cards, summary sections, and status data using the existing AppShell and Design System components.

---

## Agents to Use

1. Component Mapping Agent
2. Application Shell Navigation Agent
3. Prototype Page Builder Agent
4. State Builder Agent

---

## Skills to Use

```text
.claude/skills/_templates/dashboard-page-template/SKILL.md
.claude/skills/_core/component-mapping/SKILL.md
.claude/skills/_infra/prototype-state-patterns/SKILL.md
.claude/skills/_core/application-shell-navigation/SKILL.md
```

---

## Required User Intake

### Required intake fields

```text
Page name:             React component name (e.g. DashboardPage, OverviewPage)
Route:                 Route path (e.g. /overview)
Navigation label:      Sidebar label or 'none'
Navigation icon:       SVG icon name or 'none'
Sections:              List of dashboard sections (e.g. Metric cards, Recent activity table, Risk chart)
Data entities:         What data appears in each section
Required states:       Default / Loading / Empty / Error
Known constraints:     e.g. SVG icons only, no new DS components, no chart library
```

### Minimum required fields

```text
Page name
Route
Sections
Required states
Known constraints
```

### Missing Information Response

If any minimum required field is missing, stop and respond only with:

```markdown
### Missing Required Information

Before I can run `/create-dashboard-page`, please fill:

\`\`\`text
Page name:      [ReactPageName]
Route:          [/route-path]
Sections:       [Section 1, Section 2, ...]
Required states: [Default, Loading, Empty, Error]
Known constraints: [e.g. SVG icons only, no chart library unless already in project]
\`\`\`
```

Do not create files.
Do not continue until minimum required fields are provided.

---

## Intake Gate

Do not create files.
Do not add routes.
Do not continue until Page name, Route, Sections, and Required states are provided.

---

## Required Workflow

1. Inspect existing dashboard patterns and DS Card/Stat components.
2. Run component mapping for the dashboard sections.
3. Create the page `.tsx` with all sections and states.
4. Create the page `.scss` using SCSS grid tokens.
5. Create mock data for each section.
6. Add route and navigation if requested.

---

## Restrictions

- Do not add chart libraries not already in the project
- Do not use inline styles
- Do not hardcode values
- Do not add backend calls
- Do not add icon libraries

---

## Expected Output

```markdown
### Dashboard Page Summary — [PAGE NAME]

### Files Created

### Sections Implemented

| Section | Component Used | Data Source | Notes |
|---|---|---|---|

### States Implemented

| State | How to Trigger |
|---|---|

### Route Added

### Navigation Added

### Gaps or Manual Review Needed
```
