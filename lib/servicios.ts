// FUENTE ÚNICA de servicios, precios y forma de trabajo.
// La web (Servicios, Precios, Pasos, SEO) y Nexo (lib/bot.ts y la IA) leen de aquí.
// Para cambiar un precio o un servicio, edita SOLO este archivo.

export const NOTA_PRECIOS = "El equipo confirma tu cotización según lo que necesitas";

/** Planes de páginas web. Los muestra Precios y los conoce Nexo. */
export type PlanWeb = {
  id: string; nombre: string; precio: number;
  /** true = el precio se muestra como "Desde S/ …". */ esDesde?: boolean;
  plazo: string; texto: string; incluye: string[]; destacado?: boolean;
  /** Mensaje que se escribe solo en WhatsApp al tocar el botón del plan. */ mensaje: string;
  /** utm_campaign del botón. */ campana: string
};
export const PLANES_WEB: PlanWeb[] = [
  {
    id: "landing", nombre: "Landing Page", precio: 540, plazo: "5 a 7 días hábiles", campana: "landing_page",
    mensaje: "Hola, NEXUS. Estoy interesado en contratar una Landing Page de S/ 540. Quisiera conocer qué incluye y cómo puedo empezar.",
    texto: "Para emprendedores y profesionales.",
    incluye: ["Una página personalizada", "Diseño responsive", "WhatsApp y formulario"],
  },
  {
    id: "empresarial", nombre: "Web Empresarial", precio: 820, plazo: "unas 2 semanas", destacado: true, campana: "web_empresarial",
    mensaje: "Hola, NEXUS. Necesito una Web Empresarial de S/ 820 para mi empresa. ¿Podrían enviarme más información?",
    texto: "Para empresas que quieren mostrar sus servicios y recibir clientes.",
    incluye: ["Hasta 3 páginas", "Diseño personalizado", "WhatsApp y formularios", "SEO básico", "Dominio .com por 1 año"],
  },
  {
    id: "corporativa", nombre: "Web Corporativa", precio: 1200, plazo: "unas 3 semanas", campana: "web_corporativa",
    mensaje: "Hola, NEXUS. Me interesa la Web Corporativa de S/ 1,200. ¿Podrían enviarme más información?",
    texto: "Para marcas que necesitan más páginas, animaciones y portafolio.",
    incluye: ["Hasta 5 páginas", "Diseño avanzado", "Animaciones", "Portafolio y galerías", "Formularios avanzados", "SEO básico", "Dominio .com por 1 año"],
  },
  {
    id: "tienda", nombre: "Tienda Virtual", precio: 1990, esDesde: true, plazo: "3 a 4 semanas", campana: "tienda_virtual",
    mensaje: "Hola, NEXUS. Quiero crear una tienda virtual para mi negocio (desde S/ 1,990). Me gustaría conocer sus funcionalidades.",
    texto: "Tu catálogo en línea para vender y recibir pedidos.",
    incluye: ["Catálogo de productos", "Carrito de compras", "Gestión de productos", "Pedidos online", "Integración de pagos según alcance", "Dominio .com por 1 año"],
  },
];

/** Precio para mostrar: "S/ 1,000". */
export const soles = (n: number) => `S/ ${n.toLocaleString("en-US")}`;

/**
 * Promoción temporal. Se muestra SOLA entre `inicio` y `fin` (hora de Lima, -05:00):
 * antes o después de esas fechas desaparece de la web, de Nexo y de la imagen para compartir.
 * Para una nueva promo, cambia solo este bloque.
 */
const PROMO_BASE = {
  nombre: "Promoción de Navidad",
  /** Versiones cortas para espacios chicos (cinta de la tarjeta, botón fijo en celular). */
  etiqueta: "Navidad",
  corto: "Landing + dominio",
  inicio: "2026-11-27T00:00:00-05:00",
  fin: "2026-12-31T23:59:59-05:00",
  finTexto: "31 de diciembre",
  /** Plan de PLANES_WEB al que se aplica. */ planId: "landing",
  precio: 350,
  producto: "Landing Page + dominio .com",
  /** Lo que la promo suma a la lista del plan. */ extra: "Dominio .com por 1 año incluido",
  condiciones: "El hosting se cotiza aparte.",
  campana: "promocion_navidad",
};
const planPromo = PLANES_WEB.find((p) => p.id === PROMO_BASE.planId)!;
export const PROMOCION = {
  ...PROMO_BASE,
  plan: planPromo,
  precioNormal: planPromo.precio,
  ahorro: planPromo.precio - PROMO_BASE.precio,
  mensaje: `Hola, NEXUS. Me interesa la ${PROMO_BASE.nombre}: ${PROMO_BASE.producto} por 1 año por ${soles(PROMO_BASE.precio)}.`,
};

/** ¿La promo está vigente ahora? */
export const promoActiva = (ahora = new Date()) =>
  ahora >= new Date(PROMOCION.inicio) && ahora <= new Date(PROMOCION.fin);

/** Días que le quedan a la promo, contando hoy (1 = último día). */
export const diasPromo = (ahora = new Date()) =>
  Math.max(0, Math.ceil((new Date(PROMOCION.fin).getTime() - ahora.getTime()) / 86_400_000));

/** "Quedan 35 días" / "¡Último día!" */
export const quedanPromo = (ahora = new Date()) => {
  const d = diasPromo(ahora);
  return d <= 1 ? "¡Último día!" : `Quedan ${d} días`;
};

/** Lo que Nexo sabe de la promo. Se calcula en cada mensaje para que se apague sola al terminar. */
export function promoParaNexo(ahora = new Date()): string {
  if (!promoActiva(ahora)) return "PROMOCIÓN: no hay ninguna promoción activa. Si preguntan, di que por ahora no hay promociones y da los precios normales.";
  return `PROMOCIÓN ACTIVA (${PROMOCION.nombre}): ${PROMOCION.producto} por 1 año a ${soles(PROMOCION.precio)} (precio normal de la ${PROMOCION.plan.nombre}: ${soles(PROMOCION.precioNormal)}, ahorra ${soles(PROMOCION.ahorro)}). Válida hasta el ${PROMOCION.finTexto} (${quedanPromo(ahora).toLowerCase()}). Incluye: ${[PROMOCION.extra, ...PROMOCION.plan.incluye, "SEO básico"].join(", ")}. ${PROMOCION.condiciones} Cuando hablen de páginas web o precios, menciónala primero.`;
}

/** Correo corporativo (con tu dominio). Lo muestra Precios debajo de los planes y lo conoce Nexo. */
export type PlanCorreo = { id: string; nombre: string; precio: number; detalle: string; destacado?: boolean; mensaje: string; campana: string };
export const CORREO = {
  titulo: "Correo corporativo",
  texto: "Da una imagen seria desde el primer mensaje con correos a nombre de tu empresa.",
  ejemplo: "ventas@tuempresa.com",
  puntos: ["Con tu propio dominio", "Lo configuramos por ti", "En tu celular y computadora"],
  nota: "Precios por 1 año · el dominio .pe se cotiza aparte",
  planes: [
    {
      id: "correo1", nombre: "1 correo + dominio .com", precio: 250, detalle: "Ideal para empezar", campana: "correo_1",
      mensaje: "Hola, NEXUS. Me interesa el plan de 1 correo corporativo + dominio .com por S/ 250. ¿Podrían darme más información?",
    },
    {
      id: "correo4", nombre: "4 correos + dominio .com", precio: 550, detalle: "Para tu equipo", destacado: true, campana: "correo_4",
      mensaje: "Hola, NEXUS. Me interesa el plan de 4 correos corporativos + dominio .com por S/ 550. ¿Podrían darme más información?",
    },
    {
      id: "correo3web", nombre: "3 correos para tu web", precio: 350, detalle: "Si ya tienes tu web con nosotros", campana: "correo_3_web",
      mensaje: "Hola, NEXUS. Ya tengo (o voy a contratar) mi web con ustedes y quiero agregar 3 correos corporativos por S/ 350.",
    },
  ] as PlanCorreo[],
  paraNexo: "Correo corporativo con el dominio del cliente (por ejemplo ventas@tuempresa.com). Precios por 1 año: 1 correo + dominio .com S/ 250; 4 correos + dominio .com S/ 550; 3 correos para clientes que ya tienen o contratan su web con NEXUSDV (el dominio .com ya viene en la web) S/ 350. Si quieren dominio .pe, se cotiza aparte, sin montos. La renovación anual se informa antes de contratar.",
};

/** Renovaciones y extras que se muestran en Precios (debajo de los planes). */
export const RENOVACIONES = [
  "Hosting: incluido el primer año en la Tienda Virtual; en los demás planes se cotiza aparte.",
  "Renovación anual informada antes de contratar.",
  "Dominio .com por 1 año incluido desde la Web Empresarial; otras extensiones se cotizan.",
  "Mantenimiento opcional.",
];

/** Cómo trabajamos después de cotizar. La sección de confianza y Nexo leen de aquí. */
export const POLITICAS = {
  cambios: "Incluye 1 ronda de cambios en el diseño antes de programar. Los cambios posteriores se cotizan.",
  administra: "NEXUSDV administra tu web y la mantiene en línea. Tú nos escribes por WhatsApp cuando necesites algo.",
  dominio: "Sí. Siempre que sea posible, el dominio se registra a tu nombre y es tuyo. NEXUSDV se encarga de toda la configuración técnica.",
  soporte: "30 días de soporte sin costo después de publicar, para errores y ajustes menores. Luego puedes tomar un plan de mantenimiento mensual, que se cotiza.",
  plazos: "Desde que apruebas el diseño: Landing Page de 5 a 7 días hábiles, Web Empresarial unas 2 semanas, Web Corporativa unas 3 semanas y Tienda Virtual de 3 a 4 semanas. Apps y sistemas según lo que necesites.",
  hosting: "La Tienda Virtual incluye hosting el primer año; en los demás planes el hosting se cotiza aparte. La Web Empresarial, la Web Corporativa y la Tienda Virtual incluyen dominio .com por 1 año; en la Landing Page el dominio .com es opcional. La renovación anual se informa antes de contratar y el mantenimiento es opcional.",
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
    precio: "Desde S/ 540 · landing, web empresarial, corporativa o tienda",
    puntos: ["Diseño hecho para tu marca", "Se ve perfecta en celular", "Botón directo a tu WhatsApp", "Configuración SEO básica para facilitar la indexación en Google"],
    paraNexo: "Páginas web a medida: diseño propio, adaptadas a celular, botón a WhatsApp, con configuración SEO básica para facilitar la indexación en Google. Planes: Landing Page S/ 540 (una página personalizada, diseño responsive, WhatsApp y formulario, dominio .com opcional; 5 a 7 días hábiles). Web Empresarial S/ 820, la más recomendada (hasta 5 páginas, diseño personalizado, WhatsApp y formularios, SEO básico, SSL, dominio .com por 1 año, configuración DNS; unas 2 semanas). Web Corporativa S/ 1,200 (hasta 8 páginas, diseño avanzado, animaciones, portafolio y galerías, formularios avanzados, SEO básico, dominio .com por 1 año; unas 3 semanas). Tienda Virtual desde S/ 1,990 (catálogo de productos, carrito de compras, gestión de productos, pedidos online, integración de pagos según alcance, dominio .com por 1 año; 3 a 4 semanas). Solo la Tienda Virtual incluye hosting el primer año; en los demás planes el hosting se cotiza aparte. Los plazos cuentan desde que el cliente aprueba el diseño.",
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

/** Lo que muestra la sección Precios: los 4 planes web y una línea para lo que va a medida. */
export const planes = PLANES_WEB;
export const A_MEDIDA = { nombre: "Apps, sistemas y asistentes con IA", texto: "Para vender, atender y ordenar tu negocio. Se cotizan según lo que necesitas.", precio: "A medida", boton: "Cotizar mi proyecto" };

export const preguntas = [
  { q: "¿Cuánto cuesta una página web?", a: "Landing Page S/ 540, Web Empresarial S/ 820, Web Corporativa S/ 1,200 y Tienda Virtual desde S/ 1,990. Desde la Web Empresarial incluyen dominio .com por 1 año. Te enviamos la cotización exacta sin costo." },
  { q: "¿Hacen apps para Android y iPhone?", a: "Sí. Desarrollamos tu app para los dos y te ayudamos a publicarla en Google Play y App Store." },
  { q: "¿Qué tipo de sistemas hacen?", a: "Sistemas a medida: ventas, inventario, reservas, fidelización de clientes y más. Te cotizamos según lo que necesites." },
  { q: "¿Pueden hacer un asistente con IA para mi web?", a: "Sí. Responde preguntas frecuentes 24/7, orienta a tus clientes, toma reservas o pedidos y los pasa a tu WhatsApp. Se cotiza sin costo." },
  { q: "¿Venden correos corporativos?", a: "Sí, con tu dominio (como ventas@tuempresa.com). 1 correo + dominio .com S/ 250, 4 correos + dominio .com S/ 550, y si ya tienes tu web con nosotros, 3 correos por S/ 350. Precios por 1 año; el dominio .pe se cotiza aparte." },
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
    `CORREO CORPORATIVO: ${CORREO.paraNexo}`,
    // La promoción NO va aquí: app/api/chat/route.ts la agrega en cada mensaje con promoParaNexo().
  ].join("\n");
}
