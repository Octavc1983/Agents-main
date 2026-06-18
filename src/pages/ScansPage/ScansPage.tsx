/**
 * ScansPage
 * Matches Figma: Scans-UX-Production (node 592-25414)
 * PROTOTYPE: Uses mock data only. No backend integration.
 *
 * Master-Details behavior:
 *   - Default state: full-width table view
 *   - Row click: opens details panel on the right (isDetailsOpen = true)
 *   - X button: closes panel, returns to full-width table (isDetailsOpen = false)
 *
 * To test different view states, change the initial value of `viewState`:
 *   'default' | 'loading' | 'empty' | 'error'
 */

import React, { useState, useMemo, useRef } from 'react';
import type { ComponentState, Scan, ScanStatus } from '../../types/prototype.types';
import { mockScans, mockScanFindings } from '../../mock/scansMockData';
import { LoadingState } from '../../components/ui/LoadingState/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState/ErrorState';
import { HorizontalTabs } from '../../design-system/components/HorizontalTabs/HorizontalTabs';
import type { TabItem } from '../../design-system/components/HorizontalTabs/HorizontalTabs';
import {
  FilterIcon,
  RefreshIcon,
  DotsMenuIcon,
  SearchIcon,
  PlusIcon,
  CloseIcon,
  AWSIcon,
  GCPIcon,
  AzureIcon,
  EntraIDIcon,
  StatusFailedIcon,
  StatusCompletedIcon,
  StatusPendingIcon,
  StatusRunningIcon,
  StatusStoppedIcon,
  ScansIcon,
  CheckCircleIcon,
  WarningIcon,
  ErrorCircleIcon,
  InfoIcon,
} from '../../assets/icons/NavIcons';
import './ScansPage.scss';

// ── Provider icon map ─────────────────────────────────────────────────────────

const ProviderIcon: React.FC<{ provider: string }> = ({ provider }) => {
  switch (provider) {
    case 'aws':   return <AWSIcon size={20} aria-label="AWS" />;
    case 'gcp':   return <GCPIcon size={20} aria-label="GCP" />;
    case 'azure': return <AzureIcon size={20} aria-label="Azure" />;
    case 'entra': return <EntraIDIcon size={20} aria-label="Entra ID" />;
    default:      return null;
  }
};

// ── Status cell ───────────────────────────────────────────────────────────────

const StatusCell: React.FC<{ status: ScanStatus }> = ({ status }) => {
  const configs: Record<ScanStatus, { icon: React.ReactNode; label: string; cls: string }> = {
    failed:    { icon: <StatusFailedIcon size={14} />,    label: 'Failed',    cls: 'failed' },
    completed: { icon: <StatusCompletedIcon size={14} />, label: 'Completed', cls: 'completed' },
    pending:   { icon: <StatusPendingIcon size={14} />,   label: 'Pending',   cls: 'pending' },
    running:   { icon: <StatusRunningIcon size={14} />,   label: 'Running',   cls: 'running' },
    stopped:   { icon: <StatusStoppedIcon size={14} />,   label: 'Stopped',   cls: 'stopped' },
  };
  const { icon, label, cls } = configs[status];
  return (
    <span className={`scan-status scan-status--${cls}`}>
      {icon}
      <span>{label}</span>
    </span>
  );
};

// ── Severity icon (findings) ──────────────────────────────────────────────────

const SeverityIcon: React.FC<{ severity: string }> = ({ severity }) => {
  switch (severity) {
    case 'critical':
    case 'high':   return <ErrorCircleIcon size={14} />;
    case 'medium': return <WarningIcon size={14} />;
    case 'low':    return <InfoIcon size={14} />;
    default:       return <CheckCircleIcon size={14} />;
  }
};

// ── Details panel tab definitions ────────────────────────────────────────────

const DETAIL_TABS: TabItem[] = [
  { id: 'overview',  label: 'Overview' },
  { id: 'findings',  label: 'Findings' },
  { id: 'activity',  label: 'Activity' },
];

// ── Details panel ─────────────────────────────────────────────────────────────

interface DetailsPanelProps {
  scan: Scan;
  activeTab: string;
  onTabChange: (id: string) => void;
  onClose: () => void;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ scan, activeTab, onTabChange, onClose }) => {
  const findings = mockScanFindings;

  return (
    <div className="scan-details" role="complementary" aria-label={`Details for ${scan.name}`}>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="scan-details__header">
        <div className="scan-details__header-top">
          <div className="scan-details__title-row">
            <div className="scan-details__provider-icon">
              <ProviderIcon provider={scan.provider} />
            </div>
            <div className="scan-details__title-info">
              <span className="scan-details__title">{scan.name}</span>
              <span className="scan-details__subtitle">{scan.domain}</span>
            </div>
          </div>
          <button
            className="scan-details__close-btn"
            type="button"
            onClick={onClose}
            aria-label="Close details panel"
          >
            <CloseIcon size={14} />
          </button>
        </div>

        <div className="scan-details__header-actions">
          {scan.status === 'failed' && (
            <button className="scan-details__action-btn scan-details__action-btn--resolve" type="button">
              Resolve issues
            </button>
          )}
          {scan.status === 'running' ? (
            <button className="scan-details__action-btn scan-details__action-btn--stop" type="button">
              Stop
            </button>
          ) : scan.status !== 'stopped' ? (
            <button className="scan-details__action-btn scan-details__action-btn--run" type="button">
              Run
            </button>
          ) : null}
          <button className="scan-details__action-btn scan-details__action-btn--menu" type="button" aria-label="More actions">
            <DotsMenuIcon size={14} />
          </button>
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────── */}
      <div className="scan-details__tabs">
        <HorizontalTabs
          items={DETAIL_TABS}
          activeId={activeTab}
          onChange={onTabChange}
          className="scan-details__horizontal-tabs"
        />
      </div>

      {/* ── Tab content ──────────────────────────────────────────────── */}
      <div className="scan-details__body">

        {activeTab === 'overview' && (
          <div className="scan-details__overview">
            <div className="scan-details__meta-grid">
              <div className="scan-details__meta-item">
                <span className="scan-details__meta-label">Status</span>
                <span className="scan-details__meta-value">
                  <StatusCell status={scan.status} />
                </span>
              </div>
              <div className="scan-details__meta-item">
                <span className="scan-details__meta-label">Scan Type</span>
                <span className="scan-details__meta-value">{scan.scanType}</span>
              </div>
              <div className="scan-details__meta-item">
                <span className="scan-details__meta-label">Schedule</span>
                <span className="scan-details__meta-value">{scan.schedule || 'Inactive'}</span>
              </div>
              <div className="scan-details__meta-item">
                <span className="scan-details__meta-label">Time</span>
                <span className="scan-details__meta-value">{scan.time || '—'}</span>
              </div>
              <div className="scan-details__meta-item">
                <span className="scan-details__meta-label">Last Run</span>
                <span className="scan-details__meta-value">{scan.lastRun}</span>
              </div>
              <div className="scan-details__meta-item">
                <span className="scan-details__meta-label">Username</span>
                <span className="scan-details__meta-value">{scan.username}</span>
              </div>
            </div>

            <div className="scan-details__findings-summary">
              <span className="scan-details__section-label">Findings Summary</span>
              <div className="scan-details__severity-row">
                {(['critical', 'high', 'medium', 'low', 'info'] as const).map((sev) => (
                  <div key={sev} className={`scan-details__severity-chip scan-details__severity-chip--${sev}`}>
                    <span className="scan-details__severity-count">{scan.findingsCount[sev]}</span>
                    <span className="scan-details__severity-label">{sev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'findings' && (
          <div className="scan-details__findings-list">
            {findings.length === 0 ? (
              <p className="scan-details__empty-text">No findings for this scan.</p>
            ) : (
              findings.map((finding) => (
                <div key={finding.id} className={`scan-details__finding-row scan-details__finding-row--${finding.severity}`}>
                  <div className="scan-details__finding-icon">
                    <SeverityIcon severity={finding.severity} />
                  </div>
                  <div className="scan-details__finding-info">
                    <span className="scan-details__finding-title">{finding.title}</span>
                    <span className="scan-details__finding-meta">
                      {finding.target} &nbsp;·&nbsp; {new Date(finding.detectedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`scan-details__finding-badge scan-details__finding-badge--${finding.severity}`}>
                    {finding.severity}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="scan-details__placeholder">
            <ScansIcon size={32} aria-hidden="true" />
            <span>Activity history will appear here.</span>
          </div>
        )}

      </div>
    </div>
  );
};

// ── ScansPage ─────────────────────────────────────────────────────────────────

export const ScansPage: React.FC = () => {
  // Change viewState initial value to test different states: 'loading' | 'empty' | 'error'
  const [viewState] = useState<ComponentState>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [selectedItem, setSelectedItem] = useState<Scan | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDetailsClosing, setIsDetailsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const closingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredScans = useMemo<Scan[]>(() => {
    if (!searchQuery.trim()) return mockScans;
    const q = searchQuery.toLowerCase();
    return mockScans.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.scanType.toLowerCase().includes(q) ||
        s.domain.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleRowClick = (scan: Scan) => {
    // Cancel any in-progress close animation before opening a new selection
    if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
    setIsDetailsClosing(false);
    setSelectedItem(scan);
    setIsDetailsOpen(true);
    setActiveTab('overview');
  };

  const handleCloseDetails = () => {
    if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
    setIsDetailsClosing(true);
    closingTimerRef.current = setTimeout(() => {
      setIsDetailsOpen(false);
      setIsDetailsClosing(false);
      setSelectedItem(null);
    }, 220);
  };

  const toggleCheckbox = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="scans-page">

      {viewState === 'loading' && <LoadingState message="Loading scans…" />}

      {viewState === 'error' && (
        <ErrorState
          title="Failed to load scans"
          message="An error occurred while fetching scan data. Please try again."
        />
      )}

      {viewState === 'empty' && (
        <EmptyState
          title="No scans found"
          description="Define a scan type to start discovering vulnerabilities in your environment."
          icon={<ScansIcon size={48} aria-hidden="true" />}
        />
      )}

      {viewState === 'default' && (
        <>
          {/* ── Toolbar ───────────────────────────────────────────────── */}
          <div className="scans-toolbar">
            <div className="scans-toolbar__left">
              <button className="scans-toolbar__filter-btn" type="button" aria-label="Filter">
                <FilterIcon size={14} />
                <span>Filter</span>
              </button>
              <div className="scans-toolbar__search-wrap">
                <SearchIcon size={14} className="scans-toolbar__search-icon" aria-hidden="true" />
                <input
                  className="scans-toolbar__search"
                  type="search"
                  placeholder="Search / Filter"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search scans"
                />
              </div>
            </div>
            <div className="scans-toolbar__right">
              <button className="scans-toolbar__define-btn" type="button">
                <PlusIcon size={14} />
                <span>Define scan type</span>
              </button>
              <button className="scans-toolbar__refresh-btn" type="button" aria-label="Refresh">
                <RefreshIcon size={16} />
              </button>
            </div>
          </div>

          {/* ── Meta row ─────────────────────────────────────────────── */}
          <div className="scans-meta-row">
            <span className="scans-meta-row__selection">
              {selectedIds.size > 0 ? `${selectedIds.size} selected` : `${filteredScans.length} scans`}
            </span>
            <span className="scans-meta-row__timestamp">
              Updated at 08:58 AM
              <button className="scans-meta-row__refresh-inline" type="button" aria-label="Refresh now">
                <RefreshIcon size={12} />
              </button>
            </span>
          </div>

          {/* ── Master-Details content area ───────────────────────────── */}
          <div className={[
            'scans-content',
            isDetailsOpen ? 'scans-content--details-open' : '',
            isDetailsClosing ? 'scans-content--details-closing' : '',
          ].filter(Boolean).join(' ')}>

            {/* Master list */}
            <section className="scans-content__master">
              <div className="scans-table-wrap">
                <table className="scans-table" aria-label="Scans list">
                  <thead>
                    <tr>
                      <th className="scans-table__th scans-table__th--check">
                        <input
                          type="checkbox"
                          aria-label="Select all"
                          className="scans-table__checkbox"
                          onChange={() => {
                            if (selectedIds.size === filteredScans.length) setSelectedIds(new Set());
                            else setSelectedIds(new Set(filteredScans.map((s) => s.id)));
                          }}
                          checked={selectedIds.size === filteredScans.length && filteredScans.length > 0}
                          readOnly
                        />
                      </th>
                      <th className="scans-table__th">NAME</th>
                      {!isDetailsOpen && (
                        <>
                          <th className="scans-table__th">SCANTYPE</th>
                          <th className="scans-table__th">SCHEDULE</th>
                          <th className="scans-table__th">TIME</th>
                          <th className="scans-table__th">LAST RUN</th>
                        </>
                      )}
                      <th className="scans-table__th">STATUS</th>
                      <th className="scans-table__th scans-table__th--actions" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredScans.length === 0 ? (
                      <tr>
                        <td colSpan={isDetailsOpen ? 4 : 8} className="scans-table__empty">
                          No scans match the current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredScans.map((scan) => (
                        <tr
                          key={scan.id}
                          className={[
                            'scans-table__row',
                            selectedIds.has(scan.id) ? 'scans-table__row--selected' : '',
                            isDetailsOpen && selectedItem?.id === scan.id ? 'scans-table__row--active' : '',
                          ].filter(Boolean).join(' ')}
                          onClick={() => handleRowClick(scan)}
                          aria-selected={isDetailsOpen && selectedItem?.id === scan.id}
                        >
                          <td className="scans-table__td scans-table__td--check" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              className="scans-table__checkbox"
                              checked={selectedIds.has(scan.id)}
                              onChange={() => toggleCheckbox(scan.id)}
                              aria-label={`Select ${scan.name}`}
                            />
                          </td>

                          <td className="scans-table__td scans-table__td--name">
                            <div className="scan-name-cell">
                              <div className="scan-name-cell__provider">
                                <ProviderIcon provider={scan.provider} />
                              </div>
                              <div className="scan-name-cell__info">
                                <span className="scan-name-cell__title">{scan.name}</span>
                                <span className="scan-name-cell__meta">
                                  {scan.domain}
                                  {!isDetailsOpen && ` · ${scan.username}${scan.extraAccounts ? ` +${scan.extraAccounts}` : ''}`}
                                </span>
                              </div>
                            </div>
                          </td>

                          {!isDetailsOpen && (
                            <>
                              <td className="scans-table__td scans-table__td--scantype">
                                <span className="scan-type-tag">{scan.scanType}</span>
                              </td>
                              <td className="scans-table__td scans-table__td--schedule">
                                {scan.schedule
                                  ? <span className="scan-schedule">{scan.schedule}</span>
                                  : <span className="scan-inactive">Inactive</span>
                                }
                              </td>
                              <td className="scans-table__td scans-table__td--time">
                                {scan.time || <span className="scan-empty-cell">—</span>}
                              </td>
                              <td className="scans-table__td scans-table__td--lastrun">
                                {scan.lastRun}
                              </td>
                            </>
                          )}

                          <td className="scans-table__td scans-table__td--status">
                            <StatusCell status={scan.status} />
                          </td>

                          <td className="scans-table__td scans-table__td--actions" onClick={(e) => e.stopPropagation()}>
                            <div className="scan-row-actions">
                              {!isDetailsOpen && scan.status === 'failed' && (
                                <button className="scan-row-actions__resolve" type="button">
                                  Resolve issues
                                </button>
                              )}
                              {scan.status === 'running' ? (
                                <button className="scan-row-actions__stop" type="button">Stop</button>
                              ) : scan.status !== 'stopped' ? (
                                <button className="scan-row-actions__run" type="button">Run</button>
                              ) : null}
                              <button className="scan-row-actions__menu" type="button" aria-label="More actions">
                                <DotsMenuIcon size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Details panel — rendered while open or animating closed */}
            {(isDetailsOpen || isDetailsClosing) && selectedItem && (
              <aside className={`scans-content__details${isDetailsClosing ? ' scans-content__details--closing' : ''}`}>
                <DetailsPanel
                  scan={selectedItem}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  onClose={handleCloseDetails}
                />
              </aside>
            )}

          </div>
        </>
      )}
    </div>
  );
};

export default ScansPage;
