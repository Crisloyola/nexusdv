// Respuestas del asistente (modo sin IA). Edita aquí los textos.
// <b>...</b> pone negrita. \n es un salto de línea.
// La promoción sale de lib/servicios.ts (PROMOCION) y se apaga sola cuando termina.
import { PROMOCION, promoActiva, quedanPromo, soles } from "./servicios";

const PROMO = promoActiva();
const P = PROMOCION;
export const CHIP_PROMO = "🎄 Promo Navidad";
const lineaPromo = PROMO
  ? `🎄 <b>${P.nombre}:</b> ${P.producto} por 1 año a <b>${soles(P.precio)}</b> (antes ${soles(P.precioNormal)}). Hasta el ${P.finTexto}.\n\n`
  : "";

export type Tema = "ia" | "web" | "app" | "sys" | "mail" | "price" | "proj" | "time" | "hi" | "promo" | "human" | "contact" | "thanks" | "none";

export const MENU: string[] = [...(PROMO ? [CHIP_PROMO] : []), "Páginas web", "Apps", "Sistemas", "Asistentes con IA", "Precios", "Correo corporativo", "Ver proyectos"];
export const CHIP_TEMA: Record<string, Tema> = {
  [CHIP_PROMO]: "promo",
  "Páginas web": "web", Apps: "app", Sistemas: "sys", "Asistentes con IA": "ia", Precios: "price", "Correo corporativo": "mail", "Ver proyectos": "proj",
};

export const SALUDO =
  "¡Hola! Soy <b>Nexo</b>, el asistente de <b>NEXUSDV</b>. Hacemos páginas web, tiendas virtuales, apps, sistemas a medida y asistentes con IA como yo.\n\n" + lineaPromo + "¿Qué te interesa?";

export const RESPUESTAS: Record<Tema, { tema: string; msg: string; chips: string[]; ir?: string }> = {
  ia: { tema: "un asistente con IA", msg: "¡Sí, hacemos asistentes con IA para tu web! 🤖 Yo soy un ejemplo: atiendo a cualquier hora y te paso con el equipo por WhatsApp.\nTu asistente puede:\n• Responder preguntas frecuentes 24/7\n• Orientar a tus clientes\n• Tomar reservas o pedidos\n• Pasar la conversación a tu WhatsApp\n\n💰 Es <b>a medida</b> y la cotización es <b>sin costo</b>.", chips: ["Páginas web", "Precios", "Ver proyectos"] },
  web: { tema: "una página web", msg: "Hacemos <b>páginas web a medida</b> para tu negocio:\n• Diseño propio, sin plantillas\n• Adaptada al celular\n• Botón directo a tu WhatsApp\n• Configuración SEO básica para Google\n\n" + lineaPromo + "💰 <b>Landing</b> S/ 540, <b>Web Empresarial</b> S/ 820, <b>Web Corporativa</b> S/ 1,200 y <b>Tienda Virtual</b> desde S/ 1,990.\nAntes de programar te mostramos el diseño para que lo apruebes.", chips: [...(PROMO ? [CHIP_PROMO] : []), "Precios", "Ver proyectos"] },
  app: { tema: "una app", msg: "Desarrollamos <b>apps para Android y iPhone</b>: para que tus clientes compren, reserven, sigan sus pedidos o acumulen puntos desde el celular.\n\nTambién te ayudamos a publicarla en <b>Google Play y App Store</b>.\n\nEl costo y el tiempo dependen de lo que necesites (funciones, usuarios, pagos, panel). Cuéntanos tu idea y te cotizamos sin costo.", chips: ["Sistemas", "Precios", "Ver proyectos"] },
  sys: { tema: "un sistema", msg: "Creamos <b>sistemas a medida</b>: ventas, inventario, reservas, fidelización de clientes y más, con un panel para administrar todo.\n\nUn ejemplo es <b>Creatrix</b>, un sistema de puntos y promociones que entregamos.\n\nEl costo y el tiempo dependen de lo que necesites. Te cotizamos sin costo.", chips: ["Apps", "Precios", "Ver proyectos"] },
  mail: { tema: "correo corporativo o dominio", msg: "📧 Vendemos <b>correo corporativo</b> con tu dominio (como ventas@tuempresa.com), precio por 1 año:\n• <b>1 correo + dominio .com:</b> S/ 250\n• <b>4 correos + dominio .com:</b> S/ 550 (el más recomendado)\n• <b>3 correos para tu web</b> (si ya tienes tu web con nosotros): S/ 350\nEl dominio .pe se cotiza aparte.\n\n🌐 La Web Empresarial, la Web Corporativa y la Tienda Virtual ya incluyen <b>dominio .com por 1 año</b> ✅.\n\nLa Tienda Virtual incluye hosting el primer año; en los demás planes el hosting se cotiza aparte.\n\n👇 Toca <b>Hablar por WhatsApp</b> y el equipo te lo cotiza.", chips: ["Páginas web", "Precios"] },
  price: { tema: "una cotización", msg: "Así son nuestros precios:\n" + (PROMO ? `• 🎄 <b>${P.nombre}:</b> ${P.producto} a ${soles(P.precio)} (hasta el ${P.finTexto})\n` : "") + "• 💻 <b>Landing Page:</b> S/ 540\n• 🏢 <b>Web Empresarial:</b> S/ 820 (la más recomendada)\n• ✨ <b>Web Corporativa:</b> S/ 1,200\n• 🛒 <b>Tienda Virtual:</b> desde S/ 1,990\n• 📧 <b>Correo corporativo:</b> desde S/ 250 (1 correo + dominio .com)\n• ⚙️ <b>Apps, sistemas e IA:</b> a medida, cotización sin costo\n\nCuéntanos qué necesitas por WhatsApp o al correo <b>contacto@nexusdv.pe</b> y te enviamos la propuesta.\n\n👇 También puedes tocar el botón <b>Hablar por WhatsApp</b> aquí abajo.", chips: ["Páginas web", "Apps", "Sistemas"] },
  proj: { tema: "sus proyectos", msg: "Algunos proyectos entregados:\n• <b>LML Agency</b>: página web de una productora audiovisual\n• <b>LML Agency · Alquiler</b>: página de alquiler de equipos de audio y video\n• <b>Creatrix</b>: sistema de fidelización con puntos y promociones\n• <b>Creatrix · Control de ventas</b>: sistema de control de ventas a medida\n• <b>Franyer Cargo</b>: web de una agencia de carga y aduanas con cotizador a WhatsApp\n• <b>Mara Capital</b>: web de préstamos en línea con simulador\n\nTe llevo a la sección de proyectos 👇", chips: ["Páginas web", "Sistemas"], ir: "#proyectos" },
  time: { tema: "los tiempos de entrega", msg: "El tiempo depende de lo que necesites ⏱️\nAl cotizar sin costo te confirmamos la <b>fecha exacta</b> de entrega.\n\nAntes de programar te mostramos el diseño para que lo apruebes.", chips: ["Precios", "Páginas web"] },
  promo: PROMO
    ? { tema: "la Promoción de Navidad", msg: `🎄 <b>${P.nombre}</b>\n${P.producto} por 1 año a <b>${soles(P.precio)}</b>. Antes ${soles(P.precioNormal)}: <b>ahorras ${soles(P.ahorro)}</b> 💰\n\nIncluye:\n${[P.extra, ...P.plan.incluye, "SEO básico"].map((x) => `• ${x}`).join("\n")}\n\n⏱️ Válida hasta el ${P.finTexto} (${quedanPromo().toLowerCase()}). ${P.condiciones}\n\n📧 ¿Quieres correos con tu dominio (como ventas@tuempresa.com)? Puedes agregar <b>3 correos por S/ 350</b> al año.

👇 Toca <b>Hablar por WhatsApp</b> y el equipo te la separa.`, chips: ["Correo corporativo", "Páginas web", "Ver proyectos"] }
    : { tema: "información", msg: "Por ahora no tenemos promociones activas 😊 Igual te cotizamos sin costo.\n\nLa <b>Landing Page</b> cuesta S/ 540 y la <b>Web Empresarial</b> S/ 820, con dominio .com por 1 año.", chips: ["Precios", "Páginas web"] },
  hi: { tema: "información", msg: "¡Hola! 😊 ¿En qué te puedo ayudar?", chips: [...MENU] },
  human: { tema: "información", msg: "Claro, te paso con una persona del equipo por WhatsApp. Te responden lo antes posible.\n\n👇 Toca el botón <b>Hablar por WhatsApp</b> aquí abajo y escríbenos directo.", chips: [] },
  contact: { tema: "información", msg: "Puedes escribirnos por:\n• WhatsApp: <b>Contáctanos ahora</b>\n• Correo: <b>contacto@nexusdv.pe</b>\n• Instagram: <b>@nexusdv.pe</b>\n\n👇 También puedes tocar el botón <b>Hablar por WhatsApp</b> aquí abajo.", chips: ["Páginas web", "Apps", "Sistemas"] },
  thanks: { tema: "información", msg: "¡Con gusto! 🙌 Si quieres avanzar, escríbenos por WhatsApp o a <b>contacto@nexusdv.pe</b> y te enviamos tu cotización sin costo.\n\n👇 También puedes tocar el botón <b>Hablar por WhatsApp</b> aquí abajo.", chips: [] },
  none: { tema: "información", msg: "No estoy seguro de haberte entendido 🤔 Elige una opción o toca el botón <b>Hablar por WhatsApp</b> 👇 para escribirle directo a nuestro equipo.", chips: [...MENU] },
};

// El orden importa: gana la primera coincidencia.
const CLAVES: [Tema, RegExp][] = [
  ["human", /(persona|humano|asesor|hablar con|llamar|llamada)/],
  ["promo", /(promo|navid|oferta|descuento|\b350\b)/],
  // \bia\b: que "familia" o "farmacia" no cuenten como "IA"
  ["ia", /(chat ?bot|\bbots?\b|asistente|\bia\b|inteligencia artificial|como tu\b|como nexo)/],
  ["contact", /(contacto|correo de ustedes|telefono|numero|instagram|whats ?app|wsp|donde estan|ubicacion)/],
  ["mail", /(correo|email|e-mail|gmail|dominio|\.com|\.pe|hosting)/],
  // \bapps?\b: que "whatsapp" no cuente como "app"
  ["app", /(\bapps?\b|aplicaci|android|iphone|\bios\b|play ?store|app ?store|celular)/],
  ["sys", /(sistema|inventario|venta|reserva|punto|fideliz|panel|software|erp|crm)/],
  ["web", /(web|pagina|sitio|landing|tienda online|e-?commerce|google)/],
  ["proj", /(proyecto|trabajo|portafolio|ejemplo|clientes)/],
  ["time", /(tiempo|demora|cuando|dias|semanas|entrega|plazo)/],
  ["price", /(precio|cuanto|costo|cuesta|cotiz|tarifa|presupuesto|pago)/],
  ["hi", /^(hola|buenas|buenos|hey|ola|que tal)/],
  ["thanks", /(gracias|^ok$|listo|perfecto|genial)/],
];

export function detectarTema(texto: string): Tema {
  const n = texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  for (const [tema, re] of CLAVES) if (re.test(n)) return tema;
  return "none";
}
