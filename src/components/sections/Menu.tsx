import { motion } from "framer-motion";
import { Leaf, UtensilsCrossed, Cookie, Coffee } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useReservation } from "@/components/features/ReservationContext";
import drink1 from "@/assets/drink1.webp";
import comida from "@/assets/comida.webp";
import cookies from "@/assets/cookies.webp";
import ramen from "@/assets/ramen.webp";

export function Menu() {
  const { open: openReserve } = useReservation();

  const menuItems = [
    {
      title: "Matcha Bar & Bebidas Frías",
      sub: "Matcha ceremonial batido al momento, cold brew y signature drinks.",
      img: drink1,
      width: 500,
      height: 625,
      icon: Leaf,
      accent: "bg-mosaic-dark",
      span: "md:col-span-5 md:row-span-2",
    },
    {
      title: "Desayunos & Chilaquiles",
      sub: "All-day breakfast con nuestros famosos chilaquiles como protagonistas.",
      img: comida,
      width: 700,
      height: 400,
      icon: UtensilsCrossed,
      accent: "bg-navy",
      span: "md:col-span-7",
    },
    {
      title: "Nuestras Galletas NY",
      sub: "Rellenas y horneadas a la perfección.",
      img: cookies,
      width: 400,
      height: 400,
      icon: Cookie,
      accent: "bg-navy",
      span: "md:col-span-4",
      featured: true,
    },
    {
      title: "Nuestra Estrella Oculta: Ramen",
      sub: "Un platillo poco convencional que se ha vuelto de culto.",
      img: ramen,
      width: 300,
      height: 300,
      icon: Coffee,
      accent: "bg-mosaic-dark",
      span: "md:col-span-3",
    },
  ];

  return (
    <section id="menu" className="py-12 sm:py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-12">
          <p className="font-script text-mosaic-dark text-2xl mb-2">lo que servimos</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-navy leading-[1.05]">
            Una barra pensada para cada momento del día.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-5">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.08} className={item.span}>
                <motion.article
                  whileHover={{ y: -6 }}
                  onClick={openReserve}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group relative h-full min-h-[240px] sm:min-h-[300px] md:min-h-[340px] rounded-3xl overflow-hidden shadow-lg shadow-navy/10 cursor-pointer"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                  {item.featured && (
                    <span className="absolute top-4 right-4 rounded-full bg-mosaic-dark text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5">
                      Favorito
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${item.accent} text-white mb-3 shadow-lg`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-white/80 text-sm leading-relaxed max-w-md">{item.sub}</p>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
