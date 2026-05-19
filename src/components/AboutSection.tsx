"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "300+", label: "Happy Clients" },
  { value: "15+", label: "Services" },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!headingRef.current) return;

      const chars = headingRef.current.querySelectorAll(".about-char");
      gsap.fromTo(
        chars,
        { y: 80, opacity: 0, rotateX: 40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.03,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    };
    init();
  }, []);

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="about-char inline-block"
        style={{ perspective: "400px" }}
      >
        {char === " " ? " " : char}
      </span>
    ));

  return (
    <section id="about" className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <span className="text-[11px] font-medium tracking-[0.3em] text-accent uppercase">
              Our Story
            </span>
            <h2
              ref={headingRef}
              className="mt-4 font-[var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1] tracking-[-0.02em]"
            >
              {splitText("Where Beauty")}
              <br />
              {splitText("Meets Soul")}
            </h2>
          </div>

          <div ref={ref} className="lg:col-span-7 lg:pt-14">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-base leading-[1.8] text-text-muted">
                Twin Beauty Saloon is a beauty and personal-care destination on
                Adelaide Street in central Freetown. We specialise in everything
                that helps you look and feel your best — from manicures and
                pedicures to braids, weaves, and protective styles.
              </p>
              <p className="mt-6 text-base leading-[1.8] text-text-muted">
                Alongside our salon services, we stock a curated selection of
                wigs, hair extensions, and beauty products so you can take the
                salon experience home with you. Walk-ins are welcome, and our
                friendly team takes pride in delivering quality work for every
                client who sits in our chair.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-10"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-[var(--font-display)] text-3xl lg:text-4xl font-light text-accent">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] tracking-[0.2em] text-text-dim uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
