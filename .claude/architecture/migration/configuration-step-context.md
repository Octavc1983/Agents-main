# Migration Context — Configuration Step Architecture

**Source:** Backend domain specification (provided 2026-06-22)
**Prototype note:** This project is a UX prototype with mock data only. No live backend exists. All state transitions must be simulated with deterministic mock behavior that is production-grade in UX and state accuracy.

---

## Task Hierarchy

### Logical Parents (computed at read-time, not stored in DB)
- `ConfigureUploadServer` — groups ChooseUploadMachine + TestConnectivity + SshOnUploadServer
- `ConfigureDrServer` — groups TestSshConnectivity + CheckDrHardware

### Real Tasks (stored in DynamoDB)

#### Under ConfigureUploadServer
| Task | Initial Status | Update Policy | Pubsub? |
|---|---|---|---|
| ChooseUploadMachine | IDLE | user_action | No |
| TestConnectivity | PENDING | backend_operation | Yes — TEST_CONNECTIVITY |
| SshOnUploadServer | PENDING | backend_operation | Yes — SSH_ON_UPLOAD_SERVER |

#### Under ConfigureDrServer
| Task | Initial Status | Update Policy | Pubsub? |
|---|---|---|---|
| TestSshConnectivity | PENDING | backend_operation | Yes — TEST_SSH_CONNECTIVITY |
| CheckDrHardware | PENDING | backend_operation | Yes — CHECK_DR_HARDWARE |

#### Standalone
| Task | Initial Status | Update Policy | Pubsub? |
|---|---|---|---|
| ConfigureAdditionalServices | IDLE | user_action | No |

---

## Status Derivation Rules

### Logical Parent Status (computed from subtasks)
| Subtask state | Parent status |
|---|---|
| No subtasks | Idle |
| All subtasks Success/SuccessWithWarnings | Success |
| Any subtask Failure/Timeout | Failure |
| All subtasks Pending | Pending |
| All subtasks Idle or Pending (mixed) | Idle |
| Otherwise | InProgress |

### Step Status (from all real task records, priority order)
1. Any task IN_PROGRESS → IN_PROGRESS
2. All tasks SUCCESS/SUCCESS_WITH_WARNINGS → SUCCESS
3. Any task FAILURE/TIMEOUT → FAILURE
4. All tasks IDLE/PENDING → IDLE
5. Any task SUCCESS/SUCCESS_WITH_WARNINGS/PENDING → PENDING
6. Otherwise → PENDING

---

## Task Flow Order

```
ChooseUploadMachine (user_action, IDLE → SUCCESS)
  → Creates TestConnectivity (IDLE)

TestConnectivity (backend_op, PENDING → SUCCESS/FAILURE) 🔔
  → On Success: Creates SshOnUploadServer (IDLE)
  → On Failure: User must retry

SshOnUploadServer (backend_op, IDLE → SUCCESS/FAILURE) 🔔
  → On Success:
      Extracts SSH public key from CM artifacts
      Stores key in SSM Parameter Store
      Creates DownloadDrSsh (IDLE)
      Creates TestSshConnectivity (IDLE)
  → On Failure: No follow-up tasks

TestSshConnectivity (backend_op, IDLE → SUCCESS/FAILURE) 🔔
  → On Success: Creates CheckDrHardware (IDLE)
  → On Failure: No follow-up tasks

CheckDrHardware (backend_op, IDLE → SUCCESS/FAILURE) 🔔
  → On Success: Creates ConfigureAdditionalServices (IDLE)
  → On Failure: No follow-up tasks

ConfigureAdditionalServices (user_action, IDLE → SUCCESS)
  → Final task — Configuration step complete
```

---

## CM Status Mapping

| CM Status | Internal Status |
|---|---|
| PENDING | PENDING |
| RUNNING | IN_PROGRESS |
| SUCCEEDED | SUCCESS |
| FAILED | FAILURE |
| TIMED_OUT | TIMEOUT |
| ABORTED | FAILURE |
| (unknown) | FAILURE (default) |

**Prototype rule:** TIMEOUT maps to `unknown-outcome` in UX, not to `failed`. Do not auto-fail on timeout. (DEC-004)

---

## ChooseUploadMachine — Reset Behavior

This task resets the entire Configuration step when executed:

**Success path:**
1. DELETE all existing TaskRecords for this tenant
2. CREATE ChooseUploadMachine (SUCCESS) with connector_id + connector_name in extra_data
3. CREATE TestConnectivity (IDLE)
4. UPDATE TenantRecord: connector_id, current_step=CONFIGURATION, step_status

**Failure path:**
1. DELETE all existing TaskRecords
2. CREATE ChooseUploadMachine (FAILURE) with error_message
3. UPDATE TenantRecord: step_status=FAILURE

**UX implication:** Selecting a new machine wipes all previous configuration progress. Prototype must show a reset-impact confirmation before the user proceeds (FullScreenWizardTemplate `backBehavior: allowed-with-downstream-reset`).

---

## Idempotent Task Creation (create_idle_tasks)

When follow-up tasks are created as side effects:
- Check if task already exists in DB
- If exists: skip creation, preserve existing status
- If not exists: create with IDLE

**Prototype implication:** On retry of a failed backend_operation task, previously created follow-up tasks are not recreated. Mock data must simulate this idempotent behavior.

---

## Prototype State Machine for Mock Data

States to simulate per task:
```text
IDLE       → task exists, ready for user action or awaiting trigger
PENDING    → backend operation initiated, waiting for result
IN_PROGRESS → operation actively running
SUCCESS    → operation completed successfully
FAILURE    → operation failed, user must retry
TIMEOUT    → operation timed out → show unknown-outcome in UX (DEC-004)
```

Mock transitions to implement:
```text
User clicks ChooseUploadMachine → simulate validation → SUCCESS + reset
User clicks Retry TestConnectivity → PENDING → (simulated delay) → SUCCESS or FAILURE
User clicks ConfigureAdditionalServices → SUCCESS → Configuration step complete
Backend tasks → simulate Pubsub result via deterministic mock timer
```

---

## Handlers Reference

| Task | Handler |
|---|---|
| ChooseUploadMachine | ChooseUploadMachineHandler |
| TestConnectivity | CheckConnectivityConfigurationResultHandler |
| SshOnUploadServer | ConfigureSshResultHandler |
| TestSshConnectivity | CheckSshConnectivityResultHandler |
| CheckDrHardware | CheckDrHardwareResultHandler |
| ConfigureAdditionalServices | ConfigureAdditionalServicesHandler |

---

## Related Template
`FullScreenWizardTemplate` — Configuration step is a Wizard step in the H2P Migration flow.

## Related Decision
DEC-016 — H2P Migration uses FullScreenWizardTemplate, not dialog.

## Related DS Gaps
DS-GAP-001, DS-GAP-002 — Risk Status Icon and Risk Chart gaps (separate domain).
