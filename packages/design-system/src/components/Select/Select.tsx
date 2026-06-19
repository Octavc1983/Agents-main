import React, { useState, useRef, useEffect, useId } from 'react';
import './Select.scss';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
  searchable?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
  size?: 'sm' | 'md';
}

export const Select: React.FC<SelectProps> = ({
  options, value: valueProp, defaultValue, onChange, label, placeholder = 'Select...',
  disabled = false, error, hint, searchable = false, className, id: idProp, 'aria-label': ariaLabel, size = 'md',
}) => {
  const autoId = useId();
  const id = idProp || autoId;
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const currentValue = valueProp !== undefined ? valueProp : internalValue;
  const selectedOption = options.find(o => o.value === currentValue);
  const hasError = !!error;

  const filteredOptions = searchable && searchQuery
    ? options.filter(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    if (valueProp === undefined) setInternalValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
    setSearchQuery('');
  };

  const ChevronIcon = (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d={isOpen ? 'M2.5 7.5L6 4.5L9.5 7.5' : 'M2.5 4.5L6 7.5L9.5 4.5'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className={['select-field', className || ''].filter(Boolean).join(' ')} ref={containerRef}>
      {label && <label className="select-field__label" htmlFor={id}>{label}</label>}
      <button
        id={id}
        type="button"
        className={['select-field__trigger', `select-field__trigger--${size}`, hasError ? 'select-field__trigger--error' : '', disabled ? 'select-field__trigger--disabled' : '', isOpen ? 'select-field__trigger--open' : ''].filter(Boolean).join(' ')}
        onClick={() => !disabled && setIsOpen(v => !v)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={!label ? ariaLabel : undefined}
      >
        <span className={['select-field__value', !selectedOption ? 'select-field__value--placeholder' : ''].filter(Boolean).join(' ')}>
          {selectedOption?.label || placeholder}
        </span>
        <span className="select-field__chevron">{ChevronIcon}</span>
      </button>

      {isOpen && (
        <div className="select-field__dropdown" role="listbox" aria-label={label || ariaLabel}>
          {searchable && (
            <div className="select-field__search">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
                <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                className="select-field__search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          )}
          {filteredOptions.map(option => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === currentValue}
              className={['select-field__option', option.value === currentValue ? 'select-field__option--selected' : '', option.disabled ? 'select-field__option--disabled' : ''].filter(Boolean).join(' ')}
              onClick={() => handleSelect(option)}
              disabled={option.disabled}
            >
              {option.label}
            </button>
          ))}
          {filteredOptions.length === 0 && <div className="select-field__empty">No results</div>}
        </div>
      )}

      {(error || hint) && (
        <span className={['select-field__hint', hasError ? 'select-field__hint--error' : ''].filter(Boolean).join(' ')}>
          {error || hint}
        </span>
      )}
    </div>
  );
};
