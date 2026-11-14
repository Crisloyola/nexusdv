"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { proyectos } from "@/lib/data";
import { Icon } from "./Icons";
import { Tile } from "./Tile";

const pad = (n: number) => String(n).padStart(2, "0");

/** Carrusel de proyectos entregados. Para agregar uno, súmalo en lib/data.ts. */
export function Proyectos() {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const total = proyectos.length;

  const go = (n: number) => {
    const t = track.current; if (!t) return;
    const k = (n + total) % total;
    t.scrollTo({ left: k * t.clientWidth, behavior: "smooth" });
  };
  useEffect(() => {
    const t = track.current; if (!t) return;
    const onScroll = () => requestAnimationFrame(() => setI(Math.round(t.scrollLeft / t.clientWidth)));
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="sec" id="proyectos" aria-labelledby="proyectos-h" aria-roledescription="carrusel">
      <div className="wrap bento">
        <Tile className="proj c-12">
          <div className="head" style={{ marginBottom: 36 }}>
            <div>
              <p className="kicker">Proyectos entregados</p>
              <h2 id="proyectos-h" style={{ marginTop: 14, fontSize: "clamp(36px,4.4vw,64px)", maxWidth: "none" }}>Proyectos que ya están funcionando</h2>
            </div>
            <div className="car__ctrl">
              <span className="car__count"><b>{pad(i + 1)}</b> / <span>{pad(total)}</span></span>
              <button className="car__btn" type="button" onClick={() => go(i - 1)} aria-label="Proyecto anterior"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></button>
              <button className="car__btn" type="button" onClick={() => go(i + 1)} aria-label="Proyecto siguiente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>

          <div className="car__track" ref={track} tabIndex={0}
            onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); } }}>
            {proyectos.map((p, k) => (
              <div className="car__slide" role="group" aria-roledescription="proyecto" aria-label={`${k + 1} de ${total}`} key={p.nombre}>
                <div className="car__info">
                  <p className="car__tag">{p.etiqueta}</p>
                  <h3 className="car__title">{p.nombre}</h3>
                  <p>{p.descripcion}</p>
                  <dl className="facts">{p.datos.map((d) => <div key={d.t}><dt>{d.t}</dt><dd>{d.v}</dd></div>)}</dl>
                  <a className="link" href={p.url} target="_blank" rel="noopener">{p.urlTexto}<Icon id="arr" /></a>
                </div>
                <div className="case">
                  <div className="case__browser">
                    <div className="case__bar"><span className="case__dots" aria-hidden="true"><i /><i /><i /></span><span className="case__url">{p.dominio}</span></div>
                    <Image src={p.imgDesktop.src} width={p.imgDesktop.w} height={p.imgDesktop.h} alt={p.imgDesktop.alt} quality={90} sizes="(max-width: 1023px) 140vw, 1000px" />
                  </div>
                  <div className="case__phone"><Image src={p.imgMovil.src} width={p.imgMovil.w} height={p.imgMovil.h} alt={p.imgMovil.alt} quality={90} sizes="(max-width: 1023px) 40vw, 260px" /></div>
                </div>
              </div>
            ))}
          </div>

          <div className="car__dots" role="tablist" aria-label="Elegir proyecto">
            {proyectos.map((p, k) => <button key={p.nombre} type="button" role="tab" aria-label={p.nombre} aria-selected={k === i} onClick={() => go(k)} />)}
          </div>
        </Tile>
      </div>
    </section>
  );
}
