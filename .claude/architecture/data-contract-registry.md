# Data Contract Registry

Tracks shared domain types, view models, data adapters, and API contract candidates. Updated by the Shared Architecture Agent.

---

## Shared Domain Types

| Type | Path | Consumers | Status |
|---|---|---|---|
| Scan | src/types/prototype.types.ts | ScansPage | Active |
| ScanStatus | src/types/prototype.types.ts | ScansPage | Active |
| ScanSeverity | src/types/prototype.types.ts | ScansPage | Active |
| ScanType | src/types/prototype.types.ts | ScansPage | Active |
| ABTest | src/types/prototype.types.ts | ABTestingPage | Active |
| AccountUser | src/types/prototype.types.ts | AccountSettingsPage | Active |

---

## Shared View Models

_None yet. Candidates are identified when the same normalized shape appears in 2+ pages._

---

## Shared Data Adapters

_None yet. Candidates are identified when the same transformation appears in 2+ places._

---

## API Contract Candidates

| Domain | Consumers | Candidate Shape | Approval |
|---|---|---|---|
| Scans | ScansPage | ScanListQuery / ScanListResponse / ScanDetailsResponse | Pending |

---

## Notes

The Scans domain is the first candidate for a shared API contract. The mock data in `src/mock/prototypeMockData.ts` already defines a `Scan` entity with consistent fields. A `ScansApi` contract should be proposed when a second consumer (e.g. a Findings page or Dashboard) appears.
