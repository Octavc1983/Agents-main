import type { LocalApiResponse } from './localApiResponse.types';
import { simulateDelay } from './localApiDelay';
import { getApiScenario, shouldFail } from './localApiScenario.types';

let _requestCounter = 0;

function nextRequestId(): string {
  _requestCounter += 1;
  return `req-${String(_requestCounter).padStart(5, '0')}`;
}

type ActionKind = 'create' | 'update' | 'delete' | 'tags' | 'any';

export async function localApiCall<T>(
  fn: () => T | Promise<T>,
  options?: { action?: ActionKind; delayMs?: number },
): Promise<LocalApiResponse<T>> {
  const requestId = nextRequestId();
  const start = performance.now();
  await simulateDelay(options?.delayMs);
  const durationMs = Math.round(performance.now() - start);

  if (options?.action && shouldFail(options.action)) {
    const scenario = getApiScenario();
    if (scenario === 'permission-denied') {
      return { status: 'error', errorCode: 'PERMISSION_DENIED', message: 'You do not have permission to perform this action.', requestId, durationMs };
    }
    if (scenario === 'version-conflict') {
      return { status: 'error', errorCode: 'VERSION_CONFLICT', message: 'This record was modified by someone else. Please refresh and try again.', requestId, durationMs };
    }
    return { status: 'error', errorCode: 'INTERNAL_ERROR', message: 'Simulated API failure.', requestId, durationMs };
  }

  try {
    const data = await fn();
    return { status: 'ok', data, requestId, durationMs };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error.';
    return { status: 'error', errorCode: 'INTERNAL_ERROR', message, requestId, durationMs };
  }
}
