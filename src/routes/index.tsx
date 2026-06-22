import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Leaf, Cookie, UtensilsCrossed, MapPin, Clock, Instagram, Facebook, Star, MessageCircle, Bike, Menu as MenuIcon, X, Users, Calendar as CalendarIcon, Minus, Plus, Send } from "lucide-react";
import { useState, useMemo, createContext, useContext } from "react";
import drink1 from "@/assets/drink1.jpg.asset.json";
import clientas from "@/assets/clientas.jpg.asset.json";
import comida from "@/assets/comida.jpg.asset.json";
import mesa from "@/assets/mesa.jpg.asset.json";
import cookies from "@/assets/cookies.jpg.asset.json";
import ramen from "@/assets/ramen.jpg.asset.json";
import logo from "@/assets/logo.jpg.asset.json";
import matchaVideo from "@/assets/matcha-prep.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KAELUM Coffee Bar — Café, Matcha y Brunch en Distrito Tec, Monterrey" },
      { name: "description", content: "Tu refugio de inspiración en Distrito Tec. Café de especialidad, matcha auténtico, brunch all-day, galletas NY y ramen. Abierto todos los días." },
      { property: "og:title", content: "KAELUM Coffee Bar — Distrito Tec, Monterrey" },
      { property: "og:description", content: "Café de especialidad, matcha y all-day brunch en un espacio diseñado para tus mejores ideas." },
      { property: "og:image", content: comida.url },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "528112345678";
const INSTAGRAM_URL = "https://instagram.com/kaelumcoffee";
const FACEBOOK_URL = "https://facebook.com/kaelumcoffee";

// ---------------- Reservation (WhatsApp checkout) ----------------

type ReservationCtx = { open: () => void };
const ReservationContext = createContext<ReservationCtx>({ open: () => {} });
const useReservation = () => useContext(ReservationContext);

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function ReservationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("10:00");
  const [note, setNote] = useState("");

  const minDate = useMemo(() => todayISO(), []);
  const canSubmit = name.trim().length >= 2 && people >= 1 && date && time;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const cleanName = name.trim().slice(0, 60);
    const cleanNote = note.trim().slice(0, 200);
    const lines = [
      `Hola KAELUM 👋, quiero reservar una mesa.`,
      ``,
      `• Nombre: ${cleanName}`,
      `• Personas: ${people}`,
      `• Día: ${date}`,
      `• Hora: ${time}`,
      cleanNote ? `• Nota: ${cleanNote}` : "",
      ``,
      `¿Me confirman disponibilidad? ¡Gracias!`,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-navy/60 backdrop-blur-sm grid place-items-end sm:place-items-center px-0 sm:px-5"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-cream rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-navy text-cream px-6 py-5 flex items-start justify-between">
              <div>
                <p className="font-script text-mosaic text-xl leading-none">reservá tu mesa</p>
                <h3 className="font-display text-2xl font-black mt-1">Aseguramos tu lugar</h3>
                <p className="text-cream/70 text-sm mt-1">Te confirmamos por WhatsApp en minutos.</p>
              </div>
              <button onClick={onClose} aria-label="Cerrar" className="text-cream/80 hover:text-cream p-1 -mr-1 -mt-1">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={submit} className="p-6 space-y-4">
              <label className="block">
                <span className="text-navy/80 text-xs font-bold uppercase tracking-wider">Tu nombre</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  required
                  placeholder="¿Cómo te llamás?"
                  className="mt-1.5 w-full rounded-xl border-2 border-navy/15 bg-white px-4 py-3 text-navy placeholder:text-navy/30 focus:border-mosaic focus:outline-none transition-colors"
                />
              </label>

              <div>
                <span className="text-navy/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Personas</span>
                <div className="mt-1.5 flex items-center gap-3 rounded-xl border-2 border-navy/15 bg-white px-2 py-2">
                  <button type="button" onClick={() => setPeople(Math.max(1, people - 1))} className="h-10 w-10 rounded-lg bg-navy/5 hover:bg-navy/10 grid place-items-center text-navy">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex-1 text-center font-display font-bold text-2xl text-navy tabular-nums">{people}</span>
                  <button type="button" onClick={() => setPeople(Math.min(20, people + 1))} className="h-10 w-10 rounded-lg bg-navy/5 hover:bg-navy/10 grid place-items-center text-navy">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-navy/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><CalendarIcon className="h-3.5 w-3.5" /> Día</span>
                  <input
                    type="date"
                    value={date}
                    min={minDate}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border-2 border-navy/15 bg-white px-3 py-3 text-navy focus:border-mosaic focus:outline-none transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="text-navy/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Hora</span>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    min="09:00"
                    max="20:30"
                    className="mt-1.5 w-full rounded-xl border-2 border-navy/15 bg-white px-3 py-3 text-navy focus:border-mosaic focus:outline-none transition-colors"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-navy/80 text-xs font-bold uppercase tracking-wider">Nota (opcional)</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={200}
                  rows={2}
                  placeholder="Ocasión, preferencia de mesa…"
                  className="mt-1.5 w-full rounded-xl border-2 border-navy/15 bg-white px-4 py-3 text-navy placeholder:text-navy/30 focus:border-mosaic focus:outline-none transition-colors resize-none"
                />
              </label>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 text-cream font-semibold shadow-lg shadow-navy/20 hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" /> Enviar reserva por WhatsApp
              </button>
              <p className="text-center text-navy/50 text-xs">Abriremos WhatsApp con tu reserva lista para enviar.</p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
} as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeUp as any}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
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
          <span className="font-script text-mosaic text-lg -ml-1 hidden sm:inline">coffee &amp; matcha</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-navy/80 hover:text-navy text-sm font-medium transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={openReserve}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-cream text-sm font-semibold shadow-sm hover:scale-[1.03] active:scale-95 transition-transform"
          >
            <CalendarIcon className="h-4 w-4" /> Reservar
          </button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-navy p-2 -mr-2" aria-label="Menú">
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
              onClick={() => { setOpen(false); openReserve(); }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-cream font-semibold"
            >
              <CalendarIcon className="h-4 w-4" /> Reservar mesa
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { open: openReserve } = useReservation();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-16 md:pt-20 md:pb-28 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-mosaic/10 px-3 py-1.5 text-mosaic text-xs font-semibold mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mosaic animate-pulse" /> Abierto hoy · Distrito Tec
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-navy leading-[0.95]"
          >
            Tu refugio de <span className="font-script font-normal text-mosaic block sm:inline">inspiración</span> y buen gusto en Distrito Tec.
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
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-4 text-cream font-semibold shadow-lg shadow-navy/25 hover:scale-[1.03] active:scale-95 transition-transform"
            >
              <CalendarIcon className="h-5 w-5" /> Reservar mesa
            </button>
            <a
              href="#delivery"
              className="inline-flex items-center gap-2 rounded-full border-2 border-navy/15 bg-white/60 px-7 py-4 text-navy font-semibold hover:border-mosaic transition-colors"
            >
              <Bike className="h-5 w-5" /> Apps de Delivery
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex items-center gap-4 text-sm text-navy/70"
          >
            <div className="flex items-center gap-1 text-mosaic">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <span><strong className="text-navy">4.8 / 5.0</strong> en Google · cientos de reseñas</span>
          </motion.div>
        </div>

        <div className="md:col-span-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-navy/20">
              <img src={drink1.url} alt="Matcha latte preparado en KAELUM" className="h-full w-full object-cover" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 w-40 sm:w-52 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-cream hidden sm:block"
            >
              <img src={cookies.url} alt="Galletas NY KAELUM" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 6 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -top-6 -right-4 bg-navy text-cream rounded-2xl px-4 py-3 shadow-xl hidden sm:block"
            >
              <p className="font-script text-xl leading-none">recién hecho</p>
              <p className="text-xs opacity-80 mt-1">matcha ceremonial</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative mosaic tiles */}
      <div aria-hidden className="pointer-events-none absolute -z-0 top-20 -left-12 grid grid-cols-4 gap-1.5 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="h-5 w-5 rounded-[3px] bg-mosaic/60" />
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="py-20 md:py-28 bg-navy text-cream relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-12 gap-12 items-center">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img src={clientas.url} alt="Clientas en KAELUM Coffee Bar" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <div className="md:col-span-7">
          <Reveal>
            <p className="font-script text-mosaic text-2xl mb-3">sobre nosotros</p>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-tight mb-8">
              Un tercer espacio donde el tiempo <span className="text-mosaic">rinde y se disfruta.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-cream/85 text-base sm:text-lg leading-relaxed">
            <p>En KAELUM, nacimos con una idea muy clara: crear un espacio donde el tiempo rinda y se disfrute. Más que una barra de café, fuimos diseñados para ser ese refugio perfecto dentro del Distrito Tec donde la productividad, la calma y el buen gusto se encuentran.</p>
            <p>Nuestra historia comenzó con la visión de ofrecer un ambiente de inspiración minimalista: un lugar lo suficientemente amplio y acogedor como para que puedas concentrarte en tus proyectos, relajarte con amigos o simplemente hacer una pausa necesaria.</p>
            <p>Con el tiempo, fuimos moldeando nuestra identidad. Entendimos que un café de especialidad o un matcha cuidadosamente preparado necesitan el acompañamiento perfecto. Por eso, sumamos a nuestra barra un menú all-day breakfast —donde nuestros famosos chilaquiles son los protagonistas—, así como postres artesanales y platillos poco convencionales que sorprenden el paladar.</p>
            <p className="text-cream font-medium">Bienvenido a tu nuevo espacio favorito. Siéntate, conéctate y disfruta tu momento.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const menuItems = [
  {
    title: "Matcha Bar & Bebidas Frías",
    sub: "Matcha ceremonial batido al momento, cold brew y signature drinks.",
    img: drink1.url,
    icon: Leaf,
    accent: "bg-mosaic",
    span: "md:col-span-5 md:row-span-2",
  },
  {
    title: "Desayunos & Chilaquiles",
    sub: "All-day breakfast con nuestros famosos chilaquiles como protagonistas.",
    img: comida.url,
    icon: UtensilsCrossed,
    accent: "bg-navy",
    span: "md:col-span-7",
  },
  {
    title: "Nuestras Galletas NY",
    sub: "Rellenas y horneadas a la perfección.",
    img: cookies.url,
    icon: Cookie,
    accent: "bg-navy",
    span: "md:col-span-4",
    featured: true,
  },
  {
    title: "Nuestra Estrella Oculta: Ramen",
    sub: "Un platillo poco convencional que se ha vuelto culto.",
    img: ramen.url,
    icon: Coffee,
    accent: "bg-mosaic",
    span: "md:col-span-3",
  },
];

function Menu() {
  return (
    <section id="menu" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-12">
          <p className="font-script text-mosaic text-2xl mb-2">lo que servimos</p>
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
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group relative h-full min-h-[280px] md:min-h-[340px] rounded-3xl overflow-hidden shadow-lg shadow-navy/10 cursor-pointer"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                  {item.featured && (
                    <span className="absolute top-4 right-4 rounded-full bg-mosaic text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5">
                      Favorito
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${item.accent} text-white mb-3 shadow-lg`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">{item.title}</h3>
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

const reviews = [
  {
    name: "Anna P. Rojas",
    text: "Delicioso el caramel latte, muy buen balance de sabor a café con el dulce del caramelo… El lugar es amplio y tranquilo, ideal para platicar y pasar el rato.",
    initial: "A",
  },
  {
    name: "Paola Yazmin Rosales",
    text: "Me encantó, es un lugar muy tranquilo para trabajar, tienen una variedad de comidas muy ricas, el servicio es increíble.",
    initial: "P",
  },
  {
    name: "Fer Ruiz",
    text: "El lugar es muy espacioso… También tienen enchufes e internet para hacer tarea o estudiar. Los chilaquiles estaban muy buenos, al igual que el mocha helado.",
    initial: "F",
  },
];

function Reviews() {
  return (
    <section id="opiniones" className="py-20 md:py-28 bg-mosaic/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 mb-5 shadow-sm">
            <div className="flex items-center gap-0.5 text-mosaic">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <span className="text-navy text-sm font-bold">4.8 — 5.0 en Google</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-navy leading-tight">
            Lo que dice <span className="font-script text-mosaic font-normal">nuestra comunidad</span>.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-3xl bg-cream p-7 shadow-sm border border-navy/5 flex flex-col"
              >
                <div className="flex items-center gap-1 text-mosaic mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-navy/85 leading-relaxed flex-1">"{r.text}"</p>
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-navy/10">
                  <div className="h-11 w-11 rounded-full bg-navy text-cream grid place-items-center font-display font-bold text-lg">
                    {r.initial}
                  </div>
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

function Visit() {
  const { open: openReserve } = useReservation();
  return (
    <section id="visitanos" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-2 gap-10 items-stretch">
        <Reveal>
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full rounded-3xl overflow-hidden shadow-xl">
            <img src={mesa.url} alt="Interior KAELUM Coffee Bar" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div id="delivery" className="h-full rounded-3xl bg-navy text-cream p-8 sm:p-10 flex flex-col">
            <p className="font-script text-mosaic text-2xl mb-2">visítanos</p>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-tight">Te esperamos en Distrito Tec.</h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-mosaic grid place-items-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-cream/60 text-xs uppercase tracking-wider font-bold">Dirección</p>
                  <p className="mt-1 font-medium">Av. Luis Elizondo 325 E, Alta Vista,<br />C.P. 64840, Distrito Tec, Monterrey, N.L.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-cream/15 grid place-items-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-cream/60 text-xs uppercase tracking-wider font-bold">Horarios</p>
                  <p className="mt-1 font-medium">Lunes a Sábado: 09:00 AM – 8:30 PM<br />Domingo: 09:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 flex flex-wrap gap-3">
              <button
                onClick={openReserve}
                className="inline-flex items-center gap-2 rounded-full bg-mosaic px-6 py-3.5 text-white font-semibold hover:scale-[1.03] active:scale-95 transition-transform"
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

function Footer() {
  return (
    <footer className="bg-navy text-cream/80 pt-16 pb-10 border-t border-cream/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="KAELUM logo" className="h-14 w-14 rounded-2xl object-cover" />
              <div>
                <p className="font-display text-2xl font-black text-cream">KAELUM</p>
                <p className="font-script text-mosaic text-lg -mt-1">coffee &amp; matcha</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed max-w-xs">Tu refugio de inspiración y buen gusto en Distrito Tec, Monterrey.</p>
          </div>
          <div className="text-sm">
            <p className="text-cream font-bold uppercase tracking-wider text-xs mb-4">Visítanos</p>
            <p>Av. Luis Elizondo 325 E, Alta Vista<br />C.P. 64840, Distrito Tec<br />Monterrey, N.L.</p>
          </div>
          <div className="text-sm">
            <p className="text-cream font-bold uppercase tracking-wider text-xs mb-4">Síguenos</p>
            <div className="flex gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-11 w-11 rounded-full bg-cream/10 hover:bg-mosaic grid place-items-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-11 w-11 rounded-full bg-cream/10 hover:bg-mosaic grid place-items-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-11 w-11 rounded-full bg-cream/10 hover:bg-mosaic grid place-items-center transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} KAELUM Coffee Bar. Todos los derechos reservados.</p>
          <p>Hecho con café y matcha en Monterrey.</p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-cream text-navy min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Reviews />
      <Visit />
      <Footer />
    </main>
  );
}
