import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MigrationsPage.scss';

interface MigrationOption {
  id: string;
  title: string;
  description: string;
  path: string;
}

const MIGRATION_OPTIONS: MigrationOption[] = [
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

const MigrationCardIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="3" stroke="#859FFF" strokeWidth="1.5" />
    <path d="M7 7h4M7 12h6M7 17h3" stroke="#859FFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 10l3 2-3 2" stroke="#859FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MigrationsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="migrations-page">
      <h1 className="migrations-page__title">Migrations</h1>

      <div className="migrations-page__grid">
        {MIGRATION_OPTIONS.map(option => (
          <button
            key={option.id}
            type="button"
            className="migration-card"
            onClick={() => navigate(option.path)}
            aria-label={option.title}
          >
            <div className="migration-card__header">
              <MigrationCardIcon />
              <span className="migration-card__title">{option.title}</span>
              <ChevronRightIcon />
            </div>
            <p className="migration-card__description">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
