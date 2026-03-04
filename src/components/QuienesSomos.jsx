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

        <div className="about__grid">
          {/* Historia */}
          <div className="about__text reveal delay-1">
            <p>{a.p1()}</p>
            <p>{a.p2()}</p>
            <p>{a.p3()}</p>
          </div>

          {/* Misión & Visión Cards */}
          <div className="about__cards">
            {/* Misión */}
            <div className="about__card reveal delay-2">
              <div className="about__card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                </svg>
              </div>
              <h3>{a.missionTitle}</h3>
              <p>{a.missionText}</p>
            </div>

            {/* Visión */}
            <div className="about__card reveal delay-3">
              <div className="about__card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3>{a.visionTitle}</h3>
              <ol className="about__vision-list">
                {a.visionItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>

            {/* Política de Calidad */}
            <div className="about__card about__card--quality reveal delay-4">
              <div className="about__card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>{a.qualityTitle}</h3>
              <p>{a.qualityText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
