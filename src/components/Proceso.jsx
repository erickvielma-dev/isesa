import './Proceso.css';

const STEPS = [
  {
    number: '01',
    title: 'Levantamiento de Necesidades',
    description: 'Efectuamos un diagnóstico exhaustivo del sitio y las necesidades específicas del proyecto. Escuchamos a nuestros clientes para comprender a fondo los requerimientos técnicos, operativos y normativos.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Diseño del Proyecto',
    description: 'Nuestro equipo de ingeniería desarrolla el proyecto ejecutivo completo: planos detallados, especificaciones técnicas, presupuesto desglosado y cronograma de obra para su revisión y aprobación.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Ejecución',
    description: 'Ejecutamos la obra con personal altamente calificado, maquinaria de última generación y materiales certificados, en estricto apego a las normas de seguridad y regulaciones vigentes.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Entrega y Soporte',
    description: 'Entregamos el proyecto terminado con expediente técnico completo, protocolos de pruebas de funcionamiento y garantía por escrito. Brindamos soporte técnico continuo y programas de mantenimiento preventivo.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
];

export default function Proceso() {
  return (
    <section id="proceso" className="process section">
      <div className="container">
        <div className="section-header reveal">
          <h2>Nuestro Proceso de Trabajo</h2>
          <p>
            Una metodología probada que asegura calidad, transparencia y cumplimiento
            puntual en cada fase de su proyecto.
          </p>
        </div>

        <div className="process__timeline">
          {STEPS.map((step, i) => (
            <div key={i} className={`process__step reveal delay-${i + 1}`}>
              <div className="process__step-indicator">
                <div className="process__step-icon">{step.icon}</div>
                {i < STEPS.length - 1 && <div className="process__step-line" />}
              </div>
              <div className="process__step-content">
                <span className="process__step-number">{step.number}</span>
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
