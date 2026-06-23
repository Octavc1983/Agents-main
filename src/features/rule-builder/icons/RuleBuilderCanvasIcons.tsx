/**
 * RuleBuilderCanvasIcons — Rule Builder canvas-specific icon primitives.
 *
 * This file contains ONLY domain-specific visual markers that have no
 * equivalent in @idira/design-system/icons.
 *
 * Generic icons (Edit, ZoomIn, ZoomOut, FitToView, AlertCircle, etc.)
 * are now available from @idira/design-system/icons and must be imported
 * from there — not re-implemented here.
 */

import React from 'react';

interface CanvasIconProps {
  className?: string;
}

// Add Rule circular button — canvas-specific interaction affordance.
// No DS equivalent for a circular add-rule button that communicates branch creation.
export const AddRuleCanvasIcon: React.FC<CanvasIconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
