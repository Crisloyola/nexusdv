import type { MetadataRoute } from "next";
import { SITIO_URL } from "@/lib/seo";

/** /robots.txt: permite a Google revisar toda la web (menos la ruta interna del chat) e indica dónde está el sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITIO_URL}/sitemap.xml`,
    host: SITIO_URL,
  };
}
