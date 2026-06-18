# /figma-reference

## Purpose

Load and display the project's Figma-to-React reference documentation.

Use this command to inspect, refresh, or verify the project's component mapping, token mapping, icon system, implementation checklist, and historical screen mappings — before starting any Figma or page implementation work.

---

## When to Use

```text
Before /ux-add-page         — verify component and token availability
Before /figma-map-components — load baseline reference for mapping
Before /figma-build-page    — confirm what exists before generating
Before /figma-align         — verify token mappings against live Figma
After adding new components — update component-mapping.md
After a new screen mapping  — add entry to figma-screen-mapping.md
```

---

## Skill to Use

```text
.claude/skills/_figma/figma-project-reference/SKILL.md
```

---

## Optional Arguments

```text
/figma-reference                   — load all 5 reference files and summarize
/figma-reference components        — load component-mapping.md only
/figma-reference tokens            — load token section from component-mapping.md
/figma-reference checklist         — load figma-to-react-checklist.md only
/figma-reference sidebar           — load navigation-sidebar-mapping.md only
/figma-reference scans             — load figma-screen-mapping.md only
/figma-reference update <file>     — update a specific reference file with new findings
```

---

## Reference Files

All files are at `.claude/skills/_figma/figma-project-reference/`:

| File | Contents |
|---|---|
| `component-mapping.md` | Figma component → React component mapping, props, variants, SCSS classes, decision tree |
| `figma-mcp-guidelines.md` | Figma MCP workflow: read frame → map layers → identify tokens → generate code |
| `figma-to-react-checklist.md` | 10-phase implementation checklist (analysis → handoff) |
| `figma-screen-mapping.md` | ScansPage screen mapping: layout, components, icons, tokens, pixel-perfect gaps |
| `navigation-sidebar-mapping.md` | Sidebar dark theme mapping: IDIRA dark navy, SVG icons, before/after token diff |

---

## Required Workflow

### Step 1 — Load Reference Skill

Run **Figma Project Reference Skill** (`.claude/skills/_figma/figma-project-reference/SKILL.md`).

Read all reference files relevant to the requested argument (or all five if no argument given).

### Step 2 — Summarize

Output a structured summary:

```markdown
### Figma Reference Loaded

#### Components Available
| Component | Import Path | Variants |
|---|---|---|

#### Design Tokens Available
| Token type | Variable format | Example |
|---|---|---|

#### Icons Available
| Category | Examples |
|---|---|

#### Screen Mappings on Record
| Page | Figma source | Status |
|---|---|---|

#### Checklist Phases
List the 10 phases from figma-to-react-checklist.md

#### Active Constraints
- SVG icons only
- No inline styles
- No hardcoded values
- No new DS components
- Sidebar: prototypeMockData.ts only

#### Gaps / Needs Update
List anything that seems outdated or missing.
```

### Step 3 — If `update` argument provided

Read the specified reference file.
Apply the requested update.
Confirm what changed.

---

## Restrictions

- Do not modify reference files unless `/figma-reference update <file>` is explicitly called
- Do not implement any page or component as part of this command
- Do not invent component mappings — only report what is verified in the reference files
- Do not move or rename reference files

---

## Related Commands

```text
/figma-scan          — scan a Figma frame via MCP before mapping
/figma-map-components — map Figma frame to existing Infra components
/map-components      — map a written requirement to existing components
/figma-build-page    — build a page from Figma (uses this reference automatically)
/figma-align         — visual alignment check of a built page against Figma
/ux-add-page         — full page creation workflow (uses this reference in Step 1)
```
