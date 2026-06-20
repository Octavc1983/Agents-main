import React, { useState } from 'react';
import { Select, Badge } from '@idira/design-system';
import './SessionDiagnosticsPage.scss';

type TimeRange = 'last_30_days' | 'last_7_days' | 'last_24_hours' | 'last_hour';
type ConnectionStatus = 'Failed' | 'Ended' | 'Active';

interface Session {
  id: string;
  sessionId: string;
  startDate: string;
  connectionStatus: ConnectionStatus;
  connectionProfile: string;
  user: string;
  target: string;
  hasError: boolean;
}

const TIME_RANGE_OPTIONS = [
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_24_hours', label: 'Last 24 hours' },
  { value: 'last_hour', label: 'Last hour' },
];

const MOCK_SESSIONS: Session[] = [
  { id: '1', sessionId: '5502432c-1...', startDate: '08 May 2025, 10:50AM', connectionStatus: 'Failed', connectionProfile: 'N/A', user: 'miriam@cyberark.clou...', target: 'i-09075513e1e7eee8...', hasError: true },
  { id: '2', sessionId: '2b6bf010-7...', startDate: '07 May 2025, 11:18AM', connectionStatus: 'Ended', connectionProfile: 'root', user: 'miriam@cyberark.clou...', target: '172.31.80.140#Miria...', hasError: false },
  { id: '3', sessionId: '882abede-2...', startDate: '07 May 2025, 11:18AM', connectionStatus: 'Failed', connectionProfile: 'root', user: 'miriam@cyberark.clou...', target: '172.31.80.140#Miria...', hasError: true },
  { id: '4', sessionId: 'baaf6709-4...', startDate: '07 May 2025, 11:17AM', connectionStatus: 'Ended', connectionProfile: 'root', user: 'miriam@cyberark.clou...', target: '172.31.80.140#Miria...', hasError: false },
  { id: '5', sessionId: '62f979b6-4...', startDate: '07 May 2025, 11:17AM', connectionStatus: 'Failed', connectionProfile: 'root', user: 'miriam@cyberark.clou...', target: '172.31.80.140#Miria...', hasError: true },
  { id: '6', sessionId: 'e7696c1b-7...', startDate: '07 May 2025, 11:17AM', connectionStatus: 'Ended', connectionProfile: 'root', user: 'miriam@cyberark.clou...', target: '172.31.80.140#Miria...', hasError: false },
  { id: '7', sessionId: '89a1418e-0...', startDate: '07 May 2025, 11:16AM', connectionStatus: 'Ended', connectionProfile: 'root', user: 'miriam@cyberark.clou...', target: '172.31.80.140#Miria...', hasError: false },
  { id: '8', sessionId: '687ed4d8-2...', startDate: '07 May 2025, 11:14AM', connectionStatus: 'Ended', connectionProfile: 'root', user: 'miriam@cyberark.clou...', target: '172.31.80.140#Miria...', hasError: false },
  { id: '9', sessionId: '6fac1dc3-5...', startDate: '07 May 2025, 10:52AM', connectionStatus: 'Failed', connectionProfile: 'root', user: 'miriam@cyberark.clou...', target: '172.31.80.140#Miria...', hasError: true },
  { id: '10', sessionId: 'f5118f8c-6...', startDate: '07 May 2025, 10:46AM', connectionStatus: 'Ended', connectionProfile: 'root', user: 'miriam@cyberark.clou...', target: '172.31.80.140#Miria...', hasError: false },
];

const ErrorUserIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="5" r="3" stroke="#E5484D" strokeWidth="1.5" />
    <path d="M2 14c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="#E5484D" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="11.5" x2="8" y2="13" stroke="#E5484D" strokeWidth="1.5" strokeLinecap="round" />
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

  const userErrors = MOCK_SESSIONS.filter(s => s.connectionStatus === 'Failed').length;
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
          <ErrorUserIcon />
          <span className="session-diag-stat__label">User errors</span>
          <span className="session-diag-stat__value">{userErrors}</span>
        </div>
        <div className="session-diag-stat session-diag-stat--system">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" stroke="#E5484D" strokeWidth="1.5" />
            <line x1="8" y1="4.5" x2="8" y2="8.5" stroke="#E5484D" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="10.5" r="0.75" fill="#E5484D" />
          </svg>
          <span className="session-diag-stat__label">System errors</span>
          <span className="session-diag-stat__value">{systemErrors}</span>
        </div>
        <div className="session-diag-stat session-diag-stat--warning">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2L14.5 13H1.5L8 2Z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
            <line x1="8" y1="6.5" x2="8" y2="9.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11" r="0.75" fill="#F59E0B" />
          </svg>
          <span className="session-diag-stat__label">Warnings</span>
          <span className="session-diag-stat__value">{warnings}</span>
        </div>
      </div>

      <div className="session-diag-page__table-header">
        <span className="session-diag-page__count">{MOCK_SESSIONS.length} sessions</span>
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
          {MOCK_SESSIONS.map(session => (
            <tr key={session.id} className="session-diag-table__row">
              <td className="session-diag-table__td session-diag-table__td--icon">
                {session.hasError && <ErrorUserIcon />}
              </td>
              <td className="session-diag-table__td">{session.sessionId}</td>
              <td className="session-diag-table__td">{session.startDate}</td>
              <td className="session-diag-table__td">
                <Badge
                  color={session.connectionStatus === 'Failed' ? 'critical' : 'neutral'}
                  label={session.connectionStatus}
                />
              </td>
              <td className="session-diag-table__td">{session.connectionProfile}</td>
              <td className="session-diag-table__td">{session.user}</td>
              <td className="session-diag-table__td">{session.target}</td>
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
