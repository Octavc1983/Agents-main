import type { Tag, TagSuggestion, TagValidationError } from './tag.types';
import { TAG_KEY_MAX_LENGTH, TAG_MAX_COUNT, TAG_VALUE_MAX_LENGTH } from './tag.types';

const VALID_CHARS = /^[a-zA-Z0-9_\-.:/ ]+$/;

// ── Normalization ─────────────────────────────────────────────────────────────

export function normalizeTagInput(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function parseTagInput(raw: string): { key: string; value: string } | null {
  const colonIdx = raw.indexOf(':');
  if (colonIdx <= 0) return null;
  const key = raw.slice(0, colonIdx).trim();
  const value = raw.slice(colonIdx + 1).trim();
  if (!key || !value) return null;
  return { key, value };
}

// ── Display formatting ────────────────────────────────────────────────────────

export function formatDisplayKey(key: string): string {
  return key
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export function formatDisplayValue(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// Returns what to show in a chip label: prefers explicit displayKey/displayValue,
// falls back to formatting the canonical key/value.
export function resolveChipLabel(tag: Pick<Tag, 'key' | 'value' | 'displayKey' | 'displayValue' | 'source'>): string {
  const key = tag.displayKey ?? (tag.source === 'manual' ? tag.key : formatDisplayKey(tag.key));
  const value = tag.value !== undefined
    ? (tag.displayValue ?? (tag.source === 'manual' ? tag.value : formatDisplayValue(tag.value)))
    : null;
  return value !== null ? `${key}: ${value}` : key;
}

// Returns what to show in the autocomplete dropdown for a suggestion.
export function resolveSuggestionLabel(s: Pick<TagSuggestion, 'key' | 'value' | 'displayKey' | 'displayValue' | 'source'>): string {
  if (s.source === 'manual') {
    return s.value ? `${s.key}:${s.value}` : s.key;
  }
  const key = s.displayKey ?? formatDisplayKey(s.key);
  const value = s.value !== undefined
    ? (s.displayValue ?? formatDisplayValue(s.value))
    : null;
  return value !== null ? `${key}: ${value}` : key;
}

// Canonical key:value string used for duplicate/validation matching
export function tagCanonical(key: string, value?: string): string {
  return value ? `${key}:${value}` : key;
}

// ── Validation ────────────────────────────────────────────────────────────────

export function validateTagInput(
  raw: string,
  existingTags: Tag[],
  suggestions: TagSuggestion[],
): TagValidationError | null {
  const trimmed = raw.trim();
  if (!trimmed) return 'empty';

  if (!VALID_CHARS.test(trimmed)) return 'unsupported-chars';

  const parsed = parseTagInput(normalizeTagInput(trimmed));
  if (!parsed) return 'invalid-format';

  const { key, value } = parsed;

  if (key.length > TAG_KEY_MAX_LENGTH) return 'key-too-long';
  if (value.length > TAG_VALUE_MAX_LENGTH) return 'value-too-long';

  const oobKeys = new Set(suggestions.filter(s => s.source === 'oob').map(s => s.key));
  if (oobKeys.has(key)) return 'oob-blocked';

  const canonical = tagCanonical(key, value);
  const duplicate = existingTags.some(t => tagCanonical(t.key, t.value) === canonical);
  if (duplicate) return 'duplicate';

  if (existingTags.length >= TAG_MAX_COUNT) return 'max-count';

  return null;
}

// ── Suggestion filtering ──────────────────────────────────────────────────────

export function filterSuggestions(
  suggestions: TagSuggestion[],
  query: string,
  existingTags: Tag[],
): TagSuggestion[] {
  const q = normalizeTagInput(query);
  const existingCanonicals = new Set(existingTags.map(t => tagCanonical(t.key, t.value)));
  return suggestions.filter(s => {
    if (!s.isSelectable) return false;
    if (existingCanonicals.has(tagCanonical(s.key, s.value))) return false;
    if (!q) return true;
    // Match against both canonical and display forms
    return (
      s.key.includes(q) ||
      (s.value ?? '').includes(q) ||
      tagCanonical(s.key, s.value).includes(q) ||
      (s.displayKey ?? formatDisplayKey(s.key)).toLowerCase().includes(q) ||
      (s.displayValue ?? s.value ?? '').toLowerCase().includes(q)
    );
  });
}
