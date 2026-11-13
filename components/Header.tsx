import { contacto, nav } from "@/lib/data";
import { Icon, Logo } from "./Icons";

export function Header() {
  return (
    <header className="nav">
      <div className="wrap nav__in">
        <a className="logo" href="#top" aria-label="NEXUSDV, inicio"><Logo />NEXUSDV</a>
        <nav className="nav__links" aria-label="Principal">
          {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <a className="btn btn--lime btn--sm" href={contacto.whatsappLink}><Icon id="wa" /><span>Escríbenos por WhatsApp</span></a>
      </div>
    </header>
  );
}
