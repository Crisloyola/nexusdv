import { contacto } from "@/lib/data";
import { Icon } from "./Icons";
import { AbrirNexo } from "./AbrirNexo";

/** Portada: promesa centrada sobre rayos de luz lima y la acción principal. */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-t">
      <div className="hero__rayos" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="wrap hero__in rv">
        <h1 id="hero-t" className="hero__h">Webs que te traen clientes por WhatsApp.</h1>
        <p className="hero__lead">Páginas web, tiendas virtuales y sistemas para negocios de {contacto.ciudad.split(",")[0]}. Desde S/ 300, con hosting el primer año y cada consulta directo a tu WhatsApp.</p>
        <div className="hero__cta">
          <a className="btn btn--lime btn--lg" href={contacto.whatsappLink} target="_blank" rel="noopener"><Icon id="wa" />Cotizar mi proyecto</a>
          <a className="btn btn--ghost btn--lg" href="#precios">Ver precios<Icon id="right" /></a>
        </div>
        <p className="hero__meta">Ves el diseño antes de programar · Landing lista en 5 a 7 días hábiles · 30 días de soporte</p>
        <AbrirNexo className="hero__nexo">¿Dudas? Pregúntale a Nexo</AbrirNexo>
      </div>
    </section>
  );
}
