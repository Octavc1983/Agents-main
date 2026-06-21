import React from 'react';
import './RiskMiniBar.scss';

export interface RiskMiniBarSegment {
  severity: 'critical' | 'high' | 'medium' | 'low';
  count: number;
}

export interface RiskMiniBarProps {
  label: string;
  segments: RiskMiniBarSegment[];
  totalLabel?: string;
  className?: string;
}

const SEGMENT_ORDER: RiskMiniBarSegment['severity'][] = ['critical', 'high', 'medium', 'low'];

export const RiskMiniBar: React.FC<RiskMiniBarProps> = ({ label, segments, totalLabel, className }) => {
  const total = segments.reduce((sum, s) => sum + s.count, 0);
  const sorted = SEGMENT_ORDER
    .map(sev => segments.find(s => s.severity === sev))
    .filter((s): s is RiskMiniBarSegment => !!s && s.count > 0);

  return (
    <div className={['rmb', className].filter(Boolean).join(' ')}>
      <div className="rmb__header">
        <span className="rmb__label">{label}</span>
        {totalLabel && <span className="rmb__total">{totalLabel}</span>}
      </div>

      <div className="rmb__track" role="img" aria-label={`Risk breakdown for ${label}`}>
        {sorted.map(s => {
          const pct = total > 0 ? (s.count / total) * 100 : 0;
          return (
            <div
              key={s.severity}
              className={`rmb__fill rmb__fill--${s.severity}`}
              style={{ width: `${pct}%` }}
              title={`${s.severity}: ${s.count}`}
            />
          );
        })}
      </div>

      <div className="rmb__stats">
        {sorted.map(s => (
          <div key={s.severity} className={`rmb__stat rmb__stat--${s.severity}`}>
            <span className="rmb__stat-val">{s.count.toLocaleString()}</span>
            <span className="rmb__stat-lbl">{s.severity.charAt(0).toUpperCase() + s.severity.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
