import { useState } from 'react';
import './Proceso.css';
import { useLanguage } from '../context/LanguageContext';

const STEP_ICONS = [
  <svg key="s1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>,
  <svg key="s2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>,
  <svg key="s3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>,
  <svg key="s4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>,
];

export default function Proceso() {
  const { t } = useLanguage();
  const steps = t.process.steps;
  const [active, setActive] = useState(null);

  return (
    <section id="proceso" className="process section">
      <div className="container">
        <div className="section-header reveal">
          <h2>{t.process.title}</h2>
          <p>{t.process.subtitle}</p>
        </div>

        {/* ── Progress line ── */}
        <div className="process__progress reveal delay-1">
          <div className="process__progress-track">
            {steps.map((_, i) => (
              <button
                key={i}
                className={`process__progress-dot ${active === i ? 'process__progress-dot--active' : ''}`}
                onClick={() => setActive(active === i ? null : i)}
                type="button"
                aria-label={`Paso ${i + 1}`}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="process__cards">
          {steps.map((step, i) => (
            <button
              key={i}
              className={`process__card ${active === i ? 'process__card--active' : ''}`}
              onClick={() => setActive(active === i ? null : i)}
              type="button"
            >
              {/* Watermark */}
              <span className="process__card-watermark">{String(i + 1).padStart(2, '0')}</span>

              {/* Icon */}
              <div className="process__card-icon">
                {STEP_ICONS[i]}
              </div>

              {/* Text */}
              <h3 className="process__card-title">{step.title}</h3>
              <p className="process__card-desc">{step.description}</p>

              {/* Bottom accent line */}
              <span className="process__card-accent" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
