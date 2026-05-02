/*
 * NAVBAR — Design: Artigianato Italiano Contemporaneo
 * Sfondo trasparente → bianco calce allo scroll
 * Logo: Playfair Display + badge terracotta
 * Link: DM Sans, hover con linea diagonale terracotta
 */
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";

const navLinks = [
  { label: "Chi Siamo", href: "#chi-siamo" },
  { label: "Servizi", href: "#servizi" },
  { label: "Lavori", href: "#lavori" },
  { label: "Contatti", href: "#contatti" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.97_0.012_85/0.97)] shadow-sm backdrop-blur-sm border-b border-[oklch(0.88_0.018_80)]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-3 group"
        >
          <div className="flex flex-col leading-none">
            <span
              className={`font-['Playfair_Display'] font-bold text-xl tracking-tight transition-colors duration-300 ${
                scrolled ? "text-[oklch(0.22_0.008_65)]" : "text-white"
              }`}
            >
              Colore &amp; Verde
            </span>
            <span className="badge-terracotta text-[0.6rem] mt-0.5">
              Artigiani dal 2005
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`font-['DM_Sans'] text-sm font-medium tracking-wide relative group transition-colors duration-300 ${
                scrolled ? "text-[oklch(0.22_0.008_65)]" : "text-white/90"
              } hover:text-[oklch(0.58_0.13_45)]`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[oklch(0.58_0.13_45)] group-hover:w-full transition-all duration-300 skew-x-[-20deg]" />
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contatti")}
            className="flex items-center gap-2 bg-[oklch(0.35_0.08_145)] text-[oklch(0.97_0.012_85)] px-5 py-2.5 text-sm font-semibold tracking-wide hover:bg-[oklch(0.42_0.09_145)] transition-colors duration-300"
            style={{ borderRadius: "2px" }}
          >
            <Phone size={14} />
            Preventivo Gratis
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors duration-300 ${
            scrolled ? "text-[oklch(0.22_0.008_65)]" : "text-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-[oklch(0.97_0.012_85)] border-t border-[oklch(0.88_0.018_80)]`}
      >
        <div className="container py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left py-3 px-2 font-['DM_Sans'] font-medium text-[oklch(0.22_0.008_65)] hover:text-[oklch(0.58_0.13_45)] border-b border-[oklch(0.88_0.018_80)] last:border-0 transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contatti")}
            className="mt-3 flex items-center justify-center gap-2 bg-[oklch(0.35_0.08_145)] text-[oklch(0.97_0.012_85)] px-5 py-3 text-sm font-semibold"
            style={{ borderRadius: "2px" }}
          >
            <Phone size={14} />
            Richiedi Preventivo Gratis
          </button>
        </div>
      </div>
    </header>
  );
}
