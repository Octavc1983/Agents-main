import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, ProgressBar } from '@idira/design-system';
import './SystemHealthPage.scss';

type ConnectionStatus = 'connected' | 'disconnected';

interface MetricSectionProps {
  label: string;
  instanceCount: number;
  connectedCount: number;
  totalCount: number;
  status: ConnectionStatus;
  extraMetric?: { label: string; value: string | number };
}

const MetricSection: React.FC<MetricSectionProps> = ({
  label,
  instanceCount,
  connectedCount,
  totalCount,
  status,
  extraMetric,
}) => (
  <div className="health-metric">
    <div className="health-metric__left">
      <div className="health-metric__label">{label} ({instanceCount})</div>
      <ProgressBar
        value={connectedCount}
        max={totalCount}
        status={status === 'connected' ? 'active' : 'failed'}
      />
      <div className={`health-metric__connected health-metric__connected--${status}`}>
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
  const navigate = useNavigate();

  return (
    <div className="system-health-page">
      <h1 className="system-health-page__title">System Health</h1>

      <div className="system-health-page__grid">
        <Card
          state="default"
          size="auto"
          onClick={() => navigate('/setup/health/session-diagnostics')}
          aria-label="Web Portal — view sessions"
          className="health-card"
        >
          <div className="health-card__header-row">Web Portal</div>
          <div className="health-stat">
            <div className="health-stat__label">Active Users</div>
            <div className="health-stat__value">1</div>
          </div>
        </Card>

        <Card
          state="default"
          size="auto"
          onClick={() => navigate('/setup/health/system-health/cpm')}
          aria-label="CPM — view instances"
          className="health-card"
        >
          <div className="health-card__header-row">CPM</div>
          <MetricSection
            label="App User Instances"
            instanceCount={1}
            connectedCount={1}
            totalCount={1}
            status="connected"
            extraMetric={{ label: 'Managed Accounts', value: 358 }}
          />
        </Card>

        <Card
          state="default"
          size="auto"
          onClick={() => navigate('/setup/health/system-health/psm')}
          aria-label="PSM and PSM for SSH — view instances"
          className="health-card"
        >
          <div className="health-card__header-row">PSM and PSM for SSH</div>
          <MetricSection
            label="App User Instances"
            instanceCount={1}
            connectedCount={1}
            totalCount={1}
            status="connected"
            extraMetric={{ label: 'Concurrent Sessions', value: 0 }}
          />
        </Card>
      </div>
    </div>
  );
};
