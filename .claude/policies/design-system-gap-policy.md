# Design System Gap Policy

## When to Create a DS Gap

Create a DS Gap when:

```text
- A required DS component does not exist.
- A required DS component variant does not exist.
- A required DS token does not exist.
- A required DS icon does not exist.
- A required DS API is missing from a component.
- DS Stepper compatibility with a specific context is unverified.
```

---

## DS Gap Blocks Implementation

A DS Gap blocks implementation of the affected surface.

```text
Do not implement:
- A local substitute component.
- A CSS workaround.
- A hardcoded fallback value.
```

Report the gap and wait for DS team resolution.

---

## DS Gap Report Format

```markdown
## DS Gap: [ID]

**Status:** Open
**Blocking:** [Yes / No — reason]
**Missing capability:** [exact description]
**Affected page/component/template:** [where needed]
**Workaround attempted:** none — blocked per no-silent-fallback-policy
**Requested from DS team:** [specific new component / variant / API / token]
**Evidence of reuse:** [how many pages or flows would benefit]
**Created:** [date]
```

---

## DS Gap Registry

All active DS Gaps must be registered in `.claude/architecture/decisions/`.

Current active gaps:

| ID | Gap | Status |
|---|---|---|
| DS-GAP-001 | Risk Status Icon semantic mapping | Open |
| DS-GAP-002 | Risk Chart semantic token API | Open |
| DS-GAP-003 | DS Stepper compatibility with Modal header (DialogFlowTemplate) | Open — needs verification |
| DS-GAP-004 | No semantic token for neutral notice accent color (#7a80ff) — ModalProvider SystemNoticeRenderer | Open — neutral mapped to info treatment |

---

## Template Approval with Limitation

When a template requires a DS component that needs verification:

```text
Template status: "Approved with limitation"
Limitation: "[Component] requires verification before use. If incompatible → DS Gap."
```

This does not block other aspects of the template — only the unverified component path.
