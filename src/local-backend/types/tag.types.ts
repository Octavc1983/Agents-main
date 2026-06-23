import type { SoftDeletable, Versioned, TagCatalogEntry } from './common.types';

export interface TagEntity extends SoftDeletable, Versioned {
  id: string;
  key: string;
  value?: string;
  displayKey?: string;
  displayValue?: string;
  source: 'manual' | 'oob' | 'external';
  usageCount: number;
  isSelectable: boolean;
  isRemovable: boolean;
  description?: string;
}

export type TagSuggestion = TagCatalogEntry;

export interface TagListQuery {
  search?: string;
  source?: 'manual' | 'oob' | 'external';
  isSelectable?: boolean;
  isRemovable?: boolean;
  page?: number;
  pageSize?: number;
}

export interface CreateTagPayload {
  key: string;
  value?: string;
  displayKey?: string;
  displayValue?: string;
  description?: string;
}

export interface UpdateTagPayload {
  key?: string;
  value?: string;
  displayKey?: string;
  displayValue?: string;
  description?: string;
}
