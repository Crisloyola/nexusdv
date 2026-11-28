"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CHIP_PROMO, CHIP_TEMA, MENU, RESPUESTAS, SALUDO, detectarTema, type Tema } from "@/lib/bot";
import { waTexto } from "@/lib/data";
import { PROMOCION, promoActiva, soles } from "@/lib/servicios";
import { Icon, NexoCara } from "./Icons";

// Pon NEXT_PUBLIC_CHAT_IA=true en .env.local para que la IA responda (ruta app/api/chat).
// Con IA: lo escrito, los chips de servicios y los chips que propone la IA van a la IA (flujo de venta).
// "Precios" y "Ver proyectos" siempre usan las respuestas fijas de lib/bot.ts. Sin IA, todo es fijo.
const USAR_IA = process.env.NEXT_PUBLIC_CHAT_IA === "true";
const SIEMPRE_FIJO = ["Precios", "Ver proyectos", CHIP_PROMO];
const ERROR_IA = "Se me complicó responder ahora. Escríbenos por WhatsApp y te atendemos.";

/** Cualquier parte de la web puede abrir el chat de Nexo con abrirNexo() (por ejemplo, la demo de la sección #nexo). */
export const EVENTO_ABRIR = "nexo:abrir";
export const abrirNexo = () => window.dispatchEvent(new Event(EVENTO_ABRIR));

type Msg = { id: number; de: "bot" | "yo"; html?: string; texto?: string };
let uid = 0;

/** Nexo: botón flotante "Pregúntale a Nexo" que abre la ventana de chat para escribirle. */
export function Asistente() {
  const [abierto, setAbierto] = useState(false);
  const [hola, setHola] = useState(false); // globo de saludo junto al botón
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [tema, setTema] = useState("información");
  const [entrada, setEntrada] = useState("");
  const [waMsg, setWaMsg] = useState<string | null>(null); // mensaje de WhatsApp que arma la IA al cerrar el flujo
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const iniciado = useRef(false);
  const historial = useRef<{ role: "user" | "assistant"; content: string }[]>([]);

  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [msgs, chips, escribiendo]);

  // Escape cierra; la página de fondo no se mueve con el chat abierto en celular
  useEffect(() => {
    document.documentElement.classList.toggle("bot-open", abierto);
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") cerrar(); };
    if (abierto) document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [abierto]);

  // Abrir desde otras partes de la web (demo de la sección #nexo, botón de Contacto)
  useEffect(() => {
    const fn = () => abrir();
    window.addEventListener(EVENTO_ABRIR, fn);
    return () => window.removeEventListener(EVENTO_ABRIR, fn);
  });

  // Saludo: a los 2,5 s de entrar Nexo saluda e invita a preguntar; se va solo a los 15 s.
  // Sale una vez por visita (si recargan la página no vuelve a molestar).
  useEffect(() => {
    try { if (sessionStorage.getItem("nexo-hola")) return; } catch { /* sin almacenamiento: saluda igual */ }
    const a = setTimeout(() => {
      if (iniciado.current) return;
      setHola(true);
      try { sessionStorage.setItem("nexo-hola", "1"); } catch { /* nada */ }
    }, 2500);
    const b = setTimeout(() => setHola(false), 17500);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  const agregar = (m: Omit<Msg, "id">) => setMsgs((xs) => [...xs, { ...m, id: ++uid }]);

  function abrir() {
    setAbierto(true); setHola(false);
    if (!iniciado.current) { iniciado.current = true; agregar({ de: "bot", html: SALUDO }); setChips([...MENU]); }
    if (window.innerWidth > 520) setTimeout(() => input.current?.focus({ preventScroll: true }), 300);
  }
  function cerrar() { setAbierto(false); boton.current?.focus({ preventScroll: true }); }

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

  async function responderIA() {
    setChips([]); setEscribiendo(true);
    // Si la IA falla o tarda más de ~15 s, cortamos y ofrecemos WhatsApp
    const corte = new AbortController();
    const reloj = setTimeout(() => corte.abort(), 16_000);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: historial.current.slice(-10) }), signal: corte.signal });
      if (!res.ok) throw new Error(String(res.status));
      const { reply, chips: opciones, whatsapp } = (await res.json()) as { reply: string; chips?: string[]; whatsapp?: string | null };
      setEscribiendo(false);
      agregar({ de: "bot", texto: reply }); // texto plano: lo que escribe la IA nunca se interpreta como HTML
      historial.current.push({ role: "assistant", content: reply });
      setChips(Array.isArray(opciones) ? opciones : []);
      if (whatsapp) setWaMsg(whatsapp);
    } catch {
      setEscribiendo(false);
      agregar({ de: "bot", texto: ERROR_IA }); // debajo queda el botón "Hablar por WhatsApp"
      historial.current.push({ role: "assistant", content: ERROR_IA });
      setChips([]);
    } finally {
      clearTimeout(reloj);
    }
  }

  function tocarChip(label: string) {
    agregar({ de: "yo", texto: label });
    historial.current.push({ role: "user", content: label });
    const t = CHIP_TEMA[label] as Tema | undefined;
    if (t && RESPUESTAS[t].tema !== "información") setTema(RESPUESTAS[t].tema);
    if (USAR_IA && !SIEMPRE_FIJO.includes(label)) responderIA();
    else responderFijo(t ?? "none");
  }

  function enviar(e: FormEvent) {
    e.preventDefault();
    const q = entrada.trim().slice(0, 300);
    if (!q) return;
    setEntrada(""); agregar({ de: "yo", texto: q });
    historial.current.push({ role: "user", content: q });
    const t = detectarTema(q);
    if (t !== "none" && RESPUESTAS[t].tema !== "información") setTema(RESPUESTAS[t].tema);
    if (USAR_IA) responderIA(); else responderFijo(t);
  }

  const wa = waTexto(waMsg ?? `Hola NEXUSDV, vengo de su web y quiero ${tema === "información" ? "información" : `información sobre ${tema}`}.`);

  return (
    <>
      <div className={`nx-hola${hola && !abierto ? "" : " nx-hola--off"}`} role="status" aria-hidden={!hola || abierto}>
        <button className="nx-hola__txt" type="button" onClick={abrir} tabIndex={hola ? 0 : -1}>
          <b>¡Hola! 👋 Soy Nexo</b>
          <span suppressHydrationWarning>{promoActiva()
            ? `🎄 Pregúntame por la ${PROMOCION.nombre}: ${PROMOCION.producto} a ${soles(PROMOCION.precio)}, hasta el ${PROMOCION.finTexto}.`
            : "¿Tienes alguna pregunta? Toca aquí y te ayudo con tu web, tienda virtual, app, sistema o asistente con IA."}</span>
        </button>
        <button className="nx-hola__x" type="button" onClick={() => setHola(false)} aria-label="Cerrar saludo" tabIndex={hola ? 0 : -1}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>

      <button ref={boton} type="button" className={`fab${hola && !abierto ? " fab--hola" : ""}`}
        onClick={() => (abierto ? cerrar() : abrir())} aria-expanded={abierto} aria-controls="bot"
        aria-label={abierto ? "Cerrar chat con Nexo" : "Abrir chat con Nexo, el asistente de NEXUSDV"}>
        <i>{abierto
          ? <svg className="fab__x" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          : <NexoCara />}</i>
        <span>{abierto ? "Cerrar chat" : "Pregúntale a Nexo"}</span>
      </button>

      <section className="chat bot" id="bot" role="dialog" aria-label="Chat con Nexo" hidden={!abierto}>
        <div className="chat__head">
          <span className="chat__av"><NexoCara /></span>
          <span className="chat__t"><b>Nexo</b><small>Asistente de NEXUSDV · en línea</small></span>
          <button className="chat__close" type="button" onClick={cerrar} aria-label="Cerrar chat"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
        </div>

        <div className="chat__log" ref={log} aria-live="polite">
          {msgs.map((m) =>
            m.de === "yo"
              ? <div key={m.id} className="msg msg--u">{m.texto}</div>
              : m.html !== undefined
                ? <div key={m.id} className="msg msg--b" dangerouslySetInnerHTML={{ __html: m.html }} /> /* solo textos fijos de lib/bot.ts */
                : <div key={m.id} className="msg msg--b">{m.texto}</div>
          )}
          {escribiendo && <div className="msg msg--b msg--t" aria-label="Nexo está escribiendo"><i /><i /><i /></div>}
          {!escribiendo && msgs.length > 0 && (
            <div className="chips">
              {chips.map((c) => <button key={c} type="button" className="chip" onClick={() => tocarChip(c)}>{c}</button>)}
              <a className="chip chip--wa" href={wa} target="_blank" rel="noopener"><Icon id="wa" />Hablar por WhatsApp</a>
            </div>
          )}
        </div>

        <form className="chat__form" onSubmit={enviar} autoComplete="off">
          <input ref={input} value={entrada} onChange={(e) => setEntrada(e.target.value)} type="text" placeholder="Escríbele a Nexo…" aria-label="Escribe tu pregunta" maxLength={300} />
          <button type="submit" aria-label="Enviar" disabled={!entrada.trim()}><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
        </form>
        <p className="chat__note">Precios referenciales · el equipo confirma tu cotización</p>
      </section>
    </>
  );
}
