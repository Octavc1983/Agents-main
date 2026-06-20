import type React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { getNavBreadcrumbs } from '../../../navigation/navConfig';
import { usePageTitle } from '../../../providers/PageTitleContext';
import './AppShell.scss';

function getNavTitle(pathname: string): string {
  const breadcrumbs = getNavBreadcrumbs(pathname);
  if (breadcrumbs.length > 0) return breadcrumbs[breadcrumbs.length - 1].label;
  return 'IDIRA';
}

export const AppShell: React.FC = () => {
  const { pathname } = useLocation();
  const { override } = usePageTitle();
  const pageTitle = override ?? getNavTitle(pathname);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__main">
        <Header title={pageTitle} />
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
