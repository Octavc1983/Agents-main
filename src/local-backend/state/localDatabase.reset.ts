import { localDatabaseStore } from './localDatabase.store';
import { localDatabaseEvents } from './localDatabase.events';

export function resetLocalDatabase(): void {
  localDatabaseStore.reset();
  localDatabaseEvents.offAll();
}
