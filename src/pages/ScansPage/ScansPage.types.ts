export type ScanStatus = 'failed' | 'completed' | 'pending' | 'running' | 'success';
export type CloudProvider = 'aws' | 'gcp' | 'azure' | 'entraId';

export interface ScanInstance {
  id: string;
  scanDefinitionId: string;
  name: string;
  accountId: string;
  scanType: string;
  status: ScanStatus;
  timestamp: string;
}

export interface ScanEntity {
  id: string;
  name: string;
  provider: CloudProvider;
  scanType: string;
  schedule: string | null;
  time: string | null;
  lastRun: string;
  status: ScanStatus;
  domain: string;
  username: string;
  extraAccounts: number;
  address: string;
  occurrenceDescription: string;
  instances: ScanInstance[];
  /** Whether automatic resolution is currently enabled */
  autoResolutionEnabled: boolean;
}
