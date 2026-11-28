import { A_MEDIDA, planes, waTexto } from "@/lib/data";
import { CORREO, NOTA_PRECIOS, PROMOCION, RENOVACIONES, promoActiva, quedanPromo, soles, type PlanWeb } from "@/lib/servicios";
import { Icon } from "./Icons";

/** Tarjeta del plan que tiene la promo vigente: precio rebajado, ahorro, días que quedan y botón directo a WhatsApp. */
function PlanPromo({ p }: { p: PlanWeb }) {
  return (
    <article id="promo" className="plan plan--promo rv">
      <p className="plan__cinta">{PROMOCION.etiqueta} · {quedanPromo()}</p>
      <h3>{p.nombre}</h3>
      <div className="plan__price">
        <small className="plan__desde">Antes <s>{soles(PROMOCION.precioNormal)}</s></small>
        {soles(PROMOCION.precio)}
      </div>
      <p className="plan__ahorro">Ahorras {soles(PROMOCION.ahorro)}</p>
      <p className="plan__plazo"><Icon id="chk" />Lista en {p.plazo}</p>
      <p>{p.texto}</p>
      <ul className="ticks">
        <li className="plan__extra">{PROMOCION.extra}</li>
        {p.incluye.map((x) => <li key={x}>{x}</li>)}
      </ul>
      <p className="plan__promo">Válida hasta el {PROMOCION.finTexto}. {PROMOCION.condiciones}</p>
      <a className="btn btn--lg btn--lime" href={waTexto(PROMOCION.mensaje, PROMOCION.campana)} target="_blank" rel="noopener">
        <Icon id="wa" />Pedir la promo
      </a>
    </article>
  );
}

/** Precios: los 4 planes web, una línea para lo que va a medida y qué incluye. Datos en lib/servicios.ts. */
export function Precios() {
  const promo = promoActiva();
  return (
    <section className="sec" id="precios" aria-labelledby="precios-t">
      <div className="wrap">
        <div className="sec__head rv">
          <h2 id="precios-t" className="tit tit--c"><b>Precios claros desde el inicio.</b> <span>Elige el tipo de web que necesitas.</span></h2>
          <p className="sec__p">Te enviamos la cotización exacta sin costo, según lo que necesitas.</p>
        </div>
        <div className="plans">
          {planes.map((p) => promo && p.id === PROMOCION.planId ? <PlanPromo key={p.id} p={p} /> : (
            <article key={p.id} className={`plan rv${p.destacado ? " plan--hl" : ""}`}>
              <h3>{p.nombre}</h3>
              <div className="plan__price">{p.esDesde && <small className="plan__desde">Desde</small>}{soles(p.precio)}</div>
              <p className="plan__plazo"><Icon id="chk" />Lista en {p.plazo}</p>
              <p>{p.texto}</p>
              <ul className="ticks">{p.incluye.map((x) => <li key={x}>{x}</li>)}</ul>
              <a className={`btn btn--lg ${p.destacado ? "btn--lime" : "btn--ghost"}`} href={waTexto(p.mensaje, p.campana)}
                target="_blank" rel="noopener">Cotizar {p.nombre.toLowerCase()}<Icon id="right" /></a>
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
        <div className="mail rv">
          <div className="mail__head">
            <span className="mail__ico"><Icon id="mail" /></span>
            <h3>{CORREO.titulo}</h3>
            <p>{CORREO.texto}</p>
            <code className="mail__ej">{CORREO.ejemplo}</code>
            <ul className="ticks mail__puntos">{CORREO.puntos.map((x) => <li key={x}>{x}</li>)}</ul>
            <small className="mail__nota">{CORREO.nota}</small>
          </div>
          <div className="mail__opts">
            {CORREO.planes.map((c) => (
              <a key={c.id} className={`mail__opt${c.destacado ? " mail__opt--hl" : ""}`} href={waTexto(c.mensaje, c.campana)} target="_blank" rel="noopener">
                <span className="mail__name">{c.nombre}</span>
                <b className="mail__price">{soles(c.precio)}</b>
                <small>{c.detalle}</small>
                <span className="mail__cta">Cotizar<Icon id="right" /></span>
              </a>
            ))}
          </div>
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
