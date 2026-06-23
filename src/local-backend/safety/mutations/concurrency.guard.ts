export class VersionConflictError extends Error {
  constructor(entityId: string, expected: number, actual: number) {
    super(`Version conflict on "${entityId}": expected ${expected}, got ${actual}.`);
    this.name = 'VersionConflictError';
  }
}

export const concurrencyGuard = {
  assert(entityId: string, expectedVersion: number, actualVersion: number): void {
    if (expectedVersion !== actualVersion) {
      throw new VersionConflictError(entityId, expectedVersion, actualVersion);
    }
  },
};
