import { useState, useEffect, useCallback, useRef } from 'react';
import { accountService } from '../services/account.service';
import { localDatabaseEvents } from '../state/localDatabase.events';
import type { ManagedAccount } from '../../types/prototype.types';
import type { AccountListQuery } from '../types/query.types';
import type { TagCatalogEntry } from '../types/common.types';
import type { CreateAccountPayload, UpdateAccountPayload, MutationMeta, BulkAccountPayload } from '../types/mutation.types';

export interface UseManagedAccountsResult {
  accounts: ManagedAccount[];
  total: number;
  isLoading: boolean;
  error: string | null;
  tagSuggestions: TagCatalogEntry[];
  refetch: () => void;
  createAccount: (payload: CreateAccountPayload, meta: MutationMeta) => Promise<ManagedAccount>;
  updateAccount: (id: string, payload: UpdateAccountPayload, meta: MutationMeta) => Promise<ManagedAccount>;
  removeAccount: (id: string, meta: MutationMeta) => Promise<void>;
  updateAccountTags: (id: string, tagIds: string[], meta: MutationMeta) => Promise<ManagedAccount>;
  bulkUpdateAccounts: (ids: string[], payload: BulkAccountPayload, meta: MutationMeta) => Promise<void>;
}

export function useManagedAccounts(query?: AccountListQuery): UseManagedAccountsResult {
  const [accounts, setAccounts] = useState<ManagedAccount[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tagSuggestions, setTagSuggestions] = useState<TagCatalogEntry[]>([]);

  const queryRef = useRef<AccountListQuery | undefined>(undefined);
  useEffect(() => {
    queryRef.current = query;
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [listResult, tags] = await Promise.all([
        accountService.list(queryRef.current),
        accountService.getTagSuggestions(),
      ]);
      setAccounts(listResult.items);
      setTotal(listResult.total);
      setTagSuggestions(tags);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load accounts.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    const off = localDatabaseEvents.on('*', () => void loadData());
    return off;
  }, [loadData]);

  const createAccount = useCallback(async (payload: CreateAccountPayload, meta: MutationMeta): Promise<ManagedAccount> => {
    const result = await accountService.create(payload, meta);
    return result.data;
  }, []);

  const updateAccount = useCallback(async (id: string, payload: UpdateAccountPayload, meta: MutationMeta): Promise<ManagedAccount> => {
    const result = await accountService.update(id, payload, meta);
    return result.data;
  }, []);

  const removeAccount = useCallback(async (id: string, meta: MutationMeta): Promise<void> => {
    await accountService.remove(id, meta);
  }, []);

  const updateAccountTags = useCallback(async (id: string, tagIds: string[], meta: MutationMeta): Promise<ManagedAccount> => {
    const result = await accountService.updateTags(id, tagIds, meta);
    return result.data;
  }, []);

  const bulkUpdateAccounts = useCallback(async (ids: string[], payload: BulkAccountPayload, meta: MutationMeta): Promise<void> => {
    await accountService.bulkUpdate(ids, payload, meta);
  }, []);

  return {
    accounts, total, isLoading, error, tagSuggestions,
    refetch: loadData,
    createAccount, updateAccount, removeAccount, updateAccountTags, bulkUpdateAccounts,
  };
}
