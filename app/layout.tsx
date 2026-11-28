import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SEO, SITIO_URL } from "@/lib/seo";
import { PROMOCION, promoActiva, soles } from "@/lib/servicios";
import { AvisoCookies } from "@/components/AvisoCookies";
import "./globals.css";

// Tipografía del diseño: Proxima Nova (Adobe Fonts, kit eus5hqq) para todo. Se carga con el <link> del <head>; globals.css la usa en --font.
/** Google Tag Manager del proyecto. Las etiquetas (Analytics, Ads, clics a WhatsApp) se configuran en tagmanager.google.com. */
const GTM_ID = "GTM-M8V6J96W";

const BASE: Metadata = {
  metadataBase: new URL(SITIO_URL),
  title: SEO.titulo,
  description: SEO.descripcion,
  keywords: [
    "desarrollo web Lima",
    "desarrollo web Perú",
    "páginas web Lima",
    "diseño web Lima",
    "tiendas virtuales Lima",
    "agencia de desarrollo web",
    "páginas web para negocios",
  ],
  applicationName: "NEXUSDV",
  authors: [{ name: "NEXUSDV", url: SITIO_URL }],
  creator: "NEXUSDV",
  category: "technology",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITIO_URL,
    siteName: "NEXUSDV",
    title: SEO.titulo,
    description: SEO.descripcion,
    images: [{ url: "/share.jpg", alt: "NEXUSDV: páginas web, apps y sistemas para negocios en Perú" }],
  },
  twitter: { card: "summary_large_image", title: SEO.titulo, description: SEO.descripcion, images: ["/share.jpg"] },
  // Verificación de Google Search Console: pega aquí tu código cuando lo tengas (ver instrucciones).
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } } : {}),
};

/** Mientras hay promo, el link compartido muestra la imagen de la promo (app/og-promo.png); si no, public/share.jpg. */
export function generateMetadata(): Metadata {
  if (!promoActiva()) return BASE;
  const alt = `${PROMOCION.nombre}: ${PROMOCION.producto} a ${soles(PROMOCION.precio)} · NEXUSDV`;
  const img = { url: "/og-promo.png", width: 1200, height: 630, alt };
  return { ...BASE, openGraph: { ...BASE.openGraph, images: [img] }, twitter: { ...BASE.twitter, images: [img.url] } };
}

export const viewport: Viewport = { themeColor: "#08090B", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" suppressHydrationWarning>
      <head>
        {/* Fuente: Proxima Nova desde Adobe Fonts */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/eus5hqq.css" />
        {/* Marca que hay JavaScript para activar las animaciones de entrada sin parpadeo */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Modo de consentimiento de Google: todo denegado hasta que la persona acepte (components/AvisoCookies.tsx).
            Si ya aceptó antes, se reactiva aquí mismo, antes de que cargue Google Tag Manager. */}
        <script dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});try{if(localStorage.getItem('nx-cookies')==='si')gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}catch(e){}" }} />
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (sin JavaScript) */}
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" /></noscript>
        {children}
        <AvisoCookies />
        <Analytics />
      </body>
    </html>
  );
}
