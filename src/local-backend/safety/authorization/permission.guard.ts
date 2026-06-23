import type { Permission } from './permission.types';
import { actorHasPermission, getActor } from './actorContext';

export class PermissionDeniedError extends Error {
  constructor(permission: Permission) {
    super(`Actor "${getActor().id}" does not have permission: ${permission}`);
    this.name = 'PermissionDeniedError';
  }
}

export const permissionGuard = {
  assert(permission: Permission): void {
    if (!actorHasPermission(permission)) {
      throw new PermissionDeniedError(permission);
    }
  },

  check(permission: Permission): boolean {
    return actorHasPermission(permission);
  },
};
