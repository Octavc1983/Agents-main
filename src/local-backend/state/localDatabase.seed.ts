import type { LocalDatabaseStore } from './localDatabase.types';
import type { AccountEntity } from './localDatabase.types';
import accountsSeedRaw from '../database/accounts.json';
import safesSeed from '../database/safes.json';
import orgsSeed from '../database/organizations.json';
import usersSeed from '../database/users.json';
import tagsSeed from '../database/tags.json';

const accountsSeed = accountsSeedRaw as AccountEntity[];

export function buildSeedStore(): LocalDatabaseStore {
  return {
    accounts: accountsSeed.map((a) => ({ ...a })),
    safes: safesSeed.map((s) => ({ ...s })),
    organizations: orgsSeed.map((o) => ({ ...o })),
    users: usersSeed.map((u) => ({ ...u })),
    tags: tagsSeed.map((t) => ({ ...t })),
    auditLog: [],
    idempotencyLog: [],
  };
}
