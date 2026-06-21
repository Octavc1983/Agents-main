import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  'aria-label'?: string;
}

// ── Platform Icons ────────────────────────────────────────────────────────────
// 32×32 viewBox. Use currentColor only where the icon is monochrome.
// Brand-colored icons use hard-coded fills per official brand guidelines.

export const WindowsPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M3 6.5L14 4.9V14.5H3V6.5Z" fill="#00ADEF"/>
    <path d="M15 4.7L29 2.5V14.5H15V4.7Z" fill="#00ADEF"/>
    <path d="M3 15.5H14V25.1L3 23.5V15.5Z" fill="#00ADEF"/>
    <path d="M15 15.5H29V27.5L15 25.3V15.5Z" fill="#00ADEF"/>
  </svg>
);

export const LinuxPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M16 3C12 3 9 6.5 9 11C9 13.5 9.8 15.7 11.2 17.2C10.4 18 10 19 10 20V22C10 22.6 10.4 23 11 23H21C21.6 23 22 22.6 22 22V20C22 19 21.6 18 20.8 17.2C22.2 15.7 23 13.5 23 11C23 6.5 20 3 16 3Z" stroke="#FCC624" strokeWidth="1.5" fill="none"/>
    <circle cx="13.5" cy="12" r="1.5" fill="#FCC624"/>
    <circle cx="18.5" cy="12" r="1.5" fill="#FCC624"/>
    <path d="M13 16.5C13 16.5 14 18 16 18C18 18 19 16.5 19 16.5" stroke="#FCC624" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M12 23V26C12 26.6 12.4 27 13 27H14C14.6 27 15 26.6 15 26V23" stroke="#FCC624" strokeWidth="1.3"/>
    <path d="M17 23V26C17 26.6 17.4 27 18 27H19C19.6 27 20 26.6 20 26V23" stroke="#FCC624" strokeWidth="1.3"/>
  </svg>
);

export const AWSPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M9 20.5C6.8 21.3 5 22.5 5 23.5C5 25 8.2 26 12 26C13.2 26 14.3 25.9 15.2 25.7" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M23 20.5C25.2 21.3 27 22.5 27 23.5C27 25 23.8 26 20 26C18.8 26 17.7 25.9 16.8 25.7" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.5 13L10.5 20L13.5 12L16 18.5L18.5 12L21.5 20L24.5 13" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AzurePlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M10 5L4 22H11L16 12L21 27H28L22 14L16 5H10Z" fill="#0078D4"/>
    <path d="M16 12L11 22L4 22L11 22H11L16 27H21L16 12Z" fill="#50E6FF" opacity="0.7"/>
  </svg>
);

export const GCPPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M20.5 11.5H22.5C24.2 11.5 25.5 12.8 25.5 14.5V17.5C25.5 19.2 24.2 20.5 22.5 20.5H16V17.5H22.5V14.5H20.5V11.5Z" fill="#4285F4"/>
    <path d="M11.5 11.5H16V14.5H11.5C10.1 14.5 9 15.6 9 17C9 18.4 10.1 19.5 11.5 19.5H16V22.5H11.5C8.5 22.5 6 20 6 17C6 14 8.5 11.5 11.5 11.5Z" fill="#EA4335"/>
    <path d="M16 9.5L19 6.5L22 9.5" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 9.5C22 9.5 25 10.5 25.5 14.5" stroke="#FBBC05" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 17C6 17 6 22 10 24" stroke="#34A853" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const OraclePlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <rect x="3" y="11" width="26" height="10" rx="5" fill="#F80000"/>
    <path d="M8 11H13C15.8 11 18 13.2 18 16C18 18.8 15.8 21 13 21H8C5.2 21 3 18.8 3 16C3 13.2 5.2 11 8 11Z" fill="#CC0000"/>
  </svg>
);

export const SAPPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <rect x="3" y="3" width="26" height="26" rx="4" fill="#0070F2"/>
    <text x="6" y="23" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="white">SAP</text>
  </svg>
);

export const UbuntuPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <circle cx="16" cy="16" r="13" stroke="#E95420" strokeWidth="1.5" fill="none"/>
    <circle cx="16" cy="7" r="2.5" fill="#E95420"/>
    <circle cx="8" cy="21" r="2.5" fill="#E95420"/>
    <circle cx="24" cy="21" r="2.5" fill="#E95420"/>
    <path d="M16 9.5L9.5 19.5M16 9.5L22.5 19.5M9.5 19.5H22.5" stroke="#E95420" strokeWidth="1.5"/>
  </svg>
);

export const MacOSPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M20 4C20 4 20.5 7 18 8.5C15.5 10 13 8 13 8C13 8 13 5 15.5 4C18 3 20 4 20 4Z" fill="currentColor" opacity="0.8"/>
    <path d="M12.5 10.5C10.5 10.5 7 12.5 7 17.5C7 22.5 10 27.5 13 27.5C14.5 27.5 15.5 26.5 16.5 26.5C17.5 26.5 18.5 27.5 20 27.5C23 27.5 25 22 25.5 20C24 19.5 22 18 22 15.5C22 13 24 11.5 24 11.5C22.5 9.5 20.5 9.5 19.5 9.5C18 9.5 17 10.5 16.5 10.5C16 10.5 14.5 10.5 12.5 10.5Z" fill="currentColor"/>
  </svg>
);

export const DockerPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <rect x="5" y="13" width="4" height="4" rx="0.5" fill="#2496ED"/>
    <rect x="10" y="13" width="4" height="4" rx="0.5" fill="#2496ED"/>
    <rect x="15" y="13" width="4" height="4" rx="0.5" fill="#2496ED"/>
    <rect x="10" y="8" width="4" height="4" rx="0.5" fill="#2496ED"/>
    <rect x="15" y="8" width="4" height="4" rx="0.5" fill="#2496ED"/>
    <rect x="15" y="3" width="4" height="4" rx="0.5" fill="#2496ED"/>
    <path d="M27 16C27 16 26.5 14 24.5 14C24.5 14 24 11 21 11" stroke="#2496ED" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M3 18C3 18 4 22 8 22H21C24.5 22 26 20 26.5 18" stroke="#2496ED" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

export const KubernetesPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M16 4L27 9.5V22.5L16 28L5 22.5V9.5L16 4Z" stroke="#326CE5" strokeWidth="1.5" fill="none"/>
    <circle cx="16" cy="16" r="3" fill="#326CE5"/>
    <path d="M16 13V8M16 24V19M11.3 18.5L7 21M25 11L20.7 13.5M11.3 13.5L7 11M25 21L20.7 18.5" stroke="#326CE5" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

export const GitHubPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M16 3C8.8 3 3 8.8 3 16C3 21.8 6.8 26.7 12.1 28.4C12.8 28.5 13 28.1 13 27.7V25.3C9.2 26.1 8.4 23.6 8.4 23.6C7.8 22.1 6.9 21.7 6.9 21.7C5.7 20.9 7 20.9 7 20.9C8.3 21 9 22.2 9 22.2C10.2 24.2 12.2 23.6 13 23.3C13.1 22.4 13.5 21.8 13.9 21.5C10.8 21.1 7.6 20 7.6 14.7C7.6 13.3 8.1 12.1 9 11.2C8.9 10.9 8.4 9.5 9.1 7.7C9.1 7.7 10.2 7.4 13 9.1C14.2 8.8 15.6 8.6 16 8.6C16.4 8.6 17.8 8.8 19 9.1C21.8 7.4 22.9 7.7 22.9 7.7C23.6 9.5 23.1 10.9 23 11.2C23.9 12.1 24.4 13.3 24.4 14.7C24.4 20 21.2 21.1 18.1 21.4C18.6 21.9 19 22.8 19 24.1V27.7C19 28.1 19.2 28.5 20 28.4C25.2 26.7 29 21.8 29 16C29 8.8 23.2 3 16 3Z" fill="currentColor"/>
  </svg>
);

export const GitLabPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M16 27L4 18L7 8L11 15H21L25 8L28 18L16 27Z" fill="#E24329"/>
    <path d="M16 27L21 15H28L16 27Z" fill="#FC6D26"/>
    <path d="M16 27L11 15H4L16 27Z" fill="#FC6D26"/>
    <path d="M25 8L21 15H28L25 8Z" fill="#FCA326"/>
    <path d="M7 8L11 15H4L7 8Z" fill="#FCA326"/>
  </svg>
);

export const PostgreSQLPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <ellipse cx="16" cy="10" rx="10" ry="4" stroke="#336791" strokeWidth="1.5" fill="none"/>
    <path d="M6 10V22C6 24.2 10.5 26 16 26C21.5 26 26 24.2 26 22V10" stroke="#336791" strokeWidth="1.5"/>
    <path d="M26 16C26 18.2 21.5 20 16 20C10.5 20 6 18.2 6 16" stroke="#336791" strokeWidth="1.3"/>
    <path d="M23 9C24 10 25 12 25 14" stroke="#336791" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M25 14V27" stroke="#336791" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

export const MySQLPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <ellipse cx="16" cy="10" rx="10" ry="4" fill="#F29111" opacity="0.2" stroke="#F29111" strokeWidth="1.5"/>
    <path d="M6 10V22C6 24.2 10.5 26 16 26C21.5 26 26 24.2 26 22V10" stroke="#F29111" strokeWidth="1.5"/>
    <path d="M6 16C6 18.2 10.5 20 16 20C21.5 20 26 18.2 26 16" stroke="#F29111" strokeWidth="1.3"/>
    <path d="M21 4L21 8" stroke="#F29111" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M21 4C22.5 2 25 2 25 4C25 6 23 7 21 8" stroke="#F29111" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

export const SalesforcePlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M13 9C13 9 11 8 9 9.5C7 11 7 14 9 15.5C7.5 16 6 17.5 6 19.5C6 21.5 7.5 23 9.5 23H23C25.2 23 27 21.2 27 19C27 17 25.5 15.3 23.5 15.1C23.8 14.5 24 13.8 24 13C24 10.8 22.2 9 20 9C19 9 18 9.4 17.3 10.1C16.5 9 15.3 8.5 14 8.5C13.6 8.5 13.3 8.5 13 9Z" fill="#00A1E0"/>
  </svg>
);

export const JenkinsPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M16 4C11 4 7 8 7 13C7 16 8.5 18.5 10.8 20L10 28H22L21.2 20C23.5 18.5 25 16 25 13C25 8 21 4 16 4Z" stroke="#D33833" strokeWidth="1.5" fill="none"/>
    <circle cx="13.5" cy="12" r="1.5" fill="#D33833"/>
    <circle cx="18.5" cy="12" r="1.5" fill="#D33833"/>
    <path d="M13 17C13 17 14 18.5 16 18.5C18 18.5 19 17 19 17" stroke="#D33833" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M12 22H20" stroke="#D33833" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

export const SlackPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M12 7C12 5.9 11.1 5 10 5C8.9 5 8 5.9 8 7V13C8 14.1 8.9 15 10 15C11.1 15 12 14.1 12 13V7Z" fill="#E01E5A"/>
    <path d="M12 21C12 19.9 11.1 19 10 19C8.9 19 8 19.9 8 21C8 22.1 8.9 23 10 23H12V21Z" fill="#E01E5A"/>
    <path d="M25 12C25 10.9 24.1 10 23 10C21.9 10 21 10.9 21 12C21 13.1 21.9 14 23 14H25V12Z" fill="#ECB22E"/>
    <path d="M17 12C17 10.9 16.1 10 15 10V10C13.9 10 13 10.9 13 12V22C13 23.1 13.9 24 15 24C16.1 24 17 23.1 17 22V12Z" fill="#ECB22E"/>
    <path d="M20 20C21.1 20 22 19.1 22 18C22 16.9 21.1 16 20 16H14V18C14 19.1 14.9 20 16 20H20Z" fill="#2EB67D"/>
    <path d="M20 10C21.1 10 22 9.1 22 8C22 6.9 21.1 6 20 6H20V10Z" fill="#2EB67D"/>
    <path d="M19 26C19 27.1 19.9 28 21 28C22.1 28 23 27.1 23 26V20H21C19.9 20 19 20.9 19 22V26Z" fill="#36C5F0"/>
    <path d="M7 20C5.9 20 5 20.9 5 22C5 23.1 5.9 24 7 24H7V20Z" fill="#36C5F0"/>
  </svg>
);

export const JiraPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M16 4L28 16L16 28L4 16L16 4Z" fill="none"/>
    <path d="M16 4L22 10L16 16L10 10L16 4Z" fill="#2684FF"/>
    <path d="M16 16L22 22L16 28L10 22L16 16Z" fill="#2684FF" opacity="0.5"/>
    <path d="M22 10L28 16L22 22L16 16L22 10Z" fill="#2684FF" opacity="0.7"/>
    <path d="M10 10L16 16L10 22L4 16L10 10Z" fill="#2684FF" opacity="0.7"/>
  </svg>
);

export const BitbucketPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M4 6H28L24 26H8L4 6Z" fill="#2684FF" opacity="0.2"/>
    <path d="M4 6H28L24 26H8L4 6Z" stroke="#2684FF" strokeWidth="1.5"/>
    <path d="M8 26L13 16H19L24 26" stroke="#2684FF" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M13 16L16 6L19 16" stroke="#2684FF" strokeWidth="1.3"/>
  </svg>
);

export const RHELPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <circle cx="16" cy="16" r="13" fill="none" stroke="#CC0000" strokeWidth="1.5"/>
    <path d="M10 12H16C18 12 19.5 13.3 19.5 15C19.5 16.7 18 18 16 18H10V12Z" fill="#CC0000"/>
    <path d="M16 18L20 24" stroke="#CC0000" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 12V24" stroke="#CC0000" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const DebianPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M16 4C10.5 4 6 8.5 6 14C6 17.5 7.8 20.5 10.5 22.3C10.5 24.5 11.5 27 14 28C13 25.5 13.5 23.5 15 22.8C15.3 22.8 15.7 22.8 16 22.8C21.5 22.8 26 18.3 26 12.8C26 10 24.8 7.5 23 5.8C21 4.3 18.6 3.7 16 4Z" fill="#D70751"/>
    <path d="M16 4C18 4 20 4.8 21.5 6.2C19.5 5.8 17 6 15 7.5C12 9.5 11 13 12.5 16C14 19 17.5 20 20 18.5C21 18 21.8 17 22 15.8C22.3 14 21 12.5 19.5 12.5" stroke="#D70751" strokeWidth="1" fill="none" opacity="0.3"/>
  </svg>
);

export const FedoraPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <circle cx="16" cy="16" r="13" fill="none" stroke="#294172" strokeWidth="1.5"/>
    <path d="M16 8V16M16 16H24" stroke="#3C6EB4" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M16 16C16 12 19 8 23 8C27 8 27 12 24 14C22 15 16 16 16 16Z" fill="#3C6EB4"/>
    <path d="M16 16V24C16 24 9 24 9 18C9 14 12 13 14 14" stroke="#294172" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const PythonPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M16 4C11 4 9 6 9 9V12H16H23V14C23 14 26 14 27 16C28 18 27 22 26 23C25 24 23 24 23 24V21H16H9V24C9 27 11 28 16 28C21 28 23 26 23 24V21H16V19H23H27C27 19 29 17 29 14V10C29 7 27 4 23 4H16Z" fill="#3776AB" opacity="0.9"/>
    <path d="M16 28C21 28 23 26 23 24V21H16H9C9 24 11 28 16 28Z" fill="#FFD43B" opacity="0.8"/>
    <circle cx="12.5" cy="9.5" r="1.5" fill="white"/>
    <circle cx="19.5" cy="22.5" r="1.5" fill="#3776AB"/>
  </svg>
);

export const SplunkPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M6 24L16 6L26 24H6Z" fill="none" stroke="#1FBCFF" strokeWidth="1.5"/>
    <path d="M10 24L16 12L22 24H10Z" fill="#1FBCFF" opacity="0.4"/>
    <path d="M13 24L16 18L19 24H13Z" fill="#1FBCFF"/>
  </svg>
);

export const ZoomPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <rect x="4" y="9" width="16" height="14" rx="3" fill="#2D8CFF"/>
    <path d="M20 14L28 10V22L20 18V14Z" fill="#2D8CFF"/>
  </svg>
);

export const GitPlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M29.5 15L17 2.5C16.4 1.8 15.2 1.8 14.5 2.5L12 5L15 8C15.6 7.8 16.3 7.9 16.9 8.5C17.5 9.1 17.6 9.8 17.4 10.4L20.3 13.3C20.9 13.1 21.7 13.2 22.2 13.8C22.9 14.4 22.9 15.5 22.2 16.2C21.5 16.9 20.4 16.9 19.8 16.2C19.2 15.6 19.1 14.7 19.4 14L16.7 11.3V19C16.9 19.1 17.1 19.3 17.3 19.5C18 20.2 18 21.3 17.3 22C16.6 22.7 15.5 22.7 14.8 22C14.1 21.3 14.1 20.2 14.8 19.5C15 19.3 15.3 19.1 15.5 19V10.9C15.3 10.8 15 10.6 14.8 10.4C14.2 9.8 14.1 9 14.4 8.4L11.5 5.5L2.5 14.5C1.8 15.2 1.8 16.4 2.5 17L15 29.5C15.7 30.2 16.8 30.2 17.5 29.5L29.5 17C30.2 16.3 30.2 15.7 29.5 15Z" fill="#F34F29"/>
  </svg>
);

export const ChromePlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <circle cx="16" cy="16" r="13" fill="none" stroke="#4285F4" strokeWidth="1.5"/>
    <circle cx="16" cy="16" r="5" fill="white" stroke="#4285F4" strokeWidth="1.5"/>
    <path d="M16 11H28" stroke="#EA4335" strokeWidth="3" strokeLinecap="round"/>
    <path d="M16 11L10 21" stroke="#34A853" strokeWidth="3" strokeLinecap="round"/>
    <path d="M10 21H22" stroke="#FBBC05" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="3" fill="#4285F4"/>
  </svg>
);

export const GooglePlatformIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <path d="M29 16.2C29 15.4 28.9 14.6 28.8 13.8H16V18.3H23.2C22.9 19.9 22 21.3 20.6 22.2V25.1H25C27.5 22.8 29 19.8 29 16.2Z" fill="#4285F4"/>
    <path d="M16 28C19.6 28 22.6 26.8 25 25.1L20.6 22.2C19.4 23 17.9 23.5 16 23.5C12.5 23.5 9.6 21.2 8.5 18H4V21C6.4 25.5 10.8 28 16 28Z" fill="#34A853"/>
    <path d="M8.5 18C8.2 17.2 8 16.4 8 15.5C8 14.6 8.2 13.8 8.5 13V10H4C3.1 11.9 2.6 14 2.6 16.2C2.6 18.4 3.1 20.5 4 22.3L8.5 18Z" fill="#FBBC05"/>
    <path d="M16 8C18.1 8 19.9 8.7 21.4 10.1L25.1 6.4C22.6 4.1 19.6 2.7 16 2.7C10.8 2.7 6.4 5.5 4 10L8.5 14C9.6 10.8 12.5 8 16 8Z" fill="#EA4335"/>
  </svg>
);
