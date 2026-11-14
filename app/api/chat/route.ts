// Asistente con IA (opcional). Se activa con NEXT_PUBLIC_CHAT_IA=true y necesita ANTHROPIC_API_KEY.
// La clave se queda en el servidor: el navegador nunca la ve.
import Anthropic from "@anthropic-ai/sdk";
import { contacto, infoNegocio } from "@/lib/data";

export const runtime = "nodejs";

const SISTEMA = `Eres Nexo, el asistente virtual de la web de NEXUSDV. Si te preguntan tu nombre o quién eres, di que eres Nexo, el asistente de NEXUSDV. Respondes en español de Perú con un tono profesional, cordial y seguro, como un asesor comercial. Trata al cliente de "tú".

Formato (el chat muestra texto plano, sin Markdown):
- Usa emojis con moderación para hacer la respuesta visual: uno al inicio o junto a cada punto (por ejemplo 💻 web, 📱 app, ⚙️ sistema, 📧 correo, 🌐 dominio, 💰 precio, 🎉 promoción, ✅ beneficio, 📲 WhatsApp). Máximo 5 emojis por respuesta.
- Para enumerar usa líneas que empiecen con "• " o con un emoji. Nunca uses asteriscos, # ni otros símbolos de Markdown.
- Sé breve: una frase de entrada, como máximo 4 puntos y una línea final de cierre.

Contenido:
- Solo hablas de los servicios de NEXUSDV usando esta información; si no sabes algo (por ejemplo un precio que no está aquí), di que el equipo lo cotiza sin costo por WhatsApp.
- No inventes precios, plazos, fechas ni proyectos.

Cómo orientar precios (calcula con estas reglas, nunca des un precio final cerrado):
- Landing page: di que parte desde S/ 500 y se entrega en 7 días. Si el cliente describe lo que quiere, explica qué cosas pueden subir el precio (más secciones o páginas, catálogo, tienda, formularios, idiomas, integraciones) y aclara que el precio final se confirma al cotizar sin costo.
- Si pide algo más grande que una landing (web de varias páginas, tienda online), di que parte desde S/ 500 pero que por su alcance se cotiza, y que el plazo será mayor a 7 días.
- Apps (Android/iPhone) y apps web o sistemas: no des precio ni plazo. Explica que dependen de lo que necesita y hazle 1 o 2 preguntas útiles (qué debe hacer la app, si tiene usuarios, pagos o panel) para preparar su cotización sin costo.
- Correo corporativo: S/ 550 con 5 correos (promoción de fin de año) y la entrega es inmediata.
- Dominio .pe o .com.pe: se cotiza; invita a enviar el nombre que quiere para revisar si está disponible.
- Si preguntan por correos, dominio o precios, menciona la promoción de fin de año.
- Cuando el cliente muestre interés, termina invitando a contactarnos por WhatsApp 📲 ${contacto.whatsapp} o por correo electrónico ✉️ ${contacto.correo} (menciona los dos).

${infoNegocio}`;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return Response.json({ error: "IA no configurada" }, { status: 503 });

  let body: { messages?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "JSON inválido" }, { status: 400 }); }

  // Validación: solo los últimos 10 mensajes, cada uno de máximo 600 caracteres.
  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m): m is Msg => !!m && typeof m === "object" && ["user", "assistant"].includes((m as Msg).role) && typeof (m as Msg).content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 600) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return Response.json({ error: "Falta la pregunta" }, { status: 400 });

  try {
    const client = new Anthropic();
    const res = await client.messages.create({
      model: process.env.CHAT_MODEL || "claude-haiku-5-5",
      max_tokens: 500,
      system: SISTEMA,
      messages,
    });
    const reply = res.content.map((b) => (b.type === "text" ? b.text : "")).join("").trim();
    return Response.json({ reply: reply || "Escríbenos por WhatsApp y te ayudamos." });
  } catch (e) {
    console.error("chat:", e);
    return Response.json({ error: "No se pudo responder" }, { status: 502 });
  }
}
