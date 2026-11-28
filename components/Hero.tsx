import { contacto, planes, waTexto } from "@/lib/data";
import { PROMOCION_DICIEMBRE } from "@/lib/servicios";
import { Icon } from "./Icons";
import { AbrirNexo } from "./AbrirNexo";
import { AbrirSuscripcion } from "./Suscripcion";
import { LimeGradientBlinds } from "./FinalCtaBanner";

/** Portada: promesa centrada sobre rayos de luz lima y la acción principal. */
export function Hero() {
  const landing = planes.find((p) => p.id === "landing")!;
  return (
    <section className="hero" aria-labelledby="hero-t">
      <div className="hero__rayos" aria-hidden="true">
        <LimeGradientBlinds className="hero__blindsCanvas" />
      </div>
      <div className="wrap hero__in rv">
        <h1 id="hero-t" className="hero__h">Desarrollo web en Lima: <span className="hero__hl">páginas web a medida</span></h1>
        <p className="hero__lead">Creamos páginas web, tiendas virtuales, apps y sistemas para negocios que quieren vender y atender mejor por WhatsApp.</p>
        {PROMOCION_DICIEMBRE.activa && (
          <a className="hero__promo hero__promo--navidad" href={waTexto(PROMOCION_DICIEMBRE.mensaje, "promocion_navidad")} target="_blank" rel="noopener">
            <span className="hero__promo-main">
              <span className="hero__promo-kicker">Promoción de Navidad</span>
              <b>Landing Page + dominio .com</b>
              <small>Solo hasta el 31 de diciembre</small>
            </span>
            <span className="hero__promo-price">
              <small>Por solo</small>
              <strong>S/ 350</strong>
              <span><Icon id="right" /></span>
            </span>
          </a>
        )}
        <div className="hero__cta">
          <a className="btn btn--lime btn--lg"
            href={waTexto(PROMOCION_DICIEMBRE.activa ? PROMOCION_DICIEMBRE.mensaje : landing.mensaje, landing.campana)}
            target="_blank" rel="noopener"><Icon id="wa" />
            {PROMOCION_DICIEMBRE.activa ? "Landing + dominio por S/ 350" : "Quiero mi página web desde S/ 540"}
          </a>
          <a className="btn btn--ghost btn--lg" href="#precios">Ver precios<Icon id="right" /></a>
        </div>
        <p className="hero__meta">Ves el diseño antes de programar · Landing lista en 5 a 7 días hábiles · 30 días de soporte</p>
        <AbrirSuscripcion className="hero__nexo">Recibe novedades por correo</AbrirSuscripcion>
        <AbrirNexo className="hero__nexo">¿Dudas? Pregúntale a Nexo</AbrirNexo>
      </div>
    </section>
  );
}
