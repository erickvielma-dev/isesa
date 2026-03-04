import { createContext, useContext, useState } from 'react';

const translations = {
  es: {
    nav: {
      inicio: 'Inicio',
      quienesSomos: 'Quiénes Somos',
      servicios: 'Servicios',
      clientes: 'Clientes',
      proyectos: 'Proyectos',
      proceso: 'Proceso',
      contacto: 'Contacto',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      title1: 'Transmitiendo',
      titleHighlight: 'Energía',
      title2: 'a tus Proyectos',
      subtitle:
        'Soluciones integrales en instalaciones eléctricas, sistemas electromecánicos y construcción de obra civil para los sectores industrial, comercial y bancario a nivel nacional.',
      stat1Number: '+20',
      stat1Label: 'Años de experiencia',
      stat2Number: '+500',
      stat2Label: 'Proyectos realizados',
      stat3Number: '5',
      stat3Label: 'Estados de cobertura',
    },
    about: {
      title: 'Quiénes Somos',
      subtitle:
        'Más de dos décadas de trayectoria ejecutando proyectos eléctricos, electromecánicos y de construcción civil en México.',
      p1: () => (
        <>
          <strong>Industries Supply Electric S.A. de C.V. (ISESA)</strong> inició operaciones en diciembre de 2005
          con la firme convicción de brindar servicios electromecánicos, eléctricos y de construcción bajo los más rigurosos
          estándares de calidad, seguridad y profesionalismo, atendiendo tanto al sector privado como al gubernamental.
        </>
      ),
      p2: () => (
        <>
          Nuestra trayectoria de excelencia tiene raíces profundas: ISESA surge de la experiencia consolidada de{' '}
          <strong>Servicios Industriales Parras</strong>, empresa en operación continua desde agosto de 1997,
          lo que nos respalda con más de 25 años de experiencia comprobada en el ramo.
        </>
      ),
      p3: () => (
        <>
          Contamos con un equipo multidisciplinario de ingenieros y técnicos especializados en construcción, electricidad
          y electromecánica, respaldados por alianzas estratégicas con instituciones líderes del país. Actualmente, somos
          proveedores de confianza de <strong>Banorte</strong>, ejecutando instalaciones eléctricas para cajeros
          automáticos, construcción integral de sucursales bancarias y proyectos llave en mano, desde cimentación hasta
          puesta en operación.
        </>
      ),
      missionTitle: 'Nuestra Misión',
      missionText:
        'Contribuir al desarrollo industrial, comercial y habitacional del país mediante la ejecución de proyectos integrales de construcción e instalaciones electromecánicas y eléctricas de la más alta calidad. Aplicamos metodologías de vanguardia y tecnología de punta, promoviendo un entorno laboral seguro, con oportunidades de desarrollo profesional para cada uno de nuestros colaboradores.',
      visionTitle: 'Nuestra Visión',
      visionItems: [
        'Posicionarnos como la constructora de referencia para empresas consolidadas en México.',
        'Consolidar nuestro liderazgo en soluciones eléctricas y electromecánicas para los sectores industrial, comercial y residencial.',
        'Mantenernos a la vanguardia mediante la capacitación continua de nuestro capital humano y la incorporación de equipos y tecnología de última generación.',
        'Ampliar nuestra presencia operativa a toda la República Mexicana.',
        'Alcanzar la plena satisfacción de nuestros clientes a través de la excelencia operativa y la calidad constante.',
      ],
      qualityTitle: 'Política de Calidad',
      qualityText:
        'Nos comprometemos a emplear materiales certificados y mano de obra especializada en cada proyecto. Cumplimos estrictamente con los requerimientos de nuestros clientes y operamos bajo un esquema de mejora continua en nuestro sistema de gestión de calidad, asegurando resultados que superan las expectativas.',
    },
    services: {
      title: 'Nuestros Servicios',
      subtitle:
        'Proporcionamos soluciones integrales en ingeniería eléctrica, electromecánica y construcción civil, respaldadas por más de dos décadas de experiencia y un equipo técnico altamente calificado.',
      items: [
        {
          title: 'Sistemas Eléctricos',
          description:
            'Diseño, construcción y puesta en servicio de sistemas eléctricos en media y baja tensión. Incluye pruebas cromatográficas, monitoreo continuo y protección de subestaciones.',
        },
        {
          title: 'Sistemas Electromecánicos',
          description:
            'Ingeniería, fabricación e instalación de sistemas electromecánicos integrales para los sectores industrial, comercial y de servicios.',
        },
        {
          title: 'Mantenimiento Preventivo',
          description:
            'Programas de mantenimiento preventivo y correctivo para subestaciones eléctricas de media y baja tensión, así como equipos eléctricos e industriales en general.',
        },
        {
          title: 'Construcción de Obra Civil',
          description:
            'Construcción, remodelación y adecuación de espacios comerciales, industriales y del sector bancario. Proyectos llave en mano, desde cimentación hasta entrega total.',
        },
        {
          title: 'Alumbrado y Electrificación',
          description:
            'Electrificación y sistemas de alumbrado público para fraccionamientos residenciales y desarrollos comerciales. Gestión integral de trámites ante CFE.',
        },
        {
          title: 'Supervisión y Trámites',
          description:
            'Supervisión técnica y administración de obra, suministro de materiales especializados, y gestión de permisos de construcción y trámites regulatorios.',
        },
      ],
    },
    clients: {
      title: 'Nuestros Clientes',
      subtitle:
        'Colaboramos con empresas de primer nivel en los sectores bancario, industrial, manufacturero y comercial, construyendo relaciones de confianza a largo plazo.',
      coverageTitle: 'Cobertura Nacional',
      coverageText:
        'Nuestra capacidad operativa abarca múltiples estados de la República Mexicana, con un historial comprobado de proyectos ejecutados exitosamente en cada región.',
      regions: ['Coahuila', 'Tamaulipas', 'Nuevo León', 'Ciudad de México', 'Durango'],
      items: [
        { name: 'Banorte', category: 'Sector Bancario' },
        { name: 'BBVA', category: 'Sector Bancario' },
        { name: 'Scotiabank', category: 'Sector Bancario' },
        { name: 'Davisa', category: 'Sector Industrial' },
        { name: 'CONACYT', category: 'Sector Gobierno' },
        { name: 'CIDESI', category: 'Sector Tecnológico' },
        { name: 'Coahuila Motors', category: 'Sector Automotriz' },
        { name: 'Dana', category: 'Sector Industrial' },
        { name: 'GM', category: 'Sector Automotriz' },
        { name: 'Gobierno de Coahuila', category: 'Sector Gobierno' },
        { name: 'Grupo Nutec', category: 'Sector Industrial' },
        { name: 'Hotel Quinta Dorada', category: 'Sector Hotelero' },
        { name: 'Meridian', category: 'Sector Industrial' },
        { name: 'SECOVI', category: 'Sector Gobierno' },
        { name: 'Saint Gobain', category: 'Sector Industrial' },
        { name: 'UFI Filter', category: 'Sector Industrial' },
      ],
    },
    projects: {
      title: 'Proyectos Destacados',
      subtitle:
        'Una muestra representativa de nuestra experiencia y capacidad de ejecución en distintos sectores, alcances y niveles de complejidad.',
      items: [
        {
          title: 'Construcción de Sucursal Bancaria',
          description:
            'Ejecución integral de sucursal bancaria desde cimentación: obra civil estructural, instalaciones eléctricas, sistemas de climatización HVAC y acabados de primera calidad.',
          tags: ['Obra Civil', 'Eléctrica', 'Banorte'],
        },
        {
          title: 'Subestación con Transformador Industrial',
          description:
            'Suministro e instalación de subestación eléctrica con transformador de alta capacidad, sistema de protecciones, equipos de medición y pruebas de comisionamiento para planta industrial.',
          tags: ['Alta Tensión', 'Industrial', 'Comisionamiento'],
        },
        {
          title: 'Montaje de Cabina de Pintura',
          description:
            'Diseño, fabricación e instalación completa de cabina de pintura industrial con alimentación eléctrica trifásica, red de agua presurizada y sistema de aire comprimido.',
          tags: ['Electromecánica', 'Industrial', 'Fabricación'],
        },
        {
          title: 'Transformación de Lobbys Comerciales',
          description:
            'Remodelación integral de lobbys en espacios comerciales y sucursales bancarias: rediseño funcional de áreas, iluminación arquitectónica LED y cableado estructurado de última generación.',
          tags: ['Remodelación', 'LED', 'Banorte'],
        },
      ],
    },
    process: {
      title: 'Nuestro Proceso de Trabajo',
      subtitle:
        'Una metodología probada que asegura calidad, transparencia y cumplimiento puntual en cada fase de su proyecto.',
      steps: [
        {
          title: 'Levantamiento de Necesidades',
          description:
            'Efectuamos un diagnóstico exhaustivo del sitio y las necesidades específicas del proyecto. Escuchamos a nuestros clientes para comprender a fondo los requerimientos técnicos, operativos y normativos.',
        },
        {
          title: 'Diseño del Proyecto',
          description:
            'Nuestro equipo de ingeniería desarrolla el proyecto ejecutivo completo: planos detallados, especificaciones técnicas, presupuesto desglosado y cronograma de obra para su revisión y aprobación.',
        },
        {
          title: 'Ejecución',
          description:
            'Ejecutamos la obra con personal altamente calificado, maquinaria de última generación y materiales certificados, en estricto apego a las normas de seguridad y regulaciones vigentes.',
        },
        {
          title: 'Entrega y Soporte',
          description:
            'Entregamos el proyecto terminado con expediente técnico completo, protocolos de pruebas de funcionamiento y garantía por escrito. Brindamos soporte técnico continuo y programas de mantenimiento preventivo.',
        },
      ],
    },
    contact: {
      title: 'Contacto',
      subtitle:
        '¿Tiene un proyecto en puerta? Contáctenos y con gusto le elaboraremos una propuesta técnica y económica a la medida, sin compromiso.',
      locationTitle: 'Ubicación',
      locationAddress: 'Calle Escuadrón de la Naval #394,\nCol. Jesús Cabello, Saltillo, Coahuila, México',
      openMaps: 'Abrir en Google Maps',
      emailTitle: 'Correo Electrónico',
      phoneTitle: 'Teléfono',
      scheduleTitle: 'Horario de Atención',
      scheduleText: 'Lunes a Viernes: 8:00 – 18:00\nSábado: 9:00 – 14:00',
      serviceOptions: [
        'Instalaciones Eléctricas',
        'Sistemas Electromecánicos',
        'Construcción de Obra Civil',
        'Mantenimiento Preventivo',
        'Remodelaciones',
        'Trámites ante CFE',
        'Otro',
      ],
      labelName: 'Nombre *',
      labelCompany: 'Empresa',
      labelEmail: 'Correo Electrónico *',
      labelPhone: 'Teléfono',
      labelService: 'Tipo de Servicio',
      labelMessage: 'Mensaje *',
      placeholderName: 'Su nombre completo',
      placeholderCompany: 'Nombre de su empresa',
      placeholderEmail: 'correo@ejemplo.com',
      placeholderPhone: '844 112 2424',
      placeholderMessage: 'Describa su proyecto o necesidad...',
      placeholderService: 'Seleccione un servicio',
      btnSend: 'Enviar por correo',
      btnSending: 'Enviando...',
      btnWhatsApp: 'WhatsApp',
      successMsg: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
      errorMsg: 'Ocurrió un error. Por favor intente de nuevo o contáctenos directamente.',
      errName: 'El nombre es requerido',
      errEmail: 'El correo electrónico es requerido',
      errEmailInvalid: 'Ingrese un correo válido',
      errMessage: 'El mensaje es requerido',
      errPhone: 'Número de teléfono inválido',
    },
    footer: {
      description:
        'Industries Supply Electric S.A. de C.V. — Más de dos décadas de trayectoria ejecutando proyectos de ingeniería eléctrica, electromecánica y obra civil con los más altos estándares de calidad.',
      navTitle: 'Navegación',
      servicesTitle: 'Servicios',
      contactTitle: 'Contacto',
      rights: 'Todos los derechos reservados.',
      serviceLinks: [
        'Instalaciones Eléctricas',
        'Sistemas Electromecánicos',
        'Construcción Civil',
        'Mantenimiento Preventivo',
        'Trámites ante CFE',
      ],
      navLinks: [
        { label: 'Inicio', href: '#inicio' },
        { label: 'Quiénes Somos', href: '#quienes-somos' },
        { label: 'Servicios', href: '#servicios' },
        { label: 'Proyectos', href: '#proyectos' },
        { label: 'Contacto', href: '#contacto' },
      ],
    },
  },

  /* ── ENGLISH ──────────────────────────────────────────────── */
  en: {
    nav: {
      inicio: 'Home',
      quienesSomos: 'About Us',
      servicios: 'Services',
      clientes: 'Clients',
      proyectos: 'Projects',
      proceso: 'Process',
      contacto: 'Contact',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      title1: 'Powering',
      titleHighlight: 'Energy',
      title2: 'into Your Projects',
      subtitle:
        'Comprehensive solutions in electrical installations, electromechanical systems, and civil construction for the industrial, commercial, and banking sectors nationwide.',
      stat1Number: '+20',
      stat1Label: 'Years of experience',
      stat2Number: '+500',
      stat2Label: 'Completed projects',
      stat3Number: '5',
      stat3Label: 'States covered',
    },
    about: {
      title: 'About Us',
      subtitle:
        'Over two decades of expertise delivering electrical, electromechanical, and civil construction projects across Mexico.',
      p1: () => (
        <>
          <strong>Industries Supply Electric S.A. de C.V. (ISESA)</strong> began operations in December 2005 with a firm
          commitment to providing electromechanical, electrical, and construction services under the most rigorous quality,
          safety, and professional standards, serving both the private and government sectors.
        </>
      ),
      p2: () => (
        <>
          Our excellence stems from deep roots: ISESA grew out of the consolidated experience of{' '}
          <strong>Servicios Industriales Parras</strong>, a company in continuous operation since August 1997,
          giving us over 25 years of proven industry expertise.
        </>
      ),
      p3: () => (
        <>
          We have a multidisciplinary team of engineers and technicians specialized in construction, electrical, and
          electromechanical work, backed by strategic alliances with leading institutions in the country. We are currently
          trusted suppliers for <strong>Banorte</strong>, carrying out electrical installations for ATMs, full construction
          of banking branches, and turnkey projects from foundation to commissioning.
        </>
      ),
      missionTitle: 'Our Mission',
      missionText:
        'To contribute to the industrial, commercial, and residential development of the country through the execution of comprehensive construction and electromechanical-electrical installation projects of the highest quality. We apply cutting-edge methodologies and technology, fostering a safe work environment with professional development opportunities for every team member.',
      visionTitle: 'Our Vision',
      visionItems: [
        'Become the go-to construction company for established businesses in Mexico.',
        'Consolidate our leadership in electrical and electromechanical solutions for the industrial, commercial, and residential sectors.',
        'Stay at the forefront through continuous training of our team and adoption of the latest equipment and technology.',
        'Expand our operational presence across the entire Mexican Republic.',
        'Achieve full client satisfaction through operational excellence and consistent quality.',
      ],
      qualityTitle: 'Quality Policy',
      qualityText:
        `We are committed to using certified materials and specialized labor on every project. We strictly comply with our clients' requirements and operate under a continuous improvement framework in our quality management system, ensuring results that exceed expectations.`,
    },
    services: {
      title: 'Our Services',
      subtitle:
        'We provide comprehensive solutions in electrical engineering, electromechanics, and civil construction, backed by over two decades of experience and a highly qualified technical team.',
      items: [
        {
          title: 'Electrical Systems',
          description:
            'Design, construction, and commissioning of medium- and low-voltage electrical systems. Includes chromatographic tests, continuous monitoring, and substation protection.',
        },
        {
          title: 'Electromechanical Systems',
          description:
            'Engineering, fabrication, and installation of comprehensive electromechanical systems for the industrial, commercial, and service sectors.',
        },
        {
          title: 'Preventive Maintenance',
          description:
            'Preventive and corrective maintenance programs for medium- and low-voltage electrical substations, as well as general electrical and industrial equipment.',
        },
        {
          title: 'Civil Construction',
          description:
            'Construction, remodeling, and adaptation of commercial, industrial, and banking spaces. Turnkey projects from foundation to full delivery.',
        },
        {
          title: 'Lighting & Electrification',
          description:
            'Electrification and public lighting systems for residential developments and commercial projects. Full management of CFE permit procedures.',
        },
        {
          title: 'Supervision & Permits',
          description:
            'Technical supervision and project management, supply of specialized materials, and management of construction permits and regulatory procedures.',
        },
      ],
    },
    clients: {
      title: 'Our Clients',
      subtitle:
        'We collaborate with top-tier companies in the banking, industrial, manufacturing, and commercial sectors, building long-term relationships of trust.',
      coverageTitle: 'National Coverage',
      coverageText:
        'Our operational capacity spans multiple states across Mexico, with a proven track record of successfully completed projects in each region.',
      regions: ['Coahuila', 'Tamaulipas', 'Nuevo León', 'Mexico City', 'Durango'],
      items: [
        { name: 'Banorte', category: 'Banking Sector' },
        { name: 'BBVA', category: 'Banking Sector' },
        { name: 'Scotiabank', category: 'Banking Sector' },
        { name: 'Davisa', category: 'Industrial Sector' },
        { name: 'CONACYT', category: 'Government Sector' },
        { name: 'CIDESI', category: 'Technology Sector' },
        { name: 'Coahuila Motors', category: 'Automotive Sector' },
        { name: 'Dana', category: 'Industrial Sector' },
        { name: 'GM', category: 'Automotive Sector' },
        { name: 'Gobierno de Coahuila', category: 'Government Sector' },
        { name: 'Grupo Nutec', category: 'Industrial Sector' },
        { name: 'Hotel Quinta Dorada', category: 'Hospitality Sector' },
        { name: 'Meridian', category: 'Industrial Sector' },
        { name: 'SECOVI', category: 'Government Sector' },
        { name: 'Saint Gobain', category: 'Industrial Sector' },
        { name: 'UFI Filter', category: 'Industrial Sector' },
      ],
    },
    projects: {
      title: 'Featured Projects',
      subtitle:
        'A representative showcase of our experience and execution capacity across diverse sectors, scopes, and complexity levels.',
      items: [
        {
          title: 'Banking Branch Construction',
          description:
            'Full construction of a bank branch from foundation: structural civil work, electrical installations, HVAC systems, and premium finishes.',
          tags: ['Civil Construction', 'Electrical', 'Banorte'],
        },
        {
          title: 'Industrial Transformer Substation',
          description:
            'Supply and installation of an electrical substation with high-capacity transformer, protection system, metering equipment, and commissioning tests for an industrial plant.',
          tags: ['High Voltage', 'Industrial', 'Commissioning'],
        },
        {
          title: 'Paint Booth Assembly',
          description:
            'Full design, fabrication, and installation of an industrial paint booth with three-phase electrical supply, pressurized water network, and compressed air system.',
          tags: ['Electromechanical', 'Industrial', 'Fabrication'],
        },
        {
          title: 'Commercial Lobby Renovation',
          description:
            'Comprehensive lobby remodeling across commercial spaces and bank branches: functional area redesign, architectural LED lighting, and next-generation structured cabling.',
          tags: ['Remodeling', 'LED', 'Banorte'],
        },
      ],
    },
    process: {
      title: 'Our Work Process',
      subtitle:
        'A proven methodology that ensures quality, transparency, and on-time delivery at every phase of your project.',
      steps: [
        {
          title: 'Needs Assessment',
          description:
            'We conduct a thorough site diagnosis and identify the specific needs of the project. We listen carefully to our clients to fully understand the technical, operational, and regulatory requirements.',
        },
        {
          title: 'Project Design',
          description:
            'Our engineering team develops the complete executive project: detailed drawings, technical specifications, itemized budget, and construction schedule for your review and approval.',
        },
        {
          title: 'Execution',
          description:
            'We carry out the work with highly qualified personnel, state-of-the-art machinery, and certified materials, in strict compliance with current safety standards and regulations.',
        },
        {
          title: 'Delivery & Support',
          description:
            'We deliver the completed project with a full technical dossier, operating test protocols, and a written warranty. We provide ongoing technical support and preventive maintenance programs.',
        },
      ],
    },
    contact: {
      title: 'Contact',
      subtitle:
        'Have a project coming up? Contact us and we will be happy to prepare a tailored technical and commercial proposal, with no obligation.',
      locationTitle: 'Location',
      locationAddress: 'Calle Escuadrón de la Naval #394,\nCol. Jesús Cabello, Saltillo, Coahuila, Mexico',
      openMaps: 'Open in Google Maps',
      emailTitle: 'Email',
      phoneTitle: 'Phone',
      scheduleTitle: 'Business Hours',
      scheduleText: 'Monday to Friday: 8:00 AM – 6:00 PM\nSaturday: 9:00 AM – 2:00 PM',
      serviceOptions: [
        'Electrical Installations',
        'Electromechanical Systems',
        'Civil Construction',
        'Preventive Maintenance',
        'Remodeling',
        'CFE Permit Procedures',
        'Other',
      ],
      labelName: 'Name *',
      labelCompany: 'Company',
      labelEmail: 'Email *',
      labelPhone: 'Phone',
      labelService: 'Service Type',
      labelMessage: 'Message *',
      placeholderName: 'Your full name',
      placeholderCompany: 'Your company name',
      placeholderEmail: 'email@example.com',
      placeholderPhone: '844 112 2424',
      placeholderMessage: 'Describe your project or need...',
      placeholderService: 'Select a service',
      btnSend: 'Send by email',
      btnSending: 'Sending...',
      btnWhatsApp: 'WhatsApp',
      successMsg: 'Message sent successfully! We will be in touch soon.',
      errorMsg: 'An error occurred. Please try again or contact us directly.',
      errName: 'Name is required',
      errEmail: 'Email is required',
      errEmailInvalid: 'Please enter a valid email',
      errMessage: 'Message is required',
      errPhone: 'Invalid phone number',
    },
    footer: {
      description:
        'Industries Supply Electric S.A. de C.V. — Over two decades of expertise delivering electrical engineering, electromechanical, and civil construction projects to the highest quality standards.',
      navTitle: 'Navigation',
      servicesTitle: 'Services',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
      serviceLinks: [
        'Electrical Installations',
        'Electromechanical Systems',
        'Civil Construction',
        'Preventive Maintenance',
        'CFE Permit Procedures',
      ],
      navLinks: [
        { label: 'Home', href: '#inicio' },
        { label: 'About Us', href: '#quienes-somos' },
        { label: 'Services', href: '#servicios' },
        { label: 'Projects', href: '#proyectos' },
        { label: 'Contact', href: '#contacto' },
      ],
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es');
  const toggle = () => setLang((l) => (l === 'es' ? 'en' : 'es'));
  return (
    <LanguageContext.Provider value={{ lang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
