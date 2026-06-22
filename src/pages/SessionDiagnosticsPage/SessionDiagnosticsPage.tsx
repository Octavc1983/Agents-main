import React, { useState } from 'react';
import { Select, Badge, LoadingState, EmptyState, ErrorState } from '@idira/design-system';
import { mockSessions } from '../../mock/sessionDiagnosticsMockData';
import './SessionDiagnosticsPage.scss';

type TimeRange = 'last_30_days' | 'last_7_days' | 'last_24_hours' | 'last_hour';

const TIME_RANGE_OPTIONS = [
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_24_hours', label: 'Last 24 hours' },
  { value: 'last_hour', label: 'Last hour' },
];

const isLoading = false;
const isError = false;

const ErrorUserIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 14c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="11.5" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DotsMenuIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="3" r="1.2" fill="currentColor" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
    <circle cx="8" cy="13" r="1.2" fill="currentColor" />
  </svg>
);

const SortIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 9L3 6h6L6 9Z" fill="currentColor" />
    <path d="M6 3l3 3H3L6 3Z" fill="currentColor" opacity="0.4" />
  </svg>
);

export const SessionDiagnosticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('last_30_days');

  if (isLoading) {
    return <LoadingState message="Loading sessions..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load sessions"
        message="An error occurred while loading session diagnostics. Please try again."
      />
    );
  }

  if (mockSessions.length === 0) {
    return (
      <div className="session-diag-page">
        <h1 className="session-diag-page__title">Session diagnostics</h1>
        <EmptyState title="No sessions found" description="No sessions match the current time range." />
      </div>
    );
  }

  const userErrors = mockSessions.filter(s => s.connectionStatus === 'Failed').length;
  const systemErrors = 0;
  const warnings = 0;

  return (
    <div className="session-diag-page">
      <h1 className="session-diag-page__title">Session diagnostics</h1>

      <div className="session-diag-page__toolbar">
        <div className="session-diag-page__filter">
          <label className="session-diag-page__filter-label" htmlFor="time-range-select">
            Time range
          </label>
          <Select
            value={timeRange}
            onChange={v => setTimeRange(v as TimeRange)}
            options={TIME_RANGE_OPTIONS}
          />
        </div>

        <div className="session-diag-page__search">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="session-diag-page__search-icon">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            className="session-diag-page__search-input"
            placeholder="Search for a session ID or user"
            aria-label="Search for a session ID or user"
          />
        </div>
      </div>

      <div className="session-diag-page__stats">
        <div className="session-diag-stat session-diag-stat--error">
          <span className="session-diag-stat__icon" aria-hidden="true">
            <ErrorUserIcon />
          </span>
          <span className="session-diag-stat__label">User errors</span>
          <span className="session-diag-stat__value">{userErrors}</span>
        </div>
        <div className="session-diag-stat session-diag-stat--system">
          <span className="session-diag-stat__icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="8" y1="4.5" x2="8" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="10.5" r="0.75" fill="currentColor" />
            </svg>
          </span>
          <span className="session-diag-stat__label">System errors</span>
          <span className="session-diag-stat__value">{systemErrors}</span>
        </div>
        <div className="session-diag-stat session-diag-stat--warning">
          <span className="session-diag-stat__icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2L14.5 13H1.5L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <line x1="8" y1="6.5" x2="8" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.75" fill="currentColor" />
            </svg>
          </span>
          <span className="session-diag-stat__label">Warnings</span>
          <span className="session-diag-stat__value">{warnings}</span>
        </div>
      </div>

      <div className="session-diag-page__table-header">
        <span className="session-diag-page__count">{mockSessions.length} sessions</span>
        <span className="session-diag-page__last-update">Last update on: 09:27 am</span>
      </div>

      <table className="session-diag-table" aria-label="Session diagnostics">
        <thead>
          <tr>
            <th className="session-diag-table__th session-diag-table__th--icon" />
            <th className="session-diag-table__th">
              Session ID
            </th>
            <th className="session-diag-table__th">
              Start date and time <SortIcon />
            </th>
            <th className="session-diag-table__th">Connection status</th>
            <th className="session-diag-table__th">Connection profile</th>
            <th className="session-diag-table__th">User</th>
            <th className="session-diag-table__th">Target</th>
            <th className="session-diag-table__th session-diag-table__th--actions" />
          </tr>
        </thead>
        <tbody>
          {mockSessions.map(session => (
            <tr key={session.id} className="session-diag-table__row">
              <td className="session-diag-table__td session-diag-table__td--icon">
                {session.hasError && (
                  <span className="session-diag-table__error-icon">
                    <ErrorUserIcon />
                  </span>
                )}
              </td>
              <td className="session-diag-table__td">
                <span className="session-diag-table__cell-text" title={session.sessionId}>{session.sessionId}</span>
              </td>
              <td className="session-diag-table__td">
                <span className="session-diag-table__cell-text" title={session.startDate}>{session.startDate}</span>
              </td>
              <td className="session-diag-table__td session-diag-table__td--badge">
                <Badge
                  color={session.connectionStatus === 'Failed' ? 'critical' : 'neutral'}
                  label={session.connectionStatus}
                />
              </td>
              <td className="session-diag-table__td">
                <span className="session-diag-table__cell-text" title={session.connectionProfile}>{session.connectionProfile}</span>
              </td>
              <td className="session-diag-table__td">
                <span className="session-diag-table__cell-text" title={session.user}>{session.user}</span>
              </td>
              <td className="session-diag-table__td">
                <span className="session-diag-table__cell-text" title={session.target}>{session.target}</span>
              </td>
              <td className="session-diag-table__td session-diag-table__td--actions">
                <button type="button" className="session-diag-table__action-btn" aria-label="More actions">
                  <DotsMenuIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
