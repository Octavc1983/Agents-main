import type React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { SidebarLink } from '../../../types/prototype.types';
import {
  HomeIcon,
  ScansIcon,
  InfrastructureIcon,
  PoliciesIcon,
  AccessRequestsIcon,
  ReportsIcon,
  AuditIcon,
  SettingsIcon,
  SecurityIcon,
  TelescopeIcon,
  InventoryIcon,
  PlayCircleIcon,
  IDIRALogoIcon,
  AppsGridIcon,
  CollapseIcon,
  ChevronDownIcon,
} from '../../../assets/icons/NavIcons';
import './Sidebar.scss';

interface SidebarProps {
  links: SidebarLink[];
  isOpen?: boolean;
  spaceName?: string;
}

type SvgIconComponent = React.FC<{ size?: number; className?: string }>;

const iconMap: Record<string, SvgIconComponent> = {
  Home: HomeIcon,
  Scans: ScansIcon,
  Infrastructure: InfrastructureIcon,
  Policies: PoliciesIcon,
  AccessRequests: AccessRequestsIcon,
  Reports: ReportsIcon,
  Audit: AuditIcon,
  Settings: SettingsIcon,
  Security: SecurityIcon,
  Telescope: TelescopeIcon,
  Inventory: InventoryIcon,
  PlayCircle: PlayCircleIcon,
};

export const Sidebar: React.FC<SidebarProps> = ({ links, isOpen = true, spaceName = 'Scans' }) => {
  const location = useLocation();

  const isLinkActive = (href: string): boolean =>
    location.pathname === href || (href !== '/' && location.pathname.startsWith(href));

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = iconMap[iconName];
    if (!Icon) return null;
    return (
      <span className="sidebar__icon">
        <Icon size={18} />
      </span>
    );
  };

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
      {/* Brand area: IDIRA logo + product name + collapse btn */}
      <div className="sidebar__brand">
        <Link to="/" className="sidebar__logo" aria-label="Home">
          <span className="sidebar__logo-icon">
            <IDIRALogoIcon size={30} aria-label="IDIRA" />
          </span>
          <span className="sidebar__logo-text">
            <span className="sidebar__logo-title">IDIRA</span>
            <span className="sidebar__logo-subtitle">BY PALO ALTO NETWORKS</span>
          </span>
        </Link>
        <button className="sidebar__collapse-btn" type="button" aria-label="Collapse sidebar">
          <CollapseIcon size={14} />
        </button>
      </div>

      {/* Space selector */}
      <div className="sidebar__space-selector">
        <div className="sidebar__space-icon-wrap">
          <ScansIcon size={16} />
        </div>
        <span className="sidebar__space-name">{spaceName}</span>
        <button className="sidebar__apps-btn" type="button" aria-label="Switch space">
          <AppsGridIcon size={14} />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="sidebar__nav" aria-label="Main navigation">
        {links.map((link) => {
          const active = isLinkActive(link.href);
          return (
            <Link
              key={link.href}
              to={link.href}
              className={`sidebar__link${active ? ' sidebar__link--active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {renderIcon(link.icon)}
              <span className="sidebar__label">{link.label}</span>
              {/* Sub-items chevron placeholder — expandable items */}
              {link.label === 'Infrastructure' || link.label === 'Policies' ? (
                <span className="sidebar__chevron">
                  <ChevronDownIcon size={12} />
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* Footer: settings link */}
      <div className="sidebar__footer">
        <Link
          to="/settings"
          className={`sidebar__link${location.pathname === '/settings' ? ' sidebar__link--active' : ''}`}
        >
          <span className="sidebar__icon">
            <SettingsIcon size={18} />
          </span>
          <span className="sidebar__label">Settings</span>
        </Link>
      </div>
    </aside>
  );
};
