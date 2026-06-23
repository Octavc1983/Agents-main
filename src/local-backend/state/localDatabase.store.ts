import type { LocalDatabaseStore } from './localDatabase.types';
import { buildSeedStore } from './localDatabase.seed';

let _store: LocalDatabaseStore = buildSeedStore();

export const localDatabaseStore = {
  get(): LocalDatabaseStore {
    return _store;
  },

  clone(): LocalDatabaseStore {
    return {
      accounts:       _store.accounts.map((a) => ({ ...a, tagIds: [...a.tagIds] })),
      safes:          _store.safes.map((s) => ({ ...s })),
      organizations:  _store.organizations.map((o) => ({ ...o })),
      users:          _store.users.map((u) => ({ ...u })),
      tags:           _store.tags.map((t) => ({ ...t })),
      auditLog:       [..._store.auditLog],
      idempotencyLog: [..._store.idempotencyLog],
    };
  },

  commit(next: LocalDatabaseStore): void {
    _store = next;
  },

  reset(): void {
    _store = buildSeedStore();
  },
};
