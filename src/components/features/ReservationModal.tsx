import { useState, useMemo } from "react";
import { Users, Minus, Plus, Send } from "lucide-react";
import { useReservation } from "@/components/features/ReservationContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const WHATSAPP_NUMBER = "528112345678";

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function ReservationModal() {
  const { isOpen, close } = useReservation();
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
    close();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="w-full sm:max-w-md bg-cream text-navy rounded-t-3xl sm:rounded-3xl border-none p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="bg-navy text-cream px-6 py-5 flex flex-col items-start gap-1">
          {/* Accent text color complies with WCAG AA */}
          <p className="font-script text-mosaic-dark text-xl leading-none">reserva tu mesa</p>
          <DialogTitle className="font-display text-2xl font-black mt-1">Aseguramos tu lugar</DialogTitle>
          <DialogDescription className="text-cream/70 text-sm mt-1">
            Te confirmamos por WhatsApp en minutos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="p-6 space-y-4">
          <label className="block">
            <span className="text-navy/80 text-xs font-bold uppercase tracking-wider">Tu nombre</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              required
              placeholder="¿Cómo te llamas?"
              className="mt-1.5 w-full rounded-xl border-2 border-navy/15 bg-white px-4 py-3 text-navy placeholder:text-navy/30 focus:border-mosaic-dark focus:outline-none transition-colors"
            />
          </label>

          <div>
            <span id="people-label" className="text-navy/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" aria-hidden="true" /> Personas
            </span>
            <div 
              role="group" 
              aria-labelledby="people-label"
              className="mt-1.5 flex items-center gap-3 rounded-xl border-2 border-navy/15 bg-white px-2 py-2"
            >
              <button 
                type="button" 
                onClick={() => setPeople(Math.max(1, people - 1))} 
                aria-label="Disminuir número de personas"
                disabled={people <= 1}
                className="h-10 w-10 rounded-lg bg-navy/5 hover:bg-navy/10 grid place-items-center text-navy disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              
              <span 
                role="status" 
                aria-live="polite" 
                className="flex-1 text-center font-display font-bold text-2xl text-navy tabular-nums"
              >
                {people} {people === 1 ? 'persona' : 'personas'}
              </span>
              
              <button 
                type="button" 
                onClick={() => setPeople(Math.min(20, people + 1))} 
                aria-label="Aumentar número de personas"
                disabled={people >= 20}
                className="h-10 w-10 rounded-lg bg-navy/5 hover:bg-navy/10 grid place-items-center text-navy disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-navy/80 text-xs font-bold uppercase tracking-wider">Día</span>
              <input
                type="date"
                value={date}
                min={minDate}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border-2 border-navy/15 bg-white px-3 py-3 text-navy focus:border-mosaic-dark focus:outline-none transition-colors"
              />
            </label>
            <label className="block">
              <span className="text-navy/80 text-xs font-bold uppercase tracking-wider">Hora</span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                min="09:00"
                max="20:30"
                className="mt-1.5 w-full rounded-xl border-2 border-navy/15 bg-white px-3 py-3 text-navy focus:border-mosaic-dark focus:outline-none transition-colors"
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
              className="mt-1.5 w-full rounded-xl border-2 border-navy/15 bg-white px-4 py-3 text-navy placeholder:text-navy/30 focus:border-mosaic-dark focus:outline-none transition-colors resize-none"
            />
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 text-cream font-semibold shadow-lg shadow-navy/20 hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
          >
            <Send className="h-4 w-4" /> Enviar reserva por WhatsApp
          </button>
          <p className="text-center text-navy/50 text-xs">Abriremos WhatsApp con tu reserva lista para enviar.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
