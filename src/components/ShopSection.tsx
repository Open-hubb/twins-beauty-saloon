"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { type Product } from "@/data/products";
import { useProducts } from "@/lib/useProducts";
import { useCart } from "@/context/CartContext";

function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-all duration-500 hover:border-accent/20"
    >
      <div className="relative aspect-[4/5] overflow-hidden" data-cursor="VIEW">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${product.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-transparent to-transparent" />

        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-accent/90 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-bg uppercase">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-[10px] font-medium tracking-[0.2em] text-text-dim uppercase">
          {product.category}
        </p>
        <h3 className="mt-1.5 text-sm font-medium leading-tight">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-text-dim line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-medium text-accent">
            Le {product.price.toLocaleString()}
          </span>
          <button
            onClick={handleAdd}
            className={`flex h-9 items-center gap-2 rounded-full border px-4 text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
              added
                ? "border-green-500/50 bg-green-500/10 text-green-400"
                : "border-border text-text-muted hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
            }`}
            data-cursor="ADD"
          >
            {added ? (
              <>
                <Check size={14} />
                Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ShopSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");

  // Live catalogue from the Flot dashboard (falls back to bundled products).
  const products = useProducts();
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
  ];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
    };
    init();
  }, []);

  return (
    <section id="shop" className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div ref={ref} className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-[11px] font-medium tracking-[0.3em] text-accent uppercase"
            >
              Marketplace
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mt-4 font-[var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-light"
            >
              Shop <span className="italic text-stroke">Beauty</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-text-dim hover:border-text-dim/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
