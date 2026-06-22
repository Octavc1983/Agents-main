import type { RuleCenterRule, RuleEntityType, RuleTabType } from '../pages/RuleCenterPage/RuleCenterPage.types';

export const RULE_ENTITY_OPTIONS: { value: RuleEntityType; label: string }[] = [
  { value: 'accounts',          label: 'Accounts' },
  { value: 'federated-users',   label: 'Federated users' },
  { value: 'federated-groups',  label: 'Federated groups' },
  { value: 'web-application',   label: 'Web application' },
  { value: 'users',             label: 'Users' },
  { value: 'virtual-machines',  label: 'Virtual machines' },
];

const enrichmentRules: RuleCenterRule[] = [
  {
    id: 'rule-001', tab: 'enrichment', name: 'Onboarding privileged entity',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Remove tag', 'Set risk'], entity: 'Accounts',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Jul 04, 2024 05:47:42 PM', status: 'draft',
  },
  {
    id: 'rule-002', tab: 'enrichment', name: 'Onboarding privileged entity',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Remove tag', 'Set risk'], entity: 'Manage accounts',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Jul 04, 2024 05:47:42 PM', status: 'draft',
  },
  {
    id: 'rule-003', tab: 'enrichment', name: 'Onboarding privileged entity',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Remove tag', 'Set risk'], entity: 'Federated users',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Jul 04, 2024 05:47:42 PM', status: 'draft',
  },
  {
    id: 'rule-004', tab: 'enrichment', name: 'Onboarding privileged entity',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Remove tag', 'Set risk'], entity: 'Accounts',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Jul 04, 2024 05:47:42 PM', status: 'draft',
  },
  {
    id: 'rule-005', tab: 'enrichment', name: 'Onboarding privileged entity',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Remove tag', 'Set risk'], entity: 'Federated users',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Jul 04, 2024 05:47:42 PM', status: 'draft',
  },
  {
    id: 'rule-006', tab: 'enrichment', name: 'Onboarding privileged entity',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Remove tag', 'Set risk'], entity: 'Accounts',
    createdBy: 'System', rulesCount: 2, lastUpdated: 'Jul 04, 2024 05:47:42 PM', status: 'active',
  },
  {
    id: 'rule-007', tab: 'enrichment', name: 'Onboarding privileged entity',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Remove tag', 'Set risk'], entity: 'Accounts',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Jul 04, 2024 05:47:42 PM', status: 'draft',
  },
  {
    id: 'rule-008', tab: 'enrichment', name: 'Onboarding privileged entity',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Remove tag', 'Set risk'], entity: 'Accounts',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Jul 04, 2024 05:47:42 PM', status: 'draft',
  },
  {
    id: 'rule-009', tab: 'enrichment', name: 'Onboarding privileged entity',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Remove tag', 'Set risk'], entity: 'Accounts',
    createdBy: 'System', rulesCount: 3, lastUpdated: 'Jul 04, 2024 05:47:42 PM', status: 'active',
  },
  {
    id: 'rule-010', tab: 'enrichment', name: 'Onboarding privileged entity',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Remove tag', 'Set risk'], entity: 'Accounts',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Jul 04, 2024 05:47:42 PM', status: 'draft',
  },
];

const remediationRules: RuleCenterRule[] = [
  {
    id: 'rule-r01', tab: 'remediation', name: 'Auto-remediate stale account',
    entityMeta: { type: 'Account', subtype: 'Domain', source: 'EPM', platform: 'Windows' },
    actions: ['Set risk'], entity: 'Accounts',
    createdBy: 'admin@cyberark.com', rulesCount: 2, lastUpdated: 'Aug 12, 2024 10:15:00 AM', status: 'active',
  },
  {
    id: 'rule-r02', tab: 'remediation', name: 'Revoke inactive federated session',
    entityMeta: { type: 'User', subtype: 'Federated', source: 'IDP', platform: 'Linux' },
    actions: ['Remove tag'], entity: 'Federated users',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Aug 10, 2024 08:00:00 AM', status: 'draft',
  },
  {
    id: 'rule-r03', tab: 'remediation', name: 'Reset password on risk escalation',
    entityMeta: { type: 'Account', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Set risk', 'Remove tag'], entity: 'Manage accounts',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Aug 08, 2024 03:22:11 PM', status: 'draft',
  },
  {
    id: 'rule-r04', tab: 'remediation', name: 'Disable orphaned service account',
    entityMeta: { type: 'Account', subtype: 'Service', source: 'EPM', platform: 'Windows' },
    actions: ['Set risk'], entity: 'Accounts',
    createdBy: 'admin@cyberark.com', rulesCount: 4, lastUpdated: 'Jul 29, 2024 12:00:00 PM', status: 'active',
  },
  {
    id: 'rule-r05', tab: 'remediation', name: 'Tag cloud accounts for review',
    entityMeta: { type: 'Account', subtype: 'Cloud', source: 'AWS', platform: 'AWS' },
    actions: ['Remove tag'], entity: 'Accounts',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Jul 20, 2024 09:05:33 AM', status: 'draft',
  },
  {
    id: 'rule-r06', tab: 'remediation', name: 'Quarantine high-risk web app session',
    entityMeta: { type: 'App', subtype: 'Web', source: 'PAM', platform: 'Linux' },
    actions: ['Set risk'], entity: 'Web application',
    createdBy: 'System', rulesCount: 2, lastUpdated: 'Jul 15, 2024 04:45:00 PM', status: 'active',
  },
  {
    id: 'rule-r07', tab: 'remediation', name: 'Alert on VM privilege escalation',
    entityMeta: { type: 'VM', subtype: 'Local', source: 'vCenter', platform: 'Linux' },
    actions: ['Set risk', 'Remove tag'], entity: 'Virtual machines',
    createdBy: 'admin@cyberark.com', rulesCount: 1, lastUpdated: 'Jul 10, 2024 11:30:22 AM', status: 'draft',
  },
  {
    id: 'rule-r08', tab: 'remediation', name: 'Enforce MFA on federated group',
    entityMeta: { type: 'Group', subtype: 'Federated', source: 'IDP', platform: 'Windows' },
    actions: ['Remove tag'], entity: 'Federated groups',
    createdBy: 'System', rulesCount: 3, lastUpdated: 'Jul 05, 2024 02:10:00 PM', status: 'active',
  },
  {
    id: 'rule-r09', tab: 'remediation', name: 'Suspend locked-out user',
    entityMeta: { type: 'User', subtype: 'Local', source: 'EPM', platform: 'Windows' },
    actions: ['Set risk'], entity: 'Users',
    createdBy: 'System', rulesCount: 1, lastUpdated: 'Jun 28, 2024 07:55:44 AM', status: 'draft',
  },
  {
    id: 'rule-r10', tab: 'remediation', name: 'Rotate credentials on breach detection',
    entityMeta: { type: 'Account', subtype: 'Domain', source: 'EPM', platform: 'Windows' },
    actions: ['Set risk', 'Remove tag'], entity: 'Accounts',
    createdBy: 'admin@cyberark.com', rulesCount: 2, lastUpdated: 'Jun 20, 2024 01:00:00 PM', status: 'active',
  },
];

export const RULE_CENTER_MOCK: Record<RuleTabType, RuleCenterRule[]> = {
  enrichment: enrichmentRules,
  remediation: remediationRules,
};
