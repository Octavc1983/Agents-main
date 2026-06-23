// Services
export { accountService } from './services/account.service';
export { tagService } from './services/tag.service';

// Hooks
export { useManagedAccounts } from './hooks/useManagedAccounts';
export type { UseManagedAccountsResult } from './hooks/useManagedAccounts';
export { useTags } from './hooks/useTags';
export type { UseTagsResult } from './hooks/useTags';

// Database events
export { localDatabaseEvents } from './state/localDatabase.events';
export type { LocalDatabaseEvent, LocalDatabaseEventType } from './state/localDatabase.events';

// API response helpers
export { isApiSuccess, isApiError } from './api/localApiResponse.types';
export type { LocalApiResponse, LocalApiSuccess, LocalApiError, LocalApiErrorCode } from './api/localApiResponse.types';

// Scenario control (dev only)
export { setApiScenario, getApiScenario } from './api/localApiScenario.types';
export type { LocalApiScenario } from './api/localApiScenario.types';

// Reset
export { resetLocalDatabase } from './state/localDatabase.reset';

// Types
export type { AccountEntity } from './state/localDatabase.types';
export type { CreateAccountPayload, UpdateAccountPayload, BulkAccountPayload, MutationMeta, MutationResult, BulkMutationResult, DeleteResponse } from './types/mutation.types';
export type { AccountListQuery, ListResponse, ListQuery } from './types/query.types';
export type { Safe, Organization, User, TagCatalogEntry, AuditEvent } from './types/common.types';
export type { TagEntity, TagListQuery, CreateTagPayload, UpdateTagPayload } from './types/tag.types';

// Authorization
export { permissionGuard } from './safety/authorization/permission.guard';
export { getActor, setActorContext } from './safety/authorization/actorContext';
export type { Actor, ActorContext, Permission } from './safety/authorization/permission.types';
