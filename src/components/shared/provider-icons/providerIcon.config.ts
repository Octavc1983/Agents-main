import type { SecretProvider } from '../../../types/prototype.types';
import type { ProviderIconComponent } from './ProviderIcons.types';
import {
  ProviderIconAWS,
  ProviderIconAzure,
  ProviderIconGCP,
  ProviderIconHashiCorp,
  ProviderIconCyberArk,
} from './ProviderIcons';

export const PROVIDER_ICON_MAP: Record<SecretProvider, ProviderIconComponent> = {
  AWS: ProviderIconAWS,
  Azure: ProviderIconAzure,
  GCP: ProviderIconGCP,
  HashiCorp: ProviderIconHashiCorp,
  CyberArk: ProviderIconCyberArk,
};
