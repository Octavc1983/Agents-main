import type { LocalDatabaseStore, AccountEntity } from './localDatabase.types';
import type { TagEntity } from '../types/tag.types';
import accountsSeedRaw from '../database/accounts.json';
import safesSeed from '../database/safes.json';
import orgsSeed from '../database/organizations.json';
import usersSeed from '../database/users.json';
import tagsSeedRaw from '../database/tags.json';

const accountsSeed = accountsSeedRaw as AccountEntity[];

// Inject versioning fields for seed tags that lack them (JSON stores catalog shape only)
const TAG_SEED_DEFAULTS = {
  version: 1,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  deletedAt: null,
} as const;

const tagsSeed = (tagsSeedRaw as unknown[]).map((t) => ({
  ...TAG_SEED_DEFAULTS,
  ...(t as object),
})) as TagEntity[];

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
