export interface ListQuery {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  filters?: Record<string, string | string[]>;
  includeDeleted?: boolean;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type AccountListQuery = ListQuery & {
  status?: string | string[];
  riskLevel?: string | string[];
  platform?: string | string[];
  accountType?: string | string[];
  safeId?: string | string[];
  organizationId?: string | string[];
};
