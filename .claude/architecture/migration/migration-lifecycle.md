# Migration Lifecycle

**Prototype note:** All state transitions are simulated. No live backend. Mock data only.

---

## Migration Steps (in order)

The FullScreenWizardTemplate stepper maps to these steps. Each step is a `FullScreenWizardStep`.

| # | Step ID | Label | Initial Status | User-Facing |
|---|---|---|---|---|
| 1 | `prerequisites` | Prerequisites check | `not-started` | Yes |
| 2 | `configuration` | Configuration | `locked` | Yes |
| 3 | `validation` | System validation | `locked` | Yes |
| 4 | `migration` | Migration | `locked` | Yes |
| 5 | `post-migration` | Post-migration | `locked` | Yes |

Steps unlock sequentially. A step unlocks only when its predecessor reaches `completed` or `completed-with-warning`.

---

## Step Status Values

Each step uses `WizardStepStatus`:

| Status | When |
|---|---|
| `not-started` | Step has not been reached |
| `locked` | Predecessor step not yet complete |
| `ready` | Predecessor complete, user may enter |
| `in-progress` | User is actively working in this step |
| `completed` | All tasks in step succeeded |
| `warning` | Step completed with warnings — user may proceed |
| `failed` | One or more tasks failed — user must resolve |
| `blocked` | External dependency prevents progress |
| `unknown-outcome` | Timeout — outcome not confirmed |
| `skipped` | Step was explicitly skipped (when allowed) |
| `reset` | Downstream reset triggered by ChooseUploadMachine |

---

## Configuration Step — Task Hierarchy

See [configuration-step-context.md](configuration-step-context.md) for the full DynamoDB-backed task model.

Summary:

```
Configuration step
├── Logical parent: ConfigureUploadServer
│   ├── ChooseUploadMachine        (user_action)
│   ├── TestConnectivity           (backend_operation) 🔔
│   └── SshOnUploadServer          (backend_operation) 🔔
├── Logical parent: ConfigureDrServer
│   ├── TestSshConnectivity        (backend_operation) 🔔
│   └── CheckDrHardware            (backend_operation) 🔔
└── Standalone: ConfigureAdditionalServices  (user_action)
```

---

## Step Completion Criteria

| Step | Complete when |
|---|---|
| Prerequisites | All prerequisite checks pass |
| Configuration | ConfigureAdditionalServices reaches SUCCESS |
| Validation | All system validation checks pass |
| Migration | Data migration operation completes (SUCCESS or SUCCESS_WITH_WARNINGS) |
| Post-migration | All post-migration verification tasks complete |

---

## Step Unlocking Rules

```
prerequisites completed → configuration becomes ready
configuration completed → validation becomes ready
validation completed    → migration becomes ready
migration completed     → post-migration becomes ready
```

Partial completion of a step does not unlock the next step.

---

## Back Navigation Per Step

| Step | Back behavior |
|---|---|
| Prerequisites | `allowed-no-reset` |
| Configuration | `allowed-with-downstream-reset` (ChooseUploadMachine resets everything) |
| Validation | `blocked-after-irreversible-action` (once backend validation runs) |
| Migration | `blocked-after-irreversible-action` |
| Post-migration | `allowed-no-reset` (read-only review) |

---

## ChooseUploadMachine Reset Impact

When the user changes the upload machine selection:
- **All** Configuration step task records are deleted
- All subsequent steps reset to `locked`
- All downstream task records are cleared
- User must re-run the entire Configuration step from scratch

This is a consequential action. Prototype must show a reset-impact `ConfirmationDialogTemplate` before executing.

---

## Migration Completion

The migration is considered complete when:
- All required steps reach `completed` or `warning` (with acknowledged warnings)
- Post-migration step is completed

A completion summary screen replaces the stepper content.
Prototype: simulate completion with a mock summary page.
