// Respuestas del asistente (modo sin IA). Edita aquí los textos.
// <b>...</b> pone negrita. \n es un salto de línea.

export type Tema = "web" | "app" | "sys" | "mail" | "price" | "proj" | "time" | "hi" | "human" | "contact" | "thanks" | "none";

export const MENU = ["Páginas web", "Apps", "Sistemas", "Dominio y correo", "Precios", "Ver proyectos"] as const;
export const CHIP_TEMA: Record<string, Tema> = {
  "Páginas web": "web", Apps: "app", Sistemas: "sys", "Dominio y correo": "mail", Precios: "price", "Ver proyectos": "proj",
};

export const SALUDO =
  "¡Hola! 👋 Soy <b>Nexo</b>, el asistente de <b>NEXUSDV</b>.\nHacemos páginas web, apps para Android y iPhone, sistemas a medida, dominios y correos corporativos.\n\n¿Qué te interesa?";

export const RESPUESTAS: Record<Tema, { tema: string; msg: string; chips: string[]; ir?: string }> = {
  web: { tema: "una página web", msg: "Hacemos <b>páginas web a medida</b> para tu negocio:\n• Diseño propio, sin plantillas\n• Adaptada al celular\n• Botón directo a tu WhatsApp\n• Lista para aparecer en Google\n\n💰 Una <b>landing page desde S/ 500</b>, lista en <b>7 días</b>. Si necesitas más secciones o funciones, te cotizamos sin costo.\nAntes de programar te mostramos el diseño para que lo apruebes.", chips: ["Precios", "Ver proyectos", "Dominio y correo"] },
  app: { tema: "una app", msg: "Desarrollamos <b>apps para Android y iPhone</b>: para que tus clientes compren, reserven, sigan sus pedidos o acumulen puntos desde el celular.\n\nTambién te ayudamos a publicarla en <b>Google Play y App Store</b>.\n\nEl costo y el tiempo dependen de lo que necesites (funciones, usuarios, pagos, panel). Cuéntanos tu idea y te cotizamos sin costo.", chips: ["Sistemas", "Precios", "Ver proyectos"] },
  sys: { tema: "un sistema", msg: "Creamos <b>sistemas a medida</b>: ventas, inventario, reservas, fidelización de clientes y más, con un panel para administrar todo.\n\nUn ejemplo es <b>Creatrix</b>, un sistema de puntos y promociones que entregamos.\n\nEl costo y el tiempo dependen de lo que necesites. Te cotizamos sin costo.", chips: ["Apps", "Precios", "Ver proyectos"] },
  mail: { tema: "dominio y correo corporativo", msg: "🎉 <b>Promoción de fin de año</b>\nCon el <b>correo corporativo</b> dejas el Gmail personal y escribes con tu marca:\n🌐 Tu dominio (tuempresa.com)\n📧 <b>5 correos</b> con los nombres que elijas\n✅ Configurado en celular y computadora\n\n💰 Todo a <b>S/ 550 el primer año</b> y la entrega es <b>inmediata</b> ⚡\n\n¿Necesitas un dominio <b>.pe</b> o solo el dominio? También te lo cotizamos.", chips: ["Páginas web", "Precios"] },
  price: { tema: "una cotización", msg: "Así trabajamos los precios:\n• 💻 <b>Landing page:</b> desde S/ 500, lista en 7 días\n• 📱 <b>Apps, apps web y sistemas:</b> según lo que necesites, cotización sin costo\n• 🎉 <b>Dominio + 5 correos:</b> S/ 550 el primer año (promo fin de año)\n\nCuéntanos qué necesitas por WhatsApp o al correo <b>contacto@nexusdv.pe</b> y te enviamos la propuesta.", chips: ["Páginas web", "Apps", "Sistemas"] },
  proj: { tema: "sus proyectos", msg: "Algunos proyectos entregados:\n• <b>LML Agency</b>: página web de una productora audiovisual\n• <b>LML Agency · Alquiler</b>: página de alquiler de equipos de audio y video\n• <b>Creatrix</b>: sistema de fidelización con puntos y promociones\n\nTe llevo a la sección de proyectos 👇", chips: ["Páginas web", "Sistemas"], ir: "#proyectos" },
  time: { tema: "los tiempos de entrega", msg: "Estos son nuestros tiempos de entrega:\n• 💻 <b>Landing page:</b> 7 días\n• 📧 <b>Correo corporativo:</b> inmediato\n• 📱 <b>Apps y sistemas:</b> según lo que necesites; al cotizar te damos la fecha exacta", chips: ["Precios", "Páginas web"] },
  hi: { tema: "información", msg: "¡Hola! 😊 ¿En qué te puedo ayudar?", chips: [...MENU] },
  human: { tema: "información", msg: "Claro, te paso con una persona del equipo por WhatsApp. Te responden lo antes posible.", chips: [] },
  contact: { tema: "información", msg: "Puedes escribirnos por:\n• WhatsApp: <b>941 163 771</b>\n• Correo: <b>contacto@nexusdv.pe</b>\n• Instagram: <b>@nexusdvpe</b>", chips: ["Páginas web", "Apps", "Sistemas"] },
  thanks: { tema: "información", msg: "¡Con gusto! 🙌 Si quieres avanzar, escríbenos por WhatsApp o a <b>contacto@nexusdv.pe</b> y te enviamos tu cotización sin costo.", chips: [] },
  none: { tema: "información", msg: "No estoy seguro de haberte entendido 🤔 Elige una opción o escríbele directo a nuestro equipo por WhatsApp.", chips: [...MENU] },
};

// El orden importa: gana la primera coincidencia.
const CLAVES: [Tema, RegExp][] = [
  ["human", /(persona|humano|asesor|hablar con|llamar|llamada)/],
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
