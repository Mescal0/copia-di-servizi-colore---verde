#!/usr/bin/env node
/* build.js — genera il sito statico in /dist a partire da site.config.js.
   Uso:  node build.js
   Zero dipendenze: usa solo Node. */

const fs = require("fs");
const path = require("path");
const site = require("./site.config");
const T = require("./lib/templates");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");

/* utility filesystem */
const write = (rel, content) => {
  const full = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  console.log("  ✓ " + rel);
};
const copyDir = (src, dest) => {
  if (!fs.existsSync(src)) return;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) { fs.mkdirSync(d, { recursive: true }); copyDir(s, d); }
    else fs.copyFileSync(s, d);
  }
};

/* lista delle pagine (serve anche per la sitemap) */
function pageList() {
  const pages = [
    { path: "/", file: "index.html", html: T.homePage(site), priority: "1.0", changefreq: "monthly" },
    { path: "/contatti/", file: "contatti/index.html", html: T.contattiPage(site), priority: "0.8", changefreq: "yearly" },
  ];
  for (const s of site.services)
    pages.push({ path: `/servizi/${s.slug}/`, file: `servizi/${s.slug}/index.html`, html: T.servicePage(site, s), priority: "0.9", changefreq: "monthly" });
  for (const z of site.zones)
    pages.push({ path: `/zone/${z.slug}/`, file: `zone/${z.slug}/index.html`, html: T.zonePage(site, z), priority: "0.7", changefreq: "monthly" });
  pages.push({ path: "/privacy/", file: "privacy/index.html", html: T.privacyPage(site), priority: "0.2", changefreq: "yearly", noindexInSitemap: false });
  return pages;
}

function sitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const base = site.url.replace(/\/$/, "");
  const urls = pages.map((p) => `  <url>
    <loc>${base}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function robots() {
  const base = site.url.replace(/\/$/, "");
  return `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
}

function main() {
  if (site.url.includes("coloreeverde.it")) {
    console.warn("\n⚠  Ricorda di impostare il dominio reale in site.config.js (campo `url`).\n");
  }
  // pulizia
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  console.log("Genero le pagine:");
  const pages = pageList();
  for (const p of pages) write(p.file, p.html);
  write("404.html", T.notFoundPage(site));

  console.log("File tecnici:");
  write("sitemap.xml", sitemap(pages));
  write("robots.txt", robots());

  // asset statici
  console.log("Copio gli asset:");
  copyDir(path.join(ROOT, "assets"), DIST);   // styles.css, main.js, favicon.svg
  copyDir(path.join(ROOT, "public"), DIST);   // images/, ecc.
  console.log("  ✓ assets + public");

  console.log(`\n✅ Fatto. ${pages.length + 1} pagine in /dist\n`);
}

main();
