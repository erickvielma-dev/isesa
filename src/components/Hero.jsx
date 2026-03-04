import './Hero.css';
import bgImage from '../assets/hero/background.jpg';
import logoSplash from '../assets/brand/logo_splash.png';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY;
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
        <img src={logoSplash} alt="ISESA" className="hero__splash-logo" />
        <h1 className="hero__title">
          {t.hero.title1} <span className="hero__highlight">{t.hero.titleHighlight}</span>
          <br />{t.hero.title2}
        </h1>
        <p className="hero__subtitle">{t.hero.subtitle}</p>

        {/* Stats rápidos */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">{t.hero.stat1Number}</span>
            <span className="hero__stat-label">{t.hero.stat1Label}</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">{t.hero.stat2Number}</span>
            <span className="hero__stat-label">{t.hero.stat2Label}</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">{t.hero.stat3Number}</span>
            <span className="hero__stat-label">{t.hero.stat3Label}</span>
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
