export type LocalApiStatus = 'ok' | 'error';

export interface LocalApiSuccess<T> {
  status: 'ok';
  data: T;
  requestId: string;
  durationMs: number;
}

export interface LocalApiError {
  status: 'error';
  errorCode: LocalApiErrorCode;
  message: string;
  requestId: string;
  durationMs: number;
  details?: Record<string, unknown>;
}

export type LocalApiResponse<T> = LocalApiSuccess<T> | LocalApiError;

export type LocalApiErrorCode =
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'PERMISSION_DENIED'
  | 'VERSION_CONFLICT'
  | 'DEPENDENCY_CONFLICT'
  | 'CONFIRMATION_REQUIRED'
  | 'IDEMPOTENCY_CONFLICT'
  | 'UNKNOWN_OUTCOME'
  | 'INTERNAL_ERROR';

export function isApiSuccess<T>(r: LocalApiResponse<T>): r is LocalApiSuccess<T> {
  return r.status === 'ok';
}

export function isApiError<T>(r: LocalApiResponse<T>): r is LocalApiError {
  return r.status === 'error';
}
