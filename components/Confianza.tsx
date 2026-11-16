import { contacto, fundador } from "@/lib/data";
import { confianza } from "@/lib/servicios";

/** Sección de confianza: quién está detrás y qué pasa después de contratar. Respuestas en lib/servicios.ts (POLITICAS). */
export function Confianza() {
  const quien = fundador.nombre
    ? `NEXUSDV es un estudio de diseño y desarrollo en ${contacto.ciudad}, fundado por ${fundador.nombre}. Puedes ver los proyectos que ya entregamos y escribirnos por WhatsApp cuando quieras.`
    : `Un equipo de diseño y desarrollo en ${contacto.ciudad}. Puedes ver los proyectos que ya entregamos y escribirnos por WhatsApp cuando quieras.`;
  const items = confianza(quien);
  return (
    <section className="sec" id="confianza" aria-labelledby="confianza-t">
      <div className="wrap">
        <div className="sec__head rv">
          <h2 id="confianza-t" className="tit tit--c"><b>Trabajar con nosotros, sin sorpresas.</b> <span>Lo que pasa después de cotizar.</span></h2>
        </div>
        <dl className="trust">
          {items.map((x) => (
            <div className="trust__i rv" key={x.q}>
              <dt>{x.q}</dt>
              <dd>{x.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
