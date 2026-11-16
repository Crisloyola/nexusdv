import { AbrirNexo } from "./AbrirNexo";
import { NexoCara } from "./Icons";

/** Sección de Nexo: qué hace el asistente y cómo abrirlo. La demo funcionando está en la vitrina. */
export function NexoSeccion() {
  return (
    <section className="sec" id="nexo" aria-labelledby="nexo-t">
      <div className="wrap">
        <div className="nexo rv">
          <span className="nexo__cara" aria-hidden="true"><NexoCara /></span>
          <h2 id="nexo-t" className="tit tit--c"><b>Pregúntale a Nexo ahora mismo.</b></h2>
          <p className="sec__p">Nuestro asistente responde tus dudas sobre webs, tiendas virtuales, apps y sistemas a cualquier hora, y cuando quieras te pasa con una persona del equipo.</p>
          <ul className="nexo__puntos">
            <li>Responde al instante, de día o de noche</li>
            <li>Te orienta según lo que tu negocio necesita</li>
            <li>Te conecta con nosotros por WhatsApp</li>
          </ul>
          <AbrirNexo className="btn btn--light btn--lg">Hablar con Nexo</AbrirNexo>
          <p className="nexo__nota">¿Te gusta? Podemos crear uno igual para tu negocio.</p>
        </div>
      </div>
    </section>
  );
}
