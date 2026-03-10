import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
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

const SERVICE_MAP = {
  'sistemas-electricos':        { name: 'Sistemas Eléctricos' },
  'sistemas-electromecanicos':  { name: 'Sistemas Electromecánicos' },
  'mantenimiento-preventivo':   { name: 'Mantenimiento Preventivo' },
  'construccion-obra-civil':    { name: 'Construcción de Obra Civil' },
  'alumbrado-electrificacion':  { name: 'Alumbrado y Electrificación' },
  'supervision-tramites':       { name: 'Supervisión y Trámites' },
};

const imageModules = import.meta.glob(
  '../assets/trabajos/**/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

function buildAllItems() {
  const items = [];
  for (const [path, src] of Object.entries(imageModules)) {
    const parts = path.split('/');
    const folder = parts[parts.length - 2];
    if (CLIENT_MAP[folder]) {
      items.push({ src, folder, type: 'client', label: CLIENT_MAP[folder].name, logo: CLIENT_MAP[folder].logo });
    } else if (SERVICE_MAP[folder]) {
      items.push({ src, folder, type: 'service', label: SERVICE_MAP[folder].name, logo: null });
    }
  }
  return items;
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
  { src: imgObra,        folder: 'banorte',                   type: 'client',  label: 'Banorte',                    logo: banorteLogo },
  { src: imgSub,         folder: 'davisa',                    type: 'client',  label: 'Davisa',                     logo: davisaLogo },
  { src: imgCabina,      folder: 'dana',                      type: 'client',  label: 'Dana',                       logo: danaLogo },
  { src: imgLobby,       folder: 'banorte',                   type: 'client',  label: 'Banorte',                    logo: banorteLogo },
  { src: imgElectricos,  folder: 'sistemas-electricos',       type: 'service', label: 'Sistemas Eléctricos',        logo: null },
  { src: imgElectromecan,folder: 'sistemas-electromecanicos', type: 'service', label: 'Sistemas Electromecánicos',  logo: null },
  { src: imgMto,         folder: 'mantenimiento-preventivo',  type: 'service', label: 'Mantenimiento Preventivo',   logo: null },
  { src: imgObraCivil,   folder: 'construccion-obra-civil',   type: 'service', label: 'Construcción de Obra Civil', logo: null },
  { src: imgAlumbrado,   folder: 'alumbrado-electrificacion', type: 'service', label: 'Alumbrado y Electrificación',logo: null },
  { src: imgSupervision, folder: 'supervision-tramites',      type: 'service', label: 'Supervisión y Trámites',     logo: null },
];

const GRID_LIMIT = 8;

export default function Trabajos() {
  const { t } = useLanguage();
  const w = t.works;
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const stripRef = useRef(null);

  const allItems = useMemo(buildAllItems, []);
  const hasCustomImages = allItems.length > 0;
  const items = useMemo(
    () => (hasCustomImages ? allItems : FALLBACK_ITEMS),
    [hasCustomImages, allItems]
  );

  const availableFolders = useMemo(() => new Set(items.map((i) => i.folder)), [items]);

  const serviceFilters = useMemo(
    () => Object.entries(SERVICE_MAP)
      .filter(([key]) => availableFolders.has(key))
      .map(([key, val]) => ({ key, label: val.name })),
    [availableFolders]
  );

  const clientFilters = useMemo(
    () => Object.entries(CLIENT_MAP)
      .filter(([key]) => availableFolders.has(key))
      .map(([key, val]) => ({ key, label: val.name })),
    [availableFolders]
  );

  const filteredItems = useMemo(
    () => (activeFilter === 'all' ? items : items.filter((i) => i.folder === activeFilter)),
    [items, activeFilter]
  );

  const gridItems = filteredItems.slice(0, GRID_LIMIT);

  /* Reset index when filter changes */
  useEffect(() => { setLbIndex(0); }, [activeFilter]);

  /* Auto-scroll thumbnail strip to active thumb */
  useEffect(() => {
    if (!lightbox || !stripRef.current) return;
    const thumb = stripRef.current.children[lbIndex];
    if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [lbIndex, lightbox]);

  const openLightbox = useCallback((index) => {
    setLbIndex(index);
    setLightbox(true);
  }, []);
  const closeLightbox = useCallback(() => setLightbox(false), []);

  const goTo = useCallback((indexOrDir) => {
    setLbIndex((prev) => {
      if (typeof indexOrDir === 'number') return indexOrDir;
      const len = filteredItems.length;
      if (indexOrDir === 'next') return prev < len - 1 ? prev + 1 : 0;
      if (indexOrDir === 'end')  return len - 1;
      return prev > 0 ? prev - 1 : len - 1;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowRight') goTo('next');
      if (e.key === 'ArrowLeft')  goTo('prev');
      if (e.key === 'Home')       goTo(0);
      if (e.key === 'End')        goTo('end');
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, goTo]);

  const currentItem = lightbox ? filteredItems[lbIndex] : null;
  const hasFilters = serviceFilters.length > 0 || clientFilters.length > 0;

  return (
    <section id="trabajos" className="works section">
      <div className="container">
        <div className="section-header reveal">
          <h2>{w.title}</h2>
          <p>{w.subtitle}</p>
        </div>

        {/* ── Filter bar ── */}
        {hasFilters && (
          <div className="works__filter-bar reveal">
            <div className="works__filter-scroll">
              <button
                className={`works__filter-chip${activeFilter === 'all' ? ' active' : ''}`}
                onClick={() => setActiveFilter('all')}
                type="button"
              >
                Todos ({items.length})
              </button>
              {serviceFilters.length > 0 && (
                <>
                  <span className="works__filter-sep">Servicios</span>
                  {serviceFilters.map((f) => (
                    <button
                      key={f.key}
                      className={`works__filter-chip works__filter-chip--service${activeFilter === f.key ? ' active' : ''}`}
                      onClick={() => setActiveFilter(f.key)}
                      type="button"
                    >
                      {f.label}
                    </button>
                  ))}
                </>
              )}
              {clientFilters.length > 0 && (
                <>
                  <span className="works__filter-sep">Clientes</span>
                  {clientFilters.map((f) => (
                    <button
                      key={f.key}
                      className={`works__filter-chip works__filter-chip--client${activeFilter === f.key ? ' active' : ''}`}
                      onClick={() => setActiveFilter(f.key)}
                      type="button"
                    >
                      {f.label}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Grid galería ── */}
        <div className="works__grid">
          {gridItems.map((item, i) => (
            <button
              key={`${item.folder}-${i}`}
              className="works__item"
              onClick={() => openLightbox(i)}
              type="button"
            >
              <img src={item.src} alt={item.label} className="works__img" loading="lazy" />
              <div className="works__overlay">
                {item.logo && (
                  <img src={item.logo} alt={item.label} className="works__overlay-logo" />
                )}
                <h3 className="works__overlay-title">{item.label}</h3>
                <span className="works__overlay-cta">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* ── Ver galería completa ── */}
        <div className="works__view-all reveal delay-2">
          <button className="works__view-all-btn" onClick={() => openLightbox(0)} type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
            {`${w.viewGallery} (${filteredItems.length})`}
          </button>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && currentItem && (
        <div className="works__lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="works__lightbox-inner" onClick={(e) => e.stopPropagation()}>

            {/* Header bar */}
            <div className="works__lightbox-header">
              <div className="works__lightbox-caption">
                {currentItem.logo && (
                  <img src={currentItem.logo} alt={currentItem.label} className="works__lightbox-logo" />
                )}
                <h3>{currentItem.label}</h3>
              </div>
              <div className="works__lightbox-nav-info">
                <button className="works__lb-jump" onClick={() => goTo(0)} aria-label="Primera foto" title="Primera (Home)" type="button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>
                  </svg>
                </button>
                <span className="works__lightbox-counter">{lbIndex + 1} / {filteredItems.length}</span>
                <button className="works__lb-jump" onClick={() => goTo('end')} aria-label="Última foto" title="Última (End)" type="button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
                  </svg>
                </button>
              </div>
              <button className="works__lightbox-close" onClick={closeLightbox} aria-label="Cerrar">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Image stage */}
            <div className="works__lightbox-stage">
              <button className="works__lightbox-arrow works__lightbox-arrow--prev" onClick={() => goTo('prev')} aria-label="Anterior" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <img key={lbIndex} src={currentItem.src} alt={currentItem.label} className="works__lightbox-img" />
              <button className="works__lightbox-arrow works__lightbox-arrow--next" onClick={() => goTo('next')} aria-label="Siguiente" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>

            {/* Thumbnail filmstrip */}
            <div className="works__lightbox-strip" ref={stripRef}>
              {filteredItems.map((item, i) => (
                <button
                  key={i}
                  className={`works__strip-thumb${i === lbIndex ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                  type="button"
                  aria-label={`Foto ${i + 1}`}
                >
                  <img src={item.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
