import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell/AppShell';
import { ComingSoonPage } from '../pages/ComingSoonPage/ComingSoonPage';
import { SystemHealthPage } from '../pages/SystemHealthPage/SystemHealthPage';
import { SessionDiagnosticsPage } from '../pages/SessionDiagnosticsPage/SessionDiagnosticsPage';
import { MigrationsPage } from '../pages/MigrationsPage/MigrationsPage';
import { MigrationDetailPage } from '../pages/MigrationDetailPage/MigrationDetailPage';
import { ManagedAccountsPage } from '../pages/ManagedAccountsPage/ManagedAccountsPage';
import { RiskManagementPage } from '../pages/RiskManagementPage/RiskManagementPage';
import { SecretsPage } from '../pages/SecretsPage/SecretsPage';
import { RuleCenterPage } from '../pages/RuleCenterPage/RuleCenterPage';
import { RuleBuilderPage } from '../pages/RuleBuilderPage/RuleBuilderPage';
import { ScansPage } from '../pages/ScansPage/ScansPage';
import { getDefaultPathForSpace } from '../navigation/navConfig';

const defaultPath = getDefaultPathForSpace('access');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to={defaultPath} replace />,
      },
      { path: 'setup/health/system-health', element: <SystemHealthPage /> },
      { path: 'setup/health/session-diagnostics', element: <SessionDiagnosticsPage /> },
      { path: 'setup/migrations', element: <MigrationsPage /> },
      { path: 'setup/migrations/:migrationId', element: <MigrationDetailPage /> },
      { path: 'manage/inventory/means-of-access/managed-accounts', element: <ManagedAccountsPage /> },
      { path: 'manage/inventory/means-of-access/secrets', element: <SecretsPage /> },
      { path: 'risk/risk-management', element: <RiskManagementPage /> },
      { path: 'manage/scans', element: <ScansPage /> },
      { path: 'manage/rules-center', element: <RuleCenterPage /> },
      { path: 'manage/rules-center/new', element: <RuleBuilderPage /> },
      { path: 'manage/rules-center/:ruleId', element: <RuleBuilderPage /> },
      {
        path: '*',
        element: <ComingSoonPage />,
      },
    ],
  },
]);
