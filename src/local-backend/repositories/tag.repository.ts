import type { LocalDatabaseStore } from '../state/localDatabase.types';
import type { TagEntity } from '../types/tag.types';

let idCounter = 30;
function nextId(): string {
  idCounter += 1;
  return `tag-${String(idCounter).padStart(3, '0')}`;
}

export const tagRepository = {
  findAll(store: LocalDatabaseStore): TagEntity[] {
    return store.tags.filter((t) => !t.deletedAt) as TagEntity[];
  },

  findAllIncludingDeleted(store: LocalDatabaseStore): TagEntity[] {
    return store.tags as TagEntity[];
  },

  findById(id: string, store: LocalDatabaseStore): TagEntity | null {
    return (store.tags.find((t) => t.id === id) as TagEntity | undefined) ?? null;
  },

  create(draft: LocalDatabaseStore, data: Omit<TagEntity, 'id'>): TagEntity {
    const entity: TagEntity = { id: nextId(), ...data };
    draft.tags.push(entity as never);
    return entity;
  },

  update(draft: LocalDatabaseStore, id: string, patch: Partial<TagEntity>): TagEntity {
    const idx = draft.tags.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error(`Tag "${id}" not found in draft.`);
    const existing = draft.tags[idx] as TagEntity;
    const updated: TagEntity = {
      ...existing,
      ...patch,
      id,
      version: existing.version + 1,
      updatedAt: new Date().toISOString(),
    };
    draft.tags[idx] = updated as never;
    return updated;
  },

  softDelete(draft: LocalDatabaseStore, id: string): TagEntity {
    return tagRepository.update(draft, id, { deletedAt: new Date().toISOString() });
  },
};
