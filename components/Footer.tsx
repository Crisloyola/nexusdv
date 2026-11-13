import { contacto } from "@/lib/data";
import { Icon, Logo } from "./Icons";

export function Footer() {
  return (
    <>
      <footer className="wrap foot">
        <a className="logo" href="#top"><Logo />NEXUSDV</a>
        <nav aria-label="Pie de página">
          <a href="#servicios">Webs</a><a href="#apps">Apps</a><a href="#sistemas">Sistemas</a><a href="#dominio">Dominios</a>
          <a href="#proyectos">Proyectos</a><a href="#precios">Precios</a>
          <a href={contacto.whatsappLink}>WhatsApp</a><a href={contacto.instagramLink} target="_blank" rel="noopener">Instagram</a>
        </nav>
        <span>© {new Date().getFullYear()} NEXUSDV · {contacto.ciudad}</span>
      </footer>
      <div className="actionbar"><a className="btn btn--lime" href={contacto.whatsappLink}><Icon id="wa" />Escríbenos por WhatsApp</a></div>
    </>
  );
}
