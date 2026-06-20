/**
 * HomePage Component
 * Landing page explaining the UX/UI Prototype environment
 */

import type React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@idira/design-system';
import { Button } from '@idira/design-system';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="home-page__hero">
        <h1 className="home-page__title">UX/UI Prototype Environment</h1>
        <p className="home-page__subtitle">
          Rapid prototyping with Figma MCP, React, TypeScript, and SCSS
        </p>
        <Link to="/prototype">
          <Button variant="primary">View Prototype Page</Button>
        </Link>
      </section>

      <section className="home-page__section">
        <h2 className="home-page__section-title">What is This?</h2>
        <div className="home-page__grid">
          <Card state="default" title="Figma-to-React" subtitle="MCP Integration">
            <p>
              This project is designed to work seamlessly with Figma through Model Context Protocol (MCP).
              Agents can read Figma frames and automatically generate React components.
            </p>
          </Card>
          <Card state="default" title="Design System Ready" subtitle="Infra Compatible">
            <p>
              Built with placeholder components that are ready to be swapped with your Infra Design System.
              All components include migration notes.
            </p>
          </Card>
          <Card state="default" title="SCSS Foundation" subtitle="Design Tokens">
            <p>
              Comprehensive SCSS setup with CSS custom properties, mixins, and design tokens. Perfect for
              rapid prototyping and maintaining design consistency.
            </p>
          </Card>
          <Card state="default" title="AI-Assisted" subtitle="Agent Ready">
            <p>
              Structured for AI agents to assist in component mapping, state management, and rapid page
              creation from Figma designs.
            </p>
          </Card>
        </div>
      </section>

      <section className="home-page__section">
        <h2 className="home-page__section-title">Key Features</h2>
        <ul className="home-page__features">
          <li>⚡ Vite + React + TypeScript for fast development</li>
          <li>🎨 SCSS with design tokens and mixins</li>
          <li>🗂️ Organized component structure</li>
          <li>🔗 React Router for multi-page prototypes</li>
          <li>📱 Responsive layout utilities</li>
          <li>🎯 State examples (loading, empty, error)</li>
          <li>🤖 AI-friendly folder structure</li>
          <li>📚 Figma MCP documentation included</li>
        </ul>
      </section>

      <section className="home-page__section">
        <h2 className="home-page__section-title">Getting Started</h2>
        <Card>
          <ol className="home-page__steps">
            <li>
              <strong>Explore the Prototype Page:</strong> Visit{' '}
              <code className="code-inline">/prototype</code> to see component examples and state
              demonstrations.
            </li>
            <li>
              <strong>Review the Structure:</strong> Check <code className="code-inline">src/</code> for
              the organized component and page structure.
            </li>
            <li>
              <strong>Read Figma Docs:</strong> See <code className="code-inline">src/figma/</code> for
              guidelines on Figma-to-React workflows.
            </li>
            <li>
              <strong>Create New Pages:</strong> Duplicate the Prototype Page structure to add new
              prototype pages.
            </li>
            <li>
              <strong>Connect to Design System:</strong> When ready, replace placeholder components with
              Infra DS imports.
            </li>
          </ol>
        </Card>
      </section>

      <section className="home-page__section">
        <h2 className="home-page__section-title">Next Steps</h2>
        <p>
          This environment is ready for Figma MCP integration. To connect your Figma designs:
        </p>
        <ul className="home-page__list">
          <li>Configure Figma MCP with Claude Code or your AI agent</li>
          <li>Use the guidelines in <code className="code-inline">src/figma/</code></li>
          <li>Create prototype pages from Figma frames</li>
          <li>Iterate and refine designs in real-time</li>
        </ul>
      </section>
    </div>
  );
};
