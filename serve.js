#!/usr/bin/env node
/* serve.js — server statico minimale per provare il sito in locale.
   Uso:  node serve.js   (oppure: npm run serve)
   Poi apri http://localhost:8080 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "dist");
const PORT = process.env.PORT || 8080;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let file = path.join(DIST, p);
  try {
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    else if (!path.extname(file)) {
      // clean URL: prova /percorso/index.html
      const idx = path.join(DIST, p, "index.html");
      if (fs.existsSync(idx)) file = idx;
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      const nf = path.join(DIST, "404.html");
      return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "404");
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(fs.readFileSync(file));
  } catch (e) {
    res.writeHead(500); res.end("Errore: " + e.message);
  }
});

server.listen(PORT, () => {
  console.log(`\n  Sito in anteprima su  →  http://localhost:${PORT}\n  (Ctrl+C per fermare)\n`);
});
