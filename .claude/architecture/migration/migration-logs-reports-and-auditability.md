# Migration Logs, Reports, and Auditability

**Prototype note:** All log and report content is mock data. No real log artifacts exist. No real downloads. Simulate content only.

---

## What Logs and Reports Exist

| Artifact | When available | Source |
|---|---|---|
| Task execution log | After each backend_operation task completes | CM task artifacts |
| Step summary report | After step completes | Derived from all task records |
| Migration run report | After migration step completes | Full operation summary |
| Post-migration validation report | After post-migration step | Verification results |
| Audit trail | Throughout migration | Tenant event records |

---

## What Is Safe to Show in Prototype

### Safe to show

```text
- Task name and status
- Task start/end timestamps
- Localized result message (e.g. "Connection test passed")
- Warning messages (non-sensitive)
- Step duration
- Count of items processed
- Infrastructure identifiers (e.g. machine name, not internal IDs)
```

### Never show — even in prototype

```text
- Passwords, credentials, tokens, session keys
- SSH private keys (SSH public key is acceptable in appropriate context)
- Raw backend error messages or stack traces
- Internal DynamoDB record IDs
- AWS ARNs or SSM Parameter Store paths
- CM internal task IDs
- SQS/SNS message bodies
- Any PII beyond what the user themselves entered
```

---

## Prototype Mock Log Contract

Mock log data stored in `src/mock/migrationLogsMockData.ts`:

```ts
export interface MigrationLogEntry {
  id: string;
  taskType: string;
  timestamp: string;      // ISO 8601
  status: 'success' | 'warning' | 'failure' | 'info';
  message: string;        // localized, safe — no raw errors
  durationMs?: number;
}

export const mockMigrationLogs: MigrationLogEntry[] = [
  {
    id: 'log-001',
    taskType: 'TestConnectivity',
    timestamp: '2026-06-22T10:00:00Z',
    status: 'success',
    message: 'Connection to H2P services verified successfully.',
    durationMs: 3200,
  },
  // ...
];
```

---

## Log Access Points in UX

| Location | What shows |
|---|---|
| Failed task row | "View details" link → opens task-level log in a drawer or modal |
| Step footer (after step completes) | "View step report" link → opens step summary |
| Migration step footer | "View migration report" link → opens full migration run report |
| Post-migration page | Full validation report |

---

## Report Format

Reports are presented as structured content inside a `DetailsPageTemplate` tab or a `BulkStatusDialogTemplate` result list — not as file downloads in the prototype.

**Prototype:** Render mock report content inline. No file download simulation needed.

---

## Audit Trail

The audit trail records:
- Who triggered what action (user identity — mock in prototype)
- When the action was triggered
- What the outcome was
- Any warnings that were acknowledged

The audit trail is available in the Post-migration step under an "Audit" tab.

**Prototype:** Use `src/mock/migrationAuditMockData.ts` with typed mock entries.

---

## Accessibility

- Log and report content must be keyboard navigable
- StatusIcon in log rows must have `aria-label`
- "View details" / "View report" links must have descriptive accessible labels
- Never expose sensitive data in `aria-label` or `title` attributes
