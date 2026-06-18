/**
 * Router Configuration
 * Defines all routes for the prototype application
 */

import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell/AppShell';
import { HomePage } from '../pages/HomePage/HomePage';
import { PrototypePage } from '../pages/PrototypePage/PrototypePage';
import { RapidPrototypingPage } from '../pages/RapidPrototypingPage/RapidPrototypingPage';
import { DesignSystemPreviewPage } from '../pages/DesignSystemPreviewPage/DesignSystemPreviewPage';
import { AssetsTablePage } from '../pages/AssetsTablePage/AssetsTablePage';
import { AgentPromptsPage } from '../pages/AgentPromptsPage/AgentPromptsPage';
import { ScansPage } from '../pages/ScansPage/ScansPage';
import { AccountSettingsPage } from '../pages/AccountSettingsPage/AccountSettingsPage';
import { ABTestingPage } from '../pages/ABTestingPage/ABTestingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'rapid-prototyping',
        element: <RapidPrototypingPage />,
      },
      {
        path: 'prototype',
        element: <PrototypePage />,
      },
      {
        path: 'design-system-preview',
        element: <DesignSystemPreviewPage />,
      },
      {
        path: 'assets-table',
        element: <AssetsTablePage />,
      },
      {
        path: 'agent-prompts',
        element: <AgentPromptsPage />,
      },
      {
        path: 'scans',
        element: <ScansPage />,
      },
      {
        path: 'account',
        element: <AccountSettingsPage />,
      },
      {
        path: 'ab-testing',
        element: <ABTestingPage />,
      },
    ],
  },
]);
