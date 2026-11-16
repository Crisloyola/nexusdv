// SEO: dirección oficial de la web y datos estructurados que lee Google.
import { contacto, proyectos } from "./data";
import { PLANES_WEB, SERVICIOS, preguntas } from "./servicios";

/** Dirección principal de la web (nexusdv.pe sin "www" redirige aquí). */
export const SITIO_URL = "https://www.nexusdv.pe";

export const SEO = {
  titulo: "Páginas web en Lima desde S/ 300 | Tiendas virtuales, apps y sistemas · NEXUSDV",
  descripcion:
    "Páginas web en Lima desde S/ 300: landing, web empresarial y tienda virtual con pedidos por WhatsApp. Apps, sistemas y asistentes con IA a medida. Ves el diseño antes de programar. Cotiza sin costo.",
  palabras: [
    "páginas web Lima", "diseño web Lima", "diseño de páginas web Perú", "landing page Lima", "crear página web para mi negocio",
    "desarrollo de apps Perú", "apps Android y iPhone", "sistemas a medida Lima", "correo corporativo Perú", "dominio .pe",
    "agencia de desarrollo web Lima", "chatbot con IA para negocios", "asistente virtual para web", "NEXUSDV",
  ],
};

/**
 * Datos estructurados (JSON-LD): le dicen a Google qué es el negocio, qué vende, dónde atiende
 * y cuáles son sus preguntas frecuentes. Sin número de teléfono a propósito.
 */
export function datosEstructurados() {
  const negocio = {
    "@type": "ProfessionalService",
    "@id": `${SITIO_URL}/#negocio`,
    name: "NEXUSDV",
    url: SITIO_URL,
    image: `${SITIO_URL}/share.jpg`,
    logo: `${SITIO_URL}/favicon.svg`,
    description: SEO.descripcion,
    email: contacto.correo,
    address: { "@type": "PostalAddress", addressLocality: "Lima", addressRegion: "Lima", addressCountry: "PE" },
    areaServed: [{ "@type": "City", name: "Lima" }, { "@type": "Country", name: "Perú" }],
    currenciesAccepted: "PEN",
    sameAs: [contacto.instagramLink],
    knowsLanguage: "es",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de NEXUSDV",
      // Sale de lib/servicios.ts: los 3 planes web (precio desde) y los servicios. El correo tiene precio fijo.
      itemListElement: [
        ...PLANES_WEB.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.nombre, description: p.texto },
          priceSpecification: { "@type": "PriceSpecification", minPrice: p.desde, priceCurrency: "PEN" },
        })),
        ...SERVICIOS.filter((sv) => sv.id !== "web").map((sv) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: sv.titulo, description: sv.texto },
        ...(sv.id === "mail" ? { price: 550, priceCurrency: "PEN" } : {}),
        })),
      ],
    },
  };

  const sitio = { "@type": "WebSite", "@id": `${SITIO_URL}/#web`, url: SITIO_URL, name: "NEXUSDV", inLanguage: "es-PE", publisher: { "@id": `${SITIO_URL}/#negocio` } };

  const faq = {
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({ "@type": "Question", name: p.q, acceptedAnswer: { "@type": "Answer", text: p.a } })),
  };

  const portafolio = {
    "@type": "ItemList",
    name: "Proyectos entregados por NEXUSDV",
    itemListElement: proyectos.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.nombre, url: p.url })),
  };

  return { "@context": "https://schema.org", "@graph": [negocio, sitio, faq, portafolio] };
}
