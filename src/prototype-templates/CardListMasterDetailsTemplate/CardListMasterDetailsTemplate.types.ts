/**
 * CardListMasterDetailsTemplate — Type definitions
 *
 * Page Composition Template — not a DS component.
 * Layout: 30% card list (left) / 70% details panel (right).
 */

import type React from 'react';

// ── Filter types ───────────────────────────────────────────────────────────────

export type CardListFilterOption = {
  label: string;
  value: string;
};

export type CardListFilterGroup = {
  id: string;
  label: string;
  /** single-select uses radio-like behavior; multi-select allows multiple values */
  type: 'single-select' | 'multi-select';
  options: CardListFilterOption[];
};

export type ActiveFilterChip = {
  groupId: string;
  groupLabel: string;
  value: string;
  label: string;
};

// ── Template props ─────────────────────────────────────────────────────────────

export type CardListMasterDetailsTemplateProps<T> = {
  /** Page title — used in header and as aria-label for the card list */
  title: string;
  /** Optional subtitle below the title */
  description?: string;

  /** Full data set — local filtering applied internally */
  items: T[];
  /** Returns a stable unique key per item */
  getItemId: (item: T) => string;

  // ── Card rendering ───────────────────────────────────────────────────────────
  /** Primary label in each card */
  getItemTitle: (item: T) => React.ReactNode;
  /** Secondary line below the title */
  getItemSubtitle?: (item: T) => React.ReactNode;
  /** Leading icon / avatar slot */
  getItemIcon?: (item: T) => React.ReactNode;
  /** Status indicator rendered in the card */
  getItemStatus?: (item: T) => React.ReactNode;
  /** Small metadata row at the bottom of the card */
  getItemMeta?: (item: T) => React.ReactNode;
  /** Inline chips / tags row */
  getItemChips?: (item: T) => React.ReactNode;

  // ── Details panel rendering ──────────────────────────────────────────────────
  /** Renders the full details for the selected item */
  renderDetails: (item: T) => React.ReactNode;
  /**
   * Renders the empty-details state when no item is selected.
   * Defaults to a standard "Select an item to view details" empty state.
   */
  renderEmptyDetails?: () => React.ReactNode;

  // ── Selection behaviour ──────────────────────────────────────────────────────
  /**
   * When true and items is non-empty, the first item is pre-selected.
   * Default: false — details panel starts in the empty state.
   */
  selectFirstItemByDefault?: boolean;
  /** Fired when the selected item changes (including null = deselected) */
  onSelectedItemChange?: (item: T | null) => void;
  /**
   * When true (default), clears the selected item if it is filtered out of
   * the visible list. When false, the details panel keeps showing the selected
   * item even if it is not visible in the card list.
   */
  clearSelectionWhenFilteredOut?: boolean;

  // ── Search ───────────────────────────────────────────────────────────────────
  searchPlaceholder?: string;
  /** Functions that extract searchable strings from an item */
  searchableFields?: Array<(item: T) => string>;

  // ── Filters ──────────────────────────────────────────────────────────────────
  /** Filter group definitions. When provided, the Filter button is shown. */
  filterGroups?: CardListFilterGroup[];
  /**
   * Returns the filterable value(s) for a given item and filter group.
   * Required for filters to work. If omitted, filters are shown but not applied.
   */
  getFilterValue?: (item: T, groupId: string) => string | string[];
  /** When true (default if filterGroups exist), show the Filter button */
  showFilters?: boolean;
  /** When true (default), show active filter chips below the toolbar */
  showActiveFilterChips?: boolean;
  /** When true (default), clear search when Clear All is triggered */
  clearSearchOnClearAll?: boolean;

  // ── Visibility controls ───────────────────────────────────────────────────────
  /**
   * When false, the template does not render its own title/description header.
   * Use when the consuming page already provides a header via AppShell.
   * Default: true.
   */
  showHeader?: boolean;
  /** When false, the search input is hidden. Default: true. */
  showSearch?: boolean;

  // ── Toolbar ──────────────────────────────────────────────────────────────────
  primaryAction?: React.ReactNode;
  secondaryActions?: React.ReactNode;
  updatedAt?: string;
  onRefresh?: () => void;

  // ── States ───────────────────────────────────────────────────────────────────
  isLoading?: boolean;
  error?: string | null;
  emptyTitle?: string;
  emptyDescription?: string;
};
