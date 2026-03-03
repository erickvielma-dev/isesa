import './Clientes.css';

const CLIENTS = [
  { name: 'Banorte', category: 'Sector Bancario' },
  { name: 'Scotiabank', category: 'Sector Bancario' },
  { name: 'BBVA', category: 'Sector Bancario' },
  { name: 'Grupo Industrial', category: 'Sector Industrial' },
  { name: 'Empresas Manufactureras', category: 'Sector Manufactura' },
  { name: 'Cadenas de Retail', category: 'Sector Comercial' },
];

const REGIONS = [
  'Coahuila',
  'Tamaulipas',
  'Nuevo León',
  'Ciudad de México',
  'Durango',
];

export default function Clientes() {
  return (
    <section id="clientes" className="clients section">
      <div className="container">
        <div className="section-header reveal">
          <h2>Nuestros Clientes</h2>
          <p>
            Colaboramos con empresas de primer nivel en los sectores bancario,
            industrial, manufacturero y comercial, construyendo relaciones de confianza a largo plazo.
          </p>
        </div>

        {/* Logos grid */}
        <div className="clients__grid">
          {CLIENTS.map((client, i) => (
            <div key={i} className={`clients__card reveal delay-${i + 1}`}>
              <div className="clients__logo-placeholder">
                {/* Iniciales como placeholder visual */}
                <span className="clients__initials">
                  {client.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </span>
              </div>
              <h4>{client.name}</h4>
              <span className="clients__category">{client.category}</span>
            </div>
          ))}
        </div>

        {/* Cobertura */}
        <div className="clients__coverage reveal">
          <div className="clients__coverage-text">
            <h3>Cobertura Nacional</h3>
            <p>
              Nuestra capacidad operativa abarca múltiples estados de la República Mexicana,
              con un historial comprobado de proyectos ejecutados exitosamente en cada región.
            </p>
          </div>
          <div className="clients__regions">
            {REGIONS.map((region, i) => (
              <span key={i} className="clients__region">{region}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
