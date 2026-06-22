import React, { useState, useRef, useCallback, useId, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Chip } from '@idira/design-system';
import type { Tag, TagSuggestion, TagValidationError } from '../tag.types';
import { TAG_MAX_COUNT, TAG_VALIDATION_MESSAGES } from '../tag.types';
import {
  normalizeTagInput,
  parseTagInput,
  tagCanonical,
  validateTagInput,
  filterSuggestions,
  resolveChipLabel,
  resolveSuggestionLabel,
} from '../tag.utils';
import './TagAutocompleteInput.scss';

// ── Source badge labels ───────────────────────────────────────────────────────

const SOURCE_LABEL: Record<string, string> = {
  oob: 'System',
  external: 'External',
};

// ── Props ─────────────────────────────────────────────────────────────────────

export interface TagAutocompleteInputProps {
  tags: Tag[];
  suggestions: TagSuggestion[];
  onChange: (tags: Tag[]) => void;
  disabled?: boolean;
  maxCount?: number;
  label?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const TagAutocompleteInput: React.FC<TagAutocompleteInputProps> = ({
  tags,
  suggestions,
  onChange,
  disabled = false,
  maxCount = TAG_MAX_COUNT,
  label = 'Tags',
}) => {
  const inputId = useId();
  const listboxId = useId();
  const [inputValue, setInputValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [validationError, setValidationError] = useState<TagValidationError | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number } | null>(null);

  const atLimit = tags.length >= maxCount;

  // ── Filtered suggestions + create option ─────────────────────────────────

  const filteredSuggestions = filterSuggestions(suggestions, inputValue, tags).slice(0, 100);

  const canCreate = (() => {
    if (!inputValue.trim()) return false;
    const parsed = parseTagInput(normalizeTagInput(inputValue));
    if (!parsed) return false;
    return validateTagInput(inputValue, tags, suggestions) === null;
  })();

  const dropdownItems: Array<
    | { type: 'suggestion'; item: TagSuggestion }
    | { type: 'create'; canonical: string }
  > = [
    ...filteredSuggestions.map(s => ({ type: 'suggestion' as const, item: s })),
    ...(canCreate ? [{ type: 'create' as const, canonical: normalizeTagInput(inputValue) }] : []),
  ];

  // ── Add tag ───────────────────────────────────────────────────────────────

  const addTag = useCallback((
    key: string,
    value: string | undefined,
    source: Tag['source'],
    displayKey?: string,
    displayValue?: string,
  ) => {
    const newTag: Tag = {
      id: `tag-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      key,
      value,
      displayKey,
      displayValue,
      source,
      isRemovable: source === 'manual',
      isEditable: false,
    };
    onChange([...tags, newTag]);
    setInputValue('');
    setValidationError(null);
    setDropdownOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }, [tags, onChange]);

  const addTagFromSuggestion = useCallback((s: TagSuggestion) => {
    addTag(s.key, s.value, s.source, s.displayKey, s.displayValue);
  }, [addTag]);

  const addTagFromInput = useCallback((canonical: string) => {
    const parsed = parseTagInput(canonical);
    addTag(parsed?.key ?? canonical, parsed?.value, 'manual');
  }, [addTag]);

  // ── Remove tag ────────────────────────────────────────────────────────────

  const removeTag = useCallback((id: string) => {
    onChange(tags.filter(t => t.id !== id));
  }, [tags, onChange]);

  // ── Input change ──────────────────────────────────────────────────────────

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setActiveIndex(-1);
    setDropdownOpen(true);
    if (!val.trim()) { setValidationError(null); return; }
    const error = validateTagInput(val, tags, suggestions);
    setValidationError(error && error !== 'empty' ? error : null);
  }, [tags, suggestions]);

  // ── Keyboard ──────────────────────────────────────────────────────────────

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, dropdownItems.length - 1));
      setDropdownOpen(true);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, -1));
      return;
    }
    if (e.key === 'Escape') {
      setDropdownOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < dropdownItems.length) {
        const item = dropdownItems[activeIndex];
        if (item.type === 'suggestion') addTagFromSuggestion(item.item);
        else addTagFromInput(item.canonical);
        return;
      }
      if (canCreate) {
        addTagFromInput(normalizeTagInput(inputValue));
      } else if (inputValue.trim()) {
        const error = validateTagInput(inputValue, tags, suggestions);
        if (error && error !== 'empty') setValidationError(error);
      }
      return;
    }
    if (e.key === 'Backspace' && !inputValue) {
      const removable = [...tags].reverse().find(t => t.isRemovable);
      if (removable) removeTag(removable.id);
    }
  }, [activeIndex, dropdownItems, inputValue, canCreate, tags, suggestions, addTagFromSuggestion, addTagFromInput, removeTag]);

  // ── Blur ──────────────────────────────────────────────────────────────────

  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (containerRef.current?.contains(e.relatedTarget as Node)) return;
    setDropdownOpen(false);
    setActiveIndex(-1);
  }, []);

  // ── Portal dropdown positioning ───────────────────────────────────────────

  const updatePos = useCallback(() => {
    if (!fieldRef.current || !dropdownOpen) return;
    const rect = fieldRef.current.getBoundingClientRect();
    setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
  }, [dropdownOpen]);

  useEffect(() => {
    if (!dropdownOpen) { setDropdownPos(null); return; }
    updatePos();
    window.addEventListener('scroll', updatePos, true);
    window.addEventListener('resize', updatePos);
    return () => {
      window.removeEventListener('scroll', updatePos, true);
      window.removeEventListener('resize', updatePos);
    };
  }, [dropdownOpen, updatePos]);

  // ── Render ────────────────────────────────────────────────────────────────

  const errorMessage = validationError ? TAG_VALIDATION_MESSAGES[validationError] : null;
  const countLabel = `${tags.length} / ${maxCount} tags`;

  return (
    <div
      ref={containerRef}
      className={`tagInput${disabled ? ' tagInput--disabled' : ''}${atLimit ? ' tagInput--at-limit' : ''}`}
      onBlur={handleBlur}
    >
      {label && (
        <label className="tagInput__label" htmlFor={inputId}>{label}</label>
      )}

      {/* ── Chip area + input ── */}
      <div
        ref={fieldRef}
        className="tagInput__field"
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {tags.map(tag => {
          const sourceLabel = SOURCE_LABEL[tag.source];
          const displayLabel = resolveChipLabel(tag);
          const chipLabel = sourceLabel ? `${displayLabel} [${sourceLabel}]` : displayLabel;
          const canonicalLabel = tagCanonical(tag.key, tag.value);
          return (
            <Chip
              key={tag.id}
              label={chipLabel}
              onRemove={tag.isRemovable && !disabled ? () => removeTag(tag.id) : undefined}
              disabled={!tag.isRemovable || disabled}
              aria-label={
                !tag.isRemovable
                  ? `${displayLabel} (${canonicalLabel}) – ${sourceLabel ?? 'read-only'}, cannot be removed`
                  : `${displayLabel} (${canonicalLabel})`
              }
            />
          );
        })}

        {!atLimit && (
          <input
            ref={inputRef}
            id={inputId}
            className="tagInput__input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setDropdownOpen(true)}
            placeholder={tags.length === 0 ? 'Search or enter key:value' : ''}
            disabled={disabled}
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls={dropdownOpen ? listboxId : undefined}
            aria-activedescendant={activeIndex >= 0 ? `${listboxId}-item-${activeIndex}` : undefined}
            aria-label="Search or enter tag"
            aria-invalid={!!validationError || undefined}
            aria-describedby={`${inputId}-error ${inputId}-count`}
          />
        )}
      </div>

      {/* ── Autocomplete dropdown (portaled to body) ── */}
      {dropdownOpen && dropdownItems.length > 0 && !disabled && dropdownPos && ReactDOM.createPortal(
        <ul
          id={listboxId}
          className="tagInput__dropdown"
          role="listbox"
          aria-label="Tag suggestions"
          style={{ top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width }}
        >
          {dropdownItems.map((item, idx) => {
            const isActive = idx === activeIndex;
            if (item.type === 'create') {
              return (
                <li
                  key="create"
                  id={`${listboxId}-item-${idx}`}
                  className={`tagInput__option tagInput__option--create${isActive ? ' tagInput__option--active' : ''}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseDown={(e) => { e.preventDefault(); addTagFromInput(item.canonical); }}
                >
                  <span className="tagInput__option-create-prefix">Create</span>
                  <span className="tagInput__option-value">"{item.canonical}"</span>
                </li>
              );
            }
            const s = item.item;
            const displayLabel = resolveSuggestionLabel(s);
            return (
              <li
                key={s.id}
                id={`${listboxId}-item-${idx}`}
                className={`tagInput__option${isActive ? ' tagInput__option--active' : ''}`}
                role="option"
                aria-selected={isActive}
                onMouseDown={(e) => { e.preventDefault(); addTagFromSuggestion(s); }}
              >
                <span className="tagInput__option-value">{displayLabel}</span>
                {s.source !== 'manual' && (
                  <span className={`tagInput__option-source tagInput__option-source--${s.source}`}>
                    {SOURCE_LABEL[s.source]}
                  </span>
                )}
              </li>
            );
          })}
        </ul>,
        document.body,
      )}

      {errorMessage && (
        <span id={`${inputId}-error`} className="tagInput__error" role="alert">
          {errorMessage}
        </span>
      )}

      <span
        id={`${inputId}-count`}
        className={`tagInput__count${atLimit ? ' tagInput__count--limit' : ''}`}
        aria-live="polite"
      >
        {countLabel}
      </span>
    </div>
  );
};
