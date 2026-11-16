"use client";
import { useEffect } from "react";

/** Marca html.tras-portada al pasar la portada y html.cta-abajo cuando un botón de acción pasa por la esquina del botón de Nexo,
 *  para que el botón flotante de Nexo no tape la primera pantalla ni los botones. */
export function Brillo() {
  useEffect(() => {
    const marcar = () => document.documentElement.classList.toggle("tras-portada", window.scrollY > window.innerHeight * 0.55);
    marcar();
    window.addEventListener("scroll", marcar, { passive: true });
    // En celular, si un botón de acción pasa por la esquina del botón de Nexo, Nexo se aparta un momento.
    const io = new IntersectionObserver((es) => {
      for (const e of es) (e.target as HTMLElement).dataset.abajo = e.isIntersecting ? "1" : "";
      const hay = document.querySelector('.btn[data-abajo="1"]');
      document.documentElement.classList.toggle("cta-abajo", !!hay && window.innerWidth <= 640);
    }, { rootMargin: "-82% 0px 0px 0px" });
    document.querySelectorAll(".btn:not(.top__cta)").forEach((el) => io.observe(el));
    return () => { window.removeEventListener("scroll", marcar); io.disconnect(); };
  }, []);

  return null;
}
