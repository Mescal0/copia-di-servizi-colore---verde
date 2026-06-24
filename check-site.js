#!/usr/bin/env node
/* check-site.js — verifica automatica dello stato del sito e dei canali di contatto.
   Uso:  node check-site.js */

const https = require("https");

const URLS = {
  home: "https://colore-e-verde.pages.dev/",
  contatti: "https://colore-e-verde.pages.dev/contatti/",
};

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Url ${url} ha restituito status ${res.statusCode}`));
        return;
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

async function run() {
  console.log("=== INIZIO ANALISI SETTIMANALE DI CONTROLLO ===");
  try {
    // 1. Verifica Homepage
    console.log("Controllo Homepage...");
    const homeHtml = await fetch(URLS.home);
    console.log("  ✓ Homepage caricata con successo.");

    if (homeHtml.includes('href="tel:')) {
      throw new Error("Errore: Rilevato link di chiamata telefonica diretta (tel:) in Homepage!");
    }
    console.log("  ✓ Nessun link telefonico 'tel:' trovato in Homepage.");

    if (!homeHtml.includes("https://wa.me/")) {
      throw new Error("Errore: Manca il link a WhatsApp in Homepage!");
    }
    console.log("  ✓ Link WhatsApp corretto in Homepage.");

    // 2. Verifica Pagina Contatti
    console.log("Controllo Pagina Contatti...");
    const contattiHtml = await fetch(URLS.contatti);
    console.log("  ✓ Pagina Contatti caricata con successo.");

    if (contattiHtml.includes('href="tel:')) {
      throw new Error("Errore: Rilevato link di chiamata telefonica diretta (tel:) nella pagina Contatti!");
    }
    console.log("  ✓ Nessun link telefonico 'tel:' trovato nella pagina Contatti.");

    if (!contattiHtml.includes("mailto:")) {
      throw new Error("Errore: Manca il link Email (mailto:) nella pagina Contatti!");
    }
    console.log("  ✓ Link Email corretto nella pagina Contatti.");

    const warningText = "filtri anti-spam per i numeri sconosciuti";
    if (!contattiHtml.includes(warningText)) {
      throw new Error("Errore: Nota informativa sui filtri delle chiamate mancante o modificata!");
    }
    console.log("  ✓ Nota informativa sui filtri delle chiamate presente e corretta.");

    console.log("\n✅ TUTTI I CONTROLLI SONO STATI SUPERATI CON SUCCESSO!");
    console.log("Il sito è online, integro e configurato correttamente secondo le tue specifiche.");
  } catch (error) {
    console.error("\n❌ ERRORE RISCONTRATO DURANTE IL CONTROLLO:");
    console.error(error.message);
    process.exit(1);
  }
}

run();
