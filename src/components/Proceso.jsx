import './Proceso.css';
import { useLanguage } from '../context/LanguageContext';

const STEP_META = [
  {
    number: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    number: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    number: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    number: '04',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
];

export default function Proceso() {
  const { t } = useLanguage();

  return (
    <section id="proceso" className="process section">
      <div className="container">
        <div className="section-header reveal">
          <h2>{t.process.title}</h2>
          <p>{t.process.subtitle}</p>
        </div>

        <div className="process__timeline">
          {t.process.steps.map((step, i) => (
            <div key={i} className={`process__step reveal delay-${i + 1}`}>
              <div className="process__step-indicator">
                <div className="process__step-icon">{STEP_META[i].icon}</div>
                {i < t.process.steps.length - 1 && <div className="process__step-line" />}
              </div>
              <div className="process__step-content">
                <span className="process__step-number">{STEP_META[i].number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
