/**
 * PrototypePage Component
 * Demonstrates all UI states and components available in the prototype
 */

import type React from 'react';
import { useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { LoadingState } from '../../components/ui/LoadingState/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState/ErrorState';
import type { ComponentState, MockItem } from '../../types/prototype.types';
import { mockItems } from '../../mock/prototypeMockData';
import './PrototypePage.scss';

export const PrototypePage: React.FC = () => {
  const [state, setState] = useState<ComponentState>('default');
  const [items, setItems] = useState<MockItem[]>(mockItems);

  const handleStateChange = (newState: ComponentState) => {
    setState(newState);
  };

  const handleAddItem = () => {
    const newItem: MockItem = {
      id: `${Date.now()}`,
      title: 'New Prototype Item',
      description: 'This is a newly added item to demonstrate state management',
      status: 'pending',
      createdAt: new Date(),
    };
    setItems([newItem, ...items]);
    setState('default');
  };

  const handleClearItems = () => {
    setItems([]);
    setState('empty');
  };

  return (
    <div className="prototype-page">
      <section className="prototype-page__section">
        <h1 className="prototype-page__title">Prototype Page</h1>
        <p className="prototype-page__description">
          This page demonstrates all available UI components and states in the prototype environment.
        </p>
      </section>

      <section className="prototype-page__section">
        <h2 className="prototype-page__subtitle">State Control Panel</h2>
        <Card variant="elevated">
          <div className="prototype-page__controls">
            <p className="prototype-page__control-label">Current State: <strong>{state}</strong></p>
            <div className="prototype-page__buttons">
              <Button
                variant={state === 'default' ? 'primary' : 'secondary'}
                onClick={() => handleStateChange('default')}
              >
                Default
              </Button>
              <Button
                variant={state === 'loading' ? 'primary' : 'secondary'}
                onClick={() => handleStateChange('loading')}
              >
                Loading
              </Button>
              <Button
                variant={state === 'empty' ? 'primary' : 'secondary'}
                onClick={() => handleStateChange('empty')}
              >
                Empty
              </Button>
              <Button
                variant={state === 'error' ? 'primary' : 'secondary'}
                onClick={() => handleStateChange('error')}
              >
                Error
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <section className="prototype-page__section">
        <h2 className="prototype-page__subtitle">Content Area</h2>

        {state === 'default' && (
          <div>
            <Card variant="elevated" title="Prototype Items" subtitle="List of prototype features">
              <div className="prototype-page__item-list">
                {items.map((item) => (
                  <div key={item.id} className="prototype-page__item">
                    <div className="prototype-page__item-header">
                      <h4 className="prototype-page__item-title">{item.title}</h4>
                      <span className={`prototype-page__status prototype-page__status--${item.status}`}>
                        {item.status}
                      </span>
                    </div>
                    {item.description && (
                      <p className="prototype-page__item-description">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="prototype-page__item-actions">
                <Button variant="primary" onClick={handleAddItem}>
                  Add Item
                </Button>
                <Button variant="danger" onClick={handleClearItems}>
                  Clear Items
                </Button>
              </div>
            </Card>
          </div>
        )}

        {state === 'loading' && <LoadingState message="Loading prototype content..." />}

        {state === 'empty' && (
          <EmptyState
            title="No Items"
            description="There are no items to display. Create a new one to get started."
            icon="📭"
            action={<Button variant="primary" onClick={handleAddItem}>Add First Item</Button>}
          />
        )}

        {state === 'error' && (
          <ErrorState
            title="Failed to Load Content"
            message="An error occurred while trying to load the prototype content. Please try again."
            action={<Button variant="primary" onClick={() => handleStateChange('default')}>Retry</Button>}
          />
        )}
      </section>

      <section className="prototype-page__section">
        <h2 className="prototype-page__subtitle">Component Examples</h2>
        <div className="prototype-page__grid">
          <Card title="Button Variants" subtitle="Primary, Secondary, Tertiary, Danger">
            <div className="prototype-page__example-buttons">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </Card>

          <Card title="Button Sizes" subtitle="Small, Medium, Large">
            <div className="prototype-page__example-buttons">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card>

          <Card title="Loading States" subtitle="Button with loading state">
            <Button isLoading>Loading Button</Button>
          </Card>

          <Card title="Card Variants" subtitle="Default, Elevated, Outlined">
            <div className="prototype-page__card-variants">
              <Card variant="default">Default Card</Card>
              <Card variant="elevated">Elevated Card</Card>
              <Card variant="outlined">Outlined Card</Card>
            </div>
          </Card>
        </div>
      </section>

      <section className="prototype-page__section">
        <h2 className="prototype-page__subtitle">Typography Scale</h2>
        <Card>
          <div className="prototype-page__typography">
            <h1 className="heading-1">Heading 1</h1>
            <h2 className="heading-2">Heading 2</h2>
            <h3 className="heading-3">Heading 3</h3>
            <h4 className="heading-4">Heading 4</h4>
            <p className="body-large">Body Large</p>
            <p className="body-normal">Body Normal</p>
            <p className="body-small">Body Small</p>
            <p className="caption">Caption</p>
          </div>
        </Card>
      </section>
    </div>
  );
};
