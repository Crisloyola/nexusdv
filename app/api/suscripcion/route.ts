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
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Gracias por suscribirte a NEXUSDV</title>
      </head>
      <body bgcolor="#F2F3EE" style="margin:0;padding:0;background-color:#F2F3EE;font-family:Arial,Helvetica,sans-serif;color:#111215">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#F2F3EE" style="width:100%;border-collapse:collapse;background-color:#F2F3EE">
          <tr><td align="center" style="padding:24px 12px 40px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF" style="width:100%;max-width:600px;border:1px solid #E1E4DE;border-radius:16px;border-collapse:separate;border-spacing:0;background-color:#FFFFFF;overflow:hidden">
              <tr><td bgcolor="#111215" style="padding:18px 28px;background-color:#111215">
                <a href="${SITIO_URL}" style="display:inline-block;color:#F2F4EE;text-decoration:none;font-size:18px;font-weight:700;letter-spacing:1px;line-height:32px">
                  <img src="${SITIO_URL}/favicon.svg" alt="" width="32" height="32" style="display:inline-block;vertical-align:middle;margin-right:10px;border:0" />
                  <span style="display:inline-block;vertical-align:middle">NEXUSDV</span>
                </a>
              </td></tr>
              <tr><td height="4" bgcolor="#C8F135" style="height:4px;line-height:4px;font-size:0">&nbsp;</td></tr>
              <tr><td bgcolor="#FFFFFF" style="padding:36px 32px 18px;background-color:#FFFFFF">
                <h1 style="margin:0 0 14px;font-size:28px;line-height:1.2;font-weight:700;color:#111215">¡Gracias por suscribirte!</h1>
                <p style="margin:0;font-size:16px;line-height:1.65;color:#454B45">Recibimos tu correo y ya formas parte de la comunidad de NEXUSDV. Te enviaremos novedades por aquí.</p>
              </td></tr>
              <tr><td bgcolor="#FFFFFF" style="padding:0 32px 24px;background-color:#FFFFFF">
                <a href="${SITIO_URL}" style="display:block;text-decoration:none">
                  <img src="${SITIO_URL}/share.jpg" alt="Vista previa de la web de NEXUSDV" width="536" height="335" style="display:block;width:100%;max-width:536px;height:auto;border:0;border-radius:12px" />
                </a>
              </td></tr>
              <tr><td bgcolor="#FFFFFF" style="padding:0 32px 36px;background-color:#FFFFFF">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#F4F6EE" style="width:100%;border:1px solid #E6E9DF;border-radius:10px;border-collapse:separate;border-spacing:0;background-color:#F4F6EE">
                  <tr><td style="padding:14px 16px">
                    <p style="margin:0 0 5px;font-size:13px;line-height:1.4;color:#596252">Enviaremos novedades a</p>
                    <p style="margin:0;font-size:15px;line-height:1.5;font-weight:700;color:#111215">${correoSeguro}</p>
                  </td></tr>
                </table>
                <p style="margin:24px 0 0">
                  <a href="${SITIO_URL}" style="display:inline-block;padding:14px 22px;border-radius:10px;background-color:#C8F135;color:#0B0F14;text-decoration:none;font-size:15px;line-height:1.3;font-weight:700">Visitar NEXUSDV</a>
                </p>
                <p style="margin:22px 0 0;font-size:13px;line-height:1.6;color:#697069">¿No te suscribiste o quieres solicitar la baja? <a href="mailto:${contacto.correo}" style="color:#3E5210;text-decoration:underline">${contacto.correo}</a></p>
              </td></tr>
              <tr><td bgcolor="#F7F8F5" style="padding:20px 28px;border-top:1px solid #E7E9E4;background-color:#F7F8F5">
                <p style="margin:0 0 8px;font-size:12px;line-height:1.5;color:#697069">Recibiste este correo porque te suscribiste a las novedades de NEXUSDV.</p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:#697069"><a href="${SITIO_URL}" style="color:#3E5210;text-decoration:underline">nexusdv.pe</a> · NEXUSDV</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>`;
  const texto = `¡Gracias por suscribirte!\n\nRecibimos tu correo y ya formas parte de la comunidad de NEXUSDV. Te enviaremos novedades por aquí.\n\nTu correo registrado: ${email}\nVisita NEXUSDV: ${SITIO_URL}\n\n¿No te suscribiste o quieres solicitar la baja? Escríbenos a ${contacto.correo}.`;
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
