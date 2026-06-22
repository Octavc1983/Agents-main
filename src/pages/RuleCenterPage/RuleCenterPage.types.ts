export type RuleTabType = 'enrichment' | 'remediation';

export type RuleEntityType =
  | 'accounts'
  | 'federated-users'
  | 'federated-groups'
  | 'web-application'
  | 'users'
  | 'virtual-machines';

export type RuleStatus = 'draft' | 'active' | 'inactive';

export type RuleAction = 'Remove tag' | 'Set risk';

export type RuleEntityMeta = {
  type: string;
  subtype: string;
  source: string;
  platform: string;
};

export type RuleCenterRule = {
  id: string;
  tab: RuleTabType;
  name: string;
  entityMeta: RuleEntityMeta;
  actions: RuleAction[];
  entity: string;
  createdBy: string;
  rulesCount: number;
  lastUpdated: string;
  status: RuleStatus;
};
