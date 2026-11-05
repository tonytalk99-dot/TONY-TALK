import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

export default function SiteHeader() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const navItems = [
    { to: '/products', label: t.nav.products },
    { to: '/services', label: t.nav.services },
    { to: '/factory', label: t.nav.factory },
    { to: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handleViewportChange = () => {
      if (window.matchMedia('(min-width: 960px)').matches) setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleViewportChange);
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 30);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleViewportChange);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />
        <nav className="desktop-nav" aria-label={t.common.primaryNavLabel}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="desktop-nav__link">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__actions">
          <LanguageSwitcher />
          <Link className="button button--primary button--compact desktop-quote" to="/contact?intent=quote">
            {t.nav.requestQuote}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? t.common.closeMenu : t.common.openMenu}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
            <span className="menu-toggle__label">{t.common.menuLabel}</span>
          </button>
        </div>
      </div>
      <div
        ref={menuRef}
        id="mobile-navigation"
        className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}
        hidden={!isOpen}
      >
        <nav className="container mobile-nav__inner" aria-label={t.common.mobileNavLabel}>
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              ref={index === 0 ? firstLinkRef : undefined}
              to={item.to}
              className="mobile-nav__link"
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
          <Link className="button button--primary mobile-nav__cta" to="/contact?intent=quote" onClick={closeMenu}>
            {t.nav.requestQuote}
          </Link>
        </nav>
      </div>
    </header>
  );
}