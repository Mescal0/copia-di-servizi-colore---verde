/* =========================================================================
   site.config.js — UNICA FONTE DI VERITÀ DEL SITO
   -------------------------------------------------------------------------
   Modifica QUESTO file (o i dati qui dentro) per far crescere il sito.
   Aggiungere un servizio o una zona = aggiungere un oggetto agli array.
   Poi lancia:  node build.js
   Non serve toccare l'HTML a mano.
   ========================================================================= */

const site = {
  /* -----------------------------------------------------------------------
     1) DOMINIO DEL SITO  ←←← LA COSA PIÙ IMPORTANTE DA SISTEMARE
     Usato per canonical, sitemap.xml, Open Graph e dati strutturati.
     - Se hai già il dominio: mettilo qui (es. https://www.coloreeverde.it)
     - Se non ce l'hai ancora: metti l'indirizzo *.pages.dev che ti assegna
       Cloudflare (es. https://colore-e-verde.pages.dev) e cambialo dopo.
     SENZA lo "https://" e SENZA "/" finale.
  ----------------------------------------------------------------------- */
  url: "https://colore-e-verde.pages.dev",

  /* -----------------------------------------------------------------------
     2) DATI DELL'ATTIVITÀ
     Quelli con [DA COMPILARE] vanno completati con i tuoi dati reali.
     Sono importanti per Google Business e per i dati strutturati.
  ----------------------------------------------------------------------- */
  business: {
    name: "Marco Baldi",
    // Nome/ragione del titolare per documenti e schema (facoltativo ma utile)
    legalName: "Marco Baldi",
    tagline: "Imbiancature e cura del verde — Pistoia e Firenze",
    foundedYear: 2005,

    // Contatti
    phoneDisplay: "+39 338 453 1102",
    phoneTel: "+393384531102",       // formato per i link tel:
    whatsapp: "393384531102",        // formato per wa.me (senza + e senza spazi)
    email: "marco.baldi.24@gmail.com",

    // Indirizzo / sede operativa (serve allo schema LocalBusiness e a Google)
    address: {
      street: "Via Francesca Nord 930/B",
      locality: "Monsummano Terme",
      region: "PT",                  // sigla provincia
      postalCode: "51015",
      country: "IT",
    },

    // Coordinate (presi dal vecchio sito: zona Pistoia). Aggiornale se vuoi.
    geo: { lat: 43.9308, lng: 10.9078 },

    // Partita IVA (per il footer). Lascia vuoto se non vuoi mostrarla.
    vat: "",

    // Fascia di prezzo indicativa per lo schema (€, €€, €€€)
    priceRange: "€€",

    // Orari (per schema + footer). Adatta ai tuoi reali.
    openingHours: [
      { days: "Lun–Ven", from: "08:00", to: "18:00" },
    ],

    // Social (lascia "" quelli che non hai)
    social: {
      facebook: "",
      instagram: "",
      googleBusiness: "", // link al profilo Google quando lo crei
    },
  },

  /* -----------------------------------------------------------------------
     3) SERVIZI  — ogni oggetto genera una pagina /servizi/<slug>/
     Per aggiungerne uno: copia un blocco e cambia i campi.
  ----------------------------------------------------------------------- */
  services: [
    {
      slug: "imbiancatura",
      name: "Imbiancatura e Tinteggiatura",
      short: "Pareti e soffitti perfetti, dentro e fuori casa.",
      // <title> e meta description della pagina
      title: "Imbiancatura e Tinteggiatura a Pistoia e Firenze | Marco Baldi",
      metaDescription:
        "Imbiancatura e tinteggiatura di interni ed esterni a Pistoia, Montecatini e Firenze. Lavoro pulito, preventivo gratuito entro 48h su WhatsApp o email.",
      h1: "Imbiancatura e tinteggiatura",
      intro:
        "Tinteggiamo interni ed esterni con cura del dettaglio e protezione totale di pavimenti e mobili. Dalla singola stanza alla casa intera, ti diciamo prima quanto costa e quanto ci mettiamo.",
      bullets: [
        "Tinteggiatura interni: stanze, appartamenti, uffici, negozi",
        "Imbiancatura esterni e facciate",
        "Preparazione fondi: stuccatura, rasatura, carteggiatura",
        "Pitture lavabili, traspiranti e antimuffa",
        "Protezione mobili e pavimenti, pulizia a fine lavoro",
      ],
      pricing: [
        { label: "Pittura Traspirante", price: "5–9 €/mq" },
        { label: "Lavabile", price: "12 €/mq" },
        { label: "Smalti", price: "14 €/mq" },
        { label: "Rasatura", price: "15 €/mq" },
        { label: "Impalcature", price: "8 €/mq" },
        { label: "Trattamenti Antimuffa", price: "da 7 €/mq" },
      ],
    },
    {
      slug: "verniciatura",
      name: "Verniciatura Legno e Ferro",
      short: "Infissi, persiane, cancelli e ringhiere come nuovi.",
      title: "Verniciatura Legno e Ferro a Pistoia e Firenze | Marco Baldi",
      metaDescription:
        "Verniciatura e trattamento di legno e ferro a Pistoia e Firenze: persiane, portoni, cancelli, ringhiere. Prodotti professionali, preventivo gratuito entro 48h.",
      h1: "Verniciatura di legno e ferro",
      intro:
        "Trattiamo e verniciamo legno e ferro per proteggerli dal tempo e restituire l'aspetto originale. Carteggiatura, fondo, protezione antiruggine o impregnante e finitura, fatti come si deve.",
      bullets: [
        "Persiane, scuri, portoni e infissi in legno",
        "Cancelli, ringhiere e inferriate in ferro",
        "Trattamento antiruggine e zincante per il ferro",
        "Impregnanti e finiture protettive per il legno",
        "Restauro di portoni e serramenti d'epoca",
      ],
      pricing: [
        { label: "Verniciatura (Legno e Ferro)", price: "25 €/mq" },
      ],
    },
    {
      slug: "cura-del-verde",
      name: "Cura del Verde e Giardinaggio",
      short: "Giardini ordinati tutto l'anno, senza pensieri.",
      title: "Giardiniere a Pistoia e Firenze — Cura del Verde | Marco Baldi",
      metaDescription:
        "Giardiniere a Pistoia, Montecatini e Firenze: sfalcio prati, potatura siepi e piante, pulizia aree verdi. Interventi singoli o manutenzione periodica. Preventivo gratuito.",
      h1: "Cura del verde e giardinaggio",
      intro:
        "Manteniamo il tuo verde in ordine durante tutto l'anno: dal taglio dell'erba alla potatura, fino alla pulizia stagionale. Interventi una tantum o contratti di manutenzione periodica.",
      bullets: [
        "Sfalcio e manutenzione prati",
        "Potatura di siepi, arbusti e piante",
        "Pulizia e sistemazione aree verdi",
        "Raccolta e smaltimento del verde di risulta",
        "Manutenzione periodica per privati e aziende",
      ],
    },
  ],

  /* -----------------------------------------------------------------------
     4) ZONE SERVITE — ogni oggetto genera una pagina /zone/<slug>/
     ⚠️ ATTENZIONE (importante per Google): NON creare decine di pagine
     quasi identiche cambiando solo il nome del paese. Google le considera
     "doorway pages" e penalizza. Tieni poche zone REALI e scrivi per
     ciascuna almeno la frase "nota" personalizzata (un riferimento vero
     alla zona). Meglio 6 pagine vere che 40 fotocopie.
  ----------------------------------------------------------------------- */
  zones: [
    { slug: "pistoia", name: "Pistoia",
      note: "Operiamo in tutta la città e nei quartieri limitrofi, dal centro storico alle zone residenziali." },
    { slug: "montecatini-terme", name: "Montecatini Terme",
      note: "Interveniamo su appartamenti, ville e attività ricettive della zona termale." },
    { slug: "monsummano-terme", name: "Monsummano Terme",
      note: "È la nostra zona base: tempi di intervento rapidi e sopralluoghi senza impegno." },
    { slug: "pescia", name: "Pescia",
      note: "Serviamo Pescia e le frazioni della Valdinievole." },
    { slug: "montale", name: "Montale",
      note: "Disponibili per privati e condomìni in tutto il comune." },
    { slug: "quarrata", name: "Quarrata",
      note: "Copriamo Quarrata e l'area della piana pistoiese." },
    { slug: "firenze", name: "Firenze",
      note: "Interveniamo anche a Firenze e provincia per lavori programmati: imbiancature complete, verniciature e manutenzione del verde." },
  ],

  /* -----------------------------------------------------------------------
     5) RECENSIONI / TESTIMONIANZE
     ⚠️ Usa SOLO recensioni VERE. Recensioni inventate nei dati strutturati
     sono contro le regole di Google e fanno più danni che altro.
     Se lasci l'array vuoto, la sezione non viene mostrata e NON viene
     emesso alcun "voto medio" (AggregateRating) nello schema.
  ----------------------------------------------------------------------- */
  reviews: [
    // Esempio di formato (sostituisci con recensioni reali o cancella):
    // { author: "Giulia R.", text: "Lavoro pulito e puntuale, casa rimessa a nuovo.", zone: "Pistoia" },
  ],

  /* -----------------------------------------------------------------------
     5b) CHI SONO — sezione di presentazione personale in home
  ----------------------------------------------------------------------- */
  about: {
    title: "Chi sono",
    paragraphs: [
      "Mi chiamo Marco e dal 2005 mi occupo di imbiancature, verniciature e cura del verde tra Pistoia, la Valdinievole e Firenze. Lavoro in prima persona su ogni cantiere: chi mi scrive parla direttamente con chi poi farà il lavoro.",
      "Che si tratti di tinteggiare un appartamento, riportare a nuovo un cancello in ferro o tenere in ordine un giardino tutto l'anno, il metodo è lo stesso: sopralluogo gratuito, preventivo chiaro per iscritto entro 48 ore, cantiere protetto e pulito a fine lavoro.",
    ],
    // Contatto preferito: WhatsApp o email. Niente chiamate dirette.
    note: "Preferisco essere contattato su WhatsApp o via email: rispondo appena possibile, di solito in giornata.",
  },

  /* -----------------------------------------------------------------------
     5c) GALLERIA LAVORI — pagina /lavori/ + anteprima in home
     type: "image" usa src + thumb (WebP). type: "video" usa src (mp4 H.264).
  ----------------------------------------------------------------------- */
  gallery: [
    { type: "image", src: "/images/lavori/img-4684.webp", thumb: "/images/lavori/img-4684-thumb.webp",
      alt: "Esterno di villetta con facciata e travi del portico tinteggiati", label: "Tinteggiatura esterni — villetta" },
    { type: "image", src: "/images/lavori/img-5036.webp", thumb: "/images/lavori/img-5036-thumb.webp",
      alt: "Camera tinteggiata di bianco con finitura uniforme", label: "Tinteggiatura interni — camera" },
    { type: "image", src: "/images/lavori/img-5077.webp", thumb: "/images/lavori/img-5077-thumb.webp",
      alt: "Soggiorno con pareti bianche appena tinteggiate durante il cantiere", label: "Tinteggiatura interni — soggiorno" },
    { type: "image", src: "/images/lavori/img-4978.webp", thumb: "/images/lavori/img-4978-thumb.webp",
      alt: "Corridoio con travi in legno a vista e pareti tinteggiate di fresco", label: "Interni con travi a vista" },
    { type: "image", src: "/images/lavori/img-4979.webp", thumb: "/images/lavori/img-4979-thumb.webp",
      alt: "Mansarda con travi in legno e pareti bianche tinteggiate", label: "Tinteggiatura mansarda" },
    { type: "image", src: "/images/lavori/img-5038.webp", thumb: "/images/lavori/img-5038-thumb.webp",
      alt: "Bagno lavanderia con pareti tinteggiate di bianco", label: "Tinteggiatura bagno" },
    { type: "image", src: "/images/lavori/img-0377.webp", thumb: "/images/lavori/img-0377-thumb.webp",
      alt: "Cancello scorrevole in ferro riverniciato di verde scuro", label: "Verniciatura cancello — dopo" },
    { type: "image", src: "/images/lavori/img-0376.webp", thumb: "/images/lavori/img-0376-thumb.webp",
      alt: "Cancellata in ferro con vernice scrostata prima del trattamento", label: "Verniciatura cancello — prima" },
    { type: "image", src: "/images/lavori/img-0373.webp", thumb: "/images/lavori/img-0373-thumb.webp",
      alt: "Portone in ferro ossidato prima del trattamento antiruggine", label: "Trattamento antiruggine — prima" },
    { type: "image", src: "/images/lavori/img-0291.webp", thumb: "/images/lavori/img-0291-thumb.webp",
      alt: "Ringhiera in ferro di un balcone prima del restauro", label: "Restauro ringhiera — prima" },
    { type: "image", src: "/images/lavori/img-0293.webp", thumb: "/images/lavori/img-0293-thumb.webp",
      alt: "Balconata con ringhiera in ferro da riverniciare", label: "Restauro balconata — prima" },
    { type: "video", src: "/images/lavori/video-1.mp4", label: "Video dal cantiere" },
    { type: "video", src: "/images/lavori/video-2.mp4", label: "Video dal cantiere" },
    { type: "video", src: "/images/lavori/video-3.mp4", label: "Video dal cantiere" },
    { type: "video", src: "/images/lavori/video-4.mp4", label: "Video dal cantiere" },
    { type: "video", src: "/images/lavori/video-5.mp4", label: "Video dal cantiere" },
    { type: "video", src: "/images/lavori/video-6.mp4", label: "Video dal cantiere" },
    { type: "video", src: "/images/lavori/video-7.mp4", label: "Video dal cantiere" },
  ],

  /* -----------------------------------------------------------------------
     6) PUNTI DI FORZA mostrati in home ("Perché sceglierci")
  ----------------------------------------------------------------------- */
  highlights: [
    { title: "Dal 2005", text: "Esperienza vera sul campo, non improvvisazione." },
    { title: "Preventivo entro 48h", text: "Sopralluogo gratuito e prezzo chiaro per iscritto." },
    { title: "Cantiere pulito", text: "Proteggiamo mobili e pavimenti e lasciamo tutto in ordine." },
    { title: "Un solo referente", text: "Imbiancatura, verniciatura e verde gestiti dalla stessa squadra." },
  ],
};

module.exports = site;
