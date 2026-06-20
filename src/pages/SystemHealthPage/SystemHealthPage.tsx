import React from 'react';
import { ProgressBar } from '@idira/design-system';
import './SystemHealthPage.scss';

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ title, children }) => (
  <div className="health-card">
    <div className="health-card__title">{title}</div>
    <div className="health-card__body">{children}</div>
  </div>
);

interface MetricSectionProps {
  label: string;
  instanceCount: number;
  connectedCount: number;
  extraMetric?: { label: string; value: string | number };
}

const MetricSection: React.FC<MetricSectionProps> = ({
  label,
  instanceCount,
  connectedCount,
  extraMetric,
}) => (
  <div className="health-metric">
    <div className="health-metric__left">
      <div className="health-metric__label">{label} ({instanceCount})</div>
      <ProgressBar value={100} />
      <div className="health-metric__connected">
        <span className="health-metric__dot" aria-hidden="true" />
        {connectedCount} Connected
      </div>
    </div>
    {extraMetric && (
      <div className="health-metric__right">
        <div className="health-metric__extra-label">{extraMetric.label}</div>
        <div className="health-metric__extra-value">{extraMetric.value}</div>
      </div>
    )}
  </div>
);

export const SystemHealthPage: React.FC = () => {
  return (
    <div className="system-health-page">
      <h1 className="system-health-page__title">System Health</h1>

      <div className="system-health-page__grid">
        <ComponentCard title="Web Portal">
          <div className="health-stat">
            <div className="health-stat__label">Active Users</div>
            <div className="health-stat__value">1</div>
          </div>
        </ComponentCard>

        <ComponentCard title="CPM">
          <MetricSection
            label="App User Instances"
            instanceCount={1}
            connectedCount={1}
            extraMetric={{ label: 'Managed Accounts', value: 358 }}
          />
        </ComponentCard>

        <ComponentCard title="PSM and PSM for SSH">
          <MetricSection
            label="App User Instances"
            instanceCount={1}
            connectedCount={1}
            extraMetric={{ label: 'Concurrent Sessions', value: 0 }}
          />
        </ComponentCard>
      </div>
    </div>
  );
};
