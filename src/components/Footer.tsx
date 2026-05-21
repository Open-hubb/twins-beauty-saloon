"use client";

import { useEffect, useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";

export function Footer() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { setIsBookingOpen } = useBooking();

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!headingRef.current) return;

      gsap.fromTo(
        headingRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );
    };
    init();
  }, []);

  return (
    <footer className="relative border-t border-border bg-bg-elevated overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[500px] h-[500px] opacity-[0.08]">
          <Image
            src="/twins-logo-bg-removed.png"
            alt=""
            fill
            className="object-contain"
            sizes="500px"
          />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="text-center">
          <h2
            ref={headingRef}
            className="font-[var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] font-light leading-[0.95] tracking-[-0.03em]"
          >
            Your Beauty,{" "}
            <span className="italic text-stroke-accent">Our Craft</span>
          </h2>
          <p className="mt-6 text-sm text-text-muted">
            Walk-ins welcome. Book a date &amp; deposit to reserve your spot.
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="magnetic-btn mt-8 inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold tracking-[0.1em] text-bg uppercase transition hover:bg-accent-light"
            data-cursor="BOOK"
          >
            Book Now
          </button>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-6 py-8 text-center lg:grid-cols-3 lg:text-left lg:px-12">
          <span className="text-xs text-text-dim">
            &copy; {new Date().getFullYear()} Twin Beauty Saloon
          </span>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            <a
              href="mailto:twinsbeautysaloon@gmail.com"
              className="flex items-center gap-2 text-xs text-text-dim transition hover:text-text"
            >
              <Mail size={12} />
              twinsbeautysaloon@gmail.com
            </a>
            <a
              href="https://www.facebook.com/twinsbe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-dim transition hover:text-accent"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/twinsbeautysaloon?igsh=MWZqYmppb2g0Y2Mwag=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-dim transition hover:text-accent"
            >
              Instagram
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <span className="text-xs text-text-dim">
              Built and powered by{" "}
              <a
                href="https://www.flotme.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent transition hover:text-accent-light"
              >
                Flot
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
