import type { CreateAccountPayload, UpdateAccountPayload } from '../types/mutation.types';

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const VALID_STATUSES = ['active', 'inactive', 'pending', 'locked', 'marked_for_deletion', 'deleted'];
const VALID_TYPES = ['local', 'domain', 'service', 'cloud'];

export function validateCreatePayload(payload: CreateAccountPayload): ValidationResult {
  const errors: Record<string, string> = {};

  if (!payload.name?.trim()) errors['name'] = 'Account name is required.';
  else if (payload.name.length > 120) errors['name'] = 'Account name must be 120 characters or fewer.';

  if (!payload.accountType) errors['accountType'] = 'Account type is required.';
  else if (!VALID_TYPES.includes(payload.accountType)) errors['accountType'] = 'Invalid account type.';

  if (!payload.platform?.trim()) errors['platform'] = 'Platform is required.';

  if (!payload.address?.trim()) errors['address'] = 'Address is required.';

  if (!payload.ownerId?.trim()) errors['ownerId'] = 'Owner is required.';

  if (!payload.safeId?.trim()) errors['safeId'] = 'Safe is required.';

  if (payload.status && !VALID_STATUSES.includes(payload.status)) {
    errors['status'] = 'Invalid status value.';
  }

  if (payload.tagIds && payload.tagIds.length > 60) {
    errors['tagIds'] = 'Maximum 60 tags allowed.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateUpdatePayload(payload: UpdateAccountPayload): ValidationResult {
  const errors: Record<string, string> = {};

  if (payload.name !== undefined) {
    if (!payload.name.trim()) errors['name'] = 'Account name cannot be empty.';
    else if (payload.name.length > 120) errors['name'] = 'Account name must be 120 characters or fewer.';
  }

  if (payload.accountType !== undefined && !VALID_TYPES.includes(payload.accountType)) {
    errors['accountType'] = 'Invalid account type.';
  }

  if (payload.status !== undefined && !VALID_STATUSES.includes(payload.status)) {
    errors['status'] = 'Invalid status value.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
