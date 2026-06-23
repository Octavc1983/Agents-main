import { useState, useEffect, useCallback } from 'react';
import { tagService } from '../services/tag.service';
import { localDatabaseEvents } from '../state/localDatabase.events';
import type { TagCatalogEntry } from '../types/common.types';
import type { TagListQuery } from '../types/tag.types';

export interface UseTagsResult {
  tags: TagCatalogEntry[];
  suggestions: TagCatalogEntry[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTags(query?: TagListQuery): UseTagsResult {
  const [tags, setTags] = useState<TagCatalogEntry[]>([]);
  const [suggestions, setSuggestions] = useState<TagCatalogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const [listResult, suggestionsResult] = await Promise.all([
          tagService.list(query ?? {}),
          tagService.getSuggestions(),
        ]);
        if (!cancelled) {
          setTags(listResult.items);
          setSuggestions(suggestionsResult);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load tags.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    run();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchKey]);

  useEffect(() => {
    const off = localDatabaseEvents.on('account:tags-updated', () => {
      setFetchKey((n) => n + 1);
    });
    return off;
  }, []);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setFetchKey((n) => n + 1);
  }, []);

  return { tags, suggestions, isLoading, error, refetch };
}
