import type { SearchResult } from '../../hooks/useRuleSearch';

export interface RuleSearchPopoverProps {
  searchQuery:        string;
  isOpen:             boolean;
  results:            SearchResult[];
  matchLabel:         string;
  searchInputRef:     React.RefObject<HTMLInputElement>;
  onSearchChange:     (value: string) => void;
  onSearchFocus:      () => void;
  onClearSearch:      () => void;
  onSelectResult:     (nodeId: string) => void;
  onClose:            () => void;
}
