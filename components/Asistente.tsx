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
      <div className={`bot-hint${aviso ? "" : " off"}`}>¿Te ayudo? Pregúntame 👋</div>
      <button ref={fab} className="bot-fab" type="button" onClick={() => (abierto ? cerrar() : abrir())}
        aria-label={abierto ? "Cerrar asistente" : "Abrir asistente de NEXUSDV"} aria-expanded={abierto} aria-controls="bot">
        <svg className="face" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="7" width="16" height="12" rx="4" /><path d="M12 7V4M9.5 12.5h.01M14.5 12.5h.01M9.5 16h5" /><circle cx="12" cy="3.5" r=".6" /></svg>
        <svg className="x" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>

      <section className="bot" id="bot" role="dialog" aria-label="Asistente de NEXUSDV" hidden={!abierto}>
        <div className="bot__head">
          <span className="bot__av"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 21.5V12a9.5 9.5 0 0 1 19 0v9.5h-6V12a3.5 3.5 0 0 0-7 0v9.5z" /></svg></span>
          <span className="bot__t"><b>Asistente NEXUSDV</b><small>En línea · responde al instante</small></span>
          <button className="bot__close" type="button" onClick={cerrar} aria-label="Cerrar asistente"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
        </div>

        <div className="bot__log" ref={log} aria-live="polite">
          {msgs.map((m) =>
            m.html !== undefined
              ? <div key={m.id} className="msg msg--bot" dangerouslySetInnerHTML={{ __html: m.html }} /> /* solo textos fijos de lib/bot.ts */
              : <div key={m.id} className={`msg ${m.de === "yo" ? "msg--me" : "msg--bot"}`}>{m.texto}</div>
          )}
          {escribiendo && <div className="msg msg--bot msg--typing"><i /><i /><i /></div>}
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
          <input ref={input} value={entrada} onChange={(e) => setEntrada(e.target.value)} type="text" placeholder="Escribe tu pregunta…" aria-label="Escribe tu pregunta" maxLength={300} />
          <button type="submit" aria-label="Enviar"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
        </form>
      </section>
    </>
  );
}
