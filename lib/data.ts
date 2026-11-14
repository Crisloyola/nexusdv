// Todos los textos y datos del negocio en un solo lugar.
// Para cambiar un precio, un teléfono o agregar un proyecto, edita solo este archivo.

export const contacto = {
  whatsapp: "941 163 771",
  whatsappLink: "https://wa.link/7b0sdd",
  whatsappNumero: "51941163771", // con código de país, sin "+" ni espacios
  correo: "contacto@nexusdv.pe",
  instagram: "@nexusdv.pe",
  instagramLink: "https://www.instagram.com/nexusdv.pe/",
  ciudad: "Lima, Perú",
};

export const waTexto = (texto: string) =>
  `https://wa.me/${contacto.whatsappNumero}?text=${encodeURIComponent(texto)}`;

export const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#pasos", label: "Cómo trabajamos" },
  { href: "#precios", label: "Precios" },
  { href: "#contacto", label: "Contacto" },
];

export type Proyecto = {
  nombre: string;
  etiqueta: string;
  descripcion: string;
  datos: { t: string; v: string }[];
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
    url: "https://creatrix-36752.web.app/",
    urlTexto: "Ver Creatrix",
    dominio: "creatrix-36752.web.app",
    imgDesktop: { src: "/img/creatrix-desktop.jpg", w: 1440, h: 900, alt: "Pantalla de inicio de Creatrix en computadora" },
    imgMovil: { src: "/img/creatrix-movil.jpg", w: 780, h: 1688, alt: "Creatrix en un celular" },
  },
];

export const planes = [
  {
    nombre: "Página web",
    precio: "A medida",
    nota: "",
    destacado: true,
    etiqueta: "Más pedido",
    texto: "Para mostrar lo que vendes y recibir mensajes. Cotización sin costo.",
    incluye: ["Diseño a medida", "Adaptada a celular", "Botón directo a WhatsApp", "Lista para Google"],
    boton: "Pedir cotización",
  },
  {
    nombre: "Apps y sistemas",
    precio: "A medida",
    nota: "",
    destacado: false,
    texto: "Para vender, atender y ordenar tu negocio. Cotización sin costo.",
    incluye: ["App Android y iPhone", "Publicación en las tiendas", "Sistemas de ventas, inventario o reservas", "Panel para administrar todo"],
    boton: "Cotizar mi proyecto",
  },
  {
    nombre: "Dominio y correo",
    precio: "S/ 550",
    nota: "el primer año",
    destacado: false,
    texto: "Para dejar el Gmail personal y escribir con tu propia marca.",
    incluye: ["Tu dominio, como tuempresa.com", "4 correos con los nombres que elijas", "Configuración en celular y computadora", "Ayuda por WhatsApp para usarlo"],
    boton: "Quiero mi correo",
  },
];

export const preguntas = [
  { q: "¿Cuánto cuesta una página web?", a: "Depende de las secciones y funciones que necesites. Te enviamos la cotización sin costo." },
  { q: "¿Puedo ver el diseño antes de pagar todo?", a: "Sí. Te mostramos el diseño y lo apruebas antes de programar." },
  { q: "¿Hacen apps para Android y iPhone?", a: "Sí. Desarrollamos tu app para los dos y te ayudamos a publicarla en Google Play y App Store." },
  { q: "¿Qué tipo de sistemas hacen?", a: "Sistemas a medida: ventas, inventario, reservas, fidelización de clientes y más. Te cotizamos según lo que necesites." },
  { q: "¿Puedo comprar solo el dominio?", a: "Sí. Te ayudamos a elegir y registrar tu dominio, como tuempresa.com o tuempresa.pe, y te enviamos la cotización sin costo." },
  { q: "¿Puedo pedir varios servicios juntos?", a: "Sí. Web, app, sistema, dominio y correo: te cotizamos todo en una sola propuesta." },
  { q: "¿Cuánto cuesta renovar el correo?", a: "Te decimos el precio de renovación antes de que pagues el primer año." },
];

// Información que usa el asistente con IA (app/api/chat/route.ts).
export const infoNegocio = `
NEXUSDV es una empresa de desarrollo en ${contacto.ciudad}.
Servicios:
- Páginas web a medida: diseño propio, adaptadas a celular, botón a WhatsApp, listas para Google. El cliente aprueba el diseño antes de programar.
  · Landing page (página de una sola sección/página): DESDE S/ 500. El precio sube según lo que se agregue (más secciones o páginas, galerías, formularios, catálogo, tienda, varios idiomas, integraciones). El precio final se confirma al cotizar, sin costo.
  · Tiempo de entrega de una landing: 7 días. Webs más grandes toman más tiempo y la fecha exacta se da al cotizar.
- Apps para Android y iPhone, con ayuda para publicarlas en Google Play y App Store. El costo y el tiempo dependen mucho de lo que necesite el cliente (funciones, pantallas, usuarios, pagos, panel). Se cotiza sin costo, sin precio fijo.
- Apps web y sistemas a medida: ventas, inventario, reservas, fidelización de clientes, con panel de administración. Igual que las apps: costo y tiempo según lo que necesite el cliente. Se cotiza sin costo, sin precio fijo.
- Dominio propio: .com, .pe o .com.pe. El dominio .pe (y .com.pe) también se cotiza; se puede comprar solo el dominio.
- Correo corporativo: dominio + 4 correos corporativos a S/ 550 el primer año. Incluye configuración en celular y computadora y ayuda por WhatsApp para usarlo. La entrega del correo corporativo es INMEDIATA. El precio de renovación se informa antes de pagar.
Proyectos entregados: LML Agency (web de productora audiovisual, lmlagencype.com), LML Agency Alquiler (página de alquiler de equipos de audio y video, lmlagencype.com/alquiler) y Creatrix (sistema de fidelización con puntos y promociones).
Contacto: WhatsApp (con el botón "Hablar por WhatsApp" del chat; no se muestra el número), correo ${contacto.correo}, Instagram ${contacto.instagram}.
`.trim();
