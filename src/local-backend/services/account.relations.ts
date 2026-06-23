import type { LocalDatabaseStore } from '../state/localDatabase.types';

export interface RelationValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateAccountRelations(
  payload: { safeId?: string; ownerId?: string; organizationId?: string; tagIds?: string[] },
  store: LocalDatabaseStore,
): RelationValidationResult {
  const errors: Record<string, string> = {};

  if (payload.safeId) {
    const safe = store.safes.find((s) => s.id === payload.safeId);
    if (!safe) errors['safeId'] = `Safe "${payload.safeId}" does not exist.`;
  }

  if (payload.ownerId) {
    const user = store.users.find((u) => u.id === payload.ownerId);
    if (!user) errors['ownerId'] = `Owner "${payload.ownerId}" does not exist.`;
  }

  if (payload.organizationId) {
    const org = store.organizations.find((o) => o.id === payload.organizationId);
    if (!org) errors['organizationId'] = `Organization "${payload.organizationId}" does not exist.`;
  }

  if (payload.tagIds) {
    const unknownTags = payload.tagIds.filter(
      (tid) => !store.tags.find((t) => t.id === tid),
    );
    if (unknownTags.length > 0) {
      errors['tagIds'] = `Unknown tag IDs: ${unknownTags.join(', ')}.`;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
