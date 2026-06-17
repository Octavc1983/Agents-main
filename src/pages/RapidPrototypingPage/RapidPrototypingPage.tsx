/**
 * RapidPrototypingPage Component
 * Demonstrates the UX/UI rapid prototyping workflow using AI, GitHub, Claude Code, MCP, React, and Design System
 */

import type React from 'react';
import { useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { LoadingState } from '../../components/ui/LoadingState/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState/ErrorState';
import type { ComponentState } from '../../types/prototype.types';
import './RapidPrototypingPage.scss';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'figma-input',
    title: 'Figma / UX Input',
    description:
      'Start with UX designs in Figma. The design defines the user experience, layout, components, and design system usage.',
    icon: '🎨',
  },
  {
    id: 'mcp-context',
    title: 'Claude MCP Context',
    description:
      'Claude Code uses Model Context Protocol to read Figma frames, extract component patterns, and understand design specifications.',
    icon: '🔗',
  },
  {
    id: 'react-generation',
    title: 'React Prototype Generation',
    description:
      'AI generates React components using existing design system components, maps Figma layers to React, and maintains design token alignment.',
    icon: '⚛️',
  },
  {
    id: 'ds-review',
    title: 'UX / DS Review',
    description:
      'Generated prototype is reviewed for design system compliance, UX requirements, and accessibility before moving to production.',
    icon: '✓',
  },
];

export const RapidPrototypingPage: React.FC = () => {
  const [state, setState] = useState<ComponentState>('default');

  const handleRetry = () => {
    setState('default');
  };

  return (
    <div className="rapid-prototyping-page">
      {/* Page Header Section */}
      <section className="rapid-prototyping-page__section">
        <h1 className="rapid-prototyping-page__title">Rapid Prototyping Workflow</h1>
        <p className="rapid-prototyping-page__description">
          This page demonstrates how AI-assisted prototyping can move from UX/UI requirements into a
          working React prototype while staying aligned with an existing Design System.
        </p>
      </section>

      {/* State Control Panel */}
      <section className="rapid-prototyping-page__section">
        <h2 className="rapid-prototyping-page__subtitle">Page State Demo</h2>
        <Card variant="elevated">
          <div className="rapid-prototyping-page__controls">
            <p className="rapid-prototyping-page__control-label">
              Current State: <strong>{state}</strong>
            </p>
            <div className="rapid-prototyping-page__buttons">
              <Button
                variant={state === 'default' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setState('default')}
              >
                Default
              </Button>
              <Button
                variant={state === 'loading' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setState('loading')}
              >
                Loading
              </Button>
              <Button
                variant={state === 'empty' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setState('empty')}
              >
                Empty
              </Button>
              <Button
                variant={state === 'error' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setState('error')}
              >
                Error
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Area - States */}
      <section className="rapid-prototyping-page__section">
        <h2 className="rapid-prototyping-page__subtitle">Workflow Overview</h2>

        {state === 'default' && (
          <div>
            {/* Workflow Cards Grid */}
            <div className="rapid-prototyping-page__workflow-grid">
              {workflowSteps.map((step) => (
                <Card key={step.id} variant="default" title={step.title}>
                  <div className="rapid-prototyping-page__workflow-card">
                    <div className="rapid-prototyping-page__workflow-icon">{step.icon}</div>
                    <p className="rapid-prototyping-page__workflow-description">
                      {step.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Ready for Review Message */}
            <Card variant="elevated" title="Status">
              <div className="rapid-prototyping-page__status-message">
                <p className="rapid-prototyping-page__status-text">
                  ✓ Workflow integration complete and ready for review
                </p>
                <p className="rapid-prototyping-page__status-hint">
                  This prototype demonstrates the full rapid prototyping cycle from design to
                  working React component.
                </p>
              </div>
            </Card>
          </div>
        )}

        {state === 'loading' && (
          <LoadingState message="Processing workflow..." />
        )}

        {state === 'empty' && (
          <EmptyState
            title="No Workflow Data"
            description="There are currently no workflow steps to display. Create a new prototype to get started."
            action={
              <Button variant="primary" onClick={() => setState('default')}>
                Return to Default
              </Button>
            }
          />
        )}

        {state === 'error' && (
          <ErrorState
            title="Workflow Error"
            message="Failed to load the rapid prototyping workflow. Please try again."
            action={
              <Button variant="primary" onClick={handleRetry}>
                Retry
              </Button>
            }
          />
        )}
      </section>

      {/* Additional Context Section */}
      <section className="rapid-prototyping-page__section">
        <h2 className="rapid-prototyping-page__subtitle">Key Benefits</h2>
        <div className="rapid-prototyping-page__benefits-grid">
          <Card variant="outlined">
            <h4 className="rapid-prototyping-page__benefit-title">⚡ Speed</h4>
            <p className="rapid-prototyping-page__benefit-description">
              Generate working prototypes in minutes, not hours. AI handles boilerplate and component
              mapping.
            </p>
          </Card>
          <Card variant="outlined">
            <h4 className="rapid-prototyping-page__benefit-title">🎯 Accuracy</h4>
            <p className="rapid-prototyping-page__benefit-description">
              Pixel-perfect implementation aligned with design tokens, spacing, colors, and typography.
            </p>
          </Card>
          <Card variant="outlined">
            <h4 className="rapid-prototyping-page__benefit-title">🔗 Consistency</h4>
            <p className="rapid-prototyping-page__benefit-description">
              Always use existing design system components. No duplication, no design drift.
            </p>
          </Card>
          <Card variant="outlined">
            <h4 className="rapid-prototyping-page__benefit-title">📚 Maintainability</h4>
            <p className="rapid-prototyping-page__benefit-description">
              Generated code follows project conventions, is fully typed with TypeScript, and is
              production-ready.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};
