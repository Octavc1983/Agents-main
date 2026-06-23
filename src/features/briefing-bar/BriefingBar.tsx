import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { StatusIcon } from '../../components/shared/StatusIcon';
import type { SecretStatusValue } from '../../components/shared/StatusIcon/StatusIcon';
import { PROVIDER_ICON_MAP } from '../../components/shared/provider-icons';
import { usePopoverPosition } from '../../components/shared/hooks/usePopoverPosition';
import type { SecretsStats, SecretProvider, SecretStatus } from '../../types/prototype.types';
import './BriefingBar.scss';

// ── Provider overflow popover ─────────────────────────────────────────────────

const POPOVER_WIDTH = 220;
const POPOVER_MAX_HEIGHT = 320;

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

  const pos = usePopoverPosition(
    { isOpen: true, triggerRef: anchorRef, placement: 'bottom-start' },
    POPOVER_WIDTH,
    POPOVER_MAX_HEIGHT,
  );

  useEffect(() => {
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
    <div
      ref={ref}
      className="briefing-bar__overflow-popover"
      style={{ top: pos.top, left: pos.left }}
    >
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
          {overflowEnriched.length > 0 && (
            <button
              ref={overflowBtnRef}
              type="button"
              className={`briefing-bar__provider-overflow${popoverOpen ? ' briefing-bar__provider-overflow--active' : ''}`}
              onClick={handleOverflowClick}
              aria-expanded={popoverOpen}
              aria-label={`${overflowEnriched.length} more providers`}
            >
              +{overflowEnriched.length}
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
