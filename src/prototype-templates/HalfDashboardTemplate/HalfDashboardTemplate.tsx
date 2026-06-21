import React, { useState, useRef, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Card, Badge, SelectButton } from '@idira/design-system';
import type { HalfDashboardTemplateProps, HalfDashboardCategoryTile } from './HalfDashboardTemplate.types';
import './HalfDashboardTemplate.scss';

// ── Category tile ──────────────────────────────────────────────────────────────

const SEV_ORDER: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low'];

const CategoryTile: React.FC<{ tile: HalfDashboardCategoryTile; position: 'top' | 'bottom' }> = ({ tile, position }) => {
  const [hovered, setHovered] = useState(false);
  const critPct = tile.total > 0 ? Math.round((tile.critical / tile.total) * 100) : 0;

  const segTotal = tile.segments?.reduce((s, seg) => s + seg.count, 0) ?? tile.total;

  return (
    <div
      className={`hdt__tile hdt__tile--${position}${hovered ? ' hdt__tile--hover' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="hdt__tile-label">{tile.label}</span>
      <div className="hdt__tile-count-row">
        <span className="hdt__tile-count">{tile.total.toLocaleString()}</span>
        <span className="hdt__tile-unit">risks</span>
      </div>

      {hovered && tile.segments ? (
        <div className="hdt__tile-bar hdt__tile-bar--segmented" role="progressbar" aria-label={`${tile.label} severity breakdown`}>
          {SEV_ORDER.map(sev => {
            const seg = tile.segments!.find(s => s.severity === sev);
            if (!seg) return null;
            const pct = segTotal > 0 ? (seg.count / segTotal) * 100 : 0;
            return <div key={sev} className={`hdt__tile-bar-seg hdt__tile-bar-seg--${sev}`} style={{ width: `${pct}%` }} />;
          })}
        </div>
      ) : (
        <div className="hdt__tile-bar" role="progressbar" aria-valuenow={critPct} aria-valuemin={0} aria-valuemax={100}>
          <div className="hdt__tile-bar-fill" style={{ width: `${critPct}%` }} />
        </div>
      )}

      <span className="hdt__tile-caption">Critical - {critPct}%</span>
    </div>
  );
};

// ── Template shell ─────────────────────────────────────────────────────────────

export const HalfDashboardTemplate: React.FC<HalfDashboardTemplateProps> = ({
  title,
  headerKpis,
  topRowTiles,
  bottomRowTiles,
  chartTitle,
  chartLabels,
  chartSeries,
  timeRanges,
  defaultTimeRange,
  onTimeRangeChange,
  kpiItems,
  className,
}) => {
  const [activeRange, setActiveRange] = useState<string[]>([defaultTimeRange]);
  const chartRef = useRef<Chart>(null);

  const handleRangeChange = (val: string[]) => {
    setActiveRange(val);
    if (val[0]) onTimeRangeChange?.(val[0]);
  };

  const buildGradient = (ctx: CanvasRenderingContext2D, chartArea: { top: number; bottom: number }, from: string, to: string) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0.358, from);
    gradient.addColorStop(1, to);
    return gradient;
  };

  const chartData = {
    labels: chartLabels,
    datasets: chartSeries.map(s => ({
      label: s.label,
      data: s.data,
      borderColor: s.borderColor,
      backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { top: number; bottom: number } } }) => {
        const { ctx, chartArea } = context.chart;
        if (!chartArea) return s.gradientFrom;
        return buildGradient(ctx, chartArea, s.gradientFrom, s.gradientTo);
      },
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      borderWidth: 2,
    })),
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
        grid: { color: 'rgba(40,63,103,0.5)' },
        ticks: { color: '#BBC2D0', font: { size: 11 } },
        border: { display: false },
      },
      y: {
        ticks: { color: '#BBC2D0', font: { size: 11 } },
        grid: { color: 'rgba(40,63,103,0.5)' },
        border: { display: false },
      },
    },
  };

  useEffect(() => {
    return () => { chartRef.current?.getChart()?.destroy(); };
  }, []);

  return (
    <Card size="auto" className={['hdt', className].filter(Boolean).join(' ')}>

      {/* ── Body: 3 columns ─────────────────────────────────────────────────── */}
      <div className="hdt__body">

        {/* Left: category breakdown ─────────────────────────────────────────── */}
        <div className="hdt__left">
          <div className="hdt__left-header">
            <span className="hdt__title">{title}</span>
            <div className="hdt__header-kpis">
              {headerKpis.map((kpi, i) => (
                <div key={i} className="hdt__header-kpi-pill">
                  {kpi.icon}
                  <span className="hdt__header-kpi-text">{kpi.value} {kpi.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hdt__tile-grid hdt__tile-grid--top">
            {topRowTiles.map(tile => <CategoryTile key={tile.id} tile={tile} position="top" />)}
          </div>
          <div className="hdt__tile-grid hdt__tile-grid--bottom">
            {bottomRowTiles.map(tile => <CategoryTile key={tile.id} tile={tile} position="bottom" />)}
          </div>
        </div>

        {/* Center: chart ────────────────────────────────────────────────────── */}
        <div className="hdt__center">
          <div className="hdt__chart-header">
            <span className="hdt__chart-title">{chartTitle}</span>
            <SelectButton
              options={timeRanges}
              value={activeRange}
              onChange={handleRangeChange}
              size="small"
            />
          </div>
          <div className="hdt__chart-wrap">
            <Chart
              ref={chartRef}
              type="line"
              data={chartData}
              options={chartOptions}
              className="hdt__chart-canvas"
              aria-label={chartTitle}
            />
          </div>
          {chartSeries.length > 0 && (
            <div className="hdt__chart-legend">
              {chartSeries.map((s, i) => (
                <div key={i} className="hdt__legend-item">
                  <span className="hdt__legend-dot" style={{ '--dot-color': s.borderColor } as React.CSSProperties} aria-hidden="true" />
                  <span className="hdt__legend-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: KPI panel ─────────────────────────────────────────────────── */}
        <div className="hdt__kpi-panel">
          {kpiItems.map((kpi, i) => (
            <React.Fragment key={kpi.id}>
              <div className="hdt__kpi-item">
                <span className="hdt__kpi-value">{kpi.value}</span>
                <span className="hdt__kpi-label">{kpi.label}</span>
                <Badge label={kpi.badge} color={kpi.badgeColor} variant="stroke" />
              </div>
              {i < kpiItems.length - 1 && <div className="hdt__kpi-divider" role="separator" />}
            </React.Fragment>
          ))}
        </div>

      </div>
    </Card>
  );
};
