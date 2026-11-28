"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icons";

export type PromoVista = {
  nombre: string; etiqueta: string; corto: string; producto: string; precio: string; precioNormal: string;
  finTexto: string; quedan: string; whatsapp: string;
};

/** Barra fina sobre el menú (va dentro de la cabecera fija). Lleva a la tarjeta de la promo en Precios. Solo en tablet y computadora. */
export function PromoBarra({ p }: { p: PromoVista }) {
  return (
    <a className="pbar" href="#promo">
      <span className="pbar__tag">{p.nombre}</span>
      <span className="pbar__txt"><b>{p.producto} a {p.precio}</b><span> · antes {p.precioNormal} · hasta el {p.finTexto}</span></span>
      <span className="pbar__dias">{p.quedan}</span>
      <span className="pbar__ver">Ver promo<Icon id="right" /></span>
    </a>
  );
}

/**
 * Botón fijo abajo en celular: aparece al pasar la portada y se esconde mientras se ve la tarjeta de la promo
 * (para no repetirla). Abre WhatsApp con el mensaje de la promo ya escrito.
 */
export function PromoMovil({ p }: { p: PromoVista }) {
  const [ver, setVer] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const tarjeta = document.getElementById("promo");
    if (!hero) return;
    let pasoHero = false, enTarjeta = false;
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.target === hero) pasoHero = !e.isIntersecting && e.boundingClientRect.top < 0;
        else enTarjeta = e.isIntersecting;
      }
      setVer(pasoHero && !enTarjeta);
    });
    io.observe(hero);
    if (tarjeta) io.observe(tarjeta);
    return () => io.disconnect();
  }, []);

  return (
    <a className={`pmov${ver ? " pmov--on" : ""}`} href={p.whatsapp} target="_blank" rel="noopener"
      aria-hidden={!ver} tabIndex={ver ? 0 : -1}>
      <span className="pmov__t">
        <b>{p.corto} a {p.precio}</b>
        <small>{p.nombre} · {p.quedan.toLowerCase()}</small>
      </span>
      <span className="pmov__wa"><Icon id="wa" /></span>
    </a>
  );
}
