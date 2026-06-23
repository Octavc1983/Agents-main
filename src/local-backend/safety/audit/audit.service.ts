import type { AuditEvent } from '../../types/common.types';
import type { LocalDatabaseStore } from '../../state/localDatabase.types';

let _auditCounter = 0;

function nextAuditId(): string {
  _auditCounter += 1;
  return `audit-${String(_auditCounter).padStart(6, '0')}`;
}

export const auditService = {
  record(
    draft: LocalDatabaseStore,
    opts: {
      entityType: string;
      entityId: string;
      action: string;
      actorId: string;
      payload?: Record<string, unknown>;
    },
  ): void {
    const event: AuditEvent = {
      id: nextAuditId(),
      entityType: opts.entityType,
      entityId: opts.entityId,
      action: opts.action,
      actorId: opts.actorId,
      timestamp: new Date().toISOString(),
      payload: opts.payload ?? {},
    };
    draft.auditLog.push(event);
  },
};
