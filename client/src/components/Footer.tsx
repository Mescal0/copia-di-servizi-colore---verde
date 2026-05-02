/*
 * FOOTER — Design: Artigianato Italiano Contemporaneo
 * Sfondo: antracite scuro
 * Bordo superiore terracotta (3px)
 * Logo + link + info legali
 */
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";

export default function Footer() {
  const handleNavClick = (href: string) => {
    scrollToSection(href);
  };

  return (
    <footer className="bg-[oklch(0.18_0.006_65)]" style={{ borderTop: "3px solid oklch(0.58 0.13 45)" }}>
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="font-['Playfair_Display'] text-2xl font-bold text-white mb-2">
              Colore &amp; Verde
            </div>
            <span className="badge-terracotta text-[0.6rem] mb-4 inline-block">Artigiani dal 2005</span>
            <p className="font-['DM_Sans'] text-sm text-white/50 leading-relaxed mt-3">
              Servizi professionali di imbiancatura, verniciatura e cura del verde. Qualità artigianale italiana per la tua casa.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-[oklch(0.58_0.13_45)] flex items-center justify-center transition-colors duration-200"
                style={{ borderRadius: "2px" }}
                aria-label="Facebook — Colore & Verde"
              >
                <Facebook size={16} className="text-white/60 hover:text-white" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-[oklch(0.58_0.13_45)] flex items-center justify-center transition-colors duration-200"
                style={{ borderRadius: "2px" }}
                aria-label="Instagram — Colore & Verde"
              >
                <Instagram size={16} className="text-white/60 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-['DM_Sans'] font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Navigazione
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Chi Siamo", href: "#chi-siamo" },
                { label: "Imbiancatura", href: "#servizi" },
                { label: "Verniciatura", href: "#servizi" },
                { label: "Servizi per il Verde", href: "#servizi" },
                { label: "I Nostri Lavori", href: "#lavori" },
                { label: "Richiedi Preventivo", href: "#contatti" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-['DM_Sans'] text-sm text-white/50 hover:text-[oklch(0.75_0.09_80)] transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-['DM_Sans'] font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Contatti
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-[oklch(0.58_0.13_45)] shrink-0 mt-0.5" />
                <a href="tel:+393384531102" className="font-['DM_Sans'] text-sm text-white/60 hover:text-white transition-colors duration-200">
                  +39 338 453 1102
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-[oklch(0.58_0.13_45)] shrink-0 mt-0.5" />
                <a href="mailto:marco.baldi.24@gmail.com" className="font-['DM_Sans'] text-sm text-white/60 hover:text-white transition-colors duration-200">
                  marco.baldi.24@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[oklch(0.58_0.13_45)] shrink-0 mt-0.5" />
                <span className="font-['DM_Sans'] text-sm text-white/60">
                  Pistoia e Provincia
                </span>
              </li>
            </ul>

            {/* CTA */}
            <button
              onClick={() => handleNavClick("#contatti")}
              className="mt-6 w-full py-3 bg-[oklch(0.35_0.08_145)] text-white font-['DM_Sans'] font-semibold text-sm tracking-wide hover:bg-[oklch(0.42_0.09_145)] transition-colors duration-200"
              style={{ borderRadius: "2px" }}
            >
              Preventivo Gratuito
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-['DM_Sans'] text-xs text-white/30">
            © {new Date().getFullYear()} Colore &amp; Verde. Tutti i diritti riservati.
          </p>
          <p className="font-['DM_Sans'] text-xs text-white/30">
            P.IVA  — Artigiani Italiani
          </p>
        </div>
      </div>
    </footer>
  );
}
