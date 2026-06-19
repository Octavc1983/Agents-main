# Feature API Registry

Tracks feature-level API contracts and their consumers. These are proposals for consistent request/response shapes, not live backend integrations.

---

## Scans API (Candidate)

### Domain
Scans

### Consumers
- ScansPage (current)

### Draft Contract

```ts
export type ScanListQuery = {
  search?: string;
  statuses?: ScanStatus[];
  providers?: CloudProvider[];
  page?: number;
  pageSize?: number;
  sortBy?: keyof Scan;
  sortDirection?: 'asc' | 'desc';
};

export type ScanListItem = {
  id: string;
  name: string;
  provider: CloudProvider;
  scanType: ScanType;
  status: ScanStatus;
  lastRun: string;
  findingsCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
};

export type ScanListResponse = {
  items: ScanListItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type ScanDetailsResponse = Scan;
```

### Ownership
Prototype domain layer → future backend integration

### Status
Candidate — awaiting second consumer before promotion

---

_Additional API contracts are added here when the Shared Architecture Agent identifies repeated domain access patterns._
