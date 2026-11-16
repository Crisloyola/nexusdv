"use client";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icons";

const PAUSA_MS = 5500;

/** Carrusel horizontal con scroll-snap: se desliza con el dedo, flechas y puntos. Avanza solo y se pausa al pasar el mouse o tocarlo. */
export function Carrusel({ children, etiqueta }: { children: ReactNode; etiqueta: string }) {
  const track = useRef<HTMLDivElement>(null);
  const total = Children.count(children);
  const [paginas, setPaginas] = useState(total);
  const [actual, setActual] = useState(0);
  const pausado = useRef(false);
  const visible = useRef(true);
  const actualRef = useRef(0);
  actualRef.current = actual;

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
    m.el.scrollTo({ left: destino * m.paso, behavior: "smooth" });
  }, [medir]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    actualizar();
    el.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
    return () => { el.removeEventListener("scroll", actualizar); window.removeEventListener("resize", actualizar); };
  }, [actualizar]);

  // Avance automático: solo si el carrusel está en pantalla, sin interacción y sin "reducir movimiento".
  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.35 });
    io.observe(el);
    const t = window.setInterval(() => {
      if (pausado.current || !visible.current || document.hidden) return;
      ir(actualRef.current + 1);
    }, PAUSA_MS);
    return () => { io.disconnect(); window.clearInterval(t); };
  }, [ir]);

  const pausar = (v: boolean) => () => { pausado.current = v; };

  return (
    <div
      className="carr"
      role="region"
      aria-roledescription="carrusel"
      aria-label={etiqueta}
      onPointerEnter={pausar(true)}
      onPointerLeave={pausar(false)}
      onFocusCapture={pausar(true)}
      onBlurCapture={pausar(false)}
      onTouchStart={pausar(true)}
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
