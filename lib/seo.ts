// SEO: dirección oficial de la web y datos estructurados que lee Google.
import { contacto, proyectos } from "./data";
import { SERVICIOS, preguntas } from "./servicios";

/** Dirección principal de la web (nexusdv.pe sin "www" redirige aquí). */
export const SITIO_URL = "https://www.nexusdv.pe";

export const SEO = {
  titulo: "Páginas web en Lima | Apps, sistemas y asistentes con IA · NEXUSDV",
  descripcion:
    "Diseño de páginas web a medida en Lima. Apps para Android y iPhone, sistemas, asistentes con IA, dominio .pe y correo corporativo. Ves el diseño antes de pagar. Cotiza sin costo.",
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
      // Sale de lib/servicios.ts. Solo el correo tiene precio fijo.
      itemListElement: SERVICIOS.map((sv) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: sv.titulo, description: sv.texto },
        ...(sv.id === "mail" ? { price: 550, priceCurrency: "PEN" } : {}),
      })),
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
