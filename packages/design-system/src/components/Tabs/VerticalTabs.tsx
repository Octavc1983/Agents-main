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

export const VerticalTabs: React.FC<VerticalTabsProps> = ({
  items, defaultActiveId, activeId, onChange, className = '', variant = 'default',
}) => {
  const [internalActiveId, setInternalActiveId] = useState(defaultActiveId || items[0]?.id);
  const currentActiveId = activeId !== undefined ? activeId : internalActiveId;

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (activeId === undefined) setInternalActiveId(id);
    onChange?.(id);
  };

  return (
    <div className={['vertical-tabs', `vertical-tabs--${variant}`, className].filter(Boolean).join(' ')} role="tablist" aria-orientation="vertical">
      <div className="vertical-tabs__container">
        {items.map(item => (
          <button
            key={item.id}
            className={['vertical-tabs__tab', currentActiveId === item.id ? 'vertical-tabs__tab--selected' : '', item.disabled ? 'vertical-tabs__tab--disabled' : ''].filter(Boolean).join(' ')}
            onClick={() => handleTabClick(item.id, item.disabled)}
            disabled={item.disabled}
            role="tab"
            aria-selected={currentActiveId === item.id}
          >
            <div className="vertical-tabs__content">
              <span className="vertical-tabs__label">{item.label}</span>
              {item.subtitle && <span className="vertical-tabs__subtitle">{item.subtitle}</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
