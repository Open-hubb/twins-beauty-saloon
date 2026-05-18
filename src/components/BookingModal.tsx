"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, ArrowRight, ShoppingBag } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { useCart } from "@/context/CartContext";

const FLOT_BASE = "https://pay.flotme.ai/twinsbeautysaloon";

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
];

export function BookingModal() {
  const {
    isBookingOpen,
    setIsBookingOpen,
    isPaymentOpen,
    setIsPaymentOpen,
    bookingData,
    setBookingData,
    cartTotal,
    setCartTotal,
    depositAmount,
  } = useBooking();

  const { clearCart } = useCart();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const isFromCart = cartTotal > 0;

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!date) {
      setError("Please select a date");
      return;
    }
    if (!time) {
      setError("Please select a time");
      return;
    }

    setBookingData({ name: name.trim(), date, time });
    setIsBookingOpen(false);
    setIsPaymentOpen(true);
    setError("");
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setCartTotal(0);
    setError("");
  };

  const resetForm = () => {
    setIsPaymentOpen(false);
    setBookingData(null);
    setCartTotal(0);
    setName("");
    setDate("");
    setTime("");
  };

  const handlePaymentClose = () => {
    resetForm();
  };

  const handlePaymentDone = () => {
    if (isFromCart) clearCart();
    resetForm();
  };

  // Build Flot URL with amount pre-populated
  const flotUrl = depositAmount > 0
    ? `${FLOT_BASE}?amount=${depositAmount}`
    : FLOT_BASE;

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <>
      {/* ─── Booking Form Modal ─── */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center backdrop-blur-md p-4"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.85)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-bg-elevated shadow-2xl"
              data-lenis-prevent
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-bg-elevated px-6 py-5">
                <div>
                  <h2 className="font-[var(--font-display)] text-xl font-medium">
                    Reserve Your Spot
                  </h2>
                  <p className="mt-1 text-xs text-text-dim">
                    {isFromCart
                      ? "Complete your details and pay 30% deposit to lock your booking"
                      : "Fill in your details, then pay a deposit to lock in your booking"}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border transition hover:border-accent/50"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Cart Summary (shown when coming from marketplace) */}
              {isFromCart && (
                <div className="mx-6 mt-5 rounded-xl border border-accent/15 bg-accent/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingBag size={14} className="text-accent" />
                    <span className="text-[11px] font-medium tracking-[0.15em] text-accent uppercase">
                      Order Summary
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Service Total</span>
                    <span className="font-medium">Le {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-accent/10 pt-2">
                    <span className="text-sm font-medium text-text">
                      30% Deposit Due Now
                    </span>
                    <span className="text-lg font-semibold text-accent">
                      Le {depositAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] text-text-dim leading-relaxed">
                    Remaining Le {(cartTotal - depositAmount).toLocaleString()} to
                    be paid at the salon on your appointment day.
                  </p>
                </div>
              )}

              {/* Form */}
              <div className="space-y-5 px-6 py-5">
                {/* Name */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-text-dim uppercase">
                    <User size={14} className="text-accent" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-border bg-bg-floating px-4 py-3 text-sm text-text placeholder:text-text-dim/50 outline-none transition focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-text-dim uppercase">
                    <Calendar size={14} className="text-accent" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={minDate}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setError("");
                    }}
                    className="w-full rounded-xl border border-border bg-bg-floating px-4 py-3 text-sm text-text outline-none transition focus:border-accent/50 focus:ring-1 focus:ring-accent/20 [color-scheme:dark]"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-text-dim uppercase">
                    <Clock size={14} className="text-accent" />
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setTime(slot);
                          setError("");
                        }}
                        className={`rounded-lg border px-2 py-2 text-xs font-medium transition-all duration-200 ${
                          time === slot
                            ? "border-accent bg-accent/15 text-accent"
                            : "border-border text-text-muted hover:border-accent/30 hover:text-text"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-medium text-rose-400"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              {/* Submit */}
              <div className="sticky bottom-0 border-t border-border bg-bg-elevated px-6 py-5">
                <button
                  onClick={handleSubmit}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold tracking-[0.1em] text-bg uppercase transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_30px_rgba(200,169,126,0.3)]"
                >
                  {isFromCart
                    ? `Pay Le ${depositAmount.toLocaleString()} Deposit`
                    : "Continue to Payment"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Payment Modal (Flot iframe) ─── */}
      <AnimatePresence>
        {isPaymentOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.6)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg h-[85vh] max-h-[700px] rounded-2xl overflow-hidden bg-white shadow-2xl"
            >
              {/* Booking summary bar */}
              {bookingData && (
                <div className="absolute top-0 left-0 right-14 z-20 flex items-center gap-3 bg-[#0a0a0a] px-4 py-2.5 text-[11px] text-white">
                  <span className="font-medium text-[#c8a97e]">
                    {bookingData.name}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/70">
                    {new Date(bookingData.date + "T00:00:00").toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short" }
                    )}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/70">{bookingData.time}</span>
                  {depositAmount > 0 && (
                    <>
                      <span className="text-white/30">•</span>
                      <span className="font-semibold text-green-400">
                        Le {depositAmount.toLocaleString()} deposit
                      </span>
                    </>
                  )}
                </div>
              )}

              <div className="absolute top-0 right-0 z-20 flex gap-2 p-2">
                <button
                  onClick={handlePaymentDone}
                  className="rounded-full bg-green-600 px-3 py-1 text-[10px] font-semibold text-white tracking-wider uppercase hover:bg-green-700 transition"
                >
                  Done
                </button>
                <button
                  onClick={handlePaymentClose}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition"
                >
                  <X size={14} />
                </button>
              </div>

              <iframe
                src={flotUrl}
                className="h-full w-full border-0 pt-10"
                title="Flot Payment — Deposit"
                allow="payment"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
