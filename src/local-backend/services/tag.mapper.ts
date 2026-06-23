import type { TagEntity } from '../types/tag.types';
import type { TagCatalogEntry } from '../types/common.types';

export function mapTagEntityToCatalogEntry(entity: TagEntity): TagCatalogEntry {
  return {
    id: entity.id,
    key: entity.key,
    value: entity.value,
    displayKey: entity.displayKey,
    displayValue: entity.displayValue,
    source: entity.source,
    usageCount: entity.usageCount,
    isSelectable: entity.isSelectable,
    isRemovable: entity.isRemovable,
  };
}

export function mapAllTagEntities(entities: TagEntity[]): TagCatalogEntry[] {
  return entities.map(mapTagEntityToCatalogEntry);
}
