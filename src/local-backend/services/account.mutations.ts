import type { CreateAccountPayload, UpdateAccountPayload, BulkAccountPayload } from '../types/mutation.types';
import type { AccountEntity } from '../state/localDatabase.types';

export function buildCreateEntity(
  payload: CreateAccountPayload,
): Omit<AccountEntity, 'id' | 'version' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  return {
    name: payload.name.trim(),
    accountType: payload.accountType,
    platform: payload.platform,
    address: payload.address.trim(),
    status: payload.status ?? 'pending',
    ownerId: payload.ownerId,
    safeId: payload.safeId,
    organizationId: payload.organizationId,
    tagIds: payload.tagIds ?? [],
    description: payload.description?.trim() ?? null,
    lastPasswordChange: payload.lastPasswordChange ?? new Date().toISOString(),
  };
}

export function buildUpdatePatch(payload: UpdateAccountPayload): Partial<AccountEntity> {
  const patch: Partial<AccountEntity> = {};
  if (payload.name !== undefined) patch.name = payload.name.trim();
  if (payload.accountType !== undefined) patch.accountType = payload.accountType;
  if (payload.platform !== undefined) patch.platform = payload.platform;
  if (payload.address !== undefined) patch.address = payload.address.trim();
  if (payload.status !== undefined) patch.status = payload.status;
  if (payload.ownerId !== undefined) patch.ownerId = payload.ownerId;
  if (payload.safeId !== undefined) patch.safeId = payload.safeId;
  if (payload.organizationId !== undefined) patch.organizationId = payload.organizationId;
  if (payload.description !== undefined) patch.description = payload.description?.trim() ?? null;
  if (payload.lastPasswordChange !== undefined) patch.lastPasswordChange = payload.lastPasswordChange;
  return patch;
}

export function buildBulkPatch(payload: BulkAccountPayload): Partial<AccountEntity> {
  const patch: Partial<AccountEntity> = {};
  if (payload.status !== undefined) patch.status = payload.status;
  if (payload.safeId !== undefined) patch.safeId = payload.safeId;
  if (payload.organizationId !== undefined) patch.organizationId = payload.organizationId;
  return patch;
}
