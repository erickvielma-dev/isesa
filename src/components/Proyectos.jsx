import './Proyectos.css';

const PROJECTS = [
  {
    title: 'Construcción de Sucursal Bancaria',
    description: 'Ejecución integral de sucursal bancaria desde cimentación: obra civil estructural, instalaciones eléctricas, sistemas de climatización HVAC y acabados de primera calidad.',
    tags: ['Obra Civil', 'Eléctrica', 'Banorte'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    title: 'Subestación con Transformador Industrial',
    description: 'Suministro e instalación de subestación eléctrica con transformador de alta capacidad, sistema de protecciones, equipos de medición y pruebas de comisionamiento para planta industrial.',
    tags: ['Subestaciones', 'Media Tensión', 'Industrial'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    title: 'Montaje de Cabina de Pintura',
    description: 'Diseño, fabricación e instalación completa de cabina de pintura industrial con alimentación eléctrica trifásica, red de agua presurizada y sistema de aire comprimido.',
    tags: ['Electromecánica', 'Manufactura'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
  {
    title: 'Transformación de Lobbys Comerciales',
    description: 'Remodelación integral de lobbys en espacios comerciales y sucursales bancarias: rediseño funcional de áreas, iluminación arquitectónica LED y cableado estructurado de última generación.',
    tags: ['Remodelación', 'Comercial', 'Iluminación'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
];

export default function Proyectos() {
  return (
    <section id="proyectos" className="projects section">
      <div className="container">
        <div className="section-header reveal">
          <h2>Proyectos Destacados</h2>
          <p>
            Una muestra representativa de nuestra experiencia y capacidad
            de ejecución en distintos sectores, alcances y niveles de complejidad.
          </p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <div key={i} className={`projects__card reveal delay-${i + 1}`}>
              <div className="projects__card-image">
                {/* Placeholder para imagen del proyecto */}
                <div className="projects__card-placeholder">
                  {project.icon}
                  <span>Imagen del proyecto</span>
                </div>
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
