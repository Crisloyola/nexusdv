import { contacto, planes, waTexto } from "@/lib/data";
import { Icon } from "./Icons";
import { AbrirNexo } from "./AbrirNexo";
import { GradientBlinds } from "./FinalCtaBanner";

/** Portada: promesa centrada sobre rayos de luz lima y la acción principal. */
export function Hero() {
  const landing = planes.find((p) => p.id === "landing")!;
  return (
    <section className="hero" aria-labelledby="hero-t">
      <div className="hero__rayos" aria-hidden="true">
        <GradientBlinds
          className="hero__blindsCanvas"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.72,
            filter: "blur(9px)",
            transform: "scale(1.04)",
          }}
          gradientColors={["#C8F135", "#77921B", "#202C0E", "#08090B"]}
          angle={-42}
          blindCount={22}
          blindMinWidth={80}
          spotlightRadius={0.6}
          spotlightOpacity={0.22}
          shine={0.12}
          relief={0.2}
          glow={0.16}
          sway={0.15}
          hoverTilt={0.2}
          clickEffect="none"
          noise={0.06}
          lightColor="#C8F135"
          idle="drift"
          mixBlendMode="normal"
          lightMode={false}
          intro
        />
      </div>
      <div className="wrap hero__in rv">
        <h1 id="hero-t" className="hero__h">Tu negocio merece una <span className="hero__hl">página web profesional</span></h1>
        <p className="hero__lead">Crea tu presencia digital, muestra tus servicios y recibe clientes directamente por WhatsApp.</p>
        <div className="hero__cta">
          <a className="btn btn--lime btn--lg" href={waTexto(landing.mensaje, landing.campana)} target="_blank" rel="noopener"><Icon id="wa" />Quiero mi página web desde S/ 540</a>
          <a className="btn btn--ghost btn--lg" href="#precios">Ver precios<Icon id="right" /></a>
        </div>
        <p className="hero__meta">Ves el diseño antes de programar · Landing lista en 5 a 7 días hábiles · 30 días de soporte</p>
        <AbrirNexo className="hero__nexo">¿Dudas? Pregúntale a Nexo</AbrirNexo>
      </div>
    </section>
  );
}
