export type LocalApiScenario =
  | 'default'
  | 'slow'
  | 'slow-create'
  | 'error-create'
  | 'error-update'
  | 'error-delete'
  | 'error-tags'
  | 'permission-denied'
  | 'version-conflict'
  | 'not-found';

let _activeScenario: LocalApiScenario = 'default';

export function setApiScenario(s: LocalApiScenario): void {
  _activeScenario = s;
}

export function getApiScenario(): LocalApiScenario {
  return _activeScenario;
}

export function shouldFail(forAction: 'create' | 'update' | 'delete' | 'tags' | 'any'): boolean {
  const s = _activeScenario;
  if (s === 'error-create' && forAction === 'create') return true;
  if (s === 'error-update' && forAction === 'update') return true;
  if (s === 'error-delete' && forAction === 'delete') return true;
  if (s === 'error-tags' && forAction === 'tags') return true;
  if (s === 'permission-denied') return true;
  return false;
}

export function getSimulatedDelay(): number {
  const s = _activeScenario;
  if (s === 'slow' || s === 'slow-create') return 2000;
  return 600;
}
