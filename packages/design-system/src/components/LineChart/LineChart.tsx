import React from 'react';
import './LineChart.scss';

export interface LineChartDataPoint {
  label: string;
  value: number;
}

export interface LineChartSeries {
  id: string;
  label: string;
  severity?: 'critical' | 'high' | 'medium' | 'low' | 'neutral';
  color?: string;
  data: LineChartDataPoint[];
}

export interface LineChartProps {
  series: LineChartSeries[];
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  showDots?: boolean;
  className?: string;
  'aria-label'?: string;
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: 'var(--lc-color-critical)',
  high:     'var(--lc-color-high)',
  medium:   'var(--lc-color-medium)',
  low:      'var(--lc-color-low)',
  neutral:  'var(--lc-color-neutral)',
};

function buildPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  return points.reduce((path, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${path} L ${pt.x} ${pt.y}`;
  }, '');
}

export const LineChart: React.FC<LineChartProps> = ({
  series,
  height = 200,
  showLegend = true,
  showGrid = true,
  showDots = true,
  className,
  'aria-label': ariaLabel,
}) => {
  const PADDING = { top: 16, right: 16, bottom: 28, left: 40 };
  const LEGEND_H = showLegend ? 28 : 0;
  const SVG_H = height - LEGEND_H;
  const plotH = SVG_H - PADDING.top - PADDING.bottom;

  const allValues = series.flatMap(s => s.data.map(d => d.value));
  const maxVal = allValues.length > 0 ? Math.max(...allValues) : 1;
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const xLabels = series[0]?.data.map(d => d.label) ?? [];
  const xCount = xLabels.length;

  const yGridCount = 5;
  const yTicks = Array.from({ length: yGridCount + 1 }, (_, i) => {
    const val = minVal + (range * i) / yGridCount;
    return val >= 1000 ? `${Math.round(val / 1000)}K` : String(Math.round(val));
  }).reverse();

  return (
    <div className={['lchart', className].filter(Boolean).join(' ')} style={{ height }} aria-label={ariaLabel ?? 'Line chart'}>
      <div className="lchart__plot-area" style={{ height: SVG_H }}>
        <svg
          className="lchart__svg"
          viewBox={`0 0 100 ${SVG_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Y-axis grid lines and labels */}
          {showGrid && yTicks.map((tick, i) => {
            const y = PADDING.top + (i / yGridCount) * plotH;
            return (
              <g key={tick}>
                <line
                  x1={PADDING.left} y1={y}
                  x2={100 - PADDING.right} y2={y}
                  className="lchart__grid-line"
                />
              </g>
            );
          })}

          {/* Series lines */}
          {series.map(s => {
            const color = s.color ?? (s.severity ? SEVERITY_COLORS[s.severity] : SEVERITY_COLORS.neutral);
            if (s.data.length === 0) return null;
            const points = s.data.map((d, i) => ({
              x: PADDING.left + (i / Math.max(xCount - 1, 1)) * (100 - PADDING.left - PADDING.right),
              y: PADDING.top + plotH - ((d.value - minVal) / range) * plotH,
            }));
            return (
              <g key={s.id}>
                <path
                  d={buildPath(points)}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lchart__line"
                />
                {showDots && points.map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="2"
                    fill={color}
                    className="lchart__dot"
                  />
                ))}
              </g>
            );
          })}
        </svg>

        {/* Y-axis labels (positioned absolutely) */}
        <div className="lchart__y-labels" aria-hidden="true">
          {yTicks.map((tick, i) => (
            <span
              key={tick}
              className="lchart__y-label"
              style={{ top: `${PADDING.top + (i / yGridCount) * plotH - 8}px` }}
            >
              {tick}
            </span>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="lchart__x-labels" aria-hidden="true">
          {xLabels.map((label, i) => (
            <span
              key={label}
              className="lchart__x-label"
              style={{ left: `${(i / Math.max(xCount - 1, 1)) * 100}%` }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {showLegend && (
        <div className="lchart__legend" aria-label="Chart legend">
          {series.map(s => {
            const color = s.color ?? (s.severity ? SEVERITY_COLORS[s.severity] : SEVERITY_COLORS.neutral);
            return (
              <div key={s.id} className="lchart__legend-item">
                <span className="lchart__legend-dot" style={{ background: color }} aria-hidden="true" />
                <span className="lchart__legend-label">{s.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
