import { IconSprite } from "@/components/Icons";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Cinta } from "@/components/Cinta";
import { Servicios } from "@/components/Servicios";
import { Proyectos } from "@/components/Proyectos";
import { NexoSeccion } from "@/components/NexoSeccion";
import { Pasos } from "@/components/Pasos";
import { Precios } from "@/components/Precios";
import { Contacto } from "@/components/Contacto";
import { Asistente } from "@/components/Asistente";
import { RevealInit } from "@/components/RevealInit";

export default function Home() {
  return (
    <>
      <IconSprite />
      <Header />
      <main id="inicio">
        <Hero />
        <Cinta />
        <Servicios />
        <Proyectos />
        <NexoSeccion />
        <Pasos />
        <Precios />
      </main>
      <Contacto />
      <Asistente />
      <RevealInit />
    </>
  );
}
