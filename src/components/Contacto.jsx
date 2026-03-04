import { useState } from 'react';
import './Contacto.css';
import { useLanguage } from '../context/LanguageContext';

export default function Contacto() {
  const { t } = useLanguage();
  const c = t.contact;

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
  const FORMSPREE_ID = 'mgoljjqn';

  const validate = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = c.errName;
    if (!form.email.trim()) errs.email = c.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = c.errEmailInvalid;
    if (!form.mensaje.trim()) errs.mensaje = c.errMessage;
    if (form.telefono && !/^[\d\s\-+()]{7,20}$/.test(form.telefono)) errs.telefono = c.errPhone;
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

    const fecha = new Date().toLocaleDateString('es-MX', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Solicitud de contacto - ${form.nombre}${form.empresa ? ' | ' + form.empresa : ''}`,
          '-- DATOS DEL SOLICITANTE --': '--------------------------------',
          'Nombre': form.nombre,
          'Empresa': form.empresa || 'No especificada',
          'Correo electronico': form.email,
          'Telefono': form.telefono || 'No proporcionado',
          'Servicio de interes': form.servicio || 'Consulta general',
          '-- MENSAJE --': '--------------------------------',
          'Mensaje': form.mensaje,
          '-- INFORMACION --': '--------------------------------',
          'Fecha de envio': fecha,
          'Origen': 'Formulario de contacto - isesa.mx',
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
          <h2>{c.title}</h2>
          <p>{c.subtitle}</p>
        </div>

        <div className="contact__grid">
          {/* Información */}
          <div className="contact__info reveal delay-1">
            <div className="contact__info-card contact__info-card--location">
              <div className="contact__info-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="contact__info-location">
                <h4>{c.locationTitle}</h4>
                <p>{c.locationAddress.split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}</p>
                <div className="contact__map">
                  <iframe
                    title="Ubicación ISESA"
                    src="https://maps.google.com/maps?q=25.3994896,-100.9821319&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href="https://maps.app.goo.gl/otvfMn9k6H4vAkEC9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__map-link"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    {c.openMaps}
                  </a>
                </div>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h4>{c.emailTitle}</h4>
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
                <h4>{c.phoneTitle}</h4>
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
                <h4>{c.scheduleTitle}</h4>
                <p>{c.scheduleText.split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form className="contact__form reveal delay-2" onSubmit={handleSubmit} noValidate>
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="nombre">{c.labelName}</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder={c.placeholderName}
                  value={form.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? 'error' : ''}
                />
                {errors.nombre && <span className="contact__error">{errors.nombre}</span>}
              </div>
              <div className="contact__field">
                <label htmlFor="empresa">{c.labelCompany}</label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  placeholder={c.placeholderCompany}
                  value={form.empresa}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="email">{c.labelEmail}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={c.placeholderEmail}
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="contact__error">{errors.email}</span>}
              </div>
              <div className="contact__field">
                <label htmlFor="telefono">{c.labelPhone}</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder={c.placeholderPhone}
                  value={form.telefono}
                  onChange={handleChange}
                  className={errors.telefono ? 'error' : ''}
                />
                {errors.telefono && <span className="contact__error">{errors.telefono}</span>}
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="servicio">{c.labelService}</label>
              <select
                id="servicio"
                name="servicio"
                value={form.servicio}
                onChange={handleChange}
              >
                <option value="">{c.placeholderService}</option>
                {c.serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="contact__field">
              <label htmlFor="mensaje">{c.labelMessage}</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                placeholder={c.placeholderMessage}
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
                    {c.btnSending}
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    {c.btnSend}
                  </>
                )}
              </button>
              <button
                type="button"
                className="contact__whatsapp"
                onClick={() => {
                  const errs = validate();
                  if (Object.keys(errs).length > 0) {
                    setErrors(errs);
                    return;
                  }
                  const lineas = [
                    `Hola, buenos días. Mi nombre es *${form.nombre}*${form.empresa ? ', de *' + form.empresa + '*' : ''}.`,
                    `Me comunico a través del sitio web de ISESA para solicitar información sobre sus servicios.`,
                    ``,
                    `*── Solicitud ──*`,
                    form.servicio ? `📌 *Servicio de interés:* ${form.servicio}` : null,
                    ``,
                    `*── Datos de contacto ──*`,
                    `📧 *Correo:* ${form.email}`,
                    form.telefono ? `📞 *Teléfono:* ${form.telefono}` : null,
                    ``,
                    `*── Descripción del proyecto ──*`,
                    form.mensaje,
                    ``,
                    `Quedo en espera de su respuesta. Gracias.`,
                  ].filter(l => l !== null).join('\n');
                  window.open(`https://wa.me/528441223339?text=${encodeURIComponent(lineas)}`,'_blank');
                }}
              >
                <span className="contact__whatsapp-icon">
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.002 3C9.374 3 4 8.373 4 15.001c0 2.184.592 4.23 1.625 5.985L4 29l8.23-1.598A11.94 11.94 0 0 0 16.002 28c6.627 0 12-5.373 12-12.001C28.002 8.373 22.63 3 16.002 3zm0 21.9a9.87 9.87 0 0 1-5.03-1.376l-.36-.214-3.733.726.756-3.64-.236-.373A9.863 9.863 0 0 1 6.1 15c0-5.46 4.44-9.9 9.902-9.9C21.464 5.1 25.9 9.54 25.9 15c0 5.46-4.436 9.9-9.898 9.9zm5.43-7.41c-.298-.149-1.762-.87-2.035-.968-.273-.1-.472-.149-.67.149-.198.297-.77.968-.943 1.167-.174.198-.347.223-.645.074-.298-.149-1.258-.464-2.396-1.48-.886-.79-1.484-1.765-1.658-2.063-.174-.297-.019-.458.13-.606.134-.133.298-.347.447-.52.15-.174.199-.298.298-.497.1-.198.05-.372-.025-.52-.075-.15-.67-1.614-.918-2.21-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.793.372-.273.297-1.04 1.017-1.04 2.48 0 1.463 1.065 2.876 1.213 3.075.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.117.571-.085 1.762-.72 2.01-1.416.249-.695.249-1.29.174-1.416-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                </span>
                <span className="contact__whatsapp-label">{c.btnWhatsApp}</span>
              </button>
            </div>

            {/* Mensajes de estado */}
            {status === 'success' && (
              <div className="contact__status contact__status--success">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {c.successMsg}
              </div>
            )}
            {status === 'error' && (
              <div className="contact__status contact__status--error">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {c.errorMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
