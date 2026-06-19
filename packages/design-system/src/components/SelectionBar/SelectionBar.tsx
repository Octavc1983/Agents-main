import React from 'react';
import { Button } from '../Button/Button';
import { TextLink } from '../Button/TextLink';
import './SelectionBar.scss';

export interface SelectionBarAction {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface SelectionBarProps {
  selectedCount: number;
  totalCount: number;
  filterCount?: number;
  actions?: SelectionBarAction[];
  onSelectAll?: () => void;
  onDismiss?: () => void;
  onClearFilters?: () => void;
  className?: string;
}

export const SelectionBar: React.FC<SelectionBarProps> = ({
  selectedCount, totalCount, filterCount = 0, actions = [],
  onSelectAll, onDismiss, onClearFilters, className,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className={['selection-bar', className].filter(Boolean).join(' ')} role="toolbar" aria-label={`${selectedCount} items selected`}>
      {onDismiss && (
        <button type="button" className="selection-bar__dismiss" onClick={onDismiss} aria-label="Dismiss selection">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
      <span className="selection-bar__count">{selectedCount} of {totalCount} selected</span>
      {onSelectAll && <TextLink onClick={onSelectAll} className="selection-bar__link">Select All</TextLink>}
      <span className="selection-bar__divider" aria-hidden="true" />
      <span className="selection-bar__filter-count">{filterCount} filters</span>
      {onClearFilters && <TextLink onClick={onClearFilters} className="selection-bar__link">Clear all filters</TextLink>}
      <span className="selection-bar__spacer" aria-hidden="true" />
      {actions.length > 0 && <span className="selection-bar__divider" aria-hidden="true" />}
      {actions.map(action => (
        <Button key={action.id} variant="secondary" size="sm" disabled={action.disabled} onClick={action.onClick}>
          {action.label}
        </Button>
      ))}
    </div>
  );
};
