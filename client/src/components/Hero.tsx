/*
 * HERO — Design: Artigianato Italiano Contemporaneo
 * Layout asimmetrico: testo a sinistra (55%), immagine a destra con clip-path diagonale
 * Sfondo: verde oliva scuro con texture
 * Tipografia: Playfair Display molto grande, DM Sans per sottotitolo
 */
import { ArrowDown, CheckCircle } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663539711843/HaeMCGMei4PNfU2Mfmv3UP/hero-painting-YwXPA9dS8FQUHFSfAxAHB8.webp";

export default function Hero() {
  const scrollToServizi = () => {
    document.querySelector("#servizi")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[oklch(0.22_0.008_65)]">
      {/* Background image — full bleed with overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Artigiano imbianchino professionista"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay — stronger on left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.01_65/0.92)] via-[oklch(0.18_0.01_65/0.75)] to-[oklch(0.18_0.01_65/0.35)]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.97_0.012_85)] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container pt-24 pb-20">
        <div className="max-w-2xl">
          <div
            className="animate-hero-fade-in"
          >
            {/* Badge */}
            <span className="badge-terracotta mb-6 inline-block">
              Servizi Professionali dal 2005
            </span>

            {/* Main heading */}
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              Colore,{" "}
              <span className="italic text-[oklch(0.75_0.09_80)]">Cura</span>
              <br />e Qualità
              <br />
              <span className="text-[oklch(0.58_0.13_45)]">Artigianale</span>
              <span className="sr-only"> — Imbiancatura e Verniciatura a Pistoia</span>
            </h1>

            {/* Subtitle */}
            <p className="font-['DM_Sans'] text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
              Imbiancatura, verniciatura e servizi per il verde a <strong className="font-semibold text-white">Pistoia e Provincia</strong>. Trasformiamo i tuoi spazi con cura, precisione e materiali di qualità.
            </p>

            {/* Trust points */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              {["Preventivo gratuito", "Materiali certificati", "Garanzia sul lavoro"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[oklch(0.58_0.13_45)] shrink-0" />
                  <span className="font-['DM_Sans'] text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.querySelector("#contatti")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 bg-[oklch(0.58_0.13_45)] text-white px-8 py-4 font-['DM_Sans'] font-semibold text-base tracking-wide hover:bg-[oklch(0.52_0.14_45)] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ borderRadius: "2px" }}
              >
                Richiedi Preventivo Gratis
              </button>
              <button
                onClick={() => document.querySelector("#servizi")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white px-8 py-4 font-['DM_Sans'] font-medium text-base tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300"
                style={{ borderRadius: "2px" }}
              >
                Scopri i Servizi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServizi}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 animate-bounce"
        aria-label="Scorri verso il basso"
      >
        <ArrowDown size={20} />
      </button>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 hidden lg:block">
        <div className="container">
          <div className="bg-[oklch(0.35_0.08_145)] grid grid-cols-4 divide-x divide-[oklch(0.42_0.09_145)]" style={{ borderRadius: "4px 4px 0 0" }}>
            {[
              { num: "20+", label: "Anni di Esperienza" },
              { num: "500+", label: "Lavori Completati" },
              { num: "100%", label: "Clienti Soddisfatti" },
              { num: "48h", label: "Risposta Garantita" },
            ].map((stat) => (
              <div key={stat.label} className="py-4 px-6 text-center">
                <div className="font-['DM_Mono'] text-2xl font-medium text-[oklch(0.75_0.09_80)]">
                  {stat.num}
                </div>
                <div className="font-['DM_Sans'] text-xs text-white/70 mt-0.5 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
