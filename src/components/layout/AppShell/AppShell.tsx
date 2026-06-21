import type React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { getNavBreadcrumbs } from '../../../navigation/navConfig';
import { usePageTitle } from '../../../providers/PageTitleContext';
import { featureFlags } from '../../../config/featureFlags';
import { AnnotationPanel } from '../../../features/review-annotations/AnnotationPanel';
import { AnnotationOverlay } from '../../../features/review-annotations/AnnotationOverlay';
import { useAnnotations } from '../../../features/review-annotations/AnnotationContext';
import './AppShell.scss';

function getNavTitle(pathname: string): string {
  const breadcrumbs = getNavBreadcrumbs(pathname);
  if (breadcrumbs.length > 0) return breadcrumbs[breadcrumbs.length - 1].label;
  return 'IDIRA';
}

const ReviewButton: React.FC = () => {
  const { open, openPanel, closePanel } = useAnnotations();
  return (
    <button
      type="button"
      className={`app-shell__review-btn${open ? ' app-shell__review-btn--active' : ''}`}
      onClick={open ? closePanel : openPanel}
      aria-pressed={open}
      aria-label="Toggle review annotations panel"
    >
      Review
    </button>
  );
};

export const AppShell: React.FC = () => {
  const { pathname } = useLocation();
  const { override } = usePageTitle();
  const pageTitle = override ?? getNavTitle(pathname);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__main">
        <Header
          title={pageTitle}
          reviewButton={featureFlags.reviewAnnotations ? <ReviewButton /> : undefined}
        />
        <main className="app-shell__content">
          <Outlet />
        </main>
        {featureFlags.reviewAnnotations && <AnnotationPanel />}
      </div>
      {featureFlags.reviewAnnotations && <AnnotationOverlay />}
    </div>
  );
};
