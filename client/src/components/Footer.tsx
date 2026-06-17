/*
 * FOOTER — Design: Artigianato Italiano Contemporaneo
 * Sfondo: antracite scuro
 * Bordo superiore terracotta (3px)
 * Logo + link + info legali
 */
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
                  Valdinievole e Pistoia
                </span>
              </li>
            </ul>

            {/* CTA */}
            <a
              href={`https://wa.me/393384531102?text=${encodeURIComponent("Salve! Sono nella zona della Valdinievole e ho bisogno di un imbianchino/giardiniere. Potete fissarmi un appuntamento gratuito di valutazione dell'intervento?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-3 bg-[#25D366] text-white font-['DM_Sans'] font-semibold text-sm tracking-wide hover:bg-[#1ebe5d] transition-colors duration-200 flex items-center justify-center gap-2"
              style={{ borderRadius: "2px" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 shrink-0" fill="white" aria-hidden="true">
                <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.352.627 4.655 1.817 6.677L2.667 29.333l6.843-1.793A13.27 13.27 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333S23.366 2.667 16.003 2.667zm0 24.267a11.04 11.04 0 0 1-5.627-1.543l-.403-.24-4.063 1.063 1.083-3.953-.263-.417A10.99 10.99 0 0 1 5.003 16c0-6.067 4.933-11 11-11s11 4.933 11 11-4.933 11-11 11zm6.053-8.24c-.333-.167-1.967-.97-2.27-1.08-.303-.113-.523-.167-.743.167-.22.333-.853 1.08-1.047 1.3-.193.22-.387.247-.72.083-.333-.167-1.407-.52-2.68-1.653-.99-.883-1.66-1.973-1.853-2.307-.193-.333-.02-.513.147-.68.15-.15.333-.387.5-.58.167-.193.22-.333.333-.553.113-.22.057-.413-.027-.58-.083-.167-.743-1.793-1.017-2.453-.267-.643-.54-.557-.743-.567l-.633-.013c-.22 0-.58.083-.883.413-.303.333-1.157 1.13-1.157 2.757s1.183 3.197 1.35 3.417c.167.22 2.33 3.56 5.647 4.993.79.34 1.407.543 1.887.697.793.25 1.513.213 2.083.13.633-.097 1.967-.803 2.243-1.58.277-.777.277-1.44.193-1.58-.08-.14-.3-.22-.633-.387z" />
              </svg>
              WhatsApp — Appuntamento Gratuito
            </a>
            <button
              onClick={() => handleNavClick("#contatti")}
              className="mt-3 w-full py-3 bg-[oklch(0.35_0.08_145)] text-white font-['DM_Sans'] font-semibold text-sm tracking-wide hover:bg-[oklch(0.42_0.09_145)] transition-colors duration-200"
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
