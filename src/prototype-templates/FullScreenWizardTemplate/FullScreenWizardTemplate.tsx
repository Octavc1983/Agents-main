/**
 * FullScreenWizardTemplate — Page Composition Template
 *
 * Fills the entire Main Content area. AppShell, Sidebar, and Header remain intact.
 * Left panel: wizard title + vertical stepper with full WizardStepStatus support.
 * Right area: scrollable step content + fixed footer (Close | Back, Next/Finish).
 *
 * This is NOT a DS component. It is a prototype-layer template.
 * No inline styles. No new tokens. SVG icons only.
 */

import React from 'react';
import { Button } from '@idira/design-system';
import type {
  FullScreenWizardTemplateProps,
  FullScreenWizardStep,
  WizardStepStatus,
} from './FullScreenWizardTemplate.types';
import './FullScreenWizardTemplate.scss';

// ── Stepper bubble icons ───────────────────────────────────────────────────────

const CheckIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WarnIcon: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M5 1L9 9H1L5 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="5" y1="4" x2="5" y2="6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const SpinnerIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="fsw-tpl__spinner-icon">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="14 6" />
  </svg>
);

// ── Stepper logic ──────────────────────────────────────────────────────────────

type BubbleVariant =
  | 'current'
  | 'completed'
  | 'in-progress'
  | 'failed'
  | 'warning'
  | 'locked'
  | 'upcoming';

function deriveBubbleVariant(
  stepId: string,
  currentStep: string,
  status: WizardStepStatus,
  isAccessible: boolean,
): BubbleVariant {
  if (stepId === currentStep) return 'current';
  if (status === 'completed') return 'completed';
  if (status === 'in-progress') return 'in-progress';
  if (status === 'failed') return 'failed';
  if (status === 'warning') return 'warning';
  if (!isAccessible || status === 'locked' || status === 'blocked') return 'locked';
  return 'upcoming';
}

function getBubbleContent(variant: BubbleVariant, stepNumber: number): React.ReactNode {
  switch (variant) {
    case 'completed':   return <CheckIcon />;
    case 'failed':      return <XIcon />;
    case 'warning':     return <WarnIcon />;
    case 'in-progress': return <SpinnerIcon />;
    default:            return String(stepNumber);
  }
}

function isStepClickable(
  step: FullScreenWizardStep,
  currentStep: string,
  hasClickHandler: boolean,
): boolean {
  if (!hasClickHandler) return false;
  if (step.id === currentStep) return false;
  if (!step.isAccessible) return false;
  if (
    step.status === 'locked' ||
    step.status === 'blocked' ||
    step.status === 'in-progress' ||
    step.status === 'unknown-outcome'
  ) return false;
  return true;
}

// ── VerticalStepper ────────────────────────────────────────────────────────────

interface StepperProps {
  steps: ReadonlyArray<FullScreenWizardStep>;
  currentStep: string;
  onStepClick?: (stepId: string) => void;
}

const VerticalStepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick }) => (
  <nav className="fsw-tpl__stepper" aria-label="Wizard steps">
    <ol className="fsw-tpl__step-list">
      {steps.map((step, i) => {
        const variant = deriveBubbleVariant(step.id, currentStep, step.status, step.isAccessible);
        const clickable = isStepClickable(step, currentStep, !!onStepClick);
        const isLast = i === steps.length - 1;
        const stepNumber = i + 1;

        return (
          <li
            key={step.id}
            className={[
              'fsw-tpl__step',
              `fsw-tpl__step--${variant}`,
              clickable ? 'fsw-tpl__step--clickable' : '',
            ].filter(Boolean).join(' ')}
            aria-current={step.id === currentStep ? 'step' : undefined}
          >
            <div className="fsw-tpl__step-track">
              <button
                type="button"
                className="fsw-tpl__step-bubble"
                onClick={clickable ? () => onStepClick!(step.id) : undefined}
                disabled={!clickable}
                aria-label={`${step.label}${step.status !== 'not-started' ? `: ${step.status}` : ''}`}
                tabIndex={clickable ? 0 : -1}
              >
                {getBubbleContent(variant, stepNumber)}
              </button>
              {!isLast && (
                <span
                  className={[
                    'fsw-tpl__step-line',
                    step.status === 'completed' ? 'fsw-tpl__step-line--completed' : '',
                  ].filter(Boolean).join(' ')}
                  aria-hidden="true"
                />
              )}
            </div>

            <div className="fsw-tpl__step-info">
              <span className="fsw-tpl__step-label">{step.label}</span>
              {step.subLabel && (
                <span className="fsw-tpl__step-sublabel">{step.subLabel}</span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  </nav>
);

// ── FullScreenWizardTemplate ──────────────────────────────────────────────────

export const FullScreenWizardTemplate: React.FC<FullScreenWizardTemplateProps> = ({
  title,
  subtitle,
  steps,
  currentStep,
  onStepClick,
  onClose,
  onBack,
  onNext,
  canNext = true,
  nextLabel,
  backBehavior = 'allowed-no-reset',
  isSubmitting = false,
  cancelLabel = 'Close',
  children,
}) => {
  const isLastStep = currentStep === steps[steps.length - 1].id;
  const showBack = backBehavior !== 'hidden';
  const isBackDisabled =
    backBehavior === 'blocked-after-irreversible-action' || isSubmitting;

  const resolvedNextLabel = isLastStep
    ? isSubmitting
      ? 'Processing…'
      : (nextLabel ?? 'Finish')
    : (nextLabel ?? 'Next');

  return (
    <div className="fsw-tpl">

      {/* ── Left: wizard nav panel ─────────────────────────────────── */}
      <aside className="fsw-tpl__nav" aria-label="Wizard navigation">
        <div className="fsw-tpl__nav-header">
          <h2 className="fsw-tpl__title">{title}</h2>
          {subtitle && <p className="fsw-tpl__subtitle">{subtitle}</p>}
        </div>
        <VerticalStepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={onStepClick}
        />
      </aside>

      {/* ── Right: content + footer ────────────────────────────────── */}
      <div className="fsw-tpl__body">
        <div className="fsw-tpl__content">
          {children}
        </div>

        <div className="fsw-tpl__footer">
          <Button variant="text" size="sm" onClick={onClose} disabled={isSubmitting}>
            {cancelLabel}
          </Button>
          <div className="fsw-tpl__footer-actions">
            {showBack && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onBack}
                disabled={isBackDisabled}
              >
                Back
              </Button>
            )}
            <Button
              variant="main"
              size="sm"
              onClick={onNext}
              disabled={!canNext || isSubmitting}
            >
              {resolvedNextLabel}
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FullScreenWizardTemplate;
