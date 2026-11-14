import { NexoDemo } from "./NexoDemo";

/** Sección verde lima con el chat de Nexo incrustado, etiquetas flotantes y luces de fondo. */
export function NexoSeccion() {
  return (
    <section className="sec nexo-sec" id="nexo">
      <div className="wrap nexo-grid">
        <div className="rv">
          <p className="mono tag">Asistente 24/7</p>
          <h2 className="display h2">Pregúntale a Nexo ahora mismo</h2>
          <p className="lead" style={{ marginTop: 24 }}>Nexo es nuestro asistente. Responde tus dudas sobre webs, apps, sistemas y correo a cualquier hora, y cuando quieras te pasa con una persona del equipo.</p>
          <ul className="nexo-pts"><li>Responde al instante, de día o de noche</li><li>Te orienta según lo que tu negocio necesita</li><li>Te conecta con nosotros por WhatsApp</li></ul>
        </div>
        <div className="chat-wrap rv">
          <span className="nx-tag nx-tag--1" aria-hidden="true"><b>⚡</b>Responde en segundos</span>
          <span className="nx-tag nx-tag--2" aria-hidden="true"><b>●</b>24/7</span>
          <span className="nx-tag nx-tag--3" aria-hidden="true"><b>✓</b>Cotización sin costo</span>
          <NexoDemo />
        </div>
      </div>
    </section>
  );
}
