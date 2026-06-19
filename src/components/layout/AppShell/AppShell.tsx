import type React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import './AppShell.scss';

export const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__main">
        <Header title="IDIRA" subtitle="Identity Security" />
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
