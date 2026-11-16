import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SEO, SITIO_URL } from "@/lib/seo";
import "./globals.css";

// Tipografía del diseño: Familjen Grotesk para todo (titulares en mayúsculas y texto). globals.css la usa como --font-main.
const main = Familjen_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-main", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITIO_URL),
  title: SEO.titulo,
  description: SEO.descripcion,
  keywords: SEO.palabras,
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
    description: "Páginas web en Lima desde S/ 300: landing, web empresarial y tienda virtual. Apps, sistemas y asistentes con IA a medida. Cotización sin costo.",
    images: [{ url: "/share.jpg", alt: "NEXUSDV: páginas web, apps y sistemas para negocios en Perú" }],
  },
  twitter: { card: "summary_large_image", title: SEO.titulo, description: SEO.descripcion, images: ["/share.jpg"] },
  // Verificación de Google Search Console: pega aquí tu código cuando lo tengas (ver instrucciones).
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } } : {}),
};

export const viewport: Viewport = { themeColor: "#08090B", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={main.variable} suppressHydrationWarning>
      <head>
        {/* Marca que hay JavaScript para activar las animaciones de entrada sin parpadeo */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
