import type { AccountEntity } from '../state/localDatabase.types';
import type { LocalDatabaseStore } from '../state/localDatabase.types';
import { localDatabaseStore } from '../state/localDatabase.store';

let _idCounter = 30;

function nextAccountId(): string {
  _idCounter += 1;
  return `acc-${String(_idCounter).padStart(3, '0')}`;
}

export const accountRepository = {
  findAll(store?: LocalDatabaseStore): AccountEntity[] {
    const s = store ?? localDatabaseStore.get();
    return s.accounts.filter((a) => a.deletedAt === null);
  },

  findAllIncludingDeleted(store?: LocalDatabaseStore): AccountEntity[] {
    const s = store ?? localDatabaseStore.get();
    return s.accounts;
  },

  findById(id: string, store?: LocalDatabaseStore): AccountEntity | undefined {
    const s = store ?? localDatabaseStore.get();
    return s.accounts.find((a) => a.id === id && a.deletedAt === null);
  },

  create(draft: LocalDatabaseStore, data: Omit<AccountEntity, 'id' | 'version' | 'createdAt' | 'updatedAt' | 'deletedAt'>): AccountEntity {
    const now = new Date().toISOString();
    const entity: AccountEntity = {
      ...data,
      id: nextAccountId(),
      version: 1,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };
    draft.accounts.push(entity);
    return entity;
  },

  update(draft: LocalDatabaseStore, id: string, patch: Partial<AccountEntity>): AccountEntity {
    const idx = draft.accounts.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error(`Account "${id}" not found.`);
    const existing = draft.accounts[idx];
    const updated: AccountEntity = {
      ...existing,
      ...patch,
      id: existing.id,
      version: existing.version + 1,
      updatedAt: new Date().toISOString(),
    };
    draft.accounts[idx] = updated;
    return updated;
  },

  softDelete(draft: LocalDatabaseStore, id: string): AccountEntity {
    const idx = draft.accounts.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error(`Account "${id}" not found.`);
    const existing = draft.accounts[idx];
    const deleted: AccountEntity = {
      ...existing,
      version: existing.version + 1,
      deletedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    draft.accounts[idx] = deleted;
    return deleted;
  },
};
