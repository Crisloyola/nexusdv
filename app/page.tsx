import { IconSprite } from "@/components/Icons";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Servicios } from "@/components/Servicios";
import { Proyectos } from "@/components/Proyectos";
import { NexoSeccion } from "@/components/NexoSeccion";
import { Pasos } from "@/components/Pasos";
import { Precios } from "@/components/Precios";
import { Preguntas } from "@/components/Preguntas";
import { Confianza } from "@/components/Confianza";
import { Contacto } from "@/components/Contacto";
import { Asistente } from "@/components/Asistente";
import { RevealInit } from "@/components/RevealInit";
import { Brillo } from "@/components/Brillo";
import { datosEstructurados } from "@/lib/seo";

export default function Home() {
  // Datos estructurados para Google (negocio, servicios, preguntas frecuentes). "<" escapado por seguridad.
  const jsonLd = JSON.stringify(datosEstructurados()).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <IconSprite />
      <Header />
      <main id="inicio">
        <Hero />
        <Servicios />
        <Proyectos />
        <NexoSeccion />
        <Pasos />
        <Precios />
        <Confianza />
        <Preguntas />
      </main>
      <Contacto />
      <Asistente />
      <RevealInit />
      <Brillo />
    </>
  );
}
