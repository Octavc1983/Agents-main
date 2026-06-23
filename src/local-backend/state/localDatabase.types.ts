import type { Safe, Organization, User, AuditEvent, IdempotencyRecord } from '../types/common.types';
import type { SoftDeletable, Versioned } from '../types/common.types';
import type { TagEntity } from '../types/tag.types';

export interface AccountEntity extends SoftDeletable, Versioned {
  id: string;
  name: string;
  accountType: string;
  platform: string;
  address: string;
  status: string;
  ownerId: string;
  safeId: string;
  organizationId?: string;
  tagIds: string[];
  description?: string | null;
  lastPasswordChange: string;
}

export interface LocalDatabaseStore {
  accounts: AccountEntity[];
  safes: Safe[];
  organizations: Organization[];
  users: User[];
  tags: TagEntity[];
  auditLog: AuditEvent[];
  idempotencyLog: IdempotencyRecord[];
}
