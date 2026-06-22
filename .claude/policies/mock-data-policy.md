# Mock Data Policy

## This Project Is a UX Prototype

There is no live backend, server, API, or real asynchronous operation.

All state transitions must be simulated with deterministic mock logic that is production-grade in UX and state accuracy.

```text
Do not present mock behavior as a real backend integration.
```

---

## Mock Data Rules

Mock data must be:

```text
- Typed (TypeScript interfaces)
- Centralized (not in JSX)
- Reusable (not duplicated per component)
- Domain-specific (realistic field values)
- Stored outside page/component JSX
- Never stored inside the Design System package
```

---

## Mock Data Must Never Contain

```text
- Real secrets, passwords, or credentials
- Real SSH private keys
- Real stack traces
- Real internal system IDs
- Real PII
```

---

## Mock Data File Conventions

```text
src/mock/
├── [domain]MockData.ts     — domain-level mock entities
├── [domain]LogsMockData.ts — mock log entries for domain
└── [domain]ReportsMockData.ts — mock report content
```

---

## Simulated Backend Operations

Backend operations must be simulated with:

```ts
// Simulate Pubsub-triggered backend operation
setTaskStatus('PENDING');
await mockDelay(500);
setTaskStatus('IN_PROGRESS');
await mockDelay(2500);
const outcome = getMockOutcome(taskType, currentScenario);
setTaskStatus(outcome);
```

Implementation notes must include:

```text
// Simulated operation state — mock result — no live backend
// Prototype-only state transition
```

---

## Mock Scenario Selector

Development scenario selectors must be code constants — not visible UI buttons:

```ts
// In development constants file — not in visible UI
export const MOCK_SCENARIO: ScenarioType = 'happy-path';
```
