// Contacto y proyectos. Los servicios y precios están en lib/servicios.ts (fuente única).
import { datosParaNexo } from "./servicios";

export { planes, preguntas, A_MEDIDA } from "./servicios";

export const contacto = {
  whatsapp: "941 163 771",
  whatsappLink: "https://wa.link/7b0sdd",
  whatsappNumero: "51941163771", // con código de país, sin "+" ni espacios
  correo: "contacto@nexusdv.pe",
  instagram: "@nexusdv.pe",
  instagramLink: "https://www.instagram.com/nexusdv.pe/",
  ciudad: "Lima, Perú",
};

/** Fundador que se muestra en la sección de confianza. Mientras el nombre esté vacío, la web habla del equipo. */
export const fundador = { nombre: "Cristopher" };

/** Enlace a WhatsApp con el mensaje ya escrito. Con `campana` agrega utm_source=web y utm_campaign (seguimiento). */
export const waTexto = (texto: string, campana?: string) =>
  `https://wa.me/${contacto.whatsappNumero}?text=${encodeURIComponent(texto)}${campana ? `&utm_source=web&utm_campaign=${campana}` : ""}`;

/** Testimonios REALES de clientes, con su permiso. La sección no aparece mientras la lista esté vacía. */
export type Testimonio = { texto: string; nombre: string; negocio: string; proyecto?: string };
export const testimonios: Testimonio[] = [];

export type Proyecto = {
  nombre: string;
  etiqueta: string;
  descripcion: string;
  datos: { t: string; v: string }[];
  /** Caso de éxito: solo hechos de lo entregado, sin cifras inventadas. */
  caso: { problema: string; solucion: string; resultado: string };
  url: string;
  urlTexto: string;
  dominio: string;
  imgDesktop: { src: string; w: number; h: number; alt: string };
  imgMovil: { src: string; w: number; h: number; alt: string };
};

export const proyectos: Proyecto[] = [
  {
    nombre: "LML Agency",
    etiqueta: "Productora audiovisual · Página web",
    descripcion:
      "Productora audiovisual en Lima. Diseñamos su web para mostrar sus trabajos y recibir pedidos de cotización directo en su WhatsApp.",
    datos: [
      { t: "Diseño", v: "A medida de su marca" },
      { t: "Contacto", v: "Botón a WhatsApp" },
      { t: "Celular", v: "Cualquier pantalla" },
    ],
    caso: {
      problema: "Necesitaba un lugar propio para mostrar sus producciones y recibir pedidos de cotización.",
      solucion: "Página web a medida con sus trabajos y un botón directo a WhatsApp.",
      resultado: "Una presentación profesional de la productora y consultas que llegan directo a su WhatsApp.",
    },
    url: "https://lmlagencype.com",
    urlTexto: "Visitar lmlagencype.com",
    dominio: "lmlagencype.com",
    imgDesktop: { src: "/img/lml-landing-desktop.png", w: 1899, h: 941, alt: "Página de inicio de lmlagencype.com en computadora" },
    imgMovil: { src: "/img/lml-landing-movil.png", w: 382, h: 846, alt: "lmlagencype.com en un celular" },
  },
  {
    nombre: "LML Agency · Alquiler",
    etiqueta: "Alquiler de equipos · Página web",
    descripcion:
      "Página de alquiler de equipos de audio y video en Lima. Muestra packs listos para usar y lleva cada consulta de disponibilidad directo a WhatsApp.",
    datos: [
      { t: "Catálogo", v: "Packs de equipos" },
      { t: "Pedidos", v: "Directo a WhatsApp" },
      { t: "Celular", v: "Cualquier pantalla" },
    ],
    caso: {
      problema: "Necesitaba mostrar sus equipos de audio y video disponibles para alquilar.",
      solucion: "Página de alquiler con packs de equipos listos para usar.",
      resultado: "Cada consulta de disponibilidad llega directo a su WhatsApp.",
    },
    url: "https://lmlagencype.com/alquiler",
    urlTexto: "Visitar lmlagencype.com/alquiler",
    dominio: "lmlagencype.com/alquiler",
    imgDesktop: { src: "/img/lml-alquiler-desktop.png", w: 1897, h: 938, alt: "Página de alquiler de equipos de lmlagencype.com en computadora" },
    imgMovil: { src: "/img/lml-alquiler-movil.png", w: 382, h: 842, alt: "Página de alquiler de lmlagencype.com en un celular" },
  },
  {
    nombre: "Creatrix",
    etiqueta: "Sistema a medida · Fidelización de clientes",
    descripcion:
      "Sistema de fidelización para negocios locales. Sus clientes acumulan puntos y cashback en cada compra, reciben promociones y usan su tarjeta de fidelidad en QR.",
    datos: [
      { t: "Tipo", v: "Sistema con cuentas" },
      { t: "Acceso", v: "Correo o Google" },
      { t: "Celular", v: "Se instala como app" },
    ],
    caso: {
      problema: "Los negocios locales no tenían una forma simple de premiar a sus clientes frecuentes.",
      solucion: "Sistema de fidelización con puntos, cashback, promociones y tarjeta de fidelidad en QR.",
      resultado: "Clientes que acumulan beneficios en cada compra y usan su tarjeta desde el celular, como una app.",
    },
    url: "https://creatrix-36752.web.app/",
    urlTexto: "Ver Creatrix",
    dominio: "creatrix-36752.web.app",
    imgDesktop: { src: "/img/creatrix-desktop.jpg", w: 1440, h: 900, alt: "Pantalla de inicio de Creatrix en computadora" },
    imgMovil: { src: "/img/creatrix-movil.jpg", w: 780, h: 1688, alt: "Creatrix en un celular" },
  },
];

// Información que usa el asistente con IA (app/api/chat/route.ts).
export const infoNegocio = `
NEXUSDV es una empresa de desarrollo en ${contacto.ciudad}, fundada por ${fundador.nombre}.
${datosParaNexo()}
PROYECTOS ENTREGADOS (solo estos): ${proyectos.map((p) => `${p.nombre} (${p.etiqueta.toLowerCase()}, ${p.dominio})`).join("; ")}.
CONTACTO: WhatsApp (botón "Hablar por WhatsApp" del chat; nunca escribas el número), correo ${contacto.correo}, Instagram ${contacto.instagram}.
`.trim();
