// Asistente con IA (opcional). Se activa con NEXT_PUBLIC_CHAT_IA=true y necesita ANTHROPIC_API_KEY.
// La clave se queda en el servidor: el navegador nunca la ve.
import Anthropic from "@anthropic-ai/sdk";
import { infoNegocio } from "@/lib/data";

export const runtime = "nodejs";

const SISTEMA = `Eres el asistente de la web de NEXUSDV. Respondes en español de Perú, amable y breve (máximo 4 oraciones).
Solo hablas de los servicios de NEXUSDV usando esta información; si no sabes algo (por ejemplo un precio que no está aquí), di que el equipo lo cotiza sin costo por WhatsApp.
No inventes precios, plazos ni proyectos. Termina invitando a escribir al WhatsApp cuando el cliente muestre interés.

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
      max_tokens: 400,
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
