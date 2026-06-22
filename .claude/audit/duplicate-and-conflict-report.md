# Duplicate and Conflict Report

**Audit Date:** 2026-06-22

---

## Duplicates

### None Found

Scanned all 163 files for:
- Duplicate rule text across CLAUDE.md, AGENTS.md, agent files, skill files, command files, global-ui-standards
- Duplicate template descriptions across registry and skill files
- Duplicate command names with different target files
- Duplicate decision records

**Result:** No exact or near-exact duplicates found.

**Note for C2:** Rules currently embedded in CLAUDE.md and AGENTS.md are not duplicated — they are the canonical source. C2 will extract them to `.claude/policies/` and replace with references. This is normalization, not duplicate resolution.

---

## Conflicts

### None Found

Scanned for conflicting rules in:
- Template selection logic (which template for which use case)
- Navigation rules
- State persistence rules
- Screenshot interpretation rules
- DS component usage rules
- Localization rules
- Mock data rules

**Result:** No conflicting rules found. All template selection rules are distinct and non-overlapping. Decision registry has zero active conflicts (conflicts/README.md is empty).

---

## Near-Overlaps Noted for C2 (Not Conflicts)

These are related but not conflicting — C2 should ensure they reference each other cleanly:

| Area | Files | Relationship |
|---|---|---|
| DS consume-only rule | CLAUDE.md + `decisions/design-system/ds-consume-only.md` + `ux-component-standards.md` | CLAUDE.md and policy file state the same rule; C2 should make CLAUDE.md reference the policy file |
| No-inline-styles rule | CLAUDE.md + `decisions/frontend/no-inline-styles.md` | Same pattern — CLAUDE.md should reference the decision |
| Screenshot layout rule | `policies/page-creation-policy.md` + CLAUDE.md section | Consistent; C2 should consolidate to one canonical policy reference |
| Scroll ownership rule | `global-ui-standards/spacing-and-layout.md` + individual template specs | Consistent; template specs cite the rule correctly |

---

## Template Detection — No Overlaps

| Template | Trigger Signals | Distinct from Others? |
|---|---|---|
| FullScreenWizardTemplate | Sequential dependent steps, backend ops, irreversible stages | Yes |
| FullScreenFormTemplate | Create/edit single entity, all content in one form | Yes |
| VerticalTabsConfigurationTemplate | Multiple independent config sections, free navigation | Yes |
| WizardTemplate (modal) | 2–4 steps, no backend ops, fits in modal | Yes |
| TableFiltersTemplate | Table + filters + search | Yes |
| CardListMasterDetailsTemplate | Card list + details panel, 30/70 split | Yes |
| HalfDashboardTemplate | KPI tiles + chart + metrics sidebar above fold | Yes |
| FatlinesListMasterDetailsTemplate | Dense entity rows + master details | Yes |
| DialogFlowTemplate (candidate) | Focused modal dialog, limited scope, NOT account creation | Yes (DEC-016 explicitly excludes account creation) |
| ConfirmationDialogTemplate (candidate) | Destructive action confirmation | Yes |
| BulkStatusDialogTemplate (candidate) | Async multi-entity operation results | Yes |
| DetailsPageTemplate (candidate) | Single entity full-page details | Yes |

No detection overlap found between any two templates.
