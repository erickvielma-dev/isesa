import { useState, useEffect } from 'react';
import logo from '../assets/logo_mejorado.png';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

const NAV_HREFS = [
  '#inicio',
  '#quienes-somos',
  '#servicios',
  '#clientes',
  '#proyectos',
  '#proceso',
  '#contacto',
];

export default function Header() {
  const { lang, toggle, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');

  const NAV_LINKS = [
    { label: t.nav.inicio, href: '#inicio' },
    { label: t.nav.quienesSomos, href: '#quienes-somos' },
    { label: t.nav.servicios, href: '#servicios' },
    { label: t.nav.clientes, href: '#clientes' },
    { label: t.nav.proyectos, href: '#proyectos' },
    { label: t.nav.proceso, href: '#proceso' },
    { label: t.nav.contacto, href: '#contacto' },
  ];

  /* Cambia fondo del header al hacer scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Detecta sección activa */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    NAV_HREFS.forEach((href) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  /* Bloquea el scroll del body mientras el menú está abierto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu-open' : ''}`}
      >
        <div className="header__inner container">
          {/* Navegación escritorio */}
          <nav className="header__nav header__nav--desktop">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`header__link ${activeSection === href ? 'header__link--active' : ''}`}
                onClick={(e) => handleClick(e, href)}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Controles derecha */}
          <div className="header__controls">
            {/* Toggle de idioma — escritorio */}
            <button
              className={`header__lang-toggle ${scrolled ? 'header__lang-toggle--scrolled' : ''}`}
              onClick={toggle}
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span>{lang === 'es' ? 'EN' : 'ES'}</span>
            </button>

            {/* Menú hamburguesa móvil */}
            <button
              className={`header__burger header__burger--mobile ${menuOpen ? 'header__burger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay menú móvil — cubre toda la pantalla, z-index sobre el header */}
      <div
        className={`header__mobile ${menuOpen ? 'header__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {/* Elementos decorativos de fondo */}
        <div className="header__mobile-bg" aria-hidden="true">
          <div className="header__mobile-bg-glow header__mobile-bg-glow--1" />
          <div className="header__mobile-bg-glow header__mobile-bg-glow--2" />
        </div>

        {/* Barra superior del panel — reemplaza visualmente al header */}
        <div className="header__mobile-topbar">
          <img src={logo} alt="ISESA" className="header__mobile-logo" />
          <div className="header__mobile-topbar-controls">
            {/* Toggle de idioma — móvil */}
            <button
              className="header__mobile-lang"
              onClick={toggle}
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span>{lang === 'es' ? 'EN' : 'ES'}</span>
            </button>
            <button
              className="header__mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label={t.nav.closeMenu}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Links de navegación */}
        <nav className="header__mobile-nav">
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              className={`header__mobile-link ${activeSection === href ? 'header__mobile-link--active' : ''}`}
              style={{ '--i': i }}
              onClick={(e) => handleClick(e, href)}
            >
              <span className="header__mobile-link-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="header__mobile-link-label">{label}</span>
              <span className="header__mobile-link-line" aria-hidden="true" />
              <svg className="header__mobile-link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          ))}
        </nav>

      </div>
    </>
  );
}
