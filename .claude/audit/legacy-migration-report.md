# Legacy Migration Report

**Audit Date:** 2026-06-22

---

## Legacy Candidates Found

**None.**

Scanned all 163 files for every legacy indicator:

| Indicator | Found? |
|---|---|
| "screenshots may define colors or theme" | No |
| "local DS component styling overrides are acceptable" | No |
| "page-local mock data in JSX is allowed" | No |
| "full-page scrolling is preferred" | No |
| "Wizard replaces AppShell or Sidebar" | No |
| "Sidebar navigation changes per Wizard step" | No |
| "retry allowed after timeout without backend confirmation" | No |
| "timeout equals failure" | No |
| "local duplicate components are acceptable" | No |
| "hardcoded hex values allowed when DS tokens missing" | No |
| "local visual fallback acceptable without DS Gap" | No |
| References to removed DS packages or old import paths | No |
| Commands referencing non-existent files | No |
| Agents using superseded architecture | No |

---

## Archive Actions

**None required at this stage.**

No content requires archiving.

---

## `.claude/_archive/` Status

Not yet created. Will be created in C3 only if legacy content is identified during C2 normalization.

**Current expectation:** C3 archive will be minimal. The `.claude/` directory is well-maintained with no accumulated legacy debt.

---

## Content That Will Move in C2 (Not Legacy — Normalization)

| Content | Current Location | Target in C2 | Reason |
|---|---|---|---|
| DS consume-only rule | CLAUDE.md | `.claude/policies/design-system-policy.md` | Normalization to policy layer |
| No inline styles rule | CLAUDE.md | `.claude/policies/design-system-policy.md` | Normalization |
| SVG-only rule | CLAUDE.md | `.claude/policies/design-system-policy.md` | Normalization |
| Screenshot layout rule | CLAUDE.md + `page-creation-policy.md` | `.claude/policies/screenshot-layout-policy.md` | Normalization |
| Localization rule | CLAUDE.md | `.claude/policies/localization-policy.md` | Normalization |
| Mock data rule | CLAUDE.md | `.claude/policies/mock-data-policy.md` | Normalization |
| Dark mode readiness rule | CLAUDE.md | `.claude/policies/dark-mode-policy.md` | Normalization |
| Scroll ownership rule | CLAUDE.md + template specs | `.claude/policies/scrolling-and-layout-policy.md` | Normalization |
| Status indicator rule | CLAUDE.md | `.claude/policies/status-indicator-policy.md` | Normalization |
| No silent fallback rule | CLAUDE.md | `.claude/policies/no-silent-fallback-policy.md` | Normalization |

These moves are C2 tasks. They are not archiving — the rules will remain active in their new canonical location.
