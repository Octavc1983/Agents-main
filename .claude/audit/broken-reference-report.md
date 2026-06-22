# Broken Reference Report

**Audit Date:** 2026-06-22

---

## Critical: Missing Template Specification Files (5)

These files are referenced by `template-registry.md` as if they exist, but no file was found at the expected path.

| Template | Expected Path | Status in Registry | Impact |
|---|---|---|---|
| CardListMasterDetailsTemplate | `.claude/architecture/templates/CardListMasterDetailsTemplate.md` | Implemented | Skill exists, command exists, but spec missing. Template recognition agent cannot load spec. |
| TableMasterDetailsTemplate | `.claude/architecture/templates/TableMasterDetailsTemplate.md` | Approved | Skill exists, command exists, but spec missing. |
| TilesDashboardTemplate | `.claude/architecture/templates/TilesDashboardTemplate.md` | Specified | Command exists, spec marked as created but missing. |
| CanvasTemplate | `.claude/architecture/templates/CanvasTemplate.md` | Specified | Spec marked as created but missing. |
| ZeroStateConfigurationTemplate | `.claude/architecture/templates/ZeroStateConfigurationTemplate.md` | Specified | Spec marked as created but missing. |

**Source file:** `.claude/architecture/template-registry.md`

**Fix (C2 or separate task):** Create the 5 missing spec files following `FullScreenWizardTemplate.md` format, or update the registry to reflect their actual status as candidates rather than specified/implemented.

---

## Low: Incomplete Skill File (1)

| File | Status | Issue |
|---|---|---|
| `.claude/skills/_templates/dialog-flow-template/README.md` | Created in interrupted B session | Contains full README but is the only file in the folder. The SKILL.md, template-contract.md, state-model.md, navigation-and-validation.md, edge-cases.md, and qa-checklist.md are missing. Will be completed in Task B. |

This is not a broken reference — the README.md is valid. The remaining 6 files are pending creation in Task B.

---

## Verified OK References

| Reference Type | Count | Result |
|---|---|---|
| Agent files referenced by commands | 25 | All exist ✓ |
| Skill files referenced by commands | 35 | All exist ✓ |
| Template specs referenced by skills | 7 implemented | All exist ✓ |
| Decision files referenced by decision-registry.md | 16 | All exist ✓ (DEC-016 newly created) |
| Policy files referenced by CLAUDE.md | 2 | Both exist ✓ |
| Architecture registry files | 7 | All exist ✓ |
| Global UI standard files | 18 | All exist ✓ |
| Tool files | 14 | All exist ✓ |

---

## Recommended Fix Priority

| Priority | Action | File |
|---|---|---|
| High | Create missing spec | `CardListMasterDetailsTemplate.md` |
| High | Create missing spec | `TableMasterDetailsTemplate.md` |
| Medium | Create missing spec OR update status to Candidate | `TilesDashboardTemplate.md` |
| Medium | Create missing spec OR update status to Candidate | `ZeroStateConfigurationTemplate.md` |
| Medium | Create missing spec OR update status to Candidate | `CanvasTemplate.md` |
| Low | Complete skill folder | `dialog-flow-template/` (5 remaining files — Task B) |
