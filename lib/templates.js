/* lib/templates.js — tutta la resa HTML del sito.
   Funzioni pure: ricevono `site` (config) e restituiscono stringhe HTML. */

const ld = require("./schema");

const html = (strings, ...values) => strings.reduce((result, string, i) => result + string + (values[i] !== undefined ? values[i] : ""), "");


const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const waLink = (site, text) =>
  `https://wa.me/${site.business.whatsapp}?text=${encodeURIComponent(text)}`;

/* ---------- piccole icone SVG inline (currentColor) ---------- */
const icons = {
  brush: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 14.5 3 21"/><path d="M14 4l6 6-7.5 4.5L9.5 11.5 14 4z"/><path d="M11 9 4 16"/></svg>`,
  roller: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="6" rx="1.5"/><path d="M17 7h2.5A1.5 1.5 0 0 1 21 8.5V11a1 1 0 0 1-1 1h-7"/><path d="M11 12v3a1 1 0 0 1-1 1H9a1 1 0 0 0-1 1v4"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-10 9.7"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  broom: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 4 9 14"/><path d="M14 9l-7.5 7.5a3 3 0 0 0 0 .5L5 21l3-1.5c.2 0 .3 0 .5-.1L16 12"/><path d="M6.5 16.5 9 19"/></svg>`,
  team: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 6a3 3 0 0 1 0 6"/><path d="M18 20a6 6 0 0 0-3-5.2"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l1 4v2a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>`,
  wa: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.13c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>`,
  envelope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.27-7-11a7 7 0 0 1 14 0c0 4.73-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`,
};
const getServiceIcon = (slug) => {
  if (slug === "imbiancatura") return icons.roller;
  if (slug === "verniciatura") return icons.brush;
  if (slug === "cura-del-verde") return icons.leaf;
  return icons.brush;
};
const getHighlightIcon = (index) => {
  const mod = index % 4;
  if (mod === 0) return icons.team;
  if (mod === 1) return icons.clock;
  if (mod === 2) return icons.broom;
  return icons.shield;
};

/* ---------- header / nav ---------- */
function header(site, active) {
  const servicesLinks = site.services
    .map((s) => html`<a role="menuitem" href="/servizi/${s.slug}/">${esc(s.name)}</a>`).join("");
  const zonesLinks = site.zones
    .map((z) => html`<a role="menuitem" href="/zone/${z.slug}/">${esc(z.name)}</a>`).join("");
  return `
<a class="skip" href="#main">Vai al contenuto</a>
<header class="site-head">
  <div class="wrap head-inner">
    <a class="brand" href="/" aria-label="${esc(site.business.name)} — home">
      <span class="brand-mark" aria-hidden="true">C<span>&amp;</span>V</span>
      <span class="brand-text"><strong>${esc(site.business.name)}</strong><em>${esc(site.business.tagline)}</em></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav" aria-label="Apri menu">
      <span></span><span></span><span></span>
    </button>
    <nav id="nav" class="site-nav" aria-label="Principale">
      <a href="/"${active === "home" ? ' aria-current="page"' : ""}>Home</a>
      <div class="has-menu">
        <button class="menu-btn" aria-expanded="false">Servizi</button>
        <div class="menu" role="menu">${servicesLinks}</div>
      </div>
      <div class="has-menu">
        <button class="menu-btn" aria-expanded="false">Zone</button>
        <div class="menu" role="menu">${zonesLinks}</div>
      </div>
      <a href="/contatti/"${active === "contatti" ? ' aria-current="page"' : ""}>Contatti</a>
      <a class="btn btn-wa" href="${waLink(site, "Salve, vorrei un preventivo gratuito.")}">${icons.wa}<span>WhatsApp</span></a>
    </nav>
  </div>
</header>`;
}

/* ---------- footer ---------- */
function footer(site) {
  const b = site.business;
  const year = new Date().getFullYear();
  const hours = b.openingHours.map((o) => `<li>${esc(o.days)}: ${esc(o.from)}–${esc(o.to)}</li>`).join("");
  const services = site.services.map((s) => `<li><a href="/servizi/${s.slug}/">${esc(s.name)}</a></li>`).join("");
  const zones = site.zones.map((z) => `<li><a href="/zone/${z.slug}/">${esc(z.name)}</a></li>`).join("");
  const showVat = b.vat && !b.vat.includes("DA COMPILARE");
  return `
<footer class="site-foot">
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <span class="brand-mark" aria-hidden="true">C<span>&amp;</span>V</span>
      <p class="foot-name">${esc(b.name)}</p>
      <p class="foot-tag">${esc(b.tagline)}. Artigiani dal ${b.foundedYear}.</p>
      <p class="foot-contact">
        <a href="mailto:${esc(b.email)}">${esc(b.email)}</a><br>
        <span>WhatsApp: ${esc(b.phoneDisplay)}</span><br>
        <span>${esc(b.address.locality)} (${esc(b.address.region)})</span>
      </p>
    </div>
    <div><h3>Servizi</h3><ul>${services}</ul></div>
    <div><h3>Zone servite</h3><ul>${zones}</ul></div>
    <div>
      <h3>Orari</h3><ul class="foot-hours">${hours}</ul>
      <a class="btn btn-wa btn-sm" href="${waLink(site, "Salve, vorrei un preventivo gratuito.")}">${icons.wa}<span>Scrivici su WhatsApp</span></a>
    </div>
  </div>
  <div class="wrap foot-legal">
    <p>© ${year} ${esc(b.name)}${showVat ? " — P.IVA " + esc(b.vat) : ""}</p>
    <p><a href="/privacy/">Privacy</a></p>
  </div>
</footer>`;
}

/* ---------- layout di base ---------- */
function layout(site, { title, description, path, jsonLd = "", active = "", body }) {
  const url = site.url.replace(/\/$/, "") + path;
  const og = site.url.replace(/\/$/, "") + "/images/og-cover.png";
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#2e5c38">
<meta name="geo.region" content="IT-${esc(site.business.address.region)}">
<meta name="geo.placename" content="${esc(site.business.address.locality)}">
<meta name="geo.position" content="${site.business.geo.lat};${site.business.geo.lng}">
<meta property="og:type" content="website">
<meta property="og:locale" content="it_IT">
<meta property="og:site_name" content="${esc(site.business.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(og)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(og)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Mulish:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
${jsonLd}
</head>
<body>
${header(site, active)}
<main id="main">
${body}
</main>
${footer(site)}
<script src="/main.js" defer></script>
</body>
</html>`;
}

/* ---------- blocchi riutilizzabili ---------- */
function ctaBar(site, label = "Pronti a partire?") {
  return `
<section class="cta-bar">
  <div class="wrap cta-inner">
    <div>
      <h2>${esc(label)}</h2>
      <p>Sopralluogo e preventivo gratuiti, risposta entro 48 ore.</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-wa" href="${waLink(site, "Salve, vorrei un preventivo gratuito.")}">${icons.wa}<span>Scrivimi su WhatsApp</span></a>
      <a class="btn btn-email" href="mailto:${esc(site.business.email)}">${icons.envelope}<span>Invia un'Email</span></a>
    </div>
  </div>
</section>`;
}

/* ---------- HOME ---------- */
function homePage(site) {
  const b = site.business;
  const serviceCards = site.services.map((s, i) => `
    <a class="svc-card reveal" style="--d:${i * 80}ms" href="/servizi/${s.slug}/">
      <span class="svc-ico" aria-hidden="true">${getServiceIcon(s.slug)}</span>
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.short)}</p>
      <span class="svc-go">Scopri di più ${icons.arrow}</span>
    </a>`).join("");

  const highlightCards = site.highlights.map((h, i) => `
    <div class="hl reveal" style="--d:${i * 70}ms">
      <span class="hl-ico" aria-hidden="true">${getHighlightIcon(i)}</span>
      <h3>${esc(h.title)}</h3>
      <p>${esc(h.text)}</p>
    </div>`).join("");

  const reviewBlock = site.reviews.length
    ? `<section class="section reviews"><div class="wrap">
        <h2 class="sec-title">Dicono di noi</h2>
        <div class="rev-grid">
          ${site.reviews.map((r) => `<figure class="rev"><blockquote>“${esc(r.text)}”</blockquote><figcaption>${esc(r.author)}${r.zone ? " — " + esc(r.zone) : ""}</figcaption></figure>`).join("")}
        </div></div></section>`
    : "";

  const zoneChips = site.zones.map((z) => `<a class="chip" href="/zone/${z.slug}/">${icons.pin}${esc(z.name)}</a>`).join("");

  const body = `
<section class="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="wrap hero-inner">
    <p class="eyebrow reveal">Artigiani a Pistoia dal ${b.foundedYear}</p>
    <h1 class="reveal" style="--d:80ms">Imbianchino e <span class="hl-green">cura del verde</span><br>a Pistoia e provincia</h1>
    <p class="lede reveal" style="--d:160ms">Imbiancatura, verniciatura di legno e ferro, manutenzione del giardino. Una sola squadra, lavoro pulito, prezzo chiaro. Preventivo gratuito entro 48 ore.</p>
    <div class="hero-actions reveal" style="--d:240ms">
      <a class="btn btn-wa btn-lg" href="${waLink(site, "Salve, vorrei un preventivo gratuito.")}">${icons.wa}<span>Scrivici su WhatsApp</span></a>
      <a class="btn btn-email btn-lg" href="mailto:${esc(b.email)}">${icons.envelope}<span>Contattaci via Email</span></a>
    </div>
    <p class="hero-zones reveal" style="--d:320ms">${zoneChips}</p>
  </div>
</section>

<section class="section" id="servizi">
  <div class="wrap">
    <h2 class="sec-title">Cosa facciamo</h2>
    <p class="sec-sub">Tre mestieri, un solo referente di fiducia.</p>
    <div class="svc-grid">${serviceCards}</div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <h2 class="sec-title">Perché sceglierci</h2>
    <div class="hl-grid">${highlightCards}</div>
  </div>
</section>

${reviewBlock}

${ctaBar(site, "Hai un lavoro in mente?")}
`;

  const jsonLd = ld.jsonLd([
    ld.localBusiness(site),
    ld.websiteNode(site),
    ...site.services.map((s) => ld.serviceNode(site, s)),
  ]);

  return layout(site, {
    title: "Imbianchino e Giardiniere a Pistoia | Colore & Verde",
    description: "Imbianchino e giardiniere a Pistoia e provincia: imbiancatura, verniciatura e cura del verde. Preventivo gratuito entro 48h. Chiama " + b.phoneDisplay + ".",
    path: "/", active: "home", jsonLd, body,
  });
}

/* ---------- PAGINA SERVIZIO ---------- */
function servicePage(site, s) {
  const others = site.services.filter((x) => x.slug !== s.slug);
  const bullets = s.bullets.map((x) => `<li>${esc(x)}</li>`).join("");
  const zoneChips = site.zones.map((z) => `<a class="chip" href="/zone/${z.slug}/">${icons.pin}${esc(z.name)}</a>`).join("");
  const otherLinks = others.map((x) => `<a class="rel-card" href="/servizi/${x.slug}/"><span aria-hidden="true">${getServiceIcon(x.slug)}</span><strong>${esc(x.name)}</strong><em>${esc(x.short)}</em></a>`).join("");

  const body = `
<section class="page-head">
  <div class="wrap">
    <nav class="crumbs" aria-label="Percorso"><a href="/">Home</a> ${icons.arrow} <span>${esc(s.name)}</span></nav>
    <span class="page-ico" aria-hidden="true">${getServiceIcon(s.slug)}</span>
    <h1>${esc(s.h1)}</h1>
    <p class="lede">${esc(s.intro)}</p>
    <div class="hero-actions">
      <a class="btn btn-wa" href="${waLink(site, "Salve, vorrei un preventivo per: " + s.name + ".")}">${icons.wa}<span>Preventivo WhatsApp</span></a>
      <a class="btn btn-email" href="mailto:${esc(site.business.email)}">${icons.envelope}<span>Preventivo Email</span></a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap two-col">
    <div>
      <div style="margin-bottom: 2.5rem;">
        <h2 class="sec-title">Cosa comprende</h2>
        <ul class="check-list">${bullets}</ul>
      </div>
      ${s.pricing && s.pricing.length ? `
      <div style="margin-top: 3rem;">
        <h2 class="sec-title">Listino prezzi orientativo</h2>
        <p class="price-note" style="margin-bottom: 1.2rem;">I prezzi indicati si intendono indicativi e al metro quadro (mq). Effettuiamo sopralluoghi gratuiti per formulare preventivi personalizzati e precisi.</p>
        <ul class="price-list">
          ${s.pricing.map(p => `
            <li class="price-item">
              <span>${esc(p.label)}</span>
              <strong>${esc(p.price)}</strong>
            </li>
          `).join("")}
        </ul>
      </div>
      ` : ""}
    </div>
    <aside class="aside-box">
      <h3>Dove operiamo</h3>
      <p>${esc(s.name)} a Pistoia e in tutta la provincia:</p>
      <p class="chips">${zoneChips}</p>
    </aside>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <h2 class="sec-title">Altri servizi</h2>
    <div class="rel-grid">${otherLinks}</div>
  </div>
</section>

${ctaBar(site, "Vuoi un preventivo per " + s.name.toLowerCase() + "?")}
`;

  const jsonLd = ld.jsonLd([
    ld.localBusiness(site),
    ld.serviceNode(site, s),
    ld.breadcrumb(site, [{ name: "Home", path: "/" }, { name: s.name, path: `/servizi/${s.slug}/` }]),
  ]);

  return layout(site, {
    title: s.title, description: s.metaDescription,
    path: `/servizi/${s.slug}/`, jsonLd, body,
  });
}

/* ---------- PAGINA ZONA ---------- */
function zonePage(site, z) {
  const serviceCards = site.services.map((s) => `
    <a class="svc-card" href="/servizi/${s.slug}/">
      <span class="svc-ico" aria-hidden="true">${getServiceIcon(s.slug)}</span>
      <h3>${esc(s.name)} a ${esc(z.name)}</h3>
      <p>${esc(s.short)}</p>
      <span class="svc-go">Dettagli ${icons.arrow}</span>
    </a>`).join("");

  const body = `
<section class="page-head">
  <div class="wrap">
    <nav class="crumbs" aria-label="Percorso"><a href="/">Home</a> ${icons.arrow} <span>${esc(z.name)}</span></nav>
    <span class="page-ico" aria-hidden="true">${icons.pin}</span>
    <h1>Imbianchino e giardiniere a ${esc(z.name)}</h1>
    <p class="lede">${esc(z.note)} Imbiancatura, verniciatura e cura del verde con sopralluogo e preventivo gratuiti entro 48 ore.</p>
    <div class="hero-actions">
      <a class="btn btn-wa" href="${waLink(site, "Salve, vorrei un preventivo a " + z.name + ".")}">${icons.wa}<span>Preventivo WhatsApp</span></a>
      <a class="btn btn-email" href="mailto:${esc(site.business.email)}">${icons.envelope}<span>Preventivo Email</span></a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="sec-title">I nostri servizi a ${esc(z.name)}</h2>
    <div class="svc-grid">${serviceCards}</div>
  </div>
</section>

${ctaBar(site, "Lavori a " + z.name + "?")}
`;

  const jsonLd = ld.jsonLd([
    ld.localBusiness(site),
    ld.breadcrumb(site, [{ name: "Home", path: "/" }, { name: z.name, path: `/zone/${z.slug}/` }]),
  ]);

  return layout(site, {
    title: `Imbianchino e Giardiniere a ${z.name} | Colore & Verde`,
    description: `Imbianchino e giardiniere a ${z.name}: imbiancatura, verniciatura e cura del verde. Preventivo gratuito entro 48h. Chiama ${site.business.phoneDisplay}.`,
    path: `/zone/${z.slug}/`, jsonLd, body,
  });
}

/* ---------- CONTATTI (form -> WhatsApp, tutto lato client) ---------- */
function contattiPage(site) {
  const b = site.business;
  const opts = site.services.map((s) => `<option value="${esc(s.name)}">${esc(s.name)}</option>`).join("");
  const hours = b.openingHours.map((o) => `<li><span>${esc(o.days)}</span><span>${esc(o.from)}–${esc(o.to)}</span></li>`).join("");
  const mapsQ = encodeURIComponent(`${b.address.locality} ${b.address.region} Italia`);

  const body = `
<section class="page-head">
  <div class="wrap">
    <nav class="crumbs" aria-label="Percorso"><a href="/">Home</a> ${icons.arrow} <span>Contatti</span></nav>
    <h1>Contatti e preventivi</h1>
    <p class="lede">Raccontaci cosa ti serve: ti rispondiamo con un preventivo gratuito entro 48 ore. Il modulo qui sotto apre WhatsApp con il messaggio già pronto.</p>
  </div>
</section>

<section class="section">
  <div class="wrap two-col">
    <form class="quote-form" id="quoteForm" data-wa="${esc(b.whatsapp)}">
      <div class="field"><label for="f-nome">Nome</label><input id="f-nome" name="nome" type="text" autocomplete="name" required></div>
      <div class="field"><label for="f-tel">Telefono o email</label><input id="f-tel" name="recapito" type="text" autocomplete="tel" required></div>
      <div class="field"><label for="f-servizio">Servizio</label><select id="f-servizio" name="servizio">${opts}<option value="Altro">Altro</option></select></div>
      <div class="field"><label for="f-zona">Zona / Comune</label><input id="f-zona" name="zona" type="text"></div>
      <div class="field"><label for="f-msg">Descrivi il lavoro</label><textarea id="f-msg" name="messaggio" rows="4" placeholder="Es. tinteggiare due stanze di circa 20 mq…"></textarea></div>
      <button class="btn btn-wa btn-lg" type="submit">${icons.wa}<span>Invia su WhatsApp</span></button>
      <p class="form-note">Niente dati salvati su questo sito: il pulsante apre WhatsApp con il testo già compilato.</p>
    </form>

    <aside class="contact-aside">
      <h2>Scrivici</h2>
      <div class="form-note" style="margin-bottom: 1.5rem; padding: 0.8rem; background: rgba(194, 104, 58, 0.08); border-radius: 8px; color: var(--terra-deep); font-weight: 600; font-size: 0.88rem; line-height: 1.4;">
        <strong>Nota sulle chiamate:</strong> A causa dei filtri anti-spam per i numeri sconosciuti sul nostro telefono, non rispondiamo a chiamate vocali dirette da numeri non salvati. Ti invitiamo a contattarci esclusivamente via WhatsApp o Email.
      </div>
      <a class="contact-row" href="${waLink(site, "Salve, vorrei un preventivo gratuito.")}">${icons.wa}<span><strong>WhatsApp</strong><em>Risposta rapida</em></span></a>
      <a class="contact-row" href="mailto:${esc(b.email)}">${icons.envelope}<span><strong>Email</strong><em>${esc(b.email)}</em></span></a>
      <div class="contact-row static">${icons.pin}<span><strong>${esc(b.address.locality)} (${esc(b.address.region)})</strong><em>e tutta la provincia</em></span></div>
      <h3>Orari</h3>
      <ul class="hours-list">${hours}</ul>
      <a class="map-link" href="https://www.google.com/maps/search/?api=1&query=${mapsQ}" target="_blank" rel="noopener">Apri la zona su Google Maps ${icons.arrow}</a>
    </aside>
  </div>
</section>
`;

  const jsonLd = ld.jsonLd([
    ld.localBusiness(site),
    ld.breadcrumb(site, [{ name: "Home", path: "/" }, { name: "Contatti", path: "/contatti/" }]),
  ]);

  return layout(site, {
    title: "Contatti e Preventivi | Colore & Verde Pistoia",
    description: `Contatta Colore & Verde a Pistoia per imbiancatura, verniciatura e cura del verde. Preventivo gratuito entro 48h. Tel ${b.phoneDisplay}.`,
    path: "/contatti/", active: "contatti", jsonLd, body,
  });
}

/* ---------- PRIVACY (placeholder da far validare) ---------- */
function privacyPage(site) {
  const b = site.business;
  const body = `
<section class="page-head"><div class="wrap">
  <nav class="crumbs" aria-label="Percorso"><a href="/">Home</a> ${icons.arrow} <span>Privacy</span></nav>
  <h1>Informativa privacy</h1>
</div></section>
<section class="section"><div class="wrap prose">
  <p><strong>Nota:</strong> questo è un testo base da far verificare a un consulente. Adattalo alla tua situazione reale.</p>
  <p>Questo sito non utilizza moduli che memorizzano dati sui propri server: il modulo "Contatti" si limita ad aprire l'app WhatsApp con un messaggio precompilato, che invii tu manualmente. Eventuali dati che ci comunichi (nome, recapito, descrizione del lavoro) vengono usati solo per risponderti e formulare un preventivo.</p>
  <p>Titolare del trattamento: ${esc(b.name)}${b.email && !b.email.includes("DA COMPILARE") ? " — " + esc(b.email) : ""}. Per richieste relative ai tuoi dati puoi contattarci ai recapiti indicati nel sito.</p>
  <p>Questo sito è ospitato su Cloudflare Pages; il provider può raccogliere log tecnici (es. indirizzo IP) per il funzionamento e la sicurezza del servizio.</p>
</div></section>`;
  return layout(site, {
    title: "Privacy | Colore & Verde",
    description: "Informativa sulla privacy di Colore & Verde.",
    path: "/privacy/", body,
  });
}

/* ---------- 404 ---------- */
function notFoundPage(site) {
  const body = `
<section class="page-head center"><div class="wrap">
  <h1>Pagina non trovata</h1>
  <p class="lede">La pagina che cerchi non esiste o è stata spostata.</p>
  <div class="hero-actions" style="justify-content:center">
    <a class="btn btn-call" href="/">${icons.arrow}<span>Torna alla home</span></a>
    <a class="btn btn-wa" href="${waLink(site, "Salve, vorrei un preventivo gratuito.")}">${icons.wa}<span>WhatsApp</span></a>
  </div>
</div></section>`;
  return layout(site, { title: "Pagina non trovata | Colore & Verde", description: "Pagina non trovata.", path: "/404.html", body });
}

module.exports = { homePage, servicePage, zonePage, contattiPage, privacyPage, notFoundPage, esc };
