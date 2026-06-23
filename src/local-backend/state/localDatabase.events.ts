export type LocalDatabaseEventType =
  | 'account:created'
  | 'account:updated'
  | 'account:deleted'
  | 'account:tags-updated';

export interface LocalDatabaseEvent {
  type: LocalDatabaseEventType;
  entityId: string;
  timestamp: string;
  actorId: string;
}

type EventListener = (event: LocalDatabaseEvent) => void;

const _listeners = new Map<LocalDatabaseEventType | '*', Set<EventListener>>();

function getSet(type: LocalDatabaseEventType | '*'): Set<EventListener> {
  if (!_listeners.has(type)) _listeners.set(type, new Set());
  return _listeners.get(type)!;
}

export const localDatabaseEvents = {
  on(type: LocalDatabaseEventType | '*', listener: EventListener): () => void {
    getSet(type).add(listener);
    return () => getSet(type).delete(listener);
  },

  emit(event: LocalDatabaseEvent): void {
    getSet(event.type).forEach((l) => l(event));
    getSet('*').forEach((l) => l(event));
  },

  offAll(): void {
    _listeners.clear();
  },
};
