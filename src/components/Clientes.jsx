import banorteLogo from '../assets/Banorte.jpg';
import bbvaLogo from '../assets/BBVA.jpg';
import scotiabankLogo from '../assets/Scotiabank.jpg';
import davisaLogo from '../assets/Davisa.jpg';
import conacytLogo from '../assets/CONACYT.jpg';
import cidesiLogo from '../assets/CIDESI.jpg';
import coahuilaMotorsLogo from '../assets/Coahuila Motors.jpg';
import danaLogo from '../assets/Dana.jpg';
import gmLogo from '../assets/GM.jpg';
import gobiernoCoahuilaLogo from '../assets/Gobierno de Coahuila.jpg';
import grupoNutecLogo from '../assets/Grupo Nutec.jpg';
import hotelQuintaDoradaLogo from '../assets/Hotel Quinta Dorada.jpg';
import meridianLogo from '../assets/Meridian.jpg';
import secoviLogo from '../assets/SECOVI.jpg';
import saintGobainLogo from '../assets/Saint Gobain.jpg';
import ufiFilterLogo from '../assets/UFI Filter.jpg';
import './Clientes.css';
import { useLanguage } from '../context/LanguageContext';

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
];

export default function Clientes() {
  const { t } = useLanguage();

  return (
    <section id="clientes" className="clients section">
      <div className="container">
        <div className="section-header reveal">
          <h2>{t.clients.title}</h2>
          <p>{t.clients.subtitle}</p>
        </div>

        {/* Logos grid */}
        <div className="clients__grid">
          {t.clients.items.map((client, i) => (
            <div key={i} className={`clients__card reveal delay-${i + 1}`}>
              <div className="clients__logo-placeholder">
                {CLIENT_LOGOS[i]
                  ? <img src={CLIENT_LOGOS[i]} alt={`Logo ${client.name}`} className="clients__logo-img" />
                  : <span className="clients__initials">
                      {client.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </span>
                }
              </div>
              <h4>{client.name}</h4>
              <span className="clients__category">{client.category}</span>
            </div>
          ))}
        </div>

        {/* Cobertura */}
        <div className="clients__coverage reveal">
          <div className="clients__coverage-text">
            <h3>{t.clients.coverageTitle}</h3>
            <p>{t.clients.coverageText}</p>
          </div>
          <div className="clients__regions">
            {t.clients.regions.map((region, i) => (
              <span key={i} className="clients__region">{region}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
