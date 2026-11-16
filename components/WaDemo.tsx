"use client";
import { useEffect, useRef, useState } from "react";
import { Icon, Logo } from "./Icons";

// Ejemplos animados de WhatsApp. Son ilustraciones (llevan la etiqueta "Ejemplo"): no son clientes reales.
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Repite `ronda` solo mientras el elemento se ve en pantalla. Con "reducir movimiento" no anima. */
function useBucle(ronda: (sigue: () => boolean) => Promise<void>, quieto: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { quieto(); return; }
    let visible = false, vivo = true, corriendo = false;
    const sigue = () => visible && vivo;
    const correr = async () => {
      if (corriendo) return;
      corriendo = true;
      while (sigue()) await ronda(sigue);
      corriendo = false;
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) correr(); }, { threshold: 0.35 });
    io.observe(el);
    return () => { vivo = false; io.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

// Mensajes de clientes de ejemplo. El texto es el que arman los botones de una web hecha por NEXUSDV.
const MENSAJES = [
  { quien: "María", texto: "Hola, vengo de su web y quiero cotizar una página para mi negocio." },
  { quien: "Carlos", texto: "Hola, vengo de su web y quiero reservar para este sábado." },
  { quien: "Lucía", texto: "Hola, vengo de su web, me interesa el pack de equipos para un evento." },
  { quien: "Jorge", texto: "Hola, vengo de su web y quiero saber si hacen envíos a Miraflores." },
  { quien: "Ana", texto: "Hola, vengo de su web y quiero el catálogo completo." },
];
const HORAS = ["ahora", "1 min", "3 min", "6 min"];
type Fila = { id: number; m: number };
let fid = 0;

/** Bandeja de WhatsApp de un negocio: los mensajes de su web van llegando uno tras otro. */
export function WaLead() {
  const [filas, setFilas] = useState<Fila[]>(() => [2, 1, 0].map((m) => ({ id: ++fid, m })));
  const sig = useRef(3);
  const ref = useBucle(async (sigue) => {
    await sleep(2600); if (!sigue()) return;
    const m = sig.current % MENSAJES.length; sig.current++;
    setFilas((xs) => [{ id: ++fid, m }, ...xs].slice(0, 4));
  }, () => {});
  return (
    <div className="wa wa--bandeja" ref={ref} aria-hidden="true">
      <div className="wa__top">
        <span className="wa__ico"><Icon id="wa" /></span>
        <b>Tu WhatsApp</b>
        <span className="wa__ej">Ejemplo</span>
      </div>
      <ul className="wa__lista">
        {filas.map((f, k) => (
          <li key={f.id} className={k === 0 ? "wa__fila wa__fila--nueva" : "wa__fila"}>
            <span className="wa__av">{MENSAJES[f.m].quien[0]}</span>
            <span className="wa__fila-txt">
              <span className="wa__name"><b>{MENSAJES[f.m].quien}</b><small>{HORAS[k] ?? ""}</small></span>
              <span className="wa__prev">{MENSAJES[f.m].texto}</span>
            </span>
            {k === 0 && <span className="wa__nuevo">1</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

type FaseChat = 0 | 1 | 2 | 3;

/** Conversación con NEXUSDV: el mensaje que arman los botones de la web y la respuesta. */
export function WaChat() {
  const [paso, setPaso] = useState<FaseChat>(0);
  const ref = useBucle(async (sigue) => {
    setPaso(0); await sleep(600); if (!sigue()) return;
    setPaso(1); await sleep(1300); if (!sigue()) return;
    setPaso(2); await sleep(1400); if (!sigue()) return;
    setPaso(3); await sleep(5200);
  }, () => setPaso(3));
  return (
    <div className="wa wa--chat" ref={ref} aria-hidden="true">
      <div className="wa__top">
        <span className="wa__logo"><Logo /></span>
        <span className="wa__name"><b>NEXUSDV</b><small>en línea</small></span>
        <span className="wa__ej">Ejemplo</span>
      </div>
      <div className="wa__hilo">
        {paso >= 1 && <p className="wa__b wa__b--yo">Hola NEXUSDV, vengo de su web y quiero cotizar: páginas web a medida.<svg className="wa__visto" viewBox="0 0 18 12"><path d="m1 6.5 3 3L10.5 2.5M7.5 9.5 8 10l7-7.5" /></svg></p>}
        {paso === 2 && <span className="wa__b wa__b--el wa__dots"><i /><i /><i /></span>}
        {paso === 3 && <p className="wa__b wa__b--el">¡Hola! 👋 Gracias por escribir. Cuéntanos de tu negocio y te enviamos tu cotización sin costo.</p>}
      </div>
    </div>
  );
}
