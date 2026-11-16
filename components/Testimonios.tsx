import { testimonios } from "@/lib/data";

/** Testimonios de clientes reales (lib/data.ts). Si la lista está vacía, la sección no se muestra. */
export function Testimonios() {
  if (testimonios.length === 0) return null;
  return (
    <section className="sec" id="testimonios" aria-labelledby="testimonios-t">
      <div className="wrap">
        <div className="sec__head rv">
          <h2 id="testimonios-t" className="tit tit--c"><b>Lo que dicen nuestros clientes.</b> <span>Negocios reales, en sus propias palabras.</span></h2>
        </div>
        <div className="testis">
          {testimonios.map((t) => (
            <figure className="testi rv" key={t.nombre + t.negocio}>
              <blockquote>“{t.texto}”</blockquote>
              <figcaption>
                <span className="testi__av" aria-hidden="true">{t.nombre[0]}</span>
                <span><b>{t.nombre}</b><small>{t.negocio}{t.proyecto ? ` · ${t.proyecto}` : ""}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
