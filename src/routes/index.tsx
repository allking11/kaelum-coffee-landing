import { createFileRoute } from "@tanstack/react-router";
import { ReservationProvider } from "@/components/features/ReservationContext";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { MatchaVideo } from "@/components/sections/MatchaVideo";
import { Menu } from "@/components/sections/Menu";
import { Passport } from "@/components/sections/Passport";
import { Reviews } from "@/components/sections/Reviews";
import { Careers } from "@/components/sections/Careers";
import { Visit } from "@/components/sections/Visit";
import { Footer } from "@/components/layout/Footer";
import { ReservationModal } from "@/components/features/ReservationModal";
import comida from "@/assets/comida.webp";
import logo from "@/assets/logo.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KAELUM Coffee Bar — Café, Matcha y Brunch en Distrito Tec, Monterrey" },
      { name: "description", content: "Tu refugio de inspiración en Distrito Tec. Café de especialidad, matcha auténtico, brunch all-day, galletas NY y ramen. Abierto todos los días." },
      { property: "og:title", content: "KAELUM Coffee Bar — Distrito Tec, Monterrey" },
      { property: "og:description", content: "Café de especialidad, matcha y all-day brunch en un espacio diseñado para tus mejores ideas." },
      { property: "og:image", content: logo },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FoodEstablishment",
          "name": "KAELUM Coffee Bar",
          "image": comida,
          "@id": "https://kaelumcoffee.com",
          "url": "https://kaelumcoffee.com",
          "telephone": "+528112345678",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Luis Elizondo 325 E, Alta Vista",
            "addressLocality": "Monterrey",
            "addressRegion": "N.L.",
            "postalCode": "64840",
            "addressCountry": "MX"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.6425,
            "longitude": -100.2912
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "09:00",
              "closes": "20:30"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Sunday",
              "opens": "09:00",
              "closes": "19:00"
            }
          ],
          "sameAs": [
            "https://instagram.com/kaelumcoffee",
            "https://facebook.com/kaelumcoffee"
          ]
        })
      }
    ]
  }),
  component: Index,
});

function Index() {
  return (
    <ReservationProvider>
      <main className="bg-cream text-navy min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <MatchaVideo />
        <Menu />
        <Passport />
        <Reviews />
        <Careers />
        <Visit />
        <Footer />
      </main>
      <ReservationModal />
    </ReservationProvider>
  );
}
