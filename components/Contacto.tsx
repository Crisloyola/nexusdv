import { contacto } from "@/lib/data";
import { Icon } from "./Icons";
import { Tile } from "./Tile";
import { FlutedGlass } from "./FlutedGlass";

export function Contacto() {
  return (
    <section className="sec" id="contacto" aria-labelledby="contacto-h">
      <div className="wrap">
        <div className="head rv">
          <h2 id="contacto-h">Contáctanos</h2>
          <p>Escríbenos por donde te sea más cómodo y te enviamos tu cotización sin costo.</p>
        </div>
        <div className="bento">
          <Tile as="a" href={contacto.whatsappLink} className="tile--lime tile--link contact c-6">
            <span className="tile__ico"><Icon id="wa" /></span>
            <p>WhatsApp · la forma más rápida de pedir tu cotización</p>
            <div className="tile__foot"><span className="contact__val">Contactanos</span><span className="arrow"><Icon id="arr" /></span></div>
          </Tile>
          <Tile as="a" href={`mailto:${contacto.correo}`} className="tile--link contact c-3">
            <span className="tile__ico"><Icon id="mail" /></span>
            <p>Correo · para enviarnos detalles, fotos o tu logo</p>
            <div className="tile__foot"><span className="contact__val" style={{ fontSize: 22 }}>{contacto.correo}</span></div>
          </Tile>
          <Tile as="a" href={contacto.instagramLink} target="_blank" rel="noopener" className="tile--link contact c-3">
            <span className="tile__ico"><Icon id="ig" /></span>
            <p>Instagram · mira nuestros trabajos y novedades</p>
            <div className="tile__foot"><span className="contact__val" style={{ fontSize: 24 }}>{contacto.instagram}</span></div>
          </Tile>
          <FlutedGlass seed={43} className="close c-12">
            <h2>Cuéntanos qué necesita tu negocio</h2>
            <p>Webs, apps y sistemas a medida con cotización sin costo. Promo fin de año: dominio con 5 correos corporativos a S/ 550 el primer año.</p>
            <div className="btn-row">
              <a className="btn btn--lime" href={contacto.whatsappLink}><Icon id="wa" />Escríbenos por WhatsApp</a>
              <a className="btn btn--ghost" href={`mailto:${contacto.correo}`}>Enviar un correo</a>
            </div>
          </FlutedGlass>
        </div>
      </div>
    </section>
  );
}
