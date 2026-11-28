// Imagen para compartir (WhatsApp, Facebook, etc.) mientras hay promo. app/layout.tsx la usa solo si la promo está vigente;
// fuera de fechas se comparte public/share.jpg como siempre. Datos en lib/servicios.ts → PROMOCION.
import { ImageResponse } from "next/og";
import { PROMOCION, soles } from "@/lib/servicios";

export const dynamic = "force-static";

export function GET() {
  const P = PROMOCION;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "linear-gradient(120deg, #2A1312 0%, #08090B 58%)", color: "#F2F4EE", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "#C8F135", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="30" viewBox="0 0 24 24"><path d="M2.5 21.5V12a9.5 9.5 0 0 1 19 0v9.5h-6V12a3.5 3.5 0 0 0-7 0v9.5z" fill="#0B0F14" /></svg>
          </div>
          NEXUSDV
          <div style={{ marginLeft: "auto", padding: "8px 18px", borderRadius: 12, background: "#E05249", color: "#fff", fontSize: 28, fontWeight: 700 }}>{P.nombre}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>{`${P.producto} por 1 año`}</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 28, marginTop: 24 }}>
            <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 1, color: "#FFF4D6", letterSpacing: -6 }}>{soles(P.precio)}</div>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 18, fontSize: 32 }}>
              <div style={{ color: "#89919A", textDecoration: "line-through" }}>{soles(P.precioNormal)}</div>
              <div style={{ color: "#C8F135", fontWeight: 700 }}>{`Ahorras ${soles(P.ahorro)}`}</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#A3AAB1" }}>
          <div>{`Hasta el ${P.finTexto} · Páginas web en Lima`}</div>
          <div style={{ color: "#F2F4EE", fontWeight: 700 }}>nexusdv.pe</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
