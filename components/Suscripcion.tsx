"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";

const EVENTO = "nx:suscripcion";
const CLAVE = "nx-lead";
const CLAVE_CERRADA = "nx-lead-cerrada";

/** Abre la pantalla de suscripción desde cualquier botón de la página. */
export const abrirSuscripcion = () => window.dispatchEvent(new Event(EVENTO));

export function AbrirSuscripcion({ className, children }: { className?: string; children: ReactNode }) {
  return <button className={className} type="button" onClick={abrirSuscripcion}>{children}</button>;
}

function puedeAuto() {
  try {
    return localStorage.getItem(CLAVE) !== "enviado" && sessionStorage.getItem(CLAVE_CERRADA) !== "si";
  } catch {
    return true;
  }
}

function marcarCerrada() {
  try { sessionStorage.setItem(CLAVE_CERRADA, "si"); } catch { /* sin almacenamiento */ }
}

function marcarSuscripcion() {
  try { localStorage.setItem(CLAVE, "enviado"); } catch { /* sin almacenamiento */ }
}

/** Formulario breve para recibir novedades por correo. */
export function Suscripcion() {
  const tituloId = useId();
  const emailId = useId();
  const caja = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const volver = useRef<HTMLElement | null>(null);
  const abiertoRef = useRef(false);
  const enviadoRef = useRef(false);
  const cerrarRef = useRef(() => {});

  const [abierto, setAbierto] = useState(false);
  const [desdeBoton, setDesdeBoton] = useState(false);
  const [email, setEmail] = useState("");
  const [consentimiento, setConsentimiento] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorConsentimiento, setErrorConsentimiento] = useState("");
  const [errorEnvio, setErrorEnvio] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [suscrito, setSuscrito] = useState(false);

  const cerrar = () => {
    setAbierto(false);
    if (!enviadoRef.current) marcarCerrada();
    volver.current?.focus({ preventScroll: true });
  };
  cerrarRef.current = cerrar;
  abiertoRef.current = abierto;

  const mostrar = (manual: boolean) => {
    volver.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDesdeBoton(manual);
    setErrorEmail("");
    setErrorConsentimiento("");
    setErrorEnvio("");
    setAbierto(true);
  };

  useEffect(() => {
    const manual = () => mostrar(true);
    window.addEventListener(EVENTO, manual);
    return () => window.removeEventListener(EVENTO, manual);
  }, []);

  // Sale solo cuando la persona ya vio la página (30 s o al llegar cerca del final), no apenas entra:
  // así no tapa la portada ni la promo.
  useEffect(() => {
    if (!puedeAuto()) return;
    let listo = false;
    const abrirUnaVez = () => {
      if (listo) return;
      if (document.documentElement.classList.contains("bot-open")) return; // no interrumpir el chat con Nexo
      listo = true; limpiar(); mostrar(false);
    };
    const alBajar = () => {
      const fin = document.documentElement.scrollHeight - window.innerHeight;
      if (fin > 0 && window.scrollY / fin > 0.7) abrirUnaVez();
    };
    const reloj = setTimeout(abrirUnaVez, 30_000);
    window.addEventListener("scroll", alBajar, { passive: true });
    const limpiar = () => { clearTimeout(reloj); window.removeEventListener("scroll", alBajar); };
    return limpiar;
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lead-open", abierto);
    if (!abierto) return;
    const foco = desdeBoton && window.innerWidth > 640 ? emailRef.current : caja.current;
    foco?.focus({ preventScroll: true });
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") { cerrarRef.current(); return; }
      if (e.key !== "Tab" || !caja.current) return;
      const lista = [...caja.current.querySelectorAll<HTMLElement>("button, a[href], input:not([type='hidden'])")]
        .filter((n) => !n.hasAttribute("disabled") && !n.closest(".lead__trap"));
      if (!lista.length) return;
      const primero = lista[0];
      const ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    };
    document.addEventListener("keydown", tecla);
    return () => document.removeEventListener("keydown", tecla);
  }, [abierto, desdeBoton]);

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formulario = e.currentTarget;
    const limpio = email.trim().toLowerCase();
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(limpio) && limpio.length <= 254;
    setErrorEmail(valido ? "" : "Escribe un correo válido. Ejemplo: nombre@empresa.com.");
    setErrorConsentimiento(consentimiento ? "" : "Acepta recibir novedades para continuar.");
    setErrorEnvio("");
    if (!valido || !consentimiento) return;

    setEnviando(true);
    try {
      const respuesta = await fetch("/api/suscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: limpio,
          consent: true,
          website: new FormData(formulario).get("website"),
        }),
      });
      if (!respuesta.ok) {
        if (respuesta.status === 429) {
          setErrorEnvio("Ya recibimos una solicitud reciente. Espera un momento e inténtalo de nuevo.");
          return;
        }
        setErrorEnvio("No pudimos completar la suscripción. Inténtalo otra vez o escríbenos a contacto@nexusdv.pe.");
        return;
      }
      setSuscrito(true);
      enviadoRef.current = true;
      marcarSuscripcion();
    } catch {
      setErrorEnvio("No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  if (!abierto) return null;

  return (
    <div className="lead">
      <button className="lead__fondo" type="button" aria-label="Cerrar" onClick={cerrar} />
      <div
        ref={caja}
        className="lead__caja"
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        tabIndex={-1}
      >
        <button className="lead__x" type="button" onClick={cerrar} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>

        {suscrito ? (
          <div className="lead__ok" role="status" aria-live="polite">
            <h2 id={tituloId}>¡Gracias por suscribirte!</h2>
            <p>Te enviamos un correo de bienvenida. Revisa tu bandeja de entrada.</p>
            <button className="btn btn--lime btn--lg" type="button" onClick={cerrar}>Listo</button>
          </div>
        ) : (
          <form className="lead__form" onSubmit={enviar} noValidate>
            <h2 id={tituloId}>Recibe novedades de NEXUSDV</h2>
            <p>Déjanos tu correo y te enviaremos un mensaje de bienvenida.</p>

            <label htmlFor={emailId}>Tu correo electrónico</label>
            <input
              ref={emailRef}
              id={emailId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              placeholder="nombre@empresa.com"
              value={email}
              aria-invalid={errorEmail ? true : undefined}
              aria-describedby={errorEmail ? `${emailId}-e` : undefined}
              onChange={(ev) => {
                setEmail(ev.target.value);
                setErrorEmail("");
                setErrorEnvio("");
              }}
            />
            {errorEmail && <span className="lead__e" id={`${emailId}-e`} role="alert">{errorEmail}</span>}

            <div className="lead__consent">
              <input
                id={`${emailId}-consent`}
                type="checkbox"
                name="consent"
                checked={consentimiento}
                aria-invalid={errorConsentimiento ? true : undefined}
                aria-describedby={errorConsentimiento ? `${emailId}-consent-e` : undefined}
                onChange={(ev) => {
                  setConsentimiento(ev.target.checked);
                  if (ev.target.checked) setErrorConsentimiento("");
                }}
              />
              <label htmlFor={`${emailId}-consent`}>Acepto recibir novedades de NEXUSDV. Puedo pedir que retiremos mi correo cuando quiera.</label>
              <a className="lead__privacy" href="/privacidad" target="_blank" rel="noopener">Política de privacidad</a>
            </div>
            {errorConsentimiento && <span className="lead__e" id={`${emailId}-consent-e`} role="alert">{errorConsentimiento}</span>}

            <div className="lead__trap" aria-hidden="true">
              <label htmlFor={`${emailId}-website`}>Deja este campo vacío</label>
              <input id={`${emailId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {errorEnvio && <p className="lead__e" role="alert">{errorEnvio}</p>}
            <button className="btn btn--lime btn--lg" type="submit" disabled={enviando}>
              {enviando ? "Enviando…" : "Suscribirme"}
            </button>
            <button className="lead__luego" type="button" onClick={cerrar}>Ahora no</button>
          </form>
        )}
      </div>
    </div>
  );
}
