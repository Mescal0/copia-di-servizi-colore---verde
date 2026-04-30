# Idee di Design — Servizi Colore & Verde

## Contesto
Sito web per un artigiano/impresa che offre servizi di imbiancatura, verniciatura e cura del verde. Il target è privati e piccole imprese che cercano affidabilità, professionalità e qualità.

---

<response>
<probability>0.07</probability>
<text>
## Idea 1 — Artigianato Italiano Contemporaneo (Bauhaus Mediterraneo)

**Design Movement:** Bauhaus reinterpretato con influenze mediterranee — geometria pulita incontra calore italiano.

**Core Principles:**
- Asimmetria strutturata: colonne di larghezze diverse, testi a sinistra con immagini a destra in proporzioni auree
- Contrasto cromatico forte tra bianco sporco (calce) e verde oliva profondo
- Tipografia espressiva come elemento grafico, non solo funzionale
- Sezioni divise da bande diagonali sottili invece di separatori orizzontali

**Color Philosophy:**
- Sfondo: bianco calce `#F5F0E8` — evoca pareti appena imbiancate
- Primario: verde oliva scuro `#3D5A3E` — richiama il lavoro sul verde
- Accento: terracotta `#C4622D` — calore artigianale italiano
- Testo: antracite `#2C2C2C`

**Layout Paradigm:**
- Hero asimmetrico: testo grande a sinistra (60%), immagine a destra con clip-path diagonale
- Sezione servizi in griglia 3+1 con card di altezze variabili
- Galleria in masonry layout
- Footer a colonne con bordo superiore in terracotta

**Signature Elements:**
- Numero di servizio in grande (01, 02, 03) come sfondo semitrasparente dietro i titoli
- Linea diagonale sottile che attraversa le sezioni come filo conduttore visivo
- Badge arrotondati con etichette di servizio in terracotta

**Interaction Philosophy:**
- Hover su card: leggero sollevamento con ombra lunga
- Scroll reveal con entrata da sinistra per testi, da destra per immagini
- Cursore personalizzato con cerchio verde

**Animation:**
- Entrate con `opacity: 0 → 1` + `translateY(20px → 0)` con stagger 150ms
- Hero: testo appare lettera per lettera (typewriter effect leggero)
- Immagini: scale da 1.05 → 1 all'entrata

**Typography System:**
- Display: `Playfair Display` — eleganza artigianale, serif con carattere
- Body: `DM Sans` — leggibilità moderna, sans-serif pulita
- Accent: `DM Mono` — per numeri e dettagli tecnici
</text>
</response>

<response>
<probability>0.08</probability>
<text>
## Idea 2 — Craft Industrial (Officina Moderna)

**Design Movement:** Industrial craft — estetica da officina artigiana con tocchi di modernità scandinava.

**Core Principles:**
- Texture e materiali: sfondi con grain sottile, bordi spessi, effetti carta
- Palette ristretta: quasi monocromatica con un solo accento vivace
- Layout a colonne verticali strette con molto spazio bianco
- Fotografia in bianco e nero con overlay di colore

**Color Philosophy:**
- Sfondo: grigio carta `#EFEFEA`
- Primario: verde foresta `#2D5016` — deciso, naturale
- Accento: giallo ocra `#D4A017` — pennello, vernice, sole
- Testo: nero quasi puro `#1A1A1A`

**Layout Paradigm:**
- Navigazione verticale a sinistra fissa (sidebar nav)
- Contenuto principale scorre a destra
- Sezioni con numerazione progressiva grande in background
- Galleria in strip orizzontali a scorrimento

**Signature Elements:**
- Texture grain su tutti gli sfondi (SVG filter)
- Bordi spessi (4px) in verde foresta come accenti strutturali
- Timbri/badge con effetto "timbro artigianale"

**Interaction Philosophy:**
- Hover: cambio colore di sfondo a blocchi interi
- Scroll orizzontale per la galleria lavori
- Pulsanti con effetto "inchiostro" che si espande al click

**Animation:**
- Entrate con wipe effect (clip-path da sinistra)
- Contatori animati per statistiche (anni esperienza, lavori completati)
- Parallax leggero sulle immagini hero

**Typography System:**
- Display: `Bebas Neue` — impatto industriale, tutto maiuscolo
- Body: `IBM Plex Sans` — tecnico ma leggibile
- Dettagli: `Courier Prime` — effetto macchina da scrivere
</text>
</response>

<response>
<probability>0.06</probability>
<text>
## Idea 3 — Verde Naturale Contemporaneo (Biophilic Design)

**Design Movement:** Biophilic design contemporaneo — connessione con la natura attraverso forme organiche e palette naturali.

**Core Principles:**
- Forme organiche: bordi curvi, blob shapes, nessun angolo netto
- Gerarchia visiva attraverso dimensioni tipografiche molto diverse
- Sezioni che "respirano" con ampio padding verticale
- Immagini in forme circolari o con mask organiche

**Color Philosophy:**
- Sfondo: bianco puro con sezioni in verde salvia chiaro `#E8F0E3`
- Primario: verde bosco `#2E5D34`
- Secondario: verde menta `#7BAE7F`
- Accento: bianco sporco `#FBF8F3`
- Testo: verde scurissimo `#1A2E1C`

**Layout Paradigm:**
- Hero centrato con grande immagine circolare affiancata da testo
- Servizi in layout alternato (immagine-testo, testo-immagine)
- Sezione "perché sceglierci" con icone grandi in cerchi colorati
- Testimonial in card con bordo sinistro colorato

**Signature Elements:**
- Forme blob SVG come sfondi decorativi
- Cerchi di dimensioni diverse come contenitori per immagini
- Foglie/piante come elementi decorativi SVG

**Interaction Philosophy:**
- Hover morbido con transizioni lente (400ms)
- Scroll molto fluido con momentum
- Form di contatto con campi arrotondati e focus verde

**Animation:**
- Elementi che "crescono" come piante (scale da 0 → 1 con easing elastico)
- Parallax sulle forme blob
- Fade in morbido per ogni sezione

**Typography System:**
- Display: `Cormorant Garamond` — eleganza naturale, serif classico
- Body: `Nunito` — rotondo, amichevole, leggibile
- Accent: `Cormorant Garamond Italic` — per citazioni e highlight
</text>
</response>

---

## Scelta Finale: Idea 1 — Artigianato Italiano Contemporaneo

Questa scelta riflette meglio il profilo di un artigiano italiano professionale: calore mediterraneo, solidità artigianale, e un'estetica contemporanea che trasmette fiducia e qualità. Il contrasto tra bianco calce e verde oliva comunica sia i servizi di imbiancatura che quelli per il verde in modo coerente e visivamente forte.
