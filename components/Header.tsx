"use client";
import { useEffect, useState } from "react";
import { contacto } from "@/lib/data";
import { Icon, Logo } from "./Icons";

const NAV = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#precios", label: "Precios" },
  { href: "#preguntas", label: "Preguntas" },
];

/** Barra flotante redondeada. En celular el menú se abre debajo. */
export function Header() {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", abierto);
    if (!abierto) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setAbierto(false); };
    const ancho = () => { if (window.innerWidth > 960) setAbierto(false); };
    document.addEventListener("keydown", esc);
    window.addEventListener("resize", ancho);
    return () => { document.removeEventListener("keydown", esc); window.removeEventListener("resize", ancho); };
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  return (
    <header className={`top${abierto ? " top--open" : ""}`}>
      <div className="top__bar">
        <a className="logo" href="#inicio" aria-label="NEXUSDV, inicio" onClick={cerrar}><i><Logo /></i>NEXUSDV</a>
        <nav aria-label="Principal">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <a className="btn btn--lime top__cta" href={contacto.whatsappLink} target="_blank" rel="noopener"><Icon id="wa" /><span>Cotizar gratis</span></a>
        <button className="burger" type="button" onClick={() => setAbierto((v) => !v)}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"} aria-expanded={abierto} aria-controls="menu">
          <i /><i /><i />
        </button>
      </div>

      <nav id="menu" className="menu" aria-label="Menú" hidden={!abierto}>
        {NAV.map((n) => <a key={n.href} href={n.href} onClick={cerrar}>{n.label}<Icon id="right" /></a>)}
        <a className="btn btn--lime btn--lg menu__cta" href={contacto.whatsappLink} target="_blank" rel="noopener" onClick={cerrar}><Icon id="wa" />Cotizar por WhatsApp</a>
      </nav>
    </header>
  );
}
