"use client";
import { useEffect, useState } from "react";

// Aviso de cookies con el modo de consentimiento de Google.
// app/layout.tsx deja todo "denegado" por defecto antes de cargar Google Tag Manager;
// aquí se guarda la elección (localStorage "nx-cookies": "si" | "no") y se avisa a Google.
const CLAVE = "nx-cookies";
const EVENTO = "nx:cookies";

/** Vuelve a mostrar el aviso (botón "Cookies" del pie de página). */
export const abrirCookies = () => window.dispatchEvent(new Event(EVENTO));

type Gtag = (...args: unknown[]) => void;
const consentimiento = (si: boolean) => {
  const v = si ? "granted" : "denied";
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
};

export function AvisoCookies() {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    let elegido: string | null = null;
    try { elegido = localStorage.getItem(CLAVE); } catch { /* sin almacenamiento: se pregunta igual */ }
    if (!elegido) setAbierto(true);
    const abrir = () => setAbierto(true);
    window.addEventListener(EVENTO, abrir);
    return () => window.removeEventListener(EVENTO, abrir);
  }, []);

  useEffect(() => { document.documentElement.classList.toggle("cookies-abierto", abierto); }, [abierto]);

  const elegir = (si: boolean) => {
    try { localStorage.setItem(CLAVE, si ? "si" : "no"); } catch { /* nada */ }
    consentimiento(si);
    setAbierto(false);
  };

  if (!abierto) return null;
  return (
    <section className="cookies" role="dialog" aria-label="Aviso de cookies" aria-live="polite">
      <p className="cookies__t"><b>Usamos cookies para medir las visitas y mejorar la web.</b> Solo se activan si las aceptas. <a href="/privacidad">Política de privacidad</a></p>
      <div className="cookies__btns">
        <button type="button" className="btn btn--ghost" onClick={() => elegir(false)}>Rechazar</button>
        <button type="button" className="btn btn--lime" onClick={() => elegir(true)}>Aceptar</button>
      </div>
    </section>
  );
}
