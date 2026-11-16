import { A_MEDIDA, planes, waTexto } from "@/lib/data";
import { NOTA_PRECIOS, POLITICAS, RENOVACIONES, soles } from "@/lib/servicios";
import { Icon } from "./Icons";

/** Precios: los 3 planes web con precio desde, una línea para lo que va a medida y qué incluye. Datos en lib/servicios.ts. */
export function Precios() {
  return (
    <section className="sec" id="precios" aria-labelledby="precios-t">
      <div className="wrap">
        <div className="sec__head rv">
          <h2 id="precios-t" className="tit tit--c"><b>Precios claros desde el inicio.</b> <span>Elige el tipo de web que necesitas.</span></h2>
          <p className="sec__p">{POLITICAS.hosting}</p>
        </div>
        <div className="plans">
          {planes.map((p) => (
            <article key={p.id} className={`plan rv${p.destacado ? " plan--hl" : ""}`}>
              <h3>{p.nombre}</h3>
              <div className="plan__price"><small className="plan__desde">Desde</small>{soles(p.desde)}</div>
              <p className="plan__plazo"><Icon id="chk" />Lista en {p.plazo}</p>
              <p>{p.texto}</p>
              <ul className="ticks">{p.incluye.map((x) => <li key={x}>{x}</li>)}</ul>
              <a className={`btn btn--lg ${p.destacado ? "btn--lime" : "btn--ghost"}`} href={waTexto(p.mensaje, p.campana)} target="_blank" rel="noopener">Cotizar {p.nombre.toLowerCase()}<Icon id="right" /></a>
            </article>
          ))}
        </div>
        <div className="plan-extra rv">
          <div>
            <h3>{A_MEDIDA.nombre}</h3>
            <p>{A_MEDIDA.texto}</p>
          </div>
          <b className="plan-extra__precio">{A_MEDIDA.precio}</b>
          <a className="btn btn--ghost" href={waTexto("Hola NEXUSDV, vengo de su web y quiero cotizar una app, un sistema o un asistente con IA.")} target="_blank" rel="noopener">{A_MEDIDA.boton}<Icon id="right" /></a>
        </div>
        <div className="renov rv">
          <h3>Renovaciones y extras</h3>
          <ul className="ticks">{RENOVACIONES.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <p className="plans__note">{NOTA_PRECIOS}</p>
      </div>
    </section>
  );
}
