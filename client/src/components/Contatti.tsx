/*
 * CONTATTI — Design: Artigianato Italiano Contemporaneo
 * Layout: testo sinistra + form destra
 * Form con campi arrotondati (radius 2px), focus verde oliva
 * Sfondo: bianco calce
 */
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const contatti = [
  { icon: Phone, label: "Telefono", valore: "+39 338 453 1102", href: "tel:+393384531102" },
  { icon: Mail, label: "Email", valore: "marco.baldi.24@gmail.com", href: "mailto:marco.baldi.24@gmail.com" },
  { icon: MapPin, label: "Zona di Intervento", valore: "Pistoia e Provincia", href: "#" },
  { icon: Clock, label: "Orari", valore: "Lun–Ven, 8:00–18:00", href: "#" },
];

export default function Contatti() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefono: "",
    email: "",
    servizio: "",
    messaggio: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.telefono || !form.servizio) {
      toast.error("Compila i campi obbligatori: Nome, Telefono e Servizio.");
      return;
    }
    setSubmitted(true);
    toast.success("Richiesta inviata! Ti contatteremo entro 24 ore.");
  };

  const inputClass = `w-full px-4 py-3 font-['DM_Sans'] text-sm text-[oklch(0.22_0.008_65)] bg-white border border-[oklch(0.88_0.018_80)] focus:border-[oklch(0.35_0.08_145)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.35_0.08_145/0.15)] transition-all duration-200 placeholder:text-[oklch(0.65_0.01_65)]`;
  const inputStyle = { borderRadius: "2px" };

  return (
    <section id="contatti" ref={sectionRef} className="py-24 lg:py-32 bg-[oklch(0.97_0.012_85)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: info */}
          <div>
            <span className="badge-terracotta reveal inline-block mb-4">Contatti</span>
            <h2 className="reveal font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-[oklch(0.22_0.008_65)] leading-tight mb-6">
              Parliamo del
              <br />
              <span className="italic text-[oklch(0.35_0.08_145)]">tuo progetto</span>
            </h2>
            <p className="reveal font-['DM_Sans'] text-base text-[oklch(0.42_0.02_65)] leading-relaxed mb-10">
              Contattaci per un preventivo gratuito e senza impegno. Risponderemo entro 24 ore e, se necessario, verremo a fare un sopralluogo direttamente da te.
            </p>

            {/* Contact info */}
            <div className="space-y-5">
              {contatti.map((c) => (
                <div key={c.label} className="reveal flex items-start gap-4">
                  <div
                    className="shrink-0 w-10 h-10 bg-[oklch(0.35_0.08_145/0.1)] flex items-center justify-center"
                    style={{ borderRadius: "2px" }}
                  >
                    <c.icon size={18} className="text-[oklch(0.35_0.08_145)]" />
                  </div>
                  <div>
                    <div className="font-['DM_Sans'] text-xs text-[oklch(0.52_0.02_65)] uppercase tracking-wide mb-0.5">{c.label}</div>
                    {c.href !== "#" ? (
                      <a
                        href={c.href}
                        className="font-['DM_Sans'] font-medium text-[oklch(0.22_0.008_65)] hover:text-[oklch(0.35_0.08_145)] transition-colors duration-200"
                      >
                        {c.valore}
                      </a>
                    ) : (
                      <span className="font-['DM_Sans'] font-medium text-[oklch(0.22_0.008_65)]">{c.valore}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div
              className="reveal mt-12 p-6 bg-[oklch(0.35_0.08_145)] text-white"
              style={{ borderRadius: "2px" }}
            >
              <div className="font-['Playfair_Display'] text-lg font-semibold mb-2">
                Preventivo sempre gratuito
              </div>
              <p className="font-['DM_Sans'] text-sm text-white/80 leading-relaxed">
                Sopralluogo gratuito entro 48 ore dalla richiesta. Nessun costo nascosto, nessun impegno.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal">
            <div
              className="bg-white border border-[oklch(0.88_0.018_80)] p-8 shadow-sm"
              style={{ borderRadius: "2px" }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={56} className="text-[oklch(0.35_0.08_145)] mb-4" />
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[oklch(0.22_0.008_65)] mb-3">
                    Richiesta inviata!
                  </h3>
                  <p className="font-['DM_Sans'] text-sm text-[oklch(0.52_0.02_65)] leading-relaxed max-w-xs">
                    Grazie per averci contattato. Ti risponderemo entro 24 ore lavorative.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ nome: "", telefono: "", email: "", servizio: "", messaggio: "" }); }}
                    className="mt-6 font-['DM_Sans'] text-sm text-[oklch(0.35_0.08_145)] underline underline-offset-2"
                  >
                    Invia un'altra richiesta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-1.5">
                      Nome e Cognome <span className="text-[oklch(0.58_0.13_45)]">*</span>
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      placeholder="Mario Rossi"
                      className={inputClass}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-1.5">
                        Telefono <span className="text-[oklch(0.58_0.13_45)]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        placeholder="+39 338 453 1102"
                        className={inputClass}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="mario@email.it"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-1.5">
                      Servizio Richiesto <span className="text-[oklch(0.58_0.13_45)]">*</span>
                    </label>
                    <select
                      name="servizio"
                      value={form.servizio}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                      required
                    >
                      <option value="" disabled>Seleziona un servizio...</option>
                      <option value="imbiancatura">Imbiancatura</option>
                      <option value="verniciatura">Verniciatura</option>
                      <option value="verde">Servizi per il Verde</option>
                      <option value="multiplo">Più servizi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-1.5">
                      Descrivi il lavoro
                    </label>
                    <textarea
                      name="messaggio"
                      value={form.messaggio}
                      onChange={handleChange}
                      placeholder="Descrivi brevemente il lavoro da fare, la superficie approssimativa, eventuali urgenze..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[oklch(0.35_0.08_145)] text-white py-4 font-['DM_Sans'] font-semibold text-sm tracking-wide hover:bg-[oklch(0.42_0.09_145)] active:scale-[0.99] transition-all duration-200"
                    style={{ borderRadius: "2px" }}
                  >
                    <Send size={16} />
                    Invia Richiesta di Preventivo
                  </button>

                  <p className="font-['DM_Sans'] text-xs text-[oklch(0.65_0.01_65)] text-center leading-relaxed">
                    I tuoi dati sono al sicuro. Non li condividiamo con terze parti.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
