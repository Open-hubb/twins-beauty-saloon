"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";

const fallbackTestimonial = {
  name: "Musu Kawusu-Kebbay",
  role: "Verified Review — 4.0 / 5",
  quote:
    "Great job. Super talented nail art staff. Walk-ins welcome, or book ahead to lock in your spot.",
};

export function TestimonialSection() {
  const { testimonials } = useSiteContent();
  const t = testimonials[0] ?? fallbackTestimonial;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div ref={ref} className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[11px] font-medium tracking-[0.3em] text-accent uppercase"
          >
            What They Say
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-10"
          >
            <div className="mb-6 flex items-center justify-center gap-1">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill="#c8a97e"
                  className="text-accent"
                />
              ))}
              <Star size={18} className="text-border" />
            </div>

            <blockquote className="font-[var(--font-display)] text-[clamp(1.3rem,3vw,2rem)] font-light leading-[1.5] italic">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="mt-8">
              <p className="text-sm font-medium">{t.name}</p>
              <p className="mt-1 text-xs tracking-[0.15em] text-text-dim uppercase">
                {t.role}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <a
              href="https://www.facebook.com/twinsbe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[11px] font-medium tracking-[0.15em] text-text-muted uppercase transition-all duration-300 hover:border-accent/50 hover:text-text"
              data-cursor="VIEW"
            >
              Leave a Review on Facebook &rarr;
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
