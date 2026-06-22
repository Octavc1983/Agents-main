# Migration State Machine

**Prototype note:** All transitions are simulated. No live backend. Mock data only.

---

## Task Status Values

Tasks use the following statuses (mapped from CM operation statuses):

| Status | When | UX Presentation |
|---|---|---|
| `IDLE` | Task created but not yet triggered | Waiting indicator |
| `PENDING` | Backend operation initiated, awaiting start | Spinner / pending |
| `IN_PROGRESS` | Backend operation actively running | Spinner + elapsed time |
| `SUCCESS` | Operation completed successfully | Success icon |
| `SUCCESS_WITH_WARNINGS` | Completed with warnings | Warning icon |
| `FAILURE` | Operation failed — user must retry | Error icon + retry |
| `TIMEOUT` | Operation timed out | Unknown-outcome state (DEC-004) |

---

## CM Status → Internal Status Mapping

| CM Status | Internal Status | UX State |
|---|---|---|
| PENDING | PENDING | Pending |
| RUNNING | IN_PROGRESS | In progress |
| SUCCEEDED | SUCCESS | Success |
| FAILED | FAILURE | Failure |
| TIMED_OUT | TIMEOUT | Unknown outcome (DEC-004) |
| ABORTED | FAILURE | Failure |
| (unknown) | FAILURE | Failure (safe default) |

**TIMEOUT → unknown-outcome in UX (DEC-004). Never auto-map to failure.**

---

## Logical Parent Status Derivation

Logical parents (ConfigureUploadServer, ConfigureDrServer) are computed at read-time from their subtasks:

| Subtask state | Parent computed status |
|---|---|
| No subtasks | Idle |
| All SUCCESS / SUCCESS_WITH_WARNINGS | Success |
| Any FAILURE / TIMEOUT | Failure |
| All PENDING | Pending |
| All IDLE or mixed IDLE+PENDING | Idle |
| Otherwise | InProgress |

---

## Step Status Derivation

The step status is derived from all real task records (priority order):

1. Any task `IN_PROGRESS` → `IN_PROGRESS`
2. All tasks `SUCCESS` / `SUCCESS_WITH_WARNINGS` → `SUCCESS`
3. Any task `FAILURE` / `TIMEOUT` → `FAILURE`
4. All tasks `IDLE` / `PENDING` → `IDLE`
5. Any task `SUCCESS` / `SUCCESS_WITH_WARNINGS` / `PENDING` → `PENDING`
6. Otherwise → `PENDING`

---

## Step Status → WizardStepStatus Mapping

| Step status | WizardStepStatus |
|---|---|
| IDLE / not started | `not-started` |
| PENDING | `in-progress` |
| IN_PROGRESS | `in-progress` |
| SUCCESS | `completed` |
| SUCCESS_WITH_WARNINGS | `warning` |
| FAILURE | `failed` |
| TIMEOUT | `unknown-outcome` |
| Locked by predecessor | `locked` |
| Blocked by external dependency | `blocked` |
| Cleared by ChooseUploadMachine reset | `reset` |

---

## Update Policies

| Policy | How triggered | Examples |
|---|---|---|
| `user_action` | User submits form/selection via UI | ChooseUploadMachine, ConfigureAdditionalServices |
| `backend_operation` | Pubsub event via SNS/SQS from CM | TestConnectivity, SshOnUploadServer, TestSshConnectivity, CheckDrHardware |

---

## Idempotent Task Creation

Follow-up tasks created as side effects use idempotent creation:
- If task already exists in DB → skip creation, preserve existing status
- If task does not exist → create with IDLE

**Prototype implication:** On retry after failure, previously created follow-up tasks are not recreated. Mock data must simulate this: check if follow-up task already exists before adding it.

---

## Side Effects — Success Paths

| Task | On Success side effects |
|---|---|
| ChooseUploadMachine | Reset all tasks → create TestConnectivity (IDLE) |
| TestConnectivity | Create SshOnUploadServer (IDLE) if not exists |
| SshOnUploadServer | Extract SSH key from artifacts, store in SSM, create DownloadDrSsh (IDLE) + TestSshConnectivity (IDLE) if not exist |
| TestSshConnectivity | Create CheckDrHardware (IDLE) if not exists |
| CheckDrHardware | Create ConfigureAdditionalServices (IDLE) if not exists |

**Prototype:** Simulate side effects by updating mock state after each task completes.

---

## Side Effects — Failure Paths

No automatic side effects on failure. User must retry manually. Step status propagates to FAILURE.
