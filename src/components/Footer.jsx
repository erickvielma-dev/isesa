import logo from '../assets/brand/logo_splash.png';
import './Footer.css';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Col 1: Logo & Descripción */}
          <div className="footer__brand">
            <img src={logo} alt="ISESA" className="footer__logo" />
            <p>{f.description}</p>
          </div>

          {/* Col 2: Links rápidos */}
          <div className="footer__col">
            <h4>{f.navTitle}</h4>
            <ul>
              {f.navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} onClick={(e) => handleClick(e, href)}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Servicios */}
          <div className="footer__col">
            <h4>{f.servicesTitle}</h4>
            <ul>
              {f.serviceLinks.map((service, i) => (
                <li key={i}>
                  <a href="#servicios" onClick={(e) => handleClick(e, '#servicios')}>{service}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div className="footer__col">
            <h4>{f.contactTitle}</h4>
            <ul className="footer__contact-list">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Calle Escuadrón de la Naval #394, Col. Jesús Cabello, Saltillo, Coah.
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+528441122424">844 112 2424</a>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:L_isesa@yahoo.com.mx">L_isesa@yahoo.com.mx</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Industries Supply Electric S.A. de C.V. {f.rights}</p>
        </div>
      </div>
    </footer>
  );
}
