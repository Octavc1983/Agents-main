export type Permission =
  | 'accounts:read'
  | 'accounts:create'
  | 'accounts:update'
  | 'accounts:delete'
  | 'accounts:manage-tags'
  | 'accounts:bulk-update';

export interface Actor {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface ActorContext {
  actor: Actor;
}
