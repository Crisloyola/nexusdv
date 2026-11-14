import { contacto, planes, preguntas } from "@/lib/data";
import { Icon } from "./Icons";

/** Tabla de 3 planes y preguntas frecuentes. Los datos vienen de lib/data.ts. */
export function Precios() {
  return (
    <section className="sec" id="precios" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec__top rv">
          <div><p className="mono tag">Precios</p><h2 className="display h2">Claros desde el inicio</h2></div>
          <p className="lead">Webs, apps, sistemas y asistentes con IA se cotizan según lo que necesitas. El dominio con correo tiene precio fijo.</p>
        </div>
        <div className="plans rv">
          {planes.map((p) => (
            <article key={p.nombre} className={`plan${p.destacado ? " plan--hl" : ""}`}>
              <h3>{p.nombre}{p.etiqueta && <span>{p.etiqueta}</span>}</h3>
              <div className="plan__price">{p.precio}<small>{p.nota || "cotización sin costo"}</small></div>
              <p>{p.texto}</p>
              <ul>{p.incluye.map((i) => <li key={i}>{i}</li>)}</ul>
              <a className={`btn ${p.destacado ? "btn--lime" : "btn--line"}`} href={contacto.whatsappLink} target="_blank" rel="noopener">{p.boton}<Icon id="arr" /></a>
            </article>
          ))}
        </div>
        <div className="faq rv">
          <div><p className="mono tag">Dudas</p><h3>Preguntas frecuentes</h3></div>
          <div>
            {preguntas.map((f, i) => (
              <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
