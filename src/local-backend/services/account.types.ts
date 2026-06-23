import type {
  CreateAccountPayload,
  UpdateAccountPayload,
  BulkAccountPayload,
  MutationMeta,
  MutationResult,
  BulkMutationResult,
  DeleteResponse,
} from '../types/mutation.types';
import type { AccountListQuery, ListResponse } from '../types/query.types';
import type { ManagedAccount } from '../../types/prototype.types';

export type {
  CreateAccountPayload,
  UpdateAccountPayload,
  BulkAccountPayload,
  MutationMeta,
  MutationResult,
  BulkMutationResult,
  DeleteResponse,
  AccountListQuery,
  ListResponse,
  ManagedAccount,
};

export interface AccountService {
  list(query?: AccountListQuery): Promise<ListResponse<ManagedAccount>>;
  getById(id: string): Promise<ManagedAccount>;
  create(payload: CreateAccountPayload, meta: MutationMeta): Promise<MutationResult<ManagedAccount>>;
  update(id: string, payload: UpdateAccountPayload, meta: MutationMeta): Promise<MutationResult<ManagedAccount>>;
  remove(id: string, meta: MutationMeta): Promise<MutationResult<DeleteResponse>>;
  updateTags(id: string, tagIds: string[], meta: MutationMeta): Promise<MutationResult<ManagedAccount>>;
  bulkUpdate(ids: string[], payload: BulkAccountPayload, meta: MutationMeta): Promise<BulkMutationResult<ManagedAccount>>;
  getTagSuggestions(): Promise<import('../types/common.types').TagCatalogEntry[]>;
}
