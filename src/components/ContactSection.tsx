"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "17 Adelaide Street, Freetown, Sierra Leone",
    href: "https://maps.google.com/?q=17+Adelaide+Street+Freetown+Sierra+Leone",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+232 78 046462",
    href: "tel:+23278046462",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "Ttwinsbeautysaloon@gmail.com",
    href: "mailto:Ttwinsbeautysaloon@gmail.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat: 9AM – 7PM",
    href: null,
  },
];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div ref={ref} className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-[11px] font-medium tracking-[0.3em] text-accent uppercase"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mt-4 font-[var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1]"
            >
              Let&apos;s make you{" "}
              <span className="italic text-stroke">beautiful</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="mt-6 text-base leading-[1.8] text-text-muted"
            >
              Walk-ins are always welcome. For bookings or product inquiries,
              reach us on WhatsApp — it&apos;s the fastest way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mt-10 space-y-6"
            >
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href
                  ? {
                      href: item.href,
                      target: "_blank" as const,
                      rel: "noopener noreferrer",
                    }
                  : {};
                return (
                  <Wrapper
                    key={item.label}
                    {...wrapperProps}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-bg-elevated transition group-hover:border-accent/30">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium tracking-[0.2em] text-text-dim uppercase">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm text-text-muted transition group-hover:text-text">
                        {item.value}
                      </p>
                    </div>
                  </Wrapper>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <a
                href="https://wa.me/23278046462"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold tracking-[0.1em] text-white uppercase"
                data-cursor="CHAT"
              >
                <MessageCircle size={18} />
                <span className="relative z-10">Chat on WhatsApp</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="overflow-hidden rounded-2xl border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.5!2d-13.2344!3d8.484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOCswMDAwMCBGcmVldG93bg!5e0!3m2!1sen!2ssl!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 450 }}
              allowFullScreen
              loading="lazy"
              title="Twin Beauty Saloon Location"
              className="grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
