"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CHIP_TEMA, MENU, RESPUESTAS, SALUDO, detectarTema, type Tema } from "@/lib/bot";
import { waTexto } from "@/lib/data";
import { Icon } from "./Icons";

// Pon NEXT_PUBLIC_CHAT_IA=true en .env.local para que las preguntas escritas las responda la IA
// (ruta app/api/chat). Los botones de opciones siempre usan las respuestas fijas de lib/bot.ts.
const USAR_IA = process.env.NEXT_PUBLIC_CHAT_IA === "true";

type Msg = { id: number; de: "bot" | "yo"; html?: string; texto?: string };
let uid = 0;

/** Nexi: el personaje del asistente. Los colores se controlan con --nx-head y --nx-eye en globals.css. */
function Nexi({ className = "" }: { className?: string }) {
  return (
    <svg className={`nexi ${className}`} viewBox="0 0 32 32" aria-hidden="true">
      <path className="nexi__ant" d="M16 8V4.5" />
      <circle className="nexi__head" cx="16" cy="3.6" r="2.1" />
      <rect className="nexi__head" x="4" y="8" width="24" height="20" rx="9" />
      <rect className="nexi__eye" x="10.2" y="14.2" width="3.4" height="5.6" rx="1.7" />
      <rect className="nexi__eye" x="18.4" y="14.2" width="3.4" height="5.6" rx="1.7" />
      <path className="nexi__smile" d="M13.2 23.2q2.8 2 5.6 0" />
    </svg>
  );
}

export function Asistente() {
  const [abierto, setAbierto] = useState(false);
  const [aviso, setAviso] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [tema, setTema] = useState("información");
  const [entrada, setEntrada] = useState("");
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const fab = useRef<HTMLButtonElement>(null);
  const iniciado = useRef(false);
  const historial = useRef<{ role: "user" | "assistant"; content: string }[]>([]);

  useEffect(() => {
    const a = setTimeout(() => { if (!iniciado.current) setAviso(true); }, 4000);
    const b = setTimeout(() => setAviso(false), 14000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [msgs, chips, escribiendo]);
  useEffect(() => {
    document.documentElement.classList.toggle("bot-open", abierto);
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") cerrar(); };
    if (abierto) document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [abierto]);

  const agregar = (m: Omit<Msg, "id">) => setMsgs((xs) => [...xs, { ...m, id: ++uid }]);

  function abrir() {
    setAbierto(true); setAviso(false);
    if (!iniciado.current) { iniciado.current = true; agregar({ de: "bot", html: SALUDO }); setChips([...MENU]); }
    if (window.innerWidth > 639) setTimeout(() => input.current?.focus(), 300);
  }
  function cerrar() { setAbierto(false); fab.current?.focus(); }

  function responderFijo(t: Tema) {
    const r = RESPUESTAS[t];
    if (r.tema !== "información") setTema(r.tema);
    setChips([]); setEscribiendo(true);
    setTimeout(() => {
      setEscribiendo(false); agregar({ de: "bot", html: r.msg }); setChips(r.chips);
      historial.current.push({ role: "assistant", content: r.msg.replace(/<[^>]+>/g, "") });
      if (r.ir && window.innerWidth > 639) setTimeout(() => document.querySelector(r.ir!)?.scrollIntoView({ behavior: "smooth" }), 600);
    }, 650 + Math.min(900, r.msg.length * 4));
  }

  async function responderIA(pregunta: string) {
    setChips([]); setEscribiendo(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: historial.current.slice(-10) }) });
      if (!res.ok) throw new Error(String(res.status));
      const { reply } = await res.json();
      setEscribiendo(false);
      agregar({ de: "bot", texto: reply }); // texto plano: lo que escribe la IA nunca se interpreta como HTML
      historial.current.push({ role: "assistant", content: reply });
      setChips([...MENU].slice(0, 3));
    } catch {
      setEscribiendo(false);
      responderFijo(detectarTema(pregunta)); // si la IA falla, responde el modo fijo
    }
  }

  function tocarChip(label: string) {
    agregar({ de: "yo", texto: label });
    historial.current.push({ role: "user", content: label });
    responderFijo(CHIP_TEMA[label]);
  }

  function enviar(e: FormEvent) {
    e.preventDefault();
    const q = entrada.trim().slice(0, 300);
    if (!q) return;
    setEntrada(""); agregar({ de: "yo", texto: q });
    historial.current.push({ role: "user", content: q });
    const t = detectarTema(q);
    if (t !== "none" && RESPUESTAS[t].tema !== "información") setTema(RESPUESTAS[t].tema);
    if (USAR_IA) responderIA(q); else responderFijo(t);
  }

  const wa = waTexto(`Hola NEXUSDV, vengo de su web y quiero ${tema === "información" ? "información" : `información sobre ${tema}`}.`);

  return (
    <>
      <div className={`bot-hint${aviso ? "" : " off"}`}>¡Hola! Soy <b>Nexi</b> 👋 ¿Te ayudo?</div>
      <button ref={fab} className="bot-fab" type="button" onClick={() => (abierto ? cerrar() : abrir())}
        aria-label={abierto ? "Cerrar chat con Nexi" : "Abrir chat con Nexi, el asistente de NEXUSDV"} aria-expanded={abierto} aria-controls="bot">
        <Nexi className="face" />
        <svg className="x" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>

      <section className="bot" id="bot" role="dialog" aria-label="Chat con Nexi" hidden={!abierto}>
        <div className="bot__head">
          <span className="bot__av"><Nexi /></span>
          <span className="bot__t"><b>Nexi</b><small>Asistente de NEXUSDV · en línea</small></span>
          <button className="bot__close" type="button" onClick={cerrar} aria-label="Cerrar chat"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
        </div>

        <div className="bot__log" ref={log} aria-live="polite">
          {msgs.map((m, k) => {
            if (m.de === "yo") return <div key={m.id} className="msg msg--me">{m.texto}</div>;
            const primero = k === 0 || msgs[k - 1].de !== "bot"; // avatar solo en el primer mensaje seguido de Nexi
            return (
              <div key={m.id} className="row">
                <span className={`row__av${primero ? "" : " row__av--off"}`}><Nexi /></span>
                {m.html !== undefined
                  ? <div className="msg msg--bot" dangerouslySetInnerHTML={{ __html: m.html }} /> /* solo textos fijos de lib/bot.ts */
                  : <div className="msg msg--bot">{m.texto}</div>}
              </div>
            );
          })}
          {escribiendo && (
            <div className="row">
              <span className="row__av"><Nexi /></span>
              <div className="msg msg--bot msg--typing" aria-label="Nexi está escribiendo"><i /><i /><i /></div>
            </div>
          )}
          {!escribiendo && msgs.length > 0 && (
            <div className="chips">
              {chips.map((c) => <button key={c} type="button" className="chip" onClick={() => tocarChip(c)}>{c}</button>)}
              <a className="chip chip--wa" href={wa} target="_blank" rel="noopener">
                <Icon id="wa" />Hablar por WhatsApp
              </a>
            </div>
          )}
        </div>

        <form className="bot__form" onSubmit={enviar} autoComplete="off">
          <input ref={input} value={entrada} onChange={(e) => setEntrada(e.target.value)} type="text" placeholder="Escríbele a Nexi…" aria-label="Escribe tu pregunta" maxLength={300} />
          <button type="submit" aria-label="Enviar" disabled={!entrada.trim()}><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
        </form>
        <p className="bot__note">Precios referenciales · el equipo confirma tu cotización</p>
      </section>
    </>
  );
}
