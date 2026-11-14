// SEO: dirección oficial de la web y datos estructurados que lee Google.
import { contacto, preguntas, proyectos } from "./data";

/** Dirección principal de la web (nexusdv.pe sin "www" redirige aquí). */
export const SITIO_URL = "https://www.nexusdv.pe";

export const SEO = {
  titulo: "Páginas web en Lima desde S/ 500 | Apps y sistemas · NEXUSDV",
  descripcion:
    "Diseño de páginas web en Lima desde S/ 500, listas en 7 días. Apps para Android y iPhone, sistemas a medida, dominio .pe y correo corporativo. Cotiza sin costo.",
  palabras: [
    "páginas web Lima", "diseño web Lima", "diseño de páginas web Perú", "landing page Lima", "crear página web para mi negocio",
    "desarrollo de apps Perú", "apps Android y iPhone", "sistemas a medida Lima", "correo corporativo Perú", "dominio .pe",
    "agencia de desarrollo web Lima", "NEXUSDV",
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
    priceRange: "Desde S/ 500",
    currenciesAccepted: "PEN",
    sameAs: [contacto.instagramLink],
    knowsLanguage: "es",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de NEXUSDV",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Landing page / página web a medida", description: "Diseño propio, adaptada a celular, botón a WhatsApp y lista para Google. Entrega en 7 días." },
          priceSpecification: { "@type": "PriceSpecification", minPrice: 500, priceCurrency: "PEN" },
        },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Apps para Android y iPhone", description: "Apps a medida con publicación en Google Play y App Store. Cotización sin costo." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sistemas a medida", description: "Ventas, inventario, reservas y fidelización de clientes, con panel de administración." } },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Dominio y correo corporativo", description: "Dominio propio (.com, .pe o .com.pe) y 4 correos corporativos el primer año. Entrega inmediata." },
          price: 550, priceCurrency: "PEN",
        },
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
