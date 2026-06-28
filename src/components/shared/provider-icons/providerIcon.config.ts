import type { SecretProvider, DiscoveredAccountPlatform } from '../../../types/prototype.types';
import type { ProviderIconComponent } from './ProviderIcons.types';
import {
  ProviderIconAWS,
  ProviderIconAzure,
  ProviderIconGCP,
  ProviderIconHashiCorp,
  ProviderIconCyberArk,
  ProviderIconWindows,
  ProviderIconLinux,
  ProviderIconMacOS,
  ProviderIconUbuntu,
  ProviderIconRHEL,
} from './ProviderIcons';

export const PROVIDER_ICON_MAP: Record<SecretProvider | DiscoveredAccountPlatform, ProviderIconComponent> = {
  AWS: ProviderIconAWS,
  Azure: ProviderIconAzure,
  GCP: ProviderIconGCP,
  HashiCorp: ProviderIconHashiCorp,
  CyberArk: ProviderIconCyberArk,
  Windows: ProviderIconWindows,
  Linux: ProviderIconLinux,
  MacOS: ProviderIconMacOS,
  Ubuntu: ProviderIconUbuntu,
  RHEL: ProviderIconRHEL,
};
