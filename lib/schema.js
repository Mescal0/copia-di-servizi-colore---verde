/* lib/schema.js — costruisce i dati strutturati JSON-LD (schema.org)
   Servono a Google per capire CHE attività sei, DOVE operi e COSA offri.
   Tutto deriva da site.config.js: niente da scrivere a mano. */

function abs(site, path = "/") {
  return site.url.replace(/\/$/, "") + path;
}

// Converte ["Lun–Ven 08:00-18:00"...] nel formato schema.org openingHoursSpecification
const DAYMAP = {
  "Lun": "Monday", "Mar": "Tuesday", "Mer": "Wednesday", "Gio": "Thursday",
  "Ven": "Friday", "Sab": "Saturday", "Dom": "Sunday",
};
function openingSpec(openingHours = []) {
  const out = [];
  for (const o of openingHours) {
    const range = o.days.split("–").map((d) => d.trim());
    let days;
    if (range.length === 2) {
      const order = Object.keys(DAYMAP);
      const i = order.indexOf(range[0]);
      const j = order.indexOf(range[1]);
      days = order.slice(i, j + 1).map((d) => DAYMAP[d]);
    } else {
      days = o.days.split(",").map((d) => DAYMAP[d.trim()]).filter(Boolean);
    }
    out.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens: o.from,
      closes: o.to,
    });
  }
  return out;
}

// Il nodo principale dell'attività, riutilizzato come "provider" ovunque.
function localBusiness(site) {
  const b = site.business;
  const node = {
    "@type": "LocalBusiness",
    "@id": abs(site, "/#business"),
    name: b.name,
    description: b.tagline,
    url: abs(site, "/"),
    telephone: b.phoneTel,
    priceRange: b.priceRange,
    image: abs(site, "/images/og-cover.png"),
    areaServed: site.zones.map((z) => ({ "@type": "City", name: z.name })),
    geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng },
  };
  if (b.legalName && !b.legalName.includes("DA COMPILARE")) node.legalName = b.legalName;
  if (b.email && !b.email.includes("DA COMPILARE")) node.email = b.email;
  if (b.vat && !b.vat.includes("DA COMPILARE")) node.vatID = b.vat;

  // Indirizzo: incluso solo se i campi essenziali sono compilati davvero.
  const a = b.address;
  const hasStreet = a.street && !a.street.includes("DA COMPILARE");
  node.address = {
    "@type": "PostalAddress",
    addressLocality: a.locality,
    addressRegion: a.region,
    addressCountry: a.country,
  };
  if (hasStreet) node.address.streetAddress = a.street;
  if (a.postalCode && !a.postalCode.includes("DA COMPILARE"))
    node.address.postalCode = a.postalCode;

  const hours = openingSpec(b.openingHours);
  if (hours.length) node.openingHoursSpecification = hours;

  const sameAs = Object.values(b.social).filter(Boolean);
  if (sameAs.length) node.sameAs = sameAs;

  return node;
}

function websiteNode(site) {
  return {
    "@type": "WebSite",
    "@id": abs(site, "/#website"),
    url: abs(site, "/"),
    name: site.business.name,
    inLanguage: "it-IT",
    publisher: { "@id": abs(site, "/#business") },
  };
}

function serviceNode(site, service) {
  return {
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.intro,
    provider: { "@id": abs(site, "/#business") },
    areaServed: site.zones.map((z) => ({ "@type": "City", name: z.name })),
    url: abs(site, `/servizi/${service.slug}/`),
  };
}

function breadcrumb(site, trail) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(site, t.path),
    })),
  };
}

// Avvolge uno o più nodi in un blocco <script type="application/ld+json">
function jsonLd(nodes) {
  const graph = { "@context": "https://schema.org", "@graph": nodes };
  return `<script type="application/ld+json">${JSON.stringify(graph)}</script>`;
}

module.exports = { abs, localBusiness, websiteNode, serviceNode, breadcrumb, jsonLd };
