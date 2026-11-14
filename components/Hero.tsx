"use client";
import { useEffect, useRef, useState } from "react";
import { contacto } from "@/lib/data";
import { FlutedGlass } from "./FlutedGlass";
import { Icon } from "./Icons";

const PALABRAS = ["tu página web.", "tu app.", "tu sistema."];
const PESTANAS = ["Web", "App", "Sistema"];
const CHECK = ["Diseño a medida de tu marca", "Se ve perfecta en el celular", "Botón directo a tu WhatsApp", "Lista para aparecer en Google"];
const reducirMovimiento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Hero() {
  const [vista, setVista] = useState(0);     // pestaña visible: 0 web, 1 app, 2 sistema
  const [palabra, setPalabra] = useState(0); // frase del título (cambia con un pequeño retraso)
  const [sale, setSale] = useState(false);   // la frase se está ocultando
  const [ronda, setRonda] = useState(0);     // reinicia el checklist cada vez que se muestra la web
  const [ck, setCk] = useState(4);           // ítems marcados del checklist
  const vistaRef = useRef(0);
  const auto = useRef(true);                 // rota sola hasta que el visitante toca una pestaña
  const tFrase = useRef<ReturnType<typeof setTimeout>>(undefined);

  const mostrar = (n: number) => {
    vistaRef.current = n;
    setVista(n); setRonda((r) => r + 1); setSale(true);
    clearTimeout(tFrase.current);
    tFrase.current = setTimeout(() => { setPalabra(n); setSale(false); }, reducirMovimiento() ? 0 : 230);
  };

  // Rotación automática Web → App → Sistema
  useEffect(() => {
    if (reducirMovimiento()) return;
    const id = setInterval(() => { if (auto.current) mostrar((vistaRef.current + 1) % 3); }, 5600);
    return () => { clearInterval(id); clearTimeout(tFrase.current); };
  }, []);

  // Checklist que se completa ítem por ítem cada vez que aparece la vista web
  useEffect(() => {
    if (vista !== 0 || reducirMovimiento()) { setCk(4); return; }
    setCk(0);
    const ts = [1, 2, 3, 4].map((k) => setTimeout(() => setCk(k), 500 + k * 800));
    return () => ts.forEach(clearTimeout);
  }, [vista, ronda]);

  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div>
          <p className="mono tag">Estudio de desarrollo · {contacto.ciudad}</p>
          <h1 className="display">Diseñamos y programamos <span className="swap"><b className={sale ? "out" : undefined}>{PALABRAS[palabra]}</b></span></h1>
          <p className="lead">Webs, apps para Android y iPhone y sistemas a medida para negocios que quieren verse serios y vender más. Con dominio, correo corporativo y todo conectado a tu WhatsApp.</p>
          <div className="hero__cta">
            <a className="btn" href={contacto.whatsappLink} target="_blank" rel="noopener">Cotizar mi proyecto<Icon id="arr" /></a>
            <a className="btn btn--line" href="#proyectos">Ver proyectos</a>
          </div>
          <div className="hero__facts mono"><span>Cotización sin costo</span><span>Diseño aprobado antes de programar</span><span>Soporte por WhatsApp</span></div>
        </div>

        <FlutedGlass seed={45} className="stage" aria-label="Ejemplos de lo que construimos">
          <div className="stage__tabs" role="tablist" aria-label="Tipo de proyecto">
            {PESTANAS.map((p, i) => (
              <button key={p} type="button" role="tab" aria-selected={vista === i} onClick={() => { auto.current = false; mostrar(i); }}>{p}</button>
            ))}
          </div>

          <div className={`view${vista === 0 ? " on" : ""}`} aria-hidden={vista !== 0}>
            <div className="stage__cap"><small>Páginas web</small><b>Páginas web a medida</b></div>
            <div className="ck">
              <div className="ck__t">Tu web lista para publicar <span>{ck} de 4</span></div>
              <ul>
                {CHECK.map((t, i) => (
                  <li key={t} className={i >= ck ? "off" : undefined}>
                    <i><svg viewBox="0 0 12 12"><path d="m2.5 6.2 2.2 2.2 4.8-5" /></svg></i>{t}
                  </li>
                ))}
              </ul>
              <div className="ck__bar"><i style={{ width: `${ck === 0 ? 6 : ck * 25}%` }} /></div>
            </div>
          </div>

          <div className={`view${vista === 1 ? " on" : ""}`} aria-hidden={vista !== 1}>
            <span className="note" style={{ left: "3%", top: "16%" }}>Google Play + App Store</span>
            <span className="note" style={{ right: "3%", bottom: "14%" }}>notificaciones push</span>
            <div className="mp"><div className="mp__s">
              <div className="mp__hi"><small>Hola,</small><b>Carla</b></div>
              <div className="mp__card"><small>Pedido #128</small><b>En camino</b><div className="mp__track"><i /></div></div>
              <div className="mp__r"><i style={{ background: "#4DE8E0" }} /><span>Promo de hoy<small>2x1 en postres</small></span></div>
              <div className="mp__r"><i style={{ background: "#FFB23F" }} /><span>Mis puntos<small>240 puntos</small></span></div>
              <div className="mp__nav"><i /><i /><i /><i /></div>
            </div></div>
          </div>

          <div className={`view${vista === 2 ? " on" : ""}`} aria-hidden={vista !== 2}>
            <span className="note" style={{ right: "3%", top: "3%" }}>ventas · inventario · reservas</span>
            <div className="md">
              <div className="md__top">Panel de tu negocio <span>● en vivo</span></div>
              <div className="md__k">
                <div><small>Ventas hoy</small><b>S/ 2,480</b><em>+18%</em></div>
                <div><small>Pedidos</small><b>38</b><em>+6</em></div>
                <div><small>Stock bajo</small><b>4</b><em>revisar</em></div>
              </div>
              <div className="md__chart">
                {[40, 62, 48, 75, 58, 88, 100].map((h, i) => <i key={i} style={{ "--h": `${h}%` } as React.CSSProperties} />)}
              </div>
              <div className="md__rows"><div>Torta de chocolate ×2 <span>PAGADO</span></div><div>Reserva mesa 4 · 8:00 pm <span>CONFIRMADA</span></div></div>
            </div>
          </div>
        </FlutedGlass>
      </div>
    </section>
  );
}
