import type { FC } from 'react';
import './Stepper.scss';

export type StepStatus = 'pending' | 'active' | 'completed' | 'disabled' | 'error';

export interface Step {
  label: string;
  status?: StepStatus;
}

export interface StepperProps {
  steps: Step[];
  activeStep?: number;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

const ErrorIcon: FC = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const resolveStatus = (step: Step, index: number, activeStep: number): StepStatus => {
  if (step.status) return step.status;
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'pending';
};

export const Stepper: FC<StepperProps> = ({
  steps,
  activeStep = 0,
  orientation = 'vertical',
  className = '',
}) => (
  <ol
    className={[
      'stepper',
      `stepper--${orientation}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    aria-label="Steps"
  >
    {steps.map((step, index) => {
      const status = resolveStatus(step, index, activeStep);
      const isLast = index === steps.length - 1;

      return (
        <li
          key={index}
          className={[
            'stepper__step',
            `stepper__step--${status}`,
          ].join(' ')}
          aria-current={status === 'active' ? 'step' : undefined}
        >
          <div className="stepper__indicator-col">
            <span className="stepper__circle" aria-hidden="true">
              {status === 'error' ? (
                <ErrorIcon />
              ) : (
                <span className="stepper__number">{index + 1}</span>
              )}
            </span>
            {!isLast && <span className="stepper__connector" aria-hidden="true" />}
          </div>
          <span className="stepper__label">{step.label}</span>
        </li>
      );
    })}
  </ol>
);
