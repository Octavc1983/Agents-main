import { localDatabaseStore } from '../../state/localDatabase.store';

export class IdempotencyConflictError extends Error {
  public readonly resolvedEntityId: string;
  constructor(key: string, entityId: string) {
    super(`Idempotency key "${key}" already used for entity "${entityId}".`);
    this.name = 'IdempotencyConflictError';
    this.resolvedEntityId = entityId;
  }
}

export const idempotencyGuard = {
  check(key: string): string | undefined {
    const store = localDatabaseStore.get();
    return store.idempotencyLog.find((r) => r.key === key)?.entityId;
  },

  assertFresh(key: string): void {
    const existing = this.check(key);
    if (existing) throw new IdempotencyConflictError(key, existing);
  },

  record(draft: { idempotencyLog: Array<{ key: string; entityId: string; resolvedAt: string }> }, key: string, entityId: string): void {
    draft.idempotencyLog.push({ key, entityId, resolvedAt: new Date().toISOString() });
  },
};
