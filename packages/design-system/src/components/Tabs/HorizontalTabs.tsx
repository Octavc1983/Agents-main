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

export const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  items, defaultActiveId, activeId, onChange, className = '',
}) => {
  const [internalActiveId, setInternalActiveId] = useState(defaultActiveId || items[0]?.id);
  const currentActiveId = activeId !== undefined ? activeId : internalActiveId;

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (activeId === undefined) setInternalActiveId(id);
    onChange?.(id);
  };

  return (
    <div className={['horizontal-tabs', className].filter(Boolean).join(' ')} role="tablist">
      <div className="horizontal-tabs__container">
        {items.map(item => (
          <button
            key={item.id}
            className={['horizontal-tabs__tab', currentActiveId === item.id ? 'horizontal-tabs__tab--selected' : '', item.disabled ? 'horizontal-tabs__tab--disabled' : ''].filter(Boolean).join(' ')}
            onClick={() => handleTabClick(item.id, item.disabled)}
            disabled={item.disabled}
            role="tab"
            aria-selected={currentActiveId === item.id}
          >
            <span className="horizontal-tabs__label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
