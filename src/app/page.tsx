"use client";

import { HeroSection } from "@/components/HeroSection";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { GallerySection } from "@/components/GallerySection";
import { ShopSection } from "@/components/ShopSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <MarqueeStrip
        items={[
          "Braids",
          "Weaves",
          "Nail Art",
          "Wigs",
          "Extensions",
          "Manicure",
          "Pedicure",
          "Hair Care",
          "Beauty Products",
        ]}
      />

      <AboutSection />

      <MarqueeStrip
        items={[
          "Walk-Ins Welcome",
          "Book & Lock In Your Spot",
          "Adelaide Street",
          "Freetown",
        ]}
        reverse
      />

      <ServicesSection />
      <GallerySection />

      <MarqueeStrip
        items={[
          "Wigs",
          "Bundles",
          "Hair Care",
          "Nail Products",
          "Cosmetics",
          "Edge Control",
          "Extensions",
        ]}
      />

      <ShopSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
