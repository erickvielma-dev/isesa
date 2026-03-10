import { useState, useCallback, useEffect, useMemo } from 'react';
import './Trabajos.css';
import { useLanguage } from '../context/LanguageContext';

/* ── Client logos ── */
import banorteLogo from '../assets/clientes/Banorte.png';
import bbvaLogo from '../assets/clientes/BBVA.png';
import scotiabankLogo from '../assets/clientes/Scotia.png';
import davisaLogo from '../assets/clientes/Davisa.png';
import conacytLogo from '../assets/clientes/conacyt.png';
import cidesiLogo from '../assets/clientes/cidesi.png';
import coahuilaMotorsLogo from '../assets/clientes/coahuila.png';
import danaLogo from '../assets/clientes/dana.png';
import gmLogo from '../assets/clientes/gm.png';
import gobiernoCoahuilaLogo from '../assets/clientes/gobierno.png';
import grupoNutecLogo from '../assets/clientes/nutec.png';
import hotelQuintaDoradaLogo from '../assets/clientes/hotel.png';
import meridianLogo from '../assets/clientes/meridian.png';
import secoviLogo from '../assets/clientes/secovi.png';
import saintGobainLogo from '../assets/clientes/saint.png';
import ufiFilterLogo from '../assets/clientes/ufifilters.png';
import learLogo from '../assets/clientes/lear.png';

/* Folder key → client display name + logo */
const CLIENT_MAP = {
  banorte:              { name: 'Banorte', logo: banorteLogo },
  bbva:                 { name: 'BBVA', logo: bbvaLogo },
  scotiabank:           { name: 'Scotiabank', logo: scotiabankLogo },
  davisa:               { name: 'Davisa', logo: davisaLogo },
  conacyt:              { name: 'CONACYT', logo: conacytLogo },
  cidesi:               { name: 'CIDESI', logo: cidesiLogo },
  'coahuila-motors':    { name: 'Coahuila Motors', logo: coahuilaMotorsLogo },
  dana:                 { name: 'Dana', logo: danaLogo },
  gm:                   { name: 'GM', logo: gmLogo },
  'gobierno-coahuila':  { name: 'Gobierno de Coahuila', logo: gobiernoCoahuilaLogo },
  'grupo-nutec':        { name: 'Grupo Nutec', logo: grupoNutecLogo },
  'hotel-quinta-dorada':{ name: 'Hotel Quinta Dorada', logo: hotelQuintaDoradaLogo },
  meridian:             { name: 'Meridian', logo: meridianLogo },
  secovi:               { name: 'SECOVI', logo: secoviLogo },
  'saint-gobain':       { name: 'Saint Gobain', logo: saintGobainLogo },
  'ufi-filter':         { name: 'UFI Filter', logo: ufiFilterLogo },
  lear:                 { name: 'Lear', logo: learLogo },
};

/* ── Auto-detect images per client folder ──
   Add photos to src/assets/trabajos/<client-folder>/ and they appear automatically.
*/
const imageModules = import.meta.glob(
  '../assets/trabajos/**/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

function getImagesByClient() {
  const byClient = {};
  for (const [path, src] of Object.entries(imageModules)) {
    const parts = path.split('/');
    const clientFolder = parts[parts.length - 2];
    if (!CLIENT_MAP[clientFolder]) continue;
    if (!byClient[clientFolder]) byClient[clientFolder] = [];
    byClient[clientFolder].push(src);
  }
  return byClient;
}

/* ── Fallback images (while client folders are empty) ── */
import imgObra from '../assets/proyectos/Obra civil.jpg';
import imgSub from '../assets/proyectos/Subestación.jpg';
import imgCabina from '../assets/proyectos/Montaje de Cabina de pintura.jpg';
import imgLobby from '../assets/proyectos/Remodelación de Lobbys.jpg';
import imgElectricos from '../assets/servicios/Sistemas Electricos.jpeg';
import imgElectromecan from '../assets/servicios/Sistemas Electromecanicos.jpeg';
import imgMto from '../assets/servicios/Mantenimiento Preventivo.jpeg';
import imgObraCivil from '../assets/servicios/Construcción de Obra Civil.jpeg';
import imgAlumbrado from '../assets/servicios/Alumbrado y Electrificación.jpeg';
import imgSupervision from '../assets/servicios/Supervisión y Tramites.jpeg';

const FALLBACK_ITEMS = [
  { src: imgObra, client: 'banorte' },
  { src: imgSub, client: 'davisa' },
  { src: imgCabina, client: 'dana' },
  { src: imgLobby, client: 'banorte' },
  { src: imgElectricos, client: 'gm' },
  { src: imgElectromecan, client: 'lear' },
  { src: imgMto, client: 'grupo-nutec' },
  { src: imgObraCivil, client: 'cidesi' },
  { src: imgAlumbrado, client: 'gobierno-coahuila' },
  { src: imgSupervision, client: 'saint-gobain' },
];

const GRID_LIMIT = 8;

export default function Trabajos() {
  const { t } = useLanguage();
  const w = t.works;
  const [lightbox, setLightbox] = useState(null);
  const [lbIndex, setLbIndex] = useState(0);

  const imagesByClient = useMemo(getImagesByClient, []);
  const hasCustomImages = Object.keys(imagesByClient).length > 0;

  const items = useMemo(() => {
    if (!hasCustomImages) {
      return FALLBACK_ITEMS.map((fb) => ({
        src: fb.src,
        clientName: CLIENT_MAP[fb.client].name,
        clientLogo: CLIENT_MAP[fb.client].logo,
      }));
    }

    const result = [];
    for (const [clientKey, images] of Object.entries(imagesByClient)) {
      const info = CLIENT_MAP[clientKey];
      for (const src of images) {
        result.push({
          src,
          clientName: info.name,
          clientLogo: info.logo,
        });
      }
    }
    return result;
  }, [hasCustomImages, imagesByClient]);

  const gridItems = items.slice(0, GRID_LIMIT);

  const openLightbox = useCallback((index) => {
    setLbIndex(index);
    setLightbox(true);
  }, []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const goTo = useCallback((dir) => {
    setLbIndex((prev) => {
      if (dir === 'next') return prev < items.length - 1 ? prev + 1 : 0;
      return prev > 0 ? prev - 1 : items.length - 1;
    });
  }, [items.length]);

  /* Keyboard nav */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goTo('next');
      if (e.key === 'ArrowLeft') goTo('prev');
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, goTo]);

  const currentItem = lightbox ? items[lbIndex] : null;

  return (
    <section id="trabajos" className="works section">
      <div className="container">
        <div className="section-header reveal">
          <h2>{w.title}</h2>
          <p>{w.subtitle}</p>
        </div>

        {/* ── Grid galería (limitado) ── */}
        <div className="works__grid">
          {gridItems.map((item, i) => (
            <button
              key={`${item.clientName}-${i}`}
              className="works__item"
              onClick={() => openLightbox(i)}
              type="button"
            >
              <img
                src={item.src}
                alt={item.clientName}
                className="works__img"
                loading="lazy"
              />
              <div className="works__overlay">
                <img
                  src={item.clientLogo}
                  alt={item.clientName}
                  className="works__overlay-logo"
                />
                <h3 className="works__overlay-title">{item.clientName}</h3>
                <span className="works__overlay-cta">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* "Ver galería completa" button */}
        <div className="works__view-all reveal delay-2">
          <button
            className="works__view-all-btn"
            onClick={() => openLightbox(0)}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
            {`${w.viewGallery} (${items.length})`}
          </button>
        </div>
      </div>

      {/* ── Lightbox carrusel ── */}
      {lightbox && currentItem && (
        <div className="works__lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="works__lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="works__lightbox-close" onClick={closeLightbox} aria-label="Cerrar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Prev arrow */}
            <button className="works__lightbox-arrow works__lightbox-arrow--prev" onClick={() => goTo('prev')} aria-label="Anterior" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <img src={currentItem.src} alt={currentItem.clientName} className="works__lightbox-img" />

            {/* Next arrow */}
            <button className="works__lightbox-arrow works__lightbox-arrow--next" onClick={() => goTo('next')} aria-label="Siguiente" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            <div className="works__lightbox-caption">
              <img src={currentItem.clientLogo} alt={currentItem.clientName} className="works__lightbox-logo" />
              <h3>{currentItem.clientName}</h3>
              <span className="works__lightbox-counter">{lbIndex + 1} / {items.length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
