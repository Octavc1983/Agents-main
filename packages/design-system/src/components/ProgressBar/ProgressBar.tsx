import type { FC, ReactNode } from 'react';
import './ProgressBar.scss';

export type ProgressBarStatus = 'active' | 'paused' | 'failed' | 'done';

export interface ProgressBarProps {
  value: number;
  max?: number;
  status?: ProgressBarStatus;
  label?: string;
  sublabel?: string;
  actionSlot?: ReactNode;
  showPercentage?: boolean;
  showIndicators?: boolean;
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  max = 100,
  status = 'active',
  label,
  sublabel,
  actionSlot,
  showPercentage = false,
  showIndicators = false,
  className = '',
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const pctLabel = `${Math.round(pct)}%`;

  const statusText: Record<ProgressBarStatus, string> = {
    active: '',
    paused: 'Paused',
    failed: 'Failed',
    done: 'Done',
  };

  return (
    <div
      className={`progress-bar progress-bar--${status} ${className}`.trim()}
      role="group"
      aria-label={label}
    >
      {(label || actionSlot) && (
        <div className="progress-bar__header">
          {label && (
            <span className="progress-bar__label">
              {showIndicators && <span className="progress-bar__count">{value}/{max}</span>}
              <span>{label}</span>
            </span>
          )}
          {actionSlot && <div className="progress-bar__action">{actionSlot}</div>}
        </div>
      )}

      <div className="progress-bar__track-row">
        {showIndicators && !label && (
          <span className="progress-bar__inline-pct">{pctLabel}</span>
        )}
        <div
          className="progress-bar__track"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuetext={pctLabel}
        >
          <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
        </div>
        {(showPercentage || showIndicators) && (
          <span className="progress-bar__pct">{pctLabel}</span>
        )}
      </div>

      {(sublabel || statusText[status]) && (
        <div className="progress-bar__footer">
          {sublabel && <span className="progress-bar__sublabel">{sublabel}</span>}
          {!sublabel && statusText[status] && (
            <span className={`progress-bar__status progress-bar__status--${status}`}>
              {statusText[status]}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
