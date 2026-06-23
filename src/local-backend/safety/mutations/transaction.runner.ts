import type { LocalDatabaseStore } from '../../state/localDatabase.types';
import { localDatabaseStore } from '../../state/localDatabase.store';

export function runTransaction<T>(
  fn: (draft: LocalDatabaseStore) => T,
): T {
  const draft = localDatabaseStore.clone();
  const result = fn(draft);
  localDatabaseStore.commit(draft);
  return result;
}
