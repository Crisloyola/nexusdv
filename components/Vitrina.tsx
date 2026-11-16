"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { proyectos, waTexto } from "@/lib/data";
import { SERVICIOS } from "@/lib/servicios";
import { Icon, type IconId } from "./Icons";
import { NexoDemo } from "./NexoDemo";
import { WaLead } from "./WaDemo";

const srv = (id: string) => SERVICIOS.find((s) => s.id === id)!;
const LML = proyectos[0];
const CREATRIX = proyectos[2];

type Tab = { id: string; icono: IconId; tecla: string; titulo: string; texto: string; cotizar: string };
const TABS: Tab[] = [
  { id: "web", icono: "web", tecla: "Página web", titulo: srv("web").titulo, texto: srv("web").texto, cotizar: srv("web").titulo },
  { id: "app", icono: "phone", tecla: "App", titulo: srv("app").titulo, texto: srv("app").texto, cotizar: srv("app").titulo },
  { id: "sys", icono: "sys", tecla: "Sistema", titulo: srv("sys").titulo, texto: srv("sys").texto, cotizar: srv("sys").titulo },
  { id: "ia", icono: "bot", tecla: "Nexo", titulo: srv("ia").titulo, texto: srv("ia").texto, cotizar: srv("ia").titulo },
  { id: "wa", icono: "wa", tecla: "WhatsApp", titulo: "Todo llega a tu WhatsApp", texto: "Cada botón de tu web, app o asistente abre una conversación con tu negocio, con el mensaje ya escrito.", cotizar: "una web conectada a mi WhatsApp" },
];

/** Pantalla de cada tecla. Solo se monta la activa. */
function Pantalla({ id }: { id: string }) {
  if (id === "web") return (
    <div className="scr scr--web">
      <div className="scr__win">
        <div className="scr__bar"><i /><i /><i /><span>{LML.dominio}</span></div>
        <Image src={LML.imgDesktop.src} width={LML.imgDesktop.w} height={LML.imgDesktop.h} alt={LML.imgDesktop.alt} quality={85} sizes="(max-width: 960px) 90vw, 760px" />
      </div>
      <div className="scr__ph"><Image src={LML.imgMovil.src} width={LML.imgMovil.w} height={LML.imgMovil.h} alt={LML.imgMovil.alt} quality={85} sizes="160px" /></div>
      <p className="scr__nota">Proyecto entregado · {LML.nombre}</p>
    </div>
  );
  if (id === "app") return (
    <div className="scr scr--app">
      <div className="scr__ph scr__ph--solo"><Image src={CREATRIX.imgMovil.src} width={CREATRIX.imgMovil.w} height={CREATRIX.imgMovil.h} alt={CREATRIX.imgMovil.alt} quality={85} sizes="240px" /></div>
      <p className="scr__nota">{CREATRIX.nombre} · se instala como app en el celular</p>
    </div>
  );
  if (id === "sys") return (
    <div className="scr scr--web">
      <div className="scr__win">
        <div className="scr__bar"><i /><i /><i /><span>{CREATRIX.dominio}</span></div>
        <Image src={CREATRIX.imgDesktop.src} width={CREATRIX.imgDesktop.w} height={CREATRIX.imgDesktop.h} alt={CREATRIX.imgDesktop.alt} quality={85} sizes="(max-width: 960px) 90vw, 760px" />
      </div>
      <p className="scr__nota">Proyecto entregado · {CREATRIX.nombre}, sistema de fidelización</p>
    </div>
  );
  if (id === "ia") return <div className="scr scr--chat"><NexoDemo /></div>;
  return <div className="scr scr--chat"><WaLead /></div>;
}

/** Vitrina: una pantalla grande con un dock de 5 teclas que muestra cada servicio funcionando.
 *  Avanza sola mientras se ve; se detiene cuando la persona elige una tecla. */
export function Vitrina() {
  const [activa, setActiva] = useState(0);
  const elegida = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let t: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(t);
      if (e.isIntersecting) t = setInterval(() => { if (!elegida.current) setActiva((a) => (a + 1) % TABS.length); }, 7000);
    }, { threshold: 0.45 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(t); };
  }, []);

  const elegir = (i: number) => { elegida.current = true; setActiva(i); };
  const teclado = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = (activa + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    elegir(i);
    document.getElementById(`tecla-${TABS[i].id}`)?.focus();
  };
  const t = TABS[activa];

  return (
    <div className="vit" ref={ref}>
      <div className="vit__marco">
        <div className="vit__pantalla" role="tabpanel" id="vit-pantalla" aria-labelledby={`tecla-${t.id}`}>
          <div className="vit__rayos" aria-hidden="true"><i /><i /><i /></div>
          <div className="vit__vista" key={t.id}><Pantalla id={t.id} /></div>
          <div className="dock" role="tablist" aria-label="Servicios" onKeyDown={teclado}>
            {TABS.map((x, i) => (
              <button key={x.id} id={`tecla-${x.id}`} type="button" role="tab" aria-selected={i === activa} aria-controls="vit-pantalla"
                tabIndex={i === activa ? 0 : -1} className={`dock__k${i === activa ? " is-on" : ""}`} onClick={() => elegir(i)}>
                <Icon id={x.icono} /><span className="dock__tip">{x.tecla}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="vit__cap" key={`c-${t.id}`}>
        <b>{t.titulo}.</b> {t.texto}{" "}
        <a href={waTexto(`Hola NEXUSDV, vengo de su web y quiero cotizar: ${t.cotizar.toLowerCase()}.`)} target="_blank" rel="noopener">Cotizar<Icon id="arr" /></a>
      </p>
    </div>
  );
}
