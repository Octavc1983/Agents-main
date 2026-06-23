import React from 'react';
import type { ProviderIconProps } from './ProviderIcons.types';

// Provider brand mark icons.
// Brand colors are intentionally retained here — they are mandated by
// third-party brand guidelines and are not product UI colors.

export const ProviderIconAWS: React.FC<ProviderIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4.5 9.5C3.5 9.2 2.8 8.4 2.8 7.5c0-1.1.9-2 2.2-2.1C5.3 4.1 6.5 3 8 3s2.7 1.1 3 2.4c1.3.1 2.2 1 2.2 2.1 0 .9-.7 1.7-1.7 2" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M5.5 12l1-1.5 1 1 1-2 1 2 1-1" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ProviderIconAzure: React.FC<ProviderIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3L2.5 12.5h3L8 7.5 10 13h3.5L9.5 3H6z" fill="#0078D4"/>
    <path d="M9.5 3L7 8.5 5.5 12.5H13.5L9.5 3z" fill="#50E6FF" fillOpacity="0.6"/>
  </svg>
);

export const ProviderIconGCP: React.FC<ProviderIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3.5h1.8L11 5H5L6.2 3.5H8z" fill="#EA4335"/>
    <path d="M11 5l1.5 2.5H3.5L5 5h6z" fill="#FBBC04"/>
    <path d="M12.5 7.5L11 10H5L3.5 7.5h9z" fill="#34A853"/>
    <path d="M11 10L9.8 12.5H6.2L5 10h6z" fill="#4285F4"/>
  </svg>
);

export const ProviderIconHashiCorp: React.FC<ProviderIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2L4 4.5V7l4-2.5L12 7V4.5L8 2z" fill="#7B42BC"/>
    <path d="M4 7v2.5L8 12l4-2.5V7L8 9.5 4 7z" fill="#7B42BC" fillOpacity="0.6"/>
  </svg>
);

export const ProviderIconCyberArk: React.FC<ProviderIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="5" stroke="#265BFF" strokeWidth="1.5"/>
    <path d="M6 8l1.5 1.5L10.5 6" stroke="#265BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
