/**
 * CardListMasterDetailsTemplate — Page Composition Template
 *
 * Layout: 30% selectable card list (left) / 70% details split panel (right).
 * This is NOT a DS component. It is a prototype-layer template.
 *
 * Components used (all existing in this project):
 *   - Button          src/components/ui/Button/Button
 *   - LoadingState    src/components/ui/LoadingState/LoadingState
 *   - EmptyState      src/components/ui/EmptyState/EmptyState
 *   - ErrorState      src/components/ui/ErrorState/ErrorState
 *   - FilterIcon, SearchIcon, CloseIcon, RefreshIcon  src/assets/icons/NavIcons
 *
 * Template-local elements (no DS component exists):
 *   - Filter panel overlay  (.cardListMDT__filtersPanel)
 *   - Active filter chips   (.cardListMDT__filterChip)
 *   - Filter checkboxes     native <input type="checkbox"> with accent-color token
 *
 * No DS components created. No new tokens created. No inline styles used.
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { LoadingState } from '../../components/ui/LoadingState/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState/ErrorState';
import {
  FilterIcon,
  SearchIcon,
  CloseIcon,
  RefreshIcon,
} from '../../assets/icons/NavIcons';
import type {
  CardListMasterDetailsTemplateProps,
  ActiveFilterChip,
} from './CardListMasterDetailsTemplate.types';
import './CardListMasterDetailsTemplate.scss';

// ── Search helper ──────────────────────────────────────────────────────────────

function applySearch<T>(
  items: T[],
  query: string,
  searchableFields?: Array<(item: T) => string>,
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => {
    if (searchableFields && searchableFields.length > 0) {
      return searchableFields.some((fn) => fn(item).toLowerCase().includes(q));
    }
    return true;
  });
}

// ── Filter helper ──────────────────────────────────────────────────────────────

function applyFilters<T>(
  items: T[],
  appliedFilters: Record<string, string[]>,
  getFilterValue?: (item: T, groupId: string) => string | string[],
): T[] {
  const activeGroupIds = Object.keys(appliedFilters).filter(
    (id) => (appliedFilters[id] ?? []).length > 0,
  );
  if (activeGroupIds.length === 0) return items;
  if (!getFilterValue) return items; // gap: no getFilterValue provided, skip silently

  return items.filter((item) =>
    activeGroupIds.every((groupId) => {
      const selected = appliedFilters[groupId] ?? [];
      const itemValue = getFilterValue(item, groupId);
      if (Array.isArray(itemValue)) {
        return itemValue.some((v) => selected.includes(v));
      }
      return selected.includes(itemValue);
    }),
  );
}

// ── CardListMasterDetailsTemplate ──────────────────────────────────────────────

export function CardListMasterDetailsTemplate<T>(
  props: CardListMasterDetailsTemplateProps<T>,
): React.ReactElement {
  const {
    title,
    description,
    items,
    getItemId,
    getItemTitle,
    getItemSubtitle,
    getItemIcon,
    getItemStatus,
    getItemMeta,
    getItemChips,
    renderDetails,
    renderEmptyDetails,
    selectFirstItemByDefault = false,
    onSelectedItemChange,
    clearSelectionWhenFilteredOut = true,
    searchPlaceholder = 'Search…',
    searchableFields,
    filterGroups,
    getFilterValue,
    showFilters = filterGroups !== undefined && filterGroups.length > 0,
    showActiveFilterChips = true,
    clearSearchOnClearAll = true,
    showHeader = true,
    showSearch = true,
    primaryAction,
    secondaryActions,
    updatedAt,
    onRefresh,
    isLoading = false,
    error = null,
    emptyTitle = 'No items found',
    emptyDescription,
  } = props;

  // ── State ──────────────────────────────────────────────────────────────────

  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<Record<string, string[]>>({});
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ── Filter handlers ────────────────────────────────────────────────────────

  const handleFiltersOpen = useCallback(() => {
    setDraftFilters(appliedFilters);
    setIsFiltersOpen(true);
  }, [appliedFilters]);

  const handleFiltersCancel = useCallback(() => {
    setDraftFilters(appliedFilters);
    setIsFiltersOpen(false);
  }, [appliedFilters]);

  const handleFiltersApply = useCallback(() => {
    setAppliedFilters(draftFilters);
    setIsFiltersOpen(false);
  }, [draftFilters]);

  const handleFiltersClearDraft = useCallback(() => {
    setDraftFilters({});
  }, []);

  const handleClearAll = useCallback(() => {
    setAppliedFilters({});
    setDraftFilters({});
    if (clearSearchOnClearAll) {
      setSearchQuery('');
    }
  }, [clearSearchOnClearAll]);

  const handleRemoveFilterChip = useCallback((groupId: string, value: string) => {
    setAppliedFilters((current) => {
      const nextValues = (current[groupId] ?? []).filter((v) => v !== value);
      const next = { ...current };
      if (nextValues.length === 0) {
        delete next[groupId];
      } else {
        next[groupId] = nextValues;
      }
      return next;
    });
  }, []);

  const toggleDraftValue = useCallback(
    (groupId: string, value: string, type: 'single-select' | 'multi-select') => {
      setDraftFilters((current) => {
        const existing = current[groupId] ?? [];
        let nextValues: string[];
        if (type === 'single-select') {
          nextValues = existing.includes(value) ? [] : [value];
        } else {
          nextValues = existing.includes(value)
            ? existing.filter((v) => v !== value)
            : [...existing, value];
        }
        const next = { ...current };
        if (nextValues.length === 0) {
          delete next[groupId];
        } else {
          next[groupId] = nextValues;
        }
        return next;
      });
    },
    [],
  );

  // ── Filtered items ─────────────────────────────────────────────────────────

  const filteredItems = useMemo<T[]>(() => {
    const afterSearch = applySearch(items, searchQuery, searchableFields);
    return applyFilters(afterSearch, appliedFilters, getFilterValue);
  }, [items, searchQuery, searchableFields, appliedFilters, getFilterValue]);

  // ── Default selection ──────────────────────────────────────────────────────

  useEffect(() => {
    if (selectFirstItemByDefault && items.length > 0 && selectedId === null) {
      setSelectedId(getItemId(items[0]));
    }
    // Run only when items load or the flag changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFirstItemByDefault, items.length > 0]);

  // ── Clear selection when filtered out ─────────────────────────────────────

  useEffect(() => {
    if (!clearSelectionWhenFilteredOut || selectedId === null) return;
    const stillVisible = filteredItems.some((i) => getItemId(i) === selectedId);
    if (!stillVisible) {
      setSelectedId(null);
      onSelectedItemChange?.(null);
    }
  }, [filteredItems, selectedId, clearSelectionWhenFilteredOut, getItemId, onSelectedItemChange]);

  // ── Derived: selected item ─────────────────────────────────────────────────

  const selectedItem = useMemo<T | null>(
    () => (selectedId ? (items.find((i) => getItemId(i) === selectedId) ?? null) : null),
    [items, selectedId, getItemId],
  );

  // ── Derived: active chips ──────────────────────────────────────────────────

  const activeFilterChips = useMemo<ActiveFilterChip[]>(() => {
    if (!filterGroups) return [];
    const chips: ActiveFilterChip[] = [];
    for (const group of filterGroups) {
      const selected = appliedFilters[group.id] ?? [];
      for (const value of selected) {
        const option = group.options.find((o) => o.value === value);
        chips.push({
          groupId: group.id,
          groupLabel: group.label,
          value,
          label: option?.label ?? value,
        });
      }
    }
    return chips;
  }, [filterGroups, appliedFilters]);

  const hasActiveFilters = activeFilterChips.length > 0;
  const hasActiveSearch = searchQuery.trim().length > 0;
  const hasAnyActiveFilter = hasActiveFilters || hasActiveSearch;

  // ── Item counter label ─────────────────────────────────────────────────────

  const itemCountLabel = hasAnyActiveFilter
    ? `${filteredItems.length} of ${items.length} items`
    : `${items.length} items`;

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleCardSelect = useCallback(
    (item: T) => {
      const id = getItemId(item);
      setSelectedId(id);
      onSelectedItemChange?.(item);
    },
    [getItemId, onSelectedItemChange],
  );

  const handleSearchClear = useCallback(() => setSearchQuery(''), []);

  const activeAppliedCount = Object.values(appliedFilters).reduce(
    (sum, vals) => sum + vals.length,
    0,
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="cardListMDT">

      {/* ── Optional page header ────────────────────────────────────── */}
      {showHeader && (
        <div className="cardListMDT__header">
          <h1 className="cardListMDT__title">{title}</h1>
          {description && (
            <p className="cardListMDT__description">{description}</p>
          )}
        </div>
      )}

      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div className="cardListMDT__toolbar">
        <div className="cardListMDT__toolbarLeft">

          {showFilters && (
            <button
              className={`cardListMDT__filtersButton${activeAppliedCount > 0 ? ' cardListMDT__filtersButton--active' : ''}`}
              type="button"
              onClick={handleFiltersOpen}
              aria-label={`Filter${activeAppliedCount > 0 ? ` (${activeAppliedCount} active)` : ''}`}
            >
              <FilterIcon size={14} aria-hidden="true" />
              <span>Filter</span>
              {activeAppliedCount > 0 && (
                <span className="cardListMDT__filtersCount">{activeAppliedCount}</span>
              )}
            </button>
          )}

          {showSearch && (
            <div className="cardListMDT__searchWrap">
              <SearchIcon size={14} className="cardListMDT__searchIcon" aria-hidden="true" />
              <input
                className="cardListMDT__searchInput"
                type="search"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              {searchQuery && (
                <button
                  className="cardListMDT__searchClear"
                  type="button"
                  onClick={handleSearchClear}
                  aria-label="Clear search"
                >
                  <CloseIcon size={12} aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          <span className="cardListMDT__itemCount" aria-live="polite" aria-atomic="true">
            {itemCountLabel}
          </span>
        </div>

        <div className="cardListMDT__toolbarRight">
          {updatedAt && (
            <span className="cardListMDT__updatedAt">Updated {updatedAt}</span>
          )}
          {onRefresh && (
            <button
              className="cardListMDT__refreshBtn"
              type="button"
              onClick={onRefresh}
              aria-label="Refresh"
            >
              <RefreshIcon size={14} aria-hidden="true" />
            </button>
          )}
          {secondaryActions}
          {primaryAction}
        </div>
      </div>

      {/* ── Active filter chips ──────────────────────────────────────── */}
      {showActiveFilterChips && hasAnyActiveFilter && (
        <div className="cardListMDT__activeFilters" role="group" aria-label="Active filters">

          {hasActiveSearch && (
            <span className="cardListMDT__filterChip">
              <span className="cardListMDT__filterChipLabel">
                Search: <strong>{searchQuery}</strong>
              </span>
              <button
                className="cardListMDT__filterChipRemove"
                type="button"
                onClick={handleSearchClear}
                aria-label="Remove search filter"
              >
                <CloseIcon size={10} aria-hidden="true" />
              </button>
            </span>
          )}

          {activeFilterChips.map((chip) => (
            <span key={`${chip.groupId}:${chip.value}`} className="cardListMDT__filterChip">
              <span className="cardListMDT__filterChipLabel">
                {chip.groupLabel}: <strong>{chip.label}</strong>
              </span>
              <button
                className="cardListMDT__filterChipRemove"
                type="button"
                onClick={() => handleRemoveFilterChip(chip.groupId, chip.value)}
                aria-label={`Remove ${chip.groupLabel}: ${chip.label}`}
              >
                <CloseIcon size={10} aria-hidden="true" />
              </button>
            </span>
          ))}

          <button
            className="cardListMDT__clearAll"
            type="button"
            onClick={handleClearAll}
          >
            Clear all
          </button>
        </div>
      )}

      {/* ── Content: loading / error / empty / split ─────────────────── */}

      {isLoading && <LoadingState message="Loading…" />}

      {!isLoading && error && (
        <ErrorState title="Failed to load" message={error} />
      )}

      {!isLoading && !error && items.length === 0 && (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="cardListMDT__content">

          {/* ── Left: card list ─────────────────────────────────────── */}
          <div className="cardListMDT__masterList" role="list" aria-label={title}>

            {filteredItems.length === 0 && (
              <div className="cardListMDT__noResults">
                <EmptyState
                  title="No results found"
                  description={
                    hasAnyActiveFilter
                      ? 'Try adjusting your search or filters.'
                      : 'Try adjusting your search.'
                  }
                  action={
                    hasAnyActiveFilter ? (
                      <Button variant="secondary" size="sm" onClick={handleClearAll}>
                        Clear all filters
                      </Button>
                    ) : undefined
                  }
                />
              </div>
            )}

            {filteredItems.map((item) => {
              const id = getItemId(item);
              const isSelected = id === selectedId;
              return (
                <button
                  key={id}
                  type="button"
                  role="listitem"
                  className={`cardListMDT__card${isSelected ? ' cardListMDT__card--selected' : ''}`}
                  onClick={() => handleCardSelect(item)}
                  aria-pressed={isSelected}
                >
                  <div className="cardListMDT__cardInner">
                    {getItemIcon && (
                      <div className="cardListMDT__cardIcon" aria-hidden="true">
                        {getItemIcon(item)}
                      </div>
                    )}

                    <div className="cardListMDT__cardBody">
                      <div className="cardListMDT__cardTitleRow">
                        <span className="cardListMDT__cardTitle">
                          {getItemTitle(item)}
                        </span>
                        {getItemStatus && (
                          <span className="cardListMDT__cardStatus">
                            {getItemStatus(item)}
                          </span>
                        )}
                      </div>

                      {getItemSubtitle && (
                        <span className="cardListMDT__cardSubtitle">
                          {getItemSubtitle(item)}
                        </span>
                      )}

                      {getItemMeta && (
                        <div className="cardListMDT__cardMeta">
                          {getItemMeta(item)}
                        </div>
                      )}

                      {getItemChips && (
                        <div className="cardListMDT__cardChips">
                          {getItemChips(item)}
                        </div>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="cardListMDT__cardSelectedBar" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Right: details panel ──────────────────────────────────── */}
          <div className="cardListMDT__details" aria-label="Details panel">
            {selectedItem ? (
              renderDetails(selectedItem)
            ) : renderEmptyDetails ? (
              renderEmptyDetails()
            ) : (
              <div className="cardListMDT__emptyDetails">
                <EmptyState
                  title="Select an item to view details"
                  description="Choose an item from the list to see its details here."
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Filters panel overlay ────────────────────────────────────── */}
      {isFiltersOpen && filterGroups && filterGroups.length > 0 && (
        <>
          {/* Backdrop */}
          <div
            className="cardListMDT__filtersPanelBackdrop"
            onClick={handleFiltersCancel}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className="cardListMDT__filtersPanel"
            role="dialog"
            aria-label="Filters"
            aria-modal="true"
          >
            <div className="cardListMDT__filtersPanelHeader">
              <span className="cardListMDT__filtersPanelTitle">Filters</span>
              <button
                className="cardListMDT__filtersPanelClose"
                type="button"
                onClick={handleFiltersCancel}
                aria-label="Close filters panel"
              >
                <CloseIcon size={14} aria-hidden="true" />
              </button>
            </div>

            <div className="cardListMDT__filtersPanelBody">
              {filterGroups.map((group) => (
                <div key={group.id} className="cardListMDT__filterGroup">
                  <span className="cardListMDT__filterGroupTitle">{group.label}</span>
                  <div className="cardListMDT__filterOptions">
                    {group.options.map((option) => {
                      const checked = (draftFilters[group.id] ?? []).includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className={`cardListMDT__filterOption${checked ? ' cardListMDT__filterOption--checked' : ''}`}
                        >
                          <input
                            type="checkbox"
                            className="cardListMDT__filterCheckbox"
                            checked={checked}
                            onChange={() => toggleDraftValue(group.id, option.value, group.type)}
                            aria-label={option.label}
                          />
                          <span className="cardListMDT__filterOptionLabel">{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="cardListMDT__filtersPanelFooter">
              <button
                className="cardListMDT__filtersClearBtn"
                type="button"
                onClick={handleFiltersClearDraft}
              >
                Clear
              </button>
              <div className="cardListMDT__filtersPanelActions">
                <Button variant="secondary" size="sm" onClick={handleFiltersCancel}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleFiltersApply}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CardListMasterDetailsTemplate;
