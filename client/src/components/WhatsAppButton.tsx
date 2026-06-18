/*
 * WHATSAPP BUTTON — Design: Artigianato Italiano Contemporaneo
 * Pulsante fluttuante in basso a destra con tooltip e animazione pulse
 * Numero: +39 338 453 1102
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const WHATSAPP_URL = getWhatsAppUrl();

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="bg-[oklch(0.18_0.006_65)] text-white font-['DM_Sans'] text-sm font-medium px-4 py-2.5 shadow-lg whitespace-nowrap pointer-events-none"
            style={{ borderRadius: "4px" }}
          >
            Scrivici su WhatsApp — Sopralluogo Gratuito
            {/* Arrow */}
            <span
              className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-[oklch(0.18_0.006_65)]"
              style={{ content: '""', display: "block", position: "absolute" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contattaci su WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 flex items-center justify-center shadow-xl"
        style={{
          borderRadius: "50%",
          background: "#25D366",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        }}
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: "rgba(37,211,102,0.35)",
            animationDuration: "2s",
          }}
        />
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 relative z-10"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.352.627 4.655 1.817 6.677L2.667 29.333l6.843-1.793A13.27 13.27 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333S23.366 2.667 16.003 2.667zm0 24.267a11.04 11.04 0 0 1-5.627-1.543l-.403-.24-4.063 1.063 1.083-3.953-.263-.417A10.99 10.99 0 0 1 5.003 16c0-6.067 4.933-11 11-11s11 4.933 11 11-4.933 11-11 11zm6.053-8.24c-.333-.167-1.967-.97-2.27-1.08-.303-.113-.523-.167-.743.167-.22.333-.853 1.08-1.047 1.3-.193.22-.387.247-.72.083-.333-.167-1.407-.52-2.68-1.653-.99-.883-1.66-1.973-1.853-2.307-.193-.333-.02-.513.147-.68.15-.15.333-.387.5-.58.167-.193.22-.333.333-.553.113-.22.057-.413-.027-.58-.083-.167-.743-1.793-1.017-2.453-.267-.643-.54-.557-.743-.567l-.633-.013c-.22 0-.58.083-.883.413-.303.333-1.157 1.13-1.157 2.757s1.183 3.197 1.35 3.417c.167.22 2.33 3.56 5.647 4.993.79.34 1.407.543 1.887.697.793.25 1.513.213 2.083.13.633-.097 1.967-.803 2.243-1.58.277-.777.277-1.44.193-1.58-.08-.14-.3-.22-.633-.387z" />
        </svg>
      </motion.a>
    </div>
  );
}
