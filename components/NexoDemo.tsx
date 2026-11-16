"use client";
import { useEffect, useRef, useState } from "react";
import { MENU, RESPUESTAS, SALUDO, detectarTema } from "@/lib/bot";
import { abrirNexo } from "./Asistente";
import { NexoCara } from "./Icons";

// Conversación de ejemplo (respuestas fijas de lib/bot.ts). Es solo visual: no se puede escribir aquí.
const DEMO = ["¿Hacen apps para iPhone?", "¿Cuánto cuesta una tienda virtual?", "¿Y una página web?"];

type Msg = { id: number; de: "bot" | "yo"; html: string };
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
let uid = 0;

/** Chat de demostración de la sección #nexo. Se repite solo mientras se ve en pantalla; al tocarlo abre el chat real. */
export function NexoDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, de: "bot", html: SALUDO }]);
  const [chips, setChips] = useState<string[]>([...MENU]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [texto, setTexto] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [msgs, escribiendo]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const agregar = (m: Omit<Msg, "id">) => setMsgs((xs) => [...xs, { ...m, id: ++uid }]);
    // Movimiento reducido: queda una pregunta y su respuesta, sin animar
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      agregar({ de: "yo", html: DEMO[2] }); agregar({ de: "bot", html: RESPUESTAS.web.msg }); setChips([]);
      return;
    }
    let visible = false, vivo = true, corriendo = false;
    const sigue = () => visible && vivo;
    const espera = async (ms: number) => { await sleep(ms); return sigue(); };

    const ronda = async () => {
      for (const q of DEMO) {
        for (let n = 1; n <= q.length; n++) { setTexto(q.slice(0, n)); if (!(await espera(55))) return; }
        if (!(await espera(450))) return;
        const r = RESPUESTAS[detectarTema(q)];
        setTexto(""); setChips([]); agregar({ de: "yo", html: q }); setEscribiendo(true);
        if (!(await espera(1000))) return;
        setEscribiendo(false); agregar({ de: "bot", html: r.msg }); setChips(r.chips);
        if (!(await espera(4200))) return;
      }
      if (!(await espera(2500))) return;
      setMsgs([{ id: ++uid, de: "bot", html: SALUDO }]); setChips([...MENU]); // vuelve a empezar
      await espera(1500);
    };
    const correr = async () => {
      if (corriendo) return;
      corriendo = true;
      while (sigue()) await ronda();
      corriendo = false; setEscribiendo(false); setTexto("");
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) correr(); }, { threshold: 0.4 });
    io.observe(el);
    return () => { vivo = false; io.disconnect(); };
  }, []);

  return (
    <div className="chat chat--demo" ref={ref} role="button" tabIndex={0} aria-label="Abrir chat con Nexo"
      onClick={abrirNexo} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirNexo(); } }}>
      <div className="chat__head" aria-hidden="true">
        <span className="chat__av"><NexoCara /></span>
        <span className="chat__t"><b>Nexo</b><small>Asistente de NEXUSDV · en línea</small></span>
      </div>
      <div className="chat__log" ref={log} aria-hidden="true">
        {msgs.map((m) =>
          m.de === "yo"
            ? <div key={m.id} className="msg msg--u">{m.html}</div>
            : <div key={m.id} className="msg msg--b" dangerouslySetInnerHTML={{ __html: m.html }} /> /* solo textos fijos de lib/bot.ts */
        )}
        {escribiendo && <div className="msg msg--b msg--t"><i /><i /><i /></div>}
        {!escribiendo && chips.length > 0 && <div className="chips">{chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>}
      </div>
      <div className="chat__form" aria-hidden="true">
        <span className={`chat__fake${texto ? " is-typing" : ""}`}>{texto || "Toca aquí para escribirle a Nexo"}</span>
        <span className="chat__send"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
      </div>
    </div>
  );
}
