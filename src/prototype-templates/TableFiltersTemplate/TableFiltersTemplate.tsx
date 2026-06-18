/**
 * TableFiltersTemplate — Page Composition Template
 *
 * Assembles existing prototype components into a reusable table-with-filters page pattern.
 * This is NOT a DS component. It is a prototype-layer template.
 *
 * Components used (all existing in this project):
 *   - Button          src/components/ui/Button/Button
 *   - LoadingState    src/components/ui/LoadingState/LoadingState
 *   - EmptyState      src/components/ui/EmptyState/EmptyState
 *   - ErrorState      src/components/ui/ErrorState/ErrorState
 *   - FilterIcon, SearchIcon, CloseIcon, RefreshIcon  src/assets/icons/NavIcons
 *
 * No DS components were created. No new tokens were created. No inline styles used.
 */

import React, { useState, useMemo, useCallback } from 'react';
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
  TableFiltersTemplateProps,
  TableFilterGroup,
  ActiveFilterChip,
} from './TableFiltersTemplate.types';
import './TableFiltersTemplate.scss';

// ── Filtering logic ────────────────────────────────────────────────────────────

function applySearch<T>(
  rows: T[],
  query: string,
  searchableFields?: Array<(row: T) => string>,
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) => {
    if (searchableFields && searchableFields.length > 0) {
      return searchableFields.some((fn) => fn(row).toLowerCase().includes(q));
    }
    return true;
  });
}

function applyFilters<T>(
  rows: T[],
  appliedFilters: Record<string, string[]>,
  getFilterValue?: (row: T, groupId: string) => string | string[],
): T[] {
  const activeGroups = Object.entries(appliedFilters).filter(([, values]) => values.length > 0);
  if (activeGroups.length === 0 || !getFilterValue) return rows;

  return rows.filter((row) =>
    activeGroups.every(([groupId, selectedValues]) => {
      const rowValue = getFilterValue(row, groupId);
      if (Array.isArray(rowValue)) {
        return rowValue.some((v) => selectedValues.includes(v));
      }
      return selectedValues.includes(rowValue);
    }),
  );
}

function buildActiveChips(
  appliedFilters: Record<string, string[]>,
  filterGroups: TableFilterGroup[],
  searchQuery: string,
): ActiveFilterChip[] {
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

  if (searchQuery.trim()) {
    chips.push({
      groupId: '__search__',
      groupLabel: 'Search',
      value: searchQuery,
      label: searchQuery,
    });
  }

  return chips;
}

// ── Filter panel ───────────────────────────────────────────────────────────────

interface FilterPanelProps {
  filterGroups: TableFilterGroup[];
  draftFilters: Record<string, string[]>;
  onDraftChange: (groupId: string, value: string, checked: boolean) => void;
  onApply: () => void;
  onCancel: () => void;
  onClear: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterGroups,
  draftFilters,
  onDraftChange,
  onApply,
  onCancel,
  onClear,
}) => (
  <div className="tableFiltersTemplate__filtersPanel" role="dialog" aria-label="Filters">
    <div className="tableFiltersTemplate__filtersPanelHeader">
      <span className="tableFiltersTemplate__filtersPanelTitle">Filters</span>
      <button
        className="tableFiltersTemplate__filtersPanelClose"
        type="button"
        onClick={onCancel}
        aria-label="Close filters panel"
      >
        <CloseIcon size={14} />
      </button>
    </div>

    <div className="tableFiltersTemplate__filtersPanelBody">
      {filterGroups.map((group) => (
        <div key={group.id} className="tableFiltersTemplate__filterGroup">
          <span className="tableFiltersTemplate__filterGroupLabel">{group.label}</span>
          <div className="tableFiltersTemplate__filterGroupOptions">
            {group.options.map((option) => {
              const selected = (draftFilters[group.id] ?? []).includes(option.value);
              return (
                <label
                  key={option.value}
                  className="tableFiltersTemplate__filterOption"
                >
                  <input
                    type={group.type === 'single-select' ? 'radio' : 'checkbox'}
                    name={group.id}
                    value={option.value}
                    checked={selected}
                    onChange={(e) => onDraftChange(group.id, option.value, e.target.checked)}
                    className="tableFiltersTemplate__filterInput"
                  />
                  <span className="tableFiltersTemplate__filterOptionLabel">{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>

    <div className="tableFiltersTemplate__filtersPanelFooter">
      <button
        className="tableFiltersTemplate__filtersClearBtn"
        type="button"
        onClick={onClear}
      >
        Clear
      </button>
      <div className="tableFiltersTemplate__filtersPanelActions">
        <Button variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={onApply}>
          Apply
        </Button>
      </div>
    </div>
  </div>
);

// ── TableFiltersTemplate ───────────────────────────────────────────────────────

export function TableFiltersTemplate<T>(props: TableFiltersTemplateProps<T>): React.ReactElement {
  const {
    title,
    description,
    rows,
    columns,
    getRowId,
    searchPlaceholder = 'Search…',
    searchableFields,
    filterGroups = [],
    getFilterValue,
    primaryAction,
    secondaryActions,
    rowActions,
    updatedAt,
    onRefresh,
    isLoading = false,
    error = null,
    emptyTitle = 'No items found',
    emptyDescription,
    onRowClick,
  } = props;

  // ── State ──────────────────────────────────────────────────────────────────

  const [searchQuery, setSearchQuery] = useState('');

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  // draftFilters: changes made inside the panel before Apply
  const [draftFilters, setDraftFilters] = useState<Record<string, string[]>>({});
  // appliedFilters: what is actually affecting the table
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filteredRows = useMemo<T[]>(() => {
    let result = rows;
    result = applySearch(result, searchQuery, searchableFields);
    result = applyFilters(result, appliedFilters, getFilterValue);
    return result;
  }, [rows, searchQuery, searchableFields, appliedFilters, getFilterValue]);

  const activeChips = useMemo<ActiveFilterChip[]>(
    () => buildActiveChips(appliedFilters, filterGroups, searchQuery),
    [appliedFilters, filterGroups, searchQuery],
  );

  const hasActiveFilters = activeChips.length > 0;
  const itemCountLabel = hasActiveFilters
    ? `${filteredRows.length} of ${rows.length} items`
    : `${rows.length} items`;

  // ── Filter panel handlers ──────────────────────────────────────────────────

  const openFilters = useCallback(() => {
    setDraftFilters({ ...appliedFilters });
    setIsFiltersOpen(true);
  }, [appliedFilters]);

  const handleApply = useCallback(() => {
    setAppliedFilters({ ...draftFilters });
    setIsFiltersOpen(false);
  }, [draftFilters]);

  const handleCancel = useCallback(() => {
    setDraftFilters({ ...appliedFilters });
    setIsFiltersOpen(false);
  }, [appliedFilters]);

  const handleClearPanel = useCallback(() => {
    setDraftFilters({});
  }, []);

  const handleDraftChange = useCallback(
    (groupId: string, value: string, checked: boolean) => {
      const group = filterGroups.find((g) => g.id === groupId);
      setDraftFilters((prev) => {
        const current = prev[groupId] ?? [];
        if (group?.type === 'single-select') {
          return { ...prev, [groupId]: checked ? [value] : [] };
        }
        const next = checked ? [...current, value] : current.filter((v) => v !== value);
        return { ...prev, [groupId]: next };
      });
    },
    [filterGroups],
  );

  // ── Chip removal ──────────────────────────────────────────────────────────

  const removeChip = useCallback((chip: ActiveFilterChip) => {
    if (chip.groupId === '__search__') {
      setSearchQuery('');
      return;
    }
    setAppliedFilters((prev) => {
      const current = prev[chip.groupId] ?? [];
      const next = current.filter((v) => v !== chip.value);
      return { ...prev, [chip.groupId]: next };
    });
  }, []);

  const clearAll = useCallback(() => {
    setSearchQuery('');
    setAppliedFilters({});
    setDraftFilters({});
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="tableFiltersTemplate">

      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="tableFiltersTemplate__header">
        <h1 className="tableFiltersTemplate__title">{title}</h1>
        {description && (
          <p className="tableFiltersTemplate__description">{description}</p>
        )}
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div className="tableFiltersTemplate__toolbar">
        <div className="tableFiltersTemplate__toolbarMain">

          {/* Left: filter button + search + item counter */}
          <div className="tableFiltersTemplate__toolbarLeft">
            {filterGroups.length > 0 && (
              <button
                className={`tableFiltersTemplate__filterBtn${isFiltersOpen ? ' tableFiltersTemplate__filterBtn--active' : ''}`}
                type="button"
                onClick={openFilters}
                aria-expanded={isFiltersOpen}
                aria-label="Open filters"
              >
                <FilterIcon size={14} aria-hidden="true" />
                <span>Filter</span>
                {Object.values(appliedFilters).flat().length > 0 && (
                  <span className="tableFiltersTemplate__filterCount">
                    {Object.values(appliedFilters).flat().length}
                  </span>
                )}
              </button>
            )}

            <div className="tableFiltersTemplate__searchWrap">
              <SearchIcon
                size={14}
                className="tableFiltersTemplate__searchIcon"
                aria-hidden="true"
              />
              <input
                className="tableFiltersTemplate__searchInput"
                type="search"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              {searchQuery && (
                <button
                  className="tableFiltersTemplate__searchClear"
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <CloseIcon size={12} aria-hidden="true" />
                </button>
              )}
            </div>

            <span className="tableFiltersTemplate__itemCount">{itemCountLabel}</span>
          </div>

          {/* Right: refresh + timestamp + secondary + primary */}
          <div className="tableFiltersTemplate__toolbarRight">
            {updatedAt && (
              <span className="tableFiltersTemplate__updatedAt">
                Updated {updatedAt}
              </span>
            )}
            {onRefresh && (
              <button
                className="tableFiltersTemplate__refreshBtn"
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

        {/* Active filter chips row */}
        {hasActiveFilters && (
          <div className="tableFiltersTemplate__chips" role="list" aria-label="Active filters">
            {activeChips.map((chip) => (
              <span
                key={`${chip.groupId}:${chip.value}`}
                className="tableFiltersTemplate__chip"
                role="listitem"
              >
                <span className="tableFiltersTemplate__chipLabel">
                  {chip.groupId !== '__search__'
                    ? `${chip.groupLabel}: ${chip.label}`
                    : `Search: ${chip.label}`}
                </span>
                <button
                  className="tableFiltersTemplate__chipRemove"
                  type="button"
                  onClick={() => removeChip(chip)}
                  aria-label={`Remove filter: ${chip.label}`}
                >
                  <CloseIcon size={10} aria-hidden="true" />
                </button>
              </span>
            ))}
            <button
              className="tableFiltersTemplate__clearAll"
              type="button"
              onClick={clearAll}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ── Content area ────────────────────────────────────────────── */}
      <div className="tableFiltersTemplate__content">

        {/* Filter panel — slides in from the left */}
        {isFiltersOpen && filterGroups.length > 0 && (
          <FilterPanel
            filterGroups={filterGroups}
            draftFilters={draftFilters}
            onDraftChange={handleDraftChange}
            onApply={handleApply}
            onCancel={handleCancel}
            onClear={handleClearPanel}
          />
        )}

        {/* Table area */}
        <div className={`tableFiltersTemplate__table${isFiltersOpen ? ' tableFiltersTemplate__table--narrowed' : ''}`}>

          {/* Loading state */}
          {isLoading && <LoadingState message="Loading…" />}

          {/* Error state */}
          {!isLoading && error && (
            <ErrorState title="Failed to load" message={error} />
          )}

          {/* Empty — no data at all */}
          {!isLoading && !error && rows.length === 0 && (
            <EmptyState
              title={emptyTitle}
              description={emptyDescription}
            />
          )}

          {/* Empty — data exists but filters/search returned nothing */}
          {!isLoading && !error && rows.length > 0 && filteredRows.length === 0 && (
            <EmptyState
              title="No results found"
              description="Try adjusting your search or filters."
              action={
                hasActiveFilters ? (
                  <Button variant="secondary" size="sm" onClick={clearAll}>
                    Clear filters
                  </Button>
                ) : undefined
              }
            />
          )}

          {/* Table */}
          {!isLoading && !error && filteredRows.length > 0 && (
            <div className="tableFiltersTemplate__tableWrap">
              <table className="tableFiltersTemplate__tableEl" aria-label={title}>
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col.id}
                        className={`tableFiltersTemplate__th${col.hideWhenNarrow && isFiltersOpen ? ' tableFiltersTemplate__th--hidden' : ''}`}
                      >
                        {col.label}
                      </th>
                    ))}
                    {rowActions && (
                      <th className="tableFiltersTemplate__th tableFiltersTemplate__th--actions" />
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr
                      key={getRowId(row)}
                      className={`tableFiltersTemplate__row${onRowClick ? ' tableFiltersTemplate__row--clickable' : ''}`}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                      {columns.map((col) => (
                        <td
                          key={col.id}
                          className={`tableFiltersTemplate__td${col.hideWhenNarrow && isFiltersOpen ? ' tableFiltersTemplate__td--hidden' : ''}`}
                        >
                          {col.render(row)}
                        </td>
                      ))}
                      {rowActions && (
                        <td
                          className="tableFiltersTemplate__td tableFiltersTemplate__td--actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {rowActions(row)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableFiltersTemplate;
