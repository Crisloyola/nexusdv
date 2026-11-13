"use client";
import { useEffect } from "react";

/** Hace aparecer los bloques (.rv) con un deslizamiento suave al hacer scroll. */
export function RevealInit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e, k) => { e.style.transitionDelay = `${(k % 4) * 60}ms`; io.observe(e); });
    const t = setTimeout(() => els.forEach((e) => e.classList.add("in")), 4000);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return null;
}
