# Migration Prototype Mock Behavior

This project is a UX prototype. There is no live backend. All operations are simulated.

The prototype must communicate production-grade UX states and transitions using mock data and deterministic simulated behavior.

---

## Prototype Constraint Summary

```text
No real API calls
No real CM operations
No real Pubsub events
No real SSH key generation or SSM storage
No real file uploads or downloads
No real authentication or permission checks

All state transitions → deterministic mock logic
All log/report content → typed mock data from src/mock/
All backend operation results → simulated with mock timer + predefined outcome
```

---

## Mock Data File Structure

```
src/mock/
├── migrationMockData.ts          — tenant migration context, steps, tasks
├── migrationLogsMockData.ts      — task-level log entries
├── migrationAuditMockData.ts     — audit trail entries
└── migrationReportsMockData.ts   — step and run report content
```

All mock data must be:
- Typed (TypeScript interfaces)
- Centralized (not in JSX)
- Domain-specific (realistic field values)
- Never containing real credentials, keys, or PII

---

## Mock Task Status Transitions

### User Action Tasks (ChooseUploadMachine, ConfigureAdditionalServices)

```ts
// Simulate form submission
const handleSubmit = async () => {
  setTaskStatus('submitting');
  await mockDelay(1000);
  setTaskStatus('SUCCESS'); // deterministic — always succeeds in happy path scenario
  applySuccessSideEffects(); // simulate creating follow-up tasks
};
```

### Backend Operation Tasks (TestConnectivity, SshOnUploadServer, etc.)

```ts
// Simulate Pubsub-triggered backend operation
const simulateBackendOp = async (taskType: string) => {
  setTaskStatus(taskType, 'PENDING');
  await mockDelay(500); // simulate operation start
  setTaskStatus(taskType, 'IN_PROGRESS');
  await mockDelay(2500); // simulate operation running

  // Predefined outcome per scenario
  const outcome = getMockOutcome(taskType, currentScenario);
  setTaskStatus(taskType, outcome); // 'SUCCESS' | 'FAILURE' | 'TIMEOUT'

  if (outcome === 'SUCCESS') {
    applySuccessSideEffects(taskType); // create follow-up tasks
  }
};
```

---

## Required Mock Scenarios

Every backend_operation task must have mock scenarios for:

| Scenario | Outcome | Purpose |
|---|---|---|
| Happy path | SUCCESS | Normal flow demonstration |
| Single failure | FAILURE on one task | Retry flow demonstration |
| Timeout | TIMEOUT on one task | Unknown-outcome flow demonstration |
| Recovery | FAILURE → retry → SUCCESS | Recovery UX demonstration |
| ChooseUploadMachine reset | SUCCESS → reset all downstream | Reset impact demonstration |

---

## Mock Scenario Selector

The prototype should include a development-only scenario selector (invisible in product UI — code constant, not a visible button per CLAUDE.md rules):

```ts
// In development constants file — not in visible UI
export const MOCK_SCENARIO: MigrationScenario = 'happy-path';
// Options: 'happy-path' | 'connectivity-failure' | 'ssh-failure' | 'timeout' | 'partial-warning'
```

---

## ChooseUploadMachine Mock

```ts
const handleChooseUploadMachine = async (connectorId: string, connectorName: string) => {
  setIsSubmitting(true);
  await mockDelay(1000);

  // Simulate reset: clear all existing tasks
  clearAllConfigurationTasks();

  // Create new task records
  setTask('ChooseUploadMachine', { status: 'SUCCESS', extra_data: { connectorId, connectorName } });
  setTask('TestConnectivity', { status: 'IDLE' });

  setIsSubmitting(false);

  // Auto-trigger TestConnectivity
  simulateBackendOp('TestConnectivity');
};
```

---

## Prototype State Persistence

The migration wizard must support simulated session resume:

```ts
// Persist mock state to localStorage during prototype
const saveMockState = (state: MigrationMockState) => {
  localStorage.setItem('migration-mock-state', JSON.stringify(state));
};

const loadMockState = (): MigrationMockState | null => {
  const saved = localStorage.getItem('migration-mock-state');
  return saved ? JSON.parse(saved) : null;
};
```

On wizard mount: load saved state if available. If no saved state: start from initial state.

---

## Prototype-Safe Wording

All implementation notes for migration prototype code must include:

```text
// Simulated operation state — mock result — no live backend
// Prototype-only state transition
```

---

## Prototype Timing Constants

```ts
export const MOCK_DELAYS = {
  userActionSubmit:   1000,  // ms — form submission simulation
  backendOpStart:      500,  // ms — operation start simulation
  backendOpRunning:   2500,  // ms — operation running simulation
  timeoutThreshold:  30000,  // ms — when to show unknown-outcome
} as const;
```
