import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const schibsted = localFont({
  src: [
    { path: "./fonts/schibsted-grotesk-latin-wght-normal.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/schibsted-grotesk-latin-ext-wght-normal.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-schibsted",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusdv.com"),
  title: "NEXUSDV: webs, apps y sistemas para negocios en Perú",
  description: "Desarrollamos páginas web, apps para Android y iPhone y sistemas a medida para negocios en Perú. También dominios y correos corporativos.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: "NEXUSDV: webs, apps y sistemas para negocios en Perú",
    description: "Páginas web, apps Android y iPhone, sistemas a medida, dominios y correos corporativos. Cotización sin costo.",
    images: ["/share.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0b0f14", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={schibsted.variable} suppressHydrationWarning>
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
