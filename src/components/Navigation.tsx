"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Menu, Phone } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useBooking } from "@/context/BookingContext";
import { CartDrawer } from "@/components/CartDrawer";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Shop", href: "#shop" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const { setIsBookingOpen } = useBooking();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 right-0 left-0 z-[100] transition-all duration-700 ${
          isScrolled
            ? "bg-bg/80 backdrop-blur-2xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-3"
            data-cursor="HOME"
          >
            <div className="relative h-10 w-10 overflow-hidden transition-transform duration-500 group-hover:scale-110">
              <Image
                src="/twins-logo-bg-removed.png"
                alt="Twins Beauty Saloon"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-medium tracking-[0.15em] text-text uppercase">
                Twins
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-text-muted uppercase">
                Beauty Saloon
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="group relative px-4 py-2"
                data-cursor="VIEW"
              >
                <span className="text-[13px] font-medium tracking-[0.1em] text-text-muted uppercase transition-colors duration-300 group-hover:text-text">
                  {link.label}
                </span>
                <span className="absolute bottom-1 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-accent transition-all duration-500 group-hover:w-3/4" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/23278046462"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-accent/30 px-4 py-2 transition-all duration-300 hover:border-accent hover:bg-accent/10 sm:flex"
              data-cursor="CHAT"
            >
              <Phone size={14} className="text-accent" />
              <span className="text-[11px] font-medium tracking-[0.15em] text-accent uppercase">
                WhatsApp
              </span>
            </a>

            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-accent/50 hover:bg-accent/5"
              data-cursor="CART"
            >
              <ShoppingBag size={18} className="text-text-muted" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="cart-badge absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-bg"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-accent/50 lg:hidden"
              data-cursor="MENU"
            >
              {menuOpen ? (
                <X size={18} className="text-text" />
              ) : (
                <Menu size={18} className="text-text" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-bg/95 backdrop-blur-3xl"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link.href)}
                  className="font-[var(--font-display)] text-4xl font-light tracking-wide text-text transition-colors hover:text-accent"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                setMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="mt-12 flex items-center gap-2 rounded-full border border-accent px-6 py-3"
            >
              <Phone size={16} className="text-accent" />
              <span className="text-sm tracking-[0.2em] text-accent uppercase">
                Book Now
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
