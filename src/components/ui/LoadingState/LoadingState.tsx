/**
 * LoadingState Component
 * Displays loading indicator and message
 */

import type React from 'react';
import type { LoadingStateProps } from '../../../types/prototype.types';
import './LoadingState.scss';

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...', className }) => {
  return (
    <div className={`loading-state ${className || ''}`}>
      <div className="loading-state__spinner"></div>
      <p className="loading-state__message">{message}</p>
    </div>
  );
};
