import type { Metadata } from "next";
import { contacto } from "@/lib/data";
import { Logo } from "@/components/Icons";
import { BotonCookies } from "@/components/BotonCookies";

export const metadata: Metadata = {
  title: "Política de privacidad · NEXUSDV",
  description: "Qué datos usa la web de NEXUSDV, para qué y cómo puedes ejercer tus derechos.",
  alternates: { canonical: "/privacidad" },
};

/** Política de privacidad. Describe solo lo que la web hace hoy; actualízala si agregas herramientas en Google Tag Manager. */
export default function Privacidad() {
  return (
    <main className="legal">
      <div className="wrap legal__in">
        <a className="logo" href="/" aria-label="NEXUSDV, volver al inicio"><i><Logo /></i>NEXUSDV</a>
        <h1>Política de privacidad</h1>
        <p className="legal__fecha">Última actualización: 24 de noviembre de 2026</p>

        <h2>Quiénes somos</h2>
        <p>NEXUSDV es un estudio de diseño y desarrollo web en {contacto.ciudad}. Para cualquier consulta sobre tus datos escríbenos a <a href={`mailto:${contacto.correo}`}>{contacto.correo}</a>.</p>

        <h2>Qué datos usamos y para qué</h2>
        <ul>
          <li><b>Cuando nos escribes por WhatsApp o correo:</b> usamos tu nombre, número o correo y lo que nos cuentas para responderte y enviarte tu cotización.</li>
          <li><b>Chat con Nexo:</b> lo que escribes en el chat se envía a un servicio de inteligencia artificial para generar la respuesta. Nuestra web no guarda esas conversaciones. Por favor, no escribas datos sensibles como tu DNI, tarjetas o contraseñas.</li>
          <li><b>Medición de visitas:</b> usamos Vercel Analytics, que cuenta visitas de forma agregada y sin cookies. Si aceptas las cookies, también usamos herramientas de Google (a través de Google Tag Manager) para medir cómo se usa la web.</li>
          <li><b>Cuando te suscribes por correo:</b> usamos tu email para enviarte novedades y un mensaje de bienvenida, y para avisar al equipo. Los mensajes se envían mediante el correo de NEXUSDV alojado en Hostinger; esta web no mantiene una base de suscriptores. Puedes pedir que retiremos tu correo escribiendo a <a href={`mailto:${contacto.correo}`}>{contacto.correo}</a>.</li>
          <li><b>Preferencias en tu navegador:</b> guardamos tu elección sobre las cookies, si ya viste el saludo de Nexo y si cerraste la pantalla de cotización, para no volver a mostrártelos.</li>
        </ul>

        <h2>Cookies</h2>
        <p>Las cookies de medición solo se activan si las aceptas en el aviso. Si las rechazas, la web funciona igual. Puedes cambiar tu elección cuando quieras:</p>
        <p><BotonCookies className="btn btn--ghost">Configurar cookies</BotonCookies></p>

        <h2>Lo que no hacemos</h2>
        <p>No vendemos ni alquilamos tus datos personales.</p>

        <h2>Tus derechos</h2>
        <p>De acuerdo con la Ley N.° 29733, Ley de Protección de Datos Personales del Perú, puedes pedir acceder a tus datos, corregirlos, eliminarlos u oponerte a su uso escribiendo a <a href={`mailto:${contacto.correo}`}>{contacto.correo}</a>.</p>

        <p className="legal__volver"><a href="/">← Volver al inicio</a></p>
      </div>
    </main>
  );
}
