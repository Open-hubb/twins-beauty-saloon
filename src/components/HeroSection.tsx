"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const HeroScene = dynamic(
  () => import("./HeroScene").then((mod) => ({ default: mod.HeroScene })),
  { ssr: false }
);

export function HeroSection() {
  const { setIsBookingOpen } = useBooking();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <HeroScene />

      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0a0a_70%)] z-[1]" />

      <div className="relative z-[2] text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-6"
        >
          <span className="inline-block rounded-full border border-accent/30 px-5 py-1.5 text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
            Adelaide Street, Freetown
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="font-[var(--font-display)] text-[clamp(2.5rem,8vw,7rem)] font-light leading-[0.9] tracking-[-0.03em]"
        >
          <span className="block">Hair, Nails</span>
          <span className="block mt-2">
            &amp;{" "}
            <span className="text-stroke italic">Beauty</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-8 mx-auto max-w-xl text-sm leading-relaxed text-text-muted tracking-wide"
        >
          All under one roof in the heart of Freetown. Walk-ins welcome.
          Book an available date and deposit a percentage to reserve your spot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => setIsBookingOpen(true)}
            className="magnetic-btn group relative overflow-hidden rounded-full bg-accent px-8 py-3.5 text-sm font-semibold tracking-[0.1em] text-bg uppercase"
            data-cursor="BOOK"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 -translate-x-full bg-accent-light transition-transform duration-500 group-hover:translate-x-0" />
          </button>
          <button
            onClick={() => {
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="magnetic-btn flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm tracking-[0.1em] text-text-muted uppercase transition-all duration-300 hover:border-accent/50 hover:text-text"
            data-cursor="VIEW"
          >
            Explore
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
