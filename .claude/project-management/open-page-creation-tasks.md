# Open Page Creation Tasks

_Updated: 2026-06-22_

---

## Active Initiatives

### Inventory — Means of Access Pages

**Route base:** `/manage/inventory/means-of-access`
**Template:** FatlinesListMasterDetailsTemplate (TableFiltersTemplate as starting point, per ManagedAccountsPage pattern)
**Requested:** 2026-06-22 — "תמלא לי את כל ה INVENTORY עם TABLES בדיוק במבנה של MANAGED ACCOUNT אבל בCONTEXT של הדף עם התכנים הרלוונטיים"

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| INV-001 | Build SecretsPage at `/manage/inventory/means-of-access/secrets` | UX Flow | Completed | — | Claude | Done 2026-06-22 |
| INV-002 | Build DiscoveredAccountsPage at `/manage/inventory/means-of-access/discovered-accounts` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: name, platform, address, safe, discovery date, status, risk |
| INV-003 | Build CloudServiceEntitlementsPage at `/manage/inventory/means-of-access/cloud-service-entitlements` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: entitlement, provider, account, permissions, risk, last used |
| INV-004 | Add routes for INV-001–003 to router.tsx | Navigation | Open | Depends on INV-001–003 | Claude | Add after pages are built |

---

### Inventory — Identities Pages

**Route base:** `/manage/inventory/identities`

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| ID-001 | Build UsersPage at `/manage/inventory/identities/users` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: username, type, org, status, risk, last login |
| ID-002 | Build RolesPage at `/manage/inventory/identities/roles` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: role name, scope, members, permissions, risk |
| ID-003 | Build OrganizationsPage at `/manage/inventory/identities/organizations` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: org name, type, members count, risk |
| ID-004 | Build MachineIdentitiesPage at `/manage/inventory/identities/machine-identities` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: identity name, type, platform, cert expiry, risk |

---

### Inventory — AI Pages

**Route base:** `/manage/inventory/ai`

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| AI-001 | Build AIAgentsPage at `/manage/inventory/identities/ai/ai-agents` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: agent name, type, platform, status, risk |
| AI-002 | Build ManagedAIAgentsPage at `/manage/inventory/identities/ai/managed-ai-agents` | UX Flow | Open | Awaiting approval | Claude | Confirm fields |
| AI-003 | Build MCPServersPage at `/manage/inventory/identities/ai/mcp-servers` | UX Flow | Open | Awaiting approval | Claude | Confirm fields |

---

### Inventory — Targets Pages

**Route base:** `/manage/inventory/targets`

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| TGT-001 | Build ApplicationsPage at `/manage/inventory/targets/applications` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: app name, type, owner, platform, risk |
| TGT-002 | Build VirtualMachinesPage at `/manage/inventory/targets/virtual-machines` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: VM name, OS, address, status, risk |

---

## Completed Initiatives

| Initiative | Completed | Notes |
|---|---|---|
| ManagedAccountsPage | 2026-06-21 | Table view + CardListMasterDetails view, Organization column, filters, ellipsis+tooltip |
| RiskManagementPage — Top 5 risk types table | 2026-06-22 | Table with scroll, SeverityBadge, sticky header, ellipsis+tooltip |
| Dark/Light theme system | 2026-06-21 | ThemeProvider, CSS custom properties, localStorage persistence |
| FatlinesListMasterDetailsTemplate | 2026-06-21 | CardListMasterDetailsTemplate refactored to FatLine rows, 3fr/7fr split, body scroll lock |
| Table ellipsis + tooltip rule | 2026-06-22 | @mixin table-cell-truncate, title attr on all string columns, applied to ManagedAccountsPage + SessionDiagnosticsPage |
| FatlinesListMasterDetailsTemplate — Approved Template | 2026-06-22 | Spec written, registered in template-registry.md |
| Page Creation Policy | 2026-06-22 | .claude/policies/page-creation-policy.md created |
| SecretsPage | 2026-06-22 | BriefingBar (providers+status+risk), TableFiltersTemplate, 20 mock rows, StatusIcon extended with secret statuses |

---

## Template

```markdown
### [Page or Feature Name]

**Route:** /manage/...
**Template:** [template name]
**Started:** YYYY-MM-DD

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| P-001 | | | Open | | Claude | |
```

### Status values
`Open` · `In progress` · `Pending approval` · `Blocked` · `Deferred` · `Completed` · `Not applicable`

### Category values
`UX Flow` · `Backend` · `Design System` · `Navigation` · `Localization` · `Permission` · `Data / Mock` · `State` · `Accessibility`
