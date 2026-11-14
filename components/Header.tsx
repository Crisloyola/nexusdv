"use client";
import { useEffect, useState } from "react";
import { contacto } from "@/lib/data";
import { Icon, Logo } from "./Icons";

const NAV = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#nexo", label: "Nexo" },
  { href: "#proceso", label: "Proceso" },
  { href: "#precios", label: "Precios" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [abierto, setAbierto] = useState(false);

  // Menú de celular: bloquea el scroll de la página mientras está abierto y se cierra con Escape
  // o si la pantalla se agranda a tamaño computadora.
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
      <div className="wrap top__in">
        <a className="logo" href="#inicio" aria-label="NEXUSDV, inicio" onClick={cerrar}><i><Logo /></i>NEXUSDV</a>
        <nav aria-label="Principal">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <a className="btn btn--lime" href={contacto.whatsappLink} target="_blank" rel="noopener"><Icon id="wa" /><span>Cotizar por WhatsApp</span></a>
        <button className="burger" type="button" onClick={() => setAbierto((v) => !v)}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"} aria-expanded={abierto} aria-controls="menu">
          <i /><i /><i />
        </button>
      </div>

      <nav id="menu" className="menu" aria-label="Menú" hidden={!abierto}>
        <div className="wrap">
          {NAV.map((n) => <a key={n.href} href={n.href} onClick={cerrar}>{n.label}<Icon id="right" /></a>)}
        </div>
      </nav>
    </header>
  );
}
