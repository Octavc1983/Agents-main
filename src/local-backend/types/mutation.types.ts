export interface MutationMeta {
  requestId: string;
  idempotencyKey: string;
  actorId?: string;
  expectedVersion?: number;
  confirmed?: boolean;
}

export type MutationRisk = 'low' | 'medium' | 'destructive';

export interface MutationResult<T> {
  success: true;
  data: T;
  idempotencyKey: string;
}

export interface BulkMutationResult<T = unknown> {
  succeeded: Array<{ id: string; data: T }>;
  failed: Array<{ id: string; error: string }>;
}

export interface DeleteResponse {
  id: string;
  deletedAt: string;
  version: number;
}

export interface CreateAccountPayload {
  name: string;
  accountType: string;
  platform: string;
  address: string;
  status?: string;
  ownerId: string;
  safeId: string;
  organizationId?: string;
  tagIds?: string[];
  description?: string;
  lastPasswordChange?: string;
}

export interface UpdateAccountPayload {
  name?: string;
  accountType?: string;
  platform?: string;
  address?: string;
  status?: string;
  ownerId?: string;
  safeId?: string;
  organizationId?: string;
  description?: string;
  lastPasswordChange?: string;
}

export interface BulkAccountPayload {
  status?: string;
  safeId?: string;
  organizationId?: string;
}
