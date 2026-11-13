"use client";
// Pequeñas pantallas de ejemplo que se animan en bucle dentro de los bloques.
import { useRef, useState, type CSSProperties } from "react";
import { useLoop, sleep, typeText } from "@/lib/useLoop";
import { Icon } from "../Icons";

const off = (hidden: boolean) => (hidden ? " off" : "");

/* ---------- Inicio: mensajes que llegan desde la web ---------- */
const MENSAJES = [
  { ini: "CN", color: "#C8F135", nombre: "Cliente nuevo", txt: "Hola, vi su web y quiero una cotización", hora: "ahora", nuevo: true },
  { ini: "MR", color: "#4DE8E0", nombre: "María R.", txt: "¿Hacen delivery a Surco?", hora: "3 min", nuevo: true },
  { ini: "JP", color: "#FFB23F", nombre: "Jorge P.", txt: "Me interesa el plan para empresas", hora: "12 min", nuevo: true },
  { ini: "AL", color: "#C9CFD6", nombre: "Ana L.", txt: "Gracias, ya hice mi pedido", hora: "1 h", nuevo: false },
];

export function ChatMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(4); // cuántos se ven, contando desde abajo
  const [pop, setPop] = useState(false);
  useLoop(ref, async (alive) => {
    setShown(0); await sleep(700);
    for (let k = 1; k <= 4 && alive(); k++) {
      setShown(k);
      if (k > 1) { setPop(true); setTimeout(() => setPop(false), 300); }
      await sleep(1100);
    }
    await sleep(3800);
  });
  const nuevos = Math.max(0, shown - 1);
  return (
    <div ref={ref} className="glass chat float">
      <div className="chat__head">
        <span className="chat__av"><Icon id="wa" /></span>
        <span className="chat__t"><b>Mensajes desde tu web</b><small>tuempresa.com</small></span>
        <span className={`badge${pop ? " pop" : ""}`}>{nuevos} {nuevos === 1 ? "nuevo" : "nuevos"}</span>
      </div>
      <ul>
        {MENSAJES.map((m, i) => (
          <li key={m.ini} className={`${m.nuevo ? "is-new" : ""}${off(4 - i > shown)}`}>
            <span className="av" style={{ background: m.color }}>{m.ini}</span>
            <span className="chat__txt"><b>{m.nombre}</b><span>{m.txt}</span></span>
            <time>{m.hora}</time>
          </li>
        ))}
      </ul>
      <div className="chat__foot"><span className="pulse" />Tu web está en línea las 24 horas</div>
    </div>
  );
}

/* ---------- Páginas web: checklist que se completa ---------- */
const CHECK = ["Diseño a medida de tu marca", "Se ve perfecta en el celular", "Botón directo a tu WhatsApp", "Lista para aparecer en Google"];

export function ChecklistMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(4);
  useLoop(ref, async (alive) => {
    setN(0); await sleep(900);
    for (let k = 1; k <= 4 && alive(); k++) { setN(k); await sleep(900); }
    await sleep(3500);
  });
  return (
    <div ref={ref} className="glass check">
      <div className="check__t">Tu web lista para publicar <span>{n} de 4</span></div>
      <ul>
        {CHECK.map((t, i) => (
          <li key={t} className={off(i >= n).trim()}><i><Icon id="chk" /></i>{t}</li>
        ))}
      </ul>
      <div className="bar"><i style={{ width: `${n === 0 ? 6 : (n / 4) * 100}%` }} /></div>
    </div>
  );
}

/* ---------- Apps: llega una notificación ---------- */
export function PhoneMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState(false);
  const [track, setTrack] = useState(65);
  useLoop(ref, async () => {
    setToast(false); setTrack(35); await sleep(1200);
    setToast(true); setTrack(70); await sleep(3000);
    setToast(false); await sleep(1600);
  });
  return (
    <div ref={ref} className="phone" aria-hidden="true">
      <div className="phone__screen">
        <div className={`toast${off(!toast)}`}>
          <span className="av" style={{ background: "#C8F135", width: 30, height: 30, fontSize: 11 }}>TA</span>
          <span><b>Tu app</b><small>Tu pedido ya salió 🚚</small></span>
        </div>
        <div className="phone__hi"><small>Hola,</small><b>Carla</b></div>
        <div className="phone__card"><small>Pedido #128</small><b>En camino</b><div className="phone__track"><i style={{ width: `${track}%` }} /></div></div>
        <div className="phone__row"><span className="phone__sq" style={{ background: "#4DE8E0" }} /><span><b>Promo de hoy</b><small>2x1 en postres</small></span></div>
        <div className="phone__row"><span className="phone__sq" style={{ background: "#FFB23F" }} /><span><b>Mis puntos</b><small>240 puntos</small></span></div>
        <div className="phone__nav"><i className="on" /><i /><i /><i /></div>
      </div>
    </div>
  );
}

/* ---------- Sistemas: panel con gráfico ---------- */
const BARRAS = [40, 62, 48, 75, 58, 88, 70];

export function DashMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [built, setBuilt] = useState(true);
  useLoop(ref, async () => { setBuilt(false); await sleep(900); setBuilt(true); await sleep(4500); });
  return (
    <div ref={ref} className="dash" aria-hidden="true">
      <div className="dash__kpi"><small>Ventas de hoy</small><b>S/ 2,480</b><span className="up">+18%</span></div>
      <div className="dash__kpi"><small>Pedidos</small><b>38</b><span className="up">+6</span></div>
      <div className={`dash__chart${off(!built)}`}>
        {BARRAS.map((h, i) => (
          <i key={i} className={i === BARRAS.length - 1 ? "hi" : undefined} style={{ "--h": `${h}%`, transitionDelay: `${i * 80}ms` } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Dominio: búsqueda y disponibilidad ---------- */
const DOMINIOS = ["tuempresa.com", "tuempresa.pe", "tuempresa.com.pe"];

export function DomainMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [txt, setTxt] = useState("tuempresa");
  const [n, setN] = useState(3);
  useLoop(ref, async (alive) => {
    setN(0); await typeText(setTxt, "tuempresa", 90, alive); await sleep(300);
    for (let k = 1; k <= 3 && alive(); k++) { setN(k); await sleep(450); }
    await sleep(3600);
  });
  return (
    <div ref={ref} className="domsearch" aria-hidden="true">
      <div className="search"><Icon id="search" /><span>{txt}</span><i /></div>
      {DOMINIOS.map((d, i) => <div key={d} className={`domrow${off(i >= n)}`}><b>{d}</b><span>Disponible</span></div>)}
    </div>
  );
}

/* ---------- Correo: correos que entran ---------- */
export function InboxMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(2);
  useLoop(ref, async (alive) => {
    setN(0); await sleep(600);
    for (let k = 1; k <= 2 && alive(); k++) { setN(k); await sleep(800); }
    await sleep(4200);
  });
  const filas = [
    { ini: "VE", color: "#C8F135", c: "ventas@tuempresa.com", s: "Nuevo pedido" },
    { ini: "CO", color: "#4DE8E0", c: "contacto@tuempresa.com", s: "Cotización" },
  ];
  return (
    <div ref={ref} className="inbox" aria-hidden="true">
      {filas.map((f, i) => (
        <div key={f.c} className={`inbox__row${off(i >= n)}`}><span className="av" style={{ background: f.color }}>{f.ini}</span><b>{f.c}</b><small>{f.s}</small></div>
      ))}
    </div>
  );
}

/* ---------- WhatsApp: conversación ---------- */
export function BubblesMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(3); // 0 nada, 1 cliente, 2 escribiendo, 3 respuesta
  useLoop(ref, async () => {
    setStage(0); await sleep(600); setStage(1); await sleep(900);
    setStage(2); await sleep(1500); setStage(3); await sleep(4000);
  });
  return (
    <div ref={ref} style={{ display: "contents" }}>
      <div className={`bubble${off(stage < 1)}`}>Hola, vi su web 👋</div>
      <div className={`typing${off(stage !== 2)}`} aria-hidden="true"><i /><i /><i /></div>
      <div className={`bubble bubble--me${off(stage < 3)}`}>¡Hola! Te envío la cotización</div>
    </div>
  );
}

/* ---------- Google: búsqueda ---------- */
export function SearchMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [txt, setTxt] = useState("pastelería en Surco");
  const [res, setRes] = useState(true);
  useLoop(ref, async (alive) => {
    setRes(false); await typeText(setTxt, "pastelería en Surco", 75, alive); await sleep(400);
    setRes(true); await sleep(3800);
  });
  return (
    <div ref={ref} style={{ display: "contents" }}>
      <div className="search"><Icon id="search" /><span>{txt}</span><i /></div>
      <div className={`result${off(!res)}`}><small>tupasteleria.com</small><b>Tu Pastelería · Tortas a pedido</b></div>
    </div>
  );
}

/* ---------- Pasos ---------- */
export function WireMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [built, setBuilt] = useState(true);
  useLoop(ref, async () => { setBuilt(false); await sleep(800); setBuilt(true); await sleep(4200); });
  const piezas = ["w-h", "", "", "w-a", "", "w-b", "w-b"];
  return (
    <div ref={ref} className="viz" aria-hidden="true">
      <div className={`wire${off(!built)}`}>{piezas.map((c, i) => <span key={i} className={c || undefined} style={{ transitionDelay: `${i * 90}ms` }} />)}</div>
    </div>
  );
}

export function TogglesMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(3);
  useLoop(ref, async (alive) => {
    setN(0); await sleep(900);
    for (let k = 1; k <= 3 && alive(); k++) { setN(k); await sleep(650); }
    await sleep(3600);
  });
  return (
    <div ref={ref} className="viz" aria-hidden="true">
      {["Android", "iPhone", "Computadora"].map((t, i) => <div key={t} className="tog">{t}<i className={i >= n ? "off" : undefined} /></div>)}
    </div>
  );
}

export function PublishMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [txt, setTxt] = useState("tuempresa.com");
  const [online, setOnline] = useState(true);
  useLoop(ref, async (alive) => {
    setOnline(false); await typeText(setTxt, "tuempresa.com", 90, alive); await sleep(500);
    setOnline(true); await sleep(3800);
  });
  return (
    <div ref={ref} className="viz" aria-hidden="true">
      <div className="dom"><Icon id="lock" /><span>{txt}</span><i className="dom__caret" /></div>
      <div className={`online${off(!online)}`}><span className="pulse" />Publicado · en línea</div>
    </div>
  );
}
