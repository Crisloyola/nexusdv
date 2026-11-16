import type { MetadataRoute } from "next";
import { SITIO_URL } from "@/lib/seo";

/** /sitemap.xml: la lista de páginas que Google debe indexar. Si agregas páginas nuevas, súmalas aquí. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITIO_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITIO_URL}/privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
