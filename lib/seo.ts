// SEO: dirección oficial de la web y datos estructurados que lee Google.
import { contacto, proyectos } from "./data";
import { PLANES_WEB, SERVICIOS, preguntas } from "./servicios";

/** Dirección principal de la web (nexusdv.pe sin "www" redirige aquí). */
export const SITIO_URL = "https://www.nexusdv.pe";

export const SEO = {
  titulo: "Desarrollo web en Lima | Páginas web y tiendas | NEXUSDV",
  descripcion:
    "NEXUSDV desarrolla páginas web, tiendas virtuales, apps y sistemas a medida en Lima. Diseño profesional, conexión a WhatsApp y cotización sin costo.",
};

/**
 * Datos estructurados (JSON-LD): le dicen a Google qué es el negocio, qué vende, dónde atiende
 * y cuáles son sus preguntas frecuentes. Sin número de teléfono a propósito.
 */
export function datosEstructurados() {
  const negocio = {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITIO_URL}/#negocio`,
    name: "NEXUSDV",
    url: SITIO_URL,
    image: `${SITIO_URL}/share.jpg`,
    logo: `${SITIO_URL}/favicon.svg`,
    description: SEO.descripcion,
    email: contacto.correo,
    priceRange: "S/ 540 - S/ 1990",
    address: { "@type": "PostalAddress", addressLocality: "Lima", addressRegion: "Lima", addressCountry: "PE" },
    areaServed: [{ "@type": "City", name: "Lima" }, { "@type": "Country", name: "Perú" }],
    currenciesAccepted: "PEN",
    sameAs: [contacto.instagramLink],
    knowsLanguage: "es",
    knowsAbout: ["Desarrollo web", "Páginas web", "Tiendas virtuales", "Apps móviles", "Sistemas a medida", "SEO básico"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "ventas",
      email: contacto.correo,
      availableLanguage: ["Spanish"],
      areaServed: "PE",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de NEXUSDV",
      // Sale de lib/servicios.ts: los 4 planes web y los demás servicios (a medida).
      itemListElement: [
        ...PLANES_WEB.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.nombre, description: p.texto },
          priceSpecification: p.esDesde
            ? { "@type": "PriceSpecification", minPrice: p.precio, priceCurrency: "PEN" }
            : { "@type": "PriceSpecification", price: p.precio, priceCurrency: "PEN" },
        })),
        ...SERVICIOS.filter((sv) => sv.id !== "web").map((sv) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: sv.titulo, description: sv.texto },
        })),
      ],
    },
  };

  const sitio = { "@type": "WebSite", "@id": `${SITIO_URL}/#web`, url: SITIO_URL, name: "NEXUSDV", inLanguage: "es-PE", publisher: { "@id": `${SITIO_URL}/#negocio` } };

  const pagina = {
    "@type": "WebPage",
    "@id": `${SITIO_URL}/#pagina`,
    url: SITIO_URL,
    name: SEO.titulo,
    description: SEO.descripcion,
    inLanguage: "es-PE",
    isPartOf: { "@id": `${SITIO_URL}/#web` },
    about: { "@id": `${SITIO_URL}/#negocio` },
  };

  const migas = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITIO_URL },
    ],
  };

  const faq = {
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({ "@type": "Question", name: p.q, acceptedAnswer: { "@type": "Answer", text: p.a } })),
  };

  const portafolio = {
    "@type": "ItemList",
    name: "Proyectos entregados por NEXUSDV",
    itemListElement: proyectos.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.nombre, url: p.url })),
  };

  return { "@context": "https://schema.org", "@graph": [negocio, sitio, pagina, migas, faq, portafolio] };
}
