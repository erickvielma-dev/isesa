import './QuienesSomos.css';

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="about section">
      <div className="container">
        <div className="section-header reveal">
          <h2>Quiénes Somos</h2>
          <p>Más de dos décadas de trayectoria ejecutando proyectos eléctricos, electromecánicos y de construcción civil en México.</p>
        </div>

        <div className="about__grid">
          {/* Historia */}
          <div className="about__text reveal delay-1">
            <p>
              <strong>Industries Supply Electric S.A. de C.V. (ISESA)</strong> inició operaciones en diciembre de 2005
              con la firme convicción de brindar servicios electromecánicos, eléctricos y de construcción bajo los más rigurosos
              estándares de calidad, seguridad y profesionalismo, atendiendo tanto al sector privado como al gubernamental.
            </p>
            <p>
              Nuestra trayectoria de excelencia tiene raíces profundas: ISESA surge de la experiencia consolidada de
              <strong> Servicios Industriales Parras</strong>, empresa en operación continua desde agosto de 1997,
              lo que nos respalda con más de 25 años de experiencia comprobada en el ramo.
            </p>
            <p>
              Contamos con un equipo multidisciplinario de ingenieros y técnicos especializados en construcción, electricidad
              y electromecánica, respaldados por alianzas estratégicas con instituciones líderes del país. Actualmente, somos proveedores
              de confianza de <strong>Banorte</strong>, ejecutando instalaciones eléctricas para cajeros automáticos,
              construcción integral de sucursales bancarias y proyectos llave en mano, desde cimentación hasta puesta en operación.
            </p>
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
              <h3>Nuestra Misión</h3>
              <p>
                Contribuir al desarrollo industrial, comercial y habitacional del país mediante la ejecución de proyectos
                integrales de construcción e instalaciones electromecánicas y eléctricas de la más alta calidad. Aplicamos
                metodologías de vanguardia y tecnología de punta, promoviendo un entorno laboral seguro, con oportunidades
                de desarrollo profesional para cada uno de nuestros colaboradores.
              </p>
            </div>

            {/* Visión */}
            <div className="about__card reveal delay-3">
              <div className="about__card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3>Nuestra Visión</h3>
              <ol className="about__vision-list">
                <li>Posicionarnos como la constructora de referencia para empresas consolidadas en México.</li>
                <li>Consolidar nuestro liderazgo en soluciones eléctricas y electromecánicas para los sectores industrial, comercial y residencial.</li>
                <li>Mantenernos a la vanguardia mediante la capacitación continua de nuestro capital humano y la incorporación de equipos y tecnología de última generación.</li>
                <li>Ampliar nuestra presencia operativa a toda la República Mexicana.</li>
                <li>Alcanzar la plena satisfacción de nuestros clientes a través de la excelencia operativa y la calidad constante.</li>
              </ol>
            </div>

            {/* Política de Calidad */}
            <div className="about__card about__card--quality reveal delay-4">
              <div className="about__card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Política de Calidad</h3>
              <p>
                Nos comprometemos a emplear materiales certificados y mano de obra especializada en cada proyecto.
                Cumplimos estrictamente con los requerimientos de nuestros clientes y operamos bajo un esquema de mejora
                continua en nuestro sistema de gestión de calidad, asegurando resultados que superan las expectativas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
