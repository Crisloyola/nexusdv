"use client";
import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { Tile } from "./Tile";

// Paleta verde salvia del vidrio estriado (igual que la web actual).
const PALETA = { bg: "#cdd6c6", surface: "#dce3d6", ink: "#262d24", muted: "#535b51", accent: "#6c8e63" };

type Props = { seed: number; className?: string; children: ReactNode; as?: ElementType; href?: string; id?: string; role?: string; "aria-label"?: string; style?: React.CSSProperties };

/**
 * Bloque con el efecto de vidrio estriado animado (WebGL).
 * El efecto vive en /public/fx y se carga solo en el navegador.
 * Si el navegador no tiene WebGL, queda el fondo CSS de respaldo (.flute en globals.css).
 */
export function FlutedGlass({ seed, className = "", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    let ctrl: { destroy: () => void } | null = null, cancel = false;
    (async () => {
      const mod = await import(/* webpackIgnore: true */ "/fx/fx.js" as string);
      const fx = mod.default;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) fx.config.clock = 8;
      if (cancel || !ref.current) return;
      ctrl = await fx.mount(ref.current, "fluted-glass", { palette: PALETA, seed });
      if (cancel) ctrl?.destroy();
    })().catch((e) => console.warn("fluted-glass:", e));
    return () => { cancel = true; ctrl?.destroy(); };
  }, [seed]);
  return <Tile ref={ref} className={`flute ${className}`} {...rest}>{children}</Tile>;
}
