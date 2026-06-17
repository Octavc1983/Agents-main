/**
 * AssetsTablePage Component
 * Prototype table page demonstrating asset management with state control
 *
 * Note: Table is built inline intentionally — this is a prototype page.
 * When Infra Design System is available, replace the inline table with
 * the official DS Table component.
 */

import type React from 'react';
import { useState } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { LoadingState } from '../../components/ui/LoadingState/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState/ErrorState';
import type { ComponentState } from '../../types/prototype.types';
import { mockAssets } from '../../mock/prototypeMockData';
import './AssetsTablePage.scss';

export const AssetsTablePage: React.FC = () => {
  const [state, setState] = useState<ComponentState>('default');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStateChange = (newState: ComponentState) => {
    setState(newState);
  };

  const filteredAssets = mockAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.owner.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="assets-table-page">
      {/* Page Header */}
      <section className="assets-table-page__header">
        <h1 className="assets-table-page__title">Assets Table</h1>
        <p className="assets-table-page__description">
          Prototype table page demonstrating asset management with state control
        </p>
      </section>

      {/* State Switcher */}
      <section className="assets-table-page__state-switcher">
        <span className="assets-table-page__state-label">
          State: <strong>{state}</strong>
        </span>
        <div className="assets-table-page__state-buttons">
          <Button
            variant={state === 'default' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleStateChange('default')}
          >
            Default
          </Button>
          <Button
            variant={state === 'loading' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleStateChange('loading')}
          >
            Loading
          </Button>
          <Button
            variant={state === 'empty' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleStateChange('empty')}
          >
            Empty
          </Button>
          <Button
            variant={state === 'error' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleStateChange('error')}
          >
            Error
          </Button>
        </div>
      </section>

      {/* Toolbar */}
      <section className="assets-table-page__toolbar">
        <div className="assets-table-page__search-wrapper">
          <input
            className="assets-table-page__search"
            type="text"
            placeholder="Search assets by name, type, or owner…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search assets"
          />
        </div>
        <div className="assets-table-page__toolbar-actions">
          <Button variant="secondary" size="md">
            Filter
          </Button>
          <Button variant="primary" size="md">
            Add Asset
          </Button>
        </div>
      </section>

      {/* Content Area */}
      <section className="assets-table-page__content">
        {state === 'loading' && <LoadingState message="Loading assets…" />}

        {state === 'empty' && (
          <EmptyState
            title="No Assets Found"
            description="There are no assets to display. Add a new asset to get started."
            icon="🗄️"
            action={
              <Button variant="primary" onClick={() => handleStateChange('default')}>
                Add First Asset
              </Button>
            }
          />
        )}

        {state === 'error' && (
          <ErrorState
            title="Failed to Load Assets"
            message="An error occurred while trying to load the assets. Please try again."
            action={
              <Button variant="primary" onClick={() => handleStateChange('default')}>
                Retry
              </Button>
            }
          />
        )}

        {state === 'default' && (
          <div className="assets-table-page__table-container">
            {/* PROTOTYPE: Replace with official DS Table component when available */}
            <table className="assets-table">
              <thead className="assets-table__head">
                <tr className="assets-table__row assets-table__row--header">
                  <th className="assets-table__header">Asset Name</th>
                  <th className="assets-table__header">Type</th>
                  <th className="assets-table__header">Status</th>
                  <th className="assets-table__header">Owner</th>
                  <th className="assets-table__header">Last Updated</th>
                  <th className="assets-table__header">Risk Level</th>
                  <th className="assets-table__header assets-table__header--actions">Actions</th>
                </tr>
              </thead>
              <tbody className="assets-table__body">
                {filteredAssets.length === 0 ? (
                  <tr className="assets-table__row">
                    <td className="assets-table__cell assets-table__cell--empty" colSpan={7}>
                      No assets match your search.
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map((asset) => (
                    <tr key={asset.id} className="assets-table__row">
                      <td className="assets-table__cell assets-table__cell--name">
                        <span className="assets-table__asset-name">{asset.name}</span>
                      </td>
                      <td className="assets-table__cell">
                        <span className="assets-table__type-label">{asset.type}</span>
                      </td>
                      <td className="assets-table__cell">
                        <span className={`status-badge status-badge--${asset.status}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="assets-table__cell">{asset.owner}</td>
                      <td className="assets-table__cell assets-table__cell--date">
                        {asset.lastUpdated}
                      </td>
                      <td className="assets-table__cell">
                        <span className={`risk-badge risk-badge--${asset.riskLevel}`}>
                          {asset.riskLevel}
                        </span>
                      </td>
                      <td className="assets-table__cell assets-table__cell--actions">
                        <button className="assets-table__action-btn" type="button">
                          View
                        </button>
                        <button className="assets-table__action-btn" type="button">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <p className="assets-table-page__count">
              {filteredAssets.length} of {mockAssets.length} assets
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
