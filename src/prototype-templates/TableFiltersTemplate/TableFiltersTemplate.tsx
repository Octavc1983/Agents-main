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

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Button, LoadingState, EmptyState, ErrorState } from '@idira/design-system';
import { FilterIcon, SearchIcon, CloseIcon, RefreshIcon } from '@idira/design-system/icons';
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
  appliedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, value: string, checked: boolean) => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterGroups,
  appliedFilters,
  onFilterChange,
  onClose,
}) => {
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) =>
    setCollapsed((prev) => ({ ...prev, [groupId]: !prev[groupId] }));

  return (
    <div className="tableFiltersTemplate__filtersPanel" role="complementary" aria-label="Filters">
      <div className="tableFiltersTemplate__filtersPanelHeader">
        <span className="tableFiltersTemplate__filtersPanelTitle">Filter</span>
        <button
          className="tableFiltersTemplate__filtersPanelClose"
          type="button"
          onClick={onClose}
          aria-label="Close filters panel"
        >
          <CloseIcon size={14} />
        </button>
      </div>

      <div className="tableFiltersTemplate__filtersPanelBody">
        {filterGroups.map((group) => {
          const isCollapsed = !!collapsed[group.id];
          return (
            <div key={group.id} className="tableFiltersTemplate__filterGroup">
              <button
                type="button"
                className="tableFiltersTemplate__filterGroupHeader"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={!isCollapsed}
              >
                <span className="tableFiltersTemplate__filterGroupLabel">{group.label}</span>
                <svg
                  className={`tableFiltersTemplate__filterGroupChevron${isCollapsed ? ' tableFiltersTemplate__filterGroupChevron--collapsed' : ''}`}
                  width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                >
                  <path d="M3 9L7 5L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {!isCollapsed && (
                <div className="tableFiltersTemplate__filterGroupOptions">
                  {group.options.map((option) => {
                    const selected = (appliedFilters[group.id] ?? []).includes(option.value);
                    return (
                      <label key={option.value} className="tableFiltersTemplate__filterOption">
                        <input
                          type={group.type === 'single-select' ? 'radio' : 'checkbox'}
                          name={group.id}
                          value={option.value}
                          checked={selected}
                          onChange={(e) => onFilterChange(group.id, option.value, e.target.checked)}
                          onClick={group.type === 'single-select' && selected
                            ? (e) => { e.preventDefault(); onFilterChange(group.id, option.value, false); }
                            : undefined}
                          className="tableFiltersTemplate__filterInput"
                        />
                        <span className="tableFiltersTemplate__filterOptionLabel">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
    selectable = false,
  } = props;

  // ── State ──────────────────────────────────────────────────────────────────

  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const selectAllRef = useRef<HTMLInputElement>(null);

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
    setIsFiltersOpen(v => !v);
  }, []);

  const handleFilterChange = useCallback(
    (groupId: string, value: string, checked: boolean) => {
      const group = filterGroups.find((g) => g.id === groupId);
      setAppliedFilters((prev) => {
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
  }, []);

  // ── Selection ──────────────────────────────────────────────────────────────

  const allFilteredIds = useMemo(() => filteredRows.map((r) => getRowId(r)), [filteredRows, getRowId]);
  const allSelected = allFilteredIds.length > 0 && allFilteredIds.every((id) => selectedIds.has(id));
  const someSelected = !allSelected && allFilteredIds.some((id) => selectedIds.has(id));

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (allSelected) {
        const next = new Set(prev);
        allFilteredIds.forEach((id) => next.delete(id));
        return next;
      }
      const next = new Set(prev);
      allFilteredIds.forEach((id) => next.add(id));
      return next;
    });
  }, [allSelected, allFilteredIds]);

  const toggleSelectRow = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  // Indeterminate state for select-all checkbox
  React.useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="tableFiltersTemplate">

      {/* ── Page header ─────────────────────────────────────────────── */}
      {(title || description) && (
        <div className="tableFiltersTemplate__pageHeader">
          {title && <h1 className="tableFiltersTemplate__pageTitle">{title}</h1>}
          {description && <p className="tableFiltersTemplate__pageDesc">{description}</p>}
        </div>
      )}

      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div className="tableFiltersTemplate__toolbar">

        {/* Row 1: filter + search | primary action */}
        <div className="tableFiltersTemplate__toolbarRow1">
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

            {filterGroups.length > 0 && (
              <span aria-hidden="true" className="tableFiltersTemplate__toolbarDivider" />
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
          </div>

          <div className="tableFiltersTemplate__toolbarRight">
            {primaryAction}
            {secondaryActions}
          </div>
        </div>

        {/* Row 2: item count | updated at + refresh */}
        <div className="tableFiltersTemplate__toolbarRow2">
          <span className="tableFiltersTemplate__itemCount">{itemCountLabel}</span>
          <div className="tableFiltersTemplate__toolbarRight">
            {updatedAt && (
              <span className="tableFiltersTemplate__updatedAt">
                Updated at {updatedAt}
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
          </div>
        </div>

        {/* Row 3: active filter chips (conditional) */}
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
            appliedFilters={appliedFilters}
            onFilterChange={handleFilterChange}
            onClose={() => setIsFiltersOpen(false)}
          />
        )}

        {/* Table area */}
        <div className={[
          'tableFiltersTemplate__table',
          isFiltersOpen ? 'tableFiltersTemplate__table--narrowed' : '',
        ].filter(Boolean).join(' ')}>

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
                    {selectable && (
                      <th className="tableFiltersTemplate__th tableFiltersTemplate__th--checkbox">
                        <input
                          ref={selectAllRef}
                          type="checkbox"
                          className="tableFiltersTemplate__checkbox"
                          checked={allSelected}
                          onChange={toggleSelectAll}
                          aria-label="Select all rows"
                        />
                      </th>
                    )}
                    {columns.map((col) => (
                      <th
                        key={col.id}
                        className={[
                          'tableFiltersTemplate__th',
                          col.narrow ? 'tableFiltersTemplate__th--narrow' : '',
                          col.hideWhenNarrow && isFiltersOpen ? 'tableFiltersTemplate__th--hidden' : '',
                        ].filter(Boolean).join(' ')}
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
                  {filteredRows.map((row) => {
                    const rowId = getRowId(row);
                    const isChecked = selectedIds.has(rowId);
                    return (
                      <tr
                        key={rowId}
                        className={[
                          'tableFiltersTemplate__row',
                          onRowClick ? 'tableFiltersTemplate__row--clickable' : '',
                          isChecked ? 'tableFiltersTemplate__row--selected' : '',
                        ].filter(Boolean).join(' ')}
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                      >
                        {selectable && (
                          <td
                            className="tableFiltersTemplate__td tableFiltersTemplate__td--checkbox"
                            onClick={(e) => { e.stopPropagation(); toggleSelectRow(rowId); }}
                          >
                            <input
                              type="checkbox"
                              className="tableFiltersTemplate__checkbox"
                              checked={isChecked}
                              onChange={() => toggleSelectRow(rowId)}
                              aria-label="Select row"
                            />
                          </td>
                        )}
                        {columns.map((col) => (
                          <td
                            key={col.id}
                            className={[
                              'tableFiltersTemplate__td',
                              col.narrow ? 'tableFiltersTemplate__td--narrow' : '',
                              col.hideWhenNarrow && isFiltersOpen ? 'tableFiltersTemplate__td--hidden' : '',
                            ].filter(Boolean).join(' ')}
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
                    );
                  })}
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
