/*
 * TESTIMONIANZE — Design: Artigianato Italiano Contemporaneo
 * Sezione recensioni avanzata: carosello, badge Google, avatar, data, tag servizio
 * Sfondo: bianco calce con accenti verde oliva e terracotta
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const recensioni = [
  {
    nome: "Marco Bianchi",
    luogo: "Pistoia",
    servizio: "Imbiancatura",
    data: "Marzo 2025",
    stelle: 5,
    avatar: "MB",
    coloreAvatar: "oklch(0.35 0.08 145)",
    testo:
      "Lavoro impeccabile! Hanno ridipinto tutto l'appartamento in soli due giorni, con grande cura per i dettagli e senza lasciare traccia del cantiere. Hanno protetto tutti i mobili e pulito tutto alla fine. Consigliatissimi.",
    utile: 12,
  },
  {
    nome: "Giulia Ferretti",
    luogo: "Montecatini Terme",
    servizio: "Verde",
    data: "Aprile 2025",
    stelle: 5,
    avatar: "GF",
    coloreAvatar: "oklch(0.58 0.13 45)",
    testo:
      "Il mio giardino non era mai stato così bello. Puntuali, professionali e con un occhio per l'estetica che non mi aspettavo. Hanno progettato tutto con cura e ora tornano ogni mese per la manutenzione. Servizio eccellente.",
    utile: 9,
  },
  {
    nome: "Roberto Conti",
    luogo: "Pescia",
    servizio: "Verniciatura",
    data: "Gennaio 2025",
    stelle: 5,
    avatar: "RC",
    coloreAvatar: "oklch(0.42 0.09 145)",
    testo:
      "Hanno verniciato tutti gli infissi della villa, un lavoro enorme fatto con precisione e materiali di prima qualità. Il risultato è straordinario. Preventivo rispettato al centesimo, nessuna sorpresa.",
    utile: 15,
  },
  {
    nome: "Anna Moretti",
    luogo: "Pistoia",
    servizio: "Imbiancatura",
    data: "Febbraio 2025",
    stelle: 5,
    avatar: "AM",
    coloreAvatar: "oklch(0.50 0.10 145)",
    testo:
      "Preventivo chiaro, rispetto dei tempi e pulizia del cantiere esemplare. Raramente si trovano artigiani così seri e competenti. Hanno rifatto tre stanze e il corridoio in tempi record. Li chiamerò di nuovo sicuramente.",
    utile: 8,
  },
  {
    nome: "Luca Esposito",
    luogo: "Serravalle Pistoiese",
    servizio: "Verde",
    data: "Maggio 2025",
    stelle: 5,
    avatar: "LE",
    coloreAvatar: "oklch(0.38 0.09 145)",
    testo:
      "Ho affidato loro la sistemazione completa del giardino dopo anni di abbandono. Risultato sorprendente: potatura, semina, impianto irrigazione. Tutto perfetto e nei tempi concordati. Team gentile e professionale.",
    utile: 11,
  },
  {
    nome: "Francesca Ricci",
    luogo: "Quarrata",
    servizio: "Verniciatura",
    data: "Dicembre 2024",
    stelle: 5,
    avatar: "FR",
    coloreAvatar: "oklch(0.55 0.12 45)",
    testo:
      "Verniciatura completa della facciata esterna di casa. Lavoro svolto con grande attenzione, colori esatti come richiesto e finitura perfetta. Hanno anche sistemato alcune crepe senza costi aggiuntivi. Ottimo rapporto qualità-prezzo.",
    utile: 7,
  },
];

const VISIBLE = 3; // card visibili per volta su desktop

export default function Testimonianze() {
  const sectionRef = useRevealOnScroll<HTMLElement>({ threshold: 0.08, staggerMs: 80 });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = recensioni.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
    }, 6000);
  }, [total]);

  // Auto-avanzamento ogni 6s
  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
    startTimer();
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
    startTimer();
  };

  // Indici delle 3 card visibili (con wrap)
  const visibleIndices = Array.from({ length: VISIBLE }, (_, i) => (current + i) % total);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[oklch(0.97_0.012_85)] overflow-hidden">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <span className="badge-terracotta reveal inline-block mb-4">Recensioni Clienti</span>
            <h2 className="reveal font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-[oklch(0.22_0.008_65)] leading-tight">
              Cosa dicono
              <br />
              <span className="italic text-[oklch(0.35_0.08_145)]">i nostri clienti</span>
            </h2>
          </div>

          {/* Google badge */}
          <div className="reveal flex items-center gap-4 bg-white border border-[oklch(0.88_0.018_80)] px-6 py-4 shadow-sm self-start lg:self-auto" style={{ borderRadius: "4px" }}>
            {/* Google G logo */}
            <svg viewBox="0 0 48 48" className="w-8 h-8 shrink-0" aria-label="Google">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13} className="text-[#FBBC05] fill-[#FBBC05]" />
                ))}
                <span className="font-['DM_Sans'] font-bold text-[oklch(0.22_0.008_65)] text-sm ml-1">4.9</span>
              </div>
              <div className="font-['DM_Sans'] text-xs text-[oklch(0.52_0.02_65)]">200+ recensioni su Google</div>
            </div>
          </div>
        </div>

        {/* Carosello — desktop: 3 card, mobile: 1 */}
        <div className="relative">
          {/* Card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {visibleIndices.map((idx, pos) => {
              const r = recensioni[idx];
              return (
                <motion.div
                  key={`${idx}-${current}`}
                  initial={{ opacity: 0, y: pos === 0 ? -10 : 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: pos * 0.07, ease: "easeOut" }}
                  className="bg-white border border-[oklch(0.88_0.018_80)] p-6 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow duration-300"
                  style={{ borderRadius: "4px", borderTop: `3px solid ${r.coloreAvatar}` }}
                >
                  {/* Top row: avatar + nome + stelle */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 shrink-0 flex items-center justify-center font-['DM_Sans'] font-bold text-sm text-white"
                      style={{ borderRadius: "50%", background: r.coloreAvatar }}
                    >
                      {r.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-['DM_Sans'] font-semibold text-[oklch(0.22_0.008_65)] text-sm leading-tight">{r.nome}</div>
                      <div className="font-['DM_Sans'] text-xs text-[oklch(0.52_0.02_65)] mt-0.5">{r.luogo} · {r.data}</div>
                    </div>
                    <Quote size={20} className="text-[oklch(0.88_0.018_80)] shrink-0" />
                  </div>

                  {/* Stelle */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.stelle }).map((_, si) => (
                      <Star key={si} size={13} className="text-[#FBBC05] fill-[#FBBC05]" />
                    ))}
                  </div>

                  {/* Testo */}
                  <p className="font-['DM_Sans'] text-sm text-[oklch(0.38_0.015_65)] leading-relaxed flex-1">
                    "{r.testo}"
                  </p>

                  {/* Footer card: tag servizio + utile */}
                  <div className="flex items-center justify-between pt-3 border-t border-[oklch(0.93_0.01_80)]">
                    <span className="badge-terracotta text-[0.65rem]">{r.servizio}</span>
                    <div className="flex items-center gap-1.5 text-[oklch(0.60_0.015_65)]">
                      <ThumbsUp size={12} />
                      <span className="font-['DM_Sans'] text-xs">{r.utile} utile</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controlli navigazione */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              aria-label="Recensione precedente"
              className="w-10 h-10 flex items-center justify-center border border-[oklch(0.82_0.02_80)] bg-white hover:bg-[oklch(0.35_0.08_145)] hover:border-[oklch(0.35_0.08_145)] hover:text-white text-[oklch(0.42_0.02_65)] transition-all duration-200"
              style={{ borderRadius: "2px" }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {recensioni.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); startTimer(); }}
                  aria-label={`Vai alla recensione ${i + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: i === current ? "oklch(0.35 0.08 145)" : "oklch(0.80 0.02 80)",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Recensione successiva"
              className="w-10 h-10 flex items-center justify-center border border-[oklch(0.82_0.02_80)] bg-white hover:bg-[oklch(0.35_0.08_145)] hover:border-[oklch(0.35_0.08_145)] hover:text-white text-[oklch(0.42_0.02_65)] transition-all duration-200"
              style={{ borderRadius: "2px" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Trust bar */}
        <div className="reveal mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "4.9/5", label: "Valutazione Media", sub: "su Google Reviews" },
            { num: "200+", label: "Recensioni Verificate", sub: "da clienti reali" },
            { num: "98%", label: "Clienti Soddisfatti", sub: "tornano da noi" },
            { num: "20+", label: "Anni di Esperienza", sub: "nel settore" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white border border-[oklch(0.88_0.018_80)] p-5 text-center shadow-sm"
              style={{ borderRadius: "4px" }}
            >
              <div className="font-['DM_Mono'] text-3xl font-medium text-[oklch(0.35_0.08_145)] mb-1">{item.num}</div>
              <div className="font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide">{item.label}</div>
              <div className="font-['DM_Sans'] text-xs text-[oklch(0.60_0.015_65)] mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* CTA lascia recensione */}
        <div className="reveal mt-10 text-center">
          <p className="font-['DM_Sans'] text-sm text-[oklch(0.52_0.02_65)] mb-3">
            Sei già nostro cliente? Lascia la tua recensione su Google e aiuta altri a sceglierci.
          </p>
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJ_colore_verde_pistoia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-['DM_Sans'] text-sm font-semibold text-[oklch(0.35_0.08_145)] border border-[oklch(0.35_0.08_145)] px-5 py-2.5 hover:bg-[oklch(0.35_0.08_145)] hover:text-white transition-all duration-200"
            style={{ borderRadius: "2px" }}
          >
            <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Scrivi una recensione su Google
          </a>
        </div>

      </div>
    </section>
  );
}
