import type {
  DiscoveredAccount,
  DiscoveredAccountsStats,
  DiscoveredAccountStatus,
  DiscoveredAccountRiskLevel,
  DiscoveredAccountPlatform,
  DiscoveredAccountDependency,
  DiscoveredAccountRiskFinding,
} from '../types/prototype.types';

// ── Risk findings templates ───────────────────────────────────────────────────

const RISK_TYPE_TEMPLATES = [
  'Orphan account with privileged access',
  'Account with weak password policy',
  'Dormant account with sensitive permissions',
  'Unrotated credentials for over 90 days',
  'Excessive privileges detected',
  'Standing admin access to production',
  'Local admin account discovered',
  'Service account with interactive login',
  'Account missing MFA enforcement',
  'Shared credential usage detected',
];

const RISK_RECOMMENDATIONS: Record<string, string> = {
  'Orphan account with privileged access': 'Review and remove or reassign account ownership',
  'Account with weak password policy': 'Enforce strong password policy and rotate credentials',
  'Dormant account with sensitive permissions': 'Disable or remove inactive accounts',
  'Unrotated credentials for over 90 days': 'Implement automated credential rotation',
  'Excessive privileges detected': 'Apply principle of least privilege',
  'Standing admin access to production': 'Implement Just-In-Time access',
  'Local admin account discovered': 'Centralize account management',
  'Service account with interactive login': 'Restrict service account login types',
  'Account missing MFA enforcement': 'Enable multi-factor authentication',
  'Shared credential usage detected': 'Create individual accounts per user',
};

function generateRiskFindings(count: number, riskLevel: DiscoveredAccountRiskLevel): DiscoveredAccountRiskFinding[] {
  const findings: DiscoveredAccountRiskFinding[] = [];
  const usedTypes = new Set<string>();

  for (let i = 0; i < count; i++) {
    let riskType: string;
    do {
      riskType = RISK_TYPE_TEMPLATES[Math.floor(Math.random() * RISK_TYPE_TEMPLATES.length)];
    } while (usedTypes.has(riskType) && usedTypes.size < RISK_TYPE_TEMPLATES.length);

    usedTypes.add(riskType);

    const daysAgo = Math.floor(Math.random() * 60);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    findings.push({
      id: `rf-${Date.now()}-${i}`,
      riskType,
      severity: riskLevel,
      detectedAt: date.toISOString().split('T')[0],
      status: Math.random() > 0.7 ? 'open' : Math.random() > 0.5 ? 'acknowledged' : 'mitigated',
      recommendation: RISK_RECOMMENDATIONS[riskType] || 'Review and remediate',
    });
  }

  return findings;
}

// ── Dependencies templates ────────────────────────────────────────────────────

function generateDependencies(count: number): DiscoveredAccountDependency[] {
  const deps: DiscoveredAccountDependency[] = [];
  const types = ['Application', 'Service', 'Database', 'API', 'Workload'];
  const relationships = ['Uses', 'Manages', 'Owns', 'Accesses'];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const relationship = relationships[Math.floor(Math.random() * relationships.length)];
    const status: DiscoveredAccountStatus = ['onboarded', 'not_rotated', 'idle', 'disabled'][Math.floor(Math.random() * 4)] as DiscoveredAccountStatus;
    const riskLevel: DiscoveredAccountRiskLevel = ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as DiscoveredAccountRiskLevel;

    deps.push({
      id: `dep-${Date.now()}-${i}`,
      name: `${type}-${Math.floor(Math.random() * 1000)}`,
      type,
      status,
      riskLevel,
      relationship,
    });
  }

  return deps;
}

// ── Mock accounts generation ──────────────────────────────────────────────────

const PLATFORMS: DiscoveredAccountPlatform[] = ['Windows', 'Linux', 'AWS', 'Azure', 'GCP', 'MacOS', 'Ubuntu', 'RHEL'];
const STATUSES: DiscoveredAccountStatus[] = ['onboarded', 'not_rotated', 'idle', 'rule_set_error', 'disabled'];
const RISK_LEVELS: DiscoveredAccountRiskLevel[] = ['critical', 'high', 'medium', 'low'];

const USERNAME_PREFIXES = ['admin', 'sa', 'service', 'app', 'db', 'web', 'api', 'root', 'user', 'dev'];
const DOMAIN_SAMPLES = [
  'uni-cust-crdrdrill9cs-crdrdrill9.com',
  'uni-cust-crdrdrill9cs-crdrdrill10.com',
  'production-east.internal',
  'staging-west.internal',
  'dev-cluster.local',
];

const TAG_POOL = [
  'PROD', 'Test', 'Team1', 'Team2', 'UK', 'US', 'EU',
  'Critical', 'High-Risk', 'Legacy', 'Migration',
  'Active Directory', 'Service Account', 'Admin',
  'env:production', 'env:staging', 'env:dev',
  'owner:security', 'owner:ops', 'owner:dev',
];

function generateMockAccount(index: number): DiscoveredAccount {
  const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  const hasRuleSetError = status === 'rule_set_error';

  // Risk level distribution: more high/medium, fewer critical/low
  const riskDist = Math.random();
  const riskLevel: DiscoveredAccountRiskLevel =
    hasRuleSetError ? 'critical' :
    riskDist < 0.15 ? 'critical' :
    riskDist < 0.45 ? 'high' :
    riskDist < 0.80 ? 'medium' : 'low';

  const riskFindings =
    riskLevel === 'critical' ? Math.floor(Math.random() * 4) + 3 :
    riskLevel === 'high' ? Math.floor(Math.random() * 3) + 1 :
    riskLevel === 'medium' ? Math.random() > 0.5 ? 1 : 0 : 0;

  const type = Math.random() > 0.7 ? 'Domain' : Math.random() > 0.5 ? 'Local' : 'Service';
  const subtype = type === 'Domain' ? 'Windows' : type === 'Service' ? 'Application' : 'Standard';

  const usernamePrefix = USERNAME_PREFIXES[Math.floor(Math.random() * USERNAME_PREFIXES.length)];
  const username = `${usernamePrefix}_${Math.floor(Math.random() * 999)}`;
  const name = `${username}\\ ${platform === 'Windows' ? 'Application ID \\' : ''}Ect.`;

  const address = DOMAIN_SAMPLES[Math.floor(Math.random() * DOMAIN_SAMPLES.length)];

  const tagCount = Math.floor(Math.random() * 6);
  const tags: string[] = [];
  const usedTags = new Set<string>();
  for (let i = 0; i < tagCount; i++) {
    let tag: string;
    do {
      tag = TAG_POOL[Math.floor(Math.random() * TAG_POOL.length)];
    } while (usedTags.has(tag));
    usedTags.add(tag);
    tags.push(tag);
  }

  const daysAgo = Math.floor(Math.random() * 180);
  const createdDate = new Date();
  createdDate.setDate(createdDate.getDate() - daysAgo);

  const lastDiscoveredDaysAgo = Math.floor(Math.random() * 30);
  const lastDiscovered = new Date();
  lastDiscovered.setDate(lastDiscovered.getDate() - lastDiscoveredDaysAgo);

  const dependencyCount = Math.floor(Math.random() * 13) + 3; // 3-15

  return {
    id: `9a453113-afed-4237-a9a5-33d219f51e${String(index).padStart(2, '0')}`,
    name,
    type,
    subtype,
    platform,
    address,
    source: ['EPM', 'Scanner', 'API'][Math.floor(Math.random() * 3)] as any,
    status,
    riskLevel,
    riskFindings,
    username: `Admin_user_${index}`,
    tags,
    lastDiscovered: lastDiscovered.toISOString().split('T')[0],
    createdAt: `Oct ${String(22).padStart(2, '0')}, 2024  09:06:21 AM`,
    // Additional details
    sid: platform === 'Windows' ? `S-1-5-21-2613557512-27300093942-2643064${String(1000 + index).slice(1)}` : undefined,
    osVersion: platform === 'Windows' ? 'Windows Server 2016 Datacenter' : platform === 'Linux' ? 'Ubuntu 20.04 LTS' : undefined,
    osFamily: platform === 'Windows' ? 'Yes' : platform === 'Linux' ? 'Yes' : undefined,
    enabled: Math.random() > 0.2,
    privileged: Math.random() > 0.6,
    lockedOut: status === 'disabled' || Math.random() > 0.9,
    passTheHashVulnerable: platform === 'Windows' && Math.random() > 0.7,
    description: Math.random() > 0.7 ? `Discovered ${type.toLowerCase()} account on ${platform}` : undefined,
    dependencies: generateDependencies(dependencyCount),
    riskFindingDetails: generateRiskFindings(riskFindings, riskLevel),
  };
}

export const discoveredAccountsMock: DiscoveredAccount[] = Array.from({ length: 80 }, (_, i) => generateMockAccount(i));

// ── Stats calculation ─────────────────────────────────────────────────────────

function calculateStats(): DiscoveredAccountsStats {
  const byPlatform = new Map<DiscoveredAccountPlatform, number>();
  const byStatus: Record<DiscoveredAccountStatus, number> = {
    onboarded: 0,
    not_rotated: 0,
    idle: 0,
    rule_set_error: 0,
    disabled: 0,
  };
  const byRisk = { critical: 0, high: 0, medium: 0, low: 0 };
  const bySource = { EPM: 0, Scanner: 0, API: 0, Manual: 0 };

  discoveredAccountsMock.forEach(acc => {
    byPlatform.set(acc.platform, (byPlatform.get(acc.platform) || 0) + 1);
    byStatus[acc.status]++;
    byRisk[acc.riskLevel]++;
    bySource[acc.source]++;
  });

  return {
    total: discoveredAccountsMock.length,
    byPlatform: Array.from(byPlatform.entries())
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count),
    byStatus,
    byRisk,
    bySource,
  };
}

export const discoveredAccountsStats = calculateStats();
