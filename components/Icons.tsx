// Íconos como un "sprite" SVG: se dibujan una vez y se reutilizan con <Icon id="wa" />.
export type IconId =
  | "wa" | "arr" | "right" | "chk" | "mail" | "ig" | "web" | "search" | "phone"
  | "lock" | "sys" | "globe" | "android" | "apple" | "bot";

export function Icon({ id, className }: { id: IconId; className?: string }) {
  // WhatsApp usa la imagen public/img/whatsapp.png como máscara: toma el color del texto del botón.
  if (id === "wa") return <span className={`ico-wa${className ? ` ${className}` : ""}`} aria-hidden="true" />;
  return <svg className={className} aria-hidden="true"><use href={`#i-${id}`} /></svg>;
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 21.5V12a9.5 9.5 0 0 1 19 0v9.5h-6V12a3.5 3.5 0 0 0-7 0v9.5z" />
    </svg>
  );
}

/** Nexo, el personaje del asistente. Colores en globals.css (.nh cara, .ne ojos, .ns sonrisa, .na antena). */
export function NexoCara({ className = "" }: { className?: string }) {
  return (
    <svg className={`nx ${className}`} viewBox="0 0 32 32" aria-hidden="true">
      <path className="na" d="M16 8V4.5" />
      <circle className="nh" cx="16" cy="3.6" r="2.1" />
      <rect className="nh" x="4" y="8" width="24" height="20" rx="9" />
      <rect className="ne" x="10.2" y="14.2" width="3.4" height="5.6" rx="1.7" />
      <rect className="ne" x="18.4" y="14.2" width="3.4" height="5.6" rx="1.7" />
      <path className="ns" d="M13.2 23.2q2.8 2 5.6 0" />
    </svg>
  );
}

export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-arr" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" /></symbol>
      <symbol id="i-right" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
      <symbol id="i-chk" viewBox="0 0 12 12"><path d="m2.5 6.2 2.2 2.2 4.8-5" /></symbol>
      <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></symbol>
      <symbol id="i-ig" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".8" /></symbol>
      <symbol id="i-web" viewBox="0 0 24 24"><rect x="2.5" y="4" width="19" height="16" rx="2.5" /><path d="M2.5 9h19M6 6.5h.01M8.5 6.5h.01" /></symbol>
      <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="3" /><path d="M11 18.5h2" /></symbol>
      <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></symbol>
      <symbol id="i-bot" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="5" /><path d="M12 7V3.5M9.5 13v1.5M14.5 13v1.5" /></symbol>
      <symbol id="i-sys" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 16v-3M12 16V8M16 16v-5" /></symbol>
      <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" /></symbol>
      <symbol id="i-android" viewBox="0 0 24 24"><path d="M5 10a7 7 0 0 1 14 0v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" /><path d="M8 4.5 6.8 2.8M16 4.5l1.2-1.7M9 10h.01M15 10h.01" /></symbol>
      <symbol id="i-apple" viewBox="0 0 24 24"><path d="M16 3c-1.3.1-2.8.9-3.6 2-.7.9-1.2 2.2-1 3.5 1.4 0 2.8-.8 3.6-1.9.8-1 1.2-2.3 1-3.6z" /><path d="M12 9c-1 0-2.2-.8-3.4-.8C6.4 8.2 4.5 10 4.5 13.3c0 4.2 3 7.7 4.6 7.7 1.2 0 1.6-.7 3-.7s1.7.7 3 .7c1.6 0 3.6-3 4.2-5-2-.8-3-2.4-3-4.3 0-1.8 1-3 2.3-3.7-1-1.3-2.4-1.9-3.6-1.9-1.4 0-2.1.9-3 .9z" /></symbol>
    </svg>
  );
}
