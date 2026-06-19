import { type FC, type ChangeEvent, useRef } from 'react';
import { SearchInputIcon } from '../../icons/NavIcons';
import './SearchInput.scss';

export interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  className?: string;
  'aria-label'?: string;
}

const ClearIcon: FC = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M12.667 3.33325L3.33362 12.6666M3.33362 3.33325L12.667 12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SearchInput: FC<SearchInputProps> = ({
  value,
  defaultValue,
  placeholder = 'Search',
  disabled = false,
  onChange,
  onClear,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = value !== undefined ? value.length > 0 : false;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value, e);
  };

  const handleClear = () => {
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div
      className={`search-input${disabled ? ' search-input--disabled' : ''} ${className}`.trim()}
    >
      <span className="search-input__icon">
        <SearchInputIcon size={14} />
      </span>
      <input
        ref={inputRef}
        type="search"
        className="search-input__field"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        aria-label={ariaLabel ?? placeholder}
        autoComplete="off"
        spellCheck={false}
      />
      {hasValue && !disabled && (
        <button
          type="button"
          className="search-input__clear"
          onClick={handleClear}
          aria-label="Clear search"
          tabIndex={-1}
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
};
