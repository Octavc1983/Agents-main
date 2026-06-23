import React, { useEffect, useRef } from 'react';
import { SearchIcon, CloseSmIcon } from '@idira/design-system/icons';
import { RULE_BUILDER_STRINGS as S } from '../../RuleBuilderPage.strings';
import type { RuleSearchPopoverProps } from './RuleSearchPopover.types';
import './RuleSearchPopover.scss';

export const RuleSearchPopover: React.FC<RuleSearchPopoverProps> = ({
  searchQuery,
  isOpen,
  results,
  matchLabel,
  searchInputRef,
  onSearchChange,
  onSearchFocus,
  onClearSearch,
  onSelectResult,
  onClose,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  // ── Close on outside click ─────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose, searchInputRef]);

  return (
    <div className="rb-search">
      {/* Input row */}
      <div className="rb-search__input-row">
        <span className="rb-search__icon" aria-hidden="true">
          <SearchIcon size={14} />
        </span>
        <input
          ref={searchInputRef}
          type="text"
          role="combobox"
          aria-label={S.searchLabel}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="rb-search-results"
          className="rb-search__input"
          placeholder={S.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onSearchFocus}
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            className="rb-search__clear"
            aria-label={S.searchClearLabel}
            onClick={onClearSearch}
            tabIndex={0}
          >
            <CloseSmIcon size={12} />
          </button>
        )}
        {matchLabel && (
          <span className="rb-search__match-count" aria-live="polite">
            {matchLabel}
          </span>
        )}
      </div>

      {/* Results popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          id="rb-search-results"
          role="listbox"
          aria-label={S.searchResultLabel}
          className="rb-search__popover"
        >
          {results.length === 0 ? (
            <div className="rb-search__no-results">{S.searchNoResults}</div>
          ) : (
            results.map((result) => (
              <button
                key={result.nodeId}
                type="button"
                role="option"
                aria-selected={false}
                className="rb-search__result"
                onClick={() => {
                  onSelectResult(result.nodeId);
                  onClose();
                }}
              >
                <span className="rb-search__result-type">{result.nodeType}</span>
                <span className="rb-search__result-summary">{result.summary}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
