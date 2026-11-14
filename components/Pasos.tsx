"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const PASOS = [
  { t: "Diseñamos tu proyecto", p: "Conversamos, entendemos tu negocio y te mostramos el diseño. Lo apruebas antes de programar.", m: "diseño → tu aprobación" },
  { t: "Lo programamos", p: "Construimos tu web, app o sistema para que funcione en Android, iPhone y computadora.", m: "código → pruebas" },
  { t: "Lo publicamos", p: "Sale en línea con tu dominio o en las tiendas de apps, conectado a tu WhatsApp. Y te acompañamos después.", m: "tuempresa.pe → en línea" },
];

/** Proceso en 3 pasos. La línea que une los pasos se dibuja cuando la sección aparece en pantalla. */
export function Pasos() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    setP(0);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setP(1); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    const t = setTimeout(() => setP(1), 3500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <section className="sec" id="proceso">
      <div className="wrap">
        <div className="sec__top rv">
          <div><p className="mono tag">Cómo trabajamos</p><h2 className="display h2">De la idea a <span className="mark">publicado</span> en 3 pasos</h2></div>
          <p className="lead">Tú nos cuentas de tu negocio y nosotros nos encargamos de todo lo técnico.</p>
        </div>
        <div className="steps rv" ref={ref} style={{ "--p": p } as CSSProperties}>
          {PASOS.map((s) => (
            <div className="step" key={s.t}><h3>{s.t}</h3><p>{s.p}</p><span className="mono">{s.m}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
