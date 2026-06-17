/**
 * ErrorState Component
 * Displays error message with optional action
 */

import type React from 'react';
import type { ErrorStateProps } from '../../../types/prototype.types';
import './ErrorState.scss';

export const ErrorState: React.FC<ErrorStateProps> = ({ title, message, action, className }) => {
  return (
    <div className={`error-state ${className || ''}`}>
      <div className="error-state__icon">⚠</div>
      <h3 className="error-state__title">{title}</h3>
      <p className="error-state__message">{message}</p>
      {action && <div className="error-state__action">{action}</div>}
    </div>
  );
};
