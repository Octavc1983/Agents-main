# /ingest-template

## Purpose

Convert a screenshot or Figma reference of a page pattern into a reusable Page Composition Template specification.

This command does not build one page. It produces a registered, approved template that future pages can consume.

---

## When to Use

Use this command when:
- You have a screenshot or Figma frame of a reusable page pattern
- You want to extract the structural contract before building implementation
- You want to register a new template in the architecture registry
- You want to ensure a pattern is designed for reuse across multiple product domains

Do not use this command to build a single page. Use `/ux-add-page` for that.

---

## Required Intake

```text
Screenshot or Figma source:   [ATTACHED IMAGE or Figma link]
Template name:                [e.g. TableFiltersTemplate]
Template category:            [table / list / master-details / dashboard / form / dialog / wizard / other]
Primary user goal:            [what the user should achieve on this page]
Expected future use cases:    [e.g. Scans, Accounts, Findings, Rules]
Known constraints:            [e.g. SVG icons only, no inline styles, no new DS components]
```

---

## Minimum Required Fields

```text
Screenshot or Figma source
Template name
Template category
Primary user goal
Expected future use cases
```

---

## Missing Information Response

If any minimum required field is missing, stop and respond only with:

```markdown
### Missing Required Information

Before I can continue with `/ingest-template`, please fill the missing fields below.

\`\`\`text
Screenshot or Figma source:
Template name:
Template category:
Primary user goal:
Expected future use cases:
Known constraints:
\`\`\`

After you provide the missing fields, I will continue with the template ingestion workflow.
```

---

## Required Workflow

Run the **Template Ingestion Skill**: `.claude/skills/_core/template-ingestion/SKILL.md`

Follow the skill steps in order.

---

## Expected Output — Before Approval

A complete template specification document stored at:
```text
.claude/architecture/templates/[TemplateName].md
```

With a registry entry added to:
```text
.claude/architecture/template-registry.md
```

Status: `Specified` — awaiting approval.

---

## Expected Output — After Approval

Only after explicit approval:

1. Template folder created at `src/prototype-templates/[TemplateName]/`
2. Type definitions file
3. Template implementation (`.tsx`)
4. SCSS using existing tokens
5. Template usage guide
6. Evaluation scenarios added to `.claude/quality/evals/`
7. Registry entry status updated to `Implemented`

---

## Restrictions

- Do not implement code before specification is approved
- Do not create DS components
- Do not create new tokens
- Do not use inline styles
- Do not modify existing DS or Infra files
- Do not treat screenshot copy as final terminology — check terminology registry

---

## Distinction

```text
Screenshot → Template specification → Registry → Approval → Implementation → Pages consume template
NOT: Screenshot → one-off page
```
