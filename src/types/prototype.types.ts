/**
 * Type definitions for the UX/UI Prototype
 * These types support rapid prototyping and Figma MCP workflows
 */

// Component State Types
export type ComponentState = 'default' | 'loading' | 'empty' | 'error' | 'success';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

// IDIRA Design System button types
export type IButtonVariant = 'main' | 'secondary' | 'text';
export type IButtonSize = 'sm' | 'md' | 'lg';
export type IFilterButtonState = 'default' | 'hover' | 'pressed' | 'selected' | 'disabled';
export type IIconButtonSize = 16 | 24 | 32;
export type ISplitButtonVariant = 'primary' | 'secondary';
export type ISplitButtonSize = 'sm' | 'md' | 'lg';

export type CardVariant = 'default' | 'elevated' | 'outlined';

// IDIRA Design System card types
export type ICardVariant = 'default' | 'hover' | 'selected';
export type ICardBackground = 'solid' | 'gradient-light-to-dark' | 'gradient-dark-to-light';

// Common Prop Types
export interface BaseProps {
  className?: string;
}

export interface IconProps extends BaseProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export interface ButtonProps extends BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface CardProps extends BaseProps {
  variant?: CardVariant;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export interface EmptyStateProps extends BaseProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export interface LoadingStateProps extends BaseProps {
  message?: string;
}

export interface ErrorStateProps extends BaseProps {
  title: string;
  message: string;
  action?: React.ReactNode;
}

// Mock Data Types
export interface MockItem {
  id: string;
  title: string;
  description?: string;
  status?: 'active' | 'inactive' | 'pending';
  createdAt?: Date;
}

export type AssetStatus = 'active' | 'inactive' | 'critical' | 'at-risk';
export type AssetRiskLevel = 'low' | 'medium' | 'high';
export type AssetType = 'Server' | 'Database' | 'Container' | 'VM' | 'Network';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  owner: string;
  lastUpdated: string;
  riskLevel: AssetRiskLevel;
}

export interface PrototypePageState {
  currentState: ComponentState;
  items: MockItem[];
  selectedItem?: MockItem;
}

// Layout Types
export interface SidebarLink {
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
}

export interface HeaderConfig {
  title: string;
  subtitle?: string;
}

// --- AB Testing types --------------------------------------------------------

export type ABTestStatus = 'running' | 'completed' | 'draft' | 'paused';

export interface ABTest {
  id: string;
  name: string;
  status: ABTestStatus;
  variants: string[];
  trafficSplit: number[];
  conversionRate: number;
  uplift: number;
  startDate: string;
  endDate: string | null;
  owner: string;
  hypothesis: string;
  tags: string[];
}

// --- Account Settings types --------------------------------------------------

export interface AccountUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: string;
  is2faEnabled: boolean;
}

export interface AccountOrganization {
  id: string;
  name: string;
  taxId: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export type AccountSettingsTab = 'profile' | 'security' | 'organization';

// --- Scans types -------------------------------------------------------------

export type ScanStatus = 'completed' | 'running' | 'failed' | 'pending' | 'stopped';
export type ScanSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type ScanType =
  | 'MS SQL Server'
  | 'Windows & *nix in dom...'
  | 'Entra ID'
  | 'Postgres'
  | 'Azure resources'
  | 'MS SQL'
  | 'EntraID';
export type CloudProvider = 'aws' | 'gcp' | 'azure' | 'entra';

export interface ScanFinding {
  id: string;
  severity: ScanSeverity;
  title: string;
  target: string;
  detectedAt: string;
}

export interface Scan {
  id: string;
  name: string;
  provider: CloudProvider;
  scanType: ScanType;
  schedule: string;
  time: string;
  lastRun: string;
  status: ScanStatus;
  domain: string;
  username: string;
  extraAccounts?: number;
  findingsCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  progress?: number;
}

export interface ScansStats {
  totalScans: number;
  running: number;
  completed: number;
  failed: number;
  criticalFindings: number;
}

// --- Session Diagnostics types -----------------------------------------------

export type ConnectionStatus = 'Failed' | 'Ended' | 'Active';

export interface Session {
  id: string;
  sessionId: string;
  startDate: string;
  connectionStatus: ConnectionStatus;
  connectionProfile: string;
  user: string;
  target: string;
  hasError: boolean;
}

// --- Migrations types ---------------------------------------------------------

export interface MigrationOption {
  id: string;
  title: string;
  description: string;
  path: string;
}

// --- Managed Accounts types ---------------------------------------------------

export type ManagedAccountStatus = 'active' | 'inactive' | 'pending' | 'locked' | 'marked_for_deletion' | 'deleted';
export type ManagedAccountRiskLevel = 'critical' | 'high' | 'medium' | 'low';
export type ManagedAccountType = 'local' | 'domain' | 'service' | 'cloud';
export type ManagedAccountPlatform =
  | 'Windows' | 'Linux' | 'AWS' | 'Azure' | 'GCP' | 'Oracle' | 'SAP'
  | 'Ubuntu' | 'MacOS' | 'RHEL' | 'Debian' | 'Fedora'
  | 'Docker' | 'Kubernetes'
  | 'PostgreSQL' | 'MySQL'
  | 'GitHub' | 'GitLab' | 'Bitbucket' | 'Git'
  | 'Salesforce' | 'Jira' | 'Slack' | 'Zoom'
  | 'Jenkins' | 'Splunk'
  | 'Python' | 'Chrome' | 'Google';

export interface ManagedAccount {
  id: string;
  name: string;
  accountType: ManagedAccountType;
  platform: ManagedAccountPlatform;
  address: string;
  status: ManagedAccountStatus;
  riskLevel: ManagedAccountRiskLevel;
  owner: string;
  safe: string;
  organization?: string;
  lastPasswordChange: string;
  createdAt: string;
  tags: string[];
  description?: string;
}

export interface ManagedAccountsStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  locked: number;
}
