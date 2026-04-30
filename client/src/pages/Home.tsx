/*
 * HOME PAGE — Design: Artigianato Italiano Contemporaneo
 * Struttura: Navbar → Hero → ChiSiamo → Servizi → Galleria → Testimonianze → Contatti → Footer
 */
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChiSiamo from "@/components/ChiSiamo";
import Servizi from "@/components/Servizi";
import Galleria from "@/components/Galleria";
import Testimonianze from "@/components/Testimonianze";
import Contatti from "@/components/Contatti";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ChiSiamo />
      <Servizi />
      <Galleria />
      <Testimonianze />
      <Contatti />
      <Footer />
    </div>
  );
}
