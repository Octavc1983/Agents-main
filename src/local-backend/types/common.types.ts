export interface SoftDeletable {
  deletedAt: string | null;
}

export interface Versioned {
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface Safe {
  id: string;
  name: string;
  description?: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  displayName: string;
}

export interface TagCatalogEntry {
  id: string;
  key: string;
  value?: string;
  displayKey?: string;
  displayValue?: string;
  source: 'manual' | 'oob' | 'external';
  usageCount: number;
  isSelectable: boolean;
  isRemovable: boolean;
}

export interface AuditEvent {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  actorId: string;
  timestamp: string;
  payload: Record<string, unknown>;
}

export interface IdempotencyRecord {
  key: string;
  entityId: string;
  resolvedAt: string;
}
