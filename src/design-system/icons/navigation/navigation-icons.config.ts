/**
 * Navigation Icon Configuration
 * Extracted from IDIRA Design System - Navigation_icons frame
 * 
 * Each icon type supports 4 states: idle, hover, selected, selectedHover
 * Icons are 24x24px
 */

export type IconState = 'idle' | 'hover' | 'selected' | 'selectedHover';

export type NavigationIconType =
  | 'Home'
  | 'Infrastructure'
  | 'AppsAndSecuredItems'
  | 'CloudDelegation'
  | 'AccessRequests'
  | 'Settings'
  | 'LockKey'
  | 'Telescope'
  | 'Policies'
  | 'PlayCircle'
  | 'AccessCertification'
  | 'Audit'
  | 'SessionMonitoring'
  | 'Scans'
  | 'StudentCard'
  | 'User2'
  | 'Integrations'
  | 'User'
  | 'Reports'
  | 'Hierarchy'
  | 'Security'
  | 'Inventory'
  | 'License'
  | 'FileManagement'
  | 'Building'
  | 'UserShield'
  | 'Rules'
  | 'ThreatDetectionResponse'
  | 'DashboardSpeed'
  | 'Deployment'
  | 'LicenseUsage'
  | 'HealthDiagnostics'
  | 'WebProtection'
  | 'PasswordValidation'
  | 'ComputerPhone'
  | 'Notification'
  | 'ApplicationsAccessReview'
  | 'UsageDashboards'
  | 'SystemActivities';

/**
 * Icon mapping with Unicode/emoji representations
 * Mapped from Figma icon types
 * 
 * For production: replace with actual SVG imports or font icons
 * For prototype: using Unicode symbols for quick visualization
 */
export const navigationIconMap: Record<NavigationIconType, string> = {
  Home: '🏠',
  Infrastructure: '🏗️',
  AppsAndSecuredItems: '📦',
  CloudDelegation: '☁️',
  AccessRequests: '📋',
  Settings: '⚙️',
  LockKey: '🔑',
  Telescope: '🔭',
  Policies: '📄',
  PlayCircle: '▶️',
  AccessCertification: '✓',
  Audit: '📊',
  SessionMonitoring: '👁️',
  Scans: '🔍',
  StudentCard: '🎓',
  User2: '👤',
  Integrations: '🔗',
  User: '👥',
  Reports: '📈',
  Hierarchy: '📊',
  Security: '🔒',
  Inventory: '📦',
  License: '📜',
  FileManagement: '📁',
  Building: '🏢',
  UserShield: '🛡️',
  Rules: '⚖️',
  ThreatDetectionResponse: '⚠️',
  DashboardSpeed: '⚡',
  Deployment: '🚀',
  LicenseUsage: '📊',
  HealthDiagnostics: '💊',
  WebProtection: '🌐',
  PasswordValidation: '🔐',
  ComputerPhone: '💻',
  Notification: '🔔',
  ApplicationsAccessReview: '✅',
  UsageDashboards: '📱',
  SystemActivities: '⚙️',
};

/**
 * Navigation icon states configuration
 * Figma extraction: each icon has idle, hover, selected, and selectedHover states
 */
export const iconStateConfig = {
  idle: {
    opacity: 1,
    transform: 'scale(1)',
  },
  hover: {
    opacity: 0.9,
    transform: 'scale(1.1)',
  },
  selected: {
    opacity: 1,
    transform: 'scale(1)',
  },
  selectedHover: {
    opacity: 0.95,
    transform: 'scale(1.05)',
  },
};

/**
 * Color mapping for icon states
 * Based on IDIRA Design System color tokens
 */
export const iconColorMap: Record<IconState, string> = {
  idle: '#ffffff',
  hover: '#7a80ff',
  selected: '#7a80ff',
  selectedHover: '#8756d8',
};
