import Image from "next/image";
import { proyectos } from "@/lib/data";
import { Icon } from "./Icons";
import { Carrusel } from "./Carrusel";

/** Casos de éxito: cada proyecto entregado con su problema, solución y resultado. Datos en lib/data.ts. */
export function Proyectos() {
  return (
    <section className="sec" id="proyectos" aria-labelledby="proyectos-t">
      <div className="wrap">
        <div className="sec__head rv">
          <h2 id="proyectos-t" className="tit tit--c"><b>Casos de éxito, en línea hoy.</b> <span>Puedes entrar y verlos tú mismo.</span></h2>
          <p className="sec__p">Qué necesitaba cada negocio, qué le hicimos y qué tiene hoy.</p>
        </div>
        <div className="rv">
        <Carrusel etiqueta="Casos de éxito">
          {proyectos.map((p) => (
            <article className="case" key={p.nombre} aria-roledescription="caso" aria-label={p.nombre}>
              <a className="case__media" href={p.url} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
                <span className="case__win">
                  <span className="case__bar"><i /><i /><i /><span>{p.dominio}</span></span>
                  <Image src={p.imgDesktop.src} width={p.imgDesktop.w} height={p.imgDesktop.h} alt="" quality={85} sizes="(max-width: 640px) 86vw, (max-width: 960px) 46vw, 400px" />
                </span>
              </a>
              <div className="case__head">
                <div>
                  <h3>{p.nombre}</h3>
                  <p className="case__tipo">{p.etiqueta}</p>
                </div>
                <a className="case__ir" href={p.url} target="_blank" rel="noopener" aria-label={p.urlTexto}><Icon id="arr" /></a>
              </div>
              <dl className="caso">
                <div><dt>Problema</dt><dd>{p.caso.problema}</dd></div>
                <div><dt>Solución</dt><dd>{p.caso.solucion}</dd></div>
                <div className="caso__res"><dt>Resultado</dt><dd>{p.caso.resultado}</dd></div>
              </dl>
            </article>
          ))}
        </Carrusel>
        </div>
      </div>
    </section>
  );
}
