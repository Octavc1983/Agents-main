import { localDatabaseStore } from '../state/localDatabase.store';
import { tagRepository } from '../repositories/tag.repository';
import { mapTagEntityToCatalogEntry, mapAllTagEntities } from './tag.mapper';
import { validateCreateTagPayload, validateUpdateTagPayload } from './tag.validation';
import { validateTagDeletion, getAffectedAccounts } from './tag.relations';
import { runTransaction } from '../safety/mutations/transaction.runner';
import { permissionGuard } from '../safety/authorization/permission.guard';
import { getActor } from '../safety/authorization/actorContext';
import { auditService } from '../safety/audit/audit.service';
import type { TagCatalogEntry } from '../types/common.types';
import type { TagEntity, TagListQuery, CreateTagPayload, UpdateTagPayload } from '../types/tag.types';
import type { MutationMeta, MutationResult, DeleteResponse } from '../types/mutation.types';
import type { ListResponse } from '../types/query.types';

export const tagService = {
  async list(query: TagListQuery = {}): Promise<ListResponse<TagCatalogEntry>> {
    permissionGuard.assert('accounts:read');
    const store = localDatabaseStore.get();
    let entities = tagRepository.findAll(store);

    if (query.source !== undefined) entities = entities.filter((t) => t.source === query.source);
    if (query.isSelectable !== undefined) entities = entities.filter((t) => t.isSelectable === query.isSelectable);
    if (query.isRemovable !== undefined) entities = entities.filter((t) => t.isRemovable === query.isRemovable);
    if (query.search) {
      const s = query.search.toLowerCase();
      entities = entities.filter((t) =>
        t.key.toLowerCase().includes(s) ||
        (t.value ?? '').toLowerCase().includes(s) ||
        (t.displayKey ?? '').toLowerCase().includes(s),
      );
    }

    const total = entities.length;
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 200;
    const start = (page - 1) * pageSize;
    const paged = entities.slice(start, start + pageSize);

    return { items: mapAllTagEntities(paged), total, page, pageSize, hasMore: start + pageSize < total };
  },

  async getSuggestions(search?: string): Promise<TagCatalogEntry[]> {
    permissionGuard.assert('accounts:read');
    const store = localDatabaseStore.get();
    let entities = tagRepository.findAll(store).filter((t) => t.isSelectable);

    if (search) {
      const s = search.toLowerCase();
      entities = entities.filter((t) =>
        t.key.toLowerCase().includes(s) ||
        (t.value ?? '').toLowerCase().includes(s),
      );
    }

    return mapAllTagEntities(entities);
  },

  async getById(id: string): Promise<TagCatalogEntry> {
    permissionGuard.assert('accounts:read');
    const store = localDatabaseStore.get();
    const entity = tagRepository.findById(id, store);
    if (!entity) throw new Error(`Tag "${id}" not found.`);
    return mapTagEntityToCatalogEntry(entity);
  },

  async create(payload: CreateTagPayload, meta: MutationMeta): Promise<MutationResult<TagCatalogEntry>> {
    permissionGuard.assert('accounts:manage-tags');

    const valResult = validateCreateTagPayload(payload);
    if (!valResult.valid) throw new Error(`Validation failed: ${JSON.stringify(valResult.errors)}`);

    const actorId = getActor().id;
    const now = new Date().toISOString();

    const entityData: Omit<TagEntity, 'id'> = {
      key: payload.key,
      value: payload.value,
      displayKey: payload.displayKey,
      displayValue: payload.displayValue,
      description: payload.description,
      source: 'manual',
      usageCount: 0,
      isSelectable: true,
      isRemovable: true,
      version: 1,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    const created = runTransaction((draft) => {
      const entity = tagRepository.create(draft, entityData);
      auditService.record(draft, { entityType: 'tag', entityId: entity.id, action: 'create', actorId, payload: { key: entity.key } });
      return entity;
    });

    return { success: true, data: mapTagEntityToCatalogEntry(created), idempotencyKey: meta.idempotencyKey };
  },

  async update(id: string, payload: UpdateTagPayload, meta: MutationMeta): Promise<MutationResult<TagCatalogEntry>> {
    permissionGuard.assert('accounts:manage-tags');

    const store = localDatabaseStore.get();
    const entity = tagRepository.findById(id, store);
    if (!entity) throw new Error(`Tag "${id}" not found.`);
    if (entity.source === 'oob') throw new Error(`OOB tag "${id}" cannot be edited.`);

    const valResult = validateUpdateTagPayload(payload);
    if (!valResult.valid) throw new Error(`Validation failed: ${JSON.stringify(valResult.errors)}`);

    const actorId = getActor().id;

    const updated = runTransaction((draft) => {
      const result = tagRepository.update(draft, id, { ...payload });
      auditService.record(draft, { entityType: 'tag', entityId: id, action: 'update', actorId, payload: payload as Record<string, unknown> });
      return result;
    });

    return { success: true, data: mapTagEntityToCatalogEntry(updated), idempotencyKey: meta.idempotencyKey };
  },

  async remove(id: string, meta: MutationMeta): Promise<MutationResult<DeleteResponse>> {
    permissionGuard.assert('accounts:manage-tags');
    if (!meta.confirmed) throw new Error('CONFIRMATION_REQUIRED: Pass meta.confirmed = true to delete a tag.');

    const store = localDatabaseStore.get();
    const entity = tagRepository.findById(id, store);
    if (!entity) throw new Error(`Tag "${id}" not found.`);
    if (entity.source === 'oob') throw new Error(`OOB tag "${id}" cannot be removed.`);
    if (!entity.isRemovable) throw new Error(`Tag "${id}" is marked non-removable.`);

    const relResult = validateTagDeletion(id, store);
    if (!relResult.valid) throw new Error(relResult.errors[0]);

    const actorId = getActor().id;

    const deleted = runTransaction((draft) => {
      const result = tagRepository.softDelete(draft, id);
      auditService.record(draft, { entityType: 'tag', entityId: id, action: 'delete', actorId });
      return result;
    });

    return {
      success: true,
      data: { id: deleted.id, deletedAt: deleted.deletedAt!, version: deleted.version },
      idempotencyKey: meta.idempotencyKey,
    };
  },

  async getAffectedAccounts(tagId: string): Promise<string[]> {
    permissionGuard.assert('accounts:read');
    return getAffectedAccounts(tagId, localDatabaseStore.get());
  },
};
