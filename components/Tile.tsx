"use client";
import { forwardRef, type ElementType, type ComponentPropsWithoutRef, type PointerEvent } from "react";

type Props = { as?: ElementType; className?: string; reveal?: boolean } & ComponentPropsWithoutRef<"div"> & { href?: string; target?: string; rel?: string };

/** Bloque del bento grid. La luz verde sigue al cursor. */
export const Tile = forwardRef<HTMLElement, Props>(function Tile({ as: Tag = "div", className = "", reveal = true, ...rest }, ref) {
  const move = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const leave = (e: PointerEvent<HTMLElement>) => e.currentTarget.style.setProperty("--mx", "-999px");
  return <Tag ref={ref} className={`tile ${reveal ? "rv " : ""}${className}`} onPointerMove={move} onPointerLeave={leave} {...rest} />;
});
