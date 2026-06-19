import React, { useId } from 'react';
import './Input.scss';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'url';
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  hint?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  id?: string;
  name?: string;
  'aria-label'?: string;
  size?: 'sm' | 'md';
}

export const Input: React.FC<InputProps> = ({
  label, placeholder, value, defaultValue, onChange, type = 'text',
  disabled = false, readOnly = false, error, hint, iconLeft, iconRight,
  className, id: idProp, name, 'aria-label': ariaLabel, size = 'md',
}) => {
  const autoId = useId();
  const id = idProp || autoId;
  const hintId = hint || error ? `${id}-hint` : undefined;
  const hasError = !!error;

  return (
    <div className={['input-field', className || ''].filter(Boolean).join(' ')}>
      {label && <label className="input-field__label" htmlFor={id}>{label}</label>}
      <div className={['input-field__wrap', `input-field__wrap--${size}`, hasError ? 'input-field__wrap--error' : '', disabled ? 'input-field__wrap--disabled' : ''].filter(Boolean).join(' ')}>
        {iconLeft && <span className="input-field__icon input-field__icon--left" aria-hidden="true">{iconLeft}</span>}
        <input
          id={id}
          name={name}
          className="input-field__input"
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          aria-label={!label ? ariaLabel : undefined}
          aria-describedby={hintId}
          aria-invalid={hasError || undefined}
        />
        {iconRight && <span className="input-field__icon input-field__icon--right" aria-hidden="true">{iconRight}</span>}
      </div>
      {(error || hint) && (
        <span id={hintId} className={['input-field__hint', hasError ? 'input-field__hint--error' : ''].filter(Boolean).join(' ')}>
          {error || hint}
        </span>
      )}
    </div>
  );
};

export interface SearchInputProps extends Omit<InputProps, 'type' | 'iconLeft'> {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onClear, value, onChange, ...rest }) => {
  const SearchIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  const ClearIcon = value ? (
    <button type="button" className="input-field__clear-btn" onClick={onClear} aria-label="Clear search" tabIndex={-1}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  ) : undefined;
  return <Input {...rest} type="search" value={value} onChange={onChange} iconLeft={SearchIcon} iconRight={ClearIcon} />;
};
