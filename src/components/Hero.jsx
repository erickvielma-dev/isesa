import './Hero.css';
import bgImage from '../assets/background.jpg';

export default function Hero() {
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
    <section id="inicio" className="hero">
      {/* Fondo fotográfico con overlays */}
      <div className="hero__bg">
        <div className="hero__photo" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="hero__overlay" />
        <div className="hero__grid-pattern" />
        <div className="hero__gradient" />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
      </div>

      <div className="hero__content container">
        <span className="hero__badge">Industries Supply Electric S.A. de C.V.</span>
        <h1 className="hero__title">
          Transmitiendo <span className="hero__highlight">Energía</span>
          <br />a tus Proyectos
        </h1>
        <p className="hero__subtitle">
          Soluciones integrales en instalaciones eléctricas, sistemas electromecánicos y construcción de obra civil
          para los sectores industrial, comercial y bancario a nivel nacional.
        </p>


        {/* Stats rápidos */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">+20</span>
            <span className="hero__stat-label">Años de experiencia</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">+500</span>
            <span className="hero__stat-label">Proyectos realizados</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">5</span>
            <span className="hero__stat-label">Estados de cobertura</span>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-dot" />
        </div>
      </div>
    </section>
  );
}
