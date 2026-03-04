import { useState, useRef, useEffect, useCallback } from 'react';
import './Servicios.css';
import { useLanguage } from '../context/LanguageContext';
import imgSistemasElectricos    from '../assets/servicios/Sistemas Electricos.jpeg';
import imgSistemasElectromecan  from '../assets/servicios/Sistemas Electromecanicos.jpeg';
import imgMantenimiento         from '../assets/servicios/Mantenimiento Preventivo.jpeg';
import imgObraCivil             from '../assets/servicios/Construcción de Obra Civil.jpeg';
import imgAlumbrado             from '../assets/servicios/Alumbrado y Electrificación.jpeg';
import imgSupervision           from '../assets/servicios/Supervisión y Tramites.jpeg';

const SERVICE_IMAGES = [
  imgSistemasElectricos,
  imgSistemasElectromecan,
  imgMantenimiento,
  imgObraCivil,
  imgAlumbrado,
  imgSupervision,
];

const SERVICE_ICONS = [
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>,
];

export default function Servicios() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [stepSize, setStepSize] = useState(() => window.innerWidth < 768 ? 1 : 2);
  const touchStartX = useRef(null);

  const total = t.services.items.length;
  const isHovered = useRef(false);
  const intervalRef = useRef(null);

  const STEP = stepSize;
  const pairs = Math.ceil(total / STEP);

  const next = useCallback(() => {
    setDirection('next');
    setActiveIndex(i => (i + STEP) % total);
  }, [total]);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isHovered.current) next();
    }, 4000);
  }, [next]);

  const prev = () => {
    setDirection('prev');
    setActiveIndex(i => (i - STEP + total) % total);
    startInterval();
  };
  const goTo = (pairIndex) => {
    const newIndex = pairIndex * STEP;
    setDirection(newIndex > activeIndex ? 'next' : 'prev');
    setActiveIndex(newIndex);
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  useEffect(() => {
    const onResize = () => {
      const newStep = window.innerWidth < 768 ? 1 : 2;
      setStepSize(newStep);
      setActiveIndex(0);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section id="servicios" className="services section">
      <div className="container">
        <div className="section-header reveal">
          <h2>{t.services.title}</h2>
          <p>{t.services.subtitle}</p>
        </div>

        <div
          className="services__carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
        >

          {/* Main card area with flanking buttons */}
          <div className="services__carousel-stage-wrap">
            <button className="services__carousel-btn services__carousel-btn--prev" onClick={() => { prev(); startInterval(); }} aria-label="Anterior">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <div className="services__carousel-stage">

              {/* Slides */}
              <div
                className="services__carousel-track"
                style={{
                  width: `${pairs * 100}%`,
                  transform: `translateX(-${Math.floor(activeIndex / STEP) * (100 / pairs)}%)`
                }}
              >
                {t.services.items.map((service, i) => (
                  <div key={i} className="services__carousel-slide" style={{ width: `${100 / total}%` }}>
                    <div className="services__carousel-slide-inner">
                      <div className="services__carousel-slide-img">
                        <img src={SERVICE_IMAGES[i]} alt={service.title} />
                      </div>
                      <div className="services__carousel-slide-body">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <button className="services__carousel-btn services__carousel-btn--next" onClick={() => { next(); startInterval(); }} aria-label="Siguiente">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          {/* Dots centered below */}
          <div className="services__carousel-dots">
            {Array.from({ length: pairs }, (_, i) => (
              <button
                key={i}
                className={`services__carousel-dot${i === Math.floor(activeIndex / STEP) ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Servicios ${i * STEP + 1}-${i * STEP + STEP}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
