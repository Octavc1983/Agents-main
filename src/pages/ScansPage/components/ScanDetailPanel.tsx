import React, { useState } from 'react';
import { Button } from '@idira/design-system';
import type { ScanEntity } from '../ScansPage.types';
import { SCAN_STATUS_META } from '../ScansPage.constants';
import { ProviderIcon } from './ProviderIcon';
import { ScanInstanceCard } from './ScanInstanceCard';
import { ResolveScanIssuesModal } from './ResolveScanIssuesModal';

type DetailTab = 'overview' | 'instances' | 'insights';

interface ScanDetailPanelProps {
  scan: ScanEntity;
  onClose: () => void;
  onAutoResolutionChange: (scanId: string, enabled: boolean) => void;
}

export const ScanDetailPanel: React.FC<ScanDetailPanelProps> = ({
  scan,
  onClose,
  onAutoResolutionChange,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(scan.status === 'running');

  const statusMeta = SCAN_STATUS_META[scan.status];
  const instanceCount = scan.instances.length;
  const isFailed = scan.status === 'failed';

  const handleRunStop = () => {
    setIsRunning(prev => !prev);
  };

  const handleOpenResolveModal = () => {
    setIsResolveModalOpen(true);
  };

  const handleResolve = () => {
    onAutoResolutionChange(scan.id, true);
    setIsResolveModalOpen(false);
  };

  const handleStopAutoResolution = () => {
    onAutoResolutionChange(scan.id, false);
  };

  return (
    <div className="scan-detail-panel">

      {/* ── Panel header ─────────────────────────────────────────────── */}
      <div className="scan-detail-panel__header">
        <div className="scan-detail-panel__header-left">
          <span className="scan-detail-panel__provider-icon">
            <ProviderIcon provider={scan.provider} size={20} />
          </span>
          <span className="scan-detail-panel__name" title={scan.name}>{scan.name}</span>
        </div>
        <div className="scan-detail-panel__header-actions">
          {scan.autoResolutionEnabled ? (
            <Button variant="secondary" size="sm" onClick={handleStopAutoResolution}>
              Stop automatic resolution
            </Button>
          ) : isFailed ? (
            <Button variant="secondary" size="sm" onClick={handleOpenResolveModal}>
              Resolve issues
            </Button>
          ) : null}

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunStop}
          >
            {isRunning ? 'Stop' : 'Run'}
          </Button>

          <button
            type="button"
            className="scan-detail-panel__menu-btn"
            aria-label="More actions"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="3" r="1.2" fill="currentColor"/>
              <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
              <circle cx="8" cy="13" r="1.2" fill="currentColor"/>
            </svg>
          </button>

          <button
            type="button"
            className="scan-detail-panel__close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Status row ───────────────────────────────────────────────── */}
      <div className="scan-detail-panel__meta-row">
        <span className={`scan-detail-panel__status ${statusMeta.cssClass}`}>
          <statusMeta.Icon size={16} />
          <span className="scan-detail-panel__status-label">{statusMeta.label}</span>
        </span>
        <span className="scan-detail-panel__meta-sep" aria-hidden="true" />
        <span className="scan-detail-panel__last-run">
          Last run: {scan.lastRun}
        </span>
        <span className="scan-detail-panel__meta-sep" aria-hidden="true" />
        <span className="scan-detail-panel__occurrence">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span>{scan.occurrenceDescription}</span>
        </span>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────── */}
      <div className="scan-detail-panel__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          className={`scan-detail-panel__tab${activeTab === 'overview' ? ' scan-detail-panel__tab--active' : ''}`}
          aria-selected={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          type="button"
          role="tab"
          className={`scan-detail-panel__tab${activeTab === 'instances' ? ' scan-detail-panel__tab--active' : ''}`}
          aria-selected={activeTab === 'instances'}
          onClick={() => setActiveTab('instances')}
        >
          Latest instances ({instanceCount})
        </button>
        <button
          type="button"
          role="tab"
          className={`scan-detail-panel__tab${activeTab === 'insights' ? ' scan-detail-panel__tab--active' : ''}`}
          aria-selected={activeTab === 'insights'}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
      </div>

      {/* ── Tab content ──────────────────────────────────────────────── */}
      <div className="scan-detail-panel__tab-content">
        {activeTab === 'overview' && (
          <div className="scan-detail-panel__overview">
            <dl className="scan-detail-panel__fields">
              <div className="scan-detail-panel__field">
                <dt>Domain</dt>
                <dd title={scan.domain}>{scan.domain}</dd>
              </div>
              <div className="scan-detail-panel__field">
                <dt>Address</dt>
                <dd title={scan.address}>{scan.address}</dd>
              </div>
              <div className="scan-detail-panel__field">
                <dt>Scan type</dt>
                <dd title={scan.scanType}>{scan.scanType}</dd>
              </div>
              <div className="scan-detail-panel__field">
                <dt>Schedule</dt>
                <dd title={scan.schedule ?? 'Immediate'}>{scan.schedule ?? 'Immediate'}</dd>
              </div>
            </dl>
          </div>
        )}

        {activeTab === 'instances' && (
          <div className="scan-detail-panel__instances">
            {scan.instances.map((instance, idx) => (
              <ScanInstanceCard
                key={instance.id}
                instance={instance}
                defaultOpen={idx === 0}
              />
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="scan-detail-panel__insights-placeholder">
            <p>Insights coming soon.</p>
          </div>
        )}
      </div>

      <ResolveScanIssuesModal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        onResolve={handleResolve}
      />
    </div>
  );
};
