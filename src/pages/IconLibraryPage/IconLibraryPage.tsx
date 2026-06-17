import React, { useState } from 'react';
import {
  NavigationIcon,
  navigationIconMap,
  type NavigationIconType,
  type IconState,
} from '../../design-system/icons';
import './IconLibraryPage.scss';

/**
 * Icon Library Preview Page
 * Displays all navigation icons extracted from IDIRA Design System
 * Shows all states: idle, hover, selected, selectedHover
 * Extracted from Figma Navigation_icons frame (24547:6482)
 */
export const IconLibraryPage: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [selectedState, setSelectedState] = useState<IconState>('idle');
  const [filterText, setFilterText] = useState('');

  const allIconTypes = Object.keys(navigationIconMap) as NavigationIconType[];
  const filteredIcons = allIconTypes.filter((icon) =>
    icon.toLowerCase().includes(filterText.toLowerCase())
  );

  const iconStates: IconState[] = ['idle', 'hover', 'selected', 'selectedHover'];

  return (
    <div className="icon-library-page">
      <div className="icon-library-page__header">
        <h1>Navigation Icon Library</h1>
        <p>39 icons extracted from IDIRA Design System (Figma Frame: Navigation_icons)</p>
      </div>

      <div className="icon-library-page__controls">
        <div className="icon-library-page__control-group">
          <label htmlFor="filter">Filter Icons:</label>
          <input
            id="filter"
            type="text"
            placeholder="Search icon names..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="icon-library-page__filter"
          />
        </div>

        <div className="icon-library-page__control-group">
          <label>Size:</label>
          <div className="icon-library-page__button-group">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <button
                key={size}
                className={`icon-library-page__button ${selectedSize === size ? 'icon-library-page__button--active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="icon-library-page__control-group">
          <label>State:</label>
          <div className="icon-library-page__button-group">
            {iconStates.map((state) => (
              <button
                key={state}
                className={`icon-library-page__button ${selectedState === state ? 'icon-library-page__button--active' : ''}`}
                onClick={() => setSelectedState(state)}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Single State View */}
      <section className="icon-library-page__section">
        <h2>Single State View ({selectedState})</h2>
        <div className="icon-library-page__grid icon-library-page__grid--single">
          {filteredIcons.map((iconType) => (
            <div key={iconType} className="icon-library-page__icon-item">
              <NavigationIcon type={iconType} state={selectedState} size={selectedSize} />
              <span className="icon-library-page__icon-label">{iconType}</span>
            </div>
          ))}
        </div>
      </section>

      {/* All States View */}
      <section className="icon-library-page__section">
        <h2>All States View</h2>
        <div className="icon-library-page__grid icon-library-page__grid--all-states">
          {filteredIcons.map((iconType) => (
            <div key={iconType} className="icon-library-page__icon-card">
              <div className="icon-library-page__icon-card-label">{iconType}</div>
              <div className="icon-library-page__icon-states">
                {iconStates.map((state) => (
                  <div key={state} className="icon-library-page__icon-state">
                    <NavigationIcon type={iconType} state={state} size="md" />
                    <span className="icon-library-page__state-label">{state}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="icon-library-page__info">
        <h2>Icon Library Information</h2>
        <div className="icon-library-page__info-content">
          <div className="icon-library-page__info-item">
            <h3>Total Icons</h3>
            <p>{filteredIcons.length} of {allIconTypes.length} icons</p>
          </div>
          <div className="icon-library-page__info-item">
            <h3>Icon States</h3>
            <p>idle, hover, selected, selectedHover</p>
          </div>
          <div className="icon-library-page__info-item">
            <h3>Size Variants</h3>
            <p>sm (16px), md (24px), lg (32px)</p>
          </div>
          <div className="icon-library-page__info-item">
            <h3>Design System</h3>
            <p>IDIRA Design System (Figma)</p>
          </div>
        </div>
      </section>

      <section className="icon-library-page__code">
        <h2>Usage Example</h2>
        <pre>
          {`import { NavigationIcon } from '@/design-system/icons';

// Basic usage
<NavigationIcon type="Home" />

// With state
<NavigationIcon 
  type="Settings" 
  state="selected" 
  size="lg"
  ariaLabel="Settings"
/>

// With custom class
<NavigationIcon 
  type="Infrastructure" 
  state="hover"
  className="custom-icon"
/>`}
        </pre>
      </section>

      <section className="icon-library-page__figma-info">
        <h2>Figma Source</h2>
        <div className="icon-library-page__figma-details">
          <p>
            <strong>File:</strong> IDIRA Design System
          </p>
          <p>
            <strong>Frame:</strong> Navigation_icons (node-id: 24547:6482)
          </p>
          <p>
            <strong>Icon Size:</strong> 24x24 px
          </p>
          <p>
            <strong>Extraction Method:</strong> Figma MCP get_metadata and get_screenshot
          </p>
        </div>
      </section>
    </div>
  );
};

export default IconLibraryPage;
