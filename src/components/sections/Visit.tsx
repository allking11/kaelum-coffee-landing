import { useState } from "react";
import { MapPin, Clock, CalendarIcon, Map, Image as ImageIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useReservation } from "@/components/features/ReservationContext";
import mesa from "@/assets/mesa.webp";

export function Visit() {
  const { open: openReserve } = useReservation();
  const [viewMode, setViewMode] = useState<"map" | "image">("map");

  return (
    <section id="visitanos" className="py-12 sm:py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-2 gap-10 items-stretch">
        <Reveal>
          <div className="relative h-[300px] sm:h-[350px] md:h-full min-h-[300px] sm:min-h-[350px] rounded-3xl overflow-hidden shadow-xl border border-navy/10 flex flex-col bg-white">
            {/* Toggle header */}
            <div className="absolute top-4 right-4 z-10 flex gap-1 rounded-full bg-cream/90 backdrop-blur p-1 shadow-md border border-navy/5">
              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "map"
                    ? "bg-navy text-cream shadow-sm"
                    : "text-navy/70 hover:text-navy"
                }`}
              >
                <Map className="h-3.5 w-3.5" /> Mapa
              </button>
              <button
                type="button"
                onClick={() => setViewMode("image")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "image"
                    ? "bg-navy text-cream shadow-sm"
                    : "text-navy/70 hover:text-navy"
                }`}
              >
                <ImageIcon className="h-3.5 w-3.5" /> Interior
              </button>
            </div>

            {/* View container */}
            <div className="flex-1 w-full h-full relative">
              {viewMode === "map" ? (
                <iframe
                  title="Ubicación de KAELUM Coffee Bar en Google Maps"
                  src="https://maps.google.com/maps?q=Av.%20Luis%20Elizondo%20325E,%20Alta%20Vista,%20Monterrey,%20Nuevo%20Leon,%20Mexico&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <img
                  src={mesa}
                  alt="Interior KAELUM Coffee Bar"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover animate-fade-in duration-300"
                />
              )}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div id="delivery" className="h-full rounded-3xl bg-navy text-cream p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <p className="font-script text-mosaic-dark text-2xl mb-2">encuéntranos</p>
              <h2 className="font-display text-4xl sm:text-5xl font-black leading-tight">
                Tu espacio de inspiración te espera.
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-mosaic-dark grid place-items-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-cream/60 text-xs uppercase tracking-wider font-bold">Ubicación</p>
                    <p className="mt-1 font-medium">
                      Av. Luis Elizondo 325 E, Alta Vista,
                      <br />
                      C.P. 64840, Monterrey, N.L. (Distrito Tec)
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-cream/15 grid place-items-center">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-cream/60 text-xs uppercase tracking-wider font-bold">Horario</p>
                    <p className="mt-1 font-medium">
                      Lunes a Sábado: 09:00 AM – 8:30 PM
                      <br />
                      Domingo: 09:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 flex flex-wrap gap-3 border-t border-cream/10">
              <button
                onClick={openReserve}
                className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-navy font-semibold hover:scale-[1.03] active:scale-95 transition-transform cursor-pointer"
              >
                <CalendarIcon className="h-5 w-5" /> Reservar mesa
              </button>
              <a
                href="https://maps.google.com/?q=Av.+Luis+Elizondo+325E,+Alta+Vista,+Monterrey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-cream/20 px-6 py-3.5 font-semibold hover:border-cream/50 transition-colors"
              >
                <MapPin className="h-5 w-5" /> Cómo llegar
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
