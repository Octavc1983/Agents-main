/**
 * Navigation Configuration — Spaces Registry
 * Type rules (inferred, no explicit 'type' field):
 *   split    = !!path && !!children
 *   dropdown = !path && !!children
 *   button   = !!path && !children
 */

import type { ComponentType } from 'react';
import {
  HomeNavIcon,
  IdentitiesNavIcon,
  PoliciesNavIcon,
  RulesNavIcon,
  ScansNavIcon,
  ApplicationsAccessReviewNavIcon,
  AppsAndSecuredItemsNavIcon,
  InfrastructureNavIcon,
  ThreatDetectionAndResponse,
  SessionMonitoring,
  SecurityInsightsNavIcon,
  SystemActivitiesNavIcon,
  ReportsNavIcon,
  InventoryNavIcon,
  AccessRequestsNavIcon,
  AccessCertificationNavIcon,
  HealthDiagnosticsNavIcon,
  DeploymentNavIcon,
  LicenseUsageNavIcon,
} from '@/icons/navigation';

export type SpaceId = 'commandCenter' | 'access' | 'risk' | 'manage' | 'audit' | 'setup';

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  icon?: ComponentType;
  children?: NavItem[];
}

export interface SpaceSchema {
  id: string;
  label: string;
  spaceId: SpaceId;
  items: NavItem[];
}

export type NavItemConfig = NavItem;
export type NavSpaceConfig = SpaceSchema;

export const SYSTEM_ROUTE_PREFIXES = ['/system', '/settings', '/profile'];

export const spacesRegistry: SpaceSchema[] = [
  // ── Access ──────────────────────────────────────────────────────────────────
  {
    id: 'access',
    label: 'Access',
    spaceId: 'access',
    items: [
      { id: 'access-home', label: 'Home', path: '/access/home', icon: HomeNavIcon },
      {
        id: 'access-apps',
        label: 'Apps and secured items',
        icon: AppsAndSecuredItemsNavIcon,
        children: [
          { id: 'access-apps-my', label: 'My items', path: '/access/apps/my-items' },
          { id: 'access-apps-deleted', label: 'Deleted items', path: '/access/apps/deleted-items' },
        ],
      },
      {
        id: 'access-infra',
        label: 'Infrastructure',
        path: '/access/infrastructure',
        icon: InfrastructureNavIcon,
        children: [
          { id: 'access-infra-accounts', label: 'Accounts', path: '/access/infrastructure/accounts' },
        ],
      },
      {
        id: 'access-requests',
        label: 'Access requests',
        icon: AccessRequestsNavIcon,
        children: [
          { id: 'access-req-mine', label: 'My requests', path: '/access/requests/my-requests' },
          { id: 'access-req-pam', label: 'My requests - PAM', path: '/access/requests/my-requests-pam' },
          { id: 'access-req-approval', label: 'For my approval', path: '/access/requests/approval' },
          { id: 'access-req-approval-pam', label: 'For my approval - PAM', path: '/access/requests/approval-pam' },
        ],
      },
      { id: 'access-cert', label: 'Access certification', path: '/access/certification', icon: AccessCertificationNavIcon },
    ],
  },

  // ── Manage ──────────────────────────────────────────────────────────────────
  {
    id: 'manage',
    label: 'Manage',
    spaceId: 'manage',
    items: [
      { id: 'manage-home', label: 'Home', path: '/manage/home', icon: HomeNavIcon },
      {
        id: 'manage-inventory',
        label: 'Inventory',
        icon: InventoryNavIcon,
        children: [
          {
            id: 'manage-inv-identities',
            label: 'Identities',
            children: [
              { id: 'manage-inv-users', label: 'Users', path: '/manage/inventory/identities/users' },
              { id: 'manage-inv-roles', label: 'Roles', path: '/manage/inventory/identities/roles' },
              { id: 'manage-inv-orgs', label: 'Organizations', path: '/manage/inventory/identities/organizations' },
              {
                id: 'manage-inv-machine',
                label: 'Machine identities',
                path: '/manage/inventory/identities/machine',
                children: [
                  { id: 'manage-inv-cp-apps', label: 'CP applications', path: '/manage/inventory/identities/machine/cp-apps' },
                ],
              },
            ],
          },
          {
            id: 'manage-inv-ai',
            label: 'AI',
            children: [
              { id: 'manage-inv-ai-agents', label: 'AI Agents', path: '/manage/inventory/ai/agents' },
              { id: 'manage-inv-ai-managed', label: 'Managed AI agents', path: '/manage/inventory/ai/managed-agents' },
              { id: 'manage-inv-mcp', label: 'MCP servers', path: '/manage/inventory/ai/mcp-servers' },
            ],
          },
          {
            id: 'manage-inv-moa',
            label: 'Means of access',
            children: [
              { id: 'manage-inv-secrets', label: 'Secrets', path: '/manage/inventory/moa/secrets' },
              { id: 'manage-inv-managed-acc', label: 'Managed accounts', path: '/manage/inventory/moa/managed-accounts' },
              { id: 'manage-inv-discovered', label: 'Discovered accounts', path: '/manage/inventory/moa/discovered-accounts' },
              { id: 'manage-inv-cloud', label: 'Cloud service entitlements', path: '/manage/inventory/moa/cloud-entitlements' },
              { id: 'manage-inv-endpoints', label: 'Identity endpoints', path: '/manage/inventory/moa/endpoints' },
            ],
          },
          {
            id: 'manage-inv-targets',
            label: 'Targets',
            children: [
              { id: 'manage-inv-apps', label: 'Applications', path: '/manage/inventory/targets/applications' },
              { id: 'manage-inv-vms', label: 'Virtual machines', path: '/manage/inventory/targets/virtual-machines' },
            ],
          },
        ],
      },
      {
        id: 'manage-policies',
        label: 'Policies',
        icon: PoliciesNavIcon,
        children: [
          {
            id: 'manage-pol-access-control',
            label: 'Access control',
            children: [
              { id: 'manage-pol-recurring', label: 'Recurring policies', path: '/manage/policies/access-control/recurring' },
              { id: 'manage-pol-safes', label: 'Safes', path: '/manage/policies/access-control/safes' },
            ],
          },
          { id: 'manage-pol-sws', label: 'Secure web sessions', path: '/manage/policies/secure-web-sessions' },
          { id: 'manage-pol-platforms', label: 'Accounts platforms', path: '/manage/policies/accounts-platforms' },
          {
            id: 'manage-pol-pam',
            label: 'PAM policies',
            children: [
              { id: 'manage-pol-master', label: 'Master policy', path: '/manage/policies/pam/master-policy' },
              { id: 'manage-pol-platform-access', label: 'Access to platform', path: '/manage/policies/pam/access-to-platform' },
            ],
          },
          {
            id: 'manage-pol-access-req',
            label: 'Access request',
            children: [
              { id: 'manage-pol-eligibility', label: 'Access eligibility', path: '/manage/policies/access-request/eligibility' },
              { id: 'manage-pol-workflows', label: 'Approval workflows', path: '/manage/policies/access-request/workflows' },
              { id: 'manage-pol-ondemand', label: 'On-demand access', path: '/manage/policies/access-request/on-demand' },
              { id: 'manage-pol-app-req', label: 'Application requests', path: '/manage/policies/access-request/application-requests' },
            ],
          },
        ],
      },
      {
        id: 'manage-rules',
        label: 'Rules',
        icon: RulesNavIcon,
        children: [
          { id: 'manage-rules-remediation', label: 'Remediation rules', path: '/manage/rules/remediation' },
          { id: 'manage-rules-enrichment', label: 'Enrichment rule sets', path: '/manage/rules/enrichment' },
        ],
      },
      { id: 'manage-scans', label: 'Scans', path: '/manage/scans', icon: ScansNavIcon },
      { id: 'manage-aar', label: 'Applications access review', path: '/manage/aar', icon: ApplicationsAccessReviewNavIcon },
    ],
  },

  // ── Detect and Respond ───────────────────────────────────────────────────────
  {
    id: 'risk',
    label: 'Detect and Respond',
    spaceId: 'risk',
    items: [
      {
        id: 'risk-mgmt',
        label: 'Risk management',
        path: '/risk/risk-management',
        icon: SecurityInsightsNavIcon,
        children: [
          { id: 'risk-risks', label: 'Risks', path: '/risk/risk-management/risks' },
          { id: 'risk-insights', label: 'Identity insights', path: '/risk/risk-management/identity-insights' },
        ],
      },
      {
        id: 'risk-threat',
        label: 'Threat detection & response',
        path: '/risk/threat-detection',
        icon: ThreatDetectionAndResponse,
        children: [
          { id: 'risk-threat-feed', label: 'Security alerts feed', path: '/risk/threat-detection/alerts-feed' },
          {
            id: 'risk-threat-config',
            label: 'Configuration',
            children: [
              { id: 'risk-threat-detections', label: 'Detections', path: '/risk/threat-detection/config/detections' },
              { id: 'risk-threat-exceptions', label: 'Exception rules', path: '/risk/threat-detection/config/exception-rules' },
              { id: 'risk-threat-settings', label: 'General settings', path: '/risk/threat-detection/config/general-settings' },
            ],
          },
        ],
      },
    ],
  },

  // ── Audit and Reports ────────────────────────────────────────────────────────
  {
    id: 'audit',
    label: 'Audit and Reports',
    spaceId: 'audit',
    items: [
      { id: 'audit-system', label: 'System activities', path: '/audit/system-activities', icon: SystemActivitiesNavIcon },
      {
        id: 'audit-sessions',
        label: 'Session monitoring',
        path: '/audit/session-monitoring',
        icon: SessionMonitoring,
        children: [
          { id: 'audit-psm', label: 'PSM Monitoring', path: '/audit/session-monitoring/psm' },
          { id: 'audit-web-rec', label: 'Web session recordings', path: '/audit/session-monitoring/web-recordings' },
        ],
      },
      { id: 'audit-usage', label: 'Usage dashboards', path: '/audit/usage-dashboards', icon: InventoryNavIcon },
      {
        id: 'audit-reports',
        label: 'Reports',
        path: '/audit/reports',
        icon: ReportsNavIcon,
        children: [
          { id: 'audit-reports-activity', label: 'Activity reports', path: '/audit/reports/activity' },
          { id: 'audit-reports-workforce', label: 'Workforce reports', path: '/audit/reports/workforce' },
          { id: 'audit-reports-cloud', label: 'Privilege cloud reports', path: '/audit/reports/privilege-cloud' },
        ],
      },
    ],
  },

  // ── Setup ────────────────────────────────────────────────────────────────────
  {
    id: 'setup',
    label: 'Setup',
    spaceId: 'setup',
    items: [
      {
        id: 'setup-health',
        label: 'Health & diagnostics',
        icon: HealthDiagnosticsNavIcon,
        children: [
          { id: 'setup-health-system', label: 'System health', path: '/setup/health/system-health' },
          { id: 'setup-health-session', label: 'Session diagnostics', path: '/setup/health/session-diagnostics' },
        ],
      },
      {
        id: 'setup-deployment',
        label: 'Deployment',
        icon: DeploymentNavIcon,
        children: [
          {
            id: 'setup-dep-connectors',
            label: 'Connector management',
            children: [
              {
                id: 'setup-dep-connectors-list',
                label: 'Connectors',
                children: [
                  { id: 'setup-dep-sys-conn', label: 'System connectors', path: '/setup/deployment/connectors/system' },
                  { id: 'setup-dep-sia-conn', label: 'SIA connectors', path: '/setup/deployment/connectors/sia' },
                  { id: 'setup-dep-https', label: 'HTTPS relays', path: '/setup/deployment/connectors/https-relays' },
                  { id: 'setup-dep-identity-conn', label: 'Identity connectors', path: '/setup/deployment/connectors/identity' },
                ],
              },
              { id: 'setup-dep-pools', label: 'Connector pools', path: '/setup/deployment/connector-pools' },
              { id: 'setup-dep-networks', label: 'Networks', path: '/setup/deployment/networks' },
            ],
          },
          {
            id: 'setup-dep-cloud',
            label: 'Cloud connections',
            children: [
              { id: 'setup-dep-cloud-env', label: 'Connect cloud environments', path: '/setup/deployment/cloud/environments' },
              { id: 'setup-dep-cloud-apps', label: 'Cloud provider applications', path: '/setup/deployment/cloud/applications' },
            ],
          },
          { id: 'setup-dep-db', label: 'Database connections', path: '/setup/deployment/database-connections' },
          {
            id: 'setup-dep-identity-sources',
            label: 'Identity sources',
            children: [
              { id: 'setup-dep-source-int', label: 'Source integrations', path: '/setup/deployment/identity-sources/integrations' },
              { id: 'setup-dep-admin-acc', label: 'Administrative account', path: '/setup/deployment/identity-sources/admin-account' },
              { id: 'setup-dep-inbound', label: 'Inbound provisioning', path: '/setup/deployment/identity-sources/inbound' },
              { id: 'setup-dep-outbound', label: 'Outbound provisioning', path: '/setup/deployment/identity-sources/outbound' },
              { id: 'setup-dep-ext-idp', label: 'External identity providers', path: '/setup/deployment/identity-sources/external-idp' },
              { id: 'setup-dep-social', label: 'Social login', path: '/setup/deployment/identity-sources/social-login' },
            ],
          },
          { id: 'setup-dep-certs', label: 'Certificates', path: '/setup/deployment/certificates' },
          { id: 'setup-dep-strong', label: 'Strong accounts', path: '/setup/deployment/strong-accounts' },
        ],
      },
      {
        id: 'setup-security',
        label: 'Security',
        icon: SecurityInsightsNavIcon,
        children: [
          { id: 'setup-sec-auth', label: 'Authentication', path: '/setup/security/authentication' },
          { id: 'setup-sec-widgets', label: 'Authentication widgets', path: '/setup/security/authentication-widgets' },
          {
            id: 'setup-sec-network',
            label: 'Network restrictions',
            children: [
              { id: 'setup-sec-zones', label: 'Secure zones', path: '/setup/security/network/secure-zones' },
              { id: 'setup-sec-denylist', label: 'IP denylist', path: '/setup/security/network/ip-denylist' },
            ],
          },
        ],
      },
      {
        id: 'setup-integrations',
        label: 'Ecosystem hub',
        path: '/setup/ecosystem-hub',
        icon: AppsAndSecuredItemsNavIcon,
        children: [
          { id: 'setup-int-download', label: 'Download center', path: '/setup/ecosystem-hub/download-center' },
        ],
      },
      { id: 'setup-workspace', label: 'Cloud delegation', path: '/setup/cloud-delegation', icon: IdentitiesNavIcon },
      {
        id: 'setup-license',
        label: 'License usage',
        path: '/setup/license-usage',
        icon: LicenseUsageNavIcon,
        children: [
          { id: 'setup-license-settings', label: 'License settings', path: '/setup/license-usage/settings' },
        ],
      },
      {
        id: 'setup-settings',
        label: 'Settings',
        icon: DeploymentNavIcon,
        children: [
          {
            id: 'setup-settings-customization',
            label: 'Customization',
            children: [
              { id: 'setup-settings-branding', label: 'Branding', path: '/setup/settings/customization/branding' },
              { id: 'setup-settings-login-suffix', label: 'Login suffix', path: '/setup/settings/customization/login-suffix' },
              { id: 'setup-settings-domain', label: 'Domain', path: '/setup/settings/customization/domain' },
              { id: 'setup-settings-ai-prefs', label: 'AI preferences', path: '/setup/settings/customization/ai-preferences' },
            ],
          },
        ],
      },
    ],
  },
];

export function getSpaceById(id: string): SpaceSchema | undefined {
  return spacesRegistry.find(s => s.id === id);
}

export function getDefaultSpace(): SpaceSchema {
  return spacesRegistry[0];
}

export function getSchemaForSpace(spaceId: string): NavSpaceConfig | null {
  return spacesRegistry.find(s => s.id === spaceId) ?? null;
}

export function getDefaultPathForSpace(spaceId: string): string {
  const space = getSchemaForSpace(spaceId);
  if (!space) return '/';
  for (const item of space.items) {
    if (item.path) return item.path;
    if (item.children) {
      for (const child of item.children) {
        if (child.path) return child.path;
      }
    }
  }
  return '/';
}

export function flattenNav(items: NavItemConfig[]): NavItemConfig[] {
  const result: NavItemConfig[] = [];
  for (const item of items) {
    result.push(item);
    if (item.children) result.push(...flattenNav(item.children));
  }
  return result;
}

export function resolveItemByPath(items: NavItemConfig[], path: string): NavItemConfig | null {
  for (const item of items) {
    if (item.path === path) return item;
    if (item.children) {
      const found = resolveItemByPath(item.children, path);
      if (found) return found;
    }
  }
  return null;
}

export type Breadcrumb = { label: string; path?: string };

export function getNavBreadcrumbs(pathname: string): Breadcrumb[] {
  for (const space of spacesRegistry) {
    for (const item of space.items) {
      if (item.path === pathname) {
        return [{ label: space.label }, { label: item.label, path: item.path }];
      }
      if (item.children) {
        for (const child of item.children) {
          if (child.path === pathname) {
            return [{ label: space.label }, { label: item.label }, { label: child.label, path: child.path }];
          }
        }
      }
    }
  }
  return [];
}
