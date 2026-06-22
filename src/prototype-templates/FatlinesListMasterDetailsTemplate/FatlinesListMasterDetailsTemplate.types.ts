import type React from 'react';

export type FatlinesListMasterDetailsTemplateProps<T> = {
  /**
   * Full data set exposed to both panes. The template passes each item
   * to renderDetails when it is selected.
   */
  rows: T[];

  /** Returns a stable unique key for each item — used to look up the selected entity. */
  getRowId: (row: T) => string;

  /** Controlled selected entity ID. Pass null to show no details pane. */
  selectedEntityId: string | null;

  /** Fired when the user clicks a row or closes the details pane. */
  onSelectedEntityChange: (id: string | null) => void;

  /** Renders the full list / table area (left pane). Receives `onRowClick`. */
  renderList: (onRowClick: (row: T) => void, selectedEntityId: string | null) => React.ReactNode;

  /**
   * Renders the details pane content (right pane).
   * Only called when selectedEntityId is non-null and still present in rows.
   */
  renderDetails: (row: T) => React.ReactNode;
};
