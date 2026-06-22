import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Coffee, Leaf, Cookie, UtensilsCrossed, MapPin, Clock, Instagram, Facebook, Star, MessageCircle, Bike, Menu, X } from "lucide-react";
import { useState } from "react";
import drink1 from "@/assets/drink1.jpg.asset.json";
import clientas from "@/assets/clientas.jpg.asset.json";
import comida from "@/assets/comida.jpg.asset.json";
import mesa from "@/assets/mesa.jpg.asset.json";
import cookies from "@/assets/cookies.jpg.asset.json";
import ramen from "@/assets/ramen.jpg.asset.json";
import logo from "@/assets/logo.jpg.asset.json";

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

const WHATSAPP_URL = "https://wa.me/528112345678?text=Hola%20KAELUM,%20quiero%20hacer%20un%20pedido";
const INSTAGRAM_URL = "https://instagram.com/kaelumcoffee";
const FACEBOOK_URL = "https://facebook.com/kaelumcoffee";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
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
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-matcha px-5 py-2.5 text-white text-sm font-semibold shadow-sm hover:scale-[1.03] active:scale-95 transition-transform"
          >
            <MessageCircle className="h-4 w-4" /> Pedir
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-navy p-2 -mr-2" aria-label="Menú">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-matcha px-5 py-3 text-white font-semibold">
              <MessageCircle className="h-4 w-4" /> Pedir por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
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
            <span className="h-1.5 w-1.5 rounded-full bg-matcha animate-pulse" /> Abierto hoy · Distrito Tec
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-navy leading-[0.95]"
          >
            Tu refugio de <span className="font-script font-normal text-matcha block sm:inline">inspiración</span> y buen gusto en Distrito Tec.
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
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-matcha px-7 py-4 text-white font-semibold shadow-lg shadow-matcha/25 hover:scale-[1.03] active:scale-95 transition-transform"
            >
              <MessageCircle className="h-5 w-5" /> Pedir por WhatsApp
            </a>
            <a
              href="#delivery"
              className="inline-flex items-center gap-2 rounded-full border-2 border-navy/15 bg-white/60 px-7 py-4 text-navy font-semibold hover:border-navy/40 transition-colors"
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
            <div className="flex items-center gap-1 text-matcha">
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
              Un tercer espacio donde el tiempo <span className="text-matcha">rinde y se disfruta.</span>
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
    accent: "bg-matcha",
    span: "md:col-span-5 md:row-span-2",
  },
  {
    title: "Desayunos & Chilaquiles",
    sub: "All-day breakfast con nuestros famosos chilaquiles como protagonistas.",
    img: comida.url,
    icon: UtensilsCrossed,
    accent: "bg-mosaic",
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
    accent: "bg-matcha",
    span: "md:col-span-3",
  },
];

function Menu() {
  return (
    <section id="menu" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-12">
          <p className="font-script text-matcha text-2xl mb-2">lo que servimos</p>
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
                    <span className="absolute top-4 right-4 rounded-full bg-matcha text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5">
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
            <div className="flex items-center gap-0.5 text-matcha">
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
                <div className="flex items-center gap-1 text-matcha mb-4">
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
                <div className="h-11 w-11 shrink-0 rounded-xl bg-matcha grid place-items-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-cream/60 text-xs uppercase tracking-wider font-bold">Dirección</p>
                  <p className="mt-1 font-medium">Av. Luis Elizondo 325 E, Alta Vista,<br />C.P. 64840, Distrito Tec, Monterrey, N.L.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-mosaic grid place-items-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-cream/60 text-xs uppercase tracking-wider font-bold">Horarios</p>
                  <p className="mt-1 font-medium">Lunes a Sábado: 09:00 AM – 8:30 PM<br />Domingo: 09:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-matcha px-6 py-3.5 text-white font-semibold hover:scale-[1.03] active:scale-95 transition-transform"
              >
                <MessageCircle className="h-5 w-5" /> Pedir por WhatsApp
              </a>
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
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-11 w-11 rounded-full bg-cream/10 hover:bg-matcha grid place-items-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-11 w-11 rounded-full bg-cream/10 hover:bg-matcha grid place-items-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-11 w-11 rounded-full bg-cream/10 hover:bg-matcha grid place-items-center transition-colors">
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
