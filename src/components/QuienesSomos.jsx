import './QuienesSomos.css';
import { useLanguage } from '../context/LanguageContext';

export default function QuienesSomos() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="quienes-somos" className="about section">
      <div className="container">
        <div className="section-header reveal">
          <h2>{a.title}</h2>
          <p>{a.subtitle}</p>
        </div>

        {/* ── Bento grid: Misión + Visión ── */}
        <div className="about__bento">
          {/* Misión */}
          <div className="about__card about__card--mission reveal delay-1">
            <div className="about__card-deco" aria-hidden="true" />
            <span className="about__card-label">01</span>
            <div className="about__card-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h3>{a.missionTitle}</h3>
            <p>{a.missionText}</p>
          </div>

          {/* Visión */}
          <div className="about__card about__card--vision reveal delay-2">
            <div className="about__card-deco" aria-hidden="true" />
            <span className="about__card-label">02</span>
            <div className="about__card-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3>{a.visionTitle}</h3>
            <ol className="about__vision-list">
              {a.visionItems.map((item, i) => (
                <li key={i}>
                  <svg className="about__check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ── Política de Calidad — Banner ── */}
        <div className="about__quality reveal delay-3">
          <div className="about__quality-glow" aria-hidden="true" />
          <div className="about__quality-inner">
            <div className="about__quality-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="about__quality-text">
              <h3>{a.qualityTitle}</h3>
              <p>{a.qualityText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
