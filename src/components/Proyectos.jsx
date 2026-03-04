import './Proyectos.css';
import { useLanguage } from '../context/LanguageContext';
import imgObra      from '../assets/Obra civil.jpg';
import imgSub       from '../assets/Subestación.jpg';
import imgCabina    from '../assets/Montaje de Cabina de pintura.jpg';
import imgLobby     from '../assets/Remodelación de Lobbys.jpg';

const PROJECT_IMAGES = [imgObra, imgSub, imgCabina, imgLobby];

export default function Proyectos() {
  const { t } = useLanguage();

  return (
    <section id="proyectos" className="projects section">
      <div className="container">
        <div className="section-header reveal">
          <h2>{t.projects.title}</h2>
          <p>{t.projects.subtitle}</p>
        </div>

        <div className="projects__grid">
          {t.projects.items.map((project, i) => (
            <div key={i} className={`projects__card reveal delay-${i + 1}`}>
              <div className="projects__card-image">
                <img
                  src={PROJECT_IMAGES[i]}
                  alt={project.title}
                  className="projects__card-img"
                  loading="lazy"
                />
                <div className="projects__card-imgoverlay" />
              </div>
              <div className="projects__card-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="projects__tags">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="projects__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
