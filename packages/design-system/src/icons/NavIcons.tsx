import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  'aria-label'?: string;
}

// ── Branding ──────────────────────────────────────────────────────────────────

export const IDIRALogoIcon: React.FC<IconProps> = ({ size = 32, className, 'aria-label': ariaLabel }) => (
  <svg width={size * (25 / 32)} height={size} viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
    <g clipPath="url(#idira-logo-clip)">
      <path d="M12.5532 23.1107V28.9078L0.0543188 21.7194L0.052002 7.34258L12.5532 0.154175L25.052 7.34258L19.9599 10.3571L12.5532 5.95128L5.14644 10.3571V18.9368L12.5532 23.1107Z" fill="#265BFF" />
      <path d="M12.552 23.1107L19.9594 18.8587V10.3571L12.552 14.6067V23.1107Z" fill="#265BFF" />
    </g>
    <defs>
      <clipPath id="idira-logo-clip">
        <rect width="25" height="32" fill="white" />
      </clipPath>
    </defs>
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

// Account status icons — 24×24 stroke style (no circle background)

export const StatusActiveIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M5.82171 9.18293C8.23539 4.91199 9.44222 2.77651 11.0983 2.22681C12.0093 1.9244 12.9907 1.9244 13.9017 2.22681C15.5578 2.77651 16.7646 4.91199 19.1783 9.18293C21.592 13.4539 22.7988 15.5893 22.4368 17.3293C22.2376 18.2866 21.7469 19.1549 21.035 19.8097C19.741 21 17.3274 21 12.5 21C7.67265 21 5.25897 21 3.96496 19.8097C3.25308 19.1549 2.76239 18.2866 2.56322 17.3293C2.20119 15.5893 3.40803 13.4539 5.82171 9.18293Z" stroke="#FFB45D" strokeWidth="1.5"/>
    <path d="M11.992 16H12.001" stroke="#FFB45D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13L12 9" stroke="#FFB45D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusLockedIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M14.491 15.5H14.5M9.5 15.5H9.50897" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12105 13.2453 4 14.3624 4 15.5C4 16.6376 4.12105 17.7547 4.26781 18.8447Z" stroke="white" strokeWidth="1.5"/>
    <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusInactiveIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="#F22267" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#F22267" strokeWidth="1.5"/>
  </svg>
);

export const StatusMarkedForDeletionIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M2.66669 10.0002C2.66669 10.0002 3.33335 9.3335 5.33335 9.3335C7.33335 9.3335 9.39785 9.87833 9.39785 9.87833C9.39785 9.87833 12.1993 10.4085 13.0054 9.61754C13.9802 8.66105 13.6771 3.76099 13.2227 2.46767C12.7683 1.17434 10.2237 2.16342 9.0936 2.00017C7.96352 1.83692 7.33335 1.3335 5.33335 1.3335C3.33335 1.3335 2.66669 2.00016 2.66669 2.00016L2.66669 14.6668" stroke="#FFB45D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.49158 7.02751L6.8252 4.36084M6.82548 7.02751L9.49186 4.36084" stroke="#FFB45D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusDeletedIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M18.8803 15.5251L18.1317 15.4788V15.4788L18.8803 15.5251ZM20.2486 5.54627C20.2741 5.13285 19.9597 4.77699 19.5463 4.75143C19.1329 4.72587 18.777 5.0403 18.7514 5.45373L19.5 5.5L20.2486 5.54627ZM5.24864 5.45481C5.22368 5.04134 4.86827 4.7264 4.45481 4.75136C4.04134 4.77632 3.7264 5.13173 3.75136 5.54519L4.5 5.5L5.24864 5.45481ZM5.10461 15.5152L5.85324 15.47L5.10461 15.5152ZM18.0008 20.2879L18.616 20.7168H18.616L18.0008 20.2879ZM16.8007 21.416L16.4105 20.7755L16.4105 20.7755L16.8007 21.416ZM5.97868 20.2848L6.59429 19.8564H6.59429L5.97868 20.2848ZM7.17905 21.4149L7.56959 20.7746V20.7746L7.17905 21.4149ZM3 4.75C2.58579 4.75 2.25 5.08579 2.25 5.5C2.25 5.91421 2.58579 6.25 3 6.25V5.5V4.75ZM21 6.25C21.4142 6.25 21.75 5.91421 21.75 5.5C21.75 5.08579 21.4142 4.75 21 4.75V5.5V6.25ZM15.3731 4.09173L14.6982 4.41888V4.41888L15.3731 4.09173ZM8.65861 4.17126L9.34105 4.48234V4.48234L8.65861 4.17126ZM9.71729 2.41317L10.1738 3.00823L10.1738 3.00823L9.71729 2.41317ZM9.99568 2.23412L9.64357 1.57191L9.64357 1.57191L9.99568 2.23412ZM14.3017 2.39681L14.7501 1.79561L14.7501 1.79561L14.3017 2.39681ZM14.027 2.2247L13.6816 2.89044V2.89044L14.027 2.2247ZM8.75 16.5C8.75 16.9142 9.08579 17.25 9.5 17.25C9.91421 17.25 10.25 16.9142 10.25 16.5H9.5H8.75ZM10.25 10.5C10.25 10.0858 9.91421 9.75 9.5 9.75C9.08579 9.75 8.75 10.0858 8.75 10.5H9.5H10.25ZM13.75 16.5C13.75 16.9142 14.0858 17.25 14.5 17.25C14.9142 17.25 15.25 16.9142 15.25 16.5H14.5H13.75ZM15.25 10.5C15.25 10.0858 14.9142 9.75 14.5 9.75C14.0858 9.75 13.75 10.0858 13.75 10.5H14.5H15.25ZM18.8803 15.5251L19.6288 15.5714L20.2486 5.54627L19.5 5.5L18.7514 5.45373L18.1317 15.4788L18.8803 15.5251ZM4.5 5.5L3.75136 5.54519L4.35597 15.5603L5.10461 15.5152L5.85324 15.47L5.24864 5.45481L4.5 5.5ZM18.8803 15.5251L18.1317 15.4788C18.0516 16.774 17.9941 17.6925 17.8812 18.4042C17.7702 19.1039 17.6156 19.529 17.3855 19.8589L18.0008 20.2879L18.616 20.7168C19.028 20.126 19.2339 19.4504 19.3626 18.6392C19.4894 17.84 19.5506 16.8375 19.6288 15.5714L18.8803 15.5251ZM11.9927 22V22.75C13.2613 22.75 14.2657 22.7508 15.0712 22.6736C15.8888 22.5952 16.5757 22.4313 17.1909 22.0565L16.8007 21.416L16.4105 20.7755C16.0671 20.9847 15.6332 21.1128 14.928 21.1804C14.2107 21.2492 13.2904 21.25 11.9927 21.25V22ZM18.0008 20.2879L17.3855 19.8589C17.1276 20.2288 16.7956 20.5409 16.4105 20.7755L16.8007 21.416L17.1909 22.0565C17.7537 21.7137 18.239 21.2574 18.616 20.7168L18.0008 20.2879ZM5.10461 15.5152L4.35597 15.5603C4.43251 16.8283 4.49232 17.8322 4.61814 18.6325C4.74585 19.4448 4.95119 20.1214 5.36308 20.7133L5.97868 20.2848L6.59429 19.8564C6.36437 19.5261 6.2101 19.1002 6.09993 18.3995C5.98788 17.6868 5.93155 16.767 5.85324 15.47L5.10461 15.5152ZM11.9927 22V21.25C10.6933 21.25 9.77183 21.2492 9.05363 21.1803C8.34755 21.1126 7.91322 20.9842 7.56959 20.7746L7.17905 21.4149L6.78852 22.0552C7.40414 22.4307 8.09183 22.5949 8.91038 22.6734C9.71681 22.7508 10.7225 22.75 11.9927 22.75V22ZM5.97868 20.2848L5.36308 20.7133C5.73989 21.2547 6.22534 21.7117 6.78852 22.0552L7.17905 21.4149L7.56959 20.7746C7.18426 20.5396 6.8521 20.2269 6.59429 19.8564L5.97868 20.2848ZM3 5.5V6.25H8.05292V5.5V4.75H3V5.5ZM8.05292 5.5V6.25H16.0557V5.5V4.75H8.05292V5.5ZM16.0557 5.5V6.25H21V5.5V4.75H16.0557V5.5ZM15.3731 4.09173L14.6982 4.41888L15.3808 5.82716L16.0557 5.5L16.7306 5.17284L16.0479 3.76457L15.3731 4.09173ZM8.65861 4.17126L7.97616 3.86018L7.37048 5.18892L8.05292 5.5L8.73537 5.81108L9.34105 4.48234L8.65861 4.17126ZM8.65861 4.17126L9.34105 4.48234C9.56765 3.98523 9.7176 3.65798 9.85677 3.41407C9.98887 3.18253 10.0837 3.07739 10.1738 3.00823L9.71729 2.41317L9.26078 1.81811C8.95528 2.05248 8.74173 2.34153 8.55391 2.67073C8.37315 2.98755 8.19158 3.38759 7.97616 3.86018L8.65861 4.17126ZM12.0345 2V1.25C11.5152 1.25 11.0758 1.24928 10.7126 1.28235C10.3351 1.31672 9.98355 1.39114 9.64357 1.57191L9.99568 2.23412L10.3478 2.89632C10.4481 2.84298 10.5831 2.80034 10.8486 2.77618C11.1282 2.75072 11.4882 2.75 12.0345 2.75V2ZM9.71729 2.41317L10.1738 3.00823C10.2286 2.96619 10.2868 2.92876 10.3478 2.89632L9.99568 2.23412L9.64357 1.57191C9.50939 1.64326 9.38136 1.72561 9.26078 1.81811L9.71729 2.41317ZM15.3731 4.09173L16.0479 3.76457C15.827 3.30872 15.6405 2.92256 15.4571 2.61688C15.2664 2.29917 15.052 2.02075 14.7501 1.79561L14.3017 2.39681L13.8533 2.998C13.9426 3.06458 14.0371 3.16588 14.1709 3.38884C14.312 3.62382 14.4657 3.93926 14.6982 4.41888L15.3731 4.09173ZM12.0345 2V2.75C12.5675 2.75 12.9184 2.75069 13.1914 2.77511C13.4504 2.79827 13.5828 2.83915 13.6816 2.89044L14.027 2.2247L14.3724 1.55896C14.0382 1.38555 13.6941 1.31408 13.325 1.28107C12.9699 1.24931 12.5411 1.25 12.0345 1.25V2ZM14.3017 2.39681L14.7501 1.79561C14.6308 1.70664 14.5045 1.6275 14.3724 1.55896L14.027 2.2247L13.6816 2.89044C13.7417 2.92159 13.7991 2.95756 13.8533 2.99801L14.3017 2.39681ZM9.5 16.5H10.25L10.25 10.5H9.5H8.75L8.75 16.5H9.5ZM14.5 16.5H15.25V10.5H14.5H13.75V16.5H14.5Z" fill="white"/>
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

// ── Action Circle Buttons (40x40) ─────────────────────────────────────────────

export const ActionCircleServiceMoveIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="40" height="40" rx="20" fill="#223658"/>
    <path d="M24 24.25C24.4142 24.25 24.75 24.5858 24.75 25C24.75 25.4142 24.4142 25.75 24 25.75V25V24.25ZM17 25.75C16.5858 25.75 16.25 25.4142 16.25 25C16.25 24.5858 16.5858 24.25 17 24.25V25V25.75ZM24 20.25C24.4142 20.25 24.75 20.5858 24.75 21C24.75 21.4142 24.4142 21.75 24 21.75V21V20.25ZM21 21.75C20.5858 21.75 20.25 21.4142 20.25 21C20.25 20.5858 20.5858 20.25 21 20.25V21V21.75ZM24 25V25.75L17 25.75V25V24.25L24 24.25V25ZM24 21V21.75H21V21V20.25H24V21Z" fill="white"/>
  </svg>
);

export const ActionCircleCloseIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="40" height="40" rx="20" fill="#223658"/>
    <path d="M27.0005 12.9999L13.0005 26.9999M13.0005 12.9999L27.0005 26.9999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ActionCircleCheckIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="40" height="40" rx="20" fill="#223658"/>
    <path d="M13 22L16.5 25.5L27 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Status / State Icons (24x24) ──────────────────────────────────────────────

export const StatusInfoBlueIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#3E68FF" strokeWidth="1.5"/>
    <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="#3E68FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.992 8H12.001" stroke="#3E68FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusSuccessGreenIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#00C898" strokeWidth="1.5"/>
    <path d="M8 12.5L10.5 15L16 9" stroke="#00C898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusErrorRedIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="#F22267" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#F22267" strokeWidth="1.5"/>
  </svg>
);

export const StatusWarningOrangeIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M5.82171 9.18293C8.23539 4.91199 9.44222 2.77651 11.0983 2.22681C12.0093 1.9244 12.9907 1.9244 13.9017 2.22681C15.5578 2.77651 16.7646 4.91199 19.1783 9.18293C21.592 13.4539 22.7988 15.5893 22.4368 17.3293C22.2376 18.2866 21.7469 19.1549 21.035 19.8097C19.741 21 17.3274 21 12.5 21C7.67265 21 5.25897 21 3.96496 19.8097C3.25308 19.1549 2.76239 18.2866 2.56322 17.3293C2.20119 15.5893 3.40803 13.4539 5.82171 9.18293Z" stroke="#FFB45D" strokeWidth="1.5"/>
    <path d="M11.992 16H12.001" stroke="#FFB45D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13L12 9" stroke="#FFB45D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusNeutralPauseIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="#6C6E83" strokeWidth="1.5"/>
    <path d="M16 12H8" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusNeutralClockIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 22C6.47711 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.4776 2 20.2257 4.94289 21.5 9H19" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V12L14 14" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.9551 13C21.9848 12.6709 22 12.3373 22 12M15 22C15.3416 21.8876 15.6753 21.7564 16 21.6078M20.7906 17C20.9835 16.6284 21.1555 16.2433 21.305 15.8462M18.1925 20.2292C18.5369 19.9441 18.8631 19.6358 19.1688 19.3065" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusNeutralSpinnerIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 3V6" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 18V21" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M21 12L18 12" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12L3 12" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18.364 5.63574L16.2427 7.75706" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.75731 16.2422L5.63599 18.3635" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18.364 18.3635L16.2427 16.2422" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.75731 7.75706L5.63599 5.63574" stroke="#6C6E83" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const StatusPlayGreenIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="#00C898" strokeWidth="1.5"/>
    <path d="M15.4531 12.3948C15.3016 13.0215 14.5857 13.4644 13.1539 14.3502C11.7697 15.2064 11.0777 15.6346 10.5199 15.4625C10.2893 15.3913 10.0793 15.2562 9.90982 15.07C9.5 14.6198 9.5 13.7465 9.5 12C9.5 10.2535 9.5 9.38018 9.90982 8.92995C10.0793 8.74381 10.2893 8.60868 10.5199 8.53753C11.0777 8.36544 11.7697 8.79357 13.1539 9.64983C14.5857 10.5356 15.3016 10.9785 15.4531 11.6052C15.5156 11.8639 15.5156 12.1361 15.4531 12.3948Z" stroke="#00C898" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const StatusAgentBlueIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M7.29469 18C3.53045 6.95 8.86313 2.0625 12 1C15.1369 2.0625 20.4696 6.95 16.7053 18C16.1369 17.6458 14.4 16.9375 12 16.9375C9.6 16.9375 7.86313 17.6458 7.29469 18Z" stroke="#3050BE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10C13.1046 10 14 9.10457 14 8Z" stroke="#3050BE" strokeWidth="1.5"/>
    <path d="M17.5 16.5576C18.9421 16.6908 20.7078 17.0822 21.9814 18C21.9814 18 22.5044 13.0642 18 12" stroke="#3050BE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 16.5576C5.05794 16.6908 3.29216 17.0822 2.01858 18C2.01858 18 1.49555 13.0642 6 12" stroke="#3050BE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 20C9.5 20 9.91667 22.5 12 23C14.0833 22.5 14.5 20 14.5 20" stroke="#3050BE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusMonitorErrorIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path opacity="0.3" d="M20 7V15H4V7C4 5.11438 4 4.17157 4.58579 3.58579C5.17157 3 6.11438 3 8 3H16C17.8856 3 18.8284 3 19.4142 3.58579C20 4.17157 20 5.11438 20 7Z" stroke="#F22267" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 9L18.5 5.5M18.5 5.5L22 2M18.5 5.5L15 2M18.5 5.5L22 9" stroke="#F22267" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 15V12M4 15V7C4 5.11438 4 4.17157 4.58579 3.58579C5.17157 3 6.11438 3 8 3H11.5" stroke="#F22267" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.49762 16.0154L4.01953 15H19.9518L20.5023 16.0154C21.9452 18.677 22.3046 20.0077 21.7561 21.0039C21.2077 22 19.7536 22 16.8454 22L7.15462 22C4.24642 22 2.79231 22 2.24387 21.0039C1.69543 20.0077 2.05474 18.677 3.49762 16.0154Z" stroke="#F22267" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusShieldDebugIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M2.5 9C2.53045 8.19543 2.6201 7.37669 2.76932 6.55013C2.8806 5.93375 2.93623 5.62556 3.12624 5.41465C3.31624 5.20374 3.78574 5.05413 4.72473 4.7549C7.03407 4.01899 8.98673 2 11.9982 2C15.0099 2 16.9647 4.01915 19.275 4.75499C20.2139 5.05405 20.6834 5.20358 20.8734 5.41449C21.0635 5.6254 21.1191 5.93364 21.2305 6.55013C21.3797 7.37669 21.4695 8.19543 21.5 9M19.4451 17C18.125 19.0226 16.1772 20.6375 13.6147 21.6175C12.9478 21.8725 12.6143 22 12.0015 22C11.3887 22 11.0553 21.8725 10.3883 21.6175C7.82558 20.6375 5.87726 19.0227 4.55666 17" stroke="#6F3EAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 12L9.5 13M9.5 13L10.5 14M9.5 13L10.5 12M9.5 13L8.5 14" stroke="#6F3EAB" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3.5 12L4.5 13M4.5 13L5.5 14M4.5 13L5.5 12M4.5 13L3.5 14" stroke="#6F3EAB" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13.5 12L14.5 13M14.5 13L15.5 14M14.5 13L15.5 12M14.5 13L13.5 14" stroke="#6F3EAB" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18.5 12L19.5 13M19.5 13L20.5 14M19.5 13L20.5 12M19.5 13L18.5 14" stroke="#6F3EAB" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const StatusPauseSquaresIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="#A52D97" strokeWidth="1.5"/>
    <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="#A52D97" strokeWidth="1.5"/>
  </svg>
);

export const StatusFolderLockIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M16.7423 15.6806V14.2911C16.7423 14.0858 16.7509 13.878 16.8243 13.6864C17.0197 13.1762 17.5373 12.5078 18.4796 12.5078C19.422 12.5078 19.9599 13.1762 20.1553 13.6864C20.2287 13.878 20.2373 14.0858 20.2373 14.2911V15.6806M16.8116 21.5H20.1883C21.1824 21.5 21.9883 20.6939 21.9883 19.6995V17.6993C21.9883 16.705 21.1824 15.8989 20.1883 15.8989H16.8116C15.8175 15.8989 15 16.705 15 17.6993V19.6995C15 20.6939 15.8175 21.5 16.8116 21.5Z" stroke="#FFB45D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.0027 20.5049C7.2874 20.5049 4.92973 20.5049 3.46487 19.04C2 17.5752 2 15.2174 2 10.5022V7.4456C2 5.62864 2 4.72016 2.38042 4.03847C2.6516 3.55255 3.05255 3.1516 3.53848 2.88042C4.22017 2.5 5.12865 2.5 6.94562 2.5C8.10969 2.5 8.69172 2.5 9.20122 2.69106C10.3645 3.12729 10.8442 4.18403 11.3691 5.23387L11.724 5.94676C11.8931 6.28639 12.2398 6.50108 12.6192 6.50108H16.754C18.8613 6.50108 19.9149 6.50108 20.6718 7.0068C20.9995 7.22574 21.2808 7.50707 21.4997 7.83473C21.8937 8.42442 21.9808 9.19424 22 10.5022" stroke="#FFB45D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const StatusServiceMoveTwoToneIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M13 19.2559C12.4477 19.2559 12 18.8081 12 18.2559C12 17.7036 12.4477 17.2559 13 17.2559L17.5 17.2559L17.5 16.6616C17.4999 16.486 17.4997 16.2703 17.5218 16.0939C17.538 15.9641 17.6098 15.388 18.1754 15.1137C18.7422 14.8387 19.2424 15.1407 19.3506 15.206L19.819 15.5451C20.1949 15.8397 20.7093 16.2454 21.1003 16.6259C21.2954 16.8157 21.4967 17.033 21.6555 17.2639C21.7967 17.4691 22 17.8193 22 18.25C22 18.6807 21.7967 19.0309 21.6555 19.2361C21.4967 19.467 21.2954 19.6843 21.1003 19.8741C20.7093 20.2546 20.1949 20.6602 19.8191 20.9549L19.3506 21.294C19.2424 21.3593 18.7422 21.6613 18.1754 21.3863C17.6098 21.112 17.538 20.5359 17.5222 20.4095L17.5218 20.4061C17.4997 20.2297 17.4999 20.014 17.5 19.8384L17.5 19.2559H13Z" fill="#00A67E"/>
    <path d="M13.0288 2H10.9712C9.02294 2 7.45141 2 6.21533 2.17961C4.92535 2.3671 3.8568 2.76781 3.01802 3.6746C2.18949 4.57031 1.83279 5.69272 1.66416 7.04866C1.49997 8.36894 1.49998 10.0541 1.5 12.1739V12.8261C1.49998 14.9459 1.49997 16.6311 1.66416 17.9513C1.83279 19.3073 2.18949 20.4297 3.01802 21.3254C3.8568 22.2322 4.92535 22.6329 6.21533 22.8204C7.45142 23.0001 9.02293 23 10.9712 23H11.05C11.6023 23 12.05 22.5523 12.05 22C12.05 21.4477 11.6023 21 11.05 21C9.00425 21 7.57858 20.9975 6.503 20.8412C5.4647 20.6903 4.89956 20.4142 4.48622 19.9673C4.06263 19.5094 3.79327 18.8656 3.64887 17.7045C3.50182 16.5221 3.5 14.9616 3.5 12.7568V12.2432C3.5 10.1384 3.50182 8.57785 3.64887 7.39549C3.79327 6.23444 4.06263 5.59063 4.48622 5.1327C4.89956 4.68585 5.4647 4.4097 6.503 4.25879C7.57858 4.10254 9.00425 4.1 11.05 4.1H12.95C14.9957 4.1 16.4214 4.10254 17.497 4.25879C18.5353 4.4097 19.1004 4.68585 19.5138 5.1327C19.9374 5.59063 20.2067 6.23444 20.3511 7.39549C20.4983 8.57785 20.5 10.1384 20.5 12.2432V13C20.5 13.5523 20.9477 14 21.5 14C22.0523 14 22.5 13.5523 22.5 13V12.1739C22.5002 10.0541 22.5002 8.36894 22.3358 7.04866C22.1672 5.69272 21.8105 4.57031 20.982 3.6746C20.1432 2.76781 19.0747 2.3671 17.7847 2.17961C16.5486 2 14.9771 2 13.0288 2Z" fill="#6167EC"/>
  </svg>
);

export const StatusAlertCircleIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="#F22267" strokeWidth="1.5"/>
    <path d="M11.992 15H12.001" stroke="#F22267" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L12 8" stroke="#F22267" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusStarRatingIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M13.9685 4.22755L15.4643 7.24394C15.6683 7.66384 16.2122 8.0666 16.6712 8.14372L19.3824 8.59789C21.1162 8.88925 21.5242 10.1575 20.2748 11.4086L18.167 13.5338C17.8101 13.8937 17.6146 14.5878 17.7251 15.0848L18.3285 17.7156C18.8045 19.798 17.7081 20.6035 15.8808 19.5152L13.3396 17.9984C12.8806 17.7242 12.1242 17.7242 11.6567 17.9984L9.11553 19.5152C7.29673 20.6035 6.19185 19.7894 6.6678 17.7156L7.27123 15.0848C7.38172 14.5878 7.18624 13.8937 6.82928 13.5338L4.72151 11.4086C3.48065 10.1575 3.88011 8.88925 5.61391 8.59789L8.32511 8.14372C8.77557 8.0666 9.3195 7.66384 9.52348 7.24394L11.0193 4.22755C11.8352 2.59082 13.1611 2.59082 13.9685 4.22755Z" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusStarRatingFilledIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path opacity="0.3" d="M13.9685 4.22755L15.4643 7.24394C15.6683 7.66384 16.2122 8.0666 16.6712 8.14372L19.3824 8.59789C21.1162 8.88925 21.5242 10.1575 20.2748 11.4086L18.167 13.5338C17.8101 13.8937 17.6146 14.5878 17.7251 15.0848L18.3285 17.7156C18.8045 19.798 17.7081 20.6035 15.8808 19.5152L13.3396 17.9984C12.8806 17.7242 12.1242 17.7242 11.6567 17.9984L9.11553 19.5152C7.29673 20.6035 6.19185 19.7894 6.6678 17.7156L7.27123 15.0848C7.38172 14.5878 7.18624 13.8937 6.82928 13.5338L4.72151 11.4086C3.48065 10.1575 3.88011 8.88925 5.61391 8.59789L8.32511 8.14372C8.77557 8.0666 9.3195 7.66384 9.52348 7.24394L11.0193 4.22755C11.8352 2.59082 13.1611 2.59082 13.9685 4.22755Z" fill="#FF9900"/>
    <path d="M13.9685 4.22755L15.4643 7.24394C15.6683 7.66384 16.2122 8.0666 16.6712 8.14372L19.3824 8.59789C21.1162 8.88925 21.5242 10.1575 20.2748 11.4086L18.167 13.5338C17.8101 13.8937 17.6146 14.5878 17.7251 15.0848L18.3285 17.7156C18.8045 19.798 17.7081 20.6035 15.8808 19.5152L13.3396 17.9984C12.8806 17.7242 12.1242 17.7242 11.6567 17.9984L9.11553 19.5152C7.29673 20.6035 6.19185 19.7894 6.6678 17.7156L7.27123 15.0848C7.38172 14.5878 7.18624 13.8937 6.82928 13.5338L4.72151 11.4086C3.48065 10.1575 3.88011 8.88925 5.61391 8.59789L8.32511 8.14372C8.77557 8.0666 9.3195 7.66384 9.52348 7.24394L11.0193 4.22755C11.8352 2.59082 13.1611 2.59082 13.9685 4.22755Z" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DotsGridIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M11.9958 18H12.0048M17.9998 18H18.0087M5.99976 18H6.00874M11.9958 12H12.0048M11.9998 6H12.0087M17.9998 12H18.0087M17.9998 6H18.0087M5.99976 12H6.00874M5.99976 6H6.00874" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CommentIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-3.5 3v-3H4.5A2.5 2.5 0 0 1 2 11.5v-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

// ── Canvas / Editor Icons ─────────────────────────────────────────────────────

export const EditIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M3.26538 21.9613L3.28499 21.2115H3.28498L3.26538 21.9613ZM2.03608 20.5662L2.78381 20.6244V20.6244L2.03608 20.5662ZM4.78943 13.9445L4.2383 13.4358V13.4358L4.78943 13.9445ZM2.06308 20.2197L1.31534 20.1614H1.31534L2.06308 20.2197ZM10.7506 19.1543L10.2303 18.6141V18.6141L10.7506 19.1543ZM3.54536 21.9686L3.52576 22.7183H3.52576L3.54536 21.9686ZM21.6159 5.38093L22.2781 5.02866V5.02866L21.6159 5.38093ZM20.1543 10.097L19.634 9.55682L20.1543 10.097ZM21.5703 8.5507L20.9187 8.17934V8.17934L21.5703 8.5507ZM18.6904 2.39232L18.3263 3.04804L18.6904 2.39232ZM14.0737 3.88545L14.6248 4.39413L14.0737 3.88545ZM15.5874 2.43893L15.204 1.79431V1.79431L15.5874 2.43893ZM20.1543 10.097L19.634 9.55682L10.2303 18.6141L10.7506 19.1543L11.2709 19.6945L20.6746 10.6372L20.1543 10.097ZM4.78943 13.9445L5.34056 14.4532L14.6248 4.39413L14.0737 3.88545L13.5226 3.37677L4.2383 13.4358L4.78943 13.9445ZM3.54536 21.9686L3.56497 21.2188L3.28499 21.2115L3.26538 21.9613L3.24577 22.711L3.52576 22.7183L3.54536 21.9686ZM2.03608 20.5662L2.78381 20.6244L2.81081 20.2779L2.06308 20.2197L1.31534 20.1614L1.28835 20.5079L2.03608 20.5662ZM3.26538 21.9613L3.28498 21.2115C3.12547 21.2073 2.99912 21.204 2.89063 21.1983C2.78169 21.1926 2.7103 21.1854 2.66125 21.1772C2.56902 21.1618 2.63793 21.1566 2.7063 21.2342L2.14359 21.73L1.58088 22.2259C1.83132 22.5101 2.14789 22.6123 2.41442 22.6568C2.65767 22.6974 2.95477 22.7034 3.24577 22.711L3.26538 21.9613ZM2.03608 20.5662L1.28835 20.5079C1.26514 20.8057 1.24028 21.1043 1.25407 21.3517C1.26897 21.6191 1.33267 21.9442 1.58088 22.2259L2.14359 21.73L2.7063 21.2342C2.77242 21.3092 2.7575 21.3715 2.75175 21.2682C2.74487 21.1448 2.7573 20.9648 2.78381 20.6244L2.03608 20.5662ZM4.78943 13.9445L4.2383 13.4358C3.06241 14.7098 2.3488 15.4688 1.93583 16.4194L2.62371 16.7182L3.31159 17.0171C3.60008 16.3531 4.09646 15.8011 5.34056 14.4532L4.78943 13.9445ZM2.06308 20.2197L2.81081 20.2779C2.95467 18.4314 3.02254 17.6824 3.31159 17.0171L2.62371 16.7182L1.93583 16.4194C1.52341 17.3686 1.45135 18.4157 1.31534 20.1614L2.06308 20.2197ZM10.7506 19.1543L10.2303 18.6141C8.6878 20.0998 8.05899 20.6868 7.2952 20.9851L7.56806 21.6837L7.84093 22.3823C8.94901 21.9495 9.81795 21.0939 11.2709 19.6945L10.7506 19.1543ZM3.54536 21.9686L3.52576 22.7183C5.52172 22.7705 6.73118 22.8158 7.84093 22.3823L7.56806 21.6837L7.2952 20.9851C6.53307 21.2828 5.68469 21.2743 3.56497 21.2188L3.54536 21.9686ZM20.245 3.79276L19.7091 4.31741C20.5143 5.13994 20.7985 5.4413 20.9538 5.73319L21.6159 5.38093L22.2781 5.02866C21.9958 4.49815 21.512 4.01486 20.781 3.26811L20.245 3.79276ZM20.1543 10.097L20.6746 10.6372C21.4267 9.91278 21.9244 9.44408 22.2219 8.92206L21.5703 8.5507L20.9187 8.17934C20.7552 8.46624 20.4626 8.75877 19.634 9.55682L20.1543 10.097ZM21.6159 5.38093L20.9538 5.73319C21.361 6.49847 21.3475 7.42702 20.9187 8.17934L21.5703 8.5507L22.2219 8.92206C22.9056 7.72256 22.9267 6.24777 22.2781 5.02866L21.6159 5.38093ZM20.245 3.79276L20.781 3.26811C20.051 2.52241 19.5767 2.02656 19.0544 1.7366L18.6904 2.39232L18.3263 3.04804C18.6091 3.20504 18.9029 3.49383 19.7091 4.31741L20.245 3.79276ZM14.0737 3.88545L14.6248 4.39413C15.4069 3.54677 15.6924 3.24909 15.9708 3.08354L15.5874 2.43893L15.204 1.79431C14.6905 2.09971 14.2308 2.6094 13.5226 3.37677L14.0737 3.88545ZM18.6904 2.39232L19.0544 1.7366C17.8496 1.06772 16.3886 1.0898 15.204 1.79431L15.5874 2.43893L15.9708 3.08354C16.6969 2.65172 17.5886 2.63846 18.3263 3.04804L18.6904 2.39232ZM13 4L12.4697 4.53033L19.4697 11.5303L20 11L20.5303 10.4697L13.5303 3.46967L13 4ZM14 22V22.75H22V22V21.25H14V22Z" fill="currentColor"/>
  </svg>
);

export const DraftFileIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.1259 2C12.765 2.00043 14.2873 2.0043 15.5345 2.45101C17.559 3.17616 19.1719 4.71587 19.9378 6.68796C20.3831 7.83435 20.4916 9.1242 20.4996 10.3557C20.5071 11.5351 20.4151 12.7118 20.4123 13.8908C20.4113 14.277 20.1037 14.5894 19.7251 14.5884C19.3466 14.5875 19.0405 14.2736 19.0414 13.8873C19.0429 13.3035 19.0702 12.6448 19.0923 12.0615C19.0942 12.0113 19.0905 12.1117 19.0923 12.0615C19.0714 10.7487 17.9742 9.6155 16.6828 9.6155C15.9817 9.6155 15.2786 9.72752 14.5881 9.53872C13.8259 9.33035 13.2306 8.72292 13.0264 7.94526C12.8419 7.24283 12.9511 6.52248 12.9511 5.80789C12.9511 4.13962 11.5556 3.39895 10.1257 3.39872C9.74714 3.39865 9.44032 3.08549 9.44038 2.69924C9.44044 2.313 9.74736 1.99994 10.1259 2ZM13.5391 3.47412C14.1738 3.52727 14.6527 3.61758 15.0804 3.77077C16.7502 4.36887 18.0514 5.6276 18.6634 7.20327C18.8822 7.76656 19.0062 8.39952 19.0703 9.08209C18.4161 8.54141 17.5822 8.21679 16.6828 8.21679C16.1143 8.21679 15.4969 8.33913 14.9429 8.18766C14.6538 8.10863 14.428 7.87822 14.3505 7.58325C14.201 7.01392 14.322 6.38781 14.322 5.80789C14.322 4.92849 14.0298 4.11871 13.5391 3.47412Z" fill="currentColor"/>
    <path d="M7.20412 2.09841C7.5783 2.03996 7.92807 2.30209 7.98535 2.68389C8.04263 3.06569 7.78573 3.42257 7.41154 3.48102C6.13706 3.68008 5.06867 4.77116 4.93074 6.04311C4.8891 6.42701 4.55035 6.70379 4.1741 6.66131C3.79785 6.61884 3.52659 6.27319 3.56822 5.88928C3.7787 3.94841 5.3562 2.38703 7.20412 2.09841Z" fill="currentColor"/>
    <path d="M3.50764 10.2536C3.50763 9.8674 3.81449 9.55428 4.19304 9.55427C4.57158 9.55426 4.87846 9.86737 4.87847 10.2536C4.8785 11.4795 4.86133 12.6735 4.87827 13.879C4.88369 14.2652 4.58125 14.5828 4.20275 14.5884C3.82424 14.5939 3.51301 14.2853 3.50758 13.8991C3.49048 12.682 3.50767 11.4507 3.50764 10.2536Z" fill="currentColor"/>
    <path d="M18.9526 17.8209C18.9964 17.4373 19.3367 17.1625 19.7127 17.2072C20.0887 17.2519 20.358 17.5992 20.3142 17.9828C20.2102 18.8939 19.9907 19.6484 19.4909 20.2896C19.2276 20.6273 18.9164 20.9258 18.5675 21.1766C17.3483 22.0531 15.8125 21.9994 14.389 21.9994C14.0105 21.9994 13.7036 21.6862 13.7036 21.3C13.7036 20.9138 14.0105 20.6006 14.389 20.6006C15.5205 20.6006 16.8029 20.7341 17.778 20.0332C18.0221 19.8577 18.2374 19.6506 18.418 19.4189C18.6958 19.0626 18.8637 18.5992 18.9526 17.8209Z" fill="currentColor"/>
    <path d="M3.70499 18.3857C3.63757 18.0056 3.88487 17.6417 4.25736 17.5729C4.62985 17.5041 4.98647 17.7564 5.0539 18.1365C5.19134 18.9112 5.42486 19.3864 5.80048 19.7471C6.1923 20.1234 6.72208 20.3587 7.597 20.492L9.01374 20.6027C9.39117 20.6322 9.67373 20.9683 9.64484 21.3534C9.61595 21.7385 9.28656 22.0268 8.90912 21.9973L7.44482 21.8821C6.40655 21.727 5.53816 21.416 4.86096 20.7657C4.20621 20.1369 3.876 19.3496 3.70499 18.3857Z" fill="currentColor"/>
  </svg>
);

export const AlertCircleIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="7.99992" cy="7.99967" r="6.66667" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7.99474 10H8.00073" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 8L8 5.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ZoomOutIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M11 1.25C16.3848 1.25 20.75 5.61522 20.75 11C20.75 13.4223 19.8635 15.6357 18.4014 17.3408L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L17.3408 18.4014C15.6357 19.8635 13.4223 20.75 11 20.75C5.61522 20.75 1.25 16.3848 1.25 11C1.25 5.61522 5.61522 1.25 11 1.25ZM11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5563 6.44365 19.25 11 19.25C15.5563 19.25 19.25 15.5563 19.25 11C19.25 6.44365 15.5563 2.75 11 2.75ZM14 10.25C14.4142 10.25 14.75 10.5858 14.75 11C14.75 11.4142 14.4142 11.75 14 11.75H8C7.58579 11.75 7.25 11.4142 7.25 11C7.25 10.5858 7.58579 10.25 8 10.25H14Z" fill="currentColor"/>
  </svg>
);

export const ZoomInIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M11 1.25C16.3848 1.25 20.75 5.61522 20.75 11C20.75 13.4223 19.8635 15.6357 18.4014 17.3408L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L17.3408 18.4014C15.6357 19.8635 13.4223 20.75 11 20.75C5.61522 20.75 1.25 16.3848 1.25 11C1.25 5.61522 5.61522 1.25 11 1.25ZM11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5563 6.44365 19.25 11 19.25C15.5563 19.25 19.25 15.5563 19.25 11C19.25 6.44365 15.5563 2.75 11 2.75ZM11 7.25C11.4142 7.25 11.75 7.58579 11.75 8V10.25H14C14.4142 10.25 14.75 10.5858 14.75 11C14.75 11.4142 14.4142 11.75 14 11.75H11.75V14C11.75 14.4142 11.4142 14.75 11 14.75C10.5858 14.75 10.25 14.4142 10.25 14V11.75H8C7.58579 11.75 7.25 11.4142 7.25 11C7.25 10.5858 7.58579 10.25 8 10.25H10.25V8C10.25 7.58579 10.5858 7.25 11 7.25Z" fill="currentColor"/>
  </svg>
);

export const FitToViewIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M4.8 4H9C9.4 4 9.7 4.4 9.7 4.8C9.7 5.2 9.4 5.5 9 5.5H5.5V9C5.5 9.4 5.1 9.7 4.7 9.7C4.3 9.7 4 9.4 4 9V4.7C4 4.55359 4.05359 4.46077 4.12154 4.34308C4.14641 4.3 4.1732 4.25359 4.2 4.2C4.4 4.1 4.6 4 4.8 4Z" fill="currentColor"/>
    <path d="M19.2 14.2C18.8 14.2 18.5 14.5 18.5 14.9V18.4H15C14.6 18.4 14.3 18.7 14.3 19.1C14.3 19.5 14.6 19.8 15 19.8H19.2C19.4 19.8 19.6 19.7 19.7 19.6C19.8 19.5 19.9 19.3 19.9 19.1V15C20 14.6 19.6 14.2 19.2 14.2Z" fill="currentColor"/>
    <path d="M9 18.5H5.5V15C5.5 14.6 5.2 14.3 4.8 14.3C4.4 14.3 4 14.6 4 15V19.2C4 19.4 4.1 19.6 4.2 19.7C4.4 19.9 4.5 20 4.7 20H9C9.4 20 9.7 19.7 9.7 19.3C9.7 18.9 9.4 18.5 9 18.5Z" fill="currentColor"/>
    <path d="M19.657 4.12154C19.5393 4.05359 19.4465 4 19.3 4H15C14.6 4 14.3 4.3 14.3 4.7C14.3 5.1 14.6 5.4 15 5.4H18.5V9C18.5 9.4 18.8 9.7 19.2 9.7C19.7 9.7 20 9.4 20 9V4.8C20 4.6 19.9 4.4 19.8 4.2C19.7465 4.17321 19.7 4.1464 19.657 4.12154Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16.2 9.80005V14.2C16.2 15.3 15.3 16.2 14.2 16.1H9.90002C8.80002 16.1 7.90002 15.2 7.90002 14.1V9.80005C7.90002 8.70005 8.80002 7.80005 9.90002 7.80005H14.2C15.3 7.80005 16.2 8.70005 16.2 9.80005ZM14.2 14.7C14.5 14.7 14.7 14.5 14.7 14.2V9.80005C14.7 9.50005 14.5 9.30005 14.2 9.30005H9.90002C9.60002 9.30005 9.40002 9.50005 9.40002 9.80005V14.2C9.40002 14.5 9.60002 14.7 9.90002 14.7H14.2Z" fill="currentColor"/>
  </svg>
);

export const ExpandArrowIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="7.99992" cy="7.99967" r="6.66667" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 7.38908C6 7.38908 7.47298 5.66602 8.00002 5.66602C8.52705 5.66601 10 7.38909 10 7.38909M6 10.3327C6 10.3327 7.47298 8.60961 8.00002 8.60961C8.52705 8.6096 10 10.3327 10 10.3327" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
