import Image from "next/image";
import { proyectos } from "@/lib/data";
import { Icon } from "./Icons";

/** Proyectos entregados (sección oscura). Para agregar uno, súmalo en lib/data.ts. */
export function Proyectos() {
  return (
    <section className="sec night" id="proyectos">
      <div className="wrap">
        <div className="sec__top rv">
          <div><p className="mono tag" style={{ color: "var(--lime)" }}>Proyectos entregados</p><h2 className="display h2">Trabajo real, en línea hoy</h2></div>
          <p className="lead">Estos proyectos ya están funcionando. Puedes entrar y verlos tú mismo.</p>
        </div>
        {proyectos.map((p) => (
          <article className="case rv" key={p.nombre}>
            <div className="case__media">
              <div className="case__win">
                <div className="case__bar"><i /><i /><i /><span>{p.dominio}</span></div>
                <Image src={p.imgDesktop.src} width={p.imgDesktop.w} height={p.imgDesktop.h} alt={p.imgDesktop.alt} quality={90} sizes="(max-width: 960px) 140vw, 1000px" />
              </div>
              <div className="case__ph">
                <Image src={p.imgMovil.src} width={p.imgMovil.w} height={p.imgMovil.h} alt={p.imgMovil.alt} quality={90} sizes="(max-width: 960px) 40vw, 260px" />
              </div>
            </div>
            <div>
              <p className="mono">{p.etiqueta}</p>
              <h3>{p.nombre}</h3>
              <p>{p.descripcion}</p>
              <dl>{p.datos.map((d) => <div key={d.t}><dt>{d.t}</dt><dd>{d.v}</dd></div>)}</dl>
              <a className="btn btn--lime" href={p.url} target="_blank" rel="noopener">{p.urlTexto}<Icon id="arr" /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
