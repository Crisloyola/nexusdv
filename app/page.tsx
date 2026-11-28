import { IconSprite } from "@/components/Icons";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Servicios } from "@/components/Servicios";
import { Proyectos } from "@/components/Proyectos";
import { NexoSeccion } from "@/components/NexoSeccion";
import { Pasos } from "@/components/Pasos";
import { Precios } from "@/components/Precios";
import { Testimonios } from "@/components/Testimonios";
import { Preguntas } from "@/components/Preguntas";
import { Confianza } from "@/components/Confianza";
import { Contacto } from "@/components/Contacto";
import { Suscripcion } from "@/components/Suscripcion";
import { Asistente } from "@/components/Asistente";
import { RevealInit } from "@/components/RevealInit";
import { PromoBarra, PromoMovil, type PromoVista } from "@/components/Promo";
import { datosEstructurados } from "@/lib/seo";
import { waTexto } from "@/lib/data";
import { PROMOCION, promoActiva, quedanPromo, soles } from "@/lib/servicios";

// La página se vuelve a generar cada hora: así la promo aparece, cuenta los días y se apaga sola en su fecha.
export const revalidate = 3600;

/** Datos de la promo para la barra y el botón de celular, o null si no hay promo vigente. */
function promoVista(): PromoVista | null {
  if (!promoActiva()) return null;
  return {
    nombre: PROMOCION.nombre, etiqueta: PROMOCION.etiqueta, corto: PROMOCION.corto, producto: PROMOCION.producto,
    precio: soles(PROMOCION.precio), precioNormal: soles(PROMOCION.precioNormal),
    finTexto: PROMOCION.finTexto, quedan: quedanPromo(),
    whatsapp: waTexto(PROMOCION.mensaje, PROMOCION.campana),
  };
}

export default function Home() {
  // Datos estructurados para Google (negocio, servicios, preguntas frecuentes). "<" escapado por seguridad.
  const promo = promoVista();
  const jsonLd = JSON.stringify(datosEstructurados()).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <IconSprite />
      <Header aviso={promo && <PromoBarra p={promo} />} />
      <main id="inicio">
        <Hero />
        <Servicios />
        <Proyectos />
        <Testimonios />
        <NexoSeccion />
        <Pasos />
        <Precios />
        <Confianza />
        <Preguntas />
      </main>
      <Contacto />
      <Suscripcion />
      {promo && <PromoMovil p={promo} />}
      <Asistente />
      <RevealInit />
    </>
  );
}
