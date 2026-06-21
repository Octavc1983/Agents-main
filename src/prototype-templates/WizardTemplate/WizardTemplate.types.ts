import type React from 'react';

export interface WizardStep {
  id: number;
  label: string;
}

export interface WizardTemplateProps {
  title: string;
  steps: readonly WizardStep[];
  currentStep: number;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  canNext: boolean;
  nextLabel?: string;
  isSubmitting?: boolean;
  children: React.ReactNode;
}
