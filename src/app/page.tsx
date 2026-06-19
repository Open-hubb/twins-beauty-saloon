"use client";

import { HeroSection } from "@/components/HeroSection";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { AboutSection } from "@/components/AboutSection";
import { ShopSection } from "@/components/ShopSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { useSiteContent } from "@/lib/useSiteContent";

const FALLBACK_PRIMARY = [
  "Braids",
  "Weaves",
  "Nail Art",
  "Wigs",
  "Extensions",
  "Manicure",
  "Pedicure",
  "Hair Care",
  "Beauty Products",
];

const FALLBACK_SECONDARY = [
  "Walk-Ins Welcome",
  "Book & Lock In Your Spot",
  "Adelaide Street",
  "Freetown",
];

export default function Home() {
  const { marquee } = useSiteContent();
  const primary = marquee.primary.length ? marquee.primary : FALLBACK_PRIMARY;
  const secondary = marquee.secondary.length ? marquee.secondary : FALLBACK_SECONDARY;

  return (
    <main>
      <HeroSection />

      <MarqueeStrip items={primary} />

      <AboutSection />

      <MarqueeStrip items={secondary} reverse />

      <ShopSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
