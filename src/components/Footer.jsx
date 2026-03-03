import logo from '../assets/logo_mejorado.png';
import './Footer.css';

const FOOTER_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Quiénes Somos', href: '#quienes-somos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

const SERVICES_LINKS = [
  'Instalaciones Eléctricas',
  'Sistemas Electromecánicos',
  'Construcción Civil',
  'Mantenimiento Preventivo',
  'Trámites ante CFE',
];

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
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
            <p>
              Industries Supply Electric S.A. de C.V. — Más de dos décadas de trayectoria
              ejecutando proyectos de ingeniería eléctrica, electromecánica y obra civil con los más altos estándares de calidad.
            </p>
          </div>

          {/* Col 2: Links rápidos */}
          <div className="footer__col">
            <h4>Navegación</h4>
            <ul>
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} onClick={(e) => handleClick(e, href)}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Servicios */}
          <div className="footer__col">
            <h4>Servicios</h4>
            <ul>
              {SERVICES_LINKS.map((service, i) => (
                <li key={i}>
                  <a href="#servicios" onClick={(e) => handleClick(e, '#servicios')}>{service}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div className="footer__col">
            <h4>Contacto</h4>
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
          <p>&copy; {new Date().getFullYear()} Industries Supply Electric S.A. de C.V. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
