import './Historia.css';
import { useLanguage } from '../context/LanguageContext';
import logoGris from '../assets/brand/Logo_gris.png';

export default function Historia() {
  const { t } = useLanguage();
  const h = t.history;

  return (
    <section id="historia" className="historia">
      {/* Decorative background elements */}
      <div className="historia__bg" aria-hidden="true">
        <div className="historia__bg-glow historia__bg-glow--1" />
        <div className="historia__bg-glow historia__bg-glow--2" />
      </div>

      <div className="container historia__container">
        {/* ── Left: Logo + Stats ── */}
        <div className="historia__brand reveal">
          <div className="historia__logo-wrap">
            <div className="historia__logo-ring" aria-hidden="true" />
            <img
              src={logoGris}
              alt="ISESA"
              className="historia__logo"
            />
          </div>
          <div className="historia__stats">
            <div className="historia__stat">
              <span className="historia__stat-number">2005</span>
              <span className="historia__stat-label">{h.statFounded}</span>
            </div>
            <div className="historia__stat-divider" />
            <div className="historia__stat">
              <span className="historia__stat-number">+25</span>
              <span className="historia__stat-label">{h.statYears}</span>
            </div>
          </div>
        </div>

        {/* ── Right: Timeline ── */}
        <div className="historia__timeline">
          <div className="section-header historia__header reveal">
            <h2>{h.title}</h2>
            <p>{h.subtitle}</p>
          </div>

          <div className="historia__steps">
            {[h.p1(), h.p2(), h.p3()].map((content, i) => (
              <div key={i} className={`historia__step reveal delay-${i + 1}`}>
                <div className="historia__step-marker">
                  <span className="historia__step-dot" />
                  {i < 2 && <span className="historia__step-line" />}
                </div>
                <div className="historia__step-content">
                  <p>{content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
