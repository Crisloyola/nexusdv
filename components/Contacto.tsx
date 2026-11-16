"use client";
import { useRef, useState } from "react";
import { contacto } from "@/lib/data";
import { abrirNexo } from "./Asistente";
import { Icon, Logo } from "./Icons";
import { WaChat } from "./WaDemo";
import { abrirCookies } from "./AvisoCookies";

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

/** Cierre de la página: llamado final con la conversación de ejemplo, contacto y pie. */
export function Contacto() {
  return (
    <footer className="end" id="contacto">
      <div className="wrap">
        <div className="cta rv">
          <div className="cta__rayos" aria-hidden="true"><i /><i /><i /></div>
          <h2 className="cta__h">¿Listo para que tu negocio se vea profesional?</h2>
          <p className="cta__p">Cuéntanos qué necesitas y te enviamos una cotización sin costo.</p>
          <div className="cta__btns">
            <a className="btn btn--lime btn--lg" href={contacto.whatsappLink} target="_blank" rel="noopener"><Icon id="wa" />Escribir por WhatsApp</a>
            <button className="btn btn--ghost btn--lg" type="button" onClick={abrirNexo}>Hablar con Nexo</button>
          </div>
          <WaChat />
        </div>

        <div className="rows" role="list">
          <div className="crow" role="listitem"><span className="crow__k">WhatsApp</span><b>Contáctanos ahora</b><a href={contacto.whatsappLink} target="_blank" rel="noopener">Abrir chat</a></div>
          <div className="crow" role="listitem"><span className="crow__k">Correo</span><b>{contacto.correo}</b><Copiar texto={contacto.correo} /></div>
          <div className="crow" role="listitem"><span className="crow__k">Instagram</span><b>{contacto.instagram}</b><a href={contacto.instagramLink} target="_blank" rel="noopener">Ver perfil</a></div>
        </div>

        <div className="foot">
          <a className="logo" href="#inicio" aria-label="NEXUSDV, volver al inicio"><i><Logo /></i>NEXUSDV</a>
          <span>Webs · apps · sistemas · dominios · correo · IA</span>
          <span className="foot__legal"><a href="/privacidad">Privacidad</a><button type="button" onClick={abrirCookies}>Cookies</button></span>
          <span>© {new Date().getFullYear()} NEXUSDV · {contacto.ciudad}</span>
        </div>
      </div>
    </footer>
  );
}
