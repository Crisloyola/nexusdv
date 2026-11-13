import { contacto, planes, preguntas } from "@/lib/data";
import { Icon } from "./Icons";
import { Tile } from "./Tile";
import { FlutedGlass } from "./FlutedGlass";

export function Precios() {
  return (
    <section className="sec" id="precios" aria-labelledby="precios-h">
      <div className="wrap">
        <div className="head rv">
          <h2 id="precios-h">Precios claros</h2>
          <p>Webs, apps y sistemas se cotizan según lo que necesitas; el dominio con correo tiene precio fijo.</p>
        </div>
        <div className="bento">
          {planes.map((p) => (
            <Tile as="article" key={p.nombre} className={`plan c-4${p.destacado ? " tile--lime" : ""}`}>
              {p.etiqueta && <span className="plan__tag">{p.etiqueta}</span>}
              <h3>{p.nombre}</h3>
              <div className="price"><span className="big">{p.precio}</span>{p.nota && <small>{p.nota}</small>}</div>
              <p>{p.texto}</p>
              <ul>{p.incluye.map((x) => <li key={x}>{x}</li>)}</ul>
              <a className={`btn ${p.destacado ? "btn--dark" : "btn--ghost"}`} href={contacto.whatsappLink}>{p.boton}<Icon id="right" /></a>
            </Tile>
          ))}

          <Tile className="faq c-8" id="preguntas">
            <h3 className="sr">Preguntas frecuentes</h3>
            {preguntas.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </Tile>
          <FlutedGlass as="a" seed={42} href={contacto.whatsappLink} className="tile--link c-4" style={{ minHeight: 280 }}>
            <h3 style={{ fontSize: 30, letterSpacing: "-0.03em" }}>Preguntas frecuentes</h3>
            <p>¿Te queda otra duda? Escríbenos y te respondemos rápido.</p>
            <div className="tile__foot"><span>Preguntar por WhatsApp</span><span className="arrow"><Icon id="arr" /></span></div>
          </FlutedGlass>
        </div>
      </div>
    </section>
  );
}
