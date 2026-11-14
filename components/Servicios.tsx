"use client";
import { useState } from "react";
import { SERVICIOS } from "@/lib/servicios";

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
