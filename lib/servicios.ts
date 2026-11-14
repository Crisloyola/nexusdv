// FUENTE ÚNICA de servicios, precios y forma de trabajo.
// La web (Servicios, Precios, Pasos, SEO) y Nexo (lib/bot.ts y la IA) leen de aquí.
// Para cambiar un precio o un servicio, edita SOLO este archivo.

export const NOTA_PRECIOS = "Precios referenciales · el equipo confirma tu cotización";

export type Servicio = {
  id: "web" | "app" | "sys" | "mail" | "ia";
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
    precio: "A medida · cotización sin costo",
    puntos: ["Diseño hecho para tu marca", "Se ve perfecta en celular", "Botón directo a tu WhatsApp", "Lista para aparecer en Google"],
    paraNexo: "Páginas web a medida: diseño propio, adaptadas a celular, botón a WhatsApp, listas para Google. Precio: a medida, cotización sin costo. Plazo: depende del alcance, se confirma en la cotización.",
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
    id: "mail", ruta: "/correo", titulo: "Dominio y correo corporativo",
    texto: "Deja el Gmail personal. Registramos tu dominio y configuramos correos con el nombre de tu empresa.",
    precio: "S/ 550 · dominio + 4 correos · primer año",
    puntos: ["Tu dominio, como tuempresa.com o .pe", "4 correos con los nombres que elijas", "Configurados en celular y computadora", "También vendemos solo el dominio"],
    paraNexo: "Dominio y correo corporativo: S/ 550 el primer año, incluye el dominio + 4 correos. La renovación se informa antes de pagar. También se vende solo el dominio (se cotiza).",
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

export const planes = [
  {
    nombre: "Página web",
    precio: "A medida",
    nota: "",
    destacado: true,
    etiqueta: "Más pedido",
    texto: "Para mostrar lo que vendes y recibir mensajes. Cotización sin costo.",
    incluye: SERVICIOS[0].puntos,
    boton: "Pedir cotización",
  },
  {
    nombre: "Apps, sistemas e IA",
    precio: "A medida",
    nota: "",
    destacado: false,
    texto: "Para vender, atender y ordenar tu negocio. Cotización sin costo.",
    incluye: ["App Android y iPhone", "Sistemas de ventas, inventario o reservas", "Asistentes con IA para tu web", "Panel para administrar todo"],
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
  { q: "¿Cuánto cuesta una página web?", a: "Es a medida: depende de las secciones y funciones que necesites. Te enviamos la cotización sin costo." },
  { q: "¿Puedo ver el diseño antes de pagar todo?", a: "Sí. Te mostramos el diseño y lo apruebas antes de programar." },
  { q: "¿Hacen apps para Android y iPhone?", a: "Sí. Desarrollamos tu app para los dos y te ayudamos a publicarla en Google Play y App Store." },
  { q: "¿Qué tipo de sistemas hacen?", a: "Sistemas a medida: ventas, inventario, reservas, fidelización de clientes y más. Te cotizamos según lo que necesites." },
  { q: "¿Pueden hacer un asistente con IA para mi web?", a: "Sí. Responde preguntas frecuentes 24/7, orienta a tus clientes, toma reservas o pedidos y los pasa a tu WhatsApp. Se cotiza sin costo." },
  { q: "¿Puedo comprar solo el dominio?", a: "Sí. Te ayudamos a elegir y registrar tu dominio, como tuempresa.com o tuempresa.pe, y te enviamos la cotización sin costo." },
  { q: "¿Puedo pedir varios servicios juntos?", a: "Sí. Web, app, sistema, asistente con IA, dominio y correo: te cotizamos todo en una sola propuesta." },
  { q: "¿Cuánto cuesta renovar el correo?", a: "Te decimos el precio de renovación antes de que pagues el primer año." },
];

/** Texto con los datos oficiales que recibe la IA de Nexo. Se arma solo desde lo de arriba. */
export function datosParaNexo(): string {
  return [
    "SERVICIOS (datos oficiales, no hay otros):",
    ...SERVICIOS.map((s) => `- ${s.paraNexo}`),
    "",
    `FORMA DE TRABAJO: ${FORMA_DE_TRABAJO.join(" → ")}. El cliente ve y aprueba el diseño antes de programar.`,
    "Se pueden pedir varios servicios juntos y se cotizan en una sola propuesta.",
  ].join("\n");
}
