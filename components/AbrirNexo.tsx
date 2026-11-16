"use client";
import type { ReactNode } from "react";
import { abrirNexo } from "./Asistente";

/** Botón que abre el chat de Nexo desde una sección que se renderiza en el servidor. */
export function AbrirNexo({ className, children }: { className?: string; children: ReactNode }) {
  return <button className={className} type="button" onClick={abrirNexo}>{children}</button>;
}
