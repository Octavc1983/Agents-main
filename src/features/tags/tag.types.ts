export type TagSource = 'manual' | 'oob' | 'external';

export type Tag = {
  id: string;
  key: string;          // canonical backend key: 'risk-level'
  value?: string;       // canonical backend value: 'high'
  displayKey?: string;  // human-readable key: 'Risk level'
  displayValue?: string;// human-readable value: 'High'
  source: TagSource;
  isRemovable: boolean;
  isEditable: boolean;
};

export type TagSuggestion = {
  id: string;
  key: string;
  value?: string;
  displayKey?: string;
  displayValue?: string;
  source: TagSource;
  usageCount?: number;
  isSelectable: boolean;
};

export type TagValidationError =
  | 'empty'
  | 'invalid-format'
  | 'duplicate'
  | 'oob-blocked'
  | 'key-conflict'
  | 'max-count'
  | 'key-too-long'
  | 'value-too-long'
  | 'unsupported-chars';

export const TAG_MAX_COUNT = 60;
export const TAG_KEY_MAX_LENGTH = 64;
export const TAG_VALUE_MAX_LENGTH = 128;

export const TAG_VALIDATION_MESSAGES: Record<TagValidationError, string> = {
  'empty': '',
  'invalid-format': 'Enter a tag in key:value format.',
  'duplicate': 'This tag is already assigned.',
  'oob-blocked': 'This system tag cannot be added manually.',
  'key-conflict': 'A tag with this key already exists with a different value.',
  'max-count': `You can assign up to ${TAG_MAX_COUNT} tags. Remove a tag before adding another one.`,
  'key-too-long': `Tag keys can contain up to ${TAG_KEY_MAX_LENGTH} characters.`,
  'value-too-long': `Tag values can contain up to ${TAG_VALUE_MAX_LENGTH} characters.`,
  'unsupported-chars': 'Tag contains unsupported characters.',
};
