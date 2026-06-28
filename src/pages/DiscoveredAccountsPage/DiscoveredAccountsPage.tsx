import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SeverityBadge } from '@idira/design-system';
import { StatusIcon } from '../../components/shared/StatusIcon';
import { PROVIDER_ICON_MAP } from '../../components/shared/provider-icons';
import { usePopoverPosition } from '../../components/shared/hooks/usePopoverPosition';
import { BriefingBar } from '../../features/briefing-bar/BriefingBar';
import type {
  DiscoveredAccount,
  DiscoveredAccountStatus,
  DiscoveredAccountPlatform,
  DiscoveredAccountRiskLevel,
} from '../../types/prototype.types';
import { discoveredAccountsMock, discoveredAccountsStats } from '../../mock/discoveredAccountsMockData';
import './DiscoveredAccountsPage.scss';

// ── Tags cell (reuse pattern from Secrets/ManagedAccounts) ───────────────────

const MAX_VISIBLE_TAGS = 3;
const MAX_CALLOUT_TAGS = 15;
const CALLOUT_WIDTH = 320;
const CALLOUT_MAX_HEIGHT = 280;

interface TagsCellProps {
  tags: string[];
  accountName: string;
  popoverId: string;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

const TagChip: React.FC<{ tag: string }> = ({ tag }) => {
  const colonIdx = tag.indexOf(':');
  const hasValue = colonIdx > 0;
  const key = hasValue ? tag.slice(0, colonIdx) : tag;
  const value = hasValue ? tag.slice(colonIdx + 1) : null;
  return (
    <span className="da-tag">
      <strong className="da-tag__key">{key}</strong>
      {value !== null && <span className="da-tag__value">:{value}</span>}
    </span>
  );
};

const TagsCell: React.FC<TagsCellProps> = ({
  tags, accountName, popoverId, openPopoverId, setOpenPopoverId,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const calloutOpen = openPopoverId === popoverId;

  const calloutPos = usePopoverPosition(
    { isOpen: calloutOpen, triggerRef: btnRef, placement: 'bottom-start' },
    CALLOUT_WIDTH,
    CALLOUT_MAX_HEIGHT,
  );

  const visible = tags.slice(0, MAX_VISIBLE_TAGS);
  const overflow = tags.length - MAX_VISIBLE_TAGS;
  const calloutTags = tags.slice(0, MAX_CALLOUT_TAGS);

  const openCallout = useCallback(() => {
    setOpenPopoverId(popoverId);
  }, [popoverId, setOpenPopoverId]);

  useEffect(() => {
    if (!calloutOpen) return;
    const handler = (e: MouseEvent) => {
      if (calloutRef.current && !calloutRef.current.contains(e.target as Node) &&
          btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setOpenPopoverId(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [calloutOpen, setOpenPopoverId]);

  if (!tags.length) return <span className="da-cell-text da-cell-text--muted">—</span>;

  return (
    <div className="da-tags-cell">
      {visible.map((tag, i) => <TagChip key={`${tag}-${i}`} tag={tag} />)}
      {overflow > 0 && (
        <button
          ref={btnRef}
          type="button"
          className="da-tag da-tag--overflow-btn"
          onClick={calloutOpen ? () => setOpenPopoverId(null) : openCallout}
          aria-expanded={calloutOpen}
          aria-label={`Show ${overflow} more tags`}
        >
          +{overflow}
        </button>
      )}
      {calloutOpen && ReactDOM.createPortal(
        <div
          ref={calloutRef}
          className="da-tags-callout"
          style={{ top: calloutPos.top, left: calloutPos.left }}
          role="dialog"
          aria-label={`Tags — ${accountName}`}
        >
          <div className="da-tags-callout__header">
            <span className="da-tags-callout__title">Tags — {accountName}</span>
            <button type="button" className="da-tags-callout__close"
              onClick={() => setOpenPopoverId(null)} aria-label="Close">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M12.667 3.333L3.334 12.667M3.334 3.333l9.333 9.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="da-tags-callout__body">
            {calloutTags.map((tag, i) => <TagChip key={`${tag}-${i}`} tag={tag} />)}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};

// ── Filter groups ─────────────────────────────────────────────────────────────

interface FilterGroup {
  id: string;
  label: string;
  type: 'multi-select';
  options: Array<{ value: string; label: string }>;
}

const FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'platform', label: 'Platform', type: 'multi-select',
    options: [
      { value: 'Windows', label: 'Windows' },
      { value: 'Linux', label: 'Linux' },
      { value: 'AWS', label: 'AWS' },
      { value: 'Azure', label: 'Azure' },
      { value: 'GCP', label: 'GCP' },
      { value: 'MacOS', label: 'MacOS' },
      { value: 'Ubuntu', label: 'Ubuntu' },
      { value: 'RHEL', label: 'RHEL' },
    ],
  },
  {
    id: 'status', label: 'Status', type: 'multi-select',
    options: [
      { value: 'onboarded', label: 'Onboarded' },
      { value: 'not_rotated', label: 'Not rotated' },
      { value: 'idle', label: 'Idle' },
      { value: 'rule_set_error', label: 'Rule set error' },
      { value: 'disabled', label: 'Disabled' },
    ],
  },
  {
    id: 'riskLevel', label: 'Risk', type: 'multi-select',
    options: [
      { value: 'critical', label: 'Critical' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ],
  },
  {
    id: 'source', label: 'Source', type: 'multi-select',
    options: [
      { value: 'EPM', label: 'EPM' },
      { value: 'Scanner', label: 'Scanner' },
      { value: 'API', label: 'API' },
      { value: 'Manual', label: 'Manual' },
    ],
  },
];

// ── Main component ────────────────────────────────────────────────────────────

export const DiscoveredAccountsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [detailsTab, setDetailsTab] = useState<string>('overview');

  // Filter logic
  const filteredAccounts = useMemo(() => {
    return discoveredAccountsMock.filter(acc => {
      // Search
      if (search && !acc.name.toLowerCase().includes(search.toLowerCase()) &&
          !acc.username.toLowerCase().includes(search.toLowerCase()) &&
          !acc.address.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      // Platform filter
      if (filters.platform?.length && !filters.platform.includes(acc.platform)) {
        return false;
      }

      // Status filter
      if (filters.status?.length && !filters.status.includes(acc.status)) {
        return false;
      }

      // Risk filter
      if (filters.riskLevel?.length && !filters.riskLevel.includes(acc.riskLevel)) {
        return false;
      }

      // Source filter
      if (filters.source?.length && !filters.source.includes(acc.source)) {
        return false;
      }

      return true;
    });
  }, [search, filters]);

  const selectedAccount = useMemo(() => {
    return filteredAccounts.find(acc => acc.id === selectedAccountId) || null;
  }, [selectedAccountId, filteredAccounts]);

  const handleRowClick = useCallback((account: DiscoveredAccount) => {
    setSelectedAccountId(account.id);
    setDetailsTab('overview');
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedAccountId(null);
  }, []);

  const handleFilterChange = useCallback((filterId: string, values: string[]) => {
    setFilters(prev => ({ ...prev, [filterId]: values }));
  }, []);

  // KPI click handlers
  const handlePlatformClick = useCallback((platform: DiscoveredAccountPlatform) => {
    setFilters(prev => {
      const current = prev.platform || [];
      const newValue = current.includes(platform)
        ? current.filter(p => p !== platform)
        : [...current, platform];
      return { ...prev, platform: newValue };
    });
  }, []);

  const handleStatusClick = useCallback((status: DiscoveredAccountStatus) => {
    setFilters(prev => {
      const current = prev.status || [];
      const newValue = current.includes(status)
        ? current.filter(s => s !== status)
        : [...current, status];
      return { ...prev, status: newValue };
    });
  }, []);

  const handleRiskClick = useCallback((risk: string) => {
    setFilters(prev => {
      const current = prev.riskLevel || [];
      const newValue = current.includes(risk)
        ? current.filter(r => r !== risk)
        : [...current, risk];
      return { ...prev, riskLevel: newValue };
    });
  }, []);

  // Adapt stats to BriefingBar format
  const adaptedStats = useMemo(() => ({
    total: discoveredAccountsStats.total,
    byProvider: discoveredAccountsStats.byPlatform.map(p => ({ provider: p.platform as any, count: p.count })),
    byStatus: discoveredAccountsStats.byStatus as any,
    byRisk: discoveredAccountsStats.byRisk,
  }), []);

  return (
    <div className="da-page">
      {/* KPI Bar */}
      <BriefingBar
        stats={adaptedStats as any}
        activeProviders={filters.platform as any || []}
        activeStatuses={filters.status as any || []}
        activeRisks={filters.riskLevel || []}
        onProviderClick={handlePlatformClick as any}
        onStatusClick={handleStatusClick as any}
        onRiskClick={handleRiskClick}
      />

      {/* Context bar */}
      <div className="da-context-bar">
        <div className="da-context-bar__left">
          <button type="button" className="da-filter-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Filter
          </button>
          <div className="da-search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="da-search__icon">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="da-search__input"
              placeholder="Search by identity name or entitlement (role name)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="da-result-count">{filteredAccounts.length} items</span>
        </div>
        <div className="da-context-bar__right">
          <button type="button" className="da-btn da-btn--secondary">Remove all accounts</button>
          <button type="button" className="da-btn da-btn--primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 8v5m0-5V3m0 5h5M8 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Smart grouping recommendation
          </button>
          <button type="button" className="da-btn-icon" aria-label="Refresh">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8a6 6 0 0 1 6-6m0 0V0m0 2l2 2-2 2m6 2a6 6 0 0 1-6 6m0 0v2m0-2l-2-2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Split layout */}
      <div className="da-split-workspace">
        {/* List pane */}
        <div className="da-list-pane">
          <div className="da-list-header">
            <div className="da-list-header__sort">
              <span className="da-list-header__label">Sort by</span>
              <button type="button" className="da-list-header__sort-btn">
                Risk
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 8.5L3.5 5.5h5L6 8.5Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          {/* FATLINES Table */}
          <div className="da-table-scroll">
            <table className="da-table">
              <thead>
                <tr>
                  <th className="da-th da-th--checkbox"><input type="checkbox" /></th>
                  <th className="da-th da-th--status">STATUS</th>
                  <th className="da-th da-th--identity">IDENTITY NAME</th>
                  <th className="da-th da-th--platform">PLATFORM</th>
                  <th className="da-th da-th--address">ADDRESS</th>
                  <th className="da-th da-th--source">SOURCE</th>
                  <th className="da-th da-th--risk">RISK</th>
                  <th className="da-th da-th--tags">TAGS</th>
                  <th className="da-th da-th--discovered">LAST DISCOVERED</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map(acc => {
                  const Icon = PROVIDER_ICON_MAP[acc.platform as keyof typeof PROVIDER_ICON_MAP] || PROVIDER_ICON_MAP.Windows;
                  const isSelected = acc.id === selectedAccountId;
                  return (
                    <tr
                      key={acc.id}
                      className={`da-row${isSelected ? ' da-row--selected' : ''}`}
                      onClick={() => handleRowClick(acc)}
                    >
                      <td className="da-td da-td--checkbox">
                        <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                      </td>
                      <td className="da-td da-td--status">
                        <StatusIcon status={acc.status as any} size={24} />
                      </td>
                      <td className="da-td da-td--identity">
                        <div className="da-identity">
                          {acc.status === 'rule_set_error' && (
                            <span className="da-error-badge">Rule set error</span>
                          )}
                          <span className="da-identity__name" title={acc.name}>{acc.name}</span>
                        </div>
                      </td>
                      <td className="da-td da-td--platform">
                        <span className="da-platform">
                          <Icon size={16} />
                          <span className="da-platform__label">{acc.platform}</span>
                        </span>
                      </td>
                      <td className="da-td da-td--address">
                        <span className="da-cell-text" title={acc.address}>{acc.address}</span>
                      </td>
                      <td className="da-td da-td--source">
                        <span className="da-cell-text">{acc.source}</span>
                      </td>
                      <td className="da-td da-td--risk">
                        <SeverityBadge severity={acc.riskLevel} variant="fill" />
                      </td>
                      <td className="da-td da-td--tags">
                        <TagsCell
                          tags={acc.tags}
                          accountName={acc.name}
                          popoverId={`tags-${acc.id}`}
                          openPopoverId={openPopoverId}
                          setOpenPopoverId={setOpenPopoverId}
                        />
                      </td>
                      <td className="da-td da-td--discovered">
                        <span className="da-cell-text da-cell-text--muted">{acc.lastDiscovered}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details panel */}
        {selectedAccount && (
          <div className="da-details-pane">
            <div className="da-details-header">
              <div className="da-details-header__title">
                <span className="da-details-header__name">{selectedAccount.name}</span>
                <SeverityBadge severity={selectedAccount.riskLevel} variant="fill" />
              </div>
              <div className="da-details-header__actions">
                <button type="button" className="da-btn da-btn--primary">Onboard</button>
                <button type="button" className="da-btn da-btn--secondary">Edit</button>
                <button type="button" className="da-btn-icon" aria-label="More actions">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="3" r="1" fill="currentColor" />
                    <circle cx="8" cy="8" r="1" fill="currentColor" />
                    <circle cx="8" cy="13" r="1" fill="currentColor" />
                  </svg>
                </button>
                <button type="button" className="da-details-close" onClick={handleCloseDetails} aria-label="Close">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="da-details-tabs">
              <button
                type="button"
                className={`da-details-tab${detailsTab === 'overview' ? ' da-details-tab--active' : ''}`}
                onClick={() => setDetailsTab('overview')}
              >
                Overview
              </button>
              <button
                type="button"
                className={`da-details-tab${detailsTab === 'dependents' ? ' da-details-tab--active' : ''}`}
                onClick={() => setDetailsTab('dependents')}
              >
                Dependents ({selectedAccount.dependencies.length})
              </button>
              <button
                type="button"
                className={`da-details-tab${detailsTab === 'risk' ? ' da-details-tab--active' : ''}`}
                onClick={() => setDetailsTab('risk')}
              >
                Risk & Findings ({selectedAccount.riskFindings})
              </button>
            </div>

            <div className="da-details-content">
              {detailsTab === 'overview' && (
                <div className="da-details-section">
                  <div className="da-details-field">
                    <span className="da-details-label">ID:</span>
                    <span className="da-details-value">{selectedAccount.id}</span>
                  </div>
                  <div className="da-details-field">
                    <span className="da-details-label">Type:</span>
                    <span className="da-details-value">{selectedAccount.type}</span>
                  </div>
                  <div className="da-details-field">
                    <span className="da-details-label">Subtype:</span>
                    <span className="da-details-value">{selectedAccount.subtype}</span>
                  </div>
                  <div className="da-details-field">
                    <span className="da-details-label">Source:</span>
                    <span className="da-details-value">{selectedAccount.source}</span>
                  </div>
                  <div className="da-details-field">
                    <span className="da-details-label">Username:</span>
                    <span className="da-details-value">{selectedAccount.username}</span>
                  </div>
                  <div className="da-details-field">
                    <span className="da-details-label">Creation time:</span>
                    <span className="da-details-value">{selectedAccount.createdAt}</span>
                  </div>
                  <div className="da-details-field">
                    <span className="da-details-label">Update time:</span>
                    <span className="da-details-value">{selectedAccount.createdAt}</span>
                  </div>
                  <div className="da-details-field">
                    <span className="da-details-label">Address:</span>
                    <span className="da-details-value">{selectedAccount.address}</span>
                  </div>

                  <div className="da-details-subsection">
                    <button type="button" className="da-details-subsection__header">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Additional details
                    </button>
                    <div className="da-details-subsection__content">
                      {selectedAccount.sid && (
                        <div className="da-details-field">
                          <span className="da-details-label">SID:</span>
                          <span className="da-details-value">{selectedAccount.sid}</span>
                        </div>
                      )}
                      {selectedAccount.osVersion && (
                        <div className="da-details-field">
                          <span className="da-details-label">OS version:</span>
                          <span className="da-details-value">{selectedAccount.osVersion}</span>
                        </div>
                      )}
                      <div className="da-details-field">
                        <span className="da-details-label">Enable:</span>
                        <span className="da-details-value">{selectedAccount.enabled ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="da-details-field">
                        <span className="da-details-label">Privileged:</span>
                        <span className="da-details-value">{selectedAccount.privileged ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="da-details-field">
                        <span className="da-details-label">Locked out:</span>
                        <span className="da-details-value">{selectedAccount.lockedOut ? 'Yes' : 'No'}</span>
                      </div>
                      {selectedAccount.osFamily && (
                        <div className="da-details-field">
                          <span className="da-details-label">OS family:</span>
                          <span className="da-details-value">{selectedAccount.osFamily}</span>
                        </div>
                      )}
                      <div className="da-details-field">
                        <span className="da-details-label">Pass the hash vulnerable:</span>
                        <span className="da-details-value">{selectedAccount.passTheHashVulnerable ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="da-details-field">
                    <span className="da-details-label">Tags</span>
                    <div className="da-details-tags">
                      {selectedAccount.tags.map((tag, i) => <TagChip key={i} tag={tag} />)}
                    </div>
                  </div>
                </div>
              )}

              {detailsTab === 'dependents' && (
                <div className="da-details-section">
                  <table className="da-deps-table">
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>TYPE</th>
                        <th>RELATIONSHIP</th>
                        <th>STATUS</th>
                        <th>RISK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAccount.dependencies.map(dep => (
                        <tr key={dep.id}>
                          <td>{dep.name}</td>
                          <td>{dep.type}</td>
                          <td>{dep.relationship}</td>
                          <td><StatusIcon status={dep.status as any} size={16} /></td>
                          <td><SeverityBadge severity={dep.riskLevel} variant="fill" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {detailsTab === 'risk' && (
                <div className="da-details-section">
                  {selectedAccount.riskFindingDetails.length === 0 ? (
                    <div className="da-empty-state">
                      <span className="da-empty-state__title">No risk findings</span>
                      <span className="da-empty-state__desc">This account has no detected risk findings.</span>
                    </div>
                  ) : (
                    <div className="da-risk-findings">
                      {selectedAccount.riskFindingDetails.map(finding => (
                        <div key={finding.id} className="da-risk-finding">
                          <div className="da-risk-finding__header">
                            <SeverityBadge severity={finding.severity} variant="fill" />
                            <span className="da-risk-finding__type">{finding.riskType}</span>
                            <span className={`da-risk-finding__status da-risk-finding__status--${finding.status}`}>
                              {finding.status}
                            </span>
                          </div>
                          <div className="da-risk-finding__meta">
                            <span className="da-risk-finding__detected">Detected: {finding.detectedAt}</span>
                          </div>
                          <div className="da-risk-finding__recommendation">
                            <strong>Recommendation:</strong> {finding.recommendation}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
