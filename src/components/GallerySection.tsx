"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const galleryItems = [
  { src: "/3d-chrome-nails-gold.jpeg", label: "3D Chrome Nails", span: "row-span-2" },
  { src: "/1.jpeg", label: "French Cat Eye", span: "" },
  { src: "/2.jpeg", label: "Marble Design", span: "" },
  { src: "/4.jpeg", label: "3D Embellished Nails", span: "row-span-2" },
  { src: "/11.jpeg", label: "Pink Barbie Art", span: "" },
  { src: "/3.jpeg", label: "Cat Eye Nails", span: "" },
  { src: "/3d-nails-gold-zebra.jpeg", label: "3D Gold Zebra Nails", span: "" },
  { src: "/acrylic-gel-polish-navy.jpeg", label: "Acrylic & Gel Polish", span: "" },
  { src: "/22233.jpeg", label: "Acrylic & Gel Toes", span: "" },
  { src: "/acrylic-french-tip.jpeg", label: "Acrylic French Tip", span: "row-span-2" },
  { src: "/french-tip-toes.jpeg", label: "French Tip Toes", span: "" },
];

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!gridRef.current) return;

      const items = gridRef.current.querySelectorAll(".gallery-item");
      gsap.fromTo(
        items,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );
    };
    init();
  }, []);

  return (
    <section id="gallery" className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div ref={ref} className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[11px] font-medium tracking-[0.3em] text-accent uppercase"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-4 font-[var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-light"
          >
            The <span className="italic text-stroke">Gallery</span>
          </motion.h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px] lg:auto-rows-[250px]"
        >
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-item group relative overflow-hidden rounded-xl ${item.span}`}
              data-cursor="VIEW"
            >
              <div
                className="absolute inset-0 bg-cover bg-center liquid-hover"
                style={{ backgroundImage: `url(${item.src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                <span className="text-sm font-medium tracking-wide text-white">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
