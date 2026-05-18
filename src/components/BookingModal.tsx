"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const FLOT_URL = "https://pay.flotme.ai/twinsbeautysaloon";

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
  } = useBooking();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

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
    setError("");
  };

  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
    setBookingData(null);
    setName("");
    setDate("");
    setTime("");
  };

  const handlePaymentDone = () => {
    setIsPaymentOpen(false);
    setBookingData(null);
    setName("");
    setDate("");
    setTime("");
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <>
      {/* Booking Form Modal */}
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
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <div>
                  <h2 className="font-[var(--font-display)] text-xl font-medium">
                    Reserve Your Spot
                  </h2>
                  <p className="mt-1 text-xs text-text-dim">
                    Fill in your details, then pay a deposit to lock in your
                    booking
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border transition hover:border-accent/50"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5 px-6 py-6">
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
              <div className="border-t border-border px-6 py-5">
                <button
                  onClick={handleSubmit}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold tracking-[0.1em] text-bg uppercase transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_30px_rgba(200,169,126,0.3)]"
                >
                  Continue to Payment
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal (Flot iframe) */}
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
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between bg-[#0a0a0a] px-4 py-2.5 text-white">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="font-medium text-accent">
                      {bookingData.name}
                    </span>
                    <span className="text-white/40">|</span>
                    <span className="text-white/70">
                      {new Date(bookingData.date + "T00:00:00").toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-white/40">|</span>
                    <span className="text-white/70">{bookingData.time}</span>
                  </div>
                </div>
              )}

              <div className="absolute top-0 right-0 z-20 flex gap-2 p-2.5">
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
                src={FLOT_URL}
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
