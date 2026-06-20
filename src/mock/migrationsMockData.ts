/**
 * Mock data for MigrationsPage
 * Prototype only — replace with real API data in production
 */

import type { MigrationOption } from '../types/prototype.types';

export const mockMigrationOptions: MigrationOption[] = [
  {
    id: 'pam-self-hosted',
    title: 'PAM Self-Hosted',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum',
    path: '/setup/migrations/pam-self-hosted',
  },
  {
    id: 'cpm-to-srs',
    title: 'CPM to SRS',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum',
    path: '/setup/migrations/cpm-to-srs',
  },
];
