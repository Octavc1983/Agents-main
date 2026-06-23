import type { LocalDatabaseStore } from '../state/localDatabase.types';

export interface RelationValidationResult {
  valid: boolean;
  errors: string[];
  affectedAccountIds: string[];
}

/**
 * Checks whether any account references the given tag ID.
 * Used before deletion to detect dependency violations.
 */
export function getAffectedAccounts(tagId: string, store: LocalDatabaseStore): string[] {
  return store.accounts
    .filter((a) => !a.deletedAt && a.tagIds.includes(tagId))
    .map((a) => a.id);
}

export function validateTagDeletion(tagId: string, store: LocalDatabaseStore): RelationValidationResult {
  const affectedAccountIds = getAffectedAccounts(tagId, store);
  return {
    valid: affectedAccountIds.length === 0,
    errors: affectedAccountIds.length > 0
      ? [`Tag "${tagId}" is used by ${affectedAccountIds.length} account(s). Remove the tag from all accounts before deleting.`]
      : [],
    affectedAccountIds,
  };
}
