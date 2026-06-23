import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { useReservation } from "@/components/features/ReservationContext";
import pasaporteRegios from "@/assets/pasaporte-regios.webp";

export function Passport() {
  const { open: openReserve } = useReservation();

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br md:bg-gradient-to-r from-navy from-50% via-[#194575] to-[#f2994a] text-cream p-6 sm:p-12 md:p-16 shadow-2xl shadow-navy/30">
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#f2994a]/20 blur-3xl pointer-events-none" />

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
              {/* Left Column: Copy & Actions */}
              <div className="md:col-span-7 flex flex-col items-start space-y-6">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-matcha px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                  <span role="img" aria-label="ticket" className="text-xs">🎫</span>
                  Regios x el Café
                </div>
                
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-cream leading-tight">
                  Colecciona tus sellos en el Pasaporte Cafetero
                </h2>
                
                <p className="text-cream/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                  Somos orgullosos miembros del colectivo de barras de especialidad en Monterrey. Ven por tu pasaporte a Kaelum, consume y colecciona tus sellos para obtener recompensas increíbles y explorar las mejores cafeterías de la ciudad.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={openReserve}
                    className="inline-flex items-center justify-center rounded-full bg-matcha hover:bg-matcha/95 text-white px-7 py-3.5 font-bold shadow-md shadow-matcha/20 hover:scale-[1.03] active:scale-95 transition-transform cursor-pointer"
                  >
                    Visítanos Hoy
                  </button>
                  <a
                    href="https://www.regiosporelcafe.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/40 hover:border-white/80 hover:bg-white/5 text-cream px-7 py-3.5 font-bold transition-all cursor-pointer"
                  >
                    Saber más sobre el Pasaporte
                  </a>
                </div>
              </div>

              {/* Right Column: Passport Image Showcase */}
              <div className="md:col-span-5 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative max-w-[360px] sm:max-w-[420px] md:max-w-full rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={pasaporteRegios}
                    alt="Detalle de Kaelum en el Pasaporte Cafetero de Regios x el Café"
                    width={500}
                    height={350}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
