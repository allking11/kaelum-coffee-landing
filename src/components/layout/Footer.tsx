import { Instagram, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.webp";

const WHATSAPP_NUMBER = "528112345678";
const INSTAGRAM_URL = "https://instagram.com/kaelumcoffee";
const FACEBOOK_URL = "https://facebook.com/kaelumcoffee";

export function Footer() {
  return (
    <footer className="bg-navy text-cream/80 pt-16 pb-10 border-t border-cream/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="KAELUM logo"
                width={56}
                height={56}
                className="h-14 w-14 rounded-2xl object-cover"
              />
              <div>
                <p className="font-display text-2xl font-black text-cream">KAELUM</p>
                <p className="font-script text-mosaic-dark text-lg -mt-1">coffee &amp; matcha</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed max-w-xs">
              Tu refugio de inspiración y buen gusto de cada día.
            </p>
          </div>
          <div className="text-sm">
            <p className="text-cream font-bold uppercase tracking-wider text-xs mb-4">Visítanos</p>
            <p>
              Av. Luis Elizondo 325 E, Alta Vista
              <br />
              C.P. 64840, Monterrey, N.L.
              <br />
              (Distrito Tec)
            </p>
          </div>
          <div className="text-sm">
            <p className="text-cream font-bold uppercase tracking-wider text-xs mb-4">Síguenos</p>
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-11 w-11 rounded-full bg-cream/10 hover:bg-mosaic-dark grid place-items-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-11 w-11 rounded-full bg-cream/10 hover:bg-mosaic-dark grid place-items-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="h-11 w-11 rounded-full bg-cream/10 hover:bg-mosaic-dark grid place-items-center transition-colors"
              >
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
