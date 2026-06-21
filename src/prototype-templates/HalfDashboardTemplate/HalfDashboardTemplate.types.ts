import type React from 'react';

export interface HalfDashboardTileSegment {
  severity: 'critical' | 'high' | 'medium' | 'low';
  count: number;
}

export interface HalfDashboardCategoryTile {
  id: string;
  label: string;
  total: number;
  critical: number;
  segments?: HalfDashboardTileSegment[];
}

export interface HalfDashboardKpiItem {
  id: string;
  value: string;
  label: string;
  badge: string;
  badgeColor: 'critical' | 'high' | 'medium' | 'low' | 'success' | 'info' | 'neutral';
}

export interface HalfDashboardTimeRange {
  id: string;
  label: string;
}

export interface HalfDashboardChartSeries {
  label: string;
  data: number[];
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface HalfDashboardHeaderKpi {
  icon: React.ReactNode;
  value: number;
  label: string;
}

export interface HalfDashboardTemplateProps {
  title: string;
  headerKpis: HalfDashboardHeaderKpi[];
  topRowTiles: HalfDashboardCategoryTile[];
  bottomRowTiles: HalfDashboardCategoryTile[];
  chartTitle: string;
  chartLabels: string[];
  chartSeries: HalfDashboardChartSeries[];
  timeRanges: HalfDashboardTimeRange[];
  defaultTimeRange: string;
  onTimeRangeChange?: (rangeId: string) => void;
  kpiItems: HalfDashboardKpiItem[];
  className?: string;
}
