import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  'aria-label'?: string;
}

// ── Branding ──────────────────────────────────────────────────────────────────

export const IDIRALogoIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M16 2L28.7 9.5V24.5L16 32L3.3 24.5V9.5L16 2Z" fill="#7a80ff" />
    <path d="M16 7L23.9 11.5V20.5L16 25L8.1 20.5V11.5L16 7Z" fill="#1d2d49" />
    <text x="16" y="20" textAnchor="middle" fill="#7a80ff" fontSize="9" fontWeight="700" fontFamily="Open Sans, sans-serif">ID</text>
  </svg>
);

export const CyberArkLogoIcon: React.FC<IconProps> = ({ size = 28, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <rect width="28" height="28" rx="4" fill="#3E68FF" />
    <path d="M8 14C8 10.686 10.686 8 14 8C16.09 8 17.93 9.02 19 10.6L21 9.16C19.38 6.92 16.86 5.5 14 5.5C9.306 5.5 5.5 9.306 5.5 14C5.5 18.694 9.306 22.5 14 22.5C16.86 22.5 19.38 21.08 21 18.84L19 17.4C17.93 18.98 16.09 20 14 20C10.686 20 8 17.314 8 14Z" fill="white" />
  </svg>
);

// ── Navigation Utility ────────────────────────────────────────────────────────

export const CollapseIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 12, className }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 12, className }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M2.5 4.5L6 7.5L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ size = 12, className }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M2.5 7.5L6 4.5L9.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AppsGridIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="10" y="1" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="1" y="10" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="10" y="10" width="5" height="5" rx="1" fill="currentColor" />
  </svg>
);

export const DotsGridIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="5" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="19" cy="5" r="1.5" fill="currentColor" />
    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" />
    <circle cx="5" cy="19" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
    <circle cx="19" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

// ── Toolbar ───────────────────────────────────────────────────────────────────

export const FilterIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M2 4H14M4.5 8H11.5M7 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M13.5 2.5V6H10M2.5 13.5V10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.36 6A6 6 0 1 0 13.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const DotsMenuIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="8" cy="3" r="1.25" fill="currentColor" />
    <circle cx="8" cy="8" r="1.25" fill="currentColor" />
    <circle cx="8" cy="13" r="1.25" fill="currentColor" />
  </svg>
);

// ── Status ────────────────────────────────────────────────────────────────────

export const CheckCircleIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WarningIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M8 2L14.5 13.5H1.5L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 6.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
  </svg>
);

export const ErrorCircleIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="5" r="0.75" fill="currentColor" />
  </svg>
);

export const StatusFailedIcon: React.FC<IconProps> = ({ size = 14, className }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="7" cy="7" r="6" fill="#F22267" />
    <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const StatusCompletedIcon: React.FC<IconProps> = ({ size = 14, className }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="7" cy="7" r="6" fill="#00C898" />
    <path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StatusPendingIcon: React.FC<IconProps> = ({ size = 14, className }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="7" cy="7" r="6" fill="#6C6E83" />
    <circle cx="4.5" cy="7" r="1" fill="white" />
    <circle cx="7" cy="7" r="1" fill="white" />
    <circle cx="9.5" cy="7" r="1" fill="white" />
  </svg>
);

export const StatusRunningIcon: React.FC<IconProps> = ({ size = 14, className }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="7" cy="7" r="6" fill="#3E68FF" />
    <path d="M5 4.5L10 7L5 9.5V4.5Z" fill="white" />
  </svg>
);

export const StatusStoppedIcon: React.FC<IconProps> = ({ size = 14, className }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="7" cy="7" r="6" fill="#FFB45D" />
    <rect x="4.5" y="4.5" width="5" height="5" rx="1" fill="white" />
  </svg>
);

// ── Page Nav Icons (20px) ─────────────────────────────────────────────────────

export const HomeIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.6169 2 12 2C13.3831 2 14.5817 2.86667 16.979 4.6L18.4189 5.64106C20.346 7.03443 21.3095 7.73112 21.7438 8.74938C22.1781 9.76763 22.0016 10.9162 21.6486 13.2135L21.3476 15.1724C20.8471 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5537 22 13.1388 22H10.8612C7.44633 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9.00127 22L8.75064 18.4911C8.61589 16.6046 10.11 15 12.0013 15C13.8926 15 15.3867 16.6046 15.2519 18.4911L15.0013 22" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ScansIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M20.5 5.5C20.5 7.15685 19.1569 8.5 17.5 8.5C15.8431 8.5 14.5 7.15685 14.5 5.5C14.5 3.84315 15.8431 2.5 17.5 2.5C19.1569 2.5 20.5 3.84315 20.5 5.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 11.5C8.5 13.1569 7.15685 14.5 5.5 14.5C3.84315 14.5 2.5 13.1569 2.5 11.5C2.5 9.84315 3.84315 8.5 5.5 8.5C7.15685 8.5 8.5 9.84315 8.5 11.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M21.5 18.5C21.5 20.1569 20.1569 21.5 18.5 21.5C16.8431 21.5 15.5 20.1569 15.5 18.5C15.5 16.8431 16.8431 15.5 18.5 15.5C20.1569 15.5 21.5 16.8431 21.5 18.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14.5348 4.58109C14.1554 4.52765 13.7677 4.5 13.3733 4.5C10.2974 4.5 7.62058 6.18227 6.24054 8.66317M19.7131 7.49453C20.8311 8.86497 21.5 10.6056 21.5 12.5C21.5 13.8758 21.1472 15.1705 20.5258 16.3012M15.8816 20.1117C15.0917 20.3638 14.2486 20.5 13.3733 20.5C9.58287 20.5 6.39853 17.9454 5.5 14.4898" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const PoliciesIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M11.4706 22C7.47751 22 5.48098 22 4.24049 20.8284C3 19.6569 3 17.7712 3 14L3 10C3 6.22876 3 4.34315 4.24049 3.17157C5.48098 2 7.47752 2 11.4706 2L12.5294 2C16.5225 2 18.519 2 19.7595 3.17157C21 4.34315 21 6.22876 21 10M11.5 22H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 7H16M8 12H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17.5 18.5896L16.5978 21.7428C16.5572 21.9011 16.7139 22.0385 16.8659 21.9778L18.8514 21.1848C18.9468 21.1468 19.0532 21.1468 19.1486 21.1848L21.1531 21.9854C21.3014 22.0446 21.456 21.9149 21.4231 21.7589L20.6589 18.4911M22 15.9951C22 14.341 20.6569 13 19 13C17.3431 13 16 14.341 16 15.9951C16 17.6493 17.3431 18.9902 19 18.9902C20.6569 18.9902 22 17.6493 22 15.9951Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const ReportsIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M6.5 17.5L6.5 14.5M11.5 17.5L11.5 8.5M16.5 17.5V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21.5 5.5C21.5 7.15685 20.1569 8.5 18.5 8.5C16.8431 8.5 15.5 7.15685 15.5 5.5C15.5 3.84315 16.8431 2.5 18.5 2.5C20.1569 2.5 21.5 3.84315 21.5 5.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M21.4955 11C21.4955 11 21.5 11.3395 21.5 12C21.5 16.4784 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4784 2.5 12C2.5 7.52169 2.5 5.28252 3.89124 3.89127C5.28249 2.50003 7.52166 2.50003 12 2.50003L13 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const InventoryIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 9H22M2 15H22M9 2V22" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const SecurityIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M11.9982 2C8.99043 2 7.04018 4.01899 4.73371 4.7549C3.79589 5.05413 3.32697 5.20374 3.1372 5.41465C2.94743 5.62556 2.89186 5.93375 2.78072 6.55013C1.59143 13.146 4.1909 19.244 10.3903 21.6175C11.0564 21.8725 11.3894 22 12.0015 22C12.6135 22 12.9466 21.8725 13.6126 21.6175C19.8116 19.2439 22.4086 13.146 21.219 6.55013C21.1078 5.93364 21.0522 5.6254 20.8624 5.41449C20.6726 5.20358 20.2037 5.05405 19.2659 4.75499C16.9585 4.01915 15.0061 2 11.9982 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 13C9 13 10 13 11 15C11 15 14.1765 10 17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TelescopeIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M3 9L9 3L19 13L13 19L3 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 3L12 6M19 13L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 14L7 21M14 10L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const PlayCircleIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 8.5L16 12L10 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const InfrastructureIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M14 2H10C6.72077 2 5.08116 2 3.91891 2.81382C3.48891 3.1149 3.1149 3.48891 2.81382 3.91891C2 5.08116 2 6.72077 2 10C2 13.2792 2 14.9188 2.81382 16.0811C3.1149 16.5111 3.48891 16.8851 3.91891 17.1862C5.08116 18 6.72077 18 10 18H14C17.2792 18 18.9188 18 20.0811 17.1862C20.5111 16.8851 20.8851 16.5111 21.1862 16.0811C22 14.9188 22 13.2792 22 10C22 6.72077 22 5.08116 21.1862 3.91891C20.8851 3.48891 20.5111 3.1149 20.0811 2.81382C18.9188 2 17.2792 2 14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 15H13M14.5 22L14.1845 21.5811C13.4733 20.6369 13.2969 19.1944 13.7468 18M9.5 22L9.8155 21.5811C10.5267 20.6369 10.7031 19.1944 10.2532 18M7 22H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const AccessRequestsIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M4 18.6458V19.5C4 20.8807 5.11929 22 6.5 22C7.88071 22 9 20.8807 9 19.5V18.6458M4 18.6458C3.07906 18.3499 2 17.5955 2 16V7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V16C22 17.5955 20.921 18.3499 20 18.6458M4 18.6458C4.48653 18.8 5.00979 18.9 5.5 18.9H18.5C19.0195 18.9 19.5135 18.8 20 18.6458M20 18.6458V19.5C20 20.8807 18.8807 22 17.5 22C16.1193 22 15 20.8807 15 19.5V18.6458M12 7V13M12 13L14.5 10.5M12 13L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AuditIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M9 12.5L11 14.5L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4784 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4784 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4784 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4784 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Cloud providers ───────────────────────────────────────────────────────────

export const AWSIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M6.763 10.036c0 .296.032.534.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.503.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.264-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.503 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.814-.415.304-.096.623-.144.95-.144.167 0 .343.008.51.024.176.016.336.048.487.08.144.04.279.08.406.128.128.048.224.096.288.144a.59.59 0 0 1 .191.2.655.655 0 0 1 .048.24v.376c0 .167-.064.255-.184.255a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.743.167-1.142.167z" fill="currentColor"/>
  </svg>
);

export const GCPIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 6.5L14.5 3H9.5L12 6.5Z" fill="#EA4335" />
    <path d="M15.5 7.5L19 5.5L17 9L15.5 7.5Z" fill="#FBBC05" />
    <path d="M19 13.5C19 16.538 16.538 19 13.5 19V21C17.642 21 21 17.642 21 13.5H19Z" fill="#4285F4" />
    <path d="M5 13.5C5 10.462 7.462 8 10.5 8V6C6.358 6 3 9.358 3 13.5H5Z" fill="#34A853" />
    <circle cx="13.5" cy="13.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const AzureIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M13.5 3L7 13.5L10.5 19.5H21L13.5 3Z" fill="#0078D4" opacity="0.8" />
    <path d="M3 19.5L10.5 19.5L7 13.5L3 19.5Z" fill="#0078D4" />
    <path d="M13.5 3L7 13.5L14 13.5L13.5 3Z" fill="#0078D4" opacity="0.5" />
  </svg>
);

export const EntraIDIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 2L3 7V12C3 16.418 7.03 20.571 12 22C16.97 20.571 21 16.418 21 12V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Scan-specific ─────────────────────────────────────────────────────────────

export const ScanRunIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 5.5L11 8L6.5 10.5V5.5Z" fill="currentColor" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
  </svg>
);

// ── Domain nav icons ──────────────────────────────────────────────────────────

export const IdentitiesNavIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M20.774 18C21.5233 18 22.1192 17.5285 22.6544 16.8691C23.7498 15.5194 21.9512 14.4408 21.2653 13.9126C20.5679 13.3756 19.7893 13.0714 18.9999 13M17.9999 11C19.3806 11 20.4999 9.88071 20.4999 8.5C20.4999 7.11929 19.3806 6 17.9999 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.22589 18C2.47659 18 1.8806 17.5285 1.34548 16.8691C0.25002 15.5194 2.0486 14.4408 2.73458 13.9126C3.43191 13.3756 4.21051 13.0714 4.99993 13M5.49993 11C4.11922 11 2.99993 9.88071 2.99993 8.5C2.99993 7.11929 4.11922 6 5.49993 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.0837 15.1112C7.06192 15.743 4.38288 17.0331 6.01459 18.6474C6.81167 19.436 7.69941 20 8.81552 20H15.1843C16.3004 20 17.1881 19.436 17.9852 18.6474C19.6169 17.0331 16.9379 15.743 15.9161 15.1112C13.52 13.6296 10.4798 13.6296 8.0837 15.1112Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.4999 7.5C15.4999 9.433 13.9329 11 11.9999 11C10.0669 11 8.49989 9.433 8.49989 7.5C8.49989 5.567 10.0669 4 11.9999 4C13.9329 4 15.4999 5.567 15.4999 7.5Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const RulesNavIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944L20.4961 9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2L14.7461 2C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5L9.24609 5.5C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M13.5 11H17M7 12C7 12 7.5 12 8 13C8 13 9.58824 10.5 11 10M13.5 17H17M8 17H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ApplicationsAccessReviewNavIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M7 2C4.23858 2 2 4.23858 2 7C2 8.85071 3.0055 10.4666 4.5 11.3311V17.8431C4.5 18.6606 4.5 19.0694 4.65224 19.4369C4.80448 19.8045 5.09351 20.0935 5.67157 20.6716L7 22L9.10819 19.8918C9.20542 19.7946 9.25407 19.7459 9.2944 19.6932C9.40031 19.5547 9.46816 19.3909 9.49122 19.218C9.5 19.1522 9.5 19.0834 9.5 18.9459C9.5 18.8346 9.5 18.779 9.4941 18.7249C9.47864 18.5831 9.43303 18.4463 9.36035 18.3236C9.33263 18.2768 9.29924 18.2323 9.23246 18.1433L8 16.5L8.7 15.5667C9.09649 15.038 9.29473 14.7737 9.39737 14.4658C9.5 14.1579 9.5 13.8275 9.5 13.1667V11.3311C10.9945 10.4666 12 8.85071 12 7C12 4.23858 9.76142 2 7 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 7H7.00898M13 14H19C19.9319 14 20.3978 14 20.7654 14.1522C21.2554 14.3552 21.6448 14.7446 21.8478 15.2346C22 15.6022 22 16.0681 22 17C22 17.9319 22 18.3978 21.8478 18.7654C21.6448 19.2554 21.2554 19.6448 20.7654 19.8478C20.3978 20 19.9319 20 19 20H13M15 5H19C19.9319 5 20.3978 5 20.7654 5.15224C21.2554 5.35523 21.6448 5.74458 21.8478 6.23463C22 6.60218 22 7.06812 22 8C22 8.93188 22 9.39782 21.8478 9.76537C21.6448 10.2554 21.2554 10.6448 20.7654 10.8478C20.3978 11 19.9319 11 19 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const AppsAndSecuredItemsNavIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8V6ZM2 19C2 18.0681 2 17.6022 2.15224 17.2346C2.35523 16.7446 2.74458 16.3552 3.23463 16.1522C3.60218 16 4.06812 16 5 16H7C7.93188 16 8.39782 16 8.76537 16.1522C9.25542 16.3552 9.64477 16.7446 9.84776 17.2346C10 17.6022 10 18.0681 10 19C10 19.9319 10 20.3978 9.84776 20.7654C9.64477 21.2554 9.25542 21.6448 8.76537 21.8478C8.39782 22 7.93188 22 7 22H5C4.06812 22 3.60218 22 3.23463 21.8478C2.74458 21.6448 2.35523 21.2554 2.15224 20.7654C2 20.3978 2 19.9319 2 19ZM14 16C14 14.1144 14 13.1716 14.5858 12.5858C15.1716 12 16.1144 12 18 12C19.8856 12 20.8284 12 21.4142 12.5858C22 13.1716 22 14.1144 22 16V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V16ZM14 5C14 4.06812 14 3.60218 14.1522 3.23463C14.3552 2.74458 14.7446 2.35523 15.2346 2.15224C15.6022 2 16.0681 2 17 2H19C19.9319 2 20.3978 2 20.7654 2.15224C21.2554 2.35523 21.6448 2.74458 21.8478 3.23463C22 3.60218 22 4.06812 22 5C22 5.93188 22 6.39782 21.8478 6.76537C21.6448 7.25542 21.2554 7.64477 20.7654 7.84776C20.3978 8 19.9319 8 19 8H17C16.0681 8 15.6022 8 15.2346 7.84776C14.7446 7.64477 14.3552 7.25542 14.1522 6.76537C14 6.39782 14 5.93188 14 5Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ThreatDetectionAndResponse: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11.9959 12H12.0049M12 2V6M22 12L18 12M12 18V22M6 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SessionMonitoring: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M14 2H10C6.72077 2 5.08116 2 3.91891 2.81382C3.48891 3.1149 3.1149 3.48891 2.81382 3.91891C2 5.08116 2 6.72077 2 10C2 13.2792 2 14.9188 2.81382 16.0811C3.1149 16.5111 3.48891 16.8851 3.91891 17.1862C5.08116 18 6.72077 18 10 18H14C17.2792 18 18.9188 18 20.0811 17.1862C20.5111 16.8851 20.8851 16.5111 21.1862 16.0811C22 14.9188 22 13.2792 22 10C22 6.72077 22 5.08116 21.1862 3.91891C20.8851 3.48891 20.5111 3.1149 20.0811 2.81382C18.9188 2 17.2792 2 14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 15H13M14.5 22L14.1845 21.5811C13.4733 20.6369 13.2969 19.1944 13.7468 18M9.5 22L9.8155 21.5811C10.5267 20.6369 10.7031 19.1944 10.2532 18M7 22H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SystemActivitiesNavIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M14 2H10C6.72077 2 5.08116 2 3.91891 2.81382C3.48891 3.1149 3.1149 3.48891 2.81382 3.91891C2 5.08116 2 6.72077 2 10C2 13.2792 2 14.9188 2.81382 16.0811C3.1149 16.5111 3.48891 16.8851 3.91891 17.1862C5.08116 18 6.72077 18 10 18H14C17.2792 18 18.9188 18 20.0811 17.1862C20.5111 16.8851 20.8851 16.5111 21.1862 16.0811C22 14.9188 22 13.2792 22 10C22 6.72077 22 5.08116 21.1862 3.91891C20.8851 3.48891 20.5111 3.1149 20.0811 2.81382C18.9188 2 17.2792 2 14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 15H13M14.5 22L14.1845 21.5811C13.4733 20.6369 13.2969 19.1944 13.7468 18M9.5 22L9.8155 21.5811C10.5267 20.6369 10.7031 19.1944 10.2532 18M7 22H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const AccessCertificationNavIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M9 12.5L11 14.5L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4784 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4784 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4784 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4784 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const HealthDiagnosticsNavIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4784 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4784 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4784 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4784 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 12H9.5L11 9L13 15L14.5 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DeploymentNavIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LicenseUsageNavIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M2 9C2 6.17157 2 4.75736 2.87868 3.87868C3.75736 3 5.17157 3 8 3H16C18.8284 3 20.2426 3 21.1213 3.87868C22 4.75736 22 6.17157 22 9V15C22 17.8284 22 19.2426 21.1213 20.1213C20.2426 21 18.8284 21 16 21H8C5.17157 21 3.75736 21 2.87868 20.1213C2 19.2426 2 17.8284 2 15V9Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7V12L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── General UI icons ──────────────────────────────────────────────────────────

export const ExternalLinkIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
    <path d="M13.6522 2.34521L9.95272 6.03454M13.6522 2.34521C13.3229 2.01553 11.1045 2.04626 10.6355 2.05293M13.6522 2.34521C13.9815 2.67488 13.9508 4.89572 13.9442 5.36523" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.39903 2.00186C4.96644 2.00624 3.6926 2.06596 2.87853 2.88002C2 3.75852 2 5.17245 2 8.00028C2 10.8282 2 12.2421 2.87853 13.1206C3.75705 13.9991 5.17102 13.9991 7.99898 13.9991C10.8269 13.9991 12.2409 13.9991 13.1194 13.1206C13.9334 12.3066 13.9932 11.0327 13.9976 8.60021" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CloseSmIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
    <path d="M12.667 3.33325L3.33362 12.6666M3.33362 3.33325L12.667 12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SortUpDownIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
    <path d="M11.3331 13.3334L10.8028 13.8637L11.3332 14.394L11.8635 13.8637L11.3331 13.3334ZM12.0832 2.66669C12.0832 2.25247 11.7474 1.91669 11.3332 1.91669C10.9189 1.91669 10.5832 2.25247 10.5832 2.66669L11.3332 2.66669L12.0832 2.66669ZM14.5302 11.197C14.8231 10.9041 14.8231 10.4292 14.5302 10.1364C14.2373 9.84346 13.7624 9.84346 13.4695 10.1364L13.9999 10.6667L14.5302 11.197ZM10.5831 12.8734C10.5831 13.2876 10.9189 13.6234 11.3331 13.6234C11.7474 13.6234 12.0831 13.2877 12.0831 12.8734L11.3331 12.8734L10.5831 12.8734ZM13.9999 10.6667L13.4695 10.1364L10.8028 12.8031L11.3331 13.3334L11.8635 13.8637L14.5302 11.197L13.9999 10.6667ZM11.3331 13.3334L11.8635 12.8031L9.19671 10.1364L8.66638 10.6667L8.13606 11.197L10.8028 13.8637L11.3331 13.3334ZM11.3331 12.8734L12.0831 12.8734L12.0832 2.66669L11.3332 2.66669L10.5832 2.66669L10.5831 12.8734L11.3331 12.8734Z" fill="currentColor" />
    <path d="M4.66651 2.66669L5.19684 2.13635C5.05618 1.9957 4.86542 1.91668 4.6665 1.91669C4.46759 1.91669 4.27682 1.99571 4.13617 2.13637L4.66651 2.66669ZM3.91655 13.3333C3.91655 13.7475 4.25234 14.0833 4.66656 14.0833C5.08077 14.0833 5.41655 13.7475 5.41655 13.3333L4.66655 13.3333L3.91655 13.3333ZM6.80301 5.86379C7.09591 6.15668 7.57078 6.15667 7.86367 5.86378C8.15656 5.57088 8.15655 5.09601 7.86366 4.80312L7.33333 5.33345L6.80301 5.86379ZM5.41651 2.95088C5.41651 2.53667 5.08072 2.20088 4.66651 2.20088C4.2523 2.20088 3.91651 2.53667 3.91651 2.95089L4.66651 2.95088L5.41651 2.95088ZM2 5.33331L2.53034 5.86363L5.19685 3.19701L4.66651 2.66669L4.13617 2.13637L1.46966 4.80299L2 5.33331ZM4.66651 2.66669L4.13619 3.19702L6.80301 5.86379L7.33333 5.33345L7.86366 4.80312L5.19684 2.13635L4.66651 2.66669ZM4.66651 2.95088L3.91651 2.95089L3.91655 13.3333L4.66655 13.3333L5.41655 13.3333L5.41651 2.95088L4.66651 2.95088Z" fill="currentColor" />
  </svg>
);

export const ServiceMoveIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M13 19.2559C12.4477 19.2559 12 18.8081 12 18.2559C12 17.7036 12.4477 17.2559 13 17.2559L17.5 17.2559L17.5 16.6616C17.4999 16.486 17.4997 16.2703 17.5218 16.0939L17.5222 16.0905C17.538 15.9641 17.6098 15.388 18.1754 15.1137C18.7422 14.8387 19.2424 15.1407 19.3506 15.206L19.819 15.5451C20.1949 15.8397 20.7093 16.2454 21.1003 16.6259C21.2954 16.8157 21.4967 17.033 21.6555 17.2639C21.7967 17.4691 22 17.8193 22 18.25C22 18.6807 21.7967 19.0309 21.6555 19.2361C21.4967 19.467 21.2954 19.6843 21.1003 19.8741C20.7093 20.2546 20.1949 20.6602 19.8191 20.9549L19.3506 21.294C19.2424 21.3593 18.7422 21.6613 18.1754 21.3863C17.6098 21.112 17.538 20.5359 17.5222 20.4095L17.5218 20.4061C17.4997 20.2297 17.4999 20.014 17.5 19.8384L17.5 19.2559H13Z" fill="currentColor" />
    <path d="M13.0288 2H10.9712C9.02294 1.99997 7.45141 1.99994 6.21533 2.17961C4.92535 2.3671 3.8568 2.76781 3.01802 3.6746C2.18949 4.57031 1.83279 5.69272 1.66416 7.04866C1.49997 8.36894 1.49998 10.0541 1.5 12.1739V12.8261C1.49998 14.9459 1.49997 16.6311 1.66416 17.9513C1.83279 19.3073 2.18949 20.4297 3.01802 21.3254C3.8568 22.2322 4.92535 22.6329 6.21533 22.8204C7.45142 23.0001 9.02293 23 10.9712 23H11.05C11.6023 23 12.05 22.5523 12.05 22C12.05 21.4477 11.6023 21 11.05 21C9.00425 21 7.57858 20.9975 6.503 20.8412C5.4647 20.6903 4.89956 20.4142 4.48622 19.9673C4.06263 19.5094 3.79327 18.8656 3.64887 17.7045C3.50182 16.5221 3.5 14.9616 3.5 12.7568V12.2432C3.5 11.1847 3.50042 10.2746 3.51713 9.48363C3.52283 9.2139 3.74413 9 4.01391 9H19.986C20.2558 9 20.4771 9.21402 20.4828 9.48374C20.4955 10.0821 20.499 10.7502 20.4997 11.501V13C20.4997 13.5523 20.9475 14 21.4997 14C22.052 14 22.4997 13.5523 22.4997 13V11.499C22.4977 9.58334 22.4813 8.04001 22.3041 6.81198C22.1236 5.56147 21.7617 4.51759 20.982 3.6746C20.1432 2.76781 19.0747 2.3671 17.7847 2.17961C16.5486 1.99994 14.9771 1.99997 13.0288 2Z" fill="currentColor" />
    <path d="M7 2C7 1.44772 6.55228 1 6 1C5.44772 1 5 1.44772 5 2V2.44885C5.38032 2.32821 5.78554 2.24208 6.21533 2.17961C6.46328 2.14357 6.72472 2.11476 7 2.09173V2Z" fill="currentColor" />
    <path d="M19 2.44885C18.6197 2.32821 18.2145 2.24208 17.7847 2.17961C17.5367 2.14357 17.2753 2.11476 17 2.09173V2C17 1.44772 17.4477 1 18 1C18.5523 1 19 1.44772 19 2V2.44885Z" fill="currentColor" />
  </svg>
);

// ── Search & Filter ───────────────────────────────────────────────────────────

export const SearchInputIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <g clipPath="url(#search-clip)">
      <path d="M11.6667 11.6667L14.6667 14.6667M13.3333 7.33337C13.3333 4.01967 10.6471 1.33337 7.33334 1.33337C4.01963 1.33337 1.33334 4.01967 1.33334 7.33337C1.33334 10.6471 4.01963 13.3334 7.33334 13.3334C10.6471 13.3334 13.3333 10.6471 13.3333 7.33337Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="search-clip"><rect width="16" height="16" fill="white" /></clipPath>
    </defs>
  </svg>
);

export const FilterSettingsIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M3 7H6M12 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 17H18M24 17H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="15" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// ── Nav aliases (backward compat) ─────────────────────────────────────────────
export { HomeIcon as HomeNavIcon };
export { ScansIcon as ScansNavIcon };
export { PoliciesIcon as PoliciesNavIcon };
export { InfrastructureIcon as InfrastructureNavIcon };
export { AccessRequestsIcon as AccessRequestsNavIcon };
export { AuditIcon as AuditNavIcon };
export { ReportsIcon as ReportsNavIcon };
export { InventoryIcon as InventoryNavIcon };
export { SecurityIcon as SecurityInsightsNavIcon };
