import type { AccountEntity } from '../state/localDatabase.types';
import type { LocalDatabaseStore } from '../state/localDatabase.types';
import type { ManagedAccount, ManagedAccountRiskLevel, ManagedAccountStatus, ManagedAccountType, ManagedAccountPlatform } from '../../types/prototype.types';
import type { TagCatalogEntry } from '../types/common.types';

function deriveRiskLevel(status: string, tags: TagCatalogEntry[]): ManagedAccountRiskLevel {
  if (status === 'locked' || status === 'marked_for_deletion' || status === 'deleted') return 'critical';
  const hasCriticalTier = tags.some((t) => t.key === 'tier' && t.value === 'critical');
  const hasSensitive = tags.some((t) => t.key === 'sensitive');
  if (hasCriticalTier || hasSensitive) return 'high';
  if (status === 'inactive' || status === 'pending') return 'medium';
  const hasProd = tags.some((t) => t.key === 'environment' && t.value === 'production');
  if (hasProd) return 'medium';
  return 'low';
}

function resolvedTagLabel(entry: TagCatalogEntry): string {
  const key = entry.displayKey ?? entry.key;
  const value = entry.displayValue ?? entry.value;
  return value ? `${key}:${value}` : key;
}

export function mapAccountEntityToViewModel(entity: AccountEntity, store: LocalDatabaseStore): ManagedAccount {
  const safe = store.safes.find((s) => s.id === entity.safeId);
  const org = store.organizations.find((o) => o.id === entity.organizationId);
  const user = store.users.find((u) => u.id === entity.ownerId);
  const tagEntries = entity.tagIds
    .map((tid) => store.tags.find((t) => t.id === tid))
    .filter((t): t is TagCatalogEntry => t !== undefined);

  return {
    id: entity.id,
    name: entity.name,
    accountType: entity.accountType as ManagedAccountType,
    platform: entity.platform as ManagedAccountPlatform,
    address: entity.address,
    status: entity.status as ManagedAccountStatus,
    riskLevel: deriveRiskLevel(entity.status, tagEntries),
    owner: user?.displayName ?? user?.name ?? entity.ownerId,
    safe: safe?.name ?? entity.safeId,
    organization: org?.name,
    lastPasswordChange: entity.lastPasswordChange,
    createdAt: entity.createdAt,
    tags: tagEntries.map(resolvedTagLabel),
    description: entity.description ?? undefined,
  };
}

export function mapAllAccounts(entities: AccountEntity[], store: LocalDatabaseStore): ManagedAccount[] {
  return entities.map((e) => mapAccountEntityToViewModel(e, store));
}
