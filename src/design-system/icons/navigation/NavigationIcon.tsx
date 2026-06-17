import React from 'react';
import {
  navigationIconMap,
  iconStateConfig,
  type NavigationIconType,
  type IconState,
} from './navigation-icons.config';
import './NavigationIcon.scss';

export interface NavigationIconProps {
  type: NavigationIconType;
  state?: IconState;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
}

/**
 * NavigationIcon Component
 * 
 * Renders navigation icons with state support (idle, hover, selected, selectedHover)
 * Extracted from IDIRA Design System
 * 
 * @param type - The icon type (e.g., 'Home', 'Settings', 'User')
 * @param state - The icon state: 'idle' | 'hover' | 'selected' | 'selectedHover'
 * @param size - Icon size: 'sm' (16px) | 'md' (24px) | 'lg' (32px)
 * @param className - Additional CSS classes
 * @param ariaLabel - Accessible label for the icon
 * 
 * @example
 * ```tsx
 * <NavigationIcon type="Home" state="idle" size="md" ariaLabel="Home" />
 * <NavigationIcon type="Settings" state="selected" size="lg" />
 * ```
 */
export const NavigationIcon: React.FC<NavigationIconProps> = ({
  type,
  state = 'idle',
  size = 'md',
  className = '',
  ariaLabel,
}) => {
  const icon = navigationIconMap[type];
  const stateStyle = iconStateConfig[state];

  return (
    <span
      className={`navigation-icon navigation-icon--${size} navigation-icon--${state} ${className}`}
      style={{
        opacity: stateStyle.opacity,
        transform: stateStyle.transform,
      }}
      aria-label={ariaLabel || type}
      role="img"
    >
      {icon}
    </span>
  );
};

export default NavigationIcon;
