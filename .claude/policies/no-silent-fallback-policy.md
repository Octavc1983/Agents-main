# No Silent Fallback Policy

## Rule

When an approved Design System component, token, icon, mock-data contract, localization key, state pattern, or API contract is missing:

```text
Stop → Report a structured gap → Wait for approval
```

Do not:

```text
- Invent a local replacement
- Create a local version of a DS component
- Hardcode values that should come from tokens
- Create mock data inline in JSX
- Hardcode user-facing copy outside the localization system
- Use a workaround CSS override instead of requesting a DS variant
```

---

## Required Gap Report Format

### DS Gap

```markdown
## DS Gap: [ID]

**Missing capability:** [what is needed]
**Affected page/component:** [where]
**Workaround attempted:** none — blocked per policy
**Requested from DS team:** [approved variant or new API]
```

### Architecture Gap

```markdown
## Architecture Gap: [ID]

**Missing:** [component, contract, or API]
**Needed for:** [page or feature]
**Reuse evidence:** [number of call sites that would use this]
**Requested:** [what decision is needed]
```

---

## Known Active DS Gaps

- DS-GAP-001 — Risk Status Icon semantic mapping
- DS-GAP-002 — Risk Chart semantic token API

---

## Capability Gap (not blocking)

When a capability does not exist but is not DS-owned:

```text
Report: "This capability is not available in the current prototype.
Safe threshold: [describe limit].
Open capability gap: [describe what would be needed for full support]."
```

Example: virtualization is not available — CSS scroll only, safe for ~200 items.
