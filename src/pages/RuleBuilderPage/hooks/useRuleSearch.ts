import { useState, useMemo, useCallback } from 'react';
import type { ConditionNodeData, ActionNodeData } from '../RuleBuilderPage.types';
import { RULE_BUILDER_STRINGS as S } from '../RuleBuilderPage.strings';

export interface SearchResult {
  nodeId:       string;
  nodeType:     string;
  summary:      string;
  matchContext: string;
}

export function useRuleSearch(
  conditionNodes: ConditionNodeData[],
  actionNodes:    ActionNodeData[],
) {
  const [searchQuery, setSearchQuery]       = useState('');
  const [searchPopoverOpen, setSearchPopoverOpen] = useState(false);

  const searchResults = useMemo((): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    for (const node of conditionNodes) {
      const fields = [node.propertyLabel, node.operatorLabel, node.valueLabel ?? ''];
      const matchedField = fields.find((f) => f.toLowerCase().includes(q));
      if (matchedField !== undefined) {
        const summary = node.propertyLabel
          ? [node.propertyLabel, node.operatorLabel, node.valueLabel].filter(Boolean).join(' ')
          : 'Unnamed condition';
        results.push({
          nodeId:       node.id,
          nodeType:     S.popoverNodeTypeCondition,
          summary,
          matchContext: matchedField,
        });
      }
    }

    for (const node of actionNodes) {
      if (!node.actionLabel) continue;
      if (node.actionLabel.toLowerCase().includes(q)) {
        results.push({
          nodeId:       node.id,
          nodeType:     S.popoverNodeTypeAction,
          summary:      node.actionLabel,
          matchContext: node.actionLabel,
        });
      }
    }

    return results;
  }, [searchQuery, conditionNodes, actionNodes]);

  const matchedNodeIds = useMemo(
    () => new Set(searchResults.map((r) => r.nodeId)),
    [searchResults],
  );

  const matchCount = searchResults.length;

  const searchMatchLabel = useMemo(() => {
    if (!searchQuery.trim() || matchCount === 0) return '';
    return `${matchCount} ${matchCount === 1 ? S.searchMatchSingular : S.searchMatchPlural}`;
  }, [searchQuery, matchCount]);

  const handleSearchChange = useCallback((val: string) => {
    setSearchQuery(val);
    setSearchPopoverOpen(val.trim().length > 0);
  }, []);

  const handleSearchFocus = useCallback(() => {
    if (searchQuery.trim()) setSearchPopoverOpen(true);
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchPopoverOpen(false);
  }, []);

  const closePopover = useCallback(() => {
    setSearchPopoverOpen(false);
  }, []);

  return {
    searchQuery,
    searchPopoverOpen,
    searchResults,
    matchedNodeIds,
    searchMatchLabel,
    handleSearchChange,
    handleSearchFocus,
    clearSearch,
    closePopover,
  };
}
