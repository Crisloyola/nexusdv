"use client";
import { useRef, useState } from "react";
import { contacto } from "@/lib/data";
import { abrirNexo } from "./Asistente";

/** Botón que copia el correo. Si el navegador no deja copiar, selecciona el texto para copiarlo a mano. */
function Copiar({ texto }: { texto: string }) {
  const [estado, setEstado] = useState("Copiar");
  const ref = useRef<HTMLButtonElement>(null);
  const seleccionar = () => {
    const b = ref.current?.previousElementSibling;
    if (!b) return;
    const r = document.createRange(); r.selectNodeContents(b);
    const s = window.getSelection(); s?.removeAllRanges(); s?.addRange(r);
    setEstado("Seleccionado");
  };
  const copiar = () => {
    const listo = () => { setEstado("Copiado"); setTimeout(() => setEstado("Copiar"), 1800); };
    try { navigator.clipboard.writeText(texto).then(listo, seleccionar); } catch { seleccionar(); }
  };
  return <button ref={ref} className="copy" type="button" onClick={copiar}>{estado}</button>;
}

/** Cierre de la página: "Hablemos." gigante, filas de contacto y pie. */
export function Contacto() {
  return (
    <footer className="end night" id="contacto">
      <div className="wrap">
        <p className="mono tag" style={{ color: "var(--lime)" }}>Contacto</p>
        <h2 className="display">Hable<em>mos.</em></h2>
        <div className="end__grid">
          <div>
            <p className="lead">Cuéntanos qué necesita tu negocio y te enviamos una cotización sin costo.</p>
            <div className="hero__cta">
              <a className="btn btn--lime" href={contacto.whatsappLink} target="_blank" rel="noopener"><span className="ico-wa" aria-hidden="true" />Escribir por WhatsApp</a>
              <button className="btn btn--line" type="button" onClick={abrirNexo}>Hablar con Nexo</button>
            </div>
          </div>
          <div className="rows">
            <div className="crow"><span className="mono">WhatsApp</span><b>Contáctanos ahora</b><a href={contacto.whatsappLink} target="_blank" rel="noopener">Abrir chat</a></div>
            <div className="crow"><span className="mono">Correo</span><b>{contacto.correo}</b><Copiar texto={contacto.correo} /></div>
            <div className="crow"><span className="mono">Instagram</span><b>{contacto.instagram}</b><a href={contacto.instagramLink} target="_blank" rel="noopener">Ver perfil</a></div>
          </div>
        </div>
        <div className="foot"><span>© {new Date().getFullYear()} NEXUSDV · {contacto.ciudad}</span><span className="mono">webs · apps · sistemas · dominios · correo</span></div>
      </div>
    </footer>
  );
}
