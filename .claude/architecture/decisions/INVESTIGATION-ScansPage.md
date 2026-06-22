---
name: INVESTIGATION-ScansPage
type: investigation
status: decision-needed
created: 2026-06-22
---

# ScansPage Investigation

## Summary

ScansPage files were **intentionally deleted** in commit `da32a35` ("QA") on 2026-06-22.
The route `/manage/scans` still exists in `navConfig.ts` and will render the `ComingSoonPage` wildcard fallback.

---

### Investigation Results

| Check | Result | Evidence | Decision Needed |
|---|---|---|---|
| Route in router.tsx | Not registered | No `ScansPage` import in `router.tsx` | — |
| Route in navConfig.ts | Present | `path: "/manage/scans"` at line 349 | Keep or remove? |
| Page files on disk | Missing | `src/pages/ScansPage/` does not exist | — |
| Git history | Files deleted in commit `da32a35` "QA" | `D src/pages/ScansPage/ScansPage.tsx`, `D src/pages/ScansPage/ScansPage.scss` | — |
| Prior commits | Files existed in commits `874ada2` and `490c27a` | `agents-ux`, `Agents` | Restore from git if needed |
| Imports elsewhere | None found | No file in `src/` imports `ScansPage` | — |
| README / docs | No dedicated documentation found | — | — |
| Wildcard fallback | Active | `/manage/scans` renders `ComingSoonPage` via `path: '*'` | No broken UI |

---

### Possible Outcomes

| Outcome | Required Action |
|---|---|
| Intentionally removed — page will not be rebuilt | Remove `path: "/manage/scans"` from `navConfig.ts` after approval |
| Intentionally removed — will be rebuilt later | Keep navConfig entry as-is; open new page creation task |
| Accidentally deleted during QA cleanup | Restore from `git checkout da32a35~1 -- src/pages/ScansPage/` after approval |

---

### Current Safe State

No broken imports. No TypeScript errors. The wildcard route handles `/manage/scans` gracefully with `ComingSoonPage`.

**No action required until product owner confirms the intended outcome above.**
