import { useState } from "react";
import { CalendarIcon, Menu as MenuIcon, X } from "lucide-react";
import { useReservation } from "@/components/features/ReservationContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { open: openReserve } = useReservation();

  const links = [
    { href: "#nosotros", label: "Nosotros" },
    { href: "#menu", label: "Menú" },
    { href: "#opiniones", label: "Opiniones" },
    { href: "#visitanos", label: "Visítanos" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-cream/80 border-b border-navy/10">
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-2xl font-black text-navy tracking-tight">KAELUM</span>
          {/* Accent text changed from text-mosaic to text-mosaic-dark for color contrast compliance (4.69:1 on cream) */}
          <span className="font-script text-mosaic-dark text-lg -ml-1 hidden sm:inline">coffee &amp; matcha</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-navy/80 hover:text-navy text-sm font-medium transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={openReserve}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-cream text-sm font-semibold shadow-sm hover:scale-[1.03] active:scale-95 transition-transform cursor-pointer"
          >
            <CalendarIcon className="h-4 w-4" /> Reservar
          </button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-navy p-2 -mr-2 cursor-pointer" aria-label="Menú">
          {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-navy/10 bg-cream">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-navy py-2 font-medium">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                openReserve();
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-cream font-semibold cursor-pointer"
            >
              <CalendarIcon className="h-4 w-4" /> Reserva tu mesa
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
