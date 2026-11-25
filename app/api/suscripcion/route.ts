import nodemailer from "nodemailer";
import { contacto } from "@/lib/data";
import { SITIO_URL } from "@/lib/seo";

export const runtime = "nodejs";

const VENTANA_MS = 15 * 60 * 1000;
const MAX_INTENTOS = 3;
const intentos = new Map<string, { inicio: number; cantidad: number }>();

function excedeLimite(request: Request) {
  const ahora = Date.now();
  for (const [ip, registro] of intentos) {
    if (ahora - registro.inicio >= VENTANA_MS) intentos.delete(ip);
  }

  const ip = request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "desconocida";
  const registro = intentos.get(ip);
  if (registro && ahora - registro.inicio < VENTANA_MS) {
    if (registro.cantidad >= MAX_INTENTOS) return true;
    registro.cantidad += 1;
    return false;
  }

  if (intentos.size >= 5000) return true;
  intentos.set(ip, { inicio: ahora, cantidad: 1 });
  return false;
}

function escaparHtml(valor: string) {
  const entidades: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return valor.replace(/[&<>"']/g, (caracter) => entidades[caracter] ?? caracter);
}

function correoBienvenida(email: string) {
  const correoSeguro = escaparHtml(email);
  const html = `
    <!doctype html>
    <html>
      <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
      <body bgcolor="#111215" style="margin:0;padding:0;background-color:#111215;color:#f2f4ee">
        <table role="presentation" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#111215" style="width:100%;height:100%;min-height:100vh;border-collapse:collapse;background-color:#111215;font-family:Arial,Helvetica,sans-serif;color:#f2f4ee">
          <tr><td align="center" valign="top" bgcolor="#111215" style="padding:32px 16px;background-color:#111215">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#111215" style="max-width:560px;margin:0 auto;border:1px solid #2b2d31;border-radius:18px;background-color:#111215">
              <tr><td style="padding:28px 28px 8px">
                <a href="${SITIO_URL}" style="color:#f2f4ee;text-decoration:none;font-size:18px;font-weight:700">
                  <img src="${SITIO_URL}/favicon.svg" alt="" width="24" height="24" style="vertical-align:middle;margin-right:8px;border:0" />
                  NEXUSDV
                </a>
              </td></tr>
              <tr><td style="padding:20px 28px 28px">
                <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;color:#f2f4ee">¡Gracias por suscribirte!</h1>
                <p style="margin:0 0 22px;font-size:16px;line-height:1.6;color:#c3c7c0">Recibimos tu correo y ya formas parte de la comunidad de NEXUSDV. Te enviaremos novedades por aquí.</p>
                <a href="${SITIO_URL}" style="display:inline-block;padding:13px 20px;border-radius:10px;background:#c8f135;color:#0b0f14;text-decoration:none;font-size:15px;font-weight:700">Conocer NEXUSDV</a>
                <p style="margin:26px 0 0;font-size:13px;line-height:1.6;color:#a3aab1">¿No te suscribiste con ${correoSeguro}? Escríbenos a <a href="mailto:${contacto.correo}" style="color:#c8f135">${contacto.correo}</a>.</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>`;
  const texto = `¡Gracias por suscribirte!\n\nRecibimos tu correo y ya formas parte de la comunidad de NEXUSDV. Te enviaremos novedades por aquí.\n\nConoce NEXUSDV: ${SITIO_URL}\n\n¿No te suscribiste con ${email}? Escríbenos a ${contacto.correo}.`;
  return { html, text: texto };
}

function correoAviso(email: string) {
  return {
    subject: "Nueva suscripción en NEXUSDV",
    text: `Se suscribió una persona a las novedades de NEXUSDV.\n\nCorreo: ${email}\nFecha: ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}`,
    html: `<p>Se suscribió una persona a las novedades de NEXUSDV.</p><p><b>Correo:</b> <a href="mailto:${escaparHtml(email)}">${escaparHtml(email)}</a></p><p><b>Fecha:</b> ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}</p>`,
  };
}

export async function POST(request: Request) {
  const tipo = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!tipo.includes("application/json")) return Response.json({ error: "Se requiere JSON" }, { status: 415 });

  const largo = Number(request.headers.get("content-length") ?? 0);
  if (largo > 4096) return Response.json({ error: "Solicitud demasiado grande" }, { status: 413 });

  const origen = request.headers.get("origin");
  if (origen) {
    let urlOrigen: URL;
    try { urlOrigen = new URL(origen); } catch { return Response.json({ error: "Origen no válido" }, { status: 403 }); }
    if (urlOrigen.host !== request.headers.get("host")) return Response.json({ error: "Origen no permitido" }, { status: 403 });
  }

  let cuerpo: { email?: unknown; consent?: unknown; website?: unknown };
  try { cuerpo = await request.json(); } catch { return Response.json({ error: "JSON no válido" }, { status: 400 }); }
  if (!cuerpo || typeof cuerpo !== "object") return Response.json({ error: "Solicitud no válida" }, { status: 400 });
  if (typeof cuerpo.website === "string" && cuerpo.website.trim()) return Response.json({ ok: true });
  if (cuerpo.consent !== true) return Response.json({ error: "Se requiere consentimiento" }, { status: 400 });

  if (excedeLimite(request)) return Response.json({ error: "Espera un momento antes de volver a intentarlo" }, { status: 429 });

  const email = typeof cuerpo.email === "string" ? cuerpo.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ error: "Escribe un correo válido" }, { status: 400 });
  }

  const host = process.env.SMTP_HOST?.trim();
  const puerto = Number(process.env.SMTP_PORT || 465);
  const usuario = process.env.SMTP_USER?.trim();
  const clave = process.env.SMTP_PASSWORD;
  if (!host || !Number.isInteger(puerto) || puerto < 1 || puerto > 65535 || !usuario || !clave) {
    return Response.json({ error: "El correo no está configurado" }, { status: 503 });
  }

  const transporte = nodemailer.createTransport({
    host,
    port: puerto,
    secure: process.env.SMTP_SECURE === undefined ? puerto === 465 : process.env.SMTP_SECURE === "true",
    auth: { user: usuario, pass: clave },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    const aviso = correoAviso(email);
    await transporte.sendMail({
      from: { name: "NEXUSDV", address: contacto.correo },
      to: contacto.correo,
      replyTo: email,
      subject: aviso.subject,
      text: aviso.text,
      html: aviso.html,
    });

    const bienvenida = correoBienvenida(email);
    await transporte.sendMail({
      from: { name: "NEXUSDV", address: contacto.correo },
      to: email,
      replyTo: contacto.correo,
      subject: "¡Gracias por suscribirte a NEXUSDV!",
      text: bienvenida.text,
      html: bienvenida.html,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("suscripcion:", error);
    return Response.json({ error: "No se pudo enviar el correo" }, { status: 502 });
  } finally {
    transporte.close();
  }
}
