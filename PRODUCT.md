# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** owners of small and medium businesses in Lima and Peru who today sell through WhatsApp and Instagram, are not technical, and want to look more serious and receive more orders. Example client: LML Agency (audiovisual production house).
- **Also:** larger companies that need custom systems or apps (sales, inventory, bookings, loyalty).

They arrive mostly from a phone, decide on trust, and expect to talk to a person on WhatsApp before committing.

## Product Purpose

NEXUSDV is a development studio in Lima that designs and builds custom websites, Android/iPhone apps, business systems, AI assistants for websites, and domain + corporate email. This site exists to win quote requests: success is a visitor opening a WhatsApp conversation (or asking Nexo) with a real project in mind.

## Positioning

Confirmed differentiators (use only these as arguments):

1. **Everything leads to WhatsApp.** Every web, app, system or assistant NEXUSDV delivers ends in the client's own WhatsApp.
2. **Nexo, the AI assistant, is live proof.** The assistant on this site is a working example of the AI-assistant service sold to clients.
3. **Own design, no templates.** Each project is designed for the client's brand, not a generic WordPress/Wix theme.

"You see and approve the design before it's programmed" is a true process fact (see Operating Context) but was not chosen as a headline differentiator.

## Operating Context

- Working process, in order: design → client approves the design → programming → publish connected to WhatsApp → ongoing support. Source of truth: `FORMA_DE_TRABAJO` and `PASOS` in `lib/servicios.ts`.
- Quotes are free; the team confirms every quote.
- Policies (confirmed by the owner 2026-11-15, source of truth `POLITICAS` in `lib/servicios.ts`): 1 round of design changes included before programming, later changes are quoted; NEXUSDV administers the site; the domain is registered in the client's name whenever possible and NEXUSDV handles the technical configuration (changed 2026-11-15 to build trust); 30 days of free support after launch (bugs and minor tweaks), then an optional monthly maintenance plan (quoted); timelines from design approval: Landing 5–7 business days, Web empresarial about 2 weeks, Tienda virtual 3–4 weeks.
- Analytics and consent (2026-11-15): Google Tag Manager GTM-M8V6J96W loads with Google Consent Mode v2, everything denied until the visitor accepts the cookie notice (`components/AvisoCookies.tsx`, choice in localStorage `nx-cookies`). Vercel Analytics is cookieless. Privacy policy at `/privacidad` (Ley 29733) describes only what the site does; update it if new tools are added in GTM. Nexo chat messages go to the AI provider and are not stored by the site.
- Contact channels: WhatsApp (primary), email `contacto@nexusdv.pe`, Instagram `@nexusdv.pe`. All in `lib/data.ts` → `contacto`.

## Capabilities and Constraints

- Stack: Next.js 15, React 19, TypeScript, plain CSS in `app/globals.css`; Vercel Analytics; Anthropic SDK powers Nexo via `app/api/chat/route.ts` (with a scripted fallback in `lib/bot.ts`).
- **Single source of truth:** services, prices, plans and FAQ live only in `lib/servicios.ts`; contact and projects in `lib/data.ts`. The site, SEO JSON-LD and Nexo all read from there. Never hardcode a price or service elsewhere.
- Prices (owner-confirmed 2026-11-15): Landing Page from S/ 300, Web empresarial from S/ 600, Tienda virtual from S/ 1,000 (orders arrive in WhatsApp, payment coordinated there: Yape, Plin or transfer). Only Tienda virtual includes hosting the first year; Landing Page and Web empresarial quote hosting separately (owner decision 2026-11-15); the annual renewal is disclosed before contracting (price not published); the domain is quoted by extension; maintenance is optional. Plans list "Configuración SEO básica para facilitar la indexación en Google" instead of promising to appear on Google. Corporate email IS sold (owner-confirmed 2026-11-27, reversing the 2026-11-15 removal): 1 correo + dominio .com S/ 250, 4 correos + dominio .com S/ 550, 3 correos for clients with a NEXUSDV web S/ 350; prices per year, .pe quoted separately. Source of truth: `CORREO` in `lib/servicios.ts`. Apps, systems and AI assistants: a medida, quoted. Plan inclusions in `PLANES_WEB` were drafted by Claude and approved by the owner. Hosting cost from the second year is not published on the site (owner decision).
- Temporary promotions live only in `PROMOCION` in `lib/servicios.ts`, with `inicio`/`fin` dates (Lima time). The site, Nexo (scripted and AI) and the share image turn on and off by date; the home page revalidates hourly. Christmas 2026 promo (owner-confirmed 2026-11-27): Landing Page + dominio .com por 1 año a S/ 350, from 2026-11-27 to 2026-12-31; hosting quoted separately.
- No popularity badges ("Más pedido" was removed at the owner's request).
- Founder: Cristopher (owner-confirmed 2026-11-15), shown in the trust section and known to Nexo via `fundador` in `lib/data.ts`.
- Nexo must not promise functions beyond those listed in `paraNexo`; regression prompts in `scripts/probar-nexo.mjs`.
- Spanish (es-PE) only. Copy is written for non-technical readers: plain words, "tú", no jargon.
- SEO matters (local search "páginas web Lima" etc.); structured data in `lib/seo.ts` deliberately omits the phone number.

## Brand Commitments

- Name: **NEXUSDV** (all caps). Assistant: **Nexo**, with its own face icon (`NexoCara` in `components/Icons.tsx`).
- Voice: warm, direct, plain Spanish for business owners; Nexo uses emojis and a friendly tone.
- Existing assets: `public/favicon.svg`, `public/share.jpg`, project screenshots in `public/img/`.

## Evidence on Hand

- Published projects with real screenshots (desktop + mobile) in `public/img/`: LML Agency (lmlagencype.com), LML Agency · Alquiler (lmlagencype.com/alquiler), Creatrix (loyalty system).
- **More delivered projects exist but are not on the site yet**; the owner will supply them. Until then, show only the three above.
- No testimonials, client counts, ratings, third-party logos, awards or benchmarks exist on the site. Do not invent any.
- Stats currently shown ("S/ 0 cotización", "100% diseño a medida", "24/7 atención con Nexo") are claims about the offer, not performance metrics.

## Product Principles

1. **WhatsApp is the finish line.** Every surface should make starting a WhatsApp conversation the obvious next step.
2. **Show, don't claim.** Real projects and a working Nexo beat adjectives; never fabricate proof.
3. **Readable by any business owner.** If a non-technical owner on a phone can't understand it in one pass, rewrite it.
4. **One source of truth.** Prices, services and promises come from `lib/servicios.ts` so the site and Nexo never disagree.
5. **Custom, visibly.** The site itself must demonstrate the "no templates" promise.
