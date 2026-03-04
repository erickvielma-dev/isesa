import { useState } from 'react';
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
import './Clientes.css';
import { useLanguage } from '../context/LanguageContext';
import MexicoMap from './MexicoMap';
import { resolveToSvgName } from './mapUtils';

/* Logos indexed to match t.clients.items order */
const CLIENT_LOGOS = [
  banorteLogo,
  bbvaLogo,
  scotiabankLogo,
  davisaLogo,
  conacytLogo,
  cidesiLogo,
  coahuilaMotorsLogo,
  danaLogo,
  gmLogo,
  gobiernoCoahuilaLogo,
  grupoNutecLogo,
  hotelQuintaDoradaLogo,
  meridianLogo,
  secoviLogo,
  saintGobainLogo,
  ufiFilterLogo,
  learLogo,
];

const CARDS_PER_SLIDE = 4;

export default function Clientes() {
  const { t } = useLanguage();
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Map → region-tag hover: convert SVG canonical name to current-language display name
  const handleMapHover = (svgName) => {
    if (!svgName) { setHoveredRegion(null); return; }
    const match = t.clients.regions.find((r) => resolveToSvgName(r) === svgName);
    setHoveredRegion(match || null);
  };

  const items = t.clients.items.map((client, i) => ({
    ...client,
    logo: CLIENT_LOGOS[i],
  }));

  // Duplicate for seamless infinite loop
  const marqueeItems = [...items, ...items];

  return (
    <section id="clientes" className="clients section">
      <div className="container">
        <div className="section-header reveal">
          <h2>{t.clients.title}</h2>
          <p>{t.clients.subtitle}</p>
        </div>
      </div>

      {/* Full-width infinite marquee */}
      <div className="clients__marquee-wrapper">
        <div className="clients__marquee-fade clients__marquee-fade--left" />
        <div className="clients__marquee-fade clients__marquee-fade--right" />
        <div className="clients__marquee">
          <div className="clients__marquee-track">
            {marqueeItems.map((client, i) => (
              <div key={i} className="clients__marquee-card">
                <div className="clients__logo-placeholder">
                  {client.logo
                    ? <img src={client.logo} alt={client.name} className="clients__logo-img" />
                    : <span className="clients__initials">
                        {client.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                  }
                </div>
                <div className="clients__marquee-info">
                  <span className="clients__marquee-name">{client.name}</span>
                  <span className="clients__category">{client.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container clients__post-marquee">
        <div className="clients__coverage">
          <div className="clients__coverage-left">
            <div className="clients__coverage-text">
              <h3>{t.clients.coverageTitle}</h3>
              <p>{t.clients.coverageText}</p>
            </div>
            <div className="clients__regions">
              {t.clients.regions.map((region, i) => (
                <span
                  key={i}
                  className={`clients__region${hoveredRegion === region ? ' active' : ''}`}
                  onMouseEnter={() => setHoveredRegion(region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
                  </svg>
                  {region}
                </span>
              ))}
            </div>
          </div>
          <div className="clients__coverage-map">
            <MexicoMap
              hoveredState={hoveredRegion ? resolveToSvgName(hoveredRegion) : null}
              onStateHover={handleMapHover}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
