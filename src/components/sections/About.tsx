import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import company from "@/assets/company.webp";
import clientas from "@/assets/clientas.webp";

export function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      src: clientas,
      alt: "Clientas en KAELUM Coffee Bar",
    },
    {
      src: company,
      alt: "KAELUM Coffee Bar",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="nosotros" className="py-12 sm:py-16 md:py-28 bg-navy text-cream relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-12 gap-12 items-center">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-navy/20">
            <AnimatePresence>
              <motion.img
                key={currentSlide}
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                width={500}
                height={625}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </Reveal>
        <div className="md:col-span-7">
          <Reveal>
            <p className="font-script text-mosaic-dark text-2xl mb-3">el propósito</p>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-tight mb-8">
              Un tercer espacio donde el tiempo <span className="text-mosaic-dark">rinde y se disfruta.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-cream/85 text-base sm:text-lg leading-relaxed">
            <p>
              Nacimos con una intención clara: redefinir tu relación con el café y el espacio. KAELUM es ese "tercer espacio" entre tu casa y tu trabajo; un refugio minimalista diseñado para que la productividad, la calma y el buen gusto coincidan en armonía.
            </p>
            <p>
              Cada detalle de nuestra barra está pensado para acompañar tu jornada. Desde la selección de granos de especialidad hasta la precisión ceremonial de nuestro matcha batido al momento, te ofrecemos la atmósfera ideal para concentrarte en tus proyectos, platicar sin prisa o disfrutar de un respiro necesario.
            </p>
            <p>
              Creemos en los sabores honestos hechos con cuidado. Por ello, creamos una propuesta culinaria activa todo el día —con nuestros aclamados chilaquiles como protagonistas y repostería artesanal horneada a diario— que combinan la tradición local con el toque moderno que te gusta.
            </p>
            <p className="text-cream font-medium">
              Te damos la bienvenida a tu nueva rutina favorita. Pasa, conéctate y haz que tu tiempo rinda.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
