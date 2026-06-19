/**
 * Sidebar — Spaces Navigation
 * PRD: Spaces Navigation System
 *
 * Item type is read from the explicit NavItem.type field:
 *   button   = navigates directly; no children
 *   split    = navigates directly AND can expand children
 *   dropdown = expands/collapses only; no direct navigation path
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { NavItem, NavItemType, SpaceSchema } from '@/navigation/navConfig';
import { spacesRegistry, getDefaultPathForSpace } from '@/navigation/navConfig';
import {
  IDIRALogoIcon,
  CollapseIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@idira/design-system/icons';
import {
  AccessIcon,
  ManageIcon,
  RiskIcon,
  AuditIcon,
  SetupIcon,
  CommandCenterIcon,
} from '@idira/design-system/icons';
import './Sidebar.scss';

// ── Space icon resolver ───────────────────────────────────────────────────────

const SPACE_ICON_MAP: Record<string, React.FC<{ size?: number }>> = {
  access: AccessIcon,
  manage: ManageIcon,
  risk: RiskIcon,
  audit: AuditIcon,
  setup: SetupIcon,
  commandCenter: CommandCenterIcon,
};

const SpaceIconEl: React.FC<{ spaceId: string; size?: number }> = ({ spaceId, size = 28 }) => {
  const Icon = SPACE_ICON_MAP[spaceId];
  return Icon ? <Icon size={size} /> : null;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

type ItemType = NavItemType;

function getItemType(item: NavItem): ItemType {
  return item.type;
}

function containsPath(items: NavItem[], pathname: string): boolean {
  for (const item of items) {
    if (item.path === pathname) return true;
    if (item.children && containsPath(item.children, pathname)) return true;
  }
  return false;
}

function getAncestorIds(items: NavItem[], pathname: string, acc: string[] = []): string[] {
  for (const item of items) {
    if (item.children?.length) {
      const found = getAncestorIds(item.children, pathname, [...acc, item.id]);
      if (found.length > acc.length) return found;
    }
    if (item.path === pathname) return acc;
  }
  return [];
}

function getActiveSpaceId(spaces: SpaceSchema[], pathname: string): string | null {
  for (const space of spaces) {
    if (pathname.startsWith(`/${space.id}`)) return space.id;
    if (containsPath(space.items, pathname)) return space.id;
  }
  return spaces[0]?.id ?? null;
}

// ── Nav item renderer ─────────────────────────────────────────────────────────

interface NavItemProps {
  item: NavItem;
  activeRoute: string;
  openIds: Set<string>;
  onToggle: (id: string) => void;
  depth?: number;
}

const NavItemRow: React.FC<NavItemProps> = ({
  item, activeRoute, openIds, onToggle, depth = 0,
}) => {
  const type = getItemType(item);
  const isOpen = openIds.has(item.id);
  const hasChildren = !!item.children?.length;
  const isActive = item.path === activeRoute;
  const isActivePath = !isActive && hasChildren && containsPath(item.children!, activeRoute);

  const Icon = item.icon as React.FC<{ size?: number }> | undefined;

  const rowClass = [
    'nav-item',
    isActive ? 'nav-item--active' : '',
    isActivePath ? 'nav-item--active-path' : '',
    depth === 0 ? 'nav-item--level-2' : depth === 1 ? 'nav-item--level-3' : 'nav-item--level-4',
  ].filter(Boolean).join(' ');

  const expandBtn = hasChildren ? (
    <button
      type="button"
      className="nav-item__expand-btn"
      onClick={e => { e.stopPropagation(); e.preventDefault(); onToggle(item.id); }}
      aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
      aria-expanded={isOpen}
    >
      {isOpen ? <ChevronDownIcon size={12} /> : <ChevronRightIcon size={12} />}
    </button>
  ) : null;

  const iconEl = Icon ? (
    <span className="nav-item__icon">
      <Icon size={16} />
    </span>
  ) : null;

  const labelEl = <span className="nav-item__label">{item.label}</span>;

  let row: React.ReactNode;

  if (type === 'button') {
    row = (
      <Link to={item.path!} className={rowClass} aria-current={isActive ? 'page' : undefined}>
        {iconEl}
        {labelEl}
      </Link>
    );
  } else if (type === 'dropdown') {
    row = (
      <button
        type="button"
        className={rowClass}
        onClick={() => onToggle(item.id)}
        aria-expanded={isOpen}
      >
        {iconEl}
        {labelEl}
        {expandBtn}
      </button>
    );
  } else {
    // split: label navigates, divider, arrow expands independently
    row = (
      <div className={rowClass}>
        <Link
          to={item.path!}
          className="nav-item__split-link"
          aria-current={isActive ? 'page' : undefined}
          onClick={e => e.stopPropagation()}
        >
          {iconEl}
          {labelEl}
        </Link>
        <span className="nav-item__split-divider" aria-hidden="true" />
        {expandBtn}
      </div>
    );
  }

  return (
    <>
      {row}
      {hasChildren && isOpen && (
        <div className="nav-item__children" role="group">
          {item.children!.map(child => (
            <NavItemRow
              key={child.id}
              item={child}
              activeRoute={activeRoute}
              openIds={openIds}
              onToggle={onToggle}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

// ── Space switcher ────────────────────────────────────────────────────────────

interface SpaceSwitcherProps {
  spaces: SpaceSchema[];
  activeSpaceId: string | null;
  isCollapsed: boolean;
  onSelect: (space: SpaceSchema) => void;
}

const SpaceSwitcher: React.FC<SpaceSwitcherProps> = ({
  spaces, activeSpaceId, isCollapsed, onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const active = spaces.find(s => s.id === activeSpaceId);

  return (
    <div className="space-switcher" ref={ref}>
      <button
        type="button"
        className="space-switcher__btn"
        onClick={() => setOpen(v => !v)}
        aria-label={`Current space: ${active?.label ?? 'None'}. Switch space`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {active && (
          <span className="space-switcher__icon-wrap">
            <SpaceIconEl spaceId={active.id} size={24} />
          </span>
        )}
        {!isCollapsed && (
          <>
            <span className="space-switcher__label-wrap">
              <span className="space-switcher__label">{active?.label ?? 'Select Space'}</span>
            </span>
            <span className="space-switcher__arrow">
              <ChevronDownIcon size={12} />
            </span>
          </>
        )}
      </button>

      {open && (
        <div className="space-switcher__dropdown" role="listbox" aria-label="Select space">
          {spaces.map(space => (
            <button
              key={space.id}
              type="button"
              role="option"
              aria-selected={space.id === activeSpaceId}
              className={`space-switcher__option${space.id === activeSpaceId ? ' space-switcher__option--active' : ''}`}
              onClick={() => { onSelect(space); setOpen(false); }}
            >
              <span className="space-switcher__option-icon">
                <SpaceIconEl spaceId={space.id} size={20} />
              </span>
              <span>{space.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Collapsed flyout ──────────────────────────────────────────────────────────

interface FlyoutProps {
  space: SpaceSchema;
  activeRoute: string;
  onNavigate: (route: string) => void;
}

const CollapsedFlyout: React.FC<FlyoutProps> = ({ space, activeRoute, onNavigate }) => {
  const renderItems = (items: NavItem[], depth = 0): React.ReactNode =>
    items.map(item => (
      <div key={item.id}>
        {item.path ? (
          <button
            type="button"
            className={[
              'flyout-item',
              `flyout-item--depth-${Math.min(depth, 3)}`,
              item.path === activeRoute ? 'flyout-item--active' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => onNavigate(item.path!)}
          >
            {item.label}
          </button>
        ) : (
          <div className={`flyout-group flyout-group--depth-${Math.min(depth, 3)}`}>
            {item.label}
          </div>
        )}
        {item.children && renderItems(item.children, depth + 1)}
      </div>
    ));

  return (
    <div className="nav-flyout" role="navigation" aria-label={`${space.label} navigation`}>
      <div className="nav-flyout__header">{space.label}</div>
      {renderItems(space.items)}
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [flyoutSpaceId, setFlyoutSpaceId] = useState<string | null>(null);
  const flyoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeSpaceId = useMemo(
    () => getActiveSpaceId(spacesRegistry, location.pathname),
    [location.pathname]
  );

  const activeSpace = spacesRegistry.find(s => s.id === activeSpaceId) ?? null;

  // Reset manually-opened nodes when switching to a different space
  const prevSpaceIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (prevSpaceIdRef.current !== null && prevSpaceIdRef.current !== activeSpaceId) {
      setOpenIds(new Set());
    }
    prevSpaceIdRef.current = activeSpaceId;
  }, [activeSpaceId]);

  const ancestorIds = useMemo(() => {
    if (!activeSpace) return new Set<string>();
    return new Set(getAncestorIds(activeSpace.items, location.pathname));
  }, [activeSpace, location.pathname]);

  const effectiveOpenIds = useMemo(
    () => new Set([...openIds, ...ancestorIds]),
    [openIds, ancestorIds]
  );

  const handleToggle = useCallback((id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleSpaceSelect = useCallback((space: SpaceSchema) => {
    navigate(getDefaultPathForSpace(space.id));
  }, [navigate]);

  const handleFlyoutEnter = useCallback((spaceId: string) => {
    if (flyoutTimer.current) clearTimeout(flyoutTimer.current);
    setFlyoutSpaceId(spaceId);
  }, []);

  const handleFlyoutLeave = useCallback(() => {
    if (flyoutTimer.current) clearTimeout(flyoutTimer.current);
    flyoutTimer.current = setTimeout(() => setFlyoutSpaceId(null), 150);
  }, []);

  return (
    <aside
      className={`sidebar${isCollapsed ? ' sidebar--collapsed' : ''}`}
      aria-label="Primary navigation"
    >
      {/* Brand */}
      <div className="sidebar__brand">
        <Link to="/" className="sidebar__logo" aria-label="Home">
          <IDIRALogoIcon size={28} />
          {!isCollapsed && (
            <span className="sidebar__logo-text">
              <span className="sidebar__logo-title">IDIRA</span>
              <span className="sidebar__logo-subtitle">BY PALO ALTO NETWORKS</span>
            </span>
          )}
        </Link>
        {!isCollapsed && (
          <button
            type="button"
            className="sidebar__collapse-btn"
            onClick={() => setIsCollapsed(true)}
            aria-label="Collapse sidebar"
          >
            <CollapseIcon size={14} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <button
          type="button"
          className="sidebar__expand-btn"
          onClick={() => setIsCollapsed(false)}
          aria-label="Expand sidebar"
        >
          <ChevronRightIcon size={14} />
        </button>
      )}

      {/* Space Switcher */}
      {spacesRegistry.length > 0 && !isCollapsed && (
        <div className="sidebar__space-area">
          <SpaceSwitcher
            spaces={spacesRegistry}
            activeSpaceId={activeSpaceId}
            isCollapsed={isCollapsed}
            onSelect={handleSpaceSelect}
          />
        </div>
      )}

      {/* Navigation tree */}
      <nav className="sidebar__nav" aria-label="Space navigation">
        {activeSpace && !isCollapsed &&
          activeSpace.items.map(item => (
            <NavItemRow
              key={item.id}
              item={item}
              activeRoute={location.pathname}
              openIds={effectiveOpenIds}
              onToggle={handleToggle}
            />
          ))
        }

        {/* Collapsed: icon per space + flyout */}
        {isCollapsed && spacesRegistry.map(space => (
          <div
            key={space.id}
            className={`sidebar__space-icon-btn${space.id === activeSpaceId ? ' sidebar__space-icon-btn--active' : ''}`}
            onMouseEnter={() => handleFlyoutEnter(space.id)}
            onMouseLeave={handleFlyoutLeave}
          >
            <button
              type="button"
              aria-label={space.label}
              title={space.label}
              onClick={() => handleSpaceSelect(space)}
            >
              <SpaceIconEl spaceId={space.id} size={24} />
            </button>

            {flyoutSpaceId === space.id && space.items.length > 0 && (
              <div
                className="sidebar__flyout-wrap"
                onMouseEnter={() => handleFlyoutEnter(space.id)}
                onMouseLeave={handleFlyoutLeave}
              >
                <CollapsedFlyout
                  space={space}
                  activeRoute={location.pathname}
                  onNavigate={route => { navigate(route); setFlyoutSpaceId(null); }}
                />
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
