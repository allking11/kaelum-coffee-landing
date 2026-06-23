import { Reveal } from "@/components/ui/Reveal";
import matchaVideo from "@/assets/matcha-prep.mp4";
import drink1 from "@/assets/drink1.webp";

export function MatchaVideo() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-12 gap-10 items-center">
        <Reveal className="md:col-span-5 order-2 md:order-1">
          <p className="font-script text-mosaic-dark text-2xl mb-2">el ritual</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-navy leading-[1.05]">
            Matcha batido al momento, como debe ser.
          </h2>
          <p className="mt-6 text-lg text-navy/75 leading-relaxed">
            Cada taza es un pequeño ritual: matcha ceremonial, agua a punto exacto y chasen de bambú. Sin
            atajos, sin polvo viejo. Solo el verde, el sabor y la pausa que te mereces.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <div>
              <p className="font-display text-3xl font-black text-navy">100%</p>
              <p className="text-navy/60">ceremonial grade</p>
            </div>
            <div>
              <p className="font-display text-3xl font-black text-navy">90s</p>
              <p className="text-navy/60">batido a mano</p>
            </div>
            <div>
              <p className="font-display text-3xl font-black text-navy">+12</p>
              <p className="text-navy/60">signature drinks</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 order-1 md:order-2">
          <div className="relative aspect-[4/3] sm:aspect-video md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-navy/20 bg-navy">
            <video
              src={matchaVideo}
              poster={drink1}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Video de la preparación artesanal de Matcha batido con chasen"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-cream">
              <div>
                <p className="font-script text-mosaic-dark text-2xl leading-none">en vivo</p>
                <p className="font-display text-xl font-bold">Preparando tu matcha</p>
              </div>
              <span className="rounded-full bg-cream/15 backdrop-blur px-3 py-1.5 text-xs font-semibold border border-cream/20">
                KAELUM bar
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
