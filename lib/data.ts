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
/** `logo`: ícono cuadrado del cliente (public/img/logos). Sin logo se muestra su inicial. */
export type Testimonio = { texto: string; negocio: string; nombre?: string; proyecto?: string; logo?: string };
export const testimonios: Testimonio[] = [
  {
    texto: "Quedamos muy satisfechos con el desarrollo de nuestra página web. Lograron plasmar nuestra idea en un sitio moderno, profesional y fácil de navegar. Muy buen trabajo y atención durante todo el proceso.",
    negocio: "LML Agency",
    logo: "/img/logos/lml-agency.png",
    proyecto: "Página web",
  },
  {
    texto: "Excelente servicio de principio a fin. Destacamos la creatividad, el compromiso y la dedicación para conseguir una página web que cumpliera con nuestras expectativas.",
    negocio: "Creatrix",
    logo: "/img/logos/creatrix.png",
    proyecto: "Sistema a medida",
  },
  {
    texto: "Quedamos muy satisfechos con el desarrollo de nuestra página web. NexusDV logró plasmar nuestra idea en un sitio moderno, profesional y fácil de navegar. Excelente trabajo y atención durante todo el proceso.",
    negocio: "Franyer Cargo",
    logo: "/img/logos/franyer-cargo.png",
    proyecto: "Página web",
  },
  {
    texto: "Excelente servicio de principio a fin. Destacamos la creatividad, el compromiso y la dedicación para conseguir una página web que representara nuestra empresa y nuestros servicios.",
    negocio: "Mara Capital",
    logo: "/img/logos/mara-capital.png",
    proyecto: "Página web",
  },
];

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
  {
    nombre: "Creatrix · Control de ventas",
    etiqueta: "Sistema a medida · Control de ventas",
    descripcion:
      "Sistema de control de ventas para Creatrix Diseño & Publicidad. Su equipo entra con su cuenta y lleva el registro de sus ventas en un solo lugar.",
    datos: [
      { t: "Tipo", v: "Sistema con cuentas" },
      { t: "Acceso", v: "Correo y contraseña" },
      { t: "Pantalla", v: "Modo claro y oscuro" },
    ],
    caso: {
      problema: "Necesitaba llevar el control de sus ventas de forma ordenada y en un solo lugar.",
      solucion: "Sistema de control de ventas a medida, con acceso privado para su equipo.",
      resultado: "Sus ventas registradas en un sistema propio, al que su equipo entra desde la computadora o el celular.",
    },
    url: "https://creatrix-one.vercel.app/",
    urlTexto: "Ver Creatrix · Control de ventas",
    dominio: "creatrix-one.vercel.app",
    imgDesktop: { src: "/img/creatrix-ventas-desktop.jpg", w: 1440, h: 900, alt: "Pantalla de ingreso del sistema de control de ventas de Creatrix en computadora" },
    imgMovil: { src: "/img/creatrix-ventas-movil.jpg", w: 780, h: 1688, alt: "Sistema de control de ventas de Creatrix en un celular" },
  },
  {
    nombre: "Franyer Cargo",
    etiqueta: "Agencia de carga y aduanas · Página web",
    descripcion:
      "Agencia de carga internacional y aduanas en el Callao. Diseñamos su web con sus servicios, rutas y tiempos de tránsito, y un cotizador que envía cada pedido directo a su WhatsApp.",
    datos: [
      { t: "Cotizador", v: "Directo a WhatsApp" },
      { t: "Idiomas", v: "Español, inglés y chino" },
      { t: "Celular", v: "Cualquier pantalla" },
    ],
    caso: {
      problema: "Necesitaba presentar sus servicios de carga y aduanas a importadores y recibir pedidos de cotización.",
      solucion: "Página web en tres idiomas con servicios, rutas desde China y un cotizador de envíos marítimos y aéreos.",
      resultado: "Cada cotización llega a su WhatsApp con origen, destino, tipo de carga, peso y volumen ya completos.",
    },
    url: "https://franyercargo.com",
    urlTexto: "Visitar franyercargo.com",
    dominio: "franyercargo.com",
    imgDesktop: { src: "/img/franyer-desktop.jpg", w: 1440, h: 900, alt: "Página de inicio de franyercargo.com en computadora" },
    imgMovil: { src: "/img/franyer-movil.jpg", w: 780, h: 1688, alt: "franyercargo.com en un celular" },
  },
  {
    nombre: "Mara Capital",
    etiqueta: "Préstamos en línea · Página web",
    descripcion:
      "Financiera de préstamos rápidos. Diseñamos su web con un simulador de monto y forma de pago, sus requisitos y atención directa por WhatsApp.",
    datos: [
      { t: "Simulador", v: "Monto y forma de pago" },
      { t: "Atención", v: "WhatsApp 24/7" },
      { t: "Celular", v: "Cualquier pantalla" },
    ],
    caso: {
      problema: "Necesitaba que sus clientes pudieran pedir un préstamo en línea sin ir a una oficina.",
      solucion: "Página web con simulador de préstamo de S/ 200 a S/ 5,000, requisitos claros y solicitud en línea.",
      resultado: "Sus clientes eligen monto y forma de pago, envían su solicitud y consultan por WhatsApp a cualquier hora.",
    },
    url: "https://www.marakpital.com",
    urlTexto: "Visitar marakpital.com",
    dominio: "marakpital.com",
    imgDesktop: { src: "/img/marakpital-desktop.jpg", w: 1440, h: 900, alt: "Página de inicio de marakpital.com en computadora" },
    imgMovil: { src: "/img/marakpital-movil.jpg", w: 780, h: 1688, alt: "marakpital.com en un celular" },
  },
];

// Información que usa el asistente con IA (app/api/chat/route.ts).
export const infoNegocio = `
NEXUSDV es una empresa de desarrollo en ${contacto.ciudad}, fundada por ${fundador.nombre}.
${datosParaNexo()}
PROYECTOS ENTREGADOS (solo estos): ${proyectos.map((p) => `${p.nombre} (${p.etiqueta.toLowerCase()}, ${p.dominio})`).join("; ")}.
CONTACTO: WhatsApp (botón "Hablar por WhatsApp" del chat; nunca escribas el número), correo ${contacto.correo}, Instagram ${contacto.instagram}.
`.trim();
