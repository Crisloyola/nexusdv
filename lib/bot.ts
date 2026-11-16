// Respuestas del asistente (modo sin IA). Edita aquí los textos.
// <b>...</b> pone negrita. \n es un salto de línea.

export type Tema = "ia" | "web" | "app" | "sys" | "mail" | "price" | "proj" | "time" | "hi" | "human" | "contact" | "thanks" | "none";

export const MENU = ["Páginas web", "Apps", "Sistemas", "Asistentes con IA", "Precios", "Ver proyectos"] as const;
export const CHIP_TEMA: Record<string, Tema> = {
  "Páginas web": "web", Apps: "app", Sistemas: "sys", "Asistentes con IA": "ia", Precios: "price", "Ver proyectos": "proj",
};

export const SALUDO =
  "¡Hola! Soy <b>Nexo</b>, el asistente de <b>NEXUSDV</b>. Hacemos páginas web, tiendas virtuales, apps, sistemas a medida y asistentes con IA como yo.\n\n¿Qué te interesa?";

export const RESPUESTAS: Record<Tema, { tema: string; msg: string; chips: string[]; ir?: string }> = {
  ia: { tema: "un asistente con IA", msg: "¡Sí, hacemos asistentes con IA para tu web! 🤖 Yo soy un ejemplo: atiendo a cualquier hora y te paso con el equipo por WhatsApp.\nTu asistente puede:\n• Responder preguntas frecuentes 24/7\n• Orientar a tus clientes\n• Tomar reservas o pedidos\n• Pasar la conversación a tu WhatsApp\n\n💰 Es <b>a medida</b> y la cotización es <b>sin costo</b>.", chips: ["Páginas web", "Precios", "Ver proyectos"] },
  web: { tema: "una página web", msg: "Hacemos <b>páginas web a medida</b> para tu negocio:\n• Diseño propio, sin plantillas\n• Adaptada al celular\n• Botón directo a tu WhatsApp\n• Configuración SEO básica para Google\n\n💰 <b>Landing</b> desde S/ 300, <b>Web empresarial</b> desde S/ 600 y <b>Tienda virtual</b> desde S/ 1,000 (incluye hosting el primer año).\nAntes de programar te mostramos el diseño para que lo apruebes.", chips: ["Precios", "Ver proyectos", "Asistentes con IA"] },
  app: { tema: "una app", msg: "Desarrollamos <b>apps para Android y iPhone</b>: para que tus clientes compren, reserven, sigan sus pedidos o acumulen puntos desde el celular.\n\nTambién te ayudamos a publicarla en <b>Google Play y App Store</b>.\n\nEl costo y el tiempo dependen de lo que necesites (funciones, usuarios, pagos, panel). Cuéntanos tu idea y te cotizamos sin costo.", chips: ["Sistemas", "Precios", "Ver proyectos"] },
  sys: { tema: "un sistema", msg: "Creamos <b>sistemas a medida</b>: ventas, inventario, reservas, fidelización de clientes y más, con un panel para administrar todo.\n\nUn ejemplo es <b>Creatrix</b>, un sistema de puntos y promociones que entregamos.\n\nEl costo y el tiempo dependen de lo que necesites. Te cotizamos sin costo.", chips: ["Apps", "Precios", "Ver proyectos"] },
  mail: { tema: "un dominio", msg: "🌐 El dominio de tu web se cotiza aparte, según la extensión que elijas (.com o .pe).\n\nLa Tienda virtual incluye hosting el primer año ✅; en Landing y Web empresarial el hosting se cotiza aparte.\n\n👇 Toca <b>Hablar por WhatsApp</b> y el equipo te lo cotiza.", chips: ["Páginas web", "Precios"] },
  price: { tema: "una cotización", msg: "Así son nuestros precios:\n• 💻 <b>Landing Page:</b> desde S/ 300\n• 🏢 <b>Web empresarial:</b> desde S/ 600\n• 🛒 <b>Tienda virtual:</b> desde S/ 1,000\n• ⚙️ <b>Apps, sistemas e IA:</b> a medida, cotización sin costo\n\nCuéntanos qué necesitas por WhatsApp o al correo <b>contacto@nexusdv.pe</b> y te enviamos la propuesta.\n\n👇 También puedes tocar el botón <b>Hablar por WhatsApp</b> aquí abajo.", chips: ["Páginas web", "Apps", "Sistemas"] },
  proj: { tema: "sus proyectos", msg: "Algunos proyectos entregados:\n• <b>LML Agency</b>: página web de una productora audiovisual\n• <b>LML Agency · Alquiler</b>: página de alquiler de equipos de audio y video\n• <b>Creatrix</b>: sistema de fidelización con puntos y promociones\n• <b>Creatrix · Control de ventas</b>: sistema de control de ventas a medida\n• <b>Franyer Cargo</b>: web de una agencia de carga y aduanas con cotizador a WhatsApp\n• <b>Mara Capital</b>: web de préstamos en línea con simulador\n\nTe llevo a la sección de proyectos 👇", chips: ["Páginas web", "Sistemas"], ir: "#proyectos" },
  time: { tema: "los tiempos de entrega", msg: "El tiempo depende de lo que necesites ⏱️\nAl cotizar sin costo te confirmamos la <b>fecha exacta</b> de entrega.\n\nAntes de programar te mostramos el diseño para que lo apruebes.", chips: ["Precios", "Páginas web"] },
  hi: { tema: "información", msg: "¡Hola! 😊 ¿En qué te puedo ayudar?", chips: [...MENU] },
  human: { tema: "información", msg: "Claro, te paso con una persona del equipo por WhatsApp. Te responden lo antes posible.\n\n👇 Toca el botón <b>Hablar por WhatsApp</b> aquí abajo y escríbenos directo.", chips: [] },
  contact: { tema: "información", msg: "Puedes escribirnos por:\n• WhatsApp: <b>Contáctanos ahora</b>\n• Correo: <b>contacto@nexusdv.pe</b>\n• Instagram: <b>@nexusdv.pe</b>\n\n👇 También puedes tocar el botón <b>Hablar por WhatsApp</b> aquí abajo.", chips: ["Páginas web", "Apps", "Sistemas"] },
  thanks: { tema: "información", msg: "¡Con gusto! 🙌 Si quieres avanzar, escríbenos por WhatsApp o a <b>contacto@nexusdv.pe</b> y te enviamos tu cotización sin costo.\n\n👇 También puedes tocar el botón <b>Hablar por WhatsApp</b> aquí abajo.", chips: [] },
  none: { tema: "información", msg: "No estoy seguro de haberte entendido 🤔 Elige una opción o toca el botón <b>Hablar por WhatsApp</b> 👇 para escribirle directo a nuestro equipo.", chips: [...MENU] },
};

// El orden importa: gana la primera coincidencia.
const CLAVES: [Tema, RegExp][] = [
  ["human", /(persona|humano|asesor|hablar con|llamar|llamada)/],
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
