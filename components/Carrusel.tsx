"use client";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icons";

/** Carrusel horizontal con scroll-snap: se mueve con el dedo, las flechas y los puntos. */
export function Carrusel({ children, etiqueta }: { children: ReactNode; etiqueta: string }) {
  const track = useRef<HTMLDivElement>(null);
  const total = Children.count(children);
  const [paginas, setPaginas] = useState(total);
  const [actual, setActual] = useState(0);

  // Ancho de un paso (tarjeta + separación) y cuántas tarjetas entran a la vez.
  const medir = useCallback(() => {
    const el = track.current;
    const primera = el?.firstElementChild as HTMLElement | null;
    if (!el || !primera) return null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const paso = primera.offsetWidth + gap;
    const porVista = Math.max(1, Math.round((el.clientWidth + gap) / paso));
    return { el, paso, paginas: Math.max(1, total - porVista + 1) };
  }, [total]);

  const actualizar = useCallback(() => {
    const m = medir();
    if (!m) return;
    setPaginas(m.paginas);
    const fin = m.el.scrollLeft + m.el.clientWidth >= m.el.scrollWidth - 4;
    setActual(fin ? m.paginas - 1 : Math.min(m.paginas - 1, Math.round(m.el.scrollLeft / m.paso)));
  }, [medir]);

  const ir = useCallback((i: number) => {
    const m = medir();
    if (!m) return;
    const destino = ((i % m.paginas) + m.paginas) % m.paginas;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    m.el.scrollTo({ left: destino * m.paso, behavior });
  }, [medir]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    actualizar();
    el.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
    return () => { el.removeEventListener("scroll", actualizar); window.removeEventListener("resize", actualizar); };
  }, [actualizar]);

  return (
    <div
      className="carr"
      role="region"
      aria-roledescription="carrusel"
      aria-label={etiqueta}
    >
      <div className="carr__track" ref={track}>{children}</div>
      {paginas > 1 && (
        <div className="carr__nav">
          <button type="button" className="carr__btn carr__btn--prev" aria-label="Caso anterior" onClick={() => ir(actual - 1)}><Icon id="right" /></button>
          <div className="carr__dots">
            {Array.from({ length: paginas }, (_, i) => (
              <button
                key={i}
                type="button"
                className="carr__dot"
                aria-label={`Ir al caso ${i + 1}`}
                aria-current={i === actual ? "true" : undefined}
                onClick={() => ir(i)}
              />
            ))}
          </div>
          <button type="button" className="carr__btn" aria-label="Caso siguiente" onClick={() => ir(actual + 1)}><Icon id="right" /></button>
        </div>
      )}
    </div>
  );
}
