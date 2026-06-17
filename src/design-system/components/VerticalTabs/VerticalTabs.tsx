import React, { useState } from 'react';
import './VerticalTabs.scss';

export interface VerticalTabItem {
  id: string;
  label: string;
  subtitle?: string;
  disabled?: boolean;
}

export interface VerticalTabsProps {
  items: VerticalTabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
  variant?: 'default' | 'compact';
}

/**
 * VerticalTabs Component
 * 
 * A vertical tab navigation component extracted from the IDIRA Design System.
 * Supports multiple states: Idle, Hover, Selected, and Disabled.
 * Features gradient selection background for visual depth.
 * 
 * @param items - Array of vertical tab items with id, label, optional subtitle, and disabled state
 * @param defaultActiveId - The id of the initially active tab (uncontrolled component)
 * @param activeId - The id of the currently active tab (controlled component)
 * @param onChange - Callback fired when a tab is clicked
 * @param className - Additional CSS class names
 * @param variant - Tab variant: 'default' or 'compact' sizing
 * 
 * @example
 * ```tsx
 * const tabs = [
 *   { id: 'tab1', label: 'Settings', subtitle: 'User settings' },
 *   { id: 'tab2', label: 'Profile', subtitle: 'Profile info' },
 *   { id: 'tab3', label: 'Security', disabled: true }
 * ];
 * 
 * <VerticalTabs items={tabs} defaultActiveId="tab1" onChange={(id) => console.log(id)} />
 * ```
 */
export const VerticalTabs: React.FC<VerticalTabsProps> = ({
  items,
  defaultActiveId,
  activeId,
  onChange,
  className = '',
  variant = 'default',
}) => {
  const [internalActiveId, setInternalActiveId] = useState(defaultActiveId || items[0]?.id);
  
  // Use controlled activeId if provided, otherwise use internal state
  const currentActiveId = activeId !== undefined ? activeId : internalActiveId;

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    
    if (activeId === undefined) {
      setInternalActiveId(id);
    }
    onChange?.(id);
  };

  return (
    <div className={`vertical-tabs vertical-tabs--${variant} ${className}`}>
      <div className="vertical-tabs__container">
        {items.map((item) => (
          <button
            key={item.id}
            className={`vertical-tabs__tab ${
              currentActiveId === item.id ? 'vertical-tabs__tab--selected' : ''
            } ${item.disabled ? 'vertical-tabs__tab--disabled' : ''}`}
            onClick={() => handleTabClick(item.id, item.disabled)}
            disabled={item.disabled}
            role="tab"
            aria-selected={currentActiveId === item.id}
            aria-disabled={item.disabled}
          >
            <div className="vertical-tabs__content">
              <span className="vertical-tabs__label">{item.label}</span>
              {item.subtitle && (
                <span className="vertical-tabs__subtitle">{item.subtitle}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerticalTabs;
