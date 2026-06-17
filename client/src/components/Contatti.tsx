/*
 * CONTATTI — Design: Artigianato Italiano Contemporaneo
 * Layout: testo sinistra + form destra
 * Form con campi arrotondati (radius 2px), focus verde oliva
 * Sfondo: bianco calce
 * Notifica al titolare via tRPC (notifyOwner) ad ogni invio preventivo
 */
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { MapView } from "@/components/Map";

const contatti = [
  { icon: Phone, label: "Telefono / WhatsApp", valore: "+39 338 453 1102", href: "tel:+393384531102" },
  { icon: Mail, label: "Email", valore: "marco.baldi.24@gmail.com", href: "mailto:marco.baldi.24@gmail.com" },
  { icon: MapPin, label: "Zona di Intervento", valore: "Valdinievole e Pistoia", href: "#" },
  { icon: Clock, label: "Orari", valore: "Lun–Ven, 8:00–18:00", href: "#" },
];

export default function Contatti() {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefono: "",
    email: "",
    servizio: "",
    messaggio: "",
  });

  const inviaMutation = trpc.preventivo.invia.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Richiesta inviata! Ti contatteremo entro 24 ore.");
    },
    onError: (err) => {
      toast.error(`Errore nell'invio: ${err.message}. Prova a chiamarci direttamente.`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.telefono || !form.servizio) {
      toast.error("Compila i campi obbligatori: Nome, Telefono e Servizio.");
      return;
    }
    inviaMutation.mutate({
      nome: form.nome,
      telefono: form.telefono,
      email: form.email || undefined,
      servizio: form.servizio,
      messaggio: form.messaggio || undefined,
    });
  };

  const inputClass = `w-full px-4 py-3 font-['DM_Sans'] text-sm text-[oklch(0.22_0.008_65)] bg-white border border-[oklch(0.88_0.018_80)] focus:border-[oklch(0.35_0.08_145)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.35_0.08_145/0.15)] transition-all duration-200 placeholder:text-[oklch(0.65_0.01_65)] disabled:opacity-60 disabled:cursor-not-allowed`;
  const inputStyle = { borderRadius: "2px" };
  const isLoading = inviaMutation.isPending;

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
              Sei nella <strong className="font-semibold text-[oklch(0.22_0.008_65)]">Valdinievole</strong> e cerchi un <strong className="font-semibold text-[oklch(0.22_0.008_65)]">imbianchino</strong> o un <strong className="font-semibold text-[oklch(0.22_0.008_65)]">giardiniere</strong>? Scrivici su WhatsApp o compila il modulo per fissare un <strong className="font-semibold text-[oklch(0.22_0.008_65)]">sopralluogo gratuito</strong> senza impegno. Interveniamo a Montecatini Terme, Pescia, Monsummano Terme, Lamporecchio e in tutta la provincia di Pistoia entro 48 ore.
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

          {/* WhatsApp CTA */}
          <div
            className="reveal mt-6 p-5 bg-[#25D366]/10 border border-[#25D366]/30 flex items-center gap-4"
            style={{ borderRadius: "2px" }}
          >
            <div className="shrink-0 w-12 h-12 bg-[#25D366] flex items-center justify-center shadow-md" style={{ borderRadius: "50%" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6" fill="white" aria-hidden="true">
                <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.352.627 4.655 1.817 6.677L2.667 29.333l6.843-1.793A13.27 13.27 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333S23.366 2.667 16.003 2.667zm0 24.267a11.04 11.04 0 0 1-5.627-1.543l-.403-.24-4.063 1.063 1.083-3.953-.263-.417A10.99 10.99 0 0 1 5.003 16c0-6.067 4.933-11 11-11s11 4.933 11 11-4.933 11-11 11zm6.053-8.24c-.333-.167-1.967-.97-2.27-1.08-.303-.113-.523-.167-.743.167-.22.333-.853 1.08-1.047 1.3-.193.22-.387.247-.72.083-.333-.167-1.407-.52-2.68-1.653-.99-.883-1.66-1.973-1.853-2.307-.193-.333-.02-.513.147-.68.15-.15.333-.387.5-.58.167-.193.22-.333.333-.553.113-.22.057-.413-.027-.58-.083-.167-.743-1.793-1.017-2.453-.267-.643-.54-.557-.743-.567l-.633-.013c-.22 0-.58.083-.883.413-.303.333-1.157 1.13-1.157 2.757s1.183 3.197 1.35 3.417c.167.22 2.33 3.56 5.647 4.993.79.34 1.407.543 1.887.697.793.25 1.513.213 2.083.13.633-.097 1.967-.803 2.243-1.58.277-.777.277-1.44.193-1.58-.08-.14-.3-.22-.633-.387z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-['DM_Sans'] font-semibold text-sm text-[oklch(0.22_0.008_65)] mb-0.5">
                Sei nella Valdinievole? Scrivici su WhatsApp
              </div>
              <p className="font-['DM_Sans'] text-xs text-[oklch(0.42_0.02_65)] leading-relaxed">
                Mandaci un messaggio per descrivere il lavoro che ti serve. Fissiamo subito un <strong>appuntamento gratuito</strong> di valutazione.
              </p>
            </div>
            <a
              href={`https://wa.me/393384531102?text=${encodeURIComponent("Salve! Sono nella zona della Valdinievole e ho bisogno di un imbianchino/giardiniere. Potete fissarmi un appuntamento gratuito di valutazione dell'intervento?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 font-['DM_Sans'] font-semibold text-sm hover:bg-[#1ebe5d] transition-colors duration-200"
              style={{ borderRadius: "2px" }}
            >
              Scrivi ora
            </a>
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

          {/* Google Maps */}
          <div className="reveal mt-8">
            <div className="font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-3 flex items-center gap-2">
              <MapPin size={14} className="text-[oklch(0.35_0.08_145)]" />
              Zona di Intervento — Valdinievole e Pistoia
            </div>
            <div className="overflow-hidden" style={{ borderRadius: "2px", height: "220px" }}>
              <MapView
                className="w-full h-full"
                initialCenter={{ lat: 43.9308, lng: 10.9078 }}
                initialZoom={11}
                onMapReady={(map) => {
                  const marker = new google.maps.marker.AdvancedMarkerElement({
                    map,
                    position: { lat: 43.9308, lng: 10.9078 },
                    title: "Colore & Verde — Pistoia",
                  });
                  const circle = new google.maps.Circle({
                    map,
                    center: { lat: 43.9308, lng: 10.9078 },
                    radius: 25000,
                    fillColor: "#2e5c38",
                    fillOpacity: 0.12,
                    strokeColor: "#2e5c38",
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                  });
                  void marker;
                  void circle;
                }}
              />
            </div>
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
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ nome: "", telefono: "", email: "", servizio: "", messaggio: "" });
                    }}
                    className="mt-6 font-['DM_Sans'] text-sm text-[oklch(0.35_0.08_145)] underline underline-offset-2"
                  >
                    Invia un'altra richiesta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nome" className="block font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-1.5">
                      Nome e Cognome <span className="text-[oklch(0.58_0.13_45)]">*</span>
                    </label>
                    <input
                      id="nome"
                      type="text"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      placeholder="Mario Rossi"
                      className={inputClass}
                      style={inputStyle}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="telefono" className="block font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-1.5">
                        Telefono <span className="text-[oklch(0.58_0.13_45)]">*</span>
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        placeholder="+39 338 453 1102"
                        className={inputClass}
                        style={inputStyle}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-1.5">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="mario@email.it"
                        className={inputClass}
                        style={inputStyle}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servizio" className="block font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-1.5">
                      Servizio Richiesto <span className="text-[oklch(0.58_0.13_45)]">*</span>
                    </label>
                    <select
                      id="servizio"
                      name="servizio"
                      value={form.servizio}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                      disabled={isLoading}
                      required
                    >
                      <option value="" disabled>Seleziona un servizio...</option>
                      <option value="Imbiancatura">Imbiancatura</option>
                      <option value="Verniciatura">Verniciatura</option>
                      <option value="Servizi per il Verde">Servizi per il Verde</option>
                      <option value="Più servizi">Più servizi</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="messaggio" className="block font-['DM_Sans'] text-xs font-semibold text-[oklch(0.32_0.01_65)] uppercase tracking-wide mb-1.5">
                      Descrivi il lavoro
                    </label>
                    <textarea
                      id="messaggio"
                      name="messaggio"
                      value={form.messaggio}
                      onChange={handleChange}
                      placeholder="Descrivi brevemente il lavoro da fare, la superficie approssimativa, eventuali urgenze..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-[oklch(0.35_0.08_145)] text-white py-4 font-['DM_Sans'] font-semibold text-sm tracking-wide hover:bg-[oklch(0.42_0.09_145)] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ borderRadius: "2px" }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Invia Richiesta di Preventivo
                      </>
                    )}
                  </button>

                  <p className="font-['DM_Sans'] text-xs text-[oklch(0.65_0.01_65)] text-center leading-relaxed">
                    I tuoi dati sono al sicuro. Non li condividiamo con terze parti.
                  </p>
                </form>
              )}
            </div>

            {/* Cal.com booking widget */}
            <div className="reveal mt-6 border border-[oklch(0.88_0.018_80)] bg-white overflow-hidden" style={{ borderRadius: "2px" }}>
              <div className="px-6 pt-5 pb-3 border-b border-[oklch(0.93_0.015_80)] flex items-center gap-3">
                <div className="w-8 h-8 bg-[oklch(0.35_0.08_145/0.1)] flex items-center justify-center" style={{ borderRadius: "2px" }}>
                  <Calendar size={16} className="text-[oklch(0.35_0.08_145)]" />
                </div>
                <div>
                  <div className="font-['Playfair_Display'] text-base font-semibold text-[oklch(0.22_0.008_65)]">Prenota un Sopralluogo</div>
                  <div className="font-['DM_Sans'] text-xs text-[oklch(0.52_0.02_65)]">Scegli giorno e ora direttamente nel calendario</div>
                </div>
              </div>
              <iframe
                src="https://cal.com/marco-baldi-mescal0-etauwe?embed=true&theme=light&brandColor=2e5c38"
                className="w-full"
                style={{ height: "500px", border: "none" }}
                title="Prenota un sopralluogo con Colore & Verde"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
