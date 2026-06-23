import React from 'react';
import { ProviderIconAWS, ProviderIconAzure, ProviderIconGCP } from '../../../components/shared/provider-icons';
import type { CloudProvider } from '../ScansPage.types';

// EntraID is a page-local domain-specific icon — not shared externally.
// It is distinct from the Azure cloud provider brand mark.
const EntraIdIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" fill="#0078D4"/>
    <text
      x="10" y="14"
      textAnchor="middle"
      fontSize="10"
      fontWeight="700"
      fontFamily="sans-serif"
      fill="#ffffff"
    >A</text>
  </svg>
);

interface ProviderIconProps {
  provider: CloudProvider;
  size?: number;
}

export const ProviderIcon: React.FC<ProviderIconProps> = ({ provider, size = 20 }) => {
  switch (provider) {
    case 'aws':     return <ProviderIconAWS size={size} />;
    case 'azure':   return <ProviderIconAzure size={size} />;
    case 'gcp':     return <ProviderIconGCP size={size} />;
    case 'entraId': return <EntraIdIcon size={size} />;
    default:        return null;
  }
};
