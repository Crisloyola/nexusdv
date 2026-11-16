import { PASOS } from "@/lib/servicios";

/** Proceso en 3 pasos: tres teclas grandes sobre el escenario, con el texto debajo. */
export function Pasos() {
  return (
    <section className="sec" id="proceso" aria-labelledby="proceso-t">
      <div className="wrap">
        <div className="sec__head rv">
          <h2 id="proceso-t" className="tit tit--c"><b>De la idea a publicado, en 3 pasos.</b> <span>Ves y apruebas el diseño antes de programar.</span></h2>
          <p className="sec__p">Tú nos cuentas de tu negocio y nosotros nos encargamos de todo lo técnico.</p>
        </div>
        <ol className="steps">
          {PASOS.map((s, i) => (
            <li className="step rv" key={s.t}>
              <span className={`key${i === 0 ? " key--lime" : ""}`} aria-hidden="true"><span>{i + 1}</span></span>
              <h3>{s.t}</h3>
              <p>{s.p}</p>
              <span className="step__m">{s.m}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
