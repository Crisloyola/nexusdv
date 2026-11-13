"use client";
import { useEffect, type RefObject } from "react";

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * Repite una animación (step) en bucle, pero solo mientras el elemento se ve en pantalla.
 * Si el usuario pidió "reducir movimiento" en su sistema, no anima y queda el estado final.
 */
export function useLoop(ref: RefObject<Element | null>, step: (alive: () => boolean) => Promise<void>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let on = false, busy = false, alive = true;
    const isOn = () => on && alive;
    const run = async () => {
      if (busy) return;
      busy = true;
      while (isOn()) await step(isOn);
      busy = false;
    };
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) run(); }, { threshold: 0.25 });
    io.observe(el);
    return () => { alive = false; on = false; io.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Escribe un texto letra por letra. */
export async function typeText(set: (t: string) => void, text: string, ms: number, alive: () => boolean) {
  for (let k = 1; k <= text.length && alive(); k++) { set(text.slice(0, k)); await sleep(ms); }
}
