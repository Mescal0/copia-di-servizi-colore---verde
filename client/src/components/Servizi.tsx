/*
 * SERVIZI — Design: Artigianato Italiano Contemporaneo
 * Sfondo: verde oliva scuro (sezione alternata)
 * Card con numerazione grande semitrasparente
 * Tre servizi principali: Imbiancatura, Verniciatura, Verde
 */
import { useRevealObserver } from "@/hooks/useRevealObserver";
import { scrollToSection } from "@/lib/scrollToSection";
import {
  Home,
  Paintbrush2,
  TreePine,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const VERDE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663539711843/HaeMCGMei4PNfU2Mfmv3UP/hero-verde-4mVrCQcVM9FQ7HdTXcTuFW.webp";

const servizi = [
  {
    num: "01",
    icon: Home,
    titolo: "Imbiancatura",
    sottotitolo: "Interni & Esterni",
    descrizione:
      "Tinteggiatura professionale di pareti e soffitti con pitture di alta qualità. Lavoriamo su appartamenti, ville, uffici e condomini con cura e precisione.",
    voci: [
      "Tinteggiatura pareti e soffitti",
      "Pitture decorative e stucchi",
      "Rasatura e preparazione superfici",
      "Pitture antimuffa e traspiranti",
      "Facciate esterne",
    ],
    colore: "bg-white",
    accentColor: "0.35_0.08_145",
  },
  {
    num: "02",
    icon: Paintbrush2,
    titolo: "Verniciatura",
    sottotitolo: "Legno, Ferro & Metalli",
    descrizione:
      "Verniciatura professionale di infissi, porte, cancelli, ringhiere e strutture metalliche. Ripristino e protezione di ogni superficie con prodotti certificati.",
    voci: [
      "Verniciatura infissi in legno",
      "Trattamento antiruggine",
      "Verniciatura cancelli e ringhiere",
      "Smalti e vernici a bassa emissione",
      "Ripristino e restauro",
    ],
    colore: "bg-[oklch(0.93_0.015_80)]",
    accentColor: "0.58_0.13_45",
  },
  {
    num: "03",
    icon: TreePine,
    titolo: "Servizi per il Verde",
    sottotitolo: "Giardini & Spazi Verdi",
    descrizione:
      "Manutenzione e cura di giardini privati e condominiali. Potatura, taglio erba, piantumazione e progettazione di spazi verdi con attenzione all'ambiente.",
    voci: [
      "Taglio e cura del prato",
      "Potatura alberi e siepi",
      "Piantumazione e giardinaggio",
      "Manutenzione ordinaria e straordinaria",
      "Smaltimento verde e ramaglie",
    ],
    colore: "bg-white",
    accentColor: "0.35_0.08_145",
  },
];

export default function Servizi() {
  const sectionRef = useRevealObserver<HTMLElement>();

  return (
    <section id="servizi" ref={sectionRef} className="bg-[oklch(0.97_0.012_85)]">
      {/* Section header — verde oliva */}
      <div className="bg-[oklch(0.28_0.07_145)] py-16 lg:py-20">
        <div className="container text-center">
          <span className="badge-terracotta reveal inline-block mb-4">I Nostri Servizi</span>
          <h2 className="reveal font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Tutto ciò di cui hai bisogno,
            <br />
            <span className="italic text-[oklch(0.75_0.09_80)]">in un unico posto</span>
          </h2>
          <p className="reveal font-['DM_Sans'] text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Offriamo una gamma completa di servizi di imbiancatura, verniciatura e cura del verde a <strong className="font-semibold text-white">Pistoia e Provincia</strong>. Preventivo gratuito e sopralluogo entro 48 ore.
          </p>
        </div>
      </div>

      {/* Services list */}
      <div>
        {servizi.map((s, idx) => (
          <div
            key={s.num}
            className={`${s.colore} py-16 lg:py-24`}
          >
            <div className="container">
              <div
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  idx % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Text side */}
                <div className={`relative ${idx % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <span className="service-number">{s.num}</span>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4 reveal">
                      <div
                        className="w-10 h-10 flex items-center justify-center"
                        style={{
                          background: `oklch(${s.accentColor} / 0.12)`,
                          borderRadius: "2px",
                        }}
                      >
                        <s.icon size={20} style={{ color: `oklch(${s.accentColor})` }} />
                      </div>
                      <span className="badge-terracotta">{s.sottotitolo}</span>
                    </div>

                    <h3 className="reveal font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[oklch(0.22_0.008_65)] mb-4">
                      {s.titolo}
                    </h3>
                    <p className="reveal font-['DM_Sans'] text-base text-[oklch(0.42_0.02_65)] leading-relaxed mb-8">
                      {s.descrizione}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {s.voci.map((v, vi) => (
                        <li
                          key={v}
                          className="reveal flex items-center gap-3 font-['DM_Sans'] text-sm text-[oklch(0.32_0.01_65)]"
                          style={{ transitionDelay: `${vi * 60}ms` }}
                        >
                          <CheckCircle2
                            size={16}
                            style={{ color: `oklch(${s.accentColor})` }}
                            className="shrink-0"
                          />
                          {v}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => scrollToSection("#contatti")}
                      className="reveal inline-flex items-center gap-2 font-['DM_Sans'] font-semibold text-sm tracking-wide group"
                      style={{ color: `oklch(${s.accentColor})` }}
                    >
                      Richiedi un preventivo
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>

                {/* Image side — only for verde (index 2) */}
                {idx === 2 ? (
                  <div className={`reveal ${idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
                      <img
                        src={VERDE_IMAGE}
                        alt="Servizi per il verde"
                        className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[oklch(0.58_0.13_45)]" />
                    </div>
                  </div>
                ) : (
                  /* Decorative element for other services */
                  <div className={`reveal hidden lg:flex items-center justify-center ${idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <div
                      className="w-full max-w-sm aspect-square flex items-center justify-center"
                      style={{
                        background: `oklch(${s.accentColor} / 0.06)`,
                        borderRadius: "2px",
                        border: `1px solid oklch(${s.accentColor} / 0.15)`,
                      }}
                    >
                      <div className="text-center p-8">
                        <s.icon
                          size={80}
                          style={{ color: `oklch(${s.accentColor} / 0.3)` }}
                          className="mx-auto mb-4"
                        />
                        <div
                          className="font-['DM_Mono'] text-6xl font-medium"
                          style={{ color: `oklch(${s.accentColor} / 0.15)` }}
                        >
                          {s.num}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
