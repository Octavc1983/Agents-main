import type { Secret, SecretsStats } from '../types/prototype.types';

export const secretsMock: Secret[] = [
  {
    id: 'sec-001', name: 'prod/db/postgres-password', platform: 'AWS', secretStore: 'AWS Secrets Manager',
    syncedByIdira: true, riskLevel: 'critical', status: 'not_rotated',
    createdAt: '2024-01-15', lastChanged: '2024-01-15', expiration: '2026-07-01', daysToExpiration: 9,
    tags: ['env:prod', 'db:postgres', 'team:platform'],
  },
  {
    id: 'sec-002', name: 'prod/api/stripe-secret-key', platform: 'AWS', secretStore: 'AWS Secrets Manager',
    syncedByIdira: true, riskLevel: 'critical', status: 'expired',
    createdAt: '2023-11-01', lastChanged: '2023-11-01', expiration: '2025-11-01', daysToExpiration: -232,
    tags: ['env:prod', 'service:payments'],
  },
  {
    id: 'sec-003', name: 'azure-sql-admin-password', platform: 'Azure', secretStore: 'Azure Key Vault',
    syncedByIdira: true, riskLevel: 'high', status: 'idle',
    createdAt: '2024-03-10', lastChanged: '2025-01-20', expiration: '2027-01-20', daysToExpiration: 578,
    tags: ['env:prod', 'db:mssql'],
  },
  {
    id: 'sec-004', name: 'gcp-service-account-key', platform: 'GCP', secretStore: 'GCP Secret Manager',
    syncedByIdira: false, riskLevel: 'high', status: 'onboarded',
    createdAt: '2025-02-14', lastChanged: '2025-06-01', expiration: '2026-12-01', daysToExpiration: 162,
    tags: ['env:staging', 'gcp:compute'],
  },
  {
    id: 'sec-005', name: 'vault/infra/ldap-bind-password', platform: 'HashiCorp', secretStore: 'HashiCorp Vault',
    syncedByIdira: true, riskLevel: 'critical', status: 'not_rotated',
    createdAt: '2023-06-01', lastChanged: '2023-06-01', expiration: null, daysToExpiration: null,
    tags: ['env:prod', 'service:ldap', 'team:infra'],
  },
  {
    id: 'sec-006', name: 'prod/auth/jwt-signing-secret', platform: 'CyberArk', secretStore: 'CyberArk Vault',
    syncedByIdira: true, riskLevel: 'high', status: 'onboarded',
    createdAt: '2025-01-10', lastChanged: '2025-05-10', expiration: '2026-11-10', daysToExpiration: 141,
    tags: ['env:prod', 'service:auth'],
  },
  {
    id: 'sec-007', name: 'dev/db/mysql-root', platform: 'AWS', secretStore: 'AWS Secrets Manager',
    syncedByIdira: false, riskLevel: 'medium', status: 'idle',
    createdAt: '2024-08-01', lastChanged: '2024-12-01', expiration: '2027-06-01', daysToExpiration: 709,
    tags: ['env:dev', 'db:mysql'],
  },
  {
    id: 'sec-008', name: 'azure-storage-account-key', platform: 'Azure', secretStore: 'Azure Key Vault',
    syncedByIdira: true, riskLevel: 'medium', status: 'onboarded',
    createdAt: '2025-03-01', lastChanged: '2025-06-01', expiration: '2027-03-01', daysToExpiration: 617,
    tags: ['env:prod', 'azure:storage'],
  },
  {
    id: 'sec-009', name: 'prod/messaging/kafka-sasl-password', platform: 'HashiCorp', secretStore: 'HashiCorp Vault',
    syncedByIdira: true, riskLevel: 'high', status: 'expired',
    createdAt: '2024-04-01', lastChanged: '2024-04-01', expiration: '2025-04-01', daysToExpiration: -81,
    tags: ['env:prod', 'service:kafka'],
  },
  {
    id: 'sec-010', name: 'gcp-bigquery-service-key', platform: 'GCP', secretStore: 'GCP Secret Manager',
    syncedByIdira: false, riskLevel: 'low', status: 'onboarded',
    createdAt: '2025-04-15', lastChanged: '2025-06-15', expiration: '2027-04-15', daysToExpiration: 662,
    tags: ['env:prod', 'gcp:bigquery'],
  },
  {
    id: 'sec-011', name: 'prod/infra/ssh-bastion-key', platform: 'CyberArk', secretStore: 'CyberArk Vault',
    syncedByIdira: true, riskLevel: 'critical', status: 'not_rotated',
    createdAt: '2022-09-01', lastChanged: '2022-09-01', expiration: null, daysToExpiration: null,
    tags: ['env:prod', 'infra:bastion', 'team:infra'],
  },
  {
    id: 'sec-012', name: 'staging/api/sendgrid-api-key', platform: 'AWS', secretStore: 'AWS Secrets Manager',
    syncedByIdira: false, riskLevel: 'low', status: 'onboarded',
    createdAt: '2025-05-01', lastChanged: '2025-06-10', expiration: '2027-05-01', daysToExpiration: 678,
    tags: ['env:staging', 'service:email'],
  },
  {
    id: 'sec-013', name: 'azure-cosmos-primary-key', platform: 'Azure', secretStore: 'Azure Key Vault',
    syncedByIdira: true, riskLevel: 'high', status: 'idle',
    createdAt: '2024-07-01', lastChanged: '2024-11-01', expiration: '2026-07-01', daysToExpiration: 9,
    tags: ['env:prod', 'db:cosmos'],
  },
  {
    id: 'sec-014', name: 'vault/payments/pci-encryption-key', platform: 'HashiCorp', secretStore: 'HashiCorp Vault',
    syncedByIdira: true, riskLevel: 'critical', status: 'onboarded',
    createdAt: '2025-01-01', lastChanged: '2025-04-01', expiration: '2026-10-01', daysToExpiration: 101,
    tags: ['env:prod', 'compliance:pci', 'team:security'],
  },
  {
    id: 'sec-015', name: 'prod/monitoring/datadog-api-key', platform: 'CyberArk', secretStore: 'CyberArk Vault',
    syncedByIdira: false, riskLevel: 'medium', status: 'disabled',
    createdAt: '2024-10-01', lastChanged: '2025-03-01', expiration: null, daysToExpiration: null,
    tags: ['env:prod', 'service:monitoring'],
  },
  {
    id: 'sec-016', name: 'gcp-cloud-run-secret-token', platform: 'GCP', secretStore: 'GCP Secret Manager',
    syncedByIdira: true, riskLevel: 'medium', status: 'onboarded',
    createdAt: '2025-05-10', lastChanged: '2025-06-10', expiration: '2026-11-10', daysToExpiration: 141,
    tags: ['env:prod', 'gcp:cloud-run'],
  },
  {
    id: 'sec-017', name: 'dev/ci/github-actions-token', platform: 'AWS', secretStore: 'AWS Secrets Manager',
    syncedByIdira: false, riskLevel: 'low', status: 'expired',
    createdAt: '2024-06-01', lastChanged: '2024-06-01', expiration: '2025-06-01', daysToExpiration: -21,
    tags: ['env:dev', 'ci:github'],
  },
  {
    id: 'sec-018', name: 'azure-ad-app-client-secret', platform: 'Azure', secretStore: 'Azure Key Vault',
    syncedByIdira: true, riskLevel: 'high', status: 'not_rotated',
    createdAt: '2023-12-01', lastChanged: '2023-12-01', expiration: '2025-12-01', daysToExpiration: 162,
    tags: ['env:prod', 'azure:ad', 'team:identity'],
  },
  {
    id: 'sec-019', name: 'vault/k8s/cluster-admin-token', platform: 'HashiCorp', secretStore: 'HashiCorp Vault',
    syncedByIdira: true, riskLevel: 'critical', status: 'onboarded',
    createdAt: '2025-02-01', lastChanged: '2025-05-01', expiration: '2026-08-01', daysToExpiration: 40,
    tags: ['env:prod', 'infra:k8s', 'team:platform'],
  },
  {
    id: 'sec-020', name: 'prod/erp/sap-service-password', platform: 'CyberArk', secretStore: 'CyberArk Vault',
    syncedByIdira: true, riskLevel: 'medium', status: 'onboarded',
    createdAt: '2025-03-15', lastChanged: '2025-06-01', expiration: '2027-03-15', daysToExpiration: 631,
    tags: ['env:prod', 'service:sap'],
  },
];

export const secretsStats: SecretsStats = {
  total: secretsMock.length,
  byProvider: [
    { provider: 'AWS', count: secretsMock.filter(s => s.platform === 'AWS').length },
    { provider: 'CyberArk', count: secretsMock.filter(s => s.platform === 'CyberArk').length },
    { provider: 'Azure', count: secretsMock.filter(s => s.platform === 'Azure').length },
    { provider: 'HashiCorp', count: secretsMock.filter(s => s.platform === 'HashiCorp').length },
    { provider: 'GCP', count: secretsMock.filter(s => s.platform === 'GCP').length },
  ],
  byStatus: {
    onboarded: secretsMock.filter(s => s.status === 'onboarded').length,
    not_rotated: secretsMock.filter(s => s.status === 'not_rotated').length,
    idle: secretsMock.filter(s => s.status === 'idle').length,
    expired: secretsMock.filter(s => s.status === 'expired').length,
    disabled: secretsMock.filter(s => s.status === 'disabled').length,
  },
  byRisk: {
    critical: secretsMock.filter(s => s.riskLevel === 'critical').length,
    high: secretsMock.filter(s => s.riskLevel === 'high').length,
    medium: secretsMock.filter(s => s.riskLevel === 'medium').length,
    low: secretsMock.filter(s => s.riskLevel === 'low').length,
  },
};
