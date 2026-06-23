import { localDatabaseStore } from '../state/localDatabase.store';
import { localDatabaseEvents } from '../state/localDatabase.events';
import { accountRepository } from '../repositories/account.repository';
import { mapAccountEntityToViewModel, mapAllAccounts } from './account.mapper';
import { validateCreatePayload, validateUpdatePayload } from './account.validation';
import { validateAccountRelations } from './account.relations';
import { buildCreateEntity, buildUpdatePatch, buildBulkPatch } from './account.mutations';
import { runTransaction } from '../safety/mutations/transaction.runner';
import { idempotencyGuard } from '../safety/mutations/idempotency.guard';
import { concurrencyGuard } from '../safety/mutations/concurrency.guard';
import { permissionGuard } from '../safety/authorization/permission.guard';
import { getActor } from '../safety/authorization/actorContext';
import { auditService } from '../safety/audit/audit.service';
import type { AccountListQuery, ListResponse } from '../types/query.types';
import type { CreateAccountPayload, UpdateAccountPayload, BulkAccountPayload, MutationMeta, MutationResult, BulkMutationResult, DeleteResponse } from '../types/mutation.types';
import type { ManagedAccount } from '../../types/prototype.types';

function matchesSearch(account: ManagedAccount, search: string): boolean {
  const s = search.toLowerCase();
  return (
    account.name.toLowerCase().includes(s) ||
    account.address.toLowerCase().includes(s) ||
    account.owner.toLowerCase().includes(s) ||
    account.safe.toLowerCase().includes(s) ||
    (account.organization ?? '').toLowerCase().includes(s) ||
    account.platform.toLowerCase().includes(s)
  );
}

function matchesFilters(account: ManagedAccount, filters: Record<string, string | string[]>): boolean {
  for (const [key, value] of Object.entries(filters)) {
    const values = Array.isArray(value) ? value : [value];
    if (!values.length) continue;
    const fieldMap: Record<string, string> = {
      status: account.status,
      riskLevel: account.riskLevel,
      platform: account.platform,
      accountType: account.accountType,
      safe: account.safe,
      organization: account.organization ?? '',
    };
    const field = fieldMap[key];
    if (field !== undefined && !values.includes(field)) return false;
  }
  return true;
}

export const accountService = {
  async list(query: AccountListQuery = {}): Promise<ListResponse<ManagedAccount>> {
    permissionGuard.assert('accounts:read');
    const store = localDatabaseStore.get();
    const entities = accountRepository.findAll(store);
    let items = mapAllAccounts(entities, store);

    if (query.search) items = items.filter((a) => matchesSearch(a, query.search!));
    if (query.filters) items = items.filter((a) => matchesFilters(a, query.filters!));

    const total = items.length;
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 200;
    const start = (page - 1) * pageSize;
    const paged = items.slice(start, start + pageSize);

    return { items: paged, total, page, pageSize, hasMore: start + pageSize < total };
  },

  async getById(id: string): Promise<ManagedAccount> {
    permissionGuard.assert('accounts:read');
    const store = localDatabaseStore.get();
    const entity = accountRepository.findById(id, store);
    if (!entity) throw new Error(`Account "${id}" not found.`);
    return mapAccountEntityToViewModel(entity, store);
  },

  async create(payload: CreateAccountPayload, meta: MutationMeta): Promise<MutationResult<ManagedAccount>> {
    permissionGuard.assert('accounts:create');
    idempotencyGuard.assertFresh(meta.idempotencyKey);

    const valResult = validateCreatePayload(payload);
    if (!valResult.valid) throw new Error(`Validation failed: ${JSON.stringify(valResult.errors)}`);

    const store = localDatabaseStore.get();
    const relResult = validateAccountRelations(payload, store);
    if (!relResult.valid) throw new Error(`Relation validation failed: ${JSON.stringify(relResult.errors)}`);

    const actorId = getActor().id;
    const entityData = buildCreateEntity(payload);

    const created = runTransaction((draft) => {
      const entity = accountRepository.create(draft, entityData);
      idempotencyGuard.record(draft, meta.idempotencyKey, entity.id);
      auditService.record(draft, { entityType: 'account', entityId: entity.id, action: 'create', actorId, payload: { name: entity.name } });
      return entity;
    });

    localDatabaseEvents.emit({ type: 'account:created', entityId: created.id, timestamp: created.createdAt, actorId });

    const viewModel = mapAccountEntityToViewModel(created, localDatabaseStore.get());
    return { success: true, data: viewModel, idempotencyKey: meta.idempotencyKey };
  },

  async update(id: string, payload: UpdateAccountPayload, meta: MutationMeta): Promise<MutationResult<ManagedAccount>> {
    permissionGuard.assert('accounts:update');

    const valResult = validateUpdatePayload(payload);
    if (!valResult.valid) throw new Error(`Validation failed: ${JSON.stringify(valResult.errors)}`);

    const store = localDatabaseStore.get();
    const entity = accountRepository.findById(id, store);
    if (!entity) throw new Error(`Account "${id}" not found.`);
    if (meta.expectedVersion !== undefined) concurrencyGuard.assert(id, meta.expectedVersion, entity.version);

    const relResult = validateAccountRelations(payload, store);
    if (!relResult.valid) throw new Error(`Relation validation failed: ${JSON.stringify(relResult.errors)}`);

    const actorId = getActor().id;
    const patch = buildUpdatePatch(payload);

    const updated = runTransaction((draft) => {
      const result = accountRepository.update(draft, id, patch);
      auditService.record(draft, { entityType: 'account', entityId: id, action: 'update', actorId, payload: patch as Record<string, unknown> });
      return result;
    });

    localDatabaseEvents.emit({ type: 'account:updated', entityId: id, timestamp: updated.updatedAt, actorId });

    const viewModel = mapAccountEntityToViewModel(updated, localDatabaseStore.get());
    return { success: true, data: viewModel, idempotencyKey: meta.idempotencyKey };
  },

  async remove(id: string, meta: MutationMeta): Promise<MutationResult<DeleteResponse>> {
    permissionGuard.assert('accounts:delete');
    if (!meta.confirmed) throw new Error('CONFIRMATION_REQUIRED: You must confirm deletion. Pass meta.confirmed = true.');

    const store = localDatabaseStore.get();
    const entity = accountRepository.findById(id, store);
    if (!entity) throw new Error(`Account "${id}" not found.`);
    if (meta.expectedVersion !== undefined) concurrencyGuard.assert(id, meta.expectedVersion, entity.version);

    const actorId = getActor().id;

    const deleted = runTransaction((draft) => {
      const result = accountRepository.softDelete(draft, id);
      auditService.record(draft, { entityType: 'account', entityId: id, action: 'delete', actorId });
      return result;
    });

    localDatabaseEvents.emit({ type: 'account:deleted', entityId: id, timestamp: deleted.deletedAt!, actorId });

    return {
      success: true,
      data: { id: deleted.id, deletedAt: deleted.deletedAt!, version: deleted.version },
      idempotencyKey: meta.idempotencyKey,
    };
  },

  async updateTags(id: string, tagIds: string[], meta: MutationMeta): Promise<MutationResult<ManagedAccount>> {
    permissionGuard.assert('accounts:manage-tags');
    if (tagIds.length > 60) throw new Error('Maximum 60 tags allowed.');

    const store = localDatabaseStore.get();
    const entity = accountRepository.findById(id, store);
    if (!entity) throw new Error(`Account "${id}" not found.`);
    if (meta.expectedVersion !== undefined) concurrencyGuard.assert(id, meta.expectedVersion, entity.version);

    const relResult = validateAccountRelations({ tagIds }, store);
    if (!relResult.valid) throw new Error(`Tag validation failed: ${JSON.stringify(relResult.errors)}`);

    const actorId = getActor().id;

    const updated = runTransaction((draft) => {
      const result = accountRepository.update(draft, id, { tagIds: [...tagIds] });
      auditService.record(draft, { entityType: 'account', entityId: id, action: 'update-tags', actorId, payload: { tagIds } });
      return result;
    });

    localDatabaseEvents.emit({ type: 'account:tags-updated', entityId: id, timestamp: updated.updatedAt, actorId });

    const viewModel = mapAccountEntityToViewModel(updated, localDatabaseStore.get());
    return { success: true, data: viewModel, idempotencyKey: meta.idempotencyKey };
  },

  async bulkUpdate(ids: string[], payload: BulkAccountPayload, meta: MutationMeta): Promise<BulkMutationResult<ManagedAccount>> {
    void meta;
    permissionGuard.assert('accounts:bulk-update');

    const store = localDatabaseStore.get();
    const relResult = validateAccountRelations(payload, store);
    if (!relResult.valid) throw new Error(`Relation validation failed: ${JSON.stringify(relResult.errors)}`);

    const actorId = getActor().id;
    const patch = buildBulkPatch(payload);

    const succeeded: Array<{ id: string; data: ManagedAccount }> = [];
    const failed: Array<{ id: string; error: string }> = [];

    for (const id of ids) {
      try {
        const entity = accountRepository.findById(id, localDatabaseStore.get());
        if (!entity) { failed.push({ id, error: 'Not found.' }); continue; }

        const updated = runTransaction((draft) => {
          const result = accountRepository.update(draft, id, patch);
          auditService.record(draft, { entityType: 'account', entityId: id, action: 'bulk-update', actorId, payload: patch as Record<string, unknown> });
          return result;
        });

        localDatabaseEvents.emit({ type: 'account:updated', entityId: id, timestamp: updated.updatedAt, actorId });
        succeeded.push({ id, data: mapAccountEntityToViewModel(updated, localDatabaseStore.get()) });
      } catch (err) {
        failed.push({ id, error: err instanceof Error ? err.message : 'Unknown error.' });
      }
    }

    return { succeeded, failed };
  },
};
