# Recommended Follow-Up Actions

**Audit Date:** 2026-06-22
**Based on:** C1 scan and classification

---

## Immediate (Task B — in progress)

| ID | Action | Target | Blocking? |
|---|---|---|---|
| B-01 | Complete `dialog-flow-template/` skill folder | `.claude/skills/_templates/dialog-flow-template/` | Yes — README exists, 6 files missing |
| B-02 | Create `ConfirmationDialogTemplate` architecture spec + skill folder | `.claude/architecture/templates/` + `.claude/skills/_templates/` | No |
| B-03 | Create `BulkStatusDialogTemplate` architecture spec + skill folder | `.claude/architecture/templates/` + `.claude/skills/_templates/` | No |
| B-04 | Create `DetailsPageTemplate` architecture spec + skill folder | `.claude/architecture/templates/` + `.claude/skills/_templates/` | No |
| B-05 | Register TPL-002 through TPL-005 in template-registry.md | `.claude/architecture/template-registry.md` | No |
| B-06 | Update memory/project-templates-registry.md | Memory index | No |

---

## High Priority (Separate Task — Before C2)

| ID | Action | Target | Reason |
|---|---|---|---|
| REF-01 | Create `CardListMasterDetailsTemplate.md` spec | `.claude/architecture/templates/` | Skill + command exist; spec missing. Template recognition cannot load template logic. |
| REF-02 | Create `TableMasterDetailsTemplate.md` spec | `.claude/architecture/templates/` | Same as above |
| REF-03 | Update `TilesDashboardTemplate` status in registry to `Candidate` OR create spec | `template-registry.md` | Currently shows "Specified" but spec does not exist |
| REF-04 | Update `ZeroStateConfigurationTemplate` status in registry to `Candidate` OR create spec | `template-registry.md` | Same |
| REF-05 | Update `CanvasTemplate` status in registry to `Candidate` OR create spec | `template-registry.md` | Same |

---

## C2 — Normalize Policies and Memory

| ID | Action | Target |
|---|---|---|
| C2-01 | Create 15 missing policy files | `.claude/policies/` (design-system, navigation, validation, localization, mock-data, dark-mode, scrolling, status-indicator, no-silent-fallback, minimal-layering, accessibility, secrets, component-ownership, screenshot-layout, quality-gates) |
| C2-02 | Refactor CLAUDE.md to short entry point | Root CLAUDE.md |
| C2-03 | Refactor AGENTS.md to agent index only | Root AGENTS.md |
| C2-04 | Create normalized `.claude/memory/` structure | `.claude/memory/` |
| C2-05 | Move project architecture facts to memory files | From CLAUDE.md and AGENTS.md |

---

## C3 — Archive and Final Validation

| ID | Action | Target |
|---|---|---|
| C3-01 | Create `.claude/_archive/` structure | If any legacy content is found during C2 |
| C3-02 | Run broken-link scan after all C2 changes | All `.claude/` files |
| C3-03 | Verify all active commands reference active files | After C2 |
| C3-04 | Verify DEC-016 references are intact | After all changes |

---

## Protected — Do Not Touch

| Item | Reason |
|---|---|
| DEC-016 and its decision file | Active user-approved decision — Add Account = FullScreenWizardTemplate |
| All 7 implemented template specs | Active and correct |
| All 25 agents | Active and linked correctly |
| All 35 skills | Active and linked correctly |
| All 31 commands | Active and linked correctly |
| `decision-registry.md` DEC-001 through DEC-016 | All active |
