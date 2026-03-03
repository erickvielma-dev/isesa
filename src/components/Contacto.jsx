import { useState } from 'react';
import './Contacto.css';

const SERVICE_OPTIONS = [
  'Instalaciones Eléctricas',
  'Sistemas Electromecánicos',
  'Construcción de Obra Civil',
  'Mantenimiento Preventivo',
  'Remodelaciones',
  'Trámites ante CFE',
  'Otro',
];

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  // ⚡ Configura tu Formspree Form ID aquí:
  // 1. Crea una cuenta gratis en https://formspree.io
  // 2. Crea un formulario nuevo y pon L_isesa@yahoo.com.mx como destino
  // 3. Copia el Form ID (ej: "xrgvabcd") y pégalo abajo
  const FORMSPREE_ID = 'mgoljjqn';

  const validate = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = 'El nombre es requerido';
    if (!form.email.trim()) errs.email = 'El correo electrónico es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Ingrese un correo válido';
    if (!form.mensaje.trim()) errs.mensaje = 'El mensaje es requerido';
    if (form.telefono && !/^[\d\s\-+()]{7,20}$/.test(form.telefono)) errs.telefono = 'Número de teléfono inválido';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('sending');

    const fechaSolicitud = new Date().toLocaleDateString('es-MX', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Solicitud de Cotización — ${form.nombre} | ${form.servicio || 'General'}`,
          _replyto: form.email,
          '01. Fecha de solicitud': fechaSolicitud,
          '02. Nombre del solicitante': form.nombre,
          '03. Empresa': form.empresa || 'No especificada',
          '04. Correo electrónico': form.email,
          '05. Teléfono de contacto': form.telefono || 'No proporcionado',
          '06. Servicio solicitado': form.servicio || 'No especificado',
          '07. Descripción del proyecto': form.mensaje,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setForm({ nombre: '', empresa: '', email: '', telefono: '', servicio: '', mensaje: '' });
        setTimeout(() => setStatus(null), 6000);
      } else {
        const data = await response.json();
        throw new Error(data?.error || 'Error al enviar');
      }
    } catch (err) {
      console.error('Error enviando formulario:', err);
      setStatus('error');
      setTimeout(() => setStatus(null), 6000);
    }
  };

  return (
    <section id="contacto" className="contact section">
      <div className="container">
        <div className="section-header reveal">
          <h2>Contacto</h2>
          <p>
            ¿Tiene un proyecto en puerta? Contáctenos y con gusto le elaboraremos
            una propuesta técnica y económica a la medida, sin compromiso.
          </p>
        </div>

        <div className="contact__grid">
          {/* Información */}
          <div className="contact__info reveal delay-1">
            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <h4>Ubicación</h4>
                <p>Calle Escuadrón de la Naval #394,<br/>Col. Jesús Cabello, Saltillo, Coahuila, México</p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h4>Correo Electrónico</h4>
                <p>
                  <a href="mailto:L_isesa@yahoo.com.mx">L_isesa@yahoo.com.mx</a><br/>
                  <a href="mailto:sip.vigr@yahoo.com.mx">sip.vigr@yahoo.com.mx</a>
                </p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <h4>Teléfono</h4>
                <p>
                  <a href="tel:+528441122424">844 112 2424</a><br/>
                  <a href="tel:+528441122488">844 112 2488</a>
                </p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <h4>Horario de Atención</h4>
                <p>Lunes a Viernes: 8:00 – 18:00<br/>Sábado: 9:00 – 14:00</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form className="contact__form reveal delay-2" onSubmit={handleSubmit} noValidate>
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Su nombre completo"
                  value={form.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? 'error' : ''}
                />
                {errors.nombre && <span className="contact__error">{errors.nombre}</span>}
              </div>
              <div className="contact__field">
                <label htmlFor="empresa">Empresa</label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  placeholder="Nombre de su empresa"
                  value={form.empresa}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="email">Correo Electrónico *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="contact__error">{errors.email}</span>}
              </div>
              <div className="contact__field">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="844 112 2424"
                  value={form.telefono}
                  onChange={handleChange}
                  className={errors.telefono ? 'error' : ''}
                />
                {errors.telefono && <span className="contact__error">{errors.telefono}</span>}
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="servicio">Tipo de Servicio</label>
              <select
                id="servicio"
                name="servicio"
                value={form.servicio}
                onChange={handleChange}
              >
                <option value="">Seleccione un servicio</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="contact__field">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                placeholder="Describa su proyecto o necesidad..."
                value={form.mensaje}
                onChange={handleChange}
                className={errors.mensaje ? 'error' : ''}
              />
              {errors.mensaje && <span className="contact__error">{errors.mensaje}</span>}
            </div>

            <div className="contact__actions">
              <button
                type="submit"
                className="btn btn-primary contact__submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <svg className="contact__spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Enviar por correo
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary contact__whatsapp"
                onClick={() => {
                  const errs = validate();
                  if (Object.keys(errs).length > 0) {
                    setErrors(errs);
                    return;
                  }
                  const msg =
                    `Hola, mi nombre es ${form.nombre}${form.empresa ? ' de ' + form.empresa : ''}.\n` +
                    `Solicitar información de sus servicios, mi información es:\n` +
                    (form.servicio ? `Servicio de interés: ${form.servicio}\n` : '') +
                    (form.telefono ? `Teléfono: ${form.telefono}\n` : '') +
                    `Correo electrónico: ${form.email}\n` +
                    `Mensaje: ${form.mensaje}`;
                  window.open(`https://wa.me/528441223339?text=${encodeURIComponent(msg)}`,'_blank');
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.7 20.3l-3.1-3.1c1.2-1.5 1.9-3.4 1.9-5.4C20.5 6.5 16.5 2.5 11.5 2.5S2.5 6.5 2.5 11.5c0 2 .7 3.9 1.9 5.4l-3.1 3.1c-.2.2-.2.5 0 .7.1.1.2.1.4.1h5.6c.3 0 .5-.2.5-.5v-1.6c0-.3-.2-.5-.5-.5H5.1c-.1 0-.2-.1-.2-.2l2.2-2.2c1.5 1.2 3.4 1.9 5.4 1.9 5 0 9-4 9-9 0-2-.7-3.9-1.9-5.4l2.2-2.2c.1-.1.1-.2.1-.4 0-.2-.1-.3-.2-.4z"/>
                </svg>
                WhatsApp
              </button>
            </div>

            {/* Mensajes de estado */}
            {status === 'success' && (
              <div className="contact__status contact__status--success">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
              </div>
            )}
            {status === 'error' && (
              <div className="contact__status contact__status--error">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                Ocurrió un error. Por favor intente de nuevo o contáctenos directamente.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
