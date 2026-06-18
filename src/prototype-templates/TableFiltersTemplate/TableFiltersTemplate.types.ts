/**
 * TableFiltersTemplate — Type definitions
 *
 * This is a Page Composition Template, not a DS component.
 * It assembles existing Infra / DS components into a reusable table-page pattern.
 */

import type React from 'react';

export type TableFilterOption = {
  label: string;
  value: string;
};

export type TableFilterGroup = {
  id: string;
  label: string;
  type: 'single-select' | 'multi-select';
  options: TableFilterOption[];
};

export type ActiveFilterChip = {
  groupId: string;
  groupLabel: string;
  value: string;
  label: string;
};

export type TableColumn<T> = {
  id: string;
  label: string;
  render: (row: T) => React.ReactNode;
  searchableValue?: (row: T) => string;
  hideWhenNarrow?: boolean;
};

export type TableFiltersTemplateProps<T> = {
  /** Page title shown in the header area */
  title: string;
  /** Optional subtitle below the title */
  description?: string;

  /** Full data set — filtering is applied locally */
  rows: T[];
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Returns a stable unique key for each row */
  getRowId: (row: T) => string;

  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Functions that extract searchable string values from a row */
  searchableFields?: Array<(row: T) => string>;

  /** Filter group definitions rendered inside the filter panel */
  filterGroups?: TableFilterGroup[];
  /**
   * Returns the filter value(s) for a given row and group.
   * Return a string for single-select groups, string[] for multi-select.
   */
  getFilterValue?: (row: T, groupId: string) => string | string[];

  /** Rendered in the toolbar right area as the primary CTA */
  primaryAction?: React.ReactNode;
  /** Rendered in the toolbar right area before the primary CTA */
  secondaryActions?: React.ReactNode;
  /** Per-row actions rendered in the actions cell */
  rowActions?: (row: T) => React.ReactNode;

  /** Timestamp string shown next to the refresh button */
  updatedAt?: string;
  /** Callback for the refresh icon button */
  onRefresh?: () => void;

  /** When true, shows the LoadingState instead of the table */
  isLoading?: boolean;
  /** When set, shows the ErrorState */
  error?: string | null;
  /** Empty state heading — shown when rows array is empty */
  emptyTitle?: string;
  /** Empty state description — shown when rows array is empty */
  emptyDescription?: string;

  /** Callback fired when a row is clicked */
  onRowClick?: (row: T) => void;
};
