"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface BookingData {
  name: string;
  date: string;
  time: string;
}

interface BookingContextType {
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  isPaymentOpen: boolean;
  setIsPaymentOpen: (open: boolean) => void;
  bookingData: BookingData | null;
  setBookingData: (data: BookingData | null) => void;
  /** Total service amount (before deposit calculation) */
  cartTotal: number;
  setCartTotal: (total: number) => void;
  /** Deposit amount to pay (30% of cartTotal, or 0 for standalone bookings) */
  depositAmount: number;
}

const DEPOSIT_PERCENT = 0.3;

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [cartTotal, setCartTotal] = useState(0);

  const depositAmount = cartTotal > 0 ? Math.ceil(cartTotal * DEPOSIT_PERCENT) : 0;

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        setIsBookingOpen,
        isPaymentOpen,
        setIsPaymentOpen,
        bookingData,
        setBookingData,
        cartTotal,
        setCartTotal,
        depositAmount,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
