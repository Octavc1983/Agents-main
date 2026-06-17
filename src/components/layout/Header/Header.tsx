/**
 * Header Component
 * Top navigation and branding
 */

import type React from 'react';
import './Header.scss';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <h1 className="header__title">{title}</h1>
          {subtitle && <p className="header__subtitle">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
};
