"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scissors, Sparkles, Crown, ShoppingBag } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Hair",
    subtitle: "Braids, Weaves & More",
    items: [
      "Hair straightening — Le 150",
      "Hair curl — Le 150",
      "Natural hair braids — from Le 80",
      "Hair wash without cream — Le 100",
      "Weaves & sew-in installation",
    ],
    accent: "#c8a97e",
  },
  {
    icon: Sparkles,
    title: "Nails",
    subtitle: "Manicures & Pedicures",
    items: [
      "Manicure — Le 60 (Ladies) / Le 80 (Gents)",
      "Pedicure — Le 100 (Ladies) / Le 120 (Gents)",
      "Acrylic & Gel Polish — from Le 400",
      "3D Chrome Nails — from Le 1,200",
      "Custom nail art — from Le 650",
    ],
    accent: "#da70d6",
  },
  {
    icon: Crown,
    title: "Wigs & Extensions",
    subtitle: "Install & Style",
    items: [
      "Wig installation & customisation",
      "Wig styling & revamping",
      "Hair extensions / bundles",
      "Synthetic & human hair wigs",
      "Lace front & closure wigs",
    ],
    accent: "#d4af37",
  },
  {
    icon: ShoppingBag,
    title: "Shop",
    subtitle: "Beauty Products",
    items: [
      "Hair care products & oils",
      "Edge control & styling gels",
      "Shampoos & conditioners",
      "Beauty & cosmetic items",
      "Press-on nails & accessories",
    ],
    accent: "#b76e79",
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!cardsRef.current) return;

      const cards = cardsRef.current.querySelectorAll(".service-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        }
      );
    };
    init();
  }, []);

  return (
    <section id="services" className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div ref={ref} className="mb-20 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[11px] font-medium tracking-[0.3em] text-accent uppercase"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-4 font-[var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1]"
          >
            Services crafted{" "}
            <span className="italic text-stroke">for you</span>
          </motion.h2>
        </div>

        <div ref={cardsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card group relative overflow-hidden rounded-2xl border border-border bg-bg-elevated p-8 transition-all duration-500 hover:border-accent/30 hover:bg-bg-floating"
              >
                <div
                  className="absolute top-0 right-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at top right, ${service.accent}15, transparent 70%)`,
                  }}
                />
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border transition-all duration-300 group-hover:border-transparent"
                  style={{
                    background: `${service.accent}10`,
                  }}
                >
                  <Icon
                    size={22}
                    style={{ color: service.accent }}
                  />
                </div>
                <h3 className="font-[var(--font-display)] text-xl font-medium">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs tracking-[0.15em] text-text-dim uppercase">
                  {service.subtitle}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-text-muted"
                    >
                      <span
                        className="mt-1.5 block h-1 w-1 flex-shrink-0 rounded-full"
                        style={{ background: service.accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="https://wa.me/23278046462"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium tracking-[0.2em] uppercase transition-colors"
                    style={{ color: service.accent }}
                    data-cursor="BOOK"
                  >
                    Reserve Your Spot &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
