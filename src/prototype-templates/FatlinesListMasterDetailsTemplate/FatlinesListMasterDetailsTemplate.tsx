import React, { useMemo, useCallback, useEffect } from 'react';
import type { FatlinesListMasterDetailsTemplateProps } from './FatlinesListMasterDetailsTemplate.types';
import './FatlinesListMasterDetailsTemplate.scss';

export function FatlinesListMasterDetailsTemplate<T>(
  props: FatlinesListMasterDetailsTemplateProps<T>,
): React.ReactElement {
  const {
    rows,
    getRowId,
    selectedEntityId,
    onSelectedEntityChange,
    renderList,
    renderDetails,
  } = props;

  // ── Derived: selected entity ───────────────────────────────────────────────

  const selectedRow = useMemo<T | null>(() => {
    if (!selectedEntityId) return null;
    return rows.find((r) => getRowId(r) === selectedEntityId) ?? null;
  }, [rows, selectedEntityId, getRowId]);

  // ── Auto-deselect when selected entity is filtered out ─────────────────────

  useEffect(() => {
    if (!selectedEntityId) return;
    const stillPresent = rows.some((r) => getRowId(r) === selectedEntityId);
    if (!stillPresent) {
      onSelectedEntityChange(null);
    }
  }, [rows, selectedEntityId, getRowId, onSelectedEntityChange]);

  // ── Row click ──────────────────────────────────────────────────────────────

  const handleRowClick = useCallback(
    (row: T) => {
      const id = getRowId(row);
      onSelectedEntityChange(selectedEntityId === id ? null : id);
    },
    [getRowId, selectedEntityId, onSelectedEntityChange],
  );

  const hasDetails = selectedRow !== null;

  return (
    <div className={`fatlinesMD${hasDetails ? '' : ' fatlinesMD--no-details'}`}>

      {/* ── List pane ───────────────────────────────────────────────── */}
      <div className="fatlinesMD__listPane">
        {renderList(handleRowClick, selectedEntityId)}
      </div>

      {/* ── Details pane ────────────────────────────────────────────── */}
      {hasDetails && (
        <div className="fatlinesMD__detailsPane">
          {renderDetails(selectedRow)}
        </div>
      )}

    </div>
  );
}

export default FatlinesListMasterDetailsTemplate;
