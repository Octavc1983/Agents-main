---
name: template-recognition-and-lifecycle
description: Automatically identify whether a UX/UI request or screenshot represents an existing registered template or a new template candidate. Load matched template logic automatically. Ask only missing navigation context. Register new candidates when no template matches.
when_to_use: Use whenever a user asks to build, generate, recreate, update, or implement a UI screen from text, screenshot, image, Figma, or existing page reference. Runs before component mapping and page implementation.
user-invocable: false
allowed-tools: Read, Glob, Grep, Write
---

# Template Recognition and Lifecycle

## Goal

Detect the correct reusable template before implementation.

Do not start by generating page code.

Start by answering:
```text
What type of UI is this?
Does a template already exist?
What logic is inherited from that template?
Does it affect navigation?
Is it a page, modal, wizard, configuration form, or embedded component?
```

---

## Step 1 — Load Template Registry

Read:
```text
.claude/architecture/template-registry.md
.claude/architecture/template-candidates/
src/prototype-templates/
```

---

## Step 2 — Analyze the Request

Inspect in order:
1. User text — look for layout, interaction, and entity signals
2. Screenshot or Figma — look for visual structure and hierarchy
3. Existing page structure — look for route, component name, template already in use

---

## Step 3 — Detect Template Using Signal Table

| Signals | Matched Template |
|---|---|
| table, filter, search, rows, bulk actions | TableFiltersTemplate |
| table + row click + details panel | TableMasterDetailsTemplate |
| cards left, details right, 30/70 | CardListMasterDetailsTemplate |
| KPI tiles, widgets, charts, metrics | TilesDashboardTemplate |
| canvas, nodes, connections, pan, zoom | CanvasTemplate |
| zero state, vertical tabs, configuration setup | ZeroStateConfigurationTemplate |
| fields, save, validation | FormPageTemplate |
| setup, account configuration, grouped settings | ConfigurationFormTemplate |
| stepper, next, previous, multi-step | WizardTemplate |
| modal, dialog, overlay, confirmation | DialogFlowTemplate |
| destructive delete, warning, confirm | ConfirmationDialogTemplate |
| bulk result list, per-item status | BulkStatusDialogTemplate |
| settings categories + left nav | SettingsPageTemplate |
| unknown or mixed pattern | Draft Template Candidate |

---

## Step 4 — Assign Match Confidence

**High** — signals strongly match one template, no ambiguity

**Medium** — likely match, one clarification question needed

**Low** — ambiguous — ask one focused question before proceeding

---

## Step 5 — Handle Each Confidence Level

### High
1. State the matched template
2. List which logic is auto-loaded
3. Proceed to navigation context check
4. Proceed to component mapping

### Medium
1. State the likely template
2. Ask one focused confirmation question
3. After confirmation, proceed as High

### Low
1. Ask a single focused question:
   - Page or dialog?
   - Table or card list?
   - Single-step or wizard?
2. After answer, proceed as High

---

## Step 6 — Navigation Context Check

Determine the presentation type:
```text
Full page
Nested page
Modal
Dialog
Wizard
Configuration form
Side panel
Embedded component
```

Ask only when unclear:
```text
Is this a full page, modal, wizard, configuration form, or embedded component?
Does it need a route?
Does it affect sidebar navigation?
Should browser Back close it?
Does it replace current content or open above it?
Does it need breadcrumbs?
```

---

## Step 7 — Load Template Logic

When High confidence, state exactly which logic is included.

Example for TableFiltersTemplate:
```text
Template detected: TableFiltersTemplate

Included logic:
- Search (built-in, searchableFields prop)
- Filter panel (draft vs applied state)
- Active filter chips + clear individual + clear all
- Result summary ("8 of 24 items")
- Optional sorting
- Checkbox row selection
- Three-dots row action menu (via ActionMenu DS component)
- Bulk action toolbar (via SelectionBar DS component)
- Bulk Status Dialog (per-item result tracking)
- Loading state (skeleton or LoadingState component)
- Empty state (consuming page provides text and CTA)
- No-results state (built-in with clear filters action)
- Error state (consuming page provides message and retry)
- Telemetry candidates (table_page_viewed, search_used, filters_applied, etc.)
- Technical Writing review triggers
- QA validation triggers
```

---

## Step 8 — Handle No Match (New Template Candidate)

When no existing template fits:

1. Create the candidate file:
   `.claude/architecture/template-candidates/[template-name]-candidate.md`

   With sections:
   - Status: Draft
   - Detected from
   - Why existing templates do not match
   - Primary user goal
   - Presentation type
   - Navigation impact
   - Layout pattern
   - Interaction pattern
   - Persistent context requirements
   - Reusable slots
   - Required states
   - Data contract candidates
   - Shared component candidates
   - TW requirements
   - Telemetry candidates
   - Accessibility requirements
   - Future reuse cases
   - Risks and unknowns
   - Recommendation

2. Notify the user:

```markdown
### New Template Candidate Detected

I could not confidently match this screen to an existing template.

Template candidate:
[Name]

Why it is new:
[Short explanation]

Potential future reuse:
[List of likely pages or flows]

Current status:
Draft specification created. No implementation code was created.

Approval needed:
Should this become a reusable template?
```

---

## Step 9 — Produce Detection Output

```markdown
### Template Detection

### Match Confidence
High / Medium / Low

### Detected Template
[Template name or "New Candidate: [Name]"]

### Template Logic Loaded

| Area | Included Behavior |
|---|---|

### Navigation Impact

| Question | Current Answer | Decision Needed |
|---|---|---|

### Missing Context
[Only list truly missing fields]

### Existing Reuse Found
[Pages, types, components, contracts already available]

### New Template Candidate
[Only when created]

### Recommended Next Step

### Workflow State
```

---

## Must Not Do

- Do not generate implementation code before template is identified
- Do not skip the registry check
- Do not force a screen into an unsuitable template
- Do not create duplicate templates
- Do not create new DS components from page templates
- Do not create new tokens without approval
- Do not modify src/ files
