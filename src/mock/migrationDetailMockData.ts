export interface ReadinessCheck {
  id: string;
  name: string;
  description: string;
  status: 'not_run' | 'running' | 'passed' | 'failed';
}

export interface MigrationStep {
  id: string;
  stepNumber: number;
  title: string;
  status: 'not_performed' | 'in_progress' | 'done' | 'failed';
  description?: string;
  actionLabel?: string;
  checks?: ReadinessCheck[];
}

export interface MigrationDetail {
  id: string;
  title: string;
  steps: MigrationStep[];
}

export const mockMigrationDetails: MigrationDetail[] = [
  {
    id: 'pam-self-hosted',
    title: 'Migrate PAM Self-Hosted to ISP',
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'Prepare your environment setup',
        status: 'not_performed',
        description:
          '1. Perform the preparatory steps described in the documentation guidelines.\n2. Click Confirm to confirm your environment setup.',
        actionLabel: 'Confirm',
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: 'Prepare for migration',
        status: 'not_performed',
        description: 'Set up the following migration components in your environment.',
        actionLabel: 'Define on-premises components',
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: 'Check system readiness',
        status: 'not_performed',
        description: 'Run the following system readiness checks:',
        checks: [
          {
            id: 'check-users-groups',
            name: 'Users & Groups Validation',
            description: 'Verify user accounts, group memberships, and permission structures',
            status: 'not_run',
          },
          {
            id: 'check-data-export',
            name: 'Data Export Prerequisite Validation',
            description:
              'Executes a sample export to identify potential blockers such as invalid characters, OLAC safes, and data integrity issues',
            status: 'not_run',
          },
        ],
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: 'Migrate your data',
        status: 'not_performed',
        description: 'Set up the following migration components in your environment.',
        actionLabel: 'Migrate',
      },
    ],
  },
  {
    id: 'cpm-to-srs',
    title: 'Migrate CPM to SRS',
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'Prepare your environment setup',
        status: 'not_performed',
        description:
          '1. Perform the preparatory steps described in the documentation guidelines.\n2. Click Confirm to confirm your environment setup.',
        actionLabel: 'Confirm',
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: 'Configure SRS connection',
        status: 'not_performed',
        description: 'Configure the connection between CPM and the SRS target environment.',
        actionLabel: 'Configure',
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: 'Check system readiness',
        status: 'not_performed',
        description: 'Run the following system readiness checks:',
        checks: [
          {
            id: 'check-cpm-conn',
            name: 'CPM Connectivity Validation',
            description: 'Verify that CPM can reach the SRS target endpoint',
            status: 'not_run',
          },
        ],
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: 'Migrate your data',
        status: 'not_performed',
        description: 'Initiate the CPM to SRS migration.',
        actionLabel: 'Migrate',
      },
    ],
  },
];
