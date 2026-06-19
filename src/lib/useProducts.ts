"use client";

import { useEffect, useState } from "react";
import { products as fallbackProducts, type Product } from "@/data/products";

// The merchant's product catalogue, managed in the Flot dashboard and served
// from its public API. Falls back to the bundled products so the shop never
// renders empty if the API is unreachable.
const PRODUCTS_API =
  "https://dashboard.flotme.ai/api/public/products/5d43fac9-9f53-4892-a7f2-817987d9ea5e";

export function useProducts(): Product[] {
  const [items, setItems] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    let cancelled = false;
    fetch(PRODUCTS_API)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setItems(
            data.map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              image: p.image || "",
              category: p.category || "",
              description: p.description || "",
              badge: p.badge || undefined,
            }))
          );
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return items;
}
