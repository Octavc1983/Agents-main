import React, { useState, useCallback } from 'react';
import { Button, Card, Badge, SeverityBadge, LineChart, RiskMiniBar } from '@idira/design-system';
import type { LineChartSeries } from '@idira/design-system';
import './RiskManagementPage.scss';

// ── Mock data ─────────────────────────────────────────────────────────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const KPI_SUMMARY = {
  total:    12456,
  critical: 267,
  high:     588,
  medium:   823,
  low:      410,
};

const RISK_CATEGORIES = [
  {
    id: 'users',
    label: 'Users',
    segments: [
      { severity: 'critical' as const, count: 512 },
      { severity: 'high'     as const, count: 897 },
      { severity: 'medium'   as const, count: 1124 },
      { severity: 'low'      as const, count: 708 },
    ],
  },
  {
    id: 'cloud-ent',
    label: 'Cloud entitlements',
    segments: [
      { severity: 'critical' as const, count: 780 },
      { severity: 'high'     as const, count: 920 },
      { severity: 'medium'   as const, count: 520 },
    ],
  },
  {
    id: 'cloud-infra',
    label: 'Cloud infra access',
    segments: [
      { severity: 'critical' as const, count: 940 },
      { severity: 'high'     as const, count: 660 },
      { severity: 'medium'   as const, count: 310 },
    ],
  },
  {
    id: 'applications',
    label: 'Applications',
    segments: [
      { severity: 'critical' as const, count: 1620 },
      { severity: 'high'     as const, count: 410 },
      { severity: 'medium'   as const, count: 180 },
    ],
  },
  {
    id: 'secrets',
    label: 'Secrets',
    segments: [
      { severity: 'critical' as const, count: 287 },
      { severity: 'high'     as const, count: 511 },
      { severity: 'medium'   as const, count: 330 },
      { severity: 'low'      as const, count: 220 },
    ],
  },
  {
    id: 'workloads',
    label: 'Workloads',
    segments: [
      { severity: 'critical' as const, count: 110 },
      { severity: 'high'     as const, count: 210 },
      { severity: 'low'      as const, count: 340 },
    ],
  },
  {
    id: 'ai-agents',
    label: 'AI agents',
    segments: [
      { severity: 'critical' as const, count: 640 },
      { severity: 'high'     as const, count: 280 },
      { severity: 'medium'   as const, count: 188 },
    ],
  },
];

const PROGRESS_SERIES: LineChartSeries[] = [
  {
    id: 'critical',
    label: 'Critical',
    severity: 'critical',
    data: MONTHS.map((label, i) => ({ label, value: 3600 - i * 480 })),
  },
  {
    id: 'high',
    label: 'High',
    severity: 'high',
    data: MONTHS.map((label, i) => ({ label, value: 2800 - i * 280 })),
  },
  {
    id: 'medium',
    label: 'Medium',
    severity: 'medium',
    data: MONTHS.map((label, i) => ({ label, value: 2000 - i * 200 })),
  },
  {
    id: 'low',
    label: 'Low',
    severity: 'low',
    data: MONTHS.map((label, i) => ({ label, value: 1000 - i * 80 })),
  },
];

const REMEDIATION_KPIS = [
  {
    id: 'remediated',
    value: '98%',
    label: 'Findings remediated',
    trend: 'success' as const,
    trendLabel: 'Good',
  },
  {
    id: 'critical-resolved',
    value: '86%',
    label: 'Critical findings resolved',
    trend: 'info' as const,
    trendLabel: 'Excellent',
  },
  {
    id: 'expansion',
    value: '0%',
    label: 'Expansion in coverage',
    trend: 'warning' as const,
    trendLabel: 'Needs attention',
  },
];

const TOP_RISKS = [
  {
    id: 'r1',
    type: 'Excessive privileges',
    category: 'Users',
    findings: 3241,
    critical: 512,
    trendPct: 12,
    trendDir: 'up' as const,
    sla: 'Overdue',
    slaSeverity: 'critical' as const,
  },
  {
    id: 'r2',
    type: 'Stale access',
    category: 'Cloud entitlements',
    findings: 2187,
    critical: 334,
    trendPct: 8,
    trendDir: 'down' as const,
    sla: 'On track',
    slaSeverity: 'low' as const,
  },
  {
    id: 'r3',
    type: 'Unencrypted secrets',
    category: 'Secrets',
    findings: 1834,
    critical: 287,
    trendPct: 5,
    trendDir: 'up' as const,
    sla: 'At risk',
    slaSeverity: 'high' as const,
  },
  {
    id: 'r4',
    type: 'Privilege escalation',
    category: 'Workloads',
    findings: 1620,
    critical: 241,
    trendPct: 22,
    trendDir: 'up' as const,
    sla: 'Overdue',
    slaSeverity: 'critical' as const,
  },
  {
    id: 'r5',
    type: 'Shadow admin accounts',
    category: 'Applications',
    findings: 1574,
    critical: 198,
    trendPct: 3,
    trendDir: 'down' as const,
    sla: 'On track',
    slaSeverity: 'low' as const,
  },
];

type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y';
const TIME_RANGES: TimeRange[] = ['1W', '1M', '3M', '6M', '1Y'];

// ── Component ─────────────────────────────────────────────────────────────────

export const RiskManagementPage: React.FC = () => {
  const [activeRange, setActiveRange] = useState<TimeRange>('3M');

  const handleShowAll = useCallback(() => {
    // Navigate to findings list — placeholder
    window.location.href = '/risk/risk-management/risks';
  }, []);

  return (
    <div className="rmp">

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div className="rmp__header">
        <div className="rmp__title-row">
          <h1 className="rmp__title">Risk Management</h1>
          <div className="rmp__header-kpis">
            <span className="rmp__total-label">{KPI_SUMMARY.total.toLocaleString()} total findings</span>
            <SeverityBadge severity="critical" variant="stroke" />
            <span className="rmp__kpi-val rmp__kpi-val--critical">{KPI_SUMMARY.critical.toLocaleString()}</span>
            <SeverityBadge severity="high" variant="stroke" />
            <span className="rmp__kpi-val rmp__kpi-val--high">{KPI_SUMMARY.high.toLocaleString()}</span>
            <SeverityBadge severity="medium" variant="stroke" />
            <span className="rmp__kpi-val rmp__kpi-val--medium">{KPI_SUMMARY.medium.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* ── Risk categories ──────────────────────────────────────────── */}
      <section className="rmp__section" aria-label="Risk breakdown by category">
        <h2 className="rmp__section-title">Risk breakdown by category</h2>
        <div className="rmp__categories-grid">
          {RISK_CATEGORIES.map(cat => {
            const total = cat.segments.reduce((s, seg) => s + seg.count, 0);
            return (
              <Card key={cat.id} size="auto" background="gradient-dark-to-light" className="rmp__category-card">
                <RiskMiniBar
                  label={cat.label}
                  segments={cat.segments}
                  totalLabel={`${total.toLocaleString()} findings`}
                />
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── Progress + Remediation KPIs ──────────────────────────────── */}
      <div className="rmp__progress-row">

        {/* Progress chart */}
        <Card size="auto" className="rmp__progress-card">
          <div className="rmp__progress-header">
            <h2 className="rmp__section-title">Progress over time</h2>
            <div className="rmp__time-filters" role="group" aria-label="Time range filter">
              {TIME_RANGES.map(range => (
                <button
                  key={range}
                  type="button"
                  className={`rmp__time-btn${activeRange === range ? ' rmp__time-btn--active' : ''}`}
                  onClick={() => setActiveRange(range)}
                  aria-pressed={activeRange === range}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <LineChart
            series={PROGRESS_SERIES}
            height={240}
            showLegend
            showGrid
            showDots
            aria-label="Findings progress over time"
            className="rmp__chart"
          />
        </Card>

        {/* Remediation KPI tile */}
        <Card size="auto" className="rmp__remediation-card">
          <h2 className="rmp__section-title">Remediation</h2>
          <div className="rmp__kpi-list">
            {REMEDIATION_KPIS.map((kpi, i) => (
              <React.Fragment key={kpi.id}>
                <div className="rmp__kpi-item">
                  <span className={`rmp__kpi-big rmp__kpi-big--${kpi.trend}`}>{kpi.value}</span>
                  <span className="rmp__kpi-label">{kpi.label}</span>
                  <Badge label={kpi.trendLabel} color={kpi.trend === 'warning' ? 'high' : kpi.trend === 'info' ? 'low' : 'success'} variant="stroke" />
                </div>
                {i < REMEDIATION_KPIS.length - 1 && <div className="rmp__kpi-divider" role="separator" />}
              </React.Fragment>
            ))}
          </div>
        </Card>

      </div>

      {/* ── Top 5 risk types table ───────────────────────────────────── */}
      <section className="rmp__section" aria-label="Top 5 risk types">
        <Card size="auto" className="rmp__table-card">
          <div className="rmp__table-header">
            <h2 className="rmp__section-title">Top 5 risk types</h2>
            <Button variant="secondary" size="sm" onClick={handleShowAll}>
              Show all
            </Button>
          </div>

          <div className="rmp__table-wrap">
            <table className="rmp__table" aria-label="Top 5 risk types">
              <thead>
                <tr className="rmp__table-head-row">
                  <th className="rmp__th">Risk Type</th>
                  <th className="rmp__th">Category</th>
                  <th className="rmp__th rmp__th--num">Findings</th>
                  <th className="rmp__th rmp__th--num">Critical</th>
                  <th className="rmp__th">Trend</th>
                  <th className="rmp__th">SLA Status</th>
                </tr>
              </thead>
              <tbody>
                {TOP_RISKS.map(row => (
                  <tr key={row.id} className="rmp__table-row">
                    <td className="rmp__td rmp__td--type">{row.type}</td>
                    <td className="rmp__td">{row.category}</td>
                    <td className="rmp__td rmp__td--num">{row.findings.toLocaleString()}</td>
                    <td className="rmp__td rmp__td--num rmp__td--critical">{row.critical.toLocaleString()}</td>
                    <td className="rmp__td">
                      <span className={`rmp__trend rmp__trend--${row.trendDir}`}>
                        <span className="rmp__trend-arrow" aria-hidden="true">
                          {row.trendDir === 'up' ? '↑' : '↓'}
                        </span>
                        {row.trendPct}%
                      </span>
                    </td>
                    <td className="rmp__td">
                      <Badge
                        label={row.sla}
                        color={row.slaSeverity === 'critical' ? 'critical' : row.slaSeverity === 'high' ? 'high' : 'success'}
                        variant="stroke"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

    </div>
  );
};
