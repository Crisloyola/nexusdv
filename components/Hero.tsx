import { contacto } from "@/lib/data";
import { Icon } from "./Icons";
import { Tile } from "./Tile";
import { FlutedGlass } from "./FlutedGlass";
import { CountUp } from "./CountUp";
import { ChatMock } from "./mocks/Mocks";

export function Hero() {
  return (
    <section className="sec" aria-labelledby="hero-h">
      <div className="wrap bento">
        <Tile className="hero-text c-7 r-2">
          <div>
            <p className="kicker">Desarrollo web, apps y sistemas en Lima · cotización sin costo</p>
            <h1 id="hero-h">Webs, <em>apps</em> y sistemas para tu negocio</h1>
            <p className="hero-lead">Creamos tu página web, tu app para Android y iPhone o el sistema que tu negocio necesita. Con tu propio dominio, correo corporativo y todo conectado a tu WhatsApp.</p>
          </div>
          <div className="btn-row">
            <a className="btn btn--lime" href={contacto.whatsappLink}>Cotizar mi proyecto<Icon id="right" /></a>
            <a className="btn btn--ghost" href="#proyectos">Ver proyectos</a>
          </div>
        </Tile>

        <FlutedGlass seed={44} className="hero-media c-5 r-2" role="img" aria-label="Mensajes de clientes que llegan a WhatsApp desde la página web del negocio">
          <ChatMock />
        </FlutedGlass>

        <Tile className="stat c-3"><span className="tile__ico"><Icon id="web" /></span><div><div className="big"><CountUp to={24} />/7</div><p className="stat__lbl">Tu negocio visible aunque no estés conectado</p></div></Tile>
        <Tile className="stat c-3"><span className="tile__ico"><Icon id="phone" /></span><div><div className="big"><CountUp to={100} />%</div><p className="stat__lbl">A medida: webs, apps y sistemas sin plantillas</p></div></Tile>
        <Tile className="stat c-3"><span className="tile__ico"><Icon id="mail" /></span><div><div className="big">S/ <CountUp to={550} /></div><p className="stat__lbl">Dominio + 4 correos corporativos el primer año</p></div></Tile>
        <Tile as="a" href={contacto.whatsappLink} className="tile--lime tile--link stat c-3">
          <span className="tile__ico"><Icon id="wa" /></span>
          <div className="tile__foot"><span style={{ fontSize: 22, letterSpacing: "-0.02em", lineHeight: 1.15 }}>Pide tu cotización gratis</span><span className="arrow"><Icon id="arr" /></span></div>
        </Tile>
      </div>
    </section>
  );
}
