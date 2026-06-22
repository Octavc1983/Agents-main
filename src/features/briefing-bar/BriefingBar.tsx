import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { StatusIcon } from '../../components/shared/StatusIcon';
import type { SecretStatusValue } from '../../components/shared/StatusIcon/StatusIcon';
import type { SecretsStats, SecretProvider, SecretStatus } from '../../types/prototype.types';
import './BriefingBar.scss';

// ── Provider icon map ─────────────────────────────────────────────────────────

const ProviderIconAWS: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4.5 9.5C3.5 9.2 2.8 8.4 2.8 7.5c0-1.1.9-2 2.2-2.1C5.3 4.1 6.5 3 8 3s2.7 1.1 3 2.4c1.3.1 2.2 1 2.2 2.1 0 .9-.7 1.7-1.7 2" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M5.5 12l1-1.5 1 1 1-2 1 2 1-1" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProviderIconAzure: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3L2.5 12.5h3L8 7.5 10 13h3.5L9.5 3H6z" fill="#0078D4"/>
    <path d="M9.5 3L7 8.5 5.5 12.5H13.5L9.5 3z" fill="#50E6FF" fillOpacity="0.6"/>
  </svg>
);

const ProviderIconGCP: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3.5h1.8L11 5H5L6.2 3.5H8z" fill="#EA4335"/>
    <path d="M11 5l1.5 2.5H3.5L5 5h6z" fill="#FBBC04"/>
    <path d="M12.5 7.5L11 10H5L3.5 7.5h9z" fill="#34A853"/>
    <path d="M11 10L9.8 12.5H6.2L5 10h6z" fill="#4285F4"/>
  </svg>
);

const ProviderIconHashiCorp: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2L4 4.5V7l4-2.5L12 7V4.5L8 2z" fill="#7B42BC"/>
    <path d="M4 7v2.5L8 12l4-2.5V7L8 9.5 4 7z" fill="#7B42BC" fillOpacity="0.6"/>
  </svg>
);

const ProviderIconCyberArk: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="5" stroke="#265BFF" strokeWidth="1.5"/>
    <path d="M6 8l1.5 1.5L10.5 6" stroke="#265BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PROVIDER_ICON_MAP: Record<SecretProvider, React.FC<{ size?: number }>> = {
  AWS: ProviderIconAWS,
  Azure: ProviderIconAzure,
  GCP: ProviderIconGCP,
  HashiCorp: ProviderIconHashiCorp,
  CyberArk: ProviderIconCyberArk,
};

// ── Provider popover ─────────────────────────────────────────────────────────

const POPOVER_WIDTH = 220;

interface OverflowPopoverProps {
  providers: Array<{ provider: SecretProvider; count: number; percent: number }>;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onProviderClick: (provider: SecretProvider) => void;
  activeProviders: SecretProvider[];
}

const OverflowPopover: React.FC<OverflowPopoverProps> = ({
  providers, anchorRef, onClose, onProviderClick, activeProviders,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      let left = rect.left;
      if (left + POPOVER_WIDTH > window.innerWidth - 8) left = window.innerWidth - POPOVER_WIDTH - 8;
      setPos({ top: rect.bottom + 6, left });
    }
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) &&
          anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [anchorRef, onClose]);

  return ReactDOM.createPortal(
    <div ref={ref} className="briefing-bar__overflow-popover" style={{ top: pos.top, left: pos.left }}>
      {providers.map(({ provider, count, percent }) => {
        const Icon = PROVIDER_ICON_MAP[provider];
        const active = activeProviders.includes(provider);
        return (
          <button
            key={provider}
            type="button"
            className={`briefing-bar__overflow-item${active ? ' briefing-bar__overflow-item--active' : ''}`}
            onClick={() => onProviderClick(provider)}
          >
            <span className="briefing-bar__overflow-icon"><Icon size={14} /></span>
            <span className="briefing-bar__overflow-label">{provider}</span>
            <span className="briefing-bar__overflow-count">{count}</span>
            <span className="briefing-bar__overflow-pct">{percent}%</span>
          </button>
        );
      })}
    </div>,
    document.body,
  );
};

// ── BriefingBar types ─────────────────────────────────────────────────────────

export interface BriefingBarProps {
  stats: SecretsStats;
  activeProviders: SecretProvider[];
  activeStatuses: SecretStatus[];
  activeRisks: string[];
  onProviderClick: (provider: SecretProvider) => void;
  onStatusClick: (status: SecretStatus) => void;
  onRiskClick: (risk: string) => void;
}

const MAX_VISIBLE_PROVIDERS = 4;

const STATUS_ORDER: SecretStatus[] = ['onboarded', 'not_rotated', 'idle', 'expired', 'disabled'];
const STATUS_LABELS: Record<SecretStatus, string> = {
  onboarded: 'Onboarded',
  not_rotated: 'Not rotated',
  idle: 'Idle',
  expired: 'Expired',
  disabled: 'Disabled',
};

const RISK_BARS: Array<{ key: string; label: string }> = [
  { key: 'critical', label: 'Critical' },
  { key: 'high', label: 'High' },
  { key: 'medium', label: 'Medium' },
];

// ── BriefingBar ───────────────────────────────────────────────────────────────

export const BriefingBar: React.FC<BriefingBarProps> = ({
  stats,
  activeProviders,
  activeStatuses,
  activeRisks,
  onProviderClick,
  onStatusClick,
  onRiskClick,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const overflowBtnRef = useRef<HTMLButtonElement>(null);

  const sortedProviders = [...stats.byProvider].sort((a, b) => b.count - a.count);

  const enriched = sortedProviders.map(p => ({
    ...p,
    percent: Math.round((p.count / stats.total) * 100),
  }));
  const visibleEnriched = enriched.slice(0, MAX_VISIBLE_PROVIDERS);
  const overflowEnriched = enriched.slice(MAX_VISIBLE_PROVIDERS);

  const maxRisk = Math.max(stats.byRisk.critical, stats.byRisk.high, stats.byRisk.medium, stats.byRisk.low, 1);

  const handleOverflowClick = useCallback(() => setPopoverOpen(o => !o), []);

  return (
    <div className="briefing-bar">
      {/* Total + Providers */}
      <div className="briefing-bar__section briefing-bar__section--providers">
        <div className="briefing-bar__total">
          <span className="briefing-bar__total-count">{stats.total}</span>
          <span className="briefing-bar__total-label">Total secrets</span>
        </div>
        <div className="briefing-bar__divider" aria-hidden="true" />
        <div className="briefing-bar__providers">
          {visibleEnriched.map(({ provider, count, percent }) => {
            const Icon = PROVIDER_ICON_MAP[provider];
            const active = activeProviders.includes(provider);
            return (
              <button
                key={provider}
                type="button"
                className={`briefing-bar__provider-chip${active ? ' briefing-bar__provider-chip--active' : ''}`}
                onClick={() => onProviderClick(provider)}
                title={`${provider}: ${count} secrets (${percent}%)`}
              >
                <span className="briefing-bar__provider-icon"><Icon size={14} /></span>
                <span className="briefing-bar__provider-name">{provider}</span>
                <span className="briefing-bar__provider-count">{count}</span>
              </button>
            );
          })}
          {overflowProviders.length > 0 && (
            <button
              ref={overflowBtnRef}
              type="button"
              className={`briefing-bar__provider-overflow${popoverOpen ? ' briefing-bar__provider-overflow--active' : ''}`}
              onClick={handleOverflowClick}
              aria-expanded={popoverOpen}
              aria-label={`${overflowProviders.length} more providers`}
            >
              +{overflowProviders.length}
            </button>
          )}
          {popoverOpen && (
            <OverflowPopover
              providers={overflowEnriched}
              anchorRef={overflowBtnRef}
              onClose={() => setPopoverOpen(false)}
              onProviderClick={onProviderClick}
              activeProviders={activeProviders}
            />
          )}
        </div>
      </div>

      <div className="briefing-bar__divider" aria-hidden="true" />

      {/* Status KPI tiles */}
      <div className="briefing-bar__section briefing-bar__section--status">
        {STATUS_ORDER.map(status => {
          const count = stats.byStatus[status];
          const active = activeStatuses.includes(status);
          return (
            <button
              key={status}
              type="button"
              className={`briefing-bar__status-tile${active ? ' briefing-bar__status-tile--active' : ''}`}
              onClick={() => onStatusClick(status)}
            >
              <StatusIcon status={status as SecretStatusValue} size={18} />
              <span className="briefing-bar__status-count">{count}</span>
              <span className="briefing-bar__status-label">{STATUS_LABELS[status]}</span>
            </button>
          );
        })}
      </div>

      <div className="briefing-bar__divider" aria-hidden="true" />

      {/* Risk breakdown bars */}
      <div className="briefing-bar__section briefing-bar__section--risk">
        <span className="briefing-bar__risk-title">Risk</span>
        {RISK_BARS.map(({ key, label }) => {
          const count = stats.byRisk[key as keyof typeof stats.byRisk];
          const width = Math.round((count / maxRisk) * 100);
          const active = activeRisks.includes(key);
          return (
            <button
              key={key}
              type="button"
              className={`briefing-bar__risk-row${active ? ' briefing-bar__risk-row--active' : ''}`}
              onClick={() => onRiskClick(key)}
            >
              <span className="briefing-bar__risk-label">{label}</span>
              <span className="briefing-bar__risk-bar-track">
                <span
                  className={`briefing-bar__risk-bar-fill briefing-bar__risk-bar-fill--${key}`}
                  style={{ width: `${width}%` }}
                />
              </span>
              <span className="briefing-bar__risk-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
