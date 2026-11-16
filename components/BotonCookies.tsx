"use client";
import type { ReactNode } from "react";
import { abrirCookies } from "./AvisoCookies";

/** Botón que vuelve a abrir el aviso de cookies (pie de página y política de privacidad). */
export function BotonCookies({ className, children }: { className?: string; children: ReactNode }) {
  return <button type="button" className={className} onClick={abrirCookies}>{children}</button>;
}
