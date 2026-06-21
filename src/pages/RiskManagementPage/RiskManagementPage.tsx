import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'primereact/chart';
import { Card, Badge, SelectButton } from '@idira/design-system';
import type { SelectButtonOption } from '@idira/design-system';
import './RiskManagementPage.scss';

// ── Mock data ─────────────────────────────────────────────────────────────────

const KPI_SUMMARY = { total: 12456, critical: 267, high: 588, medium: 823 };

interface RiskCategory { id: string; label: string; total: number; critical: number; }

const RISK_CATEGORIES: RiskCategory[] = [
  { id: 'users',       label: 'Users',              total: 3000,  critical: 540  },
  { id: 'cloud-ent',   label: 'Cloud entitlements', total: 3006,  critical: 1112 },
  { id: 'cloud-infra', label: 'Cloud infra access', total: 1678,  critical: 789  },
  { id: 'applications',label: 'Applications',       total: 2789,  critical: 2203 },
  { id: 'secrets',     label: 'Secrets',            total: 200,   critical: 90   },
  { id: 'workloads',   label: 'Workloads',          total: 400,   critical: 44   },
  { id: 'ai-agents',   label: 'AI agents',          total: 5006,  critical: 3204 },
];

const MONTHS_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CHART_DATA = {
  '1M': { labels: MONTHS_LABELS.slice(11), values: [180000] },
  '3M': { labels: MONTHS_LABELS.slice(9), values: [160000, 170000, 180000] },
  '6M': { labels: MONTHS_LABELS.slice(6), values: [100000, 110000, 130000, 150000, 160000, 180000] },
  '1Y': {
    labels: MONTHS_LABELS,
    values: [40000, 50000, 60000, 80000, 100000, 120000, 130000, 145000, 155000, 165000, 172000, 180000],
  },
};

const TIME_RANGES: SelectButtonOption[] = [
  { id: '1M', label: '1M' },
  { id: '3M', label: '3M' },
  { id: '6M', label: '6M' },
  { id: '1Y', label: '1Y' },
];

const REMEDIATION_KPIS = [
  { id: 'remediated',       value: '98%', label: 'Findings remediated',       badge: 'Good',           color: 'medium'   as const },
  { id: 'critical-resolved',value: '86%', label: 'Critical findings resolved', badge: 'Excellent',     color: 'success'  as const },
  { id: 'expansion',        value: '0%',  label: 'Expansion in Coverage',      badge: 'Need attention', color: 'critical' as const },
];

// ── Category mini-card ────────────────────────────────────────────────────────

const CategoryItem: React.FC<{ cat: RiskCategory }> = ({ cat }) => {
  const critPct = cat.total > 0 ? Math.round((cat.critical / cat.total) * 100) : 0;
  return (
    <div className="rmp__cat-item">
      <span className="rmp__cat-label">{cat.label}</span>
      <div className="rmp__cat-count-row">
        <span className="rmp__cat-count">{cat.total.toLocaleString()}</span>
        <span className="rmp__cat-unit">findings</span>
      </div>
      <div className="rmp__cat-bar" role="progressbar" aria-valuenow={critPct} aria-valuemin={0} aria-valuemax={100}>
        <div className="rmp__cat-bar-fill" style={{ width: `${critPct}%` }} />
      </div>
      <span className="rmp__cat-caption">Critical - {critPct}%</span>
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────

export const RiskManagementPage: React.FC = () => {
  const [activeRange, setActiveRange] = useState<string[]>(['3M']);
  const chartRef = useRef<Chart>(null);

  const range = (activeRange[0] ?? '3M') as keyof typeof CHART_DATA;
  const { labels, values } = CHART_DATA[range];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total findings',
        data: values,
        borderColor: '#C45BE7',
        backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { top: number; bottom: number } } }) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return 'rgba(196,91,231,0.18)';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0.358, 'rgba(196,91,231,0.18)');
          gradient.addColorStop(1,     'rgba(57,56,56,0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 300 },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1D2D49',
        borderColor: '#283F67',
        borderWidth: 1,
        titleColor: '#d6e3fb',
        bodyColor: '#ffffff',
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(40,63,103,0.5)', drawBorder: false },
        ticks: { color: '#BBC2D0', font: { size: 11 } },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 200000,
        ticks: {
          color: '#BBC2D0',
          font: { size: 11 },
          stepSize: 50000,
          callback: (v: number) => `${v / 1000}K`,
        },
        grid: { color: 'rgba(40,63,103,0.5)', drawBorder: false },
        border: { display: false },
      },
    },
  };

  // destroy chart on unmount to avoid canvas reuse error
  useEffect(() => {
    return () => { chartRef.current?.getChart()?.destroy(); };
  }, []);

  return (
    <div className="rmp">

      {/* ── Main card: full-width single container ────────────────────────── */}
      <Card size="auto" className="rmp__main-card">

        {/* 3-column body ───────────────────────────────────────────────────── */}
        <div className="rmp__body">

          {/* ── Left: category grid ───────────────────────────────────────── */}
          <div className="rmp__categories-panel">

            {/* Category header ────────────────────────────────────────────── */}
            <div className="rmp__cat-header">
              <span className="rmp__total-title">Total findings {KPI_SUMMARY.total.toLocaleString()}</span>
              <div className="rmp__cat-kpis">
                <div className="rmp__kpi-pill">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="#F54E85" strokeWidth="1.5"/>
                    <path d="M11.992 16H12.001" stroke="#F54E85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13.125L12 8.9375" stroke="#F54E85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="rmp__kpi-pill-text">{KPI_SUMMARY.critical} Critical</span>
                </div>
                <div className="rmp__kpi-pill">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5.32171 9.68293C7.73539 5.41199 8.94222 3.27651 10.5983 2.72681C11.5093 2.4244 12.4907 2.4244 13.4017 2.72681C15.0578 3.27651 16.2646 5.41199 18.6783 9.68293C21.092 13.9539 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6549 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6549 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9539 5.32171 9.68293Z" stroke="#FFA033" strokeWidth="1.5"/>
                    <path d="M11.992 16H12.001" stroke="#FFA033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13L12 9" stroke="#FFA033" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="rmp__kpi-pill-text">{KPI_SUMMARY.high} High</span>
                </div>
                <div className="rmp__kpi-pill">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="#888DFF" strokeWidth="1.5"/>
                    <path d="M11.9998 16H12.0088" stroke="#888DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13L12 8.875" stroke="#888DFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="rmp__kpi-pill-text">{KPI_SUMMARY.medium} Medium</span>
                </div>
              </div>
            </div>

            <div className="rmp__cat-grid rmp__cat-grid--top">
              {RISK_CATEGORIES.slice(0, 3).map(cat => <CategoryItem key={cat.id} cat={cat} />)}
            </div>
            <div className="rmp__cat-divider" role="separator" />
            <div className="rmp__cat-grid rmp__cat-grid--bottom">
              {RISK_CATEGORIES.slice(3).map(cat => <CategoryItem key={cat.id} cat={cat} />)}
            </div>
          </div>

          {/* ── Center: chart ─────────────────────────────────────────────── */}
          <div className="rmp__chart-panel">
            <div className="rmp__chart-header">
              <span className="rmp__chart-title">Progress over time</span>
              <SelectButton
                options={TIME_RANGES}
                value={activeRange}
                onChange={setActiveRange}
                size="small"
              />
            </div>
            <div className="rmp__chart-wrap">
              <Chart
                ref={chartRef}
                type="line"
                data={chartData}
                options={chartOptions}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="rmp__chart-legend">
              <span className="rmp__chart-legend-dot" aria-hidden="true" />
              <span className="rmp__chart-legend-label">Total findings</span>
            </div>
          </div>

          {/* ── Right: remediation KPIs ───────────────────────────────────── */}
          <div className="rmp__kpi-panel">
            {REMEDIATION_KPIS.map((kpi, i) => (
              <React.Fragment key={kpi.id}>
                <div className="rmp__kpi-item">
                  <span className="rmp__kpi-value">{kpi.value}</span>
                  <span className="rmp__kpi-label">{kpi.label}</span>
                  <Badge label={kpi.badge} color={kpi.color} variant="stroke" />
                </div>
                {i < REMEDIATION_KPIS.length - 1 && <div className="rmp__kpi-divider" role="separator" />}
              </React.Fragment>
            ))}
          </div>

        </div>
      </Card>

    </div>
  );
};
