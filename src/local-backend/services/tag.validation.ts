import type { CreateTagPayload, UpdateTagPayload } from '../types/tag.types';

const TAG_KEY_PATTERN = /^[a-zA-Z0-9_:.\-/]{1,64}$/;
const TAG_VALUE_PATTERN = /^[a-zA-Z0-9_:.\-/ ]{0,128}$/;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateCreateTagPayload(payload: CreateTagPayload): ValidationResult {
  const errors: string[] = [];
  if (!payload.key || !TAG_KEY_PATTERN.test(payload.key)) {
    errors.push(`Invalid tag key "${payload.key}". Must be 1–64 chars, [a-zA-Z0-9_:.\\-/].`);
  }
  if (payload.value !== undefined && !TAG_VALUE_PATTERN.test(payload.value)) {
    errors.push(`Invalid tag value "${payload.value}". Must be 0–128 chars.`);
  }
  return { valid: errors.length === 0, errors };
}

export function validateUpdateTagPayload(payload: UpdateTagPayload): ValidationResult {
  const errors: string[] = [];
  if (payload.key !== undefined && !TAG_KEY_PATTERN.test(payload.key)) {
    errors.push(`Invalid tag key "${payload.key}".`);
  }
  if (payload.value !== undefined && !TAG_VALUE_PATTERN.test(payload.value)) {
    errors.push(`Invalid tag value "${payload.value}".`);
  }
  return { valid: errors.length === 0, errors };
}
