import { IconSprite } from "@/components/Icons";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Servicios } from "@/components/Servicios";
import { Proyectos } from "@/components/Proyectos";
import { Pasos } from "@/components/Pasos";
import { Precios } from "@/components/Precios";
import { Contacto } from "@/components/Contacto";
import { Footer } from "@/components/Footer";
import { Asistente } from "@/components/Asistente";
import { RevealInit } from "@/components/RevealInit";

export default function Home() {
  return (
    <>
      <IconSprite />
      <Header />
      <main id="top">
        <Hero />
        <Servicios />
        <Proyectos />
        <Pasos />
        <Precios />
        <Contacto />
      </main>
      <Footer />
      <Asistente />
      <RevealInit />
    </>
  );
}
