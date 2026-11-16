// FUENTE ÚNICA de servicios, precios y forma de trabajo.
// La web (Servicios, Precios, Pasos, SEO) y Nexo (lib/bot.ts y la IA) leen de aquí.
// Para cambiar un precio o un servicio, edita SOLO este archivo.

export const NOTA_PRECIOS = "Precios desde · el equipo confirma tu cotización según lo que necesitas";

/** Planes de páginas web con precio desde. Los muestra Precios y los conoce Nexo. */
export type PlanWeb = { id: string; nombre: string; desde: number; plazo: string; texto: string; incluye: string[]; destacado?: boolean;
  /** Mensaje que se escribe solo en WhatsApp al tocar el botón del plan. */ mensaje: string;
  /** utm_campaign del botón. */ campana: string };
export const PLANES_WEB: PlanWeb[] = [
  {
    id: "landing", nombre: "Landing Page", desde: 300, plazo: "5 a 7 días hábiles", campana: "landing_page",
    mensaje: "Hola, NEXUS. Estoy interesado en contratar una Landing Page desde S/300. Quisiera conocer qué incluye y cómo puedo empezar.",
    texto: "Una página para presentar tu negocio o una campaña y recibir consultas por WhatsApp.",
    incluye: ["Una página con las secciones clave de tu negocio", "Diseño a medida, adaptado a celular", "Botón directo a tu WhatsApp", "Lista para aparecer en Google", "Hosting el primer año"],
  },
  {
    id: "empresarial", nombre: "Web empresarial", desde: 600, plazo: "unas 2 semanas", destacado: true, campana: "web_empresarial",
    mensaje: "Hola, NEXUS. Necesito una página web para mi empresa. ¿Podrían enviarme información sobre sus planes y servicios?",
    texto: "Varias páginas para mostrar tu empresa, tus servicios y tus trabajos.",
    incluye: ["Inicio, nosotros, servicios y contacto", "Galería de trabajos o catálogo de servicios", "Botón directo a tu WhatsApp", "Lista para aparecer en Google", "Hosting el primer año"],
  },
  {
    id: "tienda", nombre: "Tienda virtual", desde: 1000, plazo: "3 a 4 semanas", campana: "tienda_virtual",
    mensaje: "Hola, NEXUS. Quiero crear una tienda virtual para mi negocio. Me gustaría conocer sus funcionalidades y precio.",
    texto: "Tu catálogo en línea: tus clientes eligen y el pedido te llega armado a WhatsApp.",
    incluye: ["Catálogo de productos con fotos y precios", "Carrito de compras", "El pedido llega armado a tu WhatsApp", "Pago coordinado por WhatsApp: Yape, Plin o transferencia", "Hosting el primer año"],
  },
];

/** Precio para mostrar: "S/ 1,000". */
export const soles = (n: number) => `S/ ${n.toLocaleString("en-US")}`;

/** Cómo trabajamos después de cotizar. La sección de confianza y Nexo leen de aquí. */
export const POLITICAS = {
  cambios: "Incluye 1 ronda de cambios en el diseño antes de programar. Los cambios posteriores se cotizan.",
  administra: "NEXUSDV administra tu web y la mantiene en línea. Tú nos escribes por WhatsApp cuando necesites algo.",
  dominio: "El dominio se registra a nombre de NEXUSDV mientras dure el servicio. Si lo pides, te lo transferimos.",
  soporte: "30 días de soporte sin costo después de publicar, para errores y ajustes menores. Luego puedes tomar un plan de mantenimiento mensual, que se cotiza.",
  plazos: "Desde que apruebas el diseño: Landing Page de 5 a 7 días hábiles, Web empresarial unas 2 semanas y Tienda virtual de 3 a 4 semanas. Apps y sistemas según lo que necesites.",
  hosting: "Las páginas web incluyen hosting el primer año. El dominio se cotiza aparte.",
};

export type Servicio = {
  id: "web" | "app" | "sys" | "ia";
  ruta: string;
  titulo: string;
  texto: string;
  /** Precio tal como se muestra en la web. */
  precio: string;
  puntos: string[];
  /** Lo que Nexo debe saber y puede decir de este servicio (sin inventar nada más). */
  paraNexo: string;
};

export const SERVICIOS: Servicio[] = [
  {
    id: "web", ruta: "/web", titulo: "Páginas web a medida",
    texto: "Diseño propio, sin plantillas genéricas. Tu web muestra quién eres, qué vendes y lleva al cliente directo a tu chat.",
    precio: "Desde S/ 300 · landing, web empresarial o tienda",
    puntos: ["Diseño hecho para tu marca", "Se ve perfecta en celular", "Botón directo a tu WhatsApp", "Lista para aparecer en Google"],
    paraNexo: "Páginas web a medida: diseño propio, adaptadas a celular, botón a WhatsApp, listas para Google. Precios (siempre con \"desde\"): Landing Page desde S/ 300 (5 a 7 días hábiles), Web empresarial desde S/ 600 (unas 2 semanas), Tienda virtual desde S/ 1,000 (3 a 4 semanas; el pedido llega armado a WhatsApp y el pago se coordina por WhatsApp con Yape, Plin o transferencia). Incluyen hosting el primer año; el dominio va aparte. Los plazos cuentan desde que el cliente aprueba el diseño.",
  },
  {
    id: "app", ruta: "/apps", titulo: "Apps Android y iPhone",
    texto: "Tu propia app para que tus clientes compren, reserven, sigan sus pedidos o acumulen puntos desde el celular.",
    precio: "A medida · cotización sin costo",
    puntos: ["Una app para Android y iPhone", "Publicación en Google Play y App Store", "Notificaciones a tus clientes", "Panel para administrarla"],
    paraNexo: "Apps a medida para Android y iPhone, con ayuda para publicarlas en Google Play y App Store. Precio: a medida, cotización sin costo. Plazo: depende de lo que necesite, se confirma en la cotización.",
  },
  {
    id: "sys", ruta: "/sistemas", titulo: "Sistemas a medida",
    texto: "Ordena tu negocio con un sistema hecho para ti: ventas, inventario, reservas o fidelización de clientes.",
    precio: "A medida · cotización sin costo",
    puntos: ["Ventas, inventario y reservas", "Cuentas para tu equipo", "Reportes claros de tu negocio", "Funciona en celular y computadora"],
    paraNexo: "Sistemas a medida: ventas, inventario, reservas o fidelización de clientes, con panel para administrar. Precio: a medida, cotización sin costo. Plazo: depende de lo que necesite, se confirma en la cotización.",
  },
  {
    id: "ia", ruta: "/ia", titulo: "Asistentes con IA",
    texto: "Un asistente como Nexo dentro de tu web: atiende a tus clientes a cualquier hora y te los pasa por WhatsApp listos para comprar.",
    precio: "A medida · cotización sin costo",
    puntos: ["Responde preguntas frecuentes 24/7", "Orienta a tus clientes", "Toma reservas o pedidos", "Pasa la conversación a tu WhatsApp"],
    paraNexo: "Asistentes con IA para la web del cliente. Pueden: responder preguntas frecuentes 24/7, orientar al cliente, tomar reservas o pedidos y derivar la conversación a WhatsApp. Funcionan en la página web del cliente. Precio: a medida, cotización sin costo. Plazo: depende, se confirma en la cotización. Tú (Nexo) eres un ejemplo real de este servicio. No prometas ninguna otra función.",
  },
];

/** Forma de trabajo, en orden. */
export const FORMA_DE_TRABAJO = [
  "Diseñamos tu proyecto",
  "Tú apruebas el diseño",
  "Lo programamos",
  "Lo publicamos conectado a tu WhatsApp",
  "Te acompañamos después",
];

/** Los 3 pasos que muestra la sección "Cómo trabajamos" (resumen de FORMA_DE_TRABAJO). */
export const PASOS = [
  { t: "Diseñamos tu proyecto", p: "Conversamos, entendemos tu negocio y te mostramos el diseño. Lo apruebas antes de programar.", m: "diseño → tu aprobación" },
  { t: "Lo programamos", p: "Construimos tu web, app, sistema o asistente para que funcione en Android, iPhone y computadora.", m: "código → pruebas" },
  { t: "Lo publicamos", p: "Sale en línea con tu dominio o en las tiendas de apps, conectado a tu WhatsApp. Y te acompañamos después.", m: "tuempresa.pe → en línea" },
];

/** Lo que muestra la sección Precios: los 3 planes web y una línea para lo que va a medida. */
export const planes = PLANES_WEB;
export const A_MEDIDA = { nombre: "Apps, sistemas y asistentes con IA", texto: "Para vender, atender y ordenar tu negocio. Se cotizan según lo que necesitas.", precio: "A medida", boton: "Cotizar mi proyecto" };

export const preguntas = [
  { q: "¿Cuánto cuesta una página web?", a: "Landing Page desde S/ 300, Web empresarial desde S/ 600 y Tienda virtual desde S/ 1,000, con hosting el primer año. Te enviamos la cotización exacta sin costo." },
  { q: "¿Puedo ver el diseño antes de pagar todo?", a: "Sí. Te mostramos el diseño y lo apruebas antes de programar." },
  { q: "¿Hacen apps para Android y iPhone?", a: "Sí. Desarrollamos tu app para los dos y te ayudamos a publicarla en Google Play y App Store." },
  { q: "¿Qué tipo de sistemas hacen?", a: "Sistemas a medida: ventas, inventario, reservas, fidelización de clientes y más. Te cotizamos según lo que necesites." },
  { q: "¿Pueden hacer un asistente con IA para mi web?", a: "Sí. Responde preguntas frecuentes 24/7, orienta a tus clientes, toma reservas o pedidos y los pasa a tu WhatsApp. Se cotiza sin costo." },
  { q: "¿Puedo pedir varios servicios juntos?", a: "Sí. Web, app, sistema y asistente con IA: te cotizamos todo en una sola propuesta." },
];

/** Preguntas de confianza (sección "Trabajar con nosotros"). La primera depende de si hay fundador en lib/data.ts. */
export const confianza = (quien: string) => [
  { q: "¿Quién está detrás de NEXUSDV?", a: quien },
  { q: "¿Qué pasa si necesito cambios?", a: POLITICAS.cambios },
  { q: "¿Quién administra mi página?", a: POLITICAS.administra },
  { q: "¿El dominio será mío?", a: POLITICAS.dominio },
  { q: "¿Hay soporte después de la entrega?", a: POLITICAS.soporte },
  { q: "¿Cuánto demora el desarrollo?", a: POLITICAS.plazos },
];

/** Texto con los datos oficiales que recibe la IA de Nexo. Se arma solo desde lo de arriba. */
export function datosParaNexo(): string {
  return [
    "SERVICIOS (datos oficiales, no hay otros):",
    ...SERVICIOS.map((s) => `- ${s.paraNexo}`),
    "",
    `FORMA DE TRABAJO: ${FORMA_DE_TRABAJO.join(" → ")}. El cliente ve y aprueba el diseño antes de programar.`,
    "Se pueden pedir varios servicios juntos y se cotizan en una sola propuesta.",
    `CAMBIOS: ${POLITICAS.cambios}`,
    `ADMINISTRACIÓN: ${POLITICAS.administra}`,
    `DOMINIO: ${POLITICAS.dominio}`,
    `SOPORTE: ${POLITICAS.soporte}`,
    `PLAZOS: ${POLITICAS.plazos}`,
    `HOSTING: ${POLITICAS.hosting}`,
  ].join("\n");
}
