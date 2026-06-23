import { createContext, useContext, useState, type ReactNode } from "react";

type ReservationCtx = {
  open: () => void;
  isOpen: boolean;
  close: () => void;
};

const ReservationContext = createContext<ReservationCtx>({
  open: () => {},
  isOpen: false,
  close: () => {},
});

export const useReservation = () => useContext(ReservationContext);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReservationContext.Provider
      value={{
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        isOpen,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
