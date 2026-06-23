# Open Page Creation Tasks

_Updated: 2026-06-23_

---

## Active Initiatives

### Navigation — Router Wiring + Corrections

**Scope:** `src/app/router.tsx`, `src/navigation/navConfig.ts`
**Started:** Not started

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| NAV-001 | Wire ScansPage to `/manage/scans` in router.tsx (page already exists, just not routed) | Navigation | Open | — | Claude | Add route entry |
| NAV-002 | Fix CP applications hardcoded path in navConfig.ts (`/manage/inventory/identities/users` → correct path) | Navigation | Open | Need correct target path | Product | Confirm destination route |
| NAV-003 | Define which routes stay as ComingSoonPage vs need real pages | Navigation | Open | Product decision | Product | Produce route → page mapping |
| NAV-004 | Verify active sidebar highlight for all implemented routes | Navigation | Open | — | Claude | Walk through each route, check resolveActiveNavigationState |

---

### Inventory — Means of Access Pages

**Route base:** `/manage/inventory/means-of-access`
**Template:** FatlinesListMasterDetailsTemplate

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| INV-001 | SecretsPage at `/manage/inventory/means-of-access/secrets` | UX Flow | Completed | — | Claude | Done 2026-06-22 |
| INV-002 | DiscoveredAccountsPage at `/manage/inventory/means-of-access/discovered-accounts` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: name, platform, address, safe, discovery date, status, risk |
| INV-003 | CloudServiceEntitlementsPage at `/manage/inventory/means-of-access/cloud-service-entitlements` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: entitlement, provider, account, permissions, risk, last used |
| INV-004 | Add routes for INV-002–003 to router.tsx | Navigation | Open | Depends on INV-002–003 | Claude | Add after pages are built |

---

### Inventory — Identities Pages

**Route base:** `/manage/inventory/identities`

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| ID-001 | UsersPage at `/manage/inventory/identities/users` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: username, type, org, status, risk, last login |
| ID-002 | RolesPage at `/manage/inventory/identities/roles` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: role name, scope, members, permissions, risk |
| ID-003 | OrganizationsPage at `/manage/inventory/identities/organizations` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: org name, type, members count, risk |
| ID-004 | MachineIdentitiesPage at `/manage/inventory/identities/machine-identities` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: identity name, type, platform, cert expiry, risk |

---

### Inventory — AI Pages

**Route base:** `/manage/inventory/ai`

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| AI-001 | AIAgentsPage at `/manage/inventory/identities/ai/ai-agents` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: agent name, type, platform, status, risk |
| AI-002 | ManagedAIAgentsPage at `/manage/inventory/identities/ai/managed-ai-agents` | UX Flow | Open | Awaiting approval | Claude | Confirm fields |
| AI-003 | MCPServersPage at `/manage/inventory/identities/ai/mcp-servers` | UX Flow | Open | Awaiting approval | Claude | Confirm fields |

---

### Inventory — Targets Pages

**Route base:** `/manage/inventory/targets`

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| TGT-001 | ApplicationsPage at `/manage/inventory/targets/applications` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: app name, type, owner, platform, risk |
| TGT-002 | VirtualMachinesPage at `/manage/inventory/targets/virtual-machines` | UX Flow | Open | Awaiting approval | Claude | Confirm fields: VM name, OS, address, status, risk |

---

## Completed Initiatives

| Initiative | Completed | Notes |
|---|---|---|
| Phase A–D Cleanup (A1/A2/B/C/D) | 2026-06-23 | ModalProvider tokens, shared provider icons, usePopoverPosition hook, Tags domain, legacy mock deletion |
| Local Backend foundation + Accounts migration | 2026-06-22 | src/local-backend/, AccountEntity, safety kernel, event bus, useManagedAccounts |
| ManagedAccountsPage | 2026-06-21 | Table view + FatLines Master Details, filters, tag management, create wizard |
| RiskManagementPage — Top 5 risk types table | 2026-06-22 | Table with scroll, SeverityBadge, sticky header, ellipsis+tooltip |
| Dark/Light theme system | 2026-06-21 | ThemeProvider, CSS custom properties, localStorage persistence |
| FatlinesListMasterDetailsTemplate | 2026-06-21 | Refactored to FatLine rows, 3fr/7fr split, body scroll lock |
| Table ellipsis + tooltip rule | 2026-06-22 | @mixin table-cell-truncate, title attr on all string columns |
| FatlinesListMasterDetailsTemplate — Approved Template | 2026-06-22 | Spec written, registered in template-registry.md |
| Page Creation Policy | 2026-06-22 | .claude/policies/page-creation-policy.md created |
| SecretsPage | 2026-06-22 | BriefingBar (providers+status+risk), TableFiltersTemplate, 20 mock rows, StatusIcon extended |

---

## Status values
`Open` · `In progress` · `Pending approval` · `Blocked` · `Deferred` · `Completed` · `Not applicable`

## Category values
`UX Flow` · `Backend` · `Design System` · `Navigation` · `Localization` · `Permission` · `Data / Mock` · `State` · `Accessibility`
