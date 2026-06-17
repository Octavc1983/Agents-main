import React, { useState } from 'react';
import { HorizontalTabs, VerticalTabs, NavigationIcon } from '../../design-system';
import type { TabItem } from '../../design-system/components/HorizontalTabs';
import type { VerticalTabItem } from '../../design-system/components/VerticalTabs';
import type { NavigationIconType, IconState } from '../../design-system/icons/navigation/navigation-icons.config';
import { Button } from '../../components/ui/Button/Button';
import './DesignSystemPreviewPage.scss';

export const DesignSystemPreviewPage: React.FC = () => {
  const [horizontalActiveId, setHorizontalActiveId] = useState('tab-1');
  const [verticalActiveId, setVerticalActiveId] = useState('vertical-tab-1');

  const horizontalTabs: TabItem[] = [
    { id: 'tab-1', label: 'Tab Name' },
    { id: 'tab-2', label: 'Tab Name' },
    { id: 'tab-3', label: 'Tab Name' },
    { id: 'tab-4', label: 'Tab Name' },
    { id: 'tab-5', label: 'Tab Name', disabled: true },
  ];

  const verticalTabs: VerticalTabItem[] = [
    { id: 'vertical-tab-1', label: 'Tab Name', subtitle: 'Tab subtitle' },
    { id: 'vertical-tab-2', label: 'Tab Name', subtitle: 'Tab subtitle' },
    { id: 'vertical-tab-3', label: 'Tab Name', subtitle: 'Tab subtitle' },
    { id: 'vertical-tab-4', label: 'Tab Name', subtitle: 'Tab subtitle' },
    { id: 'vertical-tab-5', label: 'Tab Name', disabled: true },
  ];

  return (
    <div className="design-system-preview">
      <header className="design-system-preview__header">
        <h1>Design System Preview</h1>
        <p>Tab Components - Extracted from Figma IDIRA Design System</p>
      </header>

      <main className="design-system-preview__content">
        {/* Horizontal Tabs Section */}
        <section className="design-system-preview__section">
          <div className="design-system-preview__section-header">
            <h2>Horizontal Tabs</h2>
            <p>Tab component with horizontal layout and underline indicator</p>
          </div>

          <div className="design-system-preview__component-wrapper">
            <div className="design-system-preview__demo">
              <h3>Interactive Demo</h3>
              <p className="design-system-preview__demo-label">
                Active Tab: <code>{horizontalActiveId}</code>
              </p>
              <HorizontalTabs
                items={horizontalTabs}
                activeId={horizontalActiveId}
                onChange={setHorizontalActiveId}
              />
              <div className="design-system-preview__content-area">
                <p>Selected tab content goes here</p>
              </div>
            </div>

            <div className="design-system-preview__variations">
              <h3>Component States</h3>
              <div className="design-system-preview__state-grid">
                <div className="design-system-preview__state">
                  <label>Default / Idle</label>
                  <HorizontalTabs
                    items={[
                      { id: 'default-1', label: 'Tab Name' },
                      { id: 'default-2', label: 'Tab Name' },
                      { id: 'default-3', label: 'Tab Name' },
                    ]}
                    defaultActiveId="default-1"
                  />
                </div>

                <div className="design-system-preview__state">
                  <label>With Disabled Tab</label>
                  <HorizontalTabs
                    items={[
                      { id: 'disabled-1', label: 'Active' },
                      { id: 'disabled-2', label: 'Disabled', disabled: true },
                      { id: 'disabled-3', label: 'Inactive' },
                    ]}
                    defaultActiveId="disabled-1"
                  />
                </div>

                <div className="design-system-preview__state">
                  <label>Many Tabs</label>
                  <HorizontalTabs
                    items={[
                      { id: 'many-1', label: 'One' },
                      { id: 'many-2', label: 'Two' },
                      { id: 'many-3', label: 'Three' },
                      { id: 'many-4', label: 'Four' },
                      { id: 'many-5', label: 'Five' },
                      { id: 'many-6', label: 'Six' },
                    ]}
                    defaultActiveId="many-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vertical Tabs Section */}
        <section className="design-system-preview__section">
          <div className="design-system-preview__section-header">
            <h2>Vertical Tabs</h2>
            <p>Tab component with vertical layout and gradient selection background</p>
          </div>

          <div className="design-system-preview__component-wrapper">
            <div className="design-system-preview__demo design-system-preview__demo--vertical">
              <h3>Interactive Demo</h3>
              <p className="design-system-preview__demo-label">
                Active Tab: <code>{verticalActiveId}</code>
              </p>
              <div className="design-system-preview__vertical-layout">
                <VerticalTabs
                  items={verticalTabs}
                  activeId={verticalActiveId}
                  onChange={setVerticalActiveId}
                />
                <div className="design-system-preview__content-area">
                  <p>Selected tab content goes here</p>
                </div>
              </div>
            </div>

            <div className="design-system-preview__variations">
              <h3>Component States</h3>
              <div className="design-system-preview__state-grid design-system-preview__state-grid--vertical">
                <div className="design-system-preview__state design-system-preview__state--vertical">
                  <label>Default / Idle</label>
                  <VerticalTabs
                    items={[
                      { id: 'v-default-1', label: 'Option', subtitle: 'Subtitle' },
                      { id: 'v-default-2', label: 'Option', subtitle: 'Subtitle' },
                      { id: 'v-default-3', label: 'Option', subtitle: 'Subtitle' },
                    ]}
                    defaultActiveId="v-default-1"
                  />
                </div>

                <div className="design-system-preview__state design-system-preview__state--vertical">
                  <label>With Disabled Tab</label>
                  <VerticalTabs
                    items={[
                      { id: 'v-disabled-1', label: 'Active', subtitle: 'Subtitle' },
                      { id: 'v-disabled-2', label: 'Disabled', subtitle: 'Disabled', disabled: true },
                      { id: 'v-disabled-3', label: 'Inactive', subtitle: 'Subtitle' },
                    ]}
                    defaultActiveId="v-disabled-1"
                  />
                </div>

                <div className="design-system-preview__state design-system-preview__state--vertical">
                  <label>Compact Variant</label>
                  <VerticalTabs
                    variant="compact"
                    items={[
                      { id: 'v-compact-1', label: 'Settings' },
                      { id: 'v-compact-2', label: 'Profile' },
                      { id: 'v-compact-3', label: 'Security' },
                    ]}
                    defaultActiveId="v-compact-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="design-system-preview__section">
          <div className="design-system-preview__section-header">
            <h2>Documentation</h2>
            <p>Component specifications and usage guidelines</p>
          </div>

          <div className="design-system-preview__documentation">
            <article className="design-system-preview__doc-article">
              <h3>HorizontalTabs</h3>
              <p>
                Horizontal tab navigation component with underline indicator. Supports idle, hover, selected, and disabled states.
              </p>
              <h4>Props:</h4>
              <ul>
                <li><code>items</code> - Array of TabItem objects</li>
                <li><code>activeId</code> - Currently active tab ID (controlled)</li>
                <li><code>defaultActiveId</code> - Initially active tab ID (uncontrolled)</li>
                <li><code>onChange</code> - Callback when tab changes</li>
                <li><code>className</code> - Additional CSS classes</li>
              </ul>
            </article>

            <article className="design-system-preview__doc-article">
              <h3>VerticalTabs</h3>
              <p>
                Vertical tab navigation component with gradient selection background. Supports subtitles and compact variant.
              </p>
              <h4>Props:</h4>
              <ul>
                <li><code>items</code> - Array of VerticalTabItem objects</li>
                <li><code>activeId</code> - Currently active tab ID (controlled)</li>
                <li><code>defaultActiveId</code> - Initially active tab ID (uncontrolled)</li>
                <li><code>onChange</code> - Callback when tab changes</li>
                <li><code>variant</code> - 'default' or 'compact' sizing</li>
                <li><code>className</code> - Additional CSS classes</li>
              </ul>
            </article>
          </div>
        </section>

        {/* NavigationIcon Section */}
        <section className="design-system-preview__section">
          <div className="design-system-preview__section-header">
            <h2>Navigation Icons</h2>
            <p>Icon component with 4 interaction states and 3 size variants — extracted from IDIRA Design System</p>
          </div>

          <div className="design-system-preview__icon-grid-wrapper">
            {/* State showcase */}
            <div className="design-system-preview__icon-states">
              <h3>States</h3>
              <div className="design-system-preview__icon-state-row">
                {(['idle', 'hover', 'selected', 'selectedHover'] as IconState[]).map((state) => (
                  <div key={state} className="design-system-preview__icon-state-cell">
                    <NavigationIcon type="Home" state={state} size="md" />
                    <span className="design-system-preview__icon-label">{state}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size showcase */}
            <div className="design-system-preview__icon-sizes">
              <h3>Sizes</h3>
              <div className="design-system-preview__icon-state-row">
                {(['sm', 'md', 'lg'] as Array<'sm' | 'md' | 'lg'>).map((size) => (
                  <div key={size} className="design-system-preview__icon-state-cell">
                    <NavigationIcon type="Settings" state="idle" size={size} />
                    <span className="design-system-preview__icon-label">{size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Icon catalogue */}
            <div className="design-system-preview__icon-catalogue">
              <h3>Icon Catalogue</h3>
              <div className="design-system-preview__icon-catalogue-grid">
                {(['Home', 'Infrastructure', 'Settings', 'Security', 'Audit', 'Reports',
                  'Policies', 'User', 'Integrations', 'Deployment', 'Notification', 'Inventory'] as NavigationIconType[]).map((type) => (
                  <div key={type} className="design-system-preview__icon-catalogue-item">
                    <NavigationIcon type={type} state="idle" size="md" />
                    <span className="design-system-preview__icon-label">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Button Variants Section */}
        <section className="design-system-preview__section">
          <div className="design-system-preview__section-header">
            <h2>Button</h2>
            <p>Placeholder Button component — replace with official DS Button when available</p>
          </div>

          <div className="design-system-preview__button-grid">
            {(['primary', 'secondary', 'tertiary', 'danger'] as const).map((variant) => (
              <div key={variant} className="design-system-preview__button-row">
                <span className="design-system-preview__button-label">{variant}</span>
                {(['sm', 'md', 'lg'] as const).map((size) => (
                  <Button key={size} variant={variant} size={size}>{size}</Button>
                ))}
                <Button variant={variant} size="md" disabled>disabled</Button>
                <Button variant={variant} size="md" isLoading>loading</Button>
              </div>
            ))}
          </div>
        </section>

        {/* Color Tokens Section */}
        <section className="design-system-preview__section">
          <div className="design-system-preview__section-header">
            <h2>Color Tokens</h2>
            <p>Design token reference — IDIRA primary palette and semantic colours</p>
          </div>

          <div className="design-system-preview__color-grid">
            {[
              { label: '--color-primary', value: '#7a80ff' },
              { label: '--color-primary-dark', value: '#8756d8' },
              { label: '--color-primary-darker', value: '#6040b8' },
              { label: '--color-tab-vertical-bg-selected-1', value: '#1e2d4a' },
              { label: '--color-tab-vertical-bg-selected-2', value: '#2a3d5e' },
              { label: '--color-background-dark', value: '#17243b' },
              { label: '--color-background-darker', value: '#0f1928' },
              { label: '--color-background-darkest', value: '#0a1020' },
              { label: '--color-text-light', value: '#e8eaf0' },
              { label: '--color-text-muted', value: '#8892a4' },
              { label: '--color-border-dark', value: '#2a3a52' },
              { label: '--color-tab-line', value: '#2a3a52' },
            ].map(({ label, value }) => (
              <div key={label} className="design-system-preview__color-swatch">
                <div
                  className="design-system-preview__color-chip"
                  style={{ backgroundColor: value }}
                />
                <div className="design-system-preview__color-info">
                  <code>{label}</code>
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Figma Mapping Section */}
        <section className="design-system-preview__section">
          <div className="design-system-preview__section-header">
            <h2>Figma Mapping</h2>
            <p>Design system extraction details and mapping information</p>
          </div>

          <div className="design-system-preview__mapping">
            <div className="design-system-preview__mapping-item">
              <h4>Source Design System</h4>
              <p>IDIRA Design System</p>
              <a 
                href="https://www.figma.com/design/enmdGI2KicrhIld9WvDERl/IDIRA-Design-System?node-id=98-527"
                target="_blank"
                rel="noopener noreferrer"
                className="design-system-preview__link"
              >
                View in Figma →
              </a>
            </div>

            <div className="design-system-preview__mapping-item">
              <h4>Component Library</h4>
              <p>src/design-system/</p>
              <p className="design-system-preview__subtext">All components and tokens are located here</p>
            </div>

            <div className="design-system-preview__mapping-item">
              <h4>Design Tokens</h4>
              <p>src/design-system/tokens/</p>
              <p className="design-system-preview__subtext">Colors, typography, spacing, and other design variables</p>
            </div>

            <div className="design-system-preview__mapping-item">
              <h4>Mapping Documentation</h4>
              <p>src/design-system/figma-mapping.md</p>
              <p className="design-system-preview__subtext">Detailed extraction and mapping information</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesignSystemPreviewPage;
