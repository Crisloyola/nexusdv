"use client";
import { useState } from "react";

const SERVICIOS = [
  {
    ruta: "/web", titulo: "Páginas web a medida",
    texto: "Diseño propio, sin plantillas genéricas. Tu web muestra quién eres, qué vendes y lleva al cliente directo a tu chat.",
    precio: "A medida · cotización sin costo",
    puntos: ["Diseño hecho para tu marca", "Se ve perfecta en celular", "Botón directo a tu WhatsApp", "Lista para aparecer en Google"],
  },
  {
    ruta: "/apps", titulo: "Apps Android y iPhone",
    texto: "Tu propia app para que tus clientes compren, reserven, sigan sus pedidos o acumulen puntos desde el celular.",
    precio: "A medida · cotización sin costo",
    puntos: ["Una app para Android y iPhone", "Publicación en Google Play y App Store", "Notificaciones a tus clientes", "Panel para administrarla"],
  },
  {
    ruta: "/sistemas", titulo: "Sistemas a medida",
    texto: "Ordena tu negocio con un sistema hecho para ti: ventas, inventario, reservas o fidelización de clientes.",
    precio: "A medida · cotización sin costo",
    puntos: ["Ventas, inventario y reservas", "Cuentas para tu equipo", "Reportes claros de tu negocio", "Funciona en celular y computadora"],
  },
  {
    ruta: "/correo", titulo: "Dominio y correo corporativo",
    texto: "Deja el Gmail personal. Registramos tu dominio y configuramos correos con el nombre de tu empresa.",
    precio: "S/ 550 · dominio + 4 correos · primer año",
    puntos: ["Tu dominio, como tuempresa.com o .pe", "4 correos con los nombres que elijas", "Configurados en celular y computadora", "También vendemos solo el dominio"],
  },
];

/** Lista de servicios tipo acordeón: solo un ítem abierto a la vez. */
export function Servicios() {
  const [abierto, setAbierto] = useState<number | null>(0);

  return (
    <section className="sec" id="servicios">
      <div className="wrap">
        <div className="sec__top rv">
          <div><p className="mono tag">Servicios</p><h2 className="display h2">Un solo equipo para <span className="mark">todo</span> lo digital</h2></div>
          <p className="lead">Elige lo que tu negocio necesita hoy. Todo se cotiza sin costo y puedes pedir varios servicios en una sola propuesta.</p>
        </div>
        <div className="idx rv">
          {SERVICIOS.map((s, i) => {
            const open = abierto === i;
            return (
              <div key={s.ruta} className={`idx__item${open ? " open" : ""}`}>
                <button className="idx__btn" type="button" aria-expanded={open} aria-controls={`srv-${i}`} onClick={() => setAbierto(open ? null : i)}>
                  <span className="mono">{s.ruta}</span><h3>{s.titulo}</h3><span className="idx__plus" aria-hidden="true">+</span>
                </button>
                <div className="idx__panel" id={`srv-${i}`} inert={!open}>
                  <div><div className="idx__body"><span />
                    <div><p>{s.texto}</p><span className="idx__price">{s.precio}</span></div>
                    <ul>{s.puntos.map((p) => <li key={p}>{p}</li>)}</ul>
                  </div></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
