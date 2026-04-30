/*
 * GALLERIA — Design: Artigianato Italiano Contemporaneo
 * Griglia masonry-style con immagini Unsplash
 * Sfondo: sabbia chiaro
 * Hover: overlay verde oliva con titolo
 */
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const lavori = [
  {
    id: 1,
    titolo: "Appartamento Milano",
    categoria: "Imbiancatura",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    span: "row-span-2",
  },
  {
    id: 2,
    titolo: "Villa Toscana",
    categoria: "Verniciatura",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    span: "",
  },
  {
    id: 3,
    titolo: "Giardino Privato",
    categoria: "Verde",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    span: "",
  },
  {
    id: 4,
    titolo: "Condominio Roma",
    categoria: "Imbiancatura",
    img: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&q=80",
    span: "row-span-2",
  },
  {
    id: 5,
    titolo: "Cancello in Ferro",
    categoria: "Verniciatura",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    span: "",
  },
  {
    id: 6,
    titolo: "Parco Aziendale",
    categoria: "Verde",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    span: "",
  },
];

const categorie = ["Tutti", "Imbiancatura", "Verniciatura", "Verde"];

export default function Galleria() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filtro, setFiltro] = useState("Tutti");
  const [lightbox, setLightbox] = useState<typeof lavori[0] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filtrati = filtro === "Tutti" ? lavori : lavori.filter((l) => l.categoria === filtro);

  return (
    <section id="lavori" ref={sectionRef} className="py-24 lg:py-32 bg-[oklch(0.93_0.015_80)]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="badge-terracotta reveal inline-block mb-4">I Nostri Lavori</span>
            <h2 className="reveal font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-[oklch(0.22_0.008_65)] leading-tight">
              Risultati che
              <br />
              <span className="italic text-[oklch(0.35_0.08_145)]">parlano da soli</span>
            </h2>
          </div>
          {/* Filter tabs */}
          <div className="reveal flex flex-wrap gap-2">
            {categorie.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className={`px-4 py-2 font-['DM_Sans'] text-sm font-medium tracking-wide transition-all duration-200 ${
                  filtro === cat
                    ? "bg-[oklch(0.35_0.08_145)] text-white"
                    : "bg-white text-[oklch(0.42_0.02_65)] hover:bg-[oklch(0.35_0.08_145/0.1)] border border-[oklch(0.88_0.018_80)]"
                }`}
                style={{ borderRadius: "2px" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
          {filtrati.map((lavoro) => (
            <div
              key={lavoro.id}
              className={`reveal relative overflow-hidden group cursor-pointer ${lavoro.span}`}
              style={{ borderRadius: "2px" }}
              onClick={() => setLightbox(lavoro)}
            >
              <img
                src={lavoro.img}
                alt={lavoro.titolo}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[oklch(0.28_0.07_145/0)] group-hover:bg-[oklch(0.28_0.07_145/0.85)] transition-all duration-400 flex flex-col justify-end p-5">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="badge-terracotta text-[0.6rem] mb-2 inline-block">{lavoro.categoria}</span>
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-white">{lavoro.titolo}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.img.replace("w=600", "w=1200")}
              alt={lightbox.titolo}
              className="w-full max-h-[80vh] object-contain"
              style={{ borderRadius: "2px" }}
            />
            <div className="mt-4 flex items-center gap-3">
              <span className="badge-terracotta">{lightbox.categoria}</span>
              <span className="font-['Playfair_Display'] text-xl text-white font-semibold">{lightbox.titolo}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
