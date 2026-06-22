import type React from 'react';

export type WizardStepStatus =
  | 'not-started'
  | 'locked'
  | 'ready'
  | 'in-progress'
  | 'completed'
  | 'warning'
  | 'failed'
  | 'blocked'
  | 'unknown-outcome'
  | 'skipped'
  | 'reset';

export type WizardBackBehavior =
  | 'allowed-no-reset'
  | 'allowed-with-downstream-reset'
  | 'allowed-before-lock'
  | 'blocked-after-irreversible-action'
  | 'hidden';

export interface FullScreenWizardStep {
  id: string;
  label: string;
  subLabel?: string;       // secondary line below label, e.g. selected connector name after completion
  status: WizardStepStatus;
  isAccessible: boolean;   // true → user may click this step in the stepper to navigate
  dependsOn?: string[];    // ids of steps that must complete before this step becomes accessible
}

export interface FullScreenWizardTemplateProps {
  title: string;                           // shown in left nav panel header
  subtitle?: string;                       // optional secondary line below title in left panel
  steps: readonly FullScreenWizardStep[];
  currentStep: string;                     // id of the active step
  onStepClick?: (stepId: string) => void;  // fires only when a step is accessible and not current
  onClose: () => void;                     // "Close" / "Cancel" footer button
  onBack: () => void;                      // "Back" footer button
  onNext: () => void;                      // primary footer action (Next / Finish / custom label)
  canNext?: boolean;                       // default true; false disables the primary action
  nextLabel?: string;                      // overrides label; last step defaults to "Finish"
  backBehavior?: WizardBackBehavior;       // controls Back button visibility and enabled state
  isSubmitting?: boolean;                  // disables all footer actions + shows loading label
  cancelLabel?: string;                    // default "Close"
  children: React.ReactNode;              // current step content rendered in the scrollable area
}
