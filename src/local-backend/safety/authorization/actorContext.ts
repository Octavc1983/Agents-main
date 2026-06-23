import type { Actor, ActorContext, Permission } from './permission.types';

const SEED_ACTOR: Actor = {
  id: 'actor-local-admin',
  name: 'Local Prototype Admin',
  permissions: [
    'accounts:read',
    'accounts:create',
    'accounts:update',
    'accounts:delete',
    'accounts:manage-tags',
    'accounts:bulk-update',
  ],
};

let _actorContext: ActorContext = { actor: SEED_ACTOR };

export function getActorContext(): ActorContext {
  return _actorContext;
}

export function setActorContext(ctx: ActorContext): void {
  _actorContext = ctx;
}

export function getActor(): Actor {
  return _actorContext.actor;
}

export function actorHasPermission(permission: Permission): boolean {
  return _actorContext.actor.permissions.includes(permission);
}
