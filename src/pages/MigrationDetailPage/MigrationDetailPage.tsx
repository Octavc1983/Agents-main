import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@idira/design-system';
import {
  StatusPendingIcon,
  StatusRunningIcon,
  StatusCompletedIcon,
  StatusFailedIcon,
} from '@idira/design-system/icons';
import { mockMigrationDetails } from '../../mock/migrationDetailMockData';
import { useSetPageTitle } from '../../hooks/useSetPageTitle';
import './MigrationDetailPage.scss';

type StepStatus = 'not_performed' | 'in_progress' | 'done' | 'failed';

const STATUS_ICON: Record<StepStatus, React.ReactElement> = {
  not_performed: <StatusPendingIcon size={14} />,
  in_progress:   <StatusRunningIcon size={14} />,
  done:          <StatusCompletedIcon size={14} />,
  failed:        <StatusFailedIcon size={14} />,
};

const STATUS_LABEL: Record<StepStatus, string> = {
  not_performed: 'Not performed',
  in_progress:   'In progress',
  done:          'Done',
  failed:        'Failed',
};

const StatusBadge: React.FC<{ status: StepStatus }> = ({ status }) => (
  <span className={`migration-step-status migration-step-status--${status}`}>
    {STATUS_ICON[status]}
    {STATUS_LABEL[status]}
  </span>
);

type CheckStatus = 'not_run' | 'running' | 'passed' | 'failed';

interface ReadinessCheck {
  id: string;
  name: string;
  description: string;
  status: CheckStatus;
}

interface MigrationStep {
  id: string;
  stepNumber: number;
  title: string;
  status: StepStatus;
  description?: string;
  actionLabel?: string;
  checks?: ReadinessCheck[];
}

export const MigrationDetailPage: React.FC = () => {
  const { migrationId } = useParams<{ migrationId: string }>();
  const detail = mockMigrationDetails.find(d => d.id === migrationId) ?? mockMigrationDetails[0];

  useSetPageTitle(detail.title);

  const [steps, setSteps] = useState<MigrationStep[]>(detail.steps);
  const [runningCheck, setRunningCheck] = useState<string | null>(null);

  const handleStepAction = (stepId: string) => {
    setSteps(prev =>
      prev.map(s => s.id === stepId ? { ...s, status: 'done' as StepStatus } : s)
    );
  };

  const handleRunCheck = (checkId: string) => {
    setRunningCheck(checkId);
    setTimeout(() => {
      setRunningCheck(null);
      setSteps(prev =>
        prev.map(s => ({
          ...s,
          checks: s.checks?.map(c => c.id === checkId ? { ...c, status: 'passed' as CheckStatus } : c),
        }))
      );
    }, 1500);
  };

  return (
    <div className="migration-detail-page">
      <div className="migration-detail-page__notice" role="note">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="4.5" x2="8" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.75" fill="currentColor" />
        </svg>
        <p>
          Note: Before getting started, review the{' '}
          <a href="#documentation" className="migration-detail-page__link">documentation</a>{' '}
          to learn about the migration process and prerequisites.
          <br />
          The migration goes through several steps and might take several hours
        </p>
      </div>

      <div className="migration-detail-page__steps">
        {steps.map(step => (
          <section key={step.id} className="migration-step">
            <div className="migration-step__header">
              <h2 className="migration-step__title">
                Step {step.stepNumber}: {step.title}
              </h2>
              <div className="migration-step__divider" aria-hidden="true" />
              <StatusBadge status={step.status} />
            </div>

            <div className="migration-step__body">
              {step.description && (() => {
                const lines = step.description.split('\n').filter(Boolean);
                return lines.length > 1 ? (
                  <ul className="migration-step__description-list">
                    {lines.map(line => (
                      <li key={line} className="migration-step__description-item">{line.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="migration-step__description">{step.description}</p>
                );
              })()}

              {step.checks && step.checks.length > 0 && (
                <table className="migration-checks-table" aria-label={`${step.title} readiness checks`}>
                  <thead>
                    <tr>
                      <th className="migration-checks-table__th">Name</th>
                      <th className="migration-checks-table__th">Description / Recommended action</th>
                      <th className="migration-checks-table__th migration-checks-table__th--actions" />
                    </tr>
                  </thead>
                  <tbody>
                    {step.checks.map(check => (
                      <tr key={check.id} className="migration-checks-table__row">
                        <td className="migration-checks-table__td migration-checks-table__td--name">
                          {check.status === 'passed'  && <StatusCompletedIcon size={14} />}
                          {check.status === 'failed'  && <StatusFailedIcon size={14} />}
                          {check.status === 'running' && <StatusRunningIcon size={14} />}
                          {check.status === 'not_run' && <StatusPendingIcon size={14} />}
                          {check.name}
                        </td>
                        <td className="migration-checks-table__td">{check.description}</td>
                        <td className="migration-checks-table__td migration-checks-table__td--actions">
                          <Button
                            variant="secondary"
                            size="sm"
                            isLoading={runningCheck === check.id}
                            onClick={() => handleRunCheck(check.id)}
                          >
                            Run
                          </Button>
                          <button type="button" className="migration-checks-table__more-btn" aria-label="More actions">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <circle cx="8" cy="3" r="1.2" fill="currentColor" />
                              <circle cx="8" cy="8" r="1.2" fill="currentColor" />
                              <circle cx="8" cy="13" r="1.2" fill="currentColor" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {step.actionLabel && (
                <Button
                  variant={step.status === 'done' ? 'secondary' : 'main'}
                  size="md"
                  onClick={() => handleStepAction(step.id)}
                  disabled={step.status === 'done'}
                >
                  {step.actionLabel}
                </Button>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
