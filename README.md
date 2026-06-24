# Colore & Verde — sito

Sito statico di **Colore & Verde** (imbianchino e cura del verde, Pistoia).
Generato da dati, **senza dipendenze obbligatorie**: serve solo Node.

Il sito è **tuo**: nessun vincolo con Manus o altre piattaforme. Lo ospiti dove
vuoi (qui è pensato per Cloudflare Pages) e lo fai crescere modificando i dati,
non riscrivendo l'HTML.

---

## Avvio rapido

```bash
node build.js      # genera il sito nella cartella dist/
npm run serve      # genera + apre l'anteprima su http://localhost:8080
```

(Per `serve` serve solo Node; nessun `npm install`.)

---

## Com'è fatto (e dove mettere le mani)

```
site.config.js          ← TUTTI i contenuti: dati attività, servizi, zone, recensioni
build.js                ← il generatore: legge il config e scrive dist/
serve.js                ← server locale per l'anteprima
lib/
  templates.js          ← l'HTML delle pagine (header, footer, home, servizi, zone…)
  schema.js             ← dati strutturati JSON-LD (Google: chi sei, dove operi)
assets/
  styles.css            ← grafica
  main.js               ← menu mobile + form WhatsApp
  favicon.svg           ← icona
public/
  images/og-cover.png   ← immagine anteprima social
design/
  og-cover.svg          ← sorgente dell'immagine social (per modificarla)
dist/                   ← OUTPUT generato (non si tocca a mano, non va su Git)
```

**Regola d'oro:** per cambiare contenuti modifichi `site.config.js` e rilanci
`node build.js`. L'HTML è generato.

### La prima cosa da fare
Apri `site.config.js` e compila i campi marcati `[DA COMPILARE]`
(email, indirizzo, P.IVA) e soprattutto il campo **`url`** col tuo dominio.

### Aggiungere un servizio
In `site.config.js`, nell'array `services`, copia un blocco e cambia i campi.
Al prossimo `build` nasce la pagina `/servizi/<slug>/`, già nel menu, nella
sitemap e nei dati strutturati.

### Aggiungere una zona
Stessa cosa nell'array `zones`. ⚠️ Leggi l'avviso nel file: **poche zone vere,
ciascuna con la sua frase `note`**. Decine di pagine fotocopia danneggiano il
posizionamento (vedi sotto).

### Le foto dei lavori
Il sito funziona anche senza foto, ma le foto reali dei tuoi lavori sono ciò che
convince di più. Mettile in `public/images/` e inseriscile dove vuoi nei
template (`lib/templates.js`). Per ora il sito non mostra foto finte: meglio
nessuna foto che foto non tue.

### Rigenerare l'immagine social (opzionale)
È già pronta in `public/images/og-cover.png`. Per modificarla edita
`design/og-cover.svg` e riconvertila (es. con `@resvg/resvg-js`, oppure aprendo
l'SVG in un editor ed esportando un PNG 1200×630).

---

## Deploy su Cloudflare Pages

### Opzione A — collega il repo (consigliata, niente segreti)
1. Metti il progetto su GitHub.
2. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**.
3. Seleziona il repo e imposta:
   - **Build command:** `node build.js`
   - **Build output directory:** `dist`
4. Salva. Da ora **ogni push aggiorna il sito da solo.** Questo è il vero
   "tenerlo aggiornato in automatico": modifichi i dati, fai commit, il sito si
   ricostruisce e si pubblica.

### Opzione B — GitHub Actions
Usa il file `.github/workflows/deploy.yml` (vedi istruzioni dentro). Serve solo
se vuoi gestire il deploy da Actions invece che dall'integrazione Git.

### Dominio
Finché non hai un dominio, usa l'indirizzo `*.pages.dev` che ti assegna
Cloudflare (mettilo nel campo `url` di `site.config.js`). Quando colleghi il
dominio reale, aggiorna `url` e rifai il build.

---

## "Farlo crescere con un agente"

Questo è il punto della tua richiesta, sistemato in modo che funzioni davvero.

- Il sito è **interamente guidato dai dati** (`site.config.js`) e ha una struttura
  stabile. Un agente (o tu) lo fa crescere **modificando i dati e facendo
  commit** — non ricostruendo da zero. Il deploy lo gestisce Cloudflare.
- Il modello giusto è **a evento, non "ogni giorno"**: si ricostruisce quando
  cambia qualcosa di reale (nuovo servizio, nuova zona, recensione vera, foto).
- **Cosa NON far fare a un agente**, perché fa danni con Google:
  - generare ogni giorno testi/post automatici (è "scaled content abuse",
    penalizzato);
  - creare decine di pagine-zona quasi identiche ("doorway pages");
  - inventare recensioni o voti medi nei dati strutturati.

In breve: la frequenza non ti posiziona. Ti posiziona la roba qui sotto.

---

## Cosa ti rende DAVVERO trovabile (in ordine di impatto)

Per un'attività di servizi locali la partita si gioca prima su Google Maps che
sul sito. Ecco la checklist, dalla leva più forte:

### 1. Profilo Google Business — la cosa n.1 (gratis)
- [ ] Crea/rivendica il profilo su **business.google.com**.
- [ ] Categoria principale: **Imbianchino / Pittore edile**; categorie
      secondarie: **Giardiniere**, **Servizio di giardinaggio**.
- [ ] Nome **identico** a quello del sito (Colore & Verde).
- [ ] Telefono **identico** a quello del sito: +39 338 453 1102.
- [ ] Area servita: Pistoia + i comuni che servi (le stesse zone del sito).
- [ ] Orari, descrizione, e **foto vere** dei lavori (prima/dopo).
- [ ] Link al sito.
- [ ] Completa la **verifica** (per posta/telefono/video).
- [ ] Quando è online, incolla il link del profilo nel campo
      `business.social.googleBusiness` di `site.config.js`.

### 2. Recensioni vere
- [ ] Chiedi ai clienti soddisfatti una recensione su Google (mandagli il link
      diretto del profilo). Le recensioni recenti contano più di tutto, dopo il
      profilo stesso.

### 3. Coerenza NAP (Nome–Indirizzo–Telefono)
- [ ] Stessi identici dati su sito, Google Business, Facebook, PagineGialle,
      ecc. Le incongruenze confondono Google.

### 4. Sito (questo) — già impostato
- [x] Title/description per servizio e per zona.
- [x] Dati strutturati LocalBusiness + Service (in `lib/schema.js`).
- [x] `sitemap.xml` e `robots.txt`.
- [ ] **Tu:** imposta `url`, completa i `[DA COMPILARE]`, aggiungi foto reali.
- [ ] In **Google Search Console** (search.google.com/search-console): aggiungi
      il sito, verificalo e invia `sitemap.xml`.

### 5. Contenuto utile, scritto una volta bene
- [ ] Le pagine servizio/zona già ci sono. Se vuoi crescere, aggiungi pagine
      **vere e specifiche** (es. "verniciatura persiane in legno a Pistoia") solo
      quando hai qualcosa di reale da dire. Qualità, non quantità.

---

## Note
- Form contatti: non salva dati su server, apre WhatsApp col messaggio pronto
  (coerente col tuo flusso abituale). La pagina `/privacy/` è un testo base da
  far validare.
- I dati strutturati **non** dichiarano un voto medio finché non inserisci
  recensioni reali nell'array `reviews`: è voluto.
