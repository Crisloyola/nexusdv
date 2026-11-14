import type { Metadata, Viewport } from "next";
import { Martian_Mono, Onest, Sofia_Sans_Extra_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Tipografías del diseño. globals.css las usa como --display, --body y --mono.
const display = Sofia_Sans_Extra_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Onest({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const mono = Martian_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

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

export const viewport: Viewport = { themeColor: "#ECEFE6", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
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
