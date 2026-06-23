import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Alert } from '@idira/design-system';
import { StatusIcon } from '../../components/shared/StatusIcon';
import type { StepStatusValue } from '../../components/shared/StatusIcon/StatusIcon';
import { mockMigrationDetails } from '../../mock/migrationDetailMockData';
import { useSetPageTitle } from '../../hooks/useSetPageTitle';
import '../../prototype-templates/TableFiltersTemplate/TableFiltersTemplate.scss';
import './MigrationDetailPage.scss';

type StepStatus = 'not_performed' | 'in_progress' | 'done' | 'failed';

const STATUS_LABEL: Record<StepStatus, string> = {
  not_performed: 'Not performed',
  in_progress:   'In progress',
  done:          'Done',
  failed:        'Failed',
};

const StatusBadge: React.FC<{ status: StepStatus }> = ({ status }) => (
  <span className={`migration-step-status migration-step-status--${status}`}>
    <StatusIcon status={status} size={24} />
    {STATUS_LABEL[status]}
  </span>
);

type CheckStatus = 'not_run' | 'running' | 'passed' | 'failed';

const CHECK_STATUS_MAP: Record<CheckStatus, StepStatusValue> = {
  not_run: 'not_performed',
  running: 'in_progress',
  passed:  'done',
  failed:  'failed',
};

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
      <div className="migration-detail-page__notice">
        <Alert
          variant="info"
          message={
            <>
              Before getting started, review the{' '}
              <a href="#documentation" className="migration-detail-page__link">documentation</a>{' '}
              to learn about the migration process and prerequisites.
              {' '}The migration goes through several steps and might take several hours.
            </>
          }
        />
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
                <div className="migration-checks-table-wrap">
                  <table className="tableFiltersTemplate__tableEl" aria-label={`${step.title} readiness checks`}>
                    <thead>
                      <tr>
                        <th className="tableFiltersTemplate__th">Name</th>
                        <th className="tableFiltersTemplate__th">Description / Recommended action</th>
                        <th className="tableFiltersTemplate__th tableFiltersTemplate__th--actions" />
                      </tr>
                    </thead>
                    <tbody>
                      {step.checks.map(check => (
                        <tr key={check.id} className="tableFiltersTemplate__row">
                          <td className="tableFiltersTemplate__td migration-checks-td--name">
                            <StatusIcon status={CHECK_STATUS_MAP[check.status]} size={14} />
                            <span title={check.name}>{check.name}</span>
                          </td>
                          <td className="tableFiltersTemplate__td migration-checks-td--description">
                            <span title={check.description}>{check.description}</span>
                          </td>
                          <td className="tableFiltersTemplate__td tableFiltersTemplate__td--actions migration-checks-td--actions">
                            <Button
                              variant="secondary"
                              size="sm"
                              isLoading={runningCheck === check.id}
                              onClick={() => handleRunCheck(check.id)}
                            >
                              Run
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
