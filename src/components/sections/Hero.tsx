import { motion } from "framer-motion";
import { Star, CalendarIcon, Bike } from "lucide-react";
import { useReservation } from "@/components/features/ReservationContext";
import drink1 from "@/assets/drink1.webp";
import cookies from "@/assets/cookies.webp";
import frenteComercio from "@/assets/frente-comercio.webp";

export function Hero() {
  const { open: openReserve } = useReservation();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-20 md:pb-28 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-mosaic-dark/10 px-3 py-1.5 text-mosaic-dark text-xs font-semibold mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mosaic-dark" /> Distrito Tec, Monterrey
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-navy leading-[1.0] md:leading-[0.95]"
          >
            Tu refugio de <span className="font-script font-normal text-mosaic-dark block sm:inline">inspiración</span> y buen gusto de cada día.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg text-navy/75 max-w-xl leading-relaxed"
          >
            Café de especialidad, matcha auténtico y all-day brunch en un espacio diseñado para tus mejores ideas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={openReserve}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-4 text-cream font-semibold shadow-lg shadow-navy/25 hover:scale-[1.03] active:scale-95 transition-transform cursor-pointer"
            >
              <CalendarIcon className="h-5 w-5" /> Reservar mesa
            </button>
            <a
              href="#delivery"
              className="inline-flex items-center gap-2 rounded-full border-2 border-navy/15 bg-white/60 px-7 py-4 text-navy font-semibold hover:border-mosaic-dark transition-colors"
            >
              <Bike className="h-5 w-5" /> Pedir a domicilio
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex items-center gap-4 text-sm text-navy/70"
          >
            <div className="flex items-center gap-1 text-mosaic-dark" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span><strong className="text-navy">4.8 / 5.0</strong> en Google · cientos de mañanas perfectas</span>
          </motion.div>
        </div>

        <div className="md:col-span-6 mt-10 md:mt-0 relative">
          <div className="relative w-full max-w-[540px] sm:max-w-[600px] lg:max-w-[640px] mx-auto aspect-[1.15/1]">
            {/* Storefront Image (Back Left) - The Primary/Most Important image */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20, rotate: 1 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="absolute top-0 left-[2%] w-[64%] aspect-[4/5] z-0"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 5,
                  ease: "easeInOut"
                }}
                className="h-full w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-cream"
              >
                <img
                  src={frenteComercio}
                  alt="Frente de la cafetería KAELUM"
                  width={300}
                  height={375}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Cookies Image (Middle Right) - Secondary, made smaller and shifted right/down to reveal storefront */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              className="absolute top-[12%] right-[-8%] w-[50%] aspect-square z-10"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 4.5,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="h-full w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-cream relative"
              >
                <img
                  src={cookies}
                  alt="Nuestras galletas horneadas"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
                
                {/* Badge overlay on Cookies Image */}
                <div className="absolute bottom-3 right-3 bg-navy/95 backdrop-blur text-cream px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-md flex items-center gap-1.5 z-20">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34A853] animate-pulse" />
                  Abierto hoy hasta 8:30 PM
                </div>
              </motion.div>
            </motion.div>

            {/* Matcha Image (Front Left tilted) - Shifted down/left to avoid covering the storefront logo */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 30, rotate: 0 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -6 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="absolute bottom-[-14%] left-[-5%] w-[52%] aspect-square z-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 4,
                  ease: "easeInOut",
                  delay: 0.2
                }}
                className="h-full w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-cream"
              >
                <img
                  src={drink1}
                  alt="Matcha latte de KAELUM"
                  width={260}
                  height={260}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative mosaic tiles */}
      <div aria-hidden className="pointer-events-none absolute -z-0 top-20 -left-12 grid grid-cols-4 gap-1.5 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="h-5 w-5 rounded-[3px] bg-mosaic-dark/60" />
        ))}
      </div>
    </section>
  );
}

