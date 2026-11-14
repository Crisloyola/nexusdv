"use client";
import { useEffect, useState } from "react";
import { contacto, nav } from "@/lib/data";
import { Icon, Logo } from "./Icons";

export function Header() {
  const [abierto, setAbierto] = useState(false);

  // Menú de celular: bloquea el scroll de la página mientras está abierto y se cierra con Escape
  // o si la pantalla se agranda a tamaño computadora.
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", abierto);
    if (!abierto) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setAbierto(false); };
    const ancho = () => { if (window.innerWidth > 1023) setAbierto(false); };
    document.addEventListener("keydown", esc);
    window.addEventListener("resize", ancho);
    return () => { document.removeEventListener("keydown", esc); window.removeEventListener("resize", ancho); };
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  return (
    <header className={`nav${abierto ? " nav--open" : ""}`}>
      <div className="wrap nav__in">
        <a className="logo" href="#top" aria-label="NEXUSDV, inicio" onClick={cerrar}><Logo />NEXUSDV</a>
        <nav className="nav__links" aria-label="Principal">
          {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="nav__right">
          <a className="btn btn--lime btn--sm" href={contacto.whatsappLink}><Icon id="wa" /><span>Escríbenos por WhatsApp</span></a>
          <button className="burger" type="button" onClick={() => setAbierto((v) => !v)}
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"} aria-expanded={abierto} aria-controls="menu">
            <i /><i /><i />
          </button>
        </div>
      </div>

      <nav id="menu" className="wrap nav__menu" aria-label="Menú" hidden={!abierto}>
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={cerrar}>{n.label}<Icon id="right" /></a>
        ))}
        <a className="btn btn--lime" href={contacto.whatsappLink} onClick={cerrar}><Icon id="wa" />Escríbenos por WhatsApp</a>
      </nav>
    </header>
  );
}
