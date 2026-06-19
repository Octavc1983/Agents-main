/**
 * Navigation Configuration — Spaces Registry
 *
 * Source of truth for the Spaces side navigation.
 *
 * Item type rules:
 *   button   = navigates directly; no children
 *   split    = navigates directly AND can expand children
 *   dropdown = expands/collapses only; no direct navigation path
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
} from '@cyberark/design-system/icons';

export type SpaceId =
  | 'commandCenter'
  | 'access'
  | 'risk'
  | 'manage'
  | 'audit'
  | 'setup';

export type NavItemType = 'button' | 'split' | 'dropdown';

export interface NavItem {
  id: string;
  label: string;
  type: NavItemType;
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
      { id: 'access-home', label: 'Home', type: 'button', path: '/access/home', icon: HomeNavIcon },
      {
        id: 'access-apps',
        label: 'Apps and secured items',
        type: 'dropdown',
        icon: AppsAndSecuredItemsNavIcon,
        children: [
          { id: 'access-apps-my', label: 'My items', type: 'button', path: '/access/apps/my-items' },
          { id: 'access-apps-deleted', label: 'Deleted items', type: 'button', path: '/access/apps/deleted-items' },
        ],
      },
      {
        id: 'access-infra',
        label: 'Infrastructure',
        type: 'split',
        path: '/access/infrastructure',
        icon: InfrastructureNavIcon,
        children: [
          { id: 'access-infra-accounts', label: 'Accounts', type: 'button', path: '/access/infrastructure/accounts' },
        ],
      },
      {
        id: 'access-requests',
        label: 'Access requests',
        type: 'dropdown',
        icon: AccessRequestsNavIcon,
        children: [
          { id: 'access-req-mine', label: 'My requests', type: 'button', path: '/access/requests/my-requests' },
          { id: 'access-req-pam', label: 'My requests - PAM', type: 'button', path: '/access/requests/my-requests-pam' },
          { id: 'access-req-approval', label: 'For my approval', type: 'button', path: '/access/requests/approval' },
          { id: 'access-req-approval-pam', label: 'For my approval - PAM', type: 'button', path: '/access/requests/approval-pam' },
        ],
      },
      { id: 'access-cert', label: 'Access certification', type: 'button', path: '/access/certification', icon: AccessCertificationNavIcon },
    ],
  },

  // ── Manage ──────────────────────────────────────────────────────────────────
  {
    id: 'manage',
    label: 'Manage',
    spaceId: 'manage',
    items: [
      { id: 'manage-home', label: 'Home', type: 'button', path: '/manage/home', icon: HomeNavIcon },
      {
        id: 'manage-inventory',
        label: 'Inventory',
        type: 'dropdown',
        icon: InventoryNavIcon,
        children: [
          {
            id: 'manage-inv-identities',
            label: 'Identities',
            type: 'dropdown',
            children: [
              { id: 'manage-inv-users', label: 'Users', type: 'button', path: '/manage/inventory/identities/users' },
              { id: 'manage-inv-roles', label: 'Roles', type: 'button', path: '/manage/inventory/identities/roles' },
              { id: 'manage-inv-orgs', label: 'Organizations', type: 'button', path: '/manage/inventory/identities/organizations' },
              {
                id: 'manage-inv-machine',
                label: 'Machine identities',
                type: 'split',
                path: '/manage/inventory/identities/machine',
                children: [
                  { id: 'manage-inv-cp-apps', label: 'CP applications', type: 'button', path: '/manage/inventory/identities/machine/cp-apps' },
                ],
              },
            ],
          },
          {
            id: 'manage-inv-ai',
            label: 'AI',
            type: 'dropdown',
            children: [
              { id: 'manage-inv-ai-agents', label: 'AI Agents', type: 'button', path: '/manage/inventory/ai/agents' },
              { id: 'manage-inv-ai-managed', label: 'Managed AI agents', type: 'button', path: '/manage/inventory/ai/managed-agents' },
              { id: 'manage-inv-mcp', label: 'MCP servers', type: 'button', path: '/manage/inventory/ai/mcp-servers' },
            ],
          },
          {
            id: 'manage-inv-moa',
            label: 'Means of access',
            type: 'dropdown',
            children: [
              { id: 'manage-inv-secrets', label: 'Secrets', type: 'button', path: '/manage/inventory/moa/secrets' },
              { id: 'manage-inv-managed-acc', label: 'Managed accounts', type: 'button', path: '/manage/inventory/moa/managed-accounts' },
              { id: 'manage-inv-discovered', label: 'Discovered accounts', type: 'button', path: '/manage/inventory/moa/discovered-accounts' },
              { id: 'manage-inv-cloud', label: 'Cloud service entitlements', type: 'button', path: '/manage/inventory/moa/cloud-entitlements' },
              { id: 'manage-inv-endpoints', label: 'Identity endpoints', type: 'button', path: '/manage/inventory/moa/endpoints' },
            ],
          },
          {
            id: 'manage-inv-targets',
            label: 'Targets',
            type: 'dropdown',
            children: [
              { id: 'manage-inv-apps', label: 'Applications', type: 'button', path: '/manage/inventory/targets/applications' },
              { id: 'manage-inv-vms', label: 'Virtual machines', type: 'button', path: '/manage/inventory/targets/virtual-machines' },
            ],
          },
        ],
      },
      {
        id: 'manage-policies',
        label: 'Policies',
        type: 'dropdown',
        icon: PoliciesNavIcon,
        children: [
          {
            id: 'manage-pol-access-control',
            label: 'Access control',
            type: 'dropdown',
            children: [
              { id: 'manage-pol-recurring', label: 'Recurring policies', type: 'button', path: '/manage/policies/access-control/recurring' },
              { id: 'manage-pol-safes', label: 'Safes', type: 'button', path: '/manage/policies/access-control/safes' },
            ],
          },
          { id: 'manage-pol-sws', label: 'Secure web sessions', type: 'button', path: '/manage/policies/secure-web-sessions' },
          { id: 'manage-pol-platforms', label: 'Accounts platforms', type: 'button', path: '/manage/policies/accounts-platforms' },
          {
            id: 'manage-pol-pam',
            label: 'PAM policies',
            type: 'dropdown',
            children: [
              { id: 'manage-pol-master', label: 'Master policy', type: 'button', path: '/manage/policies/pam/master-policy' },
              { id: 'manage-pol-platform-access', label: 'Access to platform', type: 'button', path: '/manage/policies/pam/access-to-platform' },
            ],
          },
          {
            id: 'manage-pol-access-req',
            label: 'Access request',
            type: 'dropdown',
            children: [
              { id: 'manage-pol-eligibility', label: 'Access eligibility', type: 'button', path: '/manage/policies/access-request/eligibility' },
              { id: 'manage-pol-workflows', label: 'Approval workflows', type: 'button', path: '/manage/policies/access-request/workflows' },
              { id: 'manage-pol-ondemand', label: 'On-demand access', type: 'button', path: '/manage/policies/access-request/on-demand' },
              { id: 'manage-pol-app-req', label: 'Application requests', type: 'button', path: '/manage/policies/access-request/application-requests' },
            ],
          },
        ],
      },
      {
        id: 'manage-rules',
        label: 'Rules',
        type: 'dropdown',
        icon: RulesNavIcon,
        children: [
          { id: 'manage-rules-remediation', label: 'Remediation rules', type: 'button', path: '/manage/rules/remediation' },
          { id: 'manage-rules-enrichment', label: 'Enrichment rule sets', type: 'button', path: '/manage/rules/enrichment' },
        ],
      },
      { id: 'manage-scans', label: 'Scans', type: 'button', path: '/manage/scans', icon: ScansNavIcon },
      { id: 'manage-aar', label: 'Applications access review', type: 'button', path: '/manage/aar', icon: ApplicationsAccessReviewNavIcon },
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
        type: 'split',
        path: '/risk/risk-management',
        icon: SecurityInsightsNavIcon,
        children: [
          { id: 'risk-risks', label: 'Risks', type: 'button', path: '/risk/risk-management/risks' },
          { id: 'risk-insights', label: 'Identity insights', type: 'button', path: '/risk/risk-management/identity-insights' },
        ],
      },
      {
        id: 'risk-threat',
        label: 'Threat detection & response',
        type: 'split',
        path: '/risk/threat-detection',
        icon: ThreatDetectionAndResponse,
        children: [
          { id: 'risk-threat-feed', label: 'Security alerts feed', type: 'button', path: '/risk/threat-detection/alerts-feed' },
          {
            id: 'risk-threat-config',
            label: 'Configuration',
            type: 'dropdown',
            children: [
              { id: 'risk-threat-detections', label: 'Detections', type: 'button', path: '/risk/threat-detection/config/detections' },
              { id: 'risk-threat-exceptions', label: 'Exception rules', type: 'button', path: '/risk/threat-detection/config/exception-rules' },
              { id: 'risk-threat-settings', label: 'General settings', type: 'button', path: '/risk/threat-detection/config/general-settings' },
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
      { id: 'audit-system', label: 'System activities', type: 'button', path: '/audit/system-activities', icon: SystemActivitiesNavIcon },
      {
        id: 'audit-sessions',
        label: 'Session monitoring',
        type: 'split',
        path: '/audit/session-monitoring',
        icon: SessionMonitoring,
        children: [
          { id: 'audit-psm', label: 'PSM Monitoring', type: 'button', path: '/audit/session-monitoring/psm' },
          { id: 'audit-web-rec', label: 'Web session recordings', type: 'button', path: '/audit/session-monitoring/web-recordings' },
        ],
      },
      { id: 'audit-usage', label: 'Usage dashboards', type: 'button', path: '/audit/usage-dashboards', icon: InventoryNavIcon },
      {
        id: 'audit-reports',
        label: 'Reports',
        type: 'split',
        path: '/audit/reports',
        icon: ReportsNavIcon,
        children: [
          { id: 'audit-reports-activity', label: 'Activity reports', type: 'button', path: '/audit/reports/activity' },
          { id: 'audit-reports-workforce', label: 'Workforce reports', type: 'button', path: '/audit/reports/workforce' },
          { id: 'audit-reports-cloud', label: 'Privilege cloud reports', type: 'button', path: '/audit/reports/privilege-cloud' },
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
        type: 'dropdown',
        icon: HealthDiagnosticsNavIcon,
        children: [
          { id: 'setup-health-system', label: 'System health', type: 'button', path: '/setup/health/system-health' },
          { id: 'setup-health-session', label: 'Session diagnostics', type: 'button', path: '/setup/health/session-diagnostics' },
        ],
      },
      {
        id: 'setup-deployment',
        label: 'Deployment',
        type: 'dropdown',
        icon: DeploymentNavIcon,
        children: [
          {
            id: 'setup-dep-connectors',
            label: 'Connector management',
            type: 'dropdown',
            children: [
              {
                id: 'setup-dep-connectors-list',
                label: 'Connectors',
                type: 'dropdown',
                children: [
                  { id: 'setup-dep-sys-conn', label: 'System connectors', type: 'button', path: '/setup/deployment/connectors/system' },
                  { id: 'setup-dep-sia-conn', label: 'SIA connectors', type: 'button', path: '/setup/deployment/connectors/sia' },
                  { id: 'setup-dep-https', label: 'HTTPS relays', type: 'button', path: '/setup/deployment/connectors/https-relays' },
                  { id: 'setup-dep-identity-conn', label: 'Identity connectors', type: 'button', path: '/setup/deployment/connectors/identity' },
                ],
              },
              { id: 'setup-dep-pools', label: 'Connector pools', type: 'button', path: '/setup/deployment/connector-pools' },
              { id: 'setup-dep-networks', label: 'Networks', type: 'button', path: '/setup/deployment/networks' },
            ],
          },
          {
            id: 'setup-dep-cloud',
            label: 'Cloud connections',
            type: 'dropdown',
            children: [
              { id: 'setup-dep-cloud-env', label: 'Connect cloud environments', type: 'button', path: '/setup/deployment/cloud/environments' },
              { id: 'setup-dep-cloud-apps', label: 'Cloud provider applications', type: 'button', path: '/setup/deployment/cloud/applications' },
            ],
          },
          { id: 'setup-dep-db', label: 'Database connections', type: 'button', path: '/setup/deployment/database-connections' },
          {
            id: 'setup-dep-identity-sources',
            label: 'Identity sources',
            type: 'dropdown',
            children: [
              { id: 'setup-dep-source-int', label: 'Source integrations', type: 'button', path: '/setup/deployment/identity-sources/integrations' },
              { id: 'setup-dep-admin-acc', label: 'Administrative account', type: 'button', path: '/setup/deployment/identity-sources/admin-account' },
              { id: 'setup-dep-inbound', label: 'Inbound provisioning', type: 'button', path: '/setup/deployment/identity-sources/inbound' },
              { id: 'setup-dep-outbound', label: 'Outbound provisioning', type: 'button', path: '/setup/deployment/identity-sources/outbound' },
              { id: 'setup-dep-ext-idp', label: 'External identity providers', type: 'button', path: '/setup/deployment/identity-sources/external-idp' },
              { id: 'setup-dep-social', label: 'Social login', type: 'button', path: '/setup/deployment/identity-sources/social-login' },
            ],
          },
          { id: 'setup-dep-certs', label: 'Certificates', type: 'button', path: '/setup/deployment/certificates' },
          { id: 'setup-dep-strong', label: 'Strong accounts', type: 'button', path: '/setup/deployment/strong-accounts' },
        ],
      },
      {
        id: 'setup-security',
        label: 'Security',
        type: 'dropdown',
        icon: SecurityInsightsNavIcon,
        children: [
          { id: 'setup-sec-auth', label: 'Authentication', type: 'button', path: '/setup/security/authentication' },
          { id: 'setup-sec-widgets', label: 'Authentication widgets', type: 'button', path: '/setup/security/authentication-widgets' },
          {
            id: 'setup-sec-network',
            label: 'Network restrictions',
            type: 'dropdown',
            children: [
              { id: 'setup-sec-zones', label: 'Secure zones', type: 'button', path: '/setup/security/network/secure-zones' },
              { id: 'setup-sec-denylist', label: 'IP denylist', type: 'button', path: '/setup/security/network/ip-denylist' },
            ],
          },
        ],
      },
      {
        id: 'setup-integrations',
        label: 'Integrations',
        type: 'split',
        path: '/setup/integrations',
        icon: AppsAndSecuredItemsNavIcon,
        children: [
          { id: 'setup-int-download', label: 'Download center', type: 'button', path: '/setup/integrations/download-center' },
        ],
      },
      { id: 'setup-workspace', label: 'Workspace delegation', type: 'button', path: '/setup/workspace-delegation', icon: IdentitiesNavIcon },
      {
        id: 'setup-license',
        label: 'License usage',
        type: 'split',
        path: '/setup/license-usage',
        icon: LicenseUsageNavIcon,
        children: [
          { id: 'setup-license-settings', label: 'License settings', type: 'button', path: '/setup/license-usage/settings' },
        ],
      },
      {
        id: 'setup-settings',
        label: 'Settings',
        type: 'dropdown',
        icon: DeploymentNavIcon,
        children: [
          {
            id: 'setup-settings-customization',
            label: 'Customization',
            type: 'dropdown',
            children: [
              { id: 'setup-settings-branding', label: 'Branding', type: 'button', path: '/setup/settings/customization/branding' },
              { id: 'setup-settings-login-suffix', label: 'Login suffix', type: 'button', path: '/setup/settings/customization/login-suffix' },
              { id: 'setup-settings-domain', label: 'Domain', type: 'button', path: '/setup/settings/customization/domain' },
              { id: 'setup-settings-ai-prefs', label: 'AI preferences', type: 'button', path: '/setup/settings/customization/ai-preferences' },
            ],
          },
        ],
      },
    ],
  },
];

export function getSpaceById(id: string): SpaceSchema | undefined {
  return spacesRegistry.find((space) => space.id === id);
}

export function getDefaultSpace(): SpaceSchema {
  return spacesRegistry[0];
}

export function getSchemaForSpace(spaceId: string): NavSpaceConfig | null {
  return spacesRegistry.find((space) => space.id === spaceId) ?? null;
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

function findFirstPath(items: NavItemConfig[]): string | null {
  for (const item of items) {
    if (item.path) return item.path;
    if (item.children) {
      const childPath = findFirstPath(item.children);
      if (childPath) return childPath;
    }
  }
  return null;
}

export function getDefaultPathForSpace(spaceId: string): string {
  const space = getSchemaForSpace(spaceId);
  if (!space) return '/';
  return findFirstPath(space.items) ?? '/';
}

export type Breadcrumb = { label: string; path?: string };

function findBreadcrumbsInItems(
  items: NavItemConfig[],
  pathname: string,
  trail: Breadcrumb[] = [],
): Breadcrumb[] | null {
  for (const item of items) {
    const nextTrail = [...trail, { label: item.label, path: item.path }];
    if (item.path === pathname) return nextTrail;
    if (item.children) {
      const found = findBreadcrumbsInItems(item.children, pathname, nextTrail);
      if (found) return found;
    }
  }
  return null;
}

export function getNavBreadcrumbs(pathname: string): Breadcrumb[] {
  for (const space of spacesRegistry) {
    const found = findBreadcrumbsInItems(space.items, pathname, [{ label: space.label }]);
    if (found) return found;
  }
  return [];
}

export function getNavItemType(item: Pick<NavItemConfig, 'path' | 'children' | 'type'>): NavItemType {
  if (item.type) return item.type;
  if (item.path && item.children?.length) return 'split';
  if (!item.path && item.children?.length) return 'dropdown';
  return 'button';
}

export function isButtonItem(item: NavItemConfig): boolean {
  return getNavItemType(item) === 'button';
}

export function isSplitItem(item: NavItemConfig): boolean {
  return getNavItemType(item) === 'split';
}

export function isDropdownItem(item: NavItemConfig): boolean {
  return getNavItemType(item) === 'dropdown';
}

export function getSpaceForPath(pathname: string): SpaceSchema | null {
  for (const space of spacesRegistry) {
    if (resolveItemByPath(space.items, pathname)) return space;
  }
  return null;
}
