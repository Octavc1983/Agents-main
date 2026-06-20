import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell/AppShell';
import { ComingSoonPage } from '../pages/ComingSoonPage/ComingSoonPage';
import { SystemHealthPage } from '../pages/SystemHealthPage/SystemHealthPage';
import { SessionDiagnosticsPage } from '../pages/SessionDiagnosticsPage/SessionDiagnosticsPage';
import { MigrationsPage } from '../pages/MigrationsPage/MigrationsPage';
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
      {
        path: '*',
        element: <ComingSoonPage />,
      },
    ],
  },
]);
