import React from 'react';
import { HalfDashboardTemplate } from '../../prototype-templates/HalfDashboardTemplate';
import type {
  HalfDashboardCategoryTile,
  HalfDashboardKpiItem,
  HalfDashboardTimeRange,
  HalfDashboardChartSeries,
  HalfDashboardHeaderKpi,
} from '../../prototype-templates/HalfDashboardTemplate';

// ── Mock data ─────────────────────────────────────────────────────────────────

const HEADER_KPIS: HalfDashboardHeaderKpi[] = [
  {
    value: 267,
    label: 'Critical',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#F54E85" strokeWidth="1.5"/>
        <path d="M11.992 16H12.001" stroke="#F54E85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 13.125L12 8.9375" stroke="#F54E85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 588,
    label: 'High',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5.32171 9.68293C7.73539 5.41199 8.94222 3.27651 10.5983 2.72681C11.5093 2.4244 12.4907 2.4244 13.4017 2.72681C15.0578 3.27651 16.2646 5.41199 18.6783 9.68293C21.092 13.9539 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6549 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6549 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9539 5.32171 9.68293Z" stroke="#FFA033" strokeWidth="1.5"/>
        <path d="M11.992 16H12.001" stroke="#FFA033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 13L12 9" stroke="#FFA033" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 823,
    label: 'Medium',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="#888DFF" strokeWidth="1.5"/>
        <path d="M11.9998 16H12.0088" stroke="#888DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 13L12 8.875" stroke="#888DFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const TOP_TILES: HalfDashboardCategoryTile[] = [
  { id: 'users',       label: 'Users',              total: 3000, critical: 540,
    segments: [{ severity: 'critical', count: 540 }, { severity: 'high', count: 897 }, { severity: 'medium', count: 1124 }, { severity: 'low', count: 439 }] },
  { id: 'cloud-ent',   label: 'Cloud entitlements', total: 3006, critical: 1112,
    segments: [{ severity: 'critical', count: 1112 }, { severity: 'high', count: 920 }, { severity: 'medium', count: 974 }] },
  { id: 'cloud-infra', label: 'Cloud infra access', total: 1678, critical: 789,
    segments: [{ severity: 'critical', count: 789 }, { severity: 'high', count: 660 }, { severity: 'medium', count: 229 }] },
];

const BOTTOM_TILES: HalfDashboardCategoryTile[] = [
  { id: 'applications', label: 'Applications', total: 2789, critical: 2203,
    segments: [{ severity: 'critical', count: 2203 }, { severity: 'high', count: 410 }, { severity: 'medium', count: 176 }] },
  { id: 'secrets',      label: 'Secrets',      total: 200,  critical: 90,
    segments: [{ severity: 'critical', count: 90 }, { severity: 'high', count: 62 }, { severity: 'medium', count: 33 }, { severity: 'low', count: 15 }] },
  { id: 'workloads',    label: 'Workloads',    total: 400,  critical: 44,
    segments: [{ severity: 'critical', count: 44 }, { severity: 'high', count: 210 }, { severity: 'low', count: 146 }] },
  { id: 'ai-agents',    label: 'AI agents',    total: 5006, critical: 3204,
    segments: [{ severity: 'critical', count: 3204 }, { severity: 'high', count: 1114 }, { severity: 'medium', count: 688 }] },
];

const TIME_RANGES: HalfDashboardTimeRange[] = [
  { id: '1M', label: '1M' },
  { id: '3M', label: '3M' },
  { id: '6M', label: '6M' },
  { id: '1Y', label: '1Y' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CHART_SERIES: HalfDashboardChartSeries[] = [
  {
    label: 'Total findings',
    data: [40000, 50000, 60000, 80000, 100000, 120000, 130000, 145000, 155000, 165000, 172000, 180000],
    borderColor: '#C45BE7',
    gradientFrom: 'rgba(196,91,231,0.18)',
    gradientTo: 'rgba(57,56,56,0)',
  },
];

const KPI_ITEMS: HalfDashboardKpiItem[] = [
  { id: 'remediated',        value: '98%', label: 'Findings remediated',       badge: 'Good',           badgeColor: 'medium'   },
  { id: 'critical-resolved', value: '86%', label: 'Critical findings resolved', badge: 'Excellent',     badgeColor: 'success'  },
  { id: 'expansion',         value: '0%',  label: 'Expansion in Coverage',      badge: 'Need attention', badgeColor: 'critical' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export const RiskManagementPage: React.FC = () => (
  <div className="rmp">
    <HalfDashboardTemplate
      title="Total findings 12,456"
      headerKpis={HEADER_KPIS}
      topRowTiles={TOP_TILES}
      bottomRowTiles={BOTTOM_TILES}
      chartTitle="Progress over time"
      chartLabels={MONTHS}
      chartSeries={CHART_SERIES}
      timeRanges={TIME_RANGES}
      defaultTimeRange="1Y"
      kpiItems={KPI_ITEMS}
    />
  </div>
);
