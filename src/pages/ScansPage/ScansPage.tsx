import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@idira/design-system';
import { RefreshIcon } from '@idira/design-system/icons';
import { CardListMasterDetailsTemplate } from '../../prototype-templates/CardListMasterDetailsTemplate';
import { TableFiltersTemplate } from '../../prototype-templates/TableFiltersTemplate';
import type { TableColumn } from '../../prototype-templates/TableFiltersTemplate';
import type { ScanEntity } from './ScansPage.types';
import { SCAN_STATUS_META, SCAN_FILTER_GROUPS } from './ScansPage.constants';
import { SCANS_MOCK } from './ScansPage.mock';
import { ProviderIcon } from './components/ProviderIcon';
import { ScanDetailPanel } from './components/ScanDetailPanel';
import './ScansPage.scss';

// ── View mode ─────────────────────────────────────────────────────────────────

type ViewMode = 'table' | 'masterDetails';

// ── Scan name cell ────────────────────────────────────────────────────────────

interface ScanNameCellProps {
  scan: ScanEntity;
}

const ScanNameCell: React.FC<ScanNameCellProps> = ({ scan }) => (
  <div className="scan-name-cell">
    <span className="scan-name-cell__icon">
      <ProviderIcon provider={scan.provider} size={20} />
    </span>
    <div className="scan-name-cell__text">
      <span className="scan-name-cell__name" title={scan.name}>{scan.name}</span>
      <span className="scan-name-cell__meta">
        <span title={`Domain: ${scan.domain}`}>Domain: {scan.domain}</span>
        {' '}
        <span title={`Username: ${scan.username}`}>Username: {scan.username}</span>
        {scan.extraAccounts > 0 && (
          <span className="scan-name-cell__extra"> +{scan.extraAccounts}</span>
        )}
      </span>
    </div>
  </div>
);

// ── Status cell ───────────────────────────────────────────────────────────────

const ScanStatusCell: React.FC<{ scan: ScanEntity }> = ({ scan }) => {
  const meta = SCAN_STATUS_META[scan.status];
  const { Icon } = meta;
  return (
    <span className={`scan-status-cell ${meta.cssClass}`}>
      <Icon size={20} />
      <span className="scan-status-cell__label">{meta.label}</span>
    </span>
  );
};

// ── Row actions ───────────────────────────────────────────────────────────────

interface RowActionsProps {
  scan: ScanEntity;
  onResolveIssues: (scan: ScanEntity) => void;
  onRunStop: (scan: ScanEntity) => void;
}

const RowActions: React.FC<RowActionsProps> = ({ scan, onResolveIssues, onRunStop }) => {
  const isRunning = scan.status === 'running';
  const isFailed = scan.status === 'failed';
  return (
    <div className="scan-row-actions">
      {isFailed && (
        <button
          type="button"
          className="scan-row-actions__resolve"
          onClick={e => { e.stopPropagation(); onResolveIssues(scan); }}
          aria-label={`Resolve issues for ${scan.name}`}
        >
          Resolve issues
        </button>
      )}
      <button
        type="button"
        className="scan-row-actions__run-stop"
        onClick={e => { e.stopPropagation(); onRunStop(scan); }}
        aria-label={isRunning ? `Stop ${scan.name}` : `Run ${scan.name}`}
      >
        {isRunning ? 'Stop' : 'Run'}
      </button>
      <button
        type="button"
        className="scan-row-actions__menu"
        onClick={e => e.stopPropagation()}
        aria-label="More actions"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="4" r="1.2" fill="currentColor"/>
          <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
          <circle cx="8" cy="12" r="1.2" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
};

// ── ScansPage ─────────────────────────────────────────────────────────────────

export const ScansPage: React.FC = () => {
  const [scans, setScans] = useState<ScanEntity[]>(SCANS_MOCK);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedScanId, setSelectedScanId] = useState<string | null>(null);

  const selectedScan = useMemo(
    () => scans.find(s => s.id === selectedScanId) ?? null,
    [scans, selectedScanId],
  );

  const handleRowClick = useCallback((scan: ScanEntity) => {
    setSelectedScanId(scan.id);
    setViewMode('masterDetails');
  }, []);

  const handleCloseDetails = useCallback(() => {
    setViewMode('table');
    setSelectedScanId(null);
  }, []);

  const handleResolveIssues = useCallback((scan: ScanEntity) => {
    setSelectedScanId(scan.id);
    setViewMode('masterDetails');
  }, []);

  const handleRunStop = useCallback((scan: ScanEntity) => {
    setScans(prev => prev.map(s =>
      s.id === scan.id
        ? { ...s, status: s.status === 'running' ? 'completed' : 'running' }
        : s,
    ));
  }, []);

  const handleAutoResolutionChange = useCallback((scanId: string, enabled: boolean) => {
    setScans(prev => prev.map(s =>
      s.id === scanId ? { ...s, autoResolutionEnabled: enabled } : s,
    ));
  }, []);

  const getFilterValue = useCallback((scan: ScanEntity, groupId: string) => {
    if (groupId === 'provider') return scan.provider;
    if (groupId === 'status')   return scan.status;
    return '';
  }, []);

  const searchableFields = useMemo(() => [
    (s: ScanEntity) => s.name,
    (s: ScanEntity) => s.scanType,
    (s: ScanEntity) => s.domain,
  ], []);

  const tableColumns = useMemo<TableColumn<ScanEntity>[]>(() => [
    {
      id: 'name',
      label: 'Name',
      render: (row) => <ScanNameCell scan={row} />,
    },
    {
      id: 'scanType',
      label: 'Scan type',
      render: (row) => <span className="scan-cell-text" title={row.scanType}>{row.scanType}</span>,
    },
    {
      id: 'schedule',
      label: 'Schedule',
      render: (row) => (
        <span
          className={`scan-cell-text${!row.schedule ? ' scan-cell-text--muted' : ''}`}
          title={row.schedule ?? 'Inactive'}
        >
          {row.schedule ?? 'Inactive'}
        </span>
      ),
    },
    {
      id: 'time',
      label: 'Time',
      render: (row) => (
        <span
          className={`scan-cell-text${!row.time ? ' scan-cell-text--muted' : ''}`}
          title={row.time ?? '—'}
        >
          {row.time ?? '—'}
        </span>
      ),
      hideWhenNarrow: true,
    },
    {
      id: 'lastRun',
      label: 'Last run',
      render: (row) => <span className="scan-cell-text" title={row.lastRun}>{row.lastRun}</span>,
      hideWhenNarrow: true,
    },
    {
      id: 'status',
      label: 'Status',
      render: (row) => <ScanStatusCell scan={row} />,
    },
    {
      id: 'actions',
      label: '',
      narrow: true,
      render: (row) => (
        <RowActions
          scan={row}
          onResolveIssues={handleResolveIssues}
          onRunStop={handleRunStop}
        />
      ),
    },
  ], [handleResolveIssues, handleRunStop]);

  // ── Primary action ────────────────────────────────────────────────────────

  const primaryAction = (
    <Button variant="primary" size="sm">
      Define scan type
    </Button>
  );

  const refreshAction = (
    <button type="button" className="scans-refresh-btn" aria-label="Refresh">
      <RefreshIcon size={16} aria-hidden="true" />
    </button>
  );

  // ── Table view ────────────────────────────────────────────────────────────

  if (viewMode === 'table') {
    return (
      <div className="scans-page">
        <TableFiltersTemplate<ScanEntity>
          title="Scans"
          rows={scans}
          columns={tableColumns}
          getRowId={(s) => s.id}
          selectable
          searchPlaceholder="Search / Filter"
          searchableFields={searchableFields}
          filterGroups={SCAN_FILTER_GROUPS}
          getFilterValue={getFilterValue}
          emptyTitle="No scans found"
          emptyDescription="No scans match your current filters."
          onRowClick={handleRowClick}
          primaryAction={primaryAction}
          secondaryActions={refreshAction}
          updatedAt="08:58 AM"
        />
      </div>
    );
  }

  // ── Master-details view ───────────────────────────────────────────────────

  return (
    <div className="scans-page scans-page--details">
      <CardListMasterDetailsTemplate<ScanEntity>
        title="Scans"
        items={scans}
        getItemId={(s) => s.id}
        getItemTitle={(s) => s.name}
        getItemSubtitle={(s) => s.scanType}
        getItemMeta={(s) => (
          <span className="scan-card-meta">
            <span>Domain: {s.domain}</span>
            {' · '}
            <span>Address: {s.address}</span>
          </span>
        )}
        getItemStatus={(s) => {
          const meta = SCAN_STATUS_META[s.status];
          const { Icon } = meta;
          return <Icon size={20} />;
        }}
        getItemIcon={(s) => <ProviderIcon provider={s.provider} size={32} />}
        renderDetails={(scan) => (
          <ScanDetailPanel
            scan={scan}
            onClose={handleCloseDetails}
            onAutoResolutionChange={handleAutoResolutionChange}
          />
        )}
        initialSelectedId={selectedScanId ?? undefined}
        searchPlaceholder="Search / Filter"
        searchableFields={searchableFields}
        filterGroups={SCAN_FILTER_GROUPS}
        getFilterValue={getFilterValue}
        primaryAction={primaryAction}
        secondaryActions={refreshAction}
        updatedAt="08:58 AM"
        emptyTitle="No scans found"
        showHeader={false}
      />
    </div>
  );
};
