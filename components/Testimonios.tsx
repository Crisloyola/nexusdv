import type { CSSProperties } from "react";
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
 * Con 2 o más, pasan solos en una cinta infinita (solo CSS): la lista va dos veces y se desplaza -50%.
 * Se pausa al pasar el mouse o tocarla; con "reducir movimiento" queda quieta y se desliza a mano.
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
        {testimonios.length === 1 ? (
          <div className="testis rv"><Tarjeta t={testimonios[0]} /></div>
        ) : (
          <div className="opin rv" style={{ "--dur": `${testimonios.length * 11}s` } as CSSProperties}>
            <div className="opin__track">
              {testimonios.map((t) => <div className="opin__item" key={key(t)}><Tarjeta t={t} /></div>)}
              {testimonios.map((t) => <div className="opin__item" key={"b" + key(t)} aria-hidden="true"><Tarjeta t={t} /></div>)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
