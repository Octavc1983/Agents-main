/**
 * Type definitions for the UX/UI Prototype
 * These types support rapid prototyping and Figma MCP workflows
 */

// Component State Types
export type ComponentState = 'default' | 'loading' | 'empty' | 'error' | 'success';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type CardVariant = 'default' | 'elevated' | 'outlined';

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
