import Image from "next/image";
import { testimonios, type Testimonio } from "@/lib/data";

function Tarjeta({ t }: { t: Testimonio }) {
  return (
    <figure className="testi">
      <blockquote>“{t.texto}”</blockquote>
      <figcaption>
        {t.logo ? (
          <Image className="testi__av testi__av--logo" src={t.logo} width={44} height={44} loading="eager" alt={`Logo de ${t.negocio}`} />
        ) : (
          <span className="testi__av" aria-hidden="true">{(t.nombre ?? t.negocio)[0]}</span>
        )}
        <span><b>{t.nombre ?? t.negocio}</b><small>{t.nombre ? t.negocio : "Cliente"}{t.proyecto ? ` · ${t.proyecto}` : ""}</small></span>
      </figcaption>
    </figure>
  );
}

/**
 * Testimonios de clientes reales (lib/data.ts). Si la lista está vacía, la sección no se muestra.
 * Se muestran en una cuadrícula estática para que cada opinión se pueda leer sin prisa.
 */
export function Testimonios() {
  if (testimonios.length === 0) return null;
  const key = (t: Testimonio) => t.negocio + t.texto.slice(0, 20);
  return (
    <section className="sec" id="testimonios" aria-labelledby="testimonios-t">
      <div className="wrap">
        <div className="sec__head rv">
          <h2 id="testimonios-t" className="tit tit--c"><b>Lo que dicen nuestros clientes.</b> <span>Negocios reales, en sus propias palabras.</span></h2>
        </div>
        <div className="testis rv">{testimonios.map((t) => <Tarjeta key={key(t)} t={t} />)}</div>
      </div>
    </section>
  );
}
