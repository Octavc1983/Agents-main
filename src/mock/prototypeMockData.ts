/**
 * Mock Data for Prototype
 * These are placeholder data for testing UI states and layouts
 * In production, this would be replaced with real data from an API
 */

import type { MockItem, SidebarLink, Asset } from '../types/prototype.types';

export const mockItems: MockItem[] = [
  {
    id: '1',
    title: 'Figma Design System Integration',
    description: 'Connect Figma frames to React components via MCP',
    status: 'active',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Component Mapping Framework',
    description: 'Map Figma layers to existing React components',
    status: 'active',
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    title: 'SCSS Design Tokens',
    description: 'CSS custom properties and SCSS variables for styling',
    status: 'active',
    createdAt: new Date('2024-01-13'),
  },
  {
    id: '4',
    title: 'State Management Strategy',
    description: 'Local state for prototype testing and demo purposes',
    status: 'pending',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '5',
    title: 'Navigation and Routing',
    description: 'React Router for prototype page navigation',
    status: 'active',
    createdAt: new Date('2024-01-11'),
  },
  {
    id: '6',
    title: 'Responsive Layout Grid',
    description: 'Grid system and responsive utilities for layouts',
    status: 'inactive',
    createdAt: new Date('2024-01-10'),
  },
];

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'Home',
    href: '/',
    icon: 'Home',
    isActive: true,
  },
  {
    label: 'Scans',
    href: '/scans',
    icon: 'Scans',
    isActive: false,
  },
  {
    label: 'Infrastructure',
    href: '/infrastructure',
    icon: 'Infrastructure',
    isActive: false,
  },
  {
    label: 'Access Requests',
    href: '/access-requests',
    icon: 'AccessRequests',
    isActive: false,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: 'Settings',
    isActive: false,
  },
  {
    label: 'Account',
    href: '/account',
    icon: 'Settings',
    isActive: false,
  },
  {
    label: 'AB Testing',
    href: '/ab-testing',
    icon: 'Reports',
    isActive: false,
  },
  {
    label: 'Design System Preview',
    href: '/design-system-preview',
    icon: 'Telescope',
    isActive: false,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: 'Reports',
    isActive: false,
  },
  {
    label: 'Audit',
    href: '/audit',
    icon: 'Audit',
    isActive: false,
  },
  {
    label: 'Assets Table',
    href: '/assets-table',
    icon: 'Inventory',
    isActive: false,
  },
  {
    label: 'Agent Prompts',
    href: '/agent-prompts',
    icon: 'PlayCircle',
    isActive: false,
  },
];

/**
 * Mock notification/status data
 */
export const mockNotifications = [
  {
    id: '1',
    message: 'New prototype page created',
    type: 'success' as const,
    timestamp: new Date(),
  },
  {
    id: '2',
    message: 'Component mapping updated',
    type: 'info' as const,
    timestamp: new Date(Date.now() - 3600000),
  },
];

/**
 * Mock user data
 */
export const mockUser = {
  name: 'Design Prototyper',
  email: 'designer@example.com',
  role: 'UX Prototype Engineer',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

/**
 * Mock Assets data for AssetsTablePage
 * In production, replace with real API data
 */
export const mockAssets: Asset[] = [
  {
    id: 'asset-001',
    name: 'web-server-01',
    type: 'Server',
    status: 'active',
    owner: 'Platform Engineering',
    lastUpdated: '2026-06-14',
    riskLevel: 'low',
  },
  {
    id: 'asset-002',
    name: 'db-primary',
    type: 'Database',
    status: 'critical',
    owner: 'Data Infrastructure',
    lastUpdated: '2026-06-13',
    riskLevel: 'high',
  },
  {
    id: 'asset-003',
    name: 'api-gateway-prod',
    type: 'Network',
    status: 'active',
    owner: 'Backend Services',
    lastUpdated: '2026-06-15',
    riskLevel: 'medium',
  },
  {
    id: 'asset-004',
    name: 'k8s-worker-node-03',
    type: 'Container',
    status: 'at-risk',
    owner: 'DevOps',
    lastUpdated: '2026-06-10',
    riskLevel: 'medium',
  },
  {
    id: 'asset-005',
    name: 'analytics-vm-02',
    type: 'VM',
    status: 'inactive',
    owner: 'Data Analytics',
    lastUpdated: '2026-05-30',
    riskLevel: 'low',
  },
  {
    id: 'asset-006',
    name: 'cache-redis-cluster',
    type: 'Server',
    status: 'active',
    owner: 'Platform Engineering',
    lastUpdated: '2026-06-15',
    riskLevel: 'low',
  },
  {
    id: 'asset-007',
    name: 'db-replica-us-east',
    type: 'Database',
    status: 'at-risk',
    owner: 'Data Infrastructure',
    lastUpdated: '2026-06-12',
    riskLevel: 'high',
  },
  {
    id: 'asset-008',
    name: 'build-agent-container',
    type: 'Container',
    status: 'active',
    owner: 'CI/CD Team',
    lastUpdated: '2026-06-16',
    riskLevel: 'low',
  },
  {
    id: 'asset-009',
    name: 'firewall-edge-01',
    type: 'Network',
    status: 'critical',
    owner: 'Security Operations',
    lastUpdated: '2026-06-11',
    riskLevel: 'high',
  },
  {
    id: 'asset-010',
    name: 'staging-vm-web',
    type: 'VM',
    status: 'inactive',
    owner: 'QA Engineering',
    lastUpdated: '2026-06-01',
    riskLevel: 'medium',
  },
];
