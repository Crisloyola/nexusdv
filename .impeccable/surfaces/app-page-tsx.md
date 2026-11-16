---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Surface: landing (app/page.tsx)

Mode: Persuade. Visitor: Lima business owner on a phone, deciding whether to trust NEXUSDV with their web. Action: open WhatsApp for a free quote, or ask Nexo. Proof: the three real projects (LML Agency, LML Alquiler, Creatrix), Nexo itself, and the prefilled-WhatsApp mechanism. Constraints: all copy, prices and services from lib/servicios.ts and lib/data.ts; no invented ratings, reviews, client counts or capabilities; illustrative content labeled "Ejemplo".

History (2026-11-15): mosaic redesign (FlexFit reference) shipped and documented, then replaced at the user's request by this direction. Reference: raycast.com (`.impeccable/reference/ray0-3.png`), used as style reference only. User pins: keep colors (near-black + lime, paper as light neutral), keep the scroll reveal (blur-to-sharp rise of `.rv`), centered sentence-case headlines, the showcase screen shows the services live, keep the WhatsApp examples (WaLead inbox, WaChat). Dropped: panel mosaic, uppercase display, pill+circle buttons, cursor spotlight, ambient gradient field.

## Direction contract

THESIS: A product launch page for a studio: one dark stage, a centered promise, and a single large framed screen where every service is shown working. Refuses the agency default of stacked marketing cards and stock imagery.

OWN-WORLD: Near-black stage (#08090B) with generous black space between sections. Surfaces are graphite (#111215 / #17191D) with 1px white hairlines at 8–14% and soft inner top highlights, 14–24px corners. Lime (#C8F135) is the only hue: the primary button, the active dock key, light streaks behind the hero and the showcase. Familjen Grotesk in sentence case: headlines 600 at -0.035em; section titles as a white bold sentence followed by a grey sentence. Buttons are rounded rectangles (12px): lime primary with ink text, light-paper secondary, ghost hairline tertiary. Keycap tiles for the process.

STORY: In one screen the visitor reads the promise and can quote on WhatsApp. Scrolling, the showcase proves each service working (real projects, Nexo answering, WhatsApp inbox), then real projects, the 3-key process, clear prices, answers, and a closing conversation that leads to WhatsApp.

FIRST VIEWPORT: Floating rounded nav bar (logo, nav, lime "Cotizar gratis" button). Centered H1 at 56–88px over diagonal blurred lime light streaks, grey lead under it, then the lime "Cotizar mi proyecto" button with a small caption line beneath. The top edge of the framed showcase screen peeks at the bottom of the viewport.

FORM: Reference-led product-launch stage (pinned by the user, no roll). seed: none (pinned) — "rediseñamos la web https://www.raycast.com/ te dejo un ejemplo dejamos los colores y la animacion de scroll igual"; showcase "Tus servicios en vivo"; headlines "Normal, como Raycast"; keep "Ejemplos de WhatsApp".

Signature interaction: the showcase dock. Five keys (Página web, App, Sistema, Nexo, WhatsApp) switch the screen with a crossfade; it auto-advances while on screen and stops once the visitor picks one. Motion grammar: blur-to-sharp rise on scroll (kept), screen crossfade, keycap press.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
