import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import avatarAnna from "@/assets/avatar-anna.webp";
import avatarPaola from "@/assets/avatar-paola.webp";
import avatarFer from "@/assets/avatar-fer.webp";

export function Reviews() {
  const reviews = [
    {
      name: "Anna P. Rojas",
      text: "Delicioso el caramel latte, muy buen balance de sabor a café con el dulce del caramelo… El lugar es amplio y tranquilo, ideal para platicar y pasar el rato.",
      avatar: avatarAnna,
    },
    {
      name: "Paola Yazmin Rosales",
      text: "Me encantó, es un lugar muy tranquilo para trabajar, tienen una variedad de comidas muy ricas, el servicio es increíble.",
      avatar: avatarPaola,
    },
    {
      name: "Fer Ruiz",
      text: "El lugar es muy espacioso… También tienen enchufes e internet para hacer tarea o estudiar. Los chilaquiles estaban muy buenos, al igual que el mocha helado.",
      avatar: avatarFer,
    },
  ];

  return (
    <section id="opiniones" className="py-12 sm:py-16 md:py-28 bg-mosaic-dark/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center space-y-4">
          {/* Google Reseñas Brand Header */}
          <div className="flex items-center gap-1.5 text-2xl font-black tracking-tight">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
            <span className="text-navy/70 font-sans font-medium text-lg ml-1.5">Reseñas</span>
          </div>

          {/* Rating score & stars */}
          <div className="flex items-center gap-3.5">
            <span className="text-5xl font-black text-navy leading-none">4.8</span>
            <div className="flex flex-col items-start">
              <div className="flex gap-0.5 text-[#FBBC05]" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-navy/60 font-medium mt-1">Basado en 280+ opiniones</span>
            </div>
          </div>

          <p className="text-navy/80 text-sm sm:text-base font-medium leading-relaxed max-w-lg">
            Calificado como uno de los mejores spots para café y coworking en Monterrey.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-3xl bg-card p-7 shadow-sm border border-navy/5 flex flex-col"
              >
                {/* Yellow stars for each review */}
                <div className="flex items-center gap-1 text-[#FBBC05] mb-4" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-navy/85 leading-relaxed flex-1">"{r.text}"</p>
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-navy/10">
                  <img
                    src={r.avatar}
                    alt={`Avatar de ${r.name}`}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <p className="text-navy font-bold text-sm">{r.name}</p>
                    <p className="text-navy/50 text-xs">Reseña en Google</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
