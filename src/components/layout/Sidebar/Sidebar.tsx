/**
 * Sidebar — Spaces Navigation
 *
 * Item type rules:
 *   button   = navigates directly; no children
 *   split    = navigates AND expands children
 *   dropdown = expands only; no navigation path
 *
 * Collapsed mode renders:
 *   IDIRA logo (expand trigger)
 *   Active Space icon (SpaceSwitcher trigger)
 *   Level-1 icons of active Space only
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { NavItem, SpaceId, SpaceSchema } from '@/navigation/navConfig';
import {
  spacesRegistry,
  getDefaultPathForSpace,
  resolveActiveNavigationState,
  validateSpacesRegistry,
} from '@/navigation/navConfig';
import {
  IDIRALogoIcon,
  CollapseIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  DotsGridIcon,
  AccessIcon,
  ManageIcon,
  RiskIcon,
  AuditSpaceIcon,
  SetupIcon,
  CommandCenterIcon,
} from '@idira/design-system/icons';
import './Sidebar.scss';

if (!import.meta.env.PROD) {
  validateSpacesRegistry(spacesRegistry);
}

// ── Space icon resolver ───────────────────────────────────────────────────────

const SPACE_ICON_MAP: Record<string, React.FC<{ size?: number }>> = {
  access: AccessIcon,
  manage: ManageIcon,
  risk: RiskIcon,
  audit: AuditSpaceIcon,
  setup: SetupIcon,
  commandCenter: CommandCenterIcon,
};

const SpaceIconEl: React.FC<{ spaceId: string; size?: number }> = ({ spaceId, size = 28 }) => {
  const Icon = SPACE_ICON_MAP[spaceId];
  return Icon ? <Icon size={size} /> : null;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function containsPath(items: NavItem[], pathname: string): boolean {
  for (const item of items) {
    if (item.path === pathname) return true;
    if (item.children && containsPath(item.children, pathname)) return true;
  }
  return false;
}

// ── Expanded nav item ─────────────────────────────────────────────────────────

interface NavItemRowProps {
  item: NavItem;
  activeRoute: string;
  openIds: Set<string>;
  onToggle: (id: string) => void;
  depth?: number;
}

const NavItemRow: React.FC<NavItemRowProps> = ({
  item, activeRoute, openIds, onToggle, depth = 0,
}) => {
  const type = item.type;
  const isOpen = openIds.has(item.id);
  const hasChildren = !!item.children?.length;
  const isActive = item.path === activeRoute;
  const isActivePath = !isActive && hasChildren && containsPath(item.children!, activeRoute);
  const Icon = item.icon as React.FC<{ size?: number }> | undefined;

  const rowClass = [
    'nav-item',
    `nav-item--${type}`,
    hasChildren ? 'nav-item--has-children' : '',
    isOpen ? 'nav-item--open' : '',
    isActive ? 'nav-item--active' : '',
    isActivePath ? 'nav-item--active-path' : '',
    `nav-item--depth-${Math.min(depth + 1, 4)}`,
  ].filter(Boolean).join(' ');

  const iconEl = Icon ? <span className="nav-item__icon"><Icon size={24} /></span> : null;
  const labelEl = <span className="nav-item__label">{item.label}</span>;
  const chevronEl = (
    <span className="nav-item__expand-indicator" aria-hidden="true">
      {isOpen ? <ChevronDownIcon size={12} /> : <ChevronRightIcon size={12} />}
    </span>
  );

  let row: React.ReactNode;

  if (type === 'button') {
    row = (
      <Link to={item.path!} className={rowClass} aria-current={isActive ? 'page' : undefined}>
        {iconEl}{labelEl}
      </Link>
    );
  } else if (type === 'dropdown') {
    // Single button — chevron is a non-interactive span (fixes nested-button invalid HTML)
    row = (
      <button
        type="button"
        className={rowClass}
        onClick={() => onToggle(item.id)}
        aria-expanded={isOpen}
      >
        {iconEl}{labelEl}{chevronEl}
      </button>
    );
  } else {
    // split: Link navigates, separate button expands
    row = (
      <div className={rowClass}>
        <Link
          to={item.path!}
          className="nav-item__split-link"
          aria-current={isActive ? 'page' : undefined}
        >
          {iconEl}{labelEl}
        </Link>
        <span className="nav-item__split-divider" aria-hidden="true" />
        <button
          type="button"
          className="nav-item__expand-btn"
          onClick={e => { e.stopPropagation(); onToggle(item.id); }}
          aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
          aria-expanded={isOpen}
        >
          {isOpen ? <ChevronDownIcon size={12} /> : <ChevronRightIcon size={12} />}
        </button>
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

// ── Collapsed item flyout ─────────────────────────────────────────────────────

interface CollapsedFlyoutMenuProps {
  rootItem: NavItem;
  activeRoute: string;
  onNavigate: (path: string) => void;
  onClose: () => void;
}

const CollapsedFlyoutMenu: React.FC<CollapsedFlyoutMenuProps> = ({
  rootItem, activeRoute, onNavigate, onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus first item on open
    const first = ref.current?.querySelector<HTMLElement>('[role="menuitem"]');
    first?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = Array.from(
          ref.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
        );
        const idx = items.indexOf(document.activeElement as HTMLElement);
        const next = e.key === 'ArrowDown'
          ? items[(idx + 1) % items.length]
          : items[(idx - 1 + items.length) % items.length];
        next?.focus();
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [onClose]);

  const renderItems = (items: NavItem[], depth = 0): React.ReactNode =>
    items.map(item => (
      <React.Fragment key={item.id}>
        {item.path ? (
          <button
            type="button"
            role="menuitem"
            className={[
              'collapsed-flyout__item',
              `collapsed-flyout__item--depth-${Math.min(depth, 3)}`,
              item.path === activeRoute ? 'collapsed-flyout__item--active' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => { onNavigate(item.path!); onClose(); }}
          >
            {item.label}
          </button>
        ) : (
          <div className={`collapsed-flyout__group collapsed-flyout__group--depth-${Math.min(depth, 2)}`}>
            {item.label}
          </div>
        )}
        {item.children && renderItems(item.children, depth + 1)}
      </React.Fragment>
    ));

  return (
    <div ref={ref} className="collapsed-flyout" role="menu" aria-label={rootItem.label}>
      {/* For split items: first entry navigates to the parent path */}
      {rootItem.type === 'split' && rootItem.path && (
        <button
          type="button"
          role="menuitem"
          className={[
            'collapsed-flyout__item collapsed-flyout__item--parent',
            rootItem.path === activeRoute ? 'collapsed-flyout__item--active' : '',
          ].filter(Boolean).join(' ')}
          onClick={() => { onNavigate(rootItem.path!); onClose(); }}
        >
          {rootItem.label}
        </button>
      )}
      {rootItem.children && renderItems(rootItem.children)}
    </div>
  );
};

// ── Collapsed level-1 item ────────────────────────────────────────────────────

interface CollapsedNavItemProps {
  item: NavItem;
  activeRoute: string;
  activeLevelOneItemId: string | null;
  onNavigate: (path: string) => void;
}

const CollapsedNavItem: React.FC<CollapsedNavItemProps> = ({
  item, activeRoute, activeLevelOneItemId, onNavigate,
}) => {
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const Icon = item.icon as React.FC<{ size?: number }> | undefined;
  const isActive = item.id === activeLevelOneItemId;
  const hasChildren = Boolean(item.children?.length);

  const handleClick = () => {
    if (item.type === 'button' && item.path) {
      onNavigate(item.path);
      return;
    }
    setFlyoutOpen(prev => !prev);
  };

  const handleClose = useCallback(() => {
    setFlyoutOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <div className="collapsed-nav-item">
      <button
        ref={triggerRef}
        type="button"
        className={[
          'collapsed-nav-item__trigger',
          isActive ? 'collapsed-nav-item__trigger--active' : '',
        ].filter(Boolean).join(' ')}
        aria-label={item.label}
        aria-current={isActive ? 'page' : undefined}
        aria-haspopup={hasChildren ? 'menu' : undefined}
        aria-expanded={hasChildren ? flyoutOpen : undefined}
        onClick={handleClick}
        title={item.label}
      >
        {Icon && <Icon size={24} />}
      </button>

      {hasChildren && flyoutOpen && (
        <CollapsedFlyoutMenu
          rootItem={item}
          activeRoute={activeRoute}
          onNavigate={onNavigate}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

// ── Spaces overlay ────────────────────────────────────────────────────────────

interface SpacesOverlayProps {
  spaces: SpaceSchema[];
  activeSpaceId: SpaceId | null;
  isCollapsed: boolean;
  onSelect: (space: SpaceSchema) => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const SpacesOverlay: React.FC<SpacesOverlayProps> = ({
  spaces, activeSpaceId, isCollapsed, onSelect, onClose, triggerRef,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus active item or first item on open
    const items = Array.from(
      overlayRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );
    const activeIdx = spaces.findIndex(s => s.spaceId === activeSpaceId);
    (items[activeIdx] ?? items[0])?.focus();
  }, [activeSpaceId, spaces]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const items = Array.from(
        overlayRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
      );
      const idx = items.indexOf(document.activeElement as HTMLElement);
      if (e.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(idx + 1) % items.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      if (
        overlayRef.current && !overlayRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [onClose, triggerRef]);

  return (
    <div
      ref={overlayRef}
      className={`spaces-overlay${isCollapsed ? ' spaces-overlay--collapsed' : ' spaces-overlay--expanded'}`}
      role="menu"
      aria-label="Switch space"
    >
      <div className="spaces-overlay__header">Spaces</div>
      <div className="spaces-overlay__list">
        {spaces.map((space, index) => (
          <React.Fragment key={space.id}>
            {index > 0 && spaces[index - 1].spaceId === 'commandCenter' && (
              <span className="spaces-overlay__divider" aria-hidden="true" />
            )}
            <button
              type="button"
              role="menuitem"
              className={[
                'spaces-overlay__option',
                space.spaceId === activeSpaceId ? 'spaces-overlay__option--active' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => { onSelect(space); onClose(); }}
            >
              <span className="spaces-overlay__option-icon">
                <SpaceIconEl spaceId={space.id} size={28} />
              </span>
              <span className="spaces-overlay__option-content">
                <span className="spaces-overlay__option-label">{space.label}</span>
                {space.description && (
                  <span className="spaces-overlay__option-description">{space.description}</span>
                )}
              </span>
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ── Space switcher trigger ────────────────────────────────────────────────────

interface SpaceSwitcherProps {
  spaces: SpaceSchema[];
  activeSpaceId: SpaceId | null;
  isCollapsed: boolean;
  onSelect: (space: SpaceSchema) => void;
}

const SpaceSwitcher: React.FC<SpaceSwitcherProps> = ({
  spaces, activeSpaceId, isCollapsed, onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const active = spaces.find(s => s.spaceId === activeSpaceId);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div className="space-switcher">
      <button
        ref={btnRef}
        type="button"
        className="space-switcher__btn"
        onClick={() => setOpen(v => !v)}
        aria-label={`Current space: ${active?.label ?? 'None'}. Switch space`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {active && (
          <span className="space-switcher__icon-wrap">
            <SpaceIconEl spaceId={active.id} size={isCollapsed ? 32 : 24} />
          </span>
        )}
        {!isCollapsed && (
          <>
            <span className="space-switcher__label-wrap">
              <span className="space-switcher__label">{active?.label ?? 'Select Space'}</span>
            </span>
            <span className="space-switcher__arrow" aria-hidden="true">
              <DotsGridIcon size={16} />
            </span>
          </>
        )}
      </button>

      {open && (
        <SpacesOverlay
          spaces={spaces}
          activeSpaceId={activeSpaceId}
          isCollapsed={isCollapsed}
          onSelect={onSelect}
          onClose={handleClose}
          triggerRef={btnRef}
        />
      )}
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const rawNavigation = useMemo(
    () => resolveActiveNavigationState(location.pathname),
    [location.pathname],
  );

  // When the current path has no navConfig match, keep the last known space/item
  // so the sidebar doesn't lose its context on sub-pages or unregistered routes.
  const lastKnownNavRef = useRef(rawNavigation);
  if (rawNavigation.activeSpaceId !== null) {
    lastKnownNavRef.current = rawNavigation;
  }
  const activeNavigation = rawNavigation.activeSpaceId !== null
    ? rawNavigation
    : { ...lastKnownNavRef.current, activeItemId: rawNavigation.activeItemId };

  const activeSpaceId = activeNavigation.activeSpaceId;
  const activeSpace = spacesRegistry.find(s => s.spaceId === activeSpaceId) ?? null;

  // Reset manually-opened nodes when switching to a different space
  const prevSpaceIdRef = useRef<SpaceId | null>(null);
  useEffect(() => {
    if (prevSpaceIdRef.current !== null && prevSpaceIdRef.current !== activeSpaceId) {
      setOpenIds(new Set());
    }
    prevSpaceIdRef.current = activeSpaceId;
  }, [activeSpaceId]);

  const effectiveOpenIds = useMemo(
    () => new Set([...openIds, ...activeNavigation.activeAncestorIds]),
    [openIds, activeNavigation.activeAncestorIds],
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

  return (
    <aside
      className={`sidebar${isCollapsed ? ' sidebar--collapsed' : ''}`}
      aria-label="Primary navigation"
    >
      {/* Brand */}
      <div className="sidebar__brand">
        {isCollapsed ? (
          <button
            type="button"
            className="sidebar__logo-btn"
            onClick={() => setIsCollapsed(false)}
            aria-label="Expand sidebar"
          >
            <IDIRALogoIcon size={40} />
          </button>
        ) : (
          <>
            <Link to="/" className="sidebar__logo" aria-label="Home">
              <IDIRALogoIcon size={28} />
              <span className="sidebar__logo-text">
                <span className="sidebar__logo-title">IDIRA</span>
                <span className="sidebar__logo-subtitle">BY PALO ALTO NETWORKS</span>
              </span>
            </Link>
            <button
              type="button"
              className="sidebar__collapse-btn"
              onClick={() => setIsCollapsed(true)}
              aria-label="Collapse sidebar"
            >
              <CollapseIcon size={14} />
            </button>
          </>
        )}
      </div>

      {/* Collapsed divider */}
      {isCollapsed && <span className="sidebar__collapsed-divider" aria-hidden="true" />}

      {/* Space switcher — always rendered, adapts layout per mode */}
      {spacesRegistry.length > 0 && (
        <div className={`sidebar__space-area${isCollapsed ? ' sidebar__space-area--collapsed' : ''}`}>
          <SpaceSwitcher
            spaces={spacesRegistry}
            activeSpaceId={activeSpaceId}
            isCollapsed={isCollapsed}
            onSelect={handleSpaceSelect}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="sidebar__nav" aria-label="Space navigation">
        {/* Expanded: full tree */}
        {!isCollapsed && activeSpace && activeSpace.items.map(item => (
          <NavItemRow
            key={item.id}
            item={item}
            activeRoute={location.pathname}
            openIds={effectiveOpenIds}
            onToggle={handleToggle}
          />
        ))}

        {/* Collapsed: level-1 icons of active space only */}
        {isCollapsed && activeSpace && activeSpace.items.map(item => (
          <CollapsedNavItem
            key={item.id}
            item={item}
            activeRoute={location.pathname}
            activeLevelOneItemId={activeNavigation.activeLevelOneItemId}
            onNavigate={path => navigate(path)}
          />
        ))}
      </nav>
    </aside>
  );
};
