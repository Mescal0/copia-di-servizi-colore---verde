/*
 * CHI SIAMO — Design: Artigianato Italiano Contemporaneo
 * Layout asimmetrico: immagine sinistra (45%), testo destra (55%)
 * Numerazione grande semitrasparente come elemento grafico
 * Accent terracotta per highlights
 */
import { useEffect, useRef } from "react";
import { Award, Leaf, Paintbrush, Users } from "lucide-react";

const VERNICIATURA_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663539711843/HaeMCGMei4PNfU2Mfmv3UP/hero-verniciatura-iLZHgVHQvLF4XEYbbaQHXe.webp";

const values = [
  { icon: Award, label: "Qualità certificata", desc: "Utilizziamo solo materiali di prima scelta, certificati e a basso impatto ambientale." },
  { icon: Users, label: "Team esperto", desc: "Professionisti con oltre 20 anni di esperienza nel settore edile e del verde." },
  { icon: Leaf, label: "Rispetto dell'ambiente", desc: "Prodotti eco-compatibili e smaltimento responsabile dei materiali di scarto." },
  { icon: Paintbrush, label: "Cura del dettaglio", desc: "Ogni lavoro è trattato con la stessa attenzione, dal piccolo appartamento alla grande villa." },
];

export default function ChiSiamo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="chi-siamo" ref={sectionRef} className="py-24 lg:py-32 bg-[oklch(0.97_0.012_85)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <div className="reveal relative">
            <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
              <img
                src={VERNICIATURA_IMAGE}
                alt="Verniciatura artigianale italiana"
                className="w-full h-[420px] lg:h-[560px] object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Terracotta accent border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[oklch(0.58_0.13_45)]" />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-6 -right-6 bg-[oklch(0.35_0.08_145)] text-white p-6 shadow-xl hidden md:block"
              style={{ borderRadius: "2px" }}
            >
              <div className="font-['DM_Mono'] text-3xl font-medium text-[oklch(0.75_0.09_80)]">20+</div>
              <div className="font-['DM_Sans'] text-xs text-white/70 mt-1 tracking-wide uppercase">Anni di<br/>Esperienza</div>
            </div>
          </div>

          {/* Text column */}
          <div className="relative">
            {/* Large background number */}
            <span className="service-number select-none pointer-events-none">01</span>

            <div className="relative">
              <span className="badge-terracotta reveal mb-4 inline-block">Chi Siamo</span>

              <h2 className="reveal font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-[oklch(0.22_0.008_65)] leading-tight mb-6">
                Artigiani italiani
                <br />
                <span className="italic text-[oklch(0.35_0.08_145)]">con passione</span>
              </h2>

              <p className="reveal font-['DM_Sans'] text-base text-[oklch(0.42_0.02_65)] leading-relaxed mb-4">
                Siamo un'impresa artigiana con oltre vent'anni di esperienza nei settori dell'imbiancatura, verniciatura e cura del verde a <strong className="font-semibold text-[oklch(0.22_0.008_65)]">Pistoia e Provincia</strong>. Lavoriamo con privati, condomini e aziende su tutto il territorio, portando la stessa dedizione in ogni cantiere.
              </p>

              <p className="reveal font-['DM_Sans'] text-base text-[oklch(0.42_0.02_65)] leading-relaxed mb-10">
                La nostra filosofia è semplice: ogni spazio merita il massimo della cura. Che si tratti di ridipingere un appartamento o di riqualificare un giardino, trattiamo ogni lavoro come se fosse casa nostra.
              </p>

              {/* Values grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {values.map((v, i) => (
                  <div
                    key={v.label}
                    className="reveal flex gap-3 p-4 bg-white border border-[oklch(0.88_0.018_80)] hover:border-[oklch(0.35_0.08_145)] hover:shadow-md transition-all duration-300"
                    style={{ borderRadius: "2px", transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="shrink-0 w-9 h-9 bg-[oklch(0.35_0.08_145/0.1)] flex items-center justify-center" style={{ borderRadius: "2px" }}>
                      <v.icon size={18} className="text-[oklch(0.35_0.08_145)]" />
                    </div>
                    <div>
                      <div className="font-['DM_Sans'] font-semibold text-sm text-[oklch(0.22_0.008_65)] mb-0.5">{v.label}</div>
                      <div className="font-['DM_Sans'] text-xs text-[oklch(0.52_0.02_65)] leading-relaxed">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
