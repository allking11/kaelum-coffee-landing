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
            <p className="font-script text-mosaic-dark text-2xl mb-3">sobre nosotros</p>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-tight mb-8">
              Un tercer espacio donde el tiempo <span className="text-mosaic-dark">rinde y se disfruta.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-cream/85 text-base sm:text-lg leading-relaxed">
            <p>
              En KAELUM, nacimos con una idea muy clara: crear un espacio donde el tiempo rinde y se disfrute.
              Más que una barra de café, fuimos diseñados para ser ese refugio perfecto dentro del Distrito
              Tec donde la productividad, la calma y el buen gusto se encuentran.
            </p>
            <p>
              Nuestra historia comenzó con la visión de ofrecer un ambiente de inspiración minimalista: un
              lugar lo suficientemente amplio y acogedor como para que puedas concentrarte en tus proyectos,
              relajarte con amigos o simplemente hacer una pausa necesaria.
            </p>
            <p>
              Con el tiempo, fuimos moldeando nuestra identidad. Entendimos que un café de especialidad o un
              matcha cuidadosamente preparado necesitan el acompañamiento perfecto. Por eso, sumamos a nuestra
              barra un menú all-day breakfast —donde nuestros famosos chilaquiles son los protagonistas—, así
              como postres artesanales y platillos poco convencionales que sorprenden el paladar.
            </p>
            <p className="text-cream font-medium">
              Bienvenido a tu nuevo espacio favorito. Siéntate, conéctate y disfruta tu momento.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
