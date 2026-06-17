/**
 * AppShell Component
 * Main layout wrapper that combines Header, Sidebar, and main content area
 */

import type React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { sidebarLinks } from '../../../mock/prototypeMockData';
import './AppShell.scss';

export const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <Sidebar links={sidebarLinks} />
      <div className="app-shell__main">
        <Header title="UX/UI Prototype Environment" subtitle="Figma-to-React Rapid Prototyping" />
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
