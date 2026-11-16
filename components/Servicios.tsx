import { Vitrina } from "./Vitrina";

/** Servicios: título y la vitrina con cada servicio funcionando. */
export function Servicios() {
  return (
    <section className="sec" id="servicios" aria-labelledby="servicios-t">
      <div className="wrap">
        <div className="sec__head rv">
          <h2 id="servicios-t" className="tit tit--c"><b>Un solo equipo para todo lo digital.</b> <span>Todo se cotiza sin costo.</span></h2>
          <p className="sec__p">Elige lo que tu negocio necesita hoy.</p>
        </div>
        <div className="rv"><Vitrina /></div>
      </div>
    </section>
  );
}
