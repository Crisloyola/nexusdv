import { planes, waTexto } from "@/lib/data";
import { PROMOCION, promoActiva, quedanPromo, soles } from "@/lib/servicios";
import { Icon } from "./Icons";
import { AbrirNexo } from "./AbrirNexo";
import { LimeGradientBlinds } from "./FinalCtaBanner";

/**
 * Portada: promesa centrada sobre rayos de luz lima y la acción principal.
 * Con promo vigente, la tarjeta de la promo ES la acción principal (abre WhatsApp); sin promo, el botón lima de la Landing.
 */
export function Hero() {
  const landing = planes.find((p) => p.id === "landing")!;
  const promo = promoActiva();
  return (
    <section className="hero" aria-labelledby="hero-t">
      <div className="hero__rayos" aria-hidden="true">
        <LimeGradientBlinds className="hero__blindsCanvas" />
      </div>
      <div className="wrap hero__in rv">
        <h1 id="hero-t" className="hero__h">Desarrollo web en Lima: <span className="hero__hl">páginas web a medida</span></h1>
        <p className="hero__lead">Creamos páginas web, tiendas virtuales, apps y sistemas para negocios que quieren vender y atender mejor por WhatsApp.</p>
        {promo && (
          <a className="hero__promo hero__promo--navidad" href={waTexto(PROMOCION.mensaje, PROMOCION.campana)} target="_blank" rel="noopener">
            <span className="hero__promo-main">
              <span className="hero__promo-kicker">{PROMOCION.nombre}</span>
              <b>{PROMOCION.producto} por 1 año</b>
              <small>{quedanPromo()} · hasta el {PROMOCION.finTexto} · <span className="hero__promo-ahorro">ahorras {soles(PROMOCION.ahorro)}</span></small>
            </span>
            <span className="hero__promo-price">
              <s aria-label={`Antes ${soles(PROMOCION.precioNormal)}`}>{soles(PROMOCION.precioNormal)}</s>
              <strong>{soles(PROMOCION.precio)}</strong>
            </span>
            <span className="hero__promo-cta"><Icon id="wa" />Pedir la promo por WhatsApp<Icon id="right" /></span>
          </a>
        )}
        <div className="hero__cta">
          {!promo && (
            <a className="btn btn--lime btn--lg" href={waTexto(landing.mensaje, landing.campana)} target="_blank" rel="noopener">
              <Icon id="wa" />Quiero mi página web desde {soles(landing.precio)}
            </a>
          )}
          <a className="btn btn--ghost btn--lg" href="#precios">Ver todos los precios<Icon id="right" /></a>
        </div>
        <p className="hero__meta">Ves el diseño antes de programar · Landing lista en 5 a 7 días hábiles · 30 días de soporte</p>
        <AbrirNexo className="hero__nexo">¿Dudas? Pregúntale a Nexo</AbrirNexo>
      </div>
    </section>
  );
}
