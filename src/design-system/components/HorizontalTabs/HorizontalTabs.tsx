import React, { useState } from 'react';
import './HorizontalTabs.scss';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface HorizontalTabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * HorizontalTabs Component
 * 
 * A horizontal tab navigation component extracted from the IDIRA Design System.
 * Supports multiple states: Idle, Hover, Selected, and Disabled.
 * 
 * @param items - Array of tab items with id, label, and optional disabled state
 * @param defaultActiveId - The id of the initially active tab (controlled component)
 * @param activeId - The id of the currently active tab (uncontrolled component)
 * @param onChange - Callback fired when a tab is clicked
 * @param className - Additional CSS class names
 * 
 * @example
 * ```tsx
 * const tabs = [
 *   { id: 'tab1', label: 'Tab 1' },
 *   { id: 'tab2', label: 'Tab 2' },
 *   { id: 'tab3', label: 'Tab 3', disabled: true }
 * ];
 * 
 * <HorizontalTabs items={tabs} defaultActiveId="tab1" onChange={(id) => console.log(id)} />
 * ```
 */
export const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  items,
  defaultActiveId,
  activeId,
  onChange,
  className = '',
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
    <div className={`horizontal-tabs ${className}`}>
      <div className="horizontal-tabs__container">
        {items.map((item) => (
          <button
            key={item.id}
            className={`horizontal-tabs__tab ${
              currentActiveId === item.id ? 'horizontal-tabs__tab--selected' : ''
            } ${item.disabled ? 'horizontal-tabs__tab--disabled' : ''}`}
            onClick={() => handleTabClick(item.id, item.disabled)}
            disabled={item.disabled}
            role="tab"
            aria-selected={currentActiveId === item.id}
            aria-disabled={item.disabled}
          >
            <span className="horizontal-tabs__label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HorizontalTabs;
