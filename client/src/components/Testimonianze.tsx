/*
 * TESTIMONIANZE — Design: Artigianato Italiano Contemporaneo
 * Sfondo: verde oliva scuro
 * Card con bordo sinistro terracotta
 * Quote in Playfair Display italic
 */
import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const recensioni = [
  {
    nome: "Marco Bianchi",
    luogo: "Milano",
    servizio: "Imbiancatura",
    testo:
      "Lavoro impeccabile! Hanno ridipinto tutto l'appartamento in soli due giorni, con grande cura per i dettagli e senza lasciare traccia del cantiere. Consigliatissimi.",
    stelle: 5,
  },
  {
    nome: "Giulia Ferretti",
    luogo: "Roma",
    servizio: "Verde",
    testo:
      "Il mio giardino non era mai stato così bello. Puntuali, professionali e con un occhio per l'estetica che non mi aspettavo. Tornano ogni mese per la manutenzione.",
    stelle: 5,
  },
  {
    nome: "Roberto Conti",
    luogo: "Firenze",
    servizio: "Verniciatura",
    testo:
      "Hanno verniciato tutti gli infissi della villa, un lavoro enorme fatto con precisione e materiali di prima qualità. Il risultato è straordinario.",
    stelle: 5,
  },
  {
    nome: "Anna Moretti",
    luogo: "Torino",
    servizio: "Imbiancatura",
    testo:
      "Preventivo chiaro, rispetto dei tempi e pulizia del cantiere esemplare. Raramente si trovano artigiani così seri e competenti. Li chiamerò di nuovo sicuramente.",
    stelle: 5,
  },
];

export default function Testimonianze() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[oklch(0.28_0.07_145)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-terracotta reveal inline-block mb-4">Recensioni</span>
          <h2 className="reveal font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-white leading-tight">
            Cosa dicono
            <br />
            <span className="italic text-[oklch(0.75_0.09_80)]">i nostri clienti</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {recensioni.map((r, i) => (
            <div
              key={r.nome}
              className="reveal bg-white/5 border border-white/10 p-7 relative hover:bg-white/10 transition-colors duration-300"
              style={{ borderRadius: "2px", borderLeft: "3px solid oklch(0.58 0.13 45)" }}
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="absolute top-5 right-5 text-white/10"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.stelle }).map((_, si) => (
                  <Star
                    key={si}
                    size={14}
                    className="text-[oklch(0.75_0.09_80)] fill-[oklch(0.75_0.09_80)]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="font-['Playfair_Display'] italic text-lg text-white/85 leading-relaxed mb-6">
                "{r.testo}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-['DM_Sans'] font-semibold text-white text-sm">{r.nome}</div>
                  <div className="font-['DM_Sans'] text-xs text-white/50 mt-0.5">{r.luogo}</div>
                </div>
                <span className="badge-terracotta">{r.servizio}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="reveal mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
          <div>
            <div className="font-['DM_Mono'] text-3xl font-medium text-[oklch(0.75_0.09_80)]">4.9/5</div>
            <div className="font-['DM_Sans'] text-xs text-white/50 mt-1 tracking-wide uppercase">Valutazione Media</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden sm:block" />
          <div>
            <div className="font-['DM_Mono'] text-3xl font-medium text-[oklch(0.75_0.09_80)]">200+</div>
            <div className="font-['DM_Sans'] text-xs text-white/50 mt-1 tracking-wide uppercase">Recensioni Verificate</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden sm:block" />
          <div>
            <div className="font-['DM_Mono'] text-3xl font-medium text-[oklch(0.75_0.09_80)]">98%</div>
            <div className="font-['DM_Sans'] text-xs text-white/50 mt-1 tracking-wide uppercase">Clienti Fidelizzati</div>
          </div>
        </div>
      </div>
    </section>
  );
}
