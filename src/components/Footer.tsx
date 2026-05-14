"use client";

import { useEffect, useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const headingRef = useRef<HTMLHeadingElement>(null);

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
    <footer className="relative border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="text-center">
          <h2
            ref={headingRef}
            className="font-[var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] font-light leading-[0.95] tracking-[-0.03em]"
          >
            Your Beauty,{" "}
            <span className="italic text-stroke-accent">Our Craft</span>
          </h2>
          <p className="mt-6 text-sm text-text-muted">
            Walk-ins welcome &mdash; no appointment needed
          </p>
          <a
            href="https://wa.me/23278046462"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn mt-8 inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold tracking-[0.1em] text-bg uppercase transition hover:bg-accent-light"
            data-cursor="BOOK"
          >
            Book Now
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-6 py-8 lg:flex-row lg:px-12">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <a
              href="tel:+23278046462"
              className="flex items-center gap-2 text-xs text-text-dim transition hover:text-text"
            >
              <Phone size={12} />
              +232 78 046462
            </a>
            <a
              href="mailto:Ttwinsbeautysaloon@gmail.com"
              className="flex items-center gap-2 text-xs text-text-dim transition hover:text-text"
            >
              <Mail size={12} />
              Ttwinsbeautysaloon@gmail.com
            </a>
            <span className="flex items-center gap-2 text-xs text-text-dim">
              <MapPin size={12} />
              17 Adelaide St, Freetown
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.facebook.com/twinsbe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-dim transition hover:text-accent"
            >
              Facebook
            </a>
            <span className="text-xs text-text-dim">
              &copy; {new Date().getFullYear()} Twin Beauty Saloon
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
