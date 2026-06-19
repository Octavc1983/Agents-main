/**
 * Navigation SVG Icon Components
 * Source: IDIRA Design System / Scans-UX-Production Figma
 * All icons are inline SVG — no raster, no icon fonts, no external libraries.
 */

import React from 'react';

interface SvgIconProps {
  size?: number;
  className?: string;
  'aria-label'?: string;
}

export const HomeIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M10 2L2 8.5V18h5.5v-5h5v5H18V8.5L10 2Z" fill="currentColor" />
  </svg>
);

export const ScansIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12.5 12.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 8.5h5M8.5 6v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const InfrastructureIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <rect x="2" y="4" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="12" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5.5" cy="6" r="1" fill="currentColor" />
    <circle cx="5.5" cy="14" r="1" fill="currentColor" />
  </svg>
);

export const PoliciesIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M5 3h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
      stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const AccessRequestsIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 17c0-3.314 2.239-5 5-5s5 1.686 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 10l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ReportsIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <rect x="3" y="3" width="14" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 13V10M10 13V7M13 13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const AuditIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M10 2l1.8 5.5H17l-4.6 3.4 1.8 5.5L10 13l-4.2 3.4 1.8-5.5L3 7.5h5.2L10 2Z"
      stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

export const SettingsIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SecurityIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M10 2L3 5v5c0 4 3 7.5 7 8.5 4-1 7-4.5 7-8.5V5L10 2Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TelescopeIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="10" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 12v6M7 18h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M4 5l2 2M16 5l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const InventoryIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <rect x="3" y="8" width="14" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 13h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const PlayCircleIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 7.5l5 2.5-5 2.5V7.5Z" fill="currentColor" />
  </svg>
);

// --- Scans-specific icons ---

export const ScanRunIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M3 5h14M3 10h10M3 15h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="15" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M14 14l1 1 1.5-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TargetIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
  </svg>
);

export const CheckCircleIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WarningIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M8 6v3.5M8 11.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const ErrorCircleIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const InfoIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const ChevronDownIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRightIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FilterIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const RefreshIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5c1.93 0 3.63.99 4.63 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M13.5 2.5v3h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DotsMenuIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="8" cy="4" r="1.2" fill="currentColor" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
    <circle cx="8" cy="12" r="1.2" fill="currentColor" />
  </svg>
);

export const CyberArkLogoIcon: React.FC<SvgIconProps> = ({ size = 28, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img">
    <rect width="28" height="28" rx="6" fill="#7a80ff" />
    <path d="M8 14c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6Z" stroke="white" strokeWidth="1.6" />
    <circle cx="14" cy="14" r="2.5" fill="white" />
  </svg>
);

// --- IDIRA logo (sidebar brand) ---
// Hexagonal mark — exact shape from IDIRA Design System Figma

export const IDIRALogoIcon: React.FC<SvgIconProps & { color?: string }> = ({
  size = 32,
  className,
  'aria-label': ariaLabel,
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 108 124" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path
      d="M108 31L86.002 44L54.0049 25L22.0078 44V81L54 98.9971V62.3271L86 44V80.6631L54.002 98.998L54.0049 99V124L0.00976562 93L0 31L54.0049 0L108 31Z"
      fill={color}
    />
  </svg>
);

// --- Space / apps grid icon ---

export const AppsGridIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" />
  </svg>
);

// --- Collapse arrow icon ---

export const CollapseIcon: React.FC<SvgIconProps> = ({ size = 24, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path fillRule="evenodd" d="M16.25 5C16.6642 5 17 5.34822 17 5.77778L17 18.2222C17 18.6518 16.6642 19 16.25 19C15.8358 19 15.5 18.6518 15.5 18.2222L15.5 5.77778C15.5 5.34822 15.8358 5 16.25 5Z" fill="currentColor" />
    <path fillRule="evenodd" d="M7.22323 16.4697C6.93034 16.7626 6.93034 17.2374 7.22323 17.5303C7.51613 17.8232 7.991 17.8232 8.28389 17.5303L12.8259 12.9883C13.0568 12.7574 13.0568 12.3839 12.8259 12.153L8.28389 7.53033C7.991 7.23744 7.51613 7.23744 7.22323 7.53033C6.93034 7.82322 6.93034 8.2981 7.22323 8.59099L11.2132 12.5707L7.22323 16.4697Z" fill="currentColor" />
  </svg>
);

export const DotsGridIcon: React.FC<SvgIconProps> = ({ size = 24, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M11.9958 18H12.0048M17.9998 18H18.0087M5.99976 18H6.00874M11.9958 12H12.0048M11.9998 6H12.0087M17.9998 12H18.0087M17.9998 6H18.0087M5.99976 12H6.00874M5.99976 6H6.00874" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Cloud provider logos ---

export const AWSIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <rect width="20" height="20" rx="4" fill="#FF9900" />
    <path d="M5 12.5c1.5.8 3.2 1.2 5 1.2s3.5-.4 5-1.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M6 10.5l1.5-4 1.5 4M7 9.5h2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 10.5l.8-4 .7 2 .7-2 .8 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GCPIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <rect width="20" height="20" rx="4" fill="#4285F4" />
    <path d="M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" fill="white" />
    <path d="M10 7V5M10 15v-2M7 10H5M15 10h-2" stroke="#4285F4" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const AzureIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <rect width="20" height="20" rx="4" fill="#0078D4" />
    <path d="M5 14h10M10 14L7 6h3l3 5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 6l3 5-3 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EntraIDIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <rect width="20" height="20" rx="4" fill="#7719AA" />
    <path d="M10 4L4 9.5V16h12V9.5L10 4Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="10" cy="11" r="2" fill="white" />
  </svg>
);

// --- Status icons (Figma-exact shapes) ---

// ⊗ Failed — circle with X
export const StatusFailedIcon: React.FC<SvgIconProps> = ({ size = 14, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// △ Completed — triangle (Figma shows completed as orange triangle)
export const StatusCompletedIcon: React.FC<SvgIconProps> = ({ size = 14, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M7 2L13 12H1L7 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M7 6v2.5M7 10v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ◷ Pending — clock
export const StatusPendingIcon: React.FC<SvgIconProps> = ({ size = 14, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ▶ Running — play circle (filled)
export const StatusRunningIcon: React.FC<SvgIconProps> = ({ size = 14, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M5.5 5l4 2-4 2V5Z" fill="currentColor" />
  </svg>
);

// ■ Stopped — square
export const StatusStoppedIcon: React.FC<SvgIconProps> = ({ size = 14, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
    <rect x="4.5" y="4.5" width="5" height="5" rx="0.5" fill="currentColor" />
  </svg>
);

// --- Toolbar icons ---

export const SearchIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const PlusIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CloseIcon: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Navigation aliases (used by navConfig spacesRegistry) ─────────────────────

export const HomeNavIcon = HomeIcon;
export const InfrastructureNavIcon = InfrastructureIcon;
export const PoliciesNavIcon = PoliciesIcon;
export const ScansNavIcon = ScansIcon;

export const IdentitiesNavIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="4.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="15.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M5 17c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M1.5 17c0-1.657 1.343-3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M18.5 17c0-1.657-1.343-3-3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const RulesNavIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <path d="M4 5h12M4 8.5h8M4 12h10M4 15.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="15.5" cy="14.5" r="3" stroke="currentColor" strokeWidth="1.3" />
    <path d="M14.5 14.5l.8.8 1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ApplicationsAccessReviewNavIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <rect x="2" y="3" width="11" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 7h5M5 10h5M5 13h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="15" cy="14.5" r="3" stroke="currentColor" strokeWidth="1.3" />
    <path d="M14 14.5l.8.8 1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AppsAndSecuredItemsNavIcon: React.FC<SvgIconProps> = ({ size = 20, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-label={ariaLabel} role="img" aria-hidden={!ariaLabel}>
    <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M14.5 11v-1a2 2 0 0 0-4 0v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="14.5" cy="14.5" r="1" fill="currentColor" />
  </svg>
);
