/**
 * WizardTemplate — Page Composition Template
 *
 * Layout: fixed left panel (steps nav, ~280px) / scrollable right content area.
 * Vertical numbered stepper on the left. Content + footer nav on the right.
 *
 * This is NOT a DS component. It is a prototype-layer template.
 *
 * Components used (all existing in this project):
 *   - Button   @idira/design-system
 *
 * No DS components created. No new tokens created. No inline styles used.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@idira/design-system';
import type { WizardTemplateProps } from './WizardTemplate.types';
import './WizardTemplate.scss';

// ── Vertical stepper ──────────────────────────────────────────────────────────

interface StepperProps {
  steps: WizardTemplateProps['steps'];
  currentStep: number;
}

const VerticalStepper: React.FC<StepperProps> = ({ steps, currentStep }) => (
  <nav className="wizard-tpl__stepper" aria-label="Wizard steps">
    <ol className="wizard-tpl__step-list">
      {steps.map((step, i) => {
        const state =
          step.id < currentStep ? 'visited' :
          step.id === currentStep ? 'current' : 'upcoming';
        const isLast = i === steps.length - 1;

        return (
          <li
            key={step.id}
            className={`wizard-tpl__step wizard-tpl__step--${state}`}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <div className="wizard-tpl__step-track">
              <span className="wizard-tpl__step-number" aria-hidden="true">
                {state === 'visited' ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : step.id}
              </span>
              {!isLast && (
                <span
                  className={`wizard-tpl__step-line${state === 'visited' ? ' wizard-tpl__step-line--visited' : ''}`}
                  aria-hidden="true"
                />
              )}
            </div>
            <span className="wizard-tpl__step-label">{step.label}</span>
          </li>
        );
      })}
    </ol>
  </nav>
);

// ── WizardTemplate ────────────────────────────────────────────────────────────

export const WizardTemplate: React.FC<WizardTemplateProps> = ({
  title,
  steps,
  currentStep,
  onClose,
  onBack,
  onNext,
  canNext,
  nextLabel,
  isSubmitting = false,
  children,
}) => {
  const isLastStep = currentStep === steps[steps.length - 1].id;

  return ReactDOM.createPortal(
    <div className="wizard-tpl-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="wizard-tpl">

        {/* ── Left: stepper panel ── */}
        <aside className="wizard-tpl__sidebar">
          <div className="wizard-tpl__sidebar-header">
            <h2 className="wizard-tpl__title">{title}</h2>
          </div>
          <VerticalStepper steps={steps} currentStep={currentStep} />
        </aside>

        {/* ── Right: content + footer ── */}
        <div className="wizard-tpl__main">
          <div className="wizard-tpl__content">
            {children}
          </div>

          <div className="wizard-tpl__footer">
            <Button variant="text" size="sm" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <div className="wizard-tpl__footer-nav">
              {currentStep > steps[0].id && (
                <Button variant="secondary" size="sm" onClick={onBack} disabled={isSubmitting}>
                  Back
                </Button>
              )}
              <Button
                variant="main"
                size="sm"
                onClick={onNext}
                disabled={!canNext || isSubmitting}
              >
                {isLastStep
                  ? (isSubmitting ? 'Creating…' : (nextLabel ?? 'Finish'))
                  : 'Next'}
              </Button>
            </div>
          </div>
        </div>

        {/* ── Close button ── */}
        <button
          type="button"
          className="wizard-tpl__close"
          onClick={onClose}
          aria-label="Close wizard"
          disabled={isSubmitting}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M12.667 3.333L3.334 12.667M3.334 3.333L12.667 12.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

      </div>
    </div>,
    document.body,
  );
};
