import { preguntas } from "@/lib/data";
import { AbrirNexo } from "./AbrirNexo";

/** Preguntas frecuentes (las mismas que lee Google en los datos estructurados). */
export function Preguntas() {
  return (
    <section className="sec" id="preguntas" aria-labelledby="preguntas-t">
      <div className="wrap faq">
        <div className="sec__head rv">
          <h2 id="preguntas-t" className="tit tit--c"><b>Preguntas frecuentes.</b></h2>
          <p className="sec__p">¿No ves tu pregunta? Nexo te responde al instante.</p>
        </div>
        <div className="faq__list rv">
          {preguntas.map((f, i) => (
            <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
        <div className="faq__mas rv"><AbrirNexo className="btn btn--ghost">Preguntarle a Nexo</AbrirNexo></div>
      </div>
    </section>
  );
}
