// LEGACY FIXTURE — no active page imports MOCK_TAG_SUGGESTIONS for the Accounts flow.
// ManagedAccountsPage now consumes accountService.getTagSuggestions() via useManagedAccounts.
// Scheduled for removal after all tag-consuming pages are migrated.
import type { Tag, TagSuggestion } from '../features/tags/tag.types';

export const MOCK_TAG_SUGGESTIONS: TagSuggestion[] = [
  // ── Manual suggestions (canonical key:value, no display overrides) ──────────
  { id: 's-001', key: 'environment', value: 'production',  source: 'manual', usageCount: 42, isSelectable: true },
  { id: 's-002', key: 'environment', value: 'development', source: 'manual', usageCount: 18, isSelectable: true },
  { id: 's-003', key: 'environment', value: 'staging',     source: 'manual', usageCount: 9,  isSelectable: true },
  { id: 's-004', key: 'owner',       value: 'security-team',  source: 'manual', usageCount: 31, isSelectable: true },
  { id: 's-005', key: 'owner',       value: 'database-team',  source: 'manual', usageCount: 14, isSelectable: true },
  { id: 's-006', key: 'owner',       value: 'platform-team',  source: 'manual', usageCount: 7,  isSelectable: true },
  { id: 's-007', key: 'owner',       value: 'devops-team',    source: 'manual', usageCount: 22, isSelectable: true },
  { id: 's-008', key: 'region',      value: 'us-east-1',      source: 'manual', usageCount: 19, isSelectable: true },
  { id: 's-009', key: 'region',      value: 'eu-west-1',      source: 'manual', usageCount: 11, isSelectable: true },
  { id: 's-010', key: 'region',      value: 'ap-southeast-1', source: 'manual', usageCount: 4,  isSelectable: true },
  { id: 's-011', key: 'system',      value: 'database',       source: 'manual', usageCount: 28, isSelectable: true },
  { id: 's-012', key: 'system',      value: 'web-server',     source: 'manual', usageCount: 16, isSelectable: true },
  { id: 's-013', key: 'system',      value: 'ci-cd',          source: 'manual', usageCount: 10, isSelectable: true },
  { id: 's-014', key: 'tier',        value: 'critical',       source: 'manual', usageCount: 5,  isSelectable: true },
  { id: 's-015', key: 'tier',        value: 'standard',       source: 'manual', usageCount: 13, isSelectable: true },
  { id: 's-016', key: 'application', value: 'payments',       source: 'manual', usageCount: 3,  isSelectable: true },
  { id: 's-017', key: 'application', value: 'reporting',      source: 'manual', usageCount: 6,  isSelectable: true },
  { id: 's-018', key: 'compliance',  value: 'sox',            source: 'manual', usageCount: 8,  isSelectable: true },
  { id: 's-019', key: 'compliance',  value: 'gdpr',           source: 'manual', usageCount: 5,  isSelectable: true },

  // ── OOB suggestions (display labels separate from canonical keys) ────────────
  {
    id: 's-020', key: 'sensitive',
    displayKey: 'Sensitive',
    source: 'oob', isSelectable: false,
  },
  {
    id: 's-021', key: 'risk-level', value: 'high',
    displayKey: 'Risk level', displayValue: 'High',
    source: 'oob', isSelectable: false,
  },
  {
    id: 's-022', key: 'risk-level', value: 'medium',
    displayKey: 'Risk level', displayValue: 'Medium',
    source: 'oob', isSelectable: false,
  },
  {
    id: 's-023', key: 'risk-level', value: 'low',
    displayKey: 'Risk level', displayValue: 'Low',
    source: 'oob', isSelectable: false,
  },
  {
    id: 's-024', key: 'identity-type', value: 'privileged',
    displayKey: 'Identity type', displayValue: 'Privileged',
    source: 'oob', isSelectable: false,
  },
  {
    id: 's-025', key: 'identity-type', value: 'service',
    displayKey: 'Identity type', displayValue: 'Service',
    source: 'oob', isSelectable: false,
  },
  {
    id: 's-026', key: 'policy-scope', value: 'global',
    displayKey: 'Policy scope', displayValue: 'Global',
    source: 'oob', isSelectable: false,
  },

  // ── External suggestions (read-only, from scans / cloud providers) ───────────
  {
    id: 's-027', key: 'aws-account', value: 'production',
    displayKey: 'AWS account', displayValue: 'Production',
    source: 'external', isSelectable: false,
  },
  {
    id: 's-028', key: 'aws-region', value: 'us-east-1',
    displayKey: 'AWS region', displayValue: 'US East 1',
    source: 'external', isSelectable: false,
  },
  {
    id: 's-029', key: 'azure-resource-group', value: 'prod-rg',
    displayKey: 'Azure resource group', displayValue: 'prod-rg',
    source: 'external', isSelectable: false,
  },
];

export const MOCK_ENTITY_TAGS: Tag[] = [
  {
    id: 't-001', key: 'environment', value: 'production',
    source: 'manual', isRemovable: true, isEditable: false,
  },
  {
    id: 't-002', key: 'owner', value: 'database-team',
    source: 'manual', isRemovable: true, isEditable: false,
  },
  {
    id: 't-003', key: 'sensitive',
    displayKey: 'Sensitive',
    source: 'oob', isRemovable: false, isEditable: false,
  },
  {
    id: 't-004', key: 'risk-level', value: 'high',
    displayKey: 'Risk level', displayValue: 'High',
    source: 'oob', isRemovable: false, isEditable: false,
  },
  {
    id: 't-005', key: 'identity-type', value: 'privileged',
    displayKey: 'Identity type', displayValue: 'Privileged',
    source: 'oob', isRemovable: false, isEditable: false,
  },
];
