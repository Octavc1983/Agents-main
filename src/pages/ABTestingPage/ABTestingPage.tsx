import React, { useState, useMemo } from 'react';
import type { ABTest, ABTestStatus, ComponentState } from '../../types/prototype.types';
import { mockABTests } from '../../mock/abTestingMockData';
import { Button } from '../../components/ui/Button/Button';
import { LoadingState } from '../../components/ui/LoadingState/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState/ErrorState';
import {
  SearchIcon,
  PlusIcon,
  FilterIcon,
  RefreshIcon,
  StatusRunningIcon,
  StatusCompletedIcon,
  StatusPendingIcon,
  StatusStoppedIcon,
  CheckCircleIcon,
  WarningIcon,
  CloseIcon,
} from '../../assets/icons/NavIcons';
import './ABTestingPage.scss';

// ── State control (change to test other states) ───────────────────────────────
const PAGE_STATE: ComponentState = 'default';

// ── Status config ─────────────────────────────────────────────────────────────

type StatusConfig = { label: string; icon: React.ReactNode; cls: string };

const STATUS_CONFIGS: Record<ABTestStatus, StatusConfig> = {
  running:   { label: 'Running',   icon: <StatusRunningIcon size={13} />,   cls: 'running' },
  completed: { label: 'Completed', icon: <StatusCompletedIcon size={13} />, cls: 'completed' },
  draft:     { label: 'Draft',     icon: <StatusPendingIcon size={13} />,   cls: 'draft' },
  paused:    { label: 'Paused',    icon: <StatusStoppedIcon size={13} />,   cls: 'paused' },
};

const StatusBadge: React.FC<{ status: ABTestStatus }> = ({ status }) => {
  const { label, icon, cls } = STATUS_CONFIGS[status];
  return (
    <span className={`abt-status abt-status--${cls}`}>
      {icon}
      <span>{label}</span>
    </span>
  );
};

// ── Uplift cell ───────────────────────────────────────────────────────────────

const UpliftCell: React.FC<{ uplift: number; status: ABTestStatus }> = ({ uplift, status }) => {
  if (status === 'draft') return <span className="abt-cell--muted">—</span>;
  const positive = uplift >= 0;
  return (
    <span className={`abt-uplift ${positive ? 'abt-uplift--positive' : 'abt-uplift--negative'}`}>
      {positive ? <CheckCircleIcon size={13} /> : <WarningIcon size={13} />}
      {positive ? '+' : ''}{uplift.toFixed(1)}%
    </span>
  );
};

// ── Traffic split bar ─────────────────────────────────────────────────────────

const TrafficBar: React.FC<{ split: number[]; variants: string[] }> = ({ split, variants }) => (
  <div className="abt-traffic" title={variants.map((v, i) => `${v}: ${split[i]}%`).join(' · ')}>
    {split.map((pct, i) => (
      <div
        key={i}
        className={`abt-traffic__seg abt-traffic__seg--${i}`}
        style={{ width: `${pct}%` }}
      />
    ))}
  </div>
);

// ── Filter chip ───────────────────────────────────────────────────────────────

const STATUS_FILTERS: Array<{ id: ABTestStatus | 'all'; label: string }> = [
  { id: 'all',       label: 'All' },
  { id: 'running',   label: 'Running' },
  { id: 'completed', label: 'Completed' },
  { id: 'draft',     label: 'Draft' },
  { id: 'paused',    label: 'Paused' },
];

// ── Main page ─────────────────────────────────────────────────────────────────

export const ABTestingPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<ABTestStatus | 'all'>('all');

  const filtered = useMemo(() => {
    let list: ABTest[] = mockABTests;
    if (activeFilter !== 'all') list = list.filter(t => t.status === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        t =>
          t.name.toLowerCase().includes(q) ||
          t.owner.toLowerCase().includes(q) ||
          t.tags.some(tag => tag.includes(q)),
      );
    }
    return list;
  }, [search, activeFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: mockABTests.length };
    mockABTests.forEach(t => { c[t.status] = (c[t.status] || 0) + 1; });
    return c;
  }, []);

  const clearSearch = () => setSearch('');

  // ── State rendering ───────────────────────────────────────────────────────

  if (PAGE_STATE === 'loading') {
    return (
      <div className="abt-page">
        <LoadingState message="Loading experiments…" />
      </div>
    );
  }

  if (PAGE_STATE === 'error') {
    return (
      <div className="abt-page">
        <ErrorState
          title="Failed to load experiments"
          message="There was a problem fetching AB test data. Please try again."
          action={<Button variant="secondary" size="sm" onClick={() => {}}>Retry</Button>}
        />
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="abt-page">

      {/* ── Toolbar ── */}
      <div className="abt-toolbar">
        <div className="abt-toolbar__left">
          <h1 className="abt-toolbar__title">AB Testing</h1>
          <span className="abt-toolbar__count">{filtered.length} experiment{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="abt-toolbar__right">
          <button className="abt-icon-btn" aria-label="Refresh" onClick={() => {}}>
            <RefreshIcon size={16} />
          </button>
          <button className="abt-icon-btn" aria-label="Filter options" onClick={() => {}}>
            <FilterIcon size={16} />
          </button>
          <Button variant="primary" size="sm" onClick={() => {}}>
            <PlusIcon size={14} />
            New Experiment
          </Button>
        </div>
      </div>

      {/* ── Search + filter chips ── */}
      <div className="abt-filters">
        <div className="abt-search">
          <SearchIcon size={15} className="abt-search__icon" />
          <input
            className="abt-search__input"
            type="text"
            placeholder="Search experiments, owners, tags…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search experiments"
          />
          {search && (
            <button className="abt-search__clear" onClick={clearSearch} aria-label="Clear search">
              <CloseIcon size={13} />
            </button>
          )}
        </div>

        <div className="abt-chips" role="group" aria-label="Filter by status">
          {STATUS_FILTERS.map(f => (
            <button
              key={f.id}
              className={`abt-chip ${activeFilter === f.id ? 'abt-chip--active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
              aria-pressed={activeFilter === f.id}
            >
              {f.label}
              <span className="abt-chip__count">{counts[f.id] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="abt-table-wrap">
        {PAGE_STATE === 'default' && filtered.length === 0 ? (
          <EmptyState
            title={search || activeFilter !== 'all' ? 'No experiments match your filters' : 'No experiments yet'}
            description={
              search || activeFilter !== 'all'
                ? 'Try adjusting your search or filter.'
                : 'Create your first AB experiment to get started.'
            }
            action={
              !search && activeFilter === 'all' ? (
                <Button variant="primary" size="sm" onClick={() => {}}>
                  <PlusIcon size={14} /> New Experiment
                </Button>
              ) : (
                <Button variant="secondary" size="sm" onClick={() => { clearSearch(); setActiveFilter('all'); }}>
                  Clear filters
                </Button>
              )
            }
          />
        ) : (
          <table className="abt-table" role="grid">
            <thead>
              <tr className="abt-table__head-row">
                <th className="abt-table__th abt-table__th--name">Experiment Name</th>
                <th className="abt-table__th">Status</th>
                <th className="abt-table__th">Variants</th>
                <th className="abt-table__th">Traffic Split</th>
                <th className="abt-table__th abt-table__th--num">Conversion Rate</th>
                <th className="abt-table__th abt-table__th--num">Uplift</th>
                <th className="abt-table__th">Start Date</th>
                <th className="abt-table__th">Owner</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(test => (
                <tr key={test.id} className="abt-table__row">
                  <td className="abt-table__td abt-table__td--name">
                    <span className="abt-name">{test.name}</span>
                    {test.tags.length > 0 && (
                      <div className="abt-tags">
                        {test.tags.map(tag => (
                          <span key={tag} className="abt-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="abt-table__td">
                    <StatusBadge status={test.status} />
                  </td>
                  <td className="abt-table__td">
                    <span className="abt-cell--muted">{test.variants.length}</span>
                    <span className="abt-variants-hint">{test.variants.join(' · ')}</span>
                  </td>
                  <td className="abt-table__td">
                    <TrafficBar split={test.trafficSplit} variants={test.variants} />
                  </td>
                  <td className="abt-table__td abt-table__td--num">
                    {test.status === 'draft'
                      ? <span className="abt-cell--muted">—</span>
                      : <span>{test.conversionRate.toFixed(1)}%</span>
                    }
                  </td>
                  <td className="abt-table__td abt-table__td--num">
                    <UpliftCell uplift={test.uplift} status={test.status} />
                  </td>
                  <td className="abt-table__td">
                    <span className="abt-date">{test.startDate}</span>
                    {test.endDate && (
                      <span className="abt-date abt-date--end">→ {test.endDate}</span>
                    )}
                  </td>
                  <td className="abt-table__td">
                    <div className="abt-owner">
                      <span className="abt-owner__avatar">
                        {test.owner.split(' ').map(n => n[0]).join('')}
                      </span>
                      <span className="abt-owner__name">{test.owner}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
